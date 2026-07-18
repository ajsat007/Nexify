import { NextResponse } from 'next/server'
import { sendMessage, createSession, streamMessage } from '@/lib/ai/chat'
import { ChatSchema, validate } from '@/lib/validation'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { error, data } = validate(ChatSchema, body)
    if (error) return NextResponse.json({ error }, { status: 400 })

    const sid = data!.sessionId || createSession().id
    const stream = body.stream === true

    if (stream) {
      // Return SSE (Server-Sent Events) stream
      const encoder = new TextEncoder()
      const readable = new ReadableStream({
        async start(controller) {
          let fullResponse = ''
          await streamMessage(sid, data!.message, (token: string) => {
            fullResponse += token
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token })}\n\n`))
          })
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true, sessionId: sid, fullResponse })}\n\n`))
          controller.close()
        },
      })

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      })
    }

    // Non-streaming response
    const response = await sendMessage(sid, data!.message)
    return NextResponse.json({ response, sessionId: sid })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
