import { NextResponse } from 'next/server'
import { agents } from '@/lib/ai/agents/registry'
import { getQueueStatus } from '@/lib/ai/orchestrator'
import { getWorkflows } from '@/workflows'

export const dynamic = 'force-dynamic'

export async function GET() {
  const queue = getQueueStatus()
  const workflows = getWorkflows()

  return NextResponse.json({
    agents: agents.map(a => ({
      id: a.id, name: a.name, title: a.title, department: a.department, status: a.status, capabilities: a.capabilities,
    })),
    departments: agents.reduce((acc: string[], a) => acc.includes(a.department) ? acc : [...acc, a.department], [] as string[]),
    counts: {
      total: agents.length,
      byDepartment: agents.reduce((acc: Record<string, number>, a) => { acc[a.department] = (acc[a.department] || 0) + 1; return acc }, {} as Record<string, number>),
      byStatus: {
        active: agents.filter(a => a.status === 'active').length,
        idle: agents.filter(a => a.status === 'idle').length,
        training: agents.filter(a => a.status === 'training').length,
      },
    },
    queue,
    workflows: workflows.map(w => ({ id: w.id, name: w.name, status: w.status, steps: w.steps.length, createdAt: w.createdAt })),
  })
}
