"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePerformance } from "@/contexts/ReduceMotionContext";

type IntroAnimationProps = {
  onComplete?: () => void;
};

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const { reduceMotion, isIPhone, isLowPerformance } = usePerformance();

  useEffect(() => {
    // Progress animation – faster so intro doesn't feel paused
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // ~0.5s to reach 100%
        return prev + 8;
      });
    }, 40);

    // Hide intro sooner so page appears quickly
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 800);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  // Generate particles - reduced count for performance
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    x: Math.random() * 400 - 200,
    y: Math.random() * 400 - 200,
    scale: 0.3 + Math.random() * 0.7,
  }));

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
          }}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-[#020410] overflow-hidden"
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(59, 73, 230, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 73, 230, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }} />
          </div>

          {/* Floating Particles - Optimized */}
          {(isIPhone || isLowPerformance ? particles.slice(0, 4) : particles).map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, particle.scale, 0],
                x: [0, particle.x],
                y: [0, particle.y],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-1 h-1 bg-primary-blue rounded-full"
              style={{
                boxShadow: '0 0 8px rgba(59, 73, 230, 0.8)',
                willChange: 'transform, opacity',
              }}
            />
          ))}

          {/* Main Content Container */}
          <div className="relative flex flex-col items-center">
            {/* Geometric Shapes Container */}
            <div className="relative w-[500px] h-[500px] flex items-center justify-center">

              {/* Expanding Wave Ripples - Reduced for performance */}
              {(isIPhone || isLowPerformance ? [0] : [0, 1]).map((index) => (
                <motion.div
                  key={`wave-${index}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 2.5],
                    opacity: [0.6, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 1.5,
                    ease: "easeOut",
                  }}
                  className="absolute w-[200px] h-[200px] rounded-full border-2 border-primary-blue/40"
                  style={{
                    boxShadow: '0 0 20px rgba(59, 73, 230, 0.4)',
                    willChange: 'transform, opacity',
                  }}
                />
              ))}

              {/* Morphing Hexagon to Square */}
              <motion.div
                animate={isIPhone || isLowPerformance ? { rotate: 360 } : {
                  rotate: [0, 180, 360],
                  borderRadius: ["30%", "10%", "30%"],
                }}
                transition={{
                  duration: isIPhone || isLowPerformance ? 6 : 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute w-[280px] h-[280px] border-2 border-primary-blue/20"
                style={{
                  boxShadow: isIPhone || isLowPerformance ? 'none' : '0 0 30px rgba(59, 73, 230, 0.2)',
                  willChange: 'transform',
                }}
              />

              {/* Inner Morphing Shape */}
              <motion.div
                animate={isIPhone || isLowPerformance ? { rotate: 0 } : {
                  rotate: [360, 180, 0],
                  borderRadius: ["10%", "50%", "10%"],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-[180px] h-[180px] border-2 border-cyan-400/30"
                style={{
                  boxShadow: isIPhone || isLowPerformance ? 'none' : '0 0 25px rgba(34, 211, 238, 0.3)',
                  willChange: 'transform',
                }}
              />

              {/* Floating Corner Dots - Optimized */}
              {(isIPhone || isLowPerformance ? [
                { x: -100, y: -100, delay: 0, color: 'bg-primary-blue' },
                { x: 100, y: 100, delay: 1, color: 'bg-primary-blue' },
              ] : [
                { x: -100, y: -100, delay: 0, color: 'bg-primary-blue' },
                { x: 100, y: -100, delay: 0.5, color: 'bg-cyan-400' },
                { x: 100, y: 100, delay: 1, color: 'bg-primary-blue' },
                { x: -100, y: 100, delay: 1.5, color: 'bg-primary-blue' },
              ]).map((dot, index) => (
                <motion.div
                  key={`dot-${index}`}
                  animate={{
                    x: [dot.x, dot.x * 1.2, dot.x],
                    y: [dot.y, dot.y * 1.2, dot.y],
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: dot.delay,
                    ease: "easeInOut",
                  }}
                  className={`absolute w-2 h-2 ${dot.color} rounded-full`}
                  style={{
                    boxShadow: '0 0 15px currentColor',
                    willChange: 'transform, opacity',
                  }}
                />
              ))}

              {/* Particle Trails - Reduced for performance */}
              {[...Array(isIPhone || isLowPerformance ? 2 : 6)].map((_, index) => {
                const angle = (index * 360) / 6;
                return (
                  <motion.div
                    key={`trail-${index}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 0.8, 0],
                      x: [0, Math.cos(angle * Math.PI / 180) * 150],
                      y: [0, Math.sin(angle * Math.PI / 180) * 150],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.33,
                      ease: "easeOut",
                    }}
                    className="absolute w-1.5 h-1.5 bg-primary-blue rounded-full"
                    style={{
                      boxShadow: '0 0 10px rgba(59, 73, 230, 0.8)',
                      willChange: 'transform, opacity',
                    }}
                  />
                );
              })}

              {/* Center Logo Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 0,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative z-10"
              >
                <div className="relative flex items-center justify-center">
                  <div className="relative w-[220px] h-[80px] md:w-[260px] md:h-[95px]">
                    <Image
                      src="/assets/images/Logo.png"
                      alt="VACEI logo"
                      fill
                      priority
                      sizes="260px"
                      className="object-contain drop-shadow-[0_0_30px_rgba(59,73,230,0.5)]"
                    />
                  </div>

                  {/* Shine Effect */}
                  <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{
                      x: "200%",
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      delay: 1.5,
                      duration: 1.2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent skew-x-12 pointer-events-none"
                    style={{
                      willChange: "transform, opacity",
                    }}
                  />
                </div>

                {/* Pulsing Glow Effect */}
                <motion.div
                  animate={isIPhone || isLowPerformance ? { opacity: 0.4 } : {
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.95, 1.05, 0.95],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-primary-blue/20 blur-3xl -z-10 rounded-full"
                  style={{
                    willChange: "transform, opacity",
                  }}
                />
              </motion.div>
            </div>

            {/* Loading Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8 flex flex-col items-center gap-3"
            >
              <p className="text-white/50 text-xs tracking-[0.3em] uppercase font-medium">
                Loading Experience
              </p>

              <div className={`relative w-64 h-1 bg-white/5 rounded-full overflow-hidden ${isIPhone || isLowPerformance ? "" : "backdrop-blur-sm"}`}>
                {/* Background glow */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-primary-blue/20 blur-md"
                />

                {/* Progress fill */}
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  className="relative h-full bg-linear-to-r from-primary-blue via-cyan-400 to-primary-blue rounded-full"
                  style={{
                    boxShadow: '0 0 20px rgba(59, 73, 230, 0.8), 0 0 40px rgba(59, 73, 230, 0.4)',
                  }}
                >
                  {/* Shimmer effect on progress bar */}
                  <motion.div
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent"
                  />
                </motion.div>
              </div>

              {/* Percentage */}
              <motion.p
                className="text-white/40 text-xs font-mono"
              >
                {progress}%
              </motion.p>
            </motion.div>
          </div>

          {/* Corner Accents */}
          <motion.div
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-primary-blue/30 rounded-tl-lg"
          />
          <motion.div
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
            className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-primary-blue/30 rounded-br-lg"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
