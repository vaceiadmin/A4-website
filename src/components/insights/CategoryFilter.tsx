
"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

import { usePerformance } from "@/contexts/ReduceMotionContext";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  /** UI label (defaults to raw category value) */
  getLabel?: (category: string) => string;
}

const CategoryFilter = ({
  categories,
  activeCategory,
  onSelectCategory,
  getLabel = (c) => c,
}: CategoryFilterProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isIPhone, isLowPerformance } = usePerformance();

  // Optional: Scroll active category into view if needed
  useEffect(() => {
    // Implementation for auto-scroll if desired
  }, [activeCategory]);

  return (
    <div className="w-full relative group">
      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-2 overflow-x-auto pb-4 pt-2 hide-scrollbar scroll-smooth"
        style={{
            // Creating a mask to fade edges if content overflows
            maskImage: "linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)",
        }}
      >
        <div className="flex gap-3 px-4 md:px-0 mx-auto">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`
                  relative px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300
                  ${
                    isActive
                      ? "text-white bg-primary-blue shadow-lg shadow-primary-blue/30 scale-105"
                      : "text-text-gray bg-white border border-gray-200 hover:border-primary-blue/50 hover:text-primary-blue hover:bg-primary-blue/5"
                  }
                `}
              >
                {getLabel(category)}
                {isActive && !isIPhone && !isLowPerformance && (
                  <motion.div
                    layoutId="activeCategoryHighlight"
                    className="absolute inset-0 rounded-full bg-primary-blue -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
      
    </div>
  );
};

export default CategoryFilter;
