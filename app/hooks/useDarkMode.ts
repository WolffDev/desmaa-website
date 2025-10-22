import { useEffect, useState } from 'react'

/**
 * Custom hook for managing dark mode state
 * Syncs with localStorage and applies 'dark' class to document element
 *
 * @returns {Object} { isDark, toggleDark, setDark }
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Only run after component mounts to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)

    // Check localStorage and system preference
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialDark = stored === 'dark' || (!stored && prefersDark)

    setIsDark(initialDark)
    document.documentElement.classList.toggle('dark', initialDark)
  }, [])

  const setDark = (dark: boolean) => {
    if (!mounted) return

    setIsDark(dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', dark)
  }

  const toggleDark = () => {
    setDark(!isDark)
  }

  return { isDark, toggleDark, setDark, mounted }
}
