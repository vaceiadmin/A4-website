"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Building2, FileSearch, ShieldCheck, Paintbrush } from "lucide-react";

interface ValueStripProps {
  namespace: "accounting" | "business";
}

const ValueStrip = ({ namespace }: ValueStripProps) => {
  const { t } = useTranslation(namespace);

  const icons = [
    <Building2 className="w-8 h-8 text-primary-blue" key="1" />,
    <FileSearch className="w-8 h-8 text-emerald-400" key="2" />,
    <ShieldCheck className="w-8 h-8 text-amber-400" key="3" />,
    <Paintbrush className="w-8 h-8 text-purple-400" key="4" />
  ];

  return (
    <div className="relative z-10 px-6 lg:px-16 pb-24 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i, idx) => (
          <div 
            key={i} 
            className="bg-white border border-zinc-200 rounded-[24px] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-100 group"
          >
            <div className="mb-5 flex items-center justify-center w-12 h-12 bg-zinc-50 rounded-xl border border-zinc-200 group-hover:bg-zinc-100 transition-colors">
              {React.cloneElement(icons[idx] as React.ReactElement<any>, { className: "w-6 h-6 text-zinc-900" })}
            </div>
            <h3 className="font-sora text-[16px] font-bold text-zinc-900 tracking-tight mb-3">
              {t(`values.c${i}.title`)}
            </h3>
            <p className="text-[14px] font-normal text-zinc-600 leading-[1.65]">
              {t(`values.c${i}.desc`)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValueStrip;
