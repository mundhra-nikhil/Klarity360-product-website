# Klarity360 Landing Page — Context & Conventions

**Purpose:** Marketing landing page for Klarity360, an AI Data Intelligence Agent by Kanerika Inc.—a native Microsoft Fabric workload that lets business users ask data questions in plain English.

---

## Tech Stack (Exact Versions)

```
next:                  ^16.2.9
react:                 ^19.2.7
react-dom:             ^19.2.7
gsap:                  ^3.15.0
tailwindcss:           ^4.3.1
@tailwindcss/postcss:  ^4.3.1
typescript:            ^6.0.3
postcss:               ^8.5.15
next-themes:           ^0.4.6
```

- **App Router** with TypeScript
- **GSAP** for animations (replaced Framer Motion)
- **Next Themes** for dark/light mode toggling

---

## Critical Conventions

### Tailwind v4 & CSS

- **Tailwind Config:** Theme tokens and `darkMode: "class"` are configured in `tailwind.config.ts`. Custom colors (like `docs-bg`, `docs-sidebar`, `docs-card`) are located here.
- **CSS Architecture:** `app/globals.css` imports `@tailwindcss/postcss` and multiple modular CSS files from `app/styles/` (e.g., `base.css`, `hero.css`, `sections.css`, `footer.css`, `docs.css`).
- Content scanning is explicitly defined in `tailwind.config.ts` to include `app`, `components`, and `lib`.
- **PostCSS:** Configured in `postcss.config.mjs` using `@tailwindcss/postcss`.

### Path Alias: `@/*` → Project Root

Configured in `tsconfig.json`:
```json
"paths": {
  "@/*": ["./*"]
}
```

### Next 16 + React 19

- Use `next@^16.2.9` with `react@^19.2.7`. Ensure any newly added packages are compatible with React 19.

---

## File Structure & Purpose

```
app/
  [slug]/                 → Dynamic routes
  docs/                   → Documentation pages and layout
  styles/                 → Modular CSS files (base, hero, sections, etc.)
  globals.css             → Core styles; imports modular CSS
  layout.tsx              → Root layout
  page.tsx                → Home page

components/
  docs/                   → Documentation-related UI components
  sections/               → Page sections (Hero, etc.)
  ui/                     → Reusable primitive components

lib/
  data/                   → Static data configurations

public/
  full-bg-video.mp4       → Background video for Hero section
  klarity360-demo.mp4           → Product demo video
  homepage-product-tour.json → Product tour configuration/Lottie
  images/                 → Image assets
  industries/             → Industry-specific assets
  Klarity360 logo.svg           → Primary branding

test/                     → Mocha tests
```

---

## Commands

```bash
npm install              # Install dependencies
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm start                # Run production server
npm run lint             # Run ESLint
npm run test             # Run Mocha tests via tsx
```

---

## Known Gotchas

1. **Tailwind v4 PostCSS Setup**
   - Single `postcss.config.mjs` with only `["@tailwindcss/postcss"]` is the required setup.
   - Using `tailwindcss` directly instead of `@tailwindcss/postcss` will cause plugin not found errors.

2. **Animations & Interactions**
   - The project uses GSAP (`^3.15.0`) instead of Framer Motion. Ensure new animations leverage GSAP correctly within React `useEffect` or `useLayoutEffect` hooks.

3. **Styling Specifics**
   - Instead of monolithic utility classes, some sections rely on custom CSS loaded through `app/styles/*.css`. Be mindful of global style leakage and use these files appropriately.

---

**Last updated:** 2026-06-24 | Verified against actual codebase
