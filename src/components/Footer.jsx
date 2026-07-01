'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'

const QUICK_LINKS = [
  { label: 'Home', href: '/#hero' },
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#contact' },
]

const CONTACT_INFO = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" />
      </svg>
    ),
    text: 'abhishekanandvii@gmail.com',
    href: 'mailto:abhishekanandvii@gmail.com',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.71 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.71A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    text: '+91 7386811239',
    href: 'tel:+917386811239',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    text: 'Chittoor, Andhra Pradesh, India',
    href: null,
  },
]

const SOCIAL = [
  {
    label: 'GitHub',
    href: 'https://github.com/forcedtomakeanaccounthere',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abhishek-anand-97529128a/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/abhi_rehnedo',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
]

export default function Footer() {
  const videoRef = useRef(null)

  // Forward → reverse → forward loop
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let rafId = null
    let isReversing = false

    const reverseStep = () => {
      if (!video) return
      video.currentTime = Math.max(0, video.currentTime - 1 / 30)
      if (video.currentTime <= 0.02) {
        isReversing = false
        video.play().catch(() => {})
        return
      }
      rafId = requestAnimationFrame(reverseStep)
    }

    const onEnded = () => {
      if (isReversing) return
      isReversing = true
      rafId = requestAnimationFrame(reverseStep)
    }

    video.addEventListener('ended', onEnded)
    video.play().catch(() => {})

    return () => {
      video.removeEventListener('ended', onEnded)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <footer id="footer" className="relative overflow-hidden" style={{ minHeight: '520px', background: '#050510' }}>
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        src="/img/boat_footer.mp4"
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      {/* Gradient overlay — top transparent, bottom near-opaque */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(5,5,16,0.3) 0%, rgba(5,5,16,0.55) 45%, rgba(5,5,16,0.92) 80%, rgba(5,5,16,1) 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full" style={{ minHeight: '520px' }}>
        <div className="max-w-[1200px] mx-auto w-full px-6 pb-10 pt-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-10">
            {/* Col 1 – Brand */}
            <div>
              <h2 className="text-[2.4rem] font-bold text-white mb-4 tracking-tight">
                <span className="text-[#DC143C]">A</span>bhishek <span className="text-[#DC143C]">A</span>nand
              </h2>
              <p className="text-[1.3rem] text-slate-400 leading-relaxed font-light mb-3">
                Crafting digital{' '}
                <span className="text-[#DC143C] text-bold">ecstasies</span>
                {' '}with code, creativity &amp; a bit of caffeine (of course!).
              </p>
              <p className="text-[1.3rem] text-slate-500 font-light">Thanks for stopping by!</p>
            </div>

            {/* Col 2 – Quick Links */}
            <div>
              <h3 className="text-[1.5rem] font-bold text-white mb-5 tracking-wide">Quick Links</h3>
              <ul className="space-y-3">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[1.4rem] text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 – Get in Touch */}
            <div>
              <h3 className="text-[1.5rem] font-bold text-white mb-5 tracking-wide">Get in Touch</h3>
              <ul className="space-y-4">
                {CONTACT_INFO.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[3px] shrink-0 text-slate-400">{item.icon}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-[1.3rem] text-slate-400 hover:text-white transition-colors duration-200 leading-snug"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-[1.3rem] text-slate-400 leading-snug">{item.text}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 – Connect */}
            <div>
              <h3 className="text-[1.5rem] font-bold text-white mb-5 tracking-wide">Connect</h3>
              <div className="flex items-center gap-5">
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="text-slate-400 hover:text-white transition-colors duration-200 hover:scale-110 transform"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider + copyright */}
          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-[1.2rem] text-slate-600 font-light">
              Copyright &copy; 2026 Abhishek Anand. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
