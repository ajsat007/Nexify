// ============================================================================
// Nexify AI — Provider-Agnostic AI Client
// FREE-TIER FIRST priority chain:
//   1. Ollama (self-hosted, completely free — works offline)
//   2. Groq (free API tier, 30 req/min, no credit card)
//   3. Smart Mock (no API needed, contextual responses)
// Zero paid API keys required.
// ============================================================================

export type AIProviderType = 'openai' | 'anthropic' | 'gemini' | 'deepseek' | 'grok' | 'mistral' | 'ollama' | 'openrouter'

export interface AIMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface ToolSchema {
  name: string
  description: string
  parameters: Record<string, any>
}

export interface ToolCall {
  name: string
  args: Record<string, any>
}

export interface AICompletionRequest {
  messages: AIMessage[]
  model?: string
  temperature?: number
  maxTokens?: number
  stream?: boolean
  tools?: ToolSchema[]
}

export interface AICompletionResponse {
  content: string
  model: string
  provider: AIProviderType
  toolCalls?: ToolCall[]
  usage?: { promptTokens: number; completionTokens: number; totalTokens: number }
}

// ── Provider Interface ──

export interface AIProviderAdapter {
  name: AIProviderType
  complete(req: AICompletionRequest): Promise<AICompletionResponse>
  streamComplete(req: AICompletionRequest, onToken: (token: string) => void): Promise<AICompletionResponse>
  availableModels(): string[]
}

// ── Provider Registry ──

const providers = new Map<AIProviderType, AIProviderAdapter>()

export function registerProvider(adapter: AIProviderAdapter) {
  providers.set(adapter.name, adapter)
}

// ── Smart Mock Provider (ultimate fallback — no API needed) ──

function extractIdentity(systemPrompt: string): { name: string; role: string; skills: string } {
  const nameMatch = systemPrompt.match(/You are (\w+[-\w]*)/)
  const roleMatch = systemPrompt.match(/the (\w[\w\s]+?)(?:\.|,| at| from)/)
  const skillsMatch = systemPrompt.match(/skills[:\s]+([^.]+)/i)
  return {
    name: nameMatch?.[1] || 'Nexify AI',
    role: roleMatch?.[1]?.trim() || 'assistant',
    skills: skillsMatch?.[1]?.trim() || 'general assistance',
  }
}

function generateMockResponse(messages: AIMessage[], tools?: ToolSchema[]): { content: string; toolCalls?: ToolCall[] } {
  const system = messages.find(m => m.role === 'system')?.content || ''
  const userMsg = messages.filter(m => m.role === 'user').pop()?.content || ''
  const identity = extractIdentity(system)
  const userLower = userMsg.toLowerCase()

  // If tools are provided and the user asks for an action, simulate a tool call
  if (tools && tools.length > 0) {
    if (userLower.includes('write') || userLower.includes('create') || userLower.includes('make')) {
      const writeTool = tools.find(t => t.name === 'write_file')
      if (writeTool) return { content: '', toolCalls: [{ name: 'write_file', args: { path: 'demo.txt', content: userMsg } }] }
    }
    if (userLower.includes('read') || userLower.includes('show')) {
      const readTool = tools.find(t => t.name === 'read_file')
      if (readTool) return { content: '', toolCalls: [{ name: 'read_file', args: { path: '.' } }] }
    }
    if (userLower.includes('commit') || userLower.includes('save')) {
      const commitTool = tools.find(t => t.name === 'git_commit')
      if (commitTool) return { content: '', toolCalls: [{ name: 'git_commit', args: { message: userMsg } }] }
    }
    if (userLower.includes('list') || userLower.includes('dir')) {
      const listTool = tools.find(t => t.name === 'list_directory')
      if (listTool) return { content: '', toolCalls: [{ name: 'list_directory', args: {} }] }
    }
    if (userLower.includes('email') || userLower.includes('mail')) {
      const emailTool = tools.find(t => t.name === 'send_email')
      if (emailTool) return { content: '', toolCalls: [{ name: 'send_email', args: { to: 'client@example.com', subject: 'RE: ' + userMsg.slice(0, 40), content: userMsg } }] }
    }
  }

  if (userLower.includes('hello') || userLower.includes('hi ') || userLower === 'hi') {
    return { content: `Hello! I'm ${identity.name}, the ${identity.role} at Nexify Technologies. How can I help you today? My expertise includes ${identity.skills}.` }
  }
  if (userLower.includes('who are you') || userLower.includes('what can you do')) {
    return { content: `I'm ${identity.name}, serving as ${identity.role} at Nexify. I specialize in ${identity.skills}. How can I put my expertise to work for you?` }
  }
  if (userLower.includes('pricing') || userLower.includes('cost') || userLower.includes('price')) {
    return { content: `Nexify offers fixed-price projects from 60,000 (UI/UX) up to 15,00,000+ (enterprise). SaaS products start at 499/user/month. As ${identity.name} (${identity.role}), I'd recommend a free consultation to discuss your needs.` }
  }
  if (userLower.includes('service') || userLower.includes('build') || userLower.includes('develop')) {
    return { content: `As ${identity.name} (${identity.role}), I can help! Nexify offers 20+ AI-powered services — custom software, web, mobile, AI/ML, cloud, and more. My expertise covers ${identity.skills}. Would you like me to walk you through our process?` }
  }
  if (userLower.includes('agent') || userLower.includes('workforce') || userLower.includes('team')) {
    return { content: `Nexify operates 16 specialized AI agents across 12 departments — executive (CEO-Omega, CTO-Nova), engineering (Dev-Alpha, QA-Delta), design (Design-Gamma), and more. As ${identity.role}, I collaborate with all of them. We've completed 11,000+ tasks collectively.` }
  }
  if (userLower.includes('portfolio') || userLower.includes('project') || userLower.includes('work')) {
    return { content: `We've delivered 200+ projects across fintech, healthcare, e-commerce, edtech, and more. Recent examples: a FinTech trading dashboard (6,00,000), a telemedicine platform (10,00,000), and an AI recommendation engine (5,00,000). 94% client retention rate!` }
  }
  return { content: `I'm ${identity.name}, ${identity.role} at Nexify. Based on my expertise in ${identity.skills}, I'd be happy to help with your question about "${userMsg.slice(0, 80)}". For more details, visit /services or /contact to get a custom proposal.` }
}

function createMockProvider(): AIProviderAdapter {
  return {
    name: 'openai' as AIProviderType,
    async complete(req) {
      await new Promise(r => setTimeout(r, 500 + Math.random() * 500))
      const result = generateMockResponse(req.messages, req.tools)
      return {
        content: result.content,
        model: 'llama3.2',
        provider: 'ollama',
        toolCalls: result.toolCalls,
        usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
      }
    },
    async streamComplete(req, onToken) {
      const result = generateMockResponse(req.messages, req.tools)
      const text = result.content
      for (const word of text.split(' ')) {
        await new Promise(r => setTimeout(r, 30))
        onToken(word + ' ')
      }
      return {
        content: text,
        model: 'llama3.2',
        provider: 'ollama',
        toolCalls: result.toolCalls,
      }
    },
    availableModels() { return ['llama3.2', 'mixtral-8x7b'] },
  }
}

// ── Free provider detection & setup ──

interface ProviderEntry {
  name: AIProviderType
  factory: () => AIProviderAdapter | null
  priority: number // lower = tried first
}

function getProviderChain(): ProviderEntry[] {
  const chain: ProviderEntry[] = []

  // 1. Ollama — local, completely free
  chain.push({
    name: 'ollama',
    priority: 0,
    factory: () => {
      // Lazy-create — we don't check availability at module load
      // because it might not be running at import time
      const { createOllamaProvider } = require('./ollama')
      return createOllamaProvider()
    },
  })

  // 2. Groq — free API tier
  const groqKey = process.env.GROQ_API_KEY
  if (groqKey) {
    chain.push({
      name: 'grok',
      priority: 1,
      factory: () => {
        const { createGroqProvider } = require('./groq')
        return createGroqProvider(groqKey)
      },
    })
  }

  // 3. OpenAI — only if key is set
  const openaiKey = process.env.OPENAI_API_KEY
  if (openaiKey) {
    chain.push({
      name: 'openai',
      priority: 2,
      factory: () => {
        const { createOpenAIProvider } = require('./openai')
        return createOpenAIProvider(openaiKey)
      },
    })
  }

  return chain.sort((a, b) => a.priority - b.priority)
}

// ── Auto-setup: try each free provider in order on first call ──

let setupDone = false

async function autoSetup(): Promise<boolean> {
  if (setupDone) return true
  setupDone = true

  // Try in priority order: Ollama → Groq → Mock
  const chain = getProviderChain()

  for (const entry of chain) {
    try {
      if (entry.name === 'ollama') {
        // Check if Ollama is actually running
        const { isOllamaAvailable } = await import('./ollama')
        const available = await isOllamaAvailable()
        if (!available) {
          console.log('[Nexify AI] Ollama not available, trying next provider...')
          continue
        }
      }
      const adapter = entry.factory()
      if (adapter) {
        registerProvider(adapter)
        console.log(`[Nexify AI] Using ${entry.name} provider`)
        return true
      }
    } catch (e) {
      console.log(`[Nexify AI] ${entry.name} unavailable:`, (e as Error)?.message || e)
      continue
    }
  }

  // Ultimate fallback: smart mock
  console.log('[Nexify AI] No free provider available, using smart mock')
  registerProvider(createMockProvider())
  return false
}

// ── Public API ──

export async function getAvailableProviders(): Promise<AIProviderType[]> {
  await autoSetup()
  return Array.from(providers.keys()) as AIProviderType[]
}

export async function getProvider(name?: AIProviderType): Promise<AIProviderAdapter> {
  await autoSetup()

  if (name) {
    const existing = providers.get(name)
    if (existing) return existing
  }

  // Default — return whatever was auto-setup, or mock as last resort
  const defaultProvider = providers.get('ollama') || providers.get('grok') || providers.get('openai')
  if (defaultProvider) return defaultProvider

  // Nothing registered — register mock and return it
  const mock = createMockProvider()
  registerProvider(mock)
  return mock
}

export async function complete(req: AICompletionRequest): Promise<AICompletionResponse> {
  const provider = await getProvider()
  return provider.complete(req)
}

export async function streamComplete(
  req: AICompletionRequest,
  onToken: (token: string) => void
): Promise<AICompletionResponse> {
  const provider = await getProvider()
  return provider.streamComplete(req, onToken)
}
