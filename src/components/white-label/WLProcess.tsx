"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProcessStep {
  id: string | number;
  title: string;
  description?: string;
}

interface WLProcessProps {
  sectionTitle: string;
  steps: ProcessStep[];
  tagline?: string;
  description?: string;
  highlightWord?: string;
}

const WLProcess: React.FC<WLProcessProps> = ({ 
  sectionTitle, 
  steps,
  tagline,
  description,
  highlightWord
}) => {
  return (
    <section className="py-20 bg-[#F8F9FC] relative overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-full opacity-[0.03] pointer-events-none -z-10 bg-[url('/assets/images/grid-pattern.png')] bg-repeat" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          {/* Left Column: Heading */}
          <div className="lg:w-1/3 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-blue/5 text-primary-blue font-black tracking-widest uppercase text-[10px] border border-primary-blue/10">
                {tagline}
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-text-dark tracking-tight leading-tight">
                {sectionTitle.split(' ').map((word, i) => (
                  <span key={i} className="block">
                    {word === highlightWord ? <span className="text-primary-blue">{word}</span> : word}
                  </span>
                ))}
              </h2>
              {description?.trim() ? (
                <p className="text-lg text-gray/80 font-medium leading-relaxed max-w-sm">
                  {description}
                </p>
              ) : null}
              <div className="w-16 h-1 w-full bg-gradient-to-r from-primary-blue to-transparent rounded-full opacity-30" />
            </motion.div>
          </div>

          {/* Right Column: Interactive Timeline */}
          <div className="lg:w-2/3 relative">
            {/* The Central Glowing Path */}
            <div className="absolute left-[2.45rem] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-blue/30 via-primary-blue/20 to-transparent hidden sm:block" />

            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="flex gap-10 items-start group relative"
                >
                  {/* Glowing Node */}
                  <div className="relative z-10 shrink-0 hidden sm:block">
                    <div className="w-20 h-20 rounded-3xl bg-white border border-gray-200 flex items-center justify-center text-2xl font-black text-primary-blue shadow-xl shadow-gray-200/50 group-hover:scale-110 group-hover:!bg-primary-blue group-hover:!text-white group-hover:shadow-[0_15px_30px_rgba(59,73,230,0.2)] transition-all duration-500">
                      0{index + 1}
                    </div>
                    <div className="absolute -inset-2 bg-primary-blue opacity-0 group-hover:opacity-10 blur-xl rounded-full scale-0 group-hover:scale-100 transition-all duration-500" />
                  </div>

                  <div className="flex-1 py-4">
                    <h3 className="text-2xl font-black text-text-dark mb-4 tracking-tight group-hover:text-primary-blue transition-colors">
                      {step.title}
                    </h3>
                    {step.description && (
                      <p className="text-lg text-gray/70 leading-relaxed font-medium bg-white p-5 rounded-xl backdrop-blur-sm border border-gray-200 shadow-lg shadow-gray-200/40 group-hover:border-primary-blue/20 transition-all duration-500">
                        {step.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Abstract Decorative blobs for the timeline */}
            <div className="absolute -bottom-20 right-0 w-64 h-64 bg-primary-blue/5 rounded-full blur-[100px] pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WLProcess;
