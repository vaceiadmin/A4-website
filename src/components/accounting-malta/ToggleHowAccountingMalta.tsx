"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type Side = "team" | "portal";

export default function ToggleHowAccountingMalta() {
  const { t } = useTranslation("services");
  const p = "accountingMalta.toggle.";
  const [side, setSide] = useState<Side>("team");

  return (
    <section className="sct toggle-section sct-light entrance-fade-up">
      <div className="sct-inner">
        <div className="toggle-hd">
          <span className="tag">{t(`${p}tag`)}</span>
          <h2>{t(`${p}title`)}</h2>
          <p className="lead" style={{ margin: "0 auto" }}>
            {t(`${p}lead`)}
          </p>
        </div>
        <div className="toggle-switcher" role="tablist" aria-label={t(`${p}ariaTablist`)}>
          <button
            type="button"
            role="tab"
            aria-selected={side === "team"}
            className={`t-btn${side === "team" ? " on" : ""}`}
            onClick={() => setSide("team")}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
            {t(`${p}tabTeam`)}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={side === "portal"}
            className={`t-btn${side === "portal" ? " on" : ""}`}
            onClick={() => setSide("portal")}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
            {t(`${p}tabPortal`)}
          </button>
        </div>

        <div className="t-panels">
          <div className={`t-panel${side === "team" ? " on" : ""}`} id="tp-team" role="tabpanel" aria-hidden={side !== "team"}>
            <div>
              <div className="t-badge tb-blue">{t(`${p}teamBadge`)}</div>
              <h3 className="t-panel-h">
                {t(`${p}teamH`)}
                <br />
                {t(`${p}teamH2`)}
              </h3>
              <p className="t-panel-p">{t(`${p}teamP`)}</p>
              <ul className="feat-list">
                <li className="feat-li">
                  <span className="feat-ico fi-b">
                    <svg width="16" height="16" fill="none" stroke="#1F5FD9" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M9 12h6M9 16h3M9 8h6M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <div>
                    <strong>{t(`${p}teamFeat1Title`)}</strong>
                    <span>{t(`${p}teamFeat1Desc`)}</span>
                  </div>
                </li>
                <li className="feat-li">
                  <span className="feat-ico fi-b">
                    <svg width="16" height="16" fill="none" stroke="#1F5FD9" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </span>
                  <div>
                    <strong>{t(`${p}teamFeat2Title`)}</strong>
                    <span>{t(`${p}teamFeat2Desc`)}</span>
                  </div>
                </li>
                <li className="feat-li">
                  <span className="feat-ico fi-b">
                    <svg width="16" height="16" fill="none" stroke="#1F5FD9" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                    </svg>
                  </span>
                  <div>
                    <strong>{t(`${p}teamFeat3Title`)}</strong>
                    <span>{t(`${p}teamFeat3Desc`)}</span>
                  </div>
                </li>
                <li className="feat-li">
                  <span className="feat-ico fi-b">
                    <svg width="16" height="16" fill="none" stroke="#1F5FD9" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                      <path d="M22 4L12 14.01l-3-3" />
                    </svg>
                  </span>
                  <div>
                    <strong>{t(`${p}teamFeat4Title`)}</strong>
                    <span>{t(`${p}teamFeat4Desc`)}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mini-portal">
              <div className="mp-chrome">
                <div className="mp-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="mp-title">{t(`${p}miniTeamChrome`)}</span>
                <div className="mp-badge-live">{t(`${p}miniLive`)}</div>
              </div>
              <div className="mp-body">
                <div className="mp-sidebar">
                  <div className="mp-logo">V</div>
                  <div className="mp-icon active">
                    <svg width="13" height="13" fill="none" stroke="rgba(255,255,255,.75)" viewBox="0 0 24 24" strokeWidth="1.8" aria-hidden>
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="mp-icon">
                    <svg width="13" height="13" fill="none" stroke="rgba(255,255,255,.28)" viewBox="0 0 24 24" strokeWidth="1.8" aria-hidden>
                      <path d="M9 12h6M9 16h6M9 8h6M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="mp-icon">
                    <svg width="13" height="13" fill="none" stroke="rgba(255,255,255,.28)" viewBox="0 0 24 24" strokeWidth="1.8" aria-hidden>
                      <path
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mp-content">
                  <div className="mp-section-label">{t(`${p}miniTeamSection`)}</div>
                  <div className="mp-team-list">
                    <div className="mp-team-row">
                      <div className="mp-av" style={{ background: "linear-gradient(135deg,#1F5FD9,#3B78F5)" }}>
                        S
                      </div>
                      <div className="mp-team-info">
                        <div className="mp-tname">{t(`${p}nameSarah`)}</div>
                        <div className="mp-trole">{t(`${p}roleLead`)}</div>
                      </div>
                      <div className="mp-status-dot green" />
                    </div>
                    <div className="mp-team-row">
                      <div className="mp-av" style={{ background: "linear-gradient(135deg,#3B78F5,#3B78F5)" }}>
                        J
                      </div>
                      <div className="mp-team-info">
                        <div className="mp-tname">{t(`${p}nameJames`)}</div>
                        <div className="mp-trole">{t(`${p}roleVat`)}</div>
                      </div>
                      <div className="mp-status-dot green" />
                    </div>
                    <div className="mp-team-row">
                      <div className="mp-av" style={{ background: "linear-gradient(135deg,#7C3AED,#A855F7)" }}>
                        L
                      </div>
                      <div className="mp-team-info">
                        <div className="mp-tname">{t(`${p}nameLaura`)}</div>
                        <div className="mp-trole">{t(`${p}roleCompliance`)}</div>
                      </div>
                      <div className="mp-status-dot green" />
                    </div>
                  </div>
                  <div className="mp-divider" />
                  <div className="mp-section-label" style={{ marginTop: 10 }}>
                    {t(`${p}recentActivity`)}
                  </div>
                  <div className="mp-activity">
                    <div className="mp-act-row">
                      <span className="mp-act-dot" style={{ background: "#3B78F5" }} />
                      <span>{t(`${p}act1`)}</span>
                      <span className="mp-act-time">{t(`${p}today`)}</span>
                    </div>
                    <div className="mp-act-row">
                      <span className="mp-act-dot" style={{ background: "#3B78F5" }} />
                      <span>{t(`${p}act2`)}</span>
                      <span className="mp-act-time">{t(`${p}actTimeApr22`)}</span>
                    </div>
                    <div className="mp-act-row">
                      <span className="mp-act-dot" style={{ background: "#A855F7" }} />
                      <span>{t(`${p}act3`)}</span>
                      <span className="mp-act-time">{t(`${p}actTimeApr18`)}</span>
                    </div>
                  </div>
                  <div className="mp-footer-bar">
                    <span className="mp-online-dot" />
                    {t(`${p}teamOnline`)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`t-panel${side === "portal" ? " on" : ""}`} id="tp-portal" role="tabpanel" aria-hidden={side !== "portal"}>
            <div>
              <div className="t-badge tb-teal">{t(`${p}portalBadge`)}</div>
              <h3 className="t-panel-h">
                {t(`${p}portalH`)}
                <br />
                {t(`${p}portalH2`)}
              </h3>
              <p className="t-panel-p">{t(`${p}portalP`)}</p>
              <ul className="feat-list">
                <li className="feat-li">
                  <span className="feat-ico fi-t">
                    <svg width="16" height="16" fill="none" stroke="#3B78F5" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M18 20V10M12 20V4M6 20v-6" />
                    </svg>
                  </span>
                  <div>
                    <strong>{t(`${p}portalFeat1Title`)}</strong>
                    <span>{t(`${p}portalFeat1Desc`)}</span>
                  </div>
                </li>
                <li className="feat-li">
                  <span className="feat-ico fi-t">
                    <svg width="16" height="16" fill="none" stroke="#3B78F5" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
                    </svg>
                  </span>
                  <div>
                    <strong>{t(`${p}portalFeat2Title`)}</strong>
                    <span>{t(`${p}portalFeat2Desc`)}</span>
                  </div>
                </li>
                <li className="feat-li">
                  <span className="feat-ico fi-t">
                    <svg width="16" height="16" fill="none" stroke="#3B78F5" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </span>
                  <div>
                    <strong>{t(`${p}portalFeat3Title`)}</strong>
                    <span>{t(`${p}portalFeat3Desc`)}</span>
                  </div>
                </li>
                <li className="feat-li">
                  <span className="feat-ico fi-t">
                    <svg width="16" height="16" fill="none" stroke="#3B78F5" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                  </span>
                  <div>
                    <strong>{t(`${p}portalFeat4Title`)}</strong>
                    <span>{t(`${p}portalFeat4Desc`)}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mini-portal">
              <div className="mp-chrome">
                <div className="mp-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="mp-title">{t(`${p}miniOverviewChrome`)}</span>
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
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  </div>
                  <div className="mp-icon">
                    <svg width="13" height="13" fill="none" stroke="rgba(255,255,255,.28)" viewBox="0 0 24 24" strokeWidth="1.8" aria-hidden>
                      <path
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mp-content">
                  <div className="mp-kpi-row">
                    <div className="mp-kpi">
                      <div className="mp-kpi-l">{t(`${p}kpiOwed`)}</div>
                      <div className="mp-kpi-v" style={{ color: "#3B78F5" }}>
                        €24,310
                      </div>
                    </div>
                    <div className="mp-kpi">
                      <div className="mp-kpi-l">{t(`${p}kpiYouOwe`)}</div>
                      <div className="mp-kpi-v">€8,740</div>
                    </div>
                    <div className="mp-kpi">
                      <div className="mp-kpi-l">{t(`${p}kpiBank`)}</div>
                      <div className="mp-kpi-v" style={{ color: "#C17D2A" }}>
                        €41,200
                      </div>
                    </div>
                  </div>
                  <div className="mp-divider" />
                  <div className="mp-section-label">{t(`${p}cashflow`)}</div>
                  <div className="mp-bars">
                    <div className="mp-bar-row">
                      <span>{t(`${p}cfIncome`)}</span>
                      <div className="mp-track">
                        <div className="mp-fill" style={{ width: "100%", background: "#3B78F5" }} />
                      </div>
                      <span>100%</span>
                    </div>
                    <div className="mp-bar-row">
                      <span>{t(`${p}cfAmount`)}</span>
                      <div className="mp-track">
                        <div className="mp-fill" style={{ width: "65%", background: "#3B78F5" }} />
                      </div>
                      <span>65%</span>
                    </div>
                    <div className="mp-bar-row">
                      <span>{t(`${p}cfVatDue`)}</span>
                      <div className="mp-track">
                        <div className="mp-fill" style={{ width: "0%", background: "#A855F7" }} />
                      </div>
                      <span>0%</span>
                    </div>
                    <div className="mp-bar-row">
                      <span />
                      <div className="mp-track">
                        <div className="mp-fill" style={{ width: "0%", background: "#C17D2A" }} />
                      </div>
                      <span>0%</span>
                    </div>
                  </div>
                  <div className="mp-footer-bar">
                    <span className="mp-online-dot" />
                    Books reconciled · Updated today
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="combined-row">
          <div className="eq-row">
            <div className="eq-chip ec-blue">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
              {t(`${p}eqTeam`)}
            </div>
            <span className="eq-plus">+</span>
            <div className="eq-chip ec-teal">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
              {t(`${p}eqPortal`)}
            </div>
            <span className="eq-plus">=</span>
            <div className="eq-chip ec-ink">A4</div>
          </div>
          <p className="eq-sub">{t(`${p}eqSub`)}</p>
          <div className="eq-quote">{t(`${p}eqQuote`)}</div>
        </div>
      </div>
    </section>
  );
}
