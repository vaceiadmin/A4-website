"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function TopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // When the path or search params change, we've arrived
    setLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (
        anchor &&
        anchor.href &&
        anchor.href.startsWith(window.location.origin) &&
        !anchor.href.includes("#") &&
        anchor.target !== "_blank" &&
        anchor.getAttribute("download") === null
      ) {
        // If it's a valid internal link navigation, start the loader
        // UNLESS it's the exact same page (which Next.js handles instantly)
        if (anchor.href !== window.location.href) {
          setLoading(true);
        }
      }
    };

    window.addEventListener("click", handleAnchorClick);
    return () => window.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ width: 0, opacity: 1 }}
          animate={{ 
            width: "70%", 
            transition: { duration: 15, ease: [0.1, 0.05, 0.1, 1] } 
          }}
          exit={{ 
            width: "100%", 
            opacity: 0,
            transition: { duration: 0.3 } 
          }}
          className="fixed top-0 left-0 h-[3px] bg-primary-blue z-[9999] pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
}
