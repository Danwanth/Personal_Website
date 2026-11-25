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

All milestones M1 to M7 are built. Deployment (M8) is left to the lead.

## Easter eggs (spoilers)

Six achievements, stored in localStorage `dy:achievements`; the footer counter opens the list, which also has a Reset button (clears achievements and the best score).

- **First touch / Number 10:** kick the ball in the Keepy-uppy game once; reach 10 touches. Best score is in `dy:keepy-best`.
- **Konami:** Up Up Down Down Left Right Left Right B A toggles retro mode (`dy:retro`) and unlocks `konami`. The `Exit retro mode` button and the console command `retro` also toggle it (the command does not unlock).
- **Console:** press `` ` `` or `~` (the key under Esc) to open it; Esc, the same key or Close shuts it. Commands: `help whoami projects gamertags socials resume play retro theme light|dark achievements clear exit`. Hidden: `sudo hire danwanth` (opens a mail draft), `sv_cheats 1`, `noclip`/`god`/`iddqd`, `sudo rm -rf /`.
- **The GOAT:** type `messi` anywhere outside a form field. A ball rolls across the bottom (not with reduced motion). `siu` gives a plain toast. Each word fires at most once per 5 seconds.
- **Offside:** visit any missing page (the 404).
- The DevTools greeting is two `console.log` lines on the main page.

## Deviations from PLAN.md

- Display font: `@fontsource-variable/archivo` ships a width axis (62-125%, `wdth.css`), so it is used as specified, with `font-stretch: 75%` for the name. `@fontsource/archivo-narrow` is not needed.
- Plex Sans/Mono are imported as the `latin-*` subsets only (smaller `dist/assets`).
- `pnpm build` runs `tsc --noEmit` instead of `tsc -b` (single tsconfig, no project references).
- Header on mobile wraps to two rows (name + theme toggle, then the four links) because all of it does not fit on one line at 360px. No hamburger.
- A `<noscript>` line with the name, email and resume link is in `index.html` as a fallback, since the page is client-rendered.
- Game physics, tuned with a simulated bot that clicks with human-like lag and aim error: a kick keeps only 60% of the old sideways speed (`vx = vx * 0.6 + offset * 14`; spec: `vx +=`) so drift does not pile up. The hit radius starts at 2.4r and shrinks 0.06r per 10 touches (spec: 2.0r and 0.05r), minimum 1.3r. Fingers get 12px of extra reach. Velocities and gravity scale with canvas height / 380, so the 320px mobile canvas plays the same.
- The game loop stops drawing when nothing moves (idle, settled game-over), besides pausing off-screen and in hidden tabs.
- Retro `--muted` is `#1c4a1c` instead of `#306230`: the spec colour is only 3.4:1 on the LCD green, this one is 4.7:1.
- Retro mode adds `padding-top` to the body so the fixed "Exit retro mode" button never covers the theme toggle. The hero and 404 headings are re-sized in retro mode because Press Start 2P is one em wide per letter.
- The console and ball roll are mounted on the main page only. The 404 page has the toast, the dialog and the retro exit button, but not the key listener.
- The achievements dialog backdrop is a flat wash of the paper colour (no blur).
- Console `help` prints `name: description` lines instead of aligned columns, so it wraps cleanly at 360px.
