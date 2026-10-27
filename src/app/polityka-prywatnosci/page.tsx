import type { Metadata } from "next";
import { PageHero } from "@/components/Blocks";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Zasady przetwarzania danych osobowych przez Auto Expert w Gorzowie Wielkopolskim.",
  alternates: { canonical: "/polityka-prywatnosci" },
  robots: { index: false, follow: true },
};

export default function PolitykaPage() {
  return (
    <>
      <PageHero
        eyebrow="Dokumenty"
        title="Polityka prywatności."
        crumbs={[{ href: "/polityka-prywatnosci", label: "Polityka prywatności" }]}
      />
      <section className="section">
        <div className="container">
          <div className="prose">
            <h2>1. Administrator danych</h2>
            <p>
              Administratorem danych osobowych jest {company.name}, {company.street}, {company.postalCode}{" "}
              {company.city}, tel. {company.phone}, e-mail: {company.email}.
            </p>
            <h2>2. Jakie dane i w jakim celu</h2>
            <p>
              Przetwarzamy dane podane w formularzu rezerwacji lub kontaktowym (imię, numer telefonu, adres e-mail,
              dane samochodu i opis usterki) wyłącznie w celu obsługi zgłoszenia: kontaktu, potwierdzenia terminu i
              przygotowania wizyty.
            </p>
            <h2>3. Podstawa prawna</h2>
            <p>
              Podstawą przetwarzania jest Twoja zgoda oraz działania zmierzające do zawarcia umowy na Twoje żądanie
              (art. 6 ust. 1 lit. a i b RODO).
            </p>
            <h2>4. Odbiorcy danych</h2>
            <p>
              Dane mogą być przekazywane podmiotom świadczącym nam usługi techniczne — hostingu strony oraz wysyłki
              wiadomości e-mail — wyłącznie w zakresie niezbędnym do działania formularzy.
            </p>
            <h2>5. Okres przechowywania</h2>
            <p>
              Dane przechowujemy do czasu obsługi zgłoszenia, a następnie przez okres wymagany przepisami prawa lub do
              czasu wycofania zgody.
            </p>
            <h2>6. Twoje prawa</h2>
            <ul>
              <li>dostęp do danych i otrzymanie ich kopii,</li>
              <li>sprostowanie, usunięcie lub ograniczenie przetwarzania,</li>
              <li>wycofanie zgody w dowolnym momencie,</li>
              <li>wniesienie skargi do Prezesa UODO.</li>
            </ul>
            <h2>7. Pliki cookies i mapa</h2>
            <p>
              Strona nie używa plików cookies śledzących ani narzędzi analitycznych firm trzecich. Mapa Google ładuje
              się dopiero po kliknięciu przycisku „Pokaż mapę” — od tego momentu obowiązuje polityka prywatności
              Google.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
