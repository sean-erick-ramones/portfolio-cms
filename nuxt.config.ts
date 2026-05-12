import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import dotenv from 'dotenv'

const rootDir = fileURLToPath(new URL('.', import.meta.url))
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

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/image',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    'nuxt-studio'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },

  compatibilityDate: '2024-11-01',

  nitro: {
    prerender: {
      routes: ['/', '/blog', '/about', '/projects'],
      crawlLinks: true,
      failOnError: false
    },
    experimental: {
      openAPI: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  studio: {
    // Studio admin route (default: '/_studio')
    route: '/_studio',

    // GitHub repository configuration (owner and repo are required)
    repository: {
      provider: 'github', // only GitHub is currently supported
      owner: 'sean-erick-ramones', // your GitHub username or organization
      repo: 'ramones-portfolio-cms', // your repository name
      branch: 'main', // the branch to commit to (default: main)
      rootDir: '' // optional: if your Nuxt app is in a subdirectory (default: '')
    }
  }
})
