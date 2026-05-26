"use client";

import React from "react";
import { motion } from "framer-motion";
import { FadeInUp } from "../common/Animations";

interface ValueItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ValuesSectionProps {
  title?: string;
  titleAccent?: string;
  description?: string;
  ctaText?: string;
  items?: ValueItem[];
}

const ValuesSection = ({
  title,
  titleAccent,
  description,
  ctaText,
  items = []
}: ValuesSectionProps) => {
  // Default icons if not provided
  const getIcon = (index: number) => {
    const icons = [
      <svg key="0" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
    ];
    return icons[index % icons.length];
  };

  return (
    <section className="w-full py-20 bg-section-light relative">
       {/* Background Noise/Texture */}
        <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none" 
             style={{ backgroundImage: `url("/assets/images/Noise.png")` }}>
        </div>

      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <FadeInUp>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-text-heading">
                {title} <span className="text-primary-blue">{titleAccent}</span>
              </h2>
              <p className="text-lg text-text-gray leading-relaxed">
                {description}
              </p>
              
               <div className="pt-4">
                <button className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-blue transition-colors shadow-lg hover:shadow-primary-blue/30">
                  {ctaText}
                </button>
              </div>
            </div>
          </FadeInUp>

          <div className="grid grid-cols-1 gap-6">
            {items.map((value, index) => (
              <FadeInUp key={index} delay={index * 0.2}>
                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-black/5 hover:border-primary-blue/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue">
                    {value.icon || getIcon(index)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-heading mb-2">{value.title}</h3>
                    <p className="text-text-gray text-sm">{value.description}</p>
                  </div>
                </motion.div>
              </FadeInUp>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
