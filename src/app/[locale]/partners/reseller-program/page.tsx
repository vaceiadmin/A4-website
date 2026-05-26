import React from "react";
import { Metadata } from "next";
import ResellerProgramPageContent from "@/components/partners/ResellerProgramPageContent";

export const metadata: Metadata = {
  title: "Reseller Program | A4",
  description: "Sell A4. We Deliver the Platform. You Earn. Join our reseller program.",
};

const ResellerProgramPage = () => {
  return <ResellerProgramPageContent />;
};

export default ResellerProgramPage;
