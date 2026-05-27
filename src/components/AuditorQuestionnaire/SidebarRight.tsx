"use client";

import React from "react";
import { useTranslation } from "react-i18next";

import { Adjustment } from "./QuestionnaireLayout";

export default function SidebarRight({ adjustments = [] }: { adjustments?: Adjustment[] }) {
  const { t } = useTranslation("auditor-questionnaire");

  const assertions = [
    { name: "Existence", status: "open" },
    { name: "Completeness", status: "partial" },
    { name: "Accuracy", status: "done" },
    { name: "Valuation", status: "open" },
    { name: "Rights & Obligations", status: "done" },
    { name: "Presentation", status: "partial" },
  ];

  const getStatusClass = (status: string) => {
    if (status === "open") return "bg-red-100 text-red-600";
    if (status === "partial") return "bg-amber-100 text-amber-600";
    return "bg-emerald-100 text-emerald-600";
  };

  return (
    <aside className="bg-slate-50 flex flex-col h-[calc(100vh-100px)] sticky top-[100px] overflow-y-auto border-l border-slate-200">
      {/* Assertions */}
      <div className="p-5 border-b border-slate-200">
        <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-4">
          {t("sidebarRight.title1")}
        </div>
        
        <div className="flex flex-col">
          {assertions.map((a, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
              <span className="text-xs font-semibold text-slate-700">{a.name}</span>
              <span className={`font-mono text-[10px] px-2 py-0.5 rounded ${getStatusClass(a.status)}`}>
                {a.status}
              </span>
            </div>
          ))}
        </div>
        
        {/* Mini progress */}
        <div className="mt-4 h-1 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-slate-800 w-[45%]" />
        </div>
      </div>

      {/* Proposed Adjustments */}
      <div className="p-5">
        <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">
          {t("sidebarRight.title2")}
        </div>
        <div className="text-[10px] text-slate-400 mb-4">
          {t("sidebarRight.adjSub")}
        </div>

        {adjustments.length === 0 ? (
          <div className="text-[11px] text-slate-400 p-4 border border-dashed border-slate-200 rounded-lg text-center">
            No proposed adjustments for this section.
          </div>
        ) : (
          adjustments.map(adj => (
            <div key={adj.id} className="p-3 bg-white border border-slate-200 rounded-lg mb-2 shadow-sm">
              <div className="font-mono text-[10px] text-slate-400 mb-1">{adj.id} · {adj.type}</div>
              <div className="text-xs text-slate-700 leading-snug">
                {adj.desc}
              </div>
              <div className="font-mono text-[11px] font-bold text-red-500 mt-2">
                {adj.amount}
              </div>
            </div>
          ))
        )}

      </div>
    </aside>
  );
}
