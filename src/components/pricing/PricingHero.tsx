"use client";

import React from "react";
import TextAnimation from "@/components/common/TextAnimation";
import SectionBadge from "@/components/common/SectionBadge";
import { usePerformance } from "@/contexts/ReduceMotionContext";
import { cn } from "@/lib/utils";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

const PricingHero = () => {
  const { isIPhone, isLowPerformance } = usePerformance();
  const { t } = usePagesTranslation("pricing");

  const checklist = [0, 1, 2].map((i) => t(`hero.checklist.${i}`));
  const cardRows = [0, 1, 2, 3].map((i) => t(`hero.card.rows.${i}`));

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-[#ecf0f0]">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/Background pattern.svg')",
          opacity: 0.07,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="relative z-10">
            <div
              className={cn(
                "border border-white/50 rounded-3xl p-8 md:p-12 lg:p-16 shadow-xl shadow-gray-100/50",
                isIPhone || isLowPerformance ? "bg-white/80" : "bg-white/60 backdrop-blur-xl"
              )}
            >
              <SectionBadge
                text={t("hero.badge")}
                className="bg-white border border-blue-100 text-[#3b49e6] mb-6 shadow-sm"
              />

              <TextAnimation
                text={t("hero.title")}
                as="h1"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1c35] mb-6 leading-tight tracking-tight"
              />

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>{t("hero.p1")}</p>
                <p>{t("hero.p2")}</p>

                <div className="flex flex-wrap gap-4 pt-4">
                  {checklist.map((label, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary-blue flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-base font-medium text-[#1a1c35]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 w-20 h-1.5 bg-primary-blue rounded-full opacity-80" />
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="relative">
              <div className="relative w-full aspect-square">
                <div className="absolute top-8 right-0 w-[85%] h-[85%] bg-linear-to-br from-blue-100 to-blue-50 rounded-3xl shadow-xl transform rotate-6 opacity-60" />
                <div className="absolute top-4 right-4 w-[90%] h-[90%] bg-linear-to-br from-blue-50 to-blue-100 rounded-3xl shadow-2xl transform rotate-3 opacity-80" />

                <div
                  className={cn(
                    "absolute top-0 left-0 w-full h-full border border-white/60 rounded-3xl shadow-2xl p-8 flex flex-col justify-between",
                    isIPhone || isLowPerformance ? "bg-white" : "bg-white/80 backdrop-blur-xl"
                  )}
                >
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-6">
                      <div className={cn("w-2 h-2 bg-[#3b49e6] rounded-full", !isIPhone && !isLowPerformance && "animate-pulse")} />
                      <span className="text-sm font-semibold text-[#3b49e6]">{t("hero.card.badge")}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-[#1a1c35] mb-4">{t("hero.card.title")}</h3>

                    <div className="space-y-3">
                      {cardRows.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#3b49e6] flex items-center justify-center text-white font-bold text-sm">
                            {idx + 1}
                          </div>
                          <span className="text-gray-600 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray">{t("hero.card.footer")}</span>
                      <svg className="w-6 h-6 text-[#3b49e6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {!isIPhone && !isLowPerformance && (
                <>
                  <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
                  <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingHero;
