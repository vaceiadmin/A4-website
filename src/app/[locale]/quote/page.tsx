"use client";

import React, { useEffect } from "react";
import PageHeader from "@/components/common/PageHeader";
import ProcessStepsSection from "@/components/HomePage/ProcessStepsSection";
import QuoteProcess from "@/components/quote/QuoteProcess";
import { FadeInUp } from "@/components/common/Animations";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

const QuotePage = () => {
  const { t } = usePagesTranslation("quote");

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (hash !== "process-steps" && hash !== "contact-form") return;

    const targetId = hash === "contact-form" ? "process-steps" : hash;
    const el = document.getElementById(targetId);

    if (el) {
      const timer = setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <PageHeader title={t("pageHeader.title")} breadcrumbs={[{ label: t("pageHeader.breadcrumbs.0.label") }]} />
      </div>

      <div id="process-steps">
        <ProcessStepsSection />
      </div>

      <FadeInUp delay={0.2}>
        <QuoteProcess />
      </FadeInUp>
    </main>
  );
};

export default QuotePage;
