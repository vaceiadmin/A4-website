"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";
import { useReduceMotion } from "@/contexts/ReduceMotionContext";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const reduceMotion = useReduceMotion();

  // After route change, trigger resize so IntersectionObserver (whileInView) re-evaluates and content isn't stuck hidden
  useEffect(() => {
    const t = setTimeout(() => window.dispatchEvent(new Event("resize")), 40);
    return () => clearTimeout(t);
  }, [pathname]);

  // No enter/exit animation when reducing motion: instant swap avoids Safari/nav bugs (empty page until refresh)
  if (reduceMotion) {
    return (
      <div key={pathname} className="w-full min-h-0" style={{ isolation: "isolate" }}>
        {children}
      </div>
    );
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={pathname}
        initial={pageTransition.initial}
        animate={pageTransition.animate}
        exit={pageTransition.exit}
        transition={pageTransition.transition}
        className="w-full min-h-0"
        style={{ isolation: "isolate" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
