// ============================================================================
// Nexify — Razorpay Payment Integration
// Free to use: 2% fee per transaction, no setup cost
// Sign up at https://razorpay.com
// ============================================================================

import Razorpay from 'razorpay'

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || ''
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || ''

let client: Razorpay | null = null

function getClient(): Razorpay | null {
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    console.warn('[Razorpay] RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET not set')
    return null
  }
  if (!client) {
    client = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    })
  }
  return client
}

export interface CreateOrderParams {
  amount: number // in paise (₹1 = 100 paise)
  currency?: string
  receipt: string
  notes?: Record<string, string>
}

export interface RazorpayOrder {
  id: string
  amount: number
  currency: string
  receipt: string
  status: string
  notes: Record<string, string>
}

export async function createOrder(params: CreateOrderParams): Promise<{ success: boolean; order?: RazorpayOrder; error?: string }> {
  const rzp = getClient()
  if (!rzp) return { success: false, error: 'Razorpay not configured' }

  try {
    const order = await rzp.orders.create({
      amount: params.amount,
      currency: params.currency || 'INR',
      receipt: params.receipt,
      notes: params.notes || {},
    })
    return { success: true, order: order as unknown as RazorpayOrder }
  } catch (err: any) {
    console.error('[Razorpay] Create order failed:', err.message)
    return { success: false, error: err.message }
  }
}

export async function verifyPayment(
  orderId: string,
  paymentId: string,
  signature: string
): Promise<boolean> {
  const crypto = await import('crypto')
  const expectedSig = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex')
  return expectedSig === signature
}

export function isRazorpayConfigured(): boolean {
  return !!(RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET)
}
