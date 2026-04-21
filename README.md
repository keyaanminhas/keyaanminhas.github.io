# Keyaan Minhas Portfolio

Advanced static portfolio for `keyaanminhas.github.io`, built with Vite, React, Tailwind CSS, Framer Motion, React Three Fiber, Drei, Three.js, and Lucide React.

## Setup Commands

```bash
npm create vite@latest personal-website -- --template react
cd personal-website
npm install
npm install tailwindcss postcss autoprefixer framer-motion three @react-three/fiber @react-three/drei lucide-react
npx tailwindcss init -p
npm run dev
```

## Project Commands

```bash
npm run dev
npm run build
npm run preview
```

## GitHub Pages

This project is configured for root-domain GitHub Pages deployment with:

```js
base: '/'
```

The portfolio content lives in `src/data.js`. Core sections are split across `Hero.jsx`, `Scene3D.jsx`, `TechMarquee.jsx`, `Projects.jsx`, `ProjectCard.jsx`, `Timeline.jsx`, and `Contact.jsx`.
