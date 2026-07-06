# Klarity360 Homepage

Next.js landing page for **Klarity360**, an AI Data Intelligence Agent by [Kanerika](https://kanerika.com). Klarity360 is a native Microsoft Fabric workload that lets business users ask data questions in plain English.

## Tech Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**
- **Framer Motion 11.15+** (scroll animations)
- **Tailwind CSS v4** (CSS-first, no config scanning)
- **PostCSS** with `@tailwindcss/postcss`

## Requirements

- Node.js 20 or newer
- npm

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build & Production

```bash
npm run build    # Build for production
npm start        # Run production server
npm run lint     # Run ESLint
```

## Docker

### Build and Run

```bash
docker-compose up -d
# or
docker compose up -d
```

This builds the image, maps port 3000:3000, and runs the container in detached mode.

### Stop Container

```bash
docker-compose down
# or
docker compose down
```

### Manual Docker Commands

```bash
# Build image
docker build -t klarity360-homepage:latest .

# Run container
docker run -d -p 3000:3000 --name klarity360-homepage-app --restart unless-stopped klarity360-homepage:latest

# Kill container (force stop)
docker kill klarity360-homepage-app

# Remove container
docker rm klarity360-homepage-app
```

## Project Structure

```
app/
  layout.tsx              → Root layout; Inter font, metadata
  page.tsx                → Home page; assembles components
  globals.css             → @import "tailwindcss"; core styles

components/
  Hero.tsx                → Fixed hero with Framer Motion scroll animations
  AnnounceBar.tsx         → Dismissible Fabric Marketplace banner
  IndustryStrip.tsx       → Bottom bar with industries + CTA

hooks/
  useScrollProgress.ts    → Custom scroll progress hook with easing

public/                   → Assets (video, logo, images, industries)
```

## Key Conventions

- **Tailwind v4:** Use `@import "tailwindcss"` in `globals.css` — never v3 directives. No autoprefixer.
- **PostCSS:** `postcss.config.mjs` with only `@tailwindcss/postcss` plugin.
- **Path alias:** `@/*` → project root (configured in `tsconfig.json`)
- **Client components:** Components with hooks/refs need `'use client'`

## Hero Scroll Behavior

Scroll zone: **0 → 280px**

| Effect | Start | End | Applied To |
|--------|-------|-----|------------|
| Video blur | 0px | 5px | Video background |
| Dark overlay opacity | 0 | 0.8 | Overlay div |
| Hero content opacity | 0 | 1 | Headline + subtitle + CTA |
| Hero content Y translate | 28px | 0px | Hero content |
| Scroll hint opacity | 1 | 0 | Fades out at 66% of scroll zone |

## Accessibility

- Semantic HTML with proper heading hierarchy
- `prefers-reduced-motion` respected globally
- Responsive: `md:` breakpoint for mobile-first design
- Video: `autoPlay muted loop playsinline` for mobile autoplay

## Known Gotchas

1. **Tailwind v4 PostCSS:** Use `postcss.config.mjs` (not `.js`); only `@tailwindcss/postcss` plugin; no autoprefixer.
2. **Next 15 + React 19:** Use `next@^15.1.0` with `react@^19.0.0`; never `--force` or `--legacy-peer-deps`.
3. **Framer Motion:** Must be `^11.15.0+` for React 19 compatibility.
4. **Globals CSS:** Use `@import "tailwindcss";` — never v3 directives (`@tailwind base/components/utilities`).

---

**Last updated:** 2026-06-24
