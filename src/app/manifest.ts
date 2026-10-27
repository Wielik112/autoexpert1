import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Auto Expert – warsztat samochodowy Gorzów Wlkp.",
    short_name: "Auto Expert",
    description: "Mechanik Gorzów Wielkopolski – diagnostyka, klimatyzacja, hamulce, rozrząd, opony.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0c0e",
    theme_color: "#e3241b",
    lang: "pl",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
