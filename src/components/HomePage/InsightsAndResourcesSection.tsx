"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import LocalizedLink from "@/components/common/LocalizedLink";
import { SectionTitleHero } from "@/components/HomePage/SectionTitleHero";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/utils/blog";

const InsightsVideoGallery = dynamic(
  () => import("@/components/HomePage/InsightsVideoGallery"),
  {
    loading: () => (
      <div
        className="mt-20 min-h-[min(70vh,520px)] scroll-mt-28 rounded-[2rem] border border-white/[0.06] bg-[#0c0d12]"
        aria-hidden
      >
        <div className="h-full min-h-[inherit] animate-pulse rounded-[2rem] bg-gradient-to-b from-white/[0.06] to-transparent" />
      </div>
    ),
  }
);

const typeColorClass: Record<string, string> = {
  emerald: "text-emerald-400",
  blue: "text-zinc-400",
  purple: "text-primary-blue",
};

const cardColors = ["emerald", "blue", "purple"] as const;

interface InsightsAndResourcesSectionProps {
  isDark?: boolean;
  recentBlogs?: BlogPost[];
}

const InsightsAndResourcesSection = ({
  isDark = true,
  recentBlogs = [],
}: InsightsAndResourcesSectionProps) => {
  const { t } = useTranslation("home");

  const resourcesList = useMemo(() => {
    const articleType = t("insightsResources.articleType", { defaultValue: "Article" });

    return recentBlogs.slice(0, 3).map((blog, index) => {
      const color = cardColors[index % cardColors.length];
      const iconColor =
        color === "emerald"
          ? isDark
            ? "text-emerald-400"
            : "text-emerald-600"
          : color === "blue"
            ? isDark
              ? "text-zinc-400"
              : "text-zinc-600"
            : isDark
              ? "text-primary-blue"
              : "text-zinc-600";

      return {
        slug: blog.slug,
        type: articleType,
        category: blog.tags?.[0] || "Insight",
        title: blog.title,
        desc: blog.excerpt,
        href: `/insights/${blog.slug}`,
        color,
        icon: <FileText className={cn("w-5 h-5", iconColor)} />,
      };
    });
  }, [recentBlogs, isDark, t]);

  return (
    <section className={cn(
        "py-24 relative overflow-hidden  mb-12 sm:mb-20",
        isDark ? "bg-black text-white rounded-[48px] shadow-2xl" : "bg-white text-slate-900 rounded-[48px] border border-slate-100 shadow-xl"
    )}>
      {/* Background glow behind title */}
      <div className={cn(
        "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] pointer-events-none",
        isDark ? "bg-[radial-gradient(circle_at_center,rgba(161, 161, 170,0.08)_0,transparent_60%)]" : "bg-[radial-gradient(circle_at_center,rgba(161, 161, 170,0.05)_0,transparent_60%)]"
      )} />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={cn(
            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border mb-6",
            isDark ? "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" : "bg-zinc-50 text-zinc-600 border-zinc-100"
          )}>
            {t("insightsResources.badge")}
          </div>
          <SectionTitleHero
            variant={isDark ? "dark" : "light"}
            className="mb-6 items-center text-center"
            line1={t("insightsResources.titleLine1")}
            highlight={t("insightsResources.titleHighlight")}
          />
          <p className={cn(
            "text-lg font-medium leading-relaxed",
            isDark ? "text-slate-400" : "text-slate-500"
          )}>
            {t("insightsResources.subtitle")}
          </p>
        </div>

        {/* Latest insights from blog pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resourcesList.length === 0 ? (
            <p
              className={cn(
                "col-span-full text-center text-sm font-medium",
                isDark ? "text-slate-500" : "text-slate-400"
              )}
            >
              {t("insightsResources.noPosts", { defaultValue: "No insights published yet." })}
            </p>
          ) : null}
          {resourcesList.map((item) => {
            const CardContent = (
              <div className={cn(
                "flex flex-col h-full border rounded-3xl p-8 transition-all duration-300 group shadow-2xl hover:shadow-[0_20px_40px_-20px_rgba(161, 161, 170,0.15)] cursor-pointer",
                isDark ? "bg-[#0A0B10] border-white/5 hover:bg-[#0D0F18] hover:border-white/10" : "bg-slate-50 border-slate-200 hover:bg-white hover:border-zinc-200"
              )}>
                {/* Card Header (Type & Category) */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center border group-hover:scale-110 transition-transform duration-500",
                    isDark ? "bg-white/5 border-white/5" : "bg-white border-slate-200"
                  )}>
                    {item.icon}
                  </div>
                  <div>
                    <span
                      className={cn(
                        "text-[10px] font-black uppercase tracking-widest",
                        typeColorClass[item.color as string] ?? "text-zinc-400"
                      )}
                    >
                      {item.type}
                    </span>
                    <div className={cn(
                        "text-sm font-semibold mt-0.5",
                        isDark ? "text-slate-500" : "text-slate-400"
                    )}>
                      {item.category}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <h3 className={cn(
                    "text-xl font-bold mb-3 transition-colors",
                    isDark ? "text-white group-hover:text-zinc-400" : "text-slate-900 group-hover:text-zinc-600"
                )}>
                  {item.title}
                </h3>
                <p className={cn(
                    "text-sm leading-relaxed mb-8 flex-1",
                    isDark ? "text-slate-400" : "text-slate-500"
                )}>
                  {item.desc}
                </p>

                {/* Card Footer */}
                <div className={cn(
                    "mt-auto flex items-center gap-2 text-sm font-bold transition-colors",
                    isDark ? "text-slate-300 group-hover:text-white" : "text-slate-500 group-hover:text-zinc-600"
                )}>
                  {t("insightsResources.readMore")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );

            return (
              <LocalizedLink key={item.slug} href={item.href}>
                {CardContent}
              </LocalizedLink>
            );
          })}
        </div>

        <InsightsVideoGallery isDark={false} />

        {/* Bottom Action */}
        <div className="mt-12 text-center">
          <LocalizedLink
            href="/insights"
            className={cn(
                "inline-flex items-center gap-2 text-sm font-bold transition-colors px-6 py-3 rounded-xl border",
                isDark ? "text-zinc-400 hover:text-zinc-300 bg-zinc-500/10 hover:bg-zinc-500/20 border-zinc-500/20" : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100 border-zinc-100"
            )}
          >
            {t("insightsResources.viewAll")}{" "}
            <ArrowRight className="w-4 h-4" />
          </LocalizedLink>
        </div>
      </div>
    </section>
  );
};

export default InsightsAndResourcesSection;
