"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Sparkles, Layers, ShieldCheck } from "lucide-react";

const PositioningLine = ({ isDark = false }: { isDark?: boolean }) => {
  const { t } = useTranslation("home");
  const phrase = t("positioningLine.text");

  return (
    <section
      className={cn(
        "relative mt-0 w-full overflow-hidden border-y py-12 sm:py-14",
        isDark
          ? "border-white/[0.08] bg-[linear-gradient(105deg,#050816_0%,#0a1020_45%,#050816_100%)]"
          : "border-slate-200/80 bg-gradient-to-r from-slate-50 via-white to-slate-50"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-px",
          isDark
            ? "bg-gradient-to-r from-transparent via-blue-500/35 to-transparent"
            : "bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-px",
          isDark
            ? "bg-gradient-to-r from-transparent via-white/10 to-transparent"
            : "bg-gradient-to-r from-transparent via-slate-200/80 to-transparent"
        )}
      />

      {/* Sleek floating accents (non-animated) */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={cn(
            "absolute -left-10 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full blur-[70px]",
            isDark ? "bg-blue-500/12" : "bg-blue-400/18"
          )}
        />
        <div
          className={cn(
            "absolute -right-12 top-1/3 h-52 w-52 rounded-full blur-[80px]",
            isDark ? "bg-violet-500/10" : "bg-violet-400/14"
          )}
        />

        {/* “Floating” icons kept minimal so it never feels messy */}
        <div
          className={cn(
            "absolute left-[8%] top-6 hidden sm:flex items-center justify-center rounded-2xl border backdrop-blur-md",
            "h-12 w-12",
            isDark ? "border-white/10 bg-white/[0.04] text-blue-300/70" : "border-slate-200/80 bg-white/70 text-blue-600/60"
          )}
          aria-hidden
        >
          <Layers className="h-5 w-5" />
        </div>
        <div
          className={cn(
            "absolute right-[10%] top-10 hidden md:flex items-center justify-center rounded-2xl border backdrop-blur-md",
            "h-12 w-12",
            isDark ? "border-white/10 bg-white/[0.04] text-violet-200/60" : "border-slate-200/80 bg-white/70 text-violet-500/55"
          )}
          aria-hidden
        >
          <Sparkles className="h-5 w-5" />
        </div>
        <div
          className={cn(
            "absolute right-[16%] bottom-8 hidden sm:flex items-center justify-center rounded-2xl border backdrop-blur-md",
            "h-12 w-12",
            isDark ? "border-white/10 bg-white/[0.04] text-emerald-200/55" : "border-slate-200/80 bg-white/70 text-emerald-600/45"
          )}
          aria-hidden
        >
          <ShieldCheck className="h-5 w-5" />
        </div>
      </div>

      {/* Static statement */}
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div
            className={cn(
              "mx-auto inline-flex items-center justify-center gap-3 rounded-full border px-6 py-3 sm:px-7 sm:py-3.5 shadow-sm",
              isDark
                ? "border-white/10 bg-white/[0.04] text-slate-100 shadow-black/40"
                : "border-slate-200/90 bg-white text-slate-900 shadow-slate-200/50"
            )}
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                isDark
                  ? "bg-blue-400 shadow-[0_0_14px_rgba(96,165,250,0.65)]"
                  : "bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.35)]"
              )}
            />
            <p className={cn("text-base sm:text-lg font-bold tracking-tight", isDark ? "text-slate-100" : "text-slate-900")}>
              {phrase}
            </p>
          </div>

          <div
            className={cn(
              "pointer-events-none mx-auto mt-5 h-px w-56",
              isDark
                ? "bg-gradient-to-r from-transparent via-blue-500/35 to-transparent"
                : "bg-gradient-to-r from-transparent via-blue-500/25 to-transparent"
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default PositioningLine;
