"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CategoryFilter from "./CategoryFilter";
import InsightCard from "./InsightCard";
import { insightsData, insightCategories } from "@/data/insightsData";
import { FadeInUp } from "@/components/common/Animations";
import { usePerformance } from "@/contexts/ReduceMotionContext";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";
import { INSIGHT_CATEGORY_I18N_KEY } from "@/lib/insight-category-labels";

const InsightsClient = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { reduceMotion, isIPhone, isLowPerformance } = usePerformance();
  const { t } = usePagesTranslation("insights");

  const categoryLabel = useCallback(
    (cat: string) => {
      if (cat === "All") return t("allTopics");
      const key = INSIGHT_CATEGORY_I18N_KEY[cat];
      return key ? t(`categories.${key}`) : cat;
    },
    [t]
  );

  const isSimple = isIPhone || isLowPerformance;

  const filteredArticles = useMemo(() => {
    if (activeCategory === "All") {
      return insightsData;
    }
    return insightsData.filter((article) => article.category === activeCategory);
  }, [activeCategory]);

  const filterSection = (
    <div className="flex justify-center mb-8">
      <CategoryFilter
        categories={insightCategories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        getLabel={categoryLabel}
      />
    </div>
  );

  const articlesGrid = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {filteredArticles.map((article) => (
        <div key={article.id}>
          <InsightCard article={article} index={Number(article.id)} />
        </div>
      ))}
    </div>
  );

  const animatedGrid = (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
    >
      <AnimatePresence mode="popLayout">
        {filteredArticles.map((article) => (
          <motion.div
            layout
            key={article.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <InsightCard article={article} index={Number(article.id)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );

  const noResults = (
    <div className="text-center py-20">
      <p className="text-xl text-text-gray">{t("noCategoryArticles")}</p>
      <button
        type="button"
        onClick={() => setActiveCategory("All")}
        className="mt-4 text-primary-blue hover:underline font-medium"
      >
        {t("viewAllArticles")}
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-[1400px]">
      <FadeInUp className="mb-12 md:mb-16">
        {filterSection}
      </FadeInUp>

      {reduceMotion || isSimple ? articlesGrid : animatedGrid}

      {filteredArticles.length === 0 && noResults}
    </div>
  );
};

export default InsightsClient;
