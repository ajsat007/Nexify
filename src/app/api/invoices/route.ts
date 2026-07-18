import { NextResponse } from 'next/server'
import { getInvoices, createInvoice } from '@/lib/db/queries'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const invoices = getInvoices()
    const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0)
    const outstanding = invoices.filter(i => i.status === 'sent' || i.status === 'overdue').reduce((s, i) => s + i.amount, 0)
    return NextResponse.json({ invoices, total: invoices.length, totalRevenue, outstanding })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const invoice = createInvoice({
      project_id: body.project_id,
      client: body.client,
      amount: Number(body.amount),
      due_date: body.due_date,
      items: body.items || [],
    })
    return NextResponse.json(invoice, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 })
  }
}
