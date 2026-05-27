"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import LocalizedLink from "@/components/common/LocalizedLink";

interface LandingHeroProps {
  namespace: "accounting" | "business";
}

const LandingHero = ({ namespace }: LandingHeroProps) => {
  const { t } = useTranslation(namespace);

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 lg:px-16 pt-32 pb-20 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:linear-gradient(to_bottom,black_30%,transparent_100%)]" />
        <div className="absolute w-[400px] h-[400px] bg-[rgba(0,0,0,0.04)] top-[-100px] left-[-100px] blur-[80px] rounded-full animate-pulse opacity-50" />
        <div className="absolute w-[500px] h-[500px] bg-[rgba(0,0,0,0.02)] top-[30%] right-[-150px] blur-[80px] rounded-full animate-pulse opacity-50" style={{ animationDelay: '-4s' }} />
        <div className="absolute w-[600px] h-[600px] bg-[rgba(0,0,0,0.03)] bottom-[-200px] left-[20%] blur-[80px] rounded-full animate-pulse opacity-50" style={{ animationDelay: '-8s' }} />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-200 rounded-full py-1.5 px-4 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 shadow-[0_0_8px_rgba(0,0,0,0.2)] animate-pulse" />
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-900">
            {t("hero.badge")}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-sora text-[clamp(40px,6vw,80px)] font-extrabold leading-[1.05] tracking-tight text-zinc-900 mb-6">
          {t("hero.titleLine1", { defaultValue: "Your accounting." })} <br />
          <span className="text-zinc-500">{t("hero.titleHighlight", { defaultValue: "Handled by AI agents." })}</span>
        </h1>

        {/* Body */}
        <p className="text-[17px] font-normal text-zinc-600 leading-[1.6] max-w-2xl mb-12">
          <strong className="text-zinc-900 font-semibold">{t("hero.bodyStrong", { defaultValue: "Vacei deploys specialist AI agents" })}</strong>
          {t("hero.body", { defaultValue: " — running your entire back-office concurrently at a fraction of the cost." })}
        </p>

        {/* CTA Row */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 w-full sm:w-auto">
          <LocalizedLink href="/contact" className="bg-zinc-900 text-white font-sora text-sm font-semibold py-3.5 px-8 rounded-full transition-all hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-black">
            {t("hero.cta1", { defaultValue: "Get your first month free →" })}
          </LocalizedLink>
          <a href="#agents" className="bg-white text-zinc-900 text-sm font-semibold py-3.5 px-8 rounded-full border border-zinc-200 transition-all hover:bg-zinc-50 hover:border-zinc-300">
            {t("hero.cta2", { defaultValue: "Meet the team" })}
          </a>
        </div>

        {/* Free Pill */}
        <div className="text-[12px] text-zinc-600 font-semibold tracking-wide mb-14 bg-zinc-100 border border-zinc-200 py-2 px-4 rounded-full">
          ✦ {t("hero.freePill", { defaultValue: "First engagement completely free — no contract, no commitment" })}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 pt-10 border-t border-zinc-200 w-full max-w-3xl">
          <div className="text-center">
            <span className="block font-sora text-[40px] font-extrabold text-zinc-900 mb-2 tracking-[-0.04em]">
              <span className="text-zinc-400">{t("hero.stats.val1", { defaultValue: "10%" })}</span>
            </span>
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.12em]">
              {t("hero.stats.label1", { defaultValue: "of accounting fee" })}
            </span>
          </div>
          <div className="text-center">
            <span className="block font-sora text-[40px] font-extrabold text-zinc-900 mb-2 tracking-[-0.04em]">
              {t("hero.stats.val2", { defaultValue: "8" })}
            </span>
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.12em]">
              {t("hero.stats.label2", { defaultValue: "specialist agents" })}
            </span>
          </div>
          <div className="text-center">
            <span className="block font-sora text-[40px] font-extrabold text-zinc-900 mb-2 tracking-[-0.04em]">
              {t("hero.stats.val3", { defaultValue: "48" })}<span className="text-zinc-400">h</span>
            </span>
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.12em]">
              {t("hero.stats.label3", { defaultValue: "monthly close turnaround" })}
            </span>
          </div>
          <div className="text-center">
            <span className="block font-sora text-[40px] font-extrabold text-zinc-400 mb-2 tracking-[-0.04em]">
              {t("hero.stats.val4", { defaultValue: "Free" })}
            </span>
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.12em]">
              {t("hero.stats.label4", { defaultValue: "first engagement" })}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
