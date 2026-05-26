"use client";

import { useCallback, useEffect, useState } from "react";

export type UseLazyMediaOptions = {
  /** Pixels to extend the visibility root (preload shortly before entering view). Default "200px". */
  rootMargin?: string;
};

/**
 * Defers loading heavy media until the container is near the viewport.
 * Uses a callback ref so observation starts reliably after the node exists.
 */
export function useLazyMedia(options?: UseLazyMediaOptions) {
  const { rootMargin = "200px" } = options ?? {};
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  const ref = useCallback((el: HTMLDivElement | null) => {
    setNode(el);
  }, []);

  useEffect(() => {
    if (!node || shouldLoad) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true);
          obs.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [node, rootMargin, shouldLoad]);

  return { ref, shouldLoad };
}
