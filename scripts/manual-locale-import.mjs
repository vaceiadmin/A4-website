/**
 * Merge manual translation packets back into src/i18n/locales/<locale>/<file>.
 *
 * Usage:
 *   node scripts/manual-locale-import.mjs <locale> [file]
 *
 * Examples:
 *   node scripts/manual-locale-import.mjs de
 *   node scripts/manual-locale-import.mjs de home.json
 *   node scripts/manual-locale-import.mjs all
 *   node scripts/manual-locale-import.mjs all home.json
 *
 * Reads:  manual-translation/<locale>-<basename>.manual.json
 * Writes: src/i18n/locales/<locale>/<file>.json
 *
 * Starts from merge(English master, existing locale file), then applies non-empty
 * "translation" values from the packet. Empty "translation" leaves that key as-is
 * (existing translation or English fallback).
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const TARGET_LOCALES = ["fr", "de", "es", "it", "nl"];
const FILES = ["common.json", "home.json", "services.json", "pages.json"];

const IN_DIR = path.join(ROOT, "manual-translation");

/** Same behavior as src/lib/merge-locale-json.ts (partial locale on English master). */
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
    const o = /** @type {Record<string, unknown>} */ (override);
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

/** @param {string} pathStr */
function parsePath(pathStr) {
  return pathStr.split(".").map((p) => (/^\d+$/.test(p) ? Number(p) : p));
}

/** @param {unknown} obj @param {(string|number)[]} parts */
function getByPath(obj, parts) {
  let cur = obj;
  for (const p of parts) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = /** @type {Record<string|number, unknown>} */ (cur)[p];
  }
  return cur;
}

/** @param {unknown} obj @param {(string|number)[]} parts @param {string} value */
function setByPath(obj, parts, value) {
  if (parts.length === 0) return;
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (cur == null || typeof cur !== "object") {
      throw new Error(`Invalid path (not an object at segment ${i})`);
    }
    cur = /** @type {Record<string|number, unknown>} */ (cur)[p];
  }
  const last = parts[parts.length - 1];
  if (cur == null || typeof cur !== "object") {
    throw new Error(`Invalid path (cannot set leaf)`);
  }
  /** @type {Record<string|number, unknown>} */ (cur)[last] = value;
}

async function importPacket(locale, file) {
  const enPath = path.join(ROOT, "src/i18n/locales/en", file);
  const enRaw = await fs.readFile(enPath, "utf8");
  let en = JSON.parse(enRaw);
  if (file === "pages.json") {
    try {
      en = mergeLocaleJson(en, JSON.parse(await fs.readFile(path.join(ROOT, "src/i18n/locales/en/pages-content.json"), "utf8")));
    } catch {
      /* optional */
    }
    try {
      en = mergeLocaleJson(en, JSON.parse(await fs.readFile(path.join(ROOT, "src/i18n/locales/en/pages-pricing-extra.json"), "utf8")));
    } catch {
      /* optional */
    }
  }

  const destPath = path.join(ROOT, `src/i18n/locales/${locale}`, file);
  let existing = undefined;
  try {
    existing = JSON.parse(await fs.readFile(destPath, "utf8"));
  } catch {
    /* first import for this file */
  }

  const merged = mergeLocaleJson(en, existing);

  const base = file.replace(/\.json$/i, "");
  const packetPath = path.join(IN_DIR, `${locale}-${base}.manual.json`);
  let packetRaw;
  try {
    packetRaw = await fs.readFile(packetPath, "utf8");
  } catch {
    console.warn(`Skip (file missing): ${path.relative(ROOT, packetPath)}`);
    return;
  }

  const packet = JSON.parse(packetRaw);
  if (packet.locale !== locale) {
    console.error(`Packet locale mismatch: expected ${locale}, got ${packet.locale}`);
    process.exit(1);
  }
  if (packet.sourceFile !== file) {
    console.error(`Packet sourceFile mismatch: expected ${file}, got ${packet.sourceFile}`);
    process.exit(1);
  }

  const rows = packet.rows;
  if (!Array.isArray(rows)) {
    console.error("Invalid packet: missing rows array");
    process.exit(1);
  }

  let applied = 0;
  let skippedEmpty = 0;
  let warnMismatch = 0;

  for (const row of rows) {
    if (!row || typeof row.path !== "string") continue;
    const parts = parsePath(row.path);
    const enLeaf = getByPath(en, parts);
    if (typeof enLeaf !== "string") {
      console.warn(`Path not a string in EN master (skipped): ${row.path}`);
      continue;
    }
    if (row.en != null && row.en !== enLeaf) {
      console.warn(
        `EN text changed since export for "${row.path}" — applying translation anyway. Re-export recommended.`
      );
      warnMismatch++;
    }
    const t = row.translation;
    if (typeof t !== "string" || t.trim() === "") {
      skippedEmpty++;
      continue;
    }
    setByPath(merged, parts, t);
    applied++;
  }

  await fs.writeFile(destPath, JSON.stringify(merged, null, 2) + "\n", "utf8");
  console.log(
    `Updated ${path.relative(ROOT, destPath)} — applied ${applied} strings, ${skippedEmpty} unchanged (empty translation).`
  );
  if (warnMismatch) console.warn(`Warnings: ${warnMismatch} EN mismatches.`);
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
        await importPacket(locale, f);
      }
    }
    console.log("Done.");
    return;
  }

  const locale = first;
  if (!locale || !TARGET_LOCALES.includes(locale)) {
    console.error(
      `Usage: node scripts/manual-locale-import.mjs <locale>|all [file.json]\n` +
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
    await importPacket(locale, f);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
