import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, JsonLd, PageHero, SectionHead } from "@/components/Blocks";
import { Icon } from "@/components/Icon";
import { Faq, ServicesGrid } from "@/components/Sections";
import { company, services } from "@/content/site";
import { img } from "@/lib/images";
import { siteUrl } from "@/lib/site-url";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: `${s.name} Gorzów Wielkopolski`,
    description: `${s.lead} Auto Expert, ul. Koniawska 22, Gorzów Wlkp. Tel. ${company.phone}.`,
    alternates: { canonical: `/uslugi/${s.slug}` },
    openGraph: { title: `${s.name} – Auto Expert Gorzów Wlkp.`, description: s.short, url: `/uslugi/${s.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 4);

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.name,
      serviceType: s.name,
      description: s.lead,
      areaServed: "Gorzów Wielkopolski",
      provider: { "@id": `${siteUrl}/#warsztat` },
      url: `${siteUrl}/uslugi/${s.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: s.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Usługi", item: `${siteUrl}/uslugi` },
        { "@type": "ListItem", position: 3, name: s.name, item: `${siteUrl}/uslugi/${s.slug}` },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={ld} />
      <PageHero
        eyebrow={`Usługa · ${s.priceFrom ? `od ${s.priceFrom}` : "wycena indywidualna"}`}
        title={s.name}
        lead={s.lead}
        crumbs={[
          { href: "/uslugi", label: "Usługi" },
          { href: `/uslugi/${s.slug}`, label: s.name },
        ]}
      >
        <div className="hero__cta">
          <Link href={`/rezerwacja?usluga=${s.slug}`} className="btn btn--primary btn--lg">
            <Icon name="calendar" /> Zarezerwuj: {s.name.toLowerCase()}
          </Link>
          <a href={company.phoneHref} className="btn btn--ghost btn--lg">
            <Icon name="phone" /> {company.phone}
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container detail">
          <div>
            <div className="media" style={{ aspectRatio: "16 / 9", marginBottom: 40 }} data-reveal>
              <Image src={img(s.image)} alt={s.name} fill sizes="(max-width: 960px) 100vw, 760px" placeholder="blur" />
              <span className="media__tag">{s.name}</span>
            </div>
            <div className="prose" data-reveal>
              {s.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <h2>Kiedy przyjechać?</h2>
              <ul>
                {s.symptoms.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <h2>Co obejmuje usługa</h2>
            </div>
            <ul className="checklist" data-reveal>
              {s.includes.map((x) => (
                <li key={x}>
                  <Icon name="check" /> {x}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 64 }}>
              <SectionHead eyebrow="Pytania" title="Najczęstsze pytania" />
              <Faq items={s.faq} />
            </div>
          </div>

          <aside className="aside">
            <div className="box">
              <p className="box__h">Cennik</p>
              <div className="summary summary--prices">
                {s.prices.map((p) => (
                  <div className="summary__row" key={p.name}>
                    <span>{p.name}</span>
                    <span>{p.price}</span>
                  </div>
                ))}
              </div>
              <p className="small muted" style={{ marginTop: 14 }}>
                Dokładną wycenę podajemy przed naprawą — zależy od modelu auta i części.
              </p>
            </div>
            <div className="box box--red">
              <p className="box__h">Umów wizytę</p>
              <p style={{ fontWeight: 800, fontSize: "1.5rem", lineHeight: 1.1, marginBottom: 16, fontStretch: "115%" }}>
                Termin w kilka chwil.
              </p>
              <div style={{ display: "grid", gap: 10 }}>
                <Link href={`/rezerwacja?usluga=${s.slug}`} className="btn btn--light btn--block">
                  <Icon name="calendar" size={18} /> Rezerwacja online
                </Link>
                <a href={company.phoneHref} className="btn btn--outline-light btn--block">
                  <Icon name="phone" size={18} /> {company.phone}
                </a>
              </div>
            </div>
            <div className="box">
              <p className="box__h">Godziny</p>
              <p>
                Pn–Pt <strong>8:00–16:00</strong>
              </p>
              <p className="muted small">{company.street}, Gorzów Wlkp.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionHead eyebrow="Zobacz też" title="Inne usługi" />
          <ServicesGrid items={others} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
