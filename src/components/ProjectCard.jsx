'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

export default function ProjectCard({ project, onSeeMore, index }) {
  const isEven = index % 2 === 0;
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className={`group relative flex flex-col items-center gap-12 md:gap-24 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      } mb-40 md:mb-60 last:mb-0`}
    >
      {/* Cinematic Image Container - High Asymmetry */}
      <div className={`relative w-full md:w-[60%] aspect-[16/10] sm:aspect-[4/3] md:aspect-[16/10] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.2)] bg-slate-200 dark:bg-slate-800 transition-[transform,box-shadow] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-[0_60px_120px_rgba(0,0,0,0.3)] ${
        isEven ? 'rotate-[-2deg] group-hover:rotate-0' : 'rotate-[2deg] group-hover:rotate-0'
      }`} style={{ position: 'relative', zIndex: 0, transform: 'translateZ(0)' }}>
        <Image
          src={project.image}
          alt={project.name}
          fill
          onLoad={() => setImgLoaded(true)}
          className={`object-cover transition-[transform,opacity] duration-[1500ms] ease-out group-hover:scale-105 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
        />
        <div className="absolute inset-0 bg-slate-400/10 group-hover:bg-slate-900/0 transition-colors duration-700" />
        
        {/* Floating Accent Element */}
        {/* <div className={`absolute top-10 ${isEven ? 'left-10' : 'right-10'} w-24 h-24 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hidden md:block transition-all duration-700 group-hover:translate-y-[-10px] group-hover:rotate-12 flex items-center justify-center text-white/50 text-[1.4rem] font-black`}>
          {String(index + 1).padStart(2, '0')}
        </div> */}
      </div>

      {/* High-Concept Content Panel - Deep Overlap */}
      <div
        className={`w-[92%] md:w-3/5 p-10 md:p-20 backdrop-blur-3xl bg-white dark:bg-slate-900 border border-white/50 dark:border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.12)] rounded-[3rem] -mt-24 md:mt-0 relative transition-[box-shadow] duration-700 hover:shadow-[0_40px_100px_rgba(0,0,0,0.18)] ${
          isEven ? 'md:-ml-32 lg:-ml-48' : 'md:-mr-32 lg:-mr-48'
        }`}
        style={{ position: 'relative', zIndex: 20, willChange: 'transform' }}
      >
        <div className="flex flex-col gap-6 mb-10">
          <div className="flex items-center gap-4">
            <span className="text-[1.1rem] font-black text-[#DC143C] uppercase tracking-[0.1em]">
              {project.tagline}
            </span>
            <div className="h-[2px] w-12 bg-[#DC143C]/20" />
          </div>
          <h3 className="text-[4rem] md:text-[6rem] font-[900] text-slate-900 dark:text-slate-100 leading-[0.9] tracking-tightest group-hover:text-black dark:group-hover:text-white transition-colors">
            {project.name}
          </h3>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          {project.techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-5 py-2 text-[1.2rem] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-300 rounded-xl font-bold transition-all duration-300 hover:border-[#DC143C]/30 hover:text-[#DC143C]"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="px-3 py-2 text-[1.2rem] text-slate-300 dark:text-slate-600 font-black">
              +
            </span>
          )}
        </div>

        <p className="text-[1.9rem] text-slate-600 dark:text-slate-400 leading-[1.6] font-light mb-14 line-clamp-2 md:line-clamp-none">
          {project.description}
        </p>

        <div className="flex flex-wrap items-center gap-8">
          <button
            onClick={() => onSeeMore(project)}
            className="px-10 py-5 bg-slate-900 text-white text-[1.5rem] font-[900] rounded-2xl hover:bg-[#DC143C] transition-all duration-500 shadow-2xl active:scale-95 flex items-center gap-4 group/btn"
          >
            Explore Depth
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="transition-transform duration-500 group-hover/btn:translate-x-2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="flex items-center gap-5">
            {project.githubLink && (
              <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-[1.2rem] transition-all duration-300 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:rotate-6 active:scale-90 shadow-sm"
                title="GitHub"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
            {project.liveLink && (
              <a 
                href={project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-[1.2rem] transition-all duration-300 text-[#DC143C] hover:rotate-[-6deg] active:scale-90 shadow-sm"
                title="Live Site"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
