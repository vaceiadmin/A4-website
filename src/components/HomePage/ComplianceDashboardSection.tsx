"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { usePerformance } from "@/contexts/ReduceMotionContext";
import { cn } from "@/lib/utils";
import { SectionTitleHero } from "@/components/HomePage/SectionTitleHero";

const ComplianceDashboardSection = () => {
  const { t } = useTranslation("home");
  const { isIPhone, isLowPerformance } = usePerformance();

  return (
    <section className="w-full py-16 sm:py-20 md:py-24 lg:py-28 bg-[#FAFBFF] rounded-[48px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
          <div>
            <SectionTitleHero
              variant="light"
              className="mb-6"
              line1={t("complianceDashboard.titleLine1")}
              highlight={t("complianceDashboard.titleHighlight")}
            />
            <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl font-medium">
              {t("complianceDashboard.body")}
            </p>
          </div>

          <div
            className={cn(
              "relative rounded-[2.5rem] border border-white/20 bg-[#0F111A] backdrop-blur-xl p-6 sm:p-10 shadow-2xl overflow-hidden",
              !isIPhone && !isLowPerformance && "hover:-translate-y-2 hover:border-blue-500/30 transition-all duration-500"
            )}
          >
            {/* Interior Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.05] to-transparent pointer-events-none" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <p className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-500 mb-2">
                  {t("complianceDashboard.scoreLabel")}
                </p>
                <p className="text-4xl font-black text-white tracking-tight">92%</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                  {t("complianceDashboard.onTrack")}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-500">
                {t("complianceDashboard.deadlinesHeading")}
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-2xl bg-white/[0.03] px-5 py-4 border border-white/5">
                  <div>
                    <p className="text-sm font-black text-white">
                      {t("complianceDashboard.vatTitle")}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">{t("complianceDashboard.vatDue")}</p>
                  </div>
                  <span className="inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-amber-500 border border-amber-500/20">
                    {t("complianceDashboard.vatStatus")}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-white/[0.03] px-5 py-4 border border-white/5">
                  <div>
                    <p className="text-sm font-black text-white">
                      {t("complianceDashboard.annualTitle")}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">{t("complianceDashboard.annualDue")}</p>
                  </div>
                  <span className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-400 border border-emerald-500/20">
                    {t("complianceDashboard.annualStatus")}
                  </span>
                </div>
              </div>

              <p className="mt-6 text-xs sm:text-sm text-slate-500 font-medium italic">
                {t("complianceDashboard.footerNote")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceDashboardSection;
