"use client";

import React from "react";
import { useTranslation } from "react-i18next";

export default function SupportedByAccountingMalta() {
  const { t } = useTranslation("services");
  const p = "accountingMalta.supported.";

  return (
    <section className="sct-dark support-mesh-wrap entrance-fade-up">
      <div className="mesh-bg" aria-hidden />

      <div className="sct-inner support-mesh-inner">
        <div className="sm-badge">
          <span className="sm-pulse" style={{ background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }} />{" "}
          {t(`${p}badge`)}
        </div>
        <h2 className="sm-title">
          {t(`${p}titleLine1`)}
          <br />
          {t(`${p}titleLine2`)}
        </h2>
        <p className="sm-text" dangerouslySetInnerHTML={{ __html: t(`${p}p1`) }} />
        <p className="sm-text" dangerouslySetInnerHTML={{ __html: t(`${p}p2`) }} />

        <div className="sm-logos">
          <div className="sm-logo-box">A4</div>
          <div className="sm-logo-plus">+</div>
          <div className="sm-logo-box a4">A4 Services</div>
        </div>
      </div>
    </section>
  );
}
