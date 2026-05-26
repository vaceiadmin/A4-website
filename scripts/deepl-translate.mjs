/**
 * Batch-translate English JSON locale files via DeepL HTTP API.
 *
 * Prerequisites:
 * - DEEPL_API_KEY in environment (get from https://www.deepl.com/pro-api )
 * - Optional: DEEPL_GLOSSARY_ID if you created a glossary in DeepL for brand terms
 *
 * Usage (from repo root):
 *   node scripts/deepl-translate.mjs
 *
 * Defaults translate English masters under src/i18n/locales/en/ into
 * fr, de, es, it, nl. Adjust TARGET_LANGS or FILES below as needed.
 *
 * After `npm run i18n:materialize`, locale files may still contain English
 * placeholders merged from en — run this script to replace them with real
 * translations for EVERY string in each file (recursive). For `home.json` that
 * is the full page, not one section: hero, auditPlatform, workspaceEntry,
 * inviteAdvisors, howItWorks, processSteps, beforeAfter, servicesSection,
 * marketplace, whyVacei, trust, companySetup, complianceDashboard,
 * multiCompany, activeEU — all keys under the English master.
 *
 * DeepL API docs: https://developers.deepl.com/docs/api/translate-text
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const DEEPL_GLOSSARY_ID = process.env.DEEPL_GLOSSARY_ID;

/** DeepL target language codes */
const TARGET_LANGS = ["FR", "DE", "ES", "IT", "NL"];
/** English masters: run `npm run export:locale-masters` to regenerate services.json and refresh pages route keys. */
const FILES = ["common.json", "home.json", "services.json", "pages.json"];

const DEEPL_LANG_TO_FOLDER = {
  FR: "fr",
  DE: "de",
  ES: "es",
  IT: "it",
  NL: "nl",
};

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

async function translateText(text, targetLang) {
  const body = new URLSearchParams();
  body.set("auth_key", DEEPL_API_KEY);
  body.set("text", text);
  body.set("source_lang", "EN");
  body.set("target_lang", targetLang);
  if (DEEPL_GLOSSARY_ID) {
    body.set("glossary_id", DEEPL_GLOSSARY_ID);
  }

  const res = await fetch("https://api.deepl.com/v2/translate", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`DeepL ${res.status}: ${errText}`);
  }
  const data = await res.json();
  return data.translations[0].text;
}

async function translateValue(value, targetLang) {
  if (typeof value === "string") {
    if (!value.trim()) return value;
    return translateText(value, targetLang);
  }
  if (Array.isArray(value)) {
    const out = [];
    for (const item of value) {
      out.push(await translateValue(item, targetLang));
    }
    return out;
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      // pages.json: do not translate route manifests or tooling metadata
      if (k === "_meta" || k === "_routes") {
        out[k] = v;
      } else {
        out[k] = await translateValue(v, targetLang);
      }
    }
    return out;
  }
  return value;
}

async function main() {
  if (!DEEPL_API_KEY) {
    console.error("Set DEEPL_API_KEY in the environment.");
    process.exit(1);
  }

  for (const file of FILES) {
    const srcPath = path.join(ROOT, "src/i18n/locales/en", file);
    const raw = await fs.readFile(srcPath, "utf8");
    let json = JSON.parse(raw);
    if (file === "pages.json") {
      try {
        const extra = JSON.parse(await fs.readFile(path.join(ROOT, "src/i18n/locales/en/pages-content.json"), "utf8"));
        json = mergeLocaleJson(json, extra);
      } catch {
        /* optional */
      }
      try {
        const extraP = JSON.parse(await fs.readFile(path.join(ROOT, "src/i18n/locales/en/pages-pricing-extra.json"), "utf8"));
        json = mergeLocaleJson(json, extraP);
      } catch {
        /* optional */
      }
    }

    for (const tl of TARGET_LANGS) {
      const folder = DEEPL_LANG_TO_FOLDER[tl];
      const destPath = path.join(ROOT, `src/i18n/locales/${folder}`, file);
      console.log(`Translating ${file} -> ${folder} (${tl})...`);
      const translated = await translateValue(json, tl);
      await fs.writeFile(destPath, JSON.stringify(translated, null, 2) + "\n", "utf8");
    }
  }

  console.log("Done. Review git diff before committing machine translations.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
