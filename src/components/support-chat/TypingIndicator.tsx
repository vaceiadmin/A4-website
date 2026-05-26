"use client";

import React from "react";
import { motion } from "framer-motion";

interface TypingIndicatorProps {
  className?: string;
  /** If true, renders as a small bubble (e.g. above launcher). If false, inline in chat. */
  bubble?: boolean;
}

const dotVariants = {
  initial: { opacity: 0.3, y: 0 },
  animate: { opacity: 1, y: -4 },
};

export default function TypingIndicator({ className = "", bubble = false }: TypingIndicatorProps) {
  const content = (
    <div className="flex items-center justify-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-current"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );

  if (bubble) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.2 }}
        className={`rounded-2xl rounded-bl-md px-3 py-2 bg-white text-gray-600 shadow-lg border border-gray-100 text-xs ${className}`}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div className={`flex items-start gap-2 ${className}`}>
      <div className="rounded-2xl rounded-bl-md px-4 py-3 bg-gray-100 text-gray-600 max-w-[80px]">
        {content}
      </div>
    </div>
  );
}
