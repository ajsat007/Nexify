'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

type Theme = 'light' | 'dark'
interface ThemeCtx { theme: Theme; toggle: () => void; mounted: boolean }

const ThemeContext = createContext<ThemeCtx>({ theme: 'light', toggle: () => {}, mounted: false })
export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('nexify_theme') as Theme | null
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark'); document.documentElement.classList.add('dark')
    }
    setMounted(true)
  }, [])

  const toggle = useCallback(() => {
    setTheme(p => {
      const n = p === 'light' ? 'dark' : 'light'
      localStorage.setItem('nexify_theme', n)
      n === 'dark' ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
      return n
    })
  }, [])

  return <ThemeContext.Provider value={{ theme, toggle, mounted }}>{children}</ThemeContext.Provider>
}
