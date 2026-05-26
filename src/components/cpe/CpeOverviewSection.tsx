"use client";

import React, { useMemo } from "react";
import BenefitsCardsRow, { BenefitCard } from "@/components/ai-review/BenefitsCardsRow";
import SectionBadge from "@/components/common/SectionBadge";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

const CPE_CARD_ICONS = [
  "/assets/images/image 163.png",
  "/assets/images/image 164.png",
  "/assets/images/image 167.png",
  "/assets/images/image 168.png",
];

const CpeOverviewSection = () => {
  const { t } = usePagesTranslation("cpe");

  const cpeCards: BenefitCard[] = useMemo(
    () =>
      CPE_CARD_ICONS.map((icon, i) => ({
        icon,
        title: t(`cards.${i}.title`),
        description: t(`cards.${i}.description`),
      })),
    [t]
  );

  return (
    <section className="py-16 lg:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-12">
          <SectionBadge text={t("overview.badge")} className="text-heading" />
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-heading leading-tight">
            {t("overview.title")}
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray max-w-2xl mx-auto leading-relaxed">
            {t("overview.subtitle")}
          </p>
        </div>
      </div>

      <BenefitsCardsRow cards={cpeCards} columns={4} />
    </section>
  );
};

export default CpeOverviewSection;
