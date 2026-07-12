'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Cpu, Zap, Globe, Heart, BookOpen, Coffee, Users, Star, Check } from 'lucide-react'

const benefits = [
  { icon: Cpu, title: 'Work Alongside AI', desc: 'You\'ll be part of the world\'s first AI-native company. Every tool, every process, every decision is AI-augmented.' },
  { icon: Globe, title: 'Remote-First', desc: 'Work from anywhere. Async communication. No meetings without agendas.' },
  { icon: Zap, title: 'Ship Day', desc: 'Every month, build whatever you want. No constraints. Share with the team.' },
  { icon: Star, title: 'Learning Budget', desc: '$3,000/year for courses, conferences, books. Your growth is our growth.' },
]

const positions = [
  { title: 'AI Agent Orchestrator', type: 'Full-time', location: 'Remote', description: 'Design and manage multi-agent systems that build software autonomously. You\'ll define agent roles, workflows, and quality gates.' },
  { title: 'Prompt Engineer', type: 'Full-time', location: 'Remote', description: 'Craft and optimize prompts for our AI development agents. You\'ll train models on code generation, testing, and deployment patterns.' },
  { title: 'AI Training Specialist', type: 'Full-time', location: 'Remote', description: 'Curate training data, fine-tune models, and improve agent performance across coding, design, and QA tasks.' },
  { title: 'Agent Orchestrator', type: 'Full-time', location: 'Remote', description: 'Design multi-agent workflows, manage agent swarms, and optimize collaboration between specialized AI agents.' },
  { title: 'Quality Assurance (AI)', type: 'Full-time', location: 'Remote', description: 'Build automated testing frameworks and train AI QA agents to ensure 90%+ code coverage and zero-defect delivery.' },
]

export default function CareersPage() {
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
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl reveal">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Careers</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
              Join the{' '}
              <span className="text-primary-300">AI-First</span> Revolution
            </h1>
            <p className="text-xl text-neutral-300 max-w-2xl">
              We're building the world's most advanced AI-native software company. No humans on the payroll — but if you're an AI researcher, prompt engineer, or agent architect, we want to talk.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <h2 className="text-3xl font-heading font-bold mb-4">Why <span className="gradient-text">Join Us</span></h2>
            <p className="text-neutral-500">We're building the future of software development. Literally.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 reveal">
            {[
              { icon: Cpu, title: 'Work with AI', desc: 'Build and manage the most advanced AI development agents in the industry.' },
              { icon: Globe, title: 'Remote-First', desc: 'Work from anywhere. Async communication. No meetings without agendas.' },
              { icon: Zap, title: 'Ship Day', desc: 'Every month, build whatever you want. No constraints. Share with the team.' },
              { icon: Star, title: 'Learning Budget', desc: '$3,000/year for courses, conferences, books. Your growth is our growth.' },
            ].map((b, i) => {
              const Icon = b.icon
              return (
                <div key={i} className="text-center p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
                  <Icon className="w-8 h-8 text-primary-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">{b.title}</h3>
                  <p className="text-sm text-neutral-500">{b.desc}</p>
                </div>
              )
            })}
          </div>

          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <h2 className="text-3xl font-heading font-bold mb-4">Open <span className="gradient-text">Positions</span></h2>
            <p className="text-neutral-500">We're looking for humans who want to build the future of AI-powered software development.</p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto reveal">
            {[
              { title: 'AI Agent Orchestrator', type: 'Full-time', location: 'Remote', desc: 'Design and manage multi-agent systems that build software autonomously. Define agent roles, workflows, and quality gates.' },
              { title: 'Prompt Engineer', type: 'Full-time', location: 'Remote', desc: 'Craft and optimize prompts for code generation, testing, and deployment agents. Train models on best practices.' },
              { title: 'AI Training Specialist', type: 'Full-time', location: 'Remote', desc: 'Curate training data, fine-tune models, and improve agent performance across coding, design, and QA tasks.' },
              { title: 'Agent Workflow Architect', type: 'Full-time', location: 'Remote', desc: 'Design multi-agent workflows, manage agent swarms, and optimize collaboration between specialized AI agents.' },
              { title: 'AI Research Engineer', type: 'Full-time', location: 'Remote', desc: 'Research and implement cutting-edge AI techniques for code generation, testing, and autonomous software development.' },
            ].map((job, i) => (
              <div key={i} className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 hover:border-primary-500/30 hover:bg-white transition-all group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">{job.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-neutral-400">
                      <span className="chip bg-primary-50 text-primary-600 text-xs">{job.type}</span>
                      <span>{job.location}</span>
                    </div>
                    <p className="text-sm text-neutral-500 mt-2">{job.desc}</p>
                  </div>
                  <Link href="/contact" className="btn-primary text-sm shrink-0 whitespace-nowrap">
                    Apply Now <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Don't See a Role That Fits?</h2>
          <p className="text-primary-200 mb-8 max-w-xl mx-auto">We're always looking for talented people who want to shape the future of AI-powered development.</p>
          <Link href="/contact" className="btn-white text-lg px-8 py-4">
            Send Open Application <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  )
}
