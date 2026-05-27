"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Activity, Shield, MessageSquare, Database } from "lucide-react";

interface PortalMockupProps {
  namespace: "accounting" | "business";
}

const PortalMockup = ({ namespace }: PortalMockupProps) => {
  const { t } = useTranslation(namespace);

  const features = [
    { icon: <Activity className="w-4 h-4 text-[#71717A]" />, text: t("portal.f1") },
    { icon: <Shield className="w-4 h-4 text-[#71717A]" />, text: t("portal.f2") },
    { icon: <MessageSquare className="w-4 h-4 text-[#71717A]" />, text: t("portal.f3") },
    { icon: <Database className="w-4 h-4 text-[#71717A]" />, text: t("portal.f4") },
  ];

  return (
    <section id="portal" className="relative z-10 px-6 lg:px-16 pb-32 bg-white">
      <div className="max-w-7xl mx-auto bg-zinc-50 border border-zinc-200 rounded-[28px] p-8 lg:p-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Text */}
          <div>
            <h2 className="font-sora text-3xl md:text-4xl font-extrabold text-zinc-900 mb-6 tracking-tight">
              {t("portal.title")}
            </h2>
            <p className="text-base font-normal text-zinc-600 leading-relaxed mb-8">
              {t("portal.sub")}
            </p>
            
            <div className="flex flex-col gap-3">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white border border-zinc-200 rounded-xl transition-colors hover:bg-zinc-100 hover:border-zinc-300">
                  <div className="w-7 text-center shrink-0 flex justify-center text-zinc-900">
                    {f.icon}
                  </div>
                  <span className="text-[13px] font-medium text-zinc-700">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Mockup Screen */}
          <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-2xl">
            {/* Browser Bar */}
            <div className="flex items-center gap-3 p-2.5 bg-zinc-50 rounded-lg mb-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
              </div>
              <div className="flex-1 bg-white rounded px-3 py-1 text-[10px] text-zinc-500 font-mono text-center border border-zinc-100">
                app.a4services.com/engagements/seytravel-fy24
              </div>
            </div>

            {/* Dashboard Mock Content */}
            <div className="flex gap-2 mb-4">
              <div className="text-[10px] font-semibold px-3 py-1 rounded bg-zinc-900 text-white shadow-sm border border-zinc-900">Overview</div>
              <div className="text-[10px] font-medium px-3 py-1 rounded bg-white text-zinc-500 border border-zinc-200">Trial Balance</div>
              <div className="text-[10px] font-medium px-3 py-1 rounded bg-white text-zinc-500 border border-zinc-200">Working Papers</div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3">
                <div className="text-[9px] text-zinc-500 font-semibold uppercase tracking-widest mb-1.5">Materiality</div>
                <div className="font-sora text-lg font-bold text-zinc-900 tracking-tight">€45,000</div>
              </div>
              <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3">
                <div className="text-[9px] text-zinc-500 font-semibold uppercase tracking-widest mb-1.5">Progress</div>
                <div className="font-sora text-lg font-bold text-zinc-900 tracking-tight flex items-end justify-between">
                  84% <span className="text-[10px] text-emerald-600 font-medium mb-1">+12% today</span>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg overflow-hidden border border-zinc-200">
              <div className="grid grid-cols-4 p-2.5 border-b border-zinc-200 bg-zinc-50">
                <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 col-span-2">Account</div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 text-right">Balance</div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 text-right">Status</div>
              </div>
              
              {[
                { acc: "Revenue", bal: "€1.2M", stat: "Tested", statColor: "text-zinc-900 font-semibold" },
                { acc: "Cost of Sales", bal: "€450k", stat: "Adj. Required", statColor: "text-amber-600 font-medium" },
                { acc: "Operating Exp.", bal: "€320k", stat: "Tested", statColor: "text-zinc-900 font-semibold" },
                { acc: "Trade Receivables", bal: "€180k", stat: "Pending", statColor: "text-zinc-400" }
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-4 p-2.5 border-b border-zinc-100 last:border-b-0">
                  <div className="text-[10px] text-zinc-700 col-span-2 font-medium">{row.acc}</div>
                  <div className="text-[10px] text-zinc-700 text-right font-mono">{row.bal}</div>
                  <div className={`text-[10px] text-right ${row.statColor}`}>{row.stat}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PortalMockup;
