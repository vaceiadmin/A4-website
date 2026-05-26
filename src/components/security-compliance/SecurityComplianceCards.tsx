"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { FadeInUp, StaggerContainer } from "@/components/common/Animations";
import { useReduceMotion, usePerformance } from "@/contexts/ReduceMotionContext";
import { cn } from "@/lib/utils";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

interface SecurityCard {
  id: number;
  title: string;
  description: string;
  points?: string[];
  icon: string;
}

const CARD_ICONS = [
  "/assets/images/image 115.png",
  "/assets/images/image 116.png",
  "/assets/images/image 117.png",
  "/assets/images/image 118.png",
  "/assets/images/image 120.png",
  "/assets/images/image 115.png",
  "/assets/images/image 120.png",
];

const SecurityComplianceCards = () => {
  const { isIPhone, isLowPerformance } = usePerformance();
  const { t } = usePagesTranslation("security-compliance");

  const cards: SecurityCard[] = useMemo(
    () =>
      CARD_ICONS.map((icon, i) => {
        const rawPoints = t(`cards.${i}.points`, { returnObjects: true }) as unknown;
        const points = Array.isArray(rawPoints) ? (rawPoints as string[]) : undefined;
        return {
          id: i + 1,
          title: t(`cards.${i}.title`),
          description: t(`cards.${i}.description`),
          ...(points?.length ? { points } : {}),
          icon,
        };
      }),
    [t]
  );

  return (
    <section className="relative py-16 lg:py-24 bg-[#f8fafc] overflow-hidden">
      {!isIPhone && !isLowPerformance && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] bg-blue-50/60 rounded-full blur-[80px]" />
          <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-blue-50/60 rounded-full blur-[80px]" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8">
          {cards.map((card, index) => {
            const getGridColSpan = () => (index < 4 ? "lg:col-span-3" : "lg:col-span-2");

            return (
              <FadeInUp
                key={card.id}
                className={cn(
                  "group relative border border-white/60 rounded-3xl p-6 lg:p-8 shadow-xl transition-all duration-300 flex flex-col",
                  isIPhone || isLowPerformance
                    ? "bg-white"
                    : "bg-white/40 backdrop-blur-xl hover:shadow-2xl hover:shadow-blue-100/40 hover:-translate-y-1",
                  getGridColSpan()
                )}
              >
                {!isIPhone && !isLowPerformance && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" />
                )}

                <div className="mb-6 flex-shrink-0 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-white/50">
                    <Image
                      src={card.icon}
                      alt={card.title}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-heading mb-3 relative z-10 group-hover:text-primary-blue transition-colors">
                  {card.title}
                </h3>

                <p className="text-sm md:text-base text-gray leading-relaxed mb-6 flex-grow relative z-10">
                  {card.description}
                </p>

                {card.points && card.points.length > 0 && (
                  <ul className="space-y-3 mt-auto relative z-10 pt-6 border-t border-white/40">
                    {card.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-3 text-sm text-gray/90">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-blue flex-shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </FadeInUp>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default SecurityComplianceCards;
