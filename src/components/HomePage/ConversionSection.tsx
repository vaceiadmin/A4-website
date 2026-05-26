"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import LocalizedLink from "@/components/common/LocalizedLink";
import { ArrowRight } from "lucide-react";

const ConversionSection = ({ isDark = false }: { isDark?: boolean }) => {
  const { t } = useTranslation("home");

  return (
    <section className={cn(
      "relative py-32 sm:py-48 overflow-hidden  mb-12 sm:mb-20",
      isDark ? "bg-[#05050A] text-white rounded-[48px] shadow-2xl" : "bg-[#FAFBFF] text-slate-900 rounded-[48px] border border-slate-100"
    )}>
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-blue-600/20 blur-[160px] rounded-full animate-pulse-slow" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter leading-[0.9] uppercase">
              {t("conversion.title").split(" ").slice(0, 3).join(" ")} <br />
              <span className="font-bodoni italic text-blue-600 lowercase tracking-tight">
                {t("conversion.title").split(" ").slice(3).join(" ")}
              </span>
            </h2>
            <p className={cn(
              "text-xl sm:text-2xl font-medium leading-relaxed max-w-2xl mx-auto opacity-70",
              isDark ? "text-slate-400" : "text-slate-600"
            )}>
              {t("conversion.body")}
            </p>
          </div>

          <div className="pt-8 flex flex-col items-center gap-8">
            <LocalizedLink
              href="/quote"
              className="relative group inline-flex items-center justify-center gap-4 rounded-full bg-primary-blue text-white px-16 py-7 text-[16px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/40 transition-all hover:scale-110 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10">{t("conversion.cta")}</span>
              <ArrowRight className="relative z-10 w-6 h-6 transition-transform group-hover:translate-x-2" />
            </LocalizedLink>
            
            <div className="flex items-center gap-6">
              <div className="h-px w-12 bg-slate-500/20" />
              <span className="text-xs font-black uppercase tracking-[0.4em] opacity-40">The Future of Business Control</span>
              <div className="h-px w-12 bg-slate-500/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConversionSection;
