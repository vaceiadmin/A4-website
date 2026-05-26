"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import GradientContainer from "../common/GradientContainer";
import GetInstantQuoteButton from "../common/GetInstantQuoteButton";
import TextAnimation from "../common/TextAnimation";
import { FadeInUp } from "../common/Animations";
import { usePerformance } from "@/contexts/ReduceMotionContext";

interface ServiceFeatureProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;

  features: {
    title: React.ReactNode;
    items: string[];
  }[];
  bulletIconSrc?: string;
  bulletIconAlt?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  description?: React.ReactNode;
  /** When true, hides the CTA buttons block entirely */
  hideCta?: boolean;
}


const ServiceFeatures = ({
  title,
  subtitle,
  features,
  bulletIconSrc,
  bulletIconAlt = "Item",
  backgroundColor,
  theme = "dark",
  showRadials = true,
  primaryCtaText,
  primaryCtaHref,
  secondaryCtaText,
  secondaryCtaHref,
  description,
  hideCta = false,

}: ServiceFeatureProps & {
  backgroundColor?: string;
  theme?: "light" | "dark";
  showRadials?: boolean;
}) => {
  const { isIPhone, isLowPerformance } = usePerformance();
  const isDark = theme === "dark";
  const styles = {
    heading: isDark ? "text-white" : "text-text-heading",
    subheading: isDark ? "text-white/70" : "text-text-gray",
    cardBg: isDark ? "bg-hero border-white/10" : "bg-white border-gray-200 shadow-sm",
    cardTitle: isDark ? "text-white" : "text-text-heading",
    cardBody: isDark ? "text-light-gray group-hover:text-white" : "text-text-gray group-hover:text-text-heading",
    iconStroke: isDark ? "stroke-white" : "stroke-text-heading",
    iconFill: isDark ? "fill-white" : "fill-text-heading",
  };
  return (
    <GradientContainer
      className="py-20 lg:py-24 px-4 sm:px-6 md:px-8 overflow-hidden"
      backgroundColor={backgroundColor || (isDark ? "bg-[#020410]" : "bg-primary")}
      showRadials={showRadials}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column: Title and CTA */}
          <FadeInUp className="flex flex-col justify-start pt-0">
            {typeof title === "string" ? (
              <TextAnimation
                text={title}
                as="h2"
                className={`text-3xl md:text-5xl font-medium mb-6 leading-tight max-w-lg ${styles.heading}`}
              />
            ) : (
              <h2 className={`text-3xl md:text-5xl font-medium mb-6 leading-tight max-w-lg ${styles.heading}`}>
                {title}
              </h2>
            )}
            
            {(subtitle || description) && (
              <p className={`text-base md:text-lg mb-10 max-w-md ${styles.subheading}`}>
                {subtitle || description}
              </p>
            )}


            {!hideCta && (
              <div className="flex flex-wrap items-center gap-3">
                {primaryCtaText || secondaryCtaText ? (
                  <>
                    {primaryCtaText && (
                      <GetInstantQuoteButton
                        variant="custom"
                        text={primaryCtaText}
                        href={primaryCtaHref || "/quote"}
                        hasShadow={true}
                        className={isDark ? "" : "bg-primary-blue text-white"}
                      />
                    )}
                    {secondaryCtaText && (
                      <GetInstantQuoteButton
                        variant="custom"
                        text={secondaryCtaText}
                        href={secondaryCtaHref || "/quote"}
                        hasShadow={false}
                        bgColor={isDark ? "transparent" : "transparent"}
                        textColor={isDark ? "#ffffff" : "#111827"}
                        borderColor={isDark ? "rgba(255,255,255,0.4)" : "rgba(37, 99, 235, 0.6)"}
                      />
                    )}
                  </>
                ) : (
                  <GetInstantQuoteButton hasShadow={true} />
                )}
              </div>
            )}
          </FadeInUp>

          {/* Right Column: Feature Cards */}
          <div className="space-y-4 w-full">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={isIPhone || isLowPerformance ? {} : { scale: 1.02 }}
                className={`group ${styles.cardBg} p-6 md:p-8 rounded-2xl transition-all duration-300 hover:border-primary-blue/50 hover:shadow-lg hover:shadow-primary-blue/10 hardware-accelerated`}
              >

                <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                  <h3 className={`${styles.cardTitle} font-medium text-lg min-w-[140px] pt-1 group-hover:text-primary-blue transition-colors duration-300`}>
                    {feature.title}
                  </h3>
                  <ul className="space-y-5 flex-1">
                    {feature.items.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 + (idx * 0.05) }}
                        className={`flex items-start gap-4 text-[15px] ${styles.cardBody} leading-relaxed transition-colors duration-300`}
                      >
                        <div className="mt-1 shrink-0">
                          {bulletIconSrc ? (
                            <Image
                              src={bulletIconSrc}
                              alt={bulletIconAlt}
                              width={16}
                              height={16}
                              className="w-4 h-4"
                            />
                          ) : (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="group-hover:text-primary-blue transition-colors duration-300"
                            >
                              <circle
                                opacity="0.2"
                                cx="10"
                                cy="10"
                                r="9"
                                stroke="currentColor"
                                className={`${styles.iconStroke} group-hover:stroke-primary-blue transition-colors duration-300`}
                              />
                              <path 
                                d="M10 6L14 10L10 14L6 10Z" 
                                fill="currentColor" 
                                className={`${styles.iconFill} group-hover:fill-primary-blue transition-colors duration-300`}
                              />
                            </svg>
                          )}
                        </div>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </GradientContainer>
  );
};

export default ServiceFeatures;

