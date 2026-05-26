"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Handshake, Layers, Puzzle, TrendingUp, type LucideIcon } from "lucide-react";

interface PartnerCardProps {
  title: string;
  description: string;
  link: string;
  learnMoreText?: string;
  iconIndex?: number;
  delay?: number;
}

const icons: LucideIcon[] = [Handshake, Layers, Puzzle, TrendingUp];

const PartnerCard = ({ 
  title, 
  description, 
  link, 
  learnMoreText,
  iconIndex = 0, 
  delay = 0 
}: PartnerCardProps) => {
  const { t } = useTranslation("common");
  const ctaLabel = learnMoreText ?? t("glossary.learnMore");
  const Icon = icons[iconIndex % icons.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className="group relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col"
    >
      {/* Animated Icon Section */}
      <div className="relative h-48 w-full overflow-hidden bg-linear-to-br from-primary-blue/10 via-primary-blue/5 to-transparent flex items-center justify-center">
        <motion.div
          className="relative w-24 h-24 rounded-2xl bg-white/80 backdrop-blur-sm border border-primary-blue/20 flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.08, rotate: 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-primary-blue"
          >
            <Icon className="w-12 h-12 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
        {/* Floating orbs */}
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary-blue/30"
            style={{ left: `${20 + i * 30}%`, top: `${30 + (i % 2) * 40}%` }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
        <motion.div
          className="absolute inset-0 bg-linear-to-t from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          aria-hidden
        />
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-text-heading mb-3 group-hover:text-primary-blue transition-colors">
          {title}
        </h3>
        <p className="text-text-gray text-sm leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        <div className="mt-auto">
          <Link
            href={link}
            className="inline-flex items-center text-primary-blue font-semibold text-sm group-hover:underline decoration-2 underline-offset-4 transition-all"
          >
            {ctaLabel}
            <svg
              className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PartnerCard;
