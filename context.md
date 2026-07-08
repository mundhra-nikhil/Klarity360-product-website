# Klarity360 — Context for LLMs

**Klarity360** = AI Data Intelligence Agent by Kanerika. A native Microsoft Fabric workload where business users ask data questions in plain English. This repo is its **marketing landing page** (not the product backend).

## Stack
- **Next.js ^16.2.9** (App Router) + **React ^19.2.7** + **TypeScript ^6.0.3**
- **Tailwind v4 ^4.3.1** (CSS-first, via `@tailwindcss/postcss`) — NOT Tailwind v3
- **GSAP ^3.15.0** for animation — NOT Framer Motion (README mentions it, but code uses GSAP)
- **next-themes ^0.4.6** (dark/light toggle), **next-mdx-remote** (docs)

## Layout
```
app/         layout.tsx, page.tsx, globals.css, [slug]/, docs/, styles/*.css
components/  sections/  ui/  docs/
lib/         constants.ts, data/  (static JSON/MD content: pricing, guides, industries)
public/      logo, images/, industries/, *.mp4 (hero + demo video, demo is Git-LFS)
test/        Mocha
```
- Path alias: `@/*` → project root (`tsconfig.json`)
- `globals.css` imports modular CSS from `app/styles/` (base, hero, sections, footer, docs). Theme tokens + `darkMode:"class"` live in `tailwind.config.ts`.

## Commands
```
npm install | npm run dev  (http://localhost:3000) | npm run build | npm start | npm run lint | npm test
```

## Critical gotchas
1. **PostCSS:** `postcss.config.mjs` must contain ONLY `@tailwindcss/postcss`. Using `tailwindcss` directly → plugin-not-found error. No autoprefixer.
2. **CSS:** use `@import "tailwindcss";` — never v3 `@tailwind base/components/utilities`.
3. **Animation:** use GSAP inside `useEffect`/`useLayoutEffect`; client components need `'use client'`.
4. **README is outdated** (says Next 15 + Framer Motion). Trust this file + `package.json`.

*Last verified: 2026-07-07*