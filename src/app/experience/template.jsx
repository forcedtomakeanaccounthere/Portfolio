'use client'

import { useEffect } from 'react'

export default function Template({ children }) {
  useEffect(() => {
    // Force scroll to top when this route loads
    window.scrollTo(0, 0)
  }, [])

  return children
}
