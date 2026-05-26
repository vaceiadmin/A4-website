"use client";

import React from "react";
import PageHeader from "@/components/common/PageHeader";
import ContactForm from "@/components/quote/ContactForm";
import { FadeInUp } from "@/components/common/Animations";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

const ContactPage = () => {
  const { t } = usePagesTranslation("contact");

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <PageHeader title={t("pageHeader.title")} breadcrumbs={[{ label: t("pageHeader.breadcrumbs.0.label") }]} />
      </div>
      <FadeInUp>
        <ContactForm />
      </FadeInUp>
    </main>
  );
};

export default ContactPage;
