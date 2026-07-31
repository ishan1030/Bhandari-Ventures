# Bhandari Ventures

Modern one-page marketing website for **Bhandari Ventures** — a digital services company in Bharatpur, Nepal that helps shop owners and small businesses grow online with simple, affordable technology.

## Highlights

- **Interactive 3D hero** — a Spline robot fills the hero as a full-screen, interactive background with the headline and CTA layered on top.
- **Premium dark theme** with an electric blue → cyan → violet accent gradient, glassmorphic cards, and scroll-reveal animations.
- **Accessible & mobile-first** — visible keyboard focus, a skip link, semantic landmarks, and full `prefers-reduced-motion` support.
- **WhatsApp-first contact** — floating button, prominent CTAs, and a contact form that hands the enquiry straight to WhatsApp (no backend needed).

## Tech stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) build tooling
- [Tailwind CSS](https://tailwindcss.com/) with a shadcn/ui-style token setup
- [@splinetool/react-spline](https://www.npmjs.com/package/@splinetool/react-spline) for the 3D hero
- [lucide-react](https://lucide.dev/) icons

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build
```

## Project structure

```
src/
  components/
    sections/          # Navbar, Hero, Services, WhyUs, HowItWorks, Contact, Footer
    ui/
      button.tsx               # shadcn-style button with a lightweight asChild
      interactive-3d-robot.tsx # lazy-loaded Spline hero (Suspense + spinner)
      reveal.tsx               # IntersectionObserver scroll-reveal wrapper
  lib/
    site.ts            # business + contact details (phone, WhatsApp, socials)
    utils.ts           # cn() class helper
  App.tsx              # page composition + floating WhatsApp button
  index.css            # design tokens, theme, and utility layers
```

## Editing content

All business details (name, location, phone, WhatsApp number, socials, and the
Spline scene URL) live in [`src/lib/site.ts`](src/lib/site.ts) — update them
there and every section stays in sync.
