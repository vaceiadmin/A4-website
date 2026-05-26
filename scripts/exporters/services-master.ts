/**
 * Writes `src/i18n/locales/en/services.json` from `servicesData` (source of truth).
 * Run from repo root: `npx tsx scripts/exporters/services-master.ts`
 *
 * English UI still renders from `servicesData.tsx`; this JSON is the DeepL master
 * and matches the shape expected by `merge-service-locale` for fr/de/es/it/nl.
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";
import { servicesData } from "@/data/servicesData";
import type { ServiceLocaleOverride } from "@/lib/merge-service-locale";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "../..");

function decodeBasicEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\u00a0/g, " ")
    .trim();
}

function stripTags(html: string): string {
  return decodeBasicEntities(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function extractDescriptionFromMarkup(html: string): { heading: string; paragraphs: string[] } {
  const h3Match = html.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
  const heading = h3Match ? stripTags(h3Match[1]) : "";
  const paragraphs: string[] = [];
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let m: RegExpExecArray | null;
  while ((m = pRegex.exec(html)) !== null) {
    paragraphs.push(stripTags(m[1]));
  }
  return { heading, paragraphs };
}

function buildOverride(service: (typeof servicesData)[number]): ServiceLocaleOverride {
  let descriptionHeading: string | undefined;
  let descriptionParagraphs: string[] | undefined;
  if (service.description != null) {
    const html = renderToStaticMarkup(service.description as ReactNode);
    const { heading, paragraphs } = extractDescriptionFromMarkup(html);
    descriptionHeading = heading || undefined;
    descriptionParagraphs = paragraphs.length ? paragraphs : undefined;
  }

  const out: ServiceLocaleOverride = {
    title: service.title,
    breadcrumbs: service.breadcrumbs.map((b) => ({ label: b.label })),
    descriptionHeading,
    descriptionParagraphs,
    featuresSection: service.featuresSection
      ? {
          title: service.featuresSection.title,
          subtitle: service.featuresSection.subtitle,
          features: service.featuresSection.features.map((f) => ({
            title: f.title,
            items: [...f.items],
          })),
        }
      : undefined,
  };

  if (service.primaryCtaText) out.primaryCtaText = service.primaryCtaText;
  if (service.secondaryCtaText) out.secondaryCtaText = service.secondaryCtaText;

  return out;
}

async function main() {
  const bundle: Record<string, ServiceLocaleOverride> = {};
  for (const s of servicesData) {
    bundle[s.slug] = buildOverride(s);
  }

  const outPath = path.join(ROOT, "src/i18n/locales/en/services.json");
  await fs.writeFile(outPath, JSON.stringify(bundle, null, 2) + "\n", "utf8");
  console.log(`Wrote ${Object.keys(bundle).length} services -> ${path.relative(ROOT, outPath)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
