import type { Metadata } from "next";
import { CtaBand, JsonLd, PageHero } from "@/components/Blocks";
import { Faq } from "@/components/Sections";
import { faq, services } from "@/content/site";

export const metadata: Metadata = {
  title: "Pytania i odpowiedzi (FAQ)",
  description: "Najczęstsze pytania klientów warsztatu Auto Expert w Gorzowie Wlkp. – rezerwacja, ceny, godziny, naprawy.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const all = [...faq, ...services.flatMap((s) => s.faq)];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: all.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <PageHero
        eyebrow="FAQ"
        title="Pytania i odpowiedzi."
        lead="Zebraliśmy odpowiedzi na pytania, które słyszymy najczęściej."
        crumbs={[{ href: "/faq", label: "FAQ" }]}
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 960 }}>
          <Faq items={all} />
        </div>
      </section>
      <CtaBand title="Nie znalazłeś odpowiedzi?" text="Zadzwoń — odpowiemy na każde pytanie o Twoje auto." />
    </>
  );
}
