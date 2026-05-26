"use client";

import React, { useCallback, useId, useMemo, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

type TabKey = "bank" | "bills" | "invoices" | "payroll" | "vat";

const TAB_ORDER: TabKey[] = ["bank", "bills", "invoices", "payroll", "vat"];

export default function PortalTabsAccountingMalta() {
  const { t, i18n } = useTranslation("services");
  const pt = "accountingMalta.portalTabs.";

  const pillMeta = useMemo(
    () =>
      ({
        bank: {
          url: t(`${pt}tabs.bank.url`),
          ambient: "radial-gradient(circle, #1F5FD9 0%, transparent 70%)",
          label: t(`${pt}tabs.bank.label`),
          pillColor: "#3B78F5",
          pillGlow: "rgba(59,120,245,.5)",
        },
        bills: {
          url: t(`${pt}tabs.bills.url`),
          ambient: "radial-gradient(circle, #DC2626 0%, transparent 70%)",
          label: t(`${pt}tabs.bills.label`),
          pillColor: "#DC2626",
          pillGlow: "rgba(220,38,38,.5)",
        },
        invoices: {
          url: t(`${pt}tabs.invoices.url`),
          ambient: "radial-gradient(circle, #3B78F5 0%, transparent 70%)",
          label: t(`${pt}tabs.invoices.label`),
          pillColor: "#3B78F5",
          pillGlow: "rgba(59,120,245,.5)",
        },
        payroll: {
          url: t(`${pt}tabs.payroll.url`),
          ambient: "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
          label: t(`${pt}tabs.payroll.label`),
          pillColor: "#9855F5",
          pillGlow: "rgba(152,85,245,.5)",
        },
        vat: {
          url: t(`${pt}tabs.vat.url`),
          ambient: "radial-gradient(circle, #0EA5E9 0%, transparent 70%)",
          label: t(`${pt}tabs.vat.label`),
          pillColor: "#0EA5E9",
          pillGlow: "rgba(14,165,233,.5)",
        },
      }) as Record<TabKey, { url: string; ambient: string; label: string; pillColor: string; pillGlow: string }>,
    [t, i18n.language]
  );

  const [tab, setTab] = useState<TabKey>("bank");
  const [mobileNav, setMobileNav] = useState(false);
  const gid = useId().replace(/:/g, "");
  const pillBtnRefs = useRef<Partial<Record<TabKey, HTMLButtonElement | null>>>({});
  const pillsScrollRef = useRef<HTMLDivElement>(null);

  const switchTab = useCallback((next: TabKey) => {
    if (next === tab) return;
    window.setTimeout(() => setTab(next), 40);
  }, [tab]);

  const ambient = useMemo(() => pillMeta[tab].ambient, [tab, pillMeta]);
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 700px)");
    const sync = () => setMobileNav(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!mobileNav) return;
    const row = pillsScrollRef.current;
    const btn = pillBtnRefs.current[tab];
    if (!row || !btn) return;
    const targetLeft = btn.offsetLeft + btn.offsetWidth / 2 - row.clientWidth / 2;
    const maxScroll = Math.max(0, row.scrollWidth - row.clientWidth);
    row.scrollTo({
      left: Math.max(0, Math.min(targetLeft, maxScroll)),
      behavior: "smooth",
    });
  }, [tab, mobileNav]);

  useEffect(() => {
    if (!isInView || mobileNav) return;

    const interval = setInterval(() => {
      setTab((prev) => {
        const currentIndex = TAB_ORDER.indexOf(prev);
        const nextIndex = (currentIndex + 1) % TAB_ORDER.length;
        return TAB_ORDER[nextIndex];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isInView, mobileNav]);

  return (
    <section ref={sectionRef} className="sel-section sct-dark entrance-fade-up">
      <div
        className="sel-ambient"
        style={{ background: ambient }}
        aria-hidden
      />
      <div className="sel-inner">
        <div className="sel-intro">
          <div className="sel-kicker">
            <span className="sel-kicker-bar" />
            {t(`${pt}intro.kickerMid`)}
            <span className="sel-kicker-bar" />
          </div>
          <h2>
            {t(`${pt}intro.h2`)}
            <span>{t(`${pt}intro.h2Span`)}</span>
          </h2>
          <p>{t(`${pt}intro.p`)}</p>
        </div>

        <div ref={pillsScrollRef} className="sel-pills" role="tablist" aria-label={t(`${pt}ariaTablist`)}>
          {TAB_ORDER.map((key) => {
            const m = pillMeta[key];
            const active = tab === key;
            return (
              <button
                key={key}
                ref={(node) => {
                  pillBtnRefs.current[key] = node;
                }}
                type="button"
                role="tab"
                aria-selected={active}
                className={`sel-pill${active ? " active" : ""}`}
                style={
                  {
                    "--pill-color": m.pillColor,
                    "--pill-glow": m.pillGlow,
                  } as React.CSSProperties
                }
                onClick={() => switchTab(key)}
              >
                <span className="sel-pill-icon">{pillIcon(key)}</span>
                <span className="sel-pill-text">{m.label}</span>
              </button>
            );
          })}
        </div>

        <div className="portal-window">
          <div className="pw-chrome">
            <div className="pw-dots">
              <div className="pw-dot" />
              <div className="pw-dot" />
              <div className="pw-dot" />
            </div>
            <div className="pw-url">
              <div className="pw-url-dot" />
              <span>{pillMeta[tab].url}</span>
            </div>
            <div className="pw-live">{t(`${pt}chrome.live`)}</div>
            <div className="pw-user">
              <div className="pw-avatar">A</div>
              <span className="pw-uname">{t(`${pt}chrome.user`)}</span>
            </div>
          </div>

          <div className="pw-body">
            <div className="pw-sidebar">
              <div className="pw-logo">V</div>
              {TAB_ORDER.map((key) => (
                <div
                  key={key}
                  className={`pw-nav${tab === key ? " act" : ""}`}
                  aria-hidden
                >
                  {sidebarIcon(key, tab === key)}
                </div>
              ))}
            </div>

            <div className="pw-content">
              <div className={`pw-panel${tab === "bank" ? " visible" : ""}`} id="panel-bank" aria-hidden={tab !== "bank"}>
                <div className="pn-banner bk-banner">
                  <div className="pn-banner-h">{t(`${pt}bank.bannerH`)}</div>
                  <div className="pn-banner-s">{t(`${pt}bank.bannerS`)}</div>
                </div>
                <div className="pn-grid-4">
                  <div className="pn-stat bk-stat-1">
                    <div className="pn-stat-label">{t(`${pt}bank.s1l`)}</div>
                    <div className="pn-stat-val">{t(`${pt}bank.s1v`)}</div>
                    <div className="pn-stat-sub">{t(`${pt}bank.s1s`)}</div>
                  </div>
                  <div className="pn-stat bk-stat-2">
                    <div className="pn-stat-label">{t(`${pt}bank.s2l`)}</div>
                    <div className="pn-stat-val">{t(`${pt}bank.s2v`)}</div>
                    <div className="pn-stat-sub">{t(`${pt}bank.s2s`)}</div>
                  </div>
                  <div className="pn-stat bk-stat-3">
                    <div className="pn-stat-label">{t(`${pt}bank.s3l`)}</div>
                    <div className="pn-stat-val">{t(`${pt}bank.s3v`)}</div>
                    <div className="pn-stat-sub">{t(`${pt}bank.s3s`)}</div>
                  </div>
                  <div className="pn-stat bk-stat-4">
                    <div className="pn-stat-label">{t(`${pt}bank.s4l`)}</div>
                    <div className="pn-stat-val">{t(`${pt}bank.s4v`)}</div>
                    <div className="pn-stat-sub">{t(`${pt}bank.s4s`)}</div>
                  </div>
                </div>
                <div className="pn-grid-2">
                  <div className="pn-card">
                    <div className="pn-card-title">{t(`${pt}bank.accountsTitle`)}</div>
                    <div className="pn-row">
                      <div className="pn-row-ico" style={{ background: "#EEF4FF" }}>
                        <svg width="13" height="13" fill="none" stroke="#1F5FD9" viewBox="0 0 24 24" strokeWidth="2" aria-hidden>
                          <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 10v11M16 10v11" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <div className="pn-row-name">{t(`${pt}bank.row1n`)}</div>
                        <div className="pn-row-sub">{t(`${pt}bank.row1s`)}</div>
                      </div>
                      <div className="pn-row-val" style={{ color: "#1F5FD9" }}>
                        {t(`${pt}bank.row1v`)}
                      </div>
                    </div>
                    <div className="pn-row">
                      <div className="pn-row-ico" style={{ background: "#F0FFF4" }}>
                        <svg width="13" height="13" fill="none" stroke="#3B78F5" viewBox="0 0 24 24" strokeWidth="2" aria-hidden>
                          <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 10v11M16 10v11" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <div className="pn-row-name">{t(`${pt}bank.row2n`)}</div>
                        <div className="pn-row-sub">{t(`${pt}bank.row2s`)}</div>
                      </div>
                      <div className="pn-row-val" style={{ color: "#3B78F5" }}>
                        {t(`${pt}bank.row2v`)}
                      </div>
                    </div>
                    <div className="pn-row">
                      <div className="pn-row-ico" style={{ background: "#FFF7ED" }}>
                        <svg width="13" height="13" fill="none" stroke="#B45309" viewBox="0 0 24 24" strokeWidth="2" aria-hidden>
                          <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 10v11M16 10v11" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <div className="pn-row-name">{t(`${pt}bank.row3n`)}</div>
                        <div className="pn-row-sub">{t(`${pt}bank.row3s`)}</div>
                      </div>
                      <div className="pn-row-val" style={{ color: "#B45309" }}>
                        {t(`${pt}bank.row3v`)}
                      </div>
                    </div>
                  </div>
                  <div className="pn-card">
                    <div className="pn-card-title">{t(`${pt}bank.cashTitle`)}</div>
                    <svg className="spark" viewBox="0 0 240 28" preserveAspectRatio="none" aria-hidden>
                      <defs>
                        <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#1F5FD9" stopOpacity=".18" />
                          <stop offset="100%" stopColor="#1F5FD9" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <polygon points="0,22 40,18 80,20 120,12 160,14 200,7 240,4 240,28 0,28" fill={`url(#${gid})`} />
                      <polyline
                        points="0,22 40,18 80,20 120,12 160,14 200,7 240,4"
                        fill="none"
                        stroke="#1F5FD9"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 9, color: "#9AA2B8" }}>
                      <span>{t(`${pt}months.nov`)}</span>
                      <span>{t(`${pt}months.dec`)}</span>
                      <span>{t(`${pt}months.jan`)}</span>
                      <span>{t(`${pt}months.feb`)}</span>
                      <span>{t(`${pt}months.mar`)}</span>
                      <span>{t(`${pt}months.apr`)}</span>
                    </div>
                  </div>
                </div>
                <div className="pn-foot">{t(`${pt}bank.foot`)}</div>
              </div>

              <div className={`pw-panel${tab === "bills" ? " visible" : ""}`} id="panel-bills" aria-hidden={tab !== "bills"}>
                <div className="pn-banner bl-banner">
                  <div className="pn-banner-h">{t(`${pt}bills.bannerH`)}</div>
                  <div className="pn-banner-s">{t(`${pt}bills.bannerS`)}</div>
                </div>
                <div className="pn-grid-3">
                  <div className="pn-stat bl-stat-red">
                    <div className="pn-stat-label">{t(`${pt}bills.s1l`)}</div>
                    <div className="pn-stat-val">{t(`${pt}bills.s1v`)}</div>
                    <div className="pn-stat-sub">{t(`${pt}bills.s1s`)}</div>
                  </div>
                  <div className="pn-stat bl-stat-amber">
                    <div className="pn-stat-label">{t(`${pt}bills.s2l`)}</div>
                    <div className="pn-stat-val">{t(`${pt}bills.s2v`)}</div>
                    <div className="pn-stat-sub">{t(`${pt}bills.s2s`)}</div>
                  </div>
                  <div className="pn-stat bl-stat-green">
                    <div className="pn-stat-label">{t(`${pt}bills.s3l`)}</div>
                    <div className="pn-stat-val">{t(`${pt}bills.s3v`)}</div>
                    <div className="pn-stat-sub">{t(`${pt}bills.s3s`)}</div>
                  </div>
                </div>
                <div className="pn-card">
                  <div className="pn-card-title">{t(`${pt}bills.pipeTitle`)}</div>
                  <div className="pn-row">
                    <div className="pn-row-ico" style={{ background: "#FEF0F0" }}>
                      <svg width="13" height="13" fill="none" stroke="#DC2626" viewBox="0 0 24 24" strokeWidth="2" aria-hidden>
                        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                    </div>
                    <div>
                      <div className="pn-row-name">{t(`${pt}bills.r1n`)}</div>
                      <div className="pn-row-sub">{t(`${pt}bills.r1s`)}</div>
                    </div>
                    <span className="pn-badge bg-red">{t(`${pt}badges.overdue`)}</span>
                    <div className="pn-row-val" style={{ color: "#DC2626" }}>
                      {t(`${pt}bills.r1v`)}
                    </div>
                  </div>
                  <div className="pn-row">
                    <div className="pn-row-ico" style={{ background: "#FEF0F0" }}>
                      <svg width="13" height="13" fill="none" stroke="#DC2626" viewBox="0 0 24 24" strokeWidth="2" aria-hidden>
                        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                    </div>
                    <div>
                      <div className="pn-row-name">{t(`${pt}bills.r2n`)}</div>
                      <div className="pn-row-sub">{t(`${pt}bills.r2s`)}</div>
                    </div>
                    <span className="pn-badge bg-red">{t(`${pt}badges.overdue`)}</span>
                    <div className="pn-row-val" style={{ color: "#DC2626" }}>
                      {t(`${pt}bills.r2v`)}
                    </div>
                  </div>
                  <div className="pn-row">
                    <div className="pn-row-ico" style={{ background: "#FFFBEB" }}>
                      <svg width="13" height="13" fill="none" stroke="#B45309" viewBox="0 0 24 24" strokeWidth="2" aria-hidden>
                        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                      </svg>
                    </div>
                    <div>
                      <div className="pn-row-name">{t(`${pt}bills.r3n`)}</div>
                      <div className="pn-row-sub">{t(`${pt}bills.r3s`)}</div>
                    </div>
                    <span className="pn-badge bg-amber">{t(`${pt}badges.dueSoon`)}</span>
                    <div className="pn-row-val" style={{ color: "#B45309" }}>
                      {t(`${pt}bills.r3v`)}
                    </div>
                  </div>
                  <div className="pn-row">
                    <div className="pn-row-ico" style={{ background: "#FFFBEB" }}>
                      <svg width="13" height="13" fill="none" stroke="#B45309" viewBox="0 0 24 24" strokeWidth="2" aria-hidden>
                        <path d="M5 3v4M19 3v4M5 7h14M6 17H4a2 2 0 00-2 2v2h20v-2a2 2 0 00-2-2h-2" />
                        <path d="M12 17v-6M8 17v-2M16 17v-2" />
                      </svg>
                    </div>
                    <div>
                      <div className="pn-row-name">{t(`${pt}bills.r4n`)}</div>
                      <div className="pn-row-sub">{t(`${pt}bills.r4s`)}</div>
                    </div>
                    <span className="pn-badge bg-amber">{t(`${pt}badges.dueSoon`)}</span>
                    <div className="pn-row-val" style={{ color: "#B45309" }}>
                      {t(`${pt}bills.r4v`)}
                    </div>
                  </div>
                  <div className="pn-row">
                    <div className="pn-row-ico" style={{ background: "#F0FFF4" }}>
                      <svg width="13" height="13" fill="none" stroke="#3B78F5" viewBox="0 0 24 24" strokeWidth="2" aria-hidden>
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                        <path d="M22 4L12 14.01l-3-3" />
                      </svg>
                    </div>
                    <div>
                      <div className="pn-row-name">{t(`${pt}bills.r5n`)}</div>
                      <div className="pn-row-sub">{t(`${pt}bills.r5s`)}</div>
                    </div>
                    <span className="pn-badge bg-green">{t(`${pt}badges.paid`)}</span>
                    <div className="pn-row-val" style={{ color: "#3B78F5" }}>
                      {t(`${pt}bills.r5v`)}
                    </div>
                  </div>
                </div>
                <div className="pn-foot">{t(`${pt}bills.foot`)}</div>
              </div>

              <div className={`pw-panel${tab === "invoices" ? " visible" : ""}`} id="panel-invoices" aria-hidden={tab !== "invoices"}>
                <div className="pn-banner inv-banner">
                  <div className="pn-banner-h">{t(`${pt}invoices.bannerH`)}</div>
                  <div className="pn-banner-s">{t(`${pt}invoices.bannerS`)}</div>
                </div>
                <div className="pn-grid-3">
                  <div className="pn-stat" style={{ background: "linear-gradient(135deg,#065F46,#3B78F5)" }}>
                    <div className="pn-stat-label">{t(`${pt}invoices.s1l`)}</div>
                    <div className="pn-stat-val">{t(`${pt}invoices.s1v`)}</div>
                    <div className="pn-stat-sub">{t(`${pt}invoices.s1s`)}</div>
                  </div>
                  <div className="pn-stat" style={{ background: "linear-gradient(135deg,#1F5FD9,#3B78F5)" }}>
                    <div className="pn-stat-label">{t(`${pt}invoices.s2l`)}</div>
                    <div className="pn-stat-val">{t(`${pt}invoices.s2v`)}</div>
                    <div className="pn-stat-sub">{t(`${pt}invoices.s2s`)}</div>
                  </div>
                  <div className="pn-stat" style={{ background: "linear-gradient(135deg,#B45309,#D97706)" }}>
                    <div className="pn-stat-label">{t(`${pt}invoices.s3l`)}</div>
                    <div className="pn-stat-val">{t(`${pt}invoices.s3v`)}</div>
                    <div className="pn-stat-sub">{t(`${pt}invoices.s3s`)}</div>
                  </div>
                </div>
                <div className="pn-card">
                  <div className="pn-card-title">{t(`${pt}invoices.openTitle`)}</div>
                  <div className="pn-row">
                    <div className="pn-row-ico" style={{ background: "#F0FFF4" }}>
                      <svg width="13" height="13" fill="none" stroke="#3B78F5" viewBox="0 0 24 24" strokeWidth="2" aria-hidden>
                        <path d="M3 21h18M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14M7 21V11m4 10V11m4 10V11" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <div className="pn-row-name">{t(`${pt}invoices.r1n`)}</div>
                      <div className="pn-row-sub">{t(`${pt}invoices.r1s`)}</div>
                    </div>
                    <span className="pn-badge bg-blue">{t(`${pt}badges.current`)}</span>
                    <div className="pn-row-val" style={{ color: "#1F5FD9" }}>
                      {t(`${pt}invoices.r1v`)}
                    </div>
                  </div>
                  <div className="pn-row">
                    <div className="pn-row-ico" style={{ background: "#F0F4FF" }}>
                      <svg width="13" height="13" fill="none" stroke="#1F5FD9" viewBox="0 0 24 24" strokeWidth="2" aria-hidden>
                        <path d="M3 21h18M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14M7 21V11m4 10V11m4 10V11" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <div className="pn-row-name">{t(`${pt}invoices.r2n`)}</div>
                      <div className="pn-row-sub">{t(`${pt}invoices.r2s`)}</div>
                    </div>
                    <span className="pn-badge bg-amber">{t(`${pt}badges.dueSoon`)}</span>
                    <div className="pn-row-val" style={{ color: "#B45309" }}>
                      {t(`${pt}invoices.r2v`)}
                    </div>
                  </div>
                  <div className="pn-row">
                    <div className="pn-row-ico" style={{ background: "#FFF0F0" }}>
                      <svg width="13" height="13" fill="none" stroke="#DC2626" viewBox="0 0 24 24" strokeWidth="2" aria-hidden>
                        <path d="M3 21h18M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14M7 21V11m4 10V11m4 10V11" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <div className="pn-row-name">{t(`${pt}invoices.r3n`)}</div>
                      <div className="pn-row-sub">{t(`${pt}invoices.r3s`)}</div>
                    </div>
                    <span className="pn-badge bg-red">{t(`${pt}badges.overdue`)}</span>
                    <div className="pn-row-val" style={{ color: "#DC2626" }}>
                      {t(`${pt}invoices.r3v`)}
                    </div>
                  </div>
                  <div className="pn-row">
                    <div className="pn-row-ico" style={{ background: "#FFF0F0" }}>
                      <svg width="13" height="13" fill="none" stroke="#DC2626" viewBox="0 0 24 24" strokeWidth="2" aria-hidden>
                        <path d="M3 21h18M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14M7 21V11m4 10V11m4 10V11" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <div className="pn-row-name">{t(`${pt}invoices.r4n`)}</div>
                      <div className="pn-row-sub">{t(`${pt}invoices.r4s`)}</div>
                    </div>
                    <span className="pn-badge bg-red">{t(`${pt}badges.overdue`)}</span>
                    <div className="pn-row-val" style={{ color: "#DC2626" }}>
                      {t(`${pt}invoices.r4v`)}
                    </div>
                  </div>
                </div>
                <div className="pn-foot">{t(`${pt}invoices.foot`)}</div>
              </div>

              <div className={`pw-panel${tab === "payroll" ? " visible" : ""}`} id="panel-payroll" aria-hidden={tab !== "payroll"}>
                <div className="pn-banner pr-banner">
                  <div className="pn-banner-h">{t(`${pt}payroll.bannerH`)}</div>
                  <div className="pn-banner-s">{t(`${pt}payroll.bannerS`)}</div>
                </div>
                <div className="pn-grid-3" style={{ marginBottom: 10 }}>
                  <div className="pn-stat" style={{ background: "linear-gradient(135deg,#5B21B6,#7C3AED)" }}>
                    <div className="pn-stat-label">{t(`${pt}payroll.s1l`)}</div>
                    <div className="pn-stat-val">{t(`${pt}payroll.s1v`)}</div>
                    <div className="pn-stat-sub">{t(`${pt}payroll.s1s`)}</div>
                  </div>
                  <div className="pn-stat" style={{ background: "linear-gradient(135deg,#1F5FD9,#3B78F5)" }}>
                    <div className="pn-stat-label">{t(`${pt}payroll.s2l`)}</div>
                    <div className="pn-stat-val">{t(`${pt}payroll.s2v`)}</div>
                    <div className="pn-stat-sub">{t(`${pt}payroll.s2s`)}</div>
                  </div>
                  <div className="pn-stat" style={{ background: "linear-gradient(135deg,#3B78F5,#3B78F5)" }}>
                    <div className="pn-stat-label">{t(`${pt}payroll.s3l`)}</div>
                    <div className="pn-stat-val">{t(`${pt}payroll.s3v`)}</div>
                    <div className="pn-stat-sub">{t(`${pt}payroll.s3s`)}</div>
                  </div>
                </div>
                <div className="pn-card" style={{ marginBottom: 10 }}>
                  <div className="pn-card-title">{t(`${pt}payroll.breakTitle`)}</div>
                  <div className="pr-donut-wrap">
                    <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden>
                      <circle cx="36" cy="36" r="28" fill="none" stroke="#EEF0F8" strokeWidth="10" />
                      <circle
                        cx="36"
                        cy="36"
                        r="28"
                        fill="none"
                        stroke="#7C3AED"
                        strokeWidth="10"
                        strokeDasharray="108 68"
                        strokeDashoffset="-17"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="36"
                        cy="36"
                        r="28"
                        fill="none"
                        stroke="#1F5FD9"
                        strokeWidth="10"
                        strokeDasharray="68 108"
                        strokeDashoffset="91"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="36"
                        cy="36"
                        r="28"
                        fill="none"
                        stroke="#3B78F5"
                        strokeWidth="10"
                        strokeDasharray="24 152"
                        strokeDashoffset="-17"
                        strokeLinecap="round"
                        transform="rotate(120 36 36)"
                      />
                      <text x="36" y="40" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1C2130" style={{ fontFamily: "var(--font-accounting-malta-outfit), system-ui, sans-serif" }}>
                        {t(`${pt}payroll.donutCenter`)}
                      </text>
                    </svg>
                    <div className="pr-donut-legend">
                      <div className="pr-leg">
                        <div className="pr-leg-dot" style={{ background: "#7C3AED" }} />
                        {t(`${pt}payroll.leg1`)}
                      </div>
                      <div className="pr-leg">
                        <div className="pr-leg-dot" style={{ background: "#1F5FD9" }} />
                        {t(`${pt}payroll.leg2`)}
                      </div>
                      <div className="pr-leg">
                        <div className="pr-leg-dot" style={{ background: "#3B78F5" }} />
                        {t(`${pt}payroll.leg3`)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pn-foot">{t(`${pt}payroll.foot`)}</div>
              </div>

              <div className={`pw-panel${tab === "vat" ? " visible" : ""}`} id="panel-vat" aria-hidden={tab !== "vat"}>
                <div className="pn-banner vt-banner">
                  <div className="pn-banner-h">{t(`${pt}vat.bannerH`)}</div>
                  <div className="pn-banner-s">{t(`${pt}vat.bannerS`)}</div>
                </div>
                <div className="pn-grid-3">
                  <div className="pn-stat" style={{ background: "linear-gradient(135deg,#0369A1,#0EA5E9)" }}>
                    <div className="pn-stat-label">{t(`${pt}vat.s1l`)}</div>
                    <div className="pn-stat-val">{t(`${pt}vat.s1v`)}</div>
                    <div className="pn-stat-sub">{t(`${pt}vat.s1s`)}</div>
                  </div>
                  <div className="pn-stat" style={{ background: "linear-gradient(135deg,#3B78F5,#3B78F5)" }}>
                    <div className="pn-stat-label">{t(`${pt}vat.s2l`)}</div>
                    <div className="pn-stat-val">{t(`${pt}vat.s2v`)}</div>
                    <div className="pn-stat-sub">{t(`${pt}vat.s2s`)}</div>
                  </div>
                  <div className="pn-stat" style={{ background: "linear-gradient(135deg,#B45309,#D97706)" }}>
                    <div className="pn-stat-label">{t(`${pt}vat.s3l`)}</div>
                    <div className="pn-stat-val">{t(`${pt}vat.s3v`)}</div>
                    <div className="pn-stat-sub">{t(`${pt}vat.s3s`)}</div>
                  </div>
                </div>
                <div className="pn-card">
                  <div className="pn-card-title">{t(`${pt}vat.histTitle`)}</div>
                  <div className="vt-timeline">
                    <div className="vt-period due">
                      <div className="vt-period-dot" style={{ background: "#D97706" }} />
                      <div>
                        <div className="vt-period-name">{t(`${pt}vat.p1n`)}</div>
                        <div className="vt-period-date">{t(`${pt}vat.p1d`)}</div>
                      </div>
                      <span className="pn-badge bg-amber" style={{ marginLeft: "auto" }}>
                        {t(`${pt}badges.paymentDue`)}
                      </span>
                      <div className="vt-period-amt" style={{ color: "#B45309" }}>
                        {t(`${pt}vat.p1a`)}
                      </div>
                    </div>
                    <div className="vt-period">
                      <div className="vt-period-dot" style={{ background: "#3B78F5" }} />
                      <div>
                        <div className="vt-period-name">{t(`${pt}vat.p2n`)}</div>
                        <div className="vt-period-date">{t(`${pt}vat.p2d`)}</div>
                      </div>
                      <span className="pn-badge bg-green" style={{ marginLeft: "auto" }}>
                        {t(`${pt}badges.paid`)}
                      </span>
                      <div className="vt-period-amt" style={{ color: "#3B78F5" }}>
                        {t(`${pt}vat.p2a`)}
                      </div>
                    </div>
                    <div className="vt-period">
                      <div className="vt-period-dot" style={{ background: "#3B78F5" }} />
                      <div>
                        <div className="vt-period-name">{t(`${pt}vat.p3n`)}</div>
                        <div className="vt-period-date">{t(`${pt}vat.p3d`)}</div>
                      </div>
                      <span className="pn-badge bg-green" style={{ marginLeft: "auto" }}>
                        {t(`${pt}badges.paid`)}
                      </span>
                      <div className="vt-period-amt" style={{ color: "#3B78F5" }}>
                        {t(`${pt}vat.p3a`)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pn-foot">{t(`${pt}vat.foot`)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function pillIcon(key: TabKey) {
  const stroke = "currentColor";
  switch (key) {
    case "bank":
      return (
        <svg width="16" height="16" fill="none" stroke={stroke} viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11" />
        </svg>
      );
    case "bills":
      return (
        <svg width="16" height="16" fill="none" stroke={stroke} viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M9 12h6M9 16h3M9 8h6M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case "invoices":
      return (
        <svg width="16" height="16" fill="none" stroke={stroke} viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h.01M12 16h.01M12 12h.01" />
        </svg>
      );
    case "payroll":
      return (
        <svg width="16" height="16" fill="none" stroke={stroke} viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      );
    case "vat":
      return (
        <svg width="16" height="16" fill="none" stroke={stroke} viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M18 20V10M12 20V4M6 20v-6" />
        </svg>
      );
    default:
      return null;
  }
}

function sidebarIcon(key: TabKey, active: boolean) {
  const stroke = active ? "rgba(255,255,255,.75)" : "rgba(255,255,255,.28)";
  switch (key) {
    case "bank":
      return (
        <svg fill="none" stroke={stroke} viewBox="0 0 24 24" strokeWidth="1.8" aria-hidden>
          <path d="M3 10h18M3 14h18M3 6h18M3 18h18" strokeLinecap="round" />
        </svg>
      );
    case "bills":
      return (
        <svg fill="none" stroke={stroke} viewBox="0 0 24 24" strokeWidth="1.8" aria-hidden>
          <path d="M9 12h6M9 16h6M9 8h6M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" />
        </svg>
      );
    case "invoices":
      return (
        <svg fill="none" stroke={stroke} viewBox="0 0 24 24" strokeWidth="1.8" aria-hidden>
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "payroll":
      return (
        <svg fill="none" stroke={stroke} viewBox="0 0 24 24" strokeWidth="1.8" aria-hidden>
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" />
        </svg>
      );
    case "vat":
      return (
        <svg fill="none" stroke={stroke} viewBox="0 0 24 24" strokeWidth="1.8" aria-hidden>
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}
