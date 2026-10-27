import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/jetbrains-mono/index.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd, MobileBar } from "@/components/Blocks";
import { RevealObserver } from "@/components/Reveal";
import { company, hours, services } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

const title = "Auto Expert – Mechanik Gorzów Wielkopolski | Warsztat samochodowy";
const description =
  "Warsztat samochodowy Auto Expert w Gorzowie Wlkp., ul. Koniawska 22. Diagnostyka komputerowa Hella Gutmann, mechanika, klimatyzacja, hamulce, rozrząd, opony. Ocena 4,8/5 w Google. Umów wizytę online lub zadzwoń: 600 249 761.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | Auto Expert Gorzów Wlkp." },
  description,
  applicationName: "Auto Expert",
  keywords: [
    "mechanik Gorzów Wielkopolski",
    "warsztat samochodowy Gorzów",
    "serwis klimatyzacji Gorzów",
    "diagnostyka komputerowa Gorzów",
    "wymiana rozrządu Gorzów",
    "wymiana opon Gorzów",
    "hamulce Gorzów",
    "Auto Expert Koniawska",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "/",
    siteName: "Auto Expert",
    title,
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Auto Expert – warsztat samochodowy Gorzów Wielkopolski" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  formatDetection: { telephone: true, address: true, email: true },
  category: "automotive",
};

export const viewport: Viewport = {
  themeColor: "#0b0c0e",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

const dayIds = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": `${siteUrl}/#warsztat`,
  name: company.fullName,
  alternateName: "Auto Expert",
  slogan: company.slogan,
  url: siteUrl,
  telephone: "+48600249761",
  email: company.email,
  image: `${siteUrl}/og.jpg`,
  logo: `${siteUrl}/icon.svg`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Koniawska 22",
    postalCode: company.postalCode,
    addressLocality: company.city,
    addressRegion: company.region,
    addressCountry: "PL",
  },
  geo: { "@type": "GeoCoordinates", latitude: company.geo.lat, longitude: company.geo.lng },
  areaServed: { "@type": "City", name: "Gorzów Wielkopolski" },
  openingHoursSpecification: Object.entries(hours)
    .filter(([, h]) => h)
    .map(([d, h]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${dayIds[+d]}`,
      opens: h!.open,
      closes: h!.close,
    })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: company.rating.value,
    reviewCount: company.rating.count,
    bestRating: 5,
  },
  sameAs: [company.links.facebook],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Usługi warsztatowe",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, url: `${siteUrl}/uslugi/${s.slug}` },
    })),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" id="top">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-reveal')",
          }}
        />
        <JsonLd data={localBusiness} />
      </head>
      <body>
        <a href="#main" className="skip">
          Przejdź do treści
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <RevealObserver />
      </body>
    </html>
  );
}
