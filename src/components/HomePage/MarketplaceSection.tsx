"use client";

import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import GetInstantQuoteButton from "@/components/common/GetInstantQuoteButton";
import { ClipboardList, Network, FileSpreadsheet, UserCheck } from "lucide-react";
import { lazyImgProps } from "@/lib/lazy-media-props";

interface StepProps {
    number: string;
    title: string;
    desc: string;
    icon: React.ReactNode;
    isLast?: boolean;
}

const Step = ({ number, title, desc, icon, isLast }: StepProps) => (
  <div className="relative flex gap-8 md:gap-12 pb-12 last:pb-0 group">
    {!isLast && (
      <div className="absolute left-[27px] top-[60px] bottom-[-20px] w-px bg-white/10 group-hover:bg-blue-500 transition-colors duration-500 hidden md:block" />
    )}
    <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-sm flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:border-blue-500 transition-all duration-500">
      {icon}
      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] font-black text-slate-900 border-2 border-slate-900">
        {number}
      </div>
    </div>
    <div className="flex-1 pt-2">
      <h3 className="text-xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-slate-400 font-medium leading-relaxed max-w-xl">{desc}</p>
    </div>
  </div>
);

const MarketplaceSection = () => {
  const { t } = useTranslation("home");
  const steps = useMemo(() => {
    const raw = t("vaceiNetwork.steps", { returnObjects: true }) as
      | { number: string; title: string; desc: string }[]
      | string;
    const list = Array.isArray(raw) ? raw : [];
    const icons = [
      <ClipboardList key="a" className="w-6 h-6" />,
      <Network key="b" className="w-6 h-6" />,
      <FileSpreadsheet key="c" className="w-6 h-6" />,
      <UserCheck key="d" className="w-6 h-6" />,
    ];
    return list.map((s, i) => ({ ...s, icon: icons[i] }));
  }, [t]);

  return (
    <section className="py-24 bg-black relative overflow-hidden rounded-[48px]">
      {/* Abstract Background Decoration */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0,transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={
            steps.length > 0
              ? "flex flex-col gap-16 lg:gap-24 lg:flex-row lg:items-start"
              : "flex flex-col gap-12 lg:gap-16 lg:flex-row lg:items-start"
          }
        >
          {/* Copy + CTA */}
          <div className={steps.length > 0 ? "w-full lg:w-1/3 shrink-0" : "w-full lg:w-1/2"}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20 mb-8">
              {t("vaceiNetwork.badge")}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tight">
              {t("vaceiNetwork.titleLine1")}
              <span className="text-blue-400">{t("vaceiNetwork.titleHighlight")}</span>
            </h2>
            <p className="text-lg text-slate-400 mb-10 font-medium leading-relaxed whitespace-pre-line">
              {t("vaceiNetwork.body")}
            </p>
            <GetInstantQuoteButton
              text={t("vaceiNetwork.cta")}
              className="h-[56px] px-10 shadow-xl shadow-blue-600/20"
            />
          </div>

          {/* Visual — right column on large screens (or below on mobile) */}
          <div
            className={
              steps.length > 0
                ? "w-full lg:w-2/3 flex flex-col gap-12"
                : "w-full lg:w-1/2 flex flex-col justify-center lg:min-h-[min(520px,50vh)]"
            }
          >
            <div className="relative rounded-2xl overflow-hidden bg-[#1D1E30] border border-white/10 shadow-2xl transition-transform duration-700 hover:scale-[1.01] w-full max-w-[520px] lg:max-w-none mx-auto lg:ml-auto lg:mr-0">
              <div className="h-8 w-full bg-[#181926] border-b border-white/5 flex items-center px-4 justify-between relative">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
              </div>
              <div className="relative w-full bg-[#050505] overflow-hidden">
                <img
                  src="/assets/videos/Request%20Service_V1.2.gif"
                  alt={t("vaceiNetwork.gifAlt")}
                  className="w-full h-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-500"
                  {...lazyImgProps}
                />
              </div>
            </div>

            {steps.length > 0 ? (
              <div className="bg-[#0D0F18] backdrop-blur-xl p-8 md:p-16 rounded-[3rem] border border-white/15 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/[0.03] to-transparent pointer-events-none" />
                <div className="space-y-4">
                  {steps.map((step, i) => (
                    <Step key={i} {...step} isLast={i === steps.length - 1} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;
