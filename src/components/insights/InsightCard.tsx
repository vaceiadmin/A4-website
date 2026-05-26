"use client";

import React, { useState, useCallback } from "react";
import LocalizedLink from "@/components/common/LocalizedLink";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import { InsightArticle } from "@/data/insightsData";
import { useReduceMotion, usePerformance } from "@/contexts/ReduceMotionContext";
import { cn } from "@/lib/utils";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";
import { INSIGHT_CATEGORY_I18N_KEY } from "@/lib/insight-category-labels";

interface InsightCardProps {
  article: InsightArticle;
  index: number;
}

const InsightCard = ({ article, index: _index }: InsightCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { reduceMotion, isIPhone, isLowPerformance } = usePerformance();
  const { t } = usePagesTranslation("insights");

  const categoryLabel = useCallback(
    (cat: string) => {
      const key = INSIGHT_CATEGORY_I18N_KEY[cat];
      return key ? t(`categories.${key}`) : cat;
    },
    [t]
  );

  const cardClass = "group relative flex flex-col h-full bg-white rounded-2xl border border-gray-100 hover:border-primary-blue/30 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary-blue/5";

  const cardContent = (
    <>
      <LocalizedLink href={`/insights/${article.slug}`} className="flex flex-col h-full p-6 md:p-8">
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${isHovered ? "bg-primary-blue text-white" : "bg-primary-blue/5 text-primary-blue"}`}>
            {categoryLabel(article.category)}
          </span>
          <div className="flex items-center text-xs text-text-gray/70">
            <Calendar className="w-3 h-3 mr-1" />
            {article.publishDate}
          </div>
        </div>
        <h3 className="text-xl font-bold text-text-heading mb-3 group-hover:text-primary-blue transition-colors duration-300 line-clamp-2">{article.title}</h3>
        <p className="text-text-gray text-sm leading-relaxed mb-6 line-clamp-3">{article.description}</p>
        <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-text-heading">{article.author}</span>
            {article.readTime && (
              <span className="flex items-center text-xs text-text-gray/60 mt-1">
                <Clock className="w-3 h-3 mr-1" />
                {article.readTime}
              </span>
            )}
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary-blue transition-colors duration-300">
            <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
          </div>
        </div>
      </LocalizedLink>
    </>
  );

  if (reduceMotion) {
    return (
      <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={cardClass}>
        {cardContent}
      </div>
    );
  }

  return (
    <div
      className={cn(
        cardClass,
        (isIPhone || isLowPerformance) && "hover:translate-y-0 hover:shadow-md"
      )}
    >
      {cardContent}
    </div>
  );
};

export default InsightCard;
