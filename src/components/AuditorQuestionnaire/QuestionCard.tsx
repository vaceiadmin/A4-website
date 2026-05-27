"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Paperclip, Link, Check, AlertCircle, CheckCircle } from "lucide-react";

interface Question {
  id: string;
  number: number;
  priority: string;
  status: string;
  tags: string[];
  text: string;
  context: string;
  evidence: string[];
}

interface QuestionCardProps {
  question: Question;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const { t } = useTranslation("auditor-questionnaire");

  const getPriorityColor = (p: string) => {
    if (p === 'high') return "bg-red-500";
    if (p === 'medium') return "bg-amber-500";
    return "bg-slate-300";
  };

  const getStatusBorder = (s: string) => {
    if (s === 'answered') return "border-emerald-400";
    if (s === 'exception') return "border-red-400";
    return "border-slate-200 hover:border-slate-300";
  };

  return (
    <div className={`group bg-white border rounded-2xl mb-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden ${getStatusBorder(question.status)}`}>
      <div className="flex">
        {/* Left Column (Number & Priority Line) */}
        <div className="w-16 flex flex-col items-center pt-6 pb-4 border-r border-slate-100 bg-slate-50/50">
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold mb-4 shadow-sm group-hover:scale-110 transition-transform ${
            question.status === 'answered' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 text-slate-500 bg-white'
          }`}>
            {question.number}
          </div>
          <div className={`w-0.5 flex-1 rounded-full min-h-[20px] shadow-inner opacity-60 group-hover:opacity-100 transition-opacity ${getPriorityColor(question.priority)}`} />
        </div>

        {/* Right Column (Content) */}
        <div className="flex-1">
          <div className="p-5 border-b border-slate-100">
            {/* Tags & ID */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-600 font-bold shadow-sm">
                {question.id}
              </span>
              {question.tags.map(tag => (
                <span key={tag} className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-600 shadow-sm">
                  {tag}
                </span>
              ))}
            </div>

            {/* Question Text */}
            <div className="text-[15px] font-medium text-slate-900 leading-relaxed mb-3">
              {question.text}
            </div>

            {/* Context */}
            <div className="text-xs text-slate-600 leading-relaxed p-4 border-l-[3px] border-slate-300 bg-slate-50 rounded-r-lg shadow-inner">
              {question.context}
            </div>
          </div>

          <div className="p-5 bg-slate-50/30">
            {/* Evidence */}
            <div className="mb-5">
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-2">
                {t("question.evidenceLabel")}
              </div>
              <div className="flex flex-wrap gap-2">
                {question.evidence.map(ev => (
                  <button key={ev} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm text-[11px] font-mono text-slate-600 hover:border-zinc-400 hover:text-zinc-900 hover:shadow transition-all">
                    <Paperclip className="w-3 h-3" />
                    {ev}
                  </button>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="mb-5">
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-2">
                {t("question.optionsLabel")}
              </div>
              <div className="flex flex-col gap-2">
                <label className={`flex items-start gap-3 p-3.5 border rounded-xl cursor-pointer transition-all shadow-sm ${question.status === 'answered' ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'}`}>
                  <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${question.status === 'answered' ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 bg-white'}`}>
                    {question.status === 'answered' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Satisfactory explanation provided</div>
                    <div className="font-mono text-[10px] text-slate-500 mt-1">Clear without adjustment</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-3.5 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 hover:shadow-md transition-all shadow-sm">
                  <div className="w-4 h-4 rounded-full border border-slate-300 bg-white mt-0.5 flex items-center justify-center shrink-0 transition-colors" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Proposed adjustment required</div>
                    <div className="font-mono text-[10px] text-slate-500 mt-1">Post to schedule of uncorrected misstatements</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-5">
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-2">
                {t("question.notesLabel")}
              </div>
              <textarea 
                className="w-full h-20 p-3 bg-white border border-slate-200 rounded text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-colors resize-y"
                placeholder={t("question.notesPlaceholder")}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-3 rounded-b-2xl">
            {question.status === 'answered' ? (
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-600 font-semibold mr-auto">
                <CheckCircle className="w-4 h-4" />
                Resolution saved
              </div>
            ) : (
              <button className="px-6 py-2.5 bg-slate-900 text-white font-sans text-xs font-bold rounded-lg shadow-sm hover:bg-slate-800 hover:shadow transition-all active:scale-95">
                {t("question.save")}
              </button>
            )}
            
            {question.status !== 'answered' && (
              <button className="px-4 py-2 font-mono text-[11px] font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 rounded transition-all">
                {t("question.skip")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
