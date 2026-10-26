# مدارس النيل الخاصة للغات — School Website

An Arabic-first (RTL), one-page marketing website for **مدارس النيل الخاصة للغات / Nile Private Language Schools** — a single-page React site with an animated 3D hero, scroll-driven sections, and a self-hosted Arabic typeface.

## Features

- Fully RTL Arabic layout with bilingual (Arabic/English) accents
- Animated 3D hero scene built with three.js, lazy-loaded in its own chunk
- Graceful degradation: pure-CSS fallbacks when WebGL is unavailable
- Smooth scrolling (Lenis) and scroll-triggered reveals (GSAP + ScrollTrigger)
- Interactive admissions form and swiper-based stages carousel
- Respect for `prefers-reduced-motion`: smooth scroll, reveals, and 3D motion are disabled
- Self-hosted variable Cairo font via `@fontsource-variable/cairo`

## Tech Stack

| Layer | Tools |
| --- | --- |
| Build | Vite 6, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`) |
| UI | React 19, lucide-react (icons), Swiper (carousel) |
| Animation | GSAP + ScrollTrigger + `@gsap/react`, Lenis (smooth scroll), Motion (`motion/react`) |
| 3D | three + @react-three/fiber + @react-three/drei |
| Font | @fontsource-variable/cairo (self-hosted) |
| Linting | oxlint |

## Getting Started

```bash
npm install     # install dependencies
npm run dev     # start the dev server (http://localhost:5173)
npm run build   # type-check (tsc -b) then production build
npm run preview # serve the production build locally
npm run lint    # lint with oxlint
```

## Project Structure

```
index.html                  # RTL shell: lang="ar", meta/OG tags, favicon
public/images/              # logo.jpg, building.png (and favicon reference)
src/
  main.tsx                  # entry point
  App.tsx                   # page layout: header, Hero, sections, Footer
  index.css                 # Tailwind + global styles / reduced-motion rules
  data/school.ts            # single source of truth for ALL site content
  components/
    SiteHeader.tsx          # sticky navigation
    Hero.tsx                # hero + lazy-loaded 3D scene / fallback
    SmoothScroll.tsx        # Lenis wrapper
    hero/                   # HeroScene (R3F), webgl support, scroll progress, fallback
    about/                  # learning vignette 3D scene + slot/fallback
    sections/               # About, Stages, Features, Admission, Contact sections
    kit/                    # cartoon 3D "kid" characters used in scenes
  hooks/                    # e.g. usePrefersReducedMotion
  lib/                      # gsap setup
```

## Content & Data

**All site content lives in `src/data/school.ts`** — school name, tagline, address, phone numbers, department lines (WhatsApp/tel links), Facebook / Google Form / Maps links, and every section's Arabic and English copy. Edit copy there rather than inside components.

- Phone numbers, Facebook/Google Form/Maps links, and the address come from the school's public profile.
- **DRAFT markers**: descriptive copy (tagline, About, stages, features, admissions, contact, footer text) is marked `// DRAFT` in `school.ts` and **requires client approval before launch**. Do not treat it as final.
- No statistics or testimonials were invented.

## Performance & Accessibility

- **Lazy 3D**: the three.js runtime is split into its own manual chunk (see `vite.config.ts`) and only fetched once a scene mounts; vendor code (gsap, lenis, swiper, motion, react) is chunked separately so the entry stays cacheable.
- **WebGL fallbacks**: `src/components/hero/webglSupport.ts` detects WebGL *before* requesting the heavy scene chunk; unsupported browsers get pure-CSS stand-ins (`SceneFallback` and section placeholders), wrapped in error boundaries.
- **Reduced motion**: `usePrefersReducedMotion` and CSS `@media (prefers-reduced-motion: reduce)` rules disable smooth scrolling, scroll reveals, and 3D animation.
- RTL-first markup with Arabic `alt` texts and OG/Twitter meta tags configured in `index.html`.

## Environment Notes

Developed on **Node v22.11.0**. `vite` is pinned to `^6.4.1` and `oxlint` to `^1.16.0` because newer major releases of both require **Node >= 22.12**. If you upgrade the environment to Node >= 22.12 (or Node 24 LTS), you can safely bump both packages to their latest majors.

---

*License & credits: TBD.* <!-- placeholder — no LICENSE file in the repo; remove or fill in once decided. -->
