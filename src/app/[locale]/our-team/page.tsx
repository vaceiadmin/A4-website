import React from "react";
import { Metadata } from "next";
import OurTeamPageContent from "@/components/our-team/OurTeamPageContent";

export const metadata: Metadata = {
  title: "Our Team | VACEI",
  description:
    "Meet the experts behind VACEI. Our diverse team is dedicated to simplifying your business journey with professional accounting, audit, and corporate services.",
};

const OurTeamPage = () => {
  return <OurTeamPageContent />;
};

export default OurTeamPage;
