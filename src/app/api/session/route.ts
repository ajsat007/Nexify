// ============================================================================
// Session Management — Cookie-based auth for admin & portal
// Simple token stored in DB, set as httpOnly cookie
// ============================================================================

import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

// Create a session for a user/lead
export async function POST(request: Request) {
  try {
    const { email, role } = await request.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    const db = getDb()
    const token = Buffer.from(`${email}:${Date.now()}:${Math.random().toString(36)}`).toString('base64')
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days

    // Store session
    db.prepare(`INSERT OR REPLACE INTO sessions (id, email, role, expires_at) VALUES (?, ?, ?, ?)`)
      .run(token, email, role || 'client', expiresAt)

    // Set cookie
    const response = NextResponse.json({ success: true, email, role: role || 'client' })
    response.cookies.set('nexify_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    })

    return response
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// Verify current session
export async function GET() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('nexify_session')?.value
    if (!token) return NextResponse.json({ authenticated: false }, { status: 401 })

    const db = getDb()
    const session = db.prepare('SELECT * FROM sessions WHERE id = ? AND expires_at > datetime(?)')
      .get(token, new Date().toISOString()) as any

    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({
      authenticated: true,
      email: session.email,
      role: session.role,
    })
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}

// Destroy session (logout)
export async function DELETE() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('nexify_session')?.value
    if (token) {
      const db = getDb()
      db.prepare('DELETE FROM sessions WHERE id = ?').run(token)
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set('nexify_session', '', { maxAge: 0, path: '/' })
    return response
  } catch {
    return NextResponse.json({ error: 'Failed to logout' }, { status: 500 })
  }
}
