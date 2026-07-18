// ============================================================================
// Email Proposal — Send proposal to lead via email
// Looks up the latest proposal for a lead and emails it with portal link
// ============================================================================

import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { sendEmail, proposalReadyEmail } from '@/lib/email'
import { getLead, getProposals, updateProposalStatus, updateLead } from '@/lib/db/queries'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const { leadId } = await request.json()
    if (!leadId) return NextResponse.json({ error: 'leadId is required' }, { status: 400 })

    const lead = getLead(leadId)
    if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 })

    // Get the latest proposal for this lead
    const proposals = getProposals(leadId)
    if (proposals.length === 0) return NextResponse.json({ error: 'No proposals found for this lead' }, { status: 404 })

    const proposal = proposals[0]
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexify.tech'
    const portalLink = `${siteUrl}/portal?email=${encodeURIComponent(lead.email)}`

    // Send the email
    const result = await sendEmail({
      to: lead.email,
      subject: `Your Proposal from Nexify — ${proposal.title}`,
      html: proposalReadyEmail(lead.contact_name, proposal.title, portalLink),
    })

    // Mark proposal as sent
    updateProposalStatus(proposal.id, 'sent')
    updateLead(leadId, { status: 'proposal' })

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Proposal sent to ' + lead.email })
    }

    // If email fails, still mark as sent (the admin can share the portal link manually)
    return NextResponse.json({
      success: true,
      message: 'Proposal marked as sent. Configure RESEND_API_KEY to auto-send emails.',
      portalLink,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
