# Quickstart: Creating the Tribute Blog Post

**Feature**: Tribute Blog Post for Colleague  
**Estimated Time**: 30-45 minutes  
**Prerequisites**: Assets uploaded to NuxtHub blob storage

---

## Overview

This guide walks you through creating a tribute blog post with embedded video and images from NuxtHub blob storage. The implementation requires **no code changes** - only creating a markdown file with the proper structure.

---

## Step 1: Verify Blob Assets

### Check Assets in NuxtHub

```bash
# Option A: Use NuxtHub CLI (if available)
npx nuxthub blob list --prefix tribute/

# Option B: Create a temporary API endpoint
# Create: server/api/check-blobs.get.ts
```

**Temporary API to check blobs**:
```typescript
// server/api/check-blobs.get.ts
export default defineEventHandler(async () => {
  const { list } = hubBlob()
  const blobs = await list({ prefix: 'tribute/' })
  return blobs
})
```

Then visit: `http://localhost:3000/api/check-blobs`

### Expected Assets

✅ Video file: `tribute/video.mp4`  
✅ Cover photo: `tribute/cover-photo.jpg`  
✅ Gallery photos: `tribute/photo-1.jpg` through `tribute/photo-5.jpg`

---

## Step 2: Create Blog Post File

### File Location

```
content/blog/012.colleague-tribute.md
```

**Naming Convention**:
- Number: `012` (next sequential after 011)
- Slug: `colleague-tribute` (URL-friendly)
- Extension: `.md`

### Create the File

```bash
touch content/blog/012.colleague-tribute.md
```

Or use your editor to create the file.

---

## Step 3: Add Frontmatter

Copy and customize this frontmatter block:

```yaml
---
title: "A Tribute to [Colleague Name]: Thank You for Everything"
description: "Celebrating the contributions and friendship of our Tech Lead as he returns home to the Bahamas after years of dedication to Miller Development in the Philippines"
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

**Customize**:
- Replace `[Colleague Name]` with actual name
- Adjust `description` with personal details
- Update `date` if publishing later
- Adjust `minRead` based on final content length

---

## Step 4: Write Content Body

### Template Structure

```markdown
# A Tribute to [Colleague Name]

*By Sean Erick C. Ramones*

## The Announcement

On October 24th, 2024, our team at Miller Development received bittersweet news...

[Write introduction about the departure announcement]

## A Tech Lead Who Made a Difference

[Share specific contributions, technical leadership examples, projects led]

## More Than a Colleague, A Friend

[Personal stories, team memories, character traits that made them special]

## Watch Our Tribute Video

<div class="aspect-video w-full my-8">
  <video 
    controls 
    class="w-full h-full rounded-lg shadow-lg"
    poster="/api/_hub/blob/serve/tribute/video-thumbnail.jpg"
  >
    <source src="/api/_hub/blob/serve/tribute/video.mp4" type="video/mp4">
    <p class="text-muted">
      Your browser doesn't support HTML5 video. 
      <a href="/api/_hub/blob/serve/tribute/video.mp4" class="underline">
        Download the video instead
      </a>.
    </p>
  </video>
</div>

*A special message from the Miller Development team*

## Memories in Photos

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
  <div class="space-y-2">
    <img 
      src="/api/_hub/blob/serve/tribute/photo-1.jpg" 
      alt="[Description of photo 1]" 
      class="rounded-lg shadow-md w-full h-64 object-cover"
    />
    <p class="text-sm text-muted text-center">[Caption for photo 1]</p>
  </div>
  
  <div class="space-y-2">
    <img 
      src="/api/_hub/blob/serve/tribute/photo-2.jpg" 
      alt="[Description of photo 2]" 
      class="rounded-lg shadow-md w-full h-64 object-cover"
    />
    <p class="text-sm text-muted text-center">[Caption for photo 2]</p>
  </div>
  
  <div class="space-y-2">
    <img 
      src="/api/_hub/blob/serve/tribute/photo-3.jpg" 
      alt="[Description of photo 3]" 
      class="rounded-lg shadow-md w-full h-64 object-cover"
    />
    <p class="text-sm text-muted text-center">[Caption for photo 3]</p>
  </div>
  
  <div class="space-y-2">
    <img 
      src="/api/_hub/blob/serve/tribute/photo-4.jpg" 
      alt="[Description of photo 4]" 
      class="rounded-lg shadow-md w-full h-64 object-cover"
    />
    <p class="text-sm text-muted text-center">[Caption for photo 4]</p>
  </div>
</div>

## Heading Home to the Bahamas

[Write about the move to Bahamas, hometown, future plans]

## Our Gratitude

[Express gratitude from team, wish them well]

## What We'll Miss Most

- [List key things the team will miss]
- [Technical expertise, leadership style]
- [Personal qualities, sense of humor]
- [Specific memories or inside jokes]

## Farewell, Friend

[Final sendoff, well wishes for the future, door always open message]

---

*If you worked with [Name] and want to share a memory, feel free to reach out on [LinkedIn/Twitter/contact method].*
```

---

## Step 5: Test Locally

### Start Development Server

```bash
pnpm dev
```

### View the Post

1. Navigate to `http://localhost:3000/blog`
2. Find the tribute post in the list
3. Click to open `http://localhost:3000/blog/012-colleague-tribute`

### Checklist

- [ ] Post appears in blog index
- [ ] Cover image displays correctly
- [ ] Post detail page loads
- [ ] Video player shows and controls work
- [ ] Video plays when clicked
- [ ] All images load correctly
- [ ] Images are properly sized and responsive
- [ ] Alt text is descriptive
- [ ] Reading time is reasonable (3-5 minutes)
- [ ] Mobile view looks good (test with dev tools)

---

## Step 6: Troubleshooting

### Video Won't Play

**Check blob URL**:
```bash
# Test in browser directly
open http://localhost:3000/api/_hub/blob/serve/tribute/video.mp4
```

**Common issues**:
- Pathname typo (case-sensitive)
- Video not uploaded yet
- Incorrect format (must be MP4)
- File corrupted during upload

**Fix**: Re-upload video or correct pathname in markdown

---

### Images Not Loading

**Check blob URL**:
```bash
# Test each image
open http://localhost:3000/api/_hub/blob/serve/tribute/photo-1.jpg
```

**Common issues**:
- Wrong file extension (.jpg vs .jpeg vs .png)
- Pathname doesn't match upload
- Image too large (>10MB)

**Fix**: Verify pathnames with blob list, re-upload if needed

---

### Post Not Appearing in Blog Index

**Check file location**:
- Must be in `content/blog/` directory
- Must have `.md` extension
- Must have valid frontmatter

**Check frontmatter validation**:
- All required fields present
- Date is valid Date object format
- No YAML syntax errors

---

### Reading Time Seems Off

**Calculate manually**:
- Count words in content (~200 words/min)
- Add video duration (e.g., 2 min video)
- Round up to nearest minute

**Example**:
- 600 words = 3 minutes reading
- 2 minute video = 2 minutes watching
- Total: 5 minutes → Set `minRead: 5`

---

## Step 7: Content Quality Checklist

### Writing Quality

- [ ] Personal and heartfelt tone
- [ ] Specific examples and stories (not generic)
- [ ] Balanced professional and personal content
- [ ] Proper grammar and spelling
- [ ] Clear structure with headings
- [ ] Appropriate length (not too short/long)

### Technical Quality

- [ ] All links work (test video and image URLs)
- [ ] Alt text on all images (accessibility)
- [ ] Video has fallback text
- [ ] Responsive design (test on mobile)
- [ ] Image captions are descriptive
- [ ] Proper Tailwind classes applied

### SEO & Metadata

- [ ] Title is descriptive and personal
- [ ] Description summarizes the tribute
- [ ] Cover image is appropriate
- [ ] Date is correct
- [ ] Author information is accurate

---

## Step 8: Deploy

### Commit Changes

```bash
git add content/blog/012.colleague-tribute.md
git commit -m "feat(blog): add tribute post for departing colleague

- Created commemorative blog post with video and photos
- Embedded NuxtHub blob storage assets
- Shared memories and gratitude from Miller Development team"
```

### Push to Branch

```bash
git push origin 001-tribute-blog-post
```

### Create Pull Request

1. Go to GitHub repository
2. Create PR from `001-tribute-blog-post` to `main`
3. Add description explaining the tribute post
4. Request review (or self-merge if appropriate)

### Merge & Deploy

Once merged, Cloudflare Pages will automatically:
1. Build the site with new blog post
2. Prerender static pages
3. Deploy to production

**Live URL**: `https://www.seancramones.com/blog/012-colleague-tribute`

---

## Step 9: Share the Tribute

### Get Shareable Link

```
https://www.seancramones.com/blog/012-colleague-tribute
```

### Share With

- **Team**: Email or Slack message to Miller Development team
- **Colleague**: Personal message with link
- **Social Media**: LinkedIn post (if appropriate)
- **Company**: Internal company channels

### Verify Social Preview

Test Open Graph preview:
- Share on LinkedIn/Twitter/Facebook
- Check that cover image, title, and description appear correctly

---

## Tips for Great Tribute Content

### Do's ✅

- Be specific with examples and stories
- Use the colleague's actual name throughout
- Include both professional and personal aspects
- Share impact they had on team/projects
- Express genuine gratitude and well wishes
- Use photos that capture good memories
- Keep tone positive and celebratory

### Don'ts ❌

- Don't be too generic or templated
- Don't share inappropriate stories/photos
- Don't make it only about sadness of departure
- Don't forget to proofread
- Don't use low-quality or unflattering photos
- Don't exceed 1000-1200 words (keep it digestible)

---

## Estimated Timeline

| Task | Time | Notes |
|------|------|-------|
| Verify assets | 5 min | Check blobs uploaded |
| Create file & frontmatter | 5 min | Copy template |
| Write content | 20-30 min | Personal stories, memories |
| Add video/images | 5 min | Copy URLs |
| Test locally | 5 min | Verify all works |
| Final review | 5 min | Proofread, check links |
| Commit & deploy | 5 min | Git workflow |
| **Total** | **30-45 min** | Depends on content length |

---

## Success Criteria

You're done when:

✅ Blog post visible at `/blog` index  
✅ Post detail page loads without errors  
✅ Video plays with working controls  
✅ All images display correctly  
✅ Responsive on mobile devices  
✅ Social sharing shows proper preview  
✅ Content is proofread and heartfelt  
✅ Deployed to production  
✅ Shared with team and colleague

---

## Need Help?

**Technical Issues**:
- Check `research.md` for blob URL patterns
- Review `data-model.md` for schema requirements
- See `contracts/blob-urls.md` for detailed examples

**Content Help**:
- Review existing blog posts in `content/blog/` for style
- Keep it personal but professional
- Focus on impact and memories, not just facts

---

**Ready to create the tribute? Start with Step 1!** 🎉
