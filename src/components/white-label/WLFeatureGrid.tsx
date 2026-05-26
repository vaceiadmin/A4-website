"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureItem {
  id: string | number;
  title: string;
  description?: string;
  icon?: any; // Accepting any to handle Lucide components correctly
}

interface WLFeatureGridProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
}

const WLFeatureGrid: React.FC<WLFeatureGridProps> = ({
  sectionTitle,
  sectionSubtitle,
  features,
  columns = 3,
}) => {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className="py-16 bg-[#FAFBFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {(sectionTitle || sectionSubtitle) && (
          <div className="text-center mb-20 space-y-4">
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
            {sectionTitle && (
               <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl sm:text-5xl font-black text-text-dark tracking-tight"
               >
                  {sectionTitle}
               </motion.h2>
            )}
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary-blue to-blue-700 mx-auto rounded-full mt-6" />
          </div>
        )}

        <div className={`grid ${gridCols[columns]} gap-8 lg:gap-10`}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative h-full"
              >
                {/* Decorative background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 to-blue-600/5 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
                
                <div className="relative h-full p-10 bg-white border border-gray-200/80 rounded-[2.5rem] shadow-xl shadow-gray-200/40 group-hover:!bg-primary-blue hover:shadow-2xl hover:shadow-primary-blue/30 hover:border-primary-blue/30 transition-all duration-500 flex flex-col items-start overflow-hidden">
                  {/* Subtle Gradient Accent */}
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary-blue/40 to-transparent group-hover:from-white/40 transition-all" />
                  
                  {Icon && (
                    <div className="relative mb-8">
                       {/* Floating circle decoration */}
                       <div className="absolute -inset-4 bg-primary-blue/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                       
                       <div className="relative w-16 h-16 flex items-center justify-center bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 text-primary-blue group-hover:scale-110 group-hover:!bg-white/20 group-hover:!text-white group-hover:!border-white/30 transition-all duration-500">
                          {(() => {
                            if (typeof Icon === 'function' || (typeof Icon === 'object' && Icon !== null)) {
                              const TypedIcon = Icon as any;
                              return <TypedIcon size={32} strokeWidth={1.5} />;
                            }
                            return Icon as React.ReactNode;
                          })()}
                       </div>
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-black text-text-dark mb-5 tracking-tight group-hover:!text-white transition-colors">
                    {feature.title}
                  </h3>
                  
                  {feature.description && (
                    <p className="text-gray/80 group-hover:!text-white/90 leading-relaxed font-medium text-base transition-colors">
                      {feature.description}
                    </p>
                  )}
                  
                  {/* Bottom pattern */}
                  <div className="absolute bottom-[-20%] right-[-10%] w-32 h-32 bg-primary-blue/5 rounded-full blur-2xl group-hover:!bg-white/10 transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-primary-blue/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};

export default WLFeatureGrid;
