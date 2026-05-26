"use client";

import React, { useMemo } from "react";
import PageHeader from "@/components/common/PageHeader";
import PartnerCard from "@/components/partners/PartnerCard";
import { FadeInUp } from "@/components/common/Animations";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

const PartnersPageContent = () => {
  const { t } = usePagesTranslation("partners");

  const partnerModels = useMemo(
    () =>
      [0, 1, 2, 3].map((i) => ({
        title: t(`models.${i}.title`),
        description: t(`models.${i}.description`),
        link: t(`models.${i}.link`),
        iconIndex: Number(t(`models.${i}.iconIndex`)),
      })),
    [t]
  );

  const assessmentItems = useMemo(
    () =>
      [0, 1, 2, 3, 4, 5].map((i) => ({
        title: t(`assessmentItems.${i}.title`),
        body: t(`assessmentItems.${i}.body`),
      })),
    [t]
  );

  return (
    <main>
      <PageHeader title={t("pageHeader.title")} breadcrumbs={[{ label: t("pageHeader.breadcrumbs.0.label") }]} />

      <section className="py-20 lg:py-28 bg-section-light relative">
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: `url("/assets/images/Noise.png")` }}
        />

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 lg:mb-20">
            <FadeInUp>
              <h2 className="text-3xl md:text-5xl font-bold text-text-heading mb-6">{t("collaborationTitle")}</h2>
              <p className="text-lg text-text-gray max-w-3xl mx-auto leading-relaxed">{t("collaborationSubtitle")}</p>
            </FadeInUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {partnerModels.map((model, index) => (
              <PartnerCard
                key={model.link}
                title={model.title}
                description={model.description}
                link={model.link}
                learnMoreText={t("learnMore")}
                iconIndex={model.iconIndex}
                delay={index * 0.1}
              />
            ))}
          </div>

          <div className="mt-24 max-w-4xl mx-auto">
            <FadeInUp delay={0.4}>
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
                <h2 className="text-2xl md:text-3xl font-bold text-text-heading mb-8 text-center">{t("assessmentTitle")}</h2>
                <p className="text-text-gray mb-8 text-center leading-relaxed">{t("assessmentIntro")}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {assessmentItems.map((item) => (
                    <div key={item.title}>
                      <h3 className="font-bold text-text-heading mb-2">{item.title}</h3>
                      <p className="text-sm text-text-gray">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PartnersPageContent;
