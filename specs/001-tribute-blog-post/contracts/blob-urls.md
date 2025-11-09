# Blob URL Contracts

**Date**: 2025-11-07  
**Feature**: Tribute Blog Post Media Assets  
**Purpose**: Document NuxtHub blob storage URL patterns and access methods

## NuxtHub Blob Storage Overview

NuxtHub provides a blob storage abstraction over Cloudflare R2, accessible via the `hubBlob()` composable and HTTP endpoints.

---

## Public URL Pattern

### Base Pattern

```
/api/_hub/blob/serve/{pathname}
```

**Components**:
- `/api/_hub/blob/serve/`: Fixed NuxtHub blob serve endpoint
- `{pathname}`: Relative path within R2 bucket

### Full URL

```
https://{your-app-domain}/_hub/blob/serve/{pathname}
```

**Example**:
```
https://ramones-portfolio.nuxt.dev/_hub/blob/serve/tribute/video.mp4
```

---

## Tribute Post Asset URLs

### Video Asset

**Pathname**: `tribute/video.mp4`

**Public URL**:
```
/api/_hub/blob/serve/tribute/video.mp4
```

**Usage in Markdown**:
```html
<video controls class="w-full rounded-lg">
  <source src="/api/_hub/blob/serve/tribute/video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

**Properties**:
- **Content-Type**: `video/mp4`
- **Expected Size**: 10-50 MB
- **Streaming**: Supported via HTTP range requests
- **Cache**: Leverages Cloudflare CDN

---

### Image Assets

**Pathname Pattern**: `tribute/photo-{n}.jpg`

**Public URLs**:
```
/api/_hub/blob/serve/tribute/photo-1.jpg
/api/_hub/blob/serve/tribute/photo-2.jpg
/api/_hub/blob/serve/tribute/photo-3.jpg
/api/_hub/blob/serve/tribute/photo-4.jpg
/api/_hub/blob/serve/tribute/photo-5.jpg
```

**Usage in Markdown**:
```html
<!-- Single image -->
<img 
  src="/api/_hub/blob/serve/tribute/photo-1.jpg" 
  alt="Team celebration" 
  class="rounded-lg w-full"
/>

<!-- Or with NuxtImg for optimization -->
<NuxtImg
  src="/api/_hub/blob/serve/tribute/photo-1.jpg"
  alt="Team celebration"
  class="rounded-lg"
  loading="lazy"
/>
```

**Properties**:
- **Content-Type**: `image/jpeg` or `image/png`
- **Expected Size**: 500KB - 2MB each
- **Optimization**: Automatic via Cloudflare Images (if enabled)
- **Formats**: JPEG, PNG, WebP supported

---

### Cover Image

**Pathname**: `tribute/cover-photo.jpg`

**Public URL**:
```
/api/_hub/blob/serve/tribute/cover-photo.jpg
```

**Usage in Frontmatter**:
```yaml
---
image: /api/_hub/blob/serve/tribute/cover-photo.jpg
---
```

**Purpose**: 
- Blog post preview thumbnail
- Open Graph image for social shares
- Header image on post detail page

---

## Blob Management API

### Listing Blobs (Server-side only)

```typescript
// server/api/blob-list.get.ts
export default defineEventHandler(async () => {
  const { list } = hubBlob()
  
  const blobs = await list({
    prefix: 'tribute/',
    limit: 100
  })
  
  return blobs
})
```

**Response**:
```json
{
  "blobs": [
    {
      "pathname": "tribute/video.mp4",
      "size": 25000000,
      "uploadedAt": "2025-11-07T00:00:00.000Z"
    },
    {
      "pathname": "tribute/photo-1.jpg",
      "size": 1500000,
      "uploadedAt": "2025-11-07T00:00:00.000Z"
    }
  ]
}
```

---

### Serving Blobs

**Automatic via NuxtHub**:
- All blobs are publicly accessible via `/_hub/blob/serve/` endpoint
- No additional server code needed
- Cloudflare R2 handles streaming and caching

**Manual Serve (if needed)**:
```typescript
// server/api/blob/[...pathname].get.ts
export default defineEventHandler(async (event) => {
  const { serve } = hubBlob()
  const pathname = event.context.params?.pathname
  
  return serve(event, pathname)
})
```

---

## Access Patterns for Blog Post

### Static References (Recommended)

**Approach**: Hardcode blob URLs in markdown

```markdown
---
title: "Tribute Post"
image: /api/_hub/blob/serve/tribute/cover-photo.jpg
---

# Tribute Content

<video controls>
  <source src="/api/_hub/blob/serve/tribute/video.mp4" type="video/mp4">
</video>

![Photo 1](/api/_hub/blob/serve/tribute/photo-1.jpg)
![Photo 2](/api/_hub/blob/serve/tribute/photo-2.jpg)
```

**Pros**:
- ✅ Simple, no code needed
- ✅ Works with SSG prerendering
- ✅ Content-first architecture
- ✅ Cloudflare CDN caching

**Cons**:
- ❌ URLs are somewhat long
- ❌ Changing pathname requires markdown update

---

### Dynamic Fetching (Not Recommended for This Feature)

**Approach**: Fetch blob list at runtime

```typescript
// Unnecessary complexity for single blog post
const { data: assets } = await useFetch('/api/blob-list?prefix=tribute/')
```

**Why Not**:
- Over-engineered for static content
- Breaks content-first principle
- Adds latency
- Unnecessary for blog post that won't change

---

## Security & Access Control

### Public Access
- ✅ All blobs served via `/_hub/blob/serve/` are **publicly accessible**
- ✅ No authentication required
- ✅ Suitable for blog post media

### Private Blobs
- ❌ Not applicable for this feature
- If needed: Use custom server endpoint with auth check before serving

---

## Performance Considerations

### Caching
- **Cloudflare CDN**: Automatic caching at edge locations
- **Browser Cache**: Standard HTTP cache headers
- **Recommended**: Set long cache TTL for immutable assets

### Optimization
- **Video**: Use MP4 with H.264 (broad compatibility)
- **Images**: JPEG for photos, PNG for graphics
- **Lazy Loading**: Use `loading="lazy"` on images
- **Responsive**: Use `srcset` if multiple resolutions available

### Bandwidth
- **Video**: Streamed with HTTP range requests (users can seek)
- **Images**: Optimize before upload (1920px width max recommended)
- **Total Page Size**: Target <10MB total (including video)

---

## Example Full Implementation

### Frontmatter
```yaml
---
title: "A Tribute to [Name]"
description: "Celebrating our Tech Lead's journey"
date: 2025-11-07
image: /api/_hub/blob/serve/tribute/cover-photo.jpg
minRead: 4
author:
  name: Sean Erick C. Ramones
  avatar:
    src: avatars/profile-image-1.png
    alt: Sean Erick C. Ramones
---
```

### Markdown Body
```markdown
# A Tribute to [Name]

## The Journey

[Content about colleague...]

## Watch Our Tribute

<div class="aspect-video w-full my-8">
  <video 
    controls 
    class="w-full h-full rounded-lg object-cover"
    poster="/api/_hub/blob/serve/tribute/video-thumbnail.jpg"
  >
    <source src="/api/_hub/blob/serve/tribute/video.mp4" type="video/mp4">
    <p>Your browser doesn't support video. <a href="/api/_hub/blob/serve/tribute/video.mp4">Download instead</a>.</p>
  </video>
</div>

## Memories in Photos

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <img src="/api/_hub/blob/serve/tribute/photo-1.jpg" alt="Team meeting" class="rounded-lg" />
  <img src="/api/_hub/blob/serve/tribute/photo-2.jpg" alt="Project launch" class="rounded-lg" />
  <img src="/api/_hub/blob/serve/tribute/photo-3.jpg" alt="Team outing" class="rounded-lg" />
  <img src="/api/_hub/blob/serve/tribute/photo-4.jpg" alt="Celebration" class="rounded-lg" />
</div>

## Farewell & Best Wishes

[Closing content...]
```

---

## Troubleshooting

### Blob Not Found (404)
- Verify pathname matches exactly (case-sensitive)
- Check blob was uploaded to correct bucket
- Use `hubBlob().list()` to verify pathname

### Video Won't Play
- Confirm MP4 format with H.264 codec
- Check file isn't corrupted
- Verify Content-Type header is correct
- Test in multiple browsers

### Slow Loading
- Check video file size (<50MB recommended)
- Optimize images before upload
- Verify Cloudflare CDN is active
- Use poster image for faster perceived load

---

## Summary

**URL Pattern**: `/_hub/blob/serve/{pathname}`

**Assets**:
- Video: `tribute/video.mp4`
- Cover: `tribute/cover-photo.jpg`
- Photos: `tribute/photo-{1-5}.jpg`

**Implementation**: Hardcode URLs in markdown (static, simple, fast)

**No API needed**: NuxtHub handles serving automatically
