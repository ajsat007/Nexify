import sharp from 'sharp'
import fs from 'fs'

const input = 'public/nexify-brand-logo.png'
const outDir = 'public'

// Generate multiple sizes and formats
async function generateLogos() {
  const img = sharp(input)
  const meta = await img.metadata()
  console.log(`Source: ${meta.width}x${meta.height}`)
  
  // Generate SVG from PNG (trace)
  // We'll create a proper SVG logo based on the brand colors
  
  // Favicon.ico (16x16, 32x32, 48x48)
  await sharp(input).resize(48, 48).png().toFile(`${outDir}/favicon-48.png`)
  await sharp(input).resize(32, 32).png().toFile(`${outDir}/favicon-32.png`)
  await sharp(input).resize(16, 16).png().toFile(`${outDir}/favicon-16.png`)
  
  // Apple touch icon
  await sharp(input).resize(180, 180).png().toFile(`${outDir}/apple-touch-icon.png`)
  
  // PWA icons
  await sharp(input).resize(192, 192).png().toFile(`${outDir}/icon-192.png`)
  await sharp(input).resize(512, 512).png().toFile(`${outDir}/icon-512.png`)
  await sharp(input).resize(144, 144).png().toFile(`${outDir}/icon-144.png`)
  await sharp(input).resize(96, 96).png().toFile(`${outDir}/icon-96.png`)
  await sharp(input).resize(72, 72).png().toFile(`${outDir}/icon-72.png`)
  
  // OG image (1200x630)
  await sharp(input).resize(1200, 630, { fit: 'cover' }).png().toFile(`${outDir}/og-image.png`)
  
  // Twitter card (1200x600)
  await sharp(input).resize(1200, 600, { fit: 'cover' }).png().toFile(`${outDir}/twitter-card.png`)
  
  // Logo variations
  await sharp(input).resize(400, 120, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(`${outDir}/logo-horizontal.png`)
  await sharp(input).resize(120, 120, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(`${outDir}/logo-square.png`)
  await sharp(input).resize(320, 320, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(`${outDir}/logo-square-large.png`)
  
  console.log('All logo variants generated!')
}

generateLogos().catch(console.error)
