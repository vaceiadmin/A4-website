"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AgentsShowcaseProps {
  namespace: "accounting" | "business";
}

const ACCOUNTING_AGENTS = [
  { name: 'Lena', role: 'BOOKKEEPING AGENT', color: '#6366F1', image: '/assets/images/agents/bookkeeper.png', caps: ['Transaction coding & categorisation', 'Bank & credit card reconciliation', 'Accounts payable & receivable', 'Monthly close procedures'] },
  { name: 'Dorian', role: 'GENERAL LEDGER AGENT', color: '#F59E0B', image: '/assets/images/agents/ledger.png', caps: ['Journal entry review & posting', 'Inter-company reconciliation', 'Chart of accounts management', 'Ledger anomaly detection'] },
  { name: 'Mia', role: 'FINANCIAL REPORTING AGENT', color: '#10B981', image: '/assets/images/agents/reporter.png', caps: ['Profit & loss statement', 'Balance sheet preparation', 'Cash flow statement', 'IFRS / local GAAP compliance'] },
  { name: 'Caius', role: 'MANAGEMENT ACCOUNTS AGENT', color: '#8B5CF6', image: '/assets/images/agents/mandy.png', caps: ['Monthly management pack', 'Variance analysis vs budget', 'KPI dashboards & commentary', 'Cost centre reporting'] },
];

const BUSINESS_AGENTS = [
  { name: 'Penny', role: 'PLANNING AGENT', color: '#27272A', image: '/assets/images/agents/penny.png', caps: ['Audit strategy formulation', 'Materiality calculations', 'PBC List generation', 'Resource scheduling'] },
  { name: 'Rika', role: 'RISK ASSESSMENT AGENT', color: '#EF4444', image: '/assets/images/agents/rika.png', caps: ['ISA 315 risk mapping', 'Fraud risk evaluation', 'Control environment assessment', 'Analytical procedures'] },
  { name: 'Felix', role: 'FIELDWORK AGENT', color: '#10B981', image: '/assets/images/agents/felix.png', caps: ['Automated vouching', 'Statistical sampling', 'Re-performance of controls', 'Substantive testing'] },
  { name: 'Glex', role: 'GL ANOMALY AGENT', color: '#F59E0B', image: '/assets/images/agents/glex.png', caps: ['100% population testing', 'Journal entry review', 'Outlier identification', 'Trend analysis'] },
  { name: 'Cleo', role: 'COMPLETION AGENT', color: '#8B5CF6', image: '/assets/images/agents/cleo.png', caps: ['Going concern assessment', 'Subsequent events review', 'Final analytical review', 'Disclosure checklist'] },
  { name: 'Remy', role: 'REPORTING AGENT', color: '#06B6D4', image: '/assets/images/agents/remy.png', caps: ['Audit report drafting', 'Management letter generation', 'Key audit matters writing', 'Sign-off documentation'] },
  { name: 'Comi', role: 'COMMUNICATIONS AGENT', color: '#EC4899', image: '/assets/images/agents/comi.png', caps: ['Client queries handling', 'Status updates generation', 'Information chasing', 'Meeting summaries'] },
  { name: 'Coda', role: 'COMPLIANCE AGENT', color: '#14B8A6', image: '/assets/images/agents/coda.png', caps: ['ISQM 1 compliance', 'Ethics & independence checks', 'Audit file assembly', 'Archiving procedures'] },
];

const AgentsShowcase = ({ namespace }: AgentsShowcaseProps) => {
  const { t } = useTranslation(namespace);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const AGENTS = namespace === "accounting" ? ACCOUNTING_AGENTS : BUSINESS_AGENTS;

  return (
    <section id="agents" className="relative z-10 py-32 bg-white border-t border-zinc-200">
      <div className="text-center px-6 lg:px-16 mb-20 relative z-20">
        <div className="inline-flex items-center gap-3 mb-5">
          <div className="w-7 h-[2px] bg-zinc-900 rounded-full" />
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-900">
            {t("agents.eyebrow", { defaultValue: "MEET THE AGENTS" })}
          </span>
          <div className="w-7 h-[2px] bg-zinc-900 rounded-full" />
        </div>
        <h2 className="font-sora text-[clamp(34px,4.5vw,56px)] font-extrabold tracking-tight leading-[1.08] text-zinc-900 mb-4">
          {t("agents.titleLine1", { defaultValue: "Your AI" })} <span className="text-zinc-500">{t("agents.titleHighlight", { defaultValue: "Dream Team" })}</span>
        </h2>
        <p className="text-base font-normal text-zinc-600 leading-relaxed max-w-lg mx-auto">
          {t("agents.sub", { defaultValue: "Highly specialized, domain-expert AI agents designed to handle specific parts of your workflow." })}
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {AGENTS.map((agent, i) => (
            <div
              key={agent.name}
              className={cn(
                "group relative bg-white rounded-[2rem] border border-zinc-200 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-zinc-300 flex flex-col",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Top Half: Avatar + Grid */}
              <div className="relative pt-8 pb-4 flex flex-col items-center justify-end min-h-[260px] overflow-hidden bg-zinc-50/50">
                {/* Blueprint Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]" />
                
                {/* Agent Name */}
                <h3 className="absolute top-7 inset-x-0 font-georgia italic text-4xl text-zinc-900 text-center z-10 font-normal tracking-wide drop-shadow-sm">
                  {agent.name}
                </h3>

                {/* Avatar Image */}
                <div className="relative z-20 w-[220px] h-[220px] translate-y-4">
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    fill
                    className="object-contain object-bottom drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Bottom Half: Details */}
              <div className="bg-white p-6 relative z-30 flex-1 border-t border-zinc-100 flex flex-col">
                <div 
                  className="font-sora text-[11px] font-bold tracking-[0.2em] text-center mb-5 text-zinc-800"
                >
                  {agent.role}
                </div>
                
                <div className="flex flex-col gap-2 flex-1">
                  {agent.caps.map((cap, j) => (
                    <div 
                      key={j} 
                      className="flex items-center gap-3 px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl transition-colors group-hover:border-zinc-300"
                    >
                      <div 
                        className="w-1.5 h-1.5 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: agent.color }}
                      />
                      <span className="text-[13px] font-medium text-zinc-600 leading-snug">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsShowcase;
