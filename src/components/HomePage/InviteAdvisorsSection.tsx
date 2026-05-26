"use client";

import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";
import GetInstantQuoteButton from "@/components/common/GetInstantQuoteButton";
import { lazyImgProps } from "@/lib/lazy-media-props";

const InviteAdvisorsSection = () => {
  const { t } = useTranslation("home");
  const bullets = useMemo(
    () => (t("inviteAdvisors.bullets", { returnObjects: true }) as string[]) ?? [],
    [t]
  );
  return (
    <section className="relative py-20 lg:py-28 bg-[#0B0D14] rounded-[48px] overflow-hidden border border-white/5 shadow-2xl">
      {/* Subtle Decorative Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-50" />
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] opacity-60 mix-blend-screen" />
        <div className="absolute bottom-[10%] -right-[5%] w-[30%] h-[40%] bg-blue-600/10 rounded-full blur-[100px] opacity-40 mix-blend-screen" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Content Side */}
          <div className="w-full lg:w-1/2 flex flex-col items-start">
            <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-white leading-[1.1] mb-6 tracking-tight">
              {t("inviteAdvisors.titleLine1")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">{t("inviteAdvisors.titleHighlight")}</span>
            </h2>
            
            <p className="text-lg text-slate-400 leading-relaxed mb-10 font-medium max-w-xl">
              {t("inviteAdvisors.body")}
            </p>

            <ul className="space-y-5 mb-12 w-full">
              {bullets.map((item, index) => (
                <li key={index} className="flex items-center gap-4 group">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-1.5 shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-slate-300 font-bold text-lg group-hover:text-white transition-colors">{item}</span>
                </li>
              ))}
            </ul>

            <GetInstantQuoteButton 
              text={t("inviteAdvisors.createWorkspaceCta")}
              className="h-[56px] px-10 shadow-xl shadow-blue-600/10 hover:shadow-blue-600/20 bg-white text-slate-900 border-none"
              hasShadow={false}
            />
          </div>

          {/* Right Visual Side - GIF */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="relative rounded-3xl overflow-hidden bg-[#0A0A0F] border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)_inset] transition-all duration-700 hover:scale-[1.02] hover:border-blue-500/30 w-full z-10">
              {/* Browser Header */}
              <div className="h-10 w-full bg-[#181926] border-b border-white/5 flex items-center px-4 justify-start gap-2 relative">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              
              <div className="relative w-full aspect-[4/3] sm:aspect-video bg-[#050505] overflow-hidden flex items-center justify-center">
                {/* Fallback pattern in case GIF is missing */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }} />
                
                <img 
                  src="/assets/videos/Invite%20Advisor%20V1.2.gif" 
                  alt={t("inviteAdvisors.gifAlt")} 
                  className="w-full h-full object-cover relative z-10 opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                  {...lazyImgProps}
                  onError={(e) => {
                    e.currentTarget.style.opacity = '0';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center hidden text-slate-400 font-medium z-10 px-6 text-center bg-[#050505]/80 backdrop-blur-sm">
                  <span className="mb-2 text-white/90">{t("inviteAdvisors.gifPlaceholderTitle")}</span>
                  <span className="text-sm">{t("inviteAdvisors.gifPlaceholderHint")} <br/> <code className="text-blue-400">{t("inviteAdvisors.gifPlaceholderPath")}</code></span>
                </div>
              </div>
            </div>

            {/* Glowing ambient background behind the browser */}
            <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-[100px] -z-0 animate-pulse-subtle pointer-events-none group-hover:bg-blue-600/30 transition-colors duration-700" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default InviteAdvisorsSection;
