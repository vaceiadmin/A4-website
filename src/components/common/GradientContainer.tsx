import React from 'react'
import Image from 'next/image'
import { usePerformance } from '@/contexts/ReduceMotionContext'

interface GradientContainerProps {
    children?: React.ReactNode
    className?: string
    /** Corner radius; default keeps marketing curves. Use `rounded-none` for flush edges. */
    roundedClassName?: string
    showRadials?: boolean
    /** Fine grain overlay (Noise.png). Disable for cleaner light heroes and less GPU work on mobile. */
    showNoise?: boolean
    backgroundColor?: string
    radialImage?: string
    radialOpacity?: number
    topLeftRotation?: string
    bottomRightRotation?: string
    /** Optional position classes for the left radial (e.g. 'top-0 left-0', 'bottom-0 left-0') */
    leftPositionClass?: string
    /** Optional position classes for the right radial (e.g. 'bottom-0 right-0') */
    rightPositionClass?: string
}

const GradientContainer = ({ 
    children, 
    className = "", 
    roundedClassName = "rounded-[32px] md:rounded-[48px]",
    showRadials = true, 
    showNoise = true,
    backgroundColor, 
    radialImage,
    radialOpacity,
    topLeftRotation = "-rotate-90",
    bottomRightRotation = "rotate-90",
    leftPositionClass,
    rightPositionClass,
}: GradientContainerProps) => {
    const { isIPhone, isLowPerformance } = usePerformance()
    const bgColor = backgroundColor || 'bg-primary'
    const radialSrc = radialImage || '/assets/images/radial2.png'
    const leftPos = leftPositionClass || 'top-0 left-0'
    const rightPos = rightPositionClass || 'bottom-0 right-0'
    
    // Determine opacity: user provided > context-based default
    const getRadialOpacity = () => {
        if (radialOpacity !== undefined) return radialOpacity;
        return isIPhone ? 0.2 : 0.3;
    };
    
    const currentOpacity = getRadialOpacity();
    
    return (
        <div
            className={`
                relative w-full ${bgColor} ${className}
                ${roundedClassName}
                overflow-hidden
            `}
        >
            {/* Background Wrapper with Overflow Hidden */}
            <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none">
                {/* Background Radial Image - Top Left - Hide on iPhone if performance is an issue */}
                {showRadials && (
                    <div 
                        className={`absolute ${leftPos} w-[350px] h-[330px] z-0 transform ${topLeftRotation}`}
                        style={{ opacity: currentOpacity }}
                    >
                        <Image
                            src={radialSrc}
                            alt="Radial Gradient"
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                {/* Background Radial Image - Bottom Right */}
                {showRadials && (
                    <div 
                        className={`absolute ${rightPos} w-[350px] h-[330px] z-0 transform ${bottomRightRotation}`}
                        style={{ opacity: currentOpacity }}
                    >
                        <Image
                            src={radialSrc}
                            alt="Radial Gradient"
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                {/* Noise Overlay - mix-blend-mode is VERY expensive on iOS Safari/Chrome */}
                {showNoise ? (
                    <div className={`absolute inset-0 z-[1] opacity-50 ${isIPhone || isLowPerformance ? 'mix-blend-normal' : 'mix-blend-soft-light'}`}>
                        <Image
                            src="/assets/images/Noise.png"
                            alt=""
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                ) : null}
            </div>

            {/* Content */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    )
}

export default GradientContainer
