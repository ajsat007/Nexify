'use client'

import { useState } from 'react'
import {
  Download, FileText, Shield, CheckCircle2, ArrowRight,
  Copy, ExternalLink, Star, FileSignature, FileSpreadsheet,
  FileImage, FileArchive, Users, Building2, ScrollText,
  Briefcase, Handshake, FileCheck
} from 'lucide-react'

const documents = [
  { icon: Building2, name: 'Company Profile', desc: 'Complete company overview for clients and partners', pages: 12, format: 'PDF' },
  { icon: FileText, name: 'Pitch Deck', desc: 'Investor-ready presentation with business model', pages: 18, format: 'PDF/PPTX' },
  { icon: Briefcase, name: 'Service Agreement', desc: 'Standard terms for software development projects', pages: 8, format: 'PDF' },
  { icon: Handshake, name: 'NDA Template', desc: 'Mutual non-disclosure agreement', pages: 4, format: 'PDF' },
  { icon: FileSignature, name: 'Proposal Template', desc: 'AI-generated project proposals', pages: 6, format: 'PDF' },
  { icon: ScrollText, name: 'Quotation Template', desc: 'Professional price quotations', pages: 2, format: 'PDF' },
  { icon: FileCheck, name: 'Contract Template', desc: 'Fixed-price and T&M contracts', pages: 10, format: 'PDF' },
  { icon: FileSpreadsheet, name: 'Invoice Template', desc: 'Professional invoice with all details', pages: 1, format: 'PDF' },
  { icon: Users, name: 'Employee Handbook', desc: 'AI workforce policies and guidelines', pages: 24, format: 'PDF' },
  { icon: Shield, name: 'Privacy Policy', desc: 'GDPR and IT Act compliant', pages: 6, format: 'PDF' },
  { icon: FileText, name: 'Project Plan Template', desc: 'Detailed project roadmap with milestones', pages: 8, format: 'PDF' },
  { icon: FileText, name: 'Test Case Template', desc: 'Comprehensive QA test case format', pages: 4, format: 'XLSX' },
]

export default function DocsPage() {
  const [preview, setPreview] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Step 9</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">Professional <span className="text-primary-300">Documentation</span></h1>
            <p className="text-xl text-neutral-300 max-w-2xl">All documents are AI-generated, professionally formatted, and ready to download.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, i) => {
              const Icon = doc.icon
              return (
                <div key={i} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 hover:shadow-xl hover:border-primary-500/20 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-neutral-900 mb-1">{doc.name}</h3>
                      <p className="text-sm text-neutral-800 mb-3">{doc.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-800">{doc.pages} pages · {doc.format}</span>
                        <button className="text-primary-500 hover:text-primary-600 text-sm flex items-center gap-1">
                          <Download size={14} /> Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Preview Section */}
          <div className="mt-16 bg-neutral-900 rounded-2xl p-8 text-center">
            <FileText className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-white mb-2">AI-Powered Document Generation</h2>
            <p className="text-neutral-800 mb-6 max-w-xl mx-auto">Our AI agent generates professional documents tailored to each client and project. Every document is consistent with Nexify branding.</p>
            <div className="grid sm:grid-cols-3 gap-4 max-w-lg mx-auto">
              {['Company Profile', 'Pitch Deck', 'Proposal'].map((name, i) => (
                <button key={i} className="bg-neutral-800 hover:bg-neutral-700 rounded-xl p-4 text-center transition-all">
                  <FileText className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                  <span className="text-white text-xs font-medium">{name}</span>
                  <div className="text-[10px] text-neutral-800 mt-1">Download</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
