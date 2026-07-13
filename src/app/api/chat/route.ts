import { NextResponse } from 'next/server'
import { sendMessage, createSession } from '@/lib/ai/chat'
import { ChatSchema, validate } from '@/lib/validation'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { error, data } = validate(ChatSchema, body)
    if (error) return NextResponse.json({ error }, { status: 400 })

    const sid = data!.sessionId || createSession().id
    const response = await sendMessage(sid, data!.message)

    return NextResponse.json({ response, sessionId: sid })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
