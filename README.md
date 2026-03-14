# ⚡ Pragadeesh — Portfolio

> Modern developer portfolio with dark mode, parallax scrolling, and smooth animations.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)

---

### 🚀 Quick Start

```bash
pnpm install      # install dependencies
pnpm dev          # start dev server → http://localhost:3000
pnpm build        # production build
```

---

### 🧱 Built With

**React 19** · **TypeScript** · **Tailwind CSS v4** · **Vite 8** · **Framer Motion** · **react-icons** · **EmailJS**

---

### 📁 Structure

```
src/
├── components/          → UI sections (Header, Home, About, etc.)
├── helpers/
│   ├── constants/       → All your content (skills, projects, bio...)
│   └── styles/          → Shared Tailwind class strings
└── assets/              → CV and media files
```

---

### ✏️ Edit Your Content

Everything is in **`src/helpers/constants/`** — just edit and save:

```
personal.ts        → name, bio, contact info
skills.tsx         → your tech skills
projects.ts        → portfolio items
qualification.ts   → education & experience
socials.tsx        → social media links
```

---

### ⚙️ Setup EmailJS

Add your keys to `.env`:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

<p align="center">Made with ❤️ by Pragadeesh</p>
