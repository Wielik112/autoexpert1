/**
 * ============================================================
 *  AUTO EXPERT — CENTRALNY PLIK TREŚCI
 * ============================================================
 *  Tutaj zmieniasz WSZYSTKIE dane na stronie: telefon, godziny,
 *  usługi, ceny, opinie, FAQ i artykuły poradnika.
 *  Po zapisaniu zmian i wypchnięciu na GitHub, Vercel sam
 *  przebuduje stronę (ok. 1 minuta).
 * ============================================================
 */

export const company = {
  name: "Auto Expert",
  fullName: "Auto Expert – warsztat samochodowy Gorzów Wielkopolski",
  slogan: "Twój samochód w dobrych rękach",
  tagline: "Prawdopodobnie najlepszy warsztat w okolicy…",
  phone: "600 249 761",
  phoneHref: "tel:+48600249761",
  email: "autoexpert.gorzow@gmail.com",
  street: "ul. Koniawska 22",
  postalCode: "66-400",
  city: "Gorzów Wielkopolski",
  region: "lubuskie",
  geo: { lat: 52.7141, lng: 15.2558 },
  owner: "Łukasz",
  rating: { value: 4.8, count: 329 },
  facebookFollowers: 956,
  links: {
    facebook: "https://www.facebook.com/profile.php?id=100057064405466",
    googleMaps:
      "https://www.google.com/maps/search/?api=1&query=Auto+Expert+Koniawska+22+Gorz%C3%B3w+Wielkopolski",
    googleReviews:
      "https://www.google.com/search?q=Auto+Expert+Koniawska+22+Gorz%C3%B3w+Wielkopolski+opinie",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Koniawska+22,+66-400+Gorz%C3%B3w+Wielkopolski",
  },
} as const;

/** Godziny otwarcia. 0 = niedziela, 1 = poniedziałek … 6 = sobota. null = zamknięte */
export const hours: Record<number, { open: string; close: string } | null> = {
  0: null,
  1: { open: "08:00", close: "16:00" },
  2: { open: "08:00", close: "16:00" },
  3: { open: "08:00", close: "16:00" },
  4: { open: "08:00", close: "16:00" },
  5: { open: "08:00", close: "16:00" },
  6: null,
};

export const dayNames = [
  "Niedziela",
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota",
];

export type IconName =
  | "diagnostics"
  | "wrench"
  | "snowflake"
  | "brake"
  | "oil"
  | "timing"
  | "tire"
  | "steering";

export type Service = {
  slug: string;
  icon: IconName;
  name: string;
  short: string;
  priceFrom?: string;
  image: string;
  lead: string;
  description: string[];
  symptoms: string[];
  includes: string[];
  prices: { name: string; price: string }[];
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "diagnostyka-komputerowa",
    icon: "diagnostics",
    name: "Diagnostyka komputerowa",
    short: "Odczyt i analiza błędów testerem Hella Gutmann. Szybko znajdujemy przyczynę, nie tylko objaw.",
    image: "tester-hella-gutmann",
    lead: "Zapaliła się kontrolka? Auto traci moc albo dziwnie się zachowuje? Zaczynamy od rzetelnej diagnozy profesjonalnym testerem Hella Gutmann.",
    description: [
      "Nowoczesny samochód to dziesiątki sterowników, które stale się ze sobą komunikują. Sam kod błędu rzadko mówi całą prawdę — dlatego łączymy odczyt z testera z analizą parametrów na żywo i doświadczeniem mechanika.",
      "Po diagnozie dostajesz jasne wyjaśnienie: co jest nie tak, co trzeba naprawić od razu, a co może poczekać. Bez straszenia i bez naciągania.",
    ],
    symptoms: [
      "Świeci się kontrolka silnika (check engine)",
      "Auto przeszło w tryb awaryjny",
      "Spadek mocy, szarpanie, nierówna praca",
      "Komunikaty o błędach na desce rozdzielczej",
    ],
    includes: [
      "Odczyt kodów błędów ze wszystkich dostępnych sterowników",
      "Analiza parametrów pracy silnika na żywo",
      "Kasowanie błędów i raport po diagnozie",
      "Omówienie wyników i wycena naprawy",
    ],
    prices: [{ name: "Diagnostyka komputerowa", price: "wycena indywidualna" }],
    faq: [
      {
        q: "Czy samo skasowanie błędu rozwiązuje problem?",
        a: "Nie zawsze. Jeśli przyczyna nadal istnieje, błąd wróci. Dlatego najpierw szukamy źródła usterki, a dopiero potem kasujemy pamięć błędów.",
      },
      {
        q: "Jak długo trwa diagnostyka?",
        a: "Podstawowy odczyt to zwykle kilkanaście minut. Przy trudniejszych usterkach potrzebujemy więcej czasu na pomiary i jazdę próbną — zawsze uprzedzamy o tym z góry.",
      },
    ],
  },
  {
    slug: "mechanika-ogolna",
    icon: "wrench",
    name: "Mechanika i naprawy bieżące",
    short: "Zawieszenie, układ wydechowy, sprzęgło, silnik. Naprawiamy porządnie za pierwszym razem.",
    image: "mechanika-silnik",
    lead: "Stuki, wycieki, luzy, hałasy — wszystko, co sprawia, że jazda przestaje być przyjemnością. Naprawiamy porządnie i tłumaczymy, co zostało zrobione.",
    description: [
      "Zajmujemy się bieżącymi naprawami samochodów osobowych: zawieszeniem, układem wydechowym, sprzęgłem, osprzętem silnika i wieloma innymi elementami.",
      "Zanim cokolwiek wymienimy, mówimy, ile to będzie kosztować. Wymienione części możesz obejrzeć — tak, żebyś miał pewność, za co płacisz.",
    ],
    symptoms: [
      "Stuki przy przejeżdżaniu przez nierówności",
      "Ściąganie auta na bok",
      "Plamy pod samochodem",
      "Głośniejsza praca wydechu",
    ],
    includes: [
      "Naprawy zawieszenia i układu wydechowego",
      "Wymiana sprzęgła i elementów napędu",
      "Naprawy osprzętu silnika",
      "Przegląd przed zakupem używanego auta",
    ],
    prices: [{ name: "Naprawy mechaniczne", price: "wycena po diagnozie" }],
    faq: [
      {
        q: "Czy mogę przywieźć własne części?",
        a: "Zadzwoń i zapytaj — ustalimy to indywidualnie. Zwykle polecamy części sprawdzonych producentów, na które możemy dać pewność montażu.",
      },
    ],
  },
  {
    slug: "serwis-klimatyzacji",
    icon: "snowflake",
    name: "Serwis klimatyzacji",
    short: "Napełnianie, sprawdzenie szczelności i odgrzybianie. Chłodno latem, sucho zimą.",
    priceFrom: "50 zł",
    image: "czyszczenie-silnika",
    lead: "Sprawna klimatyzacja to nie tylko chłód latem — zimą osusza powietrze i szybciej odparowuje szyby. Warto serwisować ją raz w roku.",
    description: [
      "Układ klimatyzacji z czasem naturalnie traci czynnik chłodniczy, a w parowniku gromadzą się bakterie i grzyby. Efekt? Słabsze chłodzenie i nieprzyjemny zapach z nawiewów.",
      "Sprawdzamy szczelność układu, uzupełniamy czynnik i dbamy o czystość, żeby powietrze w kabinie było świeże i zdrowe.",
    ],
    symptoms: [
      "Klimatyzacja słabo chłodzi",
      "Nieprzyjemny zapach z nawiewów",
      "Szyby długo parują",
      "Sprężarka głośno pracuje lub się nie załącza",
    ],
    includes: [
      "Napełnianie układu klimatyzacji",
      "Sprawdzenie szczelności",
      "Odgrzybianie i dezynfekcja",
      "Kontrola pracy sprężarki",
    ],
    prices: [
      { name: "Klimatyzacja – napełnianie", price: "50 zł" },
      { name: "Sprawdzenie szczelności klimatyzacji", price: "100 zł" },
    ],
    faq: [
      {
        q: "Jak często serwisować klimatyzację?",
        a: "Zalecamy raz w roku, najlepiej wiosną przed sezonem upałów. Regularny serwis wydłuża życie sprężarki — najdroższego elementu układu.",
      },
    ],
  },
  {
    slug: "uklady-hamulcowe",
    icon: "brake",
    name: "Układy hamulcowe",
    short: "Klocki, tarcze, płyn hamulcowy, zaciski. Bezpieczeństwo bez kompromisów.",
    priceFrom: "80 zł",
    image: "hamulce-tarcza",
    lead: "Hamulce to najważniejszy element bezpieczeństwa w Twoim aucie. Nie warto czekać, aż zaczną piszczeć.",
    description: [
      "Wymieniamy klocki i tarcze hamulcowe, regenerujemy i wymieniamy zaciski, wymieniamy płyn hamulcowy oraz przewody.",
      "Przy każdej wymianie sprawdzamy stan całego układu — tak, żeby po wyjeździe z warsztatu hamulce działały pewnie i równo.",
    ],
    symptoms: [
      "Pisk lub zgrzyt przy hamowaniu",
      "Drgania kierownicy podczas hamowania",
      "Dłuższa droga hamowania",
      "Miękki pedał hamulca",
    ],
    includes: [
      "Wymiana klocków hamulcowych",
      "Wymiana tarcz hamulcowych",
      "Wymiana płynu hamulcowego",
      "Naprawa i wymiana zacisków",
    ],
    prices: [{ name: "Wymiana klocków hamulcowych", price: "80 zł" }],
    faq: [
      {
        q: "Co ile wymieniać płyn hamulcowy?",
        a: "Większość producentów zaleca wymianę co 2 lata. Płyn chłonie wilgoć, przez co traci właściwości — zwłaszcza przy intensywnym hamowaniu.",
      },
    ],
  },
  {
    slug: "wymiana-oleju-przeglady",
    icon: "oil",
    name: "Wymiana oleju i przeglądy",
    short: "Olej, filtry, płyny eksploatacyjne. Regularny serwis to tańsza eksploatacja.",
    image: "wymiana-oleju",
    lead: "Regularna wymiana oleju i filtrów to najtańszy sposób, żeby uniknąć drogich napraw silnika.",
    description: [
      "Dobieramy olej zgodny ze specyfikacją producenta Twojego auta, wymieniamy filtry i sprawdzamy poziom pozostałych płynów.",
      "Przy okazji serwisu robimy szybki przegląd najważniejszych elementów — i mówimy wprost, czy coś wymaga uwagi.",
    ],
    symptoms: [
      "Minął przebieg lub rok od ostatniej wymiany",
      "Kontrolka serwisowa na desce",
      "Ciemny, gęsty olej na bagnecie",
      "Planujesz dłuższą trasę",
    ],
    includes: [
      "Wymiana oleju silnikowego",
      "Wymiana filtrów: oleju, powietrza, kabinowego, paliwa",
      "Kontrola i uzupełnienie płynów",
      "Kasowanie inspekcji serwisowej",
    ],
    prices: [{ name: "Wymiana oleju i filtrów", price: "wycena indywidualna" }],
    faq: [
      {
        q: "Co ile kilometrów wymieniać olej?",
        a: "To zależy od silnika i stylu jazdy. Przy jeździe miejskiej często warto wymieniać olej częściej niż przewiduje maksymalny interwał producenta — doradzimy przy wizycie.",
      },
    ],
  },
  {
    slug: "wymiana-rozrzadu",
    icon: "timing",
    name: "Wymiana rozrządu",
    short: "Pasek lub łańcuch, rolki, pompa wody. Precyzyjnie i zgodnie z zaleceniami producenta.",
    image: "diagnostyka-maska",
    lead: "Zerwany rozrząd może oznaczać poważne uszkodzenie silnika. Wymiana na czas to inwestycja, która się opłaca.",
    description: [
      "Wymieniamy kompletne zestawy rozrządu — pasek lub łańcuch, rolki, napinacze i najczęściej także pompę wody.",
      "Pracujemy zgodnie z procedurami producenta i ustawiamy fazy rozrządu z odpowiednią precyzją.",
    ],
    symptoms: [
      "Zbliża się przebieg wymiany z książki serwisowej",
      "Nie znasz historii auta po zakupie",
      "Grzechotanie przy zimnym starcie (łańcuch)",
      "Wyciek płynu chłodniczego w okolicy pompy",
    ],
    includes: [
      "Wymiana paska lub łańcucha rozrządu",
      "Wymiana rolek i napinaczy",
      "Wymiana pompy wody",
      "Kontrola i ustawienie faz rozrządu",
    ],
    prices: [{ name: "Wymiana rozrządu", price: "wycena indywidualna" }],
    faq: [
      {
        q: "Kupiłem używane auto — czy wymieniać rozrząd?",
        a: "Jeśli nie masz udokumentowanej wymiany, zdecydowanie warto. To jedna z pierwszych rzeczy, które polecamy po zakupie samochodu.",
      },
    ],
  },
  {
    slug: "wymiana-opon",
    icon: "tire",
    name: "Wymiana opon",
    short: "Sezonowa wymiana, wyważanie i kontrola ciśnienia. Gotowy na każdą pogodę.",
    image: "wymiana-opon",
    lead: "Zmiana sezonu to dobry moment na wymianę opon i szybki przegląd auta. Umów się wcześniej i uniknij kolejek.",
    description: [
      "Wymieniamy opony sezonowo, wyważamy koła i sprawdzamy stan ogumienia: głębokość bieżnika, uszkodzenia i wiek opon.",
      "Przy okazji wymiany chętnie zerkniemy na hamulce i zawieszenie — skoro koła i tak są zdjęte.",
    ],
    symptoms: [
      "Temperatura spada poniżej 7°C",
      "Bieżnik jest płytszy niż 4 mm",
      "Drgania kierownicy przy wyższych prędkościach",
      "Nierównomierne zużycie opon",
    ],
    includes: [
      "Wymiana opon i kół",
      "Wyważanie kół",
      "Kontrola ciśnienia i stanu ogumienia",
      "Przy okazji: kontrola hamulców",
    ],
    prices: [{ name: "Wymiana opon", price: "wycena indywidualna" }],
    faq: [
      {
        q: "Kiedy zmienić opony na zimowe?",
        a: "Przyjmuje się, że gdy średnia temperatura dobowa spada poniżej 7°C. Wtedy mieszanka opon letnich twardnieje i traci przyczepność.",
      },
    ],
  },
  {
    slug: "uklad-kierowniczy",
    icon: "steering",
    name: "Układ kierowniczy",
    short: "Maglownica, drążki, końcówki. Precyzja prowadzenia i pewność na drodze.",
    priceFrom: "600 zł",
    image: "baner-warsztat",
    lead: "Luz na kierownicy, stuki przy skręcaniu albo wycieki z maglownicy? Naprawimy układ kierowniczy tak, by auto znów prowadziło się pewnie.",
    description: [
      "Wymieniamy maglownice, drążki i końcówki drążków kierowniczych oraz diagnozujemy wspomaganie.",
      "Precyzyjny układ kierowniczy to nie tylko komfort — to także bezpieczeństwo przy manewrach i na mokrej nawierzchni.",
    ],
    symptoms: [
      "Luz na kierownicy",
      "Stuki przy skręcaniu kół",
      "Ciężko pracujące wspomaganie",
      "Wyciek płynu wspomagania",
    ],
    includes: [
      "Wymiana maglownicy",
      "Wymiana drążków i końcówek",
      "Diagnostyka wspomagania",
      "Kontrola luzów w układzie",
    ],
    prices: [{ name: "Wymiana maglownicy", price: "600–800 zł" }],
    faq: [
      {
        q: "Czy po wymianie elementów układu kierowniczego trzeba ustawić zbieżność?",
        a: "Tak, po wymianie drążków lub końcówek ustawienie geometrii jest konieczne, żeby opony zużywały się równo, a auto jechało prosto.",
      },
    ],
  },
];

export const priceList: { category: string; items: { name: string; price: string }[] }[] = [
  {
    category: "Klimatyzacja",
    items: [
      { name: "Klimatyzacja – napełnianie", price: "50 zł" },
      { name: "Sprawdzenie szczelności klimatyzacji", price: "100 zł" },
    ],
  },
  {
    category: "Hamulce",
    items: [{ name: "Wymiana klocków hamulcowych", price: "80 zł" }],
  },
  {
    category: "Układ kierowniczy",
    items: [{ name: "Wymiana maglownicy", price: "600–800 zł" }],
  },
  {
    category: "Pozostałe usługi",
    items: [
      { name: "Diagnostyka komputerowa", price: "zadzwoń" },
      { name: "Wymiana oleju i filtrów", price: "zadzwoń" },
      { name: "Wymiana rozrządu", price: "wycena indywidualna" },
      { name: "Wymiana opon", price: "zadzwoń" },
      { name: "Naprawy mechaniczne", price: "wycena po diagnozie" },
    ],
  },
];

/** Prawdziwe opinie z profilu Google firmy (fragmenty). Dodawaj tylko autentyczne opinie. */
export const reviews = [
  {
    author: "Piotr S.",
    rating: 5,
    when: "2 miesiące temu",
    text: "Jeżeli ktoś szuka topowego warsztatu to tylko AUTO EXPERT! Absolutna uczciwość i profesjonalizm…",
  },
  {
    author: "Amelia M.",
    rating: 5,
    when: "6 miesięcy temu",
    text: "Pan Łukasz to zdecydowanie najlepszy mechanik – wszystko wytłumaczył w tak prosty i zrozumiały sposób, że nawet ja bez problemu pojęłam…",
  },
  {
    author: "XimperioX M.",
    rating: 5,
    when: "5 miesięcy temu",
    text: "Przyjechaliśmy do Panów skasować błędy w naszym samochodzie Renault Megane. Pełen profesjonalizm, szybka diagnoza, pełny raport skasowanych…",
  },
];

export const values = [
  {
    title: "Uczciwie",
    text: "Najpierw diagnoza i wycena, potem naprawa — zawsze po Twojej akceptacji. Wymienione części możesz obejrzeć.",
  },
  {
    title: "Rzetelnie",
    text: "Profesjonalny sprzęt diagnostyczny Hella Gutmann i sprawdzone części. Naprawiamy przyczynę, nie objaw.",
  },
  {
    title: "Lokalnie",
    text: "Jesteśmy z Gorzowa i dla Gorzowa. Zależy nam, żebyś wrócił — i polecił nas sąsiadom.",
  },
];

export const process = [
  {
    title: "Zgłoszenie",
    text: "Zadzwoń lub umów się online. Opisz objawy — kiedy występują i co zauważasz.",
  },
  {
    title: "Diagnoza",
    text: "Sprawdzamy auto testerem i doświadczeniem. Szukamy przyczyny, nie objawu.",
  },
  {
    title: "Wycena i akceptacja",
    text: "Mówimy, co i dlaczego trzeba naprawić oraz ile to kosztuje. Decyzja należy do Ciebie.",
  },
  {
    title: "Naprawa i odbiór",
    text: "Naprawiamy, sprawdzamy i oddajemy auto z jasnym wyjaśnieniem wykonanych prac.",
  },
];

export const faq = [
  {
    q: "Czy muszę się wcześniej umawiać?",
    a: "Najlepiej tak — wtedy mamy pewność, że znajdziemy dla Ciebie czas. Zadzwoń pod 600 249 761 lub wyślij zgłoszenie przez formularz rezerwacji. W pilnych sprawach po prostu zadzwoń.",
  },
  {
    q: "Ile kosztuje naprawa?",
    a: "To zależy od usterki i modelu auta. Część cen znajdziesz w cenniku. Przed każdą naprawą podajemy wycenę i zaczynamy pracę dopiero po Twojej akceptacji.",
  },
  {
    q: "W jakich godzinach pracujecie?",
    a: "Od poniedziałku do piątku w godzinach 8:00–16:00. W soboty, niedziele i święta warsztat jest zamknięty.",
  },
  {
    q: "Czy naprawiacie wszystkie marki samochodów?",
    a: "Zajmujemy się samochodami osobowymi większości popularnych marek. Jeśli masz nietypowe auto — zadzwoń, powiemy od razu, czy możemy pomóc.",
  },
  {
    q: "Czy wytłumaczycie mi, co było zepsute?",
    a: "Oczywiście. Klienci często podkreślają w opiniach, że wszystko tłumaczymy prosto i zrozumiale. Możesz też obejrzeć wymienione części.",
  },
  {
    q: "Jak działa rezerwacja online?",
    a: "Wybierasz usługę, preferowany dzień i godzinę oraz zostawiasz kontakt. Termin jest wstępny — oddzwonimy, żeby go potwierdzić.",
  },
  {
    q: "Gdzie dokładnie jesteście?",
    a: "ul. Koniawska 22, 66-400 Gorzów Wielkopolski. Mapę i przycisk nawigacji znajdziesz w zakładce Kontakt.",
  },
];

/** Samodiagnoza — objaw → prawdopodobna przyczyna → usługa */
export const symptomsChecker: {
  id: string;
  label: string;
  urgency: "niska" | "średnia" | "wysoka";
  causes: string;
  advice: string;
  service: string;
}[] = [
  {
    id: "check-engine",
    label: "Świeci się kontrolka silnika",
    urgency: "średnia",
    causes: "Czujniki, zapłon, układ wtryskowy, filtr DPF lub układ wydechowy.",
    advice: "Jeśli kontrolka miga albo auto traci moc — ogranicz jazdę i umów diagnostykę jak najszybciej.",
    service: "diagnostyka-komputerowa",
  },
  {
    id: "brakes-noise",
    label: "Piszczy lub zgrzyta przy hamowaniu",
    urgency: "wysoka",
    causes: "Zużyte klocki, uszkodzone tarcze lub zapieczony zacisk.",
    advice: "Hamulce to bezpieczeństwo. Nie zwlekaj — zużyte klocki szybko niszczą tarcze i podnoszą koszt naprawy.",
    service: "uklady-hamulcowe",
  },
  {
    id: "ac-weak",
    label: "Klimatyzacja słabo chłodzi lub śmierdzi",
    urgency: "niska",
    causes: "Za mało czynnika, nieszczelność układu lub zabrudzony parownik.",
    advice: "Zacznij od napełnienia i sprawdzenia szczelności. Zapach usunie odgrzybianie.",
    service: "serwis-klimatyzacji",
  },
  {
    id: "knocking",
    label: "Stuki na nierównościach",
    urgency: "średnia",
    causes: "Łączniki stabilizatora, tuleje wahaczy, amortyzatory lub sworznie.",
    advice: "Stuki zwykle narastają. Wczesna naprawa jest tańsza i poprawia prowadzenie auta.",
    service: "mechanika-ogolna",
  },
  {
    id: "steering-play",
    label: "Luz lub stuki na kierownicy",
    urgency: "wysoka",
    causes: "Końcówki lub drążki kierownicze, maglownica.",
    advice: "Luz w układzie kierowniczym wpływa na bezpieczeństwo. Umów kontrolę jak najszybciej.",
    service: "uklad-kierowniczy",
  },
  {
    id: "service-due",
    label: "Zbliża się termin serwisu",
    urgency: "niska",
    causes: "Przebieg lub czas od ostatniej wymiany oleju i filtrów.",
    advice: "Umów wymianę oleju — przy okazji sprawdzimy płyny i najważniejsze elementy.",
    service: "wymiana-oleju-przeglady",
  },
  {
    id: "cold-start",
    label: "Grzechotanie przy zimnym starcie",
    urgency: "wysoka",
    causes: "Możliwe rozciągnięcie łańcucha rozrządu lub zużyte napinacze.",
    advice: "Nie lekceważ tego objawu — uszkodzony rozrząd może poważnie uszkodzić silnik.",
    service: "wymiana-rozrzadu",
  },
  {
    id: "vibration",
    label: "Drgania kierownicy przy prędkości",
    urgency: "średnia",
    causes: "Niewyważone koła, uszkodzona opona lub felga, czasem tarcze hamulcowe.",
    advice: "Zacznij od wyważenia kół i kontroli opon.",
    service: "wymiana-opon",
  },
];

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  readMinutes: number;
  image: string;
  body: { h?: string; p?: string; list?: string[] }[];
};

export const articles: Article[] = [
  {
    slug: "auto-gotowe-na-chlodne-poranki",
    title: "Chłodne poranki już są. Czy Twoje auto jest na nie gotowe?",
    excerpt:
      "Jesienią auto może działać bez zarzutu… aż do pierwszego mroźnego poranka. Sprawdź, o czym pamiętać, zanim temperatura spadnie do zera.",
    date: "2026-10-26",
    readMinutes: 4,
    image: "diagnostyka-maska",
    body: [
      {
        p: "Jesień to zdradliwa pora dla samochodu. Przez kilka tygodni wszystko działa, a potem przychodzi pierwszy poranek z przymrozkiem i nagle okazuje się, że akumulator ledwo kręci, wycieraczki rozmazują zamiast wycierać, a płyn w spryskiwaczach zamarzł.",
      },
      { h: "Akumulator — pierwsza ofiara mrozu" },
      {
        p: "W niskiej temperaturze akumulator oddaje mniej energii, a rozruch silnika wymaga jej więcej. Jeśli Twój akumulator ma kilka lat albo rano rozrusznik kręci wolniej niż zwykle, warto sprawdzić jego stan, zanim zostawi Cię na parkingu.",
      },
      { h: "Szybka lista kontrolna na zimę" },
      {
        list: [
          "Stan akumulatora i ładowania",
          "Pióra wycieraczek — czy nie zostawiają smug",
          "Płyn do spryskiwaczy zimowy zamiast letniego",
          "Płyn chłodniczy o odpowiedniej odporności na mróz",
          "Opony zimowe lub całoroczne z odpowiednim bieżnikiem",
          "Działanie oświetlenia — wcześniej robi się ciemno",
        ],
      },
      { h: "Klimatyzacja zimą? Tak!" },
      {
        p: "Sprawna klimatyzacja osusza powietrze w kabinie, dzięki czemu szyby szybciej przestają parować. To realnie poprawia widoczność i bezpieczeństwo w chłodne, wilgotne dni.",
      },
      {
        p: "Nie wiesz, od czego zacząć? Przyjedź na szybki przegląd przed zimą — sprawdzimy najważniejsze elementy i powiemy wprost, co wymaga uwagi, a co może poczekać.",
      },
    ],
  },
  {
    slug: "czy-warto-jechac-do-warsztatu-gdy-auto-jezdzi",
    title: "Czy warto odwiedzić warsztat, jeśli samochód jeszcze jeździ?",
    excerpt:
      "Wiele usterek rozwija się po cichu. Wcześnie wykryta jest zwykle tania — zignorowana potrafi kosztować wielokrotnie więcej.",
    date: "2026-10-08",
    readMinutes: 3,
    image: "mechanika-silnik",
    body: [
      {
        p: "„Jeździ, to po co ruszać?” — to podejście, które zna każdy mechanik. Problem w tym, że wiele usterek przez długi czas nie daje wyraźnych objawów, a gdy już się pojawią, naprawa jest znacznie droższa.",
      },
      { h: "Przykłady, które widzimy najczęściej" },
      {
        list: [
          "Zużyte klocki hamulcowe, które zaczęły niszczyć tarcze",
          "Niewielki wyciek, który doprowadził do przegrzania silnika",
          "Zaniedbany rozrząd, który zerwał się w trasie",
          "Luźny element zawieszenia, który przyspieszył zużycie opon",
        ],
      },
      { h: "Profilaktyka jest tańsza niż naprawa" },
      {
        p: "Regularny przegląd pozwala wyłapać problemy na wczesnym etapie. Ty decydujesz, co naprawić od razu, a co zaplanować na później — ale robisz to świadomie, a nie pod presją awarii.",
      },
      {
        p: "Jeśli zauważysz cokolwiek niepokojącego — nowy dźwięk, zapach, kontrolkę albo zmianę w prowadzeniu — opowiedz nam o tym. Im dokładniej opiszesz objawy, tym szybciej znajdziemy przyczynę.",
      },
    ],
  },
  {
    slug: "kiedy-zmienic-opony-na-zimowe",
    title: "Zmiana sezonu: kiedy wymienić opony i na co zwrócić uwagę",
    excerpt:
      "Reguła 7°C, głębokość bieżnika i wiek opon — wszystko, co warto wiedzieć przed sezonową wymianą.",
    date: "2026-09-11",
    readMinutes: 3,
    image: "wymiana-opon",
    body: [
      {
        p: "Opony to jedyny element auta, który ma bezpośredni kontakt z drogą. Od ich stanu zależy droga hamowania, przyczepność w zakrętach i bezpieczeństwo na mokrej nawierzchni.",
      },
      { h: "Reguła 7 stopni" },
      {
        p: "Gdy średnia temperatura dobowa spada poniżej około 7°C, mieszanka opon letnich twardnieje i traci przyczepność. To dobry sygnał, żeby umówić wymianę na zimowe.",
      },
      { h: "Bieżnik i wiek opon" },
      {
        list: [
          "Prawne minimum w Polsce to 1,6 mm bieżnika",
          "Dla opon zimowych zalecamy co najmniej 4 mm",
          "Sprawdź datę produkcji (kod DOT) — guma starzeje się z czasem",
          "Szukaj pęknięć, wybrzuszeń i nierównomiernego zużycia",
        ],
      },
      {
        p: "Umów wymianę z wyprzedzeniem — w szczycie sezonu terminy szybko się kończą. Przy okazji chętnie sprawdzimy hamulce i zawieszenie, skoro koła i tak są zdjęte.",
      },
    ],
  },
  {
    slug: "kontrolka-check-engine-co-oznacza",
    title: "Kontrolka check engine — co oznacza i co robić?",
    excerpt:
      "Pomarańczowy silnik na desce to nie wyrok, ale też nie powód do ignorowania. Wyjaśniamy, kiedy jechać dalej, a kiedy się zatrzymać.",
    date: "2026-09-24",
    readMinutes: 3,
    image: "tester-hella-gutmann",
    body: [
      {
        p: "Kontrolka silnika informuje, że sterownik wykrył nieprawidłowość w pracy jednostki napędowej lub układu wydechowego. Przyczyna może być błaha — albo poważna.",
      },
      { h: "Świeci czy miga?" },
      {
        list: [
          "Świeci stale — umów diagnostykę w najbliższym czasie",
          "Miga — ogranicz jazdę do minimum, możliwe wypadanie zapłonów",
          "Auto w trybie awaryjnym — jedź spokojnie prosto do warsztatu",
        ],
      },
      { h: "Dlaczego samo kasowanie błędu nie wystarczy" },
      {
        p: "Skasowanie błędu gasi kontrolkę, ale nie usuwa przyczyny. Dlatego podczas diagnostyki testerem Hella Gutmann analizujemy parametry pracy silnika i szukamy źródła usterki. Po wszystkim dostajesz jasne wyjaśnienie, co się stało.",
      },
    ],
  },
  {
    slug: "jak-umowic-wizyte-w-warsztacie",
    title: "Jak przygotować się do wizyty w warsztacie?",
    excerpt:
      "Kilka prostych kroków, dzięki którym diagnoza będzie szybsza, a naprawa tańsza.",
    date: "2026-10-15",
    readMinutes: 2,
    image: "gadzety-auto-expert",
    body: [
      {
        p: "Dobra diagnoza zaczyna się od dobrej rozmowy. Im więcej szczegółów nam przekażesz, tym szybciej znajdziemy przyczynę usterki.",
      },
      { h: "Co warto zanotować przed wizytą" },
      {
        list: [
          "Jakie objawy zauważasz i od kiedy",
          "Kiedy występują: na zimnym czy ciepłym silniku, przy jakiej prędkości",
          "Czy coś się zmieniło po tankowaniu, naprawie lub uderzeniu",
          "Jakie kontrolki się świecą — zrób zdjęcie deski rozdzielczej",
        ],
      },
      {
        p: "Umów dogodny termin telefonicznie lub przez formularz rezerwacji online. Opisz objawy w zgłoszeniu — przygotujemy się do Twojej wizyty.",
      },
    ],
  },
];
