"use client";

import React from "react";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TrustStrip() {
  const { t } = useTranslation("services");

  return (
    <div className="trust-strip">
      <div className="trust-inner">
        <div className="trust-item">
          <Check size={14} className="text-green-500" /> {t("bookkeeping.trust.item1")}
        </div>
        <div className="trust-item">
          <Check size={14} className="text-green-500" /> {t("bookkeeping.trust.item2")}
        </div>
        <div className="trust-item">
          <Check size={14} className="text-green-500" /> {t("bookkeeping.trust.item3")}
        </div>
        <div className="trust-item">
          <Check size={14} className="text-green-500" /> {t("bookkeeping.trust.item4")}
        </div>
      </div>
    </div>
  );
}
