export const locales = ["en", "fr", "de", "es", "it", "nl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** All supported locales in the floating language switcher (including English). */
export const localesForSwitcher: readonly Locale[] = [...locales];

export const LOCALE_COOKIE = "VACEI_LOCALE";
export const LOCALE_STORAGE_KEY = "vacei_locale";

/** Request header set by middleware for root layout / html lang */
export const LOCALE_HEADER = "x-vacei-locale";

/** DeepL API language codes (for scripts) */
export const deeplTargetLanguages: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  de: "DE",
  es: "ES",
  it: "IT",
  nl: "NL",
};

/**
 * Fallback locale from Cloudflare CF-IPCountry (ISO 3166-1 alpha-2).
 * Used only when cookie and Accept-Language do not yield a supported locale.
 */
export function localeFromCountry(country: string | null | undefined): Locale | null {
  if (!country || country === "XX" || country.length !== 2) return null;
  const c = country.toUpperCase();
  const map: Record<string, Locale> = {
    FR: "fr",
    BE: "fr",
    MC: "fr",
    LU: "fr",
    DE: "de",
    AT: "de",
    LI: "de",
    CH: "de",
    ES: "es",
    AD: "es",
    IT: "it",
    SM: "it",
    VA: "it",
    NL: "nl",
    PT: "en",
    IE: "en",
    MT: "en",
    CY: "en",
    GR: "en",
    GB: "en",
    US: "en",
    CA: "en",
    AU: "en",
    NZ: "en",
  };
  return map[c] ?? null;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function pickLocaleFromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;
  const parts = header.split(",").map((p) => p.trim().split(";")[0]?.toLowerCase() ?? "");
  for (const part of parts) {
    const base = part.split("-")[0];
    if (base && isLocale(base)) return base;
  }
  return null;
}
