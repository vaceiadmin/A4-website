"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/contexts/LocaleContext";
import { withLocale } from "@/lib/localized-path";
import { motion } from "framer-motion";
import WLHero from "@/components/white-label/WLHero";
import WLBentoGrid from "@/components/white-label/WLBentoGrid";
import WLProcess from "@/components/white-label/WLProcess";
import WLInteractiveCards from "@/components/white-label/WLInteractiveCards";
import WLPricing from "@/components/white-label/WLPricing";
import WLCTASection from "@/components/white-label/WLCTASection";
import FallBeamBackground from "@/components/common/FallBeam";
import WLLiveRequests from "@/components/white-label/WLLiveRequests";
import {
  Users,
  Workflow,
  FileText,
  Calendar,
  Wrench,
  Layers,
  TrendingUp,
  Layout,
} from "lucide-react";

const PartnersPlatformPage = () => {
  const router = useRouter();
  const locale = useLocale();
  const goContact = () => router.push(withLocale(locale, "/contact"));

  const liveRequests = [
    { id: 1, company: "Company in Malta", location: "Malta", service: "Audit Services", deadline: "14 days", type: "Urgent request" },
    { id: 2, company: "Startup (EU)", location: "European Union", service: "Bookkeeping Support", type: "Monthly engagement" },
    { id: 3, company: "Group Company", location: "Multi-country", service: "VAT Compliance Required", type: "Cross-border compliance" },
    { id: 4, company: "International Client", location: "Global", service: "Legal Structuring Support", type: "Cross-border advisory" },
  ];

  const howItWorks = [
    {
      id: 1,
      title: "Join the VACEI Platform",
      description: "Set up your firm profile and service areas.",
    },
    {
      id: 2,
      title: "Bring Your Clients",
      description: "Onboard your existing clients into a structured workspace.",
    },
    {
      id: 3,
      title: "Deliver Through VACEI",
      description: "Manage documents, workflows, and service delivery in one system.",
    },
    {
      id: 4,
      title: "Access the Network",
      description: "Expand your capabilities through the VACEI Network when additional expertise is required.",
    },
  ];

  const coreValue = [
    {
      id: 1,
      title: "Manage Your Clients",
      description:
        "Operate all your client relationships in one structured platform — documents, workflows, and deadlines in one place.",
      icon: Users,
    },
    {
      id: 2,
      title: "Deliver Services Efficiently",
      description:
        "Use built-in tools for accounting, audit, compliance, and service delivery — all within your workspace.",
      icon: Workflow,
    },
    {
      id: 3,
      title: "Capture More Opportunities",
      description:
        "Receive your clients’ requests directly and expand your services through trusted partners or the VACEI Network when needed.",
      icon: TrendingUp,
    },
  ];

  const capabilities = [
    {
      id: 1,
      title: "Client Workspaces",
      description: "Structured environments for managing every client engagement",
      icon: Layout,
    },
    {
      id: 2,
      title: "Document & Request Management",
      description: "Track all client documentation and requests in one place",
      icon: FileText,
    },
    {
      id: 3,
      title: "Engagement Workflows",
      description: "Standardised delivery across accounting, audit, legal, and compliance",
      icon: Workflow,
    },
    {
      id: 4,
      title: "Compliance Tracking",
      description: "Automated deadlines and filing visibility",
      icon: Calendar,
    },
    {
      id: 5,
      title: "Built-in Service Tools",
      description: "Accounting integrations, audit working papers, OCR, and automation tools",
      icon: Wrench,
    },
    {
      id: 6,
      title: "Unified Platform",
      description: "One system for all service lines and client relationships",
      icon: Layers,
    },
  ];

  const pricingFeatures = [
    "Full client workspaces",
    "Access to the VACEI Network",
    "Built-in audit tools",
    "Built-in accounting tools",
    "Document and request management",
    "Workflow and compliance tracking",
    "Unlimited service delivery",
  ];

  return (
    <main className="min-h-screen bg-white">
      <WLHero
        title="Partner Platform"
        subtitle="Run your firm on VACEI — and access new client opportunities"
        overview="Receive your clients’ service requests directly through your portal. Handle them internally, allocate them to a trusted partner, or access the VACEI Network for additional expertise — all while remaining in control of the client relationship."
        trustLine="Join a curated global network of professional firms — powered by a structured platform"
        ctaText="Book a Demo"
        secondaryCtaText="Apply to Join"
        headlineVariant="plain"
        highlightWords={[]}
        onCtaClick={goContact}
        onSecondaryCtaClick={goContact}
      />

      <div className="relative">
        <FallBeamBackground beamColorClass="primary-blue" lineCount={25} className="z-0" />

        <div className="relative z-10">
          <WLLiveRequests
            badgeLabel="Live Opportunities"
            sectionTitle="Opportunities Across the VACEI Network"
            intro={
              "A snapshot of service needs across the VACEI Network.\n\nOpportunities are accessed in a controlled way — ensuring firms maintain ownership of their clients while expanding their reach when needed."
            }
            requests={liveRequests}
          />

          <WLInteractiveCards
            sectionTitle="Run your firm. Expand your reach. Stay in control."
            items={coreValue}
          />

          {/* Control & ownership */}
          <section className="py-20 bg-white relative overflow-hidden border-y border-gray-100">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl font-black text-text-dark tracking-tight mb-8"
              >
                Control & Ownership Built In
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="text-lg text-gray/80 font-medium leading-relaxed space-y-4 text-left sm:text-center"
              >
                <p>Your firm remains in control of every client relationship.</p>
                <p>All service requests from your clients come directly to you. You decide how they are handled — whether internally, through a trusted partner, or via the VACEI Network.</p>
                <p className="font-black text-text-dark pt-2">Nothing is routed externally unless you choose.</p>
              </motion.div>
            </div>
          </section>

          <WLProcess
            tagline="How It Works"
            sectionTitle="Simple. Structured. Scalable."
            steps={howItWorks}
          />

          <WLBentoGrid
            sectionSubtitle="Platform capabilities"
            sectionTitle="Built to Run Your Firm"
            sectionDescription="VACEI is not just a portal — it is where your firm delivers its services."
            items={capabilities}
          />

          <section className="py-20 bg-[#F4F6F9] relative overflow-hidden">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-blue/5 text-primary-blue font-black tracking-widest uppercase text-[10px] border border-primary-blue/10 mb-6">
                The network
              </span>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl font-black text-text-dark tracking-tight mb-8"
              >
                Powered by the VACEI Network
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-lg text-gray/80 font-medium leading-relaxed whitespace-pre-line"
              >
                {
                  "VACEI connects your firm to a curated global network of professional firms.\n\nAccess additional expertise, collaborate across jurisdictions, and expand your service offering — all within a structured and controlled environment."
                }
              </motion.p>
            </div>
          </section>

          <WLPricing
            badgeText="Pricing"
            title="Simple, scalable pricing"
            description="Run your firm, manage your clients, and access the VACEI Network — all in one platform."
            price="€4"
            period="per client / month"
            startsFromText=""
            footnoteText="Includes access to the VACEI Network, audit tools, accounting tools, and your full client workspace."
            features={pricingFeatures}
            capabilitiesText="Includes"
            fullAccessText="Full access"
            ctaText="Book a Demo"
            trustedAcrossEuropeText="Trusted by partner firms"
            partnerLabelText="Across the VACEI Network"
            onCtaClick={goContact}
          />
        </div>
      </div>

      <WLCTASection
        badge="Partner Network"
        title="Join a curated global network of professional firms"
        subtitle="Run your firm on a structured platform, maintain full control of your clients, and access new opportunities through the VACEI Network."
        ctaText="Book a Demo"
        secondaryCtaText="Apply to Join"
        onCtaClick={goContact}
        onSecondaryCtaClick={goContact}
        footerLine="Professional services are delivered by each firm through the VACEI platform, with optional collaboration through the VACEI Network when required."
      />
    </main>
  );
};

export default PartnersPlatformPage;
