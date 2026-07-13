'use client'

import { Image, FileText, FileSignature, Mail, Monitor, Palette } from 'lucide-react'
import { PageLayout, PageHeader, PageSection } from '@/components/PageLayout'
import { StaggerGroup } from '@/components/ScrollAnimations'

const assets = [
  { icon: Image, name: 'Business Card', formats: 'PDF + PNG', desc: 'Dual-sided business card with Nexify branding' },
  { icon: FileText, name: 'Letterhead', formats: 'PDF + DOCX', desc: 'Professional letterhead for official correspondence' },
  { icon: FileSignature, name: 'Invoice Design', formats: 'PDF', desc: 'Branded invoice template with all required fields' },
  { icon: Mail, name: 'Email Signature', formats: 'HTML', desc: 'Professional email signature with social links' },
  { icon: Palette, name: 'Social Media Templates', formats: 'Figma + PNG', desc: 'LinkedIn, Twitter, Instagram post templates' },
  { icon: Monitor, name: 'Presentation Theme', formats: 'PPTX', desc: 'Investor and client presentation template' },
]

export default function BrandingPage() {
  return (
    <PageLayout>
      <PageHeader badge="Branding" title="Brand Assets" subtitle="Complete brand identity package. Consistent across all touchpoints." />
      <PageSection>
        <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((a) => {
            const Icon = a.icon
            return (
              <div key={a.name} className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all group">
                <Icon className="w-8 h-8 text-primary-500 mb-3" />
                <h3 className="text-lg font-heading font-bold mb-1 dark:text-white group-hover:text-primary-600 transition-colors">{a.name}</h3>
                <p className="text-xs text-neutral-500 mb-2">{a.formats}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{a.desc}</p>
              </div>
            )
          })}
        </StaggerGroup>
      </PageSection>
    </PageLayout>
  )
}
