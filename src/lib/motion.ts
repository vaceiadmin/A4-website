/**
 * Shared Framer Motion variants and config for section reveal animations.
 * Reused across Home page and all other content pages.
 */
export const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const viewportOnce = { once: true, margin: "0px" } as const;

export const sectionTransition = { duration: 0.5 };
export const sectionTransitionDelayed = { duration: 0.5, delay: 0.1 };

/** Page-level enter/exit. Initial is visible (opacity 1) to avoid stuck blank on reload/client nav; animate is a quick polish. */
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25, ease: [0.33, 1, 0.68, 1] as any },
};
