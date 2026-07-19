'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Search, Filter, Star, TrendingUp, Clock,
  Bot, Cpu, Shield, Zap, Code2, Users, Sparkles,
  CheckCircle2, ChevronDown, ArrowUpRight, Layers,
} from 'lucide-react'
import { PageLayout, PageHeader } from '@/components/PageLayout'
import { AnimatedSection } from '@/components/ScrollAnimations'
import { agentCatalog, agentCategories, getFeaturedAgents, getTrendingAgents, searchAgents, type AgentCategory } from '@/lib/agents/catalog'

const categoryIcons: Record<string, any> = {
  research: Cpu, coding: Code2, data: Layers, content: Sparkles,
  communication: Zap, finance: Cpu, healthcare: Shield, legal: Shield,
  marketing: TrendingUp, sales: Users, support: Bot, devops: Cpu,
  security: Shield, hr: Users, productivity: Zap, education: Cpu,
  ecommerce: Users, social: Users, travel: Zap, analytics: Layers,
}

function AgentCard({ agent }: { agent: any }) {
  const CatIcon = categoryIcons[agent.category] || Bot
  return (
    <Link href={`/marketplace/${agent.slug}`} className="group relative card-hover overflow-hidden">
      <div className="p-5 sm:p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center shrink-0 group-hover:from-primary-500/20 group-hover:to-accent-500/20 transition-all duration-300">
            <CatIcon className="w-5 h-5 text-primary-500" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="font-bold text-sm dark:text-white group-hover:text-primary-600 transition-colors">{agent.name}</h3>
              {agent.status === 'beta' && <span className="chip-warning text-[10px]">Beta</span>}
              {agent.pricing === 'free' && <span className="chip-success text-[10px]">Free</span>}
              {agent.pricing === 'enterprise' && <span className="chip-primary text-[10px]">Enterprise</span>}
            </div>
            <div className="flex items-center gap-2 text-xs text-surface-500 dark:text-surface-400">
              <span className="capitalize">{agent.framework}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Star size={10} className="text-amber-400" fill="currentColor" />{agent.rating}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-surface-700 dark:text-surface-300 leading-relaxed mb-3 line-clamp-2 flex-1">
          {agent.description}
        </p>

        {/* Tools */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {agent.tools.slice(0, 3).map((t: string) => (
            <span key={t} className="chip-surface text-[10px]">{t.replace(/_/g, ' ')}</span>
          ))}
          {agent.tools.length > 3 && (
            <span className="chip-surface text-[10px]">+{agent.tools.length - 3}</span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-surface-100 dark:border-surface-800">
          <span className="text-xs text-surface-500 dark:text-surface-400">{agent.costEstimate}</span>
          <span className="text-xs text-surface-500 dark:text-surface-400 flex items-center gap-1">
            <Clock size={11} /> {agent.latencyEstimate}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function MarketplacePage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<AgentCategory | 'all'>('all')
  const [framework, setFramework] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let results = search ? searchAgents(search) : [...agentCatalog]
    if (category !== 'all') results = results.filter(a => a.category === category)
    if (framework !== 'all') results = results.filter(a => a.framework === framework)
    return results
  }, [search, category, framework])

  const frameworks = Array.from(new Set(agentCatalog.map(a => a.framework)))
  const featured = getFeaturedAgents()
  const trending = getTrendingAgents()

  return (
    <PageLayout>
      <PageHeader
        badge="Agent Marketplace"
        title="500+ AI Agents. One Platform."
        subtitle="Browse, deploy, and customize AI agents for every business function. Research, coding, data, content, support, and more."
      />

      {/* Featured & Trending */}
      <section className="section-padding-sm bg-white dark:bg-surface-950 border-b border-surface-100 dark:border-surface-800">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Star size={14} className="text-amber-400" fill="currentColor" />
                <h2 className="font-semibold text-sm dark:text-white">Featured Agents</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {featured.slice(0, 6).map(a => (
                  <Link key={a.id} href={`/marketplace/${a.slug}`}
                    className="chip-primary text-xs hover:bg-primary-500/20 transition-all">
                    {a.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={14} className="text-accent-500" />
                <h2 className="font-semibold text-sm dark:text-white">Trending</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {trending.slice(0, 6).map(a => (
                  <Link key={a.id} href={`/marketplace/${a.slug}`}
                    className="chip bg-accent-500/10 text-accent-600 dark:text-accent-400 border border-accent-500/15 text-xs hover:bg-accent-500/20 transition-all">
                    {a.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-6 bg-surface-50 dark:bg-surface-900/30 border-b border-surface-100 dark:border-surface-800 sticky top-[72px] z-30 backdrop-blur-xl bg-white/80 dark:bg-surface-950/80">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
              <input
                type="text"
                placeholder="Search 500+ AI agents..."
                className="input pl-10"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary text-sm shrink-0"
            >
              <Filter size={14} /> Filters {category !== 'all' && `(${category})`}
            </button>
            <span className="inline-flex items-center px-3 text-xs text-surface-500 dark:text-surface-400 shrink-0">
              {filtered.length} agent{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          {showFilters && (
            <div className="mt-3 flex flex-wrap gap-2 animate-slide-down">
              <button onClick={() => setCategory('all')}
                className={`chip text-xs transition-all ${category === 'all' ? 'bg-primary-500 text-white' : 'chip-surface'}`}>
                All Categories
              </button>
              {agentCategories.filter(c => c.count > 0).map(c => (
                <button key={c.category} onClick={() => setCategory(c.category)}
                  className={`chip text-xs transition-all ${category === c.category ? 'bg-primary-500 text-white' : 'chip-surface'}`}>
                  {c.label} ({c.count})
                </button>
              ))}
              <div className="w-px h-6 bg-surface-200 dark:bg-surface-700 mx-1 self-center" />
              {frameworks.map(f => (
                <button key={f} onClick={() => setFramework(framework === f ? 'all' : f)}
                  className={`chip text-xs transition-all ${framework === f ? 'bg-accent-500 text-white' : 'chip-surface'}`}>
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Agent Grid */}
      <section className="section-padding bg-white dark:bg-surface-950">
        <div className="section-container">
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filtered.map((agent, i) => (
                <AnimatedSection key={agent.id} animation="fade-up" delay={i * 40}>
                  <AgentCard agent={agent} />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Bot size={40} className="mx-auto mb-4 text-surface-300 dark:text-surface-600" />
              <h3 className="text-lg font-semibold mb-2 dark:text-white">No agents found</h3>
              <p className="text-sm text-surface-500 dark:text-surface-400 mb-4">Try adjusting your search or filters</p>
              <button onClick={() => { setSearch(''); setCategory('all'); setFramework('all') }}
                className="btn-secondary text-sm">
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 gradient-bg-primary">
        <div className="section-container text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4">Want a Custom Agent?</h2>
          <p className="text-primary-100 text-base sm:text-lg mb-8 max-w-xl mx-auto">We build custom AI agents for your specific business needs. Tell us what you need.</p>
          <Link href="/contact" className="btn-white text-base sm:text-lg px-8 py-3.5">
            Request Custom Agent <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}
