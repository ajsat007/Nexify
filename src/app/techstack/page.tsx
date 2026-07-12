'use client'

import { Check, ArrowRight, Cpu, Database, Cloud, Shield, Lock, CreditCard, Bell, HardDrive, RefreshCw, LineChart, Monitor, Zap } from 'lucide-react'

const techLayers = [
  { category: 'Frontend', tech: 'Next.js 14, React 18, TypeScript, Tailwind CSS', purpose: 'High-performance web applications with SSR, ISR, and optimal SEO.' },
  { category: 'Backend', tech: 'Node.js, Python, Go, Express, FastAPI', purpose: 'Scalable API servers with event-driven architecture.' },
  { category: 'Database', tech: 'PostgreSQL, MongoDB, Redis, ClickHouse', purpose: 'Relational, document, cache, and analytics databases.' },
  { category: 'AI/ML', tech: 'LangChain, TensorFlow, PyTorch, Llama, Claude API', purpose: 'LLM orchestration, model training, inference pipelines.' },
  { category: 'Cloud', tech: 'AWS, Vercel, Render, Docker, Kubernetes', purpose: 'Zero-cost hosting with free tiers + auto-scaling.' },
  { category: 'Auth', tech: 'Auth0 / NextAuth.js, JWT, OAuth 2.0, SSO', purpose: 'Secure authentication with social login and enterprise SSO.' },
  { category: 'Payments', tech: 'Razorpay, Stripe, PayPal', purpose: 'Indian and global payment processing with subscriptions.' },
  { category: 'Notifications', tech: 'WebSockets, Firebase Cloud Messaging, SendGrid, Twilio', purpose: 'Real-time alerts, email, SMS, and push notifications.' },
  { category: 'Storage', tech: 'AWS S3 / Cloudflare R2, PostgreSQL (large objects)', purpose: 'File storage with CDN delivery and encryption at rest.' },
  { category: 'CI/CD', tech: 'GitHub Actions, GitLab CI, ArgoCD', purpose: 'Automated testing, building, and deployment pipelines.' },
  { category: 'Monitoring', tech: 'Datadog / Grafana / Sentry, Prometheus', purpose: 'Real-time metrics, error tracking, and performance monitoring.' },
  { category: 'Logging', tech: 'ELK Stack (Elasticsearch, Logstash, Kibana)', purpose: 'Centralized logging with search, visualization, and alerting.' },
]

export default function TechStackPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Step 12</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">Enterprise-Grade <span className="text-primary-300">Tech Stack</span></h1>
            <p className="text-xl text-neutral-300 max-w-2xl">All technologies are free-tier eligible · Zero licensing cost · Battle-tested at scale.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-4">
            {techLayers.map((t, i) => (
              <div key={i} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 hover:shadow-lg hover:border-primary-500/20 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0"><Cpu className="w-5 h-5 text-primary-500" /></div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-neutral-900">{t.category}</span>
                      <span className="chip bg-accent-50 text-accent-600 text-[10px]">Free Tier</span>
                    </div>
                    <p className="text-sm text-neutral-600 mb-2">{t.tech}</p>
                    <p className="text-xs text-neutral-600">{t.purpose}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-2xl border border-primary-500/20 p-8 text-center">
            <h2 className="text-2xl font-heading font-bold mb-2">Zero Licensing Cost</h2>
            <p className="text-neutral-600 mb-4">Every technology in our stack has a generous free tier or is open-source. Total monthly infra cost: <strong className="text-primary-600">~₹1,04,000</strong>.</p>
            <div className="flex flex-wrap justify-center gap-3">
              {techLayers.map((t, i) => <span key={i} className="chip bg-white text-neutral-600 text-xs border border-neutral-200">{t.category}</span>)}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
