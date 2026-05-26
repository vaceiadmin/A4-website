"use client";

import React from "react";
import { useTranslation } from "react-i18next";

export default function HowStepsAccountingMalta() {
  const { t } = useTranslation("services");
  const p = "accountingMalta.howSteps.";

  return (
    <section id="how" className="sct how-wrap sct-light entrance-fade-up">
      <div className="sct-inner">
        <span className="tag">{t(`${p}tag`)}</span>
        <h2>{t(`${p}title`)}</h2>
        <p className="lead">{t(`${p}lead`)}</p>
        <div className="how-steps">
          <div className="h-step">
            <div className="h-num">1</div>
            <div className="h-title">{t(`${p}s1Title`)}</div>
            <div className="h-desc">{t(`${p}s1Desc`)}</div>
            <div className="h-micro">{t(`${p}s1Micro`)}</div>
          </div>
          <div className="h-step">
            <div className="h-num">2</div>
            <div className="h-title">{t(`${p}s2Title`)}</div>
            <div className="h-desc">{t(`${p}s2Desc`)}</div>
            <div className="h-micro">{t(`${p}s2Micro`)}</div>
          </div>
          <div className="h-step">
            <div className="h-num">3</div>
            <div className="h-title">{t(`${p}s3Title`)}</div>
            <div className="h-desc">{t(`${p}s3Desc`)}</div>
            <div className="h-micro">{t(`${p}s3Micro`)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
