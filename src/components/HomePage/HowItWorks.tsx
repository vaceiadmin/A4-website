import React, { useMemo, useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Play, Pause, CheckCircle2, ClipboardList, Network, LayoutDashboard, Sparkles, Volume2, VolumeX } from "lucide-react";
import { usePerformance } from "@/contexts/ReduceMotionContext";
import { HOW_IT_WORKS_VIDEO } from "@/data/video";
import { useLazyMedia } from "@/hooks/use-lazy-media";
import { cn } from "@/lib/utils";
import { SectionTitleHero } from "@/components/HomePage/SectionTitleHero";

const HowItWorks = () => {
  const { t } = useTranslation("home");
  const { reduceMotion } = usePerformance();

  const steps = useMemo(
    () => {
      const raw = t("howItWorks.steps", { returnObjects: true }) as
        | { title: string; description: string }[]
        | string;
      const list = Array.isArray(raw) ? raw : [];
      const icons = [ClipboardList, Network, LayoutDashboard];
      const colors = [
        "from-blue-600 to-blue-800",
        "from-blue-500 to-blue-700",
        "from-blue-700 to-slate-800",
      ];
      return list.map((s, i) => ({
        title: s.title,
        description: s.description,
        icon: icons[i],
        color: colors[i],
      }));
    },
    [t]
  );
  const sectionRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: lazyVideoWrapRef, shouldLoad: loadHowVideo } = useLazyMedia();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-progression logic for steps
  useEffect(() => {
    if (hasInteracted) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 4000); // 4 seconds per step

    return () => clearInterval(timer);
  }, [hasInteracted]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (!loadHowVideo) return;
    videoRef.current?.load();
  }, [loadHowVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !loadHowVideo) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [loadHowVideo]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 bg-white overflow-hidden rounded-[48px]"
    >
      {/* Premium Background elements */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-blue-50 rounded-full blur-[160px]"
        />
        <div
          className="absolute bottom-0 right-1/4 w-[50%] h-[50%] bg-blue-50 rounded-full blur-[160px]"
        />

        {/* Abstract Data Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.08] text-primary-blue" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M0 20 Q 25 10, 50 20 T 100 20" stroke="currentColor" strokeWidth="0.05" fill="none"
          />
          <path
            d="M0 50 Q 25 40, 50 50 T 100 50" stroke="currentColor" strokeWidth="0.05" fill="none"
          />
          <path
            d="M0 80 Q 25 70, 50 80 T 100 80" stroke="currentColor" strokeWidth="0.05" fill="none"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("howItWorks.badge")}</span>
          </div>

          <SectionTitleHero
            variant="light"
            className="mb-6 items-center text-center"
            line1={t("howItWorks.titleLine1")}
            highlight={t("howItWorks.titleHighlight")}
          />

          {t("howItWorks.subtitle").trim() ? (
            <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
              {t("howItWorks.subtitle")}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Steps Timeline */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              const isPast = index < activeStep;
              const isFuture = index > activeStep;

              return (
                <button
                  key={index}
                  onClick={() => {
                    setActiveStep(index);
                    setHasInteracted(true);
                  }}
                  className={cn(
                    "w-full text-left group relative p-5 rounded-[2rem] transition-all duration-700 border overflow-hidden",
                    isActive
                      ? "bg-white border-blue-100 shadow-[0_20px_50px_-20px_rgba(59,130,246,0.15)]"
                      : isPast
                        ? "bg-slate-50 opacity-80 border-slate-100"
                        : "border-transparent bg-transparent hover:bg-slate-50 opacity-60"
                  )}
                >
                  {/* Step Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[2.85rem] top-20 w-0.5 h-12 bg-slate-100 z-0" />
                  )}

                  <div className="flex items-center gap-5 relative z-10">
                    <div className={cn(
                      "w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center transition-all duration-700 relative",
                      isActive || isPast
                        ? `bg-gradient-to-br ${step.color} text-white shadow-[0_5px_15px_rgba(59,130,246,0.2)]`
                        : "bg-slate-100 text-slate-400 group-hover:text-slate-600"
                    )}>
                      <Icon className="w-6 h-6" />
                      {isPast && (
                        <div
                          className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white"
                        >
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={cn(
                          "font-bold text-lg transition-all duration-500",
                          isActive || isPast ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"
                        )}>
                          {step.title}
                        </h4>
                        {isActive && (
                          <div className="text-blue-500">
                            <Sparkles className="w-5 h-5 animate-pulse" />
                          </div>
                        )}
                      </div>

                      {(isActive || isPast) && (
                        <p
                          className={cn(
                            "text-sm leading-relaxed mt-2 transition-colors duration-500",
                            isActive ? "text-slate-600" : "text-slate-400"
                          )}
                        >
                          {step.description}
                        </p>
                      )}
                      {isFuture && (
                        <p className="text-sm text-slate-400 line-clamp-1 group-hover:text-slate-500 transition-colors">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Video Player Container */}
          <div className="lg:col-span-7 relative group">
            <div className="relative p-2 rounded-[40px] bg-white border border-slate-100 shadow-2xl overflow-hidden">
              <div
                ref={lazyVideoWrapRef}
                className="relative aspect-video rounded-[32px] overflow-hidden bg-slate-900"
              >
                <video
                  ref={videoRef}
                  src={loadHowVideo ? HOW_IT_WORKS_VIDEO : undefined}
                  className="w-full h-full object-cover"
                  loop
                  muted={isMuted}
                  playsInline
                  preload="none"
                />

                {!isPlaying && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
                    <button
                      onClick={togglePlay}
                      className="w-24 h-24 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white shadow-2xl group/play"
                    >
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-500 group-hover/play:scale-105 group-hover/play:shadow-[0_0_50px_rgba(255,255,255,0.6)]">
                        <Play className="w-8 h-8 fill-current ml-1" />
                      </div>
                    </button>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 z-30 p-6 flex flex-col gap-4 transition-all duration-500 group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100">
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden relative">
                    <div
                      className="absolute inset-y-0 left-0 bg-blue-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={togglePlay}
                        className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/30 transition-all active:scale-90"
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/30 transition-all active:scale-90"
                      >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
