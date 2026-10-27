import type { Metadata } from "next";
import { CtaBand, PageHero, SectionHead } from "@/components/Blocks";
import { ServicesGrid } from "@/components/Sections";
import { SymptomChecker } from "@/components/SymptomChecker";

export const metadata: Metadata = {
  title: "Usługi warsztatowe – mechanik, klimatyzacja, diagnostyka",
  description:
    "Pełna oferta Auto Expert w Gorzowie Wlkp.: diagnostyka komputerowa, mechanika, serwis klimatyzacji, hamulce, wymiana oleju, rozrządu i opon, układ kierowniczy.",
  alternates: { canonical: "/uslugi" },
};

export default function UslugiPage() {
  return (
    <>
      <PageHero
        eyebrow="Usługi"
        title="Kompleksowy serwis w jednym miejscu."
        lead="Osiem specjalizacji, jeden zespół i jedna zasada: najpierw rzetelna diagnoza, potem uczciwa naprawa."
        crumbs={[{ href: "/uslugi", label: "Usługi" }]}
      />
      <section className="section">
        <div className="container">
          <ServicesGrid />
        </div>
      </section>
      <section className="section section--alt">
        <div className="container">
          <SectionHead
            eyebrow="Samodiagnoza"
            title="Nie wiesz, którą usługę wybrać?"
            lead="Zaznacz objaw — podpowiemy, od czego zacząć."
          />
          <SymptomChecker />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
