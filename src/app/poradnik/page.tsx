import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/Blocks";
import { ArticlesGrid } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Poradnik kierowcy – porady mechanika",
  description:
    "Praktyczne porady mechanika z Gorzowa: przygotowanie auta do zimy, kontrolka check engine, wymiana opon, profilaktyka. Poradnik Auto Expert.",
  alternates: { canonical: "/poradnik" },
};

export default function PoradnikPage() {
  return (
    <>
      <PageHero
        eyebrow="Poradnik"
        title="Porady prosto z warsztatu."
        lead="Krótko, konkretnie i bez żargonu. Wiedza, dzięki której zaoszczędzisz pieniądze i nerwy."
        crumbs={[{ href: "/poradnik", label: "Poradnik" }]}
      />
      <section className="section">
        <div className="container">
          <ArticlesGrid />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
