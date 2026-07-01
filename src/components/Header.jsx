'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

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
            <button
              className={`hamburger ${isNavOpen ? 'active' : ''}`}
              onClick={toggleNav}
              aria-label="Toggle navigation"
              aria-expanded={isNavOpen}
            >
              <div className="bar"></div>
            </button>

            <ul className={isNavOpen ? 'active' : ''} role="list">
              <li><a href="/#hero" onClick={closeNav}>Home</a></li>
              <li><a href="/#experience" onClick={closeNav}>Experience</a></li>
              <li><a href="/#projects" onClick={closeNav}>Projects</a></li>
              <li><a href="/#skills" onClick={closeNav}>Skills</a></li>
              <li><a href="/#about" onClick={closeNav}>About</a></li>
              <li><a href="/#contact" onClick={closeNav}>Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
