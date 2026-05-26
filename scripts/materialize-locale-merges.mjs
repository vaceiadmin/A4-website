/**
 * Writes merge(englishMaster, localePartial) to each non-en locale file for
 * common.json, home.json, pages.json so on-disk JSON matches runtime merge
 * and is ready for DeepL (`npm run translate:deepl`).
 *
 *   node scripts/materialize-locale-merges.mjs
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const EN = path.join(ROOT, "src/i18n/locales/en");

function mergeLocaleJson(base, override) {
  if (override === undefined || override === null) {
    if (typeof base === "object" && base !== null) {
      return structuredClone(base);
    }
    return base;
  }
  if (typeof base === "string" || typeof base === "number" || typeof base === "boolean") {
    return override;
  }
  if (Array.isArray(base)) {
    if (!Array.isArray(override) || override.length === 0) {
      return structuredClone(base);
    }
    return base.map((item, i) =>
      i < override.length ? mergeLocaleJson(item, override[i]) : mergeLocaleJson(item, undefined)
    );
  }
  if (typeof base === "object" && base !== null) {
    const b = base;
    const o = override;
    const result = {};
    for (const key of Object.keys(b)) {
      if (key in o && o[key] !== undefined) {
        result[key] = mergeLocaleJson(b[key], o[key]);
      } else {
        result[key] = mergeLocaleJson(b[key], undefined);
      }
    }
    return result;
  }
  return override;
}

const FILES = ["common.json", "home.json", "pages.json", "services.json"];
const LOCALES = ["fr", "de", "es", "it", "nl"];

async function main() {
  for (const file of FILES) {
    const basePath = path.join(EN, file);
    let base = JSON.parse(await fs.readFile(basePath, "utf8"));
    if (file === "pages.json") {
      try {
        const extra = JSON.parse(await fs.readFile(path.join(EN, "pages-content.json"), "utf8"));
        base = mergeLocaleJson(base, extra);
      } catch {
        /* optional */
      }
      try {
        const extraP = JSON.parse(await fs.readFile(path.join(EN, "pages-pricing-extra.json"), "utf8"));
        base = mergeLocaleJson(base, extraP);
      } catch {
        /* optional */
      }
    }
    for (const loc of LOCALES) {
      const destPath = path.join(ROOT, "src/i18n/locales", loc, file);
      let partial = {};
      try {
        partial = JSON.parse(await fs.readFile(destPath, "utf8"));
      } catch {
        // empty
      }
      const merged = mergeLocaleJson(base, partial);
      await fs.writeFile(destPath, JSON.stringify(merged, null, 2) + "\n", "utf8");
      console.log(`Wrote ${loc}/${file}`);
    }
  }
  console.log("Done. Run translate:deepl when ready to machine-translate from en.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
