import { NextResponse } from 'next/server'

export async function GET() {
  const metrics = {
    agents: { total: 12, active: 11, idle: 1, uptime: 99.99, avgEfficiency: 95.2 },
    projects: { active: 6, planning: 2, completed: 1, totalValue: 4950000, avgProgress: 62 },
    sales: { pipeline: 6350000, weighted: 2870000, won: 1850000, leads: 24, conversion: 34 },
    finance: { income: 1085000, expenses: 104000, profitMargin: 90.4, pendingInvoices: 237000 },
    tasks: { today: 78, thisWeek: 412, thisMonth: 2456, avgCompletion: 92 },
    performance: [
      { month: 'Jan', tasks: 1245, bugs: 12, uptime: 99.92 },
      { month: 'Feb', tasks: 1423, bugs: 8, uptime: 99.95 },
      { month: 'Mar', tasks: 1678, bugs: 15, uptime: 99.97 },
      { month: 'Apr', tasks: 1892, bugs: 10, uptime: 99.96 },
      { month: 'May', tasks: 2134, bugs: 7, uptime: 99.98 },
      { month: 'Jun', tasks: 2456, bugs: 5, uptime: 99.99 },
    ],
    timestamp: new Date().toISOString(),
  }

  return NextResponse.json(metrics, {
    headers: { 'Cache-Control': 'public, max-age=30, s-maxage=30' },
  })
}
