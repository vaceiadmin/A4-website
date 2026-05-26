"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { FadeInUp } from "@/components/common/Animations";
import GradientContainer from "@/components/common/GradientContainer";
import { usePerformance } from "@/contexts/ReduceMotionContext";
import { cn } from "@/lib/utils";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

const EXPECTATION_ICONS = [
  <svg key="e0" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>,
  <svg key="e1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>,
  <svg key="e2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="e3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
  </svg>,
];

const WhatToExpect = () => {
  const { t } = usePagesTranslation("pricing");
  const { isIPhone, isLowPerformance } = usePerformance();

  const expectations = useMemo(
    () =>
      [0, 1, 2, 3].map((i) => ({
        icon: EXPECTATION_ICONS[i],
        title: t(`whatToExpect.items.${i}.title`),
        description: t(`whatToExpect.items.${i}.description`),
      })),
    [t]
  );

  const chips = [0, 1, 2].map((i) => t(`whatToExpect.chips.${i}`));

  return (
    <GradientContainer
      backgroundColor="bg-[#020410]"
      showRadials={!isIPhone && !isLowPerformance}
      className="py-20 lg:py-28 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 z-10">
        <div className="text-center mb-16">
          <FadeInUp>
            <div
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-6",
                isIPhone || isLowPerformance ? "" : "backdrop-blur-md"
              )}
            >
              <div className={cn("w-2 h-2 bg-white rounded-full", !isIPhone && !isLowPerformance && "animate-pulse")} />
              <span className="text-sm font-semibold text-white">{t("whatToExpect.badge")}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight mb-8">{t("whatToExpect.title")}</h2>
            <p className="text-white/80 text-lg max-w-3xl mx-auto">{t("whatToExpect.subtitle")}</p>
          </FadeInUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {expectations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={cn(
                "group relative border border-white/20 rounded-2xl p-8 transition-all duration-300",
                isIPhone || isLowPerformance ? "bg-white/10" : "bg-white/10 backdrop-blur-md hover:bg-white/15"
              )}
            >
              <div
                className={cn(
                  "w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-white mb-6 transition-all duration-300",
                  isIPhone || isLowPerformance ? "" : "backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/20"
                )}
              >
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-white/70 leading-relaxed">{item.description}</p>

              <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-tr-2xl rounded-bl-full" />
            </motion.div>
          ))}
        </div>

        <FadeInUp delay={0.4}>
          <div
            className={cn(
              "relative border border-white/20 rounded-3xl p-8 md:p-12 overflow-hidden",
              isIPhone || isLowPerformance ? "bg-white/10" : "bg-white/10 backdrop-blur-xl"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <div
                className={cn(
                  "w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white mx-auto mb-6",
                  isIPhone || isLowPerformance ? "" : "backdrop-blur-sm"
                )}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{t("whatToExpect.bottomTitle")}</h3>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">{t("whatToExpect.bottomBody")}</p>

              <div className="flex flex-wrap gap-4 justify-center">
                {chips.map((label, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20",
                      isIPhone || isLowPerformance ? "" : "backdrop-blur-sm"
                    )}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-medium text-white">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </GradientContainer>
  );
};

export default WhatToExpect;
