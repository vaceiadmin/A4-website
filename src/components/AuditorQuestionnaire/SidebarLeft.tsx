"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import LocalizedLink from "@/components/common/LocalizedLink";

interface NavItem {
  id: string;
  name: string;
  sub: string;
  status: string;
  count: number;
}

interface SidebarLeftProps {
  activeTab: string;
  onTabChange: (id: string) => void;
  navItems: NavItem[];
}

export default function SidebarLeft({ activeTab, onTabChange, navItems }: SidebarLeftProps) {
  const { t } = useTranslation("auditor-questionnaire");

  return (
    <aside className="bg-slate-50 flex flex-col h-[calc(100vh-100px)] sticky top-[100px] overflow-y-auto">
      {/* Brand */}
      <div className="p-6 border-b border-slate-200">
        <div className="text-[10px] font-semibold text-primary-blue tracking-widest uppercase mb-2">
          {t("sidebarLeft.brandMark")}
        </div>
        <div className="font-sora text-lg font-bold text-slate-900 mb-1">
          {t("sidebarLeft.brandName")}
        </div>
        <div className="font-mono text-xs text-slate-500">
          {t("sidebarLeft.brandSub")}
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 py-4">
        <div className="px-6 py-2 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
          {t("sidebarLeft.sectionsLabel")}
        </div>
        
        <div className="flex flex-col mt-2">
          {navItems.map((item, idx) => (
            <button 
              key={item.id} 
              onClick={() => onTabChange(item.id)}
              className={`flex items-center text-left gap-3 px-6 py-2.5 transition-colors border-l-2 ${
                activeTab === item.id 
                  ? "bg-primary-blue/5 border-primary-blue" 
                  : "border-transparent hover:bg-slate-100"
              }`}
            >
              <div className={`w-2 h-2 rounded-full shrink-0 ${
                item.status === 'danger' ? 'bg-red-500' :
                item.status === 'warn' ? 'bg-amber-500' :
                item.status === 'success' ? 'bg-emerald-500' :
                'border-[1.5px] border-slate-300'
              }`} />
              
              <div className="flex-1">
                <div className={`text-[13px] font-semibold ${activeTab === item.id ? 'text-primary-blue' : 'text-slate-700'}`}>
                  {item.name}
                </div>
                <div className="font-mono text-[10px] text-slate-400 mt-0.5">
                  {item.sub}
                </div>
              </div>

              {item.count > 0 && (
                <div className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full ${
                  item.status === 'danger' ? 'bg-red-100 text-red-600' :
                  item.status === 'warn' ? 'bg-amber-100 text-amber-600' :
                  'bg-emerald-100 text-emerald-600'
                }`}>
                  {item.count}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-slate-200 mt-auto">
        <LocalizedLink href="/accounting" className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-4 border border-slate-200 px-3 py-1.5 rounded-md hover:bg-slate-100">
          ← Back to Site
        </LocalizedLink>
        <div className="font-mono text-[10px] text-slate-400 leading-relaxed whitespace-pre-line">
          {t("sidebarLeft.footer")}
        </div>
      </div>
    </aside>
  );
}
