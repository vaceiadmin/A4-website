import React, { useEffect, useRef } from 'react';

// Define the component's props for flexibility and professionalism
interface FallBeamBackgroundProps {
    /**
     * Optional Tailwind CSS class name to apply to the main container.
     * Useful for layout adjustments or margins.
     */
    className?: string;
    /**
     * Number of lines (beams) to render. Default is 25.
     */
    lineCount?: number;
    /**
     * Text to display over the beam effect.
     */
    displayText?: string;
    /**
     * Tailwind color class for the glowing beam trail.
     * E.g., 'primary-blue', 'blue-400', 'green-400', 'red-400'. Default is 'primary-blue'.
     */
    beamColorClass?: string;
}

/**
 * A lightweight, theme-aware falling beam background component.
 * It dynamically creates vertical beam lines via JavaScript/React and applies CSS animations.
 *
 * NOTE: Ensure the parent container has a defined height/width and `position: relative`
 * for the background to cover it correctly.
 */
const FallBeamBackground: React.FC<FallBeamBackgroundProps> = ({
    className = '',
    lineCount = 25,
    displayText,
    beamColorClass = 'primary-blue', 
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // --- CSS Styles for the effect ---
    const dynamicStyles = `
    .fall-beam-line {
      position: absolute;
      width: 1px;
      /* Background for the line itself (dim white) */
      height: 100%; /* Cover the full height of the container */
      z-index: 10;
    }

    .fall-beam-line::after {
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      height: 120px;
      /* Dynamic beam glow color gradient */
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0),
        var(--beam-glow-color)
      );
      animation: fall var(--ani-duration) var(--ani-delay) linear infinite;
    }

    @keyframes fall {
      0% { top: -150px; }
      100% { top: 100%; }
    }
    `;

    // Map Tailwind color to an RGB or RGBA value for the CSS variable
    const getColorValue = (colorClass: string): string => {
        switch (colorClass) {
            case 'primary-blue': return 'rgba(59, 73, 230, 0.8)';
            case 'green-400': return 'rgba(74, 222, 128, 0.8)';
            case 'cyan-400': return 'rgba(34, 211, 238, 0.8)';
            case 'blue-400': return 'rgba(96, 165, 250, 0.8)';
            case 'red-400': return 'rgba(248, 113, 113, 0.8)';
            case 'indigo-400': return 'rgba(59, 73, 230, 0.75)';
            default: return 'rgba(59, 73, 230, 0.8)';
        }
    };

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        // Clear any previous lines before rendering new ones
        container.querySelectorAll('.fall-beam-line').forEach(line => line.remove());

        const glowColor = getColorValue(beamColorClass);

        for (let i = 1; i <= lineCount; i++) {
            const line = document.createElement("div");
            line.classList.add("fall-beam-line");

            // Calculate the 'left' position with a slight random jitter
            const leftPosition = `${(i - 1) * (100 / (lineCount - 1)) + (Math.random() * 2 - 1)}%`;

            // Random animation duration and delay for a natural look
            const duration = 6 + Math.random() * 8 + "s";
            const delay = -Math.random() * 10 + "s";

            // Apply CSS variables for the animation and color
            line.style.setProperty("left", leftPosition);
            line.style.setProperty("--ani-duration", duration);
            line.style.setProperty("--ani-delay", delay);
            line.style.setProperty("--beam-glow-color", glowColor);

            container.appendChild(line);
        }

        return () => {
            container.querySelectorAll('.fall-beam-line').forEach(line => line.remove());
        };
    }, [lineCount, beamColorClass]);

    return (
        <div className={`pointer-events-none ${className}`}>
            <style>{dynamicStyles}</style>

            <div
                ref={containerRef}
                className="absolute inset-0 z-0 overflow-hidden bg-transparent"
            >
                {displayText && (
                    <h1 className="relative z-20 grid place-content-center h-full font-sans text-4xl sm:text-5xl lg:text-7xl font-bold text-white p-4 text-center">
                        {displayText}
                        <div className="absolute inset-0 z-30 pointer-events-none" style={{
                            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.95) 100%)'
                        }} />
                    </h1>
                )}
            </div>
        </div>
    );
};

export default FallBeamBackground;