// ============================================================================
// AI Agent Registry — The complete employee directory of Nexify's AI workforce
// ============================================================================

export type Department =
  | 'executive' | 'engineering' | 'design' | 'marketing' | 'sales'
  | 'support' | 'finance' | 'hr' | 'operations' | 'legal' | 'security' | 'research'

export interface AgentDefinition {
  id: string
  name: string
  title: string
  department: Department
  description: string
  capabilities: string[]
  model?: string
  status: 'active' | 'idle' | 'training'
}

export const agents: AgentDefinition[] = [
  // ── Executive ──
  { id: 'ceo', name: 'CEO Agent', title: 'Chief Executive Officer', department: 'executive', description: 'Sets company vision, strategy, and high-level goals. Delegates to department leads.', capabilities: ['Strategic planning', 'Goal setting', 'Resource allocation', 'Performance review'], status: 'active' },
  { id: 'coo', name: 'COO Agent', title: 'Chief Operations Officer', department: 'executive', description: 'Ensures smooth day-to-day operations across all departments.', capabilities: ['Process optimization', 'Cross-dept coordination', 'Workflow design'], status: 'active' },
  { id: 'cto', name: 'CTO Agent', title: 'Chief Technology Officer', department: 'executive', description: 'Architects technology strategy and oversees engineering.', capabilities: ['Tech architecture', 'Stack decisions', 'Code quality standards', 'Innovation roadmap'], status: 'active' },
  { id: 'cfo', name: 'CFO Agent', title: 'Chief Financial Officer', department: 'executive', description: 'Manages company finances, revenue, and growth metrics.', capabilities: ['Financial planning', 'Revenue analysis', 'Budget management', 'Investor reporting'], status: 'active' },
  { id: 'cmo', name: 'CMO Agent', title: 'Chief Marketing Officer', department: 'executive', description: 'Drives brand awareness, lead generation, and market positioning.', capabilities: ['Marketing strategy', 'Brand management', 'Campaign oversight', 'Growth planning'], status: 'active' },

  // ── Engineering ──
  { id: 'architect', name: 'Architect Agent', title: 'Software Architect', department: 'engineering', description: 'Designs system architecture and ensures scalability.', capabilities: ['System design', 'API architecture', 'Database design', 'Security review'], status: 'active' },
  { id: 'backend-dev', name: 'Backend Dev Agent', title: 'Backend Engineer', department: 'engineering', description: 'Builds APIs, services, and server-side logic.', capabilities: ['API development', 'Database operations', 'Authentication', 'Caching'], status: 'active' },
  { id: 'frontend-dev', name: 'Frontend Dev Agent', title: 'Frontend Engineer', department: 'engineering', description: 'Creates pixel-perfect UI components and pages.', capabilities: ['React/Next.js', 'Tailwind CSS', 'Responsive design', 'Animation'], status: 'active' },
  { id: 'devops', name: 'DevOps Agent', title: 'DevOps Engineer', department: 'engineering', description: 'Manages CI/CD, infrastructure, and deployments.', capabilities: ['CI/CD pipelines', 'Docker/K8s', 'Cloud infrastructure', 'Monitoring'], status: 'active' },
  { id: 'qa', name: 'QA Agent', title: 'Quality Assurance Engineer', department: 'engineering', description: 'Tests everything before it ships.', capabilities: ['Unit testing', 'E2E testing', 'Performance testing', 'Security testing'], status: 'active' },
  { id: 'security-engineer', name: 'Security Agent', title: 'Security Engineer', department: 'engineering', description: 'Protects systems and data.', capabilities: ['Vulnerability scanning', 'Audit logging', 'Access control', 'Encryption'], status: 'active' },

  // ── Design ──
  { id: 'ui-designer', name: 'UI Designer Agent', title: 'UI/UX Designer', department: 'design', description: 'Creates beautiful, intuitive interfaces.', capabilities: ['UI design', 'Design systems', 'Prototyping', 'Accessibility'], status: 'active' },
  { id: 'brand-designer', name: 'Brand Designer Agent', title: 'Brand Designer', department: 'design', description: 'Maintains brand consistency across all touchpoints.', capabilities: ['Brand identity', 'Logo design', 'Visual guidelines', 'Asset creation'], status: 'active' },

  // ── Marketing ──
  { id: 'seo', name: 'SEO Agent', title: 'SEO Specialist', department: 'marketing', description: 'Optimizes content for search engines.', capabilities: ['Keyword research', 'On-page SEO', 'Technical SEO', 'Content optimization'], status: 'active' },
  { id: 'content-writer', name: 'Content Agent', title: 'Content Writer', department: 'marketing', description: 'Creates blog posts, case studies, and marketing copy.', capabilities: ['Blog writing', 'Case studies', 'Newsletters', 'Social media copy'], status: 'active' },
  { id: 'social-media', name: 'Social Media Agent', title: 'Social Media Manager', department: 'marketing', description: 'Manages all social media channels.', capabilities: ['Content scheduling', 'Engagement', 'Analytics', 'Campaign management'], status: 'active' },

  // ── Sales ──
  { id: 'sdr', name: 'SDR Agent', title: 'Sales Development Rep', department: 'sales', description: 'Qualifies leads and schedules meetings.', capabilities: ['Lead qualification', 'Outreach', 'Follow-ups', 'CRM management'], status: 'active' },
  { id: 'proposal-gen', name: 'Proposal Agent', title: 'Proposal Generator', department: 'sales', description: 'Generates professional proposals and quotes.', capabilities: ['Proposal creation', 'Pricing', 'Contract generation', 'Timeline estimation'], status: 'active' },
  { id: 'customer-success', name: 'Success Agent', title: 'Customer Success Manager', department: 'sales', description: 'Ensures client satisfaction and retention.', capabilities: ['Onboarding', 'Check-ins', 'Upsell', 'Feedback collection'], status: 'active' },

  // ── Support ──
  { id: 'chat-support', name: 'Chat Support Agent', title: '24/7 Support Agent', department: 'support', description: 'Handles customer inquiries via chat.', capabilities: ['Live chat', 'FAQ resolution', 'Ticket management', 'Escalation'], status: 'active' },
  { id: 'kb-agent', name: 'Knowledge Base Agent', title: 'Knowledge Manager', department: 'support', description: 'Maintains and improves the knowledge base.', capabilities: ['Article creation', 'Content updates', 'Search optimization', 'Analytics'], status: 'active' },

  // ── Finance ──
  { id: 'accountant', name: 'Accountant Agent', title: 'Accountant', department: 'finance', description: 'Handles bookkeeping and financial records.', capabilities: ['Bookkeeping', 'Invoice processing', 'Expense tracking', 'Tax preparation'], status: 'active' },
  { id: 'invoice-agent', name: 'Invoice Agent', title: 'Invoice Manager', department: 'finance', description: 'Generates and sends invoices automatically.', capabilities: ['Invoice generation', 'Payment tracking', 'Reminders', 'Reconciliation'], status: 'active' },

  // ── HR ──
  { id: 'recruiter', name: 'Recruiter Agent', title: 'Recruitment Lead', department: 'hr', description: 'Finds and screens top talent.', capabilities: ['Job posting', 'Resume screening', 'Interview scheduling', 'Offer management'], status: 'active' },
  { id: 'onboarding', name: 'Onboarding Agent', title: 'Onboarding Specialist', department: 'hr', description: 'Onboards new team members seamlessly.', capabilities: ['Welcome workflows', 'Document collection', 'Training assignment', 'Checklists'], status: 'active' },

  // ── Operations ──
  { id: 'project-manager', name: 'PM Agent', title: 'Project Manager', department: 'operations', description: 'Tracks project progress and deliverables.', capabilities: ['Task tracking', 'Sprint planning', 'Status reports', 'Risk management'], status: 'active' },
  { id: 'workflow-auto', name: 'Automation Agent', title: 'Workflow Automation', department: 'operations', description: 'Automates repetitive tasks and workflows.', capabilities: ['Workflow design', 'Process automation', 'Integration setup', 'Monitoring'], status: 'active' },
  { id: 'doc-agent', name: 'Docs Agent', title: 'Documentation Lead', department: 'operations', description: 'Creates and maintains all documentation.', capabilities: ['Technical writing', 'API docs', 'User guides', 'SOP creation'], status: 'active' },

  // ── Legal ──
  { id: 'legal', name: 'Legal Agent', title: 'Legal Counsel', department: 'legal', description: 'Handles contracts, compliance, and privacy.', capabilities: ['Contract review', 'Policy generation', 'Compliance checks', 'Risk assessment'], status: 'active' },

  // ── Security ──
  { id: 'soc', name: 'SOC Agent', title: 'Security Operations', department: 'security', description: 'Monitors threats and responds to incidents.', capabilities: ['Log analysis', 'Threat detection', 'Incident response', 'Security audits'], status: 'active' },

  // ── Research ──
  { id: 'market-research', name: 'Research Agent', title: 'Market Research Analyst', department: 'research', description: 'Analyzes markets, competitors, and trends.', capabilities: ['Market analysis', 'Competitor research', 'Trend identification', 'Opportunity analysis'], status: 'active' },
]
