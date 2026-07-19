'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu, X, ChevronDown, Sun, Moon, Search, Command,
  Sparkles, Bot, BookOpen, HelpCircle,
  ArrowUpRight, ChevronRight,
} from 'lucide-react'
import { navigation } from '@/constants'
import { useTheme } from '@/components/ThemeProvider'

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(s => !s) }
      if (e.key === 'Escape') { setActiveDropdown(null); setSearchOpen(false) }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const handleClickOutside = useCallback((e: MouseEvent) => {
    const t = e.target as HTMLElement
    if (!t.closest('[data-dropdown]')) setActiveDropdown(null)
    if (!t.closest('[data-search]')) setSearchOpen(false)
  }, [])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [handleClickOutside])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  const navText = (scrolled || !isHome)
    ? 'text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800/50'
    : 'text-white/70 hover:text-white hover:bg-white/[0.08]'

  const navTextActive = (scrolled || !isHome)
    ? 'text-primary-500 bg-primary-500/10'
    : 'text-white bg-white/[0.12]'

  const dropdownBg = (scrolled || !isHome)
    ? 'bg-white dark:bg-surface-900 border-surface-200/50 dark:border-surface-700/50 shadow-elevated'
    : 'bg-surface-900/95 backdrop-blur-xl border-white/[0.08] shadow-2xl'

  const dropdownItem = (scrolled || !isHome)
    ? 'text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800'
    : 'text-white/70 hover:text-white hover:bg-white/[0.08]'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-header transition-all duration-500 ${
          scrolled || !isHome
            ? 'bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl shadow-sm border-b border-surface-200/50 dark:border-surface-800/50'
            : 'bg-transparent'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden group-hover:shadow-lg group-hover:shadow-primary-500/25 transition-all duration-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-square.png"
                  alt="Nexify"
                  className="w-full h-full object-cover"
                  width={36}
                  height={36}
                />
              </div>
              <div className="hidden sm:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-horizontal.png"
                  alt="Nexify Technologies"
                  className={`h-8 w-auto transition-opacity duration-300 ${scrolled || !isHome ? 'opacity-100' : 'opacity-90 brightness-0 invert'}`}
                  width={160}
                  height={32}
                />
              </div>
            </Link>

            {/* Desktop Nav */}
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
                        activeDropdown === item.name ?
                          (scrolled || !isHome ? 'text-surface-900 dark:text-white bg-surface-100 dark:bg-surface-800' : 'text-white bg-white/[0.12]')
                          : navText
                      }`}
                    >
                      {item.name}
                      <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 animate-dropdown-in" style={{ zIndex: 60 }}>
                        <div className={`rounded-2xl border p-2 min-w-[240px] ${dropdownBg}`}>
                          {item.children?.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${dropdownItem}`}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span className="flex-1">{child.name}</span>
                              <ChevronRight size={13} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
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
                      isActive(item.href) ? navTextActive : navText
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button
                data-search
                onClick={() => setSearchOpen(!searchOpen)}
                className={`btn-icon hidden lg:flex text-xs gap-2 px-3 w-auto ${scrolled || !isHome ? '' : 'text-white/70 hover:text-white hover:bg-white/[0.08]'}`}
              >
                <Search size={14} />
                <span className="hidden xl:inline">Search</span>
                <kbd className={`hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-xs font-medium border ${scrolled || !isHome ? 'bg-surface-100 dark:bg-surface-800 text-surface-400 border-surface-200 dark:border-surface-700' : 'bg-white/[0.08] text-white/50 border-white/[0.1]'}`}>
                  <Command size={10} />K
                </kbd>
              </button>

              {mounted && (
                <button
                  onClick={toggle}
                  className={`btn-icon ${scrolled || !isHome ? '' : 'text-white/70 hover:text-white hover:bg-white/[0.08]'}`}
                  title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                </button>
              )}

              <Link
                href="/chatbot"
                className="hidden lg:inline-flex btn-primary text-sm"
              >
                <Bot size={14} /> AI Chatbot <span className="text-primary-200 text-xs">₹15K</span>
              </Link>

              <button
                className={`lg:hidden btn-icon ${scrolled || !isHome ? '' : 'text-white/70 hover:text-white hover:bg-white/[0.08]'}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search palette */}
        {searchOpen && (
          <div className={`absolute top-full left-0 right-0 border-t animate-slide-down ${
            scrolled || !isHome
              ? 'bg-white/95 dark:bg-surface-950/95 backdrop-blur-xl border-surface-200/50 dark:border-surface-800/50 shadow-elevated'
              : 'bg-surface-950/95 backdrop-blur-xl border-white/[0.06] shadow-2xl'
          }`}>
            <div className="section-container py-4">
              <div className="max-w-2xl mx-auto">
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
                  scrolled || !isHome
                    ? 'bg-surface-100 dark:bg-surface-800 border-surface-200 dark:border-surface-700'
                    : 'bg-white/[0.06] border-white/[0.1]'
                }`}>
                  <Search size={16} className="text-surface-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search documentation, services, products..."
                    className={`flex-1 bg-transparent border-none outline-none text-sm placeholder-surface-400 ${
                      scrolled || !isHome ? 'text-surface-900 dark:text-white' : 'text-white'
                    }`}
                    autoFocus
                    onKeyDown={e => { if (e.key === 'Escape') setSearchOpen(false) }}
                  />
                  <kbd className="text-xs font-medium text-surface-400 bg-surface-200 dark:bg-surface-700 px-1.5 py-0.5 rounded">ESC</kbd>
                </div>
                <div className="mt-3 grid sm:grid-cols-2 gap-2">
                  {[
                    { icon: Bot, label: 'AI Chatbot', href: '/chatbot', desc: '₹15K, 48h delivery' },
                    { icon: Sparkles, label: 'Services', href: '/services', desc: '8 AI-powered services' },
                    { icon: BookOpen, label: 'Documentation', href: '/docs', desc: 'API references & guides' },
                    { icon: HelpCircle, label: 'FAQ', href: '/faq', desc: 'Common questions' },
                  ].map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                        scrolled || !isHome
                          ? 'hover:bg-surface-100 dark:hover:bg-surface-800'
                          : 'hover:bg-white/[0.06]'
                      }`}
                      onClick={() => setSearchOpen(false)}
                    >
                      <item.icon size={15} className="text-primary-500 shrink-0" />
                      <div>
                        <div className={`text-sm font-medium ${
                          scrolled || !isHome ? 'text-surface-900 dark:text-white' : 'text-white'
                        }`}>{item.label}</div>
                        <div className={`text-xs ${
                          scrolled || !isHome ? 'text-surface-400' : 'text-white/50'
                        }`}>{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <div className={`absolute top-0 left-0 bottom-0 w-[85vw] max-w-sm bg-white dark:bg-surface-950 shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between p-4 border-b border-surface-200 dark:border-surface-800">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <div className="w-8 h-8 rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-square.png" alt="Nexify" className="w-full h-full object-cover" />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-horizontal.png" alt="Nexify" className="h-7 w-auto" />
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
                <Bot size={14} /> Get AI Chatbot — ₹15K
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
