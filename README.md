# danwanth-site

Personal portfolio for Danwanth Yogesh. Spec: [PLAN.md](PLAN.md). Vite + React 19 + TypeScript (strict) + Tailwind CSS v4. pnpm only.

```
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # tsc --noEmit, then vite build -> dist/index.html and dist/404.html
pnpm preview
```

## Layout

- `src/data/site.ts`: all content. Components only render it.
- `src/index.css`: colour tokens (`--paper --ink --muted --rule --accent --accent-ink`), dark and retro overrides, `.wrap`, `.display`, `.label`, `.link`, `.text-button`.
- `src/components/`: one file per section. `App.tsx` composes them in order.
- `index.html` / `404.html`: two Vite entries (`src/main.tsx`, `src/notfound.tsx`). Both carry the inline theme/retro init script.
- Theme: `src/lib/theme.ts` (`getTheme`, `setTheme`, `useTheme`). The inline script sets `class="dark"` on `<html>` before paint; `dy:theme` in localStorage, else `prefers-color-scheme`.

## Status

M1 to M3 and the static M7 parts (meta, favicon, robots, vercel.json, 404 page) are done. Still to build: M4 game, M5 achievements, M6 easter eggs, then the a11y/responsive pass.

## Deviations from PLAN.md

- Display font: `@fontsource-variable/archivo` ships a width axis (62-125%, `wdth.css`), so it is used as specified, with `font-stretch: 75%` for the name. `@fontsource/archivo-narrow` is not needed.
- Plex Sans/Mono are imported as the `latin-*` subsets only (smaller `dist/assets`).
- `pnpm build` runs `tsc --noEmit` instead of `tsc -b` (single tsconfig, no project references).
- Header on mobile wraps to two rows (name + theme toggle, then the four links) because all of it does not fit on one line at 360px. No hamburger.
- A `<noscript>` line with the name, email and resume link is in `index.html` as a fallback, since the page is client-rendered.
- Retro palette tokens are in `index.css` and the init script reads `dy:retro`, but retro-mode fonts, scanlines and the exit button are left for M6.
