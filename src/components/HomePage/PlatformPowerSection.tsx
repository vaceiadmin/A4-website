"use client";

import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import GetInstantQuoteButton from "@/components/common/GetInstantQuoteButton";
import { CheckCircle2, ShieldCheck, FileText, Users, Bell, ArrowUpRight } from "lucide-react";

const PlatformPowerSection = () => {
  const { t } = useTranslation("home");

  const highlights = useMemo(
    () => (t("platformPower.highlights", { returnObjects: true }) as string[]) ?? [],
    [t]
  );

  return (
    <section className="py-24 bg-black relative overflow-hidden rounded-[48px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20 mb-8">
                {t("platformPower.badge")}
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight">
              {t("platformPower.titleLine1")}<span className="text-blue-400">{t("platformPower.titleHighlight")}</span>
            </h2>
            <p className="text-lg text-slate-400 mb-10 font-medium leading-relaxed">
              {t("platformPower.body")}
            </p>

            <div className="space-y-5 mb-12">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-slate-300 font-bold text-base leading-tight mt-1">{item}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <GetInstantQuoteButton
                text={t("platformPower.createWorkspaceCta")}
                className="h-[56px] px-10 shadow-xl shadow-blue-600/20"
              />
              <GetInstantQuoteButton
                variant="custom"
                text={t("platformPower.registerQuoteCta")}
                bgColor="rgba(255,255,255,0.05)"
                textColor="white"
                borderColor="rgba(255,255,255,0.1)"
                className="h-[56px] px-8 hover:bg-white/10 hover:border-blue-400/50"
              />
            </div>
          </div>

          {/* Right Visual Mockup */}
          <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[600px] flex items-center justify-center">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/10 rounded-full blur-[100px] opacity-40" />
            
            {/* Main Mockup Card (Premium Dark Glassmorphism) */}
            <div className="relative w-full max-w-[460px] aspect-[4/5] bg-[#0F111A] backdrop-blur-2xl rounded-[2.5rem] border border-white/20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
               {/* Subtle Interior Glow */}
               <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.05] to-transparent pointer-events-none" />
               {/* Mockup Header */}
               <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="font-black text-white tracking-tight text-sm">{t("platformPower.workspaceLabel")}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
               </div>

               {/* Mockup Body Content */}
               <div className="p-6 space-y-6">
                 {/* Active Engagement Item */}
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group/item hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-blue-400">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-white">{t("platformPower.auditAssurance")}</p>
                        <p className="text-[10px] text-emerald-400 font-bold uppercase">{t("platformPower.activeEngagement")}</p>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
                       <ArrowUpRight className="w-3 h-3" />
                    </div>
                 </div>

                 {/* Notifications/Tasks */}
                 <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t("platformPower.teamNotifications")}</p>
                    {[
                      { icon: <Bell className="w-3.5 h-3.5" />, text: t("platformPower.notif1"), time: t("platformPower.notif1Time") },
                      { icon: <Users className="w-3.5 h-3.5" />, text: t("platformPower.notif2"), time: t("platformPower.notif2Time") },
                    ].map((notif, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                          {notif.icon}
                        </div>
                        <div className="flex-1">
                           <p className="text-[11px] font-bold text-slate-300 leading-tight">{notif.text}</p>
                           <p className="text-[9px] text-slate-500">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                 </div>

                 {/* Large Visual Metric */}
                 <div className="relative pt-4 text-white">
                    <div className="flex items-end justify-between mb-2">
                       <p className="text-xs font-black">{t("platformPower.docCompliance")}</p>
                       <p className="text-xs font-black text-blue-400">85%</p>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="w-[85%] h-full bg-blue-600 rounded-full" />
                    </div>
                    <p className="mt-2 text-[10px] text-slate-500 font-medium italic">{t("platformPower.syncHint")}</p>
                 </div>
               </div>
            </div>

            {/* Floating Accessory 1: Status Badge */}
            <div className="absolute top-1/4 -right-4 lg:-right-8 p-4 rounded-2xl bg-[#1A1D2B] shadow-2xl border border-white/10 z-20 animate-bounce-slow">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-white">{t("platformPower.onTrack")}</p>
                    <p className="text-[10px] text-slate-400">{t("platformPower.actionsPending")}</p>
                  </div>
               </div>
            </div>

             {/* Floating Accessory 2: Document Preview */}
             <div className="absolute bottom-1/4 -left-4 lg:-left-8 p-3 rounded-2xl bg-white shadow-2xl z-20">
               <div className="flex items-center gap-3 pr-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">{t("platformPower.pdfName")}</p>
                    <p className="text-[10px] text-slate-500">{t("platformPower.pendingReview")}</p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformPowerSection;

