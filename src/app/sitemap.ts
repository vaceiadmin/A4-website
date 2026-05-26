import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n-config";
import { getSiteUrl } from "@/lib/site-url";
import { getBlogSlugs } from "@/utils/blog";

/** Marketing routes to surface in Search Console / Ads landing quality (locale-prefixed). */
const STATIC_PATHS = [
  "",
  "/contact",
  "/insights",
  "/pricing",
  "/partners",
  "/white-label-platform",
  "/partners-platform",
  "/about",
  "/faq",
  "/how-it-works",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const slugs = getBlogSlugs();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const p of STATIC_PATHS) {
      const path = p === "" ? `/${locale}` : `/${locale}${p}`;
      entries.push({
        url: `${base}${path}`,
        lastModified: new Date(),
        changeFrequency: p === "" ? "weekly" : "monthly",
        priority: p === "" ? 1 : p.includes("platform") ? 0.9 : 0.8,
      });
    }
    for (const slug of slugs) {
      entries.push({
        url: `${base}/${locale}/insights/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
