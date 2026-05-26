"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionBadge from "@/components/common/SectionBadge";
import TextAnimation from "@/components/common/TextAnimation";
import { FadeInUp } from "@/components/common/Animations";
import LocalizedLink from "@/components/common/LocalizedLink";
import { usePerformance } from "@/contexts/ReduceMotionContext";
import { cn } from "@/lib/utils";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

type CategoryKey = "essentials" | "strategic" | "corporate";

const CATEGORY_KEYS: CategoryKey[] = ["essentials", "strategic", "corporate"];

/** Matches `pages-pricing-extra.json` highlight flags per tab */
const HIGHLIGHTS: Record<CategoryKey, [boolean, boolean]> = {
  essentials: [true, false],
  strategic: [false, true],
  corporate: [false, true],
};

const PricingOverviewSection = () => {
  const { t } = usePagesTranslation("pricing");
  const [activeTab, setActiveTab] = useState<CategoryKey>("essentials");
  const { isIPhone, isLowPerformance } = usePerformance();

  const tabLabels = [0, 1, 2].map((i) => t(`overview.tabs.${i}`));
  const cards = [0, 1].map((i) => ({
    title: t(`overview.${activeTab}.${i}.title`),
    intro: t(`overview.${activeTab}.${i}.intro`),
    scope: t(`overview.${activeTab}.${i}.scope`),
    features: [0, 1, 2, 3].map((j) => t(`overview.${activeTab}.${i}.features.${j}`)),
    highlight: HIGHLIGHTS[activeTab][i],
  }));

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[#f8fafc]">
      {!isIPhone && !isLowPerformance && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[80px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[80px]" />
        </div>
      )}

      <div className="relative max-w-6xl mx-auto px-4 md:px-6 lg:px-8 z-10">
        <div className="text-center mb-12">
          <FadeInUp>
            <SectionBadge
              text={t("overview.badge")}
              className={cn(
                "border border-gray-200 text-heading shadow-sm",
                isIPhone || isLowPerformance ? "bg-white" : "bg-white/80 backdrop-blur-md"
              )}
            />
            <TextAnimation
              text={t("overview.title")}
              as="h2"
              className="mt-6 text-3xl md:text-5xl font-medium text-heading tracking-tight"
            />
            <p className="mt-4 text-gray text-lg max-w-2xl mx-auto">{t("overview.subtitle")}</p>
          </FadeInUp>
        </div>

        <div className="flex justify-center mb-16">
          <div
            className={cn(
              "p-1.5 rounded-full border border-white/60 shadow-sm flex gap-1 relative",
              isIPhone || isLowPerformance ? "bg-white" : "bg-white/40 backdrop-blur-xl"
            )}
          >
            {CATEGORY_KEYS.map((key, idx) => {
              const label = tabLabels[idx];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 z-10 ${
                    activeTab === key ? "text-white" : "text-gray hover:text-heading"
                  }`}
                >
                  {activeTab === key && (
                    <motion.div
                      layoutId={isIPhone || isLowPerformance ? undefined : "glassTab"}
                      className="absolute inset-0 bg-primary-blue rounded-full shadow-lg shadow-blue-500/30"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center"
            >
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={cn(
                    "group relative p-8 rounded-3xl border transition-all duration-500 flex flex-col",
                    isIPhone || isLowPerformance ? "" : "backdrop-blur-md",
                    card.highlight
                      ? "bg-white/80 border-white shadow-xl shadow-blue-100/50 hover:shadow-2xl hover:shadow-blue-200/50"
                      : "bg-white/40 border-white/50 hover:bg-white/60 hover:border-white shadow-sm hover:shadow-lg"
                  )}
                >
                  {card.highlight && (
                    <div className="absolute inset-0 rounded-3xl border-2 border-primary-blue/5 pointer-events-none" />
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-heading mb-2">{card.title}</h3>
                    <p className="text-gray text-sm">{card.intro}</p>
                  </div>

                  <div className="grow space-y-4 mb-8">
                    {card.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-heading opacity-80">
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                            card.highlight ? "bg-blue-50 text-primary-blue" : "bg-gray-100 text-gray"
                          )}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-100/50">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray/60 mb-1">
                      {t("overview.pricingModelLabel")}
                    </p>
                    <p className="text-base font-semibold text-primary-blue">{card.scope}</p>
                  </div>
                </div>
              ))}

              <div
                className={cn(
                  "group relative p-8 rounded-3xl border border-white/60 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all",
                  isIPhone || isLowPerformance ? "bg-white" : "bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-md"
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4 transition-transform duration-300",
                    !isIPhone && !isLowPerformance && "group-hover:scale-110"
                  )}
                >
                  <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-heading mb-2">{t("overview.contactCard.title")}</h3>
                <p className="text-sm text-gray mb-6">{t("overview.contactCard.description")}</p>
                <LocalizedLink
                  href="/quote#process-steps"
                  className="px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-blue transition-colors shadow-lg inline-flex items-center justify-center"
                >
                  {t("overview.contactCard.cta")}
                </LocalizedLink>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PricingOverviewSection;
