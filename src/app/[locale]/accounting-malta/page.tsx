import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "@/components/accounting-malta/accounting-malta.css";

import { resources } from "@/i18n/resources";

import HeroAccountingMalta from "@/components/accounting-malta/HeroAccountingMalta";
import TrustBandAccountingMalta from "@/components/accounting-malta/TrustBandAccountingMalta";
import PortalTabsAccountingMalta from "@/components/accounting-malta/PortalTabsAccountingMalta";
import WhyAccountingMalta from "@/components/accounting-malta/WhyAccountingMalta";
import CategorisationAccountingMalta from "@/components/accounting-malta/CategorisationAccountingMalta";
import ToggleHowAccountingMalta from "@/components/accounting-malta/ToggleHowAccountingMalta";
import ServicesAccountingMalta from "@/components/accounting-malta/ServicesAccountingMalta";
import HowStepsAccountingMalta from "@/components/accounting-malta/HowStepsAccountingMalta";
import TrackerAccountingMalta from "@/components/accounting-malta/TrackerAccountingMalta";
import PricingAccountingMalta from "@/components/accounting-malta/PricingAccountingMalta";
import SupportedByAccountingMalta from "@/components/accounting-malta/SupportedByAccountingMalta";
import TestimonialAccountingMalta from "@/components/accounting-malta/TestimonialAccountingMalta";
import CtaAccountingMalta from "@/components/accounting-malta/CtaAccountingMalta";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-accounting-malta-outfit",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-accounting-malta-fraunces",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const res = resources[locale as keyof typeof resources] || resources.en;
  const am = (res.services as { accountingMalta?: { meta?: { pageTitle?: string; pageDescription?: string } } })
    .accountingMalta;

  return {
    title: am?.meta?.pageTitle ?? "A4 — Accounting Services in Malta",
    description:
      am?.meta?.pageDescription ??
      "Professional accounting services in Malta. Dedicated accountants. Full financial visibility through your A4 portal.",
  };
}

export default function AccountingMaltaPage() {
  return (
    <main className={`accounting-malta-page-root accounting-malta-page ${outfit.variable} ${fraunces.variable}`}>
      <HeroAccountingMalta />
      <TrustBandAccountingMalta />
      <PortalTabsAccountingMalta />
      <WhyAccountingMalta />
      <CategorisationAccountingMalta />
      <ToggleHowAccountingMalta />
      <ServicesAccountingMalta />
      <HowStepsAccountingMalta />
      <TrackerAccountingMalta />
      <PricingAccountingMalta />
      <SupportedByAccountingMalta />
      <TestimonialAccountingMalta />
      <CtaAccountingMalta />
    </main>
  );
}
