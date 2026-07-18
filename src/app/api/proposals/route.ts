import { NextResponse } from 'next/server'
import { getProposals, getProposal, createProposal, updateProposalStatus } from '@/lib/db/queries'
import { getLead } from '@/lib/db/queries'
import { complete } from '@/lib/ai/providers/client'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const leadId = searchParams.get('leadId')
    const id = searchParams.get('id')
    if (id) {
      const proposal = getProposal(id)
      if (!proposal) return NextResponse.json({ error: 'Proposal not found' }, { status: 404 })
      return NextResponse.json(proposal)
    }
    const proposals = getProposals(leadId || undefined)
    return NextResponse.json({ proposals, total: proposals.length })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch proposals' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { leadId } = body
    if (!leadId) return NextResponse.json({ error: 'leadId is required' }, { status: 400 })

    const lead = getLead(leadId)
    if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 })

    // AI generates the proposal content
    const aiResponse = await complete({
      messages: [
        {
          role: 'system',
          content: `You are the Sales-Mu proposal agent at Nexify Technologies. Generate a professional software development proposal.
          Be specific about pricing, timeline, and deliverables. Format with markdown headings.`,
        },
        {
          role: 'user',
          content: `Generate a proposal for:
          Company: ${lead.company}
          Contact: ${lead.contact_name}
          Email: ${lead.email}
          Service: ${lead.service_interest}
          Budget: ₹${lead.budget.toLocaleString('en-IN')}
          Notes: ${lead.notes}

          Include: executive summary, technical approach, timeline, pricing breakdown, and next steps.`,
        },
      ],
      temperature: 0.7,
      maxTokens: 2048,
    })

    const proposal = createProposal({
      lead_id: leadId,
      title: `Proposal for ${lead.company} — ${lead.service_interest}`,
      content: aiResponse.content,
      price_range: `₹${lead.budget.toLocaleString('en-IN')}`,
      timeline: 'To be determined',
    })

    // Mark lead as proposal sent
    const { updateLead } = await import('@/lib/db/queries')
    updateLead(leadId, { status: 'proposal' })

    return NextResponse.json(proposal, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate proposal: ' + String(error) }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, status } = body
    if (!id || !status) return NextResponse.json({ error: 'id and status required' }, { status: 400 })
    updateProposalStatus(id, status)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to update proposal' }, { status: 500 })
  }
}
