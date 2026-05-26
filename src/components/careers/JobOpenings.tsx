"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeInUp } from "../common/Animations";

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  link: string;
}

interface JobOpeningsProps {
  title?: string;
  subtitle?: string;
  applyNowText?: string;
  jobs?: Job[];
}

const JobOpenings = ({ 
  title, 
  subtitle,
  applyNowText,
  jobs = []
}: JobOpeningsProps) => {
  return (
    <section className="w-full py-20 bg-background relative overflow-hidden">
      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <FadeInUp>
            <h2 className="text-3xl md:text-5xl font-bold text-text-heading mb-4">
              {title}
            </h2>
            <p className="text-lg text-text-gray max-w-2xl mx-auto">
              {subtitle}
            </p>
          </FadeInUp>
        </div>

        <div className="grid gap-6">
          {jobs.map((job, index) => (
            <FadeInUp key={job.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
                className="group relative bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between transition-all duration-300 hover:border-primary-blue/30"
              >
                <div className="flex-1 mb-4 md:mb-0 text-center md:text-left">
                  <h3 className="text-xl font-bold text-text-heading group-hover:text-primary-blue transition-colors mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4 text-sm text-text-gray">
                    <span className="flex items-center gap-1">
                       <svg className="w-4 h-4 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                       {job.department}
                    </span>
                    <span className="hidden md:inline w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {job.location}
                    </span>
                    <span className="hidden md:inline w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="px-3 py-1 rounded-full bg-primary-blue/5 text-primary-blue text-xs font-semibold">
                      {job.type}
                    </span>
                  </div>
                </div>

                <div>
                  <Link
                    href={job.link}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary-blue transition-colors shadow-md hover:shadow-primary-blue/30 w-full md:w-auto"
                  >
                    {applyNowText}
                    <svg className="ml-2 -mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </Link>
                </div>
              </motion.div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobOpenings;
