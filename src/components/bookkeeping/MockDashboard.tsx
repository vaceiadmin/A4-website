"use client";

import React from "react";
import { 
  Briefcase, 
  Clock, 
  TrendingUp, 
  BarChart3, 
  AlertTriangle, 
  FileText, 
  Zap, 
  CheckCircle2, 
  PieChart,
  TrendingDown
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function MockDashboard() {
  const { t } = useTranslation("services");

  return (
    <div className="db">
      {/* KPI Row */}
      <div className="db-kpis">
        <div className="db-kpi">
          <div className="db-kpi-head">
            <div className="db-kpi-icon dki-blue"><Briefcase size={14} className="text-blue-400" /></div>
            <span className="db-kpi-label">{t("bookkeeping.dashboard.cashPosition")}</span>
          </div>
          <div className="db-kpi-val dkv-white">€85,000</div>
          <div className="db-kpi-foot">
            <span>{t("bookkeeping.dashboard.bankReconciled")}</span>
            <span className="db-badge dbb-blue">↑ +3.2%</span>
          </div>
          <svg className="db-spark" viewBox="0 0 88 40" preserveAspectRatio="none">
            <polygon
              points="0,32 14,26 28,28 42,20 56,22 70,13 88,9 88,40 0,40"
              fill="rgba(79,142,247,0.1)"
            />
            <polyline
              points="0,32 14,26 28,28 42,20 56,22 70,13 88,9"
              fill="none"
              stroke="#4F8EF7"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="db-kpi">
          <div className="db-kpi-head">
            <div className="db-kpi-icon dki-red"><Clock size={14} className="text-red-400" /></div>
            <span className="db-kpi-label">{t("bookkeeping.dashboard.runway")}</span>
            <span className="db-kpi-sub">{t("bookkeeping.dashboard.months")}</span>
          </div>
          <div className="db-kpi-val dkv-red">5.2</div>
          <div className="db-kpi-foot">
            <span>{t("bookkeeping.dashboard.currentBurn")}</span>
            <span className="db-badge dbb-red">{t("bookkeeping.dashboard.monitor")}</span>
          </div>
          <svg className="db-spark" viewBox="0 0 88 40" preserveAspectRatio="none">
            <polygon
              points="0,12 14,16 28,14 42,22 56,18 70,25 88,28 88,40 0,40"
              fill="rgba(239,68,68,0.08)"
            />
            <polyline
              points="0,12 14,16 28,14 42,22 56,18 70,25 88,28"
              fill="none"
              stroke="#F87171"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="db-kpi">
          <div className="db-kpi-head">
            <div className="db-kpi-icon dki-green"><TrendingUp size={14} className="text-green-400" /></div>
            <span className="db-kpi-label">{t("bookkeeping.dashboard.netProfit")}</span>
            <span className="db-kpi-sub">{t("bookkeeping.dashboard.ytd")}</span>
          </div>
          <div className="db-kpi-val dkv-green">€12,300</div>
          <div className="db-kpi-foot">
            <span>{t("bookkeeping.dashboard.monthValue")} €45,750</span>
            <span className="db-badge dbb-green">↑ +18%</span>
          </div>
          <svg className="db-spark" viewBox="0 0 88 40" preserveAspectRatio="none">
            <polygon
              points="0,32 14,26 28,24 42,18 56,15 70,10 88,7 88,40 0,40"
              fill="rgba(16,185,129,0.1)"
            />
            <polyline
              points="0,32 14,26 28,24 42,18 56,15 70,10 88,7"
              fill="none"
              stroke="#10B981"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="db-kpi">
          <div className="db-kpi-head">
            <div className="db-kpi-icon dki-amber"><BarChart3 size={14} className="text-amber-400" /></div>
            <span className="db-kpi-label">{t("bookkeeping.dashboard.cashFlow")}</span>
            <span className="db-kpi-sub">({t("bookkeeping.dashboard.monthValue")})</span>
          </div>
          <div className="db-kpi-val dkv-amber">+€3,200</div>
          <div className="db-kpi-foot">
            <span>{t("bookkeeping.dashboard.forecastPositive")}</span>
            <span className="db-badge dbb-amber">↑ +18%</span>
          </div>
          <svg className="db-spark" viewBox="0 0 88 40" preserveAspectRatio="none">
            <polygon
              points="0,26 14,22 28,24 42,17 56,19 70,11 88,9 88,40 0,40"
              fill="rgba(245,158,11,0.08)"
            />
            <polyline
              points="0,26 14,22 28,24 42,17 56,19 70,11 88,9"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Mid row: Compliance | Chart | Alerts */}
      <div className="db-mid">
        {/* Left: Compliance + Forecast stacked */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div className="db-panel">
            <div className="db-panel-title">
              {t("bookkeeping.dashboard.compliance")} <span className="db-ptag">Live</span>
            </div>
            <div className="db-comp-row">
              <span className="db-comp-label">{t("bookkeeping.dashboard.vatQ1")}</span>
              <span className="db-badge dbb-amber">{t("bookkeeping.dashboard.due")} May 15</span>
            </div>
            <div className="db-comp-row">
              <span className="db-comp-label">{t("bookkeeping.dashboard.corpTax")}</span>
              <span className="db-badge dbb-green">{t("bookkeeping.dashboard.onTrack")}</span>
            </div>
            <div className="db-comp-row">
              <span className="db-comp-label">{t("bookkeeping.dashboard.mgmtAccounts")}</span>
              <span className="db-badge dbb-blue">{t("bookkeeping.dashboard.ready")}</span>
            </div>
            <div className="db-comp-row">
              <span className="db-comp-label">{t("bookkeeping.dashboard.annualReturns")}</span>
              <span className="db-badge dbb-green">{t("bookkeeping.dashboard.filed")}</span>
            </div>
          </div>

          <div className="db-panel">
            <div className="db-panel-title">
              {t("bookkeeping.dashboard.next30Days")} <span className="db-ptag">{t("bookkeeping.dashboard.forecast")}</span>
            </div>
            <div className="db-fc-row">
              <span className="db-fc-label">{t("bookkeeping.dashboard.incoming")}</span>
              <span className="db-fc-val dfv-green">€8,700</span>
            </div>
            <div className="db-fc-row">
              <span className="db-fc-label">{t("bookkeeping.dashboard.outgoing")}</span>
              <span className="db-fc-val dfv-amber">€20,400</span>
            </div>
            <div className="db-fc-row">
              <span className="db-fc-label">{t("bookkeeping.dashboard.net")}</span>
              <span className="db-fc-val dfv-red">−€11,700</span>
            </div>
            <div className="db-warn">
              <div className="db-warn-icon"><AlertTriangle size={10} /></div>
              <div className="db-warn-text">
                {t("bookkeeping.dashboard.cashDrops")} <strong>€52.3k</strong> {t("bookkeeping.dashboard.inDays", { days: 18 })}
              </div>
            </div>
          </div>
        </div>

        {/* Centre: Trend chart */}
        <div className="db-panel">
          <div className="db-panel-title">
            {t("bookkeeping.dashboard.revenueVsExpenses")} <span className="db-ptag">{t("bookkeeping.dashboard.last6Months")}</span>
          </div>
          <svg className="db-chart-svg" viewBox="0 0 260 80" preserveAspectRatio="none">
            <defs>
              <linearGradient id="dbcbg" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <line x1="0" y1="20" x2="260" y2="20" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <line x1="0" y1="40" x2="260" y2="40" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <line x1="0" y1="60" x2="260" y2="60" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <text x="2" y="18" fontSize="6" fill="rgba(255,255,255,0.18)" fontFamily="Inter,sans-serif">
              140k
            </text>
            <text x="2" y="58" fontSize="6" fill="rgba(255,255,255,0.18)" fontFamily="Inter,sans-serif">
              35k
            </text>
            {/* Cash balance dashed */}
            <polygon
              points="22,15 66,13 110,11 154,10 198,8 242,6 260,5 260,72 22,72"
              fill="url(#dbcbg)"
            />
            <polyline
              points="22,15 66,13 110,11 154,10 198,8 242,6"
              fill="none"
              stroke="#10B981"
              strokeWidth="1.6"
              strokeDasharray="4,2"
            />
            {/* Revenue solid */}
            <polyline
              points="22,55 66,53 110,54 154,51 198,49 242,47"
              fill="none"
              stroke="#4F8EF7"
              strokeWidth="1.6"
            />
            {/* Expenses */}
            <polyline
              points="22,61 66,60 110,62 154,59 198,58 242,57"
              fill="none"
              stroke="#F87171"
              strokeWidth="1.6"
            />
            {/* Dots revenue */}
            <circle cx="22" cy="55" r="2.2" fill="#4F8EF7" />
            <circle cx="66" cy="53" r="2.2" fill="#4F8EF7" />
            <circle cx="110" cy="54" r="2.2" fill="#4F8EF7" />
            <circle cx="154" cy="51" r="2.2" fill="#4F8EF7" />
            <circle cx="198" cy="49" r="2.2" fill="#4F8EF7" />
            <circle cx="242" cy="47" r="2.2" fill="#4F8EF7" />
            {/* X labels */}
            <text x="18" y="74" fontSize="6" fill="rgba(255,255,255,0.18)" fontFamily="Inter,sans-serif">
              {t("bookkeeping.dashboard.jan")}
            </text>
            <text x="62" y="74" fontSize="6" fill="rgba(255,255,255,0.18)" fontFamily="Inter,sans-serif">
              {t("bookkeeping.dashboard.feb")}
            </text>
            <text x="106" y="74" fontSize="6" fill="rgba(255,255,255,0.18)" fontFamily="Inter,sans-serif">
              {t("bookkeeping.dashboard.mar")}
            </text>
            <text x="150" y="74" fontSize="6" fill="rgba(255,255,255,0.18)" fontFamily="Inter,sans-serif">
              {t("bookkeeping.dashboard.apr")}
            </text>
            <text x="194" y="74" fontSize="6" fill="rgba(255,255,255,0.18)" fontFamily="Inter,sans-serif">
              {t("bookkeeping.dashboard.may")}
            </text>
            <text x="236" y="74" fontSize="6" fill="rgba(255,255,255,0.18)" fontFamily="Inter,sans-serif">
              {t("bookkeeping.dashboard.jun")}
            </text>
          </svg>
          <div className="db-chart-legend">
            <div className="db-leg">
              <span className="db-leg-dot" style={{ background: "#4F8EF7" }}></span>
              {t("bookkeeping.dashboard.revenue")}
            </div>
            <div className="db-leg">
              <span className="db-leg-dot" style={{ background: "#F87171" }}></span>
              {t("bookkeeping.dashboard.expenses")}
            </div>
            <div className="db-leg">
              <span
                className="db-leg-dot"
                style={{
                  background: "transparent",
                  borderRadius: 0,
                  width: "10px",
                  height: 0,
                  borderTop: "2px dashed #10B981",
                }}
              ></span>
              {t("bookkeeping.dashboard.cashBalance")}
            </div>
          </div>
        </div>

        {/* Right: Alerts */}
        <div className="db-panel">
          <div className="db-panel-title">{t("bookkeeping.dashboard.risksAlerts")}</div>
          <div className="db-alert-row">
            <div className="db-alert-ico dai-red"><FileText size={14} /></div>
            <div className="db-alert-body">
              <div className="db-alert-title">4 {t("bookkeeping.dashboard.invoicesOverdue")}</div>
              <div className="db-alert-detail">{t("bookkeeping.dashboard.totalExposure")} €11,260</div>
            </div>
          </div>
          <div className="db-alert-row">
            <div className="db-alert-ico dai-amber"><Zap size={14} /></div>
            <div className="db-alert-body">
              <div className="db-alert-title">{t("bookkeeping.dashboard.vatPayableHigh")}</div>
              <div className="db-alert-detail">€3,250 {t("bookkeeping.dashboard.aboveAverage")}</div>
            </div>
            <div className="db-alert-amt">€3,420</div>
          </div>
          <div className="db-alert-row">
            <div className="db-alert-ico dai-green"><CheckCircle2 size={14} /></div>
            <div className="db-alert-body">
              <div className="db-alert-title">
                2 {t("bookkeeping.dashboard.missingReceipts")}
              </div>
              <div className="db-alert-detail">{t("bookkeeping.dashboard.actionRequired")}</div>
            </div>
          </div>
          <div className="db-alert-row">
            <div className="db-alert-ico dai-blue"><PieChart size={14} /></div>
            <div className="db-alert-body">
              <div className="db-alert-title">
                {t("bookkeeping.dashboard.mgmtAccountsReady")}
              </div>
              <div className="db-alert-detail">{t("bookkeeping.dashboard.availableInPortal")}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Revenue + VAT */}
      <div className="db-bottom">
        <div className="db-panel">
          <div className="db-panel-title">
            {t("bookkeeping.dashboard.revenueBreakdown")} <span className="db-ptag">{t("bookkeeping.dashboard.topClients")}</span>
          </div>
          <div className="db-rev-row">
            <span className="db-rev-name">Meridian Group</span>
            <div className="db-rev-track">
              <div
                className="db-rev-bar"
                style={{
                  width: "84%",
                  background: "linear-gradient(90deg,#4F8EF7,#7B5CF5)",
                }}
              ></div>
            </div>
            <span className="db-rev-pct">84%</span>
            <span className="db-rev-amt">€24.1k</span>
          </div>
          <div className="db-rev-row">
            <span className="db-rev-name">Vertex Capital</span>
            <div className="db-rev-track">
              <div
                className="db-rev-bar"
                style={{
                  width: "61%",
                  background: "linear-gradient(90deg,#10B981,#059669)",
                }}
              ></div>
            </div>
            <span className="db-rev-pct">61%</span>
            <span className="db-rev-amt">€17.5k</span>
          </div>
          <div className="db-rev-row">
            <span className="db-rev-name">Solaris Partners</span>
            <div className="db-rev-track">
              <div
                className="db-rev-bar"
                style={{
                  width: "42%",
                  background: "linear-gradient(90deg,#F59E0B,#D97706)",
                }}
              ></div>
            </div>
            <span className="db-rev-pct">42%</span>
            <span className="db-rev-amt">€12.0k</span>
          </div>
          <div className="db-rev-row">
            <span className="db-rev-name">Apex Dynamics</span>
            <div className="db-rev-track">
              <div
                className="db-rev-bar"
                style={{
                  width: "28%",
                  background: "linear-gradient(90deg,#F87171,#DC2626)",
                }}
              ></div>
            </div>
            <span className="db-rev-pct">28%</span>
            <span className="db-rev-amt">€8.0k</span>
          </div>
          <div className="db-rev-row">
            <span className="db-rev-name">Crestline</span>
            <div className="db-rev-track">
              <div
                className="db-rev-bar"
                style={{
                  width: "19%",
                  background: "rgba(255,255,255,0.15)",
                }}
              ></div>
            </div>
            <span className="db-rev-pct">19%</span>
            <span className="db-rev-amt">€5.4k</span>
          </div>
        </div>

        <div className="db-panel">
          <div className="db-panel-title">
            {t("bookkeeping.dashboard.vatPosition")} <span className="db-ptag">Q1 2026</span>
          </div>
          <div className="db-vat-top">
            <svg width="56" height="56" viewBox="0 0 56 56">
              <circle
                cx="28"
                cy="28"
                r="22"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="6"
              />
              <circle
                cx="28"
                cy="28"
                r="22"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="6"
                strokeDasharray="87 51"
                strokeDashoffset="-22"
                strokeLinecap="round"
              />
              <circle
                cx="28"
                cy="28"
                r="22"
                fill="none"
                stroke="#10B981"
                strokeWidth="6"
                strokeDasharray="43 95"
                strokeDashoffset="65"
                strokeLinecap="round"
              />
              <text
                x="28"
                y="32"
                textAnchor="middle"
                fontSize="8"
                fontWeight="700"
                fill="white"
                fontFamily="Inter,sans-serif"
              >
                VAT
              </text>
            </svg>
            <div className="db-vat-info">
              <div className="db-vat-label">{t("bookkeeping.dashboard.netVatDue")}</div>
              <div className="db-vat-big">€12,160</div>
              <div className="db-vat-due">{t("bookkeeping.dashboard.due")}: May 15, 2026</div>
            </div>
          </div>
          <div className="db-vat-rows">
            <div className="db-vat-row">
              <span className="db-vat-key">{t("bookkeeping.dashboard.vatCollected")}</span>
              <span className="db-vat-val" style={{ color: "#4F8EF7" }}>
                €18,400
              </span>
            </div>
            <div className="db-vat-row">
              <span className="db-vat-key">{t("bookkeeping.dashboard.vatReclaimable")}</span>
              <span className="db-vat-val" style={{ color: "#10B981" }}>
                −€6,240
              </span>
            </div>
            <div
              className="db-vat-row"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.07)",
                paddingTop: "8px",
                marginTop: "4px",
              }}
            >
              <span
                className="db-vat-key"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 600,
                }}
              >
                {t("bookkeeping.dashboard.netDue")}
              </span>
              <span
                className="db-vat-val"
                style={{ color: "#F59E0B", fontSize: "14px" }}
              >
                €12,160
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="db-status">
        <div className="db-status-left">
          <span className="db-sdot"></span>{t("bookkeeping.dashboard.booksReconciled")} · {t("bookkeeping.dashboard.teamActive")}
        </div>
        <div className="db-status-right">{t("bookkeeping.dashboard.updatedToday")} · 09:14</div>
      </div>
    </div>
  );
}

