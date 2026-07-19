'use client'

import { Landmark, HeartPulse, ShoppingCart, GraduationCap, Truck, Factory, Building2, Film } from 'lucide-react'
import { PageLayout, PageHeader, PageSection } from '@/components/PageLayout'
import { StaggerGroup } from '@/components/ScrollAnimations'

const industries = [
  { name: 'Fintech', icon: Landmark, description: 'Payment platforms, trading systems, risk analytics, and regulatory reporting.', clients: '12+', projects: '25+' },
  { name: 'Healthcare', icon: HeartPulse, description: 'HIPAA-compliant telemedicine, EHR systems, medical analytics, and AI diagnostics.', clients: '8+', projects: '18+' },
  { name: 'E-commerce', icon: ShoppingCart, description: 'Scalable platforms, recommendation engines, inventory management, and omnichannel solutions.', clients: '15+', projects: '32+' },
  { name: 'Edtech', icon: GraduationCap, description: 'LMS, virtual classrooms, assessment platforms, AI tutoring, and adaptive learning.', clients: '10+', projects: '22+' },
  { name: 'Logistics', icon: Truck, description: 'Fleet management, route optimization, warehouse management, and real-time tracking.', clients: '7+', projects: '14+' },
  { name: 'Manufacturing', icon: Factory, description: 'Production planning, IoT integration, quality control, and predictive maintenance.', clients: '6+', projects: '12+' },
  { name: 'Real Estate', icon: Building2, description: 'Property management, CRM, virtual tours, analytics, and marketplace solutions.', clients: '9+', projects: '16+' },
  { name: 'Media & Entertainment', icon: Film, description: 'Content management, streaming, recommendation engines, and audience analytics.', clients: '5+', projects: '10+' },
]

export default function IndustriesPage() {
  return (
    <PageLayout>
      <PageHeader badge="Industries" title="Solutions for Every Industry" subtitle="We deliver AI-powered software across 8+ industries. Each solution is tailored by specialized AI agents." />
      <PageSection>
        <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind) => {
            const Icon = ind.icon
            return (
              <div key={ind.name} className="bg-white dark:bg-surface-800 rounded-2xl p-6 border border-surface-200 dark:border-surface-700 hover:shadow-lg hover:border-primary-500/20 transition-all group">
                <Icon className="w-8 h-8 text-primary-500 mb-3" />
                <h3 className="text-lg font-heading font-bold mb-2 dark:text-white group-hover:text-primary-600 transition-colors">{ind.name}</h3>
                <p className="text-sm text-surface-700 dark:text-surface-400 mb-4">{ind.description}</p>
                <div className="flex items-center gap-4 text-xs text-surface-600">
                  <span>{ind.clients} clients</span>
                  <span>{ind.projects} projects</span>
                </div>
              </div>
            )
          })}
        </StaggerGroup>
      </PageSection>
    </PageLayout>
  )
}
