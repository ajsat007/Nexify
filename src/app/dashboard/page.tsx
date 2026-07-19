'use client'

import { useState, useEffect } from 'react'
import { Bot, HardDrive, ListOrdered, GitBranch, Activity, Zap, Users, Shield, DollarSign, Headphones, Palette, BarChart3, Briefcase, Settings, BookOpen } from 'lucide-react'

const iconMap: Record<string, any> = { Bot, HardDrive, ListOrdered, GitBranch, Activity, Zap, Users, Shield, DollarSign, Headphones, Palette, BarChart3, Briefcase, Settings, BookOpen }

export default function DashboardPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/agents').then(r => r.json()).then(d => { setData(d); setLoading(false) })
  }, [])

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full" /></div>

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-24">
      <div className="section-container py-8">
        <div className="flex items-center gap-3 mb-8">
          <Bot className="w-8 h-8 text-primary-400" />
          <div><h1 className="text-2xl font-heading font-bold">AI Operations Dashboard</h1><p className="text-neutral-400 text-sm">{data.counts.total} AI Employees · {data.counts.byStatus.active} Active</p></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Agents', value: data.counts.total, icon: Users, color: 'text-blue-400' },
            { label: 'Active Now', value: data.counts.byStatus.active, icon: Activity, color: 'text-green-400' },
            { label: 'Pending Tasks', value: data.queue.pending, icon: ListOrdered, color: 'text-amber-400' },
            { label: 'Completed', value: data.queue.completed, icon: HardDrive, color: 'text-purple-400' },
          ].map(s => {
            const Icon = s.icon
            return <div key={s.label} className="bg-neutral-800/50 border border-neutral-700 rounded-2xl p-5"><div className="flex items-center justify-between mb-2"><Icon className={`w-5 h-5 ${s.color}`} /><span className="text-2xl font-heading font-bold">{s.value}</span></div><div className="text-neutral-400 text-sm">{s.label}</div></div>
          })}
        </div>

        {/* Departments */}
        <h2 className="text-lg font-heading font-bold mb-4">Departments</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
          {Object.entries(data.counts.byDepartment).map(([dept, count]) => (
            <div key={dept} className="bg-neutral-800/30 border border-neutral-700/50 rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="text-sm capitalize text-neutral-300">{dept}</span>
              <span className="text-sm font-bold text-primary-400">{count as number}</span>
            </div>
          ))}
        </div>

        {/* Agent Cards */}
        <h2 className="text-lg font-heading font-bold mb-4">All Agents</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.agents.map((agent: any) => (
            <div key={agent.id} className="bg-neutral-800/30 border border-neutral-700/50 rounded-2xl p-4 hover:border-primary-500/30 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{agent.name}</div>
                  <div className="text-xs text-neutral-500">{agent.department} · {agent.status}</div>
                </div>
              </div>
              <p className="text-xs text-neutral-400 mb-2 line-clamp-2">{agent.title}</p>
              <div className="flex flex-wrap gap-1">
                {agent.capabilities.slice(0, 3).map((c: string) => (
                  <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-neutral-700/50 text-neutral-300">{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Workflows */}
        {data.workflows.length > 0 && (
          <>
            <h2 className="text-lg font-heading font-bold mt-8 mb-4">Active Workflows</h2>
            <div className="space-y-3">
              {data.workflows.map((wf: any) => (
                <div key={wf.id} className="bg-neutral-800/30 border border-neutral-700/50 rounded-xl px-5 py-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{wf.name}</div>
                    <div className="text-xs text-neutral-400">{wf.steps} steps · {new Date(wf.createdAt).toLocaleString()}</div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ${wf.status === 'running' ? 'bg-green-500/20 text-green-400' : wf.status === 'completed' ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400'}`}>{wf.status}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
