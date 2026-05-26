"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionBadge from "@/components/common/SectionBadge";
import { FadeInUp } from "@/components/common/Animations";

export interface HowItWorksStep {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
}

export type HowItWorksTimelineHeader = {
  badge: string;
  title: string;
  subtitle: string;
};

interface HowItWorksTimelineProps {
  steps: HowItWorksStep[];
  backgroundClassName?: string;
  mode?: "light" | "dark";
  showHeader?: boolean;
  /** Localized header when `showHeader` is true */
  sectionHeader?: HowItWorksTimelineHeader;
}

const HowItWorksTimeline = ({
  steps,
  backgroundClassName = "bg-section-light",
  mode = "light",
  showHeader = true,
  sectionHeader,
}: HowItWorksTimelineProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isDark = mode === "dark";

  return (
    <section className={`${backgroundClassName} py-16 lg:py-24 overflow-hidden`}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header (optional) */}
        {showHeader && sectionHeader && (
          <FadeInUp className="text-center mb-14 lg:mb-16">
            <SectionBadge
              text={sectionHeader.badge}
              className={
                isDark
                  ? "border-white/60 !text-white/80"
                  : "border-primary-blue text-heading"
              }
            />
            <h2
              className={`mt-4 text-3xl md:text-4xl font-semibold leading-tight ${
                isDark ? "text-white" : "text-heading"
              }`}
            >
              {sectionHeader.title}
            </h2>
            <p
              className={`mt-3 text-sm md:text-base max-w-2xl mx-auto leading-relaxed ${
                isDark ? "text-light-gray" : "text-gray"
              }`}
            >
              {sectionHeader.subtitle}
            </p>
          </FadeInUp>
        )}

        {/* Timeline */}
        <div className="relative">
          {/* Center dashed + animated solid line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2">
            <div className="relative w-[2px] h-full">
              <div className="absolute inset-0 border-l-2 border-dashed border-primary-blue" />
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] bg-primary-blue"
                style={{ originY: 0 }}
                initial={{ height: 0 }}
                animate={{
                  height: `${
                    steps.length > 1
                      ? (activeIndex / (steps.length - 1)) * 100
                      : 100
                  }%`,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              const isActive = index === activeIndex;
              const isCompleted = index < activeIndex;

              return (
                <motion.div
                  key={step.id}
                  data-index={index}
                  className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 md:gap-10"
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.45 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  onViewportEnter={() => setActiveIndex(index)}
                  onViewportLeave={(entry) => {
                    // When scrolling up and this card leaves viewport, move active index back
                    if (entry && entry.boundingClientRect) {
                      const goingUp = entry.boundingClientRect.top > 0;
                      if (goingUp && index === activeIndex && index > 0) {
                        setActiveIndex(index - 1);
                      }
                    }
                  }}
                >
                  {/* Left column */}
                  <div className={isLeft ? "order-1" : "order-3 md:order-1"} />

                  {/* Center node (global line handled separately) */}
                  <div className="order-2 flex items-center justify-center md:order-2">
                    <div className="relative flex items-center justify-center">
                      <motion.div
                        className={`w-4 h-4 rounded-full border-2 bg-section-light ${
                          isCompleted || isActive
                            ? "shadow-[0_0_0_6px_var(--primary-blue-shadow)]"
                            : ""
                        }`}
                        animate={
                          isCompleted || isActive
                            ? {
                                borderColor: "var(--primary-blue)",
                                backgroundColor: "var(--primary-blue)",
                              }
                            : {
                                borderColor: "var(--primary-blue)",
                                backgroundColor: "var(--background)",
                              }
                        }
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Card column */}
                  <div
                    className={`order-3 md:order-3 ${
                      isLeft ? "md:col-start-1" : "md:col-start-3"
                    }`}
                  >
                    <div
                      className={`max-w-lg md:max-w-none bg-hero-dark text-white rounded-2xl shadow-lg border border-black/10 px-6 py-6 md:px-7 md:py-7 transition-all duration-500 ${
                        isActive
                          ? "opacity-100 translate-y-0"
                          : "opacity-70 translate-y-2"
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-3 text-xs md:text-sm text-light-gray uppercase tracking-[0.2em]">
                        <span className="text-light-gray font-semibold">
                          {step.number}
                        </span>
                        <span className="text-white">{step.title}</span>
                      </div>
                      <p className="text-xs md:text-sm text-light-gray leading-relaxed mb-4 whitespace-pre-line">
                        {step.description}
                      </p>
                      <div className="relative mt-3 rounded-2xl bg-white px-4 py-4">
                        <div className="relative w-full aspect-[4/3] md:aspect-[5/3]">
                          <Image
                            src={step.image}
                            alt={step.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 480px"
                            className="object-contain"
                            priority={index === 0}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksTimeline;
