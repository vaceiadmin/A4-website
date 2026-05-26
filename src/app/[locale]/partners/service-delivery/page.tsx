import React from "react";
import { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import ContentSection from "@/components/partners/ContentSection";
import Link from "next/link"; // Import Link

export const metadata: Metadata = {
  title: "Service Delivery Partnerships | VACEI",
  description: "Collaborate with VACEI to deliver accounting and audit services using our structured workflows and platform.",
};

const ServiceDeliveryPage = () => {
  const sections = [
    {
      title: "Structured Collaboration for Professional Service Delivery",
      content: [
        "VACEI works with selected service delivery partners to support the execution of accounting, audit, and related professional services using structured workflows and controlled processes.",
        "Service delivery partnerships are designed for organisations or professionals who wish to collaborate within a clearly defined delivery framework while maintaining alignment with professional standards and quality expectations."
      ]
    },
    {
      title: "Purpose of Service Delivery Partnerships",
      content: [
        "The purpose of a service delivery partnership is to enable consistent, transparent, and well-governed service execution.",
        "VACEI provides the underlying workflows, portals, and operational structure that support planning, execution, review, and client communication. Service delivery partners operate within this structure according to agreed scopes and responsibilities.",
        "This model is not designed for ad hoc outsourcing. It is intended for long-term collaboration built on trust, process discipline, and shared quality objectives."
      ]
    },
    {
      title: "Who This Partnership Is For",
      content: [
        "Partners are expected to have the appropriate qualifications, licensing, and experience required for their jurisdiction and service scope."
      ],
      list: [
        "Accounting firms and audit firms",
        "Licensed practitioners",
        "Professional service providers operating in regulated environments",
        "Specialists supporting accounting, audit, or compliance functions"
      ]
    },
    {
      title: "How Service Delivery Works",
      content: [
        "Service delivery partnerships follow a structured and documented delivery approach.",
        "At the outset of each engagement, the scope of services, responsibilities, and delivery roles are clearly defined. Work is planned and executed using VACEI workflows and portals, ensuring traceability, version control, and clear ownership.",
        "Client communication, document exchange, and status visibility are managed through the platform. Review, sign-off, and completion are performed in accordance with agreed procedures and professional standards."
      ]
    },
    {
      title: "Roles and Responsibilities",
      content: [
        "Service delivery partners are responsible for performing the agreed professional services within their defined scope.",
        "VACEI provides the delivery infrastructure, workflow structure, and operational controls that support the engagement.",
        "Responsibilities are allocated to avoid overlap, ambiguity, or gaps. This ensures that accountability remains clear at all stages of the engagement."
      ]
    },
    {
        title: "Quality Control and Governance",
        content: [
            "Quality control is a core element of all service delivery partnerships.",
            "Engagements are governed by defined workflows, review steps, and approval processes. Documentation is maintained in a structured manner to support auditability and compliance.",
            "VACEI reserves the right to apply quality checks to ensure that delivery standards are maintained across all partner-led engagements."
        ]
    },
    {
        title: "Use of Technology and Portals",
        content: [
            "Service delivery partners use VACEI’s technology to support execution and oversight.",
            "This includes access to client portals for communication and document handling, as well as internal delivery tools for planning, working papers, queries, review, and sign-off.",
            "Technology is used to support professional judgment, not replace it."
        ]
    },
    {
        title: "Commercial and Operational Structure",
        content: [
            "Service delivery partnerships are governed by agreed commercial and operational terms.",
            "These include service scope, delivery responsibilities, pricing structure, and engagement management. Specific commercial terms are agreed privately and may vary depending on jurisdiction and service type."
        ]
    },
    {
        title: "Partnership Assessment",
        content: [
            "Service delivery partners are assessed based on professional credentials, operational readiness, experience, and alignment with VACEI’s quality expectations.",
            "This assessment ensures that all services delivered through the platform meet consistent standards."
        ]
    }
  ];

  return (
    <main>
      <PageHeader
        title="Service Delivery Partnerships"
        breadcrumbs={[
          { label: "Partners", href: "/partners" },
          { label: "Service Delivery" }
        ]}
      />
      
      <ContentSection 
        title="Working as a Service Delivery Partner" 
        description="Service delivery partnerships are structured to support sustainable collaboration, operational clarity, and long-term engagement. Partners who value structured delivery, clear governance, and technology-enabled workflows are encouraged to explore this collaboration model."
        sections={sections}
      >
        <div className="flex justify-center pt-8">
            <Link 
                href="/quote#process-steps" 
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white text-lg font-medium rounded-full shadow-lg hover:bg-primary-blue hover:shadow-primary-blue/30 transition-all duration-300 transform hover:-translate-y-1"
            >
                Start a Conversation
            </Link>
        </div>
      </ContentSection>
    </main>
  );
};

export default ServiceDeliveryPage;
