"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function MainGifLoaderGate({ children }: Props) {
  const [isDone, setIsDone] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isDone) return;

    const v = videoRef.current;
    if (!v) return;

    v.play().catch(() => {
      // Autoplay can still be blocked in some environments; we still hide via timeout.
    });
  }, [isDone]);

  useEffect(() => {
    if (isDone) return;

    const t = window.setTimeout(() => {
      const v = videoRef.current;
      if (v) {
        v.pause();
        v.currentTime = 4;
      }
      setIsDone(true);
    }, 4000);

    return () => window.clearTimeout(t);
  }, [isDone]);

  if (isDone) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-9999 bg-black">
      <video
        ref={videoRef}
        className="h-screen w-screen object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => setIsDone(true)}
      >
        <source src="/assets/videos/Main-v.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

