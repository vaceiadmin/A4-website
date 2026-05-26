"use client";

import React, { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import LocalizedLink from "@/components/common/LocalizedLink";
import AuditPlatformBeam from "./AuditPlatformBeam";
import GetInstantQuoteButton from "@/components/common/GetInstantQuoteButton";
import { usePerformance } from "@/contexts/ReduceMotionContext";
import { cn } from "@/lib/utils";
import { SectionTitleHero } from "@/components/HomePage/SectionTitleHero";
import {
  CheckCircle2,
  Workflow,
  FileCheck,
  Layers,
  ShieldAlert,
  ArrowUpRight
} from "lucide-react";

const principleIcons = [
  <Workflow key="w" className="w-5 h-5" />,
  <FileCheck key="f" className="w-5 h-5" />,
  <Layers key="l" className="w-5 h-5" />,
  <ShieldAlert key="s" className="w-5 h-5" />,
];
const principleColors = [
  "bg-blue-500/10 text-blue-600",
  "bg-primary-blue/10 text-primary-blue",
  "bg-cyan-500/10 text-cyan-600",
  "bg-sky-500/10 text-sky-600",
];

export default function AuditPlatform() {
  const { t } = useTranslation("home");
  const { reduceMotion } = usePerformance();
  const containerRef = useRef(null);

  const principles = useMemo(() => {
    const raw = t("auditPlatform.principles", { returnObjects: true }) as
      | { title: string; desc: string }[]
      | string;
    const list = Array.isArray(raw) ? raw : [];
    return list.map((p, index) => ({
      title: p.title,
      desc: p.desc,
      icon: principleIcons[index],
      color: principleColors[index] ?? principleColors[0],
    }));
  }, [t]);

  return (
    <div className="relative w-full">
      {/* White background block to connect seamlessly with the above white marquee */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white" />
      
      <section
        ref={containerRef}
        className="relative py-16 sm:py-24 overflow-hidden bg-[#FAFBFF] rounded-[48px]"
      >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-30" />
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-[10%] -right-[5%] w-[35%] h-[40%] bg-blue-50 rounded-full blur-[100px] opacity-60" />

        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(#3b49e6 0.5px, transparent 0.5px)`,
          backgroundSize: '24px 24px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

          {/* Left Content Side */}
          <div className="w-full lg:w-1/2 flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6"
            >
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700">{t("auditPlatform.badge")}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <SectionTitleHero
                variant="light"
                line1={t("auditPlatform.titleLine1")}
                highlight={t("auditPlatform.titleHighlight")}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-600 leading-relaxed max-w-xl mb-12 whitespace-pre-line"
            >
              {t("auditPlatform.body")}
            </motion.p>

            {/* Principles Staggered Reveal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 w-full">
              {principles.map((principle, index) => (
                <motion.div
                  key={`${principle.title}-${index}`}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.1 * index + 0.2,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  whileHover={!reduceMotion ? { 
                    y: -8,
                    scale: 1.02,
                    borderColor: "rgba(59, 130, 246, 0.4)",
                    boxShadow: "0 20px 40px -15px rgba(59, 130, 246, 0.15)"
                  } : {}}
                  className="group flex flex-col gap-4 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm transition-all duration-500 will-change-transform"
                >
                  <motion.div 
                    className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-1 transition-colors duration-500", principle.color)}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {principle.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {principle.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-normal">
                      {principle.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {(t("auditPlatform.quoteLine1").trim() || t("auditPlatform.quoteLine2").trim()) ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mb-10 pl-4 border-l-2 border-primary-blue/30"
              >
                <p className="text-base text-slate-500 italic font-medium leading-relaxed">
                  {t("auditPlatform.quoteLine1")}
                  {t("auditPlatform.quoteLine2").trim() ? (
                    <>
                      {" "}
                      <br className="hidden sm:block" />
                      {t("auditPlatform.quoteLine2")}
                    </>
                  ) : null}
                </p>
              </motion.div>
            ) : null}

            {/* CTA's */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-5 w-full sm:w-auto"
            >
              <GetInstantQuoteButton className="h-[56px] px-8 text-base shadow-xl shadow-blue-600/10 hover:shadow-blue-600/25 transition-shadow duration-500" />

              <LocalizedLink
                href="/portal/client-portal"
                className="group flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-3 text-base font-bold text-slate-900 shadow-sm transition-all duration-500 hover:border-blue-400 hover:text-blue-600 hover:shadow-md h-[56px]"
              >
                <span>{t("auditPlatform.clientPortalCta")}</span>
                <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </LocalizedLink>
            </motion.div>
          </div>

          {/* Right Visual Side - Beam Component */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-square lg:aspect-[4/4] rounded-[40px] bg-white border border-slate-100 shadow-[0_40px_100px_-20px_rgba(59,130,246,0.15)] flex items-center justify-center overflow-hidden"
            >
              {/* Internal Beams Container */}
              <div className="absolute inset-0 z-0 opacity-[0.4] bg-gradient-to-br from-blue-50/20 via-transparent to-blue-100/20" />
              <AuditPlatformBeam className="w-full h-full relative z-10" />

              {/* Ambient decoration — tucked right on mobile to clear diagram nodes */}
              <div className="pointer-events-none absolute bottom-6 right-1.5 z-20 flex max-w-[calc(100%-0.75rem)] items-center gap-2 rounded-2xl border border-blue-100 bg-white/90 p-3 shadow-lg backdrop-blur-md animate-bounce-subtle sm:bottom-8 sm:right-3 sm:gap-3 sm:p-4 lg:bottom-10 lg:right-10">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 sm:h-8 sm:w-8">
                  <CheckCircle2 className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
                </div>
                <span className="text-[10px] font-bold leading-tight text-slate-800 sm:text-xs">
                  {t("auditPlatform.complianceVerified")}
                </span>
              </div>
            </motion.div>

            {/* Floating geometric detail */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 w-24 h-24 border border-blue-200/50 rounded-full border-dashed"
            />
          </div>
        </div>
      </div>

      {/* Bottom Transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>
    </div>
  );
}
