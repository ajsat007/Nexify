// ============================================================================
// Nexify — Environment Configuration
// Free-tier first: no paid API keys required.
// Ollama (local) → Groq (free API) → Smart Mock (fallback)
// ============================================================================

function getEnv(key: string, fallback?: string): string {
  const value = process.env[key] || fallback
  if (!value && process.env.NODE_ENV === 'production') {
    console.warn(`⚠️ Missing environment variable: ${key}`)
  }
  return value || ''
}

export const env = {
  // Site
  siteUrl: getEnv('NEXT_PUBLIC_SITE_URL', 'https://nexify.tech'),
  siteName: getEnv('NEXT_PUBLIC_SITE_NAME', 'Nexify Technologies'),

  // AI Provider (free tier auto-detected)
  // No env vars needed — uses Ollama if running locally
  // Optional: GROQ_API_KEY for free cloud inference (console.groq.com)
  // Optional: OPENAI_API_KEY as paid fallback
  groqApiKey: getEnv('GROQ_API_KEY'),
  openaiApiKey: getEnv('OPENAI_API_KEY'),

  // Monitoring
  sentryDsn: getEnv('NEXT_PUBLIC_SENTRY_DSN'),
  posthogKey: getEnv('NEXT_PUBLIC_POSTHOG_KEY'),
  posthogHost: getEnv('NEXT_PUBLIC_POSTHOG_HOST'),

  // Analytics
  gaId: getEnv('NEXT_PUBLIC_GA_ID'),

  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
}
