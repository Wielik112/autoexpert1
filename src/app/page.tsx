import Image from "next/image";
import Link from "next/link";
import { CtaBand, SectionHead, Stars } from "@/components/Blocks";
import { Icon } from "@/components/Icon";
import { OpenStatus } from "@/components/OpenStatus";
import {
  ArticlesGrid,
  Faq,
  Location,
  Marquee,
  RatingBox,
  ReviewCards,
  ServicesGrid,
} from "@/components/Sections";
import { SymptomChecker } from "@/components/SymptomChecker";
import { company, faq, process, values } from "@/content/site";
import { images } from "@/lib/images";

export default function Home() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <div className="hero__grid" />
          <div className="hero__glow" />
          <div className="hero__glow hero__glow--2" />
        </div>

        <div className="container hero__inner">
          <div className="hero__head">
            <p className="eyebrow fade-up" style={{ ["--d" as string]: "0s" }}>
              Warsztat samochodowy · Gorzów Wielkopolski
            </p>
            <h1 className="hero__title">
              <span className="line">
                <span>Prawdopodobnie</span>
              </span>
              <span className="line">
                <span className="red">najlepszy</span>
              </span>
              <span className="line">
                <span className="accent">warsztat</span>
              </span>
              <span className="line">
                <span>w okolicy.</span>
              </span>
            </h1>
          </div>
          <div className="hero__body">
            <p className="hero__lead fade-up" style={{ ["--d" as string]: "0.35s" }}>
              <strong>Twój samochód w dobrych rękach.</strong> Diagnostyka komputerowa Hella Gutmann, mechanika,
              klimatyzacja, hamulce, rozrząd i opony. Najpierw uczciwa diagnoza i wycena — naprawa dopiero po Twojej
              akceptacji.
            </p>
            <div className="hero__cta fade-up" style={{ ["--d" as string]: "0.45s" }}>
              <Link href="/rezerwacja" className="btn btn--primary btn--lg">
                <Icon name="calendar" /> Umów wizytę online
              </Link>
              <a href={company.phoneHref} className="btn btn--ghost btn--lg">
                <Icon name="phone" /> {company.phone}
              </a>
            </div>
            <div className="hero__trust fade-up" style={{ ["--d" as string]: "0.55s" }}>
              <div className="hero__trust-item">
                <Stars value={5} size={15} />
                <span>
                  <strong>4,8/5</strong> · {company.rating.count} opinii Google
                </span>
              </div>
              <div className="hero__trust-item">
                <Icon name="clock" size={18} />
                <span>
                  <strong>Pn–Pt</strong> 8:00–16:00
                </span>
              </div>
              <div className="hero__trust-item">
                <Icon name="pin" size={18} />
                <span>
                  <strong>Koniawska 22</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Konsola diagnostyczna */}
          <aside className="console" aria-label="Status warsztatu">
            <div className="console__scan" aria-hidden="true" />
            <div className="console__head">
              <span className="console__dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>AE // status warsztatu</span>
            </div>
            <div className="console__body">
              <div className="console__wave" aria-hidden="true">
                <svg viewBox="0 0 800 84" preserveAspectRatio="none">
                  <path
                    d="M0 50 L40 50 L55 50 L62 18 L70 70 L78 42 L90 50 L200 50 L215 50 L222 14 L230 74 L238 40 L250 50 L360 50 L375 50 L382 22 L390 68 L398 44 L410 50 L400 50 L440 50 L455 50 L462 18 L470 70 L478 42 L490 50 L600 50 L615 50 L622 14 L630 74 L638 40 L650 50 L760 50 L775 50 L782 22 L790 68 L798 44 L800 50"
                    fill="none"
                    stroke="#ff3d32"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
              <div className="console__row">
                <span className="console__k">Warsztat</span>
                <span className="console__v">
                  <OpenStatus variant="inline" />
                </span>
              </div>
              <div className="console__row">
                <span className="console__k">Ocena Google</span>
                <span className="console__v">
                  <span className="console__bar" aria-hidden="true">
                    <i />
                  </span>
                  4,8 / 5
                </span>
              </div>
              <div className="console__row">
                <span className="console__k">Opinie klientów</span>
                <span className="console__v">{company.rating.count}</span>
              </div>
              <div className="console__row">
                <span className="console__k">Sprzęt</span>
                <span className="console__v">Hella Gutmann</span>
              </div>
              <div className="console__foot">
                <Link href="/#samodiagnoza">
                  <Icon name="diagnostics" size={16} /> Samodiagnoza
                </Link>
                <Link href="/cennik">
                  <Icon name="book" size={16} /> Cennik
                </Link>
              </div>
            </div>
            <div className="console__photo">
              <Image src={images["lukasz-avatar"]} alt="Pan Łukasz z Auto Expert" width={52} height={52} />
              <p>
                <strong>Pan Łukasz · Auto Expert</strong>
                Klienci w opiniach cenią, że wszystko tłumaczy prosto i zrozumiale.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <Marquee />

      {/* ================= USŁUGI ================= */}
      <section className="section" id="uslugi">
        <div className="container">
          <SectionHead
            index="01 /"
            eyebrow="Usługi"
            title="Wszystko, czego potrzebuje Twoje auto."
            lead="Od szybkiej wymiany klocków po pełną diagnostykę komputerową. Jeden warsztat, jasne zasady, konkretne terminy."
            action={
              <Link href="/uslugi" className="link-arrow">
                Wszystkie usługi <Icon name="arrow" size={18} />
              </Link>
            }
          />
          <ServicesGrid />
        </div>
      </section>

      {/* ================= SAMODIAGNOZA ================= */}
      <section className="section section--alt" id="samodiagnoza">
        <div className="container">
          <SectionHead
            index="02 /"
            eyebrow="Samodiagnoza online"
            title="Coś niepokoi? Sprawdź objaw."
            lead="Wybierz, co zauważasz. Podpowiemy, co może być przyczyną, jak pilna jest sprawa i jaką usługę zarezerwować — w 10 sekund."
          />
          <div data-reveal>
            <SymptomChecker />
          </div>
        </div>
      </section>

      {/* ================= PROCES ================= */}
      <section className="section">
        <div className="container">
          <SectionHead
            index="03 /"
            eyebrow="Jak pracujemy"
            title="Bez niespodzianek na rachunku."
            lead="Prosty proces, w którym zawsze wiesz, co dzieje się z Twoim autem i ile to będzie kosztować."
          />
          <ol className="steps" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {process.map((p, i) => (
              <li key={p.title} className="step" data-reveal style={{ ["--d" as string]: `${i * 0.1}s` }}>
                <div className="step__num">
                  <b>{String(i + 1).padStart(2, "0")}</b>
                </div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= DLACZEGO MY ================= */}
      <section className="section section--alt">
        <div className="container split">
          <div className="media-stack" data-reveal>
            <div className="media">
              <Image
                src={images["tester-hella-gutmann"]}
                alt="Tester diagnostyczny Hella Gutmann w warsztacie Auto Expert"
                fill
                sizes="(max-width: 900px) 60vw, 360px"
                placeholder="blur"
              />
              <span className="media__tag">Hella Gutmann</span>
            </div>
            <div className="media">
              <Image
                src={images["hamulce-tarcza"]}
                alt="Nowa tarcza i zacisk hamulcowy po wymianie"
                fill
                sizes="(max-width: 900px) 40vw, 280px"
                placeholder="blur"
              />
            </div>
            <div className="media">
              <Image
                src={images["gadzety-auto-expert"]}
                alt="Recepcja Auto Expert — miś w koszulce warsztatu"
                fill
                sizes="(max-width: 900px) 40vw, 280px"
                placeholder="blur"
              />
            </div>
          </div>
          <div>
            <SectionHead
              index="04 /"
              eyebrow="Dlaczego Auto Expert"
              title="Uczciwie. Rzetelnie. Lokalnie."
            />
            <div className="values">
              {values.map((v, i) => (
                <div key={v.title} className="value" data-reveal style={{ ["--d" as string]: `${i * 0.08}s` }}>
                  <span className="value__icon">
                    <Icon name={["shield", "diagnostics", "home"][i]} size={24} />
                  </span>
                  <div>
                    <h3>{v.title}</h3>
                    <p>{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATYSTYKI ================= */}
      <section className="section--tight">
        <div className="container">
          <div className="stats" data-reveal>
            <div className="stat">
              <div className="stat__v">
                4,8<small>/5</small>
              </div>
              <div className="stat__k">Ocena w Google</div>
            </div>
            <div className="stat">
              <div className="stat__v">{company.rating.count}</div>
              <div className="stat__k">Opinii klientów</div>
            </div>
            <div className="stat">
              <div className="stat__v">{company.facebookFollowers}</div>
              <div className="stat__k">Obserwujących na FB</div>
            </div>
            <div className="stat">
              <div className="stat__v">8</div>
              <div className="stat__k">Specjalizacji</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OPINIE ================= */}
      <section className="section">
        <div className="container">
          <SectionHead
            index="05 /"
            eyebrow="Opinie klientów"
            title="Nie musisz wierzyć nam na słowo."
            action={
              <Link href="/opinie" className="link-arrow">
                Więcej opinii <Icon name="arrow" size={18} />
              </Link>
            }
          />
          <div className="reviews">
            <RatingBox />
            <ReviewCards />
          </div>
        </div>
      </section>

      {/* ================= CENNIK ================= */}
      <section className="section section--alt">
        <div className="container">
          <SectionHead
            index="06 /"
            eyebrow="Przykładowe ceny"
            title="Jasne ceny. Zero gwiazdek."
            lead="Orientacyjne ceny wybranych usług. Dokładną wycenę zawsze podajemy przed rozpoczęciem pracy."
            action={
              <Link href="/cennik" className="link-arrow">
                Pełny cennik <Icon name="arrow" size={18} />
              </Link>
            }
          />
          <div className="pgrid">
            {[
              ["Wymiana klocków hamulcowych", "80 zł"],
              ["Klimatyzacja – napełnianie", "50 zł"],
              ["Sprawdzenie szczelności klimatyzacji", "100 zł"],
              ["Wymiana maglownicy", "600–800 zł"],
            ].map(([n, p], i) => (
              <div key={n} className="pcard" data-reveal style={{ ["--d" as string]: `${i * 0.06}s` }}>
                <span className="pcard__name">{n}</span>
                <span className="pcard__price">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PORADNIK ================= */}
      <section className="section">
        <div className="container">
          <SectionHead
            index="07 /"
            eyebrow="Poradnik kierowcy"
            title="Wiedza, która oszczędza pieniądze."
            action={
              <Link href="/poradnik" className="link-arrow">
                Wszystkie artykuły <Icon name="arrow" size={18} />
              </Link>
            }
          />
          <ArticlesGrid limit={3} />
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="section section--alt">
        <div className="container split split--top">
          <SectionHead
            index="08 /"
            eyebrow="Pytania i odpowiedzi"
            title="Zanim zadzwonisz."
            lead="Najczęstsze pytania klientów. Nie ma tu Twojego? Zadzwoń — chętnie odpowiemy."
            action={
              <Link href="/faq" className="link-arrow">
                Wszystkie pytania <Icon name="arrow" size={18} />
              </Link>
            }
          />
          <Faq items={faq.slice(0, 5)} />
        </div>
      </section>

      {/* ================= LOKALIZACJA ================= */}
      <section className="section">
        <div className="container">
          <SectionHead index="09 /" eyebrow="Kontakt" title="Wpadnij na Koniawską." />
          <Location />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
