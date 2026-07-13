'use client'

import Link from 'next/link'
import { ArrowRight, Cpu, Globe, Zap, Star } from 'lucide-react'
import { PageLayout, PageHeader, PageSection } from '@/components/PageLayout'
import { AnimatedSection, StaggerGroup } from '@/components/ScrollAnimations'

const perks = [
  { icon: Cpu, title: 'Work with AI', desc: 'Build and manage the most advanced AI development agents in the industry.' },
  { icon: Globe, title: 'Remote-First', desc: 'Work from anywhere. Async communication. No meetings without agendas.' },
  { icon: Zap, title: 'Ship Day', desc: 'Every month, build whatever you want. No constraints. Share with the team.' },
  { icon: Star, title: 'Learning Budget', desc: '$3,000/year for courses, conferences, books. Your growth is our growth.' },
]

const positions = [
  { title: 'AI Agent Orchestrator', type: 'Full-time', location: 'Remote', desc: 'Design and manage multi-agent systems that build software autonomously.' },
  { title: 'Prompt Engineer', type: 'Full-time', location: 'Remote', desc: 'Craft and optimize prompts for code generation, testing, and deployment agents.' },
  { title: 'AI Training Specialist', type: 'Full-time', location: 'Remote', desc: 'Curate training data, fine-tune models, and improve agent performance.' },
  { title: 'Agent Workflow Architect', type: 'Full-time', location: 'Remote', desc: 'Design multi-agent workflows and manage agent swarms.' },
  { title: 'AI Research Engineer', type: 'Full-time', location: 'Remote', desc: 'Research cutting-edge AI techniques for autonomous software development.' },
]

export default function CareersPage() {
  return (
    <PageLayout>
      <PageHeader badge="Careers" title="Join the AI-First Revolution" subtitle="We're building the world's most advanced AI-native software company. No humans on the payroll — but if you're an AI researcher, prompt engineer, or agent architect, we want to talk." />

      <PageSection dark>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-heading font-bold mb-4 dark:text-white">Why <span className="text-primary-600 dark:text-primary-400">Join Us</span></h2>
          <p className="text-neutral-600 dark:text-neutral-400">We're building the future of software development. Literally.</p>
        </div>
        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((p) => {
            const Icon = p.icon
            return (
              <div key={p.title} className="text-center p-6 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                <Icon className="w-8 h-8 text-primary-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-1 dark:text-white">{p.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{p.desc}</p>
              </div>
            )
          })}
        </StaggerGroup>
      </PageSection>

      <PageSection>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-heading font-bold mb-4 dark:text-white">Open <span className="text-primary-600 dark:text-primary-400">Positions</span></h2>
          <p className="text-neutral-600 dark:text-neutral-400">We're looking for humans who want to build the future of AI-powered software.</p>
        </div>
        <div className="space-y-4 max-w-3xl mx-auto">
          {positions.map((job, i) => (
            <AnimatedSection key={i} animation="fade-up" delay={i * 50}>
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700 hover:border-primary-500/30 transition-all group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold dark:text-white group-hover:text-primary-600 transition-colors">{job.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm">
                      <span className="chip bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs">{job.type}</span>
                      <span className="text-neutral-600 dark:text-neutral-400">{job.location}</span>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">{job.desc}</p>
                  </div>
                  <Link href="/contact" className="btn-primary text-sm shrink-0 whitespace-nowrap">Apply Now <ArrowRight size={16} /></Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </PageSection>

      <section className="py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Don't See a Role That Fits?</h2>
          <p className="text-primary-200 mb-8">We're always looking for talented people.</p>
          <Link href="/contact" className="btn-white text-lg px-8 py-4">Send Open Application <ArrowRight size={20} /></Link>
        </div>
      </section>
    </PageLayout>
  )
}
