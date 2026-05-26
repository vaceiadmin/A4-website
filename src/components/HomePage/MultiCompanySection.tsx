"use client";

import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import GetInstantQuoteButton from "@/components/common/GetInstantQuoteButton";
import { LayoutDashboard, CheckCircle2 } from "lucide-react";
import { SectionTitleHero } from "@/components/HomePage/SectionTitleHero";

const MultiCompanySection = () => {
  const { t } = useTranslation("home");

  const companies = useMemo(() => {
    const raw = t("multiCompany.mockCompanies", { returnObjects: true }) as
      | { name: string; type: string }[]
      | string;
    const list = Array.isArray(raw) ? raw : [];
    return list.map((c, i) => ({ ...c, active: i === 0 }));
  }, [t]);

  const highlights = useMemo(
    () => (t("multiCompany.highlights", { returnObjects: true }) as string[]) ?? [],
    [t]
  );

  return (
    <section className="py-24 bg-black relative overflow-hidden rounded-[48px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Visual: Workspace Switcher Mockup */}
          <div className="w-full lg:w-1/2 relative">
             {/* Background Decoration */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
             
             {/* Switcher Interface */}
             <div className="relative bg-white rounded-[2.5rem] border border-slate-200 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] overflow-hidden">
                {/* Header Strip */}
                <div className="p-5 border-b border-slate-100 flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                      <LayoutDashboard className="w-4 h-4" />
                   </div>
                   <span className="font-black text-slate-800 text-sm tracking-tight uppercase">{t("multiCompany.foundersHub")}</span>
                </div>
                
                {/* Company List */}
                <div className="p-4 space-y-2">
                   {companies.map((c, i) => (
                     <div 
                        key={i} 
                        className={`p-4 rounded-2xl flex items-center justify-between transition-all duration-300 ${c.active ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20 scale-[1.02]' : 'bg-slate-50 border border-slate-100 text-slate-900 hover:bg-white hover:border-blue-200'}`}
                      >
                        <div className="flex items-center gap-4">
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${c.active ? 'bg-white/20 text-white' : 'bg-white border border-slate-200 text-blue-600'}`}>
                              {c.name.charAt(0)}
                           </div>
                           <div>
                              <p className="text-xs font-black leading-tight">{c.name}</p>
                              <p className={`text-[10px] font-bold ${c.active ? 'text-white/70' : 'text-slate-400'}`}>{c.type}</p>
                           </div>
                        </div>
                        {c.active ? (
                           <div className="px-3 py-1 rounded-full bg-white/20 border border-white/20 text-[9px] font-black uppercase tracking-widest">
                              {t("multiCompany.activeLabel")}
                           </div>
                        ) : (
                           <button className="text-[10px] font-black text-blue-600 hover:text-blue-800 uppercase tracking-widest px-2 py-1">
                              {t("multiCompany.switchLabel")}
                           </button>
                        )}
                     </div>
                   ))}
                </div>

                {/* Summary Strip */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                   <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                      ))}
                   </div>
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      {t("multiCompany.engagementsSummary")}
                   </p>
                </div>
             </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20 mb-8">
                {t("multiCompany.badge")}
            </div>
            <SectionTitleHero
              variant="dark"
              className="mb-8"
              line1={t("multiCompany.titleLine1")}
              highlight={t("multiCompany.titleHighlight")}
            />
            <p className="text-lg text-slate-400 mb-10 font-medium leading-relaxed">
              {t("multiCompany.body")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12">
               {highlights.map((item, i) => (
                 <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                    <span className="text-slate-300 font-bold text-sm leading-tight">{item}</span>
                 </div>
               ))}
            </div>

            <GetInstantQuoteButton
              text={t("multiCompany.cta")}
              className="h-[56px] px-10 shadow-xl shadow-blue-600/20"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default MultiCompanySection;
