import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, PageHero, SectionHead } from "@/components/Blocks";
import { Icon } from "@/components/Icon";
import { company, process, values } from "@/content/site";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "O nas – warsztat Auto Expert w Gorzowie",
  description:
    "Poznaj Auto Expert – lokalny warsztat samochodowy przy ul. Koniawskiej 22 w Gorzowie Wlkp. Uczciwie, rzetelnie, lokalnie. Ocena 4,8/5 w Google.",
  alternates: { canonical: "/o-nas" },
};

export default function ONasPage() {
  return (
    <>
      <PageHero
        eyebrow="O nas"
        title="Lokalny warsztat z ambicjami."
        lead="Auto Expert to warsztat samochodowy przy ul. Koniawskiej 22 w Gorzowie Wielkopolskim. Działamy według prostej zasady: tak, jak sami chcielibyśmy być obsłużeni."
        crumbs={[{ href: "/o-nas", label: "O nas" }]}
      />

      <section className="section">
        <div className="container split">
          <div className="media" style={{ aspectRatio: "4 / 3" }} data-reveal>
            <Image
              src={images["lukasz-auto-expert"]}
              alt="Pan Łukasz na tle logo Auto Expert"
              fill
              sizes="(max-width: 900px) 100vw, 600px"
              placeholder="blur"
              priority
            />
            <span className="media__tag">Pan Łukasz · Auto Expert</span>
          </div>
          <div className="prose" data-reveal>
            <p className="eyebrow">Kim jesteśmy</p>
            <h2 style={{ marginTop: 0 }}>Twój samochód w dobrych rękach.</h2>
            <p>
              Nazywamy się „prawdopodobnie najlepszym warsztatem w okolicy” — z przymrużeniem oka, ale też z
              przekonaniem. Ocena 4,8/5 na podstawie {company.rating.count} opinii w Google to dla nas zobowiązanie,
              a nie powód do spoczęcia na laurach.
            </p>
            <p>
              Klienci najczęściej doceniają u nas dwie rzeczy: uczciwość i to, że wszystko tłumaczymy prostym
              językiem. Nie musisz znać się na samochodach — wystarczy, że opiszesz objawy. Resztą zajmiemy się my.
            </p>
            <p>
              Pracujemy na profesjonalnym sprzęcie diagnostycznym Hella Gutmann, a zakres naszych usług obejmuje
              diagnostykę, mechanikę, klimatyzację, hamulce, rozrząd, opony i układ kierowniczy.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionHead eyebrow="Nasze wartości" title="Na tym budujemy zaufanie." />
          <div className="pgrid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            {values.map((v, i) => (
              <div key={v.title} className="pcard" data-reveal style={{ ["--d" as string]: `${i * 0.08}s` }}>
                <span className="value__icon" style={{ marginBottom: 10 }}>
                  <Icon name={["shield", "diagnostics", "home"][i]} size={24} />
                </span>
                <span className="pcard__price" style={{ fontSize: "1.7rem", textTransform: "uppercase" }}>
                  {v.title}
                </span>
                <span className="muted">{v.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <SectionHead
              eyebrow="Wyposażenie"
              title="Profesjonalna diagnostyka."
              lead="Tester Hella Gutmann pozwala nam odczytać błędy ze sterowników, analizować parametry pracy silnika na żywo i szybko dotrzeć do źródła usterki."
            />
            <ul className="checklist" data-reveal>
              {process.map((p) => (
                <li key={p.title}>
                  <Icon name="check" />
                  <span>
                    <strong>{p.title}.</strong> <span className="muted">{p.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="media-stack" data-reveal>
            <div className="media">
              <Image src={images["tester-hella-gutmann"]} alt="Tester Hella Gutmann" fill sizes="(max-width: 900px) 60vw, 360px" placeholder="blur" />
            </div>
            <div className="media">
              <Image src={images["baner-warsztat"]} alt="Baner Auto Expert przed warsztatem" fill sizes="280px" placeholder="blur" />
            </div>
            <div className="media">
              <Image src={images["gadzety-auto-expert"]} alt="Gadżety Auto Expert na recepcji" fill sizes="280px" placeholder="blur" />
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Przekonaj się sam." />
    </>
  );
}
