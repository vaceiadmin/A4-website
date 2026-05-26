import React from "react";
import { Metadata } from "next";
import WhiteLabelPageContent from "@/components/partners/WhiteLabelPageContent";

export const metadata: Metadata = {
  title: "White Label & Technology Access | VACEI",
  description: "Offer a branded client experience using VACEI's portals. Structured platforms under your brand.",
};

const WhiteLabelPage = () => {
  return <WhiteLabelPageContent />;
};

export default WhiteLabelPage;
