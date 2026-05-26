import React from "react";
import { Metadata } from "next";
import PartnersPageContent from "@/components/partners/PartnersPageContent";

export const metadata: Metadata = {
  title: "Partner With VACEI | Partnership Models",
  description:
    "Explore VACEI partnership opportunities, including Service Delivery, White Label Solutions, Technology Integration, and our Reseller Program.",
};

const PartnersPage = () => {
  return <PartnersPageContent />;
};

export default PartnersPage;
