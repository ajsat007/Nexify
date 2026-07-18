// ============================================================================
// Contact Form → Auto Pipeline
// 1. Creates lead in DB → returns immediately
// 2. AI generates proposal + emails in background (via setTimeout)
// Client gets instant response, AI works in background.
// ============================================================================

import { NextResponse } from 'next/server'
import { ContactSchema, validate } from '@/lib/validation'
import { createLead } from '@/lib/db/queries'
import { sendEmail, proposalReadyEmail } from '@/lib/email'
import { complete } from '@/lib/ai/providers/client'
import { getDb } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { error, data } = validate(ContactSchema, body)
    if (error) return NextResponse.json({ error }, { status: 400 })

    // 1. Create lead in database
    const lead = createLead({
      contact_name: data!.name,
      email: data!.email,
      company: data!.company || '',
      service_interest: data!.service || '',
      budget: data!.budget ? Number(String(data!.budget).replace(/[^0-9]/g, '')) : 0,
      notes: data!.message,
      source: 'website',
    })

    // 2. Background: generate proposal + email (non-blocking)
    generateProposalForLead(lead)

    return NextResponse.json({
      success: true,
      message: 'We received your inquiry. AI agents are preparing your proposal — check your email shortly.',
      leadId: lead.id,
    })
  } catch (err: any) {
    console.error('[Contact] Error:', err)
    return NextResponse.json({ error: err?.message || 'Something went wrong. Please try again.' }, { status: 400 })
  }
}

// ── Background proposal generation ──

async function generateProposalForLead(lead: any) {
  try {
    const aiResponse = await complete({
      messages: [
        {
          role: 'system',
          content: `You are Sales-Mu, the AI proposal agent at Nexify Technologies. Generate a professional proposal.

          Sections: Executive Summary | Technical Approach | Project Timeline | Pricing Breakdown | Deliverables | Next Steps

          Be specific about pricing, timelines (weeks), and deliverables. Professional and confident tone.`,
        },
        {
          role: 'user',
          content: `Generate proposal for:
          Company: ${lead.company || lead.contact_name}
          Contact: ${lead.contact_name}
          Email: ${lead.email}
          Service: ${lead.service_interest || 'Custom Software'}
          Budget: ${(lead.budget || 0).toLocaleString('en-IN')}
          Requirements: ${lead.notes || 'Software development project'}`,
        },
      ],
      temperature: 0.7,
      maxTokens: 2048,
    })

    const db = getDb()
    const proposalId = `PRL-${Date.now().toString(36).toUpperCase()}`
    db.prepare(`
      INSERT INTO proposals (id, lead_id, title, content, price_range, timeline, status, generated_by, created_at)
      VALUES (?, ?, ?, ?, ?, ?, 'draft', 'ai', datetime('now'))
    `).run(
      proposalId,
      lead.id,
      `Proposal for ${lead.company || lead.contact_name} — ${lead.service_interest || 'Software Development'}`,
      aiResponse.content,
      `${(lead.budget || 0).toLocaleString('en-IN')}`,
      `${Math.ceil(Math.random() * 8 + 4)} weeks`
    )

    db.prepare("UPDATE leads SET status = 'proposal', updated_at = datetime('now') WHERE id = ?").run(lead.id)

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexify-rouge.vercel.app'
    const portalLink = `${siteUrl}/portal?email=${lead.email}`

    const emailResult = await sendEmail({
      to: lead.email,
      subject: `Your Proposal from Nexify AI — ${lead.service_interest || 'Software'} for ${lead.company || lead.contact_name}`,
      html: proposalReadyEmail(lead.contact_name, `${lead.service_interest || 'Software Development'} — ${lead.company || lead.contact_name}`, portalLink),
    })

    if (emailResult.success) {
      db.prepare("UPDATE proposals SET status = 'sent', sent_at = datetime('now') WHERE id = ?").run(proposalId)
    }
  } catch (err) {
    console.error('[Background] Proposal generation failed:', err)
  }
}
