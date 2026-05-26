"use client";
import React, { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import BenefitsCardsRow, { BenefitCard } from "./BenefitsCardsRow";
import { usePerformance } from "@/contexts/ReduceMotionContext";
import { useLazyMedia } from "@/hooks/use-lazy-media";
import { lazyImgProps } from "@/lib/lazy-media-props";
import { cn } from "@/lib/utils";

interface BenefitsVideoSectionProps {
    cards: BenefitCard[];
    videoSrc?: string;
    posterImage?: string;
}

const BenefitsVideoSection = ({
    cards,
    videoSrc = "/assets/videos/services/V11-Ai FS Review GIF.gif",
    posterImage = "/assets/images/RectangleV.png",
}: BenefitsVideoSectionProps) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const { isIPhone, isLowPerformance } = usePerformance();

    // Add icons manually since they are not in the translation but are part of the UI structure
    const icons = [
        '/assets/images/image 98.png',
        '/assets/images/image 103.png',
        '/assets/images/image 102.png'
    ];

    const cardsWithIcons = cards.map((card, idx) => ({
        ...card,
        icon: card.icon || icons[idx] || icons[0]
    }));

    const isGif = videoSrc?.toLowerCase().endsWith(".gif");
    const { ref: lazyRef, shouldLoad } = useLazyMedia();

    useEffect(() => {
        if (!shouldLoad || isGif) return;
        videoRef.current?.load();
    }, [shouldLoad, isGif]);

    const handleTogglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    return (
        <section className="bg-background py-16 lg:py-20">
            {/* Top row: three cards using reusable component */}
           <div className="py-12">
                <BenefitsCardsRow cards={cardsWithIcons} />
            </div>

            {/* Video block */}
            <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 mt-2">
                <div className="bg-primary-blue rounded-2xl p-3 md:p-4 shadow-md">
                    <div
                        ref={lazyRef}
                        className="relative w-full rounded-xl overflow-hidden bg-black"
                    >
                        {isGif ? (
                            <img
                                src={videoSrc}
                                alt="Benefits Video Review"
                                className="w-full h-auto"
                                {...lazyImgProps}
                            />
                        ) : (
                            <>
                                <video
                                    ref={videoRef}
                                    className="w-full h-auto"
                                    src={shouldLoad ? videoSrc : undefined}
                                    poster={posterImage}
                                    controls={false}
                                    playsInline
                                    preload="none"
                                    muted
                                />

                                {/* Play overlay button */}
                                <button
                                    type="button"
                                    onClick={handleTogglePlay}
                                    className="absolute inset-0 flex items-center justify-center focus:outline-none"
                                    aria-label={isPlaying ? "Pause video" : "Play video"}
                                >
                                    <div className={cn(
                                        "w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-xl border border-white/70 transition-colors",
                                        isIPhone || isLowPerformance ? "bg-white/40" : "bg-white/25 backdrop-blur-md hover:bg-white/35"
                                    )}>
                                        <Play
                                            size={30}
                                            className="text-white"
                                            fill="currentColor"
                                        />
                                    </div>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BenefitsVideoSection;



