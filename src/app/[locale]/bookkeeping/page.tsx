import React from "react";
import type { Metadata } from "next";

// Import all components
import HeroSection from "@/components/bookkeeping/HeroSection";
import TrustStrip from "@/components/bookkeeping/TrustStrip";
import WhatIsVacei from "@/components/bookkeeping/WhatIsVacei";
import VideoSection from "@/components/bookkeeping/VideoSection";
import FeaturesSection from "@/components/bookkeeping/FeaturesSection";
import HowItWorks from "@/components/bookkeeping/HowItWorks";
import PortalVisibility from "@/components/bookkeeping/PortalVisibility";
import PricingSection from "@/components/bookkeeping/PricingSection";
import CredibilitySection from "@/components/bookkeeping/CredibilitySection";
import TestimonialSection from "@/components/bookkeeping/TestimonialSection";
import FinalCta from "@/components/bookkeeping/FinalCta";

import { resources } from "@/i18n/resources";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const res = resources[locale as keyof typeof resources] || resources.en;
  const bookkeeping = (res.services as any).bookkeeping;

  return {
    title: bookkeeping.pageTitle || "VACEI — Bookkeeping for Malta Businesses",
    description:
      bookkeeping.pageDescription ||
      "Outsource your bookkeeping in Malta. VACEI gives Malta businesses real-time visibility over their finances, with a dedicated bookkeeping team.",
  };
}

export default function BookkeepingPage() {
  return (
    <main className="bookkeeping-page-wrapper">
      <HeroSection />
      <TrustStrip />
      <WhatIsVacei />
      <VideoSection />
      <FeaturesSection />
      <HowItWorks />
      <PortalVisibility />
      <PricingSection />
      <CredibilitySection />
      <TestimonialSection />
      <FinalCta />
    </main>
  );
}
