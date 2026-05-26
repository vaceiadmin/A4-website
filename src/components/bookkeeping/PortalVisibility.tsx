"use client";

import React from "react";
import MockDashboard from "./MockDashboard";
import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PortalVisibility() {
  const { t } = useTranslation("services");

  return (
    <div id="portal" className="vis-wrap-dark">
      <div className="vis-inner-new">
        {/* Header row */}
        <div className="vis-header">
          <div className="vis-header-left">
            <span
              className="eyebrow-dark"
              style={{ color: "rgba(122,163,250,0.7)" }}
            >
              {t("bookkeeping.portalVisibility.eyebrow")}
            </span>
            <h2 className="section-h" style={{ color: "var(--white)" }}>
              {t("bookkeeping.portalVisibility.title")}
            </h2>
            <p
              className="section-p"
              style={{ color: "rgba(255,255,255,0.42)", maxWidth: "520px" }}
            >
              {t("bookkeeping.portalVisibility.desc")}
            </p>
          </div>
          <div className="vis-header-right">
            <ul className="vis-list-dark">
              <li>
                <CheckCircle2 size={16} className="text-green-500" />{t("bookkeeping.portalVisibility.list1")}
              </li>
              <li>
                <CheckCircle2 size={16} className="text-green-500" />{t("bookkeeping.portalVisibility.list2")}
              </li>
              <li>
                <CheckCircle2 size={16} className="text-green-500" />{t("bookkeeping.portalVisibility.list3")}
              </li>
              <li>
                <CheckCircle2 size={16} className="text-green-500" />{t("bookkeeping.portalVisibility.list4")}
              </li>
              <li>
                <CheckCircle2 size={16} className="text-green-500" />{t("bookkeeping.portalVisibility.list5")}
              </li>
              <li>
                <CheckCircle2 size={16} className="text-green-500" />{t("bookkeeping.portalVisibility.list6")}
              </li>
            </ul>
            <p className="vis-tagline">{t("bookkeeping.portalVisibility.tagline")}</p>
          </div>
        </div>

        {/* Dashboard full width below */}
        <div className="vis-dashboard-wrap">
          <div id="demo" className="vis-dashboard-wrap">
            <MockDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}
