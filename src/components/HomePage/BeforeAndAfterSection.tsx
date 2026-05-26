"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { SectionTitleHero } from "@/components/HomePage/SectionTitleHero";
import { useLazyMedia } from "@/hooks/use-lazy-media";
import { XCircle, CheckCircle2, PlayCircle, Check, X } from "lucide-react";

const HoverPlayGif = ({ src, alt, className, isDark = false, playDesktop, playMobile }: { src: string, alt: string, className?: string, isDark?: boolean, playDesktop: string, playMobile: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [firstFrameUrl, setFirstFrameUrl] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { ref: lazyRef, shouldLoad } = useLazyMedia();

  useEffect(() => {
    if (!shouldLoad) return;
    const img = document.createElement("img");
    img.src = src;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        try {
          setFirstFrameUrl(canvas.toDataURL("image/jpeg", 0.85));
        } catch (e) {
          console.error("Could not capture GIF frame", e);
        }
      }
    };
  }, [src, shouldLoad]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      ref={lazyRef}
      className={cn("relative w-full h-full cursor-pointer overflow-hidden group", className)}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={() => isMobile && setIsHovered((prev) => !prev)}
    >
      <div className={cn("absolute inset-0 z-0", isDark ? "bg-[#05050A]" : "bg-white")} />

      {/* The Active GIF */}
      <div className={cn("absolute inset-0 transition-opacity duration-500 z-10", isHovered ? "opacity-100" : "opacity-0")}>
        {isHovered && shouldLoad && (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain rounded-b-lg"
            unoptimized
            loading="lazy"
            decoding="async"
          />
        )}
      </div>

      {/* The Static Placeholder */}
      <div className={cn("absolute inset-0 transition-opacity duration-500 z-0", isHovered ? "opacity-0" : "opacity-100")}>
        {firstFrameUrl ? (
          <img src={firstFrameUrl} alt={alt} className="w-full h-full object-contain filter rounded-b-lg" />
        ) : (
          <div className="w-full h-full animate-pulse bg-slate-200/20" />
        )}

        {/* Play Overlay Indicator */}
        <div className={cn("absolute inset-0 flex items-center justify-center transition-all duration-500 z-20 pointer-events-none", !isMobile && "group-hover:opacity-0", isDark ? "bg-black/10" : "bg-white/10")}>
          <div className={cn("flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-xl shadow-2xl transition-transform duration-500 group-hover:scale-105 border", isDark ? "bg-black/60 border-white/10" : "bg-white/80 border-slate-200 shadow-xl shadow-black/5")}>
             <PlayCircle className={cn("w-5 h-5", isDark ? "text-white" : "text-blue-600")} />
             <span className={cn("text-[11px] font-bold uppercase tracking-widest", isDark ? "text-white" : "text-slate-800")}>
               {isMobile ? playMobile : playDesktop}
             </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const BeforeAndAfterSection = ({ isDark = false }: { isDark?: boolean }) => {
  const { t } = useTranslation('home');
  return (
    <section className={cn(
        "py-24 sm:py-32 relative overflow-hidden isolate z-0 mb-12 sm:mb-20 rounded-[48px]",
        isDark && "mx-4 sm:mx-6 lg:mx-8",
        isDark ? "bg-[#05050A] text-white shadow-2xl" : "bg-[#FAFBFF] text-slate-900 border border-slate-100 shadow-xl shadow-blue-500/5"
    )}>
      {/* Background Decor */}
      <div className={cn(
        "absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full blur-[120px] pointer-events-none -z-10",
        isDark ? "bg-blue-600/10" : "bg-blue-400/5"
      )} />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-7xl">
        <div className="text-center mb-16 lg:mb-24 max-w-3xl mx-auto space-y-6">
          <div className={cn(
            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border",
            isDark ? "bg-white/5 border-white/10" : "bg-blue-50 border-blue-100"
          )}>
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            <span className="text-[11px] font-black text-blue-500 uppercase tracking-widest">{t('beforeAfter.badge')}</span>
          </div>
          <SectionTitleHero
            variant={isDark ? "dark" : "light"}
            className="items-center text-center"
            line1={t("beforeAfter.titleLine1")}
            highlight={t("beforeAfter.titleHighlight")}
          />
          <p className={cn(
            "text-xl font-medium max-w-2xl mx-auto opacity-70",
            isDark ? "text-slate-400" : "text-slate-600"
          )}>
            {t('beforeAfter.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          
          {/* Card 1: Before (Light) */}
          <div className="group/card relative flex flex-col h-full">
            <div className={cn(
              "relative h-full flex flex-col rounded-[2.5rem] border overflow-hidden transition-all duration-500 opacity-80 hover:opacity-100",
              "bg-white border-slate-200 shadow-sm"
            )}>
              <div className={cn(
                "p-8 lg:p-10 border-b flex flex-col gap-6",
                "border-slate-200 bg-slate-50/70"
              )}>
                <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center border",
                      "bg-white text-slate-500 border-slate-200 shadow-sm"
                    )}>
                        <XCircle className="w-6 h-6" />
                    </div>
                    <h4 className={cn(
                      "text-2xl lg:text-3xl font-black tracking-tight",
                      "text-slate-700"
                    )}>{t('beforeAfter.beforeTitle')}</h4>
                </div>
                <div className="flex flex-col gap-3">
                    {(t('beforeAfter.beforeItems', { returnObjects: true }) as string[]).map((item, idx) => (
                      <div key={idx} className={cn("flex items-start gap-3 text-sm font-medium text-slate-600")}>
                        <div className={cn("flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 bg-slate-200 text-slate-500")}>
                           <X className="w-3 h-3" />
                        </div>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                </div>
              </div>

              <div className={cn(
                "p-6 sm:p-10 flex-1 flex flex-col justify-center items-center relative overflow-hidden",
                "bg-white"
              )}>
                <div className={cn(
                  "rounded-2xl overflow-hidden border w-full relative z-10 transition-transform duration-500 group-hover/card:scale-[1.02]",
                  "bg-white border-slate-200 shadow-sm"
                )}>
                  <div className={cn(
                    "h-8 border-b flex items-center px-4 gap-1.5",
                    "bg-slate-100 border-slate-200"
                  )}>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] opacity-30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] opacity-30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] opacity-30" />
                  </div>
                  <div className={cn("relative aspect-video p-1 bg-white")}>
                    <HoverPlayGif
                      src="/assets/videos/Before.gif"
                      alt={t('beforeAfter.beforeGifAlt')}
                      isDark={false}
                      playDesktop={t('beforeAfter.hoverPlayDesktop')}
                      playMobile={t('beforeAfter.hoverPlayMobile')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: After (Dark + highlighted) */}
          <div className="group/card relative flex flex-col h-full z-10">
            <div className={cn(
              "absolute -inset-2 rounded-[2.75rem] blur-[22px] opacity-25 group-hover/card:opacity-45 transition duration-700 pointer-events-none",
              "bg-primary-blue"
            )} />
            
            <div className={cn(
              "relative h-full flex flex-col rounded-[2.75rem] border overflow-hidden transition-all duration-700",
              "bg-[#05050A] border-blue-500/35 ring-1 ring-blue-500/15 shadow-[0_0_60px_rgba(37,99,235,0.18)]"
            )}>
              <div className={cn("absolute top-0 right-0 w-64 h-64 blur-[100px] pointer-events-none bg-blue-500/10")} />

              <div className={cn(
                "p-8 lg:p-10 border-b flex flex-col gap-6 backdrop-blur-md relative z-10 rounded-t-4xl",
                "border-white/10 bg-white/5"
              )}>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/40">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className={cn("text-2xl lg:text-3xl font-black tracking-tight text-white")}>{t('beforeAfter.afterTitle')}</h4>
                </div>
                <div className="flex flex-col gap-3">
                    {(t('beforeAfter.afterItems', { returnObjects: true }) as string[]).map((item, idx) => (
                      <div key={idx} className={cn("flex items-start gap-3 text-sm font-bold text-slate-200")}>
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mt-0.5">
                           <Check className="w-3 h-3" />
                        </div>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                </div>
              </div>

              <div className={cn(
                "p-6 sm:p-10 flex-1 flex flex-col justify-center items-center relative overflow-hidden",
                "bg-[#050505]"
              )}>
                <div className="absolute inset-0 bg-blue-500/5 blur-[50px] pointer-events-none" />
                <div className={cn(
                  "rounded-2xl overflow-hidden border shadow-2xl relative z-10 w-full transition-transform duration-500 group-hover/card:scale-[1.02]",
                  "bg-[#000] border-white/10"
                )}>
                  <div className={cn(
                    "h-8 border-b flex items-center px-4 gap-1.5",
                    "bg-[#111] border-white/5"
                  )}>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className={cn("relative aspect-video p-1 bg-black")}>
                    <HoverPlayGif
                      src="/assets/videos/After.gif"
                      alt={t('beforeAfter.afterGifAlt')}
                      isDark={true}
                      playDesktop={t('beforeAfter.hoverPlayDesktop')}
                      playMobile={t('beforeAfter.hoverPlayMobile')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        
        <div className="mt-20 text-center">
            <p className={cn(
                "text-2xl font-bodoni italic opacity-60",
                isDark ? "text-slate-300" : "text-slate-600"
            )}>
              {t('beforeAfter.footerLine')}
            </p>
        </div>
      </div>
    </section>
  );
};

export default BeforeAndAfterSection;
