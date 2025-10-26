# Repository Guidelines

## Project Structure & Module Organization
- `src/` houses the React app with the entry point in `src/main.tsx` and top-level composition in `src/App.tsx`.
- `src/components/` groups reusable UI sections (hero, about, projects, experience, writing, footer).
- `src/data/portfolio.ts` centralizes content and types shared across sections.
- `src/index.css` wires Tailwind layers and base tokens; no component-scoped `.css` files remain.
- `public/` holds static files served verbatim (favicons, meta files). Reference them via absolute `/` paths.
- `tsx-conf/` contains TypeScript project references used by editors and tooling.
- `dist/` is produced by `npm run build`; never commit its contents.
- `index.html` defines the single-page shell; adjust meta tags or root IDs here when needed.

## Build, Test, and Development Commands
- `npm install` syncs dependencies after cloning or pulling.
- `npm run dev` launches Vite with hot module reload at `http://localhost:5173`.
- `npm run build` outputs optimized assets into `dist/` for deployment.
- `npm run preview` serves the production build locally; run before releasing.
- `npm run lint` executes ESLint with project rules; fix or auto-format using `npm run lint -- --fix` when appropriate.

## Coding Style & Naming Conventions
- Use React function components and hooks; prefer composition over class components.
- Follow 2-space indentation and single quotes in TypeScript/JavaScript; leave JSX attributes double-quoted.
- Name component files in PascalCase (e.g., `HeroSection.tsx`) and utilities in camelCase.
- Express styling with Tailwind utility classes; extend tokens in `tailwind.config.js` rather than inline styles where possible.
- Rely on the project ESLint config and address `@typescript-eslint/no-unused-vars` errors promptly; prefix intentionally unused values with `_` or uppercase identifiers to satisfy the rule.

## Testing Guidelines
- No default test runner ships with this template; add Vitest with React Testing Library to stay aligned with Vite when tests are introduced.
- Place specs beside components as `Component.test.tsx` or collect them under `src/__tests__/`.
- Prioritize coverage of the hero, project cards, and navigation flows; target ≥80% line coverage once Vitest is configured.
- Until automated tests exist, treat `npm run lint` as the minimum pre-commit gate.

## Commit & Pull Request Guidelines
- Write concise, imperative commit subjects (e.g., `Add hero keyboard focus states`) and expand in the body if context is needed.
- Keep PRs narrowly scoped (layout tweak, content update, animation) and describe user impact plus testing steps.
- Attach before/after screenshots or short clips for UI-facing changes.
- Reference related issues or planning docs and call out follow-up tasks in the PR description.
