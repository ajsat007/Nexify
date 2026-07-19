'use client'

import { useState, useEffect, useRef } from 'react'
import { Bot, Code2, FileText, MessageCircle, DollarSign, BarChart3, Users, CheckCircle2, Zap, Cpu, Activity } from 'lucide-react'
import { cn } from '@/utils'

// Real agent metadata matching the primary registry
const agentMeta: Record<string, { name: string; icon: any; color: string; emoji: string }> = {
  'agent-ceo': { name: 'CEO-Omega', icon: Users, color: 'text-amber-400', emoji: '👑' },
  'agent-cto': { name: 'CTO-Nova', icon: Cpu, color: 'text-blue-400', emoji: '🔬' },
  'agent-cfo': { name: 'CFO-Sage', icon: DollarSign, color: 'text-emerald-400', emoji: '💰' },
  'agent-dev-alpha': { name: 'Dev-Alpha', icon: Code2, color: 'text-cyan-400', emoji: '⚡' },
  'agent-dev-beta': { name: 'Dev-Beta', icon: Code2, color: 'text-sky-400', emoji: '⚙️' },
  'agent-mobile': { name: 'Mobile-Eta', icon: Code2, color: 'text-purple-400', emoji: '📱' },
  'agent-devops': { name: 'DevOps-Epsilon', icon: Cpu, color: 'text-orange-400', emoji: '🔧' },
  'agent-qa': { name: 'QA-Delta', icon: CheckCircle2, color: 'text-green-400', emoji: '✅' },
  'agent-designer': { name: 'Design-Gamma', icon: FileText, color: 'text-pink-400', emoji: '🎨' },
  'agent-marketing': { name: 'Marketing-Mu', icon: BarChart3, color: 'text-violet-400', emoji: '📈' },
  'agent-sales': { name: 'Sales-Mu', icon: DollarSign, color: 'text-teal-400', emoji: '🤝' },
  'agent-support': { name: 'Support-Kappa', icon: MessageCircle, color: 'text-blue-400', emoji: '🎧' },
  'agent-data': { name: 'Data-Zeta', icon: BarChart3, color: 'text-cyan-400', emoji: '📊' },
  'agent-security': { name: 'Security-Iota', icon: Shield, color: 'text-slate-400', emoji: '🛡️' },
  'agent-legal': { name: 'Legal-Lambda', icon: FileText, color: 'text-stone-400', emoji: '⚖️' },
  'agent-ops': { name: 'Ops-Omega', icon: Zap, color: 'text-sky-400', emoji: '📋' },
}

import { Shield } from 'lucide-react'

const actionTemplates = [
  'Reviewed PR — merged',
  'Deployed to production',
  'Generated sprint report',
  'Analyzed logs — 0 anomalies',
  'Resolved support ticket',
  'Completed code review',
  'Optimized query — 60% faster',
  'Sent proposal to client',
  'Updated dashboard widgets',
  'Wrote unit tests — all passing',
  'Generated financial report',
  'Deployed staging environment',
  'Auto-scaled infrastructure',
  'Processed invoices',
  'Created knowledge base articles',
  'Updated project timelines',
  'Ran security scan — 0 vulnerabilities',
  'Generated API documentation',
  'Optimized pipeline — latency reduced',
  'Completed client onboarding',
]

function randomAction(): string {
  return actionTemplates[Math.floor(Math.random() * actionTemplates.length)]
}

function randomAgentId(): string {
  const ids = Object.keys(agentMeta)
  return ids[Math.floor(Math.random() * ids.length)]
}

function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins === 1) return '1m ago'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours === 1) return '1h ago'
  return `${hours}h ago`
}

export default function ActivityFeed({ compact = false, title = 'Agent Activity Feed' }: { compact?: boolean; title?: string }) {
  const idRef = useRef(0)
  // Pre-populate immediately — no empty state flash
  const [activities, setActivities] = useState<{ id: number; agentId: string; action: string; time: Date }[]>(
    () => Array.from({ length: compact ? 5 : 10 }, () => ({
      id: idRef.current++,
      agentId: randomAgentId(),
      action: randomAction(),
      time: new Date(Date.now() - Math.random() * 3600000),
    }))
  )

  useEffect(() => {

    // New activity every 4-8 seconds (simulating agent task completion)
    const interval = setInterval(() => {
      const newActivity = {
        id: idRef.current++,
        agentId: randomAgentId(),
        action: randomAction(),
        time: new Date(),
      }
      setActivities(prev => [newActivity, ...prev].slice(0, compact ? 20 : 50))
    }, 4000 + Math.random() * 4000)

    return () => clearInterval(interval)
  }, [compact])

  return (
    <div className={cn(
      'bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden',
      !compact && 'shadow-xl'
    )}>
      <div className="p-4 border-b border-neutral-100 dark:border-neutral-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary-500" />
          <h3 className="font-semibold text-sm dark:text-white">{title}</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live ({activities.length} events)
        </div>
      </div>
      <div className={cn('overflow-y-auto p-3 space-y-1', compact ? 'h-72' : 'h-96')}>
        {activities.map(a => {
          const meta = agentMeta[a.agentId]
          const Icon = meta?.icon || Bot
          return (
            <div key={a.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-all animate-slide-down">
              <div className={cn(
                'w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center shrink-0 text-xs',
                meta?.color
              )}>
                <span>{meta?.emoji || '🤖'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs">
                  <span className="font-medium text-neutral-900 dark:text-white">{meta?.name || 'AI Agent'}</span>
                  <span className="text-neutral-500 dark:text-neutral-400"> {a.action}</span>
                </div>
                <span className="text-[10px] text-neutral-400">{timeAgo(a.time)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
