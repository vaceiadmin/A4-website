"use client";

import React from "react";
import PageHeader from "@/components/common/PageHeader";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

const CookiePolicyPage = () => {
  const { t } = usePagesTranslation("cookie-policy");

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <PageHeader title={t("pageHeader.title")} breadcrumbs={[{ label: t("pageHeader.breadcrumbs.0.label") }]} />
      </div>

      <section className=" mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20 space-y-10 text-sm md:text-base text-text-secondary">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">{t("intro")}</p>

        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-text-dark">{t("sections.0.heading")}</h2>
          <p>{t("sections.0.body")}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-text-dark">{t("sections.1.heading")}</h2>
          <p>{t("sections.1.paragraphs.0")}</p>
          <p>{t("sections.1.paragraphs.1")}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-text-dark">{t("sections.2.heading")}</h2>
          <p>{t("sections.2.intro")}</p>
          <ul className="list-disc list-inside space-y-1">
            {[0, 1, 2, 3].map((i) => (
              <li key={i}>
                <span className="font-medium text-text-dark">{t(`sections.2.list.${i}.label`)}</span>{" "}
                {t(`sections.2.list.${i}.text`)}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-text-dark">{t("sections.3.heading")}</h2>
          <p>{t("sections.3.paragraphs.0")}</p>
          <p>{t("sections.3.paragraphs.1")}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-text-dark">{t("sections.4.heading")}</h2>
          <p>{t("sections.4.paragraphs.0")}</p>
          <p>{t("sections.4.paragraphs.1")}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-text-dark">{t("sections.5.heading")}</h2>
          <p>{t("sections.5.body")}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-text-dark">{t("sections.6.heading")}</h2>
          <p>{t("sections.6.paragraphs.0")}</p>
          <p className="text-xs text-muted-foreground">
            {t("sections.6.lastUpdatedLabel")} {new Date().getFullYear()}
          </p>
        </div>
      </section>
    </main>
  );
};

export default CookiePolicyPage;
