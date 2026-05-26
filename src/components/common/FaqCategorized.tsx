"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import TextAnimation from "./TextAnimation";
import { usePerformance } from "@/contexts/ReduceMotionContext";
import { cn } from "@/lib/utils";

interface FaqQuestion {
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  titleHighlight?: string; // The word to highlight in purple
  questions: FaqQuestion[];
}

interface FaqCategorizedProps {
  categories: FaqCategory[];
  showLabel?: boolean;
  labelText?: string;
}

const FaqCategorized = ({
  categories,
  showLabel = true,
  labelText = "COMMON QUESTIONS",
}: FaqCategorizedProps) => {
  const [openItems, setOpenItems] = useState<{ [key: string]: number | null }>(
    {},
  );
  const { isIPhone, isLowPerformance } = usePerformance();

  const toggleItem = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: prev[key] === questionIndex ? null : questionIndex,
    }));
  };

  return (
    <section className="w-full py-16 lg:py-24 overflow-hidden bg-[#f8fafc]">
       {/* Background Decor - consistent light gradients - Hidden on iPhone */}
       {!isIPhone && !isLowPerformance && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[30%] left-[-10%] w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[80px]" />
            <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[80px]" />
        </div>
       )}

      <div className="relative max-w-6xl mx-auto px-4 md:px-6 lg:px-8 z-10">
        {/* Label */}
        {showLabel && (
          <div className="text-center mb-12">
            <span className="inline-block bg-white text-heading text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full border border-gray-200 shadow-sm">
              {labelText}
            </span>
          </div>
        )}

        {/* Categories */}
        <div className="space-y-16 lg:space-y-24">
          {categories.map((category, categoryIndex) => {
            
            // First category gets larger text
            const isFirstCategory = categoryIndex === 0;
            const titleSize = isFirstCategory
              ? "text-3xl md:text-4xl lg:text-5xl"
              : "text-2xl md:text-3xl lg:text-4xl";

            return (
              <div key={categoryIndex} className="space-y-8 lg:space-y-10">
                {/* Category Heading */}
                <div className="relative">
                     <TextAnimation
                        text={category.title}
                        as="h2"
                        className={`${titleSize} font-medium text-heading text-center`}
                        />
                     {/* Decorative subtle underline/glow */}
                     <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-24 h-1 bg-gradient-to-r from-transparent via-primary-blue/30 to-transparent rounded-full" />
                </div>

                {/* Questions */}
                <div className="space-y-4 max-w-4xl mx-auto">
                  {category.questions.map((faq, questionIndex) => {
                    const key = `${categoryIndex}-${questionIndex}`;
                    const isOpen = openItems[key] === questionIndex;

                    return (
                      <motion.div
                        key={questionIndex}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: questionIndex * 0.05 }}
                        onClick={() => toggleItem(categoryIndex, questionIndex)}
                        className={cn(
                          "group rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden",
                          isOpen
                            ? "bg-white border-primary-blue/30 shadow-lg shadow-blue-100/50"
                            : isIPhone || isLowPerformance
                              ? "bg-white/80 border-gray-100 shadow-sm"
                              : "bg-white/40 border-white/60 hover:bg-white/60 hover:border-white shadow-sm hover:shadow-md"
                        )}
                      >
                        <div className="flex items-center justify-between px-6 lg:px-8 py-5">
                          <h3
                            className={cn(
                              "text-base lg:text-lg font-semibold tracking-tight pr-8 transition-colors duration-300",
                              isOpen ? "text-primary-blue" : "text-heading group-hover:text-primary-blue"
                            )}
                          >
                            {faq.question}
                          </h3>
                          <div
                            className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 flex-shrink-0",
                              isOpen
                                ? "bg-primary-blue text-white rotate-180"
                                : "bg-white text-gray shadow-sm group-hover:text-primary-blue"
                            )}
                          >
                             {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                          </div>
                        </div>
                        <AnimatePresence>
                            {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <div className="px-6 lg:px-8 pb-6 lg:pb-8 pt-0">
                                <p className="text-sm lg:text-base text-gray leading-[1.7]">
                                    {faq.answer}
                                </p>
                                </div>
                            </motion.div>
                            )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Divider Line if not last */}
                {categoryIndex !== categories.length - 1 && (
                     <div className="max-w-xs mx-auto border-t border-gray-200/60 mt-16 lg:mt-24"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqCategorized;

