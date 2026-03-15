# ⚡ Pragadeesh — Software Engineer Portfolio

> Monochrome portfolio with constellation backgrounds, plexus borders, dark/light theme, parallax scrolling, and smooth animations.

[![Live Site](https://img.shields.io/badge/🚀_Live-pragadeesh.pages.dev-000?style=for-the-badge)](https://pragadeesh.pages.dev)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Deployed-Cloudflare_Pages-F38020?logo=cloudflarepages&logoColor=white)

---

### ✨ Features

- **Dark / Light theme** — toggle with system preference detection & localStorage persistence
- **Constellation canvas** — 300 interactive particles with mouse attraction, repulsion & constellation lines
- **Gradient blobs** — 4 floating blurred orbs creating ambient depth per theme
- **Plexus border system** — corner brackets + node dots on all cards (CSS-only, no JS)
- **Parallax scroll** — sections reveal with Y-offset depth and scale animations
- **Hero avatar** — morphing clip-path, 3-tier orbit rings, breathing dots, scan line, vignette
- **Responsive** — mobile-first, works on all screen sizes
- **Contact form** — powered by EmailJS
- **SEO ready** — meta tags, Open Graph, semantic HTML, dynamic theme-color

---

### 🧱 Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI components with hooks |
| **TypeScript** | Type-safe code throughout |
| **Tailwind CSS v4** | Utility-first styling with `@theme` directive |
| **Vite 8** | Build tool & dev server |
| **Framer Motion** | Scroll animations, parallax, hover effects, orbit animations |
| **Canvas 2D API** | Constellation particle background (no library, raw canvas) |
| **CSS Custom Properties** | Theme system (light/dark switching via `data-theme` attribute) |
| **react-icons** | Icon library (Heroicons, Feather, Bootstrap, SimpleIcons) |
| **EmailJS** | Contact form email delivery (no backend needed) |
| **Cloudflare Pages** | Hosting with global CDN & auto-deploy from GitHub |

---

### 🌌 How the Background Animation Works

The background is a **two-layer system** that creates depth:

#### Layer 1: Constellation Field (`ConstellationField.tsx`) — Canvas 2D

A raw HTML5 `<canvas>` element running a **requestAnimationFrame** loop at 60fps:

1. **300 particles** spawn with random positions, velocities, sizes, and phase offsets
2. Each frame:
   - Semi-transparent background fill (`rgba` with 0.15 alpha) creates a **motion blur trail** effect
   - Particles drift with slight velocity, wrapped at screen edges (toroidal space)
   - Each particle **breathes** — its radius oscillates using `sin(time + phase)`
   - Particles get a subtle **glow halo** (larger transparent circle behind the core)
3. **Mouse interaction** (3 zones):
   - **Far zone** (50–180px): particles are gently **attracted** toward cursor with a **swirl** (perpendicular force)
   - **Near zone** (<50px): particles are **repelled** away from cursor
   - **Outside** (>180px): no effect
4. **Constellation lines**: nearby particles (within 110px) draw connecting lines
   - Lines are **boosted near the cursor** — brighter and thicker when the midpoint is close to mouse
   - Without mouse, only every 4th particle checks connections (performance optimization)
5. **Theme-aware**: colors switch between light gray (dark mode) and medium gray (light mode) to stay monochrome

#### Layer 2: Gradient Blobs (`FloatingShapes.tsx`) — Framer Motion

4 large blurred circles floating behind everything:

1. Each blob is a `<div>` with `radial-gradient` background and `blur(80px)` filter
2. Animated with Framer Motion — slow `x/y/scale` oscillation (20–26 second loops)
3. **Theme-aware colors**: dark mode uses lighter grays (subtle bright patches), light mode uses darker grays (subtle shadow patches)
4. Very low opacity (0.12–0.15) — creates **ambient depth** without being distracting

#### Together:
- Canvas particles (z-index: 0) → sharp, interactive, constellation-like
- Gradient blobs (z-index: 1) → soft, atmospheric, adds warmth
- Content (z-index: 10) → sits on top of both layers
- Both layers are `position: fixed` with `pointer-events: none`

---

### 🚀 Quick Start

```bash
pnpm install      # install dependencies
pnpm dev          # start dev server → http://localhost:5173
pnpm build        # production build → build/
pnpm preview      # preview production build
```

---

### 📁 Structure

```
src/
├── components/            → UI sections (Header, Home, About, Skills, etc.)
│   ├── ConstellationField → Canvas 2D particle background (300 particles, mouse-reactive)
│   ├── FloatingShapes     → Animated gradient blobs (4 blurred orbs, theme-aware)
│   ├── HeroAvatar         → Profile photo with orbit animations
│   ├── PlexusFrame        → Reusable plexus-bordered image frame
│   ├── SectionReveal      → Scroll-triggered parallax wrapper
│   ├── SectionHeader      → Reusable section title component
│   └── TabBar             → Reusable tab switcher
├── helpers/
│   ├── constants/         → All content (skills, projects, bio, sections...)
│   ├── interfaces/        → TypeScript interfaces
│   └── styles/            → Shared Tailwind class tokens
└── index.css              → Theme variables, plexus borders, keyframes
```

---

### ✏️ Edit Your Content

Everything is in **`src/helpers/constants/`** — just edit and save:

| File | What it controls |
|---|---|
| `personal.ts` | Name, bio, contact info, CV path |
| `skills.tsx` | Tech skills (primary, secondary, soft) |
| `projects.ts` | Company & college projects |
| `qualification.ts` | Education & experience timeline |
| `socials.tsx` | Social media links |
| `sections.tsx` | Section titles, labels, tab configs |

---

### ⚙️ Setup EmailJS

Add your keys to `.env`:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

### 🌐 Deploy

Deployed on **Cloudflare Pages** with auto-builds from GitHub.

Push to `main` → live at [pragadeesh.pages.dev](https://pragadeesh.pages.dev) in ~60 seconds.

---

<p align="center">Made with ❤️ by <a href="https://pragadeesh.pages.dev">Pragadeesh</a></p>
