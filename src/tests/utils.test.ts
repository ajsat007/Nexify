import { describe, it, expect } from 'vitest'
import { cn, generateId, pickRandom } from '@/utils'
import { siteConfig, navigation } from '@/constants'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('a', 'b')).toBe('a b')
    expect(cn('px-4', 'px-2')).toBe('px-2')
  })
  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible')
  })
})

describe('generateId', () => {
  it('generates an ID with prefix', () => {
    const id = generateId('TEST')
    expect(id).toMatch(/^TEST-[A-Z0-9]+$/)
  })
  it('defaults to ID prefix', () => {
    const id = generateId()
    expect(id).toMatch(/^ID-[A-Z0-9]+$/)
  })
})

describe('pickRandom', () => {
  it('returns an item from the array', () => {
    const arr = ['a', 'b', 'c']
    const picked = pickRandom(arr)
    expect(arr).toContain(picked)
  })
})

describe('siteConfig', () => {
  it('has required fields', () => {
    expect(siteConfig.name).toBeTruthy()
    expect(siteConfig.url).toBeTruthy()
    expect(siteConfig.description).toBeTruthy()
  })
})

describe('navigation', () => {
  it('has home and contact', () => {
    const labels = navigation.map(n => n.name)
    expect(labels).toContain('Home')
    expect(labels).toContain('Contact')
  })
  it('has dropdowns with children', () => {
    const dropdowns = navigation.filter(n => n.hasDropdown)
    expect(dropdowns.length).toBeGreaterThan(0)
    dropdowns.forEach(d => {
      expect(d.children?.length).toBeGreaterThan(0)
    })
  })
})
