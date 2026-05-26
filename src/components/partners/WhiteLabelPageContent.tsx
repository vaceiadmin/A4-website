"use client";

import React, { useMemo } from "react";
import PageHeader from "@/components/common/PageHeader";
import ContentSection from "@/components/partners/ContentSection";
import Link from "next/link";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";
import { FadeInUp } from "@/components/common/Animations";

const WhiteLabelPageContent = () => {
  const { t } = usePagesTranslation("partners");

  const sections = useMemo(() => {
    // Assuming 6 sections as defined in JSON for whiteLabel
    return [0, 1, 2, 3, 4, 5].map((i) => ({
      title: t(`whiteLabel.sections.${i}.title`),
      content: t(`whiteLabel.sections.${i}.content`, { returnObjects: true }) as any as string[],
      list: t(`whiteLabel.sections.${i}.list`, { returnObjects: true }) as any as string[] | undefined,
    }));
  }, [t]);

  return (
    <main>
      <PageHeader
        title={t("whiteLabel.pageHeader.title")}
        breadcrumbs={[
          { label: t("whiteLabel.pageHeader.breadcrumbs.0.label"), href: "/partners" },
          { label: t("whiteLabel.pageHeader.breadcrumbs.1.label") }
        ]}
      />
      
      <section className="py-20 bg-section-light">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <FadeInUp>
                    <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-6">
                        {t("whiteLabel.hero.title")}
                    </h2>
                    <p className="text-lg text-text-gray leading-relaxed">
                        {t("whiteLabel.hero.description")}
                    </p>
                    <div className="mt-8">
                        <Link 
                            href="/contact" 
                            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-medium rounded-full shadow-lg hover:bg-primary-blue transition-all"
                        >
                            {t("whiteLabel.hero.cta")}
                        </Link>
                    </div>
                </FadeInUp>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                <FadeInUp delay={0.2}>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
                        <h3 className="text-2xl font-bold text-text-heading mb-4">{t("whiteLabel.experience.client.title")}</h3>
                        <p className="text-text-gray mb-8 flex-grow">{t("whiteLabel.experience.client.description")}</p>
                        <Link href="/client-portal" className="text-primary font-semibold hover:underline inline-flex items-center">
                            {t("whiteLabel.experience.client.cta")}
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </FadeInUp>

                <FadeInUp delay={0.4}>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
                        <h3 className="text-2xl font-bold text-text-heading mb-4">{t("whiteLabel.experience.audit.title")}</h3>
                        <p className="text-text-gray mb-8 flex-grow">{t("whiteLabel.experience.audit.description")}</p>
                        <Link href="/audit-portal" className="text-primary font-semibold hover:underline inline-flex items-center">
                            {t("whiteLabel.experience.audit.cta")}
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </FadeInUp>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-16 shadow-xl border border-gray-100 relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-text-heading mb-6">{t("whiteLabel.workingWith.title")}</h2>
                    <p className="text-lg text-text-gray mb-12 max-w-3xl leading-relaxed">
                        {t("whiteLabel.workingWith.description")}
                    </p>
                    
                    <div className="space-y-12">
                        {sections.map((section, idx) => (
                            <div key={idx} className="border-t border-gray-100 pt-10 first:border-t-0 first:pt-0">
                                <h3 className="text-xl font-bold text-text-heading mb-4">{section.title}</h3>
                                <div className="space-y-4">
                                    {section.content.map((p, pIdx) => (
                                        <p key={pIdx} className="text-text-gray">{p}</p>
                                    ))}
                                    {section.list && (
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 mt-6">
                                            {section.list.map((item, lIdx) => (
                                                <li key={lIdx} className="flex items-start text-text-gray text-sm">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-3 flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>
    </main>
  );
};

export default WhiteLabelPageContent;
