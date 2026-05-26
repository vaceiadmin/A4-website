"use client";

import React, { useState, useEffect } from "react";
import IntroAnimation from "./IntroAnimation";

// Shows the intro loader on every page load/refresh (no session persistence).
const IntroAnimationGate = () => {
  // Initialize to true so it shows immediately on high-z-index, covering the page
  const [show, setShow] = useState(true);
  const [showSoundPrompt, setShowSoundPrompt] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Attempt to play immediately
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 1.0;
        audioRef.current.play()
          .then(() => {
            // Autoplay successful
            setShowSoundPrompt(false);
          })
          .catch((err) => {
            // If autoplay fails, show the prompt
            console.log("Autoplay failed, waiting for interaction:", err);
            setShowSoundPrompt(true);
          });
      }
    };

    playAudio();

    // Fallback: Play on first interaction if autoplay was blocked
    const handleInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => console.log("Interaction play failed:", err));
        setShowSoundPrompt(false);
      }
    };

    const handleKeyInteraction = () => handleInteraction();

    document.addEventListener("click", handleInteraction);
    document.addEventListener("keydown", handleKeyInteraction);
    document.addEventListener("touchstart", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleKeyInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, []); // Combined into a single effect with constant dependency size

  const handleComplete = () => setShow(false);

  if (!show) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src="/sounds/lucadialessandro-effect-for-logo-intro-186595.mp3"
        preload="auto"
        style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}
      />
      
      {showSoundPrompt && (
        <div className="fixed top-5 right-5 z-10000 animate-fade-in">
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs font-medium text-white/70 tracking-wide shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
            <span>Tap for sound experience</span>
          </div>
        </div>
      )}
      
      <IntroAnimation onComplete={handleComplete} />
    </>
  );
};

export default IntroAnimationGate;
