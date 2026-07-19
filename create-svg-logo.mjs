import fs from 'fs'

// Create SVG logo based on brand colors
// Light theme version
const svgLogoLight = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120" width="400" height="120">
  <defs>
    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366F1"/>
      <stop offset="50%" stop-color="#4F46E5"/>
      <stop offset="100%" stop-color="#7C3AED"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8B5CF6"/>
      <stop offset="100%" stop-color="#6366F1"/>
    </linearGradient>
  </defs>

  <!-- Icon: Forward chevrons forming abstract "N" -->
  <g transform="translate(10, 10)">
    <polygon points="0,50 25,25 50,50 25,75" fill="none" stroke="url(#primaryGrad)" stroke-width="5" stroke-linejoin="round" opacity="0.6"/>
    <polygon points="18,50 43,25 68,50 43,75" fill="none" stroke="url(#primaryGrad)" stroke-width="5" stroke-linejoin="round" opacity="0.8"/>
    <polygon points="36,50 61,25 86,50 61,75" fill="none" stroke="url(#primaryGrad)" stroke-width="5" stroke-linejoin="round" opacity="0.9"/>
    <polygon points="54,50 79,25 104,50 79,75" fill="none" stroke="url(#accentGrad)" stroke-width="5" stroke-linejoin="round"/>
    <circle cx="79" cy="25" r="3" fill="#8B5CF6"/>
  </g>

  <!-- Text -->
  <g transform="translate(120, 35)">
    <text x="0" y="30" font-family="'Space Grotesk', 'Inter', 'Segoe UI', sans-serif" font-size="44" font-weight="700" fill="#0F172A" letter-spacing="1">Nexify</text>
    <text x="195" y="30" font-family="'Space Grotesk', 'Inter', 'Segoe UI', sans-serif" font-size="44" font-weight="700" fill="url(#primaryGrad)" letter-spacing="1">x</text>
    <circle cx="230" cy="10" r="4" fill="url(#accentGrad)"/>
    <text x="0" y="55" font-family="'Inter', 'Segoe UI', sans-serif" font-size="13" font-weight="500" fill="#64748B" letter-spacing="3.5" text-transform="uppercase">TECHNOLOGIES</text>
    <text x="0" y="75" font-family="'Inter', 'Segoe UI', sans-serif" font-size="9.5" font-weight="400" fill="#94A3B8" letter-spacing="1.5" text-transform="uppercase">Engineering Tomorrow&apos;s Digital Frontiers</text>
  </g>
</svg>`

// Dark theme version (same design, works on dark bg)
const svgLogoDark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120" width="400" height="120">
  <defs>
    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#818CF8"/>
      <stop offset="50%" stop-color="#6366F1"/>
      <stop offset="100%" stop-color="#A78BFA"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C4B5FD"/>
      <stop offset="100%" stop-color="#818CF8"/>
    </linearGradient>
  </defs>

  <!-- Icon: Forward chevrons forming abstract "N" -->
  <g transform="translate(10, 10)">
    <polygon points="0,50 25,25 50,50 25,75" fill="none" stroke="url(#primaryGrad)" stroke-width="5" stroke-linejoin="round" opacity="0.6"/>
    <polygon points="18,50 43,25 68,50 43,75" fill="none" stroke="url(#primaryGrad)" stroke-width="5" stroke-linejoin="round" opacity="0.8"/>
    <polygon points="36,50 61,25 86,50 61,75" fill="none" stroke="url(#primaryGrad)" stroke-width="5" stroke-linejoin="round" opacity="0.9"/>
    <polygon points="54,50 79,25 104,50 79,75" fill="none" stroke="url(#accentGrad)" stroke-width="5" stroke-linejoin="round"/>
    <circle cx="79" cy="25" r="3" fill="#C4B5FD"/>
  </g>

  <!-- Text -->
  <g transform="translate(120, 35)">
    <text x="0" y="30" font-family="'Space Grotesk', 'Inter', 'Segoe UI', sans-serif" font-size="44" font-weight="700" fill="white" letter-spacing="1">Nexify</text>
    <text x="195" y="30" font-family="'Space Grotesk', 'Inter', 'Segoe UI', sans-serif" font-size="44" font-weight="700" fill="url(#primaryGrad)" letter-spacing="1">x</text>
    <circle cx="230" cy="10" r="4" fill="url(#accentGrad)"/>
    <text x="0" y="55" font-family="'Inter', 'Segoe UI', sans-serif" font-size="13" font-weight="500" fill="#94A3B8" letter-spacing="3.5" text-transform="uppercase">TECHNOLOGIES</text>
    <text x="0" y="75" font-family="'Inter', 'Segoe UI', sans-serif" font-size="9.5" font-weight="400" fill="#64748B" letter-spacing="1.5" text-transform="uppercase">Engineering Tomorrow&apos;s Digital Frontiers</text>
  </g>
</svg>`

// Icon SVG (square) for favicon, apple-touch-icon, PWA
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366F1"/>
      <stop offset="100%" stop-color="#06B6D4"/>
    </linearGradient>
  </defs>
  <rect x="10" y="10" width="180" height="180" rx="44" fill="url(#g)"/>
  <g transform="translate(55, 55)" stroke="white" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M15 75V15L45 45L75 15V75"/>
  </g>
  <circle cx="70" cy="70" r="4" fill="white" opacity="0.5"/>
  <circle cx="100" cy="70" r="4" fill="white" opacity="0.5"/>
  <circle cx="130" cy="70" r="4" fill="white" opacity="0.5"/>
</svg>`

// Dark mode variant icon
const iconSvgDark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#818CF8"/>
      <stop offset="100%" stop-color="#22D3EE"/>
    </linearGradient>
  </defs>
  <rect x="10" y="10" width="180" height="180" rx="44" fill="url(#g)"/>
  <g transform="translate(55, 55)" stroke="white" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M15 75V15L45 45L75 15V75"/>
  </g>
  <circle cx="70" cy="70" r="4" fill="white" opacity="0.6"/>
  <circle cx="100" cy="70" r="4" fill="white" opacity="0.6"/>
  <circle cx="130" cy="70" r="4" fill="white" opacity="0.6"/>
</svg>`

// OG Image SVG
const ogImageSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B0A2E"/>
      <stop offset="50%" stop-color="#13113C"/>
      <stop offset="100%" stop-color="#09090B"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366F1"/>
      <stop offset="100%" stop-color="#06B6D4"/>
    </linearGradient>
    <linearGradient id="accent2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#818CF8"/>
      <stop offset="100%" stop-color="#22D3EE"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <g opacity="0.04" stroke="white" stroke-width="1">
    <line x1="0" y1="0" x2="0" y2="630"/><line x1="100" y1="0" x2="100" y2="630"/>
    <line x1="200" y1="0" x2="200" y2="630"/><line x1="300" y1="0" x2="300" y2="630"/>
    <line x1="400" y1="0" x2="400" y2="630"/><line x1="500" y1="0" x2="500" y2="630"/>
    <line x1="600" y1="0" x2="600" y2="630"/><line x1="700" y1="0" x2="700" y2="630"/>
    <line x1="800" y1="0" x2="800" y2="630"/><line x1="900" y1="0" x2="900" y2="630"/>
    <line x1="1000" y1="0" x2="1000" y2="630"/><line x1="1100" y1="0" x2="1100" y2="630"/>
  </g>
  <ellipse cx="300" cy="315" rx="350" ry="280" fill="rgba(99,102,241,0.08)" filter="blur(80px)"/>
  <ellipse cx="900" cy="315" rx="300" ry="250" fill="rgba(6,182,212,0.06)" filter="blur(80px)"/>
  <rect x="80" y="215" width="100" height="100" rx="24" fill="url(#accent)"/>
  <g transform="translate(115,245)" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M8 52V8L28 28L48 8V52"/>
  </g>
  <text x="210" y="278" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="42" fill="white">Nexify Technologies</text>
  <text x="210" y="318" font-family="Inter, sans-serif" font-weight="400" font-size="20" fill="rgba(255,255,255,0.5)">AI-Native Software Company</text>
  <text x="80" y="400" font-family="Inter, sans-serif" font-weight="300" font-size="28" fill="url(#accent2)">Engineering Tomorrow&apos;s Digital Frontiers</text>
</svg>`

fs.writeFileSync('public/logo.svg', svgLogoLight)
fs.writeFileSync('public/logo-dark.svg', svgLogoDark)
fs.writeFileSync('public/icon.svg', iconSvg)
fs.writeFileSync('public/icon-dark.svg', iconSvgDark)
fs.writeFileSync('public/og-image.svg', ogImageSvg)
fs.writeFileSync('public/apple-touch-icon.svg', iconSvg)

console.log('SVG logos created!')