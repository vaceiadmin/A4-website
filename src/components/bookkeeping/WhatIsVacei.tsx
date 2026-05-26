"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  Monitor, 
  BookOpen, 
  RefreshCw, 
  FileText, 
  BarChart3, 
  PieChart, 
  Building2, 
  ClipboardCheck, 
  MessageSquare,
  Check,
  ArrowUp,
  Activity
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function WhatIsVacei() {
  const { t } = useTranslation("services");
  const [activeTab, setActiveTab] = useState<"team" | "portal">("team");
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    if (activeTab === "portal") {
      setAnimateBars(false);
      const timer = setTimeout(() => {
        setAnimateBars(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  return (
    <section className="wx-section">
      <div className="wx-inner">
        {/* Header */}
        <div className="wx-header">
          <span className="wx-eyebrow">{t("bookkeeping.whatIsVacei.eyebrow")}</span>
          <h2 className="wx-heading">{t("bookkeeping.whatIsVacei.title")}</h2>
          <p className="wx-sub">
            {t("bookkeeping.whatIsVacei.subtitle")}
          </p>
        </div>

        {/* Toggle */}
        <div className="wx-toggle-wrap">
          <button
            className={`wx-toggle-btn ${activeTab === "team" ? "active" : ""}`}
            onClick={() => setActiveTab("team")}
          >
            <span className="wx-toggle-icon"><Users size={16} /></span> {t("bookkeeping.whatIsVacei.btnTeam")}
          </button>
          <div
            className={`wx-toggle-track ${
              activeTab === "portal" ? "right" : ""
            }`}
            onClick={() =>
              setActiveTab(activeTab === "team" ? "portal" : "team")
            }
          >
            <div
              className={`wx-toggle-pill ${
                activeTab === "portal" ? "right" : ""
              }`}
            ></div>
          </div>
          <button
            className={`wx-toggle-btn ${
              activeTab === "portal" ? "active" : ""
            }`}
            onClick={() => setActiveTab("portal")}
          >
            <span className="wx-toggle-icon"><Monitor size={16} /></span> {t("bookkeeping.whatIsVacei.btnPortal")}
          </button>
        </div>

        {/* Content panels */}
        <div className="wx-panels">
          {/* TEAM panel */}
          <div
            className={`wx-panel ${activeTab === "team" ? "active" : ""}`}
            style={{ display: activeTab === "team" ? "grid" : "none" }}
          >
            <div className="wx-panel-left">
              <div className="wx-panel-badge team-badge">{t("bookkeeping.whatIsVacei.teamBadge")}</div>
              <h3 className="wx-panel-h" dangerouslySetInnerHTML={{ __html: t("bookkeeping.whatIsVacei.teamTitle") }}>
              </h3>
              <p className="wx-panel-p">
                {t("bookkeeping.whatIsVacei.teamDesc")}
              </p>
              <ul className="wx-feature-list">
                <li>
                  <span className="wx-feat-icon team-icon"><BookOpen size={18} className="text-blue-500" /></span>
                  <div>
                    <strong>{t("bookkeeping.whatIsVacei.teamList1Title")}</strong>
                    <span>{t("bookkeeping.whatIsVacei.teamList1Desc")}</span>
                  </div>
                </li>
                <li>
                  <span className="wx-feat-icon team-icon"><RefreshCw size={18} className="text-blue-500" /></span>
                  <div>
                    <strong>{t("bookkeeping.whatIsVacei.teamList2Title")}</strong>
                    <span>{t("bookkeeping.whatIsVacei.teamList2Desc")}</span>
                  </div>
                </li>
                <li>
                  <span className="wx-feat-icon team-icon"><FileText size={18} className="text-blue-500" /></span>
                  <div>
                    <strong>{t("bookkeeping.whatIsVacei.teamList3Title")}</strong>
                    <span>{t("bookkeeping.whatIsVacei.teamList3Desc")}</span>
                  </div>
                </li>
                <li>
                  <span className="wx-feat-icon team-icon"><BarChart3 size={18} className="text-blue-500" /></span>
                  <div>
                    <strong>{t("bookkeeping.whatIsVacei.teamList4Title")}</strong>
                    <span>{t("bookkeeping.whatIsVacei.teamList4Desc")}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="wx-panel-right">
              <div className="wx-tablet">
                <span className="wx-tablet-cam"></span>
                <div className="wx-tablet-screen">
                  <div className="wx-screen-bar">
                    <span className="wx-screen-logo">
                      VAC<span>E</span>I
                    </span>
                    <span className="wx-screen-status">
                      <span className="wx-screen-dot"></span>3 online
                    </span>
                  </div>
                  <div className="wx-screen-content">
                    <div className="wx-screen-section-label">Assigned team</div>
                    <div className="wx-team-cards">
                      <div className="wx-team-card">
                        <div
                          className="wx-avatar"
                          style={{ background: "#1A2640" }}
                        >
                          S
                        </div>
                        <div className="wx-team-info">
                          <span className="wx-team-name">Sarah M.</span>
                          <span className="wx-team-role">Lead Bookkeeper</span>
                        </div>
                        <span className="wx-online">
                          <span className="wx-online-dot"></span>Online
                        </span>
                      </div>
                      <div className="wx-team-card">
                        <div
                          className="wx-avatar"
                          style={{ background: "#0D2218" }}
                        >
                          J
                        </div>
                        <div className="wx-team-info">
                          <span className="wx-team-name">James R.</span>
                          <span className="wx-team-role">VAT Specialist</span>
                        </div>
                        <span className="wx-online">
                          <span className="wx-online-dot"></span>Online
                        </span>
                      </div>
                      <div className="wx-team-card">
                        <div
                          className="wx-avatar"
                          style={{ background: "#1E1230" }}
                        >
                          L
                        </div>
                        <div className="wx-team-info">
                          <span className="wx-team-name">Laura K.</span>
                          <span className="wx-team-role">Compliance</span>
                        </div>
                        <span className="wx-online">
                          <span className="wx-online-dot"></span>Online
                        </span>
                      </div>
                    </div>
                    <div className="wx-screen-section-label">
                      Recent activity
                    </div>
                    <div className="wx-activity-item">
                      <div
                        className="wx-act-icon"
                        style={{
                          background: "rgba(16,185,129,0.1)",
                          color: "#10B981",
                        }}
                      >
                        <Check size={12} />
                      </div>
                      <span>Bank reconciliation completed</span>
                      <span className="wx-act-time">Today</span>
                    </div>
                    <div className="wx-activity-item">
                      <div
                        className="wx-act-icon"
                        style={{
                          background: "rgba(79,142,247,0.1)",
                          color: "#4F8EF7",
                        }}
                      >
                        <ArrowUp size={12} />
                      </div>
                      <span>VAT return filed</span>
                      <span className="wx-act-time">Apr 22</span>
                    </div>
                    <div className="wx-activity-item">
                      <div
                        className="wx-act-icon"
                        style={{
                          background: "rgba(245,158,11,0.1)",
                          color: "#F59E0B",
                        }}
                      >
                        <Activity size={12} />
                      </div>
                      <span>Q1 management report ready</span>
                      <span className="wx-act-time">Apr 18</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PORTAL panel */}
          <div
            className={`wx-panel ${activeTab === "portal" ? "active" : ""}`}
            style={{ display: activeTab === "portal" ? "grid" : "none" }}
          >
            <div className="wx-panel-left">
              <div className="wx-panel-badge portal-badge">
                {t("bookkeeping.whatIsVacei.portalBadge")}
              </div>
              <h3 className="wx-panel-h" dangerouslySetInnerHTML={{ __html: t("bookkeeping.whatIsVacei.portalTitle") }}>
              </h3>
              <p className="wx-panel-p">
                {t("bookkeeping.whatIsVacei.portalDesc")}
              </p>
              <ul className="wx-feature-list">
                <li>
                  <span className="wx-feat-icon portal-icon"><PieChart size={18} className="text-green-500" /></span>
                  <div>
                    <strong>{t("bookkeeping.whatIsVacei.portalList1Title")}</strong>
                    <span>{t("bookkeeping.whatIsVacei.portalList1Desc")}</span>
                  </div>
                </li>
                <li>
                  <span className="wx-feat-icon portal-icon"><Building2 size={18} className="text-green-500" /></span>
                  <div>
                    <strong>{t("bookkeeping.whatIsVacei.portalList2Title")}</strong>
                    <span>{t("bookkeeping.whatIsVacei.portalList2Desc")}</span>
                  </div>
                </li>
                <li>
                  <span className="wx-feat-icon portal-icon"><ClipboardCheck size={18} className="text-green-500" /></span>
                  <div>
                    <strong>{t("bookkeeping.whatIsVacei.portalList3Title")}</strong>
                    <span>{t("bookkeeping.whatIsVacei.portalList3Desc")}</span>
                  </div>
                </li>
                <li>
                  <span className="wx-feat-icon portal-icon"><MessageSquare size={18} className="text-green-500" /></span>
                  <div>
                    <strong>{t("bookkeeping.whatIsVacei.portalList4Title")}</strong>
                    <span>{t("bookkeeping.whatIsVacei.portalList4Desc")}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="wx-panel-right portal-glow">
              <div className="wx-tablet">
                <span className="wx-tablet-cam"></span>
                <div className="wx-tablet-screen">
                  <div className="wx-screen-bar">
                    <span className="wx-screen-logo">
                      VAC<span>E</span>I
                    </span>
                    <span className="wx-screen-status">
                      <span className="wx-screen-dot"></span>Live
                    </span>
                  </div>
                  <div className="wx-screen-content">
                    <div className="wx-portal-kpis">
                      <div className="wx-pkpi">
                        <span className="wx-pkpi-label">Receivables</span>
                        <span
                          className="wx-pkpi-val"
                          style={{ color: "#10B981" }}
                        >
                          €24,310
                        </span>
                        <span className="wx-pkpi-delta">+12% vs last mo.</span>
                      </div>
                      <div className="wx-pkpi">
                        <span className="wx-pkpi-label">Payables</span>
                        <span
                          className="wx-pkpi-val"
                          style={{ color: "#F59E0B" }}
                        >
                          €8,740
                        </span>
                        <span className="wx-pkpi-delta">Due in 30 days</span>
                      </div>
                      <div className="wx-pkpi">
                        <span className="wx-pkpi-label">Bank</span>
                        <span
                          className="wx-pkpi-val"
                          style={{ color: "rgba(255,255,255,0.88)" }}
                        >
                          €41,200
                        </span>
                        <span className="wx-pkpi-delta">Reconciled today</span>
                      </div>
                    </div>
                    <div className="wx-chart-block">
                      <div className="wx-chart-header">
                        <span className="wx-chart-label">
                          Cash flow — 6 months
                        </span>
                        <div className="wx-chart-legend">
                          <span className="wx-chart-leg">
                            <span
                              className="wx-chart-leg-dot"
                              style={{ background: "#10B981" }}
                            ></span>
                            In
                          </span>
                          <span className="wx-chart-leg">
                            <span
                              className="wx-chart-leg-dot"
                              style={{ background: "#4F8EF7" }}
                            ></span>
                            Out
                          </span>
                        </div>
                      </div>
                      <svg
                        className="wx-chart"
                        viewBox="0 0 300 48"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient id="gIn2" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="0%"
                              stopColor="#10B981"
                              stopOpacity="0.2"
                            />
                            <stop
                              offset="100%"
                              stopColor="#10B981"
                              stopOpacity="0"
                            />
                          </linearGradient>
                          <linearGradient
                            id="gOut2"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#4F8EF7"
                              stopOpacity="0.15"
                            />
                            <stop
                              offset="100%"
                              stopColor="#4F8EF7"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>
                        <polygon
                          points="0,34 60,26 120,22 180,14 240,18 300,6 300,48 0,48"
                          fill="url(#gIn2)"
                        />
                        <polyline
                          points="0,34 60,26 120,22 180,14 240,18 300,6"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <polygon
                          points="0,40 60,37 120,39 180,33 240,36 300,30 300,48 0,48"
                          fill="url(#gOut2)"
                        />
                        <polyline
                          points="0,40 60,37 120,39 180,33 240,36 300,30"
                          fill="none"
                          stroke="#4F8EF7"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <text
                          x="0"
                          y="48"
                          fontSize="6.5"
                          fill="rgba(255,255,255,0.2)"
                          fontFamily="Inter,sans-serif"
                        >
                          Nov
                        </text>
                        <text
                          x="60"
                          y="48"
                          fontSize="6.5"
                          fill="rgba(255,255,255,0.2)"
                          fontFamily="Inter,sans-serif"
                          textAnchor="middle"
                        >
                          Dec
                        </text>
                        <text
                          x="120"
                          y="48"
                          fontSize="6.5"
                          fill="rgba(255,255,255,0.2)"
                          fontFamily="Inter,sans-serif"
                          textAnchor="middle"
                        >
                          Jan
                        </text>
                        <text
                          x="180"
                          y="48"
                          fontSize="6.5"
                          fill="rgba(255,255,255,0.2)"
                          fontFamily="Inter,sans-serif"
                          textAnchor="middle"
                        >
                          Feb
                        </text>
                        <text
                          x="240"
                          y="48"
                          fontSize="6.5"
                          fill="rgba(255,255,255,0.2)"
                          fontFamily="Inter,sans-serif"
                          textAnchor="middle"
                        >
                          Mar
                        </text>
                        <text
                          x="300"
                          y="48"
                          fontSize="6.5"
                          fill="rgba(255,255,255,0.2)"
                          fontFamily="Inter,sans-serif"
                          textAnchor="end"
                        >
                          Apr
                        </text>
                      </svg>
                    </div>
                    <div className="wx-portal-status">
                      <span className="wx-pstatus-dot"></span>Books reconciled ·
                      Updated today 09:14
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Combined footer */}
        <div className="wx-combined">
          <div className="wx-combined-inner">
            <div className="wx-combined-eq">
              <div className="wx-eq-pill team-pill">
                <span className="wx-eq-pill-icon"><Users size={16} /></span>
                <span>{t("bookkeeping.whatIsVacei.btnTeam")}</span>
              </div>
              <div className="wx-eq-operator">+</div>
              <div className="wx-eq-pill portal-pill">
                <span className="wx-eq-pill-icon"><Monitor size={16} /></span>
                <span>{t("bookkeeping.whatIsVacei.btnPortal")}</span>
              </div>
              <div className="wx-eq-operator">=</div>
              <div className="wx-eq-pill vacei-pill">VACEI</div>
            </div>
            <p className="wx-combined-desc">
              {t("bookkeeping.whatIsVacei.combinedDesc")}
            </p>
            <div className="wx-quote">
              {t("bookkeeping.whatIsVacei.combinedQuote")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
