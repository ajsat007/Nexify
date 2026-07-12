import { NextResponse } from 'next/server'

const projects = [
  { id: 'PRJ-001', name: 'FinTech Trading Dashboard', client: 'FinTech Labs', value: 600000, status: 'active', progress: 78, deadline: '2026-07-15', priority: 'high', agents: ['DevAgent-Alpha', 'DesignAgent-Gamma', 'QAAgent-Delta'] },
  { id: 'PRJ-002', name: 'Healthcare Telemedicine App', client: 'HealthFirst', value: 1000000, status: 'active', progress: 45, deadline: '2026-08-30', priority: 'high', agents: ['MobileAgent-Eta', 'DevAgent-Beta', 'QAAgent-Delta'] },
  { id: 'PRJ-003', name: 'E-commerce Recommendation Engine', client: 'StyleCart', value: 500000, status: 'active', progress: 92, deadline: '2026-07-10', priority: 'medium', agents: ['AIAgent-Theta', 'DataAgent-Zeta'] },
  { id: 'PRJ-004', name: 'EdTech Learning Platform', client: 'EduVista', value: 800000, status: 'active', progress: 30, deadline: '2026-09-15', priority: 'high', agents: ['FrontendAgent-Lambda', 'DevAgent-Beta', 'DesignAgent-Gamma'] },
  { id: 'PRJ-005', name: 'Logistics Fleet Management', client: 'LogiMove', value: 750000, status: 'planning', progress: 10, deadline: '2026-10-01', priority: 'medium', agents: ['DevOpsAgent-Epsilon', 'DataAgent-Zeta'] },
  { id: 'PRJ-006', name: 'AI Customer Support Chatbot', client: 'SupportPro', value: 300000, status: 'active', progress: 65, deadline: '2026-08-01', priority: 'medium', agents: ['BotAgent-Kappa', 'AIAgent-Theta'] },
  { id: 'PRJ-007', name: 'Retail Analytics Dashboard', client: 'RetailMax', value: 350000, status: 'completed', progress: 100, deadline: '2026-06-30', priority: 'low', agents: ['DataAgent-Zeta', 'FrontendAgent-Lambda'] },
  { id: 'PRJ-008', name: 'HRMS & Payroll System', client: 'EnterpriseCorp', value: 600000, status: 'planning', progress: 5, deadline: '2026-10-15', priority: 'low', agents: ['DevAgent-Alpha', 'FrontendAgent-Lambda'] },
]

export async function GET() {
  return NextResponse.json({
    projects,
    total: projects.length,
    totalValue: projects.reduce((s, p) => s + p.value, 0),
    activeValue: projects.filter(p => p.status === 'active').reduce((s, p) => s + p.value, 0),
    byStatus: {
      active: projects.filter(p => p.status === 'active').length,
      planning: projects.filter(p => p.status === 'planning').length,
      completed: projects.filter(p => p.status === 'completed').length,
    },
    avgProgress: Math.round(projects.reduce((s, p) => s + p.progress, 0) / projects.length),
    timestamp: new Date().toISOString(),
  }, { headers: { 'Cache-Control': 'public, max-age=30' } })
}
