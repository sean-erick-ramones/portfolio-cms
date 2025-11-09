---
description: "Task list for Tribute Blog Post for Asa Bain"
---

# Tasks: Tribute Blog Post for Asa Bain

**Input**: Design documents from `/specs/001-tribute-blog-post/`  
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: No tests - This is a content creation feature with no new code

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Content**: `content/blog/` at repository root
- **Public assets** (if needed): `public/blog/012-asa-bain-tribute/`
- This is a content-first feature - single file implementation

---

## Phase 1: Setup & Verification

**Purpose**: Verify environment and blob assets before content creation

- [ ] T001 Verify development environment is running with `pnpm dev`
- [ ] T002 Verify blob assets exist in NuxtHub R2 storage at `tribute/` prefix
- [ ] T003 Get blob URLs for video and images from NuxtHub blob storage
- [ ] T004 Verify video URL is accessible: `/api/_hub/blob/serve/tribute/video.mp4`
- [ ] T005 [P] Verify image URLs are accessible: `/api/_hub/blob/serve/tribute/photo-{1-5}.jpg`
- [ ] T006 [P] Verify cover photo URL is accessible: `/api/_hub/blob/serve/tribute/cover-photo.jpg`

**Checkpoint**: All blob assets verified and URLs documented

---

## Phase 2: User Story 1 - View Tribute Blog Post (Priority: P1) 🎯 MVP

**Goal**: Create a viewable blog post with Asa Bain's tribute content, embedded video, and photo gallery

**Independent Test**: Navigate to `http://localhost:3000/blog`, find the Asa Bain tribute post, click it, verify content displays with playable video

### Implementation for User Story 1

- [ ] T007 [US1] Create blog post file at `content/blog/012.asa-bain-tribute.md`
- [ ] T008 [US1] Add frontmatter with title, description, date, cover image URL, minRead, and author in `content/blog/012.asa-bain-tribute.md`
- [ ] T009 [US1] Write introduction section about Asa Bain's departure announcement in `content/blog/012.asa-bain-tribute.md`
- [ ] T010 [US1] Write "A Tech Lead Who Made a Difference" section with contributions and achievements in `content/blog/012.asa-bain-tribute.md`
- [ ] T011 [US1] Write "More Than a Colleague, A Friend" section with personal stories in `content/blog/012.asa-bain-tribute.md`
- [ ] T012 [US1] Add video embed section with HTML5 video player and blob URL in `content/blog/012.asa-bain-tribute.md`
- [ ] T013 [US1] Add video fallback message with download link for unsupported browsers in `content/blog/012.asa-bain-tribute.md`
- [ ] T014 [US1] Add photo gallery grid with 3-5 images using blob URLs in `content/blog/012.asa-bain-tribute.md`
- [ ] T015 [US1] Add image captions and alt text for accessibility in `content/blog/012.asa-bain-tribute.md`
- [ ] T016 [US1] Write "Heading Home to the Bahamas" section about move and future plans in `content/blog/012.asa-bain-tribute.md`
- [ ] T017 [US1] Write "Our Gratitude" section expressing team appreciation in `content/blog/012.asa-bain-tribute.md`
- [ ] T018 [US1] Add "What We'll Miss Most" bulleted list in `content/blog/012.asa-bain-tribute.md`
- [ ] T019 [US1] Write "Farewell, Friend" closing section with well wishes in `content/blog/012.asa-bain-tribute.md`
- [ ] T020 [US1] Calculate and update minRead value based on final word count in `content/blog/012.asa-bain-tribute.md`
- [ ] T021 [US1] Test: Navigate to `http://localhost:3000/blog` and verify post appears in list
- [ ] T022 [US1] Test: Click post and verify it loads at `http://localhost:3000/blog/012-asa-bain-tribute`
- [ ] T023 [US1] Test: Verify video player displays with controls
- [ ] T024 [US1] Test: Click play and verify video plays without errors
- [ ] T025 [US1] Test: Verify all images load correctly in gallery
- [ ] T026 [US1] Test: Verify responsive layout on mobile viewport (Chrome DevTools)
- [ ] T027 [US1] Test: Verify responsive layout on tablet viewport (Chrome DevTools)
- [ ] T028 [US1] Test: Verify responsive layout on desktop viewport

**Checkpoint**: User Story 1 complete - Blog post is viewable with working video and images

---

## Phase 3: User Story 2 - Share Tribute Post (Priority: P2)

**Goal**: Ensure blog post is shareable with proper social media metadata

**Independent Test**: Share post URL on social media platform, verify preview shows correct title, description, and cover image

### Implementation for User Story 2

- [ ] T029 [US2] Verify Open Graph metadata in frontmatter includes title, description, and image in `content/blog/012.asa-bain-tribute.md`
- [ ] T030 [US2] Test: Copy post URL `http://localhost:3000/blog/012-asa-bain-tribute`
- [ ] T031 [US2] Test: Paste URL into social media preview tester (e.g., Facebook Sharing Debugger)
- [ ] T032 [US2] Test: Verify preview shows correct title "A Tribute to Asa Bain: Thank You for Everything"
- [ ] T033 [US2] Test: Verify preview shows correct description
- [ ] T034 [US2] Test: Verify preview shows cover photo from blob storage
- [ ] T035 [US2] Test: Verify URL works when shared (loads post correctly)

**Checkpoint**: User Story 2 complete - Post is shareable with proper metadata on social platforms

---

## Phase 4: User Story 3 - Browse Related Content (Priority: P3)

**Goal**: Verify related content navigation works (already exists in blog template)

**Independent Test**: Scroll to bottom of post, verify "Related Posts" or navigation back to blog index exists

### Implementation for User Story 3

- [ ] T036 [US3] Test: Navigate to post `http://localhost:3000/blog/012-asa-bain-tribute`
- [ ] T037 [US3] Test: Scroll to bottom of post
- [ ] T038 [US3] Test: Verify "Back to Blog" link or related posts section exists
- [ ] T039 [US3] Test: Click related post or back link and verify navigation works

**Checkpoint**: User Story 3 complete - Related content navigation verified

---

## Phase 5: Polish & Quality Assurance

**Purpose**: Final review and deployment preparation

- [ ] T040 [P] Proofread entire blog post for grammar and spelling errors
- [ ] T041 [P] Verify all personal stories and memories are accurate
- [ ] T042 [P] Verify Asa Bain's name is spelled correctly throughout
- [ ] T043 [P] Verify dates (October 24 departure) are accurate
- [ ] T044 [P] Verify all links (video, images) work correctly
- [ ] T045 Test: Clear browser cache and reload post to verify fresh load performance
- [ ] T046 Test: Test video playback on different browsers (Chrome, Firefox, Safari)
- [ ] T047 Test: Verify page load time is under 5 seconds
- [ ] T048 Test: Verify total page size is under 5MB
- [ ] T049 Commit changes with message: "feat(blog): add tribute post for Asa Bain"
- [ ] T050 Push to branch `001-tribute-blog-post`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **User Story 1 (Phase 2)**: Depends on Setup completion (blob URLs verified)
- **User Story 2 (Phase 3)**: Depends on User Story 1 (post must exist)
- **User Story 3 (Phase 4)**: Depends on User Story 1 (post must exist)
- **Polish (Phase 5)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Independent - Can start after Setup
- **User Story 2 (P2)**: Depends on US1 (needs post to share)
- **User Story 3 (P3)**: Depends on US1 (needs post to navigate from)

### Within Each User Story

**User Story 1 (Content Creation)**:
- T007 (create file) must be first
- T008 (frontmatter) must be second
- T009-T019 (content sections) can be written in any order
- T020 (calculate minRead) must be after content is complete
- T021-T028 (tests) must be after all content is written

**User Story 2 (Social Sharing)**:
- T029 (verify metadata) can be done anytime after T008
- T030-T035 (share tests) sequential

**User Story 3 (Related Content)**:
- T036-T039 (navigation tests) sequential

### Parallel Opportunities

- **Within Setup Phase**:
  - T001-T002 sequential (need dev server first)
  - T004-T006 can all run in parallel (checking different blob URLs)

- **Within User Story 1**:
  - T009-T019 can be written in any order (different content sections)
  - T021-T028 tests can run sequentially but quickly

- **Within Polish Phase**:
  - T040-T044 can all run in parallel (different quality checks)
  - T046-T048 tests can run in parallel

---

## Parallel Example: User Story 1 Content Writing

```bash
# Content sections can be drafted in parallel or any order:
Task: "Write introduction section about Asa Bain's departure" (T009)
Task: "Write Tech Lead contributions section" (T010)
Task: "Write personal stories section" (T011)
Task: "Write Bahamas move section" (T016)
Task: "Write gratitude section" (T017)

# Then add multimedia:
Task: "Add video embed with fallback" (T012-T013)
Task: "Add photo gallery with captions" (T014-T015)

# Finally:
Task: "Calculate minRead based on word count" (T020)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup & Verification (T001-T006)
2. Complete Phase 2: User Story 1 (T007-T028)
3. **STOP and VALIDATE**: Test post independently
4. Deploy/share if ready (or continue to US2/US3)

**This delivers a complete, publishable tribute post**

### Incremental Delivery

1. **Setup** → Blob URLs verified
2. **User Story 1** → Post viewable with video and images (MVP!)
3. **User Story 2** → Post shareable on social media
4. **User Story 3** → Related content navigation verified
5. **Polish** → Final quality checks and deployment

Each story adds value without breaking previous work

---

## Notes

- **[P] tasks** = Can run in parallel (different content sections)
- **[Story] label** = Maps task to specific user story for traceability
- **No tests requested** = Focus on content creation and manual verification
- **Content-first approach** = All work is in one markdown file
- **Commit after completing each user story** for incremental progress
- **Estimated total time**: 30-45 minutes (mostly writing content)

### Important Reminders

- Use Asa Bain's name consistently throughout (from clarifications)
- Include video fallback message with download link (from clarifications)
- Follow existing blog post numbering: 012
- URL slug: `asa-bain-tribute`
- Cover photo and all assets use blob URLs: `/api/_hub/blob/serve/tribute/...`
- No code changes needed - pure content creation
- Blog infrastructure already handles all display/routing logic
