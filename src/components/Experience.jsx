'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { experiences } from '@/data/experiences'

const featuredExperiences = experiences.slice(0, 2)

function ExperienceImage({ srcDesktop, srcMobile, alt }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="w-full md:w-1/2 group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-slate-200 dark:bg-slate-800">
      <div className="block md:hidden">
        <Image
          src={srcMobile ?? srcDesktop}
          alt={alt}
          fill
          onLoad={() => setLoaded(true)}
          className={`object-cover scale-105 group-hover:scale-110 transition-[transform,opacity] duration-700 ease-out ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <div className="hidden md:block">
        <Image
          src={srcDesktop ?? srcMobile}
          alt={alt}
          fill
          onLoad={() => setLoaded(true)}
          className={`object-cover scale-105 group-hover:scale-110 transition-[transform,opacity] duration-700 ease-out ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors duration-500" />
    </div>
  )
}

export default function Experience() {
  const [selectedExp, setSelectedExp] = useState(null)

  useEffect(() => {
    if (selectedExp) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedExp])

  return (
    <section id="experience" className="py-32 bg-[#F9F9F9] dark:bg-[#0b0e14] selection:bg-crimson/10 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-24">
          <h1 className="section-title">Exp<span>e</span>rience</h1>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            className="h-[3px] bg-[#DC143C] mx-auto mt-4"
          />
        </div>

        <div className="flex flex-col gap-40">
          {featuredExperiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col items-center gap-0 md:gap-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Image Column */}
              <ExperienceImage
                srcDesktop={exp.imageDesktop ?? exp.imageMobile ?? exp.image}
                srcMobile={exp.imageMobile ?? exp.imageDesktop ?? exp.image}
                alt={exp.company}
              />

              {/* Content Column - Glassmorphic */}
              <div
                className={`w-[92%] md:w-3/5 p-8 md:p-14 backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80 border border-white/40 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl -mt-16 md:mt-0 relative z-10 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] ${
                  index % 2 === 0 ? 'md:-ml-24' : 'md:-mr-24'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-[1.2rem] font-bold text-[#DC143C] uppercase tracking-[0.2em] mb-2">
                      {exp.role}
                    </h2>
                    <h3 className="text-[2.8rem] font-light text-[#29323C] dark:text-slate-100 leading-tight">
                      {exp.company}
                    </h3>
                  </div>
                  <span className="text-[1.3rem] text-gray-400 dark:text-slate-400 font-medium tabular-nums shrink-0">
                    {exp.duration}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {exp.tech.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="px-4 py-1.5 text-[1.1rem] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-full font-medium hover:border-slate-800 dark:hover:border-slate-400 hover:text-slate-800 dark:hover:text-slate-100 transition-colors cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                  {exp.tech.length > 5 && (
                    <span className="px-3 py-1.5 text-[1.1rem] text-slate-400 dark:text-slate-500 font-medium">
                      +{exp.tech.length - 5}
                    </span>
                  )}
                </div>

                <p className="text-[1.7rem] text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-10">
                  {exp.summary}
                </p>

                <button
                  onClick={() => setSelectedExp(exp)}
                  className="inline-flex items-center gap-3 text-[1.4rem] font-bold text-[#29323C] dark:text-slate-100 hover:text-[#DC143C] transition-all duration-300 group"
                >
                  <span className="relative">
                    See Details
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#DC143C] transition-all duration-300 group-hover:w-full" />
                  </span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                      <path d="M1 7H17M17 7L11 1M17 7L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Experience Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-24 text-center"
        >
          <Link
            href="/experience"
            className="inline-flex items-center gap-4 px-12 py-5 bg-[#29323C] text-white text-[1.6rem] font-bold rounded-2xl hover:bg-[#DC143C] transition-all duration-300 shadow-xl shadow-slate-200 dark:shadow-black/30 group"
          >
            See More
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="transition-transform group-hover:translate-x-2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedExp && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExp(null)}
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-[900px] max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-[0_50px_100px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col"
            >
              <div className="overflow-y-auto custom-scrollbar">
                <div className="relative h-[300px] w-full">
                  <div className="block md:hidden">
                    <Image
                      src={selectedExp.imageMobile ?? selectedExp.imageDesktop ?? selectedExp.image}
                      alt={selectedExp.company}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="hidden md:block">
                    <Image
                      src={selectedExp.imageDesktop ?? selectedExp.imageMobile ?? selectedExp.image}
                      alt={selectedExp.company}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-white/10 dark:via-slate-900/10 to-transparent" />
                  <button
                    onClick={() => setSelectedExp(null)}
                    className="absolute top-6 right-6 p-3 bg-black/20 hover:bg-black/40 backdrop-blur-xl rounded-full text-white transition-all duration-300 hover:rotate-90"
                    aria-label="Close modal"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="px-8 md:px-20 pb-24 -mt-24 relative z-10 bg-gradient-to-b from-transparent via-white dark:via-slate-900 to-white dark:to-slate-900">
                  <header className="mb-12">
                    <h2 className="text-[4rem] font-bold text-slate-900 dark:text-slate-100 leading-[1.1] mb-4 tracking-tight">
                      {selectedExp.role}
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <span className="text-[2.2rem] font-medium text-[#DC143C]">
                        {selectedExp.company}
                      </span>
                      <div className="h-4 w-[1px] bg-slate-300 dark:bg-slate-700 hidden sm:block" />
                      <span className="text-[1.5rem] text-slate-400 dark:text-slate-500 italic">
                        {selectedExp.duration}
                      </span>
                    </div>
                  </header>

                  <article className="prose prose-xl max-w-none">
                    <p className="text-[2rem] text-slate-600 dark:text-slate-300 leading-[1.8] font-light mb-16 first-letter:text-7xl first-letter:font-bold first-letter:text-[#DC143C] first-letter:mr-4 first-letter:float-left first-letter:mt-2">
                      {selectedExp.summary}
                    </p>

                    <div className="grid md:grid-cols-2 gap-12">
                      <div>
                        <h4 className="text-[1.3rem] font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3">
                          <span className="w-8 h-[2px] bg-[#DC143C]" />
                          Impact & Contributions
                        </h4>
                        <ul className="space-y-8">
                          {selectedExp.detailed.map((point, i) => (
                            <li key={i} className="flex gap-5 group">
                              <span className="shrink-0 w-6 h-6 rounded-full border border-[#DC143C]/30 flex items-center justify-center mt-5 transition-colors group-hover:bg-[#DC143C]/5">
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="text-[#DC143C]">
                                  <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                              <p className="text-[1.6rem] text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                                {point}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-12">
                        <div>
                          <h4 className="text-[1.3rem] font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-[#DC143C]" />
                            Technology Stack
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {selectedExp.tech.map((t) => (
                              <span key={t} className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg text-[1.3rem] text-slate-600 dark:text-slate-300 font-medium">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {selectedExp.url && (
                          <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                            <a
                              href={selectedExp.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-3 px-8 py-4 bg-[#29323C] text-white text-[1.4rem] font-bold rounded-xl hover:bg-[#DC143C] transition-all duration-300 shadow-lg shadow-slate-200 dark:shadow-black/30"
                            >
                              Visit Website
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
    </section>
  )
}
