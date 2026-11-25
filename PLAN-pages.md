# v2.1: multiple pages and the player-profile hero

This extends `PLAN.md`, which still applies in full, especially section 2 (no AI-slop tells) and section 3 (design system). This file only describes what changes. If something here is impossible or clearly wrong, make the smallest sensible change and log it in `README.md` under "Deviations from PLAN.md".

---

## 1. Site map

The site moves from a single page with anchors to real pages: a Vite multi-page build with one HTML entry per page and clean URLs.

| URL | Page title (`<title>`) | Contents |
|---|---|---|
| `/` | Danwanth Yogesh: AI/ML and software engineer | Hero with the player profile, selected work (3 projects), "Around the site" index |
| `/work` | Work: Danwanth Yogesh | Experience, education, awards and certifications, resume |
| `/projects` | Projects: Danwanth Yogesh | All 5 projects (the current Projects list) |
| `/skills` | Starting XI: Danwanth Yogesh | The pitch, bench and full skills list |
| `/play` | Play: Danwanth Yogesh | Keepy-uppy (bigger), achievements board |
| `/about` | About: Danwanth Yogesh | About paragraphs, Off the pitch (watching / playing + gamertags / riding) |
| `/404.html` (any unknown path) | Offside: Danwanth Yogesh | Unchanged |

Every page has its own meta description, canonical URL, `og:title`, `og:description` and `og:url`. Write sensible one-sentence descriptions per page.

**Every page** gets the same Header (with the current page marked), a **Contact band** just above the footer (section 5), the Footer, the achievements toast and dialog, retro exit, and the easter-egg key listener and console. The 404 page gets them too.

---

## 2. Build setup

- **Entries:** `index.html`, `work/index.html`, `projects/index.html`, `skills/index.html`, `play/index.html`, `about/index.html`, `404.html`. Each loads its own small entry module from `src/pages/` (`home.tsx`, `work.tsx`, `projects.tsx`, `skills.tsx`, `play.tsx`, `about.tsx`, `notfound.tsx`).
- **Shared shell:** `src/pages/mount.tsx` exports `mountPage(<PageComponent/>, { current: 'work' })`. It does what main.tsx does today (fonts, CSS, initRetro, devtools greeting, StrictMode, AchievementsProvider) and renders Header + `<main id="main">` + ContactBand + Footer + AchievementsUI + Eggs + RetroExit around the page. No page duplicates this.
- **No duplicated `<head>` boilerplate.** Write a tiny local Vite plugin in `vite.config.ts` that uses `transformIndexHtml` to inject the shared head into every page: the inline theme/retro init script (move its source to one file, e.g. `src/head/theme-init.js`, and inline it), favicon, theme-color metas, `og:site_name`, `og:type` and `twitter:card`. Each HTML file keeps only its own title, description, canonical and og:title/description/url, plus `<div id="root">` and its entry script.
- `vite.config.ts` `rollupOptions.input` lists all 7 entries.
- **vercel.json:** add `"cleanUrls": true` and `"trailingSlash": false`. Keep the resume redirect and the `/assets` cache header. Still **no SPA catch-all rewrite**. Unknown paths must keep returning the Offside page with status 404.
- **public/sitemap.xml** lists the 6 page URLs on `https://danwanth.vercel.app`. robots.txt references it.
- **Page transitions:** add CSS-only cross-document view transitions as progressive enhancement, inside `@media (prefers-reduced-motion: no-preference) { @view-transition { navigation: auto; } }`. Give the header `view-transition-name: site-header` so it stays put while the content crossfades. No JS router and no extra dependency.
- Delete `src/main.tsx` and `src/App.tsx` once the pages replace them, and remove anything left unused.

---

## 3. Header and navigation

- Logo: "Danwanth Yogesh" links to `/`.
- Nav (in this order): `Work · Projects · Skills · Play · About`, as real links to the pages. Mark the current page with `aria-current="page"`, ink colour and a 1px accent underline. Other links stay muted and go accent on hover.
- **At 360px wide** the nav must fit on a single row under the logo row. Reduce the gap to about 14px and use 12px mono if needed. Check it in the browser at 360px; no horizontal page scroll.
- The skip link targets `#main` on every page.

---

## 4. Home page `/`

### 4.1 Hero: player profile (the main new piece)

Desktop (`lg+`): a 12-column grid. **Columns 1–7:** the giant name (as now, `clamp(3.25rem, 11vw, 7.5rem)` condensed), then the lead line, detail line, link row and the local clock line. **Columns 8–12:** the profile card, top-aligned with the name. Below `lg`: name → lead/detail → links → card (full width, max 28rem). Make sure columns 1–7 still fit the name at `lg` without wrapping "DANWANTH" oddly; reduce the clamp max for the two-column layout if needed.

**The card** is a matchday-programme player panel, not a glassy card. Use a 1px ink border, paper background, square corners (2px max), and no shadow, gradient or glow. It uses only existing tokens, with mono for labels and Archivo condensed for big numbers. Structure:

```
PLAYER PROFILE                       SEASON 2026/27      ← mono 11–12px, muted; hairline below
10   D. YOGESH                                           ← "10": Archivo condensed 800, ~5.5rem, accent
     AI/ML engineer · Kochi                              ← name display ~1.5rem; sub mono muted
──────────────────────────────────────────────────────
Club            RSET, Kochi · B.Tech CSE '27             ← <dl>, label mono muted, value sans ink
Former clubs    Simelabs '26 · Digispoc '24
Preferred foot  Python
Status          Open to offers                           ← value in accent (the one CTA-ish detail)
──────────────────────────────────────────────────────
APPS        GOALS        TROPHIES       RATING           ← mono 11px muted
2           5            1              8.56             ← Archivo condensed ~2.25rem ink
internships projects     hackathon win  CGPA             ← mono 11px muted
──────────────────────────────────────────────────────
Scouting report ↻                                        ← text-button, bottom-left
```

- The stats come **from data**, not hard-coded: Apps = number of experience entries; Goals = `projects.length`; Trophies = count of wins (put a `trophies` number in `site.ts` next to the awards, currently 1); Rating = CGPA from `profile`. The Season, Club, Former clubs, Preferred foot and Status values live in `site.ts` under `hero.card`.
- **Scouting report ↻** swaps the card's middle and stats area for the back side. It's the same card size with no 3D flip: an instant swap, or a 150ms opacity crossfade if motion is allowed. The button label becomes `Player profile ↻`. Use `aria-pressed` on the button and an `aria-live="polite"` region for the swapped content. Back side:

```
SCOUTING REPORT
Strengths      Takes a model from messy data to a working app: cleaning,
               modelling, evaluation, then the React or Flask app around it.
Big games      97% accuracy on formulation quality at Simelabs (XGBoost).
               Won HackSUS with ReturnLoop.
Plays          Between ML and full-stack. Comfortable in Python, TypeScript and SQL.
Watch out for  Will bring up Barça within five minutes.
```

  Only these facts. Do not invent anything else about him.
- On mobile the card must fit in 328px (360 minus padding). The 4 stats go in a 2 × 2 grid below 400px.
- The card is not a link. Nothing on it animates on load.

### 4.2 Below the hero

1. **`01 — Selected work`**: the first 3 projects (Kards, Gesture whiteboard, Car price predictor) in a compact form: the meta line, title (links to the primary link), one-sentence summary, and links. No long detail. End with a link `All 5 projects →` to `/projects`. Count from data.
2. **`02 — Around the site`**: a plain list (hairline between rows, no cards) where each row is a link to a page, with the page name in Archivo (~1.5rem) and a one-line description in muted, plus a mono hint on the right:
   - Work: "Internships, education and awards." hint: `2 internships`
   - Projects: "Real-time chat, a gesture whiteboard, models that hit 97%." hint: `5 projects`
   - Skills: "My stack, lined up as a 4-3-3." hint: `Starting XI`
   - Play: "Keepy-uppy, plus achievements hidden around the site." hint: `Best 12 · 3/7`, read **live** from localStorage on the client (best score and achievements count). Before any play: `Best 0 · 0/7`.
   - About: "Barça, games and bikes." hint: `Off the pitch`
   Row hover: the title goes accent. The whole row is the link, with a visible focus ring.

---

## 5. Contact band (every page, above the footer)

Replaces the old Contact section. It's a full-width `wrap` block with a top hairline:
- Mono label `Contact`, then the sentence "Email is the fastest way to reach me. I usually reply within a day or two.", the big email link (as now) with the **Copy** button, then `LinkedIn ↗ · GitHub ↗ · Instagram ↗ · Kochi, Kerala`.
- On desktop, use the section grid (label in columns 1–3, content in 4–12) like the other sections.

---

## 6. The other pages

Every subpage starts with a **page header**: the mono label (e.g. `Work`), then a display title in Archivo condensed 800 uppercase, `clamp(2.75rem, 9vw, 5.5rem)`, then one intro sentence in ~1.25rem ink. Then the page's sections using the existing `Section` grid (labels without numbers or numbered within the page, your choice, but be consistent).

- **/work**: title `WORK`. Intro: "Two internships, a hackathon win and a degree that wraps up in 2027." Sections: Experience, Education, Awards & certifications, then a Resume row with `Download resume (PDF) ↗`. (Move the two About paragraphs out of Work to /about.)
- **/projects**: title `PROJECTS`. Intro: "Five things I've built, from a real-time chat app to models that hit 97%." The full existing Projects list (count from data in the intro if easy).
- **/skills**: title `STARTING XI`. Intro: "My stack, lined up in a 4-3-3. Hover or tap a player." The existing pitch, caption, bench and full list. With the extra room, the pitch can go a little bigger on desktop (max ~520px).
- **/play**: title `PLAY`. Intro: "Keepy-uppy. Click or tap the ball to keep it up, and don't let it hit the ground."
  - The game, taller on desktop (440px from `lg`). Keyboard hint as now.
  - Then an **Achievements** section listing all achievements inline (the same data and states as the dialog: unlocked shows title and description, locked shows ??? and the hint), with `n / 7` and the Reset button. It must update live when something unlocks.
- **/about**: title `OFF THE PITCH`. Intro: "Barça, games and bikes: what I'm up to when I'm not training models." Sections: About (the two paragraphs currently in Work, unchanged), Watching, Playing (+ gamertags), Riding. The three interest columns can stay as one section with three columns, as now.

---

## 7. Easter egg updates

- **New 7th achievement `tour`, "Full tour".** Description: "You visited every page on the site." Hint: "See every page." Each page records its key in localStorage `dy:visited` (JSON array) on mount. When all 6 pages are visited (home, work, projects, skills, play, about; not the 404), unlock `tour`. Update all `n/6` to use the list length (`n/7`).
- **Console:**
  - `ls` prints the pages (`home  work  projects  skills  play  about`).
  - `cd <page>` navigates there (`cd ~`, `cd /` and `cd home` go to `/`). An unknown page prints `cd: no such page: x`.
  - `play` now navigates to `/play`, and that page focuses the canvas when it loads with `#game` in the URL (`/play#game`).
  - Add `ls` and `cd` to `help`.
- Everything else stays as it is (Konami/retro, messi, siu, offside, devtools greeting).

---

## 8. Quality bar

Everything in PLAN.md section 10 still holds, per page. Plus:
- `pnpm build` produces all 7 HTML files: `dist/index.html`, `dist/work/index.html`, etc., and `dist/404.html`.
- Run `pnpm preview` and check every page in a browser at 1280px and 360px, in light, dark and retro. Click every nav link. Check there are no console errors. Check that `/work` (no trailing slash) works under `vercel.json` clean URLs (vite preview may not emulate this; at least confirm the `dist` structure and the config).
- The hero card has no overflow at 360px, and the 2 × 2 stats layout kicks in below 400px.
- The achievements count, Play hint and `tour` work across real page loads.
- Each page's main JS (shared chunk + page chunk) stays ≤ 95 KB gzipped.

## 9. Commits

One commit per step, each ending with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`:
1. Multi-page build and shared shell (pages render the existing sections, nav works)
2. Player-profile hero + scouting report
3. Home "Selected work" + "Around the site"
4. Subpage headers and content moves (work/projects/skills/play/about) + contact band
5. Easter egg updates (tour, ls/cd, play navigation) + sitemap, vercel.json, README
