"use client";

import { useCallback } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import { withLocale } from "@/lib/localized-path";

export function useLocalizedPath() {
  const locale = useLocale();
  return useCallback((path: string) => withLocale(locale, path), [locale]);
}
