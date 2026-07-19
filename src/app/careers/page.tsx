'use client'

import Link from 'next/link'
import { ArrowRight, Cpu, Globe, Zap, Star, MapPin, Briefcase } from 'lucide-react'
import { PageLayout, PageHeader } from '@/components/PageLayout'
import { AnimatedSection } from '@/components/ScrollAnimations'

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

      {/* Perks */}
      <section className="section-padding bg-surface-50 dark:bg-surface-900">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-3 sm:mb-4 dark:text-white">Why <span className="text-primary-600 dark:text-primary-400">Join Us</span></h2>
            <p className="text-surface-700 dark:text-surface-400 text-sm sm:text-base">We&apos;re building the future of software development. Literally.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {perks.map((p, i) => (
              <AnimatedSection key={p.title} animation="fade-up" delay={i * 50}>
                <div className="text-center p-5 sm:p-6 bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 hover:border-primary-500/20 transition-all h-full">
                  <p.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-1 dark:text-white text-sm">{p.title}</h3>
                  <p className="text-sm text-surface-700 dark:text-surface-400">{p.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding bg-white dark:bg-surface-950">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-3 sm:mb-4 dark:text-white">Open <span className="text-primary-600 dark:text-primary-400">Positions</span></h2>
            <p className="text-surface-700 dark:text-surface-400 text-sm sm:text-base">We&apos;re looking for humans who want to build the future of AI-powered software.</p>
          </div>
          <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto">
            {positions.map((job, i) => (
              <AnimatedSection key={i} animation="fade-up" delay={i * 50}>
                <div className="bg-white dark:bg-surface-800 rounded-xl p-5 sm:p-6 border border-surface-200 dark:border-surface-700 hover:border-primary-500/30 transition-all group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="min-w-0">
                      <h3 className="font-semibold dark:text-white group-hover:text-primary-600 transition-colors text-sm sm:text-base">{job.title}</h3>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="chip bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs">{job.type}</span>
                        <span className="text-xs sm:text-sm text-surface-600 flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                      </div>
                      <p className="text-sm text-surface-700 dark:text-surface-400 mt-2 leading-relaxed">{job.desc}</p>
                    </div>
                    <Link href="/contact" className="btn-primary text-sm shrink-0 w-full sm:w-auto text-center">Apply Now <ArrowRight size={16} /></Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3 sm:mb-4">Don&apos;t See a Role That Fits?</h2>
          <p className="text-primary-200 text-base sm:text-lg mb-6 sm:mb-8">We&apos;re always looking for talented people.</p>
          <Link href="/contact" className="btn-white text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4">Send Open Application <ArrowRight size={18} /></Link>
        </div>
      </section>
    </PageLayout>
  )
}
