"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FileText,
  Upload,
  Brain,
  Building2,
  AlertCircle,
  CheckCircle2,
  Zap,
  Clock,
} from "lucide-react";

const TechnologyServices = () => {
  const services = [
    "Bookkeeping and transaction posting",
    "Reconciliations and internal checks",
    "VAT and payroll preparation",
    "Review and finalisation",
  ];

  const processSteps = [
    "Uploading financial statement",
    "Extracting engagement data from portal",
    "Extracting financial statement data from pdf",
    "Validating the fields",
    "Preparing payload AI prompt",
    "Generating AI report on financial statements",
  ];

  const criticalErrors = [
    { code: "BS32", text: "Balance sheet does", tag: "BALANCE SHEET" },
    { code: "BS14", text: "Missing balance sheet", tag: "BALANCE SHEET" },
    { code: "BS19", text: "Total current assets", tag: "BALANCE SHEET" },
    { code: "BI02", text: "Inventory valuation", tag: "BALANCE SHEET" },
  ];

  const confirmedItems = [
    { code: "GI01", text: "ENTITY_LEGAL_NAME -", tag: "GENERAL" },
    { code: "GI05", text: "REGISTERD_OFFICE", tag: "GENERAL" },
    { code: "BI02", text: "CONTACT_PERSON", tag: "GENERAL" },
    { code: "BI06", text: "PRIMARY_BUSINESS_", tag: "GENERAL" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-section-light">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Main Grid: Left and Right Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 lg:mb-16">
          {/* Left Section */}
          <div className="space-y-6 lg:space-y-8">
            {/* Top Section: How our technology supports delivery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm"
            >
              {/* OUR SERVICES Tag */}
              <div className="text-center mb-6">
                <span className="inline-block bg-white text-gray-600 text-xs font-medium uppercase tracking-wider px-4 py-2 rounded border border-dashed border-gray-400">
                  OUR SERVICES
                </span>
              </div>

              {/* Main Title */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-heading mb-4">
                How our technology supports delivery
              </h2>

              {/* Introductory Text */}
              <p className="text-sm md:text-base text-gray mb-6 leading-relaxed">
                Each client is managed through a defined monthly accounting
                cycle.
              </p>

              {/* Bulleted List */}
              <ul className="space-y-3 mb-6">
                {services.map((service, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3 text-sm md:text-base text-gray"
                  >
                    <div className="mt-1 flex-shrink-0">
                      <Image
                        src="/assets/images/bullet.png"
                        alt="Bullet point"
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </div>
                    <span>{service}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Concluding Paragraph */}
              <p className="text-sm md:text-base text-gray leading-relaxed">
                Workflows are structured so tasks are completed in the correct
                sequence, responsibilities are clear, and progress is visible at
                every stage.
              </p>
            </motion.div>

            {/* Bottom Section: Two Cards */}
            <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4 lg:gap-6">
              {/* Our Technology Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm flex flex-col justify-center"
              >
                <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-heading mb-3">
                  Our Technology
                </h3>
                <p className="text-sm md:text-base text-gray leading-relaxed">
                  Documents, tasks, deadlines and communication in one place.
                </p>
              </motion.div>

              {/* Quote Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-primary-blue rounded-2xl p-6 lg:p-8 shadow-sm flex flex-col justify-center relative overflow-hidden"
              >
                {/* Quote Icon Top Left */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 0.3, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute top-4 left-4"
                >
                  <Image
                    src="/assets/images/Vector (3).png"
                    alt="Quote icon"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </motion.div>

                <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed text-center relative z-10 pt-2 pb-2">
                  Good firms rely on experience. Great firms rely on structure.
                  VACEI exists to make that structure visible, auditable, and
                  scalable
                </p>

                {/* Quote Icon Bottom Right */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 0.3, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="absolute bottom-4 right-4 rotate-180"
                >
                  <Image
                    src="/assets/images/Vector (3).png"
                    alt="Quote icon"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Right Section: White Container with 4 Cards */}
          <div className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-100 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {/* Top-Left Card: Analyzing Financial Statement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-4 lg:p-6"
              >
                {/* Header with Icon */}
                <div className="flex flex-col items-center mb-4">
                  <div className="relative mb-3">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">+</span>
                    </div>
                  </div>
                  <h3 className="text-base lg:text-lg font-semibold text-heading text-center">
                    Analyzing Financial Statement
                  </h3>
                </div>

                {/* Subtitle */}
                <p className="text-xs lg:text-sm text-gray mb-3 text-center">
                  Generate AI report on financial statements.
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs lg:text-sm text-gray">
                      Setup 100% complete
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>

                {/* Process Steps */}
                <ul className="space-y-2">
                  {processSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span
                        className={`text-xs lg:text-sm ${index === processSteps.length - 1 ? "text-heading font-medium" : "text-gray-400"}`}
                      >
                        • {step}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Top-Right Card: Analyze your Finance Document */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl p-4 lg:p-6"
              >
                {/* Title */}
                <h3 className="text-base lg:text-lg font-semibold text-heading mb-4">
                  Analyze your Finance Document
                </h3>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 lg:p-6 mb-4 text-center bg-gray-50">
                  <Upload className="mx-auto mb-2 w-10 h-10 text-gray-400" />
                  <p className="text-sm font-medium text-heading mb-1">
                    Drop your Document
                  </p>
                  <p className="text-xs text-gray">
                    Support PDF files up to 10MB
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mb-4">
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-heading text-xs lg:text-sm font-medium py-2 px-3 rounded-lg transition-colors">
                    Choose File
                  </button>
                  <button className="flex-1 bg-primary hover:bg-dark-hover text-white text-xs lg:text-sm font-medium py-2 px-3 rounded-lg transition-colors">
                    Analyze Document
                  </button>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-1">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs lg:text-sm font-semibold text-heading">
                      99%
                    </p>
                    <p className="text-xs text-gray">Success</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-1">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs lg:text-sm font-semibold text-heading">
                      &lt;2s
                    </p>
                    <p className="text-xs text-gray">Time</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-slate-500 rounded-full flex items-center justify-center mb-1">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs lg:text-sm font-semibold text-heading">
                      150+
                    </p>
                    <p className="text-xs text-gray">Document</p>
                  </div>
                </div>

                {/* Processing Diagram with VectorC.png */}
                <div className="relative py-4">
                  <div className="flex items-start justify-center gap-6 relative">
                    {/* Left: Advance text recognition */}
                    <div className="flex flex-col items-center z-10">
                      <div className="bg-gray-100 rounded-lg p-2 mb-1 flex items-center justify-center">
                        <Brain className="w-5 h-5 text-blue-600" />
                      </div>
                      <p className="text-xs text-gray leading-tight text-center max-w-[100px]">
                        Advance text recognition
                      </p>
                    </div>

                    {/* VectorC.png connecting lines - positioned between all elements */}
                    <div className="absolute top-6 left-[20%] right-[20%] h-2 z-0 pointer-events-none">
                      <Image
                        src="/assets/images/VectorC.png"
                        alt="Processing flow"
                        width={400}
                        height={8}
                        className="object-contain w-full h-full"
                      />
                    </div>

                    {/* Center: Super fast Processing */}
                    <div className="flex flex-col items-center z-10">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-1">
                        <Zap className="w-5 h-5 text-blue-600" />
                      </div>
                      <p className="text-xs text-gray text-center leading-tight">
                        Super fast
                      </p>
                      <p className="text-xs text-gray text-center leading-tight">
                        Processing
                      </p>
                    </div>

                    {/* Right: Structure preservation */}
                    <div className="flex flex-col items-center z-10">
                      <div className="bg-gray-100 rounded-lg p-2 mb-1 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <p className="text-xs text-gray leading-tight text-center max-w-[100px]">
                        Structure preservation
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom-Left Card: Critical Errors */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-4 lg:p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-base lg:text-lg font-semibold text-red-600">
                    Critical Errors
                  </h3>
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold text-sm">33</span>
                  </div>
                </div>
                <ul className="space-y-3">
                  {criticalErrors.map((error, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                          <AlertCircle className="w-3 h-3 text-red-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs lg:text-sm font-medium text-heading">
                            {error.code} - {error.text}
                          </span>
                        </div>
                        <span className="text-xs text-gray bg-gray-100 px-2 py-0.5 rounded">
                          {error.tag}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Bottom-Right Card: Confirmed Correct Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl p-4 lg:p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-base lg:text-lg font-semibold text-green-600">
                    Confirmed Correct Items
                  </h3>
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">33</span>
                  </div>
                </div>
                <ul className="space-y-3">
                  {confirmedItems.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs lg:text-sm font-medium text-heading">
                            {item.code} - {item.text}
                          </span>
                        </div>
                        <span className="text-xs text-gray bg-gray-100 px-2 py-0.5 rounded">
                          {item.tag}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyServices;
