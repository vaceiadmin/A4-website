"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import LocalizedLink from "@/components/common/LocalizedLink";

interface CTASectionProps {
  namespace: "accounting" | "business";
}

const CTASection = ({ namespace }: CTASectionProps) => {
  const { t } = useTranslation(namespace);

  return (
    <section className="relative z-10 py-32 px-6 lg:px-16 text-center overflow-hidden bg-white border-t border-zinc-200">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(0,0,0,0.02),transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="font-sora text-[clamp(40px,5vw,72px)] font-extrabold tracking-tight leading-[1.08] text-zinc-900 mb-6">
          {t("cta.titleLine1")} <span className="text-zinc-500">{t("cta.titleHighlight")}</span>
        </h2>
        
        <p className="text-lg font-normal text-zinc-600 leading-relaxed max-w-xl mx-auto mb-10">
          {t("cta.sub")}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <LocalizedLink href="/contact" className="bg-zinc-900 text-white font-sora text-sm font-semibold py-4 px-10 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.2)] hover:bg-black">
            {t("cta.btn1")}
          </LocalizedLink>
          <LocalizedLink href="/auditor-questionnaire" className="text-zinc-600 text-sm font-medium py-4 px-10 rounded-full border border-zinc-200 transition-all hover:border-zinc-300 hover:text-zinc-900 bg-zinc-50 hover:bg-zinc-100">
            {t("cta.btn2", { defaultValue: "Try the Dashboard" })}
          </LocalizedLink>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
