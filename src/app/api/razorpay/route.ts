// ============================================================================
// Razorpay — Create Payment Order
// Called from the frontend when a client wants to pay an invoice/proposal
// ============================================================================

import { NextResponse } from 'next/server'
import { createOrder, isRazorpayConfigured } from '@/lib/payments/razorpay'
import { getDb } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    if (!isRazorpayConfigured()) {
      return NextResponse.json({ error: 'Razorpay not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.' }, { status: 400 })
    }

    const body = await request.json()
    const { amount, currency, receipt, notes } = body

    if (!amount || !receipt) {
      return NextResponse.json({ error: 'amount and receipt are required' }, { status: 400 })
    }

    // Amount should be in paise (₹1 = 100 paise)
    const amountInPaise = Math.round(amount * 100)

    const result = await createOrder({
      amount: amountInPaise,
      currency: currency || 'INR',
      receipt,
      notes: notes || {},
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Failed to create order' }, { status: 500 })
    }

    return NextResponse.json({
      orderId: result.order!.id,
      amount: result.order!.amount,
      currency: result.order!.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
