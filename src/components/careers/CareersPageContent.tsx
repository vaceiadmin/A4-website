"use client";

import React, { useMemo } from "react";
import PageHeader from "@/components/common/PageHeader";
import ContactHRForm from "@/components/careers/ContactHRForm";
import BenefitsSection from "@/components/careers/BenefitsSection";
import JobOpenings from "@/components/careers/JobOpenings";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

const CareersPageContent = () => {
  const { t } = usePagesTranslation("careers");

  const benefits = useMemo(() => t("benefits", { returnObjects: true }) as any, [t]);
  const talentNetwork = useMemo(() => t("talentNetwork", { returnObjects: true }) as any, [t]);
  const openPositions = useMemo(() => t("openPositions", { returnObjects: true }) as any, [t]);

  return (
    <main>
      <PageHeader title={t("pageHeader.title")} breadcrumbs={[{ label: t("pageHeader.breadcrumbs.0.label") }]} />
      <BenefitsSection 
        title={benefits?.title} 
        subtitle={benefits?.subtitle} 
        features={benefits?.features} 
      />
      <JobOpenings 
        title={openPositions?.title}
        subtitle={openPositions?.subtitle}
        applyNowText={openPositions?.applyNow}
        jobs={openPositions?.jobs}
      />
      <ContactHRForm 
        title={talentNetwork?.title}
        subtitle={talentNetwork?.subtitle}
        emailLabel={talentNetwork?.emailLabel}
        form={talentNetwork?.form}
      />
    </main>
  );
};

export default CareersPageContent;
