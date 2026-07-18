# Nexify — Production Deployment Guide

## Architecture

```
User → Browser → Vercel (Next.js SSG + API routes)
                        ├── SQLite DB (/tmp/nexify.db on Vercel)
                        ├── Ollama (local LLM, optional)
                        ├── Groq API (free cloud AI, optional)
                        ├── Resend API (email, optional)
                        └── Razorpay API (payments, optional)
```

## Required Environment Variables

```bash
# At minimum, the site runs with zero config (mock AI mode)
# To activate real services:

# ── AI (choose one, or use built-in mock) ──
# Option A: No env vars — uses Smart Mock (contextual, no API)
# Option B: Install Ollama locally — zero config, auto-detected
# Option C: Groq free tier (sign up at https://console.groq.com)
GROQ_API_KEY=gsk_your_key_here

# ── Email (Resend — free tier, 100 emails/day) ──
# Sign up: https://resend.com → verify domain
RESEND_API_KEY=re_your_key_here
RESEND_FROM_EMAIL=you@yourdomain.com

# ── Payments (Razorpay) ──
# Sign up: https://razorpay.com
RAZORPAY_KEY_ID=rzp_live_your_key
RAZORPAY_KEY_SECRET=your_secret

# ── Site ──
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set env vars
vercel env add GROQ_API_KEY
vercel env add RESEND_API_KEY
vercel env add RAZORPAY_KEY_ID
vercel env add RAZORPAY_KEY_SECRET
vercel env add NEXT_PUBLIC_SITE_URL
```

## Database

- SQLite file auto-creates at `/tmp/nexify.db` on Vercel
- Persists per-deployment (doesn't survive redeploys)
- Seed data auto-populated on first request
- For production: migrate to Supabase (PostgreSQL) for permanent storage

## API Routes Reference

| Route | Method | Purpose |
|---|---|---|
| `/api/seed` | POST | Seed demo data |
| `/api/leads` | GET/POST | List/create leads |
| `/api/proposals` | GET/POST/PATCH | Generate/list/update proposals |
| `/api/projects` | GET/POST | List/create projects |
| `/api/invoices` | GET/POST | List/create invoices |
| `/api/contacts` | POST | Contact form → lead |
| `/api/chat` | POST | AI chat (streaming + non-streaming) |
| `/api/session` | GET/POST/DELETE | Cookie-based sessions |
| `/api/magic-link` | POST | Send magic link email |
| `/api/email-proposal` | POST | Email proposal to client |
| `/api/accept-proposal` | POST | Accept proposal → project + invoice |
| `/api/razorpay` | POST | Create payment order |
| `/api/razorpay-webhook` | POST | Payment confirmation webhook |
| `/api/agents` | GET/POST | Agent task management |
| `/api/auth` | GET/POST | Legacy auth |
| `/api/metrics` | GET | Dashboard statistics |

## Workflow Summary

```
CONTACT FORM
  ↓
LEAD (status: new)
  ↓ Admin clicks "AI Proposal"
PROPOSAL (status: draft)
  ↓ Admin clicks "Email"
PROPOSAL (status: sent) + EMAIL TO CLIENT
  ↓ Client clicks "Accept Proposal & Pay"
PROJECT (status: active) + INVOICE (status: sent) + PAYMENT ORDER
  ↓ Client pays via Razorpay
INVOICE (status: paid)
  ↓ Webhook
Email receipt + project begins
```

## Free Tier Limits

| Service | Limit | Upgrade |
|---|---|---|
| Ollama (local) | Unlimited | None needed |
| Groq API | 30 req/min, ~20k tokens/day | Paid API key |
| Resend | 100 emails/day | $10/mo for 50k |
| Razorpay | 2% per transaction | Custom negotiation |
| Vercel | 100 GB bandwidth, 100 hrs serverless | $20/mo Pro |
