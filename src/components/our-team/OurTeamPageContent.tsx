"use client";

import React, { useMemo } from "react";
import PageHeader from "@/components/common/PageHeader";
import TeamGrid from "@/components/our-team/TeamGrid";
import ValuesSection from "@/components/our-team/ValuesSection";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

const OurTeamPageContent = () => {
  const { t } = usePagesTranslation("our-team");

  const grid = useMemo(() => t("grid", { returnObjects: true }) as any, [t]);
  const values = useMemo(() => t("values", { returnObjects: true }) as any, [t]);

  return (
    <main>
      <PageHeader title={t("pageHeader.title")} breadcrumbs={[{ label: t("pageHeader.breadcrumbs.0.label") }]} />
      <TeamGrid 
        title={grid?.title}
        subtitle={grid?.subtitle}
        members={grid?.members}
      />
      <ValuesSection 
        title={values?.title}
        titleAccent={values?.titleAccent}
        description={values?.description}
        ctaText={values?.cta}
        items={values?.items}
      />
    </main>
  );
};

export default OurTeamPageContent;
