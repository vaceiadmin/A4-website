"use client";

import React, { useState, useMemo } from "react";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";
import Topbar from "./Topbar";
import MetricStrip from "./MetricStrip";
import QuestionCard from "./QuestionCard";
import { useTranslation } from "react-i18next";
import { Filter } from "lucide-react";

export type Question = {
  id: string;
  number: number;
  priority: "high" | "medium" | "low";
  status: "pending" | "answered" | "resolved" | "exception";
  tags: string[];
  text: string;
  context: string;
  evidence: string[];
};

export type Adjustment = {
  id: string;
  type: string;
  desc: string;
  amount: string;
};

const initialData: Record<string, { questions: Question[], adjustments: Adjustment[] }> = {
  ppe: {
    questions: [
      {
        id: "PPE-01",
        number: 1,
        priority: "high",
        status: "pending",
        tags: ["PPE", "Depreciation"],
        text: "We noted that the useful life of the new manufacturing equipment (Asset #4092) is recorded as 15 years, which differs from the company's stated policy of 10 years for this class of assets.",
        context: "Recorded depreciation expense for this asset is €12,500. Under the 10-year policy, it should be €18,750.",
        evidence: ["Asset_Register_FY24.xlsx", "Depreciation_Policy_v2.pdf"]
      },
      {
        id: "PPE-02",
        number: 2,
        priority: "medium",
        status: "resolved",
        tags: ["PPE", "Additions"],
        text: "Please provide the capitalization rationale and supporting invoice for the 'Office Refurbishment' addition of €45,000 recorded in March 2024.",
        context: "Amounts over €10,000 require capitalization per policy. We need to verify these are not repair and maintenance expenses.",
        evidence: ["GL_Extract_March24.csv"]
      },
      {
        id: "PPE-03",
        number: 3,
        priority: "high",
        status: "exception",
        tags: ["PPE", "Impairment"],
        text: "The carrying value of the old delivery fleet exceeds its recoverable amount based on recent market valuations.",
        context: "No impairment loss was recognized. Audit team calculates a necessary impairment of €32,000.",
        evidence: ["Fleet_Valuation_Report.pdf"]
      }
    ],
    adjustments: [
      { id: "AJE-03", type: "Depreciation", desc: "To correct depreciation expense for Asset #4092 based on 10-year useful life.", amount: "€ 6,250.00" },
      { id: "AJE-04", type: "Impairment", desc: "To record impairment loss on old delivery fleet.", amount: "€ 32,000.00" }
    ]
  },
  inv: {
    questions: [
      {
        id: "INV-01",
        number: 1,
        priority: "medium",
        status: "pending",
        tags: ["Inventory", "Valuation"],
        text: "Provide details on the obsolete inventory provision calculation.",
        context: "Provision decreased by 15% despite a 20% increase in slow-moving items.",
        evidence: ["Inventory_Aging_Report.xlsx"]
      }
    ],
    adjustments: []
  },
  rev: {
    questions: [
      {
        id: "REV-01",
        number: 1,
        priority: "low",
        status: "resolved",
        tags: ["Revenue", "Cut-off"],
        text: "Sales invoices 8901-8905 were recorded in December but shipped in January.",
        context: "FOB shipping point terms apply. Goods shipped Jan 2.",
        evidence: ["Shipping_Logs_Jan.pdf"]
      }
    ],
    adjustments: []
  },
  pay: {
    questions: [],
    adjustments: []
  }
};

export default function QuestionnaireLayout() {
  const { t } = useTranslation("auditor-questionnaire");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("ppe");

  const currentSectionData = initialData[activeTab] || { questions: [], adjustments: [] };
  
  // Calculate metrics across all sections
  const metrics = useMemo(() => {
    let total = 0;
    let pending = 0;
    let resolved = 0;
    let exceptions = 0;
    let sectionsWithQueries = 0;

    Object.values(initialData).forEach(section => {
      if (section.questions.length > 0) sectionsWithQueries++;
      total += section.questions.length;
      section.questions.forEach(q => {
        if (q.status === 'pending' || q.status === 'answered') pending++;
        if (q.status === 'resolved') resolved++;
        if (q.status === 'exception') exceptions++;
      });
    });

    return { total, pending, resolved, exceptions, sectionsWithQueries };
  }, []);

  const progress = metrics.total > 0 ? Math.round((metrics.resolved / metrics.total) * 100) : 100;

  const filters = [
    { id: "all", label: t("filters.all", "All") },
    { id: "pending", label: t("filters.pending", "Pending") },
    { id: "resolved", label: t("filters.resolved", "Resolved") },
    { id: "exceptions", label: t("filters.exceptions", "Exceptions") },
    { id: "priority", label: t("filters.priority", "High Priority") }
  ];

  const filteredQuestions = useMemo(() => {
    return currentSectionData.questions.filter(q => {
      if (activeFilter === "all") return true;
      if (activeFilter === "pending") return q.status === "pending" || q.status === "answered";
      if (activeFilter === "resolved") return q.status === "resolved";
      if (activeFilter === "exceptions") return q.status === "exception";
      if (activeFilter === "priority") return q.priority === "high";
      return true;
    });
  }, [currentSectionData.questions, activeFilter]);

  // Map data to navItems for SidebarLeft
  const navItems = [
    { id: "ppe", name: "PPE", sub: "WP-PPE-001" },
    { id: "inv", name: "Inventory", sub: "WP-INV-004" },
    { id: "rev", name: "Revenue", sub: "WP-REV-002" },
    { id: "pay", name: "Payables", sub: "WP-PAY-005" },
  ].map(item => {
    const questions = initialData[item.id]?.questions || [];
    const pendingCount = questions.filter(q => q.status === 'pending' || q.status === 'answered').length;
    const exceptionCount = questions.filter(q => q.status === 'exception').length;
    let status = 'success';
    if (exceptionCount > 0) status = 'danger';
    else if (pendingCount > 0) status = 'warn';
    else if (questions.length === 0) status = 'pending';

    return { ...item, status, count: exceptionCount > 0 ? exceptionCount : pendingCount };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] items-start bg-slate-50 text-slate-900 font-sans pt-[100px]">
      <SidebarLeft activeTab={activeTab} onTabChange={setActiveTab} navItems={navItems} />
      
      <main className="flex flex-col bg-white border-x border-slate-200 min-h-[calc(100vh-100px)]">
        <Topbar progress={progress} />
        <MetricStrip metrics={metrics} />
        
        {/* Filter Bar */}
        <div className="flex items-center gap-2 px-8 py-3 bg-slate-50/50 border-b border-slate-200">
          <Filter className="w-3.5 h-3.5 text-slate-400 mr-2" />
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2">
            {t("filters.label", "FILTER BY:")}
          </span>
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${
                activeFilter === f.id 
                  ? "bg-slate-900 text-white shadow-sm" 
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Questions List */}
        <div className="flex-1 p-8">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-20 text-slate-400 text-sm">No questions found for this filter.</div>
          ) : (
            filteredQuestions.map((q) => (
              <QuestionCard key={q.id} question={q} />
            ))
          )}
        </div>
      </main>

      <SidebarRight adjustments={currentSectionData.adjustments} />
    </div>
  );
}
