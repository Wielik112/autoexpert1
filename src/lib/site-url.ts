/**
 * Adres strony. Po podpięciu własnej domeny ustaw w Vercelu zmienną
 * NEXT_PUBLIC_SITE_URL, np. https://www.twojadomena.pl
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");
