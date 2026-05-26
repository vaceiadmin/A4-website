"use client";

import React from "react";
import Image from "next/image";
import GradientContainer from "./GradientContainer";
import TextAnimation from "./TextAnimation";

export interface MissionVisionBlock {
  title: string;
  paragraphs: string[];
}

interface MissionVisionSectionProps {
  mission: MissionVisionBlock;
  vision: MissionVisionBlock;
}

const MissionVisionSection = ({ mission, vision }: MissionVisionSectionProps) => {
  return (
    <section className="py-16 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          <GradientContainer
            showRadials={false}
            backgroundColor="bg-hero-dark"
            className="rounded-2xl px-6 py-7 md:px-7 md:py-8 lg:px-8 lg:py-9 shadow-2xl border border-white/5"
          >
            <div className="text-white">
              <TextAnimation
                text={mission.title}
                as="h3"
                className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-white"
              />
              {mission.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-sm md:text-base leading-relaxed text-light-gray ${i < mission.paragraphs.length - 1 ? "mb-4" : ""}`}
                >
                  {p}
                </p>
              ))}
            </div>
          </GradientContainer>

          <GradientContainer
            showRadials={false}
            backgroundColor="bg-hero-dark"
            className="rounded-2xl px-6 py-7 md:px-7 md:py-8 lg:px-8 lg:py-9 shadow-2xl border border-white/5"
          >
            <div className="text-white">
              <TextAnimation
                text={vision.title}
                as="h3"
                className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-white"
              />
              {vision.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-sm md:text-base leading-relaxed text-light-gray ${i < vision.paragraphs.length - 1 ? "mb-4" : ""}`}
                >
                  {p}
                </p>
              ))}
            </div>
          </GradientContainer>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
