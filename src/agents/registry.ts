// ============================================================================
// Nexify — AI Agent Registry
// Every AI employee in the company is defined here
// ============================================================================

export type AgentDepartment =
  | 'executive' | 'engineering' | 'design' | 'marketing' | 'sales'
  | 'support' | 'finance' | 'hr' | 'operations' | 'legal' | 'security' | 'research'

export type AgentStatus = 'active' | 'idle' | 'busy' | 'error'

export interface AgentDefinition {
  id: string
  name: string
  role: string
  department: AgentDepartment
  description: string
  model: string
  skills: string[]
  status: AgentStatus
  emoji: string
  color: string
  tasksCompleted: number
  efficiency: number
}

export const agentRegistry: AgentDefinition[] = [
  // ── Executive ──
  { id: 'agent-ceo', name: 'CEO-Omega', role: 'Chief Executive Officer', department: 'executive', description: 'Sets company vision, approves strategy, reviews department goals weekly.', model: 'Claude Opus 4.8', skills: ['Strategy', 'Vision', 'Leadership', 'Decision making'], status: 'active', emoji: '👑', color: 'from-amber-500 to-yellow-500', tasksCompleted: 1245, efficiency: 99 },
  { id: 'agent-cto', name: 'CTO-Nova', role: 'Chief Technology Officer', department: 'executive', description: 'Owns tech architecture, approves RFCs, sets engineering standards.', model: 'Claude Opus 4.8', skills: ['Architecture', 'Tech strategy', 'Code review', 'Innovation'], status: 'active', emoji: '🔬', color: 'from-blue-500 to-indigo-500', tasksCompleted: 2134, efficiency: 98 },
  { id: 'agent-cfo', name: 'CFO-Sage', role: 'Chief Financial Officer', department: 'executive', description: 'Manages finances, invoices, tax, P&L, and revenue optimization.', model: 'Claude Opus 4.8', skills: ['Finance', 'Budgeting', 'Forecasting', 'Tax planning'], status: 'active', emoji: '💰', color: 'from-emerald-500 to-green-500', tasksCompleted: 987, efficiency: 100 },

  // ── Engineering ──
  { id: 'agent-dev-alpha', name: 'Dev-Alpha', role: 'Senior Full-Stack Engineer', department: 'engineering', description: 'Builds web apps, APIs, and microservices. Expert in React, Node.js, Python.', model: 'Claude Opus 4.8', skills: ['React', 'Node.js', 'Python', 'PostgreSQL', 'Docker'], status: 'active', emoji: '⚡', color: 'from-cyan-500 to-blue-500', tasksCompleted: 847, efficiency: 96 },
  { id: 'agent-dev-beta', name: 'Dev-Beta', role: 'Backend Engineer', department: 'engineering', description: 'Handles databases, scaling, auth, and cloud infrastructure.', model: 'Claude Sonnet 5', skills: ['Python', 'AWS', 'PostgreSQL', 'Redis', 'Kubernetes'], status: 'active', emoji: '⚙️', color: 'from-sky-500 to-cyan-500', tasksCompleted: 623, efficiency: 94 },
  { id: 'agent-mobile', name: 'Mobile-Eta', role: 'Mobile Engineer', department: 'engineering', description: 'Builds cross-platform mobile apps with React Native and Flutter.', model: 'Claude Opus 4.8', skills: ['React Native', 'Flutter', 'Swift', 'Kotlin'], status: 'active', emoji: '📱', color: 'from-purple-500 to-pink-500', tasksCompleted: 289, efficiency: 95 },
  { id: 'agent-devops', name: 'DevOps-Epsilon', role: 'DevOps Engineer', department: 'engineering', description: 'CI/CD, containerization, monitoring, and infrastructure automation.', model: 'Claude Haiku 4.5', skills: ['Docker', 'K8s', 'AWS', 'Terraform', 'CI/CD'], status: 'active', emoji: '🔧', color: 'from-orange-500 to-red-500', tasksCompleted: 456, efficiency: 98 },
  { id: 'agent-qa', name: 'QA-Delta', role: 'QA Engineer', department: 'engineering', description: 'Automated testing, E2E tests, regression, and quality gates.', model: 'Claude Sonnet 5', skills: ['Cypress', 'Playwright', 'Jest', 'Load testing'], status: 'active', emoji: '✅', color: 'from-green-500 to-emerald-500', tasksCompleted: 1234, efficiency: 99 },

  // ── Design ──
  { id: 'agent-designer', name: 'Design-Gamma', role: 'UI/UX Designer', department: 'design', description: 'Product design, design systems, prototypes, and user research.', model: 'Claude Opus 4.8', skills: ['Figma', 'Design systems', 'Prototyping', 'User research'], status: 'active', emoji: '🎨', color: 'from-pink-500 to-rose-500', tasksCompleted: 512, efficiency: 97 },

  // ── Marketing ──
  { id: 'agent-marketing', name: 'Marketing-Mu', role: 'Marketing Lead', department: 'marketing', description: 'SEO, content, social media, email campaigns, and ad optimization.', model: 'Claude Opus 4.8', skills: ['SEO', 'Content', 'Social media', 'Email', 'Analytics'], status: 'active', emoji: '📈', color: 'from-violet-500 to-purple-500', tasksCompleted: 378, efficiency: 93 },

  // ── Sales ──
  { id: 'agent-sales', name: 'Sales-Mu', role: 'Sales Lead', department: 'sales', description: 'Lead qualification, proposals, follow-ups, and closing.', model: 'Claude Sonnet 5', skills: ['Lead gen', 'Proposals', 'CRM', 'Follow-ups'], status: 'active', emoji: '🤝', color: 'from-teal-500 to-emerald-500', tasksCompleted: 567, efficiency: 95 },

  // ── Support ──
  { id: 'agent-support', name: 'Support-Kappa', role: 'Customer Support Lead', department: 'support', description: 'Ticket resolution, knowledge base, sentiment analysis, 24/7 coverage.', model: 'Claude Sonnet 5', skills: ['Tickets', 'KB', 'Sentiment', 'Escalation'], status: 'active', emoji: '🎧', color: 'from-blue-500 to-teal-500', tasksCompleted: 2345, efficiency: 99 },

  // ── Data ──
  { id: 'agent-data', name: 'Data-Zeta', role: 'Data Analyst', department: 'research', description: 'Dashboards, reports, anomaly detection, and predictive analytics.', model: 'Claude Sonnet 5', skills: ['Python', 'SQL', 'BI', 'Statistics'], status: 'active', emoji: '📊', color: 'from-cyan-500 to-teal-500', tasksCompleted: 345, efficiency: 93 },

  // ── Security ──
  { id: 'agent-security', name: 'Security-Iota', role: 'Security Engineer', department: 'security', description: 'Vulnerability scanning, compliance, threat detection, and audits.', model: 'Claude Haiku 4.5', skills: ['Pentesting', 'Compliance', 'Audit', 'Threat detection'], status: 'active', emoji: '🛡️', color: 'from-slate-500 to-gray-500', tasksCompleted: 167, efficiency: 97 },

  // ── Legal ──
  { id: 'agent-legal', name: 'Legal-Lambda', role: 'Legal Counsel', department: 'legal', description: 'Contract review, compliance, privacy policies, and risk assessment.', model: 'Claude Opus 4.8', skills: ['Contracts', 'Compliance', 'Privacy', 'Risk'], status: 'active', emoji: '⚖️', color: 'from-stone-500 to-neutral-500', tasksCompleted: 89, efficiency: 99 },

  // ── Operations ──
  { id: 'agent-ops', name: 'Ops-Omega', role: 'Operations Manager', department: 'operations', description: 'Project management, workflow automation, task coordination, and reporting.', model: 'Claude Sonnet 5', skills: ['Project mgmt', 'Workflows', 'Coordination', 'Reporting'], status: 'active', emoji: '📋', color: 'from-sky-500 to-blue-500', tasksCompleted: 234, efficiency: 96 },
]

export function getAgentById(id: string) {
  return agentRegistry.find(a => a.id === id)
}

export function getAgentsByDepartment(dept: AgentDepartment) {
  return agentRegistry.filter(a => a.department === dept)
}

export function getAgentStats() {
  return {
    total: agentRegistry.length,
    active: agentRegistry.filter(a => a.status === 'active').length,
    totalTasks: agentRegistry.reduce((s, a) => s + a.tasksCompleted, 0),
    avgEfficiency: Math.round(agentRegistry.reduce((s, a) => s + a.efficiency, 0) / agentRegistry.length),
  }
}
