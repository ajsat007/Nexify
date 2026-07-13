// ============================================================================
// Nexify — Environment Configuration
// Validates at build/start time so missing vars fail fast
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

  // AI
  aiProvider: getEnv('AI_PROVIDER', 'openai') as 'openai' | 'anthropic' | 'gemini' | 'deepseek' | 'mistral' | 'ollama',
  aiModel: getEnv('AI_MODEL', 'gpt-4o'),

  // Monitoring
  sentryDsn: getEnv('NEXT_PUBLIC_SENTRY_DSN'),
  posthogKey: getEnv('NEXT_PUBLIC_POSTHOG_KEY'),
  posthogHost: getEnv('NEXT_PUBLIC_POSTHOG_HOST'),

  // Analytics
  gaId: getEnv('NEXT_PUBLIC_GA_ID'),

  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
}
