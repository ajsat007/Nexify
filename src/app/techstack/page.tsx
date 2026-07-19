'use client'

import { Cpu } from 'lucide-react'
import { PageLayout, PageHeader, PageSection } from '@/components/PageLayout'
import { StaggerGroup } from '@/components/ScrollAnimations'

const techLayers = [
  { category: 'Frontend', tech: 'Next.js 14, React 18, TypeScript, Tailwind CSS', purpose: 'SSR/ISR web apps with optimal SEO and performance.' },
  { category: 'Backend', tech: 'Node.js, Python, Go, Express, FastAPI', purpose: 'Scalable API servers with event-driven architecture.' },
  { category: 'Database', tech: 'PostgreSQL, MongoDB, Redis, ClickHouse', purpose: 'Relational, document, cache, and analytics databases.' },
  { category: 'AI/ML', tech: 'LangChain, TensorFlow, PyTorch, Llama, Claude API', purpose: 'LLM orchestration, model training, inference pipelines.' },
  { category: 'Cloud', tech: 'AWS, Vercel, Render, Docker, Kubernetes', purpose: 'Zero-cost hosting with free tiers and auto-scaling.' },
  { category: 'Auth', tech: 'Auth0 / NextAuth.js, JWT, OAuth 2.0, SSO', purpose: 'Secure auth with social login and enterprise SSO.' },
  { category: 'Payments', tech: 'Razorpay, Stripe, PayPal', purpose: 'Indian and global payment processing with subscriptions.' },
  { category: 'Notifications', tech: 'WebSockets, Firebase, SendGrid, Twilio', purpose: 'Real-time alerts, email, SMS, and push notifications.' },
  { category: 'CI/CD', tech: 'GitHub Actions, GitLab CI, ArgoCD', purpose: 'Automated testing, building, and deployment pipelines.' },
  { category: 'Monitoring', tech: 'Datadog / Grafana / Sentry, Prometheus', purpose: 'Real-time metrics, error tracking, and performance monitoring.' },
]

export default function TechStackPage() {
  return (
    <PageLayout>
      <PageHeader badge="Tech Stack" title="Enterprise-Grade Tech Stack" subtitle="All technologies are free-tier eligible · Zero licensing cost · Battle-tested at scale." />

      <PageSection>
        <StaggerGroup className="grid lg:grid-cols-2 gap-4">
          {techLayers.map((t) => (
            <div key={t.category} className="bg-white dark:bg-surface-800 rounded-2xl p-6 border border-surface-200 dark:border-surface-700 hover:shadow-lg hover:border-primary-500/20 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-surface-900 dark:text-white">{t.category}</span>
                    <span className="chip bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 text-xs">Free Tier</span>
                  </div>
                  <p className="text-sm text-surface-700 dark:text-surface-400 mb-1">{t.tech}</p>
                  <p className="text-xs text-surface-600 dark:text-surface-600">{t.purpose}</p>
                </div>
              </div>
            </div>
          ))}
        </StaggerGroup>

        <div className="mt-12 bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-2xl border border-primary-500/20 p-8 text-center">
          <h2 className="text-2xl font-heading font-bold mb-2 dark:text-white">Zero Licensing Cost</h2>
          <p className="text-surface-700 dark:text-surface-400 mb-4">Every technology has a generous free tier. Total monthly infra cost: <strong className="text-primary-600">~1,04,000</strong>.</p>
        </div>
      </PageSection>
    </PageLayout>
  )
}
