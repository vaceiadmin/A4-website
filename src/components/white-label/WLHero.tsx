"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import NextImage from "next/image";
import { useTranslation } from "react-i18next";
import LiquidSurface from "../common/background";


interface WLHeroProps {
  /** Small uppercase label in the pill above the headline */
  title: string;
  /** Main headline (H1) */
  subtitle: string;
  overview: string;
  ctaText: string;
  secondaryCtaText?: string;
  /** When "plain", the headline is rendered as one line/block (no per-word highlight). */
  headlineVariant?: "words" | "plain";
  trustLine?: string;
  onCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
  previewAlt?: string;
  imagePlaceholder?: string;
  highlightWords?: string[];
}

const WLHero: React.FC<WLHeroProps> = ({
  title,
  subtitle,
  overview,
  ctaText,
  secondaryCtaText,
  headlineVariant = "words",
  trustLine,
  previewAlt,
  onCtaClick,
  onSecondaryCtaClick,
  imagePlaceholder,
  highlightWords = [],
}) => {
  const { t } = useTranslation("pages");
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const rotate = useTransform(scrollY, [0, 500], [0, 4]);

  const currentImage = imagePlaceholder || "/assets/images/portal.png";
  const currentAlt = previewAlt || t("white-label-platform.hero.previewAlt");

  return (
    <section className="relative w-full overflow-hidden bg-[#111235]">
      {/* Liquid Surface Background Layer */}
      <div className="absolute inset-0 z-0">
        <LiquidSurface
          scheme={5}
          speed={1.4}
          intensity={1.5}
          colors={["#3b49e6", "#4a5feb", "#5b6ef5", "#3b49e6", "#2f3bc4", "#2536a8"]}
          darkNavyColor="#3b49e6"
          showCursor={false}
        />
        {/* Subtle Overlay to make it feel integrated */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111235]/60 via-transparent to-[#111235]/90 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column: Content */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-black tracking-[0.25em] uppercase mb-10 shadow-xl">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-blue animate-pulse shadow-[0_0_10px_rgba(59,73,230,0.8)]" />
                {title}
              </div>

              <h1 className="text-5xl sm:text-7xl font-black text-white leading-[1.1] mb-10 tracking-tight">
                {headlineVariant === "plain" ? (
                  <span className="block">{subtitle}</span>
                ) : (
                  subtitle.split(" ").map((word, i) => (
                    <span key={i} className="inline-block mr-[0.25em]">
                      {highlightWords.includes(word) ? (
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
                          {word}
                        </span>
                      ) : (
                        word
                      )}
                    </span>
                  ))
                )}
              </h1>

              <p className="text-xl lg:text-2xl text-blue-100/80 max-w-xl leading-relaxed mb-8 font-medium">
                {overview}
              </p>

              {trustLine ? (
                <p className="text-base sm:text-lg text-white/70 max-w-xl leading-relaxed mb-10 font-medium border-l-2 border-white/25 pl-4">
                  {trustLine}
                </p>
              ) : null}

              <div className="flex flex-col sm:flex-row gap-6">
                <button
                  type="button"
                  onClick={onCtaClick}
                  className="group relative px-12 py-6 bg-white text-primary-blue rounded-3xl font-black text-xl overflow-hidden transition-all duration-300 hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)] active:scale-95"
                >
                  <span className="relative z-10">{ctaText}</span>
                </button>

                {secondaryCtaText ? (
                  <button
                    type="button"
                    onClick={onSecondaryCtaClick ?? onCtaClick}
                    className="px-12 py-6 bg-transparent border-2 border-white/20 text-white rounded-3xl font-black text-xl hover:bg-white/10 transition-all duration-300"
                  >
                    {secondaryCtaText}
                  </button>
                ) : null}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Premium Glass Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative perspective-2000"
          >
            <motion.div
              style={{ rotateY: rotate, rotateX: rotate }}
              className="relative z-10 w-full aspect-[16/11] rounded-[3.5rem] p-4 bg-white/10 backdrop-blur-2xl border border-white/30 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/20"
            >
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-slate-100 relative group">
                <NextImage
                  src={currentImage}
                  alt={currentAlt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Glassy Interface Detail */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Sharp SVG V-Shape Bottom Divider with 5px Border */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="relative block w-full h-[120px] lg:h-[180px]"
        >
          {/* V-Shape Shadow/Border Layer (5px equivalent in stroke) */}
          <path
            d="M0 0 L50 100 L100 0"
            fill="none"
            stroke="#3b49e6"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* Main V-Shape Fill */}
          <path d="M0 0 L50 100 L100 0 V100 H0 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
};

export default WLHero;
