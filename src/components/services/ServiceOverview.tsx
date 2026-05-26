"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import TextAnimation from "../common/TextAnimation";
import { usePerformance } from "@/contexts/ReduceMotionContext";

interface ServiceOverviewProps {
  title: string;
  description: ReactNode;
  image: string;
}

const ServiceOverview = ({
  title,
  description,
  image,
}: ServiceOverviewProps) => {
  const { isIPhone, isLowPerformance } = usePerformance();

  return (
    // Full-width light background strip; content centered within
    <section className="py-20 ">
      <div className=" mx-auto px-4 md:px-6 lg:px-8">
        <div className="relative rounded-[32px] md:rounded-[40px] bg-white shadow-[0_18px_60px_rgba(15,23,42,0.06)] border border-gray-100 px-6 sm:px-10 lg:px-14 py-10 sm:py-12 lg:py-16 overflow-hidden">
          {/* subtle ambient light blobs - Hidden on iPhone for performance */}
          {!isIPhone && !isLowPerformance && (
            <>
              <div className="pointer-events-none absolute -top-24 -left-16 w-72 h-72 bg-primary-blue/5 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-28 -right-10 w-80 h-80 bg-blue-200/20 blur-3xl" />
            </>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          >
            {/* Text Content */}
            <div>
              <TextAnimation
                text={title}
                as="h1"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-heading mb-6 leading-tight tracking-tight"
              />

              {/* Decorative Line */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-1 bg-gradient-to-r from-primary-blue to-primary rounded-full mb-8"
              />

              <div className="space-y-5 text-base md:text-lg text-text-gray leading-relaxed">
                {description}
              </div>
            </div>

            {/* Image / Visual */}
            <div className="relative">
              <div className="relative w-full h-64 sm:h-72 lg:h-80 rounded-3xl overflow-hidden border border-gray-100 bg-[#f9fbff]">
                <Image
                  src={image}
                  alt={`${title} Overview`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />

                {/* Soft gradient overlay for readability */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent" />
              </div>

              {/* Floating accents - Simple state on iPhone */}
              <motion.div
                animate={isIPhone || isLowPerformance ? { opacity: 0.8 } : { y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                transition={isIPhone || isLowPerformance ? {} : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-[0_18px_45px_rgba(15,23,42,0.12)]"
              />
              <motion.div
                animate={isIPhone || isLowPerformance ? { opacity: 0.7 } : { y: [0, 10, 0], opacity: [0.4, 0.9, 0.4] }}
                transition={isIPhone || isLowPerformance ? {} : { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute -bottom-6 left-6 w-24 h-24 rounded-full bg-primary-blue/10 border border-gray-100 shadow-[0_18px_45px_rgba(15,23,42,0.16)]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;

