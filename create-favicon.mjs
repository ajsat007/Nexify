import sharp from 'sharp'
import fs from 'fs'

async function createFavicon() {
  // Create multi-size ICO
  const sizes = [16, 32, 48]
  const buffers = []
  for (const size of sizes) {
    const buf = await sharp('public/nexify-brand-logo.png')
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer()
    buffers.push(buf)
  }
  
  // Simple ICO format writer
  const icoHeader = Buffer.alloc(6)
  icoHeader.writeUInt16LE(0, 0) // reserved
  icoHeader.writeUInt16LE(1, 2) // type: 1 = ICO
  icoHeader.writeUInt16LE(sizes.length, 4) // count
  
  const dirEntries = []
  let offset = 6 + sizes.length * 16
  for (let i = 0; i < sizes.length; i++) {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(sizes[i], 0)
    entry.writeUInt8(sizes[i], 1)
    entry.writeUInt8(0, 2) // color count
    entry.writeUInt8(0, 3) // reserved
    entry.writeUInt16LE(1, 4) // planes
    entry.writeUInt16LE(32, 6) // bit count
    entry.writeUInt32LE(buffers[i].length, 8)
    entry.writeUInt32LE(offset, 12)
    dirEntries.push(entry)
    offset += buffers[i].length
  }
  
  const ico = Buffer.concat([icoHeader, ...dirEntries, ...buffers])
  fs.writeFileSync('public/favicon.ico', ico)
  console.log('favicon.ico created')
}

createFavicon().catch(console.error)
