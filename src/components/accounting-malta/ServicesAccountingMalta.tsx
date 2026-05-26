"use client";

import React from "react";
import { useTranslation } from "react-i18next";

export default function ServicesAccountingMalta() {
  const { t } = useTranslation("services");
  const p = "accountingMalta.services.";

  return (
    <section className="sct svcs-wrap sct-dark entrance-fade-up">
      <div className="sct-inner">
        <span className="tag tag-dk">{t(`${p}tag`)}</span>
        <h2 className="dk">
          {t(`${p}titleLine1`)}
          <br />
          {t(`${p}titleLine2`)}
        </h2>
        <p className="lead dk">{t(`${p}lead`)}</p>
        <div className="svc-grid">
          <div className="svc-card">
            <div className="svc-ico si-b">
              <svg width="17" height="17" fill="none" stroke="#4F86FF" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M9 12h6M9 16h3M9 8h6M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="svc-title">{t(`${p}c1Title`)}</div>
            <div className="svc-desc">{t(`${p}c1Desc`)}</div>
          </div>
          <div className="svc-card">
            <div className="svc-ico si-t">
              <svg width="17" height="17" fill="none" stroke="#3B78F5" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <div className="svc-title">{t(`${p}c2Title`)}</div>
            <div className="svc-desc">{t(`${p}c2Desc`)}</div>
          </div>
          <div className="svc-card">
            <div className="svc-ico si-a">
              <svg width="17" height="17" fill="none" stroke="#C17D2A" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 3v18M3 9l9 3 9-3M3 15l9 3 9-3" />
              </svg>
            </div>
            <div className="svc-title">{t(`${p}c3Title`)}</div>
            <div className="svc-desc">{t(`${p}c3Desc`)}</div>
          </div>
          <div className="svc-card">
            <div className="svc-ico si-b">
              <svg width="17" height="17" fill="none" stroke="#4F86FF" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            </div>
            <div className="svc-title">{t(`${p}c4Title`)}</div>
            <div className="svc-desc">{t(`${p}c4Desc`)}</div>
          </div>
          <div className="svc-card">
            <div className="svc-ico si-t">
              <svg width="17" height="17" fill="none" stroke="#3B78F5" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <div className="svc-title">{t(`${p}c5Title`)}</div>
            <div className="svc-desc">{t(`${p}c5Desc`)}</div>
          </div>
          <div className="svc-card">
            <div className="svc-ico si-s">
              <svg width="17" height="17" fill="none" stroke="#fff" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>
            <div className="svc-title">{t(`${p}c6Title`)}</div>
            <div className="svc-desc">{t(`${p}c6Desc`)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
