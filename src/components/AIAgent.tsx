'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Bot, Send, X, Loader, MessageCircle, Zap, Sparkles,
  Minimize2, Maximize2, Trash2, Copy, Check, RefreshCw,
  StopCircle, ChevronDown, ThumbsUp, ThumbsDown
} from 'lucide-react'

// ── Types ──

interface Message {
  role: 'user' | 'ai'
  text: string
  timestamp: Date
}

interface ApiError {
  message: string
  code: string
  actionable: boolean
}

interface SseData {
  token?: string
  done?: boolean
  sessionId?: string
  fullResponse?: string
  error?: ApiError
}

// ── Suggested prompts ──

const SUGGESTED_PROMPTS = [
  'What services do you offer?',
  'How much does a chatbot cost?',
  'Tell me about your AI agents',
  'What products do you have?',
]

// ── Hook: Auto-scroll ──

function useAutoScroll(deps: unknown[]) {
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, deps)
  return bottomRef
}

// ── Helper: format timestamp ──

function formatTime(date: Date) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

// ── Helper: copy to clipboard ──

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

// ── Main Component ──

export function AIAgentWidget() {
  const [open, setOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      text: "Hey! I'm Nexify AI. Ask me anything about our services, pricing, or how our AI agents can help your business.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [apiError, setApiError] = useState<ApiError | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const bottomRef = useAutoScroll([messages, streamingText, loading])
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  // ── Send message ──

  const send = useCallback(async (retryMessage?: string) => {
    const msg = (retryMessage || input).trim()
    if (!msg || loading) return

    setInput('')
    setApiError(null)
    setStreamingText('')

    if (!retryMessage) {
      setMessages(p => [...p, { role: 'user', text: msg, timestamp: new Date() }])
    }

    setLoading(true)

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

      // Handle non-streaming error responses
      if (!res.ok) {
        const errorBody = await res.json().catch(() => null)
        const apiErr: ApiError = errorBody?.error || {
          message: 'Something went wrong. Please try again.',
          code: 'UNKNOWN',
          actionable: false,
        }
        setApiError(apiErr)
        setMessages(p => [...p, {
          role: 'ai',
          text: apiErr.message,
          timestamp: new Date(),
        }])
        setLoading(false)
        return
      }

      const reader = res.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let buffer = ''
      let fullContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          try {
            const data: SseData = JSON.parse(line.slice(6))

            if (data.error) {
              // API sent an error during streaming
              setApiError(data.error)
              if (!fullContent) {
                setMessages(p => [...p, {
                  role: 'ai',
                  text: data.error!.message,
                  timestamp: new Date(),
                }])
              }
              setLoading(false)
              setStreamingText('')
              return
            }

            if (data.done) {
              if (data.fullResponse) {
                setMessages(p => [...p, { role: 'ai', text: data.fullResponse!, timestamp: new Date() }])
              }
              setStreamingText('')
              if (data.sessionId && !sessionId) setSessionId(data.sessionId)
            } else if (data.token) {
              fullContent += data.token
              setStreamingText(fullContent)
            }
          } catch {
            // Skip malformed lines
          }
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // User stopped generation
        if (streamingText) {
          setMessages(p => [...p, { role: 'ai', text: streamingText, timestamp: new Date() }])
        }
        setStreamingText('')
        setLoading(false)
        return
      }
      // Network or other error
      const userMsg = 'I had trouble connecting. Please check your connection and try again.'
      setApiError({ message: userMsg, code: 'NETWORK_ERROR', actionable: true })
      setMessages(p => [...p, { role: 'ai', text: userMsg, timestamp: new Date() }])
    } finally {
      setLoading(false)
      setStreamingText('')
    }
  }, [input, loading, sessionId, streamingText])

  // ── Stop generation ──

  const stopGeneration = useCallback(() => {
    abortRef.current?.abort()
    if (streamingText) {
      setMessages(p => [...p, { role: 'ai', text: streamingText, timestamp: new Date() }])
    }
    setLoading(false)
    setStreamingText('')
  }, [streamingText])

  // ── Retry last message ──

  const retryLast = useCallback(() => {
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')
    if (lastUserMsg) {
      // Remove the last AI error response
      setMessages(prev => {
        const last = prev[prev.length - 1]
        if (last.role === 'ai') return prev.slice(0, -1)
        return prev
      })
      send(lastUserMsg.text)
    }
  }, [messages, send])

  // ── Copy message ──

  const handleCopy = useCallback(async (text: string, index: number) => {
    const ok = await copyToClipboard(text)
    if (ok) {
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    }
  }, [])

  // ── Clear chat ──

  const clearChat = useCallback(() => {
    abortRef.current?.abort()
    setMessages([
      { role: 'ai', text: "Hey! I'm Nexify AI. Ask me anything about our services, pricing, or how our AI agents can help your business.", timestamp: new Date() },
    ])
    setSessionId(null)
    setApiError(null)
    setStreamingText('')
    setLoading(false)
  }, [])

  // ── Handle keyboard shortcuts ──

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }, [send])

  const isFirstMessage = messages.length === 1 && messages[0].role === 'ai' && !streamingText && !loading

  // ── Render ──

  return (
    <div className="fixed bottom-6 right-6 z-chatbot flex flex-col items-end gap-3">
      {/* Chat Window */}
      {open && (
        <div
          className={`glass rounded-2xl shadow-elevated border border-white/20 dark:border-white/10 overflow-hidden transition-all duration-300 ${
            minimized ? 'w-72 h-14' : 'w-[360px] sm:w-[420px] h-[560px] max-h-[85vh]'
          }`}
        >
          {/* ── Header ── */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-surface-200/50 dark:border-surface-700/50 bg-gradient-to-r from-primary-500/5 to-accent-500/5">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-square.png"
                  alt="Nexify"
                  className="w-full h-full object-cover"
                />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-surface-900" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-surface-900 dark:text-white leading-tight">Nexify AI</h3>
                <p className="text-xs text-surface-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
                  Online
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
              <button onClick={() => { setOpen(false); setMinimized(false) }} className="btn-icon !w-7 !h-7" title="Close">
                <X size={12} />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* ── Messages ── */}
              <div
                className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface-50/50 dark:bg-surface-925/50"
                style={{ height: 'calc(100% - 112px)' }}
                role="log"
                aria-live="polite"
                aria-label="Chat messages"
              >
                {messages.map((m, i) => (
                  <div key={i} className={`group flex gap-2.5 ${m.role === 'user' ? 'flex-row-reverse' : ''} animate-slide-up-sm`}>
                    {/* Avatar */}
                    {m.role === 'ai' && (
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/logo-square.png" alt="Nexify" className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Message bubble */}
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                        m.role === 'user'
                          ? 'bg-primary-500 text-white rounded-tr-sm shadow-sm'
                          : 'glass-card text-surface-700 dark:text-surface-300 rounded-tl-sm'
                      }`}
                    >
                      {m.text}

                      {/* Timestamp & actions */}
                      <div className={`flex items-center gap-2 mt-1.5 ${
                        m.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}>
                        <span className={`text-[10px] opacity-50 ${
                          m.role === 'user' ? 'text-white/60' : 'text-surface-400'
                        }`}>
                          {formatTime(m.timestamp)}
                        </span>
                        {m.role === 'ai' && (
                          <button
                            onClick={() => handleCopy(m.text, i)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Copy message"
                          >
                            {copiedIndex === i ? (
                              <Check size={10} className="text-emerald-500" />
                            ) : (
                              <Copy size={10} className={`${m.role === 'ai' ? 'text-surface-400 hover:text-surface-600' : 'text-white/60 hover:text-white'}`} />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* ── Streaming indicator ── */}
                {streamingText && (
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/logo-square.png" alt="Nexify" className="w-full h-full object-cover" />
                    </div>
                    <div className="max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed glass-card rounded-tl-sm">
                      {streamingText}
                      <span className="inline-block w-2 h-4 bg-primary-500 ml-0.5 rounded-sm animate-pulse align-middle" style={{ animationDuration: '0.8s' }} />
                    </div>
                  </div>
                )}

                {/* ── Thinking animation ── */}
                {loading && !streamingText && (
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/logo-square.png" alt="Nexify" className="w-full h-full object-cover" />
                    </div>
                    <div className="glass-card rounded-2xl p-4 flex items-center gap-3 text-sm text-surface-500">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1.2s' }} />
                        <span className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1.2s' }} />
                        <span className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1.2s' }} />
                      </div>
                      <span className="text-xs font-medium">Nexify AI is thinking...</span>
                    </div>
                  </div>
                )}

                {/* ── Retry button after error ── */}
                {apiError && apiError.actionable && !loading && (
                  <div className="flex justify-center pt-2">
                    <button
                      onClick={retryLast}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-surface-600 dark:text-surface-400 bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors border border-surface-200 dark:border-surface-700"
                    >
                      <RefreshCw size={12} /> Retry
                    </button>
                  </div>
                )}

                {/* ── Suggested prompts ── */}
                {isFirstMessage && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {SUGGESTED_PROMPTS.map(p => (
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

              {/* ── Input ── */}
              <div className="p-3 border-t border-surface-200/50 dark:border-surface-700/50 bg-white/50 dark:bg-surface-900/50">
                <div className="flex items-center gap-2 bg-surface-100 dark:bg-surface-800 rounded-xl px-3 py-1.5 border border-surface-200 dark:border-surface-700 focus-within:border-primary-500/40 focus-within:ring-2 focus-within:ring-primary-500/10 transition-all">
                  <input
                    ref={inputRef}
                    className="flex-1 bg-transparent border-none outline-none text-sm text-surface-900 dark:text-white placeholder-surface-400 py-1.5 min-w-0"
                    placeholder="Ask Nexify AI..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    aria-label="Type your message"
                    disabled={loading}
                  />
                  {loading ? (
                    <button
                      onClick={stopGeneration}
                      className="w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all shrink-0"
                      aria-label="Stop generation"
                      title="Stop generation"
                    >
                      <StopCircle size={13} />
                    </button>
                  ) : (
                    <button
                      onClick={() => send()}
                      disabled={!input.trim()}
                      className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
                      aria-label="Send message"
                    >
                      <Send size={13} />
                    </button>
                  )}
                </div>
                <p className="text-xs text-surface-400 mt-1.5 flex items-center gap-1 justify-between">
                  <span className="flex items-center gap-1">
                    <Sparkles size={10} /> Powered by Nexify AI
                  </span>
                  <span className="text-surface-300 dark:text-surface-500">
                    Enter to send
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── FAB Button ── */}
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
