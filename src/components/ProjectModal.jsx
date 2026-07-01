'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

export default function ProjectModal({ project, isOpen, onClose }) {
  const [currentImage, setCurrentImage] = useState(0);
  const scrollContainerRef = useRef(null);
  const gallery = project?.gallery || [project?.image];

  // Reset scroll and state when opening
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentImage(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleScroll = (e) => {
    const container = e.target;
    const index = Math.round(container.scrollLeft / container.clientWidth);
    if (index !== currentImage) {
      setCurrentImage(index);
    }
  };

  const scrollToImage = (index) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollTo({
        left: index * container.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  if (!project) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-0 sm:p-6 md:p-12 perspective-2000 overflow-hidden">
          {/* Backdrop with extreme blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl transition-all duration-700"
          />

          {/* 3D Cube Container - Optimized for Performance */}
          <motion.div
            initial={{ rotateX: 95, y: 100, opacity: 0, scale: 0.9, z: -500 }}
            animate={{ rotateX: 0, y: 0, opacity: 1, scale: 1, z: 0 }}
            exit={{ rotateX: -95, y: -100, opacity: 0, scale: 0.9, z: -500 }}
            transition={{ 
              type: "spring",
              damping: 30,
              stiffness: 100,
              mass: 1.2,
              duration: 0.8
            }}
            style={{ 
              transformStyle: 'preserve-3d', 
              transformOrigin: 'center center',
              willChange: 'transform, opacity'
            }}
            className="relative w-full max-w-[1200px] h-full sm:h-auto sm:max-h-[95vh] bg-white sm:rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex flex-col gb-popup-cube"
          >
            {/* Close Button - Premium Glassmorphic */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-[60] p-4 bg-black/30 hover:bg-[#DC143C] backdrop-blur-2xl rounded-full text-white transition-all duration-500 hover:rotate-90 group active:scale-95 shadow-2xl"
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="overflow-y-auto custom-scrollbar h-full scroll-smooth bg-white">
              {/* Cinematic Image Gallery */}
              <div className="relative h-[40vh] sm:h-[500px] md:h-[650px] w-full bg-slate-100 group/gallery overflow-hidden">
                <div 
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  className="flex overflow-x-auto snap-x snap-mandatory h-full no-scrollbar hide-scrollbar scroll-smooth"
                >
                  {gallery.map((img, idx) => (
                    <div key={idx} className="min-w-full h-full relative snap-start">
                      <Image
                        src={img}
                        alt={`${project.name} preview ${idx + 1}`}
                        fill
                        className="object-cover"
                        priority={idx === 0}
                        sizes="(max-width: 1200px) 100vw, 1200px"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Visual Navigation Overlay */}
                <div className="absolute inset-0 flex items-center justify-between px-8 opacity-0 group-hover/gallery:opacity-100 transition-all duration-500 pointer-events-none sm:flex">
                  <button 
                    onClick={() => scrollToImage(currentImage - 1)}
                    disabled={currentImage === 0}
                    className={`p-5 bg-black/20 hover:bg-black/40 backdrop-blur-2xl rounded-full text-white pointer-events-auto transition-all transform active:scale-90 ${currentImage === 0 ? 'opacity-0 scale-50' : 'hover:scale-110 shadow-2xl'}`}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button 
                    onClick={() => scrollToImage(currentImage + 1)}
                    disabled={currentImage === gallery.length - 1}
                    className={`p-5 bg-black/20 hover:bg-black/40 backdrop-blur-2xl rounded-full text-white pointer-events-auto transition-all transform active:scale-90 ${currentImage === gallery.length - 1 ? 'opacity-0 scale-50' : 'hover:scale-110 shadow-2xl'}`}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>

                {/* Micro-Interaction Dots */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20 bg-black/20 backdrop-blur-2xl px-6 py-3 rounded-full border border-white/10">
                  {gallery.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToImage(idx)}
                      className={`h-2.5 rounded-full transition-all duration-500 ease-out ${currentImage === idx ? 'w-10 bg-[#DC143C]' : 'w-2.5 bg-white/40 hover:bg-white/70'}`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Elegant Bottom Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              </div>

              {/* High-Fidelity Content Section */}
              <div className="px-8 md:px-24 pb-32 relative z-10 -mt-12">
                <header className="mb-24">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap items-center gap-6 mb-10"
                  >
                    <span className="px-5 py-2 bg-[#DC143C]/10 text-[#DC143C] text-[1.2rem] font-black uppercase tracking-[0.4em] rounded-lg">
                      Engineering Case Study
                    </span>
                    <div className="h-[2px] w-16 bg-slate-200" />
                  </motion.div>
                  
                  <motion.h3 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-[6rem] md:text-[9rem] font-[900] text-slate-900 leading-[0.9] mb-16 tracking-tightest"
                  >
                    {project.name}
                  </motion.h3>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-4"
                  >
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-6 py-2.5 bg-slate-100 border border-slate-200 rounded-2xl text-[1.3rem] font-bold text-slate-600 hover:border-[#DC143C] hover:text-[#DC143C] transition-all duration-300 cursor-default">
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                </header>

                <div className="grid lg:grid-cols-[1fr_1.8fr] gap-24 items-start">
                  {/* Executive Summary Sidebar */}
                  <motion.aside 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-12 lg:sticky lg:top-12"
                  >
                    <div className="p-12 bg-slate-50 rounded-[3rem] border border-slate-100 relative overflow-hidden group shadow-sm">
                      <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#DC143C]/5 rounded-full blur-[80px] group-hover:bg-[#DC143C]/10 transition-all duration-700" />
                      <h4 className="text-[2rem] font-black text-slate-900 mb-8 flex items-center gap-5">
                        <span className="w-2 h-8 bg-[#DC143C] rounded-full" />
                        Strategic Summary
                      </h4>
                      <p className="text-[2.2rem] text-slate-700 leading-[1.6] font-light italic">
                        "{project.description}"
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                      {project.githubLink && (
                        <a 
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex items-center justify-center gap-4 py-6 bg-slate-900 text-white text-[1.6rem] font-black rounded-3xl overflow-hidden shadow-2xl transition-all hover:bg-black active:scale-[0.98]"
                        >
                          <span className="relative z-10">Access Source Code</span>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="relative z-10">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      )}
                      {project.liveLink && (
                        <a 
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex items-center justify-center gap-4 py-6 bg-[#DC143C] text-white text-[1.6rem] font-black rounded-3xl overflow-hidden shadow-2xl transition-all hover:bg-[#b71c1c] active:scale-[0.98]"
                        >
                          <span className="relative z-10">Launch Live Site</span>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="relative z-10 transition-transform group-hover:rotate-45">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </motion.aside>

                  {/* Impact & Detailed Engineering Analysis */}
                  <div className="space-y-20">
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex items-center gap-8"
                    >
                      <h4 className="text-[3rem] font-[900] text-slate-900 tracking-tightest">
                        Engineering Impact
                      </h4>
                      <div className="h-[1px] flex-1 bg-slate-100" />
                    </motion.div>
                    
                    <div className="space-y-12">
                      {project.fullDescription.map((point, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + (i * 0.1) }}
                          className="flex gap-10 group/item p-10 bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-100 rounded-[2.5rem] transition-all duration-500 hover:shadow-xl"
                        >
                          <span className="shrink-0 text-[4rem] font-black text-slate-200 group-hover/item:text-[#DC143C]/20 transition-all duration-500 tabular-nums leading-none">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <p className="text-[2rem] text-slate-600 leading-[1.7] font-light pt-2">
                            {point}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
