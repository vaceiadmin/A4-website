"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

interface WLPricingProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  badgeText?: string;
  startsFromText?: string;
  footnoteText?: string;
  capabilitiesText?: string;
  fullAccessText?: string;
  trustedAcrossEuropeText?: string;
  partnerLabelText?: string;
  onCtaClick?: () => void;
}

const WLPricing: React.FC<WLPricingProps> = ({
  title,
  price,
  period,
  description,
  features,
  ctaText,
  badgeText,
  startsFromText,
  footnoteText,
  capabilitiesText,
  fullAccessText,
  trustedAcrossEuropeText,
  partnerLabelText,
  onCtaClick,
}) => {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary-blue/5 rounded-full blur-[140px] opacity-40 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-20 space-y-6">
          {badgeText?.trim() ? (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-blue/5 text-primary-blue font-bold tracking-widest uppercase text-[12px] border border-primary-blue/10 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4" />
              {badgeText}
            </motion.span>
          ) : null}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl sm:text-7xl font-black text-text-dark tracking-tight leading-[1.1]"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-xl text-gray/60 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative group bg-white rounded-[4rem] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.1)] border border-gray-100/80 p-2 overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-blue/[0.02] to-transparent pointer-events-none" />

            <div className="relative bg-white rounded-[3.8rem] p-10 lg:p-16 flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">

              {/* Price Column */}
              <div className="w-full lg:w-[45%] flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-10">
                <div className="space-y-4">
                  {startsFromText?.trim() ? (
                    <span className="text-sm font-black text-primary-blue/60 uppercase tracking-[0.3em] ml-1">
                      {startsFromText}
                    </span>
                  ) : null}
                  <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-baseline gap-x-4 gap-y-1">
                    <span className="text-6xl sm:text-7xl md:text-8xl font-black text-text-dark tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-text-dark to-text-dark/80 whitespace-nowrap">
                      {price}
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-gray/30 whitespace-nowrap">
                      {period}
                    </span>
                  </div>
                </div>

                <div className="w-full space-y-6">
                  <button
                    onClick={onCtaClick}
                    className="group/btn relative w-full sm:w-auto px-14 py-6 bg-primary-blue text-white rounded-3xl font-black text-xl overflow-hidden transition-all duration-500 hover:shadow-[0_25px_60px_-15px_rgba(59,73,230,0.5)] hover:-translate-y-1 active:scale-95"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {ctaText}
                      <Sparkles className="w-5 h-5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    </span>
                  </button>

                  <p className="text-sm font-semibold text-gray/40 lg:ml-2">
                    {footnoteText}
                  </p>
                </div>
              </div>

              {/* Specs Column */}
              <div className="w-full lg:w-[55%] relative">
                <div className="absolute inset-0 bg-gray-50/40 backdrop-blur-md rounded-[3rem] border border-gray-100/50 -rotate-1 lg:rotate-1 scale-105 pointer-events-none" />

                <div className="relative bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/60 p-10 lg:p-12 shadow-xl shadow-gray-200/20 space-y-10">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-8">
                    <h4 className="text-2xl font-black text-text-dark">{capabilitiesText}</h4>
                    <div className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-black uppercase tracking-wider border border-emerald-100">
                      {fullAccessText}
                    </div>
                  </div>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-y-7 gap-x-10">
                    {features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center gap-4 text-gray/70 font-bold group/item"
                      >
                        <div className="w-8 h-8 shrink-0 rounded-xl bg-gradient-to-br from-primary-blue to-blue-700 text-white flex items-center justify-center p-2 shadow-lg shadow-primary-blue/30 group-hover/item:scale-110 transition-all duration-300">
                          <Check strokeWidth={3} className="w-full h-full" />
                        </div>
                        <span className="text-[17px] group-hover/item:text-text-dark transition-colors duration-300 leading-tight">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="pt-6 mt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-6">
                    <div className="flex -space-x-3.5">
                      {[
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150",
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=150&h=150",
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=150&h=150",
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=crop&w=150&h=150"
                      ].map((url, n) => (
                        <div
                          key={n}
                          className="w-11 h-11 rounded-full border-[3px] border-white shadow-sm overflow-hidden bg-gray-100"
                        >
                          <img
                            src={url}
                            alt={`Professional Avatar ${n + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-black text-text-dark tracking-tight uppercase">{trustedAcrossEuropeText}</span>
                      <span className="text-[12px] font-bold text-gray/40">{partnerLabelText}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WLPricing;
