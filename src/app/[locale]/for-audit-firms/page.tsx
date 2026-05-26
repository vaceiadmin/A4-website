import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Page moved | VACEI",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ForAuditFirmsLegacyPage() {
  // This legacy URL is no longer in use; return 404
  notFound();
}

