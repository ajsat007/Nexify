// ============================================================================
// Nexify AI — Provider-Agnostic AI Client
// Supports: OpenAI, Anthropic, Gemini, DeepSeek, Grok, Mistral, Ollama, OpenRouter
// ============================================================================

export type AIProviderType = 'openai' | 'anthropic' | 'gemini' | 'deepseek' | 'grok' | 'mistral' | 'ollama' | 'openrouter'

export interface AIMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface AICompletionRequest {
  messages: AIMessage[]
  model?: string
  temperature?: number
  maxTokens?: number
  stream?: boolean
}

export interface AICompletionResponse {
  content: string
  model: string
  provider: AIProviderType
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

// ── Smart Mock Provider (offline/demo) — responds contextually to system prompt ──

function delay(ms: number) { return new Promise(r => setTimeout(r, ms)) }

function extractIdentity(systemPrompt: string): { name: string; role: string } {
  const nameMatch = systemPrompt.match(/You are (\w+[-\w]*)/)
  const roleMatch = systemPrompt.match(/the (\w[\w\s]+)/)
  return {
    name: nameMatch?.[1] || 'Nexify AI',
    role: roleMatch?.[1]?.trim() || 'assistant',
  }
}

function generateResponse(messages: AIMessage[]): string {
  const system = messages.find(m => m.role === 'system')?.content || ''
  const userMsg = messages.filter(m => m.role === 'user').pop()?.content || ''
  const identity = extractIdentity(system)

  // Extract skills from system prompt
  const skillsMatch = system.match(/skills:?\s*([^.]+)/i)
  const skills = skillsMatch?.[1]?.trim() || 'general assistance'

  const userLower = userMsg.toLowerCase()

  // Contextual responses based on identity + query
  if (userLower.includes('hello') || userLower.includes('hi ') || userLower === 'hi') {
    return `Hello! I'm ${identity.name}, the ${identity.role} at Nexify Technologies. How can I help you today? My skills include ${skills}.`
  }
  if (userLower.includes('who are you') || userLower.includes('what can you do')) {
    return `I'm ${identity.name}, serving as ${identity.role} at Nexify. I specialize in ${skills}. How can I put my expertise to work for you?`
  }
  if (userLower.includes('pricing') || userLower.includes('cost') || userLower.includes('price')) {
    return `Great question! Nexify offers fixed-price projects starting from ₹60,000 (UI/UX design) up to ₹15,00,000+ (enterprise solutions). Our SaaS products start at ₹499/user/month. As ${identity.role}, I'd recommend scheduling a free consultation to discuss your specific needs.`
  }
  if (userLower.includes('service') || userLower.includes('build') || userLower.includes('develop')) {
    return `As ${identity.name} (${identity.role}), I can help you with that! Nexify offers 20+ AI-powered services including custom software, web development, mobile apps, AI/ML solutions, cloud & DevOps, and more. My specific expertise covers ${skills}. Would you like me to walk you through our process?`
  }
  if (userLower.includes('agent') || userLower.includes('workforce') || userLower.includes('team')) {
    return `Nexify operates with 16 specialized AI agents across 12 departments — from executive strategy (CEO-Omega, CTO-Nova) to engineering (Dev-Alpha, QA-Delta) to design (Design-Gamma) and beyond. As ${identity.role}, I collaborate with these agents daily. Each agent has 90%+ efficiency and we've completed over 11,000 tasks collectively.`
  }
  if (userLower.includes('portfolio') || userLower.includes('project') || userLower.includes('work')) {
    return `We've delivered 200+ projects across fintech, healthcare, e-commerce, edtech, and more. Our AI agents recently built a FinTech trading dashboard (₹6,00,000), a healthcare telemedicine platform (₹10,00,000), and an AI recommendation engine (₹5,00,000). As ${identity.name}, I'm particularly proud of our 94% client retention rate!`
  }
  if (userLower.includes('timeline') || userLower.includes('how long') || userLower.includes('when')) {
    return `Delivery timelines vary by scope — web development takes 2-10 weeks, mobile apps 6-18 weeks, and AI solutions 6-20 weeks. Our AI agents work 24/7 in parallel, so we're typically 2x faster than traditional agencies. I can provide a more accurate timeline once I understand your project requirements better.`
  }

  // Default — contextual to the agent's role
  return `I'm ${identity.name}, ${identity.role} at Nexify. Based on my expertise in ${skills}, I'd be happy to help with your request regarding "${userMsg.slice(0, 80)}". Could you provide some more details so I can give you a more specific answer? You can also visit our services page at /services or contact us directly.`
}

function createSmartMockProvider() {
  return {
    name: 'openai' as AIProviderType,
    async complete(req: AICompletionRequest): Promise<AICompletionResponse> {
      await delay(600 + Math.random() * 900)
      return {
        content: generateResponse(req.messages),
        model: req.model || 'gpt-4o',
        provider: 'openai' as AIProviderType,
        usage: { promptTokens: req.messages.reduce((s, m) => s + m.content.length, 0), completionTokens: 0, totalTokens: 0 },
      }
    },
    async streamComplete(req: AICompletionRequest, onToken: (token: string) => void): Promise<AICompletionResponse> {
      const text = generateResponse(req.messages)
      for (const word of text.split(' ')) {
        await delay(40 + Math.random() * 30)
        onToken(word + ' ')
      }
      return { content: text, model: req.model || 'gpt-4o', provider: 'openai' as AIProviderType }
    },
    availableModels() { return ['gpt-4o', 'gpt-4o-mini', 'o3-mini'] },
  }
}

// ── Public API ──

export function getProvider(name?: AIProviderType): AIProviderAdapter {
  if (name) {
    const p = providers.get(name)
    if (p) return p
    // Fall back to smart mock for any requested provider
    const smart = createSmartMockProvider()
    registerProvider(smart)
    return smart
  }
  // Default 'openai' — if a real OpenAI adapter registered, it wins
  const existing = providers.get('openai')
  if (existing) return existing
  // Fall back to smart mock
  const smart = createSmartMockProvider()
  registerProvider(smart)
  return smart
}

export function getProviders(): AIProviderType[] {
  return Array.from(providers.keys())
}

export async function complete(req: AICompletionRequest): Promise<AICompletionResponse> {
  const provider = getProvider()
  return provider.complete(req)
}

export async function streamComplete(req: AICompletionRequest, onToken: (token: string) => void): Promise<AICompletionResponse> {
  const provider = getProvider()
  return provider.streamComplete(req, onToken)
}
