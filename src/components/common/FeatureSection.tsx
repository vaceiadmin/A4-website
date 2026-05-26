'use client'

import React, { useRef } from 'react'
import GetInstantQuoteButton from './GetInstantQuoteButton'
import TextAnimation from './TextAnimation'
import { FadeInUp, StaggerContainer } from './Animations'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface FeatureItem {
    title: string
    description: string
    content?: string[]
    paragraph?: string
    buttonText?: string
    buttonHref?: string
    mainImage?: string
    overlayImages?: {
        src: string
        alt: string
        position: string
        size?: string
    }[]
    useImageBackground?: boolean
    backgroundImage?: string
    reverseLayout?: boolean
}

interface FeatureSectionProps {
    features: FeatureItem[]
    className?: string
    useGridLayout?: boolean
}

import { useReduceMotion, usePerformance } from "@/contexts/ReduceMotionContext";
import { cn } from "@/lib/utils";

/** Interactive animated visual - replaces images with floating orbs, gradient mesh, and hover effects */
function AnimatedFeatureVisual({ index }: { index: number }) {
    const { isIPhone, isLowPerformance } = usePerformance();
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const springConfig = { damping: 25, stiffness: 200 }
    const xSpring = useSpring(x, springConfig)
    const ySpring = useSpring(y, springConfig)
    const rotateX = useTransform(ySpring, [-0.5, 0.5], [8, -8])
    const rotateY = useTransform(xSpring, [-0.5, 0.5], [-8, 8])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current || isIPhone || isLowPerformance) return
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        x.set((e.clientX - centerX) / rect.width)
        y.set((e.clientY - centerY) / rect.height)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    const isSimple = isIPhone || isLowPerformance;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={isSimple ? {} : { rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
            className="relative w-full h-[450px] overflow-hidden rounded-[2.5rem] cursor-default"
        >
            {/* Base gradient background */}
            <div className={cn(
                "absolute inset-0 rounded-[2.5rem]",
                isSimple ? "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#111235]" : "bg-[#111235]"
            )} />

            {isSimple && (
                <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]">
                    <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary-blue/10 rounded-full blur-[60px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-blue/10 rounded-full blur-[50px]" />
                    {/* Fixed decorative rings */}
                    <div className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 opacity-40 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]" />
                    <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-blue/10 opacity-30 shadow-[0_0_15px_rgba(59,73,230,0.1)]" />
                    {/* Small static accent dot */}
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-blue/60" />
                </div>
            )}

            {!isSimple && (
                <>
                    {/* Animated gradient border glow */}
                    <motion.div
                        className="absolute inset-0 rounded-[2.5rem] opacity-60"
                        style={{
                            background: 'linear-gradient(105deg, transparent 40%, rgba(59,73,230,0.3) 50%, transparent 60%)',
                            backgroundSize: '200% 200%',
                        }}
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Floating animated orbs */}
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-primary-blue/30 blur-[50px]"
                        animate={{
                            x: [0, 20, -10, 0],
                            y: [0, -15, 20, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-primary-blue/25 blur-[60px]"
                        animate={{
                            x: [0, -25, 15, 0],
                            y: [0, 20, -10, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-24 h-24 sm:w-32 sm:h-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[40px]"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0.9, 0.5],
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    />

                    {/* Animated ring/circle elements */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-48 h-48 sm:w-64 sm:h-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-36 h-36 sm:w-48 sm:h-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-blue/20"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Central glowing dot */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-blue shadow-[0_0_20px_rgba(59,73,230,0.8)]"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.8, 1, 0.8],
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    {/* Floating particles */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1.5 h-1.5 rounded-full bg-white/30"
                            style={{
                                left: `${20 + i * 15}%`,
                                top: `${25 + (i % 3) * 25}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0.3, 0.8, 0.3],
                            }}
                            transition={{
                                duration: 3 + i * 0.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: i * 0.3,
                            }}
                        />
                    ))}

                    {/* Ambient shimmer */}
                    <motion.div
                        className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none"
                        style={{ background: 'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.04) 50%, transparent 75%)', backgroundSize: '200% 100%' }}
                        animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
                        transition={{ duration: 4, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                    />
                </>
            )}

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '32px 32px',
                }}
            />
        </motion.div>
    )
}

const FeatureSection = ({ features, className = '', useGridLayout = false }: FeatureSectionProps) => {
    const { isIPhone, isLowPerformance } = usePerformance();
    const shouldUseGrid = useGridLayout && features.length === 4

    const renderCard = (feature: FeatureItem, index: number) => {
        const isReversed = feature.reverseLayout !== undefined ? feature.reverseLayout : index % 2 === 1

        const getVisualOrder = () => (shouldUseGrid ? '' : isReversed ? 'lg:order-2' : 'lg:order-1')
        const getContentOrder = () => (shouldUseGrid ? '' : isReversed ? 'lg:order-1' : 'lg:order-2')

        return (
            <div 
                key={index} 
                className={`group flex flex-col h-full lg:flex-row items-center gap-10 lg:gap-16`}
            >
                <motion.div 
                    initial={{ opacity: 0, x: isReversed ? 60 : -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex-1 w-full min-w-0 overflow-visible ${getVisualOrder()}`}
                >
                    <motion.div
                        whileHover={isIPhone || isLowPerformance ? {} : { y: -8, scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="relative"
                    >
                        <AnimatedFeatureVisual index={index} />
                    </motion.div>
                </motion.div>

                {/* Text Content */}
                <StaggerContainer 
                    className={`flex-1 space-y-4 lg:space-y-6 w-full flex flex-col justify-center ${getContentOrder()}`}
                    staggerDelay={0.15}
                >
                    <TextAnimation 
                        text={feature.title}
                        as="h2"
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading leading-tight"
                    />
                    <FadeInUp>
                        <p className="text-base lg:text-xl text-gray/80 leading-relaxed font-medium">
                            {feature.description}
                        </p>
                    </FadeInUp>

                    {/* Content: Bullet Points or Paragraph */}
                    {feature.content && feature.content.length > 0 && (
                        <div className="space-y-4 pt-2">
                            <FadeInUp>
                                <h3 className="font-bold text-heading text-lg lg:text-xl">What clients see in the portal:</h3>
                            </FadeInUp>
                            <ul className="space-y-3">
                                {feature.content.map((item, i) => (
                                    <FadeInUp 
                                        key={i} 
                                        as="li"
                                        className="flex items-center gap-4 text-gray text-base lg:text-lg"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-primary-blue shadow-[0_0_10px_rgba(59,73,230,0.3)] shrink-0"></div>
                                        <span>{item}</span>
                                    </FadeInUp>
                                ))}
                            </ul>
                        </div>
                    )}

                    {feature.paragraph && (
                        <FadeInUp className="text-base lg:text-lg text-gray/70 leading-relaxed pt-2 space-y-4">
                            {feature.paragraph.split('\n\n').map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </FadeInUp>
                    )}

                    {/* Button */}
                    {feature.buttonText && feature.buttonHref && (
                        <FadeInUp className="pt-6">
                            <GetInstantQuoteButton
                                variant="custom"
                                text={feature.buttonText}
                                href={feature.buttonHref}
                                bgColor="var(--card-hover-overlay)"
                                textColor="white"
                                className={cn(
                                    "px-8 lg:px-10 py-4 rounded-full font-bold shadow-xl shadow-primary-blue/25 transition-all duration-300 hover:shadow-primary-blue/40",
                                    !isIPhone && !isLowPerformance && "hover:scale-105"
                                )}
                            />
                        </FadeInUp>
                    )}
                </StaggerContainer>
            </div>
        )
    }

    return (
        <section className={`w-full py-12 lg:py-20 overflow-hidden ${className}`}>
            <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="space-y-16 lg:space-y-24">
                    {features.map((feature, index) => (
                        <div key={index} className="w-full">
                            {renderCard(feature, index)}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeatureSection
