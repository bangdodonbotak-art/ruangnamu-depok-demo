import type { MetadataRoute } from "next";
import { SITE_DATA } from "@/lib/site-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_DATA.siteUrl}/sitemap.xml`,
  };
}
