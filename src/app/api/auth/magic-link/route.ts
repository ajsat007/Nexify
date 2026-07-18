// ============================================================================
// Magic Link Auth — Send one-time login link to email
// Uses Resend (free tier, 100 emails/day)
// ============================================================================

import { NextResponse } from 'next/server'
import { sendEmail, magicLinkEmail } from '@/lib/email'
import { getDb } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 })

    // Verify this email exists as a lead
    const db = getDb()
    const lead = db.prepare('SELECT * FROM leads WHERE email = ?').get(email) as any
    if (!lead) return NextResponse.json({ error: 'No account found with this email' }, { status: 404 })

    // Generate a one-time token (store hashed in DB, but for MVP use signed JWT-like token)
    const token = Buffer.from(`${email}:${Date.now()}:nexify-magic`).toString('base64')
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexify.tech'
    const magicLink = `${siteUrl}/portal?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`

    // Store the token in the DB for verification
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes
    db.prepare('UPDATE leads SET notes = ? WHERE email = ?').run(
      JSON.stringify({ magicToken: token, magicExpires: expiresAt }),
      email
    )

    // Send the email
    const result = await sendEmail({
      to: email,
      subject: 'Sign in to Nexify Client Portal',
      html: magicLinkEmail(magicLink),
    })

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Magic link sent to your email' })
    }

    // If email fails, return the link directly (dev mode)
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({ success: true, message: 'Dev mode: link below', devLink: magicLink })
    }

    return NextResponse.json({ error: 'Failed to send email. Check RESEND_API_KEY.' }, { status: 500 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
