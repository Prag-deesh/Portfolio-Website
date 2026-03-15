# ⚡ Pragadeesh — Software Engineer Portfolio

> Monochrome portfolio with constellation backgrounds, plexus borders, dark/light theme, parallax scrolling, and smooth animations.

[![Live Site](https://img.shields.io/badge/🚀_Live-pragadeesh.vercel.app-000?style=for-the-badge)](https://pragadeesh.vercel.app)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000?logo=vercel&logoColor=white)

---

### ✨ Features

- **Dark / Light theme** — toggle with system preference detection & persistence
- **Constellation canvas** — animated particle background with connecting lines
- **Plexus border system** — corner brackets + node dots on all cards
- **Parallax scroll** — sections reveal with depth and scale
- **Hero avatar** — morphing clip-path, orbit rings, breathing dots, scan line
- **Responsive** — mobile-first, works on all screen sizes
- **Contact form** — powered by EmailJS
- **SEO ready** — meta tags, Open Graph, semantic HTML

---

### 🚀 Quick Start

```bash
pnpm install      # install dependencies
pnpm dev          # start dev server → http://localhost:5173
pnpm build        # production build → build/
pnpm preview      # preview production build
```

---

### 🧱 Tech Stack

**React 19** · **TypeScript** · **Tailwind CSS v4** · **Vite 8** · **Framer Motion** · **react-icons** · **EmailJS** · **Vercel**

---

### 📁 Structure

```
src/
├── components/            → UI sections (Header, Home, About, Skills, etc.)
│   ├── ConstellationField → Canvas particle background
│   ├── FloatingShapes     → Animated gradient blobs
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

Deployed on **Vercel** with auto-builds. Push to `main` → live in seconds.

```bash
vercel --prod     # manual deploy
```

---

<p align="center">Made with ❤️ by <a href="https://pragadeesh.vercel.app">Pragadeesh</a></p>
