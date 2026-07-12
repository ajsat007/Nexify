'use client'

import { useState, useEffect, useRef } from 'react'
import { Bot, Code2, FileText, MessageCircle, DollarSign, BarChart3, Users, CheckCircle2, Zap, Cpu, Activity } from 'lucide-react'

const agentNames = [
  { name: 'DevAgent-Alpha', icon: Code2, color: 'text-blue-400' },
  { name: 'DevAgent-Beta', icon: Code2, color: 'text-purple-400' },
  { name: 'DesignAgent-Gamma', icon: FileText, color: 'text-pink-400' },
  { name: 'QAAgent-Delta', icon: CheckCircle2, color: 'text-green-400' },
  { name: 'DevOpsAgent-Epsilon', icon: Cpu, color: 'text-orange-400' },
  { name: 'DataAgent-Zeta', icon: BarChart3, color: 'text-cyan-400' },
  { name: 'SalesAgent-Mu', icon: DollarSign, color: 'text-emerald-400' },
  { name: 'BotAgent-Kappa', icon: MessageCircle, color: 'text-violet-400' },
]

const actions = [
  'Reviewed PR #247 — no issues found',
  'Deployed hotfix to production (100% success)',
  'Generated Sprint 4 report for client',
  'Analyzed 1,245 log entries — 0 anomalies',
  'Responded to 3 support tickets (avg 4.2 min)',
  'Completed code review for auth service',
  'Optimized database query — 60% faster',
  'Sent proposal to GreenEnergy Corp',
  'Updated 12 dashboard widgets with live data',
  'Resolved 2 customer issues via WhatsApp',
  'Wrote 42 unit tests — all passing',
  'Generated monthly financial report',
  'Deployed staging environment for new feature',
  'Auto-scaled infrastructure (+2 nodes)',
  'Processed 5 invoices for clients',
  'Created 3 new knowledge base articles',
  'Updated project timelines for 2 active sprints',
  'Ran security scan — 0 vulnerabilities',
  'Generated 15 API endpoints documentation',
  'Optimized RAG pipeline — latency reduced 35%',
]

export default function ActivityFeed({ compact = false, title = 'Agent Activity Feed' }: { compact?: boolean; title?: string }) {
  const [activities, setActivities] = useState<{ id: number; agent: typeof agentNames[0]; action: string; time: string }[]>([])
  const idRef = useRef(0)

  useEffect(() => {
    // Initial batch
    const initial = Array.from({ length: compact ? 5 : 10 }, (_, i) => ({
      id: idRef.current++,
      agent: agentNames[Math.floor(Math.random() * agentNames.length)],
      action: actions[Math.floor(Math.random() * actions.length)],
      time: `${Math.floor(Math.random() * 10 + 1)}m ago`,
    }))
    setActivities(initial)

    // New activity every 3-6 seconds
    const interval = setInterval(() => {
      const newActivity = {
        id: idRef.current++,
        agent: agentNames[Math.floor(Math.random() * agentNames.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        time: 'Just now',
      }
      setActivities(prev => [newActivity, ...prev].slice(0, compact ? 20 : 50))
    }, 3000 + Math.random() * 3000)

    return () => clearInterval(interval)
  }, [compact])

  return (
    <div className={`bg-white rounded-2xl border border-neutral-200 overflow-hidden ${compact ? '' : 'shadow-xl'}`}>
      <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary-500" />
          <h3 className="font-semibold text-sm">{title}</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-success">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Live
        </div>
      </div>
      <div className={`${compact ? 'h-72' : 'h-96'} overflow-y-auto p-3 space-y-1.5`}>
        {activities.map(a => {
          const Icon = a.agent.icon
          return (
            <div key={a.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-all animate-slide-down">
              <div className={`w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 ${a.agent.color}`}>
                <Icon size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs">
                  <span className="font-medium text-neutral-900">{a.agent.name}</span>
                  <span className="text-neutral-500"> {a.action}</span>
                </div>
                <span className="text-[10px] text-neutral-400">{a.time}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
