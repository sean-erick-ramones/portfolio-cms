# Phase 0 Research

## Decision 1: Use Nuxt UI `ULocaleSelect` with Nuxt i18n composables

**Decision**: Implement the header switcher with Nuxt UI's `ULocaleSelect`, binding it to `useI18n().locale` and applying locale changes through `setLocale`, while generating links with `useLocalePath()` or `useSwitchLocalePath()`.

**Rationale**: The component is built for the Nuxt i18n integration, matches the existing Nuxt UI design system, and avoids custom dropdown state, keyboard handling, and accessibility work. It also keeps the header change scoped to a known UI primitive instead of introducing a bespoke locale control.

**Alternatives considered**:
- Build a custom dropdown or segmented toggle: rejected because it duplicates Nuxt UI behavior and adds unnecessary surface area.
- Use plain buttons with manual route rewriting: rejected because it is less extensible and provides a weaker default accessibility story.

## Decision 2: Split content by top-level locale folder, not by `content/blog/en/*`

**Decision**: Use mirrored locale folders under `/home/seancramones/pet-projects/ramones-portfolio-cms/content/en/*` and `/home/seancramones/pet-projects/ramones-portfolio-cms/content/es/*` for all CMS-managed content, including page YAML files, blog page metadata, project metadata, blog posts, and project entries.

**Rationale**: Nuxt Content's i18n integration recommends per-locale collections backed by locale-specific folder trees. A full mirrored layout keeps authored content consistent across the project, scales cleanly beyond blogs, and prevents confusion about which files belong to the i18n message layer versus the CMS layer.

**Alternatives considered**:
- Only split blog content into locale folders: rejected because page-level YAML content and project descriptions are also locale-sensitive.
- Keep CMS content in a single language and translate through JSON messages: rejected because it breaks the content-first architecture and becomes hard to manage in Nuxt Studio.
- Use `content/blog/en/*` and `content/blog/es/*` only: rejected because it creates an inconsistent structure across content types.

## Decision 3: Keep locale JSON files for app chrome only

**Decision**: Store shared interface labels in `/home/seancramones/pet-projects/ramones-portfolio-cms/i18n/locales/en.json` and `/home/seancramones/pet-projects/ramones-portfolio-cms/i18n/locales/es.json`, including navigation labels, button labels, toast text, error text, color-mode labels, and short header labels.

**Rationale**: These strings belong to the application shell rather than authored CMS content. Keeping them in locale JSON makes them easy to reference with `t()` in components and keeps content files focused on page copy.

**Alternatives considered**:
- Put all text in locale JSON: rejected because long-form content, SEO copy, and structured page content already belong in content collections.
- Leave short labels hardcoded in components: rejected because it would violate the feature requirement for bilingual support.

## Decision 4: Introduce locale-aware content collections and query helpers

**Decision**: Define separate content collections per locale and content type in `/home/seancramones/pet-projects/ramones-portfolio-cms/content.config.ts`, then centralize collection selection and fallback behavior in locale-aware query helpers or composables.

**Rationale**: The current code queries fixed collection names such as `blog`, `pages`, `index`, `about`, and `projects`. Locale-aware helpers keep page components readable, reduce copy-pasted collection-name logic, and make fallback behavior consistent across blog lists, blog details, page metadata, navigation, and search.

**Alternatives considered**:
- Compute collection names inline in every page/component: rejected because it spreads locale and fallback logic across too many files.
- Use a single collection with a locale field filter: rejected because the Nuxt Content integration guidance favors per-locale collections and mirrored folders.

## Decision 5: Use English fallback for missing localized content and UI text

**Decision**: Treat English as the source-of-truth fallback locale for content documents, message keys, and UI formatting. Missing Spanish content should gracefully show English rather than fail rendering.

**Rationale**: The spec requires English as the default language and mandates English fallback when selected-language text is unavailable. This approach also reduces the risk of partial Spanish rollouts breaking blog or project pages.

**Alternatives considered**:
- Fail hard when translated content is missing: rejected because it creates broken pages and violates the fallback requirement.
- Duplicate incomplete Spanish placeholders for every content file: rejected because it adds maintenance overhead without improving visitor experience.

## Decision 6: Make route generation, SEO, navigation, search, and date formatting locale aware

**Decision**: Update route generation, canonical URLs, HTML `lang`, search/navigation content sources, and blog date formatting to follow the active locale and the `prefix_except_default` strategy.

**Rationale**: The locale switcher affects more than visible labels. Without locale-aware routes and indexes, the app would show inconsistent language states, incorrect canonical URLs, and mixed-language search/navigation results.

**Alternatives considered**:
- Localize only the header control and a few visible strings: rejected because it would leave the rest of the experience inconsistent.
- Localize routes without search/navigation changes: rejected because search results and blog navigation would leak the wrong locale.
