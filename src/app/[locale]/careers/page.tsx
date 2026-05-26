import React from "react";
import { Metadata } from "next";
import CareersPageContent from "@/components/careers/CareersPageContent";

export const metadata: Metadata = {
  title: "Careers | VACEI",
  description:
    "Join the VACEI team. Explore exciting career opportunities in accounting, audit, tax, and technology.",
};

const CareersPage = () => {
  return <CareersPageContent />;
};

export default CareersPage;
