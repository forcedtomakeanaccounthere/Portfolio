'use client'

import { useState, useEffect } from 'react'

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 70)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
    document.body.style.overflow = isNavOpen ? 'auto' : 'hidden'
  }

  const closeNav = () => {
    setIsNavOpen(false)
    document.body.style.overflow = 'auto'
  }

  return (
    <header id="header" className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header container">
        <div className="nav-bar">
          <div className="brand">
            <a href="#hero">
              <h1 id="namee">
                <span>A</span>bhishek <br />
                <span>A</span>nand
              </h1>
            </a>
          </div>
          <nav className="nav-list">
            <div className="hamburger" onClick={toggleNav}>
              <div className={`bar ${isNavOpen ? 'active' : ''}`}></div>
            </div>
            <ul className={isNavOpen ? 'active' : ''}>
              <li><a href="#hero" onClick={closeNav} data-after="Home">Home</a></li>
              <li><a href="#services" onClick={closeNav} data-after="Services">Domains</a></li>
              <li><a href="#skills" onClick={closeNav} data-after="Skills">Skills</a></li>
              <li><a href="#projects" onClick={closeNav} data-after="Projects">Projects</a></li>
              <li><a href="#about" onClick={closeNav} data-after="About">About</a></li>
              <li><a href="#contact" onClick={closeNav} data-after="Contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}