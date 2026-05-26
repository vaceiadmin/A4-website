"use client";

import React from "react";
import PageHeader from "@/components/common/PageHeader";
import TechnologyOverview from "@/components/technology/TechnologyOverview";
import TechnologyComponent from "@/components/technology/TechnologyComponent";
import TechnologyRegulated from "@/components/technology/TechnologyRegulated";
import PortalFeature from "@/components/services/PortalFeature";
import { FadeInUp } from "@/components/common/Animations";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

const TechnologyPage = () => {
  const { t } = usePagesTranslation("technology");

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <PageHeader
          title={t("pageHeader.title")}
          breadcrumbs={[{ label: t("pageHeader.breadcrumbs.0.label") }]}
        />
      </div>

      <FadeInUp>
        <TechnologyOverview
          title={t("overview.title")}
          p1={t("overview.p1")}
          p2={t("overview.p2")}
          p3={t("overview.p3")}
          backgroundAlt={t("overview.backgroundAlt")}
          progressAlt={t("overview.progressAlt")}
          dataAlt={t("overview.dataAlt")}
        />
      </FadeInUp>
      <FadeInUp delay={0.2}>
        <PortalFeature
          variant="technology"
          portalImage="/assets/images/Frame 1618872736.png"
          sectionLabel={t("portalFeature.sectionLabel")}
          heading={t("portalFeature.heading")}
          description={t("portalFeature.description")}
          bulletIntro={t("portalFeature.bulletIntro")}
          bulletItems={[
            t("portalFeature.bulletItems.0"),
            t("portalFeature.bulletItems.1"),
            t("portalFeature.bulletItems.2"),
            t("portalFeature.bulletItems.3"),
          ]}
          closingText={t("portalFeature.closingText")}
          bottomTitle={t("portalFeature.bottomTitle")}
          bottomDescription={t("portalFeature.bottomDescription")}
          quoteText={t("portalFeature.quoteText")}
        />
      </FadeInUp>
      <FadeInUp delay={0.4}>
        <TechnologyComponent
          badge={t("component.badge")}
          title={t("component.title")}
          description={t("component.description")}
          readMoreText={t("component.readMore")}
          items={[
            {
              title: t("component.items.0.title"),
              description: t("component.items.0.description"),
              image: "/assets/images/image 173.png",
            },
            {
              title: t("component.items.1.title"),
              description: t("component.items.1.description"),
              image: "/assets/images/image 174.png",
            },
            {
              title: t("component.items.2.title"),
              description: t("component.items.2.description"),
              image: "/assets/images/image 175 (2).png",
            },
            {
              title: t("component.items.3.title"),
              description: t("component.items.3.description"),
              image: "/assets/images/image 176.png",
            },
          ]}
        />
      </FadeInUp>
      <FadeInUp delay={0.6}>
        <TechnologyRegulated
          title={t("regulated.title")}
          intro={t("regulated.intro")}
          features={[
            t("regulated.features.0"),
            t("regulated.features.1"),
            t("regulated.features.2"),
            t("regulated.features.3"),
          ]}
          footer={t("regulated.footer")}
          availabilityTitle={t("regulated.availability.title")}
          availabilityDescription={t("regulated.availability.description")}
          handleTitle={t("regulated.handleTitle")}
          workspaceCards={[
            {
              title: t("regulated.workspaceCards.0.title"),
              description: t("regulated.workspaceCards.0.description"),
              status: t("regulated.workspaceCards.0.status"),
              links: [
                t("regulated.workspaceCards.0.links.0"),
                t("regulated.workspaceCards.0.links.1"),
              ],
            },
            {
              title: t("regulated.workspaceCards.1.title"),
              description: t("regulated.workspaceCards.1.description"),
              links: [
                t("regulated.workspaceCards.1.links.0"),
                t("regulated.workspaceCards.1.links.1"),
              ],
            },
            {
              title: t("regulated.workspaceCards.2.title"),
              description: t("regulated.workspaceCards.2.description"),
              links: [
                t("regulated.workspaceCards.2.links.0"),
                t("regulated.workspaceCards.2.links.1"),
              ],
            },
            {
              title: t("regulated.workspaceCards.3.title"),
              description: t("regulated.workspaceCards.3.description"),
              links: [
                t("regulated.workspaceCards.3.links.0"),
                t("regulated.workspaceCards.3.links.1"),
              ],
            },
          ]}
        />
      </FadeInUp>
    </main>
  );
};

export default TechnologyPage;
