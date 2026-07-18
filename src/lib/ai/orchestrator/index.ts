// ============================================================================
// AI Orchestrator — Routes tasks to the right AI agents
// Uses the primary agent registry from @/agents/registry
// Routes execution through @/agents/engine which calls the AI provider
// ============================================================================

import { agentRegistry, type AgentDepartment } from '@/agents/registry'
import { createTask, executeTask, getAllTasks } from '@/agents/engine'

export interface WorkflowTask {
  id: string
  type: string
  description: string
  department: AgentDepartment
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'pending' | 'assigned' | 'in_progress' | 'review' | 'completed' | 'failed'
  assignedTo?: string
  result?: string
  createdAt: number
  completedAt?: number
  dependsOn?: string[]
}

const taskQueue: WorkflowTask[] = []
const completedTasks: WorkflowTask[] = []

export function createOrchestratorTask(
  type: string,
  description: string,
  department: AgentDepartment,
  priority: WorkflowTask['priority'] = 'medium',
  dependsOn?: string[]
): WorkflowTask {
  const task: WorkflowTask = {
    id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    type, description, department, priority,
    status: 'pending',
    createdAt: Date.now(),
    dependsOn,
  }
  taskQueue.push(task)
  return task
}

export function findAgent(department: AgentDepartment) {
  return agentRegistry.find(a => a.department === department && a.status === 'active')
}

export function assignNextTask(): WorkflowTask | undefined {
  const task = taskQueue.find(t => {
    if (t.status !== 'pending') return false
    if (t.dependsOn) return t.dependsOn.every(id =>
      completedTasks.find(ct => ct.id === id && ct.status === 'completed')
    )
    return true
  })
  if (!task) return
  const agent = findAgent(task.department)
  if (agent) {
    task.status = 'assigned'
    task.assignedTo = agent.id
  }
  return task
}

export async function executeOrchestratorTask(id: string): Promise<void> {
  const task = taskQueue.find(t => t.id === id)
  if (!task) return

  task.status = 'in_progress'

  try {
    // Register the task in the engine's task store FIRST
    // so executeTask() finds it
    const engineTask = createTask({
      title: task.type,
      description: task.description,
      assignedTo: task.assignedTo,
      priority: task.priority as any,
      input: task.description,
    })

    const result = await executeTask(engineTask.id)
    task.result = result.output || 'Completed'
    task.status = 'completed'
    task.completedAt = Date.now()
    completedTasks.push(task)
  } catch (err: any) {
    task.status = 'failed'
    task.result = err.message
    task.completedAt = Date.now()
  }
}

export function getQueueStatus() {
  const engineTasks = getAllTasks()
  return {
    pending: taskQueue.filter(t => t.status === 'pending').length,
    assigned: taskQueue.filter(t => t.status === 'assigned').length,
    inProgress: taskQueue.filter(t => t.status === 'in_progress').length,
    completed: completedTasks.length,
    failed: taskQueue.filter(t => t.status === 'failed').length,
    engineTasks: engineTasks.length,
  }
}

export { taskQueue, completedTasks }
