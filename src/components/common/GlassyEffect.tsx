import { cn } from "@/lib/utils";
import { useIsSafari } from "@/hooks/use-safari";
import { usePerformance } from "@/contexts/ReduceMotionContext";


interface GlassyEffectProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high" | "premium";
  animated?: boolean;
}

const GlassyEffect = ({
  children,
  className,
  intensity = "premium",
  animated = false,
}: GlassyEffectProps) => {
  const isSafari = useIsSafari();
  const { isIPhone, isLowPerformance } = usePerformance();
  const performanceMode = isIPhone || isLowPerformance;

  const intensityClasses = {
    low: cn(
      "bg-primary/5 border border-primary/10",
      isSafari || performanceMode ? "bg-primary/15" : "backdrop-blur-sm"
    ),
    medium: cn(
      "border border-primary/20 shadow-lg shadow-primary/10",
      isSafari || performanceMode ? "bg-primary/25" : "bg-primary/10 backdrop-blur-md"
    ),
    high: cn(
      "border border-primary/30 shadow-xl shadow-primary/20",
      isSafari || performanceMode ? "bg-primary/30" : "bg-primary/15 backdrop-blur-lg"
    ),
    premium: cn(
      "border border-primary/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]",
      isSafari || performanceMode ? "bg-primary/25" : "bg-primary/10 backdrop-blur-xl"
    ),
  };


  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden hardware-accelerated smooth-scrolling",
        intensityClasses[intensity],
        animated &&
          "transition-all duration-300 hover:shadow-primary/40 hover:border-primary/40",
        className

      )}
    >
      {/* Gradient tint overlay (primary-based) */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

      {/* Premium shimmer */}
      {intensity === "premium" && (
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}

      {/* Inner glow */}
      <div className="absolute inset-0 rounded-2xl shadow-inner shadow-primary/10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassyEffect;

