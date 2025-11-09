# Implementation Plan: Tribute Blog Post for Colleague

**Branch**: `001-tribute-blog-post` | **Date**: 2025-11-07 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-tribute-blog-post/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Create a commemorative blog post for a departing colleague (Tech Lead at Miller Development) with embedded video and images from NuxtHub blob storage. The blog post will be a standard Markdown file in `content/blog/` following the existing blog structure, with media assets fetched from Cloudflare R2 via NuxtHub's blob API. The post will include tribute content about the colleague's contributions, departure details, and multimedia showcasing their time at the company.

## Technical Context

**Language/Version**: TypeScript 5.x, Vue 3 (Composition API), Nuxt 4.1  
**Primary Dependencies**: @nuxt/content (file-based CMS), @nuxthub/core (blob storage), @nuxt/ui (components), motion-v (animations)  
**Storage**: Cloudflare R2 via NuxtHub blob storage (video and images already uploaded)  
**Testing**: N/A (content creation, no new logic to test)  
**Target Platform**: Web (SSR/SSG with Nuxt, deployed on Cloudflare Pages)  
**Project Type**: Single project (Nuxt monolith with content-first architecture)  
**Performance Goals**: Video loads within 3 seconds on standard broadband, images optimize automatically via NuxtImg  
**Constraints**: Video must be web-compatible format (MP4), total page load under 5MB, responsive across all devices  
**Scale/Scope**: Single blog post, ~500-1000 words of content, 1 video (duration NEEDS CLARIFICATION), 3-5 images

**Key Technical Decisions**:
- Use standard Markdown for blog content (no custom Vue components needed)
- Embed video using HTML5 `<video>` tag with blob URL
- Use `<NuxtImg>` for images with automatic optimization
- Fetch blob URLs via NuxtHub's `hubBlob().list()` or direct URL references
- NEEDS CLARIFICATION: Approach for embedding blob assets (static URLs in markdown vs server API vs composable)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Principle I - Content-First Architecture**:
- [x] All page content managed via YAML/Markdown in `content/` directory - ✅ Blog post is markdown file in `content/blog/`
- [x] Zod schemas defined in `content.config.ts` for new content types - ✅ Using existing `blog` collection schema
- [x] No hardcoded content in components (structural elements only) - ✅ All content in markdown file

**Principle II - Type-Safe Schema Validation**:
- [x] Content collections have corresponding Zod schemas - ✅ Blog collection already has schema in `content.config.ts`
- [x] Auto-generated types from `@nuxt/content` are leveraged - ✅ `queryCollection('blog')` returns typed data
- [x] Schema changes include migration plan - ✅ No schema changes needed (using existing blog structure)

**Principle III - Nuxt UI Component System**:
- [x] Components use Nuxt UI library over custom implementations - ✅ Using existing `[...slug].vue` with Nuxt UI components
- [x] Tailwind utilities used over custom CSS - ✅ No custom CSS needed
- [x] Custom components follow PascalCase naming and expose variant APIs - ✅ No custom components needed

**Principle IV - Composition API Patterns**:
- [x] Components use Composition API with `<script setup>` - ✅ Existing blog page uses Composition API
- [x] TypeScript interfaces defined for all props - ✅ Using auto-generated types from content schema
- [x] Specific types imported from `@nuxt/content` - ✅ `queryCollection` provides typed responses

**Principle V - pnpm Workflow Standards**:
- [x] Package management uses `pnpm` exclusively - ✅ Project uses pnpm
- [x] ESLint standards followed (comma-dangle: never, braceStyle: 1tbs) - ✅ No code changes, only content
- [x] Commands executed through pnpm scripts in package.json - ✅ Standard workflow

**✅ ALL GATES PASS** - No constitution violations. This feature is pure content creation following established patterns.

## Project Structure

### Documentation (this feature)

```text
specs/001-tribute-blog-post/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── blob-urls.md     # NuxtHub blob URL patterns
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
content/blog/
└── 012.colleague-tribute.md    # New tribute blog post markdown file

public/
└── blog/
    └── 012-tribute/            # Optional: If we copy assets from R2 to public (alternative approach)
        ├── video.mp4
        └── images/
            ├── photo1.jpg
            ├── photo2.jpg
            └── photo3.jpg

server/api/                      # Optional: If we need server endpoint for blob URLs
└── blog/
    └── tribute-assets.get.ts    # API to fetch blob URLs (if dynamic fetching needed)
```

**Structure Decision**: 

This is a **content-first feature** with minimal code changes. The primary deliverable is a markdown file in `content/blog/012.colleague-tribute.md` following the existing blog post pattern.

**Three implementation approaches** (to be decided in research phase):

1. **Static URLs in Markdown** (Simplest): 
   - Get permanent blob URLs from NuxtHub
   - Embed URLs directly in markdown
   - No server code needed
   - ✅ Fastest, simplest approach
   - ❌ URLs might be long/ugly

2. **Public Directory Copy** (Traditional):
   - Copy assets from R2 to `public/blog/012-tribute/`
   - Use relative paths in markdown
   - ✅ Clean URLs, standard practice
   - ❌ Duplicates storage, manual sync

3. **Server API + Composable** (Most Complex):
   - Create `/api/blog/tribute-assets` endpoint
   - Fetch blob URLs dynamically
   - Use composable in markdown or custom component
   - ❌ Over-engineered for single blog post
   - ❌ Markdown doesn't support async data natively

**Recommended**: Approach #1 (Static URLs) with fallback to #2 if URLs are problematic.


````


## Phase Completion Summary

### Phase 0: Research ✅ COMPLETE

**Output**: `research.md`

**Key Decisions**:
- Video format: MP4 (H.264), duration 1-3 minutes
- Asset embedding: Static URLs via NuxtHub blob serve endpoint
- No server API needed - pure markdown approach
- All NEEDS CLARIFICATION items resolved

**Deliverables**:
- ✅ Research document with 3 implementation options evaluated
- ✅ Decision: Use static public URLs (simplest, aligns with content-first)
- ✅ NuxtHub blob API patterns documented
- ✅ HTML5 video and image embedding best practices

---

### Phase 1: Design & Contracts ✅ COMPLETE

**Outputs**: `data-model.md`, `contracts/blob-urls.md`, `quickstart.md`

**Key Artifacts**:
- ✅ Blog post entity structure documented
- ✅ Frontmatter schema validated (no changes needed)
- ✅ Media asset structure defined
- ✅ Blob URL patterns and examples documented
- ✅ Step-by-step quickstart guide created
- ✅ Agent context updated with feature tech stack

**Constitution Re-Check**: ✅ ALL GATES PASS
- Content-first architecture maintained
- No schema changes required
- No custom components needed
- Existing blog infrastructure sufficient

---

### Phase 2: Tasks (Pending)

**Command**: `/speckit.tasks`

**Expected Output**: `tasks.md` with implementation steps

**Preview**:
- Phase 1: Create markdown file with frontmatter
- Phase 2: Write tribute content
- Phase 3: Embed video and images
- Phase 4: Test and deploy

---

## Implementation Readiness

**Status**: ✅ READY FOR IMPLEMENTATION

**Why Ready**:
1. ✅ All research questions answered
2. ✅ Technical approach decided (static URLs)
3. ✅ Data model defined and validated
4. ✅ Blob URL patterns documented
5. ✅ Quickstart guide provides clear instructions
6. ✅ Constitution compliance verified
7. ✅ No code changes required - content only

**Next Steps**:
1. Run `/speckit.tasks` to generate task breakdown
2. OR start immediately with `quickstart.md` (implementation is simple)
3. Create `content/blog/012.colleague-tribute.md`
4. Follow quickstart guide steps

**Estimated Time to Complete**: 30-45 minutes

---

## Key Takeaways

**This is a content-first feature**:
- No new components
- No schema changes  
- No server endpoints
- Pure markdown + blob URLs

**Implementation = Creating 1 file**:
- `content/blog/012.colleague-tribute.md`
- With proper frontmatter
- With embedded blob URLs
- Following existing blog pattern

**Success Depends On**:
- Assets already uploaded to R2 ✅
- Good writing and personal stories
- Proper blob URL paths
- Testing video/image playback

