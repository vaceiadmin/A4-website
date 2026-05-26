"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import CardSwap, { Card } from "@/components/ui/CardSwap";
import { SectionTitleHero } from "@/components/HomePage/SectionTitleHero";
import type { LucideIcon } from "lucide-react";
import {
  ShieldCheck,
  Zap,
  UserRound,
  LayoutDashboard,
  Search,
  Users,
  MessageSquare,
  Calendar,
  Clock,
  Trophy,
  CheckCircle2,
} from "lucide-react";

/** Same box + stroke so mixed Lucide glyphs (globe vs bolt, etc.) align visually. */
function WhatYouGetGlyph({
  icon: Icon,
  size,
}: {
  icon: LucideIcon;
  size: "sm" | "lg";
}) {
  const box =
    size === "sm"
      ? "h-[22px] w-[22px] sm:h-[26px] sm:w-[26px]"
      : "h-8 w-8";
  return (
    <Icon
      className={cn("shrink-0", box)}
      strokeWidth={2}
      aria-hidden
    />
  );
}

const cardSurfaceMobile = (isDark: boolean) =>
  cn(
    "rounded-[1.75rem] border transition-colors overflow-visible md:overflow-hidden",
    isDark
      ? "border-white/20 bg-gradient-to-b from-[#12141c] to-[#0a0c12] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.65)] ring-1 ring-white/10"
      : "border-slate-200/90 bg-gradient-to-b from-white to-slate-50 shadow-[0_16px_40px_-16px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/80"
  );

const WhatYouActuallyGet = ({ isDark = true }: { isDark?: boolean }) => {
  const { t } = useTranslation("home");
  const items = (t("whatYouGet.items", { returnObjects: true }) as string[]) || [];

  const cardIcons = [
    ShieldCheck,
    UserRound,
    Zap,
    LayoutDashboard,
    Users,
    MessageSquare,
    Calendar,
    Clock,
    Search,
    Trophy,
    CheckCircle2,
  ];

  return (
    <section
      className={cn(
        "relative mb-12 overflow-hidden rounded-[48px] py-16 sm:mb-20 sm:py-24 lg:py-32",
        isDark && "mx-4 sm:mx-6 lg:mx-8",
        isDark
          ? "bg-[#05050A] text-white shadow-2xl"
          : "border border-slate-100 bg-[#FAFBFF] text-slate-900 shadow-xl shadow-blue-500/5"
      )}
    >
      {/* Background Decor */}
      <div
        className={cn(
          "pointer-events-none absolute right-0 top-0 h-[800px] w-[800px] rounded-full opacity-20 blur-[150px]",
          isDark ? "bg-blue-600/10" : "bg-blue-400/5"
        )}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-w-0 grid-cols-1 items-center gap-12 md:gap-16 lg:grid-cols-2 lg:gap-32">
          {/* Left Section: Title and Paragraph */}
          <div className="space-y-8 lg:space-y-12">
            <div className="space-y-5 sm:space-y-6">
              <div className="flex justify-center lg:justify-start">
                <div
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-1.5",
                    isDark ? "border-white/10 bg-white/5" : "border-blue-100 bg-blue-50"
                  )}
                >
                  <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">
                    {t("whatYouGet.badge")}
                  </span>
                </div>
              </div>

              <SectionTitleHero
                variant={isDark ? "dark" : "light"}
                line1={t("whatYouGet.title")}
                highlight={t("whatYouGet.highlight")}
                className={cn(
                  "items-center text-center lg:items-start lg:text-left",
                  "[&_span]:!text-2xl sm:[&_span]:!text-4xl lg:[&_span]:!text-5xl"
                )}
              />

              <p
                className={cn(
                  "mx-auto max-w-xl text-center text-lg font-medium leading-relaxed opacity-70 sm:text-xl lg:mx-0 lg:text-left lg:text-2xl",
                  isDark ? "text-slate-300" : "text-slate-600"
                )}
              >
                {t("whatYouGet.footer")}
              </p>
            </div>
          </div>

          {/* Mobile / tablet: stacked list (no CardSwap) */}
          <div className="min-w-0 w-full lg:hidden">
            <div className="mx-auto flex max-h-[min(70vh,640px)] min-w-0 w-full flex-col gap-3 overflow-y-auto overflow-x-hidden pr-1 [scrollbar-width:thin] sm:gap-4">
              {items.map((item, i) => {
                const Icon = cardIcons[i % cardIcons.length];
                return (
                  <article
                    key={`mobile-${i}`}
                    className={cn(
                      "relative min-w-0 w-full px-3 pb-4 pt-3.5 sm:px-5 sm:pb-5 sm:pt-4",
                      cardSurfaceMobile(isDark)
                    )}
                  >
                    <div
                      className={cn(
                        "pointer-events-none absolute left-6 right-6 top-0 h-[2px] rounded-full sm:left-10 sm:right-10",
                        isDark
                          ? "bg-gradient-to-r from-transparent via-blue-500/45 to-transparent"
                          : "bg-gradient-to-r from-transparent via-blue-500/35 to-transparent"
                      )}
                      aria-hidden
                    />
                    {/* Column on phones so copy uses full width and wraps; row from md up */}
                    <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-start md:gap-4">
                      <div
                        className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-md md:h-14 md:w-14 md:rounded-2xl",
                          isDark
                            ? "bg-blue-500/15 text-blue-300 ring-1 ring-blue-400/25"
                            : "bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100"
                        )}
                      >
                        <WhatYouGetGlyph icon={Icon} size="sm" />
                      </div>
                      <div className="min-w-0 w-full flex-1 space-y-2 overflow-visible">
                        <h3
                          className={cn(
                            "whitespace-normal break-words text-base font-black leading-snug tracking-tight text-pretty sm:text-lg",
                            isDark ? "text-white" : "text-slate-900"
                          )}
                        >
                          {item}
                        </h3>
                        <p
                          className={cn(
                            "whitespace-normal break-words text-sm font-medium leading-relaxed sm:text-[15px]",
                            isDark ? "text-slate-400" : "text-slate-600"
                          )}
                        >
                          {t("whatYouGet.cardBody")}
                        </p>
                        <div
                          className={cn(
                            "flex min-w-0 flex-wrap items-center gap-2 border-t pt-3 sm:gap-3 sm:pt-3.5",
                            isDark ? "border-white/10" : "border-slate-200"
                          )}
                        >
                          <div
                            className={cn(
                              "flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-black sm:h-8 sm:w-8 sm:text-xs",
                              isDark
                                ? "bg-blue-500/15 text-blue-300 ring-1 ring-blue-500/30"
                                : "bg-blue-100 text-blue-700"
                            )}
                          >
                            {i < 9 ? `0${i + 1}` : i + 1}
                          </div>
                          <span
                            className={cn(
                              "text-[9px] font-black uppercase tracking-widest sm:text-[10px]",
                              isDark ? "text-slate-500" : "text-slate-400"
                            )}
                          >
                            {t("whatYouGet.cardMeta")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Desktop: CardSwap — unchanged */}
          <div className="relative hidden h-[620px] w-full items-center justify-center lg:flex">
            <div
              className={cn(
                "pointer-events-none absolute inset-[-12%] rounded-[3rem] blur-[80px]",
                isDark ? "bg-blue-500/12" : "bg-blue-400/20"
              )}
            />

            <div className="relative h-full w-full min-h-[420px]">
              <CardSwap
                width="100%"
                height="100%"
                cardDistance={42}
                verticalDistance={48}
                delay={3000}
                pauseOnHover={true}
                easing="linear"
              >
                {items.map((item, i) => {
                  const Icon = cardIcons[i % cardIcons.length];
                  return (
                    <Card
                      key={i}
                      className={cn(
                        "flex flex-col justify-between overflow-hidden p-6 transition-all duration-500 sm:p-9 lg:p-10",
                        isDark
                          ? "border border-white/20 bg-gradient-to-b from-[#12141c] to-[#0a0c12] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.06)_inset] ring-1 ring-white/10"
                          : "border border-slate-200/90 bg-gradient-to-b from-white to-slate-50 shadow-[0_28px_60px_-20px_rgba(15,23,42,0.2),0_0_0_1px_rgba(255,255,255,0.8)_inset] ring-1 ring-slate-200/80"
                      )}
                    >
                      <div
                        className={cn(
                          "pointer-events-none absolute left-10 right-10 top-0 h-[3px] rounded-full",
                          isDark
                            ? "bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
                            : "bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
                        )}
                        aria-hidden
                      />
                      <div
                        className={cn(
                          "mb-7 flex h-16 w-16 items-center justify-center rounded-2xl shadow-md",
                          isDark
                            ? "bg-blue-500/15 text-blue-300 ring-1 ring-blue-400/25"
                            : "bg-blue-50 text-blue-600 ring-1 ring-blue-100 shadow-sm"
                        )}
                      >
                        <WhatYouGetGlyph icon={Icon} size="lg" />
                      </div>

                      <div className="space-y-4">
                        <h3
                          className={cn(
                            "text-xl font-black leading-tight tracking-tight sm:text-3xl",
                            isDark ? "text-white" : "text-slate-900"
                          )}
                        >
                          {item}
                        </h3>
                        <p
                          className={cn(
                            "text-base font-medium leading-relaxed",
                            isDark ? "text-slate-400" : "text-slate-600"
                          )}
                        >
                          {t("whatYouGet.cardBody")}
                        </p>
                      </div>

                      <div
                        className={cn(
                          "mt-8 flex items-center gap-3 border-t pt-8",
                          isDark ? "border-white/10" : "border-slate-200"
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full text-xs font-black",
                            isDark
                              ? "bg-blue-500/15 text-blue-300 ring-1 ring-blue-500/30"
                              : "bg-blue-100 text-blue-700"
                          )}
                        >
                          {i < 9 ? `0${i + 1}` : i + 1}
                        </div>
                        <span
                          className={cn(
                            "text-[10px] font-black uppercase tracking-widest",
                            isDark ? "text-slate-500" : "text-slate-400"
                          )}
                        >
                          {t("whatYouGet.cardMeta")}
                        </span>
                      </div>
                    </Card>
                  );
                })}
              </CardSwap>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouActuallyGet;
