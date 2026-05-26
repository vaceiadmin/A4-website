"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionBadge from "@/components/common/SectionBadge";
import TextAnimation from "@/components/common/TextAnimation";
import { FadeInUp } from "@/components/common/Animations";
import { Search, Settings, Bell, Home, FileText, Share2, Building2, MessageSquare, LogOut, FolderUp } from "lucide-react";

type PortalFeatureVariant = "default" | "technology" | "upload-dashboard";

interface PortalFeatureProps {
  portalImage: string;
  variant?: PortalFeatureVariant;
  // Main top card content
  sectionLabel?: string;
  heading?: string;
  description?: string;
  bulletIntro?: string;
  bulletItems?: string[];
  closingText?: string;
  ctaLabel?: string;
  ctaHref?: string;
  // Bottom-left small card
  bottomTitle?: string;
  bottomDescription?: string;
  // Quote card
  quoteText?: string;
  // Optional Workflow Detail
  workflowDetail?: {
    heading: string;
    description: string;
  };
}

const PortalFeature = ({
  portalImage,
  variant = "default",
  sectionLabel = "Our services",
  heading = "How it works",
  description = "Each review follows a structured, AI-assisted analysis flow designed to support professional financial statement reviews.",
  bulletIntro = "Upload financial statements in PDF format",
  bulletItems = [
    "Select specific review tests or run a full review",
    "Automated audit-style checks and validations",
    "Review findings and finalise with professional judgement",
  ],
  closingText = "Workflows are designed to highlight both confirmations and issues clearly, ensuring consistency, traceability, and an efficient review process.",
  ctaLabel = "Explore the client portal",
  ctaHref = "/portal/client-portal",
  bottomTitle = "AI Review",
  bottomDescription = "Documents, tasks, deadlines and communication in one place.",
  quoteText = "Good firms rely on experience. Great firms rely on structure. VACEI exists to make that structure visible, auditable, and scalable.",
  workflowDetail,
}: PortalFeatureProps) => {

  const [analysisProgress, setAnalysisProgress] = useState(0);

  useEffect(() => {
    if (variant !== "technology") return;
    let frame: number;
    const step = () => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
      frame = window.setTimeout(step, 60);
    };
    step();
    return () => {
      window.clearTimeout(frame);
    };
  }, [variant]);
  return (
    <section className="bg-section-light py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-4 lg:h-[658px]">
          {/* Left Column: Text / How it works */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-1/2 h-full"
          >
            <div className="flex flex-col gap-4 h-full">
              {/* 1. Top Wide Card: How it is used */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm grow flex flex-col justify-center transition-shadow duration-300 hover:shadow-md">
                <div className="mb-4">
                  <SectionBadge text={sectionLabel} className="text-heading" />
                </div>
                <TextAnimation
                  text={heading}
                  as="h2"
                  className="text-2xl lg:text-3xl font-medium text-heading mb-3 text-left"
                />
                <p className="text-gray text-sm mb-4 text-left">
                  {description}
                </p>
                <p className="text-gray text-sm mb-3 text-left font-semibold">
                  {bulletIntro}
                </p>
                <ul className="space-y-2 mb-6">
                  {bulletItems.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                      className="flex items-start gap-2 text-sm text-heading font-medium text-left"
                    >
                      {/* Circle Container with Diamond Bullet (Dark) */}
                      <div className="mt-1 shrink-0 text-heading">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            opacity="0.2"
                            cx="10"
                            cy="10"
                            r="9"
                            stroke="currentColor"
                          />
                          <path
                            d="M10 6L14 10L10 14L6 10Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      {item}
                    </motion.li>
                  ))}
                </ul>
                <p className="text-gray text-sm mb-4 text-left">
                  {closingText}
                </p>

                <div className="text-left">
                  <Link
                    href={ctaHref}
                    className="inline-flex items-center gap-2 text-heading font-semibold text-sm hover:text-primary-blue transition-colors group"
                  >
                    {ctaLabel}
                    <div className="w-5 h-5 rounded-full bg-primary group-hover:bg-primary-blue flex items-center justify-center transition-colors">
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 19L19 5M19 5H9M19 5V15"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Workflow Detail Card (Optional) */}
              {workflowDetail && (
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <h3 className="text-lg font-medium text-heading mb-3 text-left">
                    {workflowDetail.heading}
                  </h3>
                  <p className="text-gray text-sm leading-relaxed text-left">
                    {workflowDetail.description}
                  </p>
                </div>
              )}

              {/* 2. Bottom Row: Split 2:3 Ratio */}

              <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4 h-auto md:h-[35%] min-h-[200px]">
                {/* Client Portal Info */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center h-full transition-transform duration-300 hover:scale-[1.02]">
                  <h3 className="text-lg font-medium text-heading mb-3 text-left">
                    {bottomTitle}
                  </h3>
                  <p className="text-gray text-sm leading-relaxed text-left">
                    {bottomDescription}
                  </p>
                </div>

                {/* Quote Card */}
                <div className="bg-primary-blue rounded-2xl p-6 shadow-sm flex flex-col justify-center relative overflow-hidden h-full transition-transform duration-300 hover:scale-[1.02]">
                  {/* Quote Icon Top Left */}
                  <div className="absolute top-4 left-4 opacity-30">
                    <Image
                      src="/assets/images/Vector (3).png"
                      alt="Quote icon"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>

                  <p className="text-white text-[13px] leading-relaxed text-center relative z-10 pt-2 pb-2">
                    {quoteText}
                  </p>

                  {/* Quote Icon Bottom Right */}
                  <div className="absolute bottom-4 right-4 opacity-30 rotate-180">
                    <Image
                      src="/assets/images/Vector (3).png"
                      alt="Quote icon"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex flex-col h-full"
          >
            {variant === "technology" ? (
              <div className="w-full h-full rounded-3xl bg-background border border-input shadow-xl px-5 py-6 md:px-7 md:py-7 flex flex-col gap-5 hover:shadow-2xl transition-shadow duration-500">
                {/* Top status row with vector */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-tab-active flex items-center justify-center text-white text-xl font-semibold">
                      $
                    </div>
                    <div className="h-2 w-40 rounded-full bg-gray-200" />
                  </div>
                  <div className="flex items-center gap-2 text-tab-active text-sm font-semibold">
                    <span className="inline-flex w-6 h-6 rounded-full bg-icon items-center justify-center">
                      <span className="w-3 h-3 border-2 border-tab-active border-t-transparent rounded-full animate-spin" />
                    </span>
                    <span>Improving</span>
                  </div>
                </div>

                {/* Main analysis + upload area */}
                <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-4 md:gap-5">
                  {/* Analyzing Financial Statement */}
                  <div className="bg-white rounded-2xl border border-input px-5 py-5 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-icon flex items-center justify-center text-tab-active">
                          <Image
                            src="/assets/images/VectorC.png"
                            alt="Analysis"
                            width={22}
                            height={22}
                            className="object-contain"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={`text-[13px] font-semibold text-heading ${analysisProgress === 100
                                ? "line-through opacity-60"
                                : ""
                              }`}
                          >
                            Analyzing Financial Statement
                          </span>
                          <span className="text-[11px] text-gray-500">
                            Generate AI report on financial statements
                          </span>
                        </div>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-icon overflow-hidden">
                        <div
                          className="h-full rounded-full bg-tab-active transition-all duration-150"
                          style={{ width: `${analysisProgress}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-gray-500">
                        Uploading financial statements, extracting engagement
                        data, validating fields and generating AI report.
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500">
                      <span>Setup status</span>
                      <span className="flex items-center gap-1 text-tab-active font-semibold">
                        <span className="w-3 h-3 border-2 border-tab-active border-t-transparent rounded-full animate-spin" />
                        {analysisProgress}%
                      </span>
                    </div>
                  </div>

                  {/* Analyze your Finance Document */}
                  <div className="bg-white rounded-2xl border border-input px-5 py-5 flex flex-col gap-3">
                    <div className="space-y-1">
                      <p className="text-[13px] font-semibold text-heading">
                        Analyze your Finance Document
                      </p>
                      <p className="text-[11px] text-gray-500">
                        Drop your document and run advanced text recognition.
                      </p>
                    </div>
                    <div className="flex-1">
                      <div className="w-full border border-dashed border-input rounded-xl bg-icon px-4 py-4 text-center space-y-2 cursor-pointer hover:bg-gray-50 transition-colors">
                        <p className="text-[11px] text-gray-500">
                          Drop your document here
                        </p>
                        <p className="text-[10px] text-gray-400">
                          Support PDF files up to 10MB
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-2">
                          <button className="px-3 py-1.5 rounded-full border border-input text-[11px] font-semibold text-heading">
                            Choose Files
                          </button>
                          <button className="px-3 py-1.5 rounded-full bg-tab-active text-white text-[11px] font-semibold shadow-sm">
                            Analyze Document
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom summary cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="bg-white rounded-2xl border border-error px-5 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[12px] font-semibold text-error">
                        Critical Errors
                      </p>
                      <span className="text-[11px] rounded-full bg-error text-error px-2 py-0.5 font-semibold">
                        33
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-[11px] text-gray-600">
                      <li>BS32 - Balance sheet does not reconcile</li>
                      <li>BS14 - Missing balance sheet note</li>
                      <li>BS19 - Total current assets mismatch</li>
                      <li>BI02 - Inventory valuation issue</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-2xl border border-success px-5 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[12px] font-semibold text-success">
                        Confirmed Correct Items
                      </p>
                      <span className="text-[11px] rounded-full bg-success text-success px-2 py-0.5 font-semibold">
                        33
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-[11px] text-gray-600">
                      <li>GI01 - ENTITY_LEGAL_NAME — GENERAL</li>
                      <li>GI05 - REGISTERED_OFFICE — GENERAL</li>
                      <li>BI02 - CONTACT_PERSON — GENERAL</li>
                      <li>BI06 - PRIMARY_BUSINESS — GENERAL</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : variant === "upload-dashboard" ? (
              <div className="w-full h-full rounded-2xl bg-[#F8FAFC] border border-gray-200 shadow-xl flex overflow-hidden lg:min-h-0 min-h-[500px] group cursor-default">
                {/* Left Sidebar */}
                <div className="hidden sm:flex w-[70px] bg-[#0e1222] flex-col items-center py-6 gap-6 z-10 shrink-0">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg shadow-blue-500/20">V</div>
                  <div className="flex flex-col gap-6 text-slate-500 w-full items-center">
                    <div className="p-2.5 bg-white/10 rounded-xl text-white"><Home className="w-5 h-5" /></div>
                    <FileText className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                    <FolderUp className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                    <Share2 className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                    <Building2 className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                    <MessageSquare className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                  </div>
                  <div className="mt-auto">
                    <img src="https://i.pravatar.cc/100?img=11" alt="User" className="w-9 h-9 rounded-full border-2 border-slate-700" />
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col bg-white overflow-hidden">
                  {/* Top Navbar */}
                  <div className="h-16 border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 bg-white shrink-0">
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-32 sm:w-56">
                      <span className="text-slate-400 text-[11px] font-medium grow">Search...</span>
                      <Search className="w-3.5 h-3.5 text-slate-800 bg-slate-200 rounded p-0.5" />
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="hidden sm:flex items-center gap-2 border border-slate-200 px-3 py-1.5 rounded-lg bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                        <svg className="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
                        <span className="text-[11px] font-semibold text-slate-700">Quick action</span>
                      </div>
                      <Settings className="w-4 h-4 text-slate-500 cursor-pointer hover:text-slate-800 transition-colors" />
                      <Bell className="w-4 h-4 text-slate-500 cursor-pointer hover:text-slate-800 transition-colors" />
                      <div className="flex items-center gap-2 border-l border-slate-100 pl-3 sm:pl-4">
                        <img src="https://i.pravatar.cc/100?img=11" alt="User" className="w-7 h-7 rounded-md" />
                        <div className="flex-col hidden lg:flex">
                          <span className="text-[11px] font-bold text-slate-800 leading-tight">Cleven</span>
                          <span className="text-[9px] text-slate-400">Client</span>
                        </div>
                        <LogOut className="w-4 h-4 text-red-400 ml-1 hidden sm:block cursor-pointer hover:text-red-500 transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 p-5 sm:p-6 flex flex-col overflow-y-auto">
                    {/* Welcome & Warning */}
                    <div className="mb-4 sm:mb-6">
                      <h2 className="text-lg font-bold text-slate-900 mb-3">Welcome Back, Cleven</h2>
                      <div className="bg-white border border-slate-200 rounded-lg p-3 w-full shadow-sm text-sm">
                        <span className="font-semibold text-slate-800">Warning:</span> <span className="text-slate-500 ml-1">No documents uploaded this month</span>
                      </div>
                    </div>

                    {/* Central Image Upload Box */}
                    <div className="w-full flex justify-center items-center py-4 sm:py-6 mb-4 mt-2">
                      <div className="relative w-full max-w-[280px] h-[160px] sm:max-w-[340px] sm:h-[190px]">
                        <Image
                          src={portalImage}
                          alt="Upload Box"
                          fill
                          className="object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
                          priority
                        />
                      </div>
                    </div>

                    {/* Bottom UI Related to Uploading Document */}
                    <div className="mt-auto border border-slate-100 rounded-xl p-4 bg-slate-50/50">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                        <h3 className="text-xs font-bold text-slate-700">Pending Requests</h3>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">2 Action Required</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 overflow-hidden pr-2">
                            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4 text-red-500" />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-[11px] font-semibold text-slate-800 truncate">Q1 VAT Return Invoices</span>
                              <span className="text-[10px] text-red-500 font-medium whitespace-nowrap">Overdue by 3 days</span>
                            </div>
                          </div>
                          <button className="text-[10px] font-bold text-slate-600 border border-slate-200 bg-white px-3 py-1.5 rounded-md hover:bg-slate-50 shadow-sm shrink-0 transition-colors">Upload</button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 overflow-hidden pr-2">
                            <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4 text-yellow-600" />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-[11px] font-semibold text-slate-800 truncate">Copy of Director's ID Proof</span>
                              <span className="text-[10px] text-yellow-600 font-medium whitespace-nowrap">Due in 5 days</span>
                            </div>
                          </div>
                          <button className="text-[10px] font-bold text-slate-600 border border-slate-200 bg-white px-3 py-1.5 rounded-md hover:bg-slate-50 shadow-sm shrink-0 transition-colors">Upload</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-gray-100 bg-white min-h-[400px] lg:min-h-0 group">
                <Image
                  src={portalImage}
                  alt="Client Portal Dashboard"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PortalFeature;
