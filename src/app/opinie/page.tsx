import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/Blocks";
import { Icon } from "@/components/Icon";
import { RatingBox, ReviewCards } from "@/components/Sections";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: "Opinie klientów – 4,8/5 w Google",
  description: `Auto Expert Gorzów Wlkp. – średnia ocena 4,8/5 na podstawie ${company.rating.count} opinii w Google. Sprawdź, co mówią nasi klienci.`,
  alternates: { canonical: "/opinie" },
};

export default function OpiniePage() {
  return (
    <>
      <PageHero
        eyebrow="Opinie"
        title="Co mówią o nas kierowcy."
        lead={`Średnia 4,8/5 na podstawie ${company.rating.count} opinii w Google. Poniżej kilka z nich — pełną listę znajdziesz na naszym profilu.`}
        crumbs={[{ href: "/opinie", label: "Opinie" }]}
      />
      <section className="section">
        <div className="container">
          <div className="reviews">
            <RatingBox />
            <div style={{ display: "grid", gap: 24 }}>
              <ReviewCards />
              <div className="box" data-reveal>
                <p className="box__h">Byłeś u nas?</p>
                <p style={{ marginBottom: 18 }}>
                  Twoja opinia pomaga innym kierowcom wybrać dobry warsztat — i pomaga nam być jeszcze lepszymi.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  <a href={company.links.googleReviews} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                    <Icon name="google" size={18} /> Wystaw opinię w Google
                  </a>
                  <a href={company.links.facebook} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                    <Icon name="facebook" size={18} /> Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
