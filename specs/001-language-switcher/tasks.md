# Tasks: Language Switcher

**Input**: Design documents from `/specs/001-language-switcher/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/locale-experience.openapi.yaml, quickstart.md

**Tests**: Not requested — no test tasks generated.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Paths are relative to repository root `/home/seancramones/pet-projects/ramones-portfolio-cms/`
- `app/` for application source (components, pages, composables, utils)
- `content/` for CMS content (YAML, Markdown)
- `i18n/locales/` for locale message JSON files

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare content folder structure and verify base i18n module configuration

- [x] T001 Verify i18n module configuration in nuxt.config.ts has correct locales array, strategy prefix_except_default, and defaultLocale en
- [x] T002 [P] Move existing content files from content/ root into content/en/ mirrored structure (index.yml, about.yml, blog.yml, projects.yml, blog/*.md, projects/*.yml)
- [x] T003 [P] Create content/es/ placeholder structure mirroring content/en/ with Spanish placeholder YAML and Markdown files

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Update content.config.ts to define locale-specific collections (index_en, index_es, blog_en, blog_es, about_en, about_es, pages_en, pages_es, projects_en, projects_es) with source include patterns that strip locale prefix from public paths
- [x] T005 [P] Populate i18n/locales/en.json with all app UI chrome keys: nav labels (nav.home, nav.projects, nav.blog, nav.about), blog strings (blog.readArticle, blog.minRead, blog.copyLink, blog.linkCopied), hero status (hero.available, hero.unavailable), error page (error.title, error.description), color mode (colorMode.switchTo), and SEO fallbacks
- [x] T006 [P] Populate i18n/locales/es.json with Spanish translations matching every key defined in en.json
- [x] T007 Create locale-aware content query composable in app/composables/useLocaleContent.ts that maps active locale from useI18n() to the correct collection name (e.g., blog_en or blog_es) with English fallback when Spanish content is missing

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 — Change Site Language From The Header (Priority: P1) 🎯 MVP

**Goal**: Visitor can switch between English and Spanish from the header and all supported visible text updates to the selected language

**Independent Test**: Open any page, use the language switcher beside the theme toggle, and confirm visible site text changes to the selected language while remaining on the same page

### Implementation for User Story 1

- [x] T008 [P] [US1] Add ULocaleSelect component beside ColorModeButton in the #list-trailing slot of UNavigationMenu in app/components/AppHeader.vue
- [x] T009 [P] [US1] Convert app/utils/links.ts from a static export to a composable (useNavLinks) that uses useI18n().t() for navigation labels (Home, Projects, Blog, About) and update AppHeader.vue and any consumers to use the composable
- [x] T010 [P] [US1] Replace hardcoded "Read Article" button label in app/components/landing/Blog.vue with t('blog.readArticle') and update the blog content query to use locale-aware collection
- [x] T011 [P] [US1] Replace hardcoded availability status strings ("Available for new projects", "Not available at the moment") in app/components/landing/Hero.vue with t() lookups
- [x] T012 [P] [US1] Replace hardcoded strings in app/pages/blog/[...slug].vue: "MIN READ" → t('blog.minRead'), "Copy link" → t('blog.copyLink'), toast message → t('blog.linkCopied'), and date locale from 'en-US' to dynamic locale
- [x] T013 [P] [US1] Replace hardcoded strings in app/error.vue: SEO title → t('error.title'), SEO description → t('error.description'), and update content queries to use locale-aware collections
- [x] T014 [US1] Update app/pages/index.vue to use locale-aware content query composable for the homepage collection instead of queryCollection('index')
- [x] T015 [P] [US1] Update app/pages/about.vue to use locale-aware content query composable for the about collection and replace hardcoded English SEO fallback strings with t() lookups
- [x] T016 [P] [US1] Update app/pages/projects.vue to use locale-aware content queries for both the pages collection (page metadata) and the projects collection (project list)
- [x] T017 [P] [US1] Update app/pages/blog/index.vue to use locale-aware content queries for blog page metadata and blog post list
- [x] T018 [US1] Update app/pages/blog/[...slug].vue content queries (queryCollection and queryCollectionItemSurroundings) to use locale-aware collection names from the composable
- [x] T019 [US1] Update app/app.vue to use locale-aware queryCollectionNavigation and queryCollectionSearchSections for the active locale blog collection

**Checkpoint**: At this point, User Story 1 should be fully functional — the header switcher works and all visible text updates when switching languages

---

## Phase 4: User Story 2 — Start In The Default Language (Priority: P2)

**Goal**: First-time visitors see English by default with the switcher indicating English as the active language

**Independent Test**: Visit the site with no saved language preference and verify English is shown by default with ULocaleSelect indicating English as active

### Implementation for User Story 2

- [ ] T020 [US2] Configure detectBrowserLanguage in nuxt.config.ts i18n block with fallbackLocale set to en and alwaysRedirect false so first-time visitors default to English without browser-language sniffing overriding the default
- [ ] T021 [US2] Update app/app.vue and app/error.vue to set HTML lang attribute dynamically from the active i18n locale instead of hardcoded 'en'
- [ ] T022 [US2] Validate that ULocaleSelect in AppHeader.vue reflects English as the active selection when no locale cookie exists (manual verification task)

**Checkpoint**: First-time visitors consistently see English by default

---

## Phase 5: User Story 3 — Keep The Chosen Language Across Navigation (Priority: P3)

**Goal**: The selected language persists across page navigations, page refreshes, and return visits in the same browser

**Independent Test**: Select Spanish, navigate to multiple pages, refresh, close and reopen the browser to the site, and confirm Spanish remains active throughout

### Implementation for User Story 3

- [ ] T023 [US3] Ensure i18n detectBrowserLanguage configuration in nuxt.config.ts includes useCookie true with a long maxAge so the locale preference persists across sessions
- [ ] T024 [US3] Update nuxt.config.ts prerender routeRules to include /es-prefixed routes (/es, /es/about, /es/projects, /es/blog, and Spanish blog post paths) for Vercel static generation
- [ ] T025 [US3] Verify that navigating to /es/about, /es/blog, /es/projects, and refreshing those routes produces the correct Spanish content with the locale prefix intact

**Checkpoint**: Locale selection survives navigation, refresh, and cross-session revisits

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final validation

- [ ] T026 [P] Update SEO metadata across all page files (index.vue, about.vue, projects.vue, blog/index.vue, blog/[...slug].vue) to set locale-appropriate canonical URLs and og:locale meta tags
- [ ] T027 [P] Implement locale-aware date formatting in app/pages/blog/[...slug].vue using the active i18n locale code instead of hardcoded 'en-US' in toLocaleDateString
- [ ] T028 Ensure UContentSearch in app/app.vue and error.vue only surfaces blog content from the current locale by scoping queryCollectionSearchSections to the active locale collection
- [ ] T029 [P] Create initial Spanish translated content for priority pages in content/es/ (at minimum index.yml and about.yml with real Spanish copy)
- [ ] T030 Run pnpm lint and pnpm typecheck to validate full codebase after all changes
- [ ] T031 Run quickstart.md manual acceptance checks: default English, locale switch, /es routes, refresh persistence, search scoping, fallback behavior, canonical URLs

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3–5)**: All depend on Foundational phase completion
  - User stories can proceed sequentially in priority order (P1 → P2 → P3)
  - US2 and US3 are primarily configuration/validation and can overlap with US1 implementation
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) — No dependencies on other stories. This is the MVP.
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) — Independent of US1 but best validated after US1 is complete so the switcher is visible.
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) — Depends on US1 for end-to-end locale switching behavior. US2 cookie config (T020) should be coordinated with T023.

### Within Each User Story

- Component string replacements (T008–T013) before page query updates (T014–T019)
- Page query updates depend on the locale content composable (T007)
- app.vue (T019) should be one of the last US1 tasks since it affects global navigation/search

### Parallel Opportunities

**Phase 1**: T002 and T003 run in parallel (independent filesystem operations)

**Phase 2**: T005 and T006 run in parallel (separate locale JSON files)

**Phase 3 (US1)**: Two parallel batches:
- Batch A (string replacements): T008, T009, T010, T011, T012, T013 — all modify different files
- Batch B (page queries): T014, T015, T016, T017 — all modify different page files (T015–T017 in parallel, T014 after)

**Phase 6**: T026, T027, T029 run in parallel (different files/concerns)

---

## Parallel Example: User Story 1

```text
# Batch A – Launch all component string replacements together:
T008: "Add ULocaleSelect to AppHeader.vue"
T009: "Convert links.ts to composable with t() nav labels"
T010: "Replace hardcoded strings in landing/Blog.vue"
T011: "Replace hardcoded strings in landing/Hero.vue"
T012: "Replace hardcoded strings in blog/[...slug].vue"
T013: "Replace hardcoded strings in error.vue"

# Batch B – Launch page query updates together (after Batch A):
T015: "Update about.vue locale-aware query"
T016: "Update projects.vue locale-aware queries"
T017: "Update blog/index.vue locale-aware queries"

# Sequential finishers:
T014: "Update index.vue locale-aware query"
T018: "Update blog/[...slug].vue locale-aware queries"
T019: "Update app.vue locale-aware navigation and search"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (content restructuring)
2. Complete Phase 2: Foundational (collections, locale JSON, composable)
3. Complete Phase 3: User Story 1 (header switcher + all text/query updates)
4. **STOP and VALIDATE**: Switch languages in header, verify text changes, verify content loads
5. Deploy preview if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy preview (MVP!)
3. Add User Story 2 → Validate default English behavior → Deploy
4. Add User Story 3 → Validate persistence across sessions → Deploy
5. Polish phase → Final validation → Production deploy

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- The composables/ directory does not exist yet — T007 creates it
- Content restructuring (T002, T003) must preserve git history where possible (use git mv)
- T012 and T018 both touch blog/[...slug].vue but address different concerns (strings vs queries) — implement T012 first
