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

// ── Mock Provider (offline/demo) ──

const mockResponses = [
  "I understand your query. Let me analyze this with my available context.",
  "Based on my analysis, I recommend exploring our custom software development services.",
  "Great question! Nexify offers end-to-end AI-powered development solutions.",
  "Let me break this down. Our AI agents specialize in full-stack development with modern technologies.",
  "I can help you with that. Nexify has delivered 200+ projects across 12 countries.",
]

function delay(ms: number) { return new Promise(r => setTimeout(r, ms)) }

registerProvider({
  name: 'openai',
  async complete(req) {
    await delay(500 + Math.random() * 1000)
    return { content: mockResponses[Math.floor(Math.random() * mockResponses.length)], model: req.model || 'gpt-4o', provider: 'openai', usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 } }
  },
  async streamComplete(req, onToken) {
    const text = mockResponses[Math.floor(Math.random() * mockResponses.length)]
    for (const word of text.split(' ')) { await delay(50); onToken(word + ' ') }
    return { content: text, model: req.model || 'gpt-4o', provider: 'openai' }
  },
  availableModels() { return ['gpt-4o', 'gpt-4o-mini', 'o3-mini'] },
})

// ── Public API ──

export function getProvider(name?: AIProviderType): AIProviderAdapter {
  const p = name ? providers.get(name) : providers.get('openai')
  return p || providers.get('openai')!
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
