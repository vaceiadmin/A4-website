"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionBadge from "@/components/common/SectionBadge";
import TextAnimation from "../common/TextAnimation";
import { FadeInUp, StaggerContainer } from "../common/Animations";
import { usePerformance } from "@/contexts/ReduceMotionContext";
import { cn } from "@/lib/utils";

interface ReviewOutputSectionProps {
  output: {
    badge: string;
    heading: string;
    subheading: string;
    report_features: {
      title: string;
      items: string[];
    };
    marking_features: {
      title: string;
      items: string[];
    };
    footer_text: string;
    demo_result: {
      title: string;
      status: string;
      items: string[];
      label: string;
    };
  };
}

const ReviewOutputSection = ({ output }: ReviewOutputSectionProps) => {
  const { isIPhone, isLowPerformance } = usePerformance();

  const reportFeatures = output.report_features.items || [];
  const markingFeatures = output.marking_features.items || [];
  const demoItems = output.demo_result.items || [];

  return (
    <section className="bg-section-light py-16 lg:py-24 relative overflow-hidden">
      {/* Background Blobs - Hidden on iPhone */}
      {!isIPhone && !isLowPerformance && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div 
            animate={{ 
              x: [0, -30, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-primary-blue/5 blur-[120px] rounded-full"
          />
          <motion.div 
            animate={{ 
              x: [0, 40, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-primary-blue/5 blur-[120px] rounded-full"
          />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.1fr] gap-12 lg:gap-16 items-center">
          {/* Left: Text and cards */}
          <StaggerContainer className="space-y-6 text-left">
            <FadeInUp>
              <SectionBadge text={output.badge} className="text-heading" />
              <TextAnimation
                text={output.heading}
                as="h2"
                className="mt-4 text-3xl md:text-4xl font-semibold text-heading leading-tight"
              />
              <p className="mt-2 text-sm md:text-base text-gray max-w-md leading-relaxed">
                {output.subheading}
              </p>
            </FadeInUp>

            <div className="flex flex-col md:flex-row gap-4">
              {/* The report is */}
              <FadeInUp className="bg-white rounded-2xl shadow-premium border border-gray-100 px-5 py-5 flex-1 min-w-[230px]">
                <TextAnimation
                  text={output.report_features.title}
                  as="h3"
                  className="text-sm md:text-base font-bold text-heading mb-3"
                />
                <ul className="space-y-3 text-sm text-gray">
                  {reportFeatures.map(
                    (item, i) => (
                      <motion.li 
                        key={i} 
                        initial={{ opacity: 0, x: -5 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-start gap-3 group"
                      >
                        <Image
                          src="/assets/images/fluent_shape-intersect-16-filled.png"
                          alt=""
                          width={14}
                          height={14}
                          className="mt-[3px] object-contain group-hover:scale-125 transition-transform"
                        />
                        <span className="group-hover:text-primary transition-colors font-medium">
                            {item}
                        </span>
                      </motion.li>
                    ),
                  )}
                </ul>
              </FadeInUp>

              {/* Each item is marked as */}
              <FadeInUp delay={0.2} className="bg-white rounded-2xl shadow-premium border border-gray-100 px-5 py-5 flex-1 min-w-[230px]">
                <TextAnimation
                  text={output.marking_features.title}
                  as="h3"
                  className="text-sm md:text-base font-bold text-heading mb-3"
                />
                <ul className="space-y-3 text-sm text-gray">
                  {markingFeatures.map(
                    (item, i) => (
                      <motion.li 
                        key={i} 
                        initial={{ opacity: 0, x: -5 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                        className="flex items-start gap-3 group"
                      >
                        <Image
                          src="/assets/images/fluent_shape-intersect-16-filled.png"
                          alt=""
                          width={14}
                          height={14}
                          className="mt-[3px] object-contain group-hover:scale-125 transition-transform"
                        />
                        <span className="group-hover:text-primary transition-colors font-medium">
                            {item}
                        </span>
                      </motion.li>
                    ),
                  )}
                </ul>
              </FadeInUp>
            </div>

            <p className="text-xs md:text-sm text-gray max-w-lg leading-relaxed">
              {output.footer_text}
            </p>
          </StaggerContainer>

          {/* Right: Background image with overlay card */}
          <FadeInUp delay={0.4} className="relative w-full h-[300px] md:h-[400px] lg:h-[450px]">
            {/* Background brain image */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/images/Rectangle 34624219.png"
                alt="AI Review visual background"
                fill
                className="object-cover"
                priority
              />
              <div className={cn(
                "absolute inset-0 bg-primary-blue/10",
                !isIPhone && !isLowPerformance ? "backdrop-blur-[2px]" : ""
              )}></div>
            </div>

            {/* Overlay audit result card */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <motion.div 
                animate={isIPhone || isLowPerformance ? { y: 0, rotateZ: 0 } : { 
                    y: [0, -15, 0],
                    rotateZ: [-1, 1, -1]
                }}
                transition={isIPhone || isLowPerformance ? {} : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className={cn(
                  "w-full max-w-md bg-white rounded-3xl shadow-premium border border-gray-100 p-6",
                  !isIPhone && !isLowPerformance ? "backdrop-blur-md" : ""
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[13px] font-bold text-heading">
                    {output.demo_result.title}
                  </p>
                  <span className={cn(
                    "w-2 h-2 rounded-full bg-red-500",
                    !isIPhone && !isLowPerformance ? "animate-pulse" : ""
                  )}></span>
                </div>
                <p className="text-[11px] font-bold text-red-500 mb-4 bg-red-50 py-1 px-3 rounded-full w-fit">
                  {output.demo_result.status}
                </p>

                <div className="space-y-3">
                  {demoItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + idx * 0.1 }}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-red-50/50 border border-red-100 group hover:bg-red-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-[11px] text-red-600 font-bold group-hover:scale-110 transition-transform">
                          !
                        </span>
                        <span className="text-[11px] font-semibold text-gray-700 truncate group-hover:text-red-700 transition-colors">
                          {item}
                        </span>
                      </div>
                      <span className="ml-3 px-2 py-0.5 rounded bg-white text-[9px] font-bold text-gray-500 uppercase tracking-widest border border-gray-100">
                        {output.demo_result.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
};

export default ReviewOutputSection;

