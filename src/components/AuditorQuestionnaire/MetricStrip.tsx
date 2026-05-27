"use client";

import React from "react";
import { useTranslation } from "react-i18next";

interface MetricStripProps {
  metrics: {
    total: number;
    pending: number;
    resolved: number;
    exceptions: number;
    sectionsWithQueries: number;
  };
}

export default function MetricStrip({ metrics: data }: MetricStripProps) {
  const { t } = useTranslation("auditor-questionnaire");

  const displayMetrics = [
    { key: "m1", value: data.total, color: "text-slate-900" },
    { key: "m2", value: data.pending, color: "text-amber-500" },
    { key: "m3", value: data.resolved, color: "text-emerald-500" },
    { key: "m4", value: data.exceptions, color: "text-red-500" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-slate-200 bg-white">
      {displayMetrics.map((m, i) => (
        <div key={m.key} className={`p-6 ${i !== 3 ? 'border-r border-slate-100' : ''}`}>
          <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-2">
            {t(`metrics.${m.key}.label`)}
          </div>
          <div className={`font-georgia text-3xl mb-1 ${m.color}`}>
            {m.value}
          </div>
          <div className="font-mono text-[10px] text-slate-400">
            {t(`metrics.${m.key}.sub`)}
          </div>
        </div>
      ))}
    </div>
  );
}
