"use client";

import React from "react";
import { ArrowRight, Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CALENDLY_DEMO_URL, CLIENT_ONBOARDING_URL } from "@/lib/external-links";

export default function FinalCta() {
  const { t } = useTranslation("services");

  return (
    <div className="cta-wrap">
      <div className="cta-inner">
        <p className="cta-eyebrow">
          {t("bookkeeping.finalCta.eyebrow")}
        </p>
        <h2 className="cta-h">{t("bookkeeping.finalCta.title")}</h2>
        <p className="cta-p">
          {t("bookkeeping.finalCta.desc")}
        </p>
        <div className="cta-btns">
          <a href={CLIENT_ONBOARDING_URL} className="btn-cta-primary">
            {t("bookkeeping.finalCta.btnPrimary")}
            <ArrowRight size={16} />
          </a>
          <a
            href={CALENDLY_DEMO_URL}
            className="btn-cta-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Play size={16} fill="currentColor" aria-hidden />
            {t("bookkeeping.finalCta.btnGhost")}
          </a>
        </div>
        <p className="cta-sub">
          {t("bookkeeping.finalCta.eyebrow")}
        </p>
      </div>
    </div>
  );
}
