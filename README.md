
# Jaiydev Gupta - Portfolio

A single-page portfolio built with React 19, Vite, and Tailwind CSS. The site highlights AI strategy work, featured case studies, and recent writing.

## Prerequisites

- Node.js 20.x (match the version used by Vercel's build image)
- npm 10.x (`npm ci` is configured for reproducible installs)

## Local development

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:5173` with hot module reload enabled. When using the Vercel CLI, encapsulate the same command with `vercel dev`.

## Build for production

```bash
npm run build
```

The optimized site is emitted to the `dist/` directory. Preview the production build before shipping with:

```bash
npm run preview
```

## Deploying to Vercel

Vercel picks up deployment hints from `vercel.json`:

- `framework: "vite"` selects the static build adapter.
- `installCommand: "npm ci"` keeps installs reproducible in CI.
- `buildCommand: "npm run build"` compiles the app.
- `devCommand: "npm run dev -- --host"` mirrors local dev when running `vercel dev`.
- `outputDirectory: "dist"` serves the generated static assets.
- The `/assets/(.*)` header enables long-term caching for hashed build output.

After pushing to GitHub, connect the repository in the Vercel dashboard. Every push to the configured branch will trigger the build pipeline defined above.

### Manual deploy with Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

The CLI respects the same configuration and outputs a production deployment URL upon success.

## Project structure

- `src/` – React components, data models, and entry point (`src/main.tsx`, `src/App.tsx`).
- `src/components/` – Reusable sections (hero, about, projects, experience, writing, footer).
- `src/data/portfolio.ts` – Centralized content shared across sections.
- `public/` – Static assets copied verbatim (served via absolute `/` paths).
- `tailwind.config.js` & `src/index.css` – Tailwind layers, tokens, and base styles.

## Available scripts

- `npm run dev` – Start the Vite dev server.
- `npm run build` – Create a production build in `dist/`.
- `npm run preview` – Serve the production build locally.
- `npm run lint` – Run ESLint with the project rules.
# Portfolio_Jaiydev
# Portfolio_Jaiydev
