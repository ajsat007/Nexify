// ============================================================================
// Workflow Engine — Defines and executes autonomous business workflows
// ============================================================================

import { createTask, assignNextTask, completeTask, getQueueStatus, type Task } from '@/lib/ai/orchestrator'
import { agents } from '@/lib/ai/agents/registry'

export type WorkflowStep = {
  id: string
  name: string
  description: string
  department: Parameters<typeof createTask>[2]
  priority: Task['priority']
  dependsOn?: string[]
  action?: string
}

export interface Workflow {
  id: string
  name: string
  description: string
  steps: WorkflowStep[]
  createdAt: number
  status: 'pending' | 'running' | 'completed' | 'failed'
}

const workflows: Workflow[] = []

export function createWorkflow(name: string, description: string, steps: WorkflowStep[]): Workflow {
  const wf: Workflow = {
    id: `wf-${Date.now()}`,
    name, description, steps,
    createdAt: Date.now(),
    status: 'pending',
  }
  workflows.push(wf)
  return wf
}

export function executeWorkflow(id: string): void {
  const wf = workflows.find(w => w.id === id)
  if (!wf) return
  wf.status = 'running'
  wf.steps.forEach(step => {
    createTask(step.name, step.description, step.department, step.priority, step.dependsOn)
  })
}

export function tick(): void {
  const task = assignNextTask()
  if (task) {
    task.status = 'in_progress'
    // Simulate execution — in production this calls the actual AI model
    setTimeout(() => {
      completeTask(task.id, `Completed: ${task.description}`)
    }, 1000)
  }
}

// ── Pre-built Autonomous Workflows ──

export function leadToCashWorkflow(leadName: string): Workflow {
  return createWorkflow(`Lead-to-Cash: ${leadName}`, 'Convert lead to signed client', [
    { id: 'qualify', name: 'Qualify Lead', description: `Research and qualify lead: ${leadName}`, department: 'sales', priority: 'high' },
    { id: 'proposal', name: 'Generate Proposal', description: `Create custom proposal for ${leadName}`, department: 'sales', priority: 'high', dependsOn: ['qualify'] },
    { id: 'review-proposal', name: 'Review Proposal', description: 'Review proposal for quality and accuracy', department: 'operations', priority: 'medium', dependsOn: ['proposal'] },
    { id: 'send-proposal', name: 'Send to Client', description: `Send proposal to ${leadName}`, department: 'sales', priority: 'high', dependsOn: ['review-proposal'] },
    { id: 'followup', name: 'Follow Up', description: `Follow up with ${leadName}`, department: 'sales', priority: 'medium', dependsOn: ['send-proposal'] },
    { id: 'contract', name: 'Generate Contract', description: 'Generate contract on acceptance', department: 'legal', priority: 'high', dependsOn: ['followup'] },
    { id: 'invoice', name: 'Send Invoice', description: 'Send initial invoice', department: 'finance', priority: 'high', dependsOn: ['contract'] },
    { id: 'onboard', name: 'Onboard Client', description: 'Kick off project with client', department: 'operations', priority: 'high', dependsOn: ['invoice'] },
  ])
}

export function saasLaunchWorkflow(productName: string): Workflow {
  return createWorkflow(`SaaS Launch: ${productName}`, 'End-to-end SaaS product launch', [
    { id: 'market-research', name: 'Market Research', description: `Research market for ${productName}`, department: 'research', priority: 'high' },
    { id: 'competitor-analysis', name: 'Competitor Analysis', description: 'Analyze competitors', department: 'research', priority: 'high', dependsOn: ['market-research'] },
    { id: 'architecture', name: 'Design Architecture', description: `Design system architecture for ${productName}`, department: 'engineering', priority: 'high', dependsOn: ['competitor-analysis'] },
    { id: 'ui-design', name: 'Design UI', description: 'Design user interface', department: 'design', priority: 'high', dependsOn: ['architecture'] },
    { id: 'development', name: 'Build Product', description: `Build ${productName}`, department: 'engineering', priority: 'critical', dependsOn: ['ui-design'] },
    { id: 'testing', name: 'QA Testing', description: 'Test everything', department: 'engineering', priority: 'critical', dependsOn: ['development'] },
    { id: 'seo', name: 'SEO Setup', description: 'Optimize for search engines', department: 'marketing', priority: 'medium', dependsOn: ['testing'] },
    { id: 'landing-page', name: 'Create Landing Page', description: 'Build marketing landing page', department: 'design', priority: 'high', dependsOn: ['seo'] },
    { id: 'deploy', name: 'Deploy to Production', description: 'Deploy to production', department: 'engineering', priority: 'critical', dependsOn: ['testing'] },
    { id: 'social-campaign', name: 'Launch Campaign', description: 'Social media launch campaign', department: 'marketing', priority: 'high', dependsOn: ['landing-page', 'deploy'] },
  ])
}

export function getWorkflows() {
  return workflows
}
