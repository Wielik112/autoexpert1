"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { company } from "@/content/site";
import { submitForm, type SubmitResult } from "@/lib/submit";
import { Icon } from "./Icon";

export function ContactForm() {
  const started = useRef(Date.now());
  const [f, setF] = useState({ name: "", phone: "", email: "", message: "", consent: false, website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 2) er.name = "Podaj imię.";
    if (!f.phone.trim() && !f.email.trim()) er.phone = "Podaj telefon lub e-mail.";
    if (f.phone && !/^[+\d][\d\s-]{7,}$/.test(f.phone.trim())) er.phone = "Niepoprawny numer telefonu.";
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) er.email = "Niepoprawny e-mail.";
    if (f.message.trim().length < 5) er.message = "Napisz kilka słów.";
    if (!f.consent) er.consent = "Zaznacz zgodę na kontakt.";
    setErrors(er);
    if (Object.keys(er).length) return;
    setSending(true);
    const r = await submitForm({ kind: "contact", ...f, elapsed: Date.now() - started.current });
    setSending(false);
    setResult(r);
  };

  if (result?.ok) {
    return (
      <div className="success">
        <span className="success__icon">
          <Icon name="check" size={40} />
        </span>
        <h3 className="wizard__title">Wiadomość wysłana</h3>
        <p className="muted">Odezwiemy się najszybciej, jak to możliwe — zwykle tego samego dnia roboczego.</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {result && !result.ok && (
        <p className="notice" role="alert">
          Nie udało się wysłać wiadomości automatycznie. Zadzwoń pod{" "}
          <a href={company.phoneHref}><strong>{company.phone}</strong></a> lub napisz na{" "}
          <a href={`mailto:${company.email}?subject=${encodeURIComponent("Zapytanie ze strony")}&body=${encodeURIComponent(f.message)}`}>
            <strong>{company.email}</strong>
          </a>
          .
        </p>
      )}
      <div className="row2">
        <div className="field">
          <label htmlFor="c-name">Imię *</label>
          <input id="c-name" className="input" autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value.slice(0, 80) })} aria-invalid={!!errors.name} />
          {errors.name && <span className="err">{errors.name}</span>}
        </div>
        <div className="field">
          <label htmlFor="c-phone">Telefon</label>
          <input id="c-phone" className="input" type="tel" autoComplete="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value.slice(0, 20) })} aria-invalid={!!errors.phone} />
          {errors.phone && <span className="err">{errors.phone}</span>}
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-email">E-mail</label>
        <input id="c-email" className="input" type="email" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value.slice(0, 120) })} aria-invalid={!!errors.email} />
        {errors.email && <span className="err">{errors.email}</span>}
      </div>
      <div className="field">
        <label htmlFor="c-msg">Wiadomość *</label>
        <textarea id="c-msg" className="textarea" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value.slice(0, 2000) })} placeholder="W czym możemy pomóc?" aria-invalid={!!errors.message} />
        {errors.message && <span className="err">{errors.message}</span>}
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="c-website">Strona www</label>
        <input id="c-website" tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => setF({ ...f, website: e.target.value })} />
      </div>
      <label className="consent">
        <input type="checkbox" checked={f.consent} onChange={(e) => setF({ ...f, consent: e.target.checked })} />
        <span>
          Wyrażam zgodę na kontakt w sprawie mojego zapytania —{" "}
          <Link href="/polityka-prywatnosci" target="_blank">polityka prywatności</Link>.
        </span>
      </label>
      {errors.consent && <span className="err">{errors.consent}</span>}
      <button type="submit" className="btn btn--primary btn--lg" disabled={sending}>
        {sending ? "Wysyłanie…" : "Wyślij wiadomość"} <Icon name="arrow" size={18} />
      </button>
    </form>
  );
}
