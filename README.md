# FoodShare — Reduce Waste. Feed People.

A modern, responsive landing page built with **React**, **Tailwind CSS**,
**Framer Motion**, and **Lucide React** icons.

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project Structure

```
foodshare/
├─ index.html
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
├─ vite.config.js
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   ├─ index.css
   └─ components/
      ├─ Navbar.jsx
      ├─ Hero.jsx
      ├─ HeroIllustration.jsx   (inline SVG vector artwork)
      ├─ StatsFloating.jsx      (glassmorphism stat cards)
      ├─ HowItWorks.jsx
      ├─ WhyChoose.jsx
      ├─ AnimatedCounter.jsx    (reusable Framer Motion counter)
      ├─ Impact.jsx
      ├─ Testimonials.jsx
      ├─ CTA.jsx
      └─ Footer.jsx
```

## Notes

- Sections below the fold (Impact, Testimonials, CTA, Footer) are
  code-split with `React.lazy` + `Suspense` for faster initial load.
- All interactive elements have visible focus states and `aria-label`s
  for accessibility; `prefers-reduced-motion` is respected globally.
- The hero illustration is a dependency-free inline SVG — no external
  image assets required.
- Colors, radii, and shadows are centralized as design tokens in
  `tailwind.config.js` for easy theming.
