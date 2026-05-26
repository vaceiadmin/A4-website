"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import GradientContainer from "@/components/common/GradientContainer";
import GetInstantQuoteButton from "@/components/common/GetInstantQuoteButton";
import SectionBadge from "@/components/common/SectionBadge";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

const ROW_IDS = ["episodes", "guest", "be-guest"] as const;

const ROW_IMAGES: Record<(typeof ROW_IDS)[number], string> = {
  episodes: "/assets/images/Rectangle 34624232.png",
  guest: "/assets/images/Rectangle 34624231.png",
  "be-guest": "/assets/images/RectangleV.png",
};

const PodcastSection = () => {
  const { t } = usePagesTranslation("cpe");
  const [activeRowId, setActiveRowId] = useState<string>("episodes");

  const podcastRows = useMemo(
    () =>
      ROW_IDS.map((id) => ({
        id,
        label: t(`podcast.rows.${id}.label`),
        description: t(`podcast.rows.${id}.description`),
        image: ROW_IMAGES[id],
      })),
    [t]
  );

  return (
    <section className="py-16 lg:py-20 overflow-hidden">
      <GradientContainer
        showRadials={true}
        backgroundColor="bg-gradient-container"
        className="py-10 md:py-12 lg:py-14"
      >
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-12">
            <SectionBadge text={t("podcast.badge")} className="border-white !text-white/80" />
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-white leading-tight">
              {t("podcast.title")}
            </h2>
            <p className="mt-3 text-sm md:text-base text-light-gray max-w-2xl mx-auto leading-relaxed">
              {t("podcast.subtitle")}
            </p>
          </div>

          <div className="bg-black/20 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-xl">
            {podcastRows.map((row, index) => {
              const isActive = row.id === activeRowId;
              const isFirst = index === 0;

              return (
                <div
                  key={row.id}
                  onMouseEnter={() => setActiveRowId(row.id)}
                  className={`flex flex-col md:flex-row border-t border-white/10 transition-all duration-300 cursor-pointer ${
                    isActive ? "bg-primary-blue/80" : "bg-gradient-to-r from-hero to-hero"
                  } ${isFirst ? "border-t-0" : ""}`}
                >
                  <div className="md:w-1/4 px-5 py-4 flex items-start md:items-center md:border-r border-white/10">
                    <p className="text-white text-xl font-medium">{row.label}</p>
                  </div>

                  {isActive ? (
                    <>
                      <div className="md:w-2/5 px-5 py-4 md:border-r border-white/10 flex items-center justify-center ">
                        <div className="relative w-full max-w-sm aspect-video rounded-xl overflow-hidden">
                          <Image
                            src={row.image}
                            alt={row.label}
                            fill
                            className="object-cover"
                            priority={isFirst}
                          />
                        </div>
                      </div>

                      <div className="md:flex-1 px-5 py-4 flex items-center">
                        <p className="text-sm text-white leading-relaxed">{row.description}</p>
                      </div>
                    </>
                  ) : (
                    <div className="md:flex-1 px-5 py-4">
                      <p className="text-sm text-light-gray leading-relaxed">{row.description}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 lg:mt-12 text-center">
            <p className="text-sm md:text-base text-light-gray max-w-xl mx-auto mb-5 leading-relaxed">
              {t("podcast.bottomCta")}
            </p>
            <GetInstantQuoteButton />
          </div>
        </div>
      </GradientContainer>
    </section>
  );
};

export default PodcastSection;
