// ============================================================================
// AI Orchestrator — Routes tasks to the right AI agents
// ============================================================================

import { agents, type AgentDefinition, type Department } from '@/lib/ai/agents/registry'

export interface Task {
  id: string
  type: string
  description: string
  department: Department
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'pending' | 'assigned' | 'in_progress' | 'review' | 'completed' | 'failed'
  assignedTo?: string
  result?: string
  createdAt: number
  completedAt?: number
  dependsOn?: string[]
}

const taskQueue: Task[] = []
const completedTasks: Task[] = []

export function createTask(type: string, description: string, department: Department, priority: Task['priority'] = 'medium', dependsOn?: string[]): Task {
  const task: Task = {
    id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    type, description, department, priority,
    status: 'pending',
    createdAt: Date.now(),
    dependsOn,
  }
  taskQueue.push(task)
  return task
}

export function findAgent(department: Department): AgentDefinition | undefined {
  return agents.find(a => a.department === department && a.status === 'active')
}

export function assignNextTask(): Task | undefined {
  const task = taskQueue.find(t => {
    if (t.status !== 'pending') return false
    if (t.dependsOn) return t.dependsOn.every(id => completedTasks.find(ct => ct.id === id && ct.status === 'completed'))
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

export function completeTask(id: string, result: string): void {
  const task = taskQueue.find(t => t.id === id)
  if (task) {
    task.status = 'completed'
    task.result = result
    task.completedAt = Date.now()
    completedTasks.push(task)
  }
}

export function getQueueStatus() {
  return {
    pending: taskQueue.filter(t => t.status === 'pending').length,
    assigned: taskQueue.filter(t => t.status === 'assigned').length,
    inProgress: taskQueue.filter(t => t.status === 'in_progress').length,
    completed: completedTasks.length,
    failed: taskQueue.filter(t => t.status === 'failed').length,
  }
}
