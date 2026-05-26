import {
  defaultLocale,
  isLocale,
  LOCALE_COOKIE,
  localeFromCountry,
  pickLocaleFromAcceptLanguage,
  type Locale,
} from "@/lib/i18n-config";

export type LocaleResolutionInput = {
  cookieLocale?: string | null;
  acceptLanguage?: string | null;
  cfCountry?: string | null;
};

/**
 * Same priority everywhere: cookie → Accept-Language → Cloudflare country → English
 */
export function resolvePreferredLocale(input: LocaleResolutionInput): Locale {
  if (input.cookieLocale && isLocale(input.cookieLocale)) {
    return input.cookieLocale;
  }
  const fromBrowser = pickLocaleFromAcceptLanguage(input.acceptLanguage ?? null);
  if (fromBrowser) return fromBrowser;
  const fromCountry = localeFromCountry(input.cfCountry);
  if (fromCountry) return fromCountry;
  return defaultLocale;
}

export { LOCALE_COOKIE };
