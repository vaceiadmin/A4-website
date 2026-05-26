"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextAnimation from "@/components/common/TextAnimation";
import { FadeInUp } from "@/components/common/Animations";
import SectionBadge from "@/components/common/SectionBadge";
import { usePerformance } from "@/contexts/ReduceMotionContext";
import { cn } from "@/lib/utils";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

const FACTOR_ICONS = [
  <svg key="i0" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>,
  <svg key="i1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>,
  <svg key="i2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>,
  <svg key="i3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  <svg key="i4" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>,
  <svg key="i5" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
];

const PricingFactors = () => {
  const { t } = usePagesTranslation("pricing");
  const [selectedId, setSelectedId] = useState(1);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { isIPhone, isLowPerformance } = usePerformance();

  const pricingFactors = useMemo(
    () =>
      [0, 1, 2, 3, 4, 5].map((i) => ({
        id: i + 1,
        icon: FACTOR_ICONS[i],
        title: t(`factors.items.${i}.title`),
        shortDesc: t(`factors.items.${i}.shortDesc`),
        details: [0, 1, 2, 3].map((j) => t(`factors.items.${i}.details.${j}`)),
        highlight: t(`factors.items.${i}.highlight`),
      })),
    [t]
  );

  const selectedFactor = pricingFactors.find((f) => f.id === selectedId) ?? pricingFactors[0];
  const total = pricingFactors.length;

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/Background pattern.svg')",
          opacity: 0.05,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 z-10">
        <div className="text-center mb-16">
          <FadeInUp>
            <SectionBadge
              text={t("factors.badge")}
              className="bg-white border border-blue-100 text-primary-blue shadow-sm"
            />
            <TextAnimation
              text={t("factors.title")}
              as="h2"
              className="mt-6 text-3xl md:text-5xl font-medium text-[#1a1c35] tracking-tight"
            />
            <p className="mt-4 text-gray-600 text-lg max-w-3xl mx-auto">{t("factors.subtitle")}</p>
          </FadeInUp>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {pricingFactors.map((factor, index) => (
            <motion.button
              key={factor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedId(factor.id)}
              onMouseEnter={() => !isIPhone && !isLowPerformance && setHoveredId(factor.id)}
              onMouseLeave={() => !isIPhone && !isLowPerformance && setHoveredId(null)}
              className={cn(
                "group relative p-6 rounded-2xl text-left transition-all duration-500",
                selectedFactor.id === factor.id
                  ? "bg-primary-blue text-white shadow-2xl shadow-primary-blue/30 scale-105"
                  : cn(
                      "bg-white border border-gray-100",
                      isIPhone || isLowPerformance ? "" : "backdrop-blur-md hover:shadow-xl hover:border-primary-blue/30"
                    )
              )}
            >
              {selectedFactor.id === factor.id && (
                <motion.div
                  layoutId={isIPhone || isLowPerformance ? undefined : "selectedGlow"}
                  className="absolute inset-0 bg-primary-blue rounded-2xl -z-10"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              <motion.div
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300",
                  selectedFactor.id === factor.id ? "bg-white/20" : "bg-primary-blue text-white"
                )}
                whileHover={isIPhone || isLowPerformance ? {} : { scale: 1.1, rotate: 5 }}
                whileTap={isIPhone || isLowPerformance ? {} : { scale: 0.95 }}
              >
                {factor.icon}
              </motion.div>

              <h3
                className={cn(
                  "text-lg font-bold mb-2 transition-colors",
                  selectedFactor.id === factor.id ? "text-white" : "text-[#1a1c35]"
                )}
              >
                {factor.title}
              </h3>

              <p
                className={cn(
                  "text-sm leading-relaxed",
                  selectedFactor.id === factor.id ? "text-white/90" : "text-gray-600"
                )}
              >
                {factor.shortDesc}
              </p>

              <div
                className={cn(
                  "absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                  selectedFactor.id === factor.id ? "bg-white/20 text-white" : "bg-primary-blue/10 text-primary-blue"
                )}
              >
                {factor.id}
              </div>

              {hoveredId === factor.id && selectedFactor.id !== factor.id && !isIPhone && !isLowPerformance && (
                <motion.div
                  layoutId="hoverBorder"
                  className="absolute inset-0 border-2 border-primary-blue/50 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFactor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={cn(
              "bg-gradient-to-br from-white to-gray-50/50 border border-gray-100 rounded-3xl p-8 md:p-12 shadow-2xl",
              isIPhone || isLowPerformance ? "" : "backdrop-blur-xl"
            )}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary-blue flex items-center justify-center text-white shadow-lg shadow-primary-blue/30">
                    {selectedFactor.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-primary-blue mb-1">
                      {t("factors.factorLabel", { id: selectedFactor.id })}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#1a1c35]">{selectedFactor.title}</h3>
                  </div>
                </div>

                <p className="text-gray-600 text-lg mb-6 leading-relaxed">{selectedFactor.shortDesc}</p>

                <div className="space-y-3">
                  {selectedFactor.details.map((detail, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 group"
                    >
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full bg-primary-blue flex items-center justify-center shrink-0 mt-0.5 transition-transform",
                          !isIPhone && !isLowPerformance && "group-hover:scale-110"
                        )}
                      >
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[#1a1c35] font-medium">{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <motion.div
                  className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-lg"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-blue flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary-blue mb-1">{t("factors.keyInsight")}</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{selectedFactor.highlight}</p>
                    </div>
                  </div>
                </motion.div>

                <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-md">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span className="font-semibold">
                      {t("factors.viewingFactor", { current: selectedFactor.id, total })}
                    </span>
                    <span className="text-primary-blue font-bold">
                      {Math.round((selectedFactor.id / total) * 100)}%
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary-blue to-blue-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(selectedFactor.id / total) * 100}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <motion.div
                  className="p-4 rounded-xl bg-gray-50 border border-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-xs text-gray-600 text-center">
                    <span className="font-semibold">{t("factors.tip")}</span> {t("factors.tipBody")}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PricingFactors;
