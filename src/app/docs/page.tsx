'use client'

import { useState } from 'react'
import { Download, FileText, Shield, CheckCircle2, ArrowRight, FileSignature, FileSpreadsheet, Users, Building2, ScrollText, Briefcase, Handshake, FileCheck } from 'lucide-react'
import { PageLayout, PageHeader, PageSection } from '@/components/PageLayout'
import { StaggerGroup } from '@/components/ScrollAnimations'

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
]

export default function DocsPage() {
  const [preview, setPreview] = useState<string | null>(null)

  return (
    <PageLayout>
      <PageHeader badge="Documentation" title="Professional Documentation" subtitle="All documents are AI-generated, professionally formatted, and ready to download." />
      <PageSection>
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => {
            const Icon = doc.icon
            return (
              <div key={doc.name} className="card-responsive hover:shadow-lg transition-all group">
                <div className="flex items-start gap-4">
                  <Icon className="w-8 h-8 text-primary-500 shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm dark:text-white group-hover:text-primary-600 transition-colors">{doc.name}</h3>
                    <p className="text-xs text-neutral-500 mt-1">{doc.desc}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-neutral-400">
                      <span>{doc.pages} pages</span>
                      <span className="chip bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-[10px]">{doc.format}</span>
                    </div>
                  </div>
                  <button className="shrink-0 w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center text-neutral-500 hover:text-primary-500 hover:bg-primary-50 transition-all">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            )
          })}
        </StaggerGroup>
      </PageSection>
    </PageLayout>
  )
}
