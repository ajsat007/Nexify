// ============================================================================
// Nexify — Core Type Definitions
// ============================================================================

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  price: string
  timeline: string
  features: string[]
}

export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  price: string
  icon: string
  features: string[]
}

export interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
}

export interface FAQ {
  q: string
  a: string
}

export interface TeamStat {
  label: string
  value: string
  suffix?: string
}

export interface NavItem {
  name: string
  href: string
  hasDropdown?: boolean
  children?: { name: string; href: string }[]
}

export type Theme = 'light' | 'dark'

export interface SearchResult {
  title: string
  href: string
  category: string
  icon: string
}
