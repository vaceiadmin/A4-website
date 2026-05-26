"use client";

import React, { useMemo } from "react";
import PageHeader from "@/components/common/PageHeader";
import FeatureSection from "@/components/common/FeatureSection";
import MissionVisionSection from "@/components/common/MissionVisionSection";
import ServiceFeatures from "@/components/services/ServiceFeatures";
import { FadeInUp } from "@/components/common/Animations";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

const AboutPage = () => {
  const { t } = usePagesTranslation("about");

  const aboutFeatures = useMemo(
    () => [
      {
        title: t("features.0.title"),
        description: t("features.0.description"),
        paragraph: t("features.0.paragraph"),
        reverseLayout: false,
      },
      {
        title: t("features.1.title"),
        description: t("features.1.description"),
        paragraph: t("features.1.paragraph"),
        reverseLayout: true,
      },
    ],
    [t]
  );

  const aboutServiceFeatures = useMemo(
    () => ({
      title: t("serviceFeatures.title"),
      subtitle: t("serviceFeatures.subtitle"),
      features: [0, 1, 2].map((i) => ({
        title: t(`serviceFeatures.groups.${i}.title`),
        items: [0, 1, 2, 3].map((j) => t(`serviceFeatures.groups.${i}.items.${j}`)),
      })),
    }),
    [t]
  );

  const missionVision = useMemo(
    () => ({
      mission: {
        title: t("missionVision.mission.title"),
        paragraphs: [0, 1, 2].map((i) => t(`missionVision.mission.paragraphs.${i}`)),
      },
      vision: {
        title: t("missionVision.vision.title"),
        paragraphs: [0, 1, 2].map((i) => t(`missionVision.vision.paragraphs.${i}`)),
      },
    }),
    [t]
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <PageHeader title={t("pageHeader.title")} breadcrumbs={[{ label: t("pageHeader.breadcrumbs.0.label") }]} />
      </div>

      <FadeInUp>
        <FeatureSection features={aboutFeatures} />
      </FadeInUp>
      <FadeInUp delay={0.2}>
        <MissionVisionSection mission={missionVision.mission} vision={missionVision.vision} />
      </FadeInUp>
      <FadeInUp delay={0.4}>
        <ServiceFeatures
          title={aboutServiceFeatures.title}
          subtitle={aboutServiceFeatures.subtitle}
          features={aboutServiceFeatures.features}
        />
      </FadeInUp>
    </main>
  );
};

export default AboutPage;
