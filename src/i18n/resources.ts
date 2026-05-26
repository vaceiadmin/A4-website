import type { Resource } from "i18next";

import { mergeLocaleJson } from "@/lib/merge-locale-json";

// English
import enCommon from "@/i18n/locales/en/common.json";
import enHome from "@/i18n/locales/en/home.json";
import enPagesCore from "@/i18n/locales/en/pages.json";
import enPagesContent from "@/i18n/locales/en/pages-content.json";
import enPagesPricingExtra from "@/i18n/locales/en/pages-pricing-extra.json";
import enServices from "@/i18n/locales/en/services.json";

// French
import frCommon from "@/i18n/locales/fr/common.json";
import frHome from "@/i18n/locales/fr/home.json";
import frPagesCore from "@/i18n/locales/fr/pages.json";
import frPagesContent from "@/i18n/locales/fr/pages-content.json";
import frPagesPricingExtra from "@/i18n/locales/fr/pages-pricing-extra.json";
import frServices from "@/i18n/locales/fr/services.json";

// German
import deCommon from "@/i18n/locales/de/common.json";
import deHome from "@/i18n/locales/de/home.json";
import dePagesCore from "@/i18n/locales/de/pages.json";
import dePagesContent from "@/i18n/locales/de/pages-content.json";
import dePagesPricingExtra from "@/i18n/locales/de/pages-pricing-extra.json";
import deServices from "@/i18n/locales/de/services.json";

// Spanish
import esCommon from "@/i18n/locales/es/common.json";
import esHome from "@/i18n/locales/es/home.json";
import esPagesCore from "@/i18n/locales/es/pages.json";
import esPagesContent from "@/i18n/locales/es/pages-content.json";
import esPagesPricingExtra from "@/i18n/locales/es/pages-pricing-extra.json";
import esServices from "@/i18n/locales/es/services.json";

// Italian
import itCommon from "@/i18n/locales/it/common.json";
import itHome from "@/i18n/locales/it/home.json";
import itPagesCore from "@/i18n/locales/it/pages.json";
import itPagesContent from "@/i18n/locales/it/pages-content.json";
import itPagesPricingExtra from "@/i18n/locales/it/pages-pricing-extra.json";
import itServices from "@/i18n/locales/it/services.json";

// Dutch
import nlCommon from "@/i18n/locales/nl/common.json";
import nlHome from "@/i18n/locales/nl/home.json";
import nlPagesCore from "@/i18n/locales/nl/pages.json";
import nlPagesContent from "@/i18n/locales/nl/pages-content.json";
import nlPagesPricingExtra from "@/i18n/locales/nl/pages-pricing-extra.json";
import nlServices from "@/i18n/locales/nl/services.json";

import enAccountingMalta from "@/i18n/locales/en/accounting-malta.json";
import frAccountingMalta from "@/i18n/locales/fr/accounting-malta.json";
import deAccountingMalta from "@/i18n/locales/de/accounting-malta.json";
import esAccountingMalta from "@/i18n/locales/es/accounting-malta.json";
import itAccountingMalta from "@/i18n/locales/it/accounting-malta.json";
import nlAccountingMalta from "@/i18n/locales/nl/accounting-malta.json";

const enServicesWithAccountingMalta = mergeLocaleJson(enServices, {
  accountingMalta: enAccountingMalta,
});

/** English pages = scaffold + route copy + pricing blocks (`pages-pricing-extra.json`). */
const enPages = mergeLocaleJson(mergeLocaleJson(enPagesCore, enPagesContent), enPagesPricingExtra);

/** French pages with overrides */
const frPages = mergeLocaleJson(mergeLocaleJson(mergeLocaleJson(enPages, frPagesCore), frPagesContent), frPagesPricingExtra);

/** German pages with overrides */
const dePages = mergeLocaleJson(mergeLocaleJson(mergeLocaleJson(enPages, dePagesCore), dePagesContent), dePagesPricingExtra);

/** Spanish pages with overrides */
const esPages = mergeLocaleJson(mergeLocaleJson(mergeLocaleJson(enPages, esPagesCore), esPagesContent), esPagesPricingExtra);

/** Italian pages with overrides */
const itPages = mergeLocaleJson(mergeLocaleJson(mergeLocaleJson(enPages, itPagesCore), itPagesContent), itPagesPricingExtra);

/** Dutch pages with overrides */
const nlPages = mergeLocaleJson(mergeLocaleJson(mergeLocaleJson(enPages, nlPagesCore), nlPagesContent), nlPagesPricingExtra);

export const resources = {
  en: { 
    common: enCommon, 
    home: enHome, 
    pages: enPages,
    services: enServicesWithAccountingMalta,
  },
  fr: {
    common: mergeLocaleJson(enCommon, frCommon),
    home: mergeLocaleJson(enHome, frHome),
    pages: frPages,
    services: mergeLocaleJson(mergeLocaleJson(enServices, frServices), {
      accountingMalta: mergeLocaleJson(enAccountingMalta, frAccountingMalta),
    }),
  },
  de: {
    common: mergeLocaleJson(enCommon, deCommon),
    home: mergeLocaleJson(enHome, deHome),
    pages: dePages,
    services: mergeLocaleJson(mergeLocaleJson(enServices, deServices), {
      accountingMalta: mergeLocaleJson(enAccountingMalta, deAccountingMalta),
    }),
  },
  es: {
    common: mergeLocaleJson(enCommon, esCommon),
    home: mergeLocaleJson(enHome, esHome),
    pages: esPages,
    services: mergeLocaleJson(mergeLocaleJson(enServices, esServices), {
      accountingMalta: mergeLocaleJson(enAccountingMalta, esAccountingMalta),
    }),
  },
  it: {
    common: mergeLocaleJson(enCommon, itCommon),
    home: mergeLocaleJson(enHome, itHome),
    pages: itPages,
    services: mergeLocaleJson(mergeLocaleJson(enServices, itServices), {
      accountingMalta: mergeLocaleJson(enAccountingMalta, itAccountingMalta),
    }),
  },
  nl: {
    common: mergeLocaleJson(enCommon, nlCommon),
    home: mergeLocaleJson(enHome, nlHome),
    pages: nlPages,
    services: mergeLocaleJson(mergeLocaleJson(enServices, nlServices), {
      accountingMalta: mergeLocaleJson(enAccountingMalta, nlAccountingMalta),
    }),
  },
} satisfies Resource;


