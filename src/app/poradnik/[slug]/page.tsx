import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, JsonLd, PageHero, SectionHead } from "@/components/Blocks";
import { Icon } from "@/components/Icon";
import { ArticleCard } from "@/components/Sections";
import { articles, company } from "@/content/site";
import { img } from "@/lib/images";
import { siteUrl } from "@/lib/site-url";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: `/poradnik/${a.slug}` },
    openGraph: { type: "article", title: a.title, description: a.excerpt, publishedTime: a.date, url: `/poradnik/${a.slug}` },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();
  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 3);
  const date = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" }).format(new Date(a.date));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: a.title,
          description: a.excerpt,
          datePublished: a.date,
          author: { "@type": "Organization", name: company.name },
          publisher: { "@id": `${siteUrl}/#warsztat` },
          mainEntityOfPage: `${siteUrl}/poradnik/${a.slug}`,
          inLanguage: "pl-PL",
        }}
      />
      <PageHero
        eyebrow={`Poradnik · ${date} · ${a.readMinutes} min`}
        title={<span style={{ fontSize: "0.72em", display: "block", maxWidth: "22ch" }}>{a.title}</span>}
        lead={a.excerpt}
        crumbs={[
          { href: "/poradnik", label: "Poradnik" },
          { href: `/poradnik/${a.slug}`, label: a.title.length > 40 ? a.title.slice(0, 40) + "…" : a.title },
        ]}
      />
      <section className="section">
        <div className="container detail">
          <article>
            <div className="media" style={{ aspectRatio: "16 / 9", marginBottom: 40 }}>
              <Image src={img(a.image)} alt="" fill sizes="(max-width: 960px) 100vw, 760px" placeholder="blur" priority />
            </div>
            <div className="prose">
              {a.body.map((b, i) =>
                b.h ? (
                  <h2 key={i}>{b.h}</h2>
                ) : b.list ? (
                  <ul key={i}>
                    {b.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={i}>{b.p}</p>
                )
              )}
            </div>
          </article>
          <aside className="aside">
            <div className="box box--red">
              <p className="box__h">Masz pytanie?</p>
              <p style={{ fontWeight: 800, fontSize: "1.4rem", lineHeight: 1.15, marginBottom: 16 }}>
                Sprawdzimy Twoje auto.
              </p>
              <div style={{ display: "grid", gap: 10 }}>
                <Link href="/rezerwacja" className="btn btn--light btn--block">
                  <Icon name="calendar" size={18} /> Umów wizytę
                </Link>
                <a href={company.phoneHref} className="btn btn--outline-light btn--block">
                  <Icon name="phone" size={18} /> {company.phone}
                </a>
              </div>
            </div>
            <Link href="/poradnik" className="link-arrow" style={{ padding: "8px 4px" }}>
              ← Wszystkie artykuły
            </Link>
          </aside>
        </div>
      </section>
      <section className="section section--alt">
        <div className="container">
          <SectionHead eyebrow="Czytaj dalej" title="Więcej porad" />
          <div className="agrid">
            {more.map((m, i) => (
              <ArticleCard key={m.slug} a={m} i={i} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
