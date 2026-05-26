"use client";

import React from "react";
import Image from "next/image";
import GradientContainer from "@/components/common/GradientContainer";
import { BellIcon } from "lucide-react";
import { FadeInUp } from "../common/Animations";
import { usePagesTranslation } from "@/hooks/usePagesTranslation";

type OverviewVariant = "client" | "accounting" | "audit";

interface BulletedSection {
  title: string;
  intro?: string;
  bullets: string[];
  footer?: string;
}

interface ClientPortalOverviewSectionProps {
  variant?: OverviewVariant;
  /** Base route key for `pages`, e.g. `portal/client-portal` */
  i18nRouteKey: string;
  /** Accounting-only: use the “integrated delivery” preview mockup instead of the standard accounting card */
  integratedDeliveryVisual?: boolean;
  heading?: string;
  paragraphs?: string[];
  bulletedSections?: BulletedSection[];
  bulletIconSrc?: string;
}

const ClientPortalOverviewSection = ({
  variant = "client",
  i18nRouteKey,
  integratedDeliveryVisual = false,
  heading,
  paragraphs,
  bulletedSections,
  bulletIconSrc,
}: ClientPortalOverviewSectionProps) => {
  const { t } = usePagesTranslation(i18nRouteKey);

  const renderLeftCard = () => {
    const isAccounting = variant === "accounting";

    if (variant === "audit") {
      const pbcRows = (t("demo.audit.pbcRows", { returnObjects: true }) as unknown) as string[];
      const tbRows = (t("demo.audit.tbRows", { returnObjects: true }) as unknown) as {
        label: string;
        v1: string;
        v2: string;
        v3: string;
      }[];

      return (
        <GradientContainer
          showRadials={false}
          backgroundColor=""
          className="rounded-[32px] p-4 md:p-6"
        >
          <div className="rounded-[28px] px-4 py-4 ">
            <div className="space-y-5 md:space-y-6">
              <div className="bg-white rounded-2xl border border-input shadow-xl max-w-sm w-full mx-auto md:mx-0">
                <div className="px-5 py-3 border-b border-input">
                  <p className="text-[11px] md:text-[12px] font-semibold text-heading">
                    {t("demo.audit.pbcTitle")}
                  </p>
                </div>
                <div className="px-5 py-3 text-[10px] md:text-[11px] text-gray">
                  <div className="grid grid-cols-[1.4fr_0.9fr_0.7fr] pb-2 border-b border-input font-semibold text-[10px] text-gray">
                    <span>{t("demo.audit.colItem")}</span>
                    <span className="text-center">{t("demo.audit.colStatus")}</span>
                    <span className="text-right">{t("demo.audit.colAction")}</span>
                  </div>
                  <div className="divide-y divide-input">
                    {(Array.isArray(pbcRows) ? pbcRows : []).map((label, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-[1.4fr_0.9fr_0.7fr] py-2.5 items-center"
                      >
                        <span className="text-heading">{label}</span>
                        <span className="text-center text-[10px] font-medium text-gray">
                          {t("demo.audit.statusMissing")}
                        </span>
                        <span className="text-right">
                          <button
                            type="button"
                            className="inline-flex rounded-full border border-input bg-icon px-3 py-0.5 text-[9px] font-semibold text-primary-blue"
                          >
                            {t("demo.audit.upload")}
                          </button>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-input shadow-xl max-w-sm w-full mx-auto md:ml-12">
                <div className="px-5 py-3 border-b border-input">
                  <p className="text-[11px] md:text-[12px] font-semibold text-heading">
                    {t("demo.audit.extendTbTitle")}
                  </p>
                </div>
                <div className="px-5 py-3 text-[10px] md:text-[11px] text-gray">
                  <div className="grid grid-cols-[1.5fr_0.9fr_0.9fr_0.9fr] pb-2 border-b border-input font-semibold text-[10px] text-gray">
                    <span>{t("demo.audit.tbColAccount")}</span>
                    <span className="text-center">{t("demo.audit.tbColTrial")}</span>
                    <span className="text-center">{t("demo.audit.tbColAdj")}</span>
                    <span className="text-center">{t("demo.audit.tbColExtended")}</span>
                  </div>
                  <div className="divide-y divide-input">
                    {(Array.isArray(tbRows) ? tbRows : []).map((row, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-[1.5fr_0.9fr_0.9fr_0.9fr] py-2.5 items-center"
                      >
                        <span className="text-heading">{row.label}</span>
                        <span className="text-center text-heading">{row.v1}</span>
                        <span className="text-center text-heading">{row.v2}</span>
                        <span className="text-center text-heading">{row.v3}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GradientContainer>
      );
    }

    if (isAccounting && integratedDeliveryVisual) {
      const preparedRows = (t("demo.integrated.preparedRows", {
        returnObjects: true,
      }) as unknown) as { label: string; date: string; color?: string; active?: boolean }[];

      return (
        <GradientContainer
          showRadials={false}
          backgroundColor=""
          className="rounded-[32px] p-4 md:p-6"
        >
          <div className="relative rounded-[32px]  min-h-[340px] md:min-h-[380px]">
            <div className="bg-white rounded-2xl border border-input shadow-xl w-[78%] md:w-[68%] mt-3 md:mt-4 ml-3 md:ml-4">
              <div className="px-5 py-4 border-b border-input">
                <p className="text-[12px] md:text-[13px] font-semibold text-heading">
                  {t("demo.integrated.preparedListTitle")}
                </p>
              </div>
              <div className="px-5 py-3 space-y-3 text-[11px] md:text-[12px] text-gray">
                {(Array.isArray(preparedRows) ? preparedRows : []).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl px-2.5 py-2 hover:bg-icon transition-colors"
                  >
                    <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                          item.active
                            ? "bg-button-indigo border-button-indigo"
                            : "border-input"
                        }`}
                      >
                        <span
                          className="h-2.5 w-2.5 rounded-full border-[2px] border-white"
                          style={{ backgroundColor: item.color ?? "#3b49e6" }}
                        />
                      </span>
                      <div className="flex flex-col leading-tight">
                        <span className="text-[12px] text-heading">{item.label}</span>
                        <span className="text-[10px] text-gray">{item.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute top-0 right-0 w-[96px] md:w-[116px] bg-white rounded-2xl border border-input shadow-xl px-3 py-3 text-[9px] md:text-[10px] text-gray">
              <p className="text-[9px] font-medium text-gray mb-1">
                {t("demo.integrated.spendWeek")}
              </p>
              <p className="text-[13px] md:text-[14px] font-semibold text-heading">
                $540
              </p>
              <p className="text-[9px] text-[#EF4444] mb-2">↓ 2.5%</p>
              <div className="h-9 w-full rounded-md bg-gradient-to-t from-icon to-white flex items-end justify-between px-0.5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span
                    key={i}
                    className="flex-1 mx-[1px] rounded-full bg-button-indigo/40"
                    style={{ height: `${20 + (i % 4) * 6}px` }}
                  />
                ))}
              </div>
            </div>

            <div className="absolute bottom-0 right-0  w-[76%] md:w-[56%] bg-white rounded-2xl border border-input shadow-[0_28px_50px_rgba(15,23,42,0.45)] px-5 py-4">
              <p className="text-[11px] font-semibold text-heading mb-1">
                {t("demo.integrated.partnershipTitle")}
              </p>
              <p className="text-[10px] text-gray mb-4">{t("demo.integrated.partnershipSubtitle")}</p>
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 md:h-24 md:w-24">
                  <div className="absolute inset-0 rounded-full bg-success" />
                  <div className="absolute bottom-1 left-0 h-10 w-10 rounded-full bg-primary-blue" />
                  <div className="absolute bottom-0 right-0 h-9 w-9 rounded-full bg-progress-purple" />
                </div>
                <div className="flex flex-col gap-1 text-[10px] text-gray">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-primary-blue" /> 23
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-success" /> 89.7
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-progress-purple" /> 12
                  </span>
                </div>
              </div>
            </div>

            <div className="h-10 md:h-12" />
          </div>
        </GradientContainer>
      );
    }

    if (isAccounting) {
      const requestRows = (t("demo.accounting.requestRows", {
        returnObjects: true,
      }) as unknown) as { label: string; date: string }[];
      const vatPeriods = (t("demo.accounting.vatPeriods", { returnObjects: true }) as unknown) as string[];
      const missingItems = (t("demo.accounting.missingItems", { returnObjects: true }) as unknown) as string[];

      return (
        <GradientContainer
          showRadials={false}
          backgroundColor=""
          className="rounded-[24px] px-4 py-5 md:px-6 md:py-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.2fr] gap-5 items-start">
            <div className="space-y-5">
              <div className="bg-white rounded-2xl px-4 py-4 shadow-xl border border-[#E3E4F0] text-[11px] text-[#1C2340]">
                <p className="text-[10px] font-semibold mb-3 text-[#1C2340]">
                  {t("demo.accounting.requestsTitle")}
                </p>
                <div className="space-y-2">
                  {(Array.isArray(requestRows) ? requestRows : []).map((row, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl bg-icon px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-tab-active" />
                        <div className="flex flex-col leading-tight">
                          <span className="text-[11px] text-heading">{row.label}</span>
                          <span className="text-[9px] text-[#9FA4C9]">{row.date}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="px-3 py-1 rounded-full bg-primary text-white text-[10px] font-semibold shadow-primary-blue"
                      >
                        {t("demo.accounting.open")}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl px-4 py-4 shadow-xl border border-[#E3E4F0] text-[11px] text-[#1C2340]">
              <p className="text-[10px] font-semibold mb-3 text-[#1C2340]">
                {t("demo.accounting.vatTitle")}
              </p>
              <div className="space-y-2">
                {(Array.isArray(vatPeriods) ? vatPeriods : []).map((period, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl bg-icon px-3 py-2"
                  >
                    <div className="flex flex-col leading-tight">
                      <span className="text-[11px] text-heading">{period}</span>
                      <span className="text-[9px] text-[#9FA4C9]">
                        {t("demo.accounting.status")}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="px-3 py-1 rounded-full bg-primary text-white text-[10px] font-semibold border border-[#D3D5EE] shadow-lg"
                    >
                      {t("demo.accounting.view")}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl px-4 py-4 shadow-xl border border-[#E3E4F0] text-[11px] text-[#1C2340]">
                <p className="text-[10px] font-semibold mb-3 text-[#1C2340]">
                  {t("demo.accounting.missingTitle")}
                </p>
                <div className="space-y-2">
                  {(Array.isArray(missingItems) ? missingItems : []).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl bg-icon px-3 py-2"
                    >
                      <span className="text-[11px] text-heading">{item}</span>
                      <button
                        type="button"
                        className="px-3 py-1 rounded-full bg-primary text-white text-[10px] font-semibold border border-[#D3D5EE] shadow-lg"
                      >
                        {t("demo.accounting.upload")}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GradientContainer>
      );
    }

    return (
      <GradientContainer
        showRadials={false}
        backgroundColor=""
        className="rounded-[24px] px-4 py-4 md:px-5 md:py-5 shadow-[0_18px_45px_rgba(0,0,0,0.14)] border border-[#E3E4F0]"
      >
        <div className="bg-white p-4 rounded-[18px]">
          <div className="bg-hero rounded-2xl px-4 py-3 text-xs text-white  border border-[#1C233F] shadow-[0_10px_25px_rgba(0,0,0,0.45)]">
            <p className="text-[11px] font-semibold mb-1">{t("demo.client.heroTitle")}</p>
            <p className="text-[10px] text-[#9FA4C9] mb-3">{t("demo.client.heroSubtitle")}</p>
            <div className="flex flex-wrap items-center gap-2 text-[10px]">
              <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
                {t("demo.client.tagCompany")}
              </span>
              <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
                {t("demo.client.tagAcme")}
              </span>
              <span className="px-2 py-1 rounded-full bg-[#2E254C] border border-[#FFC857] text-[#FFC857]">
                {t("demo.client.tagNeedsAttention")}
              </span>
              <span className="px-2 py-1 rounded-full bg-[#372241] border border-[#FF4D6A] text-[#FFD5DE]">
                {t("demo.client.tagRiskHigh")}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#E5E7F1] overflow-hidden shadow-[0_12px_30px_rgba(12,15,36,0.18)] mt-4">
          <div className="px-4 py-3 border-b border-[#EAECF5] flex items-center gap-2 text-[11px] text-[#1C2340] bg-[#F5F6FD]">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#9FA4C9] text-[10px]">
              <BellIcon className="w-4 h-4 text-[#9FA4C9]" />
            </span>
            <span className="font-semibold text-lg">{t("demo.client.noticeTitle")}</span>
          </div>

          <div className="p-4 space-y-4 bg-white">
            <div className="bg-[#0F132B] rounded-xl border border-[#262B4B] px-4 py-3 text-[11px] text-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-1.5 py-0.5 rounded-full bg-[#3B1F2F] text-[9px] uppercase tracking-wide text-[#FF8FA3]">
                  {t("demo.client.urgentLabel")}
                </span>
                <span className="text-[10px] text-[#B0B3D6]">{t("demo.client.urgentMeta")}</span>
              </div>
              <p className="font-semibold mb-1">{t("demo.client.urgentTitle")}</p>
              <p className="text-[10px] text-[#B0B3D6] mb-2">{t("demo.client.urgentBody")}</p>
              <p className="text-[10px] text-[#B0B3D6]">
                {t("demo.client.releaseDateLabel")}{" "}
                <span className="text-white font-medium">{t("demo.client.releaseDate")}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="bg-white rounded-xl px-3 py-3 border border-[#E5E7F1] shadow-[0_4px_12px_rgba(12,15,36,0.08)]">
                <p className="text-[#4B4F6B] mb-1">{t("demo.client.statOverdue")}</p>
                <p className="text-lg font-semibold text-[#FF4D6A]">4</p>
              </div>
              <div className="bg-white rounded-xl px-3 py-3 border border-[#E5E7F1] shadow-[0_4px_12px_rgba(12,15,36,0.08)]">
                <p className="text-[#4B4F6B] mb-1">{t("demo.client.statDueSoon")}</p>
                <p className="text-lg font-semibold text-[#1C2340]">0</p>
              </div>
              <div className="bg-white rounded-xl px-3 py-3 border border-[#E5E7F1] shadow-[0_4px_12px_rgba(12,15,36,0.08)]">
                <p className="text-[#4B4F6B] mb-1">{t("demo.client.statWaiting")}</p>
                <p className="text-lg font-semibold text-[#1C2340]">2</p>
              </div>
              <div className="bg-white rounded-xl px-3 py-3 border border-[#E5E7F1] shadow-[0_4px_12px_rgba(12,15,36,0.08)]">
                <p className="text-[#4B4F6B] mb-1">{t("demo.client.statDueSoon")}</p>
                <p className="text-lg font-semibold text-[#1C2340]">0</p>
              </div>
            </div>
          </div>
        </div>
      </GradientContainer>
    );
  };

  return (
    <section className="py-16 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <FadeInUp className="w-full lg:w-1/2">{renderLeftCard()}</FadeInUp>

          <FadeInUp delay={0.2} className="w-full lg:w-1/2 space-y-6 text-left">
            {!bulletedSections && heading && (
              <h2 className="text-3xl md:text-4xl font-medium text-heading">{heading}</h2>
            )}

            {bulletedSections ? (
              <div className="space-y-8">
                {bulletedSections.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-medium text-heading">{section.title}</h3>
                    {section.intro && (
                      <p className="text-sm md:text-base text-gray leading-relaxed">{section.intro}</p>
                    )}
                    {section.bullets.length > 0 && (
                      <ul className="mt-2 space-y-2">
                        {section.bullets.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm md:text-base text-gray leading-relaxed"
                          >
                            {bulletIconSrc && (
                              <Image
                                src={bulletIconSrc}
                                alt=""
                                width={16}
                                height={16}
                                className="mt-[3px] h-4 w-4"
                              />
                            )}
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.footer && (
                      <p className="text-sm md:text-base text-gray leading-relaxed">{section.footer}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              paragraphs &&
              paragraphs.length > 0 && (
                <div className="space-y-3">
                  {paragraphs.map((text, idx) => (
                    <p
                      key={idx}
                      className="text-sm md:text-base text-gray leading-relaxed whitespace-pre-line"
                    >
                      {text}
                    </p>
                  ))}
                </div>
              )
            )}
          </FadeInUp>
        </div>
      </div>
    </section>
  );
};

export default ClientPortalOverviewSection;
