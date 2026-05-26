"use client";

import React from "react";
import { useTranslation } from "react-i18next";

export default function WhyAccountingMalta() {
  const { t } = useTranslation("services");
  const p = "accountingMalta.why.";

  return (
    <section className="why-section sct-light entrance-fade-up">
      <div className="why-inner">
        <div className="why-top">
          <div>
            <div className="why-tag">{t(`${p}tag`)}</div>
            <h2 className="why-h">
              {t(`${p}titleLine1`)}
              <br />
              <em>{t(`${p}titleItalic`)}</em>
            </h2>
          </div>
          <p className="why-sub">{t(`${p}sub`)}</p>
        </div>
        <div className="why-stats">
          <div className="why-stat">
            <div className="why-sn">
              {t(`${p}stat1Num`)}
              <sup>{t(`${p}stat1Unit`)}</sup>
            </div>
            <div className="why-sl">{t(`${p}stat1Label`)}</div>
          </div>
          <div className="why-stat">
            <div className="why-sn">
              {t(`${p}stat2Num`)}
              <sup>{t(`${p}stat2Unit`)}</sup>
            </div>
            <div className="why-sl">{t(`${p}stat2Label`)}</div>
          </div>
          <div className="why-stat">
            <div className="why-sn">
              {t(`${p}stat3Num`)}
              <sup>{t(`${p}stat3Unit`)}</sup>
            </div>
            <div className="why-sl">{t(`${p}stat3Label`)}</div>
          </div>
          <div className="why-stat">
            <div className="why-sn">
              {t(`${p}stat4Num`)}
              <sup>{t(`${p}stat4Unit`)}</sup>
            </div>
            <div className="why-sl">{t(`${p}stat4Label`)}</div>
          </div>
        </div>
        <div className="why-a4">
          <div className="why-a4-mark">A4</div>
          <div
            className="why-a4-txt"
            dangerouslySetInnerHTML={{ __html: t(`${p}a4Txt`) }}
          />
          <div className="why-a4-badges">
            <div className="why-a4-b">{t(`${p}badge1`)}</div>
            <div className="why-a4-b">{t(`${p}badge2`)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
