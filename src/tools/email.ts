// ============================================================================
// Nexify — Email Tools
// Let AI agents send emails to clients and team members
// ============================================================================

import { registerTool } from './registry'

registerTool({
  name: 'send_email',
  description: 'Send an email via Resend. Used for client communication, proposals, invoices, and notifications.',
  parameters: {
    type: 'object',
    properties: {
      to: {
        type: 'string',
        description: 'Recipient email address',
      },
      subject: {
        type: 'string',
        description: 'Email subject line',
      },
      content: {
        type: 'string',
        description: 'Email body content (plain text or HTML)',
      },
    },
    required: ['to', 'subject', 'content'],
  },
  handler: async (args) => {
    try {
      const apiKey = process.env.RESEND_API_KEY
      if (!apiKey) {
        // Fallback: log the email for development
        console.log(`\n📧 EMAIL TO: ${args.to}`)
        console.log(`   SUBJECT: ${args.subject}`)
        console.log(`   BODY:\n${args.content}\n`)
        return { success: true, data: `Email logged (no RESEND_API_KEY configured). Would send to ${args.to}` }
      }

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'Nexify <hello@nexify.tech>',
          to: args.to,
          subject: args.subject,
          text: args.content,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Email send failed')
      return { success: true, data: `Email sent to ${args.to}: ${args.subject}` }
    } catch (err: any) {
      return { success: false, error: `Email failed: ${err.message}` }
    }
  },
})
