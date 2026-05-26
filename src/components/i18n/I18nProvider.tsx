"use client";

import { useLayoutEffect } from "react";
import i18n from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import type { Locale } from "@/lib/i18n-config";
import { defaultLocale, locales } from "@/lib/i18n-config";
import { resources } from "@/i18n/resources";

/** Init the singleton once; always sync `lng` to the URL locale so SSR requests do not share stale language. */
function ensureI18nShell() {
  if (i18n.isInitialized) return;
  i18n.use(initReactI18next).init({
    resources,
    lng: defaultLocale,
    fallbackLng: defaultLocale,
    interpolation: { escapeValue: false },
    defaultNS: "common",
    ns: ["common", "home", "pages", "services"],
    supportedLngs: [...locales],
  });
}

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  ensureI18nShell();
  // Never call changeLanguage during render — it notifies subscribers and triggers setState
  // in children while React is still rendering this tree. useLayoutEffect runs after commit,
  // before paint, so language matches the route with minimal flash.
  useLayoutEffect(() => {
    void i18n.changeLanguage(locale);
  }, [locale]);
  return (
    <I18nextProvider i18n={i18n} defaultNS="common">
      {children}
    </I18nextProvider>
  );
}
