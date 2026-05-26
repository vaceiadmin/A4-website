/**
 * Merges fully translated "core" home.json (same keys as en/home.json)
 * with extra keys from the existing locale file (keys not present in en).
 *
 * Usage: node scripts/merge-home-locale-cores.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const en = JSON.parse(
  readFileSync(join(root, "src/i18n/locales/en/home.json"), "utf8")
);
const enKeys = new Set(Object.keys(en));

const locales = ["de", "fr", "es", "it", "nl"];

function extractExtras(old) {
  const ex = {};
  for (const k of Object.keys(old)) {
    if (!enKeys.has(k)) ex[k] = old[k];
  }
  return ex;
}

for (const loc of locales) {
  const corePath = join(root, "scripts", "home-cores", `${loc}.json`);
  const oldPath = join(root, "src", "i18n", "locales", loc, "home.json");

  const core = JSON.parse(readFileSync(corePath, "utf8"));
  const old = JSON.parse(readFileSync(oldPath, "utf8"));
  const extras = extractExtras(old);
  const merged = { ...core, ...extras };

  writeFileSync(oldPath, JSON.stringify(merged, null, 2) + "\n", "utf8");
  console.log(`Updated ${loc}/home.json (${Object.keys(core).length} core keys + ${Object.keys(extras).length} extra keys)`);
}
