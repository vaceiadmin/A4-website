"use client";

import React, { useMemo } from "react";
import PageHeader from "@/components/common/PageHeader";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";
import ClientPortalOverviewSection from "@/components/client-portal/ClientPortalOverviewSection";
import PortalFeature from "@/components/services/PortalFeature";
import RiskAuditSection from "@/components/accounting/RiskAuditSection";
import HowItWorksTimeline, { HowItWorksStep } from "@/components/how-it-works/HowItWorksTimeline";
import ServiceFeatures from "@/components/services/ServiceFeatures";

const ROUTE = "portal/audit-portal";

type BulletedSection = {
  title: string;
  intro?: string;
  bullets: string[];
  footer?: string;
};

const AuditPortalPage = () => {
  const { t } = usePagesTranslation(ROUTE);

  const overview1Paragraphs = useMemo(() => {
    const raw = t("overview1.paragraphs", { returnObjects: true });
    return Array.isArray(raw) ? (raw as string[]) : [];
  }, [t]);

  const featureBullets = useMemo(() => {
    const raw = t("feature.bulletItems", { returnObjects: true });
    return Array.isArray(raw) ? (raw as string[]) : [];
  }, [t]);

  const workflowSteps = useMemo((): HowItWorksStep[] => {
    const raw = t("workflowSteps", { returnObjects: true });
    return Array.isArray(raw) ? (raw as HowItWorksStep[]) : [];
  }, [t]);

  const serviceFeatureBlocks = useMemo(() => {
    const raw = t("serviceFeatures.features", { returnObjects: true });
    return Array.isArray(raw) ? (raw as { title: string; items: string[] }[]) : [];
  }, [t]);

  const overview2Sections = useMemo(() => {
    const raw = t("overview2.sections", { returnObjects: true });
    return Array.isArray(raw) ? (raw as BulletedSection[]) : [];
  }, [t]);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <PageHeader
          title={t("pageHeader.title")}
          breadcrumbs={[{ label: t("pageHeader.breadcrumbs.0.label") }]}
        />
      </div>

      <ClientPortalOverviewSection
        variant="audit"
        i18nRouteKey={ROUTE}
        heading={t("overview1.heading")}
        paragraphs={overview1Paragraphs}
      />

      <PortalFeature
        portalImage="/assets/images/Audit.jpg"
        sectionLabel={t("feature.sectionLabel")}
        heading={t("feature.heading")}
        description={t("feature.description")}
        bulletIntro={t("feature.bulletIntro")}
        bulletItems={featureBullets}
        closingText={t("feature.closingText")}
        bottomTitle={t("feature.bottomTitle")}
        bottomDescription={t("feature.bottomDescription")}
        quoteText={t("feature.quoteText")}
        workflowDetail={{
          heading: t("feature.workflowHeading"),
          description: t("feature.workflowDescription"),
        }}
      />

      <RiskAuditSection variant="audit" />

      <HowItWorksTimeline
        steps={workflowSteps}
        backgroundClassName="bg-[#AAACC8]"
        mode="dark"
        showHeader={false}
      />

      <ServiceFeatures
        title={
          <>
            {t("serviceFeatures.titleLine1")}
            <br />
            {t("serviceFeatures.titleLine2")}
          </>
        }
        description={t("serviceFeatures.description")}
        features={serviceFeatureBlocks}
        bulletIconSrc="/assets/images/bullet2.png"
        bulletIconAlt="Bullet"
      />

      <ClientPortalOverviewSection
        variant="audit"
        i18nRouteKey={ROUTE}
        bulletedSections={overview2Sections}
        bulletIconSrc="/assets/images/bullet.png"
      />
    </main>
  );
};

export default AuditPortalPage;
