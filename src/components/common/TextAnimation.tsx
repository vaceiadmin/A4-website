import { motion, Variants } from "framer-motion";
import { useRef } from "react";
import { useDirectionalInView } from "@/hooks/use-directional-in-view";
import { useReduceMotion } from "@/contexts/ReduceMotionContext";
import { useIsSafari } from "@/hooks/use-safari";
import { cn } from "@/lib/utils";



interface TextAnimationProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  once?: boolean;
}

import { usePerformance } from "@/contexts/ReduceMotionContext";


/**
 * TextAnimation component that reveals text word-by-word when scrolled into view.
 * Only triggers on scroll down and plays once.
 */
export const TextAnimation = ({ 
  text, 
  className, 
  delay = 0, 
  as = "h2",
  once = true
}: TextAnimationProps) => {
  const words = text.split(" ");
  const ref = useRef(null);
  const isInView = useDirectionalInView(ref);
  const isSafari = useIsSafari();
  const { reduceMotion, isIPhone, isLowPerformance } = usePerformance();

  
  // Dynamic component type (h1, h2, etc.)
  const MotionComponent = (motion as any)[as];

  if (reduceMotion) {
    const Tag = (as || "h2") as any;
    return <Tag className={className}>{text}</Tag>;
  }

  const isSimple = isIPhone || isLowPerformance;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: isSimple ? 0.02 : (isSafari ? 0.03 : 0.055), 
        delayChildren: delay 
      },

    },
  };

  const wordVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: isSimple ? 5 : (isSafari ? 10 : 22),
      filter: isSimple || isSafari ? "none" : "blur(6px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "none",
      transition: {
        duration: isSimple ? 0.25 : (isSafari ? 0.3 : 0.5),
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };


  return (
    <MotionComponent
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("hardware-accelerated", className)}
    >

      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden whitespace-nowrap">
          <motion.span
            variants={wordVariants}
            className="inline-block mr-[0.25em] leading-tight"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionComponent>
  );
};


export default TextAnimation;
