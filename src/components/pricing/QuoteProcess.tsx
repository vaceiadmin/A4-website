"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import TextAnimation from "@/components/common/TextAnimation";
import { FadeInUp } from "@/components/common/Animations";
import SectionBadge from "@/components/common/SectionBadge";
import { usePerformance } from "@/contexts/ReduceMotionContext";
import { cn } from "@/lib/utils";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

const STEP_ICONS = [
  <svg key="s0" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>,
  <svg key="s1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
    />
  </svg>,
  <svg key="s2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>,
  <svg key="s3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
];

const QuoteProcess = () => {
  const { t } = usePagesTranslation("pricing");
  const { isIPhone, isLowPerformance } = usePerformance();

  const steps = useMemo(
    () =>
      [0, 1, 2, 3].map((i) => ({
        number: t(`quoteProcess.steps.${i}.number`),
        title: t(`quoteProcess.steps.${i}.title`),
        description: t(`quoteProcess.steps.${i}.description`),
        icon: STEP_ICONS[i],
      })),
    [t]
  );

  const quoteIncludes = [0, 1, 2, 3, 4, 5].map((i) => t(`quoteProcess.quoteIncludes.${i}`));

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[#D8E5E5]">
      {/* Wave Background Pattern */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/Background pattern.svg')",
          opacity: 0.07,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeInUp>
            <SectionBadge
              text={t("quoteProcess.badge")}
              className="bg-white border border-blue-100 text-[#3b49e6] shadow-sm"
            />
            <TextAnimation
              text={t("quoteProcess.title")}
              as="h2"
              className="mt-6 text-3xl md:text-5xl font-medium text-[#1a1c35] tracking-tight"
            />
            <p className="mt-4 text-gray-600 text-lg max-w-3xl mx-auto">{t("quoteProcess.subtitle")}</p>
          </FadeInUp>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200/50 via-blue-300/50 to-blue-200/50" style={{ width: 'calc(100% - 8rem)', left: '4rem' }} />
            
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative"
              >
                {/* Step Card */}
                <div className={cn(
                  "relative border border-white/60 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group",
                  isIPhone || isLowPerformance ? "bg-white" : "bg-white/70 backdrop-blur-md"
                )}>
                  {/* Number Badge */}
                  <div className={cn(
                    "absolute -top-4 left-6 w-12 h-12 rounded-xl bg-[#3b49e6] flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 transition-transform duration-300",
                    !isIPhone && !isLowPerformance && "group-hover:scale-110"
                  )}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mt-8 mb-4 w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-[#3b49e6] border border-blue-100">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-[#1a1c35] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quote Includes Section */}
        <FadeInUp delay={0.3}>
          <div className={cn(
            "border border-white/60 rounded-3xl p-8 md:p-12 shadow-2xl shadow-blue-100/30",
            isIPhone || isLowPerformance ? "bg-white" : "bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl"
          )}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-6">
                  <svg className="w-4 h-4 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-[#3b49e6]">{t("quoteProcess.includesBadge")}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-[#1a1c35] mb-4">{t("quoteProcess.everyTitle")}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">{t("quoteProcess.everyBody")}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {quoteIncludes.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#3b49e6] flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-[#1a1c35]">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right: Visual Element */}
              <div className="relative">
                <div className="relative bg-white/90 rounded-2xl p-8 shadow-xl border border-gray-100">
                  {/* Mock Quote Document */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                      <div className="w-10 h-10 rounded-lg bg-primary-blue/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-heading text-sm">{t("quoteProcess.mockTitle")}</h4>
                        <p className="text-xs text-gray">{t("quoteProcess.mockSubtitle")}</p>
                      </div>
                    </div>

                    {[1, 2, 3, 4].map((_, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="h-3 bg-gray-100 rounded-full" style={{ width: `${90 - idx * 10}%` }} />
                        <div className="h-3 bg-gray-100 rounded-full" style={{ width: `${70 - idx * 5}%` }} />
                      </div>
                    ))}

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray">{t("quoteProcess.mockFooter")}</span>
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                {!isIPhone && !isLowPerformance && (
                  <>
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl -z-10" />
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl -z-10" />
                  </>
                )}
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* Scope Change Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            "mt-12 border border-blue-100 rounded-2xl p-6 flex items-start gap-4",
            isIPhone || isLowPerformance ? "bg-blue-50" : "bg-blue-50/50 backdrop-blur-sm"
          )}
        >
          <div className="w-10 h-10 rounded-lg bg-primary-blue/10 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-heading mb-2">{t("quoteProcess.scopeTitle")}</h4>
            <p className="text-sm text-gray leading-relaxed">{t("quoteProcess.scopeBody")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteProcess;
