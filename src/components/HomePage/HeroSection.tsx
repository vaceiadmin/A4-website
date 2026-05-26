"use client";

import React, { useState } from "react";
import LocalizedLink from "@/components/common/LocalizedLink";
import {
  ArrowRight,
  Building2,
  Check,
  FileText,
  Search,
  UserCircle,
} from "lucide-react";
import GradientContainer from "@/components/common/GradientContainer";
import { SectionTitleHero } from "@/components/HomePage/SectionTitleHero";
import { useTranslation } from "react-i18next";
import { useLazyMedia } from "@/hooks/use-lazy-media";
import { cn } from "@/lib/utils";

const HeroSection = ({ isDark = false }: { isDark?: boolean }) => {
  const { t } = useTranslation("home");
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const { ref: lazyMediaRef, shouldLoad: loadHeroVideo } = useLazyMedia();

  const serviceStripItems = [
    { key: "bookkeeping" as const, Icon: FileText },
    { key: "audit" as const, Icon: Search },
    { key: "payroll" as const, Icon: UserCircle },
    { key: "incorporation" as const, Icon: Building2 },
  ];

  const heroShellClass = cn(
    "relative flex min-h-0 flex-col justify-center pt-24 pb-10 sm:min-h-[88vh] sm:pt-28 sm:pb-16 lg:min-h-screen overflow-hidden"
  );

  const heroBodyClass = cn(
    "max-w-xl text-balance leading-relaxed font-medium opacity-70",
    isDark
      ? "text-base sm:text-lg text-slate-300"
      : "text-base sm:text-lg lg:text-xl text-slate-600"
  );

  const heroMain = (
    <>
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:px-6 sm:gap-10 lg:flex-row lg:items-center lg:gap-8 lg:px-8">
        {/* Left Content Area */}
        <div className="relative z-20 flex w-full flex-col items-start text-left lg:w-[48%]">
          <div className="relative mb-4 sm:mb-6">
            <SectionTitleHero
              as="h1"
              variant={isDark ? "dark" : "light"}
              line1={t("hero.titleLine1")}
              line2={t("hero.titleLine2")}
              highlight={t("hero.titleHighlight")}
              className="items-start gap-2 [&>span:first-child]:font-sans [&>span:first-child]:font-extrabold"
            />
          </div>

          <div className="mt-4 max-w-xl space-y-3 sm:mt-6 sm:space-y-4">
            <p className={heroBodyClass}>{t("hero.body")}</p>
            {String(t("hero.body2")).trim() ? (
              <p className={heroBodyClass}>{t("hero.body2")}</p>
            ) : null}
          </div>

          <div className="mb-6 mt-8 flex w-full flex-col gap-3 sm:mb-8 sm:mt-10 sm:flex-row sm:gap-4 sm:w-auto">
            <LocalizedLink
              href="/quote"
              className={cn(
                "group flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-[15px] font-bold transition-all hover:scale-105 active:scale-95 sm:w-auto sm:px-10 sm:py-4",
                isDark
                  ? "bg-linear-to-b from-white to-gray-200 text-slate-900 shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
                  : "bg-linear-to-b from-zinc-600 to-zinc-700 text-white shadow-[0_12px_28px_-6px_rgba(37,99,235,0.45)] ring-1 ring-zinc-500/30 hover:from-zinc-500 hover:to-zinc-600"
              )}
            >
              <span>{t("hero.quoteCta")}</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </LocalizedLink>

            <LocalizedLink
              href="/contact"
              className={cn(
                "group flex w-full items-center justify-center gap-2 rounded-full border px-8 py-3.5 text-[15px] font-medium transition-all hover:scale-105 active:scale-95 sm:w-auto sm:px-10 sm:py-4",
                isDark
                  ? "border-gray-700 bg-[#09090B]/50 text-white hover:bg-white/5 hover:border-gray-500"
                  : "border-zinc-200/80 bg-white text-zinc-700 shadow-sm shadow-zinc-500/10 hover:bg-zinc-50/90 hover:border-zinc-300"
              )}
            >
              <span>{t("hero.demoCta")}</span>
              <ArrowRight className="w-4 h-4 ml-1 text-primary-blue transition-transform group-hover:translate-x-1" />
            </LocalizedLink>
          </div>

          <div className="hide-scrollbar flex w-full flex-row flex-wrap items-center gap-x-5 gap-y-3 overflow-x-auto pb-1 sm:gap-x-10 sm:pb-0">
            {(["benefit1", "benefit2", "benefit3"] as const).map((key) => (
              <div key={key} className="flex shrink-0 items-center gap-2.5">
                <div
                  className={cn(
                    "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border",
                    isDark
                      ? "border-white/15 bg-white/6"
                      : "border-slate-200/90 bg-white"
                  )}
                >
                  <Check
                    className={cn(
                      "h-2.5 w-2.5",
                      isDark ? "text-zinc-400" : "text-primary-blue"
                    )}
                    strokeWidth={2.5}
                    aria-hidden
                  />
                </div>
                <span
                  className={cn(
                    "text-[14px] font-medium leading-none",
                    isDark ? "text-gray-400" : "text-slate-600"
                  )}
                >
                  {t(`hero.${key}`)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Visual Area */}
        <div className="relative mt-6 flex w-full max-w-lg justify-center self-center sm:mt-10 lg:mt-0 lg:w-[50%] lg:max-w-none">
          <div className="relative mx-auto w-full max-w-[min(100%,520px)] lg:max-w-[650px]">

            {/* Main Browser Window Wrapper */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl z-10 transition-transform duration-700">

              {/* Browser Header */}
              {/* <div className="h-10 w-full bg-[#181926] border-b border-white/5 flex items-center px-4 justify-between relative">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 bg-black/20 px-6 py-1 rounded-md flex items-center justify-center">
                    <span className="text-[10px] text-white/40 tracking-widest font-mono">A4.com</span>
                  </div>
                </div> */}

              {/* Video — MP4 loads near viewport. Do not use MP4 as <img> or poster; browsers require image formats there. */}
              <div
                ref={lazyMediaRef}
                className="relative w-full aspect-square overflow-hidden bg-slate-100"
              >
                <div
                  aria-hidden
                  className={cn(
                    "absolute inset-0 bg-linear-to-br from-slate-100 via-slate-50 to-zinc-50 transition-opacity duration-300",
                    isVideoReady && !hasVideoError ? "opacity-0 pointer-events-none" : "opacity-100"
                  )}
                />
                {loadHeroVideo && (
                  <video
                    className="relative z-1 h-full w-full object-cover grayscale brightness-[0.6] contrast-125"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    onPlaying={() => setIsVideoReady(true)}
                    onError={() => setHasVideoError(true)}
                    aria-label="A4 platform preview video"
                  >
                    <source src="/assets/videos/banner-gip-2-new.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>

            {/* Glowing circle floating element top-right outside */}
            {/* <div className="absolute -top-4 -right-4 w-14 h-14 bg-[#181926] rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl z-20 hidden sm:flex">
                <div className="w-6 h-6 rounded-full border-2 border-primary-blue border-r-transparent animate-spin" />
              </div> */}
          </div>
        </div>
      </div>

      {/* Trust strip: in-flow on small screens to avoid overlap with floating UI; absolute on md+ */}
      {/* {t("hero.trustStrip").trim() ? (
          <div className="relative z-30 mx-auto mt-8 w-full max-w-4xl px-4 sm:mt-10 md:absolute md:-bottom-20 md:left-1/2 md:mt-0 md:-translate-x-1/2 lg:-bottom-24">
            <div className="flex flex-col items-stretch justify-center gap-3 rounded-2xl border border-white/20 bg-white/95 px-5 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:rounded-full sm:px-8 md:px-10">
              {trustPillLabels.map((label, i) => (
                <React.Fragment key={`${label}-${i}`}>
                  {i > 0 ? <div className="hidden h-4 w-px bg-slate-200 sm:block" /> : null}
                  <div className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-zinc-600 flex items-center justify-center text-white text-[10px] font-black group-hover:scale-110 transition-transform">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">{label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : null} */}
    </>
  );

  return (
    <section className="w-full relative">
      {isDark ? (
        <GradientContainer
          backgroundColor="bg-black"
          roundedClassName="rounded-none"
          showNoise={false}
          className={heroShellClass}
          radialOpacity={0.38}
          leftPositionClass="-top-[5%] -left-[5%]"
          rightPositionClass="-bottom-[5%] -right-[5%]"
        >
          {heroMain}
        </GradientContainer>
      ) : (
        <div
          className={cn(
            heroShellClass,
            "border-b border-slate-100 bg-[#FAFBFF] shadow-none sm:shadow-none"
          )}
        >
          {/* Left-side blue wash (moved from right) */}
          {/* Left-side blue wash (moved from right) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[42%] bg-linear-to-r from-zinc-500/10 via-zinc-400/5 to-transparent" />
          <div className="pointer-events-none absolute left-[-8%] top-[-10%] h-[420px] w-[420px] rounded-full bg-zinc-500/10 blur-[80px]" />
          <div className="pointer-events-none absolute left-[5%] top-[15%] h-[280px] w-[280px] rounded-full bg-zinc-400/10 blur-[90px]" />

          <div className="pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-zinc-400/5 opacity-20 blur-[150px]" />
          <div className="pointer-events-none absolute -bottom-32 -right-[10%] h-[460px] w-[460px] rounded-full bg-zinc-400/8 opacity-25 blur-[130px]" />
          {heroMain}
        </div>
      )}

      {/* Marquee keyframes (kept for reference; strip below is static)
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}} />
      */}

      {/* Bottom Services Strip (Marquee) — replaced by static four-column bar
      <div className="relative mt-0 w-full overflow-hidden rounded-b-4xl border-b border-gray-100 bg-white pt-6 sm:pt-8  pb-6 sm:pb-8">
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-x-4 sm:gap-x-6 px-2 sm:px-3">
              {(t("hero.marquee", { returnObjects: true }) as string[] || []).map((service, index) => (
                <div key={index} className="flex items-center gap-2.5 sm:gap-3 px-5 sm:px-7 py-2.5 sm:py-3 bg-slate-50 border border-slate-200/60 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-blue/5 hover:border-primary-blue/30 hover:bg-white cursor-default group">
                  <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-primary-blue shadow-[0_0_8px_rgba(37,99,235,0.7)] shrink-0 transition-transform group-hover:scale-125"></div>
                  <span className="text-slate-700 font-bold text-[13px] sm:text-[14px] uppercase tracking-wider whitespace-nowrap">{service}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      */}

      <div
        className={cn(
          "relative mt-0 w-full overflow-hidden border-b border-t",
          isDark
            ? "border-white/10 border-t-white/10 bg-black"
            : "border-slate-100 border-t-slate-100 bg-[#FAFBFF]"
        )}
      >
        {isDark ? (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-[45%] bg-linear-to-r from-zinc-500/12 via-zinc-500/5 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[45%] bg-linear-to-l from-zinc-500/12 via-zinc-500/5 to-transparent" />
            <div className="pointer-events-none absolute right-[-15%] top-1/2 h-[140%] max-h-[120px] w-[min(55%,280px)] -translate-y-1/2 rounded-full bg-zinc-500/15 blur-[48px]" />
            <div className="pointer-events-none absolute left-[-10%] bottom-0 h-[90px] w-[200px] rounded-full bg-zinc-600/10 blur-2xl" />
            <div className="pointer-events-none absolute right-[-10%] bottom-0 h-[90px] w-[200px] rounded-full bg-zinc-600/10 blur-2xl" />
          </>
        ) : (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-[40%] bg-linear-to-r from-zinc-500/10 via-zinc-400/5 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[40%] bg-linear-to-l from-zinc-500/10 via-zinc-400/5 to-transparent" />
            <div className="pointer-events-none absolute left-[-6%] top-[-120%] h-[200px] w-[240px] rounded-full bg-zinc-500/10 blur-3xl" />
            <div className="pointer-events-none absolute right-[-6%] top-[-120%] h-[200px] w-[240px] rounded-full bg-zinc-500/10 blur-3xl" />
            <div className="pointer-events-none absolute left-[8%] top-[-80%] h-[140px] w-[180px] rounded-full bg-zinc-400/10 blur-[56px]" />
            <div className="pointer-events-none absolute right-[8%] top-[-80%] h-[140px] w-[180px] rounded-full bg-zinc-400/10 blur-[56px]" />
            <div className="pointer-events-none absolute -bottom-16 left-[-8%] h-[120px] w-[min(55%,260px)] rounded-full bg-zinc-400/8 blur-[48px]" />
            <div className="pointer-events-none absolute -bottom-16 right-[-8%] h-[120px] w-[min(55%,260px)] rounded-full bg-zinc-400/8 blur-[48px]" />
          </>
        )}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl min-w-0">
          {serviceStripItems.map(({ key, Icon }, index) => (
            <div
              key={key}
              className={cn(
                "flex min-h-[72px] min-w-0 flex-1 items-center justify-center px-1.5 py-5 sm:min-h-[80px] sm:px-3 sm:py-6 md:px-5",
                index > 0 &&
                (isDark ? "border-l border-slate-800/90" : "border-l border-slate-200/90")
              )}
            >
              <div className="flex min-w-0 max-w-full items-center justify-center gap-2 sm:gap-2.5 md:gap-3">
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-[10px] border sm:size-10",
                    isDark
                      ? "border-zinc-500/35 bg-zinc-500/10"
                      : "border-zinc-200/90 bg-zinc-50"
                  )}
                >
                  <Icon
                    className={cn(
                      "size-[17px] sm:size-[18px]",
                      isDark ? "text-zinc-400" : "text-zinc-600"
                    )}
                    strokeWidth={2}
                    aria-hidden
                  />
                </div>
                <span
                  className={cn(
                    "min-w-0 max-w-[9.5rem] text-left text-[10px] font-bold uppercase leading-snug tracking-[0.06em] sm:max-w-none sm:text-[11px] md:text-xs lg:text-[13px]",
                    isDark ? "text-slate-100" : "text-slate-900"
                  )}
                >
                  {t(`hero.serviceStrip.${key}`)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
