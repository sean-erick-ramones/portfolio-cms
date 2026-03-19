# Quickstart

## Goal

Implement bilingual site support with English as the default locale, Spanish as the secondary locale, `ULocaleSelect` in the header, localized UI chrome from locale JSON files, and locale-specific CMS content under mirrored `content/en/*` and `content/es/*` folders.

## Prerequisites

- Branch: `/home/seancramones/pet-projects/ramones-portfolio-cms` on `001-language-switcher`
- Dependencies already installed with `pnpm`
- Existing `@nuxtjs/i18n` module configured in `/home/seancramones/pet-projects/ramones-portfolio-cms/nuxt.config.ts`

## Implementation Sequence

1. Confirm `@nuxtjs/i18n` configuration covers default locale, locale definitions, and preference persistence.
2. Replace hardcoded UI shell strings with message keys in:
   - `/home/seancramones/pet-projects/ramones-portfolio-cms/app/utils/links.ts`
   - `/home/seancramones/pet-projects/ramones-portfolio-cms/app/components/AppHeader.vue`
   - `/home/seancramones/pet-projects/ramones-portfolio-cms/app/components/landing/Blog.vue`
   - `/home/seancramones/pet-projects/ramones-portfolio-cms/app/pages/blog/[...slug].vue`
   - `/home/seancramones/pet-projects/ramones-portfolio-cms/app/components/ColorModeButton.vue`
   - `/home/seancramones/pet-projects/ramones-portfolio-cms/app/error.vue`
3. Populate `/home/seancramones/pet-projects/ramones-portfolio-cms/i18n/locales/en.json` with the full English key set and add matching Spanish entries in `/home/seancramones/pet-projects/ramones-portfolio-cms/i18n/locales/es.json`.
4. Add `ULocaleSelect` beside the theme toggle in `/home/seancramones/pet-projects/ramones-portfolio-cms/app/components/AppHeader.vue`.
5. Restructure content into:
   - `/home/seancramones/pet-projects/ramones-portfolio-cms/content/en/...`
   - `/home/seancramones/pet-projects/ramones-portfolio-cms/content/es/...`
6. Update `/home/seancramones/pet-projects/ramones-portfolio-cms/content.config.ts` to define locale-specific collections for page YAML files, blog page metadata, blog posts, and project entries.
7. Introduce locale-aware content query helpers and migrate page, blog, search, and navigation queries to use them.
8. Update SEO metadata, canonical URLs, HTML `lang`, and date formatting to follow the active locale.
9. Ensure prerender coverage includes localized routes that should be directly accessible in production.

## Validation

Run:

```bash
cd /home/seancramones/pet-projects/ramones-portfolio-cms
pnpm lint
pnpm typecheck
pnpm dev
```

## Manual Acceptance Checks

1. Open `/` and verify English is active by default.
2. Use the header locale selector and switch to Spanish without leaving the current page.
3. Visit `/es`, `/es/about`, `/es/projects`, `/es/blog`, and at least one localized blog article.
4. Refresh after changing locale and verify the selected language remains active.
5. Confirm blog search and content navigation only surface the current locale's blog content.
6. Confirm missing Spanish content falls back to English rather than failing.
7. Confirm canonical URLs and HTML `lang` update for both English and Spanish routes.
