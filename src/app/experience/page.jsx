'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { experiences } from '@/data/experiences'
import Image from 'next/image'

export default function ExperiencePage() {
  const [selectedExp, setSelectedExp] = useState(null)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F9F9F9] pt-40 pb-32 relative overflow-hidden selection:bg-[#DC143C]/10">
        {/* Soft atmospheric accents */}
        <div
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(220,20,60,0.1) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(41,50,60,0.05) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />

        <div className="max-w-[1100px] mx-auto px-6 relative z-1">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-32"
          >
            <p className="text-[1.2rem] font-bold text-[#DC143C] uppercase tracking-[0.5em] mb-6">
              Career Timeline
            </p>
            <h1 className="text-[5.5rem] md:text-[8rem] font-[900] text-[#29323C] leading-[0.85] tracking-tightest mb-8">
              All <span>Experience</span>
            </h1>
            <p className="text-[1.8rem] text-slate-500 font-light max-w-[550px] mx-auto leading-relaxed">
              A chronological journey through my professional growth, technical leadership, and community contributions.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Desktop centre spine */}
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-slate-200 to-transparent hidden md:block" />
            {/* Mobile left spine */}
            <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-slate-200 to-transparent md:hidden" />

            <div className="flex flex-col gap-12 md:gap-0">
              {experiences.map((exp, index) => (
                <TimelineEntry key={exp.id} exp={exp} index={index} onOpen={setSelectedExp} />
              ))}
            </div>
          </div>

          {/* Navigation link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-32"
          >
            <Link
              href="/#experience"
              className="inline-flex items-center gap-4 px-12 py-5 border border-slate-200 text-slate-900 text-[1.5rem] font-bold rounded-2xl hover:bg-white hover:border-[#DC143C]/40 hover:text-[#DC143C] transition-all duration-500 shadow-sm active:scale-95 group"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:-translate-x-1">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Return to Showcase
            </Link>
          </motion.div>
        </div>
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedExp && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExp(null)}
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="relative w-full max-w-[880px] max-h-[92vh] bg-white rounded-[2.5rem] shadow-[0_60px_120px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col"
            >
              <div className="overflow-y-auto custom-scrollbar flex-1">
                {/* Hero Header */}
                <div className="relative h-[280px] w-full">
                  <Image src={selectedExp.image} alt={selectedExp.company} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/5 to-transparent" />
                  <button
                    onClick={() => setSelectedExp(null)}
                    className="absolute top-6 right-6 p-3.5 bg-black/10 hover:bg-black/30 backdrop-blur-xl rounded-full text-white transition-all duration-500 hover:rotate-90"
                    aria-label="Close"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="px-8 md:px-20 pb-20 -mt-20 relative z-10">
                  <div className="mb-10">
                    <span className={`inline-block text-[1.1rem] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6 ${
                      selectedExp.type === 'industry'
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'bg-purple-50 text-purple-600 border border-purple-100'
                    }`}>
                      {selectedExp.type}
                    </span>
                    <h2 className="text-[4rem] font-[900] text-slate-900 leading-[1] mb-4 tracking-tightest">
                      {selectedExp.role}
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <span className="text-[2.2rem] font-bold text-[#DC143C]">{selectedExp.company}</span>
                      <div className="h-5 w-px bg-slate-200 hidden sm:block" />
                      <span className="text-[1.6rem] text-slate-400 italic font-light">{selectedExp.duration}</span>
                    </div>
                  </div>

                  <article className="space-y-16">
                    <p className="text-[2.2rem] text-slate-600 leading-[1.7] font-light first-letter:text-7xl first-letter:font-black first-letter:text-[#DC143C] first-letter:mr-4 first-letter:float-left first-letter:mt-2">
                      {selectedExp.summary}
                    </p>

                    <div className="grid md:grid-cols-2 gap-16">
                      <div>
                        <h4 className="text-[1.3rem] font-black uppercase tracking-[0.25em] text-slate-900 mb-8 flex items-center gap-4">
                          <span className="w-10 h-[3px] bg-[#DC143C]" />
                          Key Contributions
                        </h4>
                        <ul className="space-y-6">
                          {selectedExp.detailed.map((point, i) => (
                            <li key={i} className="flex gap-5 group items-start">
                              <span className="shrink-0 mt-[8px] w-6 h-6 rounded-full border border-[#DC143C]/20 flex items-center justify-center group-hover:bg-[#DC143C]/5 transition-colors">
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                  <path d="M1 4L3.5 6.5L9 1" stroke="#DC143C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                              <p className="text-[1.6rem] text-slate-500 leading-relaxed font-light">{point}</p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-12">
                        <div>
                          <h4 className="text-[1.3rem] font-black uppercase tracking-[0.25em] text-slate-900 mb-8 flex items-center gap-4">
                            <span className="w-10 h-[3px] bg-[#DC143C]" />
                            Tech Stack
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {selectedExp.tech.map((t) => (
                              <span key={t} className="px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[1.4rem] text-slate-600 font-bold hover:border-[#DC143C]/20 transition-colors">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {selectedExp.url && (
                          <div className="pt-10 border-t border-slate-100">
                            <a
                              href={selectedExp.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-4 px-10 py-5 bg-slate-900 text-white text-[1.5rem] font-black rounded-2xl hover:bg-[#DC143C] transition-all duration-500 shadow-xl shadow-slate-200 active:scale-95 group/link"
                            >
                              Visit Project Site
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="transition-transform group-hover/link:translate-x-1 group-hover/link:translate-y-[-1px]">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                              </svg>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  )
}

const cardAnimations = [
  { hidden: { opacity: 0, x: -50, filter: 'blur(10px)' }, visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } },
  { hidden: { opacity: 0, x: 50, filter: 'blur(10px)' }, visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } },
  { hidden: { opacity: 0, y: 50, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } },
  { hidden: { opacity: 0, rotateX: 20 }, visible: { opacity: 1, rotateX: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } },
]

function TimelineEntry({ exp, index, onOpen }) {
  const isLeft = index % 2 === 0
  const cardVariant = cardAnimations[index % cardAnimations.length]
  const dateVariant = {
    hidden: { opacity: 0, x: isLeft ? 20 : -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.1 } },
  }

  return (
    <div className="relative mb-20 md:mb-32">
      {/* Desktop layout */}
      <div className={`hidden md:flex items-center gap-0 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Date / Label Side */}
        <motion.div
          variants={dateVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className={`w-[calc(50%-40px)] flex ${isLeft ? 'justify-end pr-16' : 'justify-start pl-16'}`}
        >
          <div className={`${isLeft ? 'text-right' : 'text-left'}`}>
            <span className="text-[1.6rem] font-black text-[#DC143C] block mb-2 tracking-wide">{exp.duration}</span>
            <span className={`text-[1.1rem] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full ${
              exp.type === 'industry'
                ? 'bg-blue-50 text-blue-600 border border-blue-100'
                : 'bg-purple-50 text-purple-600 border border-purple-100'
            }`}>
              {exp.type}
            </span>
          </div>
        </motion.div>

        {/* Timeline Hub */}
        <div className="relative z-10 flex-shrink-0">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-[24px] h-[24px] rounded-full bg-white border-4 border-[#DC143C] shadow-[0_0_20px_rgba(220,20,60,0.2)] relative"
          >
            <span className="absolute inset-0 rounded-full bg-[#DC143C] animate-ping opacity-15" />
          </motion.div>
        </div>

        {/* Card Side */}
        <motion.div
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className={`w-[calc(50%-40px)] ${isLeft ? 'pl-16' : 'pr-16'}`}
        >
          <ExpCard exp={exp} onOpen={onOpen} isLeft={isLeft} />
        </motion.div>
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden gap-0 pl-16">
        {/* Mobile Hub */}
        <div className="absolute left-6 top-8 -translate-x-1/2 z-10">
          <div className="w-[16px] h-[16px] rounded-full bg-white border-[3px] border-[#DC143C] shadow-md" />
        </div>

        <motion.div
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="w-full"
        >
          <div className="mb-5 flex flex-wrap items-center gap-4">
            <span className="text-[1.4rem] font-black text-[#DC143C]">{exp.duration}</span>
            <span className={`text-[1rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
              exp.type === 'industry'
                ? 'bg-blue-50 text-blue-600 border border-blue-100'
                : 'bg-purple-50 text-purple-600 border border-purple-100'
            }`}>
              {exp.type}
            </span>
          </div>
          <ExpCard exp={exp} onOpen={onOpen} isLeft={true} />
        </motion.div>
      </div>
    </div>
  )
}

function ExpCard({ exp, onOpen, isLeft }) {
  return (
    <div
      className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 hover:border-[#DC143C]/30 transition-all duration-700 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] cursor-pointer group relative flex flex-col sm:flex-row gap-8"
      onClick={() => onOpen(exp)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(exp)}
    >
      {/* Photo on card – positioned strategically towards the timeline hub */}
      <div className={`shrink-0 w-28 h-28 rounded-2xl overflow-hidden border border-slate-100 shadow-sm order-first ${isLeft ? '' : 'sm:order-last'}`}>
        <Image src={exp.image} alt={exp.company} width={112} height={112} className="object-cover w-full h-full grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
      </div>

      <div className="flex-1">
        <h3 className="text-[1.2rem] font-black text-[#DC143C] uppercase tracking-[0.25em] mb-3">
          {exp.role}
        </h3>
        <h2 className="text-[2.6rem] font-[900] text-slate-900 mb-5 leading-[1.1] tracking-tight">{exp.company}</h2>

        <p className="text-[1.6rem] text-slate-500 leading-relaxed mb-8 font-light line-clamp-2 sm:line-clamp-3">
          {exp.summary}
        </p>

        <div className="flex flex-wrap gap-2.5 mb-8">
          {exp.tech.slice(0, 4).map((t) => (
            <span key={t} className="px-4 py-2 bg-slate-50 border border-slate-100 text-slate-400 rounded-xl font-bold text-[1.1rem] hover:border-[#DC143C]/20 hover:text-slate-600 transition-colors cursor-default">
              {t}
            </span>
          ))}
          {exp.tech.length > 4 && (
            <span className="px-3 py-2 text-[1.1rem] text-slate-300 font-black">+</span>
          )}
        </div>

        <span className="inline-flex items-center gap-3 text-[1.4rem] font-black text-slate-400 group-hover:text-[#DC143C] transition-all duration-500">
          Deep Dive
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" className="transition-transform group-hover:translate-x-1.5">
            <path d="M1 7H17M17 7L11 1M17 7L11 13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  )
}
