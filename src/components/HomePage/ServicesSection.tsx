"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import LocalizedLink from "@/components/common/LocalizedLink";
import { servicesData } from "@/data/servicesData";
import { useIsSafari } from "@/hooks/use-safari";
import { usePerformance } from "@/contexts/ReduceMotionContext";
import { cn } from "@/lib/utils";
import { SectionTitleHero } from "@/components/HomePage/SectionTitleHero";

interface BaseCard {
    id: string | number;
    title: string;
    subtitle: string;
    link: string;
    category: string;
    badge?: string;
    featureTitles?: string[];
    image?: string;
    hoverImage?: string;
}

const ServicesSection = () => {
    const { t } = useTranslation("home");
    const [activeTab, setActiveTab] = useState<"services" | "products">("services");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState(3);
    const isSafari = useIsSafari();
    const { isIPhone, isLowPerformance } = usePerformance();

    const serviceTitleMap = useMemo(() => {
        const raw = t("servicesSection.serviceTitles", { returnObjects: true }) as Record<string, string>;
        return raw && typeof raw === "object" ? raw : {};
    }, [t]);

    const serviceSubtitleMap = useMemo(() => {
        const raw = t("servicesSection.serviceSubtitles", { returnObjects: true }) as Record<string, string>;
        return raw && typeof raw === "object" ? raw : {};
    }, [t]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setVisibleItems(1);
            else if (window.innerWidth < 1280) setVisibleItems(2);
            else setVisibleItems(3);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const services: BaseCard[] = servicesData.map((service) => ({
        id: service.id,
        title: serviceTitleMap[service.id] || service.title,
        subtitle: serviceSubtitleMap[service.id] || t("servicesSection.defaultSubtitle"),
        link: `/services/${service.slug}`,
        category: t("servicesSection.categoryService"),
        featureTitles: service.featuresSection?.features.slice(0, 3).map((f) => f.title) ?? [],
    }));

    const products: BaseCard[] = useMemo(() => {
        const copy = t("servicesSection.products", { returnObjects: true }) as
            | { title: string; subtitle: string; badge?: string }[]
            | string;
        const rows = Array.isArray(copy) ? copy : [];
        const meta = [
            { id: 1, image: "/assets/images/Pyramid 2.png", hoverImage: "/assets/images/portal.png", link: "/portal/client-portal" },
            { id: 2, image: "/assets/images/Thorus Knot.png", hoverImage: "/assets/images/Audit 1.png", link: "/portal/audit-portal" },
            { id: 3, image: "/assets/images/Cube 1.png", hoverImage: "/assets/images/Accounting 1.png", link: "/portal/accounting-portal" },
        ];
        return meta.map((m, i) => ({
            id: m.id,
            title: rows[i]?.title ?? "",
            subtitle: rows[i]?.subtitle ?? "",
            image: m.image,
            hoverImage: m.hoverImage,
            link: m.link,
            category: t("servicesSection.categoryPlatform"),
            badge: rows[i]?.badge,
        }));
    }, [t]);

    const activeData = activeTab === "products" ? products : services;

    const nextSlide = () => {
        if (activeData.length <= visibleItems) return;
        setCurrentIndex((prev) => (prev + 1) % activeData.length);
    };

    const prevSlide = () => {
        if (activeData.length <= visibleItems) return;
        setCurrentIndex((prev) => (prev - 1 + activeData.length) % activeData.length);
    };

    useEffect(() => {
        if (activeData.length <= visibleItems) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % activeData.length);
        }, 4500);
        return () => clearInterval(interval);
    }, [activeTab, activeData.length, visibleItems]);

    const displayItems = [];
    if (activeData.length <= visibleItems) {
        displayItems.push(...activeData);
    } else {
        for (let i = 0; i < visibleItems; i++) {
            displayItems.push(activeData[(currentIndex + i) % activeData.length]);
        }
    }

    return (
        <section id="services" className="w-full bg-[#F8FAFC] py-24 sm:py-32 relative overflow-hidden rounded-[48px]">
            {/* Abstract Background Decoration */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-20 gap-10">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-black tracking-widest text-blue-600 uppercase mb-6">
                            {t("servicesSection.badge")}
                        </div>
                        <SectionTitleHero
                            variant="light"
                            className="mb-6"
                            line1={t("servicesSection.titleLine1")}
                            highlight={t("servicesSection.titleHighlight")}
                        />
                        <p className="text-lg text-slate-500 font-medium leading-relaxed">
                            {t("servicesSection.subtitle")}
                        </p>
                    </div>

                    {/* Modern Tabs */}
                    <div className="flex p-1 bg-slate-50 border border-slate-100 rounded-2xl">
                        {(["services", "products"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => { setActiveTab(tab); setCurrentIndex(0); }}
                                className={cn(
                                    "relative px-8 py-3 rounded-xl text-sm font-black tracking-wider transition-all duration-300",
                                    activeTab === tab ? "text-white bg-blue-600 shadow-[0_5px_15px_rgba(37,99,235,0.2)]" : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                <span className="relative z-10 uppercase">{tab === "services" ? t("servicesSection.tabServices") : t("servicesSection.tabProducts")}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Carousel Content */}
                <div className="relative">
                    <div className="flex gap-6 lg:gap-8 justify-center min-h-[540px]">
                        {displayItems.map((item, idx) => {
                            return (
                                <div
                                    key={`${item.id}-${activeTab}-${idx}`}
                                    className="w-full max-w-[380px] group"
                                >
                                    <div className="relative shadow-lg h-[560px] rounded-[3rem] bg-white border border-slate-200/60 overflow-hidden transition-all duration-700 hover:border-blue-500/30 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] group-hover:-translate-y-3">
                                        {/* Header area with subtle glassmorphism */}
                                        <div className="h-[52%] relative  flex items-center justify-center p-8 bg-slate-50/30 border-b border-slate-100">
                                            <div className="absolute inset-0 bg-blue-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                            {activeTab === "services" ? (
                                                <div className="flex flex-wrap justify-center gap-3 relative z-10">
                                                    {item.featureTitles?.map((f, i) => (
                                                        <div key={i} className="px-4 py-2 rounded-xl bg-white border border-slate-100 text-[11px] font-bold text-slate-600 shadow-sm">
                                                            {f}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="relative w-44 h-44">
                                                    {item.image && (
                                                        <Image src={item.image} alt={item.title} fill className="object-contain drop-shadow-[0_20px_40px_rgba(37,99,235,0.1)]" />
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-white">
                                            {item.badge && (
                                                <span className="inline-block px-2 py-1 rounded-md bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4 border border-blue-100">
                                                    {item.badge}
                                                </span>
                                            )}
                                            <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 line-clamp-2">
                                                {item.subtitle}
                                            </p>


                                            <LocalizedLink
                                                href={item.link}
                                                className="group/btn inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-blue-600 transition-all duration-500"
                                            >
                                                {t("servicesSection.explorePhase")}
                                                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:text-white group-hover:scale-110 group-hover:rotate-6 shadow-sm transition-all duration-500">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7m7-7H3" /></svg>
                                                </div>
                                            </LocalizedLink>
                                        </div>

                                        {/* Hover Product Preview */}
                                        {activeTab === "products" && item.hoverImage && (
                                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none group-hover:pointer-events-auto">
                                                <div className="absolute inset-x-0 top-8 bottom-[35%] opacity-100">
                                                    <Image src={item.hoverImage} alt={item.title} fill className="object-contain object-top px-6" />
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                                    <h3 className="text-3xl font-black text-slate-900 mb-2">{item.title}</h3>
                                                    <p className="text-slate-600 font-medium mb-8">{item.subtitle}</p>
                                                    <LocalizedLink
                                                        href={item.link}
                                                        className="w-full py-5 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-widest text-xs text-center hover:bg-blue-500 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)]"
                                                    >
                                                        {t("servicesSection.launchDashboard")}
                                                    </LocalizedLink>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Navigation Controls */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-[-20px] lg:left-[-60px] z-20">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white border border-slate-100 text-slate-400 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all shadow-xl backdrop-blur-md"
                        >
                            <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-[-20px] lg:right-[-60px] z-20">
                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white border border-slate-100 text-slate-400 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all shadow-xl backdrop-blur-md"
                        >
                            <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
