"use client";

import React from "react";
import { motion } from "framer-motion";

interface BentoItem {
  id: string | number;
  title: string;
  description?: string;
  icon?: any;
}

interface WLBentoGridProps {
  sectionTitle: string;
  sectionSubtitle?: string;
  /** Optional paragraph under the main title */
  sectionDescription?: string;
  items: BentoItem[];
}

const WLBentoGrid: React.FC<WLBentoGridProps> = ({
  sectionTitle,
  sectionSubtitle,
  sectionDescription,
  items,
}) => {
  // Balanced layout for 5 items: 2 wide on top, 3 smaller on bottom
  return (
    <section className="py-16 bg-[#F8F9FC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
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
          {sectionDescription?.trim() ? (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg sm:text-xl text-gray/70 max-w-3xl mx-auto font-medium leading-relaxed"
            >
              {sectionDescription}
            </motion.p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8">
          {items.map((item, index) => {
            const Icon = item.icon;
            // Map items to specific spans for balanced layouts (6–7 capability cards)
            const spans = [
              "md:col-span-3 lg:col-span-6",
              "md:col-span-3 lg:col-span-6",
              "md:col-span-2 lg:col-span-4",
              "md:col-span-2 lg:col-span-4",
              "md:col-span-2 lg:col-span-4",
              "md:col-span-3 lg:col-span-6",
              "md:col-span-3 lg:col-span-6",
              "md:col-span-6 lg:col-span-12",
            ];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`${spans[index % spans.length]} relative group`}
              >
                <div className="relative h-full p-10 bg-white border border-gray-200 shadow-xl shadow-gray-200/50 rounded-[2.5rem] overflow-hidden group-hover:!bg-primary-blue hover:shadow-2xl hover:shadow-primary-blue/30 hover:border-primary-blue/20 transition-all duration-500 flex flex-col min-h-[260px]">
                  <div className="flex flex-col items-start gap-6 mb-8">
                    {Icon && (
                      <div className="w-16 h-16 shrink-0 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-primary-blue group-hover:!bg-white/20 group-hover:!text-white group-hover:!border-white/30 group-hover:scale-110 transition-all duration-500">
                        {(() => {
                          if (typeof Icon === 'function' || (typeof Icon === 'object' && Icon !== null)) {
                            const TypedIcon = Icon as any;
                            return <TypedIcon size={32} strokeWidth={1.5} color="currentColor" />;
                          }
                          return Icon as React.ReactNode;
                        })()}
                      </div>
                    )}
                    <h3 className="text-2xl font-black text-text-dark tracking-tight group-hover:!text-white transition-colors leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  {item.description && (
                    <p className="text-gray/70 group-hover:!text-white/90 leading-relaxed font-medium text-lg transition-colors">
                      {item.description}
                    </p>
                  )}

                  {/* Subtle light leak for larger items */}
                  {index < 2 && (
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WLBentoGrid;
