"use client";
import React from "react";
import Image from "next/image";
import GradientContainer from "@/components/common/GradientContainer";
import { motion } from "framer-motion";
import TextAnimation from "../common/TextAnimation";

interface WorkspaceCard {
  title: string;
  description: string;
  status?: string;
  links: string[];
}

interface TechnologyRegulatedProps {
  title: string;
  intro: string;
  features: string[];
  footer: string;
  availabilityTitle: string;
  availabilityDescription: string;
  handleTitle: string;
  workspaceCards: WorkspaceCard[];
}

const TechnologyRegulated = ({
  title,
  intro,
  features,
  footer,
  availabilityTitle,
  availabilityDescription,
  handleTitle,
  workspaceCards,
}: TechnologyRegulatedProps) => {
  return (
    <section className="py-16 lg:py-24 w-full">
      <GradientContainer
        className="w-full"
        backgroundColor="bg-section-light"
        showRadials={true}
        radialImage="/assets/images/radial4.png.png"
        topLeftRotation="rotate-180"
        bottomRightRotation="-rotate-360"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <TextAnimation
                text={title}
                as="h2"
                className="text-2xl md:text-3xl lg:text-4xl font-semibold text-heading leading-tight"
              />

              <div className="space-y-4">
                <p className="text-sm md:text-base text-gray leading-relaxed">
                  {intro}
                </p>

                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-3 text-sm md:text-base text-gray"
                    >
                      <div className="mt-1 flex-shrink-0">
                        <Image
                          src="/assets/images/bullet.png"
                          alt="Bullet point"
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      </div>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <p className="text-sm md:text-base text-gray leading-relaxed">
                {footer}
              </p>

              <div className="space-y-3 pt-4">
                <TextAnimation
                  text={availabilityTitle}
                  as="h3"
                  className="text-lg md:text-xl font-semibold text-heading"
                />
                <p className="text-sm md:text-base text-gray leading-relaxed">
                  {availabilityDescription}
                </p>
              </div>
            </motion.div>

            {/* Right Column: UI Container with Overlay Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full flex justify-end"
            >
              {/* Background Image Container - Exact dimensions */}
              <div
                className="relative rounded-lg overflow-visible"
                style={{
                  width: "564px",
                  height: "500px",
                  borderRadius: "8px",
                  opacity: 1,
                }}
              >
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <Image
                    src="/assets/images/Rectangle 34624210.png"
                    alt="Technology Background"
                    fill
                    className="object-cover"
                    sizes="564px"
                    priority
                  />
                </div>

                {/* Overlay UI Container - Positioned on right side of image */}
                <div
                  className="absolute"
                  style={{
                    top: "0px",
                    left: "170px",
                    width: "350px",
                    height: "500px",
                    borderRadius: "8px",
                    opacity: 1,
                    transform: "rotate(0deg)",
                  }}
                >
                  <div
                    className="bg-white rounded-lg shadow-lg w-full h-full p-6 relative z-10"
                    style={{
                      borderRadius: "8px",
                      boxShadow: "0 20px 30px 0 var(--shadow-soft)",
                    }}
                  >
                    {/* Title */}
                    <TextAnimation
                      text={handleTitle}
                      as="h3"
                      className="text-lg font-semibold text-heading mb-6"
                    />

                    {/* Cards List */}
                    <div className="space-y-3">
                      {workspaceCards.map((card, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-sm transition-shadow"
                        >
                          <div className="flex items-start gap-3">
                            {/* Icon */}
                            <div className="mt-0.5 flex-shrink-0">
                              <Image
                                src="/assets/images/bullet.png"
                                alt="Card icon"
                                width={16}
                                height={16}
                                className="object-contain"
                              />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="text-sm font-semibold text-heading">
                                  {card.title}
                                </h4>
                                {card.status && (
                                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                                    {card.status}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray mb-2 leading-relaxed">
                                {card.description}
                              </p>
                              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                                {card.links.map((link, linkIndex) => (
                                  <button
                                    key={linkIndex}
                                    className="text-xs text-primary-blue hover:underline font-medium"
                                  >
                                    {link}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </GradientContainer>
    </section>
  );
};

export default TechnologyRegulated;
