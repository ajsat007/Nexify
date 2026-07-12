import { NextResponse } from 'next/server'

const leads = [
  { id: 'LD-001', company: 'TechVista Solutions', contact: 'Vikram Singh', email: 'vikram@techvista.com', phone: '+91 98765 43210', source: 'LinkedIn', service: 'Custom Software', value: 800000, status: 'qualified', date: '2026-07-10' },
  { id: 'LD-002', company: 'GreenEnergy Corp', contact: 'Neha Patel', email: 'neha@greenenergy.com', phone: '+91 87654 32109', source: 'Website', service: 'AI Solutions', value: 1200000, status: 'proposal', date: '2026-07-08' },
  { id: 'LD-003', company: 'MediCare Hospitals', contact: 'Dr. Rajesh Kumar', email: 'rajesh@medicare.com', phone: '+91 76543 21098', source: 'Referral', service: 'Mobile App', value: 500000, status: 'new', date: '2026-07-11' },
  { id: 'LD-004', company: 'EduPrime Institute', contact: 'Ananya Gupta', email: 'ananya@eduprime.com', phone: '+91 65432 10987', source: 'Twitter/X', service: 'Web Development', value: 250000, status: 'qualified', date: '2026-07-07' },
  { id: 'LD-005', company: 'StyleHub Fashion', contact: 'Priya Sharma', email: 'priya@stylehub.com', phone: '+91 43210 98765', source: 'LinkedIn', service: 'E-commerce', value: 600000, status: 'new', date: '2026-07-11' },
]

export async function GET() {
  return NextResponse.json({
    leads,
    total: leads.length,
    totalValue: leads.reduce((s, l) => s + l.value, 0),
    byStatus: {
      new: leads.filter(l => l.status === 'new').length,
      qualified: leads.filter(l => l.status === 'qualified').length,
      proposal: leads.filter(l => l.status === 'proposal').length,
    },
    bySource: ['LinkedIn', 'Website', 'Referral', 'Twitter/X'].map(s => ({
      source: s,
      count: leads.filter(l => l.source === s).length,
    })),
    timestamp: new Date().toISOString(),
  }, { headers: { 'Cache-Control': 'public, max-age=60' } })
}

export async function POST(request: Request) {
  const body = await request.json()
  const newLead = {
    id: `LD-${String(leads.length + 1).padStart(3, '0')}`,
    ...body,
    status: 'new',
    date: new Date().toISOString().split('T')[0],
  }
  leads.unshift(newLead)
  return NextResponse.json(newLead, { status: 201 })
}
