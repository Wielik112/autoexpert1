# Auto Expert — strona warsztatu (Gorzów Wielkopolski)

Nowoczesna, szybka strona w **Next.js 16 + React 19 + TypeScript**, gotowa do wdrożenia na **Vercel**.

## Co jest w środku

| Podstrona | Adres |
|---|---|
| Strona główna (hero, usługi, samodiagnoza, proces, opinie, ceny, poradnik, FAQ, mapa) | `/` |
| Usługi + 8 podstron usług | `/uslugi`, `/uslugi/[usluga]` |
| Rezerwacja online (4 kroki, dni wolne i święta zablokowane) | `/rezerwacja` |
| Cennik | `/cennik` |
| O nas | `/o-nas` |
| Opinie | `/opinie` |
| Poradnik + 5 artykułów | `/poradnik`, `/poradnik/[artykul]` |
| FAQ | `/faq` |
| Kontakt + formularz + mapa | `/kontakt` |
| Polityka prywatności, strona 404 | `/polityka-prywatnosci` |

**Funkcje:** żywy status „Otwarte / Zamknięte” (czas polski + polskie święta), samodiagnoza objawów z przejściem do rezerwacji, rezerwacja online z wysyłką na e-mail, mapa ładowana po kliknięciu (szybkość + prywatność), menu z podglądem usług, dolny pasek „Zadzwoń / Umów” na telefonach.

**Technicznie:** strony generowane statycznie (ładują się błyskawicznie), automatyczna optymalizacja zdjęć (AVIF/WebP), fonty z własnego serwera, dane strukturalne Google (AutoRepair, Service, FAQ, Breadcrumb, BlogPosting), sitemap.xml, robots.txt, Open Graph, nagłówki bezpieczeństwa (CSP, HSTS, X-Frame-Options), formularze z ochroną antyspamową (honeypot, limit zgłoszeń, kontrola pochodzenia).

## Wdrożenie: GitHub → Vercel

1. Rozpakuj ZIP i wrzuć zawartość folderu do nowego repozytorium na GitHub.
2. Na [vercel.com](https://vercel.com) → **Add New → Project** → wybierz repozytorium → **Deploy**. Nic nie trzeba konfigurować — Vercel sam rozpozna Next.js.
3. Gotowe. Każdy kolejny `git push` automatycznie aktualizuje stronę.

### Rezerwacje na e-mail (zalecane, 5 minut)

Bez tego kroku formularz działa, ale zamiast wysłać zgłoszenie automatycznie, pokaże klientowi gotowy e-mail i numer telefonu.

1. Załóż darmowe konto na [resend.com](https://resend.com) i utwórz klucz API.
2. W Vercelu: **Project → Settings → Environment Variables** dodaj:
   - `RESEND_API_KEY` = Twój klucz
   - `BOOKING_TO_EMAIL` = `autoexpert.gorzow@gmail.com` (lub inny adres)
3. **Redeploy**.

> Bez zweryfikowanej domeny w Resend wiadomości przychodzą tylko na adres e-mail konta Resend. Po podpięciu domeny zweryfikuj ją w Resend i ustaw `BOOKING_FROM_EMAIL`, np. `Auto Expert <rezerwacje@twojadomena.pl>`.

### Własna domena

Vercel → **Settings → Domains** → dodaj domenę. Potem ustaw zmienną `NEXT_PUBLIC_SITE_URL` (np. `https://www.twojadomena.pl`) i zrób redeploy — dzięki temu sitemap i dane dla Google wskażą właściwy adres. Następnie zgłoś `https://twojadomena.pl/sitemap.xml` w Google Search Console i dodaj adres strony w profilu firmy w Google.

## Jak zmieniać treści

**Wszystko jest w jednym pliku: `src/content/site.ts`.**

- telefon, e-mail, adres, ocena Google → obiekt `company`
- godziny otwarcia → `hours`
- usługi, opisy, ceny, FAQ usług → `services`
- cennik → `priceList`
- opinie (dodawaj tylko prawdziwe) → `reviews`
- samodiagnoza → `symptomsChecker`
- artykuły poradnika → `articles`

Zdjęcia: wrzuć plik do `src/assets/` i dopisz go w `src/lib/images.ts`.

Edytować można nawet w przeglądarce, bezpośrednio na GitHubie (ikona ołówka) — po zapisaniu Vercel sam przebuduje stronę.

## Uruchomienie lokalne

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # test produkcyjny
```

Wymagany Node.js 20.9 lub nowszy.

## Do sprawdzenia przed startem

- Ceny pochodzą z profilu Google; usługi oznaczone „wycena indywidualna” możesz uzupełnić kwotami.
- Teksty o usługach i artykuły to propozycje — warto je przejrzeć i dopasować do praktyki warsztatu.
- Polityka prywatności to wzór — dobrze, by przejrzał ją ktoś znający RODO.
