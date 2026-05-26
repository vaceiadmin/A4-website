"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  CheckCircle2,
  LayoutDashboard,
  FileText,
  Calendar,
  MessageSquare,
  Clock,
  ShieldCheck,
  Zap,
  Search,
  ArrowLeft,
  History,
  Plus,
  Check,
  BadgePercent,
  Scale,
  Landmark,
  Cpu,
  BriefcaseBusiness,
  BookOpenCheck,
  FolderOpen,
} from "lucide-react";

function capFirst(s: string) {
  const trimmed = (s ?? "").trim();
  if (!trimmed) return trimmed;
  return trimmed[0].toUpperCase() + trimmed.slice(1);
}

const RealTimeControl = ({ isDark = true }: { isDark?: boolean }) => {
  const { t } = useTranslation("home");

  const SHOW_PORTAL_MOCK = false;

  const [selected, setSelected] = React.useState<string[]>(["VAT", "Accounting"]);
  const [company, setCompany] = React.useState("Cleven-Company");

  const icons = [
    LayoutDashboard,
    Clock,
    CheckCircle2,
    Calendar,
    FileText,
    ShieldCheck,
    MessageSquare,
    Zap,
    MessageSquare
  ];

  const items = (t("realTimeControl.items", { returnObjects: true }) as string[] || []);

  const serviceTiles = [
    { key: "VAT", icon: BadgePercent },
    { key: "Accounting", icon: BookOpenCheck },
    { key: "Audit", icon: Search },
    { key: "Payroll", icon: Clock },
    { key: "Corporate & CSP Services", icon: BriefcaseBusiness },
    { key: "Legal", icon: Scale },
    { key: "Projects & Transactions", icon: FolderOpen },
    { key: "Technology", icon: Cpu },
    { key: "Grants & Incentives", icon: Landmark },
    { key: "MBR", icon: LayoutDashboard },
    { key: "CFO", icon: LayoutDashboard },
    { key: "TAX", icon: BadgePercent },
    { key: "Liquidation", icon: BriefcaseBusiness },
    { key: "Tax Advisory", icon: ShieldCheck },
  ];

  const toggleSelected = (k: string) => {
    setSelected((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));
  };

  return (
    <section className={cn(
      "relative py-24 sm:py-32 overflow-hidden mx-4 sm:mx-6 lg:mx-8 mb-12 sm:mb-20",
      isDark ? "bg-black text-white rounded-[48px] shadow-2xl" : "bg-[#FAFBFF] text-slate-900 rounded-[48px] border border-slate-100 shadow-xl shadow-blue-500/5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24 items-center">
          
          {/* Left: Portal Mockup / Visual */}
          <div className="relative group order-2 lg:order-1">
            <div className="absolute -inset-10 bg-primary-blue/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            {/* OPTION A: Portal mock (toggle SHOW_PORTAL_MOCK to re-enable) */}
            {SHOW_PORTAL_MOCK ? (
              <div className={cn(
                "relative rounded-[3.5rem] border overflow-hidden shadow-3xl transition-all duration-700 group-hover:scale-[1.02]",
                "bg-white border-white/10"
              )}>
                {/* Portal Header */}
                <div
                  className={cn(
                    "flex items-center justify-between gap-6 border-b px-6 py-5 sm:px-8",
                    "bg-[#0b1220] border-white/10"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
                        "bg-amber-500 text-black"
                      )}
                    >
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className={cn("text-lg font-black leading-tight truncate text-white")}>
                        Global Service Request
                      </p>
                      <p className={cn("text-[12px] font-medium truncate text-slate-300")}>
                        Submit service requests for any of your incorporated companies.
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setCompany((c) => (c === "Cleven-Company" ? "VACEI-Holdings" : "Cleven-Company"))}
                      className={cn(
                        "h-9 px-3 rounded-xl border text-[11px] font-black tracking-tight flex items-center gap-2",
                        "bg-white/10 border-white/10 text-white hover:bg-white/15"
                      )}
                    >
                      {company}
                    </button>
                    <button
                      type="button"
                      className={cn(
                        "h-9 px-3 rounded-xl border text-[11px] font-black tracking-tight flex items-center gap-2",
                        "bg-white/10 border-white/10 text-white hover:bg-white/15"
                      )}
                    >
                      <History className="h-4 w-4" />
                      View History
                    </button>
                    <button
                      type="button"
                      className={cn(
                        "h-9 px-3 rounded-xl border text-[11px] font-black tracking-tight flex items-center gap-2",
                        "bg-white/10 border-white/10 text-white hover:bg-white/15"
                      )}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                  </div>
                </div>

                {/* Portal Body */}
                <div className={cn("p-5 sm:p-8 bg-slate-50")}>
                  <div className="grid grid-cols-12 gap-4 sm:gap-5">
                    {/* Tiles */}
                    <div className="col-span-12 lg:col-span-8 space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {serviceTiles.map((tile) => {
                          const Icon = tile.icon;
                          const active = selected.includes(tile.key);
                          return (
                            <button
                              key={tile.key}
                              type="button"
                              onClick={() => toggleSelected(tile.key)}
                              className={cn(
                                "group min-w-0 flex items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition-all duration-300",
                                active
                                  ? "bg-blue-50 border-blue-300 shadow-[0_18px_40px_-22px_rgba(37,99,235,0.20)]"
                                  : "bg-white border-slate-200 hover:bg-white hover:border-slate-300 hover:shadow-[0_14px_34px_-22px_rgba(15,23,42,0.25)]"
                              )}
                            >
                              <div
                                className={cn(
                                  "h-9 w-9 shrink-0 rounded-xl border flex items-center justify-center transition-colors",
                                  active
                                    ? "bg-blue-600 text-white border-blue-500"
                                    : "bg-slate-50 text-slate-700 border-slate-200"
                                )}
                              >
                                <Icon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
                              </div>
                              <span
                                className={cn(
                                  "min-w-0 flex-1 text-[11px] font-black leading-snug tracking-tight text-slate-900",
                                  "whitespace-normal break-words",
                                  "line-clamp-2"
                                )}
                                title={tile.key}
                              >
                                {tile.key}
                              </span>
                              {active ? (
                                <span className={cn("ml-auto h-5 w-5 rounded-full flex items-center justify-center bg-blue-100 text-blue-700")}>
                                  <Check className="h-3.5 w-3.5" />
                                </span>
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="col-span-12 lg:col-span-4">
                      <div className={cn("rounded-[2.25rem] border p-6 sm:p-7 bg-[#0b1220] border-white/10")}>
                        <p className={cn("text-lg font-black text-white")}>Summary</p>
                        <p className={cn("mt-5 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400")}>
                          Services selected
                        </p>
                        {selected.length ? (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {selected.map((s) => (
                              <span
                                key={s}
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-black text-slate-100"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                                <span className="max-w-[12rem] truncate">{s}</span>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div className="mt-2 text-sm font-bold text-slate-500">No services selected yet</div>
                        )}

                        <div className={cn("my-6 h-px bg-white/10")} />

                        <p className={cn("text-[10px] font-black uppercase tracking-[0.25em] text-slate-400")}>
                          Request for
                        </p>
                        <div className={cn("mt-2 rounded-2xl border px-4 py-3 flex items-center gap-3 bg-white/10 border-white/10")}>
                          <div className={cn("h-9 w-9 rounded-xl border flex items-center justify-center bg-white/10 border-white/10 text-white")}>
                            <BriefcaseBusiness className="h-4 w-4" />
                          </div>
                          <span className={cn("text-[12px] font-black text-white")}>{company}</span>
                        </div>
                      </div>
                    </div>

                    {/* Full-width empty state */}
                    <div className="col-span-12">
                      <div className="relative overflow-hidden rounded-[2.25rem] border bg-white border-slate-200">
                        <div
                          className="absolute inset-0 pointer-events-none opacity-[0.05]"
                          style={{
                            backgroundImage: "radial-gradient(circle at 2px 2px, #0f172a 1px, transparent 0)",
                            backgroundSize: "48px 48px",
                          }}
                        />
                        <div className="flex min-h-[240px] items-center justify-center px-6 py-12 text-center">
                          <div className="space-y-3 max-w-sm">
                            <div className="mx-auto h-16 w-16 rounded-full border flex items-center justify-center bg-slate-50 border-slate-200 text-slate-900">
                              <Plus className="h-7 w-7" />
                            </div>
                            <p className="text-lg font-black tracking-tight text-slate-900">Select services to start</p>
                            <p className="text-sm font-medium leading-relaxed text-slate-600">
                              Choose services from the list above and complete the details for each request.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* OPTION B: Screenshot mock (current) */
              <div
                className={cn(
                  "relative overflow-hidden rounded-[3.5rem] border shadow-3xl transition-all duration-700 group-hover:scale-[1.01]",
                  "border-white/10 bg-[#0b1220]"
                )}
              >
                {/* Simple browser chrome */}
                <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4 sm:px-8">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                      client.vacei.com
                    </span>
                  </div>
                  <span className="hidden sm:block text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                    Portal preview
                  </span>
                </div>

                <div className="relative aspect-16/10 w-full bg-black">
                  <Image
                    src="/assets/images/Gemini_Generated_Image_qv092qqv092qqv09.png"
                    alt="Portal preview screenshot"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain object-center"
                    priority={false}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </div>
            )}
          </div>

          {/* Right: Content */}
          <div className="space-y-12 order-1 lg:order-2">
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05]">
                {t("realTimeControl.title").split(' — ')[0]} — <br />
                <span className="font-bodoni italic text-blue-600 lowercase">
                  {t("realTimeControl.title").split(' — ')[1]}
                </span>
              </h2>
              <div className="flex items-center gap-5">
                  <div className="w-16 h-2 bg-primary-blue rounded-full" />
                  <p className={cn(
                    "text-2xl sm:text-3xl font-bodoni italic",
                    isDark ? "text-primary-blue" : "text-blue-600"
                  )}>
                    {t("realTimeControl.subtitle")}
                  </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
               {items.map((item, i) => (
                <div key={i} className={cn(
                    "group flex items-center gap-4 p-5 rounded-3xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-lg",
                    isDark ? "bg-[#0a0a0a] border-white/5 hover:border-blue-500/20" : "bg-white border-slate-200 shadow-sm hover:border-blue-500/20"
                )}>
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {icons[i] && React.createElement(icons[i], { className: "w-5 h-5" })}
                  </div>
                  <span className={cn(
                    "text-lg font-bold tracking-tight",
                    isDark ? "text-slate-200" : "text-slate-800"
                  )}>
                    {capFirst(item)}
                  </span>
                </div>
              ))}
            </div>

            <div className={cn(
                "pt-10 border-t",
                isDark ? "border-white/10" : "border-slate-100"
            )}>
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <p className={cn(
                        "text-lg font-black uppercase tracking-[0.25em]",
                        isDark ? "text-slate-500" : "text-slate-400"
                    )}>
                        {t("realTimeControl.footer")}
                    </p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RealTimeControl;
