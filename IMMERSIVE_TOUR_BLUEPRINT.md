# Malhar Immersive Campus Tour — Build Blueprint

## Core direction
Build the home page as an immersive 2.5D campus journey rather than a conventional stack of sections. Preserve Malhar's real identity and existing content, while using AI-generated supporting environments only where the current asset library cannot provide a believable transition.

## Non-negotiables
- Desktop and mobile must deliver the same story and emotional impact, with layouts adapted to the device instead of copied 1:1.
- Every scene is built and verified independently before moving to the next scene.
- Main branch stays untouched until the immersive branch is approved.
- Readability wins over decorative effects.
- Real campus, institution, logo and leadership assets remain primary sources.
- AI images are supporting environments, not claims of exact real architecture.

## Existing real assets to keep
### Hero / campus
- `/assets/DSC_2363-1-1-1.jpg` — primary campus hero and starting frame.
- Gallery assets already present can be reused for scene cutaways and mobile fallbacks where composition works.

### Institutions
Use the existing real institution images and content:
1. Malhar College of Qur'an Studies — `/assets/hifz.png`
2. Malhar Model Academy — `/assets/web-p.png`
3. Malhar She Garden — `/assets/girls highschooll.jpg`
4. Malhar College of Sharee'a — `/assets/Untitled-1.png`
5. Malhar Institute of Islamic Da'awa — `/assets/web-hifl.png`
6. Malhar English Medium School — `/assets/english-school.png`
7. Malhar College of Commerce — `/assets/19-1.jpg`

### Leadership
Keep the real portraits:
- Founder — `/assets/Posoat-Thangal-360x370.jpg`
- Sayyid Abdu Rahman Shaheer Al Bukhari — `/assets/abdu rahman.webp`
- Sayyid Jalaluddeen Sa-adi Al Bukhari — `/assets/jalaludheensha.webp`
- Adv Hassan Kunhi B — `/assets/Hassan-Kunhi-360x370.jpg`

## AI image set
Generate only these supporting scenes initially.

### AI-01 — Entrance continuation
Purpose: bridge the real exterior hero into an interior journey.
Composition requirements:
- contemporary Kerala educational campus entrance / covered passage
- subtle Islamic architectural influence, not ornate fantasy
- deep central vanishing point for zoom transition
- warm late-afternoon natural light with Malhar green/gold tonal harmony
- clear center corridor and dark edge areas for text overlays
- no visible logos or invented institution names
- no people close to camera
- landscape master composition with center-safe crop for portrait/mobile

### AI-02 — Academic corridor / learning gallery
Purpose: host the seven-institution journey.
Composition requirements:
- long premium educational corridor merging classroom and gallery language
- seven visually distinct bays / doorways / wall zones that can receive real institution imagery and HTML overlays
- believable depth and strong perspective
- neutral architecture, subtle Kerala / Islamic cues
- central walking line, generous negative space around each bay
- warm natural light with soft green/gold accents
- no generated text, logos, faces or fake signage
- desktop landscape master, designed so 9:16 vertical crops still retain one to two bays cleanly

### AI-03 — Leadership office / chamber
Purpose: host the key personalities section.
Composition requirements:
- dignified educational trust office / leadership chamber
- elegant wood, stone/plaster, muted green, warm brass/gold detail
- clean wall zones suitable for real portrait overlays
- no generated portraits, names, certificates or logos
- believable Kerala institutional environment rather than luxury hotel styling
- perspective depth with a subtle doorway or transition toward the viewer
- center-safe composition for mobile

### AI-04 — Optional bridge from academics to administration
Only generate if CSS/DOM transition between AI-02 and AI-03 feels visually discontinuous.
- transitional corridor / stair / archway
- same visual language and lighting as AI-02 and AI-03
- no text, logos or people

## Scene architecture

### Scene 01 — Arrival
Real asset: `/assets/DSC_2363-1-1-1.jpg`
Desktop:
- full-viewport image
- restrained title and scroll cue
- slow scale from ~1.00 to ~1.12 while scrolling
- subtle foreground/background parallax using DOM layers, not full WebGL
Mobile:
- same story, crop chosen around the strongest campus focal point
- no oversized decorative text over important architecture
- title remains readable above browser chrome / safe areas
Exit condition:
- hero text fades before the image reaches its maximum scale

### Scene 02 — Crossing the threshold
Source: real hero + AI-01
Technique:
- pin the viewport for a short controlled scroll distance
- crossfade / masked zoom from campus exterior to entrance continuation
- use perspective scaling and blur only as transition tools
- avoid sudden scene cut
Mobile:
- shorter pinned distance
- lower blur and lower scale range for performance

### Scene 03 — The learning corridor
Source: AI-02 + seven real institution assets
Desktop:
- camera-like forward progression driven by vertical scroll
- institutions appear as real-image panels embedded into corridor bays
- each institution receives index, name, one-line description and optional explore action
- no long paragraph while motion is active
Mobile:
- retain corridor atmosphere as fixed/sticky visual background or crop
- reveal one institution at a time in a readable foreground card
- horizontal swipe may supplement, but vertical page scroll remains primary
- no tiny carousel dots as the only control

### Scene 04 — Return to the passage
Purpose: release the user from the learning corridor and prepare the leadership space.
Technique:
- corridor recedes / darkens
- short architectural transition
- generate AI-04 only if needed after implementation review

### Scene 05 — Leadership chamber
Source: AI-03 + real personality portraits
Desktop:
- office/chamber background remains spatial anchor
- real portraits reveal in 2–4 deliberate positions rather than a generic grid
- active profile gets strongest light / focus
Mobile:
- one leadership profile at a time or stacked readable cards
- real portrait large enough to identify clearly
- office atmosphere remains visible but never competes with names/roles

### Scene 06 — Impact
No AI image required initially.
Purpose: pause the cinematic motion and make impact information easy to read.
- high-contrast typography
- approved statistics only
- simple count/reveal animation
- no moving background behind body text

### Scene 07 — Exit / connect
Use a real campus/gallery asset if a suitable closing shot exists; otherwise a quiet graphic background is enough.
- admissions
- contact
- visit/support CTA
- visual feeling of completing the campus journey

## Interaction technology
Primary:
- GSAP + ScrollTrigger for pinned scenes, scrubbing and timeline control
- CSS transforms, masks and gradients for depth
Secondary:
- Framer Motion only for small UI reveals / route-level micro-interactions if already useful
Avoid initially:
- full Three.js campus reconstruction
- continuous heavy WebGL
- cursor effects on mobile
- parallax that blocks native scrolling

## Responsive verification matrix
Every completed scene must be checked at minimum at:
- 1440×900 desktop
- 1280×720 desktop/laptop
- 1024×768 tablet landscape
- 768×1024 tablet portrait
- 430×932 large iPhone class
- 390×844 standard iPhone class
- 360×800 compact Android class

For each size verify:
1. no clipped title or body copy
2. no horizontal overflow
3. no sticky/pinned scene trapping the user
4. image focal point remains meaningful
5. tap targets at least comfortably thumb-sized
6. transitions do not obscure important content
7. scroll remains responsive on touch devices
8. reduced-motion path still exposes all content

## Build order
1. Lock AI-01, AI-02 and AI-03 visual direction.
2. Build Scene 01 only and verify all target sizes.
3. Build Scene 02 and verify transition on desktop/mobile.
4. Build Scene 03 institutions journey and verify all seven institutions.
5. Build Scenes 04–05 leadership flow.
6. Build impact and exit sections.
7. Run final readability, performance and accessibility pass.
8. Create Vercel preview from `immersive-campus-tour-v1` only.
9. Merge to `main` only after explicit approval.
