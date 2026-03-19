# Implementation Plan: Language Switcher

**Branch**: `001-language-switcher` | **Date**: 2026-03-18 | **Spec**: `/home/seancramones/pet-projects/ramones-portfolio-cms/specs/001-language-switcher/spec.md`
**Input**: Feature specification from `/home/seancramones/pet-projects/ramones-portfolio-cms/specs/001-language-switcher/spec.md`

## Summary

Add a header language switcher beside the existing theme toggle using Nuxt UI's `ULocaleSelect`, move app chrome strings into locale message files, and localize CMS-driven pages and blog content using mirrored top-level locale folders under `content/en/*` and `content/es/*`. The implementation will introduce locale-aware content collections, shared query helpers with English fallback, localized route generation, and locale-aware SEO/search/navigation so English remains the default experience while Spanish is fully supported.

## Technical Context

**Language/Version**: TypeScript 5.9, Vue 3 Composition API, Nuxt 4.4.2  
**Primary Dependencies**: `@nuxt/ui` 4.5.1, `@nuxt/content` 3.12.0, `@nuxtjs/i18n` 10.2.3, `motion-v` 1.10.3  
**Storage**: File-based YAML/Markdown content in `/home/seancramones/pet-projects/ramones-portfolio-cms/content`, locale message JSON in `/home/seancramones/pet-projects/ramones-portfolio-cms/i18n/locales`, browser-persisted locale preference via Nuxt i18n cookie  
**Testing**: `pnpm lint`, `pnpm typecheck`, manual route and locale validation in `pnpm dev`  
**Target Platform**: Nuxt web application deployed to Vercel for desktop and mobile browsers  
**Project Type**: Single Nuxt web application  
**Performance Goals**: Preserve current prerendered marketing-site behavior, keep locale switching within normal client-side navigation latency, and maintain usable header interactions on mobile and desktop  
**Constraints**: Must preserve content-first architecture, avoid hardcoded visitor-facing copy in components, keep English fallback for missing translations, respect `prefix_except_default`, and maintain direct-load support for localized blog routes  
**Scale/Scope**: 2 locales, 4 primary top-level pages, 12 existing blog posts, project detail entries in content data files, locale-aware header/search/navigation/SEO

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Research Gate

**Principle I - Content-First Architecture**:
- [x] All page content remains managed via YAML/Markdown in `content/`
- [x] New localized content stays in content files rather than component literals
- [x] Only shared UI chrome strings move to locale message files

**Principle II - Type-Safe Schema Validation**:
- [x] Localized content collections will be represented in `content.config.ts`
- [x] Existing `@nuxt/content` generated types remain the source of truth
- [x] The plan includes a content source migration from flat files to mirrored locale folders

**Principle III - Nuxt UI Component System**:
- [x] Header switcher uses Nuxt UI `ULocaleSelect`
- [x] Tailwind/Nuxt UI styling remains the styling approach
- [x] No custom locale switcher widget is required

**Principle IV - Composition API Patterns**:
- [x] Changes remain within `<script setup>` Composition API components
- [x] Locale-aware helpers and props will remain typed
- [x] Content pages continue to consume specific content collection types

**Principle V - pnpm Workflow Standards**:
- [x] Existing pnpm workflow remains unchanged
- [x] ESLint standards remain applicable to all touched files
- [x] Validation commands are available through pnpm scripts

### Post-Design Re-Check

- [x] Design keeps CMS content in localized content files instead of message JSON blobs
- [x] Design adds locale-aware collections and helpers rather than bypassing schema validation
- [x] Design uses Nuxt UI and Nuxt i18n primitives instead of bespoke routing/state infrastructure
- [x] No constitution violations require exception handling

## Project Structure

### Documentation (this feature)

```text
/home/seancramones/pet-projects/ramones-portfolio-cms/specs/001-language-switcher/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── locale-experience.openapi.yaml
└── tasks.md
```

### Source Code (repository root)

```text
/home/seancramones/pet-projects/ramones-portfolio-cms/
├── app/
│   ├── app.vue
│   ├── components/
│   │   ├── AppHeader.vue
│   │   ├── ColorModeButton.vue
│   │   └── landing/
│   ├── pages/
│   │   ├── index.vue
│   │   ├── about.vue
│   │   ├── projects.vue
│   │   └── blog/
│   └── utils/
│       └── links.ts
├── content/
│   ├── en/
│   │   ├── index.yml
│   │   ├── about.yml
│   │   ├── blog.yml
│   │   ├── projects.yml
│   │   ├── blog/
│   │   └── projects/
│   └── es/
│       ├── index.yml
│       ├── about.yml
│       ├── blog.yml
│       ├── projects.yml
│       ├── blog/
│       └── projects/
├── i18n/
│   └── locales/
│       ├── en.json
│       └── es.json
├── content.config.ts
└── nuxt.config.ts
```

**Structure Decision**: Keep the existing single-app Nuxt structure, introduce mirrored top-level locale folders under `/home/seancramones/pet-projects/ramones-portfolio-cms/content`, and reserve `/home/seancramones/pet-projects/ramones-portfolio-cms/i18n/locales` for shared UI message keys only. This follows the Nuxt Content i18n recommendation and avoids mixing translated CMS content into JSON message catalogs.

## Phase 0 Research Decisions

1. Use `ULocaleSelect` with `useI18n()` and `useSwitchLocalePath()` or `useLocalePath()` rather than a custom control.
2. Keep app chrome text in locale JSON files and keep authored page/blog/project copy in localized content files.
3. Use `content/en/*` and `content/es/*` as the canonical content layout instead of `content/blog/en/*` to keep all CMS content consistent.
4. Add locale-aware content query helpers so page components do not manually build collection names everywhere.
5. Apply English fallback for missing Spanish content and localized date formatting, canonical URLs, navigation, and search indexes.

## Phase 1 Design Plan

1. Extend `content.config.ts` to define locale-specific collections for each content type that strips the locale folder from public paths.
2. Create composables or utilities that map the active locale to the correct content collection and fallback collection.
3. Replace static header navigation labels and similar app chrome strings with `t()` lookups from `/home/seancramones/pet-projects/ramones-portfolio-cms/i18n/locales/en.json` and `/home/seancramones/pet-projects/ramones-portfolio-cms/i18n/locales/es.json`.
4. Update page-level content queries, blog lists, blog details, search navigation, and SEO metadata to be locale aware.
5. Move existing English content into `/home/seancramones/pet-projects/ramones-portfolio-cms/content/en` and create matching `/home/seancramones/pet-projects/ramones-portfolio-cms/content/es` placeholders or translated files.
6. Keep prerendering and direct-route behavior valid for both default and prefixed locale routes.

## Complexity Tracking

No constitution exceptions or elevated complexity waivers are required for this feature.

