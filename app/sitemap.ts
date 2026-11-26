import type { MetadataRoute } from "next";
import { SITE_DATA } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_DATA.siteUrl,
      lastModified: new Date("2026-11-26"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
