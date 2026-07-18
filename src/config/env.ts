// ============================================================================
// Nexify — Environment Configuration
// Free-tier first: no paid API keys required.
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
  // Ollama (local, zero cost) → Groq (free API) → Smart Mock (fallback)
  groqApiKey: getEnv('GROQ_API_KEY'),
  openaiApiKey: getEnv('OPENAI_API_KEY'),

  // Email (Resend — free tier: 100 emails/day)
  // Sign up at https://resend.com, verify your domain
  resendApiKey: getEnv('RESEND_API_KEY'),
  resendFromEmail: getEnv('RESEND_FROM_EMAIL', 'onboarding@resend.dev'),

  // Payments (Razorpay — 2% per transaction, no setup cost)
  // Sign up at https://razorpay.com
  razorpayKeyId: getEnv('RAZORPAY_KEY_ID'),
  razorpayKeySecret: getEnv('RAZORPAY_KEY_SECRET'),

  // Monitoring
  sentryDsn: getEnv('NEXT_PUBLIC_SENTRY_DSN'),

  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
}
