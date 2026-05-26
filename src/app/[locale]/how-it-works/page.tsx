"use client";

import React, { useMemo } from "react";
import PageHeader from "@/components/common/PageHeader";
import HowItWorksTimeline, { HowItWorksStep } from "@/components/how-it-works/HowItWorksTimeline";
import OngoingSupportSection from "@/components/common/OngoingSupportSection";
import { FadeInUp } from "@/components/common/Animations";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

const HowItWorksPage = () => {
  const { t } = usePagesTranslation("how-it-works");

  const steps: HowItWorksStep[] = useMemo(
    () =>
      [0, 1, 2, 3, 4].map((i) => ({
        id: t(`steps.${i}.id`),
        number: t(`steps.${i}.number`),
        title: t(`steps.${i}.title`),
        description: t(`steps.${i}.description`),
        image: t(`steps.${i}.image`),
      })),
    [t]
  );

  const sectionHeader = useMemo(
    () => ({
      badge: t("timelineSection.badge"),
      title: t("timelineSection.title"),
      subtitle: t("timelineSection.subtitle"),
    }),
    [t]
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <PageHeader title={t("pageHeader.title")} breadcrumbs={[{ label: t("pageHeader.breadcrumbs.0.label") }]} />
      </div>

      <FadeInUp>
        <HowItWorksTimeline steps={steps} sectionHeader={sectionHeader} />
      </FadeInUp>
      <FadeInUp delay={0.2}>
        <OngoingSupportSection />
      </FadeInUp>
    </main>
  );
};

export default HowItWorksPage;
