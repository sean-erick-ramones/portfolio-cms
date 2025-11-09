# Data Model: Tribute Blog Post

**Date**: 2025-11-07  
**Feature**: Tribute Blog Post for Colleague  
**Phase**: 1 - Design & Contracts

## Blog Post Entity

### Frontmatter Schema

The blog post follows the existing `blog` collection schema defined in `content.config.ts`:

```typescript
{
  title: string           // Post title
  description: string     // Meta description / excerpt
  date: Date             // Publication date
  image: string          // Cover image URL (for preview/OG)
  minRead: number        // Estimated reading time in minutes
  author: {
    name: string         // Author name
    avatar: {
      src: string        // Avatar image path
      alt: string        // Alt text
    }
  }
}
```

### Tribute Post Specific Structure

```yaml
---
title: "A Tribute to [Colleague Name]: Thank You for Everything"
description: "Celebrating the contributions and friendship of our Tech Lead as he returns home to the Bahamas"
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

**Field Decisions**:

| Field | Value | Rationale |
|-------|-------|-----------|
| `title` | Tribute-focused title with colleague name | Personal, search-friendly |
| `description` | Summarizes tribute purpose | Good for SEO and social shares |
| `date` | 2025-11-07 (today) | Publication date |
| `image` | Blob URL for cover photo | Shows colleague or team photo |
| `minRead` | 4 minutes | ~800 words + video viewing time |
| `author` | Sean Erick C. Ramones | Existing author profile |

---

## Media Assets Structure

### Video Asset

**Properties**:
- **Location**: R2 bucket via NuxtHub blob storage
- **Access Pattern**: `_hub/blob/serve/tribute/video.mp4`
- **Format**: MP4 (H.264 codec)
- **Estimated Duration**: 1-3 minutes
- **Estimated Size**: 10-50 MB (depends on quality/duration)
- **Delivery**: Direct streaming via blob serve endpoint

**Embed Pattern**:
```html
<video controls poster="[thumbnail-url]">
  <source src="/api/_hub/blob/serve/tribute/video.mp4" type="video/mp4">
</video>
```

---

### Image Assets

**Properties per Image**:
- **Location**: R2 bucket via NuxtHub blob storage
- **Access Pattern**: `_hub/blob/serve/tribute/photo-{n}.jpg`
- **Format**: JPEG or PNG
- **Estimated Count**: 3-5 images
- **Estimated Size**: 500KB - 2MB each
- **Purpose**: Team photos, work moments, candid shots

**Embed Pattern**:
```html
<img src="/api/_hub/blob/serve/tribute/photo1.jpg" alt="Description" />
```

---

## Markdown Body Structure

### Content Sections

1. **Introduction**
   - Who is departing (name, role)
   - Relationship to Miller Development
   - Announcement of departure

2. **Contributions & Impact**
   - Role as Tech Lead
   - Key projects or achievements
   - Leadership qualities
   - Technical skills

3. **Personal Memories**
   - Team moments
   - Friendship stories
   - Character traits
   - Inside jokes (appropriate ones)

4. **Video Tribute**
   - Embedded video section
   - Context about the video content
   - HTML5 video player

5. **Photo Gallery**
   - Grid of team/work photos
   - Captions describing moments
   - Responsive layout (2 columns on desktop, 1 on mobile)

6. **Farewell & Well Wishes**
   - Departure details (October 24, moving to Bahamas)
   - Future wishes
   - Call to action (if applicable - e.g., "leave a comment")

---

## Content Relationships

```
Blog Post (012.colleague-tribute.md)
├── Frontmatter
│   ├── title (string)
│   ├── description (string)
│   ├── date (Date)
│   ├── image (blob URL) ──→ R2: tribute/cover-photo.jpg
│   ├── minRead (number)
│   └── author (object) ──→ Existing author data
│
└── Body (Markdown + HTML)
    ├── Introduction (markdown)
    ├── Contributions (markdown)
    ├── Personal Memories (markdown)
    ├── Video Section (HTML) ──→ R2: tribute/video.mp4
    ├── Photo Gallery (HTML) ──→ R2: tribute/photo-{1-5}.jpg
    └── Farewell (markdown)
```

---

## Validation Rules

### Frontmatter Validation (Enforced by Zod Schema)

- ✅ `title`: Required, non-empty string
- ✅ `description`: Required, non-empty string
- ✅ `date`: Required, valid date object
- ✅ `image`: Required, non-empty string (URL)
- ✅ `minRead`: Required, positive number
- ✅ `author.name`: Required, non-empty string
- ✅ `author.avatar.src`: Required, non-empty string
- ✅ `author.avatar.alt`: Required, non-empty string

### Content Validation (Best Practices)

- ✅ Video URL must be accessible and return video MIME type
- ✅ Image URLs must be accessible and return image MIME type
- ✅ Alt text for all images (accessibility)
- ✅ Video includes fallback text for unsupported browsers
- ✅ Poster image for video (optional but recommended)
- ✅ Reading time calculation: (~200 words/min + video duration)

---

## File Naming Convention

**Blog Post File**: `012.colleague-tribute.md`

**Pattern**: `{number}.{slug}.md`
- Number: Next sequential blog post (current max is 011)
- Slug: URL-friendly identifier
- Extension: `.md` for markdown

**URL Path**: `/blog/012-colleague-tribute`
- Generated automatically by Nuxt Content from filename

---

## Schema Changes

**Required Changes**: ❌ None

The existing blog schema in `content.config.ts` already supports all required fields. No schema modifications needed.

**Verification**:
```typescript
// Existing schema (no changes)
blog: defineCollection({
  type: 'page',
  source: 'blog/*.md',
  schema: z.object({
    minRead: z.number(),        // ✅ Have
    date: z.date(),             // ✅ Have
    image: z.string().nonempty(), // ✅ Have (blob URL)
    author: createAuthorSchema() // ✅ Have
  })
})
```

**Migration Plan**: N/A - No schema changes required
