/**
 * Ensures pages.json under each locale folder exists with one empty object per
 * app route (from page.tsx files under src/app/[locale]). Merges with existing
 * JSON so manually added string keys are preserved.
 *
 * Run: node scripts/scaffold-pages-json.mjs
 * (Also invoked by npm run export:locale-masters.)
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const LOCALE_ROOT = path.join(ROOT, "src/app/[locale]");

async function walkPageFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await walkPageFiles(full)));
    } else if (e.name === "page.tsx") {
      out.push(full);
    }
  }
  return out;
}

function routeKeyFromPagePath(pagePath) {
  const dir = path.dirname(pagePath);
  const rel = path.relative(LOCALE_ROOT, dir);
  if (!rel || rel === ".") return "home";
  return rel.split(path.sep).join("/");
}

async function main() {
  const pageFiles = await walkPageFiles(LOCALE_ROOT);
  const keys = [...new Set(pageFiles.map(routeKeyFromPagePath))].sort();

  const meta = {
    source: "scripts/scaffold-pages-json.mjs",
    note: "Per-route strings for useTranslation('pages'). Fill keys as components are wired.",
  };

  const locales = ["en", "fr", "de", "es", "it", "nl"];

  for (const loc of locales) {
    const p = path.join(ROOT, `src/i18n/locales/${loc}/pages.json`);
    let existing = {};
    try {
      existing = JSON.parse(await fs.readFile(p, "utf8"));
    } catch {
      // new file
    }

    const merged = {
      _meta: meta,
      _routes: keys,
    };

    for (const k of keys) {
      const prev = existing[k];
      merged[k] =
        prev !== undefined && typeof prev === "object" && prev !== null && !Array.isArray(prev)
          ? { ...prev }
          : {};
    }

    await fs.writeFile(p, JSON.stringify(merged, null, 2) + "\n", "utf8");
    console.log(`Updated ${loc}/pages.json (${keys.length} route keys)`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
