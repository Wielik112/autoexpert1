import Link from "next/link";
import { company } from "@/content/site";
import { Icon } from "./Icon";

/** Nagłówek podstrony z okruszkami */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs = [],
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs?: { href: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="phero">
      <div className="phero__grid" aria-hidden="true" />
      <div className="container phero__inner">
        <nav aria-label="Okruszki" className="crumbs">
          <ol>
            <li><Link href="/">Start</Link></li>
            {crumbs.map((c) => (
              <li key={c.href}>
                <Link href={c.href}>{c.label}</Link>
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="phero__title">{title}</h1>
        {lead ? <p className="phero__lead">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}

export function SectionHead({
  index,
  eyebrow,
  title,
  lead,
  action,
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="shead" data-reveal>
      <div>
        <p className="eyebrow">
          {index ? <span className="eyebrow__idx">{index}</span> : null}
          {eyebrow}
        </p>
        <h2 className="shead__title">{title}</h2>
        {lead ? <p className="shead__lead">{lead}</p> : null}
      </div>
      {action ? <div className="shead__action">{action}</div> : null}
    </div>
  );
}

export function CtaBand({
  title = "Umów wizytę w kilka chwil.",
  text = "Wybierz usługę i dogodny termin online albo po prostu zadzwoń. Oddzwonimy i potwierdzimy wizytę.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta__box" data-reveal>
          <div className="cta__scan" aria-hidden="true" />
          <div className="cta__text">
            <p className="eyebrow eyebrow--light">Rezerwacja · Pn–Pt 8:00–16:00</p>
            <h2 className="cta__title">{title}</h2>
            <p className="cta__lead">{text}</p>
          </div>
          <div className="cta__actions">
            <Link href="/rezerwacja" className="btn btn--light btn--lg">
              <Icon name="calendar" /> Zarezerwuj termin
            </Link>
            <a href={company.phoneHref} className="btn btn--outline-light btn--lg">
              <Icon name="phone" /> {company.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Stars({ value = 5, size = 16 }: { value?: number; size?: number }) {
  return (
    <span className="stars" aria-label={`Ocena ${value} na 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" size={size} className={i < Math.round(value) ? "on" : "off"} />
      ))}
    </span>
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function MobileBar() {
  return (
    <div className="mbar" role="region" aria-label="Szybki kontakt">
      <a href={company.phoneHref} className="mbar__btn">
        <Icon name="phone" size={18} /> Zadzwoń
      </a>
      <Link href="/rezerwacja" className="mbar__btn mbar__btn--primary">
        <Icon name="calendar" size={18} /> Umów wizytę
      </Link>
    </div>
  );
}
