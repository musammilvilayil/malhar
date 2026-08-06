# Malhar Nooril Islami Tha'eleemi — PRD

## Original Problem Statement
Premium, award-worthy website for Malhar, an Islamic educational trust founded 2000 in Kasaragod, Kerala. Emerald/gold/cream/charcoal palette; Newsreader/Work Sans/Amiri fonts; Lenis + GSAP ScrollTrigger + Framer Motion motion; editorial, high-end-university feel. Full-stack with a simple admin panel to manage News/Events/Gallery; demo contact form; placeholder donate page.

## Stack (adapted to platform)
React (CRA) + Tailwind + shadcn base + Lenis + GSAP + Framer Motion frontend; FastAPI + MongoDB backend; JWT admin auth. (Next.js requested but platform runs React/FastAPI/Mongo — same experience delivered.)

## User Personas
- Prospective students/parents exploring institutions & admissions
- Community members reading news/events, donating
- Trust admin managing content via /admin

## Core Requirements (static)
- Homepage with all specified sections + premium scroll motion
- 9 scaffold routes; institution & instructor data from API
- Admin CMS for News/Events/Gallery; demo contact form; donate placeholder
- SEO meta + OpenGraph + EducationalOrganization structured data; WCAG AA

## Implemented (2026-08-06)
- Backend: JWT auth (seeded admin), institutions/instructors seed, content CRUD (news/events/gallery), contact submit. 16/16 backend tests pass.
- Frontend: Kinetic hero (masked reveal + parallax), marquee, animated stat counters, numbered manifesto/about with sticky founder portrait, 7-institution bento grid, campus YouTube modal, personalities grid, news/events (with empty states), facilities, gallery masonry, parallax admission banner, glassmorphism nav w/ dropdown + mobile menu, footer.
- All 9 routes + /admin panel (login, tabbed CRUD). 100% frontend tests pass.

## Iteration 2 (2026-08-06)
- Drag-and-drop image uploads in Admin (Emergent managed object storage): POST /api/admin/upload (JWT, image-only, 10MB) + public GET /api/files/{id}. Uploaded gallery images auto-appear on public /gallery and homepage strip (prepended before stock). 20/20 backend tests pass, 100% frontend.
- Responsive layout pass: fluid containers `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`; responsive grids (Institutions 1→2→3, Personalities 2→3→4, Stats 2→4). No horizontal overflow at 375/768/1440.
- Standalone migration tool: /app/scripts/scrape_site.py (+ README) — crawls a site, extracts text/metadata/contact info + image URLs to structured JSON, optional image download, robots.txt-aware.

## Iteration 3 (2026-08-06)
- Real campus tour video wired in Home Campus Life (YouTube id GAIJpIRvuPg, thumbnail preview + click-to-play iframe).
- Admin Gallery Manager: dedicated grid to drag-reorder (PUT /admin/gallery/reorder), edit captions inline (PUT), and delete photos with object-storage cleanup (soft-deletes db.files so /api/files/{id} 404s). Public gallery sorted by order; captions shown on hover.
- Bulk multi-image upload (MultiUpload dropzone → per-file /admin/upload → POST /admin/gallery/bulk with incremented order). 24/24 backend tests pass, 100% frontend.
- Pending: migration run awaits the client's existing website URL (scraper ready).

## Iteration 4 (2026-08-06) — Real content migration + faculty + video card
- Ran scraper on https://malharonline.com (24 pages, 120 images → /app/scripts/data/site_content.json). Integrated REAL data: institution descriptions (7), 4 real Key Personalities with real photos + founder's real bio, real facilities/about copy. Deliberately EXCLUDED casino/spam content injected into the live site.
- Faculty Manager: admin 'Faculty' tab (add/edit/delete personalities: name, role, photo upload, bio) via new /admin/instructors CRUD (JWT). Reflects on homepage Key Personalities + /instructor/{slug}.
- Homepage video card: poster title 'Inside Malhar' + 'Campus Film'/'Full Tour' badges over the real YouTube tour (GAIJpIRvuPg).
- Gallery hover captions on homepage strip + gallery page. Empty-image guards added for personalities. 29/29 backend tests pass, 100% frontend.

## Backlog / Remaining
- P1: Real admission form + prospectus; real donate payment flow (Stripe/Razorpay)
- P1: Email delivery for contact form (currently demo-only, stored in DB)
- P2: Image upload in admin (currently image URL field); gallery/instructor management from admin
- P2: Ventures page real content; per-institution detail pages
- P2: Migrate FastAPI startup events to lifespan; content pagination

## Notes
- Admin: admin@malhar.edu / Malhar@2000 (from backend/.env, idempotent seed)
- Contact form is DEMO-ONLY (persists to Mongo, no email). Donate is a placeholder page.
- Placeholder copy is marked with a gold "Placeholder" badge; instructor bios/names beyond founder are placeholders pending real content.
