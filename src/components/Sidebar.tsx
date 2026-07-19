'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Users, FolderKanban, Target, MessageSquare,
  DollarSign, Settings, LogOut, Menu, X, ChevronDown,
  Cpu, BarChart3, Shield, CreditCard, FileText, Home,
} from 'lucide-react'
import { cn } from '@/utils'

export interface SidebarItem {
  label: string
  href?: string
  icon?: any
  onClick?: () => void
  active?: boolean
  children?: { label: string; href: string }[]
}

interface SidebarProps {
  items: SidebarItem[]
  title: string
  subtitle?: string
  logo?: string
  onLogout?: () => void
}

export function Sidebar({ items, title, subtitle, logo = 'N', onLogout }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    items.forEach(item => {
      if (item.children?.some(c => pathname === c.href || pathname.startsWith(c.href + '/'))) {
        setExpandedMenus(prev => prev.includes(item.label) ? prev : [...prev, item.label])
      }
    })
  }, [pathname, items])

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => prev.includes(label) ? prev.filter(m => m !== label) : [...prev, label])
  }

  const isActive = (item: SidebarItem) => {
    if (item.active !== undefined) return item.active
    if (!item.href) return false
    if (item.href === '/admin') return pathname === '/admin'
    return pathname.startsWith(item.href)
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-neutral-800 shrink-0">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {logo}
        </div>
        <div className={cn('overflow-hidden transition-all duration-300', collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100')}>
          <div className="text-white font-heading font-bold text-sm leading-tight">{title}</div>
          {subtitle && <div className="text-neutral-500 text-xs font-medium uppercase tracking-wider">{subtitle}</div>}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
        {items.map((item) => {
          const active = isActive(item)
          const hasChildren = item.children && item.children.length > 0
          const isExpanded = expandedMenus.includes(item.label)

          return (
            <div key={item.label}>
              {hasChildren ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={cn(
                      'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                      active
                        ? 'bg-primary-500/10 text-primary-400'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                    )}
                  >
                    {item.icon && <item.icon size={18} className={cn('shrink-0', active ? 'text-primary-400' : 'text-neutral-500 group-hover:text-neutral-300')} />}
                    <span className={cn('flex-1 text-left transition-all duration-300', collapsed ? 'hidden' : 'block')}>{item.label}</span>
                    {!collapsed && (
                      <ChevronDown size={14} className={cn('transition-transform duration-200 text-neutral-500', isExpanded && 'rotate-180')} />
                    )}
                  </button>
                  <div className={cn(
                    'overflow-hidden transition-all duration-300',
                    isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  )}>
                    <div className={cn('ml-8 mt-1 space-y-1', collapsed && 'ml-3')}>
                      {item.children?.map((child) => {
                        const childActive = pathname === child.href
                        return (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={cn(
                              'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200',
                              childActive
                                ? 'bg-primary-500/10 text-primary-400 font-medium'
                                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                            )}
                          >
                            <span className={cn('w-1 h-1 rounded-full shrink-0', childActive ? 'bg-primary-400' : 'bg-neutral-600')} />
                            <span className={cn('transition-all duration-300', collapsed ? 'hidden' : 'block')}>{child.label}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </>
              ) : item.onClick ? (
                <button
                  onClick={item.onClick}
                  className={cn(
                    'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group text-left',
                    isActive(item)
                      ? 'bg-primary-500/10 text-primary-400'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  )}
                >
                  {item.icon && <item.icon size={18} className={cn('shrink-0', isActive(item) ? 'text-primary-400' : 'text-neutral-500 group-hover:text-neutral-300')} />}
                  <span className={cn('transition-all duration-300', collapsed ? 'hidden' : 'block')}>{item.label}</span>
                </button>
              ) : (
                <Link
                  href={item.href || '#'}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                    isActive(item)
                      ? 'bg-primary-500/10 text-primary-400'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  )}
                >
                  {item.icon && <item.icon size={18} className={cn('shrink-0', isActive(item) ? 'text-primary-400' : 'text-neutral-500 group-hover:text-neutral-300')} />}
                  <span className={cn('transition-all duration-300', collapsed ? 'hidden' : 'block')}>{item.label}</span>
                </Link>
              )}
            </div>
          )
        })}
      </nav>

      {/* Home link */}
      <div className="p-3 border-t border-neutral-800 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-neutral-400 hover:text-white hover:bg-neutral-800/50 transition-all duration-200 group"
        >
          <Home size={18} className="text-neutral-500 group-hover:text-neutral-300 shrink-0" />
          <span className={cn('transition-all duration-300', collapsed ? 'hidden' : 'block')}>Back to Site</span>
        </Link>
        {onLogout && (
          <button onClick={onLogout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-neutral-400 hover:text-white hover:bg-neutral-800/50 transition-all duration-200 group">
            <LogOut size={18} className="text-neutral-500 group-hover:text-neutral-300 shrink-0" />
            <span className={cn('transition-all duration-300', collapsed ? 'hidden' : 'block')}>Logout</span>
          </button>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={cn(
        'hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-neutral-900 border-r border-neutral-800 z-40 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}>
        {sidebarContent}
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-400 flex items-center justify-center hover:bg-neutral-700 transition-all"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Menu size={12} className={cn('transition-transform', collapsed && 'rotate-180')} />
        </button>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="fixed left-0 top-0 w-72 h-full bg-neutral-900 border-r border-neutral-800 z-50 animate-slide-down">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-neutral-900/95 backdrop-blur-xl border-b border-neutral-800 z-30 flex items-center justify-between px-4">
        <button onClick={() => setMobileOpen(true)} className="text-neutral-400 hover:text-white p-1" aria-label="Open menu">
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold">{logo}</div>
          <span className="text-white font-heading font-bold text-sm">{title}</span>
        </div>
        <div className="w-6" />
      </header>
    </>
  )
}
