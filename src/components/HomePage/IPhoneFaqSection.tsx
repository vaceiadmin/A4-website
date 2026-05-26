"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const faqData = [
  {
    question: "What services does VACEI provide?",
    answer: "VACEI provides accounting, bookkeeping, VAT, payroll, audit, and related corporate services. Services are scoped and confirmed before engagement."
  },
  {
    question: "Will I have a dedicated team?",
    answer: "Yes, each client is assigned a dedicated team that manages their account. You'll have direct access to your team through the Client Portal for communication and support."
  },
  {
    question: "How do I communicate with my team?",
    answer: "Communication happens through the Client Portal, where you can send messages, respond to requests, and track all interactions in one centralized location."
  },
  {
    question: "How do I upload documents?",
    answer: "Documents are uploaded securely through the Client Portal, where requests and submissions are tracked in one place."
  },
  {
    question: "Is my data secure?",
    answer: "Yes. Data is stored and managed within controlled systems with access restricted by role and permission."
  }
];

const IPhoneFaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full py-16 px-4 bg-[#f8fafb]">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-bold tracking-widest text-[#3b49e6] uppercase mb-3">
            Questions & Answers
          </span>
          <h2 className="text-2xl font-bold text-[#1a1c35] mb-4">
            Frequently Asked <span className="text-[#3b49e6]">Questions</span>
          </h2>
          <p className="text-sm text-gray-500">
            Everything you need to know about our services and delivery.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={cn(
                  "rounded-2xl border transition-all duration-200",
                  isOpen 
                    ? "border-blue-200 bg-white shadow-md shadow-blue-500/5" 
                    : "border-gray-100 bg-white"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className={cn(
                    "text-[15px] font-bold transition-colors",
                    isOpen ? "text-[#3b49e6]" : "text-[#1a1c35]"
                  )}>
                    {item.question}
                  </span>
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center border transition-all",
                    isOpen ? "bg-[#3b49e6] border-[#3b49e6] text-white rotate-180" : "bg-gray-50 border-gray-100 text-gray-400"
                  )}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5">
                    <div className="pt-4 border-t border-gray-50 text-[14px] leading-relaxed text-gray-600">
                      {item.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-6 rounded-3xl bg-[#1a1c35] text-white text-center">
          <h4 className="text-lg font-bold mb-2">Still have questions?</h4>
          <p className="text-xs text-white/70 mb-5">We are here to help you scaling your business.</p>
          <a 
            href="/quote#process-steps" 
            className="inline-block px-8 py-3.5 rounded-xl bg-[#3b49e6] text-white font-bold text-sm shadow-lg shadow-blue-500/20"
          >
            Get Instant Quote
          </a>

        </div>
      </div>
    </section>
  );
};

export default IPhoneFaqSection;
