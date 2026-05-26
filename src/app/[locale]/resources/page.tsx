"use client";

import React from "react";
import LocalizedLink from "@/components/common/LocalizedLink";
import PageHeader from "@/components/common/PageHeader";
import { FadeInUp, StaggerContainer } from "@/components/common/Animations";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

export default function ResourcesPage() {
  const { t } = usePagesTranslation("resources");

  const resourceLinks = [0, 1, 2, 3, 4, 5, 6].map((i) => ({
    label: t(`links.${i}.label`),
    href: t(`links.${i}.href`),
    description: t(`links.${i}.description`),
  }));

  return (
    <main>
      <PageHeader title={t("pageHeader.title")} breadcrumbs={[{ label: t("pageHeader.breadcrumbs.0.label") }]} />
      <section className="w-full py-16 lg:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resourceLinks.map((item, index) => (
              <FadeInUp key={item.href} className="block">
                <LocalizedLink
                  href={item.href}
                  className="block p-6 rounded-2xl bg-background-secondary border border-input hover:border-primary-blue hover:shadow-lg transition-all duration-300 group h-full"
                >
                  <h3 className="text-heading font-semibold text-lg group-hover:text-primary-blue transition-colors">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm text-gray">{item.description}</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-primary-blue text-sm font-medium group-hover:gap-2 transition-all">
                    {t("visit")}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </LocalizedLink>
              </FadeInUp>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </main>
  );
}
