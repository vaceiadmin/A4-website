"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Download, CheckCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Topbar({ progress = 0 }: { progress?: number }) {
  const { t } = useTranslation("auditor-questionnaire");
  const [modalContent, setModalContent] = useState<"export" | "save" | null>(null);

  return (
    <>
      <div className="sticky top-[72px] lg:top-[100px] z-10 bg-white border-b border-slate-200 px-8 py-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div>
          <h1 className="font-georgia text-2xl text-slate-900 mb-1">
            {t("topbar.title")}
          </h1>
          <p className="font-mono text-xs text-slate-500">
            {t("topbar.desc")}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setModalContent("export")}
            className="flex items-center gap-2 px-4 py-2 font-mono text-xs font-semibold text-zinc-600 bg-white border border-zinc-200 rounded hover:bg-zinc-50 transition-colors active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            {t("topbar.actions.export", "Export")}
          </button>
          <button 
            onClick={() => setModalContent("save")}
            className="flex items-center gap-2 px-4 py-2 font-mono text-xs font-semibold text-white bg-zinc-900 rounded hover:bg-zinc-800 transition-colors shadow-sm active:scale-95"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            {t("topbar.actions.approveAll", "Save & Continue")}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-slate-800 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="font-mono text-[11px] text-slate-500 whitespace-nowrap">
          {t("topbar.progressLabel", "Overall Progress")} ({progress}%)
        </div>
      </div>
    </div>

    <AnimatePresence>
      {modalContent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-slate-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 shadow-inner">
                {modalContent === 'export' ? <Download className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
              </div>
              <button onClick={() => setModalContent(null)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {modalContent === 'export' ? "Export Data" : "Save & Continue"}
            </h3>
            <p className="text-sm text-slate-600 mb-8 leading-relaxed">
              {modalContent === 'export' 
                ? "Your data export is being prepared securely. A link will be generated momentarily."
                : "All your changes have been securely saved to the server. You can safely proceed to the next step."}
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setModalContent(null)} className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-all">
                Cancel
              </button>
              <button onClick={() => setModalContent(null)} className="px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm hover:shadow transition-all active:scale-95">
                {modalContent === 'export' ? "Confirm Export" : "Continue"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}
