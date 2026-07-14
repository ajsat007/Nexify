import { test, expect } from '@playwright/test'

test.describe('Nexify Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders hero section', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/Software/)
    await expect(page.locator('text=AI-Powered')).toBeVisible()
  })

  test('has navigation', async ({ page }) => {
    await expect(page.locator('nav a, nav button').first()).toBeVisible()
  })

  test('services section renders', async ({ page }) => {
    await expect(page.locator('text=Custom Software')).toBeVisible()
  })

  test('footer has links', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible()
    await expect(page.locator('footer a').first()).toBeVisible()
  })

  test('Get Started CTA links to contact', async ({ page }) => {
    const cta = page.locator('a[href="/contact"]').first()
    await cta.click()
    await expect(page).toHaveURL(/\/contact/)
  })
})

test.describe('Nexify Admin', () => {
  test('admin page loads login', async ({ page }) => {
    await page.goto('/admin')
    await expect(page.locator('text=Admin Panel')).toBeVisible()
    await expect(page.locator('button:has-text("Access")')).toBeVisible()
  })

  test('admin login works', async ({ page }) => {
    await page.goto('/admin')
    await page.locator('button:has-text("Access")').click()
    await page.waitForTimeout(1000)
    await expect(page.locator('text=Admin Dashboard')).toBeVisible()
  })
})

test.describe('Nexify API', () => {
  test('GET /api/leads returns data', async ({ request }) => {
    const res = await request.get('/api/leads')
    expect(res.ok()).toBeTruthy()
    const data = await res.json()
    expect(Array.isArray(data.leads)).toBe(true)
  })

  test('GET /api/projects returns data', async ({ request }) => {
    const res = await request.get('/api/projects')
    expect(res.ok()).toBeTruthy()
    const data = await res.json()
    expect(Array.isArray(data.projects)).toBe(true)
  })

  test('GET /api/agents returns agents', async ({ request }) => {
    const res = await request.get('/api/agents')
    expect(res.ok()).toBeTruthy()
    const data = await res.json()
    expect(Array.isArray(data.agents)).toBe(true)
    expect(data.stats.total).toBeGreaterThan(0)
  })

  test('POST /api/chat requires message', async ({ request }) => {
    const res = await request.post('/api/chat', { data: {} })
    expect(res.status()).toBe(400)
  })
})

test.describe('Dark Mode', () => {
  test('theme toggle works', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')
    const initial = await html.getAttribute('class')
    const toggle = page.locator('button[title*="Toggle"]').first()
    if (await toggle.isVisible()) {
      await toggle.click()
      const after = await html.getAttribute('class')
      expect(after).not.toBe(initial)
    }
  })
})
