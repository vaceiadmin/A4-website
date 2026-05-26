"use client";

import React, { useMemo } from "react";
import PageHeader from "@/components/common/PageHeader";
import ContentSection from "@/components/partners/ContentSection";
import Link from "next/link";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

const ServiceDeliveryPageContent = () => {
  const { t } = usePagesTranslation("partners");

  const sections = useMemo(() => {
    // Assuming 9 sections as defined in JSON
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
      title: t(`serviceDelivery.sections.${i}.title`),
      content: t(`serviceDelivery.sections.${i}.content`, { returnObjects: true }) as any as string[],
      list: t(`serviceDelivery.sections.${i}.list`, { returnObjects: true }) as any as string[] | undefined,
    }));
  }, [t]);

  return (
    <main>
      <PageHeader
        title={t("serviceDelivery.pageHeader.title")}
        breadcrumbs={[
          { label: t("serviceDelivery.pageHeader.breadcrumbs.0.label"), href: "/partners" },
          { label: t("serviceDelivery.pageHeader.breadcrumbs.1.label") }
        ]}
      />
      
      <ContentSection 
        title={t("serviceDelivery.hero.title")} 
        description={t("serviceDelivery.hero.description")}
        sections={sections}
      >
        <div className="flex justify-center pt-8">
            <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-medium rounded-full shadow-lg hover:bg-primary-blue transition-all"
            >
                {t("serviceDelivery.hero.cta")}
            </Link>
        </div>
      </ContentSection>
    </main>
  );
};

export default ServiceDeliveryPageContent;
