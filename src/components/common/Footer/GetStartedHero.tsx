"use client";

import React from "react";
import Image from "next/image";
import GetInstantQuoteButton from "@/components/common/GetInstantQuoteButton";
import GradientContainer from "@/components/common/GradientContainer";
import TextAnimation from "@/components/common/TextAnimation";
import { FadeInUp } from "@/components/common/Animations";
import { useTranslation } from "react-i18next";

const FinancialOverviewImage = "/assets/images/financial-overview.png";
const CashflowImage = "/assets/images/cashflow.png";
const ComplianceSnapshotImage = "/assets/images/compliance-snapshot.png";

const GetStartedHero = () => {
  const { t } = useTranslation("home");

  return (
    <section className="relative z-40 w-full min-w-0 py-12 max-lg:overflow-visible lg:overflow-hidden lg:py-20 mt-48">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="relative overflow-hidden rounded-3xl bg-[#030712] border border-white/5 shadow-2xl">
          {/* Dynamic Background Elements */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[100px] -z-10" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[100px] -z-10" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-16 sm:py-20 lg:py-24 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-8">
              {t("footerCta.badge")}
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-8">
              {t("footerCta.titleLine1")} <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-blue-500 to-blue-600">
                {t("footerCta.titleHighlight")}
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-12 max-w-2xl">
              {t("footerCta.body")}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <GetInstantQuoteButton
                variant="default"
                text={t("footerCta.quoteCta")}
                className="w-full sm:w-auto h-14 px-8 text-base font-bold shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all"
              />
              <button className="w-full sm:w-auto h-14 px-8 text-base font-bold text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                {t("footerCta.demoCta")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedHero;
