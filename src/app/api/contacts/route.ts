import { NextResponse } from 'next/server'
import { ContactSchema, validate } from '@/lib/validation'
import { createLead } from '@/lib/db/queries'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { error, data } = validate(ContactSchema, body)
    if (error) return NextResponse.json({ error }, { status: 400 })

    // Create a lead in the database
    const lead = createLead({
      contact_name: data!.name,
      email: data!.email,
      company: data!.company || '',
      service_interest: data!.service || '',
      budget: data!.budget ? Number(data!.budget.replace(/[^0-9]/g, '')) : 0,
      notes: data!.message,
      source: 'website',
    })

    return NextResponse.json({
      success: true,
      message: 'Proposal being generated. You\'ll hear from us within 24 hours.',
      leadId: lead.id,
      ticketId: `TKT-${Date.now().toString(36).toUpperCase()}`,
    })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
