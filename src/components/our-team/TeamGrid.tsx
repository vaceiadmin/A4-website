"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeInUp } from "../common/Animations";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

interface TeamGridProps {
  title?: string;
  subtitle?: string;
  members?: TeamMember[];
}

const TeamGrid = ({ 
  title, 
  subtitle,
  members = []
}: TeamGridProps) => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <FadeInUp key={member.id || index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -10 }}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20"
              >
                {/* Image Container */}
                <div className="relative h-80 w-full overflow-hidden bg-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end justify-center pb-6">
                      {/* Social Icons Placeholder */}
                       <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {/* Example Icon */}
                           <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-primary-blue hover:text-white transition-colors">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                           </div>
                       </div>
                  </div>
                  <Image
                    src={member.image || "/assets/images/placeholder.png"}
                    alt={member.name}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-text-heading group-hover:text-primary-blue transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-primary-blue mb-3">
                    {member.role}
                  </p>
                  <p className="text-text-gray text-sm leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </div>
                
                 {/* Decorative Accent */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-blue to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;
