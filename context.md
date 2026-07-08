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

### Tailwind v4 & CSS & Theme Architecture

- **Theme & Variables (`app/styles/theme.css`):** Defines the core design system's CSS custom properties. It maps core colors (e.g., `--navy` as `#0B1628`, `--blue` as `#0F62FE`, `--cyan` as `#33B1FF`, `--white` as `#F4F4F4`), layout dimensions, spacing, border radii, shadows, and transitions. It also registers Material Design design tokens (`--mat-sys-*`) dynamically using the native CSS `light-dark()` function.
- **Theme Mappings (`app/styles/base.css`):** Maps logical CSS variables (e.g., `--bg`, `--bg-alt`, `--accent`, and `--docs-*` variables) to theme tokens. In the default light theme, these map to a warm stone scale. Under the `.dark` class, these are overridden to use the navy/blue system. These variables are registered inside the Tailwind CSS v4 `@theme` directive (e.g., `--color-bg: var(--bg)`), exposing them as utility classes.
- **Tailwind Config (`tailwind.config.ts`):** Handles content scanning patterns (`app`, `components`, `lib`) and holds legacy Tailwind configurations. `darkMode: "class"` is configured here to enable class-based dark mode toggling.
- **CSS Architecture (`app/globals.css`):** Imports `@tailwindcss/postcss` and links modular stylesheets sequentially: `theme.css` → `base.css` → `hero.css` → `sections.css` → `footer.css` → `docs.css`.
- **PostCSS:** Uses `@tailwindcss/postcss` in `postcss.config.mjs`.
- **Landing Page vs. Docs Theme Behavior:**
  - **Landing Page (`app/page.tsx`):** Employs a persistent dark aesthetic built around the dark navy theme (`var(--navy)`). The body background is hardcoded to `var(--navy)` in `base.css`.
  - **Documentation Page (`app/docs/`):** Supports dynamic light/dark mode toggling. Uses `next-themes` and a theme toggler (`.theme-toggle-btn` class) in the docs page header to toggle the `.dark` class on the `<html>` or `<body>` element. This dynamically rebinds the CSS variables mapped in `base.css` (e.g., switching the page background `bg-docs-bg-page` from the light warm stone to dark navy).

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

**Last updated:** 2026-07-08 | Verified against actual codebase
