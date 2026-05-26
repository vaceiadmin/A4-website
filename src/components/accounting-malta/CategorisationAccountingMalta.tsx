"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

type CatKey = "meals" | "travel" | "software" | "supplies" | "ledger";

type Txn = {
  raw: string;
  name: string;
  meta: string;
  amount: string;
  cat: CatKey;
  label: string;
  line: string;
  logo: React.ReactNode;
  logoBg: string;
};

const ALL_CATS: CatKey[] = ["meals", "travel", "software", "supplies", "ledger"];

const DEFAULT_LINE = "M190,0 C190,40 190,50 190,72";

type TxnId = "bolt" | "wolt" | "xero" | "amazon" | "deloitte";

const TXN_BASE: {
  id: TxnId;
  cat: CatKey;
  line: string;
  logoBg: string;
  logo: React.ReactNode;
}[] = [
  {
    id: "bolt",
    cat: "travel",
    line: "M190,0 C190,30 300,40 310,60",
    logoBg: "#0A1A10",
    logo: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1DC869" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M14.5 4.5L9 13h6L10.5 19.5" />
      </svg>
    ),
  },
  {
    id: "wolt",
    cat: "meals",
    line: "M190,0 C190,30 80,40 70,60",
    logoBg: "#071620",
    logo: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00B4D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <path d="M6 1v3M10 1v3M14 1v3" />
      </svg>
    ),
  },
  {
    id: "xero",
    cat: "software",
    line: "M190,0 C190,40 190,50 190,72",
    logoBg: "#071520",
    logo: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1AB3E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12h8M12 8l4 4-4 4" />
      </svg>
    ),
  },
  {
    id: "amazon",
    cat: "supplies",
    line: "M190,0 C190,50 130,100 90,120",
    logoBg: "#1A1000",
    logo: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      </svg>
    ),
  },
  {
    id: "deloitte",
    cat: "ledger",
    line: "M190,0 C190,50 260,100 290,120",
    logoBg: "#0D1508",
    logo: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#86BC25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 004 22h16M4 19.5V4a2 2 0 012-2h14v13H6.5" />
      </svg>
    ),
  },
];

function buildTxns(t: TFunction): Txn[] {
  const p = "accountingMalta.categorisation.txns.";
  return TXN_BASE.map((b) => ({
    raw: t(`${p}${b.id}.raw`),
    name: t(`${p}${b.id}.name`),
    meta: t(`${p}${b.id}.meta`),
    amount: t(`${p}${b.id}.amount`),
    cat: b.cat,
    label: t(`${p}${b.id}.label`),
    line: b.line,
    logo: b.logo,
    logoBg: b.logoBg,
  }));
}

function emptyChips(): Record<CatKey, boolean> {
  return { meals: false, travel: false, software: false, supplies: false, ledger: false };
}

function emptyChipPhase(): Record<CatKey, "none" | "active" | "faded"> {
  return { meals: "none", travel: "none", software: "none", supplies: "none", ledger: "none" };
}

export default function CategorisationAccountingMalta() {
  const { t, i18n } = useTranslation("services");
  const txns = useMemo(() => buildTxns(t), [t, i18n.language]);
  const [raw, setRaw] = useState(txns[0].raw);
  const [proc, setProc] = useState(false);
  const [merchantShow, setMerchantShow] = useState(false);
  const [merchant, setMerchant] = useState(txns[0]);
  const [treeShow, setTreeShow] = useState(false);
  const [visibleChips, setVisibleChips] = useState(emptyChips);
  const [chipPhase, setChipPhase] = useState(emptyChipPhase);
  const [activeLine, setActiveLine] = useState({ d: DEFAULT_LINE, draw: false });
  const [resultLabel, setResultLabel] = useState(txns[0].label);
  const [resultShow, setResultShow] = useState(false);
  const [dissolve, setDissolve] = useState(false);

  const idxRef = useRef(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const mountedRef = useRef(true);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    timersRef.current.push(
      setTimeout(() => {
        if (mountedRef.current) fn();
      }, ms)
    );
  }, []);

  const resetState = useCallback(() => {
    setProc(false);
    setMerchantShow(false);
    setTreeShow(false);
    setActiveLine({ d: DEFAULT_LINE, draw: false });
    setResultShow(false);
    setDissolve(false);
    setVisibleChips(emptyChips());
    setChipPhase(emptyChipPhase());
  }, []);

  const runNextRef = useRef<() => void>(() => {});

  const runNext = useCallback(() => {
    const txn = txns[idxRef.current];
    idxRef.current = (idxRef.current + 1) % txns.length;

    setRaw(txn.raw);
    setMerchant(txn);

    schedule(() => setProc(true), 300);
    schedule(() => {
      setProc(false);
      setMerchant(txn);
      setMerchantShow(true);
    }, 950);
    schedule(() => {
      setTreeShow(true);
      ALL_CATS.forEach((c, i) => {
        schedule(() => {
          setVisibleChips((prev) => ({ ...prev, [c]: true }));
        }, i * 55);
      });
    }, 1400);
    schedule(() => {
      setActiveLine({ d: txn.line, draw: true });
    }, 1750);
    schedule(() => {
      setChipPhase(() => {
        const next = emptyChipPhase();
        ALL_CATS.forEach((k) => {
          next[k] = k === txn.cat ? "active" : "faded";
        });
        return next;
      });
      setResultLabel(txn.label);
      setResultShow(true);
    }, 2100);
    schedule(() => {
      setDissolve(true);
      schedule(() => {
        resetState();
        runNextRef.current();
      }, 400);
    }, 4200);
  }, [resetState, schedule, txns]);

  runNextRef.current = runNext;

  useEffect(() => {
    mountedRef.current = true;
    clearTimers();
    idxRef.current = 0;
    setRaw(txns[0].raw);
    setMerchant(txns[0]);
    setResultLabel(txns[0].label);
    resetState();
    const kick = setTimeout(() => runNextRef.current(), 800);
    return () => {
      mountedRef.current = false;
      clearTimeout(kick);
      clearTimers();
    };
  }, [clearTimers, i18n.language, resetState, txns]);

  const chipClass = (key: CatKey) => {
    let c = `cchip cchip-${key}`;
    if (visibleChips[key]) c += " visible";
    if (chipPhase[key] === "active") c += " active";
    if (chipPhase[key] === "faded") c += " faded";
    return c;
  };

  return (
    <section className="cat-section sct-dark entrance-fade-up">
      <div className="cat-inner">
        <div>
          <div className="cat-kicker">{t("accountingMalta.categorisation.kicker")}</div>
          <h2 className="cat-h">
            {t("accountingMalta.categorisation.titleLine1")}
            <br />
            <em>{t("accountingMalta.categorisation.titleItalic")}</em>
          </h2>
          <p className="cat-p">{t("accountingMalta.categorisation.p")}</p>
          <ul className="cat-feats">
            <li className="cat-fi">
              <div className="cat-fi-dot">
                <svg viewBox="0 0 10 10" aria-hidden>
                  <path d="M2 5l2.5 2.5L8 3" />
                </svg>
              </div>
              {t("accountingMalta.categorisation.feat1")}
            </li>
            <li className="cat-fi">
              <div className="cat-fi-dot">
                <svg viewBox="0 0 10 10" aria-hidden>
                  <path d="M2 5l2.5 2.5L8 3" />
                </svg>
              </div>
              {t("accountingMalta.categorisation.feat2")}
            </li>
            <li className="cat-fi">
              <div className="cat-fi-dot">
                <svg viewBox="0 0 10 10" aria-hidden>
                  <path d="M2 5l2.5 2.5L8 3" />
                </svg>
              </div>
              {t("accountingMalta.categorisation.feat3")}
            </li>
            <li className="cat-fi">
              <div className="cat-fi-dot">
                <svg viewBox="0 0 10 10" aria-hidden>
                  <path d="M2 5l2.5 2.5L8 3" />
                </svg>
              </div>
              {t("accountingMalta.categorisation.feat4")}
            </li>
          </ul>
        </div>

        <div className="cat-stage">
          <div className="raw-txn" style={{ opacity: dissolve ? 0 : 1, transition: "opacity .35s ease" }}>
            {raw}
          </div>

          <div className={`processing-row${proc ? " show" : ""}`} style={{ opacity: dissolve ? 0 : undefined, transition: "opacity .35s ease" }}>
            <div className="proc-bar" />
            <div className="proc-bar" />
            <div className="proc-bar" />
            <div className="proc-bar" />
          </div>

          <div
            className={`merchant-card${merchantShow ? " show" : ""}`}
            style={{ opacity: dissolve ? 0 : undefined, transition: "opacity .35s ease, transform .35s ease" }}
          >
            <div className="ai-badge">{t("accountingMalta.categorisation.aiBadge")}</div>
            <div className="merchant-logo" style={{ background: merchant.logoBg }}>
              {merchant.logo}
            </div>
            <div className="merchant-info">
              <div className="merchant-name">{merchant.name}</div>
              <div className="merchant-meta">{merchant.meta}</div>
            </div>
            <div className="merchant-amount">{merchant.amount}</div>
          </div>

          <div className={`cat-tree${treeShow ? " show" : ""}`} style={{ opacity: dissolve ? 0 : undefined, transition: "opacity .35s ease" }}>
            <div className="cat-chips">
              <svg className="tree-svg" viewBox="0 0 380 170" preserveAspectRatio="none" aria-hidden>
                <path className="tree-line" d="M190,0 C190,30 80,40 70,60" />
                <path className="tree-line" d="M190,0 C190,30 300,40 310,60" />
                <path className="tree-line" d="M190,0 C190,40 190,50 190,72" />
                <path className="tree-line" d="M190,0 C190,50 130,100 90,120" />
                <path className="tree-line" d="M190,0 C190,50 260,100 290,120" />
                <path
                  className={`tree-line-active${activeLine.draw ? " draw" : ""}`}
                  d={activeLine.d}
                  style={{ opacity: dissolve ? 0 : 1 }}
                />
              </svg>

              <div className={chipClass("meals")} id="cc-meals">
                <div className="cchip-ico">
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
                    <path d="M6 1v3M10 1v3M14 1v3" />
                  </svg>
                </div>
                {t("accountingMalta.categorisation.chipMeals")}
              </div>
              <div className={chipClass("travel")} id="cc-travel">
                <div className="cchip-ico">
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </div>
                {t("accountingMalta.categorisation.chipTravel")}
              </div>
              <div className={chipClass("software")} id="cc-software">
                <div className="cchip-ico">
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                </div>
                {t("accountingMalta.categorisation.chipSoftware")}
              </div>
              <div className={chipClass("supplies")} id="cc-supplies">
                <div className="cchip-ico">
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
                  </svg>
                </div>
                {t("accountingMalta.categorisation.chipSupplies")}
              </div>
              <div className={chipClass("ledger")} id="cc-ledger">
                <div className="cchip-ico">
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 004 22h16M4 19.5V4a2 2 0 012-2h14v13H6.5" />
                  </svg>
                </div>
                {t("accountingMalta.categorisation.chipLedger")}
              </div>
            </div>

            <div className={`cat-result-strip${resultShow ? " show" : ""}`} style={{ opacity: dissolve ? 0 : undefined }}>
              {t("accountingMalta.categorisation.resultStripPrefix")}{" "}
              <span>{resultLabel}</span> {t("accountingMalta.categorisation.resultStripSuffix")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
