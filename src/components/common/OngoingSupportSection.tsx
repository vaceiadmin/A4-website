"use client";

import React from "react";
import Image from "next/image";
import GradientContainer from "@/components/common/GradientContainer";
import { FadeInUp } from "../common/Animations";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

const OngoingSupportSection = () => {
  const { t } = usePagesTranslation("how-it-works");

  return (
    <section className="py-16 overflow-hidden">
      <GradientContainer
        showRadials={true}
        backgroundColor="bg-gradient-container"
        className="px-4 md:px-8 py-10 md:py-24"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-10 lg:gap-16">
            <FadeInUp className="w-full lg:w-1/2 text-left space-y-5">
              <h2 className="text-3xl md:text-4xl font-medium text-white leading-tight">{t("ongoingSupport.title")}</h2>
              <p className="text-sm md:text-base text-light-gray leading-relaxed max-w-md">{t("ongoingSupport.p1")}</p>
              <p className="text-sm md:text-base text-light-gray leading-relaxed max-w-lg">{t("ongoingSupport.p2")}</p>
            </FadeInUp>

            <FadeInUp delay={0.2} className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src="/assets/images/Rectangle 1072 (1).png"
                    alt={t("ongoingSupport.imageAltBg")}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative w-[78%] md:w-[72%] max-w-lg">
                    <Image
                      src="/assets/images/Frame 1618872520.png"
                      alt={t("ongoingSupport.imageAltOverlay")}
                      width={900}
                      height={600}
                      className="w-full h-auto object-contain drop-shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </GradientContainer>
    </section>
  );
};

export default OngoingSupportSection;
