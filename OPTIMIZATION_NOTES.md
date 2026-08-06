# Malhar redesign optimization notes

## Changes included in this branch

- Route-level lazy loading for the home, admin, and secondary page bundles.
- Loading state and 404 fallback route.
- Skip-to-content accessibility link.
- Respect for `prefers-reduced-motion` before enabling Lenis smooth scrolling.
- Cleaned production HTML by removing Emergent development scripts and PostHog session recording.
- Improved canonical, Open Graph, Twitter, favicon, robots, and EducationalOrganization metadata.

## High-priority follow-up

1. Replace or compress `frontend/public/assets/121.jpg` (about 19.6 MB). Target under 300 KB, preferably WebP/AVIF.
2. Add `loading="lazy"`, explicit width/height, and meaningful alt text to below-the-fold images.
3. Remove unused shadcn/Radix components and dependencies after confirming imports. The current dependency set is much larger than the application needs.
4. Split `Home.jsx`, `Pages.jsx`, and `Admin.jsx` into focused components.
5. Confirm all statistics, leadership roles, institution details, phone numbers, spelling, and canonical production domain with Malhar before launch.
6. Run a local production build and Lighthouse audit before merging.

## Suggested verification

```bash
cd frontend
npm install
npm run build
```

Then test keyboard navigation, mobile menu, all routes, reduced-motion mode, forms, and image loading on a throttled mobile network.
