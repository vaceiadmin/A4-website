"use client";

import React, { useMemo } from "react";
import PageHeader from "@/components/common/PageHeader";
import ContentSection from "@/components/partners/ContentSection";
import Link from "next/link";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

const ResellerProgramPageContent = () => {
  const { t } = usePagesTranslation("partners");

  const sections = useMemo(() => {
    // Assuming 9 sections as defined in JSON
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
      title: t(`reseller.sections.${i}.title`),
      content: t(`reseller.sections.${i}.content`, { returnObjects: true }) as any as string[],
      list: t(`reseller.sections.${i}.list`, { returnObjects: true }) as any as string[] | undefined,
    }));
  }, [t]);

  return (
    <main>
      <PageHeader
        title={t("reseller.pageHeader.title")}
        breadcrumbs={[
          { label: t("reseller.pageHeader.breadcrumbs.0.label"), href: "/partners" },
          { label: t("reseller.pageHeader.breadcrumbs.1.label") }
        ]}
      />
      
      <ContentSection 
        title={t("reseller.hero.title")} 
        description={t("reseller.hero.description")}
        sections={sections}
      >
        <div className="flex justify-center pt-8">
            <Link 
                href="/quote#process-steps" 
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-medium rounded-full shadow-lg hover:bg-primary-blue transition-all"
            >
                {t("reseller.hero.cta")}
            </Link>
        </div>
      </ContentSection>
    </main>
  );
};

export default ResellerProgramPageContent;
