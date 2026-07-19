// ============================================================================
// Nexify — API Validation (Zod schemas)
// ============================================================================

import { z } from 'zod'

export const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Valid email required'),
  company: z.string().max(100).optional(),
  service: z.string().max(50).optional(),
  budget: z.string().max(50).optional(),
  message: z.string().min(1, 'Message is required').max(5000),
})

export const LeadSchema = z.object({
  company: z.string().min(1, 'Company is required').max(200),
  contact_name: z.string().min(1, 'Contact name is required').max(100),
  email: z.string().email('Valid email required'),
  phone: z.string().max(20).optional(),
  source: z.string().max(50).optional(),
  service_interest: z.string().max(100).optional(),
  budget: z.number().positive().optional(),
})

export const ChatSchema = z.object({
  message: z.string().min(1, 'Message is required').max(10000),
  sessionId: z.string().max(100).optional(),
  stream: z.boolean().optional(),
})

export const AuthSchema = z.object({
  email: z.string().email('Valid email required'),
})

export const AgentTaskSchema = z.object({
  action: z.enum(['assign', 'execute']),
  agentId: z.string().optional(),
  task: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
    input: z.string().optional(),
  }).optional(),
})

export function validate<T>(schema: z.ZodSchema<T>, data: unknown): { data?: T; error?: string } {
  const result = schema.safeParse(data)
  if (!result.success) {
    const first = result.error.issues[0]
    return { error: first?.message || 'Validation failed' }
  }
  return { data: result.data }
}
