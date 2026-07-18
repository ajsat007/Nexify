#!/bin/bash
# Nexify — Vercel Deployment Setup
# Run this once to link and deploy

echo "🚀 Setting up Nexify on Vercel..."

# Link project (you'll be prompted to log in and select your Vercel account)
npx vercel link --yes

# Set environment variables
echo "📝 Setting environment variables..."

npx vercel env add RAZORPAY_KEY_ID production
# Paste: rzp_live_TEzWmI7zGlDh5K

npx vercel env add RAZORPAY_KEY_SECRET production
# Paste: jzNwW1ecYi6RRpkBPbcGE5ai

npx vercel env add NEXT_PUBLIC_SITE_URL production
# Paste: https://nexify.tech

echo "🌐 Deploying..."
npx vercel --prod

echo "✅ Done! Your site is live."
