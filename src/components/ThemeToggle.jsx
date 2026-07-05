'use client'

import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Toggle light mode' : 'Toggle dark mode'}
      title={isDark ? 'Toggle light mode' : 'Toggle dark mode'}
      className={`theme-toggle ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={`theme-toggle-icon sun ${isDark ? '' : 'active'}`}>
        <circle cx="12" cy="12" r="4.5" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 2v3" /><path d="M12 19v3" /><path d="M4.2 4.2l2.1 2.1" />
          <path d="M17.7 17.7l2.1 2.1" /><path d="M2 12h3" /><path d="M19 12h3" />
          <path d="M4.2 19.8l2.1-2.1" /><path d="M17.7 6.3l2.1-2.1" />
        </g>
      </svg>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={`theme-toggle-icon moon ${isDark ? 'active' : ''}`}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  )
}
