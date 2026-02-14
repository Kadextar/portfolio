# Azamat Satullaev | Hospitality & Management Researcher

A premium, production-level portfolio website. Built with Next.js 14, TypeScript, TailwindCSS, Framer Motion, and ShadCN UI.

## Features

- **Cinematic Hero** — Animated gradient background (no static image)
- **Animated Typography** — Text reveal, staggered motion
- **Parallax Scroll** — Section reveal effects
- **Glass Cards** — Blur, subtle glow, hover micro-interactions
- **Loading Animation** — Premium initial load experience
- **Cursor Glow** — Animated orange glow following cursor (desktop)
- **Smooth Page Transitions** — Staggered content reveal
- **Interactive Skills** — Animated layout with hover states
- **Dark Theme** — Orange accent (#ff7a1a)
- **SEO Optimized** — Meta tags, sitemap, robots.txt
- **Fully Responsive** — Mobile-first design

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Framer Motion
- ShadCN UI (Button, Card, Input)
- class-variance-authority, clsx, tailwind-merge

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Deploy to Netlify

1. Connect your GitHub repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `.next` (handled by @netlify/plugin-nextjs)
4. The `netlify.toml` is pre-configured

## Customization

- **Content**: Edit `src/components/`
- **Colors**: `tailwind.config.ts`, `globals.css` (accent: #ff7a1a)
- **SEO**: Update `src/app/robots.ts`, `src/app/sitemap.ts`, `metadataBase` in layout
