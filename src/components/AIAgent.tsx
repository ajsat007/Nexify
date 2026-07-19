'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Bot, Send, X, Loader, MessageCircle, Zap, Sparkles, Minimize2, Maximize2, ChevronDown, Trash2, Clock } from 'lucide-react'

interface Message {
  role: 'user' | 'ai'
  text: string
  timestamp: Date
}

export function AIAgentWidget() {
  const [open, setOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      text: "👋 Hey! I'm Nexify AI. Ask me anything about our services, pricing, or how our AI agents can help your business.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  const send = useCallback(async () => {
    const msg = input.trim()
    if (!msg || loading) return
    setInput('')
    setMessages(p => [...p, { role: 'user', text: msg, timestamp: new Date() }])
    setLoading(true)
    setStreamingText('')

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
              setMessages(p => [...p, { role: 'ai', text: data.fullResponse, timestamp: new Date() }])
              setStreamingText('')
              if (data.sessionId && !sessionId) setSessionId(data.sessionId)
            } else if (data.token) {
              setStreamingText(prev => prev + data.token)
            }
          } catch { /* skip */ }
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') return
      setMessages(p => [...p, { role: 'ai', text: 'Sorry, I hit an error. Can you try again?', timestamp: new Date() }])
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

  const clearChat = () => {
    setMessages([
      { role: 'ai', text: "👋 Hey! I'm Nexify AI. Ask me anything about our services, pricing, or how our AI agents can help your business.", timestamp: new Date() },
    ])
    setSessionId(null)
  }

  const suggestedPrompts = [
    'What services do you offer?',
    'How much does a chatbot cost?',
    'Tell me about your AI agents',
  ]

  const isFirstMessage = messages.length === 1

  return (
    <div className="fixed bottom-6 right-6 z-chatbot flex flex-col items-end gap-3">
      {/* Chat Window */}
      {open && (
        <div
          className={`glass rounded-2xl shadow-elevated border border-white/20 dark:border-white/10 overflow-hidden transition-all duration-300 ${
            minimized ? 'w-72 h-14' : 'w-[360px] sm:w-[420px] h-[560px] max-h-[80vh]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-surface-200/50 dark:border-surface-700/50 bg-gradient-to-r from-primary-500/5 to-accent-500/5">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-surface-900" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-surface-900 dark:text-white leading-tight">Nexify AI</h3>
                <p className="text-xs text-surface-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Online · AI-powered
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={clearChat} className="btn-icon !w-7 !h-7" title="Clear conversation">
                <Trash2 size={12} />
              </button>
              <button onClick={() => setMinimized(!minimized)} className="btn-icon !w-7 !h-7" title={minimized ? 'Expand' : 'Minimize'}>
                {minimized ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
              </button>
              <button onClick={() => setOpen(false)} className="btn-icon !w-7 !h-7" title="Close">
                <X size={12} />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface-50/50 dark:bg-surface-925/50" style={{ height: 'calc(100% - 112px)' }}>
                {messages.map((m, i) => (
                  <div key={i} className={`flex gap-2.5 ${m.role === 'user' ? 'flex-row-reverse' : ''} animate-slide-up-sm`}>
                    {m.role === 'ai' && (
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0 text-xs text-white font-bold shadow-sm">
                        N
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                        m.role === 'user'
                          ? 'bg-primary-500 text-white rounded-tr-sm shadow-sm'
                          : 'glass-card text-surface-700 dark:text-surface-300 rounded-tl-sm'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {streamingText && (
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0 text-xs text-white font-bold shadow-sm">
                      N
                    </div>
                    <div className="max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed glass-card rounded-tl-sm">
                      {streamingText}
                      <span className="inline-block w-2 h-4 bg-primary-500 ml-0.5 rounded-sm animate-pulse align-middle" />
                    </div>
                  </div>
                )}
                {loading && !streamingText && (
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0 text-xs text-white font-bold shadow-sm">N</div>
                    <div className="glass-card rounded-2xl p-4 flex items-center gap-2 text-sm text-surface-500">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      Thinking...
                    </div>
                  </div>
                )}
                {/* Suggested prompts */}
                {isFirstMessage && !loading && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {suggestedPrompts.map(p => (
                      <button
                        key={p}
                        onClick={() => { setInput(p); setTimeout(() => send(), 100) }}
                        className="px-3 py-1.5 rounded-xl text-xs font-medium bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-surface-200 dark:border-surface-700 transition-all"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-surface-200/50 dark:border-surface-700/50 bg-white/50 dark:bg-surface-900/50">
                <div className="flex items-center gap-2 bg-surface-100 dark:bg-surface-800 rounded-xl px-3 py-1.5 border border-surface-200 dark:border-surface-700 focus-within:border-primary-500/40 focus-within:ring-2 focus-within:ring-primary-500/10 transition-all">
                  <input
                    ref={inputRef}
                    className="flex-1 bg-transparent border-none outline-none text-sm text-surface-900 dark:text-white placeholder-surface-400 py-1.5"
                    placeholder="Ask Nexify AI..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    aria-label="Type your message"
                  />
                  <button
                    onClick={send}
                    disabled={loading || !input.trim()}
                    className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
                    aria-label="Send message"
                  >
                    {loading ? <Loader size={13} className="animate-spin" /> : <Send size={13} />}
                  </button>
                </div>
                <p className="text-xs text-surface-400 mt-1.5 flex items-center gap-1">
                  <Sparkles size={10} /> Powered by AI agents · Free to use
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => { setOpen(!open); setMinimized(false) }}
        className={`relative w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all duration-300 ${
          open ? 'rotate-45 bg-surface-800 dark:bg-surface-700' : 'bg-gradient-to-br from-primary-500 to-accent-500 hover:scale-105'
        }`}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 text-white text-xs font-bold flex items-center justify-center shadow-lg animate-pulse-soft">
            1
          </span>
        )}
      </button>
    </div>
  )
}
