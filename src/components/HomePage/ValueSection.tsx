"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Check, Settings, BarChart3, Clock, Milestone, Users, Calendar, ArrowUpRight, FileText, ArrowRight, Play, Pause } from "lucide-react";
import { useInView } from "framer-motion";

const ValueSection = ({ isDark = false }: { isDark?: boolean }) => {
  const { t } = useTranslation("home");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasTriggeredInitial, setHasTriggeredInitial] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  
  const mockRef = React.useRef(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const isInView = useInView(mockRef, { amount: 0.25 });

  React.useEffect(() => {
    if (isInView) {
      setIsLoaded(false);
      setHasTriggeredInitial(true);
      const timer = setTimeout(() => setIsLoaded(true), 2000);
      return () => clearTimeout(timer);
    } else {
      setIsLoaded(false);
      setHasTriggeredInitial(false);
    }
  }, [isInView]);

  // Reset loading state briefly when changing active index to make it feel dynamic
  React.useEffect(() => {
    if (!hasTriggeredInitial || !isInView) return;
    setIsLoaded(false);
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const togglePlayback = async () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      try {
        await el.play();
        setIsPlaying(true);
      } catch {
        // ignore autoplay / user-gesture restrictions
      }
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  const onTimeUpdate = () => {
    const el = videoRef.current;
    if (!el || !Number.isFinite(el.duration) || el.duration <= 0) return;
    setProgress((el.currentTime / el.duration) * 100);
  };

  const onLoadedMetadata = () => {
    const el = videoRef.current;
    if (!el || !Number.isFinite(el.duration)) return;
    setDuration(el.duration);
  };

  const seekTo = (pct: number) => {
    const el = videoRef.current;
    if (!el || !Number.isFinite(el.duration) || el.duration <= 0) return;
    el.currentTime = (pct / 100) * el.duration;
    setProgress(pct);
  };



  const icons = [BarChart3, Clock, Settings, Milestone, Users, Calendar];
  const bullets = (t("valueSection.bullets", { returnObjects: true }) as string[]) || [];

  const renderDashboardContent = (index: number, isDark: boolean) => {
    switch (index) {
        case 0:
            return (
                <div className="flex flex-col gap-4 h-full animate-in fade-in slide-in-from-bottom-2 duration-700">
                    <div className="flex justify-between items-end">
                        <div>
                            <p className={cn("text-xs font-bold uppercase tracking-wider mb-1", isDark ? "text-slate-400" : "text-slate-500")}>Total Revenue</p>
                            <h3 className={cn("text-3xl font-black flex items-center gap-3", isDark ? "text-white" : "text-slate-900")}>$1.24M 
                                <span className={cn("text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1 font-bold", isDark ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" : "text-emerald-600 bg-emerald-50 border border-emerald-200")}><ArrowUpRight className="w-3 h-3" /> 14.2%</span>
                            </h3>
                        </div>
                        <div className={cn("text-right", isDark ? "text-slate-400" : "text-slate-500")}>
                            <p className="text-[10px] uppercase font-bold tracking-widest mb-1">MRR</p>
                            <p className={cn("font-bold", isDark ? "text-slate-200" : "text-slate-800")}>$104,000</p>
                        </div>
                    </div>
                    <div className="flex-1 flex items-end gap-2.5 mt-4">
                        {[40, 70, 45, 90, 65, 80, 50].map((h, j) => (
                            <div key={j} className="flex-1 rounded-t-md relative group bg-indigo-50 dark:bg-slate-800/50" style={{ height: `${h}%` }}>
                                <div className={cn("absolute bottom-0 left-0 right-0 rounded-t-md transition-all duration-1000 ease-out", isDark ? "bg-gradient-to-t from-blue-600 to-blue-400" : "bg-gradient-to-t from-blue-500 to-blue-400")} style={{ height: '100%' }} />
                            </div>
                        ))}
                    </div>
                    <div className={cn("flex justify-between mt-2 pt-2 border-t text-[10px] font-bold uppercase tracking-widest", isDark ? "border-white/5 text-slate-500" : "border-slate-100 text-slate-400")}>
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>
            );
        case 1:
            return (
                <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 duration-700">
                    <div className="flex justify-between items-center mb-5">
                       <p className={cn("text-xs font-bold uppercase tracking-wider", isDark ? "text-slate-400" : "text-slate-500")}>Latest Transactions</p>
                       <span className="text-[10px] font-bold text-blue-500 hover:text-blue-600 cursor-pointer">View All</span>
                    </div>
                    <div className="flex flex-col gap-2 flex-1 justify-center">
                        {[
                            { name: "Stripe EU Payout", date: "Today, 9:24 AM", amount: "+$4,020.50", type: "in", icon: <ArrowUpRight className="w-3.5 h-3.5" /> },
                            { name: "AWS Cloud Services", date: "Yesterday, 3:12 PM", amount: "-$840.00", type: "out", icon: <Settings className="w-3.5 h-3.5" /> },
                            { name: "Gusto Payroll", date: "Oct 24, 11:00 AM", amount: "-$12,450.00", type: "out", icon: <Users className="w-3.5 h-3.5" /> }
                        ].map((txn, j) => (
                            <div key={j} className={cn("flex justify-between items-center p-3 sm:p-4 rounded-xl border transition-colors hover:bg-black/5 dark:hover:bg-white/5", isDark ? "bg-[#0a0a0a] border-white/5" : "bg-white border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]")}>
                                <div className="flex items-center gap-3 w-full">
                                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0 border", txn.type === 'in' ? (isDark ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-emerald-50 text-emerald-600 border-emerald-100") : (isDark ? "bg-white/5 text-slate-300 border-white/10" : "bg-slate-50 text-slate-500 border-slate-200"))}>
                                        {txn.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className={cn("text-[13px] font-black leading-none mb-1.5", isDark ? "text-slate-200" : "text-slate-900")}>{txn.name}</p>
                                        <p className={cn("text-[10px] font-medium leading-none", isDark ? "text-slate-500" : "text-slate-400")}>{txn.date}</p>
                                    </div>
                                    <span className={cn("text-sm font-black text-right whitespace-nowrap", txn.type === 'in' ? "text-emerald-500" : (isDark ? "text-white" : "text-slate-900"))}>{txn.amount}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 2:
            return (
               <div className="flex flex-col h-full justify-center animate-in fade-in slide-in-from-bottom-2 duration-700">
                    <div className="flex justify-between mb-6">
                        <p className={cn("text-xs font-bold uppercase tracking-wider", isDark ? "text-slate-400" : "text-slate-500")}>Annual UK Audit</p>
                        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border", isDark ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-blue-50 text-blue-600 border-blue-200")}>In Progress</span>
                    </div>
                    <div className="relative pl-2">
                        <div className={cn("absolute left-[23px] top-6 bottom-6 w-0.5", isDark ? "bg-white/10" : "bg-slate-200")} />
                        <div className="flex flex-col gap-6">
                            {[
                                { step: "Preparation & Data Gathering", status: "completed", date: "Oct 12" },
                                { step: "Fieldwork & Sample Testing", status: "active", date: "Present" },
                                { step: "Draft Report Generation", status: "pending", date: "Est. Nov 5" }
                            ].map((step, j) => (
                                <div key={j} className="flex items-center gap-5 relative z-10">
                                    <div className={cn(
                                        "w-8 h-8 rounded-full border-[3px] flex items-center justify-center shrink-0 transition-colors shadow-sm",
                                        step.status === 'completed' ? "bg-emerald-500 border-emerald-100 dark:border-emerald-900 text-white" : 
                                        step.status === 'active' ? (isDark ? "bg-primary-blue border-blue-900 text-white" : "bg-blue-600 border-blue-100 text-white") : 
                                        (isDark ? "bg-[#050505] border-white/20 text-slate-600" : "bg-white border-slate-300 text-slate-400")
                                    )}>
                                        {step.status === 'completed' ? <Check className="w-4 h-4" /> : <div className={cn("w-2 h-2 rounded-full", step.status === 'active' && "bg-white")} />}
                                    </div>
                                    <div className="flex-1">
                                        <p className={cn("text-sm font-bold leading-none mb-1.5", isDark ? (step.status==='pending'? "text-slate-500" : "text-white") : (step.status==='pending'? "text-slate-400" : "text-slate-900"))}>{step.step}</p>
                                        <p className={cn("text-[10px] uppercase font-bold tracking-widest", isDark ? "text-slate-500" : "text-slate-400")}>{step.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
               </div>
            );
        case 3:
            return (
                <div className="flex flex-col h-full gap-4 justify-center animate-in fade-in slide-in-from-bottom-2 duration-700">
                    <p className={cn("text-xs font-bold uppercase tracking-wider", isDark ? "text-slate-400" : "text-slate-500")}>Action Required</p>
                    <div className={cn("p-4 rounded-xl border flex gap-4 overflow-hidden relative shadow-sm", isDark ? "bg-[#1E0F14] border-red-500/20" : "bg-white border-red-200 shadow-red-500/5")}>
                        <div className={cn("absolute left-0 top-0 bottom-0 w-1", isDark ? "bg-red-500" : "bg-red-500")} />
                        <div className={cn("w-14 h-14 rounded-lg flex flex-col items-center justify-center shrink-0 border ml-1", isDark ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-red-50 border-red-100 text-red-600")}>
                            <span className="text-[9px] font-black uppercase tracking-widest mt-1">Oct</span>
                            <span className="text-xl font-black leading-none mb-1">31</span>
                        </div>
                        <div className="flex flex-col justify-center">
                            <p className={cn("text-sm font-black mb-1.5", isDark ? "text-white" : "text-slate-900")}>Q3 VAT Return (DE)</p>
                            <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-md inline-block w-fit border", isDark ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-red-100 text-red-600 border-red-200")}>Due in 5 days</span>
                        </div>
                    </div>
                    <div className={cn("p-4 rounded-xl border flex gap-4 mt-2", isDark ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100")}>
                        <div className={cn("w-14 h-14 rounded-lg flex flex-col items-center justify-center shrink-0 border ml-1", isDark ? "bg-white/10 border-white/5 text-slate-300" : "bg-white border-slate-200 text-slate-600")}>
                            <span className="text-[9px] font-black uppercase tracking-widest mt-1">Nov</span>
                            <span className="text-xl font-black leading-none mb-1">15</span>
                        </div>
                        <div className="flex flex-col justify-center">
                            <p className={cn("text-sm font-black mb-1.5", isDark ? "text-slate-200" : "text-slate-800")}>Corp. Tax Preparation</p>
                            <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-md inline-block w-fit border", isDark ? "bg-slate-800 text-slate-400 border-white/10" : "bg-slate-200 text-slate-600 border-slate-300")}>On track</span>
                        </div>
                    </div>
                </div>
            );
        case 4:
            return (
                <div className="flex flex-col h-full justify-end gap-3 pb-2 animate-in fade-in zoom-in-[0.98] duration-700">
                    <p className={cn("text-xs font-bold uppercase tracking-wider border-b pb-3 mb-2 flex justify-between", isDark ? "text-slate-500 border-white/5" : "text-slate-400 border-slate-100")}>Direct Message <span className="text-blue-500 lowercase">Online</span></p>
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 overflow-hidden shrink-0 flex items-center justify-center text-blue-500 shadow-sm border border-blue-200">
                           <Users className="w-4 h-4" />
                        </div>
                        <div className={cn("p-4 rounded-2xl rounded-tl-none border text-sm shadow-sm", isDark ? "bg-[#111] border-white/10 text-slate-300" : "bg-white border-slate-200 text-slate-700")}>
                            Hi! Your incorporation documents are generated and ready for signature. I've uploaded them to the <span className="font-bold underline cursor-pointer">Vault</span>.
                        </div>
                    </div>
                    <div className="flex gap-3 flex-row-reverse mt-2">
                        <div className={cn("p-4 rounded-2xl rounded-tr-none text-sm text-white shadow-md", isDark ? "bg-primary-blue border border-blue-500/50" : "bg-blue-600 border border-blue-500")}>
                            Great, thanks! Looking now.
                        </div>
                    </div>
                </div>
            );
        case 5:
             return (
                <div className="flex flex-col h-full justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <p className={cn("text-xs font-bold uppercase tracking-wider text-center", isDark ? "text-slate-500" : "text-slate-400")}>Advisory Call</p>
                    <div className={cn("mx-auto p-6 rounded-[1.5rem] border text-center w-full max-w-[280px]", isDark ? "bg-[#0a0a0a] border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]" : "bg-white border-slate-200 shadow-xl shadow-slate-200/50")}>
                        <div className="flex justify-center -space-x-2 mb-5">
                             <div className="w-12 h-12 rounded-full border-2 border-white dark:border-[#0a0a0a] bg-blue-100 flex items-center justify-center text-blue-600 relative overflow-hidden"><img src="https://i.pravatar.cc/100?img=12" alt="Avatar" className="w-full h-full object-cover"/></div>
                             <div className="w-12 h-12 rounded-full border-2 border-white dark:border-[#0a0a0a] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 relative z-10"><img src="https://i.pravatar.cc/100?img=33" alt="Avatar" className="w-full h-full object-cover"/></div>
                        </div>
                        <h4 className={cn("text-lg font-black tracking-tight leading-none mb-2", isDark ? "text-white" : "text-slate-900")}>Quarterly Strategy Sync</h4>
                        <p className={cn("text-xs font-bold mb-6", isDark ? "text-slate-400" : "text-slate-500")}>Tomorrow, 10:00 AM CET</p>
                        <button className={cn("w-full py-3 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 group", isDark ? "bg-white text-black hover:bg-slate-200" : "bg-slate-900 text-white hover:bg-black hover:shadow-lg")}>
                            Schedule Time <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
             );
        default:
            return null;
    }
  };

  return (
    <section className={cn(
      "relative py-24 sm:py-32 overflow-hidden mx-4 sm:mx-6 lg:mx-8 mb-12 sm:mb-20",
      isDark
        ? "rounded-[48px] border border-white/[0.12] bg-[#070a12] text-white shadow-[0_32px_80px_-24px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.06)] ring-1 ring-white/10"
        : "rounded-[48px] border border-slate-100 bg-[#FAFBFF] text-slate-900 shadow-xl shadow-blue-500/5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Interactive Feature List */}
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
                {t("valueSection.title")}
              </h2>
            </div>

            <div className="space-y-4">
              {bullets.map((bullet, i) => {
                const Icon = icons[i % icons.length];
                const isActive = activeIndex === i;
                return (
                  <button 
                    key={i} 
                    onMouseEnter={() => setActiveIndex(i)}
                    className={cn(
                      "w-full text-left p-6 rounded-2xl border transition-all duration-500 flex items-center gap-6 group",
                      isActive 
                        ? (isDark ? "border-blue-500/60 bg-gradient-to-br from-white/[0.08] to-white/[0.02] shadow-[0_0_0_1px_rgba(59,130,246,0.35),0_16px_40px_-12px_rgba(37,99,235,0.25)]" : "bg-white border-blue-500 shadow-xl shadow-blue-500/10")
                        : (isDark ? "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]" : "bg-white/50 border-slate-200/60 hover:bg-white hover:border-slate-300 shadow-sm")
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ring-1",
                      isActive 
                        ? (isDark ? "bg-primary-blue text-white ring-blue-400/30 shadow-lg shadow-blue-500/20" : "bg-blue-600 text-white")
                        : (isDark ? "bg-white/[0.06] text-slate-400 ring-white/10 group-hover:text-blue-300" : "bg-slate-100 text-slate-400 group-hover:text-blue-600")
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className={cn(
                        "text-lg font-bold transition-colors duration-500",
                        isActive ? (isDark ? "text-white" : "text-slate-900") : "text-slate-500"
                      )}>
                        {bullet}
                      </p>
                    </div>
                    <div className={cn(
                        "w-2 h-2 rounded-full transition-all duration-500",
                        isActive ? "bg-blue-500 scale-150" : "bg-slate-300 opacity-0"
                    )} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Dashboard Mockup Preview (disabled) */}
          {/*
            <div ref={mockRef} className="relative lg:h-[600px] group">
              ...
            </div>
          */}

          {/* Right: Explainer video (play / pause) */}
          <div ref={mockRef} className="relative lg:h-[600px] group">
            <div className="absolute -inset-10 bg-primary-blue/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div
              className={cn(
                "relative h-full w-full overflow-hidden rounded-[2.5rem] border transition-all duration-700",
                isDark
                  ? "border-white/15 bg-[#0c0f18] shadow-[0_28px_70px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)_inset,0_0_60px_-10px_rgba(59,130,246,0.12)]"
                  : "border-slate-200 bg-white shadow-2xl"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-between gap-4 border-b px-8 h-14",
                  isDark ? "border-white/10 bg-[#12151f]" : "bg-slate-50 border-slate-100"
                )}
              >
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]/30" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/30" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]/30" />
                </div>
                <div className={cn("text-[10px] font-black uppercase tracking-[0.25em]", isDark ? "text-slate-500" : "text-slate-400")}>
                  VACEI EXPLAINER
                </div>
              </div>

              <div className="relative h-full p-6 sm:p-8">
                <div
                  className={cn(
                    "relative overflow-hidden rounded-2xl border",
                    isDark ? "border-white/10 bg-black" : "border-slate-200 bg-black"
                  )}
                >
                  <video
                    ref={videoRef}
                    className="w-full aspect-video object-cover"
                    src="/assets/videos/Vacei%20(2)%20X2V2.mp4"
                    playsInline
                    preload="metadata"
                    onTimeUpdate={onTimeUpdate}
                    onLoadedMetadata={onLoadedMetadata}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />

                  <button
                    type="button"
                    onClick={() => void togglePlayback()}
                    className={cn(
                      "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                      isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
                    )}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    <div
                      className={cn(
                        "flex items-center gap-3 rounded-full border px-5 py-3 shadow-2xl backdrop-blur-xl",
                        isDark
                          ? "bg-black/60 border-white/10 text-white"
                          : "bg-white/80 border-slate-200 text-slate-900 shadow-black/5"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full",
                          isDark ? "bg-white/10" : "bg-slate-900"
                        )}
                      >
                        {isPlaying ? (
                          <Pause className={cn("w-5 h-5", isDark ? "text-white" : "text-white")} />
                        ) : (
                          <Play className={cn("w-5 h-5 ml-0.5", isDark ? "text-white" : "text-white")} />
                        )}
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-[0.25em]">
                        {isPlaying ? "PAUSE" : "PLAY"}
                      </span>
                    </div>
                  </button>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute inset-x-5 bottom-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => void togglePlayback()}
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md",
                          isDark
                            ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                            : "bg-white/70 border-white/40 text-slate-900 hover:bg-white"
                        )}
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                      </button>

                      <input
                        aria-label="Seek video"
                        type="range"
                        min={0}
                        max={100}
                        step={0.1}
                        value={Number.isFinite(progress) ? progress : 0}
                        onChange={(e) => seekTo(Number(e.target.value))}
                        className="w-full accent-blue-500"
                      />

                      <div className={cn("shrink-0 text-[10px] font-black tabular-nums", isDark ? "text-slate-300" : "text-slate-100")}>
                        {duration > 0 ? `${Math.round(duration / 60)}:${String(Math.round(duration % 60)).padStart(2, "0")}` : "0:00"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-4">
                  <div
                    className={cn(
                      "rounded-2xl border p-5",
                      isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-100 bg-white"
                    )}
                  >
                    <p className={cn("text-[10px] font-black uppercase tracking-[0.25em]", isDark ? "text-slate-500" : "text-slate-400")}>
                      Built for control
                    </p>
                    <p className={cn("mt-2 text-sm font-bold leading-relaxed", isDark ? "text-slate-200" : "text-slate-800")}>
                      One workspace for services, docs, deadlines.
                    </p>
                  </div>
                  <div
                    className={cn(
                      "rounded-2xl border p-5",
                      isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-100 bg-white"
                    )}
                  >
                    <p className={cn("text-[10px] font-black uppercase tracking-[0.25em]", isDark ? "text-slate-500" : "text-slate-400")}>
                      Delivered by experts
                    </p>
                    <p className={cn("mt-2 text-sm font-bold leading-relaxed", isDark ? "text-slate-200" : "text-slate-800")}>
                      A dedicated team coordinating everything.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-20 text-center">
          <p className={cn(
            "text-xl font-bodoni italic",
            isDark ? "text-slate-400" : "text-slate-500"
          )}>
            {t("valueSection.footer")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
