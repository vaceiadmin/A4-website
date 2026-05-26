"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { LineChart, ShieldCheck, PieChart, Lightbulb } from "lucide-react";

const KeyBenefits = ({ isDark = true }: { isDark?: boolean }) => {
  const { t } = useTranslation("home");

  const icons = [LineChart, ShieldCheck, PieChart, Lightbulb];
  const items = (t("keyBenefits.items", { returnObjects: true }) as { title: string, desc: string }[] || []);

  return (
    <section className={cn(
      "relative py-24 sm:py-32 overflow-hidden ",
      isDark && "mx-4 sm:mx-6 lg:mx-8",
      isDark ? "bg-[#05050A] text-white rounded-[48px] shadow-2xl" : "bg-white text-slate-900 rounded-[48px] border border-slate-100"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Header Area */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-8">
              {t("keyBenefits.title")}
            </h2>
            <div className={cn("w-20 h-2", isDark ? "bg-primary-blue" : "bg-blue-600")} />
            <p className={cn("mt-8 text-xl font-medium leading-relaxed", isDark ? "text-slate-400" : "text-slate-500")}>
               Strategic advantages designed for modern business scale.
            </p>
          </div>

          {/* Staircase Items */}
          <div className="lg:w-2/3 space-y-12">
            {items.map((item, i) => {
              const Icon = icons[i % icons.length];
              return (
                <div 
                  key={i} 
                  className={cn(
                    "relative group flex flex-col sm:flex-row items-start gap-8 p-10 sm:p-14 rounded-[3rem] border transition-all duration-700",
                    isDark
                      ? "bg-[#0A0A0F] border-white/5 hover:border-primary-blue/30"
                      : "bg-slate-50 border-slate-100 hover:border-blue-600 hover:-translate-y-1 hover:shadow-[0_28px_70px_-28px_rgba(37,99,235,0.25)] hover:bg-white",
                    i % 2 === 0 ? "sm:translate-x-0" : "sm:translate-x-12"
                  )}
                >
                  <div className="flex flex-col gap-4">
                    <span className={cn(
                        "text-7xl sm:text-8xl font-black tracking-tighter opacity-10 transition-all duration-700 group-hover:opacity-20 group-hover:scale-110 group-hover:text-primary-blue",
                        isDark ? "text-white" : "text-slate-900"
                    )}>
                        0{i + 1}
                    </span>
                    <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-700",
                        isDark ? "bg-white/5 border-white/10 text-primary-blue group-hover:bg-primary-blue group-hover:text-white" : "bg-white border-slate-200 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                    )}>
                        <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <h3 className="text-3xl sm:text-4xl font-black tracking-tight">
                      {item.title}
                    </h3>
                    <p className={cn(
                      "text-xl font-medium leading-relaxed",
                      isDark ? "text-slate-400" : "text-slate-600"
                    )}>
                      {item.desc}
                    </p>
                    
                    <div className="pt-4 flex items-center gap-4">
                        <div className={cn("h-px flex-1", isDark ? "bg-white/10" : "bg-slate-200")} />
                        <span className={cn("text-xs font-black uppercase tracking-[0.3em]", isDark ? "text-slate-600" : "text-slate-400")}>Advantage</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Background Polish */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-blue/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-blue/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default KeyBenefits;
