"use client";

import { motion } from "framer-motion";
import { FileText, Upload, Check, AlertTriangle } from "lucide-react";
import GradientContainer from "../common/GradientContainer";
import TextAnimation from "../common/TextAnimation";
import { FadeInUp, StaggerContainer } from "../common/Animations";
import { usePerformance } from "@/contexts/ReduceMotionContext";
import { cn } from "@/lib/utils";

interface AIReviewFeatureProps {
  hero: {
    title: string;
    p1: string;
    p2: string;
    p3: string;
  };
  demo: {
    file_ready: string;
    file_name: string;
    categories_title: string;
    categories: string[];
    btn_generate: string;
    upload_title: string;
    upload_drop: string;
    upload_click: string;
    upload_limit: string;
    results_title: string;
    correct_items: string;
    critical_errors: string;
    labels: {
      general: string;
      balance_sheet: string;
    };
  };
}

const AIReviewFeature = ({ hero, demo }: AIReviewFeatureProps) => {
  const { isIPhone, isLowPerformance } = usePerformance();

  const categories = demo.categories || [];

  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Interactive UI Demo */}
          <div className="relative">
            {/* Ambient Background Blobs - Hidden on iPhone for performance */}
            {!isIPhone && !isLowPerformance && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <motion.div 
                  animate={{ 
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 left-0 w-[60%] h-[60%] bg-primary-blue/10 blur-[100px] rounded-full"
                />
                <motion.div 
                  animate={{ 
                    x: [0, -20, 0],
                    y: [0, 30, 0],
                    scale: [1.1, 1, 1.1]
                  }}
                  transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-0 right-0 w-[60%] h-[60%] bg-primary-blue/10 blur-[100px] rounded-full"
                />
              </div>
            )}

            <GradientContainer
              showRadials={false}
              className="p-8 min-h-[600px] flex items-center justify-center text-left bg-transparent"
            >
              <StaggerContainer className="w-full max-w-[480px] grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-min">
                {/* Card 1: Analysis Setup */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  animate={isIPhone || isLowPerformance ? { y: 0 } : { y: [0, -8, 0] }}
                  transition={isIPhone || isLowPerformance ? { opacity: { duration: 0.5 } } : { 
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 0.5 }
                  }}
                  className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-5 h-full border border-gray-100/50"
                >
                  <div className="text-left space-y-3">
                    <TextAnimation
                      text={demo.file_ready}
                      as="h3"
                      className="font-semibold text-heading text-[13px] leading-tight"
                    />
                    <div className="flex items-center gap-3 p-3 bg-icon border border-input rounded-xl relative overflow-hidden group">
                      <div className="w-8 h-8 rounded-full bg-white border border-input flex items-center justify-center shrink-0 shadow-sm">
                        <FileText className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="min-w-0 flex flex-col">
                        <p className="text-[11px] font-semibold text-heading truncate max-w-[120px]">
                          {demo.file_name}
                        </p>
                        <p className="text-[10px] text-gray-400">0.25 MB</p>
                      </div>
                      {/* Scan pulse effect on the file - Simplified on iPhone */}
                      {!isIPhone && !isLowPerformance && (
                        <motion.div 
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 bg-linear-to-r from-transparent via-primary-blue/5 to-transparent skew-x-12"
                        />
                      )}
                    </div>
                  </div>

                  <div className="text-left space-y-3">
                    <h3 className="font-semibold text-heading text-[13px] leading-tight">
                      {demo.categories_title}
                    </h3>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                      {categories.map((label, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 group cursor-pointer"
                        >
                          <div
                            className={cn(
                              "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                              label === categories[categories.length - 1] ? "border-primary bg-primary" : "border-input group-hover:border-input"
                            )}
                          >
                            {label === categories[categories.length - 1] && (
                              <Check className="w-2.5 h-2.5 text-white stroke-3" />
                            )}
                          </div>
                          <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap">
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <motion.button 
                    whileHover={isIPhone ? {} : { scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={isIPhone || isLowPerformance ? { boxShadow: "0 0 10px rgba(0,102,255,0.1)" } : { boxShadow: ["0 0 0 rgba(0,102,255,0)", "0 0 20px rgba(0,102,255,0.2)", "0 0 0 rgba(0,102,255,0)"] }}
                    transition={isIPhone || isLowPerformance ? {} : { duration: 2, repeat: Infinity }}
                    className="mt-auto w-full py-2.5 bg-primary hover:bg-hero transition-all rounded-lg text-white text-[11px] font-semibold shadow-md shadow-primary-blue"
                  >
                    {demo.btn_generate}
                  </motion.button>
                </motion.div>

                {/* Card 2: Upload */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  animate={isIPhone || isLowPerformance ? { y: 0 } : { y: [0, -12, 0] }}
                  transition={isIPhone || isLowPerformance ? { opacity: { duration: 0.5, delay: 0.2 } } : { 
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                    opacity: { duration: 0.5, delay: 0.2 }
                  }}
                  className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center text-center h-full border border-gray-100/50 relative overflow-hidden"
                >
                  {/* Scanning beam animation - Hidden on iPhone */}
                  {!isIPhone && !isLowPerformance && (
                    <motion.div 
                      animate={{ y: ["-100%", "400%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary-blue/30 to-transparent blur-sm z-20"
                    />
                  )}
                  
                  <TextAnimation
                    text={demo.upload_title}
                    as="h3"
                    className="font-semibold text-heading text-[13px] mb-5 w-[80%] leading-relaxed"
                  />
                  <div className="flex-1 w-full border border-dashed border-input rounded-xl p-4 flex flex-col items-center justify-center gap-3 bg-icon/50 hover:bg-icon transition-colors cursor-pointer group relative">
                    <div className="w-9 h-9 rounded-full bg-white border border-input flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Upload className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-heading">
                        {demo.upload_drop}
                      </p>
                      <p className="text-[11px] font-bold text-heading">
                        {demo.upload_click}
                      </p>
                    </div>
                    <p className="text-[9px] text-gray-400">
                      {demo.upload_limit}
                    </p>
                  </div>
                </motion.div>

                {/* Card 3: Results (Spans full width) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  animate={isIPhone || isLowPerformance ? { y: 0 } : { y: [0, -10, 0] }}
                  transition={isIPhone || isLowPerformance ? { opacity: { duration: 0.5, delay: 0.4 }, scale: { duration: 0.5, delay: 0.4 } } : { 
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 },
                    opacity: { duration: 0.5, delay: 0.4 },
                    scale: { duration: 0.5, delay: 0.4 }
                  }}
                  className="bg-white rounded-2xl p-6 shadow-md md:col-span-2 mt-1 border border-gray-100/50"
                >
                  <h3 className="font-semibold text-heading text-[13px] mb-4 text-left">
                    {demo.results_title}
                  </h3>

                  <div className="space-y-4">
                    {/* Success Section */}
                    <div className="space-y-2 text-left">
                      <p className="text-[11px] font-bold text-emerald-500">
                        {demo.correct_items}
                      </p>
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 }}
                        className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-emerald-500/20 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-emerald-500/40 transition-colors group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <motion.div 
                            animate={isIPhone || isLowPerformance ? { scale: 1 } : { scale: [1, 1.2, 1] }}
                            transition={isIPhone || isLowPerformance ? {} : { duration: 2, repeat: Infinity }}
                            className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0"
                          >
                            <Check className="w-2.5 h-2.5 text-white stroke-3" />
                          </motion.div>
                          <span className="text-[11px] font-semibold text-gray-700 truncate group-hover:text-primary transition-colors">
                            GI01 - ENTITY_LEGAL_NAME...
                          </span>
                        </div>
                        <span className="px-2 py-1 bg-gray-100 rounded text-[9px] font-bold text-gray-500 uppercase tracking-wide shrink-0 ml-3">
                          {demo.labels.general}
                        </span>
                      </motion.div>
                    </div>

                    {/* Error Section */}
                    <div className="space-y-2 text-left">
                      <p className="text-[11px] font-bold text-red-500">
                        {demo.critical_errors}
                      </p>
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 1 }}
                        className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-red-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-red-200 transition-colors group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                            <motion.div
                              animate={isIPhone || isLowPerformance ? { opacity: 1, scale: 1 } : { 
                                scale: [1, 1.15, 1],
                                opacity: [1, 0.8, 1]
                              }}
                              transition={isIPhone || isLowPerformance ? {} : { duration: 1.5, repeat: Infinity }}
                            >
                              <AlertTriangle className="w-5 h-5 text-red-500 fill-red-50" />
                            </motion.div>
                          </div>
                          <span className="text-[11px] font-semibold text-gray-700 truncate group-hover:text-red-600 transition-colors">
                            CS01 - Profit for the year does...
                          </span>
                        </div>
                        <span className="px-2 py-1 bg-red-50 rounded text-[9px] font-bold text-red-500 uppercase tracking-wide shrink-0 ml-3">
                          {demo.labels.balance_sheet}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </StaggerContainer>
            </GradientContainer>
          </div>

          {/* Right Column - Content */}
          <FadeInUp delay={0.3} className="space-y-4 text-left">
            <TextAnimation
              text={hero.title}
              as="h2"
              className="text-2xl md:text-4xl font-semibold text-primary leading-[1.15]"
            />

            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                {hero.p1}
              </p>
              <p>
                {hero.p2}
              </p>
              <p>
                {hero.p3}
              </p>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
};

export default AIReviewFeature;

