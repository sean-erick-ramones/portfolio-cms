#!/usr/bin/env node

/**
 * Script to update blog post front matter from Notion exports
 *
 * Usage:
 *   node scripts/update-blog-frontmatter.mjs
 *   node scripts/update-blog-frontmatter.mjs content/blog/my-post.md
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')
const localEnvTarget = process.env.NODE_ENV === 'production' ? 'production' : 'development'

function loadLocalEnvFallback() {
  const candidates = [
    path.join(rootDir, '.env.local'),
    path.join(rootDir, '.env'),
    path.join(rootDir, '.vercel', `.env.${localEnvTarget}.local`),
    path.join(rootDir, '.vercel', '.env.local')
  ]

  for (const envPath of candidates) {
    if (!fs.existsSync(envPath)) {
      continue
    }

    const parsed = dotenv.parse(fs.readFileSync(envPath))

    for (const [key, value] of Object.entries(parsed)) {
      if (process.env[key] === undefined) {
        process.env[key] = value
      }
    }
  }
}

loadLocalEnvFallback()

// Configuration
const BLOG_DIR = path.join(__dirname, '../content/blog')
const AUTHOR = {
  name: 'Sean Erick C. Ramones',
  avatar: {
    src: '/avatars/profile-image-1.png',
    alt: 'Sean Erick C. Ramones'
  }
}

const DEFAULT_IMAGE = 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

// (Reserved for future: keyword-based image refinement)

/**
 * Convert a title string into a URL-friendly slug
 */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Rename a blog file based on its title slug, preserving the numeric prefix.
 * Returns the new file path (or the original if no rename was needed).
 */
function renameFileToSlug(filePath, title) {
  const dir = path.dirname(filePath)
  const basename = path.basename(filePath, '.md')

  // Extract numeric prefix (e.g. "015" from "015.md" or "015.some-slug")
  const prefixMatch = basename.match(/^(\d+)/)
  const prefix = prefixMatch ? prefixMatch[1] : null

  const slug = slugify(title)
  if (!slug) return filePath

  const newName = prefix ? `${prefix}.${slug}.md` : `${slug}.md`
  const newPath = path.join(dir, newName)

  // Skip if already named correctly
  if (newPath === filePath) return filePath

  // Avoid overwriting an existing file
  if (fs.existsSync(newPath)) {
    console.log(`   ⚠️  Cannot rename: ${path.basename(newPath)} already exists`)
    return filePath
  }

  fs.renameSync(filePath, newPath)
  console.log(`   📁 Renamed: ${path.basename(filePath)} → ${path.basename(newPath)}`)
  return newPath
}

/**
 * Get a random tech-related image from Pexels
 * Requires NUXT_PEXELS_API_KEY environment variable
 */
async function getRandomTechImage(title = '') {
  const apiKey = process.env.NUXT_PEXELS_API_KEY

  if (!apiKey) {
    console.log('   ℹ️  No NUXT_PEXELS_API_KEY found, using default image')
    return DEFAULT_IMAGE
  }

  try {
    // Extract keywords from title for better matching
    const titleKeywords = title.toLowerCase()
    let searchQuery = 'programming code technology'

    // Match specific keywords from title
    if (titleKeywords.includes('vue') || titleKeywords.includes('react') || titleKeywords.includes('javascript')) {
      searchQuery = 'web development coding'
    } else if (titleKeywords.includes('design') && titleKeywords.includes('system')) {
      searchQuery = 'system architecture diagram'
    } else if (titleKeywords.includes('design')) {
      searchQuery = 'ui ux design'
    } else if (titleKeywords.includes('color')) {
      searchQuery = 'color palette'
    } else if (titleKeywords.includes('data') || titleKeywords.includes('database')) {
      searchQuery = 'data technology'
    }

    // Get random page (1-10 for variety)
    const page = Math.floor(Math.random() * 10) + 1

    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&orientation=landscape&per_page=15&page=${page}`,
      {
        headers: {
          Authorization: apiKey
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.photos || data.photos.length === 0) {
      console.log('   ℹ️  No images found, using default')
      return DEFAULT_IMAGE
    }

    // Get random photo from results
    const randomPhoto = data.photos[Math.floor(Math.random() * data.photos.length)]
    return randomPhoto.src.large
  } catch (error) {
    console.log(`   ⚠️  Failed to fetch image from Pexels: ${error.message}`)
    return DEFAULT_IMAGE
  }
}

/**
 * Extract title from markdown content
 */
function extractTitle(content) {
  // Look for first heading
  const h1Match = content.match(/^#\s+(.+)$/m)
  if (h1Match) {
    return h1Match[1]
      .replace(/\[.*?\]/g, '') // Remove bracketed tags like [Vue][August 2025]
      .replace(/^[\s\-–—]+/, '') // Remove leading dashes/whitespace
      .trim()
  }

  // Fallback to filename
  return null
}

/**
 * Generate description from content
 */
function generateDescription(content) {
  // Remove front matter and titles
  const cleanContent = content
    .replace(/^---[\s\S]*?---\n/m, '')
    .replace(/^#.*$/gm, '')
    .replace(/^>.*$/gm, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .replace(/\*\*/g, '')
    .trim()

  // Get first meaningful paragraph
  const paragraphs = cleanContent.split('\n\n').filter(p => p.length > 50)
  if (paragraphs.length > 0) {
    const desc = paragraphs[0].replace(/\n/g, ' ').substring(0, 200)
    const formattedDescription = desc.length === 200 ? desc + '...' : desc
    return `"${formattedDescription}"`
  }

  return 'A blog post by Sean Erick C. Ramones'
}

/**
 * Estimate reading time (words per minute: 200)
 */
function estimateReadTime(content) {
  const words = content
    .replace(/^---[\s\S]*?---\n/m, '')
    .split(/\s+/)
    .filter(w => w.length > 0).length
  return Math.max(1, Math.ceil(words / 200))
}

/**
 * Extract or generate date
 */
function extractDate(content) {
  // Look for date in content (e.g., [October 2024])
  const dateMatch = content.match(/\[([A-Za-z]+\s+\d{4})\]/)
  if (dateMatch) {
    const [month, year] = dateMatch[1].split(' ')
    const monthNum = new Date(`${month} 1, ${year}`).getMonth() + 1
    return `${year}-${String(monthNum).padStart(2, '0')}-01`
  }

  // Use current date
  return new Date().toISOString().split('T')[0]
}

/**
 * Parse existing front matter
 */
function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null

  const frontMatter = {}
  const lines = match[1].split('\n')
  let currentKey = null

  for (const line of lines) {
    const keyMatch = line.match(/^(\w+):\s*(.*)/)
    if (keyMatch) {
      currentKey = keyMatch[1]
      frontMatter[currentKey] = keyMatch[2].replace(/^["']|["']$/g, '')
    }
  }

  return frontMatter
}

/**
 * Generate front matter YAML
 */
function generateFrontMatter(data) {
  return `---
title: "${data.title}"
description: ${data.description}
date: ${data.date}
image: ${data.image}
minRead: ${data.minRead}
author:
  name: ${AUTHOR.name}
  avatar:
    src: ${AUTHOR.avatar.src}
    alt: ${AUTHOR.avatar.alt}
---`
}

/**
 * Process a single blog file
 */
async function processBlogFile(filePath, refreshImages = false) {
  console.log(`\n📝 Processing: ${path.basename(filePath)}`)

  const content = fs.readFileSync(filePath, 'utf-8')
  const existing = parseFrontMatter(content)

  // Extract content without front matter
  const contentWithoutFM = content.replace(/^---[\s\S]*?---\n/m, '')

  // Generate new front matter
  const title = extractTitle(contentWithoutFM) || existing?.title || path.basename(filePath, '.md')
  const description = generateDescription(contentWithoutFM)
  const date = extractDate(contentWithoutFM) || existing?.date
  const minRead = estimateReadTime(contentWithoutFM)

  // Get image (fetch new one if refreshImages flag is set or no image exists)
  let image = existing?.image
  if (refreshImages || !image || image === DEFAULT_IMAGE) {
    image = await getRandomTechImage(title)
    console.log(`   🖼️  Fetched new image from Pexels`)
  }

  const newFrontMatter = generateFrontMatter({
    title,
    description,
    date,
    image,
    minRead
  })

  const newContent = newFrontMatter + '\n' + contentWithoutFM

  // Write back
  fs.writeFileSync(filePath, newContent, 'utf-8')

  // Rename file to match title slug
  const newPath = renameFileToSlug(filePath, title)

  console.log(`✅ Updated:`)
  console.log(`   Title: ${title}`)
  console.log(`   Date: ${date}`)
  console.log(`   Read time: ${minRead} min`)

  return newPath
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2)

  // Check for --refresh-images flag
  const refreshImages = args.includes('--refresh-images')
  const fileArgs = args.filter(arg => !arg.startsWith('--'))

  if (fileArgs.length > 0) {
    // Process specific file
    const filePath = path.resolve(fileArgs[0])
    if (fs.existsSync(filePath)) {
      await processBlogFile(filePath, refreshImages)
    } else {
      console.error(`❌ File not found: ${filePath}`)
      process.exit(1)
    }
  } else {
    // Process all files in blog directory
    const files = fs.readdirSync(BLOG_DIR)
      .filter(f => f.endsWith('.md'))
      .map(f => path.join(BLOG_DIR, f))

    console.log(`🔄 Processing ${files.length} blog posts...`)

    if (refreshImages) {
      console.log('🔄 Fetching new images for all posts...\n')
    }

    for (const file of files) {
      await processBlogFile(file, refreshImages)
    }

    console.log(`\n✨ Done! Updated ${files.length} posts.`)
  }
}

main()
