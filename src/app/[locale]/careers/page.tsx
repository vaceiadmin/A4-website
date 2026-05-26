import React from "react";
import { Metadata } from "next";
import CareersPageContent from "@/components/careers/CareersPageContent";

export const metadata: Metadata = {
  title: "Careers | A4",
  description:
    "Join the A4 team. Explore exciting career opportunities in accounting, audit, tax, and technology.",
};

const CareersPage = () => {
  return <CareersPageContent />;
};

export default CareersPage;
