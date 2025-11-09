# Copilot Instructions for Nuxt Portfolio CMS

This is a Nuxt 4 portfolio template built with Nuxt UI and Nuxt Content, featuring a type-safe CMS architecture with YAML/Markdown content management.

## Architecture Overview

**Tech Stack**: Nuxt 4, Vue 3 Composition API, TypeScript, Nuxt UI (Tailwind-based), Nuxt Content (file-based CMS), YAML/Markdown content, Motion animations, pnpm workspace

**Key Patterns**:
- **Content-driven architecture**: All page content is managed via YAML/Markdown files in `content/` with strict Zod schemas in `content.config.ts`
- **Component structure**: Landing page sections in `components/landing/`, reusable UI in `components/`, layouts in `layouts/`
- **Type safety**: Heavily typed content collections with auto-generated types from `@nuxt/content`

## Content Management System

The project uses a sophisticated file-based CMS with strict typing:

```typescript
// content.config.ts defines collections with Zod schemas
const createButtonSchema = () => z.object({
  label: z.string(),
  to: z.string().optional(),
  color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional()
})
```

**Content Structure**:
- `content/index.yml` - Homepage content (hero, about, testimonials, FAQ)
- `content/projects/*.yml` - Project data files
- `content/blog/*.md` - Blog posts with frontmatter
- `content/{about,projects,blog,speaking}.yml` - Page-specific content

**Adding Content**: Always reference the Zod schema in `content.config.ts` for required fields and types. Content is automatically validated and provides full TypeScript support.

## Component Conventions

**Naming**: PascalCase for components, camelCase for props/composables
**Structure**: Composition API with `<script setup>`, TypeScript interfaces for props
**Styling**: Nuxt UI components with Tailwind utilities, avoid custom CSS when possible

```vue
<!-- Example component pattern -->
<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem  // Auto-generated type from content schema
}>()
</script>

<template>
  <UPageHero>  <!-- Nuxt UI component -->
    <template #title>
      <Motion>  <!-- Animation wrapper -->
        <!-- Content -->
      </Motion>
    </template>
  </UPageHero>
</template>
```

## Key Files & Directories

- `content.config.ts` - Content schema definitions (critical for content changes)
- `app/app.config.ts` - Global app configuration (colors, UI settings, profile data)
- `nuxt.config.ts` - Module configuration, prerendering settings
- `components/landing/` - Homepage section components (Hero.vue, About.vue, etc.)
- `pages/[...slug].vue` - Catch-all routes for blog posts

## Development Workflow

**Commands**: Use `pnpm` (not npm/yarn)
- `pnpm dev` - Development server
- `pnpm build` - Production build with prerendering
- `pnpm lint` / `pnpm lint:fix` - ESLint with Nuxt config

**ESLint**: Uses `@nuxt/eslint` with stylistic rules (comma-dangle: never, braceStyle: 1tbs)

## Animation & Motion

Uses `motion-v` for animations. Common pattern:
```vue
<Motion
  :initial="{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }"
  :animate="{ opacity: 1, scale: 1, filter: 'blur(0px)' }"
  :transition="{ duration: 0.6, delay: 0.1 }"
>
```

## Content Management Tips

- **Adding projects**: Create YAML file in `content/projects/` following the schema
- **Blog posts**: Markdown files in `content/blog/` with required frontmatter (date, image, author, minRead)
- **Homepage updates**: Edit `content/index.yml` sections (hero, about, testimonials, etc.)
- **Type safety**: Always check `content.config.ts` for required fields before creating content

## Common Patterns

- Use `UColorModeAvatar` for profile images with light/dark variants
- Leverage Nuxt UI's variant system (`color`, `variant`, `size` props)
- Content queries via `@nuxt/content` return fully typed objects
- Global config accessible via `useAppConfig()` composable

## Active Technologies
- TypeScript 5.x, Vue 3 (Composition API), Nuxt 4.1 + @nuxt/content (file-based CMS), @nuxthub/core (blob storage), @nuxt/ui (components), motion-v (animations) (001-tribute-blog-post)
- Cloudflare R2 via NuxtHub blob storage (video and images already uploaded) (001-tribute-blog-post)

## Recent Changes
- 001-tribute-blog-post: Added TypeScript 5.x, Vue 3 (Composition API), Nuxt 4.1 + @nuxt/content (file-based CMS), @nuxthub/core (blob storage), @nuxt/ui (components), motion-v (animations)
