"use client";

import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import OrbitingCircles from "@/components/ui/orbiting-circles";
import { cn } from "@/lib/utils";
import { Globe2 } from "lucide-react";

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

const GlobalDeliverySection = ({ isDark = false }: { isDark?: boolean }) => {
    const { t } = useTranslation("home");

    return (
        <section className={cn(
            "relative py-24 sm:py-32 overflow-hidden mb-12 sm:mb-20",
            isDark && "mx-4 sm:mx-6 lg:mx-8",
            isDark ? "bg-[#05050A] text-white rounded-[48px] shadow-2xl" : "bg-[#FAFBFF] text-slate-900 rounded-[48px] border border-slate-100 shadow-xl shadow-blue-500/5"
        )}>
            {/* Background Decorative Element */}
            <div className={cn(
                "absolute top-0 right-0 w-1/2 h-full blur-[120px] pointer-events-none",
                isDark ? "bg-blue-600/10" : "bg-blue-400/5"
            )} />
            <div className={cn(
                "absolute bottom-0 left-0 w-1/2 h-full blur-[120px] pointer-events-none",
                isDark ? "bg-blue-500/5" : "bg-blue-600/5"
            )} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24 items-center">

                    {/* Left Side: Content (40%) */}
                    <div className="lg:col-span-2 flex flex-col gap-10">
                        <div className="space-y-6">
                            <div className={cn(
                                "inline-flex items-center gap-3 px-5 py-2 rounded-full border text-[11px] font-black uppercase tracking-[0.3em] w-fit",
                                isDark ? "bg-white/5 border-white/10 text-primary-blue" : "bg-blue-50 border-blue-100 text-blue-600"
                            )}>
                                <Globe2 className="w-4 h-4" />
                                {t("globalDelivery.badge")}
                            </div>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]">
                                {t("globalDelivery.title").split(' — ')[0]} — <br />
                                <span className="font-bodoni italic text-blue-600">
                                    {t("globalDelivery.title").split(' — ')[1]}
                                </span>
                            </h2>

                            <p className={cn(
                                "text-xl leading-relaxed max-w-xl font-medium",
                                isDark ? "text-slate-400" : "text-slate-500"
                            )}>
                                {t("globalDelivery.body")}
                            </p>
                        </div>

                        <div className="space-y-5">
                            {(t("globalDelivery.bullets", { returnObjects: true }) as string[] || []).map((item) => (
                                <div key={item} className="flex items-center gap-4 text-lg font-black tracking-tight">
                                    <div className={cn(
                                        "w-8 h-8 rounded-xl flex items-center justify-center transition-all",
                                        isDark ? "bg-primary-blue/20 text-primary-blue" : "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                                    )}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M20 6L9 17l-5-5" /></svg>
                                    </div>
                                    {item}
                                </div>
                            ))}
                        </div>

                        <div className={cn(
                            "p-8 rounded-3xl border text-lg font-medium leading-relaxed",
                            isDark ? "bg-[#0A0B10] border-white/5 text-slate-300" : "bg-white border-slate-100 text-slate-600 shadow-xl shadow-blue-500/5"
                        )}>
                            {t("globalDelivery.footer")}
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
        </section>
    );
};

export default GlobalDeliverySection;
