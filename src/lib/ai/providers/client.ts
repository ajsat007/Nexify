// ============================================================================
// Nexify AI — Provider-Agnostic AI Client
// FREE-TIER FIRST priority chain:
//   1. Ollama (self-hosted, completely free — works offline)
//   2. Groq (free API tier, 30 req/min, no credit card)
//   3. Smart Mock (no API needed, contextual responses)
// Zero paid API keys required.
// ============================================================================

export type AIProviderType = 'openai' | 'anthropic' | 'gemini' | 'deepseek' | 'groq' | 'mistral' | 'ollama' | 'openrouter' | 'mock'

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

function generateMockResponse(messages: AIMessage[]): string {
  const system = messages.find(m => m.role === 'system')?.content || ''
  const userMsg = messages.filter(m => m.role === 'user').pop()?.content || ''
  const userLower = userMsg.toLowerCase()

  // Extract actual business info from system my capabilities for contextual responses
  const servicesMatch = system.match(/Services: ([^.]+)/)
  const productsMatch = system.match(/Products: ([^.]+)/)
  const pricingMatch = system.match(/Pricing: ([^.]+)/)
  const founderMatch = system.match(/Founded in ([^.]+)/)

  const services = servicesMatch?.[1] || 'Custom Software, Web Dev, Mobile Apps, AI Solutions, Data Analytics, UI/UX, Cloud/DevOps, AI Chatbots'
  const products = productsMatch?.[1] || 'FlowSprint, PulseAI, DeskFlow, SignFlow, BotForge'
  const pricing = pricingMatch?.[1] || 'Fixed-price projects starting at ₹60,000, SaaS starts at ₹499/mo'
  const founded = founderMatch?.[1] || 'Pune, India · 200+ projects · 12 countries'

  // Greetings
  if (/^(hello|hi|hey|good\s*(morning|afternoon|evening)|yo|sup)\b/.test(userLower)) {
    return `Hello! 👋 Welcome to Nexify Technologies. I'm your AI assistant. I can help you with information about our services, pricing, AI agents, products, and more. How can I assist you today?`
  }

  // Who are you
  if (/\b(who are you|what are you|tell me about yourself|about nexify|what is nexify)\b/.test(userLower)) {
    return `I'm Nexify AI, the intelligent assistant for Nexify Technologies — an AI-native software company. We're building the future of software development with 50+ specialized AI agents across 12 departments. ${founded}. Our AI agents handle everything from custom software development to AI solutions, mobile apps, cloud infrastructure, and more — all at 10x the speed and half the cost of traditional agencies. How can I help you?`
  }

  // Services
  if (/\b(service|offer|provide|what do you do|capabilities|solutions)\b/.test(userLower) && !userLower.includes('pricing') && !userLower.includes('price') && !userLower.includes('cost')) {
    return `Nexify offers a comprehensive range of AI-powered services:\n\n${services.split(', ').map((s: string, i: number) => `${i+1}. **${s.trim()}**`).join('\n')}\n\nAll services are delivered by our specialized AI agents, ensuring faster delivery, higher quality, and significantly lower costs than traditional agencies. Would you like details on any specific service?`
  }

  // Specific service detail
  const serviceList = services.split(', ').map((s: string) => s.trim())
  const matchedService = serviceList.find((s: string) => userLower.includes(s.toLowerCase()))
  if (matchedService) {
    return `**${matchedService}** is one of our core offerings. Our AI agents handle everything from requirement analysis to deployment. We use modern tech stacks and deliver enterprise-quality results. Pricing for this service starts at competitive rates, and delivery timelines are 2-3x faster than traditional agencies. Want me to connect you with a specialist for more details?`
  }

  // Products
  if (/\b(product|saas|flowsprint|pulseai|deskflow|signflow|botforge)\b/.test(userLower)) {
    const productList = products.split(', ').map((p: string) => p.trim())
    const matchedProduct = productList.find((p: string) => userLower.includes(p.toLowerCase()))

    if (matchedProduct) {
      const productDescriptions: Record<string, string> = {
        'FlowSprint': 'AI-powered project management with sprint planning, Kanban, Gantt charts, and team collaboration. ₹499/user/mo.',
        'PulseAI': 'Business intelligence platform with natural language query, anomaly detection, and beautiful dashboards. ₹2,499/mo.',
        'DeskFlow': 'Omnichannel customer support with AI auto-reply, knowledge base, and chatbot builder. ₹1,499/agent/mo.',
        'SignFlow': 'Digital signature platform with Aadhaar eSign, workflow builder, and audit trails. ₹999/mo.',
        'BotForge': 'No-code AI chatbot builder with multi-LLM support and omnichannel deployment. ₹1,999/mo.',
      }
      return `**${matchedProduct}** — ${productDescriptions[matchedProduct] || 'One of our SaaS products built and used by our own AI agents before being offered to customers.'} Would you like a demo or more details?`
    }

    return `We have 5 SaaS products built by our AI agents, dogfooded internally, and now available to you:\n\n${productList.map((p: string, i: number) => `${i+1}. **${p.trim()}**`).join('\n')}\n\nAll are powered by AI and continuously improved by our agent workforce. Which one interests you?`
  }

  // Pricing
  if (/\b(price|pricing|cost|rate|how much|charges|fee|budget|afford)\b/.test(userLower)) {
    return `Our pricing is transparent and competitive:\n\n• **Fixed-price projects**: ${pricing}\n• **SaaS subscriptions**: Starting at ₹499/month with free trials available\n• **Enterprise solutions**: Custom pricing based on requirements\n\nWe offer 40-60% lower costs than traditional agencies because our AI workforce has zero overhead. Want a detailed quote for your specific needs? Visit our /pricing page or contact us for a custom proposal!`
  }

  // AI Agents
  if (/\b(agent|ai workforce|department|employee|team member|who works|your staff)\b/.test(userLower)) {
    return `Our AI workforce consists of 50+ specialized AI agents across 12 departments: 👑 Executive, ⚡ Engineering, 🎨 Design, 📈 Marketing, 🤝 Sales, 🎧 Support, 💰 Finance, 👥 HR, 📋 Operations, ⚖️ Legal, 🛡️ Security, and 📊 Research. Each agent has specific skills, tools, and responsibilities. They collaborate autonomously to deliver projects at 10x speed. Check out our /agents page for the full directory!`
  }

  // Chatbot (our primary offer)
  if (/\b(chatbot|chat bot|conversational|bot)\b/.test(userLower)) {
    return `Our AI chatbot service is our flagship offering! 🤖 For just **₹15,000**, we build you a custom AI chatbot that works on your website AND WhatsApp — deployed in 48 hours. It handles FAQs 24/7, captures leads while you sleep, and supports multiple languages. Includes 1 month free hosting. Ready to get started? Visit /chatbot or contact us!`
  }

  // Contact / support
  if (/\b(contact|reach|email|phone|call|support|help|talk to human|real person)\b/.test(userLower) && !userLower.includes('service') && !userLower.includes('pricing')) {
    return `You can reach us at:\n📧 **Email**: ajinkyasatkar5@gmail.com\n📞 **Phone**: +91 9373955349\n📍 **Location**: Pune, Maharashtra, India\n\nYou can also fill out the contact form at /contact and we'll get back to you within 24 hours with a custom proposal. How else can I help?`
  }

  // Portfolio / case studies
  if (/\b(portfolio|case study|project|client|work|example|showcase|demo)\b/.test(userLower)) {
    return `We've delivered 200+ projects across fintech, healthcare, e-commerce, edtech, logistics, and more. Recent examples:\n\n• FinTech Trading Dashboard — real-time analytics, 6-week delivery\n• AI Telemedicine Platform — HIPAA-compliant, 12-week delivery\n• E-commerce Recommendation Engine — 42% increase in AOV\n\nView our full portfolio at /portfolio. Want to discuss your project?`
  }

  // Default — intelligent contextual response for any other question
  const questionWords = userLower.split(' ').filter(w => w.length > 3).slice(0, 6).join(', ')
  return `Great question! Based on your inquiry about "${userMsg.slice(0, 100)}", here's what I can tell you:\n\nNexify Technologies is an AI-native software company with 50+ specialized AI agents. We offer ${services}.\n\n**Pricing**: ${pricing}\n\n**Products**: ${products}\n\nI'd be happy to provide more specific information. Could you let me know what aspect you're most interested in — services, pricing, a specific product, or starting a project?`
}

function createMockProvider(): AIProviderAdapter {
  return {
    name: 'mock' as AIProviderType,
    async complete(req) {
      await new Promise(r => setTimeout(r, 300 + Math.random() * 400))
      const content = generateMockResponse(req.messages)
      return {
        content,
        model: 'mock-llama3.2',
        provider: 'mock',
        usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
      }
    },
    async streamComplete(req, onToken) {
      const content = generateMockResponse(req.messages)
      const words = content.split(' ')
      for (let i = 0; i < words.length; i++) {
        onToken(words[i] + (i < words.length - 1 ? ' ' : ''))
        await new Promise(r => setTimeout(r, 20))
      }
      return {
        content,
        model: 'mock-llama3.2',
        provider: 'mock',
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
      name: 'groq',
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
  const defaultProvider = providers.get('ollama') || providers.get('groq') || providers.get('openai')
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
