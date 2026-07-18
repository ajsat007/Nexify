// ============================================================================
// Contact Form → Auto Pipeline
// 1. Creates lead in DB
// 2. AI auto-generates proposal
// 3. AI auto-emails proposal to client with portal link
// Zero manual steps required.
// ============================================================================

import { NextResponse } from 'next/server'
import { ContactSchema, validate } from '@/lib/validation'
import { createLead, getLead } from '@/lib/db/queries'
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

    // 2. Auto-generate proposal via AI (fire and forget — don't block the response)
    generateAndEmailProposal(lead.id, lead)

    return NextResponse.json({
      success: true,
      message: 'AI agents are analyzing your requirements and preparing a proposal. Check your email shortly.',
      leadId: lead.id,
      ticketId: `TKT-${Date.now().toString(36).toUpperCase()}`,
    })
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 400 })
  }
}

// ── Background: AI generates proposal + emails it ──

async function generateAndEmailProposal(leadId: string, lead: any) {
  try {
    // 2a. AI generates the proposal
    const aiResponse = await complete({
      messages: [
        {
          role: 'system',
          content: `You are Sales-Mu, the AI proposal agent at Nexify Technologies. Generate a professional, detailed proposal for a software development project.

          Format with these sections:
          - Executive Summary
          - Technical Approach
          - Project Timeline
          - Pricing Breakdown (in INR)
          - Deliverables
          - Next Steps

          Be specific about pricing (in ₹), timelines (in weeks), and deliverables. Match the scope to the budget provided. Keep the tone professional and confident.`,
        },
        {
          role: 'user',
          content: `Generate a proposal for:
          Company: ${lead.company}
          Contact: ${lead.contact_name}
          Email: ${lead.email}
          Service: ${lead.service_interest}
          Budget: ₹${(lead.budget || 0).toLocaleString('en-IN')}
          Requirements: ${lead.notes || 'Custom software development project'}
          `,
        },
      ],
      temperature: 0.7,
      maxTokens: 2048,
    })

    // 2b. Store proposal in database
    const db = getDb()
    const proposalId = `PRL-${Date.now().toString(36).toUpperCase()}`
    db.prepare(`
      INSERT INTO proposals (id, lead_id, title, content, price_range, timeline, status, generated_by, created_at)
      VALUES (?, ?, ?, ?, ?, ?, 'draft', 'ai', datetime('now'))
    `).run(
      proposalId,
      leadId,
      `Proposal for ${lead.company} — ${lead.service_interest}`,
      aiResponse.content,
      `₹${(lead.budget || 0).toLocaleString('en-IN')}`,
      `${Math.ceil(Math.random() * 8 + 4)} weeks`
    )

    // 2c. Mark lead as proposal stage
    db.prepare("UPDATE leads SET status = 'proposal', updated_at = datetime('now') WHERE id = ?").run(leadId)

    // 2d. Email the proposal to the client
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexify-rouge.vercel.app'
    const portalLink = `${siteUrl}/portal?email=${encodeURIComponent(lead.email)}`

    await sendEmail({
      to: lead.email,
      subject: `Your Proposal from Nexify AI — ${lead.service_interest} for ${lead.company}`,
      html: proposalReadyEmail(lead.contact_name, `${lead.service_interest} — ${lead.company}`, portalLink),
    })

    // 2e. Mark proposal as sent
    db.prepare("UPDATE proposals SET status = 'sent', sent_at = datetime('now') WHERE id = ?").run(proposalId)

    console.log(`[Auto-Pipeline] ✅ Lead ${leadId}: Proposal generated + emailed to ${lead.email}`)
  } catch (err) {
    console.error(`[Auto-Pipeline] ❌ Lead ${leadId}: Failed after creation:`, err)
  }
}
