# Portfolio CMS

[![Nuxt 4](https://img.shields.io/badge/Nuxt-4.1-00DC82?logo=nuxt&labelColor=020420)](https://nuxt.com) [![Nuxt UI](https://img.shields.io/badge/UI-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white) ![pnpm](https://img.shields.io/badge/pnpm-10.x-F69220?logo=pnpm&logoColor=white) [![Website](https://img.shields.io/website?url=https%3A%2F%2Fwww.seancramones.com)](https://www.seancramones.com) [![CI](https://github.com/sean-erick-ramones/ramones-portfolio-cms/actions/workflows/ci.yml/badge.svg)](https://github.com/sean-erick-ramones/ramones-portfolio-cms/actions/workflows/ci.yml)

A content-driven, type-safe portfolio and blog built with Nuxt 4, Nuxt UI, and Nuxt Content. All site content (homepage sections, projects, blog) is managed via YAML/Markdown and validated with strict Zod schemas. Includes motion animations, OG image generation, and a smooth authoring workflow powered by a helper script and the Pexels API.

Live: https://www.seancramones.com (hosted on Vercel)

## Overview

- Content-first architecture using `@nuxt/content`
- Strong typing for collections via `content.config.ts` (Zod schemas)
- Beautiful UI with Nuxt UI (Tailwind-based) and `motion-v` animations
- File-based CMS: YAML (pages/projects) + Markdown (blog)
- Auto OG image generation with `nuxt-og-image`
- Hosted on Vercel
- Authoring helper script to normalize blog front matter and fetch images

## Tech stack

- Nuxt 4, Vue 3 (Composition API, `<script setup>`)
- Nuxt UI, Tailwind utilities
- Nuxt Content (file-based CMS)
- TypeScript everywhere!
- motion-v for animations
- nuxt-og-image for social images
- pnpm workspace

## Project structure

Key files and folders:

- `content.config.ts` — Content schema definitions (Zod)
- `app/app.config.ts` — Global app configuration (colors, profile, UI)
- `nuxt.config.ts` — Modules and Nitro prerender config
- `app/components/landing/` — Homepage sections (Hero, About, Blog, etc.)
- `app/pages/` — Route pages (index, about, projects, blog)
- `content/` — Content source (index.yml, about.yml, projects.yml, blog/*.md)
- `public/` — Static assets (images, docs, etc.)
- `.github/workflows/` — CI (lint/typecheck/build)
- `scripts/` — Authoring helpers (front matter updater, templates, docs)

## Getting started

Install dependencies:

```bash
pnpm install
```

Start the dev server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

Notes:
- The build script uses `NODE_OPTIONS=--max-old-space-size=4096` to avoid Node heap OOM on CI and local builds.
- Nitro prerender is configured to be explicit and resilient (`crawlLinks: false`, `failOnError: false`).
- If you encounter `GLib-GObject-CRITICAL` errors on Linux, see the Troubleshooting section below.

## Deployment (Vercel)

This project is deployed on Vercel, which provides seamless integration with Nuxt and features like edge functions, blob storage, and automatic deployments.

### Deployment options

**Option 1: Deploy via Vercel CLI**

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

**Option 2: Automatic deployment via GitHub integration**

Connect your GitHub repository to Vercel for automatic deployments:
- Push to `main` → deploys to production
- Push to other branches → creates preview deployments

### Environment variables

Set these in Vercel dashboard. For local development, either keep them in a root `.env.local` or run `vercel pull` and let the app read the generated files from `.vercel/` automatically:

```bash
# Public site URL for OG images
NUXT_PUBLIC_SITE_URL=https://www.seancramones.com

# Pexels API for blog images (optional)
NUXT_PEXELS_API_KEY=your_api_key_here

# Vercel Blob storage (if using)
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

Local workflow:

```bash
vercel pull --yes
pnpm dev
```

The repo checks these files automatically before startup:

```bash
.env.local
.env
.vercel/.env.development.local
.vercel/.env.local
```

That makes a root `.env` optional after cloning. A root `.env.local` still works if you want machine-specific overrides.

## Content authoring

This repo is designed for a simple copy/paste workflow from Notion or any editor into Markdown. A helper script normalizes front matter and keeps metadata consistent.

Content locations:
- Homepage: `content/index.yml`
- Pages: `content/{about,projects,blog}.yml`
- Projects: `content/projects/*.yml`
- Blog posts: `content/blog/*.md`

### Front matter updater (scripts/update-blog-frontmatter.mjs)

What it does:
- Extracts title from first `#` heading
- Generates description from the first paragraph
- Calculates `minRead` from word count (200 wpm)
- Derives `date` if it finds `[Month YYYY]` in the content, otherwise uses today
- Injects author info
- Chooses a featured image (see below)

Commands:

```bash
# Update all blog posts
pnpm blog:update

# Update a single post
pnpm blog:update-file content/blog/my-post.md

# Refresh images for all posts (fetch new tech-related images)
pnpm blog:refresh-images
```

Author details are configured in the script as:

```
author:
  name: "Sean Erick C. Ramones"
  avatar:
    src: avatars/profile-image-1.png
    alt: Sean Erick C. Ramones
```

### Featured images via Pexels API

The script can auto-pick relevant, tech-themed images from Pexels based on your post title (keywords like vue, react, javascript, design, color, data). If no API key is provided, it falls back to a default image.

Environment variable:

```
PEXELS_API_KEY=your_api_key_here
```

You can place it in a root `.env.local`, rely on `vercel pull`, or export it in your shell. Example keys used in this repo:

```
# Public URL, used for OG Image when running nuxt generate
NUXT_PUBLIC_SITE_URL=https://www.seancramones.com
NUXT_PEXELS_API_KEY=your_api_key_here
```

Note: The blog script reads the same fallback chain as Nuxt, so it also works with `.vercel/.env.development.local`.

## Scripts

Available package scripts:

- `pnpm dev` — Start development server
- `pnpm build` — Build for production (with increased Node memory)
- `pnpm preview` — Preview the built app
- `pnpm lint` / `pnpm lint:fix` — ESLint
- `pnpm typecheck` — TypeScript type checking
- `pnpm blog:update` — Normalize all blog posts’ front matter
- `pnpm blog:update-file <path>` — Normalize a single blog post
- `pnpm blog:refresh-images` — Refresh featured images for posts via Pexels

## CI/CD and deployment

Workflows in `.github/workflows/`:

- **`ci.yml`** — Runs on PRs and non-main pushes. Performs install, lint, typecheck, and a build (with increased Node memory) to validate changes.

### Deployment flow

1. Push changes to `main` branch
2. Vercel automatically detects the push via GitHub integration
3. Vercel builds and deploys the site
4. Site is live at https://www.seancramones.com
5. Vercel dashboard shows deployment status and logs

The project uses Vercel's automatic deployment system, which manages:
- Automatic builds on git push
- Preview deployments for pull requests
- Edge functions and serverless routes
- Blob storage via `@vercel/blob`
- Environment variables and secrets

## Troubleshooting

- **Node heap out of memory during build**
  Already mitigated in scripts and CI via `NODE_OPTIONS=--max-old-space-size=4096`.

- **Missing blog images**
  Provide `NUXT_PEXELS_API_KEY` (or `PEXELS_API_KEY` depending on your setup) in `.env`, or run without to use the default image.

- **Content validation errors**
  Check required fields in `content.config.ts`. All YAML/Markdown is validated at build time.

## Acknowledgments

- Built on top of Nuxt UI + Nuxt Content patterns and the Nuxt portfolio template.
- Thanks to the Nuxt team and community for the great ecosystem.
