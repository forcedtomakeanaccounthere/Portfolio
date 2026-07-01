'use client'

import Image from 'next/image'
import * as motion from "motion/react-client"
import { useState, useEffect } from 'react'

function DownloadButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a 
      href="/Resume_Abhishek_Anand.pdf" 
      className="cta"
    >
      Download Resume
    </a>
  )
}

export default function ResumePreview() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <motion.div
      style={buttonContainer}
      initial="hidden"
      whileInView={isMobile ? "scrollVisible" : "initial"}
      viewport={{ amount: 0.5, once: false }}
      whileHover={!isMobile ? "hover" : undefined}
    >
      <div style={buttonWrapper}>
        <DownloadButton />
        <motion.div 
          style={previewContainer}
          variants={previewVariants}
          className="resume-preview"
        >
          <a href="/Resume_Abhishek_Anand.pdf" style={previewLink}>
            <div style={cardWrapper}>
              <div style={splashBackground} />
              <motion.div style={previewCard} variants={cardVariants}>
                <Image 
                  src="/img/Resume_preview.png" 
                  alt="Resume Preview" 
                  width={200}
                  height={264}
                  style={resumeImageStyle}
                  quality={95}
                />
              </motion.div>
            </div>
          </a>
        </motion.div>
      </div>
    </motion.div>
  )
}

const previewVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  initial: {
    opacity: 1,
    scale: 0.35,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 1.2,
      delay: 0.3,
    },
  },
  scrollVisible: {
    opacity: 1,
    scale: 0.6,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 1.2,
      delay: 0.3,
    },
  },
  hover: {
    opacity: 1,
    scale: 0.8,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.6,
    },
  },
}

const cardVariants = {
  hidden: {
    y: 200,
    rotate: 0,
  },
  initial: {
    y: 0,
    rotate: -3,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 1.2,
      delay: 0.5,
    },
  },
  scrollVisible: {
    y: -10,
    rotate: -8,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 1.2,
      delay: 0.5,
    },
  },
  hover: {
    y: -30,
    rotate: -12,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.6,
    },
  },
}

/**
 * ==============   Styles   ================
 */

const buttonContainer = {
  position: 'relative',
  display: 'inline-block',
}

const buttonWrapper = {
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  position: 'relative',
}

const previewContainer = {
  position: 'relative',
  zIndex: 20,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginTop: '-8px',
}

const cardWrapper = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const splashBackground = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(306deg, hsl(340, 100%, 50%), hsl(10, 100%, 50%))',
  clipPath: `path("M 0 120 C 0 100 15 85 30 80 L 100 60 C 115 57 130 70 130 90 L 140 120 C 140 130 130 140 120 140 L 30 140 C 15 140 0 130 0 120 Z")`,
}

const previewCard = {
  width: '120px',
  height: '160px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '8px',
  background: '#ffffff',
  boxShadow: '0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)',
  transformOrigin: '50% 50%',
  overflow: 'hidden',
}

const previewLink = {
  display: 'block',
  textDecoration: 'none',
}

const resumeImageStyle = {
  objectFit: 'contain',
  borderRadius: '6px',
}