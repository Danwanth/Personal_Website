# danwanth-site

Personal portfolio for Danwanth Yogesh. Specs: [PLAN.md](PLAN.md) (the original) and [PLAN-pages.md](PLAN-pages.md) (multiple pages and the player-profile hero). Vite + React 19 + TypeScript (strict) + Tailwind CSS v4. pnpm only.

```
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # tsc --noEmit, then vite build -> one index.html per page plus 404.html
pnpm preview
```

## Pages

A Vite multi-page build: one HTML entry per page, full page loads, no router. On Vercel, `cleanUrls` serves `dist/work/index.html` at `/work`.

| URL | Entry | Contents |
|---|---|---|
| `/` | `index.html` -> `src/pages/home.tsx` | Hero with the player-profile card, selected work, around the site |
| `/work` | `work/index.html` | Experience, education, awards and certifications, resume |
| `/projects` | `projects/index.html` | All projects |
| `/skills` | `skills/index.html` | The Starting XI pitch, bench, full list |
| `/play` | `play/index.html` | Keepy-uppy and the achievements list |
| `/about` | `about/index.html` | About, watching, playing, riding |
| any other | `404.html` | Offside page (404 status on Vercel) |

## Layout

- `src/data/site.ts`: all content (including `pages`, `pageHeads`, `hero.card`). Components only render it.
- `src/pages/mount.tsx`: `mountPage(<Page/>, { current })` is the one shared shell: fonts, CSS, retro init, DevTools greeting, achievements provider, header, `<main id="main">`, contact band, footer, achievements toast and dialog, key eggs and console, the visit tracker. Each `src/pages/*.tsx` only supplies its content.
- `vite.config.ts`: the `sharedHead` plugin injects the inline theme/retro init script (`src/head/theme-init.js`), favicon, theme-color, `og:site_name`, `og:type`, `twitter:card` and a `<noscript>` line into every page. Each HTML file only has its own title, description, canonical and og tags. The same plugin makes dev and preview serve `/work` like Vercel clean URLs; `appType: 'mpa'` stops unknown paths from falling back to the home page.
- `src/index.css`: colour tokens (`--paper --ink --muted --rule --accent --accent-ink`), dark and retro overrides, `.wrap`, `.display`, `.label`, `.link`, `.text-button`, `.kv`, and the cross-document view transition (header stays put, content crossfades; off under reduced motion).
- `src/components/`: one file per section. `PlayerCard` is the hero card, `AchievementParts` is shared by the dialog and the list on `/play`.
- Theme: `src/lib/theme.ts`. The inline script sets `class="dark"` on `<html>` before paint; `dy:theme` in localStorage, else `prefers-color-scheme`.
- `public/sitemap.xml` lists the six pages; `robots.txt` points at it. `vercel.json` has `cleanUrls`, `trailingSlash: false`, the resume redirect and the `/assets` cache header, and no SPA catch-all.

## Status

PLAN.md M1 to M7 and the five steps of PLAN-pages.md are built. Deployment is left to the lead.

## Easter eggs (spoilers)

Seven achievements, stored in localStorage `dy:achievements`; the footer counter opens the list (also inline on `/play`), which has a Reset button (clears achievements, the best score and the visited pages).

- **First touch / Number 10:** kick the ball in the Keepy-uppy game once; reach 10 touches. Best score is in `dy:keepy-best`.
- **Full tour:** visit all six pages (home, work, projects, skills, play, about; not the 404). Pages are recorded in `dy:visited`.
- **Konami:** Up Up Down Down Left Right Left Right B A toggles retro mode (`dy:retro`) and unlocks `konami`. The `Exit retro mode` button and the console command `retro` also toggle it (the command does not unlock).
- **Console:** press `` ` `` or `~` (the key under Esc) on any page; Esc, the same key or Close shuts it. Commands: `help ls cd <page> whoami projects gamertags socials resume play retro theme light|dark achievements clear exit`. `ls` lists the pages, `cd work` (or `cd ~`, `cd /`, `cd home`) navigates, `play` goes to `/play#game` and focuses the game. Hidden: `sudo hire danwanth` (opens a mail draft), `sv_cheats 1`, `noclip`/`god`/`iddqd`, `sudo rm -rf /`.
- **The GOAT:** type `messi` anywhere outside a form field. A ball rolls across the bottom (not with reduced motion). `siu` gives a plain toast. Each word fires at most once per 5 seconds.
- **Offside:** visit any missing page (the 404).
- The DevTools greeting is two `console.log` lines on every page.

## Deviations from PLAN.md

- Display font: `@fontsource-variable/archivo` ships a width axis (62-125%, `wdth.css`), so it is used as specified, with `font-stretch: 75%` for the name. `@fontsource/archivo-narrow` is not needed.
- Plex Sans/Mono are imported as the `latin-*` subsets only (smaller `dist/assets`).
- `pnpm build` runs `tsc --noEmit` instead of `tsc -b` (single tsconfig, no project references).
- A `<noscript>` line with the name, email, resume link and page links is injected into every page, since the pages are client-rendered.
- Game physics, tuned with a simulated bot that clicks with human-like lag and aim error: a kick keeps only 60% of the old sideways speed (`vx = vx * 0.6 + offset * 14`; spec: `vx +=`) so drift does not pile up. The hit radius starts at 2.4r and shrinks 0.06r per 10 touches (spec: 2.0r and 0.05r), minimum 1.3r. Fingers get 12px of extra reach. Velocities and gravity scale with canvas height / 380, so the 320px mobile canvas plays the same.
- The game loop stops drawing when nothing moves (idle, settled game-over), besides pausing off-screen and in hidden tabs.
- Retro `--muted` is `#1c4a1c` instead of `#306230`: the spec colour is only 3.4:1 on the LCD green, this one is 4.7:1.
- Retro mode adds `padding-top` to the body so the fixed "Exit retro mode" button never covers the theme toggle. The hero and 404 headings are re-sized in retro mode because Press Start 2P is one em wide per letter.
- The achievements dialog backdrop is a flat wash of the paper colour (no blur).
- Console `help` prints `name: description` lines instead of aligned columns, so it wraps cleanly at 360px.

## Deviations from PLAN-pages.md

- "Selected work" shows Kards, Gesture whiteboard and Car price predictor, as the spec names them, using a `featured` flag in `site.ts`. The spec also says "the first 3 projects", but the third project in the list is ReturnLoop; the names win.
- The hero card's inactive side stays in the layout (`visibility: hidden`) so the card never changes size when you toggle it.
- Subpage section labels are numbered within each page (`01 — Experience`, ...). The /about interests section is labelled "Interests" because the page title is already "Off the pitch". The contact band has no number.
- Resetting achievements also clears `dy:visited` (otherwise `tour` would unlock again on the next page load); the page you are on counts as visited again straight away.
- The 404 page gets the shared shell too (header, contact band, footer, key listener and console), but the visit tracker is not mounted there.
- `vite.config.ts` imports `node:fs` without `@types/node` (no new dependencies), so `src/head/node-shims.d.ts` declares the one function used.
