// ============================================================================
// Nexify AI Chat API — Production-Grade Endpoint
// Handles streaming + non-streaming chat with automatic provider fallback,
// request validation, transient-failure retry, and detailed error diagnostics
// ============================================================================

import { NextResponse } from 'next/server'
import { sendMessage, createSession, streamMessage } from '@/lib/ai/chat'
import { ChatSchema, validate } from '@/lib/validation'
import { getAvailableProviders, getProvider } from '@/lib/ai/providers/client'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// ── Internal error logger (never exposes stack traces to clients) ──
function logError(context: string, error: unknown, meta?: Record<string, unknown>) {
  const timestamp = new Date().toISOString()
  const message = error instanceof Error ? error.message : String(error)
  const stack = error instanceof Error ? error.stack?.split('\n').slice(0, 4).join('\n') : undefined
  console.error(`[Chat API] ${timestamp} | ${context} | ${message}`)
  if (stack) console.error(`[Chat API] Stack: ${stack}`)
  if (meta && Object.keys(meta).length) console.error(`[Chat API] Meta:`, JSON.stringify(meta))
}

// ── Friendly error messages for users (no stack traces) ──
interface UserFacingError {
  message: string
  code: string
  actionable: boolean
}

const ERROR_MAP: Record<string, UserFacingError> = {
  VALIDATION_ERROR: {
    message: 'Please check your message and try again.',
    code: 'VALIDATION_ERROR',
    actionable: true,
  },
  PROVIDER_UNAVAILABLE: {
    message: 'The AI service is temporarily unavailable. Our team has been notified. Please try again in a moment.',
    code: 'PROVIDER_UNAVAILABLE',
    actionable: false,
  },
  RATE_LIMITED: {
    message: 'You\'re sending messages too quickly. Please wait a moment and try again.',
    code: 'RATE_LIMITED',
    actionable: true,
  },
  TIMEOUT: {
    message: 'The AI took too long to respond. This sometimes happens during high load. Please try again.',
    code: 'TIMEOUT',
    actionable: true,
  },
  NETWORK_ERROR: {
    message: 'A network error occurred. Please check your connection and try again.',
    code: 'NETWORK_ERROR',
    actionable: true,
  },
  UNKNOWN: {
    message: 'Something unexpected happened. Our team has been notified and is looking into it.',
    code: 'UNKNOWN',
    actionable: false,
  },
}

function classifyError(error: unknown): UserFacingError {
  const msg = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase()

  if (msg.includes('rate limit') || msg.includes('429') || msg.includes('too many')) {
    return ERROR_MAP.RATE_LIMITED
  }
  if (msg.includes('timeout') || msg.includes('time out') || msg.includes('abort')) {
    return ERROR_MAP.TIMEOUT
  }
  if (msg.includes('network') || msg.includes('econnrefused') || msg.includes('enotfound') || msg.includes('fetch failed')) {
    return ERROR_MAP.NETWORK_ERROR
  }
  if (msg.includes('provider') || msg.includes('unavailable') || msg.includes('model') || msg.includes('api key') || msg.includes('not found')) {
    return ERROR_MAP.PROVIDER_UNAVAILABLE
  }
  return ERROR_MAP.UNKNOWN
}

// ── Retry with exponential backoff ──
async function withRetry<T>(
  fn: () => Promise<T>,
  options: { maxRetries?: number; baseDelay?: number; context?: string } = {}
): Promise<T> {
  const { maxRetries = 2, baseDelay = 1000, context = 'operation' } = options
  let lastError: unknown

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      const msg = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase()

      // Don't retry validation errors or non-retryable failures
      if (msg.includes('validation') || msg.includes('invalid') || msg.includes('not found')) {
        throw error
      }

      if (attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 200
        logError(`Retry ${attempt + 1}/${maxRetries} for ${context} — waiting ${Math.round(delay)}ms`, error)
        await new Promise(r => setTimeout(r, delay))
      }
    }
  }
  throw lastError
}

// ── GET: Health check (without auth) ──
export async function GET() {
  try {
    const providers = await getAvailableProviders()
    const activeProvider = await getProvider().catch(() => null)

    return NextResponse.json({
      status: 'ok',
      providers,
      active: activeProvider ? activeProvider.name : 'none',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    logError('GET /api/chat — health check failed', error)
    return NextResponse.json(
      { status: 'degraded', error: 'Chat service starting up' },
      { status: 503 }
    )
  }
}

// ── POST: Send a chat message ──
export async function POST(request: Request) {
  let body: any
  let sid: string | null = null

  try {
    // Parse request body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({
        error: { message: 'Invalid request format. Please send valid JSON.', code: 'VALIDATION_ERROR' },
      }, { status: 400 })
    }

    // Validate message
    const { error, data } = validate(ChatSchema, body)
    if (error) {
      return NextResponse.json({
        error: { message: error, code: 'VALIDATION_ERROR', actionable: true },
      }, { status: 400 })
    }

    // Validate stream parameter if provided
    if (body.stream !== undefined && typeof body.stream !== 'boolean') {
      return NextResponse.json({
        error: { message: 'Invalid stream parameter. Use true or false.', code: 'VALIDATION_ERROR', actionable: true },
      }, { status: 400 }
      )
    }

    const stream = body.stream === true
    sid = data!.sessionId || createSession().id

    if (stream) {
      // ── Streaming response (SSE) ──
      const encoder = new TextEncoder()
      const readable = new ReadableStream({
        async start(controller) {
          let fullResponse = ''
          let hasError = false

          try {
            await withRetry(() =>
              streamMessage(sid!, data!.message, (token: string) => {
                fullResponse += token
                try {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token })}\n\n`))
                } catch (e) {
                  // Client disconnected — stop streaming
                  logError('Stream — client disconnected during token send', e)
                  hasError = true
                }
              }),
              { maxRetries: 2, baseDelay: 1000, context: 'streamMessage' }
            )

            if (!hasError) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ done: true, sessionId: sid, fullResponse })}\n\n`)
              )
            }
          } catch (streamError) {
            const userError = classifyError(streamError)
            logError('Stream — failed to produce response', streamError, { sessionId: sid })

            try {
              const errorPayload = JSON.stringify({ error: userError, done: true })
              controller.enqueue(encoder.encode(`data: ${errorPayload}\n\n`))
            } catch { /* ignore enqueue errors during error handling */ }
          } finally {
            try { controller.close() } catch { /* already closed */ }
          }
        },
      })

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          'Connection': 'keep-alive',
          'X-Accel-Buffering': 'no',
        },
      })
    }

    // ── Non-streaming response ──
    const response = await withRetry(
      () => sendMessage(sid!, data!.message),
      { maxRetries: 2, baseDelay: 1000, context: 'sendMessage' }
    )
    return NextResponse.json({ response, sessionId: sid })

  } catch (error) {
    logError('POST /api/chat', error, { sessionId: sid })
    const userError = classifyError(error)

    return NextResponse.json(
      { error: userError, sessionId: sid },
      { status: userError.code === 'VALIDATION_ERROR' ? 400 : 503 }
    )
  }
}
