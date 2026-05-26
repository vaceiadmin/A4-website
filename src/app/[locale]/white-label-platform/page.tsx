"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/contexts/LocaleContext";
import { withLocale } from "@/lib/localized-path";
import WLHero from "@/components/white-label/WLHero";
import WLBentoGrid from "@/components/white-label/WLBentoGrid";
import WLProcess from "@/components/white-label/WLProcess";
import WLInteractiveCards from "@/components/white-label/WLInteractiveCards";
import WLUseCaseDisplay from "@/components/white-label/WLUseCaseDisplay";
import WLPricing from "@/components/white-label/WLPricing";
import WLCTASection from "@/components/white-label/WLCTASection";
import FallBeamBackground from "@/components/common/FallBeam";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";
import { 
  Layout, 
  Users, 
  Workflow, 
  FileText, 
  Calendar, 
  Blocks,
  ShieldCheck,
  TrendingUp,
  Award,
  Layers,
  Briefcase,
  Zap,
  CheckCircle2,
} from "lucide-react";

const WhiteLabelPage = () => {
  const router = useRouter();
  const locale = useLocale();
  const { t } = usePagesTranslation("white-label-platform");
  
  const goContact = () => router.push(withLocale(locale, "/contact"));

  const whatYouGet = [
    { id: 1, title: t("whatYouGet.items.0.title"), description: t("whatYouGet.items.0.description"), icon: Layout, className: "md:col-span-3 lg:col-span-4 lg:row-span-2" },
    { id: 2, title: t("whatYouGet.items.1.title"), description: t("whatYouGet.items.1.description"), icon: Users, className: "md:col-span-3 lg:col-span-8" },
    { id: 3, title: t("whatYouGet.items.2.title"), description: t("whatYouGet.items.2.description"), icon: Briefcase, className: "md:col-span-3 lg:col-span-4" },
    { id: 4, title: t("whatYouGet.items.3.title"), description: t("whatYouGet.items.3.description"), icon: FileText, className: "md:col-span-3 lg:col-span-4" },
    { id: 5, title: t("whatYouGet.items.4.title"), description: t("whatYouGet.items.4.description"), icon: Calendar, className: "md:col-span-3 lg:col-span-4" },
  ];

  const howItWorks = [
    { id: 1, title: t("howItWorks.steps.0.title"), description: t("howItWorks.steps.0.description") },
    { id: 2, title: t("howItWorks.steps.1.title"), description: t("howItWorks.steps.1.description") },
    { id: 3, title: t("howItWorks.steps.2.title"), description: t("howItWorks.steps.2.description") },
  ];

  const whyChoose = [
    { id: 1, title: t("whyChoose.items.0.title"), description: t("whyChoose.items.0.description"), icon: Zap },
    { id: 2, title: t("whyChoose.items.1.title"), description: t("whyChoose.items.1.description"), icon: CheckCircle2 },
    { id: 3, title: t("whyChoose.items.2.title"), description: t("whyChoose.items.2.description"), icon: Workflow },
  ];

  const useCases = [
    { id: 1, title: t("useCases.items.0.title"), description: t("useCases.items.0.description"), icon: ShieldCheck },
    { id: 2, title: t("useCases.items.1.title"), description: t("useCases.items.1.description"), icon: ShieldCheck },
    { id: 3, title: t("useCases.items.2.title"), description: t("useCases.items.2.description"), icon: ShieldCheck },
    { id: 4, title: t("useCases.items.3.title"), description: t("useCases.items.3.description"), icon: ShieldCheck },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <WLHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        overview={t("hero.overview")}
        ctaText={t("hero.cta")}
        secondaryCtaText={t("hero.secondaryCta")}
        previewAlt={t("hero.previewAlt")}
        onCtaClick={goContact}
      />

      {/* Main Content Sections with Falling Beams Background */}
      <div className="relative">
        <FallBeamBackground beamColorClass="primary-blue" lineCount={25} className="z-0" />
        
        <div className="relative z-10">
          {/* What You Get Section - Bento Grid */}
          <WLBentoGrid
            sectionSubtitle={t("whatYouGet.badge")}
            sectionTitle={t("whatYouGet.title")}
            items={whatYouGet}
          />

          {/* How It Works Section - Vertical Timeline */}
          <WLProcess
            tagline={t("howItWorks.tagline")}
            sectionTitle={t("howItWorks.title")}
            description={t("howItWorks.description")}
            steps={howItWorks}
          />

          {/* Why Choose White-Label Section - Interactive Cards */}
          <WLInteractiveCards
            sectionSubtitle={t("whyChoose.badge")}
            sectionTitle={t("whyChoose.title")}
            items={whyChoose}
          />

          {/* Use Cases Section - Use Case Display */}
          <WLUseCaseDisplay
            sectionSubtitle={t("useCases.badge")}
            sectionTitle={t("useCases.title")}
            items={useCases}
          />

          {/* Pricing Section */}
          <WLPricing
            badgeText={t("pricing.badge")}
            title={t("pricing.title")}
            price={t("pricing.price")}
            period={t("pricing.period")}
            startsFromText={t("pricing.startsFrom")}
            description={t("pricing.description")}
            footnoteText={t("pricing.footnote")}
            capabilitiesText={t("pricing.capabilities")}
            fullAccessText={t("pricing.fullAccess")}
            trustedAcrossEuropeText={t("pricing.trustedLabel")}
            partnerLabelText={t("pricing.partnerLabel")}
            features={(t("pricing.features", { returnObjects: true }) as unknown as string[]) || []}
            ctaText={t("pricing.cta")}
            onCtaClick={goContact}
          />
        </div>
      </div>

      {/* Final CTA Section */}
      <WLCTASection
        badge={t("finalCta.badge")}
        title={t("finalCta.title")}
        subtitle={t("finalCta.subtitle")}
        ctaText={t("finalCta.cta")}
        onCtaClick={goContact}
      />
    </main>
  );
};

export default WhiteLabelPage;
