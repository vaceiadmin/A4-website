"use client";

import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { UserCheck, ShieldCheck, LayoutDashboard, Eye } from "lucide-react";
import { AnimatedBeam } from "@/components/ui/animated-beam";

const CoreStatement = ({ isDark = true }: { isDark?: boolean }) => {
  const { t } = useTranslation("home");
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const f1Ref = useRef<HTMLDivElement>(null);
  const f2Ref = useRef<HTMLDivElement>(null);
  const f3Ref = useRef<HTMLDivElement>(null);
  const f4Ref = useRef<HTMLDivElement>(null);

  const features = [
    { ref: f1Ref, icon: <UserCheck className="w-5 h-5 md:w-6 md:h-6" />, label: t("coreStatement.bullets.0"), delay: 0 },
    { ref: f2Ref, icon: <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />, label: t("coreStatement.bullets.1"), delay: 0.5 },
    { ref: f3Ref, icon: <LayoutDashboard className="w-5 h-5 md:w-6 md:h-6" />, label: t("coreStatement.bullets.2"), delay: 1 },
    { ref: f4Ref, icon: <Eye className="w-5 h-5 md:w-6 md:h-6" />, label: t("coreStatement.bullets.3"), delay: 1.5 },
  ];

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative overflow-hidden py-16 sm:py-32 mb-12 sm:mb-20",
        isDark && "mx-4 sm:mx-6 lg:mx-8",
        isDark ? "bg-[#05050A] text-white rounded-[48px] shadow-2xl" : "bg-white text-slate-900 rounded-[48px] border border-slate-100 shadow-xl"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 lg:gap-20 items-center">

          {/* Left: Massive Headline */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-center lg:justify-start">
              <div className={cn(
                "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border",
                isDark ? "bg-primary-blue/10 border-primary-blue/20 text-primary-blue" : "bg-blue-50 border-blue-100 text-blue-600"
              )}>
                Our Core Promise
              </div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] lg:leading-[1.05] max-w-xl mx-auto lg:mx-0">
                {t("coreStatement.text").split(" — ")[0]} — <br />
                <span className="font-bodoni italic text-blue-600">
                  {t("coreStatement.text").split(" — ")[1]}
                </span>
              </h2>
            </div>
            <p className={cn(
              "text-base sm:text-lg lg:text-xl font-medium leading-relaxed max-w-xl mx-auto lg:mx-0",
              isDark ? "text-slate-400" : "text-slate-600"
            )}>
              One coordinated system that eliminates the complexity of multiple providers.
            </p>
          </div>

          {/* Right: Mobile / tablet — 2×2 grid + hub (no beams) */}
          <div className="relative lg:hidden mt-2 flex w-full flex-col items-center py-4 sm:mt-4">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-blue/10 blur-[80px] sm:h-80 sm:w-80"
              aria-hidden
            />
            <div
              className={cn(
                "z-20 flex h-[4.5rem] w-[4.5rem] sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-3xl border shadow-3xl p-3 sm:p-4 transition-all duration-700 bg-white mb-6 sm:mb-8",
                isDark ? "border-white/20" : "border-slate-200"
              )}
            >
              <img
                src="/assets/images/imgi_1_Logo-2.0 8.png"
                alt="VACEI Hub"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="relative z-10 grid w-full max-w-lg grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8 px-1 sm:px-2">
              {features.map((feat, i) => (
                <div
                  key={`m-${i}`}
                  className="group z-20 flex flex-col items-center gap-2.5 sm:gap-3"
                >
                  <div className={cn(
                    "w-[4.5rem] h-[4.5rem] sm:w-20 sm:h-20 rounded-[1.35rem] sm:rounded-[2rem] flex items-center justify-center border transition-all duration-700 shadow-xl sm:shadow-2xl",
                    isDark ? "bg-[#0A0A0F] border-white/10 group-active:border-primary-blue" : "bg-white border-slate-200 group-active:border-blue-500"
                  )}>
                    <div className={cn(
                      "transition-all duration-700",
                      isDark ? "text-primary-blue" : "text-blue-600"
                    )}>
                      {feat.icon}
                    </div>
                  </div>
                  <span className={cn(
                    "max-w-[10rem] px-0.5 text-center text-[11px] font-black uppercase leading-snug tracking-[0.12em] sm:max-w-[8rem] sm:text-[10px] sm:tracking-[0.2em]",
                    isDark ? "text-slate-400" : "text-slate-500"
                  )}>
                    {feat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Desktop — diamond hub + beams (unchanged at lg+) */}
          <div className="hidden lg:flex lg:col-span-6 relative h-[500px] w-full items-center justify-center pointer-events-none sm:pointer-events-auto">

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-blue/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="flex flex-col items-center justify-center gap-20 p-4 w-full">
              {/* Central Hub */}
              <div
                ref={hubRef}
                className={cn(
                  "z-20 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-3xl border shadow-3xl p-4 transition-all duration-700 bg-white",
                  isDark ? "border-white/20" : "border-slate-200"
                )}
              >
                <img
                  src="/assets/images/imgi_1_Logo-2.0 8.png"
                  alt="VACEI Hub"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Wings */}
              <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 relative">
                {features.map((feat, i) => (
                  <div
                    key={i}
                    ref={feat.ref}
                    className={cn(
                      "group z-20 flex flex-col items-center gap-3 transition-all duration-500 hover:scale-110",
                      i === 0 || i === 3 ? "translate-y-4" : "-translate-y-4"
                    )}
                  >
                    <div className={cn(
                      "w-16 h-16 sm:w-20 sm:h-20 rounded-[2rem] flex items-center justify-center border transition-all duration-700 shadow-2xl",
                      isDark ? "bg-[#0A0A0F] border-white/10 group-hover:border-primary-blue" : "bg-white border-slate-200 group-hover:border-blue-500"
                    )}>
                      <div className={cn(
                        "transition-all duration-700 group-hover:scale-120",
                        isDark ? "text-primary-blue" : "text-blue-600"
                      )}>
                        {feat.icon}
                      </div>
                    </div>
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-[0.2em] max-w-[80px] text-center leading-tight mx-auto",
                      isDark ? "text-slate-400 group-hover:text-white" : "text-slate-500 group-hover:text-slate-900"
                    )}>
                      {feat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Animated Beams */}
            {features.map((feat, i) => (
              <AnimatedBeam
                key={i}
                containerRef={containerRef}
                fromRef={hubRef}
                toRef={feat.ref}
                duration={3}
                delay={feat.delay}
                gradientStartColor="#2563eb"
                gradientStopColor="#60a5fa"
                pathWidth={2}
                pathOpacity={0.15}
                curvature={i < 2 ? -40 : 40}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default CoreStatement;
