// ============================================================================
// Nexify AI — Ollama Provider Adapter
// 100% free, self-hosted. Runs Llama 3.2, Mistral, Qwen, and other open models
// on your own machine via https://ollama.com
// ============================================================================

import type { AIProviderAdapter, AICompletionRequest, AICompletionResponse } from './client'

const OLLAMA_BASE = process.env.OLLAMA_BASE_URL || 'http://localhost:11434'
const DEFAULT_MODEL = process.env.OLLAMA_MODEL || 'llama3.2'

export function createOllamaProvider(): AIProviderAdapter {
  async function callOllama(messages: any[], model: string, stream = false): Promise<string> {
    const res = await fetch(`${OLLAMA_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(30000),
      body: JSON.stringify({
        model: model || DEFAULT_MODEL,
        messages: messages.map((m: any) => ({ role: m.role, content: m.content })),
        stream,
      }),
    })
    if (!res.ok) throw new Error(`Ollama error: ${res.status} ${res.statusText}`)

    if (stream) {
      // Read NDJSON stream
      const reader = res.body?.getReader()
      if (!reader) throw new Error('No response body')
      const decoder = new TextDecoder()
      let fullText = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        for (const line of chunk.split('\n').filter(Boolean)) {
          try {
            const parsed = JSON.parse(line)
            if (parsed.message?.content) {
              fullText += parsed.message.content
            }
            if (parsed.done) break
          } catch { /* skip incomplete lines */ }
        }
      }
      return fullText
    }

    const data = await res.json()
    return data.message?.content || ''
  }

  return {
    name: 'ollama',
    async complete(req: AICompletionRequest): Promise<AICompletionResponse> {
      const content = await callOllama(
        req.messages.map(m => ({ role: m.role, content: m.content })),
        req.model || DEFAULT_MODEL
      )
      return {
        content,
        model: req.model || DEFAULT_MODEL,
        provider: 'ollama',
        usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
      }
    },
    async streamComplete(
      req: AICompletionRequest,
      onToken: (token: string) => void
    ): Promise<AICompletionResponse> {
      const content = await callOllama(
        req.messages.map(m => ({ role: m.role, content: m.content })),
        req.model || DEFAULT_MODEL,
        true
      )
      // Emit one token at a time for the streaming callback
      const words = content.split(' ')
      for (const word of words) {
        onToken(word + ' ')
        await new Promise(r => setTimeout(r, 30))
      }
      return {
        content,
        model: req.model || DEFAULT_MODEL,
        provider: 'ollama',
        usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
      }
    },
    availableModels() {
      return [DEFAULT_MODEL, 'llama3.2', 'llama3.1', 'mistral', 'qwen2.5', 'phi3', 'gemma2']
    },
  }
}

export async function isOllamaAvailable(): Promise<boolean> {
  try {
    const res = await fetch(`${OLLAMA_BASE}/api/tags`, { signal: AbortSignal.timeout(2000) })
    return res.ok
  } catch {
    return false
  }
}
