'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu, X, ChevronDown, Sun, Moon, Search, Command,
  Sparkles, Zap, Bot, MessageCircle, BookOpen, Code2,
  Users, Building2, Beaker, Shield, LayoutDashboard,
  FileText, HelpCircle, Briefcase, ArrowUpRight,
  Github, Twitter, Linkedin, Globe, ChevronRight,
} from 'lucide-react'
import { navigation } from '@/constants'
import { useTheme } from '@/components/ThemeProvider'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const pathname = usePathname()
  const isHome = pathname === '/'
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(!searchOpen)
      }
      if (e.key === 'Escape') {
        setActiveDropdown(null)
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchOpen])

  const handleClickOutside = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest('[data-dropdown]')) setActiveDropdown(null)
    if (!target.closest('[data-search]')) setSearchOpen(false)
  }, [])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [handleClickOutside])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-header transition-all duration-500 ${
          scrolled || !isHome
            ? 'glass shadow-sm translate-y-0'
            : 'bg-transparent translate-y-0'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center overflow-hidden group-hover:shadow-lg group-hover:shadow-primary-500/25 transition-shadow duration-300">
                <span className="text-white font-heading font-bold text-sm relative z-10">N</span>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/50 to-accent-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-surface-900 dark:text-white font-heading font-bold text-lg leading-none tracking-tight">Nexify</h1>
                <p className="text-surface-500 dark:text-surface-400 text-[10px] font-medium tracking-[0.15em] uppercase">Technologies</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) =>
                item.hasDropdown ? (
                  <div
                    key={item.name}
                    className="relative"
                    data-dropdown
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeDropdown === item.name
                          ? 'text-surface-900 dark:text-white bg-surface-100 dark:bg-surface-800'
                          : 'text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-50 dark:hover:bg-surface-800/50'
                      }`}
                    >
                      {item.name}
                      <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Mega Menu */}
                    {activeDropdown === item.name && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-3 animate-dropdown-in"
                        style={{ zIndex: 60 }}
                      >
                        <div className="glass rounded-2xl border border-white/20 dark:border-white/10 shadow-elevated p-2 min-w-[240px]">
                          {item.children?.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="group flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 hover:bg-surface-100 dark:hover:bg-surface-750"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span className="flex-1 text-surface-700 dark:text-surface-300 group-hover:text-surface-900 dark:group-hover:text-white transition-colors">
                                {child.name}
                              </span>
                              <ChevronRight size={13} className="text-surface-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'text-primary-500 bg-primary-500/10'
                        : 'text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-50 dark:hover:bg-surface-800/50'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Search trigger */}
              <button
                data-search
                onClick={() => setSearchOpen(!searchOpen)}
                className="btn-icon hidden lg:flex text-xs gap-2 px-3 w-auto"
              >
                <Search size={14} />
                <span className="text-surface-400">Search</span>
                <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-surface-100 dark:bg-surface-800 text-[10px] font-medium text-surface-400 border border-surface-200 dark:border-surface-700">
                  <Command size={10} />K
                </kbd>
              </button>

              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={toggle}
                  className="btn-icon"
                  title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-surface-500" />}
                </button>
              )}

              {/* Desktop CTA */}
              <Link href="/chatbot" className="hidden lg:inline-flex btn-primary text-sm">
                <Bot size={14} />
                AI Chatbot
                <span className="text-primary-200 text-xs">₹15K</span>
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden btn-icon"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Global search command palette */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 glass shadow-elevated border-t border-surface-200/50 dark:border-surface-700/50 animate-slide-down">
            <div className="section-container py-4">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
                  <Search size={16} className="text-surface-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search documentation, services, products..."
                    className="flex-1 bg-transparent border-none outline-none text-sm text-surface-900 dark:text-white placeholder-surface-400"
                    autoFocus
                  />
                  <kbd className="text-[10px] font-medium text-surface-400 bg-surface-200 dark:bg-surface-700 px-1.5 py-0.5 rounded">ESC</kbd>
                </div>
                <div className="mt-3 grid sm:grid-cols-2 gap-2">
                  {[
                    { icon: Bot, label: 'AI Chatbot', href: '/chatbot', desc: '₹15K, 48h delivery' },
                    { icon: Sparkles, label: 'Services', href: '/services', desc: '20+ AI-powered services' },
                    { icon: BookOpen, label: 'Documentation', href: '/docs', desc: 'API references & guides' },
                    { icon: HelpCircle, label: 'FAQ', href: '/faq', desc: 'Common questions' },
                  ].map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-all group"
                      onClick={() => setSearchOpen(false)}
                    >
                      <item.icon size={15} className="text-primary-500 shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-surface-900 dark:text-white">{item.label}</div>
                        <div className="text-xs text-surface-400">{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <div className={`absolute top-0 left-0 bottom-0 w-[85vw] max-w-sm bg-surface-50 dark:bg-surface-950 shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between p-4 border-b border-surface-200 dark:border-surface-800">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <span className="text-white font-heading font-bold text-xs">N</span>
              </div>
              <span className="font-heading font-bold text-lg dark:text-white">Nexify</span>
            </Link>
            <button onClick={() => setIsOpen(false)} className="btn-icon">
              <X size={18} />
            </button>
          </div>
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-80px)]">
            {navigation.map((item) =>
              item.hasDropdown ? (
                <div key={item.name} className="py-2">
                  <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-surface-400">
                    {item.name}
                  </div>
                  <div className="mt-1 space-y-0.5 pl-2">
                    {item.children?.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? 'text-primary-500 bg-primary-500/10'
                      : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            <div className="pt-4 mt-4 border-t border-surface-200 dark:border-surface-800">
              <Link href="/chatbot" className="btn-primary w-full text-center" onClick={() => setIsOpen(false)}>
                <Bot size={14} />
                Get AI Chatbot — ₹15K
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
