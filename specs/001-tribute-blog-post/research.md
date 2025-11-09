# Research: Tribute Blog Post Media Embedding

**Date**: 2025-11-07  
**Feature**: Tribute Blog Post for Colleague  
**Phase**: 0 - Research & Technical Discovery

## Research Questions

### 1. Video Duration and Format
**Question**: What is the video duration and confirm web-compatible format?

**Research**: 
- User mentioned "short video" uploaded to R2
- Standard web formats: MP4 (H.264), WebM, Ogg
- Cloudflare R2 supports all standard video formats

**Decision**: 
- Assume video is already in MP4 format (most common)
- Duration estimated at 1-3 minutes (typical for tribute video)
- If format conversion needed, can be done outside this feature scope

**Action Required**: User to confirm video duration for accurate reading time calculation and format verification.

---

### 2. Approach for Embedding Blob Assets in Markdown

**Question**: How should we reference NuxtHub blob storage assets in markdown blog posts?

**Research Options**:

#### Option A: Static Public URLs (Recommended)
**How it works**:
- Get permanent public URLs from NuxtHub blob storage
- NuxtHub provides `hubBlob().serve()` for public access
- Embed URLs directly in markdown using standard HTML/markdown syntax

**Pros**:
- ✅ Simplest implementation - no code changes
- ✅ Works with standard markdown (no async needed)
- ✅ Content-first: all URLs in markdown file
- ✅ No additional API endpoints
- ✅ Compatible with SSG/prerendering

**Cons**:
- ❌ URLs may be long (e.g., `https://your-app.nuxt.dev/_hub/blob/...`)
- ❌ Harder to migrate if storage changes

**Implementation**:
```markdown
<!-- In content/blog/012.colleague-tribute.md -->

## Watch the Tribute Video

<video controls class="w-full rounded-lg">
  <source src="https://your-app.nuxt.dev/_hub/blob/videos/tribute.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Photo Gallery

![Colleague at work](https://your-app.nuxt.dev/_hub/blob/images/photo1.jpg)
![Team photo](https://your-app.nuxt.dev/_hub/blob/images/photo2.jpg)
```

---

#### Option B: Copy to Public Directory
**How it works**:
- Download assets from R2
- Place in `public/blog/012-tribute/`
- Reference using relative paths

**Pros**:
- ✅ Clean, short URLs (`/blog/012-tribute/video.mp4`)
- ✅ Standard Nuxt practice
- ✅ Fast CDN delivery via public directory
- ✅ Works offline in development

**Cons**:
- ❌ Duplicates storage (R2 + git repo)
- ❌ Manual sync if assets update
- ❌ Increases repo size

**Implementation**:
```markdown
<!-- In content/blog/012.colleague-tribute.md -->

<video controls class="w-full rounded-lg">
  <source src="/blog/012-tribute/video.mp4" type="video/mp4">
</video>

![Team photo](/blog/012-tribute/photo1.jpg)
```

---

#### Option C: Server API + Dynamic Fetching
**How it works**:
- Create `/server/api/blog/tribute-assets.get.ts`
- Fetch blob URLs dynamically using `hubBlob().list()`
- Pass to markdown via custom component or data prop

**Pros**:
- ✅ Single source of truth (R2 only)
- ✅ Can rotate assets without deployment
- ✅ Centralized asset management

**Cons**:
- ❌ Over-engineered for single blog post
- ❌ Markdown doesn't support async data natively
- ❌ Would require custom Vue component in markdown
- ❌ Breaks content-first architecture principle
- ❌ Adds complexity for minimal benefit

---

### Decision: Option A (Static Public URLs)

**Rationale**:
1. **Aligns with Constitution**: Content-first architecture - all URLs in markdown
2. **Simplest**: Zero code changes, works immediately
3. **SSG Compatible**: Static URLs work with prerendering
4. **User Context**: User already uploaded to R2, implying they have URLs

**Fallback**: If URLs are problematic (too long, ugly), switch to Option B

**Implementation Steps**:
1. Get public blob URLs from NuxtHub dashboard or CLI
2. Add URLs directly to markdown frontmatter or body
3. Use HTML5 `<video>` tag for video embed
4. Use standard markdown `![alt](url)` for images

---

### 3. NuxtHub Blob API Patterns

**Research**: How to get public URLs from NuxtHub blob storage?

**Documentation Review**:
```typescript
// NuxtHub provides hubBlob() composable
const { serve, list, put, del } = hubBlob()

// Getting public URL for serving
const publicUrl = `/api/_hub/blob/serve/${pathname}`

// Or use full URL with domain
const fullUrl = `https://your-app.nuxt.dev/_hub/blob/serve/${pathname}`
```

**Best Practice**:
- Store blob pathnames in markdown frontmatter if needed
- Use `_hub/blob/serve/` endpoint for public access
- Pathnames are relative to R2 bucket root

**Example Frontmatter**:
```yaml
---
title: "Tribute to [Colleague Name]"
date: 2025-11-07
image: https://images.pexels.com/... # Cover image
video: /api/_hub/blob/serve/tribute/colleague-video.mp4
gallery:
  - /api/_hub/blob/serve/tribute/photo1.jpg
  - /api/_hub/blob/serve/tribute/photo2.jpg
  - /api/_hub/blob/serve/tribute/photo3.jpg
---
```

---

### 4. Markdown Video Embedding Best Practices

**Research**: HTML5 video in markdown + responsive design

**Best Practices**:
```html
<!-- Responsive video with controls -->
<div class="aspect-video w-full my-8">
  <video 
    controls 
    class="w-full h-full rounded-lg object-cover"
    poster="/api/_hub/blob/serve/tribute/video-thumbnail.jpg"
  >
    <source src="/api/_hub/blob/serve/tribute/video.mp4" type="video/mp4">
    <p>Your browser doesn't support HTML5 video. Here is a 
       <a href="/api/_hub/blob/serve/tribute/video.mp4">link to the video</a> instead.
    </p>
  </video>
</div>
```

**Key Features**:
- `controls`: Play, pause, volume controls
- `poster`: Thumbnail before playing
- `aspect-video`: Tailwind class for 16:9 ratio
- Fallback link for unsupported browsers

---

### 5. Image Gallery in Markdown

**Research**: Display multiple images in blog post

**Approach**: Use standard markdown images with Tailwind/Nuxt classes

```markdown
## Photo Gallery

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <img src="/api/_hub/blob/serve/tribute/photo1.jpg" alt="Description" class="rounded-lg" />
  <img src="/api/_hub/blob/serve/tribute/photo2.jpg" alt="Description" class="rounded-lg" />
  <img src="/api/_hub/blob/serve/tribute/photo3.jpg" alt="Description" class="rounded-lg" />
  <img src="/api/_hub/blob/serve/tribute/photo4.jpg" alt="Description" class="rounded-lg" />
</div>
```

**Alternative**: Use NuxtImg for optimization
```html
<NuxtImg 
  src="/api/_hub/blob/serve/tribute/photo1.jpg" 
  alt="Description" 
  class="rounded-lg"
  width="800"
  height="600"
  loading="lazy"
/>
```

---

## Research Conclusions

### Resolved Decisions

1. **Video Duration**: Assume 1-3 minutes (user to confirm for exact reading time)
2. **Video Format**: MP4 (H.264) - most common, web-compatible
3. **Asset Embedding**: Use static public URLs via NuxtHub blob serve endpoint
4. **Implementation**: Pure markdown with HTML5 video tag - no code changes needed
5. **Image Optimization**: Use standard `<img>` tags or NuxtImg component

### No Additional Research Needed

All technical questions resolved. The implementation is straightforward:
- Create markdown file in `content/blog/`
- Embed blob URLs using `_hub/blob/serve/` pattern
- Use HTML5 video tag with controls
- Display images in grid layout

### Dependencies

- NuxtHub blob storage already configured ✅
- Assets already uploaded to R2 ✅
- Blog collection schema exists ✅
- Blog detail page supports markdown rendering ✅

### Next Phase

Ready for **Phase 1: Design & Contracts**
- data-model.md (blog post frontmatter structure)
- contracts/blob-urls.md (URL patterns and examples)
- quickstart.md (how to create the blog post)
