import Image from "next/image";
import Link from "next/link";
import { articles, company, faq as faqData, reviews, services, type Article, type Service } from "@/content/site";
import { img } from "@/lib/images";
import { Icon } from "./Icon";
import { Stars } from "./Blocks";
import { Spotlight } from "./Spotlight";
import { HoursTable } from "./HoursTable";
import { MapEmbed } from "./MapEmbed";
import { OpenStatus } from "./OpenStatus";

export function ServicesGrid({ items = services }: { items?: Service[] }) {
  return (
    <Spotlight className="sgrid">
      {items.map((s, i) => (
        <article key={s.slug} className="scard" data-reveal style={{ ["--d" as string]: `${(i % 4) * 0.06}s` }}>
          <div className="scard__top">
            <span className="scard__icon">
              <Icon name={s.icon} size={26} />
            </span>
            <span className="scard__idx">{String(i + 1).padStart(2, "0")}</span>
          </div>
          <h3 className="scard__name">
            <Link href={`/uslugi/${s.slug}`} className="scard__link">
              {s.name}
            </Link>
          </h3>
          <p className="scard__text">{s.short}</p>
          <div className="scard__foot">
            <span className="scard__price">
              {s.priceFrom ? (
                <>
                  od <b>{s.priceFrom}</b>
                </>
              ) : (
                "wycena indywidualna"
              )}
            </span>
            <span className="scard__go" aria-hidden="true">
              <Icon name="arrow" size={16} />
            </span>
          </div>
        </article>
      ))}
    </Spotlight>
  );
}

export function Marquee() {
  const items = [
    "Diagnostyka komputerowa",
    "Wymiana rozrządu",
    "Serwis klimatyzacji",
    "Hamulce",
    "Wymiana opon",
    "Wymiana oleju",
    "Mechanika ogólna",
    "Układ kierowniczy",
  ];
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row.map((t, i) => (
          <span className="marquee__item" key={i}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ReviewCards() {
  return (
    <div className="rlist">
      {reviews.map((r, i) => (
        <figure key={r.author} className="rcard" data-reveal style={{ ["--d" as string]: `${i * 0.08}s` }}>
          <Stars value={r.rating} />
          <blockquote>{r.text}</blockquote>
          <figcaption>
            <span className="rcard__avatar" aria-hidden="true">
              {r.author[0]}
            </span>
            <div>
              <strong>{r.author}</strong>
              <span>{r.when}</span>
            </div>
            <span className="rcard__src" title="Opinia z Google">
              <Icon name="google" size={18} />
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function RatingBox() {
  return (
    <div className="rating" data-reveal>
      <div className="rating__v">
        {company.rating.value.toString().replace(".", ",")}
        <small>/5</small>
      </div>
      <Stars value={5} size={22} />
      <p>
        Średnia ocena na podstawie <strong>{company.rating.count} opinii</strong> klientów w Google.
      </p>
      <a href={company.links.googleReviews} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--block">
        <Icon name="google" size={18} /> Zobacz wszystkie opinie
      </a>
    </div>
  );
}

const fmtDate = (d: string) =>
  new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" }).format(new Date(d));

export function ArticleCard({ a, i = 0 }: { a: Article; i?: number }) {
  return (
    <article className="acard" data-reveal style={{ ["--d" as string]: `${i * 0.08}s` }}>
      <div className="acard__img">
        <Image src={img(a.image)} alt="" sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 400px" placeholder="blur" />
      </div>
      <div className="acard__body">
        <p className="acard__meta">
          <time dateTime={a.date}>{fmtDate(a.date)}</time> · {a.readMinutes} min czytania
        </p>
        <h3 className="acard__title">
          <Link href={`/poradnik/${a.slug}`}>{a.title}</Link>
        </h3>
        <p className="acard__ex">{a.excerpt}</p>
      </div>
    </article>
  );
}

export function ArticlesGrid({ limit }: { limit?: number }) {
  const list = [...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
  return (
    <div className="agrid">
      {list.map((a, i) => (
        <ArticleCard key={a.slug} a={a} i={i} />
      ))}
    </div>
  );
}

export function Faq({ items = faqData }: { items?: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f, i) => (
        <details key={f.q} data-reveal style={{ ["--d" as string]: `${Math.min(i, 5) * 0.04}s` }}>
          <summary>
            {f.q}
            <span className="faq__plus" aria-hidden="true" />
          </summary>
          <p className="faq__a">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Location() {
  return (
    <div className="loc" data-reveal>
      <div className="loc__info">
        <div>
          <p className="eyebrow">Dojazd</p>
          <p className="loc__addr">
            Koniawska 22
            <br />
            <span className="red">Gorzów Wlkp.</span>
          </p>
        </div>
        <OpenStatus variant="big" />
        <ul className="loc__list">
          <li>
            <Icon name="phone" />
            <a href={company.phoneHref}>
              <strong>{company.phone}</strong>
            </a>
          </li>
          <li>
            <Icon name="mail" />
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </li>
          <li>
            <Icon name="pin" />
            <span>
              {company.street}, {company.postalCode} {company.city}
            </span>
          </li>
        </ul>
        <HoursTable />
        <div className="loc__actions">
          <a href={company.links.directions} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
            <Icon name="pin" size={18} /> Prowadź do warsztatu
          </a>
          <a href={company.phoneHref} className="btn btn--ghost">
            <Icon name="phone" size={18} /> Zadzwoń
          </a>
        </div>
      </div>
      <MapEmbed />
    </div>
  );
}
