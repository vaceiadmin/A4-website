"use client";

import { cn } from "@/lib/utils";

export type SectionTitleHeroProps = {
  line1: string;
  /** When set, renders the full hero trio: Bodoni → sans extrabold → Bodoni italic (primary blue). */
  line2?: string;
  highlight: string;
  variant?: "dark" | "light";
  className?: string;
  as?: React.ElementType;
};

/**
 * Matches {@link HeroSection} typography: Bodoni + sans extrabold + Bodoni italic in primary blue.
 * Two-line mode (no `line2`) uses sans extrabold + Bodoni italic to mirror lines 2–3 of the hero.
 */
export function SectionTitleHero({
  line1,
  line2,
  highlight,
  variant = "dark",
  className,
  as: Tag = "h2",
}: SectionTitleHeroProps) {
  const body = variant === "dark" ? "text-white" : "text-neutral-900";
  const scale =
    "text-3xl sm:text-4xl lg:text-5xl";

  return (
    <Tag
      className={cn(
        "leading-[1.1] tracking-tight flex flex-col gap-2",
        className
      )}
    >
      {line2 ? (
        <>
          <span className={cn(scale, "font-bodoni", body)}>{line1}</span>
          <span className={cn(scale, "font-sans font-extrabold", body)}>
            {line2}
          </span>
          <span className={cn(scale, "font-bodoni italic text-primary-blue")}>
            {highlight}
          </span>
        </>
      ) : (
        <>
          <span className={cn(scale, "font-sans font-extrabold", body)}>
            {line1}
          </span>
          <span className={cn(scale, "font-bodoni italic text-primary-blue")}>
            {highlight}
          </span>
        </>
      )}
    </Tag>
  );
}
