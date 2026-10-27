import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/Blocks";
import { Icon } from "@/components/Icon";
import { company, priceList } from "@/content/site";

export const metadata: Metadata = {
  title: "Cennik usług – mechanik Gorzów Wielkopolski",
  description:
    "Cennik Auto Expert Gorzów Wlkp.: wymiana klocków hamulcowych 80 zł, napełnianie klimatyzacji 50 zł, sprawdzenie szczelności 100 zł, wymiana maglownicy 600–800 zł.",
  alternates: { canonical: "/cennik" },
};

export default function CennikPage() {
  return (
    <>
      <PageHero
        eyebrow="Cennik"
        title="Jasne ceny, bez niespodzianek."
        lead="Poniżej orientacyjne ceny wybranych usług. Ostateczny koszt zależy od modelu auta i zakresu prac — dokładną wycenę zawsze podajemy przed rozpoczęciem naprawy."
        crumbs={[{ href: "/cennik", label: "Cennik" }]}
      />
      <section className="section">
        <div className="container detail">
          <div style={{ display: "grid", gap: 20 }}>
            {priceList.map((cat) => (
              <div className="ptable" key={cat.category} data-reveal>
                <div className="ptable__cat">{cat.category}</div>
                {cat.items.map((it) => (
                  <div className="ptable__row" key={it.name}>
                    <span className="ptable__name">{it.name}</span>
                    <span className="ptable__dots" aria-hidden="true" />
                    <span className={`ptable__price ${/\d/.test(it.price) ? "is-num" : ""}`}>{it.price}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <aside className="aside">
            <div className="box">
              <p className="box__h">Jak liczymy</p>
              <ul className="checklist">
                <li>
                  <Icon name="check" /> Wycena przed naprawą
                </li>
                <li>
                  <Icon name="check" /> Naprawa po Twojej akceptacji
                </li>
                <li>
                  <Icon name="check" /> Wymienione części do wglądu
                </li>
                <li>
                  <Icon name="check" /> Bez ukrytych kosztów
                </li>
              </ul>
            </div>
            <div className="box box--red">
              <p className="box__h">Wycena</p>
              <p style={{ fontWeight: 800, fontSize: "1.4rem", lineHeight: 1.15, marginBottom: 16 }}>
                Nie ma Twojej usługi w cenniku?
              </p>
              <div style={{ display: "grid", gap: 10 }}>
                <a href={company.phoneHref} className="btn btn--light btn--block">
                  <Icon name="phone" size={18} /> Zapytaj: {company.phone}
                </a>
                <Link href="/rezerwacja" className="btn btn--outline-light btn--block">
                  Wyślij zapytanie online
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
