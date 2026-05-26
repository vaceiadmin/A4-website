"use client";

import React, { useMemo } from "react";
import GradientContainer from "@/components/common/GradientContainer";
import HowItWorksTimeline, { HowItWorksStep } from "@/components/how-it-works/HowItWorksTimeline";
import { FadeInUp } from "../common/Animations";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

interface ClientPortalFeaturesTimelineSectionProps {
  /** `pages` route key, e.g. `portal/client-portal` */
  routeKey?: string;
}

const ClientPortalFeaturesTimelineSection = ({
  routeKey = "portal/client-portal",
}: ClientPortalFeaturesTimelineSectionProps) => {
  const { t } = usePagesTranslation(routeKey);

  const steps = useMemo((): HowItWorksStep[] => {
    const raw = t("timeline.steps", { returnObjects: true });
    if (!Array.isArray(raw)) return [];
    return raw as HowItWorksStep[];
  }, [t]);

  const sectionHeader = useMemo(
    () => ({
      badge: t("timeline.header.badge"),
      title: t("timeline.header.title"),
      subtitle: t("timeline.header.subtitle"),
    }),
    [t]
  );

  return (
    <section className="py-16 lg:py-24 bg-neutral-950">
      <div>
        <FadeInUp>
          <GradientContainer
            showRadials={true}
            backgroundColor="bg-neutral-950"
            className="rounded-2xl px-4 md:px-8 py-10 md:py-12 lg:py-14"
          >
            <HowItWorksTimeline
              steps={steps}
              backgroundClassName="bg-transparent"
              mode="dark"
              sectionHeader={sectionHeader}
            />
          </GradientContainer>
        </FadeInUp>
      </div>
    </section>
  );
};

export default ClientPortalFeaturesTimelineSection;
