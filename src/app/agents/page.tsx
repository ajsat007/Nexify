'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Cpu, Zap, Shield, TrendingUp, Users, Star, Activity, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'
import { agentRegistry, getAgentStats, type AgentDepartment, type AgentDefinition } from '@/agents/registry'
import { PageLayout, PageHeader } from '@/components/PageLayout'
import { AnimatedSection } from '@/components/ScrollAnimations'

// ── Department grouping ──
const DEPT_ORDER: AgentDepartment[] = [
  'executive', 'engineering', 'design', 'marketing', 'sales',
  'support', 'finance', 'hr', 'operations', 'legal', 'security', 'research',
]

const DEPT_COLORS: Record<string, string> = {
  executive: 'from-amber-500 to-yellow-500',
  engineering: 'from-cyan-500 to-blue-500',
  design: 'from-pink-500 to-rose-500',
  marketing: 'from-violet-500 to-purple-500',
  sales: 'from-teal-500 to-emerald-500',
  support: 'from-blue-500 to-teal-500',
  finance: 'from-emerald-500 to-green-500',
  hr: 'from-indigo-500 to-blue-500',
  operations: 'from-sky-500 to-blue-500',
  legal: 'from-stone-500 to-neutral-500',
  security: 'from-slate-500 to-gray-500',
  research: 'from-cyan-500 to-teal-500',
}

const DEPT_LABELS: Record<string, string> = {
  executive: 'Executive',
  engineering: 'Engineering',
  design: 'Design',
  marketing: 'Marketing',
  sales: 'Sales',
  support: 'Support',
  finance: 'Finance',
  hr: 'HR',
  operations: 'Operations',
  legal: 'Legal',
  security: 'Security',
  research: 'Research & Data',
}

const DEPT_ICONS: Record<string, string> = {
  executive: '👑',
  engineering: '⚡',
  design: '🎨',
  marketing: '📈',
  sales: '🤝',
  support: '🎧',
  finance: '💰',
  hr: '👥',
  operations: '📋',
  legal: '⚖️',
  security: '🛡️',
  research: '📊',
}

// ── Workflow pipeline steps ──
const WORKFLOW_PIPELINE: Array<{ label: string; dept: AgentDepartment; description: string; icon: string }> = [
  { label: 'Strategy', dept: 'executive', description: 'CEO, CTO, CFO set vision & goals', icon: '👑' },
  { label: 'Research', dept: 'research', description: 'Market analysis & data insights', icon: '📊' },
  { label: 'Design', dept: 'design', description: 'UI/UX & brand design', icon: '🎨' },
  { label: 'Engineering', dept: 'engineering', description: 'Dev, QA, DevOps build & test', icon: '⚡' },
  { label: 'Marketing', dept: 'marketing', description: 'SEO, content & campaigns', icon: '📈' },
  { label: 'Sales', dept: 'sales', description: 'Lead gen, proposals & closing', icon: '🤝' },
  { label: 'Support', dept: 'support', description: '24/7 client & ticket support', icon: '🎧' },
  { label: 'Legal', dept: 'legal', description: 'Contracts, compliance & privacy', icon: '⚖️' },
  { label: 'Finance', dept: 'finance', description: 'Invoicing, accounting & reporting', icon: '💰' },
  { label: 'Operations', dept: 'operations', description: 'Project mgmt & workflows', icon: '📋' },
]

export default function AgentsPage() {
  const [expandedDept, setExpandedDept] = useState<AgentDepartment | null>('engineering')
  const [activePipeline, setActivePipeline] = useState<number>(3)
  const stats = getAgentStats()

  const grouped = DEPT_ORDER.reduce((acc, dept) => {
    const agents = agentRegistry.filter(a => a.department === dept)
    if (agents.length) acc[dept] = agents
    return acc
  }, {} as Record<string, AgentDefinition[]>)

  return (
    <PageLayout>
      <PageHeader
        badge="AI Workforce"
        title="50+ AI Agents. 12 Departments. One Mission."
        subtitle={`${stats.total} active AI agents · ${stats.totalTasks.toLocaleString()} tasks completed · ${stats.avgEfficiency}% avg efficiency · 99.9% uptime`}
      />

      {/* ── Stats Overview ── */}
      <section className="section-padding bg-neutral-50 dark:bg-neutral-900">
        <div className="section-container">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 sm:p-6 text-center border border-neutral-200 dark:border-neutral-700">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-primary-600 dark:text-primary-400">{stats.total}</div>
              <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">Active Agents</div>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 sm:p-6 text-center border border-neutral-200 dark:border-neutral-700">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-primary-600 dark:text-primary-400">{stats.avgEfficiency}%</div>
              <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">Avg Efficiency</div>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 sm:p-6 text-center border border-neutral-200 dark:border-neutral-700">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-primary-600 dark:text-primary-400">{stats.totalTasks.toLocaleString()}</div>
              <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">Tasks Completed</div>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 sm:p-6 text-center border border-neutral-200 dark:border-neutral-700">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-primary-600 dark:text-primary-400">12</div>
              <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">Departments</div>
            </div>
          </div>

          {/* ── How It Works — Pipeline Diagram ── */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-heading font-bold mb-6 sm:mb-8 text-center dark:text-white">
              How Tasks Flow Through the <span className="text-primary-600 dark:text-primary-400">AI Workforce</span>
            </h2>

            {/* Pipeline steps — horizontal scroll on mobile, wrap on desktop */}
            <div className="relative">
              {/* Connecting line (desktop) */}
              <div className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500" style={{ zIndex: 0 }} />

              <div className="flex overflow-x-auto lg:flex-wrap lg:justify-center gap-3 sm:gap-4 pb-4 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-none snap-x">
                {WORKFLOW_PIPELINE.map((step, i) => (
                  <button
                    key={step.label}
                    onClick={() => setActivePipeline(i)}
                    className={`snap-start shrink-0 flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl border-2 transition-all min-w-[100px] sm:min-w-[120px] ${
                      activePipeline === i
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg shadow-primary-500/10'
                        : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-neutral-300'
                    }`}
                    style={{ position: 'relative', zIndex: 1 }}
                  >
                    <span className="text-2xl sm:text-3xl">{step.icon}</span>
                    <div className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white text-center leading-tight">{step.label}</div>
                    <div className="hidden sm:block text-[10px] text-neutral-500 text-center leading-tight">{step.description}</div>
                    {activePipeline === i && (
                      <div className="w-2 h-2 rounded-full bg-primary-500 mt-1" />
                    )}
                  </button>
                ))}
              </div>

              {/* Active step detail */}
              {activePipeline >= 0 && activePipeline < WORKFLOW_PIPELINE.length && (
                <AnimatedSection animation="fade-up" key={activePipeline}>
                  <div className="mt-6 sm:mt-8 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5 sm:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{WORKFLOW_PIPELINE[activePipeline].icon}</span>
                      <div>
                        <h3 className="font-heading font-bold text-lg sm:text-xl dark:text-white">{WORKFLOW_PIPELINE[activePipeline].label} Phase</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{WORKFLOW_PIPELINE[activePipeline].description}</p>
                      </div>
                    </div>

                    {/* Show agents in this phase */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {agentRegistry
                        .filter(a => a.department === WORKFLOW_PIPELINE[activePipeline].dept)
                        .map((agent) => (
                          <div key={agent.id} className="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-3 sm:p-4">
                            <span className="text-xl sm:text-2xl">{agent.emoji}</span>
                            <div className="min-w-0">
                              <div className="font-semibold text-sm dark:text-white truncate">{agent.name}</div>
                              <div className="text-xs text-neutral-500 truncate">{agent.role}</div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {agent.skills.slice(0, 2).map(s => (
                                  <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-600 text-neutral-600 dark:text-neutral-300">{s}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── All Agents by Department ── */}
      <section className="section-padding bg-white dark:bg-neutral-950">
        <div className="section-container">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-3 dark:text-white">
              Complete <span className="text-primary-600 dark:text-primary-400">Agent Directory</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">
              Every AI employee in the company. Click a department to expand.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            {DEPT_ORDER.filter(d => grouped[d]).map((dept) => {
              const agents = grouped[dept]
              const isOpen = expandedDept === dept
              const totalEff = agents.reduce((s, a) => s + a.efficiency, 0)
              const avgEff = Math.round(totalEff / agents.length)
              const totalTasks = agents.reduce((s, a) => s + a.tasksCompleted, 0)

              return (
                <div key={dept} className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden transition-all">
                  <button
                    onClick={() => setExpandedDept(isOpen ? null : dept)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-3 min-h-[60px]"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${DEPT_COLORS[dept]} flex items-center justify-center text-lg shrink-0`}>
                        {DEPT_ICONS[dept]}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base dark:text-white">{DEPT_LABELS[dept]}</h3>
                        <p className="text-xs text-neutral-500">
                          {agents.length} agent{agents.length !== 1 ? 's' : ''} · {totalTasks.toLocaleString()} tasks · {avgEff}% efficiency
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hidden sm:inline-flex items-center gap-1 text-xs text-neutral-400">
                        <CheckCircle2 size={12} className="text-emerald-400" />
                        {agents.filter(a => a.status === 'active').length} active
                      </span>
                      {isOpen ? <ChevronUp size={18} className="text-neutral-500" /> : <ChevronDown size={18} className="text-neutral-500" />}
                    </div>
                  </button>

                  <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 space-y-2 sm:space-y-3">
                      {agents.map((agent) => (
                        <div key={agent.id} className="flex items-center gap-3 sm:gap-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-3 sm:p-4">
                          <span className="text-xl sm:text-2xl">{agent.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-sm dark:text-white">{agent.name}</span>
                              <span className="text-[11px] text-neutral-500 bg-neutral-200 dark:bg-neutral-600 px-2 py-0.5 rounded-md">{agent.model}</span>
                              <span className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${
                                agent.status === 'active' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' :
                                agent.status === 'idle' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' :
                                'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                              }`}>{agent.status}</span>
                            </div>
                            <p className="text-xs text-neutral-500 mt-0.5">{agent.role} · {agent.description}</p>
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {agent.skills.map(s => (
                                <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-600 text-neutral-600 dark:text-neutral-300">{s}</span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right shrink-0 hidden sm:block">
                            <div className="text-lg font-heading font-bold text-primary-600 dark:text-primary-400">{agent.efficiency}%</div>
                            <div className="text-[10px] text-neutral-500">{agent.tasksCompleted.toLocaleString()} tasks</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Pre-built Workflows ── */}
      <section className="section-padding bg-neutral-50 dark:bg-neutral-900">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-3 dark:text-white">
                Autonomous <span className="text-primary-600 dark:text-primary-400">Workflows</span>
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">Pre-built multi-agent workflows that run autonomously.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Lead-to-Cash workflow */}
              <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">💼</span>
                  <h3 className="font-heading font-bold dark:text-white">Lead-to-Cash</h3>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">Convert a lead into a signed, paying client — 8 steps across 5 departments.</p>
                <div className="space-y-1.5">
                  {[
                    { step: 'Qualify Lead', dept: 'Sales' },
                    { step: 'Generate Proposal', dept: 'Sales' },
                    { step: 'Review Proposal', dept: 'Operations' },
                    { step: 'Send to Client', dept: 'Sales' },
                    { step: 'Follow Up', dept: 'Sales' },
                    { step: 'Generate Contract', dept: 'Legal' },
                    { step: 'Send Invoice', dept: 'Finance' },
                    { step: 'Onboard Client', dept: 'Operations' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm">
                      <span className="w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="flex-1 text-neutral-700 dark:text-neutral-300">{s.step}</span>
                      <span className="text-neutral-400 text-[10px]">{s.dept}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SaaS Launch workflow */}
              <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🚀</span>
                  <h3 className="font-heading font-bold dark:text-white">SaaS Launch</h3>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">End-to-end product launch — 10 steps across 5 departments.</p>
                <div className="space-y-1.5">
                  {[
                    { step: 'Market Research', dept: 'Research' },
                    { step: 'Design Architecture', dept: 'Engineering' },
                    { step: 'Design UI', dept: 'Design' },
                    { step: 'Build Product', dept: 'Engineering' },
                    { step: 'QA Testing', dept: 'Engineering' },
                    { step: 'SEO & Marketing', dept: 'Marketing' },
                    { step: 'Landing Page', dept: 'Design' },
                    { step: 'Deploy to Production', dept: 'Engineering' },
                    { step: 'Launch Campaign', dept: 'Marketing' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm">
                      <span className="w-5 h-5 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="flex-1 text-neutral-700 dark:text-neutral-300">{s.step}</span>
                      <span className="text-neutral-400 text-[10px]">{s.dept}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3 sm:mb-4">Want to See the Agents in Action?</h2>
          <p className="text-primary-200 text-base sm:text-lg mb-6 sm:mb-8">Head to the admin panel to monitor live agent activity and task execution.</p>
          <Link href="/admin" className="btn-white text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4">
            Open Admin Panel <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}
