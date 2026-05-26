"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Globe, ChevronUp, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LOCALE_COOKIE,
  LOCALE_STORAGE_KEY,
  locales,
  localesForSwitcher,
  type Locale,
} from "@/lib/i18n-config";
import { stripLocaleFromPathname, withLocale } from "@/lib/localized-path";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const { t, i18n } = useTranslation("common");
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  const current: Locale =
    first && locales.includes(first as Locale)
      ? (first as Locale)
      : (i18n.language as Locale);

  const bare = stripLocaleFromPathname(pathname);

  function setLocale(next: Locale) {
    if (next === current) {
      setIsOpen(false);
      return;
    }
    const target = withLocale(next, bare === "/" ? "/" : bare);
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=${maxAge};SameSite=Lax`;
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    setIsOpen(false);
    router.push(target);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className={cn(
        "fixed bottom-6 right-6 z-[100] lg:bottom-8 lg:right-8",
        className
      )}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-3 min-w-[16rem] w-max max-w-[min(22rem,calc(100vw-1.5rem))] rounded-2xl border-2 border-slate-200 bg-white p-2 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.35),0_0_0_1px_rgba(59,73,230,0.12)] origin-bottom-right"
          >
            <div className="flex flex-col gap-1">
              {localesForSwitcher.map((loc) => {
                const isSelected = current === loc;
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setLocale(loc)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-all",
                      isSelected
                        ? "bg-primary-blue text-white shadow-md shadow-primary-blue/25"
                        : "text-slate-800 hover:bg-slate-100 hover:text-slate-950"
                    )}
                  >
                    <span>{t(`language.${loc}`)}</span>
                    {isSelected && <Check className="h-4 w-4 shrink-0 text-white" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "group flex items-center gap-2.5 rounded-full border-2 border-[#3b49e6]/35 bg-white py-2 pl-2 pr-4 shadow-[0_12px_40px_-8px_rgba(15,23,42,0.28),0_0_0_1px_rgba(15,23,42,0.06)] transition-all duration-300 hover:border-[#3b49e6]/60 hover:shadow-[0_16px_44px_-8px_rgba(59,73,230,0.35)]",
          isOpen
            ? "border-[#3b49e6] bg-slate-50 ring-4 ring-[#3b49e6]/15"
            : ""
        )}
        aria-label={`${t("language.label")} — ${t(`language.${current}`)}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3b49e6] text-white shadow-inner shadow-black/10 ring-2 ring-white">
          <Globe className="h-5 w-5" strokeWidth={2} aria-hidden />
        </span>
        <span className="min-w-0 truncate text-sm font-bold tracking-wide text-slate-900">
          {t(`language.${current}`)}
        </span>
        <ChevronUp
          className={cn(
            "ml-0.5 h-4 w-4 shrink-0 text-[#3b49e6] transition-transform duration-300 group-hover:text-[#2f3bc4]",
            isOpen ? "rotate-180" : ""
          )}
          aria-hidden
        />
      </button>
    </div>
  );
}
