'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { Moon, Sun } from 'lucide-react'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{
  theme: Theme
  toggle: () => void
  mounted: boolean
}>({ theme: 'light', toggle: () => {}, mounted: false })

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('nexify_theme') as Theme | null
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark')
      document.documentElement.classList.add('dark')
    }
    setMounted(true)
  }, [])

  const toggle = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('nexify_theme', next)
      if (next === 'dark') document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggle, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle, mounted } = useTheme()
  if (!mounted) return <div className={`w-9 h-9 ${className}`} />
  return (
    <button onClick={toggle} className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-surface-700/50 ${className}`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
      {theme === 'light' ? <Moon size={16} className="text-surface-400" /> : <Sun size={16} className="text-amber-400" />}
    </button>
  )
}
