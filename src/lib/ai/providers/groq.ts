// ============================================================================
// Nexify AI — Groq Provider Adapter
// Free API tier: 30 requests/min, no credit card required
// Models: mixtral-8x7b-32768, llama-3.1-70b, llama-3.1-8b
// Sign up at https://console.groq.com (free, 20k tokens/day)
// ============================================================================

import type { AIProviderAdapter, AICompletionRequest, AICompletionResponse } from './client'

const GROQ_BASE = 'https://api.groq.com/openai/v1'
const GROQ_API_KEY = process.env.GROQ_API_KEY || ''
const DEFAULT_MODEL = 'mixtral-8x7b-32768'

export function createGroqProvider(apiKey?: string): AIProviderAdapter {
  const key = apiKey || GROQ_API_KEY
  const baseUrl = process.env.GROQ_BASE_URL || GROQ_BASE

  async function callGroq(messages: any[], model: string, stream = false): Promise<string> {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      signal: AbortSignal.timeout(30000),
      body: JSON.stringify({
        model: model || DEFAULT_MODEL,
        messages: messages.map((m: any) => ({ role: m.role, content: m.content })),
        stream,
        max_tokens: 2048,
      }),
    })
    if (res.status === 429) {
      throw new Error('Groq rate limit exceeded (30 req/min). Try Ollama or wait a moment.')
    }
    if (!res.ok) throw new Error(`Groq API error: ${res.status} ${res.statusText}`)

    if (stream) {
      const reader = res.body?.getReader()
      if (!reader) throw new Error('No response body')
      const decoder = new TextDecoder()
      let fullText = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        for (const line of chunk.split('\n').filter(l => l.startsWith('data: '))) {
          const data = line.slice(6)
          if (data === '[DONE]') break
          try {
            const parsed = JSON.parse(data)
            const delta = parsed.choices?.[0]?.delta?.content
            if (delta) fullText += delta
          } catch { /* skip incomplete lines */ }
        }
      }
      return fullText
    }

    const data = await res.json()
    return data.choices?.[0]?.message?.content || ''
  }

  return {
    name: 'grok',
    async complete(req: AICompletionRequest): Promise<AICompletionResponse> {
      const content = await callGroq(
        req.messages.map(m => ({ role: m.role, content: m.content })),
        req.model || DEFAULT_MODEL
      )
      return {
        content,
        model: req.model || DEFAULT_MODEL,
        provider: 'grok',
      }
    },
    async streamComplete(
      req: AICompletionRequest,
      onToken: (token: string) => void
    ): Promise<AICompletionResponse> {
      const content = await callGroq(
        req.messages.map(m => ({ role: m.role, content: m.content })),
        req.model || DEFAULT_MODEL,
        true
      )
      onToken(content)
      return {
        content,
        model: req.model || DEFAULT_MODEL,
        provider: 'grok',
      }
    },
    availableModels() {
      return ['mixtral-8x7b-32768', 'llama-3.1-70b-versatile', 'llama-3.1-8b-instant', 'gemma2-9b-it']
    },
  }
}

export function hasGroqKey(): boolean {
  return !!GROQ_API_KEY
}
