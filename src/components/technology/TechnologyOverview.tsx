import React from "react";
import Image from "next/image";
import TextAnimation from "../common/TextAnimation";

interface TechnologyOverviewProps {
  title: string;
  p1: string;
  p2: string;
  p3: string;
  backgroundAlt?: string;
  progressAlt?: string;
  dataAlt?: string;
}

const TechnologyOverview = ({
  title,
  p1,
  p2,
  p3,
  backgroundAlt = "Technology Background",
  progressAlt = "Progress Tracker Card",
  dataAlt = "Data Visualization Card",
}: TechnologyOverviewProps) => {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Visual/Image with Background and Overlays */}
          <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px] rounded-2xl overflow-visible shadow-lg">
            {/* Background Image */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <Image
                src="/assets/images/Rectangle 1072.png"
                alt={backgroundAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Overlay Image 1 - div.feature-visual (Progress Card) - Top Left */}
            <div className="absolute top-0 left-0 z-10 w-[240px] sm:w-[280px] lg:w-[370px] h-auto">
              <Image
                src="/assets/images/div.feature-visual.png"
                alt={progressAlt}
                width={300}
                height={200}
                className="w-full h-auto object-contain"
                sizes="(max-width: 640px) 240px, (max-width: 1024px) 280px, 300px"
              />
            </div>

            {/* Overlay Image 2 - Group 55 (Data Visualization Card) - Bottom Right */}
            <div className="absolute -bottom-10 -right-10 z-20 w-[280px] sm:w-[320px] lg:w-[370px] h-auto">
              <Image
                src="/assets/images/Group 55.png"
                alt={dataAlt}
                width={340}
                height={250}
                className="w-full h-auto object-contain"
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 340px"
              />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col justify-center h-full">
            <TextAnimation
              text={title}
              as="h2"
              className="text-2xl md:text-3xl lg:text-4xl font-semibold text-heading mb-6 leading-tight"
            />

            <div className="space-y-4 text-sm md:text-base text-gray leading-[1.8]">
              <p>{p1}</p>
              <p>{p2}</p>
              <p>{p3}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyOverview;
