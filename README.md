# ⚡ Pragadeesh — Software Engineer Portfolio

> Monochrome portfolio with constellation backgrounds, plexus borders, dark/light theme, parallax scrolling, and smooth animations.

[![Live Site](https://img.shields.io/badge/🚀_Live-pragadeesh.pages.dev-000?style=for-the-badge)](https://pragadeesh.pages.dev)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Deployed-Cloudflare_Pages-F38020?logo=cloudflarepages&logoColor=white)

---

## ✨ Features

- **Dark / Light theme** — toggle with system preference detection & localStorage persistence
- **Constellation canvas** — interactive particles with mouse/touch attraction & constellation lines
- **Gradient blobs** — floating orbs creating ambient depth per theme (pure CSS animations)
- **Plexus border system** — corner brackets + node dots on all cards (CSS-only)
- **Parallax scroll** — sections reveal with Y-offset depth and scale animations
- **Hero avatar** — responsive `<picture>` with WebP, orbit rings, breathing dots
- **Responsive** — mobile-first, touch-optimized, 44px tap targets, works on all screen sizes
- **Contact form** — powered by EmailJS (dynamically imported only on submit)
- **SEO** — full Open Graph, Twitter Card, JSON-LD structured data, sitemap, robots.txt
- **Analytics** — Cloudflare Web Analytics + custom event tracking (cookie-free)

---

## 🧱 Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI components with hooks |
| **TypeScript 5.6** | Type-safe code throughout |
| **Tailwind CSS v4** | Utility-first styling with `@theme` directive |
| **Vite 8** | Build tool with Rollup + Lightning CSS |
| **Framer Motion 12** | Scroll animations, parallax, hover effects |
| **Canvas 2D API** | Constellation particle background (raw canvas, no library) |
| **vite-plugin-compression2** | Pre-built Brotli + Gzip at build time |
| **react-icons** | Icons (Heroicons, Feather, Bootstrap, SimpleIcons) |
| **EmailJS** | Contact form delivery (dynamic import, no backend) |
| **Cloudflare Pages** | Hosting with global CDN, Web Analytics |

---

## 🚀 Performance

Total transfer size: **~137KB Brotli** (down from ~3.5MB). Builds in < 1 second.

### Images
| What | Before | After |
|---|---|---|
| Profile photo | `profile.png` — 3.1MB, single size | WebP responsive set: 400/480/800px with JPEG fallback |
| Hero image | `<img>` tag | `<picture>` with `srcSet`, `fetchpriority="high"` preload |
| OG image | None | Custom 1200×630 branded PNG (58KB) |

### Bundle Splitting
| Chunk | Size (Brotli) |
|---|---|
| `vendor-react` | ~49KB |
| `vendor-motion` | ~41KB |
| `index` (app) | ~22KB |
| `styles` | ~3.4KB |
| `CSS` | ~6.3KB |
| Lazy chunks (7 sections) | ~5KB total |

**How:** `React.lazy()` + `Suspense` for 7 below-fold components. Manual Rollup chunks split react, react-dom, framer-motion into separate vendor files.

### Fonts
- Google Fonts (Inter + Sora) loaded **non-render-blocking** via `media="print"` trick with `onload="this.media='all'"`
- `dns-prefetch` + `preconnect` for Google Fonts and EmailJS API

### Compression
- **Brotli + Gzip** pre-built at build time via `vite-plugin-compression2`
- Every `.js`, `.css`, `.html`, `.svg` file has `.br` and `.gz` versions in the build output
- Cloudflare Pages serves the compressed version automatically

### Dead Code Removed
- Removed unused `three.js` + `@types/three` + `vite-plugin-glsl` (~150KB saved)
- EmailJS dynamically imported only on form submit (not in main bundle)

---

## 🎨 Animations

### Layer 1: Constellation Field (`ConstellationField.tsx`) — Canvas 2D

A raw HTML5 `<canvas>` running a `requestAnimationFrame` loop:

- **60 particles on mobile, 120 on desktop** — spawn with random positions, velocities, sizes
- Semi-transparent background fill creates a **motion blur trail**
- Particles drift and wrap at screen edges (toroidal space)
- Each particle **breathes** — radius oscillates via `sin(time + phase)`
- **Mouse/touch interaction** with 3 zones:
  - *Far* (50–180px): gentle **attraction** with **swirl** force
  - *Near* (<50px): **repulsion** away from cursor
  - *Outside*: no effect
- **Constellation lines** between nearby particles (110px threshold)
- Lines **brighten near cursor** — thicker and more visible near mouse
- **Touch support**: `touchstart/touchmove/touchend` on `window` with 600ms fade timer
- **30fps throttle on mobile** for smooth scrolling
- Glow halos skipped on mobile for GPU savings
- `memo()` wrapped, axis-aligned early rejection in connection loop

### Layer 2: Gradient Blobs (`FloatingShapes.tsx`) — Pure CSS

- 4 blobs with `radial-gradient` background (no `blur()` filter — alpha fade instead)
- Animated with **CSS `@keyframes blob-float`** (no Framer Motion = no JS cost)
- Theme-aware colors via CSS custom properties
- **Mobile**: fewer blobs (1 hidden), smaller sizes, lighter animation

### Accessibility
- `@media (prefers-reduced-motion: reduce)` disables all animations globally
- `pointer: coarse` ensures 44px minimum tap targets

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ConstellationField.tsx  → Canvas particle background (touch + mouse)
│   ├── FloatingShapes.tsx      → CSS-animated gradient blobs
│   ├── HeroAvatar.tsx          → Responsive <picture> with orbit animations
│   ├── Home.tsx                → Hero section with parallax (disabled on mobile)
│   ├── About.tsx               → Stats + bio + CV download
│   ├── Skills.tsx              → Tech skills grid
│   ├── Work.tsx                → Company & college projects
│   ├── Qualification.tsx       → Education & experience timeline
│   ├── Contact.tsx             → Form with dynamic EmailJS import
│   ├── Header.tsx              → Nav + theme toggle
│   ├── Footer.tsx              → Footer links
│   ├── ScrollUp.tsx            → Scroll-to-top button
│   ├── SectionReveal.tsx       → Scroll-triggered parallax wrapper
│   ├── SectionHeader.tsx       → Reusable section title
│   ├── PlexusFrame.tsx         → Plexus-bordered image frame
│   └── TabBar.tsx              → Reusable tab switcher
├── helpers/
│   ├── analytics.ts            → Custom event tracking (pageview, CV, sections)
│   ├── constants/
│   │   ├── personal.ts         → Name, bio, contact, CV path
│   │   ├── skills.tsx          → Tech skills (primary, secondary, soft)
│   │   ├── projects.ts         → Company & college projects
│   │   ├── qualification.ts    → Education & experience timeline
│   │   ├── socials.tsx         → Social media links
│   │   ├── sections.tsx        → Section titles, labels, tab configs
│   │   ├── about.tsx           → About page stats
│   │   └── navigation.tsx      → Nav menu items
│   ├── interfaces/
│   │   └── index.ts            → TypeScript interfaces
│   └── styles/
│       ├── components.ts       → Component-specific Tailwind tokens
│       └── index.ts            → Shared Tailwind tokens
├── App.tsx                     → Root with lazy loading + analytics init
├── main.tsx                    → Entry point
└── index.css                   → Theme vars, keyframes, tap targets
```

---

## 🔍 SEO

| Feature | Implementation |
|---|---|
| **Open Graph** | `og:title`, `og:description`, `og:image` (1200×630), `og:url`, `og:site_name` |
| **Twitter Card** | `summary_large_image` with full title, description, image |
| **JSON-LD** | `Person` schema — `jobTitle`, `worksFor`, `alumniOf`, `sameAs` (socials), `knowsAbout` |
| **Canonical URL** | `<link rel="canonical">` |
| **Sitemap** | `public/sitemap.xml` with `lastmod` and `changefreq` |
| **Robots.txt** | `Allow: /`, `Disallow: /assets/`, sitemap reference |
| **OG Image** | Custom branded SVG → PNG (58KB) with name, role, trait pills |
| **Semantic HTML** | `<section>`, `<nav>`, `<main>`, `<header>`, `<footer>`, proper heading hierarchy |
| **Noscript fallback** | Text content visible when JS is disabled |

---

## 📊 Analytics

### Cloudflare Web Analytics (automatic)
Free, cookie-free, < 1KB beacon script in `index.html`. Tracks:
- Page views over time
- Visitor countries & cities
- Device type (desktop / mobile / tablet)
- Browser & OS breakdown
- Referrer sources (LinkedIn, GitHub, Google, direct)

> **Setup:** Replace `YOUR_CF_ANALYTICS_TOKEN` in `index.html` with your token from Cloudflare Dashboard → Web Analytics.

### Custom Event Tracker (`src/helpers/analytics.ts`)
Lightweight module (~500 bytes Brotli) using `navigator.sendBeacon`:

| Event | Data | Trigger |
|---|---|---|
| `pageview` | Full device fingerprint | Page load |
| `cv_download` | Device info + timestamp | CV button click |
| `section_view` | Section ID | Section enters viewport (IntersectionObserver) |
| `section_time` | Section ID + seconds | Section leaves viewport |
| `social_click` | Platform + URL | Social icon click |
| `contact_submit` | Device info | Form submit success |

**Device info collected:** screen resolution, viewport, DPR, platform, language, touch points, device memory, CPU cores, connection type (wifi/4g/3g), speed (Mbps), timezone (approximate location), referrer, user agent, timestamp.

> **Setup:** Set `VITE_ANALYTICS_URL` env var to your Cloudflare Worker endpoint. Without it, custom events are silently skipped (zero overhead).

---

## 📱 Mobile Optimizations

| Area | What |
|---|---|
| **Parallax** | Completely disabled on mobile (`SectionReveal` + `Home`) — zero transform cost |
| **Canvas** | 60 particles (vs 120), 30fps throttle, no glow halos, touch events on `window` |
| **Blobs** | Fewer blobs, smaller sizes, lighter CSS animation, 1 blob hidden |
| **Avatar** | 4 orbit dots (vs 8), tighter radii, smaller container (240px vs 280px) |
| **Layout** | Avatar-first ordering, responsive text sizes, `px-4` mobile padding |
| **Tap targets** | 44px minimum for all interactive elements (`pointer: coarse`) |
| **Images** | Responsive `<picture>` with 400px mobile / 800px desktop srcSet |

---

## ✏️ Edit Your Content

Everything is in **`src/helpers/constants/`** — edit and save:

| File | What it controls |
|---|---|
| `personal.ts` | Name, bio, contact info, CV path |
| `skills.tsx` | Tech skills (primary, secondary, soft) |
| `projects.ts` | Company & college projects |
| `qualification.ts` | Education & experience timeline |
| `socials.tsx` | Social media links |
| `sections.tsx` | Section titles, labels, tab configs |

---

## ⚙️ Environment Variables

```env
# EmailJS (required for contact form)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Custom analytics endpoint (optional — Cloudflare Worker URL)
VITE_ANALYTICS_URL=https://your-worker.your-domain.workers.dev/events
```

---

## 🚀 Quick Start

```bash
pnpm install      # install dependencies
pnpm dev          # dev server → http://localhost:3000
pnpm build        # production build → build/
pnpm preview      # preview production build
```

---

## 🌐 Deploy

Deployed on **Cloudflare Pages** with auto-builds from GitHub.

Push to `main` → live at [pragadeesh.pages.dev](https://pragadeesh.pages.dev) in ~60 seconds.

---

<p align="center">Made with ❤️ by <a href="https://pragadeesh.pages.dev">Pragadeesh</a></p>
