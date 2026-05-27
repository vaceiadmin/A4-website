"use client";

import React, { useEffect } from "react";
// import ReadyToSimplifySection from "./ReadyToSimplifySection";
import HeroSection from "./HeroSection";
import InteractiveBlock from "./InteractiveBlock";
import CoreStatement from "./CoreStatement";
import ValueSection from "./ValueSection";
import KeyBenefits from "./KeyBenefits";
import PositioningLine from "./PositioningLine";
import WhatYouActuallyGet from "./WhatYouActuallyGet";
import FlexibilitySection from "./FlexibilitySection";
import ProcessStepsSectionDark from "./ProcessStepsSectionDark";
import GlobalDeliverySection from "./GlobalDeliverySection";
import ActiveEUSection from "./ActiveEUSection";
import RealTimeControl from "./RealTimeControl";
import BeforeAndAfterSection from "./BeforeAndAfterSection";
import TwoWaysToStartSection from "./TwoWaysToStartSection";
import ConversionSection from "./ConversionSection";
import CallOptionSection from "./CallOptionSection";
import WorkspaceEntrySection from "./WorkspaceEntrySection";
import InsightsAndResourcesSection from "./InsightsAndResourcesSection";
import FinalSection from "./FinalSection";
import { BlogPost } from "@/utils/blog";

interface HomePageProps {
  recentBlogs?: BlogPost[];
}

const HomePage = ({ recentBlogs = [] }: HomePageProps) => {
  // Scroll to hash section on load (e.g. /#process-steps or /#services from navbar)
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      const t = setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div className="relative bg-[#020205] overflow-hidden">
      {/* 1. HeroSection — odd → isDark false */}
      <HeroSection isDark={false} />

      {/* 2. Interactive Block — even → isDark true */}
      <InteractiveBlock isDark={true} />

      {/* 3. Core Statement */}
      <CoreStatement isDark={false} />

      {/* 4. Value Section */}
      <ValueSection isDark={true} />

      {/* 5. Key Benefits */}
      <KeyBenefits isDark={false} />

      {/* 6. Positioning Line */}
      <PositioningLine isDark={true} />

      {/* 7. What You Actually Get */}
      <WhatYouActuallyGet isDark={false} />

      {/* 8. Workspace Entry Section */}
      <WorkspaceEntrySection isDark={true} />

      {/* 9. Flexibility Section */}
      <FlexibilitySection isDark={false} />

      {/* 10. Process Steps */}
      <ProcessStepsSectionDark isDark={true} />

      {/* 11. Global Delivery */}
      <GlobalDeliverySection isDark={false} />

      {/* 12. ActiveEU Section (Light) */}
      {/* <ActiveEUSection /> */}

      {/* 13. Real-Time Control (Dark) */}
      <RealTimeControl isDark={true} />

      {/* 14. Before & After (Light) */}
      <BeforeAndAfterSection isDark={false} />

      {/* 14b. Two ways to start — spotlight card (Dark) */}
      <TwoWaysToStartSection isDark={true} />

      {/* 15. Conversion Section (Dark) */}
      <ConversionSection isDark={true} />

      {/* 16. Call Option (Light) */}
      <CallOptionSection isDark={false} />

      {/* 17. Insights & Resources (Dark) */}
      <InsightsAndResourcesSection isDark={true} recentBlogs={recentBlogs} />

      {/* 18. Final Section (Light) */}
      <FinalSection isDark={false} />
    </div>
  );
};



export default HomePage;
