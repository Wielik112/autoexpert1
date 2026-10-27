import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/Blocks";
import { BookingForm } from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Rezerwacja online – umów wizytę u mechanika",
  description:
    "Umów wizytę w warsztacie Auto Expert w Gorzowie Wlkp. online: wybierz usługę, dzień i godzinę. Potwierdzimy termin telefonicznie.",
  alternates: { canonical: "/rezerwacja" },
};

export default function RezerwacjaPage() {
  return (
    <>
      <PageHero
        eyebrow="Rezerwacja online · 4 kroki · ok. 1 minuta"
        title="Umów wizytę."
        lead="Wybierz usługę i preferowany termin. Oddzwonimy, żeby go potwierdzić — zwykle tego samego dnia roboczego."
        crumbs={[{ href: "/rezerwacja", label: "Rezerwacja" }]}
      />
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container">
          <Suspense fallback={<div className="wizard__card" style={{ minHeight: 560 }} />}>
            <BookingForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
