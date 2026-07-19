'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, Cpu, Zap, Shield, TrendingUp, Users, Star, Activity, CheckCircle2, ChevronDown, ChevronUp, Play, RefreshCw, Loader } from 'lucide-react'
import { agentRegistry, getAgentStats, type AgentDepartment, type AgentDefinition } from '@/agents/registry'
import { PageLayout, PageHeader } from '@/components/PageLayout'
import { AnimatedSection } from '@/components/ScrollAnimations'

// ── Department configuration ──
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
  executive: 'Executive', engineering: 'Engineering', design: 'Design',
  marketing: 'Marketing', sales: 'Sales', support: 'Support',
  finance: 'Finance', hr: 'HR', operations: 'Operations',
  legal: 'Legal', security: 'Security', research: 'Research & Data',
}

const DEPT_ICONS: Record<string, string> = {
  executive: '👑', engineering: '⚡', design: '🎨', marketing: '📈',
  sales: '🤝', support: '🎧', finance: '💰', hr: '👥',
  operations: '📋', legal: '⚖️', security: '🛡️', research: '📊',
}

// ── Workflow pipeline stages ──
const WORKFLOW_PIPELINE: Array<{
  phase: number
  label: string
  dept: AgentDepartment
  description: string
  icon: string
  steps: string[]
}> = [
  { phase: 0, label: 'Strategy', dept: 'executive', description: 'CEO, CTO, CFO set vision, approve budgets, define goals', icon: '👑', steps: ['Set company OKRs', 'Approve project budget', 'Define technical strategy', 'Review department plans'] },
  { phase: 1, label: 'Research', dept: 'research', description: 'Market analysis, competitor research, data insights', icon: '📊', steps: ['Analyze market trends', 'Research competitors', 'Data pipeline setup', 'Generate insights report'] },
  { phase: 2, label: 'Design', dept: 'design', description: 'UI/UX, brand identity, design system creation', icon: '🎨', steps: ['User research', 'Wireframe & prototype', 'Visual design', 'Design system handoff'] },
  { phase: 3, label: 'Engineering', dept: 'engineering', description: 'Full-stack dev, QA, DevOps — build & ship', icon: '⚡', steps: ['Architecture design', 'Frontend build', 'Backend & API', 'QA testing', 'CI/CD deploy'] },
  { phase: 4, label: 'Marketing', dept: 'marketing', description: 'SEO, content, social media campaigns', icon: '📈', steps: ['SEO optimization', 'Blog & case studies', 'Social media campaign', 'Email marketing'] },
  { phase: 5, label: 'Sales', dept: 'sales', description: 'Lead gen, proposals, pipeline management', icon: '🤝', steps: ['Lead qualification', 'Proposal generation', 'Follow-ups', 'Contract signing'] },
  { phase: 6, label: 'Support', dept: 'support', description: '24/7 ticket resolution, knowledge base', icon: '🎧', steps: ['Ticket triage', 'Issue resolution', 'KB article creation', 'SLA monitoring'] },
  { phase: 7, label: 'Legal', dept: 'legal', description: 'Contracts, compliance, privacy, risk', icon: '⚖️', steps: ['Contract review', 'Privacy policy', 'Compliance check', 'Risk assessment'] },
  { phase: 8, label: 'Finance', dept: 'finance', description: 'Invoicing, accounting, P&L', icon: '💰', steps: ['Invoice generation', 'Payment tracking', 'P&L reporting', 'Budget variance'] },
  { phase: 9, label: 'Operations', dept: 'operations', description: 'Project mgmt, automation, documentation', icon: '📋', steps: ['Sprint planning', 'Task coordination', 'Status reporting', 'Doc generation'] },
]

// ── Workflow connections (which phase feeds into which) ──
const WORKFLOW_EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [3, 5],
  [5, 6], [5, 7], [5, 8], [4, 6], [7, 8], [8, 9], [6, 9],
]

export default function AgentsPage() {
  const [expandedDept, setExpandedDept] = useState<AgentDepartment | null>('engineering')
  const [activePhase, setActivePhase] = useState<number>(3)
  const [showFlow, setShowFlow] = useState(false)
  const [runningStep, setRunningStep] = useState<number | null>(null)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const stats = getAgentStats()

  const grouped = DEPT_ORDER.reduce((acc, dept) => {
    const agents = agentRegistry.filter(a => a.department === dept)
    if (agents.length) acc[dept] = agents
    return acc
  }, {} as Record<string, AgentDefinition[]>)

  // Simulate workflow execution
  const runWorkflow = useCallback(async () => {
    setShowFlow(true)
    setCompletedSteps(new Set())
    for (let i = 0; i < WORKFLOW_PIPELINE.length; i++) {
      setRunningStep(i)
      await new Promise(r => setTimeout(r, 800 + Math.random() * 600))
      setCompletedSteps(prev => new Set(prev).add(i))
    }
    setRunningStep(null)
  }, [])

  const resetWorkflow = () => {
    setShowFlow(false)
    setRunningStep(null)
    setCompletedSteps(new Set())
  }

  return (
    <PageLayout>
      <PageHeader
        badge="AI Workforce"
        title="50+ AI Agents. 12 Departments. One Mission."
        subtitle={`${stats.total} active AI agents · ${stats.totalTasks.toLocaleString()} tasks completed · ${stats.avgEfficiency}% avg efficiency · 99.9% uptime`}
      >
        <div className="flex flex-wrap gap-3 mt-6">
          <button onClick={runWorkflow} disabled={runningStep !== null} className="btn-white text-sm">
            {runningStep !== null ? <><Loader size={16} className="animate-spin" /> Running...</> : <><Play size={16} /> Simulate Workflow</>}
          </button>
          {showFlow && (
            <button onClick={resetWorkflow} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/30 text-white text-sm hover:bg-white/10 transition-all">
              <RefreshCw size={14} /> Reset
            </button>
          )}
        </div>
      </PageHeader>

      {/* ── Stats Overview ── */}
      <section className="section-padding bg-neutral-50 dark:bg-neutral-900">
        <div className="section-container">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12">
            {[
              { label: 'Active Agents', value: stats.total, color: 'text-primary-600' },
              { label: 'Avg Efficiency', value: `${stats.avgEfficiency}%`, color: 'text-emerald-500' },
              { label: 'Tasks Completed', value: stats.totalTasks.toLocaleString(), color: 'text-primary-600' },
              { label: 'Departments', value: '12', color: 'text-accent-500' },
            ].map(s => (
              <div key={s.label} className="bg-white dark:bg-neutral-800 rounded-2xl p-5 sm:p-6 text-center border border-neutral-200 dark:border-neutral-700">
                <div className={`text-3xl sm:text-4xl font-heading font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* ── Interactive Pipeline Diagram ── */}
          <div className="max-w-5xl mx-auto" id="pipeline">
            <h2 className="text-xl sm:text-2xl font-heading font-bold mb-6 sm:mb-8 text-center dark:text-white">
              How Tasks Flow Through the <span className="text-primary-600 dark:text-primary-400">AI Workforce</span>
            </h2>

            {/* Phase grid with connections */}
            <div className="relative">
              {/* Scrollable phase row */}
              <div className="flex overflow-x-auto lg:flex-wrap lg:justify-center gap-2 sm:gap-3 pb-4 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-none snap-x">
                {WORKFLOW_PIPELINE.map((phase) => {
                  const isActive = activePhase === phase.phase
                  const isCompleted = completedSteps.has(phase.phase)
                  const isRunning = runningStep === phase.phase

                  return (
                    <button
                      key={phase.label}
                      onClick={() => setActivePhase(phase.phase)}
                      className={`snap-start shrink-0 flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-2xl border-2 transition-all duration-500 min-w-[90px] sm:min-w-[110px] ${
                        isRunning ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 animate-pulse shadow-lg shadow-cyan-500/20 scale-105' :
                        isCompleted ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-md' :
                        isActive ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg shadow-primary-500/10' :
                        'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-neutral-300'
                      }`}
                      style={{ position: 'relative', zIndex: 1 }}
                    >
                      {/* Status ring */}
                      <div className="relative">
                        <span className="text-2xl sm:text-3xl">{phase.icon}</span>
                        {isCompleted && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                            <CheckCircle2 size={10} />
                          </span>
                        )}
                        {isRunning && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 animate-ping" />
                        )}
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white text-center leading-tight">{phase.label}</div>
                      <div className="hidden sm:block text-xs text-neutral-500 text-center leading-tight max-w-[80px]">{phase.description.slice(0, 50)}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Active phase detail panel */}
            {activePhase >= 0 && activePhase < WORKFLOW_PIPELINE.length && (
              <AnimatedSection animation="fade-up" key={activePhase}>
                <div className="mt-6 sm:mt-8 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5 sm:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${DEPT_COLORS[WORKFLOW_PIPELINE[activePhase].dept]} flex items-center justify-center text-2xl shrink-0`}>
                      {WORKFLOW_PIPELINE[activePhase].icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-heading font-bold text-xl dark:text-white">{WORKFLOW_PIPELINE[activePhase].label} Phase</h3>
                        <span className="chip bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-xs">
                          Phase {activePhase + 1} of {WORKFLOW_PIPELINE.length}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">{WORKFLOW_PIPELINE[activePhase].description}</p>
                    </div>
                  </div>

                  {/* Steps within this phase */}
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">Steps</h4>
                    <div className="flex flex-wrap gap-2">
                      {WORKFLOW_PIPELINE[activePhase].steps.map((step, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-700/60 text-neutral-700 dark:text-neutral-300 text-xs font-medium">
                          <CheckCircle2 size={11} className="text-primary-500" />
                          {step}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Agents assigned to this phase */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                      AI Agents — {WORKFLOW_PIPELINE[activePhase].dept} department
                    </h4>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {agentRegistry
                        .filter(a => a.department === WORKFLOW_PIPELINE[activePhase].dept)
                        .map((agent) => (
                          <div key={agent.id} className="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-3 sm:p-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all">
                            <span className="text-2xl shrink-0">{agent.emoji}</span>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-sm dark:text-white">{agent.name}</span>
                                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                                  agent.status === 'active' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                  'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                                }`}>{agent.status}</span>
                              </div>
                              <p className="text-xs text-neutral-500 truncate">{agent.role}</p>
                              <div className="flex gap-1 mt-1">
                                {agent.skills.slice(0, 3).map(s => (
                                  <span key={s} className="text-xs px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-600 text-neutral-600 dark:text-neutral-300 truncate">{s}</span>
                                ))}
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="text-sm font-bold text-primary-600 dark:text-primary-400">{agent.efficiency}%</div>
                              <div className="text-xs text-neutral-500">{agent.tasksCompleted}k tasks</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Connection arrows — what happens after this phase */}
                  {(() => {
                    const nextEdges = WORKFLOW_EDGES.filter(e => e[0] === activePhase)
                    if (nextEdges.length === 0) return null
                    return (
                      <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-700">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">Feeds into</h4>
                        <div className="flex flex-wrap gap-2">
                          {nextEdges.map(([from, to]) => (
                            <button
                              key={to}
                              onClick={() => setActivePhase(to)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs font-medium hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all"
                            >
                              <ArrowRight size={11} />
                              {WORKFLOW_PIPELINE[to]?.icon} {WORKFLOW_PIPELINE[to]?.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  })()}
                </div>
              </AnimatedSection>
            )}

            {/* Workflow animation visualization */}
            {showFlow && runningStep !== null && (
              <div className="mt-8 bg-neutral-900 rounded-2xl p-5 sm:p-6 border border-neutral-700">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <h3 className="text-white font-semibold text-sm">Live Workflow Execution</h3>
                  <span className="text-xs text-neutral-500 ml-auto">
                    Step {runningStep + 1} of {WORKFLOW_PIPELINE.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {WORKFLOW_PIPELINE.map((phase, i) => (
                    <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-500 ${
                      completedSteps.has(i) ? 'bg-emerald-900/20 text-emerald-300' :
                      i === runningStep ? 'bg-cyan-900/20 text-cyan-300 animate-pulse' :
                      i < runningStep ? 'bg-neutral-800 text-neutral-400' :
                      'bg-neutral-800/50 text-neutral-600'
                    }`}>
                      <span className="text-lg">{phase.icon}</span>
                      <span className="flex-1 text-sm">{phase.label}</span>
                      <span className="text-xs">
                        {completedSteps.has(i) ? '✅ Done' :
                         i === runningStep ? '⏳ Running...' :
                         i < runningStep ? '✓ Complete' :
                         '⏸️ Waiting'}
                      </span>
                      {/* Progress bar */}
                      <div className="w-24 h-1.5 rounded-full bg-neutral-700 overflow-hidden hidden sm:block">
                        <div className={`h-full rounded-full transition-all duration-700 ${
                          completedSteps.has(i) ? 'w-full bg-emerald-400' :
                          i === runningStep ? 'w-1/2 bg-cyan-400' :
                          'w-0'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
                {completedSteps.size === WORKFLOW_PIPELINE.length && (
                  <div className="mt-4 text-center py-3 px-4 rounded-xl bg-emerald-900/20 border border-emerald-700/30">
                    <p className="text-emerald-300 font-semibold text-sm">🎉 Workflow Complete — All {WORKFLOW_PIPELINE.length} phases executed! An AI agent responded at every stage.</p>
                  </div>
                )}
              </div>
            )}
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
              Every AI employee. Click a department to expand and see details.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            {DEPT_ORDER.filter(d => grouped[d]).map((dept) => {
              const agents = grouped[dept]
              const isOpen = expandedDept === dept
              const totalEff = Math.round(agents.reduce((s, a) => s + a.efficiency, 0) / agents.length)
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
                          {agents.length} agent{agents.length !== 1 ? 's' : ''} · {totalTasks.toLocaleString()} tasks · {totalEff}% efficiency
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hidden sm:flex items-center gap-1 text-xs text-neutral-400">
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
                          <span className="text-2xl shrink-0">{agent.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-sm dark:text-white">{agent.name}</span>
                              <span className="text-xs text-neutral-500 bg-neutral-200 dark:bg-neutral-600 px-1.5 py-0.5 rounded">{agent.model}</span>
                              <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                                agent.status === 'active' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                'bg-amber-100 text-amber-600'
                              }`}>{agent.status}</span>
                            </div>
                            <p className="text-xs text-neutral-500 mt-0.5 leading-snug">{agent.role} · {agent.description}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {agent.skills.map(s => (
                                <span key={s} className="text-xs px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-600 text-neutral-600 dark:text-neutral-300">{s}</span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-base sm:text-lg font-heading font-bold text-primary-600 dark:text-primary-400">{agent.efficiency}%</div>
                            <div className="text-xs text-neutral-500">{agent.tasksCompleted.toLocaleString()} tasks</div>
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

      {/* ── Pre-built Autonomous Workflows ── */}
      <section className="section-padding bg-neutral-50 dark:bg-neutral-900">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-3 dark:text-white">
                Autonomous <span className="text-primary-600 dark:text-primary-400">Workflows</span>
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">
                Pre-built multi-agent workflows. Click to see the execution path through all departments.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5 sm:p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">💼</span>
                  <div>
                    <h3 className="font-heading font-bold dark:text-white">Lead-to-Cash</h3>
                    <p className="text-xs text-neutral-500">8 steps · 5 departments</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {[
                    { step: '1. Qualify Lead', dept: '🤝 Sales', deptRef: 'sales' },
                    { step: '2. Generate Proposal', dept: '🤝 Sales', deptRef: 'sales' },
                    { step: '3. Review Proposal', dept: '📋 Ops', deptRef: 'operations' },
                    { step: '4. Send to Client', dept: '🤝 Sales', deptRef: 'sales' },
                    { step: '5. Follow Up', dept: '🤝 Sales', deptRef: 'sales' },
                    { step: '6. Generate Contract', dept: '⚖️ Legal', deptRef: 'legal' },
                    { step: '7. Send Invoice', dept: '💰 Finance', deptRef: 'finance' },
                    { step: '8. Onboard Client', dept: '📋 Ops', deptRef: 'operations' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-2 py-1.5">
                      <span className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="flex-1 text-sm text-neutral-700 dark:text-neutral-300">{s.step}</span>
                      <button
                        onClick={() => {
                          const phase = WORKFLOW_PIPELINE.findIndex(p => p.dept === s.deptRef)
                          if (phase >= 0) setActivePhase(phase)
                          document.getElementById('pipeline')?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className="text-xs text-neutral-400 hover:text-primary-500 transition-colors px-2 py-0.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      >
                        {s.dept}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5 sm:p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <h3 className="font-heading font-bold dark:text-white">SaaS Launch</h3>
                    <p className="text-xs text-neutral-500">10 steps · 6 departments</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {[
                    { step: '1. Market Research', dept: '📊 Research', deptRef: 'research' },
                    { step: '2. Competitor Analysis', dept: '📊 Research', deptRef: 'research' },
                    { step: '3. Design Architecture', dept: '⚡ Engineering', deptRef: 'engineering' },
                    { step: '4. Design UI', dept: '🎨 Design', deptRef: 'design' },
                    { step: '5. Build Product', dept: '⚡ Engineering', deptRef: 'engineering' },
                    { step: '6. QA Testing', dept: '⚡ Engineering', deptRef: 'engineering' },
                    { step: '7. SEO & Content', dept: '📈 Marketing', deptRef: 'marketing' },
                    { step: '8. Landing Page', dept: '🎨 Design', deptRef: 'design' },
                    { step: '9. Deploy', dept: '⚡ Engineering', deptRef: 'engineering' },
                    { step: '10. Launch Campaign', dept: '📈 Marketing', deptRef: 'marketing' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-2 py-1.5">
                      <span className="w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="flex-1 text-sm text-neutral-700 dark:text-neutral-300">{s.step}</span>
                      <button
                        onClick={() => {
                          const phase = WORKFLOW_PIPELINE.findIndex(p => p.dept === s.deptRef)
                          if (phase >= 0) setActivePhase(phase)
                        }}
                        className="text-xs text-neutral-400 hover:text-accent-500 transition-colors px-2 py-0.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      >
                        {s.dept}
                      </button>
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
          <p className="text-primary-200 text-base sm:text-lg mb-6 sm:mb-8">Head to the admin panel to monitor live agent activity and task execution. Or try the chat widget!</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/admin" className="btn-white text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4">
              Open Admin Panel <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-medium border border-white/30 text-white hover:bg-white hover:text-neutral-900 transition-all text-sm">
              Get a Proposal
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
