import { NextResponse } from 'next/server'
import { sendMessage, createSession } from '@/lib/ai/chat'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const { message, sessionId } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const sid = sessionId || createSession().id
    const response = await sendMessage(sid, message)

    return NextResponse.json({ response, sessionId: sid })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
