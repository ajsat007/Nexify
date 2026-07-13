import { NextResponse } from 'next/server'
import { agentRegistry, getAgentStats } from '@/agents/registry'
import { createTask, executeTask, getAllTasks } from '@/agents/engine'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    agents: agentRegistry,
    stats: getAgentStats(),
    tasks: getAllTasks().slice(-20),
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, agentId, task } = body

    if (action === 'assign' && agentId && task) {
      const created = createTask({
        title: task.title,
        description: task.description || task.title,
        assignedTo: agentId,
        priority: task.priority,
        input: task.input,
      })
      return NextResponse.json({ task: created, status: 'assigned' })
    }

    if (action === 'execute' && task?.id) {
      const result = await executeTask(task.id)
      return NextResponse.json({ task: result })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
