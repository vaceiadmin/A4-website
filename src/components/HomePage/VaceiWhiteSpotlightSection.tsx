"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionTitleHero } from "@/components/HomePage/SectionTitleHero";
import { LayoutDashboard, Network, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const pillarIcons = [
  <ShieldCheck key="a" className="w-7 h-7" strokeWidth={1.5} />,
  <Network key="b" className="w-7 h-7" strokeWidth={1.5} />,
  <LayoutDashboard key="c" className="w-7 h-7" strokeWidth={1.5} />,
];

export default function VaceiWhiteSpotlightSection() {
  const { t } = useTranslation("home");

  const pillars = useMemo(() => {
    const raw = t("homeSpotlight.pillars", { returnObjects: true }) as
      | { title: string; desc: string }[]
      | string;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  return (
    <section
      id="vacei-spotlight"
      className="relative w-full py-20 sm:py-24 bg-[#FAFBFF] overflow-hidden rounded-[48px] border border-slate-100/80"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[min(720px,90vw)] h-[min(480px,50vh)] bg-blue-400/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[min(560px,80vw)] h-[min(400px,45vh)] bg-primary-blue/5 rounded-full blur-[90px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(#3b49e6 0.5px, transparent 0.5px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-5">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            {t("homeSpotlight.badge")}
          </motion.span>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="flex justify-center"
          >
            <SectionTitleHero
              variant="light"
              className="items-center text-center"
              line1={t("homeSpotlight.titleLine1")}
              highlight={t("homeSpotlight.titleHighlight")}
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 font-medium leading-relaxed"
          >
            {t("homeSpotlight.body")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.08 * index, duration: 0.5 }}
              className={cn(
                "group relative rounded-[2rem] border border-slate-200/90 bg-white p-8 shadow-sm shadow-slate-200/40",
                "hover:border-primary-blue/25 hover:shadow-lg hover:shadow-primary-blue/5 transition-all duration-500"
              )}
            >
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-primary-blue border border-blue-100 group-hover:bg-primary-blue group-hover:text-white group-hover:border-primary-blue transition-colors duration-500">
                {pillarIcons[index] ?? pillarIcons[0]}
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-3 group-hover:text-primary-blue transition-colors">
                {pillar.title}
              </h3>
              <p className="text-slate-600 font-medium leading-relaxed text-[15px]">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
