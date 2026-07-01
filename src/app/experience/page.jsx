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
      <main className="min-h-screen bg-[#080A14] pt-40 pb-32 relative overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(220,20,60,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />

        <div className="max-w-[1100px] mx-auto px-6">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-28"
          >
            <p className="text-[1.2rem] font-bold text-[#DC143C] uppercase tracking-[0.4em] mb-4">
              My Journey
            </p>
            <h1 className="text-[5rem] md:text-[7rem] font-bold text-white leading-none tracking-tighter mb-6">
              All <span className="text-[#DC143C]">Experience</span>
            </h1>
            <p className="text-[1.6rem] text-slate-400 font-light max-w-[520px] mx-auto leading-relaxed">
              From industry internships to academic clubs — building, learning, and leading at every front.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Desktop centre spine */}
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#DC143C]/30 to-transparent hidden md:block" />
            {/* Mobile left spine */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#DC143C]/30 to-transparent md:hidden" />

            <div className="flex flex-col">
              {experiences.map((exp, index) => (
                <TimelineEntry key={exp.id} exp={exp} index={index} onOpen={setSelectedExp} />
              ))}
            </div>
          </div>

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center mt-24"
          >
            <Link
              href="/#experience"
              className="inline-flex items-center gap-3 px-10 py-4 border border-white/15 text-white text-[1.4rem] font-medium rounded-xl hover:bg-white/5 hover:border-white/30 transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Home
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
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ y: 80, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 28, stiffness: 200 }}
              className="relative w-full max-w-[860px] max-h-[90vh] bg-[#0F1220] border border-white/10 rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden"
            >
              <div className="overflow-y-auto custom-scrollbar max-h-[90vh]">
                {/* Hero image */}
                <div className="relative h-[240px] w-full">
                  <Image src={selectedExp.image} alt={selectedExp.company} fill className="object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1220] via-[#0F1220]/40 to-transparent" />
                  <button
                    onClick={() => setSelectedExp(null)}
                    className="absolute top-5 right-5 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300 hover:rotate-90"
                    aria-label="Close"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="px-8 md:px-16 pb-16 -mt-16 relative z-10">
                  {/* Title */}
                  <span className={`inline-block text-[1rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 ${
                    selectedExp.type === 'industry'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}>
                    {selectedExp.type}
                  </span>
                  <h2 className="text-[3.4rem] font-bold text-white leading-tight mb-3 tracking-tight">
                    {selectedExp.role}
                  </h2>
                  <div className="flex flex-wrap items-center gap-5 mb-10">
                    <span className="text-[2rem] font-medium text-[#DC143C]">{selectedExp.company}</span>
                    <span className="text-[1.4rem] text-slate-500 italic">{selectedExp.duration}</span>
                  </div>

                  <p className="text-[1.6rem] text-slate-300 leading-[1.9] font-light mb-12">
                    {selectedExp.summary}
                  </p>

                  {/* Contributions */}
                  <h4 className="text-[1.2rem] font-bold uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-[2px] bg-[#DC143C]" />
                    Key Contributions
                  </h4>
                  <ul className="space-y-5 mb-10">
                    {selectedExp.detailed.map((point, i) => (
                      <li key={i} className="flex gap-4 items-start group">
                        <span className="shrink-0 mt-[6px] w-5 h-5 rounded-full border border-[#DC143C]/40 flex items-center justify-center group-hover:bg-[#DC143C]/10 transition-colors">
                          <svg width="8" height="7" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="#DC143C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <p className="text-[1.5rem] text-slate-400 leading-relaxed">{point}</p>
                      </li>
                    ))}
                  </ul>

                  {/* Tech */}
                  <h4 className="text-[1.2rem] font-bold uppercase tracking-[0.2em] text-white mb-5 flex items-center gap-3">
                    <span className="w-8 h-[2px] bg-[#DC143C]" />
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-3 mb-10">
                    {selectedExp.tech.map((t) => (
                      <span key={t} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[1.3rem] text-slate-300 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>

                  {selectedExp.url && (
                    <a
                      href={selectedExp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-[#DC143C] text-white text-[1.4rem] font-bold rounded-xl hover:bg-[#b01030] transition-all duration-300"
                    >
                      Visit Website
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </a>
                  )}
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
  { hidden: { opacity: 0, x: -60, filter: 'blur(4px)' }, visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } },
  { hidden: { opacity: 0, x: 60, filter: 'blur(4px)' }, visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } },
  { hidden: { opacity: 0, y: 40, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } },
  { hidden: { opacity: 0, x: -60, rotateY: -8 }, visible: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } },
  { hidden: { opacity: 0, x: 60, rotateY: 8 }, visible: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } },
  { hidden: { opacity: 0, y: 50, filter: 'blur(6px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } },
]

function TimelineEntry({ exp, index, onOpen }) {
  const isLeft = index % 2 === 0
  const cardVariant = cardAnimations[index % cardAnimations.length]
  const dateVariant = {
    hidden: { opacity: 0, x: isLeft ? 30 : -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.15 } },
  }

  return (
    <div className="relative mb-16 md:mb-20">
      {/* Desktop layout: date one side, card the other */}
      <div className={`hidden md:flex items-center gap-0 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Date side */}
        <motion.div
          variants={dateVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className={`w-[calc(50%-32px)] flex ${isLeft ? 'justify-end pr-10' : 'justify-start pl-10'}`}
        >
          <div className={`${isLeft ? 'text-right' : 'text-left'}`}>
            <span className="text-[1.4rem] font-bold text-[#DC143C] block mb-2">{exp.duration}</span>
            <span className={`text-[1rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
              exp.type === 'industry'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
            }`}>
              {exp.type}
            </span>
          </div>
        </motion.div>

        {/* Timeline dot */}
        <div className="relative z-10 flex-shrink-0">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="w-[18px] h-[18px] rounded-full bg-[#DC143C] border-2 border-[#080A14] shadow-[0_0_16px_rgba(220,20,60,0.6)] relative"
          >
            <span className="absolute inset-0 rounded-full bg-[#DC143C] animate-ping opacity-30" />
          </motion.div>
        </div>

        {/* Card side */}
        <motion.div
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className={`w-[calc(50%-32px)] ${isLeft ? 'pl-10' : 'pr-10'}`}
        >
          <ExpCard exp={exp} onOpen={onOpen} />
        </motion.div>
      </div>

      {/* Mobile layout: line on left, card on right */}
      <div className="flex md:hidden gap-0 pl-12">
        {/* Mobile dot */}
        <div className="absolute left-5 top-6 -translate-x-1/2 z-10">
          <div className="w-[12px] h-[12px] rounded-full bg-[#DC143C] border-2 border-[#080A14] shadow-[0_0_10px_rgba(220,20,60,0.5)]" />
        </div>

        <motion.div
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="w-full"
        >
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="text-[1.2rem] font-bold text-[#DC143C]">{exp.duration}</span>
            <span className={`text-[0.9rem] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
              exp.type === 'industry'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
            }`}>
              {exp.type}
            </span>
          </div>
          <ExpCard exp={exp} onOpen={onOpen} />
        </motion.div>
      </div>
    </div>
  )
}

function ExpCard({ exp, onOpen }) {
  return (
    <div
      className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-7 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_40px_rgba(220,20,60,0.08)] cursor-pointer group"
      onClick={() => onOpen(exp)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(exp)}
    >
      <h3 className="text-[1.2rem] font-bold text-[#DC143C] uppercase tracking-[0.15em] mb-2">
        {exp.role}
      </h3>
      <h2 className="text-[2.2rem] font-light text-white mb-4 leading-tight">{exp.company}</h2>

      <p className="text-[1.4rem] text-slate-400 leading-relaxed mb-5 font-light line-clamp-3">
        {exp.summary}
      </p>

      <div className="flex flex-wrap gap-2 mb-5">
        {exp.tech.slice(0, 4).map((t) => (
          <span key={t} className="px-3 py-1 text-[1rem] border border-white/10 text-slate-400 rounded-full font-medium hover:border-[#DC143C]/40 hover:text-slate-200 transition-colors cursor-default">
            {t}
          </span>
        ))}
        {exp.tech.length > 4 && (
          <span className="px-3 py-1 text-[1rem] text-slate-600">+{exp.tech.length - 4}</span>
        )}
      </div>

      <span className="inline-flex items-center gap-2 text-[1.2rem] font-bold text-white/50 group-hover:text-[#DC143C] transition-colors duration-300">
        View Details
        <svg width="14" height="14" viewBox="0 0 18 14" fill="none">
          <path d="M1 7H17M17 7L11 1M17 7L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  )
}
