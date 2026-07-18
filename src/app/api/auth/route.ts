import { NextResponse } from 'next/server'
import { AuthSchema, validate } from '@/lib/validation'
import { validateApiRequest } from '@/lib/auth'

const USERS = [
  { id: 'usr-001', name: 'Nexify Founder', email: 'founder@nexify.tech', role: 'founder' },
  { id: 'usr-002', name: 'Nexify Orchestrator', email: 'admin@nexify.tech', role: 'admin' },
  { id: 'usr-003', name: 'SalesAgent-Mu', email: 'sales@nexify.tech', role: 'sales' },
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { error, data } = validate(AuthSchema, body)
    if (error) return NextResponse.json({ error }, { status: 400 })
    const user = USERS.find(u => u.email === data!.email)
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 401 })
    return NextResponse.json({ user, token: 'nexify-' + user.id + '-' + Date.now() })
  } catch { return NextResponse.json({ error: 'Invalid request' }, { status: 400 }) }
}

export async function GET(request: Request) {
  // Require auth to list users — prevent public data leak
  const auth = validateApiRequest(request)
  if (!auth.valid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // Return sanitized user list (no emails)
  const sanitized = USERS.map(({ email: _email, ...rest }) => rest)
  return NextResponse.json({ users: sanitized })
}
