"use client";

import React from "react";
import { Building } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CredibilitySection() {
  const { t } = useTranslation("services");

  return (
    <div
      style={{
        background: "var(--white)",
        padding: "56px 6vw",
        borderTop: "1px solid var(--light-border)",
        borderBottom: "1px solid var(--light-border)",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          display: "flex",
          gap: "32px",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "var(--blue-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            flexShrink: 0,
          }}
        >
          <Building size={24} className="text-blue-500" />
        </div>
        <div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--blue-mid)",
              marginBottom: "10px",
            }}
          >
            {t("bookkeeping.credibility.title")}
          </div>
          <p
            style={{
              fontSize: "15px",
              fontWeight: 500,
              color: "var(--text-primary)",
              marginBottom: "8px",
              lineHeight: 1.4,
            }}
          >
            {t("bookkeeping.credibility.p1")}
          </p>
          <p
            style={{
              fontSize: "14px",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
            }}
          >
            {t("bookkeeping.credibility.p2")}
          </p>
        </div>
      </div>
    </div>
  );
}
