"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useDirectionalInView } from "@/hooks/use-directional-in-view";
import {
  sectionVariants,
  sectionTransition,
  sectionTransitionDelayed,
} from "@/lib/motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: boolean;
}

/**
 * Wraps content in a motion.div with the same reveal animation as Home page sections.
 * Only triggers on scroll down and plays once.
 */
export default function AnimatedSection({
  children,
  className,
  delay = false,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useDirectionalInView(ref);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
      transition={delay ? sectionTransitionDelayed : sectionTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
