// ============================================================================
// Accept Proposal — Client accepts a proposal, auto-creates project + invoice
// ============================================================================

import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { getProposal, updateProposalStatus, getLead } from '@/lib/db/queries'
import { createOrder, isRazorpayConfigured } from '@/lib/payments/razorpay'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const { proposalId } = await request.json()
    if (!proposalId) return NextResponse.json({ error: 'proposalId required' }, { status: 400 })

    const db = getDb()
    const proposal = getProposal(proposalId)
    if (!proposal) return NextResponse.json({ error: 'Proposal not found' }, { status: 404 })

    const lead = getLead(proposal.lead_id)
    if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 })

    // Mark proposal as accepted
    updateProposalStatus(proposalId, 'accepted')

    // Mark lead as won
    db.prepare("UPDATE leads SET status = 'won', updated_at = datetime('now') WHERE id = ?")
      .run(proposal.lead_id)

    // Parse amount from price_range (remove ₹ and commas)
    const amount = lead.budget || 50000
    const projectName = `Project: ${lead.service_interest} — ${lead.company}`

    // Create project
    const projectId = `PRJ-${Date.now().toString(36).toUpperCase()}`
    db.prepare(`
      INSERT INTO projects (id, name, client, description, value, status, progress, lead_id, proposal_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 'active', 5, ?, ?, datetime('now'), datetime('now'))
    `).run(projectId, projectName, lead.company, lead.notes || lead.service_interest, amount, lead.id, proposalId)

    // Create invoice
    const invoiceId = `INV-${Date.now().toString(36).toUpperCase()}`
    db.prepare(`
      INSERT INTO invoices (id, project_id, client, amount, status, due_date, items, created_at)
      VALUES (?, ?, ?, ?, 'sent', ?, ?, datetime('now'))
    `).run(
      invoiceId, projectId, lead.company, amount,
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      JSON.stringify([{ description: projectName, amount }])
    )

    // Create Razorpay order if configured
    let paymentLink = null
    if (isRazorpayConfigured()) {
      const order = await createOrder({
        amount: amount,
        currency: 'INR',
        receipt: invoiceId,
        notes: { proposal_id: proposalId, lead_id: lead.id, invoice_id: invoiceId },
      })
      if (order.success && order.order) {
        paymentLink = {
          orderId: order.order.id,
          amount: order.order.amount,
          keyId: process.env.RAZORPAY_KEY_ID,
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Proposal accepted! Project created.',
      projectId,
      invoiceId,
      paymentLink,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
