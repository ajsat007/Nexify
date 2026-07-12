'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, X, ArrowRight, Cpu, Globe, Smartphone, Brain, BarChart3, Palette, Cloud, MessageCircle, FileText, Zap, LayoutDashboard, FolderKanban, Target, DollarSign, Clock, Users, Shield, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const searchData = [
  { title: 'Home', href: '/', category: 'Page', icon: LayoutDashboard },
  { title: 'Services', href: '/services', category: 'Page', icon: Cpu },
  { title: 'Products', href: '/products', category: 'Page', icon: Zap },
  { title: 'Portfolio', href: '/portfolio', category: 'Page', icon: FolderKanban },
  { title: 'Pricing', href: '/pricing', category: 'Page', icon: DollarSign },
  { title: 'About Us', href: '/about', category: 'Page', icon: Users },
  { title: 'Blog', href: '/blog', category: 'Page', icon: FileText },
  { title: 'Careers', href: '/careers', category: 'Page', icon: Target },
  { title: 'FAQ', href: '/faq', category: 'Page', icon: MessageCircle },
  { title: 'Contact', href: '/contact', category: 'Page', icon: Globe },
  { title: 'Client Portal', href: '/portal', category: 'System', icon: LayoutDashboard },
  { title: 'Admin Panel', href: '/admin', category: 'System', icon: Shield },
  { title: 'Sales System', href: '/sales', category: 'System', icon: TrendingUp },
  { title: 'Case Studies', href: '/case-studies', category: 'Page', icon: FileText },
  { title: 'Industries', href: '/industries', category: 'Page', icon: Globe },
  { title: 'Testimonials', href: '/testimonials', category: 'Page', icon: MessageCircle },
  { title: 'Documentation', href: '/docs', category: 'Info', icon: FileText },
  { title: 'Finance', href: '/finance', category: 'Info', icon: DollarSign },
  { title: 'HR', href: '/hr', category: 'Info', icon: Users },
  { title: 'Tech Stack', href: '/techstack', category: 'Info', icon: Cpu },
  { title: 'AI Automation', href: '/ai-automation', category: 'Info', icon: Brain },
  { title: 'Business Automation', href: '/business-automation', category: 'Info', icon: Zap },
  { title: 'Dashboards', href: '/dashboards', category: 'Info', icon: BarChart3 },
  { title: 'SOPs', href: '/sops', category: 'Info', icon: FileText },
  { title: 'Branding', href: '/branding', category: 'Info', icon: Palette },
  { title: 'Growth Roadmap', href: '/growth', category: 'Info', icon: TrendingUp },
  { title: 'Marketing', href: '/marketing', category: 'Info', icon: Globe },
  { title: 'Operations', href: '/ops', category: 'Info', icon: Clock },
  { title: 'Custom Software Development', href: '/services', category: 'Service', icon: Cpu },
  { title: 'Web Development', href: '/services', category: 'Service', icon: Globe },
  { title: 'Mobile App Development', href: '/services', category: 'Service', icon: Smartphone },
  { title: 'AI Solutions', href: '/services', category: 'Service', icon: Brain },
  { title: 'Data Analytics', href: '/services', category: 'Service', icon: BarChart3 },
  { title: 'UI/UX Design', href: '/services', category: 'Service', icon: Palette },
  { title: 'Cloud & DevOps', href: '/services', category: 'Service', icon: Cloud },
  { title: 'AI Chatbots', href: '/services', category: 'Service', icon: MessageCircle },
  { title: 'FlowSprint', href: '/products', category: 'Product', icon: LayoutDashboard },
  { title: 'PulseAI', href: '/products', category: 'Product', icon: BarChart3 },
  { title: 'DeskFlow', href: '/products', category: 'Product', icon: MessageCircle },
  { title: 'SignFlow', href: '/products', category: 'Product', icon: FileText },
  { title: 'BotForge', href: '/products', category: 'Product', icon: Brain },
]

export default function SiteSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<typeof searchData>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(true) }
      if (e.key === 'Escape') { setOpen(false) }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const q = query.toLowerCase()
    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    ).slice(0, 8)
    setResults(filtered)
    setSelectedIndex(0)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(i => Math.min(i + 1, results.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(i => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' && results[selectedIndex]) {
      window.location.href = results[selectedIndex].href
      setOpen(false)
    }
  }

  return (
    <>
      {/* Search Trigger */}
      <button onClick={() => setOpen(true)} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-800/50 border border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500 transition-all text-xs" title="Search (Ctrl+K)">
        <Search size={14} />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden lg:inline text-[10px] px-1.5 py-0.5 rounded bg-neutral-700 text-neutral-400">⌘K</kbd>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-lg bg-neutral-900 rounded-2xl border border-neutral-700 shadow-2xl overflow-hidden animate-slide-down">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-800">
              <Search size={18} className="text-neutral-400 shrink-0" />
              <input ref={inputRef} autoFocus className="flex-1 bg-transparent text-white placeholder-neutral-500 outline-none text-sm" placeholder="Search pages, services, products..." value={query} onChange={e => setQuery(e.target.value)} onKeyDown={handleKeyDown} />
              {query && <button onClick={() => setQuery('')} className="text-neutral-400 hover:text-white"><X size={16} /></button>}
              <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-500">ESC</kbd>
            </div>
            <div ref={resultsRef} className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && query && (
                <div className="text-center py-8 text-neutral-500 text-sm">No results for "{query}"</div>
              )}
              {results.length === 0 && !query && (
                <div className="text-center py-8 text-neutral-500 text-xs">Type to search across 40+ pages and services</div>
              )}
              {results.map((item, i) => {
                const Icon = item.icon || Search
                return (
                  <Link key={item.title + item.href} href={item.href} onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${i === selectedIndex ? 'bg-primary-500/10 text-primary-300' : 'text-neutral-300 hover:bg-neutral-800'}`}>
                    <Icon size={16} className={`${i === selectedIndex ? 'text-primary-400' : 'text-neutral-500'}`} />
                    <span className="flex-1">{item.title}</span>
                    <span className="text-[10px] text-neutral-500 px-2 py-0.5 rounded bg-neutral-800">{item.category}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
