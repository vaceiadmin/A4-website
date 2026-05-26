"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import GetInstantQuoteButton from "@/components/common/GetInstantQuoteButton";
import { Database, UserCheck, ArrowRight } from "lucide-react";
import { SectionTitleHero } from "@/components/HomePage/SectionTitleHero";

const WhyVaceiSection = () => {
   const { t } = useTranslation("home");
   return (
      <section className="py-24 bg-black relative overflow-hidden rounded-[48px]">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="text-center mb-16">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20 mb-6">
                  {t("whyVacei.badge")}
               </div>
               <SectionTitleHero
                  variant="dark"
                  className="mb-6 items-center text-center"
                  line1={t("whyVacei.titleLine1")}
                  highlight={t("whyVacei.titleHighlight")}
               />
               <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
                  {t("whyVacei.subtitle")}
               </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">

               {/* Card 1: Large - Single Source of Truth */}
               <div className="md:col-span-8 p-10 md:p-12 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] -mr-32 -mt-32 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 text-center flex flex-col items-center">
                     <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-8 shadow-xl shadow-blue-600/20 group-hover:scale-110 transition-transform">
                        <Database className="w-8 h-8" />
                     </div>
                     <h3 className="text-3xl font-black text-slate-900 mb-4">{t("whyVacei.card1Title")}</h3>
                     <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-lg mb-8">
                        {t("whyVacei.card1Body")}
                     </p>
                     <div className="flex gap-3">
                        {[1, 2, 3, 4].map(i => (
                           <div key={i} className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                              <div className="w-6 h-1.5 rounded-full bg-slate-200" />
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Card 2: Medium - Verified Firms (Dark) */}
               <div className="md:col-span-4 p-8 md:p-10 rounded-[2.5rem] bg-slate-900 text-white flex flex-col justify-between group hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-transparent opacity-50" />
                  <div className="relative z-10">
                     <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                        <UserCheck className="w-6 h-6 text-emerald-400" />
                     </div>
                     <h3 className="text-xl font-black mb-3">{t("whyVacei.card2Title")}</h3>
                     <p className="text-slate-400 text-sm font-medium leading-relaxed">
                        {t("whyVacei.card2Body")}
                     </p>
                  </div>
                  <div className="relative z-10 mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                     <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/80">{t("whyVacei.qualityLabel")}</span>
                     <ArrowRight className="w-4 h-4 text-emerald-600/50" />
                  </div>
               </div>

            </div>

            <div className="text-center">
               <GetInstantQuoteButton
                  text={t("whyVacei.cta")}
                  className="h-[56px] px-12 shadow-xl shadow-blue-600/20"
               />
            </div>

         </div>
      </section>
   );
};

export default WhyVaceiSection;
