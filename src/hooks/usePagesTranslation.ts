"use client";

import { useCallback } from "react";
import { useTranslation } from "react-i18next";

/**
 * Namespaced `t` for the `pages` JSON tree: keys are relative to `routeKey`
 * (e.g. routeKey "about" + "pageHeader.title" => `about.pageHeader.title`).
 */
export function usePagesTranslation(routeKey: string) {
  const { t } = useTranslation("pages");
  const pt = useCallback(
    (key: string, options?: Record<string, unknown>) =>
      t(`${routeKey}.${key}`, options),
    [t, routeKey]
  );
  return { t: pt, i18nT: t };
}
