"use client";

import React from "react";
import { motion } from "framer-motion";

interface InteractiveCardItem {
  id: string | number;
  title: string;
  description?: string;
  icon?: any;
}

interface WLInteractiveCardsProps {
  sectionTitle: string;
  sectionSubtitle?: string;
  items: InteractiveCardItem[];
}

const WLInteractiveCards: React.FC<WLInteractiveCardsProps> = ({
  sectionTitle,
  sectionSubtitle,
  items,
}) => {
  return (
    <section className="py-20 bg-[#F4F6F9] relative overflow-hidden">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group h-full"
              >
                {/* 3D-like elevated card structure */}
                <div className="relative h-full p-10 bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/60 border border-gray-200/80 group-hover:!bg-primary-blue group-hover:shadow-[0_40px_80px_rgba(59,73,230,0.1)] group-hover:border-primary-blue/30 transition-all duration-500 overflow-hidden flex flex-col items-center text-center">
                  
                  {/* Glowing Border Trace Effect */}
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-white/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                  
                  {Icon && (
                    <div className="relative mb-10">
                       {/* Animated background rings */}
                       <div className="absolute -inset-6 bg-primary-blue/5 rounded-full scale-0 group-hover:scale-125 transition-transform duration-700" />
                       <div className="absolute -inset-2 bg-primary-blue/10 rounded-full scale-0 group-hover:scale-110 transition-transform duration-500 delay-100" />
                       
                       <div className="relative w-20 h-20 flex items-center justify-center bg-gray-50 rounded-full text-primary-blue group-hover:!bg-white/20 group-hover:!text-white group-hover:scale-110 transition-all duration-500">
                          {(() => {
                           if (typeof Icon === 'function' || (typeof Icon === 'object' && Icon !== null)) {
                             const TypedIcon = Icon as any;
                             return <TypedIcon size={36} strokeWidth={1.5} />;
                           }
                           return Icon as React.ReactNode;
                        })()}
                       </div>
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-black text-text-dark mb-6 tracking-tight group-hover:!text-white transition-colors">
                    {item.title}
                  </h3>
                  
                  {item.description && (
                    <p className="text-lg text-gray/80 group-hover:!text-white/90 leading-relaxed font-medium transition-colors">
                      {item.description}
                    </p>
                  )}
                  
                  {/* Subtle Accent Line */}
                  <div className="w-12 h-1 bg-gray-100 group-hover:!bg-white group-hover:w-24 transition-all duration-500 mt-auto pt-8 mb-0" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WLInteractiveCards;
