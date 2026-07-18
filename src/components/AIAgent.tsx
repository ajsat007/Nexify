'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Bot, Send, X, Loader, MessageCircle, Zap } from 'lucide-react'

export function AIAgentWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: 'ai', text: "👋 Hi! I'm Nexify AI. I can answer questions about our services, products, pricing, portfolio, and more. What would you like to know?" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [streamingText, setStreamingText] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, streamingText])

  const send = useCallback(async () => {
    const msg = input.trim()
    if (!msg || loading) return
    setInput('')
    setMessages(p => [...p, { role: 'user', text: msg }])
    setLoading(true)
    setStreamingText('')

    // Abort previous request if any
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, sessionId, stream: true }),
        signal: controller.signal,
      })

      if (!res.ok) throw new Error('API error')

      const reader = res.body?.getReader()
      if (!reader) throw new Error('No response body')
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          try {
            const data = JSON.parse(line.slice(6))
            if (data.done) {
              setMessages(p => [...p, { role: 'ai', text: data.fullResponse }])
              setStreamingText('')
              if (data.sessionId && !sessionId) setSessionId(data.sessionId)
            } else if (data.token) {
              setStreamingText(prev => prev + data.token)
            }
          } catch { /* skip parse errors */ }
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') return
      setMessages(p => [...p, { role: 'ai', text: 'Sorry, I encountered an error. Please try again.' }])
    } finally {
      setLoading(false)
      setStreamingText('')
    }
  }, [input, loading, sessionId])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden mb-2 animate-slide-up" role="dialog" aria-label="Nexify AI Chat">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>
            <div><h3 className="text-white font-semibold text-sm">Nexify AI</h3><p className="text-white/70 text-xs">Online</p></div>
            <button onClick={() => setOpen(false)} className="ml-auto text-white/70 hover:text-white" aria-label="Close chat"><X size={18} /></button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-neutral-50" role="log" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {m.role === 'ai' && <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0 text-[10px] text-white font-bold">N</div>}
                <div className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${m.role === 'user' ? 'bg-primary-500 text-white rounded-tr-sm' : 'bg-white text-neutral-700 border border-neutral-100 rounded-tl-sm'}`}>{m.text}</div>
              </div>
            ))}
            {streamingText && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0 text-[10px] text-white font-bold">N</div>
                <div className="max-w-[80%] p-3 rounded-xl text-sm leading-relaxed bg-white text-neutral-700 border border-neutral-100 rounded-tl-sm">
                  {streamingText}
                  <span className="inline-block w-1.5 h-4 bg-primary-500 ml-0.5 animate-pulse align-middle" />
                </div>
              </div>
            )}
            {loading && !streamingText && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-[10px] text-white font-bold">N</div>
                <div className="bg-white border rounded-xl p-4"><Loader size={14} className="animate-spin text-primary-500" /></div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-neutral-200">
            <div className="flex gap-2">
              <input
                className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                placeholder="Ask about Nexify..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Chat message"
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-xl bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 disabled:opacity-50 transition-all"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </div>
            <p className="text-[10px] text-neutral-500 mt-1.5 flex items-center gap-1"><Zap size={10} /> Nexify AI — AI-powered assistant (FREE — uses Ollama or Groq)</p>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-2xl gradient-bg text-white shadow-xl hover:shadow-2xl transition-all flex items-center justify-center ${open ? 'rotate-45' : ''}`}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  )
}
