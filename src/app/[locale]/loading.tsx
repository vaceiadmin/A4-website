"use client";

import React from "react";
import Image from "next/image";

export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-background pointer-events-none">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <Image
            src="/assets/images/Logo.png"
            alt="Loading..."
            fill
            priority
            sizes="64px"
            className="object-contain opacity-20 animate-pulse"
          />
        </div>
        <div className="w-32 h-0.5 bg-primary/10 rounded-full overflow-hidden relative">
          <div className="absolute inset-0 bg-primary-blue w-full -translate-x-full animate-[loading-bar_1.5s_infinite_ease-in-out]" />
        </div>
      </div>
      <style jsx global>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
