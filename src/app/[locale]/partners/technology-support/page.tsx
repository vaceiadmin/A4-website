import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/common/PageHeader";
import ContentSection from "@/components/partners/ContentSection";

export const metadata: Metadata = {
  title: "Technology Integration Support | VACEI",
  description: "Supporting your existing systems with structured expertise. Improve structure, consistency, and delivery control.",
};

const TechnologySupportPage = () => {
  const sections = [
    {
      title: "Supporting Your Existing Systems With Structured Expertise",
      content: [
        "VACEI provides technology enablement support for organisations that already operate their own accounting, audit, or compliance systems and want to improve structure, consistency, and delivery control.",
        "Under this model, VACEI does not replace or license a full platform. Instead, VACEI works alongside the organisation’s existing technology to assist with process structuring, workflow alignment, and technical implementation."
      ]
    },
    {
      title: "Purpose of Technology Integration Support",
      content: [
        "The purpose of this engagement model is to help organisations strengthen their existing systems without migrating to a new platform.",
        "VACEI supports internal teams by applying proven delivery frameworks, workflow logic, and technical expertise to enhance current tools and processes.",
        "This approach allows organisations to retain full ownership of their technology while benefiting from structured delivery practices."
      ]
    },
    {
        title: "Who This Is For",
        content: [ "This model is designed for organisations that want improvement, not disruption." ],
        list: [
            "Accounting and audit firms with in-house systems",
            "Organisations using custom-built or third-party platforms",
            "Corporate groups with internal finance or compliance tools",
            "Teams seeking process improvement without system replacement"
        ]
    },
    {
        title: "How VACEI Assists",
        content: [
            "VACEI provides support through a dedicated technical and process-focused team.",
            "Assistance may include reviewing existing systems, mapping current workflows, identifying gaps or inefficiencies, and helping implement structured processes within the organisation’s technology environment.",
            "Support can also include technical collaboration with internal developers to improve data flows, controls, and visibility."
        ]
    },
    {
        title: "Scope of Support",
        content: [ "Technology enablement engagements may cover areas such as:" ],
        list: [
            "Workflow design and process standardisation",
            "Task and responsibility structuring",
            "Documentation and working paper frameworks",
            "Review and approval processes",
            "Audit trails and activity logging",
            "System integration and optimisation support"
        ]
    },
    {
        title: "Role Clarity and Control",
        content: [
            "The organisation retains full control over its systems, data, and service delivery.",
            "VACEI does not assume ownership of technology, make delivery decisions, or access client data beyond what is required for agreed support activities.",
            "VACEI’s role is advisory and technical, focused on enablement rather than operation."
        ]
    },
    {
        title: "Data and Governance",
        content: [
            "All data remains within the organisation’s environment.",
            "Access, permissions, and security are governed by the organisation’s internal policies and applicable regulatory requirements. VACEI operates within agreed boundaries and confidentiality terms."
        ]
    },
    {
        title: "Commercial Structure",
        content: [
            "Technology enablement and integration support is governed by agreed commercial terms based on scope, duration, and level of technical involvement.",
            "These arrangements are defined on a case-by-case basis and are not publicly listed."
        ]
    },
    {
        title: "Engagement Assessment",
        content: [
            "Each technology enablement engagement is assessed to ensure alignment with organisational objectives, system readiness, and professional standards.",
            "This ensures that VACEI’s involvement adds value without creating dependency or operational risk."
        ]
    }
  ];

  return (
    <main>
      <PageHeader
        title="Technology Integration Support"
        breadcrumbs={[
          { label: "Partners", href: "/partners" },
          { label: "Technology Support" }
        ]}
      />
      
      <ContentSection 
        title="Working With VACEI" 
        description="Technology enablement support is designed for organisations that want to improve how their existing systems support accounting, audit, or compliance delivery."
        sections={sections}
      >
        <div className="flex justify-center pt-8">
            <Link 
                href="/quote#process-steps" 
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-medium rounded-full shadow-lg hover:bg-primary-blue transition-all"
            >
                Start a Discussion
            </Link>
        </div>
      </ContentSection>
    </main>
  );
};

export default TechnologySupportPage;
