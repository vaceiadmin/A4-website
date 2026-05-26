"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useLazyMedia } from "@/hooks/use-lazy-media";

interface ServiceVideoSectionProps {
  title: string;
  videoUrl?: string;
}

const FALLBACK_URL = "/assets/videos/Main Render.gif";

const ServiceVideoSection: React.FC<ServiceVideoSectionProps> = ({
  title,
  videoUrl,
}) => {
  const { t } = useTranslation("services");
  const [sourceFailed, setSourceFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const effectiveVideoUrl =
    videoUrl && !sourceFailed ? videoUrl : FALLBACK_URL;
  const isGif = effectiveVideoUrl.toLowerCase().endsWith(".gif");
  const { ref: lazyRef, shouldLoad } = useLazyMedia();

  useEffect(() => {
    setSourceFailed(false);
  }, [videoUrl]);

  useEffect(() => {
    if (!shouldLoad || isGif) return;
    videoRef.current?.load();
  }, [shouldLoad, isGif]);

  return (
    <section className="mt-6 mb-2">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div
          ref={lazyRef}
          className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#020617]"
        >
          {effectiveVideoUrl ? (
            <>
              {isGif ? (
                <Image
                  src={effectiveVideoUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 896px"
                  loading="lazy"
                  decoding="async"
                  unoptimized
                  onError={() => setSourceFailed(true)}
                />
              ) : (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  src={shouldLoad ? effectiveVideoUrl : undefined}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  onError={() => setSourceFailed(true)}
                />
              )}

              {/* Gradient overlay for readability */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-black/0" />

              {/* Title text */}
              <div className="absolute left-5 bottom-5 z-10 max-w-[70%]">
                <p className="text-xs uppercase tracking-[0.16em] text-white/70 mb-1">
                  {t("shared.videoLabel")}
                </p>
                <h2 className="text-white text-lg md:text-xl font-medium leading-snug line-clamp-2">
                  {title}
                </h2>
              </div>
            </>
          ) : (
            <div className="relative w-full h-full border border-dashed border-white/20 bg-slate-900 flex items-center justify-center">
              <p className="text-xs md:text-sm text-slate-200/70 text-center px-6">
                {t("shared.videoPlaceholder")}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceVideoSection;

