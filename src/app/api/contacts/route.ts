import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message required' }, { status: 400 })
    }
    return NextResponse.json({
      success: true,
      message: 'Message received. AI agents will respond within 24 hours.',
      ticketId: 'TKT-' + Date.now().toString(36).toUpperCase(),
    })
  } catch { return NextResponse.json({ error: 'Invalid request' }, { status: 400 }) }
}
