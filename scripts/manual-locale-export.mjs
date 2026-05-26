/**
 * Export English locale strings to editable JSON packets for manual translation
 * (no API). Fill the "translation" field per row, then run manual-locale-import.mjs.
 *
 * Usage (repo root):
 *   node scripts/manual-locale-export.mjs <locale> [file]
 *   node scripts/manual-locale-export.mjs all [file]
 *
 * Examples:
 *   node scripts/manual-locale-export.mjs de
 *   node scripts/manual-locale-export.mjs de home.json
 *   node scripts/manual-locale-export.mjs all
 *   node scripts/manual-locale-export.mjs all home.json
 *
 * Writes: manual-translation/<locale>-<file>.manual.json
 * Locales: fr | de | es | it | nl
 * Files:   common.json | home.json | services.json | pages.json (default: all four)
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const TARGET_LOCALES = ["fr", "de", "es", "it", "nl"];
const FILES = ["common.json", "home.json", "services.json", "pages.json"];

const OUT_DIR = path.join(ROOT, "manual-translation");

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

function shouldSkipKey(key, depth) {
  if (depth === 1 && (key === "_meta" || key === "_routes")) return true;
  return false;
}

/** @param {unknown} value @param {string[]} segments @param {number} depth */
function collectRows(value, segments, depth, rows) {
  if (typeof value === "string") {
    rows.push({
      path: segments.join("."),
      en: value,
      translation: "",
    });
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, i) => {
      collectRows(item, [...segments, String(i)], depth, rows);
    });
    return;
  }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (shouldSkipKey(k, depth)) continue;
      collectRows(v, [...segments, k], depth + 1, rows);
    }
  }
}

async function exportFile(locale, file) {
  const srcPath = path.join(ROOT, "src/i18n/locales/en", file);
  const raw = await fs.readFile(srcPath, "utf8");
  let json = JSON.parse(raw);
    if (file === "pages.json") {
    try {
      json = mergeLocaleJson(json, JSON.parse(await fs.readFile(path.join(ROOT, "src/i18n/locales/en/pages-content.json"), "utf8")));
    } catch {
      /* optional */
    }
    try {
      json = mergeLocaleJson(json, JSON.parse(await fs.readFile(path.join(ROOT, "src/i18n/locales/en/pages-pricing-extra.json"), "utf8")));
    } catch {
      /* optional */
    }
  }
  const rows = [];
  collectRows(json, [], 0, rows);

  const packet = {
    locale,
    sourceFile: file,
    note:
      'Fill "translation" for each row. Leave empty to leave that key unchanged. Then: npm run i18n:manual-import -- <locale> [file] or npm run i18n:manual-import-all',
    rows,
  };

  await fs.mkdir(OUT_DIR, { recursive: true });
  const base = file.replace(/\.json$/i, "");
  const destPath = path.join(OUT_DIR, `${locale}-${base}.manual.json`);
  await fs.writeFile(destPath, JSON.stringify(packet, null, 2) + "\n", "utf8");
  console.log(`Wrote ${rows.length} rows -> ${path.relative(ROOT, destPath)}`);
}

async function main() {
  const first = process.argv[2];
  const fileArg = process.argv[3];

  if (first === "all") {
    const files = fileArg ? [fileArg] : FILES;
    for (const f of files) {
      if (!FILES.includes(f)) {
        console.error(`Unknown file "${f}". Allowed: ${FILES.join(", ")}`);
        process.exit(1);
      }
    }
    for (const locale of TARGET_LOCALES) {
      for (const f of files) {
        await exportFile(locale, f);
      }
    }
    console.log(`Done. ${TARGET_LOCALES.length} locales × ${files.length} file(s).`);
    return;
  }

  const locale = first;
  if (!locale || !TARGET_LOCALES.includes(locale)) {
    console.error(
      `Usage: node scripts/manual-locale-export.mjs <locale>|all [file.json]\n` +
        `  locale: ${TARGET_LOCALES.join(", ")} | all (every locale)\n` +
        `  file:   optional; default all: ${FILES.join(", ")}`
    );
    process.exit(1);
  }

  const files = fileArg ? [fileArg] : FILES;
  for (const f of files) {
    if (!FILES.includes(f)) {
      console.error(`Unknown file "${f}". Allowed: ${FILES.join(", ")}`);
      process.exit(1);
    }
    await exportFile(locale, f);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
