#!/usr/bin/env node

/**
 * Generate Open Graph image for social media previews
 *
 * Usage:
 *   node scripts/generate-og-image.mjs
 */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config = {
  width: 1200,
  height: 630,
  background: '#0a0a0a', // Dark background
  profileImagePath: path.join(__dirname, '../public/avatars/profile-image-1.png'),
  outputPath: path.join(__dirname, '../public/og-image.png')
}

async function generateOGImage() {
  console.log('🎨 Generating Open Graph image...\n')

  try {
    // Create gradient background
    const gradient = Buffer.from(
      `<svg width="${config.width}" height="${config.height}">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0a0a0a;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#1a1a1a;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0a0a0a;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="${config.width}" height="${config.height}" fill="url(#grad)" />

        <!-- Subtle grid pattern -->
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
        </pattern>
        <rect width="${config.width}" height="${config.height}" fill="url(#grid)" />

        <!-- Accent gradient circle -->
        <defs>
          <radialGradient id="accent">
            <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.2" />
            <stop offset="100%" style="stop-color:#10b981;stop-opacity:0" />
          </radialGradient>
        </defs>
        <circle cx="900" cy="150" r="300" fill="url(#accent)" />
      </svg>`
    )

    // Load and process profile image
    const profileImage = await sharp(config.profileImagePath)
      .resize(280, 280, { fit: 'cover' })
      .png()
      .toBuffer()

    // Create text overlay
    const textOverlay = Buffer.from(
      `<svg width="${config.width}" height="${config.height}">
        <!-- Name -->
        <text
          x="500"
          y="280"
          font-family="system-ui, -apple-system, sans-serif"
          font-size="45"
          font-weight="700"
          fill="#ffffff"
        >
          Sean Erick C. Ramones
        </text>

        <!-- Title/Role -->
        <text
          x="500"
          y="340"
          font-family="system-ui, -apple-system, sans-serif"
          font-size="32"
          font-weight="400"
          fill="#10b981"
        >
          Full-Stack Software Engineer
        </text>

        <!-- Subtitle -->
        <text
          x="500"
          y="390"
          font-family="system-ui, -apple-system, sans-serif"
          font-size="24"
          font-weight="400"
          fill="#a3a3a3"
        >
          Vue.js · Nuxt · TypeScript · Modern Web
        </text>

        <!-- Website URL -->
        <text
          x="500"
          y="550"
          font-family="system-ui, -apple-system, monospace"
          font-size="20"
          font-weight="500"
          fill="#737373"
        >
          www.seancramones.com
        </text>
      </svg>`
    )

    // Compose final image
    await sharp(gradient)
      .composite([
        {
          input: profileImage,
          top: 175,
          left: 140,
          blend: 'over'
        },
        {
          input: textOverlay,
          top: 0,
          left: 0,
          blend: 'over'
        }
      ])
      .png()
      .toFile(config.outputPath)

    console.log('✅ Success! OG image generated at:')
    console.log(`   ${config.outputPath}`)
    console.log(`\n📐 Dimensions: ${config.width}x${config.height}px`)

    const stats = fs.statSync(config.outputPath)
    console.log(`💾 Size: ${(stats.size / 1024).toFixed(2)} KB`)

    console.log('\n🧪 Test it:')
    console.log('   1. Start dev server: pnpm dev')
    console.log('   2. Visit: http://localhost:3000/og-image.png')
    console.log('   3. Deploy and test with: https://www.opengraph.xyz/')
  } catch (error) {
    console.error('❌ Error generating OG image:', error.message)
    process.exit(1)
  }
}

generateOGImage()
