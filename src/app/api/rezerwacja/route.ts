import { NextResponse } from "next/server";

/**
 * Odbiór rezerwacji i wiadomości z formularzy.
 * Wysyłka e-mailem przez Resend (https://resend.com) — wystarczy ustawić
 * zmienną RESEND_API_KEY w Vercelu. Bez klucza formularz pokaże klientowi
 * gotowy e-mail / numer telefonu (nic nie ginie).
 */

export const runtime = "nodejs";

const hits = new Map<string, number[]>();
const LIMIT = 5; // zgłoszeń
const WINDOW = 10 * 60 * 1000; // na 10 minut z jednego IP

function rateLimited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > LIMIT;
}

const esc = (v: unknown, max = 2000) =>
  String(v ?? "")
    .slice(0, max)
    .replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  // Ochrona przed wysyłką z obcych stron
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const len = Number(req.headers.get("content-length") ?? 0);
  if (len > 20_000) return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited", fallback: true }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Honeypot + zbyt szybkie wypełnienie = bot. Udajemy sukces.
  if (body.website || Number(body.elapsed ?? 0) < 2500) {
    return NextResponse.json({ ok: true });
  }

  const kind = body.kind === "contact" ? "contact" : "booking";
  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").trim();

  if (name.length < 2 || name.length > 80) return NextResponse.json({ ok: false, error: "name" }, { status: 422 });
  if (kind === "booking" && !/^[+\d][\d\s-]{7,19}$/.test(phone))
    return NextResponse.json({ ok: false, error: "phone" }, { status: 422 });
  if (email && !/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ ok: false, error: "email" }, { status: 422 });
  if (body.consent !== true) return NextResponse.json({ ok: false, error: "consent" }, { status: 422 });

  const car = (body.car ?? {}) as Record<string, unknown>;
  const rows: [string, string][] =
    kind === "booking"
      ? [
          ["Usługa", esc(body.services, 400)],
          ["Termin", `${esc(body.dateLabel, 40)} ${esc(body.time, 10)}`],
          ["Samochód", `${esc(car.make, 60)} ${esc(car.model, 80)} ${esc(car.year, 4)}`],
          ["Nr rej.", esc(car.plate, 12)],
          ["Opis", esc(body.description, 1500)],
          ["Imię", esc(name)],
          ["Telefon", esc(phone, 20)],
          ["E-mail", esc(email, 120)],
        ]
      : [
          ["Imię", esc(name)],
          ["Telefon", esc(phone, 20)],
          ["E-mail", esc(email, 120)],
          ["Wiadomość", esc(body.message, 2000)],
        ];

  const subject =
    kind === "booking"
      ? `Nowa rezerwacja: ${String(body.services ?? "").slice(0, 60)} – ${String(body.dateLabel ?? "")} ${String(body.time ?? "")}`
      : `Wiadomość ze strony od: ${name}`;

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:560px">
    <div style="background:#e3241b;color:#fff;padding:16px 20px;font-weight:bold;font-size:18px">
      ${kind === "booking" ? "Nowa rezerwacja online" : "Nowa wiadomość ze strony"}
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:15px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:10px 12px;border-bottom:1px solid #eee;color:#666;width:120px;vertical-align:top">${k}</td><td style="padding:10px 12px;border-bottom:1px solid #eee;white-space:pre-wrap">${v || "—"}</td></tr>`
        )
        .join("")}
    </table>
    ${phone ? `<p style="margin:20px 0"><a href="tel:${esc(phone.replace(/\s/g, ""), 20)}" style="background:#111;color:#fff;padding:12px 18px;text-decoration:none;font-weight:bold">Zadzwoń do klienta</a></p>` : ""}
  </div>`;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[rezerwacja] Brak RESEND_API_KEY — zgłoszenie nie zostało wysłane e-mailem.");
    return NextResponse.json({ ok: false, fallback: true, error: "not_configured" }, { status: 503 });
  }

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.BOOKING_FROM_EMAIL || "Auto Expert <onboarding@resend.dev>",
        to: [process.env.BOOKING_TO_EMAIL || "autoexpert.gorzow@gmail.com"],
        reply_to: email || undefined,
        subject,
        html,
      }),
    });
    if (!r.ok) {
      console.error("[rezerwacja] Resend error", r.status, await r.text());
      return NextResponse.json({ ok: false, fallback: true, error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[rezerwacja] fetch failed", e);
    return NextResponse.json({ ok: false, fallback: true, error: "send_failed" }, { status: 502 });
  }
}
