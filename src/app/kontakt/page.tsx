import type { Metadata } from "next";
import { PageHero } from "@/components/Blocks";
import { ContactForm } from "@/components/ContactForm";
import { Location } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Kontakt i dojazd – ul. Koniawska 22, Gorzów Wlkp.",
  description:
    "Auto Expert, ul. Koniawska 22, 66-400 Gorzów Wielkopolski. Tel. 600 249 761, e-mail autoexpert.gorzow@gmail.com. Pn–Pt 8:00–16:00.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Porozmawiajmy o Twoim aucie."
        lead="Najszybciej telefonicznie. Możesz też napisać wiadomość albo po prostu przyjechać w godzinach otwarcia."
        crumbs={[{ href: "/kontakt", label: "Kontakt" }]}
      />
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="container" style={{ display: "grid", gap: 56 }}>
          <Location />
          <div className="split split--top">
            <div>
              <p className="eyebrow">Formularz</p>
              <h2 className="shead__title">Napisz do nas.</h2>
              <p className="shead__lead">
                Zapytaj o wycenę, termin lub cokolwiek innego. Chcesz od razu zarezerwować wizytę? Skorzystaj z
                rezerwacji online.
              </p>
            </div>
            <div className="box">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
