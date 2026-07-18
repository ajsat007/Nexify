// ============================================================================
// Contact Form → Auto Pipeline (Synchronous — completes before responding)
// 1. Creates lead in DB
// 2. AI generates proposal
// 3. Emails proposal to client with portal link
// Zero manual steps required.
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
      budget: data!.budget ? Number(data!.budget.replace(/[^0-9]/g, '')) : 0,
      notes: data!.message,
      source: 'website',
    })

    // 2. Generate AI proposal (synchronous — completes before responding)
    let proposalGenerated = false
    let proposalId = ''
    try {
      const aiResponse = await complete({
        messages: [
          {
            role: 'system',
            content: `You are Sales-Mu, the AI proposal agent at Nexify Technologies. Generate a professional, detailed proposal for a software development project.

            Format with these sections:
            - Executive Summary
            - Technical Approach
            - Project Timeline
            - Pricing Breakdown
            - Deliverables
            - Next Steps

            Be specific about pricing (in ), timelines (in weeks), and deliverables. Keep the tone professional and confident.`,
          },
          {
            role: 'user',
            content: `Generate a proposal for:
            Company: ${lead.company || 'the client'}
            Contact: ${lead.contact_name}
            Email: ${lead.email}
            Service: ${lead.service_interest || 'Custom Software'}
            Budget: ${(lead.budget || 0).toLocaleString('en-IN')}
            Requirements: ${lead.notes || 'Custom software development project'}`,
          },
        ],
        temperature: 0.7,
        maxTokens: 2048,
      })

      // Store proposal in database
      const db = getDb()
      proposalId = `PRL-${Date.now().toString(36).toUpperCase()}`
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

      // Mark lead as proposal stage
      db.prepare("UPDATE leads SET status = 'proposal', updated_at = datetime('now') WHERE id = ?").run(lead.id)

      // Email the proposal
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexify-rouge.vercel.app'
      const portalLink = `${siteUrl}/portal?email=${lead.email}`

      const emailResult = await sendEmail({
        to: lead.email,
        subject: `Your Proposal from Nexify AI — ${lead.service_interest || 'Software'} for ${lead.company || lead.contact_name}`,
        html: proposalReadyEmail(lead.contact_name, `${lead.service_interest || 'Software Development'} — ${lead.company || lead.contact_name}`, portalLink),
      })

      if (emailResult.success) {
        db.prepare("UPDATE proposals SET status = 'sent', sent_at = datetime('now') WHERE id = ?").run(proposalId)
        proposalGenerated = true
      }
    } catch (err) {
      console.error('Auto-pipeline error (non-fatal):', err)
      // Lead was created — partial success is still a success
    }

    return NextResponse.json({
      success: true,
      message: proposalGenerated
        ? 'Proposal generated and sent to your email. Check your inbox (and spam folder) for the portal link.'
        : 'We received your inquiry. Our AI agents are preparing a proposal — you\'ll hear from us shortly.',
      leadId: lead.id,
      proposalGenerated,
    })
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 400 })
  }
}
