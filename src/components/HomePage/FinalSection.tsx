"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Sparkles } from "lucide-react";

const FinalSection = ({ isDark = false }: { isDark?: boolean }) => {
  const { t } = useTranslation("home");

  return (
    <section className={cn(
      "relative py-24 sm:py-32 overflow-hidden mb-12 sm:mb-20 rounded-[48px]",
      isDark && "mx-4 sm:mx-6 lg:mx-8",
      isDark ? "bg-[#05050A] text-white shadow-2xl" : "bg-[#FAFBFF] text-slate-900 border border-slate-100 shadow-xl shadow-blue-500/5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* The Glass Board Container */}
        <div className={cn(
            "max-w-5xl mx-auto p-12 sm:p-20 rounded-[48px] border relative overflow-hidden transition-all duration-700 hover:shadow-2xl group/board",
            isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200 shadow-xl shadow-blue-500/5 hover:border-blue-500/30"
        )}>
             {/* Dynamic Light Sweep */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-30" />

            <div className="max-w-4xl mx-auto space-y-12 relative z-10">
                <div className="space-y-8">
                    <div className={cn(
                        "inline-flex items-center gap-3 px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 group-hover/board:scale-110",
                        isDark ? "bg-white/5 border-white/10 text-primary-blue" : "bg-blue-50 border-blue-100 text-blue-600"
                    )}>
                        <Sparkles className="w-4 h-4 animate-pulse" />
                        {t("finalSection.note")}
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05]">
                        {t("finalSection.title").split(' — ')[0]} <br />
                        <span className="font-bodoni italic text-blue-600 lowercase">
                            {t("finalSection.title").split(' — ')[1]}
                        </span>
                    </h2>
                    
                    <p className={cn(
                        "text-xl sm:text-2xl font-medium leading-relaxed max-w-2xl mx-auto opacity-70",
                        isDark ? "text-slate-300" : "text-slate-600"
                    )}>
                        {t("finalSection.body")}
                    </p>
                </div>

                <div className={cn(
                    "pt-16 border-t flex flex-col items-center gap-8",
                    isDark ? "border-white/10" : "border-slate-100"
                )}>
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bodoni italic text-blue-500 leading-tight">
                        {t("finalSection.finalLine")}
                    </h3>

                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest opacity-40">
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Unified Intelligence Platform</span>
                    </div>
                </div>
            </div>

            {/* Subtile visual Polish in the board */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none group-hover/board:bg-blue-500/10 transition-colors duration-700" />
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
        </div>
      </div>

      {/* Background Section Polish */}
      <div className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl aspect-video blur-[150px] opacity-20 pointer-events-none rounded-full",
          isDark ? "bg-primary-blue/10" : "bg-blue-400/10"
      )} />
    </section>
  );
};

export default FinalSection;
