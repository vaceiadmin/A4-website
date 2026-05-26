"use client";

import React from "react";
import { useTranslation } from "react-i18next";

export default function TrackerAccountingMalta() {
  const { t } = useTranslation("services");
  const p = "accountingMalta.tracker.";

  return (
    <section className="sct tracker-wrap sct-dark entrance-fade-up">
      <div className="sct-inner">
        <span className="tag tag-dk">{t(`${p}tag`)}</span>
        <h2 className="dk">{t(`${p}title`)}</h2>
        <p className="lead dk">{t(`${p}lead`)}</p>
        <div className="tracker-grid">
          <div>
            <ul className="check-list">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <li key={i} className="check-li">
                  <span className="chk">✓</span>
                  {t(`${p}check${i}`)}
                </li>
              ))}
            </ul>
            <div className="tracker-note">{t(`${p}note`)}</div>
          </div>
          <div className="mini-portal">
            <div className="mp-chrome">
              <div className="mp-dots">
                <span />
                <span />
                <span />
              </div>
              <span className="mp-title">{t(`${p}miniChrome`)}</span>
              <div className="mp-badge-live">{t(`${p}miniLive`)}</div>
            </div>
            <div className="mp-body">
              <div className="mp-sidebar">
                <div className="mp-logo">V</div>
                <div className="mp-icon">
                  <svg width="13" height="13" fill="none" stroke="rgba(255,255,255,.28)" viewBox="0 0 24 24" strokeWidth="1.8" aria-hidden>
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="mp-icon active">
                  <svg width="13" height="13" fill="none" stroke="rgba(255,255,255,.75)" viewBox="0 0 24 24" strokeWidth="1.8" aria-hidden>
                    <path
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="mp-icon">
                  <svg width="13" height="13" fill="none" stroke="rgba(255,255,255,.28)" viewBox="0 0 24 24" strokeWidth="1.8" aria-hidden>
                    <path
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="mp-content">
                <div className="mp-section-label">{t(`${p}sectionLabel`)}</div>
                <div className="mp-phases">
                  <div className="mp-phase done">
                    <div className="mp-phase-icon done-i">✓</div>
                    <div className="mp-phase-info">
                      <div className="mp-phase-name">{t(`${p}phase1`)}</div>
                    </div>
                    <span className="mp-phase-badge blue">{t(`${p}badgeComplete`)}</span>
                  </div>
                  <div className="mp-phase done">
                    <div className="mp-phase-icon done-i">✓</div>
                    <div className="mp-phase-info">
                      <div className="mp-phase-name">{t(`${p}phase2`)}</div>
                    </div>
                    <span className="mp-phase-badge green">{t(`${p}badgeComplete`)}</span>
                  </div>
                  <div className="mp-phase active">
                    <div className="mp-phase-icon active-i">3</div>
                    <div className="mp-phase-info">
                      <div className="mp-phase-name">{t(`${p}phase3`)}</div>
                    </div>
                    <span className="mp-phase-badge blue">{t(`${p}badgeActive`)}</span>
                  </div>
                  <div className="mp-phase wait">
                    <div className="mp-phase-icon wait-i">4</div>
                    <div className="mp-phase-info">
                      <div className="mp-phase-name">{t(`${p}phase4`)}</div>
                    </div>
                    <span className="mp-phase-badge grey">{t(`${p}badgePending`)}</span>
                  </div>
                  <div className="mp-phase wait">
                    <div className="mp-phase-icon wait-i">5</div>
                    <div className="mp-phase-info">
                      <div className="mp-phase-name">{t(`${p}phase5`)}</div>
                    </div>
                    <span className="mp-phase-badge grey">{t(`${p}badgePending`)}</span>
                  </div>
                </div>
                <div className="mp-footer-bar">
                  <span className="mp-online-dot" style={{ background: "var(--accent)" }} />
                  {t(`${p}footerBar`)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
