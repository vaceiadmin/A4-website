"use client";

import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { motion } from "framer-motion";
import { 
  FileText, 
  FileSpreadsheet, 
  FileDown, 
  Calculator, 
  Landmark, 
  ShieldCheck, 
  User
} from "lucide-react";
import { useReduceMotion, usePerformance } from "@/contexts/ReduceMotionContext";


import { useDirectionalInView } from "@/hooks/use-directional-in-view";

// Reusable Circle Component with Label and Animation
const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; label?: string; delay?: number }
>(({ className, children, label, delay = 0 }, ref) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const isInView = useDirectionalInView(rootRef);
  const { reduceMotion, isIPhone, isLowPerformance } = usePerformance();

  // Beams measure circle centers; labels stay outside this ref box
  useImperativeHandle(ref, () => circleRef.current!);

  if (reduceMotion) {
    return (
      <div
        ref={rootRef}
        className="flex min-w-[50px] flex-col items-center gap-1 sm:min-w-[70px] sm:gap-1.5"
      >
        <div
          ref={circleRef}
          className={cn(
            "z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm transition-all hardware-accelerated sm:h-14 sm:w-14",
            className
          )}
        >
          <div className="scale-75 sm:scale-100">{children}</div>
        </div>
        {label && (
          <span className="max-w-[55px] text-center text-[7px] font-bold uppercase leading-tight tracking-tight text-gray-500 sm:max-w-[80px] sm:text-[9px] sm:tracking-wider">
            {label}
          </span>
        )}
      </div>
    );
  }

  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay: isIPhone ? 0 : delay * 0.1 }}
      className="flex min-w-[50px] flex-col items-center gap-1 sm:min-w-[70px] sm:gap-1.5"
    >
      <motion.div
        ref={circleRef}
        animate={
          isInView && !isIPhone && !isLowPerformance
            ? {
                y: [0, -6, 0],
              }
            : { y: 0 }
        }
        transition={{
          duration: 4,
          repeat: 0,
          ease: "easeInOut",
          delay: delay,
        }}
        className={cn(
          "z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm transition-all hover:scale-110 hover:border-primary-blue/30 hover:shadow-lg hover:shadow-primary-blue/10 hardware-accelerated sm:h-14 sm:w-14",
          className
        )}
      >
        <div className="scale-75 sm:scale-100">{children}</div>
      </motion.div>
      {label && (
        <span className="max-w-[55px] text-center text-[7px] font-bold uppercase leading-tight tracking-tight text-gray-500 sm:max-w-[80px] sm:text-[9px] sm:tracking-wider">
          {label}
        </span>
      )}
    </motion.div>
  );
});

Circle.displayName = "Circle";

export default function AuditPlatformBeam({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isIPhone, isLowPerformance } = usePerformance();

  // Refs for logic flow

  // Column 1: Docs
  const doc1Ref = useRef<HTMLDivElement>(null);
  const doc2Ref = useRef<HTMLDivElement>(null);
  const doc3Ref = useRef<HTMLDivElement>(null);
  
  // Column 2: Services
  const service1Ref = useRef<HTMLDivElement>(null);
  const service2Ref = useRef<HTMLDivElement>(null);
  const service3Ref = useRef<HTMLDivElement>(null);
  
  // Column 3: Portal (Center)
  const portalRef = useRef<HTMLDivElement>(null);
  
  // Column 4: Client
  const clientRef = useRef<HTMLDivElement>(null);

  /** Fine-tune Portal→Client beam on narrow widths after circle-only refs */
  const [portalClientEndY, setPortalClientEndY] = useState(0);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setPortalClientEndY(-4);
      else if (w < 1024) setPortalClientEndY(-2);
      else setPortalClientEndY(0);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        className
      )}
      ref={containerRef}
    >
      <div className="flex h-full w-full flex-row items-center justify-between gap-1 sm:gap-2 px-1 sm:px-8">
        
        {/* Column 1: Docs */}
        <div className="flex flex-col justify-around h-full py-4 sm:py-8">
          <Circle ref={doc1Ref} label="PDF" delay={0.1}>
            <FileDown className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
          </Circle>
          <Circle ref={doc2Ref} label="Excel" delay={0.3}>
            <FileSpreadsheet className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
          </Circle>
          <Circle ref={doc3Ref} label="Word" delay={0.5}>
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
          </Circle>
        </div>

        {/* Column 2: Services */}
        <div className="flex flex-col justify-around h-full py-6 sm:py-12">
          <Circle ref={service1Ref} label="Accounting" delay={0.7}>
            <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </Circle>
          <Circle ref={service2Ref} label="Tax" delay={0.9}>
            <Landmark className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </Circle>
          <Circle ref={service3Ref} label="Audit" delay={1.1}>
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </Circle>
        </div>

        {/* Column 3: Portal (Vacei) */}
        <div className="flex flex-col justify-center h-full">
          <Circle 
            ref={portalRef} 
            label="Portal"
            delay={1.5}
            className="h-14 w-14 sm:h-20 sm:w-20 border-primary-blue/30 p-2 sm:p-3 bg-white shadow-2xl z-20"
          >
            <Image 
              src="/assets/images/Logo.png" 
              alt="VACEI" 
              width={60} 
              height={60} 
              className="object-contain" 
            />
          </Circle>
        </div>

        {/* Column 4: Client — match Portal circle size on mobile for visual parity */}
        <div className="flex h-full flex-col justify-center">
          <Circle
            ref={clientRef}
            label="Client"
            delay={2}
            className="h-14 w-14 border-primary-blue/25 bg-white shadow-md sm:h-20 sm:w-20 sm:shadow-2xl"
          >
            <div className="rounded-full bg-primary-blue/10 p-1.5 sm:p-2">
              <User className="h-6 w-6 text-primary-blue sm:h-7 sm:w-7" />
            </div>
          </Circle>
        </div>

      </div>

      {/* Beams: Docs -> Services */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={doc1Ref}
        toRef={service1Ref}
        duration={1.8}
        repeat={Infinity}
        curvature={0}
        pathColor="#94a3b8"
        pathOpacity={0.1}
        gradientStartColor="#ef4444"
        gradientStopColor="#3b49e6"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={doc2Ref}
        toRef={service2Ref}
        duration={1.8}
        delay={0.5}
        repeat={Infinity}
        curvature={0}
        pathColor="#94a3b8"
        pathOpacity={0.1}
        gradientStartColor="#22c55e"
        gradientStopColor="#3b49e6"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={doc3Ref}
        toRef={service3Ref}
        duration={1.8}
        delay={1}
        repeat={Infinity}
        curvature={0}
        pathColor="#94a3b8"
        pathOpacity={0.1}
        gradientStartColor="#3b49e6"
        gradientStopColor="#3b49e6"
      />


      {/* Beams: Services -> Portal */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={service1Ref}
        toRef={portalRef}
        duration={2}
        repeat={Infinity}
        curvature={15}
        pathColor="#94a3b8"
        pathOpacity={0.1}
        gradientStartColor="#3b49e6"
        gradientStopColor="#3b49e6"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={service2Ref}
        toRef={portalRef}
        duration={2}
        delay={0.7}
        repeat={Infinity}
        curvature={0}
        pathColor="#94a3b8"
        pathOpacity={0.1}
        gradientStartColor="#3b49e6"
        gradientStopColor="#3b49e6"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={service3Ref}
        toRef={portalRef}
        duration={2}
        delay={1.4}
        repeat={Infinity}
        curvature={-15}
        pathColor="#94a3b8"
        pathOpacity={0.1}
        gradientStartColor="#3b49e6"
        gradientStopColor="#3b49e6"
      />


      {/* Beam: Portal -> Client */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={portalRef}
        toRef={clientRef}
        duration={1.8}
        repeat={Infinity}
        curvature={0}
        pathColor="#94a3b8"
        pathOpacity={0.15}
        pathWidth={3}
        gradientStartColor="#3b49e6"
        gradientStopColor="#3b49e6"
        endYOffset={portalClientEndY}
      />

    </div>
  );
}
