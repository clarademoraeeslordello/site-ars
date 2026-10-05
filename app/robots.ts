import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Everything public is crawlable, including AI crawlers (the content is meant to be cited).
// Blocked: API, admin, newsletter token pages (all locales) and tracking-parameter duplicates.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin/",
        "/newsletter/",
        "/en/newsletter/",
        "/es/newsletter/",
        "/*?*utm_",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
