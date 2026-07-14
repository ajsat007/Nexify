// ============================================================================
// Nexify — OpenAI Provider Adapter
// ============================================================================

import { registerProvider, type AIProviderAdapter } from './client'

export function createOpenAIProvider(apiKey?: string): AIProviderAdapter {
  const key = apiKey || process.env.OPENAI_API_KEY || ''
  const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1'

  async function callAPI(messages: any[], model: string, stream = false) {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
      body: JSON.stringify({ model, messages, stream, max_tokens: 2048 }),
    })
    if (!res.ok) throw new Error(`OpenAI API error: ${res.status}`)
    const data = await res.json()
    return data.choices?.[0]?.message?.content || ''
  }

  return {
    name: 'openai',
    async complete(req) {
      const content = await callAPI(
        req.messages.map(m => ({ role: m.role, content: m.content })),
        req.model || 'gpt-4o'
      )
      return { content, model: req.model || 'gpt-4o', provider: 'openai' }
    },
    async streamComplete(req, onToken) {
      const content = await callAPI(
        req.messages.map(m => ({ role: m.role, content: m.content })),
        req.model || 'gpt-4o'
      )
      onToken(content)
      return { content, model: req.model || 'gpt-4o', provider: 'openai' }
    },
    availableModels() { return ['gpt-4o', 'gpt-4o-mini', 'o3-mini'] },
  }
}

// Auto-register only on the server side
if (typeof process !== 'undefined' && process.env?.OPENAI_API_KEY) {
  registerProvider(createOpenAIProvider())
}
