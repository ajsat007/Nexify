import { NextResponse } from 'next/server'
import { ContactSchema, validate } from '@/lib/validation'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { error } = validate(ContactSchema, body)
    if (error) return NextResponse.json({ error }, { status: 400 })
    return NextResponse.json({
      success: true,
      message: 'Message received. AI agents will respond within 24 hours.',
      ticketId: 'TKT-' + Date.now().toString(36).toUpperCase(),
    })
  } catch { return NextResponse.json({ error: 'Invalid request' }, { status: 400 }) }
}
