import type { MetadataRoute } from "next";
import { articles, services } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = [
    ["", 1, "weekly"],
    ["/uslugi", 0.9, "monthly"],
    ["/rezerwacja", 0.9, "monthly"],
    ["/cennik", 0.8, "monthly"],
    ["/kontakt", 0.8, "yearly"],
    ["/o-nas", 0.6, "yearly"],
    ["/opinie", 0.6, "monthly"],
    ["/poradnik", 0.7, "weekly"],
    ["/faq", 0.6, "monthly"],
  ] as const;
  return [
    ...base.map(([p, priority, changeFrequency]) => ({
      url: `${siteUrl}${p}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...services.map((s) => ({
      url: `${siteUrl}/uslugi/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...articles.map((a) => ({
      url: `${siteUrl}/poradnik/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
