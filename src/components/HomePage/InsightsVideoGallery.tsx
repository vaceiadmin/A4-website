"use client";

import React, {
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  INSIGHTS_RESOURCES_YOUTUBE_IDS,
  youtubeEmbedUrl,
  youtubeThumbUrl,
} from "@/data/video";
import { cn } from "@/lib/utils";

const IO_ROOT_MARGIN = "150px 0px 200px 0px";

type PlaylistItem = { title: string };

type InsightsVideoGalleryProps = {
  isDark?: boolean;
};

function InsightsVideoGalleryInner({ isDark = true }: InsightsVideoGalleryProps) {
  const { t } = useTranslation("home");
  const headingId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [hasSelectedVideo, setHasSelectedVideo] = useState(false);
  const [inView, setInView] = useState(false);
  const [userActivatedEmbed, setUserActivatedEmbed] = useState(false);

  const playlist = useMemo(() => {
    const raw = t("insightsResources.videoPlaylist", {
      returnObjects: true,
    }) as PlaylistItem[] | string;
    return Array.isArray(raw) ? raw : [];
  }, [t]);

  const ids = INSIGHTS_RESOURCES_YOUTUBE_IDS;
  const activeId = ids[activeIndex] ?? ids[0];

  const embedMounted = inView || userActivatedEmbed;

  const embedSrc = useMemo(
    () => youtubeEmbedUrl(activeId, hasSelectedVideo),
    [activeId, hasSelectedVideo]
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: IO_ROOT_MARGIN, threshold: 0 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const selectVideo = useCallback((index: number) => {
    setUserActivatedEmbed(true);
    setHasSelectedVideo(true);
    setActiveIndex(index);
  }, []);

  const onPosterActivate = useCallback(() => {
    setUserActivatedEmbed(true);
    setHasSelectedVideo(true);
  }, []);

  const currentTitle =
    playlist[activeIndex]?.title ?? t("insightsResources.videoModalHint");

  const posterSrc = youtubeThumbUrl(activeId);

  return (
    <div
      id="insights-video-gallery"
      className="mt-10 scroll-mt-28 sm:mt-12"
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="sr-only">
        {t("insightsResources.videoModalHint")}
      </h2>
      <div
        ref={rootRef}
        className={cn(
          "relative overflow-hidden rounded-[2rem]",
          isDark
            ? "border border-white/[0.1] bg-gradient-to-b from-[#11131c] via-[#0c0d12] to-[#08090c] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.05)_inset] before:pointer-events-none before:absolute before:inset-0 before:rounded-[2rem] before:bg-[radial-gradient(ellipse_90%_55%_at_50%_-30%,rgba(59,130,246,0.12),transparent_55%)]"
            : "border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/80 to-white shadow-[0_24px_60px_-20px_rgba(15,23,42,0.12),0_0_0_1px_rgba(255,255,255,0.9)_inset] before:pointer-events-none before:absolute before:inset-0 before:rounded-[2rem] before:bg-[radial-gradient(ellipse_90%_55%_at_50%_-20%,rgba(59,130,246,0.08),transparent_55%)]"
        )}
      >
        <div className="relative flex min-h-0 flex-col lg:flex-row">
          <div className="order-1 flex min-h-0 flex-1 flex-col lg:order-2">
            <div
              className={cn(
                "border-b px-4 py-3.5 sm:px-6",
                isDark ? "border-white/[0.08] bg-black/35" : "border-slate-200/80 bg-white/90"
              )}
            >
              <div className="flex min-w-0 items-baseline justify-between gap-3">
                <h3
                  className={cn(
                    "truncate text-sm font-semibold sm:text-base",
                    isDark ? "text-white" : "text-slate-900"
                  )}
                >
                  {currentTitle}
                </h3>
                <span
                  className={cn(
                    "shrink-0 tabular-nums text-[11px] font-medium uppercase tracking-wider",
                    isDark ? "text-slate-500" : "text-slate-500"
                  )}
                  aria-live="polite"
                >
                  {activeIndex + 1} / {ids.length}
                </span>
              </div>
            </div>

            <div
              className={cn(
                "relative flex-1 p-3 sm:p-4 lg:p-5",
                isDark ? "bg-[#020203]" : "bg-slate-100/80"
              )}
            >
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl",
                  isDark
                    ? "ring-1 ring-white/[0.08] shadow-[0_32px_64px_-32px_rgba(0,0,0,0.9)] before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:rounded-2xl before:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                    : "ring-1 ring-slate-200/90 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.2)]"
                )}
              >
                <div className="relative aspect-video w-full min-h-[200px] bg-black sm:min-h-[260px]">
                  {embedMounted ? (
                    <iframe
                      key={`${activeIndex}-${hasSelectedVideo}`}
                      title={currentTitle}
                      src={embedSrc}
                      className="absolute inset-0 z-0 h-full w-full"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={onPosterActivate}
                      className={cn(
                        "group/poster absolute inset-0 z-0 flex h-full w-full flex-col items-center justify-center overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                        isDark ? "focus-visible:ring-offset-[#0c0d12]" : "focus-visible:ring-offset-slate-100"
                      )}
                      aria-label={t("insightsResources.watchVideo")}
                    >
                      <img
                        src={posterSrc}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />
                      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-black/50 text-white shadow-xl ring-2 ring-white/30 backdrop-blur-sm transition group-hover/poster:scale-105 group-hover/poster:ring-white/50">
                        <Play
                          className="h-8 w-8 pl-1 text-white"
                          strokeWidth={1.75}
                        />
                      </span>
                      <span className="relative mt-4 max-w-[90%] truncate text-center text-sm font-semibold text-white/95">
                        {currentTitle}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <aside
            className={cn(
              "order-2 flex flex-row gap-3 overflow-x-auto border-t p-4 sm:p-5 lg:order-1 lg:w-[min(100%,280px)] lg:shrink-0 lg:flex-col lg:overflow-y-auto lg:overflow-x-visible lg:border-r lg:border-t-0",
              "[scrollbar-width:thin] [scrollbar-color:rgba(100,116,139,0.35)_transparent]",
              "max-h-[min(42vh,24rem)] snap-x snap-mandatory lg:max-h-[min(70vh,520px)] lg:snap-none",
              isDark ? "border-white/[0.06] bg-black/40" : "border-slate-200/80 bg-slate-50/90"
            )}
            aria-label={t("insightsResources.videoModalHint")}
          >
            {ids.map((id, i) => {
              const label = playlist[i]?.title ?? `Video ${i + 1}`;
              const selected = i === activeIndex;
              const thumbPriority = i === 0 ? "high" : "low";
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => selectVideo(i)}
                  aria-pressed={selected}
                  aria-label={label}
                  aria-current={selected ? "true" : undefined}
                  className={cn(
                    "group/thumb flex w-[min(260px,78vw)] shrink-0 snap-start flex-col gap-2.5 rounded-2xl p-2 text-left transition-all duration-300 lg:w-full",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-2",
                    isDark ? "focus-visible:ring-offset-[#0c0d12]" : "focus-visible:ring-offset-slate-100",
                    selected
                      ? isDark
                        ? "bg-gradient-to-b from-blue-500/20 to-blue-600/10 shadow-[0_0_0_1px_rgba(59,130,246,0.55),0_12px_40px_-12px_rgba(59,130,246,0.35)]"
                        : "bg-white shadow-[0_0_0_1px_rgba(59,130,246,0.45),0_14px_36px_-14px_rgba(37,99,235,0.25)]"
                      : isDark
                        ? "bg-white/[0.05] hover:bg-white/[0.09] hover:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)]"
                        : "bg-white/80 hover:bg-white hover:shadow-md"
                  )}
                >
                  <div
                    className={cn(
                      "relative aspect-video w-full overflow-hidden rounded-xl",
                      selected
                        ? "ring-2 ring-blue-500/60"
                        : isDark
                          ? "ring-1 ring-white/20"
                          : "ring-1 ring-slate-300/80"
                    )}
                  >
                    <img
                      src={youtubeThumbUrl(id)}
                      alt=""
                      className="h-full w-full object-cover transition duration-300 group-hover/thumb:scale-[1.03]"
                      loading={i < 2 ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={thumbPriority}
                    />
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-90 transition-opacity duration-300",
                        selected ? "opacity-100" : "opacity-70 group-hover/thumb:opacity-90"
                      )}
                    />
                    {!selected && (
                      <span
                        className={cn(
                          "absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover/thumb:opacity-100"
                        )}
                        aria-hidden
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white shadow-lg ring-2 ring-white/25 backdrop-blur-sm">
                          <Play className="h-5 w-5 fill-white pl-0.5" />
                        </span>
                      </span>
                    )}
                    {selected && (
                      <span className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 rounded-md bg-blue-600/95 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg backdrop-blur-sm">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-white opacity-60" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                        </span>
                        {t("insightsResources.videoNowPlaying")}
                      </span>
                    )}
                  </div>
                  <span
                    className={cn(
                      "line-clamp-2 px-0.5 text-[13px] font-semibold leading-snug tracking-tight",
                      selected
                        ? isDark
                          ? "text-white"
                          : "text-slate-900"
                        : isDark
                          ? "text-slate-300 group-hover/thumb:text-slate-100"
                          : "text-slate-600 group-hover/thumb:text-slate-900"
                    )}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </aside>
        </div>
      </div>
    </div>
  );
}

const InsightsVideoGallery = memo(InsightsVideoGalleryInner);
export default InsightsVideoGallery;
