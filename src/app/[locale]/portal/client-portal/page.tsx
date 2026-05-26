"use client";

import React, { useMemo } from "react";
import PageHeader from "@/components/common/PageHeader";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";
import ClientPortalOverviewSection from "@/components/client-portal/ClientPortalOverviewSection";
import ClientPortalFeaturesTimelineSection from "@/components/client-portal/ClientPortalFeaturesTimelineSection";
import PortalFeature from "@/components/services/PortalFeature";
import { FadeInUp } from "@/components/common/Animations";

const ROUTE = "portal/client-portal";

const ClientPortalPage = () => {
  const { t } = usePagesTranslation(ROUTE);

  const paragraphs = useMemo(() => {
    const raw = t("overview.paragraphs", { returnObjects: true });
    return Array.isArray(raw) ? (raw as string[]) : [];
  }, [t]);

  const bulletItems = useMemo(() => {
    const raw = t("feature.bulletItems", { returnObjects: true });
    return Array.isArray(raw) ? (raw as string[]) : [];
  }, [t]);

  return (
    <main className="min-h-screen bg-background">
      <div className="w-full">
        <PageHeader
          title={t("pageHeader.title")}
          breadcrumbs={[{ label: t("pageHeader.breadcrumbs.0.label") }]}
        />
      </div>

      <FadeInUp>
        <ClientPortalOverviewSection
          variant="client"
          i18nRouteKey={ROUTE}
          heading={t("overview.heading")}
          paragraphs={paragraphs}
        />
      </FadeInUp>
      <FadeInUp delay={0.2}>
        <PortalFeature
          variant="upload-dashboard"
          portalImage="/assets/images/image copy.png"
          sectionLabel={t("feature.sectionLabel")}
          heading={t("feature.heading")}
          description={t("feature.description")}
          bulletIntro={t("feature.bulletIntro")}
          bulletItems={bulletItems}
          closingText={t("feature.closingText")}
          bottomTitle={t("feature.bottomTitle")}
          bottomDescription={t("feature.bottomDescription")}
        />
      </FadeInUp>
      <FadeInUp delay={0.4}>
        <ClientPortalFeaturesTimelineSection routeKey={ROUTE} />
      </FadeInUp>
    </main>
  );
};

export default ClientPortalPage;
