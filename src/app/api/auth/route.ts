import { NextResponse } from 'next/server'

const USERS = [
  { id: 'usr-001', name: 'Nexify Founder', email: 'founder@nexify.tech', role: 'founder' },
  { id: 'usr-002', name: 'Nexify Orchestrator', email: 'admin@nexify.tech', role: 'admin' },
  { id: 'usr-003', name: 'SalesAgent-Mu', email: 'sales@nexify.tech', role: 'sales' },
]

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })
    const user = USERS.find(u => u.email === email)
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 401 })
    return NextResponse.json({ user, token: 'nexify-' + user.id + '-' + Date.now() })
  } catch { return NextResponse.json({ error: 'Invalid request' }, { status: 400 }) }
}

export async function GET() {
  return NextResponse.json({ users: USERS })
}
