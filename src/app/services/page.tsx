'use client'

import Link from 'next/link'
import { ArrowRight, Check, Code2, Globe, Smartphone, Brain, BarChart3, Palette, Cloud, MessageCircle, Zap, Clock, DollarSign } from 'lucide-react'
import { services } from '@/lib/data'
import { PageLayout, PageHeader } from '@/components/PageLayout'
import { AnimatedSection } from '@/components/ScrollAnimations'

const iconMap: Record<string, any> = {
  Code2, Globe, Smartphone, Brain, BarChart3, Palette, Cloud, MessageCircle,
}

export default function ServicesPage() {
  return (
    <PageLayout>
      <PageHeader
        badge="Our Services"
        title="AI-Powered Software Development"
        subtitle="20+ services delivered by specialized AI agents — from strategy to deployment, we handle it all at 10x the speed and half the cost."
      />

      {/* Service Cards */}
      <section className="section-padding bg-white dark:bg-neutral-950">
        <div className="section-container">
          <div className="space-y-16 sm:space-y-24">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Zap
              const details = serviceDetails.find(d => d.id === service.id)
              return (
                <AnimatedSection key={service.id} animation="fade-up">
                  <div id={service.id} className="grid lg:grid-cols-5 gap-6 lg:gap-16 scroll-mt-32">
                    {/* Left: Overview */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center shrink-0">
                          <Icon className="w-6 h-6 text-primary-500" />
                        </div>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold dark:text-white">{service.title}</h2>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-5 leading-relaxed text-sm sm:text-base">{details?.description || service.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                        <span className="flex items-center gap-1.5"><Clock size={15} /> {service.timeline}</span>
                        <span className="flex items-center gap-1.5"><DollarSign size={15} /> {service.price}</span>
                      </div>
                      <Link href="/contact" className="btn-primary text-sm w-full sm:w-auto text-center">
                        Get Started <ArrowRight size={16} />
                      </Link>
                    </div>

                    {/* Right: Details */}
                    <div className="lg:col-span-3">
                      {details?.packages && (
                        <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                          {details.packages.map((pkg, j) => (
                            <div key={j} className={`rounded-2xl p-5 sm:p-6 border ${
                              j === 1
                                ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 relative'
                                : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'
                            }`}>
                              {j === 1 && (
                                <div className="absolute -top-2.5 left-4 px-3 py-0.5 rounded-full bg-primary-500 text-white text-[10px] font-semibold">
                                  Most Popular
                                </div>
                              )}
                              <div className="text-xs font-semibold text-primary-500 uppercase tracking-wider mb-1">{pkg.name}</div>
                              <div className="text-lg sm:text-xl font-heading font-bold mb-1 dark:text-white">{pkg.price}</div>
                              <div className="text-xs text-neutral-500 mb-4">{pkg.timeline}</div>
                              <ul className="space-y-2">
                                {pkg.features.map((f, k) => (
                                  <li key={k} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                                    <Check size={14} className="text-success mt-0.5 shrink-0" />
                                    <span>{f}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Technologies + Deliverables row */}
                      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                        {details?.technologies && (
                          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 sm:p-6 border border-neutral-200 dark:border-neutral-700">
                            <h3 className="font-semibold text-sm mb-3 dark:text-white">Technologies</h3>
                            <div className="flex flex-wrap gap-2">
                              {details.technologies.map((tech) => (
                                <span key={tech} className="chip bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-xs">{tech}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        {details?.deliverables && (
                          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 sm:p-6 border border-neutral-200 dark:border-neutral-700">
                            <h3 className="font-semibold text-sm mb-3 dark:text-white">What You Get</h3>
                            <div className="grid xs:grid-cols-2 gap-2">
                              {details.deliverables.map((d, k) => (
                                <div key={k} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                                  <Check size={13} className="text-primary-500 shrink-0" />
                                  <span className="leading-snug">{d}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3 sm:mb-4">Ready to Start Your Project?</h2>
          <p className="text-primary-200 text-base sm:text-lg mb-6 sm:mb-8">Get a proposal within 24 hours — built by AI, reviewed by senior architects.</p>
          <Link href="/contact" className="btn-white text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4">Start Your Project <ArrowRight size={18} /></Link>
        </div>
      </section>
    </PageLayout>
  )
}

// ---- Inline Data ----
const serviceDetails = [
  {
    id: 'custom-software',
    icon: 'Code2',
    title: 'Custom Software Development',
    description: 'Bespoke software tailored to your unique business processes. Our AI agents analyze requirements, design architecture, build, test, and deploy — delivering enterprise-grade software at startup speed.',
    deliverables: ['Requirement Specification Document', 'Architecture Design Document', 'Source Code (GitHub/GitLab)', 'API Documentation (Swagger)', 'Admin Dashboard', 'Deployment Scripts', 'User Manual', '3 Months Support'],
    technologies: ['React/Next.js', 'Node.js/Python', 'PostgreSQL', 'Docker', 'AWS/Azure', 'Redis'],
    packages: [
      { name: 'Starter', price: '₹3,00,000 - ₹6,00,000', timeline: '4-6 wks', features: ['1 web app (3-5 modules)', 'Basic auth', 'Responsive UI', 'Deployment'] },
      { name: 'Growth', price: '₹6,00,000 - ₹15,00,000', timeline: '8-12 wks', features: ['Full web app (5-10 modules)', 'API integrations', 'Admin panel', 'Testing & docs'] },
      { name: 'Enterprise', price: '₹15,00,000 - ₹50,00,000+', timeline: '12-24 wks', features: ['Multi-module system', 'Microservices', 'AI features', 'SLA & support'] },
    ],
  },
  {
    id: 'web-development',
    icon: 'Globe',
    title: 'Web Development',
    description: 'High-performance websites and web applications — from landing pages to complex enterprise portals. Fully responsive, SEO-optimized, and built for conversion.',
    deliverables: ['Responsive Design (Mobile + Tablet + Desktop)', 'SEO Meta Tags & Structured Data', 'Google PageSpeed Score ≥ 90', 'SSL Certificate', '1 Month Free Maintenance'],
    technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'MongoDB/PostgreSQL', 'Vercel/AWS'],
    packages: [
      { name: 'Basic', price: '₹80,000 - ₹1,50,000', timeline: '2-3 wks', features: ['5-page static site', 'Responsive', 'SEO basics', 'Hosting setup'] },
      { name: 'Business', price: '₹1,50,000 - ₹4,00,000', timeline: '4-6 wks', features: ['Dynamic CMS (10-20 pages)', 'Blog', 'Admin panel', 'Analytics'] },
      { name: 'Enterprise', price: '₹4,00,000 - ₹12,00,000', timeline: '6-10 wks', features: ['Custom web app', 'Multi-role auth', 'Payment gateway', 'Dashboard'] },
    ],
  },
  {
    id: 'mobile-apps',
    icon: 'Smartphone',
    title: 'Mobile App Development',
    description: 'Cross-platform and native mobile applications with pixel-perfect UI, offline capability, and seamless backend integration.',
    deliverables: ['iOS & Android Apps', 'Push Notifications', 'Offline Capability', 'Payment Integration', 'App Store Submission', '3 Months Support'],
    technologies: ['React Native/Flutter', 'Node.js', 'Firebase', 'Stripe/Razorpay', 'App Store Connect'],
    packages: [
      { name: 'MVP', price: '₹2,50,000 - ₹5,00,000', timeline: '6-10 wks', features: ['Single platform', '5-8 screens', 'Basic auth', 'REST API'] },
      { name: 'Standard', price: '₹5,00,000 - ₹10,00,000', timeline: '10-14 wks', features: ['Both platforms', '10-20 screens', 'Push notifications', 'Offline mode'] },
      { name: 'Premium', price: '₹10,00,000+', timeline: '14-18 wks', features: ['Full-featured app', 'Real-time sync', 'Admin dashboard', 'Advanced analytics'] },
    ],
  },
  {
    id: 'ai-solutions',
    icon: 'Brain',
    title: 'AI Solutions',
    description: 'Custom AI/ML solutions — predictive models, NLP systems, computer vision, and decision intelligence platforms.',
    deliverables: ['Trained Model', 'Inference API', 'MLOps Pipeline', 'Model Monitoring Dashboard', 'Documentation'],
    technologies: ['TensorFlow/PyTorch', 'LangChain', 'PostgreSQL/Pinecone', 'Docker/Kubernetes', 'AWS SageMaker'],
    packages: [
      { name: 'AI Audit', price: '₹1,00,000 - ₹2,00,000', timeline: '2-3 wks', features: ['Feasibility report', 'Data assessment', 'PoC roadmap', 'ROI analysis'] },
      { name: 'AI MVP', price: '₹4,00,000 - ₹8,00,000', timeline: '6-10 wks', features: ['Working prototype', 'Trained model', 'API endpoint', 'Basic monitoring'] },
      { name: 'Enterprise', price: '₹10,00,000+', timeline: '10-20 wks', features: ['Production system', 'MLOps pipeline', 'Model monitoring', 'Auto-retraining'] },
    ],
  },
  {
    id: 'data-analytics',
    icon: 'BarChart3',
    title: 'Data Analytics',
    description: 'Transform raw data into actionable insights. Custom dashboards, automated reports, and BI solutions that drive decisions.',
    deliverables: ['Data Pipeline', 'Interactive Dashboard', 'Automated Reports', 'Anomaly Detection Setup', 'Documentation'],
    technologies: ['Python', 'Apache Spark', 'PostgreSQL', 'Metabase/Tableau', 'AWS QuickSight'],
    packages: [
      { name: 'Basic', price: '₹1,50,000 - ₹3,00,000', timeline: '3-5 wks', features: ['Data pipeline setup', 'Basic dashboard', '3 reports', 'Email integration'] },
      { name: 'Advanced', price: '₹3,00,000 - ₹6,00,000', timeline: '5-8 wks', features: ['Multiple sources', 'Advanced dashboards', 'Anomaly detection', 'Scheduled reports'] },
      { name: 'Enterprise', price: '₹6,00,000+', timeline: '8-10 wks', features: ['Real-time pipeline', 'AI-powered insights', 'Custom alerts', 'Full integration'] },
    ],
  },
  {
    id: 'ui-ux',
    icon: 'Palette',
    title: 'UI/UX Design',
    description: 'Data-driven, user-centric design from research to prototype to developer handoff. Every pixel intentional.',
    deliverables: ['User Research Report', 'Wireframes', 'High-Fidelity Design', 'Interactive Prototype', 'Design System', 'Developer Handoff'],
    technologies: ['Figma', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion', 'Storybook'],
    packages: [
      { name: 'UX Audit', price: '₹30,000 - ₹60,000', timeline: '1-2 wks', features: ['Heuristic evaluation', 'Usability report', 'Recommendations', 'Priority matrix'] },
      { name: 'Full Design', price: '₹60,000 - ₹1,50,000', timeline: '2-4 wks', features: ['10-20 screens', 'Wireframes + hi-fi', 'Interactive prototype', 'Developer handoff'] },
      { name: 'Design System', price: '₹2,00,000+', timeline: '4-6 wks', features: ['Complete design system', 'Component library', 'Dark/light mode', 'Accessibility audit'] },
    ],
  },
  {
    id: 'cloud-devops',
    icon: 'Cloud',
    title: 'Cloud & DevOps',
    description: 'Cloud architecture, CI/CD pipelines, containerization, and infrastructure automation. Zero-downtime deployments.',
    deliverables: ['Infrastructure as Code', 'CI/CD Pipeline', 'Monitoring Dashboard', 'Disaster Recovery Plan', 'Security Audit'],
    technologies: ['AWS/Azure/GCP', 'Terraform', 'Docker/K8s', 'GitHub Actions', 'Datadog/New Relic'],
    packages: [
      { name: 'Setup', price: '₹80,000 - ₹2,00,000', timeline: '2-3 wks', features: ['Cloud setup', 'CI/CD pipeline', 'Docker setup', 'Monitoring'] },
      { name: 'Migration', price: '₹2,00,000 - ₹5,00,000', timeline: '4-6 wks', features: ['Full migration', 'IaC setup', 'Zero-downtime', 'Security audit'] },
      { name: 'Enterprise', price: '₹5,00,000+', timeline: '6-8 wks', features: ['Multi-cloud', 'Kubernetes', 'Auto-scaling', 'Disaster recovery'] },
    ],
  },
  {
    id: 'chatbots',
    icon: 'MessageCircle',
    title: 'AI Chatbots',
    description: 'Intelligent conversational AI — customer support bots, sales assistants, and knowledge bots powered by LLMs.',
    deliverables: ['Working Chatbot', 'Knowledge Base', 'Analytics Dashboard', 'Multi-channel Setup', 'Documentation'],
    technologies: ['LangChain', 'OpenAI/Anthropic', 'WhatsApp API', 'Slack API', 'Twilio'],
    packages: [
      { name: 'Basic', price: '₹1,00,000 - ₹2,00,000', timeline: '2-3 wks', features: ['Single channel', 'FAQ bot', 'Basic knowledge base', 'Analytics'] },
      { name: 'Business', price: '₹2,00,000 - ₹5,00,000', timeline: '4-6 wks', features: ['Multi-channel', 'Custom knowledge base', 'Human handoff', 'Dashboard'] },
      { name: 'Enterprise', price: '₹5,00,000+', timeline: '6-8 wks', features: ['Advanced AI', 'Multi-language', 'CRM integration', 'Full analytics'] },
    ],
  },
]
