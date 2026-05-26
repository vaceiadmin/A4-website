"use client";

import React from "react";
import ServiceFeatures from "../services/ServiceFeatures";

interface BenefitFeature {
  title: string;
  items: string[];
}

interface BenefitsSectionProps {
  title?: string;
  subtitle?: string;
  features?: BenefitFeature[];
}

const BenefitsSection = ({ title, subtitle, features }: BenefitsSectionProps) => {
  return (
    <div className="">
      <ServiceFeatures
        title={title}
        subtitle={subtitle}
        features={features || []}
        theme="light"
        backgroundColor="bg-[#F3F5F7]"
        showRadials={false}
        hideCta={true}
      />
    </div>
  );
};

export default BenefitsSection;
