'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Clock, DollarSign, Users, Code2, Globe, Smartphone, Brain, BarChart3, Palette, Cloud, MessageCircle, Zap, Shield, Cpu, TrendingUp } from 'lucide-react'
import { services } from '@/lib/data'

const iconMap: Record<string, any> = {
  Code2, Globe, Smartphone, Brain, BarChart3, Palette, Cloud, MessageCircle
}

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
    description: 'High-performance websites and web applications — from landing pages to complex enterprise portals. Fully responsive, SEO-optimized, and built for conversion by AI design and development agents.',
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
    description: 'Cross-platform and native mobile applications with pixel-perfect UI, offline capability, and seamless backend integration. Built simultaneously for iOS and Android by specialized mobile agents.',
    deliverables: ['App Store + Play Store Submission', 'APK/IPA Files', 'Crash Reporting (Sentry)', 'Analytics Integration', '1 Month Post-Launch Support'],
    technologies: ['React Native / Flutter', 'Firebase/Supabase', 'Node.js', 'Stripe/Razorpay'],
    packages: [
      { name: 'MVP', price: '₹2,50,000 - ₹5,00,000', timeline: '6-8 wks', features: ['Single platform', '5-8 screens', 'Basic auth', 'REST API'] },
      { name: 'Standard', price: '₹5,00,000 - ₹12,00,000', timeline: '10-14 wks', features: ['Both platforms', '10-20 screens', 'Push notifications', 'Payments'] },
      { name: 'Premium', price: '₹12,00,000 - ₹30,00,000+', timeline: '14-20 wks', features: ['Full-featured app', 'AR/VR', 'Real-time sync', 'Admin panel'] },
    ],
  },
  {
    id: 'ai-solutions',
    icon: 'Brain',
    title: 'AI Solutions',
    description: 'Custom AI solutions including predictive models, recommendation engines, NLP systems, and computer vision pipelines. Our AI agents build AI — meta, but effective.',
    deliverables: ['Trained Model + Weights', 'Model Card Documentation', 'Inference API', 'Performance Report', 'Monitoring Dashboard'],
    technologies: ['Python', 'TensorFlow/PyTorch', 'LangChain', 'Hugging Face', 'AWS SageMaker', 'MLflow'],
    packages: [
      { name: 'AI Audit', price: '₹1,00,000 - ₹2,00,000', timeline: '2-3 wks', features: ['Feasibility report', 'Data assessment', 'PoC roadmap', 'ROI analysis'] },
      { name: 'AI MVP', price: '₹4,00,000 - ₹10,00,000', timeline: '6-10 wks', features: ['Working prototype', 'Trained model', 'API endpoint', 'Basic monitoring'] },
      { name: 'Enterprise AI', price: '₹10,00,000 - ₹40,00,000+', timeline: '12-20 wks', features: ['Production system', 'MLOps pipeline', 'Model monitoring', 'Retraining'] },
    ],
  },
  {
    id: 'data-analytics',
    icon: 'BarChart3',
    title: 'Data Analytics',
    description: 'Transform raw data into actionable insights with custom dashboards, automated reports, data warehouses, and BI solutions. Your data, our AI, infinite insights.',
    deliverables: ['Data Pipeline', 'Dashboard Builder', 'Automated Reports', 'Anomaly Detection', 'Predictive Analytics'],
    technologies: ['BigQuery/Snowflake', 'dbt', 'Metabase/Tableau', 'Apache Airflow', 'Python'],
    packages: [
      { name: 'Data Audit', price: '₹50,000 - ₹1,00,000', timeline: '1-2 wks', features: ['Data quality report', 'Schema mapping', 'Recommendations'] },
      { name: 'Analytics Setup', price: '₹1,50,000 - ₹4,00,000', timeline: '3-6 wks', features: ['Data pipeline', 'Warehouse setup', '3-5 dashboards', 'Auto reports'] },
      { name: 'Enterprise BI', price: '₹4,00,000 - ₹12,00,000', timeline: '6-10 wks', features: ['Full DWH', '10+ dashboards', 'Anomaly alerts', 'Predictive analytics'] },
    ],
  },
  {
    id: 'ui-ux',
    icon: 'Palette',
    title: 'UI/UX Design',
    description: 'Data-driven, user-centric design from research to prototype to developer handoff. Every pixel intentional, every interaction delightful — crafted by AI design agents.',
    deliverables: ['Figma File (Editable)', 'Interactive Prototype', 'Design Token Documentation', 'Component Library', 'Developer Handoff Guide', 'User Flow Diagrams'],
    technologies: ['Figma', 'Framer', 'React', 'Tailwind CSS', 'Design Tokens'],
    packages: [
      { name: 'UX Audit', price: '₹30,000 - ₹60,000', timeline: '1 wk', features: ['Heuristic evaluation', 'Usability report', 'Quick fixes', 'Priority list'] },
      { name: 'Full Design', price: '₹60,000 - ₹2,00,000', timeline: '2-4 wks', features: ['10-20 screens', 'Wireframes', 'High-fidelity prototype', 'Design system'] },
      { name: 'Design System', price: '₹2,00,000 - ₹5,00,000', timeline: '4-6 wks', features: ['Complete system', 'React components', 'Dark/light mode', 'Accessibility audit'] },
    ],
  },
  {
    id: 'cloud-devops',
    icon: 'Cloud',
    title: 'Cloud & DevOps',
    description: 'Cloud architecture, CI/CD pipelines, containerization, and infrastructure automation. Zero-downtime deployments, auto-scaling, and 24/7 monitoring by DevOps AI agents.',
    deliverables: ['Infrastructure as Code', 'CI/CD Pipeline', 'Monitoring Stack', 'Disaster Recovery Plan', 'Security Setup'],
    technologies: ['AWS/Azure/GCP', 'Terraform', 'Docker', 'Kubernetes', 'GitHub Actions', 'Datadog'],
    packages: [
      { name: 'Audit & Optimize', price: '₹80,000 - ₹1,50,000', timeline: '1-2 wks', features: ['Infra audit', 'Cost analysis', 'Migration roadmap', 'Savings report'] },
      { name: 'Setup & Migrate', price: '₹1,50,000 - ₹4,00,000', timeline: '3-5 wks', features: ['Infrastructure as Code', 'CI/CD pipeline', 'Monitoring', 'Security setup'] },
      { name: 'Managed Cloud', price: '₹50,000 - ₹2,00,000/mo', timeline: 'Ongoing', features: ['24/7 monitoring', 'Auto-scaling', 'Backup & DR', 'Security patches'] },
    ],
  },
  {
    id: 'chatbots',
    icon: 'MessageCircle',
    title: 'AI Chatbots',
    description: 'Intelligent conversational AI — customer support bots, sales assistants, and internal knowledge bots. Multi-channel, multi-language, and powered by the latest LLMs.',
    deliverables: ['Multi-channel Bot', 'Custom Knowledge Base', 'Human Handoff System', 'Analytics Dashboard', 'Multi-language Support'],
    technologies: ['LangChain', 'OpenAI/Claude', 'Next.js', 'WhatsApp API', 'Twilio', 'Pinecone/Weaviate'],
    packages: [
      { name: 'FAQ Bot', price: '₹1,00,000 - ₹2,00,000', timeline: '3-4 wks', features: ['Rule-based + AI hybrid', 'WhatsApp/website', '50-100 FAQ training'] },
      { name: 'AI Assistant', price: '₹2,00,000 - ₹5,00,000', timeline: '4-6 wks', features: ['LLM-powered', 'Custom KB', 'Multi-channel', 'Analytics'] },
      { name: 'Enterprise Copilot', price: '₹5,00,000 - ₹15,00,000+', timeline: '6-8 wks', features: ['Multi-agent system', 'Tool integrations', 'Human handoff', 'SLA'] },
    ],
  },
]

export default function ServicesPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }) },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-30" />
        <div className="section-container relative">
          <div className="max-w-3xl reveal">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Our Services</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
              AI-Powered Services for{' '}
              <span className="text-primary-300">Every Need</span>
            </h1>
            <p className="text-xl text-neutral-300 max-w-2xl">
              20+ services delivered by 50+ specialized AI agents. From strategy to deployment, we build software that scales — at half the cost and twice the speed.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid md:grid-cols-4 gap-8 mb-16 reveal">
            {[
              { icon: Cpu, label: 'AI Agents', value: '50+' },
              { icon: Zap, label: 'Faster Delivery', value: '10x' },
              { icon: Shield, label: 'Code Coverage', value: '90%+' },
              { icon: TrendingUp, label: 'Cost Savings', value: '60%' },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="text-center p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
                  <Icon className="w-8 h-8 text-primary-500 mx-auto mb-3" />
                  <div className="text-2xl font-heading font-bold text-neutral-900">{stat.value}</div>
                  <div className="text-sm text-neutral-800">{stat.label}</div>
                </div>
              )
            })}
          </div>

          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <h2 className="text-3xl font-heading font-bold mb-4">All <span className="gradient-text">Services</span></h2>
            <p className="text-neutral-800">Every service delivered by specialized AI agents with human-level oversight.</p>
          </div>

          {/* Service Details */}
          <div className="space-y-24">
            {serviceDetails.map((service, idx) => {
              const Icon = iconMap[service.icon] || Code2
              return (
                <div key={service.id} id={service.id} className="reveal scroll-mt-24">
                  <div className={`grid lg:grid-cols-2 gap-12 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    <div>
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8 text-primary-500" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4">{service.title}</h2>
                      <p className="text-neutral-800 mb-6 leading-relaxed">{service.description}</p>

                      <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-neutral-800">Deliverables</h4>
                      <ul className="space-y-2 mb-6">
                        {service.deliverables.map((d, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-neutral-800">
                            <Check size={16} className="text-success mt-0.5 shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>

                      <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-neutral-800">Technologies</h4>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {service.technologies.map((t, i) => (
                          <span key={i} className="chip bg-neutral-100 text-neutral-800 text-xs">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Packages</h3>
                      <div className="space-y-4">
                        {service.packages.map((pkg, i) => (
                          <div key={i} className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 hover:border-primary-500/30 transition-all duration-300">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-neutral-900">{pkg.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-neutral-800">
                                <Clock size={14} />
                                {pkg.timeline}
                              </div>
                            </div>
                            <div className="text-xl font-heading font-bold gradient-text mb-3">{pkg.price}</div>
                            <ul className="space-y-1.5">
                              {pkg.features.map((f, j) => (
                                <li key={j} className="flex items-center gap-2 text-sm text-neutral-800">
                                  <Check size={14} className="text-success shrink-0" />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Not Sure Which Service You Need?</h2>
          <p className="text-primary-200 mb-8 max-w-xl mx-auto">Tell us about your project. Our AI consultants will recommend the best approach — free of charge.</p>
          <Link href="/contact" className="btn-white text-lg px-8 py-4">
            Get Free Consultation
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  )
}
