// ============================================================================
// Nexify — Agent Orchestration Engine
// Routes tasks to the right agent, manages execution, and tracks results
// ============================================================================

import { complete, type AIMessage } from '@/lib/ai/providers/client'
import { agentRegistry, type AgentDefinition } from '@/agents/registry'
import { getAllTools, getToolSchemas, executeTool } from '@/tools/registry'

export interface AgentTask {
  id: string
  title: string
  description: string
  assignedTo: string  // agent id
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'failed'
  input: string
  output?: string
  dependsOn: string[]
  createdAt: number
  completedAt?: number
  error?: string
}

export interface AgentConversation {
  id: string
  agentId: string
  messages: AIMessage[]
  context: Record<string, any>
  createdAt: number
}

// ── Task Store (in-memory, swap to DB later) ──
const tasks = new Map<string, AgentTask>()
const conversations = new Map<string, AgentConversation>()

let taskCounter = 0

function generateTaskId(): string {
  taskCounter++
  return `TASK-${String(taskCounter).padStart(4, '0')}`
}

// ── Task Management ──

export function createTask(params: {
  title: string
  description: string
  assignedTo?: string
  priority?: AgentTask['priority']
  input?: string
  dependsOn?: string[]
}): AgentTask {
  const task: AgentTask = {
    id: generateTaskId(),
    title: params.title,
    description: params.description,
    assignedTo: params.assignedTo || 'unassigned',
    priority: params.priority || 'medium',
    status: 'pending',
    input: params.input || '',
    dependsOn: params.dependsOn || [],
    createdAt: Date.now(),
  }
  tasks.set(task.id, task)
  return task
}

export function assignTask(taskId: string, agentId: string): AgentTask | null {
  const task = tasks.get(taskId)
  if (!task) return null
  const agent = agentRegistry.find(a => a.id === agentId)
  if (!agent) return null

  task.assignedTo = agentId
  task.status = 'assigned'
  return task
}

export async function executeTask(taskId: string): Promise<AgentTask> {
  const task = tasks.get(taskId)
  if (!task) throw new Error(`Task ${taskId} not found`)
  if (task.status === 'completed') return task

  task.status = 'in_progress'
  const agent = agentRegistry.find(a => a.id === task.assignedTo)
  const availableTools = getToolSchemas()
  const toolNames = availableTools.map(t => t.name).join(', ')
  const agentContext = agent
    ? `You are ${agent.name}, the ${agent.role} at Nexify. Your skills: ${agent.skills.join(', ')}.\n\nYou have access to these tools: ${toolNames}\nWhen you need to do something (read/write files, run commands, use git, send emails), call the appropriate tool instead of describing what you'd do.`
    : `You are a Nexify AI agent.\n\nYou have access to these tools: ${toolNames}\nUse them to get work done.`

  try {
    const response = await complete({
      messages: [
        { role: 'system', content: agentContext },
        { role: 'user', content: task.input || task.description },
      ],
      temperature: 0.7,
      maxTokens: 4096,
      tools: availableTools.length > 0 ? availableTools : undefined,
    })

    // Handle tool calls from the model
    if (response.toolCalls && response.toolCalls.length > 0) {
      const toolResults = []
      for (const call of response.toolCalls) {
        const result = await executeTool(call.name, call.args)
        toolResults.push(`Tool "${call.name}" result: ${result.success ? JSON.stringify(result.data) : `Error: ${result.error}`}`)
      }

      // Send tool results back to the model for final response
      const finalResponse = await complete({
        messages: [
          { role: 'system', content: agentContext },
          { role: 'user', content: task.input || task.description },
          { role: 'assistant', content: response.content },
          { role: 'user', content: `Tool results:\n${toolResults.join('\n')}\n\nSummarize what was done.` },
        ],
        temperature: 0.5,
        maxTokens: 2048,
      })
      task.output = finalResponse.content
    } else {
      task.output = response.content
    }

    task.status = 'completed'
    task.completedAt = Date.now()

    // Track task completion on agent
    if (agent) {
      const idx = agentRegistry.indexOf(agent)
      if (idx >= 0) agentRegistry[idx]!.tasksCompleted++
    }
  } catch (err: any) {
    task.status = 'failed'
    task.error = err.message || 'Unknown error'
  }

  return task
}

export function getTask(taskId: string): AgentTask | undefined {
  return tasks.get(taskId)
}

export function getPendingTasks(): AgentTask[] {
  return Array.from(tasks.values()).filter(t => t.status === 'pending' || t.status === 'assigned')
}

export function getAllTasks(): AgentTask[] {
  return Array.from(tasks.values())
}

// ── Conversation Management ──

export function createConversation(agentId: string): AgentConversation {
  const conversation: AgentConversation = {
    id: `conv-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    agentId,
    messages: [],
    context: {},
    createdAt: Date.now(),
  }
  conversations.set(conversation.id, conversation)
  return conversation
}

export async function agentChat(conversationId: string, message: string): Promise<string> {
  const conv = conversations.get(conversationId)
  if (!conv) throw new Error('Conversation not found')

  const agent = agentRegistry.find(a => a.id === conv.agentId)
  const systemPrompt = agent
    ? `You are ${agent.name}, the ${agent.role} at Nexify Technologies. Your skills include ${agent.skills.join(', ')}. Respond as this agent.`
    : 'You are a Nexify AI agent.'

  conv.messages.push({ role: 'user', content: message })

  const response = await complete({
    messages: [{ role: 'system', content: systemPrompt }, ...conv.messages],
    temperature: 0.7,
    maxTokens: 1024,
  })

  conv.messages.push({ role: 'assistant', content: response.content })
  return response.content
}
