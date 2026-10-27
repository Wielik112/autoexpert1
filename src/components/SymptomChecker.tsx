"use client";

import Link from "next/link";
import { useState } from "react";
import { company, services, symptomsChecker } from "@/content/site";
import { Icon } from "./Icon";

export function SymptomChecker() {
  const [sel, setSel] = useState<string | null>(symptomsChecker[0].id);
  const item = symptomsChecker.find((s) => s.id === sel);
  const svc = item ? services.find((s) => s.slug === item.service) : undefined;
  const code = item ? `AE-${(symptomsChecker.indexOf(item) + 1).toString().padStart(3, "0")}` : "";

  return (
    <div className="checker">
      <div className="checker__list" role="group" aria-label="Wybierz objaw">
        {symptomsChecker.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className="checker__opt"
            aria-pressed={sel === s.id}
            aria-controls="checker-result"
            onClick={() => setSel(s.id)}
          >
            <span className="mono">{String(i + 1).padStart(2, "0")}</span>
            {s.label}
          </button>
        ))}
      </div>

      <div className="checker__panel" id="checker-result" aria-live="polite">
        {item && svc ? (
          <div className="checker__result" key={item.id}>
            <p className="checker__code">Wynik wstępnej analizy · {code}</p>
            <h3 className="checker__title">{item.label}</h3>
            <div className={`urgency urgency--${item.urgency}`}>
              <span className="urgency__bars" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>Pilność: {item.urgency}</span>
            </div>
            <dl className="checker__dl">
              <div>
                <dt>Możliwe przyczyny</dt>
                <dd>{item.causes}</dd>
              </div>
              <div>
                <dt>Nasza rada</dt>
                <dd>{item.advice}</dd>
              </div>
              <div>
                <dt>Polecana usługa</dt>
                <dd>
                  <Link href={`/uslugi/${svc.slug}`} className="link-arrow">
                    {svc.name} <Icon name="arrow" size={16} />
                  </Link>
                </dd>
              </div>
            </dl>
            <div className="checker__actions">
              <Link
                href={`/rezerwacja?usluga=${svc.slug}&objaw=${encodeURIComponent(item.label)}`}
                className="btn btn--primary"
              >
                <Icon name="calendar" size={18} /> Umów z tym objawem
              </Link>
              <a href={company.phoneHref} className="btn btn--ghost">
                <Icon name="phone" size={18} /> Zapytaj telefonicznie
              </a>
            </div>
            <p className="checker__note">
              To orientacyjna podpowiedź, nie diagnoza. Pewność daje dopiero sprawdzenie auta w warsztacie.
            </p>
          </div>
        ) : (
          <div className="checker__empty">
            <Icon name="diagnostics" size={44} />
            <p>
              <strong>Wybierz objaw z listy.</strong>
              <br />
              Podpowiemy, co może być przyczyną, jak pilna jest sprawa i od czego zacząć.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
