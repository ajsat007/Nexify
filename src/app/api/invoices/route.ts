import { NextResponse } from 'next/server'

const invoices = [
  { id: 'INV-001', project: 'FinTech Trading Dashboard', client: 'FinTech Labs', amount: 600000, status: 'paid', dueDate: '2026-07-15', issuedDate: '2026-06-15', items: [{ desc: 'Development Sprint 1-4', amount: 400000 }, { desc: 'UI/UX Design', amount: 100000 }, { desc: 'Deployment & Testing', amount: 100000 }] },
  { id: 'INV-002', project: 'Healthcare Telemedicine App', client: 'HealthFirst', amount: 1000000, status: 'sent', dueDate: '2026-08-30', issuedDate: '2026-07-01', items: [{ desc: 'Development Sprint 1-3', amount: 500000 }, { desc: 'Backend Infrastructure', amount: 300000 }, { desc: 'API Integrations', amount: 200000 }] },
  { id: 'INV-003', project: 'E-commerce Recommendation Engine', client: 'StyleCart', amount: 500000, status: 'paid', dueDate: '2026-07-10', issuedDate: '2026-06-10', items: [{ desc: 'ML Model Development', amount: 300000 }, { desc: 'Integration & Testing', amount: 200000 }] },
]

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    invoices,
    total: invoices.length,
    totalAmount: invoices.reduce((s, i) => s + i.amount, 0),
    byStatus: {
      draft: invoices.filter(i => i.status === 'draft').length,
      sent: invoices.filter(i => i.status === 'sent').length,
      paid: invoices.filter(i => i.status === 'paid').length,
      overdue: invoices.filter(i => i.status === 'overdue').length,
    },
  })
}
