import React, { type ReactNode } from "react";
import type { ServiceData } from "@/data/servicesData";
import type { Locale } from "@/lib/i18n-config";
import { isLocale } from "@/lib/i18n-config";
import ServiceDescriptionStatic from "@/components/services/ServiceDescriptionStatic";

import frServices from "@/i18n/locales/fr/services.json";
import deServices from "@/i18n/locales/de/services.json";
import esServices from "@/i18n/locales/es/services.json";
import itServices from "@/i18n/locales/it/services.json";
import nlServices from "@/i18n/locales/nl/services.json";

export type ServiceFeatureGroup = {
  title: string;
  items: string[];
};

export type ServiceLocaleOverride = {
  title?: string;
  breadcrumbs?: { label: string }[];
  descriptionHeading?: string;
  descriptionParagraphs?: string[];
  featuresSection?: {
    title: string;
    subtitle: string;
    features: ServiceFeatureGroup[];
  };
  primaryCtaText?: string;
  secondaryCtaText?: string;
};

type Bundle = Record<string, ServiceLocaleOverride>;

const bundles: Partial<Record<Locale, Bundle>> = {
  fr: frServices as Bundle,
  de: deServices as Bundle,
  es: esServices as Bundle,
  it: itServices as Bundle,
  nl: nlServices as Bundle,
};

/**
 * Applies JSON translations for non-English locales. English uses `servicesData` as-is.
 */
export function mergeServiceWithLocale(
  service: ServiceData,
  locale: string
): ServiceData {
  if (!isLocale(locale) || locale === "en") {
    return service;
  }

  const bundle = bundles[locale]?.[service.slug];
  if (!bundle) {
    return service;
  }

  const breadcrumbs =
    bundle.breadcrumbs?.map((b, i) => ({
      label: b.label,
      href: service.breadcrumbs[i]?.href,
    })) ?? service.breadcrumbs;

  let description: ReactNode = service.description;
  if (
    bundle.descriptionParagraphs &&
    bundle.descriptionParagraphs.length > 0 &&
    bundle.descriptionHeading
  ) {
    description = (
      <ServiceDescriptionStatic
        heading={bundle.descriptionHeading}
        paragraphs={bundle.descriptionParagraphs}
      />
    );
  }

  const featuresSection =
    bundle.featuresSection != null
      ? {
          title: bundle.featuresSection.title,
          subtitle: bundle.featuresSection.subtitle,
          features: bundle.featuresSection.features.map((f) => ({
            title: f.title,
            items: [...f.items],
          })),
        }
      : service.featuresSection;

  return {
    ...service,
    title: bundle.title ?? service.title,
    breadcrumbs,
    description,
    featuresSection: featuresSection ?? service.featuresSection,
    primaryCtaText: bundle.primaryCtaText ?? service.primaryCtaText,
    secondaryCtaText: bundle.secondaryCtaText ?? service.secondaryCtaText,
  };
}
