"use client";

import React, { useMemo } from "react";
import PageHeader from "@/components/common/PageHeader";
import AIReviewFeature from "@/components/ai-review/AIReviewFeature";
import PortalFeature from "@/components/services/PortalFeature";
import ServiceFeatures from "@/components/services/ServiceFeatures";
import ReviewOutputSection from "@/components/ai-review/ReviewOutputSection";
import BenefitsVideoSection from "@/components/ai-review/BenefitsVideoSection";
import { FadeInUp } from "@/components/common/Animations";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

const AIReviewPage = () => {
  const { t } = usePagesTranslation("ai-review");

  const hero = useMemo(() => t("hero", { returnObjects: true }) as any, [t]);
  const demo = useMemo(() => t("demo", { returnObjects: true }) as any, [t]);
  const portalFeature = useMemo(() => t("portalFeature", { returnObjects: true }) as any, [t]);
  const output = useMemo(() => t("output", { returnObjects: true }) as any, [t]);
  const videoBenefits = useMemo(() => t("video_benefits", { returnObjects: true }) as any, [t]);

  const aiReviewServiceFeatures = useMemo(
    () => ({
      title: t("serviceFeatures.title"),
      subtitle: t("serviceFeatures.subtitle"),
      features: [0, 1, 2, 3, 4].map((g) => ({
        title: t(`serviceFeatures.groups.${g}.title`),
        items: [0, 1, 2, 3].map((i) => t(`serviceFeatures.groups.${g}.items.${i}`)),
      })),
    }),
    [t]
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <PageHeader title={t("pageHeader.title")} breadcrumbs={[{ label: t("pageHeader.breadcrumbs.0.label") }]} />
      </div>

      <FadeInUp>
        <AIReviewFeature hero={hero} demo={demo} />
      </FadeInUp>
      <FadeInUp delay={0.2}>
        <PortalFeature 
          portalImage="/assets/images/Frame 1618872451.png" 
          variant="technology"
          {...portalFeature}
        />
      </FadeInUp>
      <FadeInUp delay={0.4}>
        <ServiceFeatures
          title={aiReviewServiceFeatures.title}
          subtitle={aiReviewServiceFeatures.subtitle}
          features={aiReviewServiceFeatures.features}
        />
      </FadeInUp>
      <FadeInUp delay={0.6}>
        <ReviewOutputSection output={output} />
      </FadeInUp>
      <FadeInUp delay={0.8}>
        <BenefitsVideoSection cards={videoBenefits} />
      </FadeInUp>
    </main>
  );
};

export default AIReviewPage;
