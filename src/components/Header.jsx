'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import ThemeToggle from './ThemeToggle'

const NAV_ITEMS = [
  { label: 'Home', href: '/#hero' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Always show scrolled bg on inner pages
  const alwaysScrolled = pathname === '/project' || pathname === '/experience'

  useEffect(() => {
    if (alwaysScrolled) return
    const handleScroll = () => setIsScrolled(window.scrollY > 70)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [alwaysScrolled])

  const toggleNav = () => {
    const next = !isNavOpen
    setIsNavOpen(next)
    document.body.style.overflow = next ? 'hidden' : 'auto'
  }

  const closeNav = () => {
    setIsNavOpen(false)
    document.body.style.overflow = 'auto'
  }

  const showScrolled = isScrolled || alwaysScrolled

  return (
    <header id="header" className={`header ${showScrolled ? 'scrolled' : ''}`}>
      <div className="nav-wrapper">
        <div className="nav-bar">
          <div className="brand">
            <a href="/#hero">
              <h1 id="namee">
                <span>A</span>bhishek <span>A</span>nand
              </h1>
            </a>
          </div>

          <nav className="nav-list">
            <ul className="nav-desktop-list" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
              
            <ThemeToggle className="theme-toggle-desktop" />

            <button
              className={`hamburger ${isNavOpen ? 'active' : ''}`}
              onClick={toggleNav}
              aria-label="Toggle navigation"
              aria-expanded={isNavOpen}
            >
              <div className="bar"></div>
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile drawer: 60% glass panel + glass backdrop on remaining 40% */}
      <AnimatePresence>
        {isNavOpen && (
          <>
            <motion.div
              key="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeNav}
              className="mobile-nav-backdrop"
              aria-hidden="true"
            />
            <motion.div
              key="mobile-nav-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mobile-nav-drawer"
            >
              <div className="mobile-nav-drawer-top">
                <ThemeToggle className="theme-toggle-mobile" />
              </div>
              <ul role="list">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a href={item.href} onClick={closeNav}>{item.label}</a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
