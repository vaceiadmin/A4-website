"use client";

import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import OrbitingCircles from "@/components/ui/orbiting-circles";
import { usePerformance } from "@/contexts/ReduceMotionContext";
import { cn } from "@/lib/utils";
import { SectionTitleHero } from "@/components/HomePage/SectionTitleHero";

// Helper component for premium country markers
const CountryMarker = ({ code, className }: { code: string; className?: string }) => (
    <div className={cn(
        "relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1A1D2B] shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:scale-125 group/flag shrink-0",
        className
    )}>
        <img
            src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
            alt={code}
            className="w-full h-full object-cover grayscale-[0.2] group-hover/flag:grayscale-0"
        />
    </div>
);

const ActiveEUSection = () => {
    const { t } = useTranslation("home");
    const { isIPhone, isLowPerformance } = usePerformance();

    const chips = useMemo(
        () => (t("activeEU.chips", { returnObjects: true }) as string[]) ?? [],
        [t]
    );

    return (
        <section className="relative w-full py-24 bg-[#FAFBFF] overflow-hidden rounded-[48px]">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-400/15 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-blue-500/10 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">

                    {/* Left Side: Content (40%) */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-black uppercase tracking-[0.2em] w-fit">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            {t("activeEU.badge")}
                        </div>

                        <SectionTitleHero
                            variant="light"
                            line1={t("activeEU.titleLine1")}
                            highlight={t("activeEU.titleHighlight")}
                        />

                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl font-medium">
                            {t("activeEU.body")}
                        </p>

                        <div className="flex flex-wrap gap-6 mt-2">
                            {chips.map((item) => (
                                <div key={item} className="flex items-center gap-2 text-sm font-black text-slate-700">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="text-blue-600">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Orbiting Circles Visualization (60%) */}
                    <div className="lg:col-span-3 relative flex h-[700px] w-full flex-col items-center justify-center overflow-hidden">

                        {/* Central Business Hub Icon */}
                        <div className="relative z-20 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0_20px_50px_rgba(37,99,235,0.3)] border border-white/10 p-2 group transition-all duration-500 hover:rotate-12 translate-z-0">
                            <img 
                                src="/assets/images/imgi_1_Logo-2.0 8.png" 
                                alt={t("activeEU.hubAlt")} 
                                className="w-full h-full object-contain" 
                            />
                        </div>

                        {/* Orbiting Circles Layer 1 - Major Economies */}
                        <OrbitingCircles
                            radius={80}
                            duration={20}
                            iconSize={24}
                            className="border-slate-200/60 bg-transparent"
                        >
                            <CountryMarker code="DE" />
                            <CountryMarker code="FR" />
                            <CountryMarker code="IT" />
                            <CountryMarker code="ES" />
                        </OrbitingCircles>

                        {/* Orbiting Circles Layer 2 - Northern & Western Europe (Reverse) */}
                        <OrbitingCircles
                            radius={140}
                            duration={35}
                            reverse
                            iconSize={24}
                            className="border-slate-200/60 bg-transparent"
                        >
                            <CountryMarker code="NL" />
                            <CountryMarker code="BE" />
                            <CountryMarker code="AT" />
                            <CountryMarker code="SE" />
                            <CountryMarker code="IE" />
                            <CountryMarker code="PT" />
                        </OrbitingCircles>

                        {/* Orbiting Circles Layer 3 - Central & Southern Hubs */}
                        <OrbitingCircles
                            radius={200}
                            duration={50}
                            iconSize={20}
                            className="border-slate-200/60 bg-transparent"
                        >
                            <CountryMarker code="DK" />
                            <CountryMarker code="GR" />
                            <CountryMarker code="PL" />
                            <CountryMarker code="FI" />
                            <CountryMarker code="LU" />
                            <CountryMarker code="CZ" />
                            <CountryMarker code="HU" />
                            <CountryMarker code="MT" />
                        </OrbitingCircles>

                        {/* Orbiting Circles Layer 4 - Eastern & Baltic Regions (Reverse) */}
                        <OrbitingCircles
                            radius={260}
                            duration={65}
                            reverse
                            iconSize={20}
                            className="border-slate-200/60 bg-transparent"
                        >
                            <CountryMarker code="RO" />
                            <CountryMarker code="BG" />
                            <CountryMarker code="HR" />
                            <CountryMarker code="CY" />
                            <CountryMarker code="EE" />
                            <CountryMarker code="LV" />
                            <CountryMarker code="LT" />
                            <CountryMarker code="SK" />
                            <CountryMarker code="SI" />
                        </OrbitingCircles>

                    </div>

                </div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/80 to-transparent z-10 pointer-events-none" />
        </section>
    );
};

export default ActiveEUSection;
