"use client";

import React from "react";
import { useTranslation } from "react-i18next";

export default function TrustBandAccountingMalta() {
  const { t } = useTranslation("services");
  const p = "accountingMalta.trust.";

  return (
    <div className="trust-band sct-light" style={{ padding: "16px 7vw" }}>
      <div className="trust-row">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="trust-item">
            <span className="trust-pip" />
            {t(`${p}t${i}`)}
          </div>
        ))}
      </div>
    </div>
  );
}
