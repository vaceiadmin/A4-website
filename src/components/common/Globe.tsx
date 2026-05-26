"use client";

import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const EU_MARKERS = [
  { location: [48.2082, 16.3738], size: 0.05 }, // Austria
  { location: [50.8503, 4.3517], size: 0.05 }, // Belgium
  { location: [42.6977, 23.3219], size: 0.05 }, // Bulgaria
  { location: [45.815, 15.9819], size: 0.05 }, // Croatia
  { location: [35.1856, 33.3823], size: 0.05 }, // Cyprus
  { location: [50.0755, 14.4378], size: 0.05 }, // Czech Republic
  { location: [55.6761, 12.5683], size: 0.05 }, // Denmark
  { location: [59.437, 24.7536], size: 0.05 }, // Estonia
  { location: [60.1699, 24.9384], size: 0.05 }, // Finland
  { location: [48.8566, 2.3522], size: 0.07 }, // France
  { location: [52.52, 13.405], size: 0.07 }, // Germany
  { location: [37.9838, 23.7275], size: 0.05 }, // Greece
  { location: [47.4979, 19.0402], size: 0.05 }, // Hungary
  { location: [53.3498, -6.2603], size: 0.05 }, // Ireland
  { location: [41.9028, 12.4964], size: 0.07 }, // Italy
  { location: [56.9496, 24.1052], size: 0.05 }, // Latvia
  { location: [54.6872, 25.2797], size: 0.05 }, // Lithuania
  { location: [49.6116, 6.1319], size: 0.05 }, // Luxembourg
  { location: [35.8997, 14.5147], size: 0.05 }, // Malta
  { location: [52.3676, 4.9041], size: 0.05 }, // Netherlands
  { location: [52.2297, 21.0122], size: 0.05 }, // Poland
  { location: [38.7223, -9.1393], size: 0.05 }, // Portugal
  { location: [44.4268, 26.1025], size: 0.05 }, // Romania
  { location: [48.1486, 17.1077], size: 0.05 }, // Slovakia
  { location: [46.0569, 14.5058], size: 0.05 }, // Slovenia
  { location: [40.4168, -3.7038], size: 0.07 }, // Spain
  { location: [59.3293, 18.0686], size: 0.05 }, // Sweden
];

const EU_CONNECTIONS = [
  { location: [48.8566, 2.3522], endLocation: [52.52, 13.405] }, // Paris to Berlin
  { location: [41.9028, 12.4964], endLocation: [52.3676, 4.9041] }, // Rome to Amsterdam
  { location: [40.4168, -3.7038], endLocation: [48.8566, 2.3522] }, // Madrid to Paris
  { location: [52.2297, 21.0122], endLocation: [52.52, 13.405] }, // Warsaw to Berlin
  { location: [48.2082, 16.3738], endLocation: [41.9028, 12.4964] }, // Vienna to Rome
  { location: [59.3293, 18.0686], endLocation: [52.3676, 4.9041] }, // Stockholm to Amsterdam
  { location: [37.9838, 23.7275], endLocation: [41.9028, 12.4964] }, // Athens to Rome
];

const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [opacity, setOpacity] = React.useState(0);
  
  const r = useSpring(0, {
    mass: 1,
    stiffness: 280,
    damping: 40,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;
    let width = 0;
    
    // Check for WebGL support
    const gl = canvasRef.current.getContext("webgl") || canvasRef.current.getContext("experimental-webgl");
    if (!gl) {
      console.warn("WebGL not supported, globe will not be rendered.");
      return;
    }

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth || canvasRef.current.parentElement?.offsetWidth || 500;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    // Force initialization width if zero
    if (width === 0) width = 500;

    let globe: any;
    try {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.3,
        dark: 0, // Light mode
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [1, 1, 1],
        markerColor: [0.1, 0.4, 0.9], // Primary blue
        glowColor: [1, 1, 1],
        markers: EU_MARKERS as any,
        arcs: EU_CONNECTIONS as any,
        onRender: (state: any) => {
          if (!pointerInteracting.current) {
            phi += 0.005;
          }
          state.phi = phi + r.get();
          state.width = width * 2;
          state.height = width * 2;
        },
      } as any);

      // Show the globe once initialized
      setTimeout(() => setOpacity(1), 200);
    } catch (e) {
      console.error("Error creating globe:", e);
    }

    return () => {
      if (globe) {
        globe.destroy();
      }
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className={cn("group relative flex items-center justify-center", className)}
      style={{
        width: "100%",
        aspectRatio: "1/1",
        maxWidth: 600,
        margin: "auto",
      }}
    >
      {/* 3D Depth Overlays - Magic UI / Light Mode optimized */}
      <div className="absolute inset-0 pointer-events-none rounded-full transition-opacity duration-1000" style={{ opacity }}>
        {/* Subtle background sphere for contrast on pure white */}
        <div className="absolute inset-[10%] rounded-full bg-slate-50 shadow-[inset_0_0_80px_rgba(59,130,246,0.08),0_0_40px_rgba(59,130,246,0.05)] border border-slate-100/50" />
        {/* Atmosphere Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
      </div>

      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          canvasRef.current!.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          canvasRef.current!.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          canvasRef.current!.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            r.set(delta / 200);
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          contain: "layout paint size",
          opacity: opacity,
          transition: "opacity 1s ease",
          zIndex: 1,
        }}
      />

      {/* Rotating UI / Interaction Hint */}
      <div className={cn(
        "absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10 transition-all duration-300 transform",
        opacity > 0 ? "opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0" : "opacity-0"
      )}>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/50 shadow-md whitespace-nowrap">
           <svg className="w-3.5 h-3.5 text-blue-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
           </svg>
           <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Drag to Explore Europe</span>
        </div>
      </div>
    </div>
  );
};

export default Globe;
