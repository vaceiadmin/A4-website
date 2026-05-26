"use client";

import React, { useMemo } from "react";
import PageHeader from "@/components/common/PageHeader";
import FaqAccordion from "@/components/common/FaqAccordion";
import FaqCategorized from "@/components/common/FaqCategorized";
import { FadeInUp } from "@/components/common/Animations";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

const FaqPage = () => {
  const { t } = usePagesTranslation("faq");

  const faqItems = useMemo(
    () =>
      [0, 1, 2].map((i) => ({
        title: t(`accordion.${i}.title`),
        content: t(`accordion.${i}.content`),
      })),
    [t]
  );

  const faqCategories = useMemo(
    () => [
      {
        title: t("categories.0.title"),
        titleHighlight: t("categories.0.titleHighlight"),
        questions: [
          {
            question: t("categories.0.questions.0.question"),
            answer: t("categories.0.questions.0.answer"),
          },
          {
            question: t("categories.0.questions.1.question"),
            answer: t("categories.0.questions.1.answer"),
          },
          {
            question: t("categories.0.questions.2.question"),
            answer: t("categories.0.questions.2.answer"),
          },
        ],
      },
      {
        title: t("categories.1.title"),
        titleHighlight: t("categories.1.titleHighlight"),
        questions: [
          {
            question: t("categories.1.questions.0.question"),
            answer: t("categories.1.questions.0.answer"),
          },
          {
            question: t("categories.1.questions.1.question"),
            answer: t("categories.1.questions.1.answer"),
          },
        ],
      },
      {
        title: t("categories.2.title"),
        titleHighlight: t("categories.2.titleHighlight"),
        questions: [
          {
            question: t("categories.2.questions.0.question"),
            answer: t("categories.2.questions.0.answer"),
          },
          {
            question: t("categories.2.questions.1.question"),
            answer: t("categories.2.questions.1.answer"),
          },
        ],
      },
      {
        title: t("categories.3.title"),
        titleHighlight: t("categories.3.titleHighlight"),
        questions: [
          {
            question: t("categories.3.questions.0.question"),
            answer: t("categories.3.questions.0.answer"),
          },
          {
            question: t("categories.3.questions.1.question"),
            answer: t("categories.3.questions.1.answer"),
          },
        ],
      },
    ],
    [t]
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <PageHeader title={t("pageHeader.title")} breadcrumbs={[{ label: t("pageHeader.breadcrumbs.0.label") }]} />
      </div>

      <FadeInUp>
        <FaqAccordion faqItems={faqItems} backgroundColor="bg-[#020410]" showRadials={false} />
      </FadeInUp>
      <FadeInUp delay={0.2}>
        <FaqCategorized categories={faqCategories} />
      </FadeInUp>
    </main>
  );
};

export default FaqPage;
