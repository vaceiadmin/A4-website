"use client";

import React from "react";
import { motion } from "framer-motion";

interface UseCaseItem {
  id: string | number;
  title: string;
  description?: string;
  icon?: any;
}

interface WLUseCaseDisplayProps {
  sectionTitle: string;
  sectionSubtitle?: string;
  items: UseCaseItem[];
}

const WLUseCaseDisplay: React.FC<WLUseCaseDisplayProps> = ({
  sectionTitle,
  sectionSubtitle,
  items,
}) => {
  return (
    <section className="py-16 bg-[#FAFBFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
           {sectionSubtitle && (
              <motion.span 
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="inline-block px-4 py-1.5 rounded-full bg-primary-blue/5 text-primary-blue font-black tracking-widest uppercase text-[10px] border border-primary-blue/10"
              >
                 {sectionSubtitle}
              </motion.span>
           )}
           <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-black text-text-dark tracking-tight"
           >
              {sectionTitle}
           </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative h-full p-10 bg-white rounded-[2.5rem] border border-gray-200 shadow-lg shadow-gray-200/40 group-hover:!bg-primary-blue group-hover:!border-primary-blue transition-all duration-500 flex flex-col items-start min-h-[340px]">
                  
                  {Icon && (
                    <div className="w-16 h-16 mb-10 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-primary-blue group-hover:!bg-white/20 group-hover:!text-white group-hover:!border-white/30 group-hover:scale-110 transition-all duration-500">
                      {(() => {
                        if (typeof Icon === 'function' || (typeof Icon === 'object' && Icon !== null)) {
                          const TypedIcon = Icon as any;
                          return <TypedIcon size={32} strokeWidth={1.5} />;
                        }
                        return Icon as React.ReactNode;
                      })()}
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-black text-text-dark mb-5 tracking-tight group-hover:!text-white transition-colors">
                    {item.title}
                  </h3>
                  
                  {item.description && (
                    <p className="text-lg text-gray/70 leading-relaxed font-medium group-hover:!text-white/80 transition-colors">
                      {item.description}
                    </p>
                  )}
                  
                  {/* Bottom pattern indicator - Number turns white on hover */}
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:!border-white/40 group-hover:!text-white text-[12px] font-black uppercase transition-all duration-500">
                     0{index + 1}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WLUseCaseDisplay;
