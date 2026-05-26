"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isHoveringLink, setIsHoveringLink] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the outer ring
    const springConfig = { damping: 25, stiffness: 250 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        if (!isVisible) setIsVisible(true);
    }, [mouseX, mouseY, isVisible]);

    const handleMouseDown = useCallback(() => setIsClicking(true), []);
    const handleMouseUp = useCallback(() => setIsClicking(false), []);

    const handleMouseOver = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isClickable = 
            target.tagName === "A" || 
            target.tagName === "BUTTON" || 
            target.closest("button") || 
            target.closest("a") ||
            target.getAttribute("role") === "button" ||
            target.classList.contains("cursor-pointer");

        setIsHoveringLink(!!isClickable);
    }, []);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches || "ontouchstart" in window);
        };
        checkMobile();

        const mobile = window.matchMedia("(max-width: 768px)").matches || "ontouchstart" in window;
        if (mobile) {
            return;
        }

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mouseover", handleMouseOver);

        document.documentElement.classList.add("vacei-custom-cursor");

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mouseover", handleMouseOver);
            document.documentElement.classList.remove("vacei-custom-cursor");
        };
    }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseOver]);

    if (isMobile || !isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none mix-blend-difference">
            {/* Outer Ring */}
            <motion.div
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: isHoveringLink ? 80 : 40,
                    height: isHoveringLink ? 80 : 40,
                    opacity: isClicking ? 0.5 : 1,
                    scale: isClicking ? 0.8 : 1,
                }}
                className={cn(
                    "absolute flex items-center justify-center rounded-full border-2 transition-colors duration-300",
                    isHoveringLink ? "border-blue-500 bg-blue-500/10" : "border-white/40"
                )}
            >
                {/* Optional: Add a small icon or text inside when hovering links */}
                <AnimatePresence>
                    {isHoveringLink && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="bg-blue-500 rounded-full w-2 h-2"
                        />
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Inner Dot (follows mouse instantly) */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isClicking ? 1.5 : 1,
                    opacity: isHoveringLink ? 0 : 1,
                }}
                className="absolute w-1.5 h-1.5 bg-blue-500 rounded-full"
            />
        </div>
    );
};

export default CustomCursor;
