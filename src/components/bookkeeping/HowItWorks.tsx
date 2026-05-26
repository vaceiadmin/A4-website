"use client";

import React from "react";
import { Link2, Cpu, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HowItWorks() {
  const { t } = useTranslation("services");

  return (
    <div id="how" className="how-wrap-light">
      <div className="how-inner">
        <span className="eyebrow-dark">{t("bookkeeping.howItWorks.eyebrow")}</span>
        <h2 className="section-h">{t("bookkeeping.howItWorks.title")}</h2>
        <p className="section-p">
          {t("bookkeeping.howItWorks.desc")}
        </p>
        <div className="steps-row-light">
          <div className="step-light">
            <div className="step-num-light"><Link2 size={24} /></div>
            <div className="step-title-light">{t("bookkeeping.howItWorks.step1Title")}</div>
            <div className="step-desc-light">
              {t("bookkeeping.howItWorks.step1Desc")}
            </div>
            <div className="step-micro-light">{t("bookkeeping.howItWorks.step1Micro")}</div>
          </div>
          <div className="step-light">
            <div className="step-num-light"><Cpu size={24} /></div>
            <div className="step-title-light">{t("bookkeeping.howItWorks.step2Title")}</div>
            <div className="step-desc-light">
              {t("bookkeeping.howItWorks.step2Desc")}
            </div>
            <div className="step-micro-light">{t("bookkeeping.howItWorks.step2Micro")}</div>
          </div>
          <div className="step-light">
            <div className="step-num-light"><TrendingUp size={24} /></div>
            <div className="step-title-light">{t("bookkeeping.howItWorks.step3Title")}</div>
            <div className="step-desc-light">
              {t("bookkeeping.howItWorks.step3Desc")}
            </div>
            <div className="step-micro-light">
              {t("bookkeeping.howItWorks.step3Micro")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
