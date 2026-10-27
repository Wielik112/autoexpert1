"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { company, hours, services } from "@/content/site";
import { holidayName, warsawNow } from "@/lib/hours";
import { Icon } from "./Icon";
import { submitForm, type SubmitResult } from "@/lib/submit";

const STEPS = ["Usługa", "Termin", "Samochód", "Kontakt"];
const WD = ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "So"];
const MONTHS = ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"];

type Day = { iso: string; wd: number; d: number; m: number; label: string; disabled: boolean; why?: string };

function nextDays(n = 16): Day[] {
  const now = warsawNow();
  const out: Day[] = [];
  for (let i = 1; out.length < n; i++) {
    const dt = new Date(Date.UTC(now.y, now.m - 1, now.d + i));
    const y = dt.getUTCFullYear();
    const m = dt.getUTCMonth() + 1;
    const d = dt.getUTCDate();
    const wd = dt.getUTCDay();
    const hol = holidayName(y, m, d);
    const closed = !hours[wd] || !!hol;
    if (!hours[wd] && !hol) continue; // pomijamy weekendy
    out.push({
      iso: `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      wd,
      d,
      m,
      label: `${WD[wd]} ${d} ${MONTHS[m - 1]}`,
      disabled: closed,
      why: hol,
    });
  }
  return out;
}

function slotsFor(wd: number) {
  const h = hours[wd];
  if (!h) return [];
  const [oh] = h.open.split(":").map(Number);
  const [ch] = h.close.split(":").map(Number);
  const out: string[] = [];
  for (let x = oh; x < ch - 0; x++) out.push(`${String(x).padStart(2, "0")}:00`);
  return out;
}

export function BookingForm() {
  const sp = useSearchParams();
  const pre = sp.get("usluga");
  const preSymptom = sp.get("objaw");
  const started = useRef(Date.now());

  const [step, setStep] = useState(0);
  const [svc, setSvc] = useState<string[]>(pre && services.some((s) => s.slug === pre) ? [pre] : []);
  const [day, setDay] = useState<Day | null>(null);
  const [slot, setSlot] = useState<string>("");
  const [car, setCar] = useState({ make: "", model: "", year: "", plate: "" });
  const [desc, setDesc] = useState(preSymptom ? `Objaw: ${preSymptom}. ` : "");
  const [contact, setContact] = useState({ name: "", phone: "", email: "", consent: false, website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [copied, setCopied] = useState(false);

  const days = useMemo(() => nextDays(), []);
  const svcNames = svc.length
    ? svc.map((x) => services.find((s) => s.slug === x)?.name ?? "Inne / nie wiem").join(", ")
    : "—";

  const summaryText = [
    `Rezerwacja – Auto Expert`,
    `Usługa: ${svcNames}`,
    `Termin: ${day ? day.label : "—"} ${slot || ""}`.trim(),
    `Auto: ${[car.make, car.model, car.year].filter(Boolean).join(" ") || "—"}${car.plate ? ` (${car.plate})` : ""}`,
    `Opis: ${desc || "—"}`,
    `Klient: ${contact.name} · ${contact.phone}${contact.email ? ` · ${contact.email}` : ""}`,
  ].join("\n");

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0 && svc.length === 0) e.svc = "Wybierz przynajmniej jedną usługę.";
    if (s === 1) {
      if (!day) e.day = "Wybierz dzień.";
      else if (!slot) e.slot = "Wybierz godzinę.";
    }
    if (s === 2) {
      if (!car.make.trim()) e.make = "Podaj markę samochodu.";
    }
    if (s === 3) {
      if (contact.name.trim().length < 2) e.name = "Podaj imię.";
      if (!/^[+\d][\d\s-]{7,}$/.test(contact.phone.trim())) e.phone = "Podaj poprawny numer telefonu.";
      if (contact.email && !/^\S+@\S+\.\S+$/.test(contact.email)) e.email = "Niepoprawny adres e-mail.";
      if (!contact.consent) e.consent = "Potrzebujemy zgody, aby oddzwonić.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate(step)) setStep((s) => Math.min(3, s + 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const send = async () => {
    if (!validate(3)) return;
    setSending(true);
    const r = await submitForm({
      kind: "booking",
      services: svcNames,
      date: day?.iso,
      dateLabel: day?.label,
      time: slot,
      car,
      description: desc,
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      consent: contact.consent,
      website: contact.website,
      elapsed: Date.now() - started.current,
    });
    setSending(false);
    setResult(r);
  };

  const toggle = (slug: string) =>
    setSvc((v) => (v.includes(slug) ? v.filter((x) => x !== slug) : [...v, slug]));

  if (result) {
    return (
      <div className="wizard__card">
        <div className="wizard__body">
          {result.ok ? (
            <div className="success">
              <span className="success__icon">
                <Icon name="check" size={40} />
              </span>
              <h2 className="wizard__title">Dziękujemy, {contact.name.split(" ")[0]}!</h2>
              <p className="muted" style={{ maxWidth: 460 }}>
                Zgłoszenie dotarło do warsztatu. Oddzwonimy na numer <strong>{contact.phone}</strong>, żeby
                potwierdzić termin <strong>{day?.label}, {slot}</strong>.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
                <Link href="/" className="btn btn--ghost">
                  Wróć na stronę główną
                </Link>
                <Link href="/poradnik" className="btn btn--ghost">
                  Poczytaj poradnik
                </Link>
              </div>
            </div>
          ) : (
            <div className="success">
              <span className="success__icon success__icon--warn">
                <Icon name="phone" size={36} />
              </span>
              <h2 className="wizard__title">Dokończ jednym kliknięciem</h2>
              <p className="muted" style={{ maxWidth: 480 }}>
                Nie udało się wysłać zgłoszenia automatycznie. Zadzwoń lub wyślij przygotowaną wiadomość — wszystkie
                dane już są uzupełnione.
              </p>
              <div style={{ display: "grid", gap: 10, width: "100%", maxWidth: 380 }}>
                <a href={company.phoneHref} className="btn btn--primary btn--lg btn--block">
                  <Icon name="phone" /> Zadzwoń: {company.phone}
                </a>
                <a
                  href={`mailto:${company.email}?subject=${encodeURIComponent("Rezerwacja – " + svcNames)}&body=${encodeURIComponent(summaryText)}`}
                  className="btn btn--ghost btn--lg btn--block"
                >
                  <Icon name="mail" /> Wyślij e-mail z rezerwacją
                </a>
                <button
                  type="button"
                  className="btn btn--ghost btn--block"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(summaryText);
                      setCopied(true);
                    } catch {}
                  }}
                >
                  <Icon name="copy" size={18} /> {copied ? "Skopiowano!" : "Skopiuj treść zgłoszenia"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="wizard">
      <div className="wizard__card">
        <div className="wizard__steps" role="list">
          {STEPS.map((s, i) => (
            <button
              key={s}
              type="button"
              role="listitem"
              className={`wizard__step ${i === step ? "is-active" : ""} ${i < step ? "is-done" : ""}`}
              onClick={() => i < step && setStep(i)}
              aria-current={i === step ? "step" : undefined}
              disabled={i > step}
            >
              <b>{i < step ? "✓" : String(i + 1).padStart(2, "0")}</b>
              {s}
            </button>
          ))}
        </div>

        <div className="wizard__body">
          {step === 0 && (
            <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
              <legend className="wizard__title">Czego potrzebuje Twoje auto?</legend>
              <p className="wizard__sub">Możesz zaznaczyć kilka usług.</p>
              <div className="choice-grid">
                {services.map((s) => (
                  <button
                    key={s.slug}
                    type="button"
                    className="choice"
                    aria-pressed={svc.includes(s.slug)}
                    onClick={() => toggle(s.slug)}
                  >
                    <span className="choice__icon">
                      <Icon name={s.icon} size={22} />
                    </span>
                    <span>
                      <span className="choice__name">{s.name}</span>
                      <span className="choice__meta">{s.priceFrom ? `od ${s.priceFrom}` : "wycena indywidualna"}</span>
                    </span>
                  </button>
                ))}
                <button type="button" className="choice" aria-pressed={svc.includes("inne")} onClick={() => toggle("inne")}>
                  <span className="choice__icon">
                    <Icon name="wrench" size={22} />
                  </span>
                  <span>
                    <span className="choice__name">Inne / nie wiem</span>
                    <span className="choice__meta">opiszesz objawy w kroku 3</span>
                  </span>
                </button>
              </div>
              {errors.svc && <p className="err" role="alert" style={{ marginTop: 12 }}>{errors.svc}</p>}
            </fieldset>
          )}

          {step === 1 && (
            <div>
              <h2 className="wizard__title">Kiedy Ci pasuje?</h2>
              <p className="wizard__sub">Wybierz preferowany dzień i godzinę. Termin potwierdzimy telefonicznie.</p>
              <div className="days" role="group" aria-label="Dzień wizyty">
                {days.map((d) => (
                  <button
                    key={d.iso}
                    type="button"
                    className="day"
                    disabled={d.disabled}
                    title={d.why}
                    aria-pressed={day?.iso === d.iso}
                    onClick={() => {
                      setDay(d);
                      setSlot("");
                    }}
                  >
                    <small>{WD[d.wd]}</small>
                    <b>{d.d}</b>
                    <small>{MONTHS[d.m - 1]}</small>
                  </button>
                ))}
              </div>
              {errors.day && <p className="err" role="alert" style={{ marginTop: 12 }}>{errors.day}</p>}
              {day && (
                <div style={{ marginTop: 28 }}>
                  <p className="field__hint" style={{ marginBottom: 10 }}>
                    Godzina przyjazdu · {day.label}
                  </p>
                  <div className="slots" role="group" aria-label="Godzina">
                    {slotsFor(day.wd).map((t) => (
                      <button key={t} type="button" className="slot" aria-pressed={slot === t} onClick={() => setSlot(t)}>
                        {t}
                      </button>
                    ))}
                  </div>
                  {errors.slot && <p className="err" role="alert" style={{ marginTop: 12 }}>{errors.slot}</p>}
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="form">
              <div>
                <h2 className="wizard__title">Twój samochód</h2>
                <p className="wizard__sub">Dzięki temu przygotujemy się do wizyty i zamówimy części.</p>
              </div>
              <div className="row2">
                <div className="field">
                  <label htmlFor="make">Marka *</label>
                  <input id="make" className="input" value={car.make} onChange={(e) => setCar({ ...car, make: e.target.value })} placeholder="np. Volkswagen" autoComplete="off" aria-invalid={!!errors.make} maxLength={60} />
                  {errors.make && <span className="err">{errors.make}</span>}
                </div>
                <div className="field">
                  <label htmlFor="model">Model</label>
                  <input id="model" className="input" value={car.model} onChange={(e) => setCar({ ...car, model: e.target.value })} placeholder="np. Golf VII 1.6 TDI" maxLength={80} />
                </div>
              </div>
              <div className="row2">
                <div className="field">
                  <label htmlFor="year">Rok produkcji</label>
                  <input id="year" className="input" inputMode="numeric" value={car.year} onChange={(e) => setCar({ ...car, year: e.target.value.replace(/\D/g, "").slice(0, 4) })} placeholder="np. 2016" />
                </div>
                <div className="field">
                  <label htmlFor="plate">Nr rejestracyjny</label>
                  <input id="plate" className="input" value={car.plate} onChange={(e) => setCar({ ...car, plate: e.target.value.toUpperCase().slice(0, 10) })} placeholder="np. FG 12345" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="desc">Opisz objawy lub zakres prac</label>
                <textarea id="desc" className="textarea" value={desc} onChange={(e) => setDesc(e.target.value.slice(0, 1500))} placeholder="Co zauważasz? Kiedy występuje problem? Na zimnym czy ciepłym silniku, przy jakiej prędkości?" />
                <span className="field__hint">{desc.length}/1500</span>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form">
              <div>
                <h2 className="wizard__title">Jak się z Tobą skontaktować?</h2>
                <p className="wizard__sub">Oddzwonimy, żeby potwierdzić termin.</p>
              </div>
              <div className="row2">
                <div className="field">
                  <label htmlFor="name">Imię *</label>
                  <input id="name" className="input" autoComplete="given-name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value.slice(0, 80) })} aria-invalid={!!errors.name} />
                  {errors.name && <span className="err">{errors.name}</span>}
                </div>
                <div className="field">
                  <label htmlFor="phone">Telefon *</label>
                  <input id="phone" className="input" type="tel" inputMode="tel" autoComplete="tel" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value.slice(0, 20) })} placeholder="np. 600 000 000" aria-invalid={!!errors.phone} />
                  {errors.phone && <span className="err">{errors.phone}</span>}
                </div>
              </div>
              <div className="field">
                <label htmlFor="email">E-mail (opcjonalnie)</label>
                <input id="email" className="input" type="email" autoComplete="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value.slice(0, 120) })} aria-invalid={!!errors.email} />
                {errors.email && <span className="err">{errors.email}</span>}
              </div>
              <div className="hp" aria-hidden="true">
                <label htmlFor="website">Strona www</label>
                <input id="website" tabIndex={-1} autoComplete="off" value={contact.website} onChange={(e) => setContact({ ...contact, website: e.target.value })} />
              </div>
              <label className="consent">
                <input type="checkbox" checked={contact.consent} onChange={(e) => setContact({ ...contact, consent: e.target.checked })} />
                <span>
                  Wyrażam zgodę na kontakt w sprawie rezerwacji. Dane przetwarzamy wyłącznie w tym celu —{" "}
                  <Link href="/polityka-prywatnosci" target="_blank">polityka prywatności</Link>.
                </span>
              </label>
              {errors.consent && <span className="err">{errors.consent}</span>}
            </div>
          )}
        </div>

        <div className="wizard__nav">
          <button type="button" className="btn btn--ghost" onClick={back} disabled={step === 0}>
            Wstecz
          </button>
          {step < 3 ? (
            <button type="button" className="btn btn--primary" onClick={next}>
              Dalej <Icon name="arrow" size={18} />
            </button>
          ) : (
            <button type="button" className="btn btn--primary" onClick={send} disabled={sending}>
              {sending ? "Wysyłanie…" : "Wyślij rezerwację"} <Icon name="check" size={18} />
            </button>
          )}
        </div>
      </div>

      <aside className="aside">
        <div className="box">
          <p className="box__h">Podsumowanie</p>
          <div className="summary">
            <div className="summary__row">
              <span>Usługa</span>
              <span>{svcNames}</span>
            </div>
            <div className="summary__row">
              <span>Termin</span>
              <span>{day ? `${day.label}${slot ? `, ${slot}` : ""}` : "—"}</span>
            </div>
            <div className="summary__row">
              <span>Auto</span>
              <span>{[car.make, car.model, car.year].filter(Boolean).join(" ") || "—"}</span>
            </div>
            <div className="summary__row">
              <span>Kontakt</span>
              <span>{contact.name || "—"}</span>
            </div>
          </div>
        </div>
        <div className="box">
          <p className="box__h">Wolisz zadzwonić?</p>
          <a href={company.phoneHref} className="footer__phone" style={{ display: "block", marginBottom: 6 }}>
            {company.phone}
          </a>
          <p className="muted small">Pn–Pt 8:00–16:00 · {company.street}</p>
        </div>
      </aside>
    </div>
  );
}
