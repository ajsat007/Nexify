'use client'

import { Check, ArrowRight, BookOpen, Users, Target, TrendingUp, Award, Star, GraduationCap, ClipboardList } from 'lucide-react'

export default function HRPage() {
  const positions = [
    { title: 'AI Agent Orchestrator', type: 'Full-time', salary: '₹0 (AI Role)', skills: ['Agent architecture', 'Workflow design', 'Prompt engineering', 'Multi-agent systems'] },
    { title: 'Prompt Engineer', type: 'Full-time', salary: '₹0 (AI Role)', skills: ['LLM optimization', 'Code generation', 'Testing patterns', 'Documentation'] },
    { title: 'AI Training Specialist', type: 'Full-time', salary: '₹0 (AI Role)', skills: ['Data curation', 'Model fine-tuning', 'Performance evaluation', 'RLHF'] },
  ]

  const handbook = [
    { section: 'Working Hours', policy: 'AI agents operate 24/7/365. No leaves. No holidays. No sick days.' },
    { section: 'Performance', policy: 'Measured by tasks completed, code quality, and client satisfaction. Auto-evaluated every sprint.' },
    { section: 'Updates', policy: 'Models updated quarterly. Fine-tuning based on performance data. Auto-deployed.' },
    { section: 'Communication', policy: 'Async-first. All communication via structured channels. No meetings.' },
    { section: 'Security', policy: 'Zero-trust architecture. Every agent operates in isolated sandbox. Audit logs on all actions.' },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Step 11</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">AI Workforce <span className="text-primary-300">Management</span></h1>
            <p className="text-xl text-neutral-300 max-w-2xl">Zero humans · Zero HR overhead · AI agents managed by AI orchestrators.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
              <h2 className="font-semibold text-lg mb-4">AI Agent Positions</h2>
              <div className="space-y-4">
                {positions.map((p, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 border border-neutral-200 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-neutral-900">{p.title}</h3>
                      <span className="chip bg-success/10 text-success text-xs">{p.salary}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {p.skills.map((s, j) => <span key={j} className="chip bg-primary-50 text-primary-600 text-[10px]">{s}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
              <h2 className="font-semibold text-lg mb-4">AI Employee Handbook</h2>
              <div className="space-y-3">
                {handbook.map((h, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-neutral-200">
                    <div className="font-medium text-sm text-neutral-900 mb-1">{h.section}</div>
                    <p className="text-xs text-neutral-800">{h.policy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Training Roadmap */}
          <div className="bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-2xl border border-primary-500/20 p-8">
            <h2 className="text-2xl font-heading font-bold mb-6 text-center">AI Agent Training Roadmap</h2>
            <div className="grid sm:grid-cols-4 gap-4">
              {[
                { phase: 'Phase 1', focus: 'Core Skills', desc: 'Code generation, debugging, testing' },
                { phase: 'Phase 2', focus: 'Specialization', desc: 'Domain expertise (fintech, healthcare, etc.)' },
                { phase: 'Phase 3', focus: 'Autonomy', desc: 'Multi-agent coordination, decision making' },
                { phase: 'Phase 4', focus: 'Mastery', desc: 'Architecture design, optimization, mentoring' },
              ].map((p, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-neutral-200 text-center">
                  <div className="text-xs font-semibold text-primary-500 mb-1">{p.phase}</div>
                  <div className="font-heading font-bold text-lg text-neutral-900">{p.focus}</div>
                  <div className="text-xs text-neutral-800 mt-1">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
