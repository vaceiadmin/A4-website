"use client";

import React from "react";
import { FadeInUp } from "../common/Animations";

interface SectionItem {
  title?: string;
  content: string[];
  list?: string[];
}

interface ContentSectionProps {
  title: string;
  description?: string;
  sections: SectionItem[];
  children?: React.ReactNode;
}

const ContentSection = ({ title, description, sections, children }: ContentSectionProps) => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <FadeInUp>
          <div className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-6 relative inline-block">
              {title}
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary-blue rounded-full"></span>
            </h2>
            {description && (
              <p className="text-lg text-text-gray leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </FadeInUp>

        <div className="space-y-12 md:space-y-16">
          {sections.map((section, index) => (
            <FadeInUp key={index} delay={index * 0.1}>
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow duration-300">
                {section.title && (
                  <h3 className="text-xl md:text-2xl font-bold text-text-heading mb-4">
                    {section.title}
                  </h3>
                )}
                
                <div className="space-y-4">
                  {section.content.map((paragraph, idx) => (
                    <p key={idx} className="text-text-gray leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.list && section.list.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {section.list.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-text-gray">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-blue flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </FadeInUp>
          ))}
        </div>
        
        {children && (
            <div className="mt-12">
                <FadeInUp delay={0.3}>
                    {children}
                </FadeInUp>
            </div>
        )}
      </div>
    </section>
  );
};

export default ContentSection;
