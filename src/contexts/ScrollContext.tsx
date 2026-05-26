"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

type ScrollDirection = "up" | "down" | null;

interface ScrollContextType {
  scrollDirection: ScrollDirection;
}

const ScrollContext = createContext<ScrollContextType>({
  scrollDirection: "down", // Assume down initially as user starts scrolling
});

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("down");
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Only update if difference is significant to avoid jitter
    if (Math.abs(latest - lastScrollY.current) < 5) return;
    
    const direction = latest > lastScrollY.current ? "down" : "up";
    if (direction !== scrollDirection) {
      setScrollDirection(direction);
    }
    lastScrollY.current = latest;
  });

  return (
    <ScrollContext.Provider value={{ scrollDirection }}>
      {children}
    </ScrollContext.Provider>
  );
}

export const useScrollDirection = () => useContext(ScrollContext).scrollDirection;
