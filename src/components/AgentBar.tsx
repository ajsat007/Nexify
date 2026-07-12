'use client'

import { useEffect, useState } from 'react'
import { Cpu } from 'lucide-react'

const agentList = [
  { id: 'dev-alpha', name: 'Dev-Alpha', short: 'DA', role: 'Full-Stack' },
  { id: 'dev-beta', name: 'Dev-Beta', short: 'DB', role: 'Backend' },
  { id: 'design', name: 'Design', short: 'DG', role: 'UI/UX' },
  { id: 'qa', name: 'QA-Delta', short: 'QD', role: 'Testing' },
  { id: 'devops', name: 'DevOps', short: 'DE', role: 'Infra' },
  { id: 'data', name: 'Data', short: 'DZ', role: 'Analytics' },
  { id: 'mobile', name: 'Mobile', short: 'ME', role: 'Mobile' },
  { id: 'ai', name: 'AI-Theta', short: 'AT', role: 'ML' },
  { id: 'security', name: 'Security', short: 'SI', role: 'SecOps' },
  { id: 'sales', name: 'Sales', short: 'SM', role: 'CRM' },
]

export default function AgentBar() {
  const [agentStatuses, setAgentStatuses] = useState<Record<string, 'online' | 'busy' | 'idle'>>({})

  useEffect(() => {
    // Initialize all as online
    const initial: Record<string, 'online' | 'busy' | 'idle'> = {}
    agentList.forEach(a => { initial[a.id] = 'online' })
    setAgentStatuses(initial)

    // Simulate random status changes
    const interval = setInterval(() => {
      setAgentStatuses(prev => {
        const next = { ...prev }
        const randomAgent = agentList[Math.floor(Math.random() * agentList.length)]
        const statuses: ('online' | 'busy' | 'idle')[] = ['online', 'online', 'online', 'busy', 'idle']
        next[randomAgent.id] = statuses[Math.floor(Math.random() * statuses.length)]
        return next
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const online = Object.values(agentStatuses).filter(s => s === 'online').length
  const busy = Object.values(agentStatuses).filter(s => s === 'busy').length
  const idle = Object.values(agentStatuses).filter(s => s === 'idle').length

  const statusColor = (status?: string) => {
    if (status === 'online') return 'bg-success'
    if (status === 'busy') return 'bg-warning'
    return 'bg-neutral-400'
  }

  return (
    <div className="bg-neutral-900 border-b border-neutral-800 overflow-x-auto">
      <div className="section-container">
        <div className="flex items-center gap-4 py-2 text-xs">
          <div className="flex items-center gap-1.5 text-neutral-400 shrink-0 mr-1">
            <Cpu size={12} className="text-primary-400" />
            <span className="font-medium text-neutral-300">AI Fleet</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 shrink-0">
            <span className="text-success">{online} online</span>
            {busy > 0 && <><span className="text-warning">·</span><span className="text-warning">{busy} busy</span></>}
            {idle > 0 && <><span className="text-neutral-400">·</span><span className="text-neutral-400">{idle} idle</span></>}
          </div>
          <div className="flex items-center gap-2">
            {agentList.map(a => (
              <div key={a.id} className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-neutral-800/50 hover:bg-neutral-800 transition-all cursor-default shrink-0" title={`${a.name} (${a.role}) — ${agentStatuses[a.id] || 'unknown'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusColor(agentStatuses[a.id])} ${agentStatuses[a.id] === 'online' ? 'animate-pulse' : ''}`} />
                <span className="text-neutral-300 font-medium text-[10px]">{a.short}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
