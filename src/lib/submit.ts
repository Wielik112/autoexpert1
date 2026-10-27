export type SubmitResult = { ok: boolean; fallback?: boolean; error?: string };

export async function submitForm(payload: Record<string, unknown>): Promise<SubmitResult> {
  try {
    const r = await fetch("/api/rezerwacja", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const j = (await r.json().catch(() => ({}))) as SubmitResult;
    if (r.ok && j.ok) return { ok: true };
    return { ok: false, fallback: j.fallback ?? true, error: j.error };
  } catch {
    return { ok: false, fallback: true };
  }
}

