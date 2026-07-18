// ============================================================================
// Razorpay Webhook — Handle payment success/failure events
// Updates invoice/project status when payment is confirmed
// ============================================================================

import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { sendEmail, paymentReceiptEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { event, payload } = body

    // Only handle payment captured events
    if (event !== 'payment.captured') {
      return NextResponse.json({ received: true })
    }

    const paymentId = payload?.payment?.entity?.id
    const orderId = payload?.payment?.entity?.order_id
    const amount = payload?.payment?.entity?.amount || 0 // in paise
    const email = payload?.payment?.entity?.email
    const notes = payload?.payment?.entity?.notes || {}

    // Update the invoice in the database
    const db = getDb()
    const invoiceId = notes.invoice_id || notes.receipt

    if (invoiceId) {
      db.prepare(`
        UPDATE invoices SET status = 'paid', paid_at = datetime('now')
        WHERE id = ? AND status != 'paid'
      `).run(invoiceId)

      // Send receipt email
      if (email) {
        await sendEmail({
          to: email,
          subject: 'Payment Received — Nexify Technologies',
          html: paymentReceiptEmail(notes.client_name || 'Client', `${(amount / 100).toLocaleString('en-IN')}`, invoiceId),
        })
      }
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.error('[Razorpay Webhook] Error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
