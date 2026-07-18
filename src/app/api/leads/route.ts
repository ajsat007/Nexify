import { NextResponse } from 'next/server'
import { getLeads, createLead } from '@/lib/db/queries'
import { getDb } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const leads = getLeads()
    const totalValue = leads.reduce((s, l) => s + l.budget, 0)
    const byStatus: Record<string, number> = {}
    const bySource: Record<string, number> = {}
    leads.forEach(l => {
      byStatus[l.status] = (byStatus[l.status] || 0) + 1
      bySource[l.source] = (bySource[l.source] || 0) + 1
    })

    return NextResponse.json({
      leads,
      total: leads.length,
      totalValue,
      byStatus,
      bySource: Object.entries(bySource).map(([source, count]) => ({ source, count })),
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const lead = createLead({
      company: body.company || body.company_name,
      contact_name: body.contact_name || body.name,
      email: body.email,
      phone: body.phone,
      source: body.source || 'website',
      service_interest: body.service_interest || body.service,
      budget: body.budget ? Number(body.budget) : 0,
      notes: body.notes || body.message || '',
    })
    return NextResponse.json(lead, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 })
  }
}
