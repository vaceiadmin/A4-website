"use client";

import React from "react";
import { motion } from "framer-motion";
import { Circle, Clock, MapPin, Briefcase } from "lucide-react";

interface LiveRequest {
  id: string | number;
  company: string;
  location: string;
  service: string;
  deadline?: string;
  type?: string;
}

interface WLLiveRequestsProps {
  sectionTitle: string;
  /** Intro copy below the title (supports \\n\\n paragraphs with whitespace-pre-line) */
  intro?: string;
  badgeLabel?: string;
  updatedLabel?: string;
  footerNote?: string;
  requests: LiveRequest[];
}

const WLLiveRequests: React.FC<WLLiveRequestsProps> = ({
  sectionTitle,
  intro = "Real-time engagement opportunities currently available on the VACEI network.",
  badgeLabel = "Live Feed",
  updatedLabel = "Updated 2 minutes ago",
  footerNote = "Join the platform to access full details and submit proposals.",
  requests,
}) => {
  return (
    <section className="py-24 bg-[#FAFBFF] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none -z-10 bg-[url('/assets/images/grid-pattern.png')] bg-repeat" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-600 text-[10px] font-black tracking-widest uppercase border border-red-500/20">
                <Circle className="w-2 h-2 fill-current animate-pulse" />
                {badgeLabel}
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-text-dark tracking-tight leading-tight">
                {sectionTitle}
              </h2>
              <p className="text-xl text-gray/70 font-medium whitespace-pre-line leading-relaxed">
                {intro}
              </p>
            </motion.div>
          </div>
          
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="text-sm font-bold text-primary-blue bg-primary-blue/5 px-6 py-3 rounded-2xl border border-primary-blue/10"
          >
            {updatedLabel}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="group relative bg-white rounded-3xl p-7 flex flex-col justify-between border border-gray-200 shadow-[0_15px_40px_-12px_rgba(0,0,0,0.08)] hover:!bg-primary-blue hover:shadow-[0_25px_50px_-12px_rgba(59,73,230,0.25)] hover:border-primary-blue/30 transition-all duration-500 min-h-[220px] overflow-hidden"
            >
              {/* Subtle top gradient line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary-blue/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:via-white/50 transition-all duration-500" />
              
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-primary-blue font-bold text-sm border border-gray-100 group-hover:!bg-white/20 group-hover:!text-white group-hover:!border-white/30 transition-all duration-500 shrink-0">
                      {request.company.charAt(0)}
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-lg font-black text-text-dark tracking-tight group-hover:!text-white transition-colors line-clamp-1">
                        {request.company}
                      </h3>
                      <div className="flex items-center gap-1.5 text-gray/50 font-medium text-[13px] group-hover:!text-white/80 transition-colors">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{request.location}</span>
                      </div>
                    </div>
                  </div>
                  {request.deadline && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 text-[11px] font-black tracking-widest uppercase border border-amber-500/20 group-hover:!bg-white/20 group-hover:!text-white group-hover:!border-white/30 transition-colors shrink-0">
                      <Clock className="w-3 h-3" />
                      {request.deadline}
                    </div>
                  )}
                </div>
                
                <div className="mt-5 pl-[52px]">
                  <div className="text-[10px] font-black text-primary-blue/60 uppercase tracking-widest mb-1 group-hover:!text-white/50 transition-colors">
                    Service Required
                  </div>
                  <div className="text-xl font-bold text-text-dark group-hover:!text-white transition-colors flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary-blue group-hover:!text-white transition-colors" />
                    {request.service}
                  </div>
                </div>
              </div>
              
              {request.type && (
                <div className="mt-6 pt-4 border-t border-gray-100 group-hover:!border-white/20 text-[13px] font-medium text-gray/60 group-hover:!text-white/80 flex items-center gap-2 transition-colors">
                  <Circle className="w-1.5 h-1.5 fill-current text-primary-blue group-hover:!text-white" />
                  {request.type}
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray/50 text-sm font-medium whitespace-pre-line">
            {footerNote}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WLLiveRequests;
