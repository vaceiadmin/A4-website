/**
 * Base URL for canonical links, OG URLs, and sitemap.
 * Set `NEXT_PUBLIC_SITE_URL=https://www.vacei.com` on the host so ads/SEO use the public domain (not *.vercel.app).
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit && /^https?:\/\//i.test(explicit)) {
    return explicit.replace(/\/$/, "");
  }
  const v = process.env.VERCEL_URL;
  if (v && v.length > 0) {
    return v.startsWith("http") ? v.replace(/\/$/, "") : `https://${v}`;
  }
  return "https://www.vacei.com";
}
