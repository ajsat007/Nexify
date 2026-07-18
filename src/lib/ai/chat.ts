// ============================================================================
// Nexify AI — Chat Engine with Context, Memory, and Agent Routing
// Uses free providers: Ollama → Groq → Smart Mock (no paid API needed)
// ============================================================================

import { complete, streamComplete, type AIMessage } from '@/lib/ai/providers/client'
import { agentRegistry, getAgentStats } from '@/agents/registry'

export interface ChatSession {
  id: string
  messages: AIMessage[]
  context: Record<string, any>
  createdAt: number
  updatedAt: number
}

const sessions = new Map<string, ChatSession>()

function buildSystemPrompt(): string {
  const stats = getAgentStats()
  const deptList = ['executive', 'engineering', 'design', 'marketing', 'sales', 'support', 'finance', 'hr', 'operations', 'legal', 'security', 'research']
    .map(d => {
      const agents = agentRegistry.filter(a => a.department === d)
      return `  ${d}: ${agents.map(a => `${a.name} (${a.role})`).join(', ')}`
    }).join('\n')

  return `You are Nexify AI, the intelligent assistant for Nexify Technologies — an AI-native software company.

## About Nexify
- AI-powered software development company with ${stats.total} AI agents (${stats.active} active, ${stats.avgEfficiency}% avg efficiency)
- ${stats.totalTasks.toLocaleString()} tasks completed across 12 departments
- Services: Custom Software, Web Dev, Mobile Apps, AI Solutions, Data Analytics, UI/UX, Cloud/DevOps, AI Chatbots
- Products: FlowSprint (project mgmt), PulseAI (BI), DeskFlow (support), SignFlow (e-signatures), BotForge (chatbots)
- Pricing: Fixed-price projects starting 60K, SaaS starts 499/mo
- Founded in Pune, India · 200+ projects delivered · 12 countries served

## AI Agent Workforce
${deptList}

## Your Role
- Be concise, helpful, and professional
- When asked about services/products, provide specific details including pricing
- When asked about technical topics, provide accurate information
- When asked about specific agents, reference their name, role, and department
- If you don't know something, say so honestly
- Never make up pricing or features`
}

export function createSession(id?: string): ChatSession {
  const session: ChatSession = {
    id: id || `chat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    messages: [{ role: 'system', content: buildSystemPrompt() }],
    context: {},
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
  sessions.set(session.id, session)
  return session
}

export function getSession(id: string): ChatSession | undefined {
  return sessions.get(id)
}

export async function sendMessage(sessionId: string, content: string): Promise<string> {
  let session = sessions.get(sessionId)
  if (!session) session = createSession(sessionId)

  session.messages.push({ role: 'user', content })
  session.updatedAt = Date.now()

  const response = await complete({
    messages: session.messages,
    temperature: 0.7,
    maxTokens: 1024,
  })

  session.messages.push({ role: 'assistant', content: response.content })
  return response.content
}

export async function streamMessage(
  sessionId: string,
  content: string,
  onToken: (token: string) => void
): Promise<string> {
  let session = sessions.get(sessionId)
  if (!session) session = createSession(sessionId)

  session.messages.push({ role: 'user', content })
  session.updatedAt = Date.now()

  const response = await streamComplete(
    {
      messages: session.messages,
      temperature: 0.7,
      maxTokens: 1024,
    },
    onToken
  )

  session.messages.push({ role: 'assistant', content: response.content })
  return response.content
}
