// ============================================================================
// Nexify — OpenAI Provider Adapter
// Only used if OPENAI_API_KEY is set. Register this via the provider chain.
// ============================================================================

import type { AIProviderAdapter, AICompletionRequest, AICompletionResponse } from './client'

export function createOpenAIProvider(apiKey?: string): AIProviderAdapter {
  const key = apiKey || process.env.OPENAI_API_KEY || ''
  const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1'

  async function callAPI(messages: any[], model: string, stream = false) {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
      signal: AbortSignal.timeout(30000),
      body: JSON.stringify({ model, messages, stream, max_tokens: 2048 }),
    })
    if (!res.ok) throw new Error(`OpenAI API error: ${res.status}`)
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
          } catch { /* skip */ }
        }
      }
      return fullText
    }
    const data = await res.json()
    return data.choices?.[0]?.message?.content || ''
  }

  return {
    name: 'openai',
    async complete(req: AICompletionRequest): Promise<AICompletionResponse> {
      const content = await callAPI(
        req.messages.map(m => ({ role: m.role, content: m.content })),
        req.model || 'gpt-4o-mini'
      )
      return { content, model: req.model || 'gpt-4o-mini', provider: 'openai' }
    },
    async streamComplete(req: AICompletionRequest, onToken: (token: string) => void): Promise<AICompletionResponse> {
      const content = await callAPI(
        req.messages.map(m => ({ role: m.role, content: m.content })),
        req.model || 'gpt-4o-mini',
        true
      )
      onToken(content)
      return { content, model: req.model || 'gpt-4o-mini', provider: 'openai' }
    },
    availableModels() { return ['gpt-4o', 'gpt-4o-mini', 'o3-mini'] },
  }
}
