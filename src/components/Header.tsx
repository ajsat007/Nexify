'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react'
import SiteSearch from '@/components/SiteSearch'
import { navigation } from '@/constants'
import { useTheme } from '@/components/ThemeProvider'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { theme, toggle } = useTheme()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-neutral-900/95 backdrop-blur-xl shadow-lg shadow-black/10' : 'bg-transparent'}`}>
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/icon.svg" alt="Nexify" className="w-9 h-9" />
            <div className="hidden sm:block">
              <h1 className="text-white font-heading font-bold text-xl leading-none">Nexify</h1>
              <p className="text-neutral-400 text-xs font-medium tracking-wider uppercase">Technologies</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5" onMouseLeave={() => setActiveDropdown(null)}>
            {navigation.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                >
                  <button className="nav-link text-sm font-medium py-2 flex items-center gap-1">
                    {item.name} <ChevronDown size={14} className={`transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-neutral-800/95 backdrop-blur-xl rounded-2xl border border-neutral-700 shadow-2xl py-2 animate-slide-down">
                      {item.children?.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-5 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-neutral-700/50 transition-all"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.name} href={item.href} className="nav-link text-sm font-medium py-2">
                  {item.name}
                </Link>
              )
            )}
            <div className="flex items-center gap-2">
              <SiteSearch />
              {mounted && (
                <button onClick={toggle} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-neutral-700/50 transition-all" title="Toggle theme">
                  {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-neutral-300" />}
                </button>
              )}
              <Link href="/contact" className="btn-primary text-sm">Get Started</Link>
            </div>
          </nav>

          <button className="lg:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="section-container pb-6">
          <nav className="flex flex-col gap-1 bg-neutral-800/50 rounded-2xl p-4 backdrop-blur-xl">
            {navigation.map((item) =>
              item.hasDropdown ? (
                <div key={item.name}>
                  <div className="text-neutral-300 px-4 py-2 text-sm font-semibold uppercase tracking-wider">{item.name}</div>
                  {item.children?.map((child) => (
                    <Link key={child.name} href={child.href} className="text-neutral-400 hover:text-white px-4 py-2 rounded-lg hover:bg-neutral-700/50 transition-all text-sm block" onClick={() => setIsOpen(false)}>
                      {child.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link key={item.name} href={item.href} className="text-neutral-300 hover:text-white px-4 py-2.5 rounded-lg hover:bg-neutral-700/50 transition-all text-sm font-medium" onClick={() => setIsOpen(false)}>
                  {item.name}
                </Link>
              )
            )}
            <Link href="/contact" className="btn-primary text-sm mt-2 text-center" onClick={() => setIsOpen(false)}>
              Get Started
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
