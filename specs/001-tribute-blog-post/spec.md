# Feature Specification: Tribute Blog Post for Asa Bain

**Feature Branch**: `001-tribute-blog-post`  
**Created**: 2025-11-07  
**Status**: Draft  
**Input**: User description: "I want to add a blog item that commemorates my former colleague and tech lead, who is also a dear friend to me and all my pals in Miller Development. He just resigned last October 24, and I want to dedicate a blog post of him. We are a software development company in the Philippines, but he is leaving to the Bahamas, where his hometown is. I have uploaded a short video in R2, which can be accessed via nuxthub's blob storage."

## Clarifications

### Session 2025-11-08

- Q: Colleague's Name → A: Asa Bain
- Q: Video Failure Handling Strategy → A: Show fallback message with download link

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Tribute Blog Post (Priority: P1)

Website visitors can read a commemorative blog post about Asa Bain, learning about his contributions to Miller Development and watching an embedded tribute video.

**Why this priority**: This is the core feature that delivers the primary value - sharing the tribute with readers. Without this, the feature has no purpose.

**Independent Test**: Navigate to the blog list page, find the tribute post, click to view it, and verify the post content displays with the embedded video playable.

**Acceptance Scenarios**:

1. **Given** a visitor is on the blog index page, **When** they view the list of blog posts, **Then** they see the tribute post with an appropriate title and preview
2. **Given** a visitor clicks on the tribute blog post, **When** the post page loads, **Then** they see the full tribute content with proper formatting
3. **Given** a visitor is reading the tribute post, **When** they scroll to the video section, **Then** they see an embedded video player with the tribute video from NuxtHub blob storage
4. **Given** a visitor clicks play on the video, **When** the video loads, **Then** it plays smoothly without errors

---

### User Story 2 - Share Tribute Post (Priority: P2)

Readers can share the tribute post on social media or via direct link to spread the appreciation for Asa Bain.

**Why this priority**: Extends the reach of the tribute beyond direct website visitors, allowing the team and others to share the appreciation, but the post must exist first (depends on P1).

**Independent Test**: Open the tribute post, use share functionality, and verify the shared link displays proper metadata (title, description, image) on social platforms.

**Acceptance Scenarios**:

1. **Given** a visitor is viewing the tribute post, **When** they copy the URL to share, **Then** the link works correctly and loads the post
2. **Given** the post URL is shared on social media, **When** the platform processes the link, **Then** it displays an appropriate preview with Open Graph metadata (title, description, image)

---

### User Story 3 - Browse Related Content (Priority: P3)

After reading the tribute, visitors can discover other blog posts or company-related content to learn more about the team and culture.

**Why this priority**: Enhances engagement but is not essential to the tribute's core purpose. The tribute stands alone without this functionality.

**Independent Test**: View the tribute post, scroll to the bottom, and verify related posts or navigation options are available and functional.

**Acceptance Scenarios**:

1. **Given** a visitor finishes reading the tribute post, **When** they reach the end of the content, **Then** they see suggestions for other blog posts or a link back to the blog index
2. **Given** a visitor clicks on a related post link, **When** the navigation occurs, **Then** they are taken to the appropriate blog post

---

### Edge Cases

- What happens when the video fails to load from NuxtHub blob storage? → Display fallback message with download link to video file
- How does the post display on mobile devices with limited bandwidth?
- What happens if the visitor's browser doesn't support the video format? → HTML5 video fallback text provides download link
- How does the page handle if the tribute post is accessed before it's officially published?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a new blog post with tribute content about Asa Bain
- **FR-002**: Blog post MUST include a video player that loads and plays the tribute video from NuxtHub blob storage (R2)
- **FR-003**: Blog post MUST follow the existing blog post structure with frontmatter (title, description, date, author, image, minRead)
- **FR-004**: Blog post MUST be accessible via the blog index page at `/blog`
- **FR-005**: Blog post MUST have a unique URL path following the existing pattern (e.g., `/blog/012-asa-bain-tribute`)
- **FR-006**: Blog post MUST display metadata for social sharing (Open Graph tags) including appropriate title, description, and preview image
- **FR-007**: Video player MUST provide standard playback controls (play, pause, volume, fullscreen)
- **FR-008**: Video player MUST include fallback message with download link if video fails to load or browser doesn't support video format
- **FR-009**: Blog post MUST be responsive and display correctly on mobile, tablet, and desktop devices
- **FR-010**: Blog post date MUST reflect when the post is published (estimated November 2025)
- **FR-011**: Blog post MUST include information about: Asa Bain's role (Tech Lead), company (Miller Development), departure date (October 24), and destination (Bahamas)

### Key Entities

- **Blog Post**: A commemorative article with structured metadata (title, description, date, author, featured image, reading time) and markdown content
- **Video Asset**: A tribute video file stored in NuxtHub blob storage (R2), referenced by the blog post and embedded via a video player
- **Author**: The blog post creator (Sean Erick C. Ramones) with associated profile information

### Assumptions

- The video has already been uploaded to R2 and a blob storage URL is available
- The blog post will use the same author profile as existing posts (Sean Erick C. Ramones)
- The tribute video is in a web-compatible format (e.g., MP4)
- The blog post will follow the existing numbering convention (next available number: 012)
- Reading time will be estimated based on content length (standard ~200 words per minute)
- A featured image for the blog post preview will be selected or created
- Asa Bain's name and photo will be included in the tribute content

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Tribute blog post is viewable on the live website within the blog section within 1 click from the blog index
- **SC-002**: Video loads and plays successfully for 95% of visitors (assuming standard web browser support)
- **SC-003**: Blog post displays correctly across all device sizes (mobile, tablet, desktop) without layout issues
- **SC-004**: Post is shareable via direct URL with proper social media preview metadata displaying on at least 3 major platforms (Facebook, Twitter/X, LinkedIn)
- **SC-005**: Readers can complete reading the post and watching the video within 5 minutes or less
- **SC-006**: Blog post appears in the blog index alongside other posts in chronological order
