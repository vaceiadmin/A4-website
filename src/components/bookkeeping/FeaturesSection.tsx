"use client";

import React from "react";
import { 
  BookOpen, 
  TrendingUp, 
  Receipt, 
  Monitor, 
  Building2, 
  Users 
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function FeaturesSection() {
  const { t } = useTranslation("services");

  return (
    <div id="features" className="features-wrap-dark">
      <div className="section-inner">
        <span
          className="eyebrow-dark"
          style={{ color: "rgba(122,163,250,0.7)" }}
        >
          {t("bookkeeping.features.eyebrow")}
        </span>
        <h2 className="section-h" style={{ color: "var(--white)" }}>
          {t("bookkeeping.features.title1")}
          <br />{t("bookkeeping.features.title2")}
        </h2>
        <p className="section-p" style={{ color: "rgba(255,255,255,0.5)" }}>
          {t("bookkeeping.features.desc")}
        </p>
        <div className="feat-grid">
          <div className="feat-card-dark">
            <div className="feat-icon fi-blue"><BookOpen size={20} className="text-blue-400" /></div>
            <div className="feat-title-dark">{t("bookkeeping.features.card1Title")}</div>
            <div className="feat-body-dark">
              {t("bookkeeping.features.card1Desc")}
            </div>
          </div>
          <div className="feat-card-dark">
            <div className="feat-icon fi-green"><TrendingUp size={20} className="text-green-400" /></div>
            <div className="feat-title-dark">{t("bookkeeping.features.card2Title")}</div>
            <div className="feat-body-dark">
              {t("bookkeeping.features.card2Desc")}
            </div>
          </div>
          <div className="feat-card-dark">
            <div className="feat-icon fi-amber"><Receipt size={20} className="text-amber-400" /></div>
            <div className="feat-title-dark">{t("bookkeeping.features.card3Title")}</div>
            <div className="feat-body-dark">
              {t("bookkeeping.features.card3Desc")}
            </div>
          </div>
          <div className="feat-card-dark">
            <div className="feat-icon fi-blue"><Monitor size={20} className="text-blue-400" /></div>
            <div className="feat-title-dark">{t("bookkeeping.features.card4Title")}</div>
            <div className="feat-body-dark">
              {t("bookkeeping.features.card4Desc")}
            </div>
          </div>
          <div className="feat-card-dark">
            <div className="feat-icon fi-green"><Building2 size={20} className="text-green-400" /></div>
            <div className="feat-title-dark">{t("bookkeeping.features.card5Title")}</div>
            <div className="feat-body-dark">
              {t("bookkeeping.features.card5Desc")}
            </div>
          </div>
          <div className="feat-card-dark">
            <div className="feat-icon fi-slate"><Users size={20} className="text-slate-400" /></div>
            <div className="feat-title-dark">{t("bookkeeping.features.card6Title")}</div>
            <div className="feat-body-dark">
              {t("bookkeeping.features.card6Desc")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
