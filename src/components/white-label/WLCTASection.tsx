"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import LiquidSurface from "../common/background";


interface WLCTASectionProps {
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  secondaryCtaText?: string;
  onCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
  /** Fine print below the buttons */
  footerLine?: string;
}

const WLCTASection: React.FC<WLCTASectionProps> = ({
  badge,
  title,
  subtitle,
  ctaText,
  secondaryCtaText,
  onCtaClick,
  onSecondaryCtaClick,
  footerLine,
}) => {
  return (
    <section className="py-20 bg-primary-blue relative overflow-hidden">
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
        {/* Deepen the top for the V-shape transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-primary-blue/30 pointer-events-none" />
      </div>

      {/* Top SVG V-Shape Divider (Inverted) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] fill-white transform rotate-180 z-10">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px] lg:h-[100px]"
        >
          <path d="M0 0 L50 100 L100 0 V100 H0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-black tracking-widest uppercase text-xs"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            {badge}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="pt-4 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4"
          >
            <button
              type="button"
              onClick={onCtaClick}
              className="group relative px-16 py-6 bg-white text-primary-blue rounded-[2rem] font-black text-xl shadow-[0_30px_60px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden flex items-center justify-center gap-4"
            >
              {ctaText}
              <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            {secondaryCtaText ? (
              <button
                type="button"
                onClick={onSecondaryCtaClick ?? onCtaClick}
                className="px-14 py-6 rounded-[2rem] font-black text-xl border-2 border-white/40 text-white hover:bg-white/10 transition-all duration-300"
              >
                {secondaryCtaText}
              </button>
            ) : null}
          </motion.div>

          {footerLine?.trim() ? (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm sm:text-base text-white/70 max-w-3xl mx-auto leading-relaxed pt-6 border-t border-white/10 mt-8"
            >
              {footerLine}
            </motion.p>
          ) : null}
        </div>
      </div>

      {/* Sophisticated light leaks */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
};

export default WLCTASection;
