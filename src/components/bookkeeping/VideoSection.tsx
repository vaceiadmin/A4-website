"use client";

import React, { useState, useRef } from "react";
import { CheckCircle2, AlertCircle, Play } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function VideoSection() {
  const { t } = useTranslation("services");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;

    if (!el.paused) {
      el.pause();
      return;
    }

    setIsLoading(true);
    const playPromise = el.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsLoading(false);
          setIsError(false);
        })
        .catch((error) => {
          console.error("Playback failed:", error);
          setIsLoading(false);
          // Only set error if it's not a standard interruption
          if (error?.name !== "AbortError") {
            setIsError(true);
          }
        });
    }
  };

  return (
    <div className="video-wrap">
      <div className="section-inner" style={{ width: "100%" }}>
        <span className="eyebrow-dark">{t("bookkeeping.video.eyebrow")}</span>
        <h2 className="section-h">{t("bookkeeping.video.title")}</h2>
        <p className="section-p mb-6">{t("bookkeeping.video.desc")}</p>

        <div className={`video-frame ${isLoading ? "is-loading" : ""}`}>
          {isError ? (
            <div className="flex flex-col items-center justify-center text-center p-8 text-white/50">
              <AlertCircle size={48} className="mb-4 opacity-20" />
              <p className="text-sm">Video unavailable. Please check your connection or Git LFS status.</p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                loop
                muted={false}
                playsInline
                className="video-embed"
                preload="metadata"
                onClick={togglePlay}
                onError={() => setIsError(true)}
                onLoadStart={() => setIsLoading(true)}
                onCanPlay={() => setIsLoading(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src="/assets/videos/Talking Head_LFV1.1.mp4#t=0.001" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {!isPlaying && !isLoading && (
                <div className="video-overlay" aria-hidden>
                  <button
                    type="button"
                    className="video-pause-btn"
                    aria-label="Play"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                  >
                    <Play size={34} fill="currentColor" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <ul className="video-points mt-6">
          <li>
            <CheckCircle2 size={16} className="text-blue-500" /> {t("bookkeeping.video.point1")}
          </li>
          <li>
            <CheckCircle2 size={16} className="text-blue-500" /> {t("bookkeeping.video.point2")}
          </li>
          <li>
            <CheckCircle2 size={16} className="text-blue-500" /> {t("bookkeeping.video.point3")}
          </li>
          <li>
            <CheckCircle2 size={16} className="text-blue-500" /> {t("bookkeeping.video.point4")}
          </li>
        </ul>
        <p className="video-note">{t("bookkeeping.video.note")}</p>
      </div>
    </div>
  );
}
