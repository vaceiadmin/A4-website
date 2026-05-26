"use client";

import React from "react";
import LocalizedLink from "@/components/common/LocalizedLink";
import GetInstantQuoteButton from "@/components/common/GetInstantQuoteButton";
import AnimatedSection from "@/components/common/AnimatedSection";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

const ComingSoonPage = () => {
  const { t } = usePagesTranslation("coming-soon");

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <AnimatedSection className="max-w-2xl w-full">
        <div className="w-full text-center bg-white rounded-3xl shadow-xl border border-input px-8 py-12">
          <p className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold tracking-[0.18em] uppercase bg-[#EEF0FF] text-[#3b49e6] mb-4">
            {t("badge")}
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-heading mb-3">{t("title")}</h1>
          <p className="text-sm md:text-base text-gray mb-6 leading-relaxed">{t("description")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <GetInstantQuoteButton hasShadow={true} />
            <LocalizedLink
              href="/ai-review"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-gray-300 text-sm font-medium text-text-dark hover:bg-gray-50 transition-colors"
            >
              {t("viewAiReview")}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 12h14" />
              </svg>
            </LocalizedLink>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
};

export default ComingSoonPage;
