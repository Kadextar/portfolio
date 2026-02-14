# Hospitality Management & Research Portfolio

A modern, premium portfolio website for a Hospitality Management & Research student. Built with Next.js 14, TypeScript, TailwindCSS, and Framer Motion.

## Features

- **Dark theme** with glassmorphism UI
- **Smooth scroll animations** via Framer Motion
- **Responsive design** for all devices
- **Professional typography** (Inter + Playfair Display)
- **Sections**: Hero, About, Research & Publications, Experience, Projects, Skills, Blog, Contact

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Framer Motion

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Customization

- **Content**: Edit section components in `src/components/`
- **Colors**: Update `tailwind.config.ts` and `globals.css`
- **Images**: Replace Unsplash URLs with your own (host images or use your own CDN)
- **Contact form**: Integrate with your backend or email service (e.g., Formspree, Resend)
- **SEO**: Update `src/app/robots.ts` and `src/app/sitemap.ts` with your production URL

## Deployment

Deploy to Vercel, Netlify, or any Node.js hosting:

```bash
npm run build
```

The site is production-ready and optimized for performance.
