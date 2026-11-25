# danwanth.vercel.app v2 — build plan

A replacement for the current portfolio at https://danwanth.vercel.app. Same person, same facts, completely different feel: a clean, typographic, hand-made-looking page, with football and gaming personality concentrated in one mini game and a set of hidden easter eggs tied together by an achievements system.

This file is the spec. Follow it. If something here turns out to be impossible or clearly wrong, make the smallest sensible change and note it in `README.md` under "Deviations from PLAN.md".

---

## 1. Goals

1. **Recruiter path in 10 seconds.** Who he is, what he does, where he is, how to reach him, where the resume is. All above the fold on desktop.
2. **Does not look AI-generated.** See section 2. This is the main design constraint.
3. **Personality, in the right places.** Football + gaming show up in: the "Starting XI" skills pitch, the Keepy-uppy mini game, and the easter eggs. Everything else stays calm and readable.
4. **Fast and solid.** Static site, tiny bundle, no layout shift, accessible, works at 360px wide.

Stack: **Vite + React 19 + TypeScript (strict) + Tailwind CSS v4** (`@tailwindcss/vite`). **pnpm only** (never npm/yarn). Static output deployed to the existing Vercel project.

---

## 2. Why the old site reads as AI slop, and the rule that replaces each tell

| Old site | New rule |
|---|---|
| Loading screen with a spinning "DY" monogram | No loader. Content is in the HTML and paints immediately. |
| Near-black page, neon lime + orange accents, blurred colour blobs, dotted grid overlay, gradient sheens | Warm paper background, ink text, **one** accent colour. **No gradients, blur, glow, glassmorphism or drop shadows anywhere** (the only exception is the retro-mode scanline overlay). |
| Rounded "glass" cards around everything | No cards. Content sits on the page, separated by 1px hairline rules and whitespace. |
| Pill badges for every skill and tag | Stacks written as plain mono text: `React · TypeScript · Supabase`. |
| Stat counters ("09+ Core technologies", "03 Featured builds") | Removed. Real numbers live inside sentences ("97% accuracy", "R² 0.938"). |
| Marketing copy ("polished digital experiences", "Let's build something sharp", "premium") | First person, specific, plain. Short sentences. No adjectives doing the work facts should do. |
| AI-generated cartoon avatar | No photo in v1. (Later: a real photo, optional.) |
| Every section = tiny coloured eyebrow + giant heading | One quiet, consistent section label style (see 3.4). |
| Icons on every list item | Icons only where they carry meaning. External links use the `↗` character. No icon library. |
| Hover lifts, glows, scroll-triggered fade-ins | No scroll animations. Hover = underline/colour change only. |

Also banned: emoji as UI, typing-effect headlines, cursor followers, parallax, bento grids, "Hi, I'm X 👋", gradient text, `Inter`/`Space Grotesk`/`Poppins`.

---

## 3. Design system

### 3.1 Colour tokens (CSS variables, exposed to Tailwind via `@theme`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `paper` | `#F3EFE6` | `#121110` | page background |
| `ink` | `#161513` | `#ECE7DD` | primary text |
| `muted` | `#6B665E` | `#9C968C` | secondary text, labels |
| `rule` | `#D8D1C4` | `#2B2926` | hairlines, pitch lines |
| `accent` | `#A11D3A` (garnet) | `#E36A82` | link hover, player discs, highlights, focus ring |
| `accent-ink` | `#FFFFFF` | `#121110` | text on accent |

Verify WCAG AA for `muted` on `paper` in both themes (adjust lightness if it fails). Selection colour: accent background, accent-ink text.

**Retro mode** (Konami code, section 7) overrides the same tokens with a 4-tone handheld-LCD green palette: `paper #9BBC0F`, `ink #0F380F`, `muted #306230`, `rule #8BAC0F`, `accent #0F380F`, `accent-ink #9BBC0F`.

### 3.2 Typography (self-hosted with Fontsource, no Google Fonts CDN)

- **Display: Archivo**, variable (`@fontsource-variable/archivo`). Use the width axis condensed (`font-stretch: 75%`–`80%`) at weight 800 for the name and big numbers. Check `node_modules/@fontsource-variable/archivo` for a `wdth.css` (or similar) that includes the width axis. If the width axis isn't available, use `@fontsource/archivo-narrow` 700 instead.
- **Body: IBM Plex Sans** 400 / 500 / 600 (`@fontsource/ibm-plex-sans`).
- **Mono: IBM Plex Mono** 400 / 500 (`@fontsource/ibm-plex-mono`) for dates, stacks, labels, the console and small metadata.
- **Retro mode only: Press Start 2P** (`@fontsource/press-start-2p`), loaded with a dynamic `import()` the first time retro mode turns on, never in the initial bundle.

Scale: body 17px / 1.65 (16px on mobile). Small 14px. Mono labels 12–13px, uppercase, letter-spacing 0.08em. Hero name `clamp(3.25rem, 11vw, 7.5rem)`, uppercase, line-height 0.9, condensed: it should look like the name printed on the back of a football shirt.

### 3.3 Layout

- Outer container `max-w-6xl`, horizontal padding 20px mobile / 32px desktop.
- **Section grid:** on `lg+`, a 12-column grid. Columns 1–3 hold the section label, columns 4–12 hold the content. Below `lg`, the label stacks above the content. Text measure stays ≤ 68ch.
- Sections are separated by a 1px `rule` top border and generous vertical padding (`py-16` mobile, `py-24` desktop).
- Header: not sticky, no blur. Left: "Danwanth Yogesh" in Archivo condensed. Right: anchor links `Work · Projects · Play · Contact` + theme toggle. On mobile, keep the links in one line, smaller. Don't use a hamburger unless it truly doesn't fit at 360px.
- Max one accent-coloured element per viewport, roughly. Restraint is the look.

### 3.4 Section label

Mono, 12–13px, uppercase, muted: `01 — Work`. Numbering is the only decoration.

### 3.5 Interaction and motion

- Links: ink text with a 1px underline in `rule` colour, offset 4px. On hover the underline and text go `accent`. Transitions 150ms, colour only.
- Focus: `outline: 2px solid var(--accent); outline-offset: 3px` on every interactive element. Never remove focus styles.
- No entrance or scroll animations. The only animations on the site are the game, the achievement toast, the console drop-down and the "messi" ball roll. All except the game are disabled under `prefers-reduced-motion: reduce`.

### 3.6 Favicon

`public/favicon.svg`: a simple garnet disc with "D" in paper colour (or a minimal line-drawn football). Also add `<meta name="theme-color">` for both schemes.

---

## 4. Information architecture

Single page with anchors, plus a real 404 page.

```
Header
01 — Intro        (#top: hero, no label shown)
02 — Work         (#work: about + experience + education + achievements)
03 — Projects     (#projects)
04 — Starting XI  (#skills)
05 — Play         (#play: Keepy-uppy)
06 — Off the pitch (#interests)
07 — Contact      (#contact)
Footer            (achievements counter, hint)
/404              (Offside page, a separate build entry)
Overlays: dev console (~), achievement toasts, achievements dialog, retro-mode exit button
```

---

## 5. Content (all of it lives in `src/data/site.ts`; components only render)

Source of truth: the current site plus the Nov 2026 resume. Copy below is drafted. Keep the tone: plain, specific, first person. **Do not put the phone number anywhere on the page.**

### 5.1 Profile / links

- Name: Danwanth Yogesh
- Email: danwanthyog@gmail.com
- GitHub: https://github.com/Danwanth
- LinkedIn: https://linkedin.com/in/danwanth/
- Instagram: https://www.instagram.com/danwanth/
- Resume: `/resume.pdf` (already copied into `public/`)
- Location: Kochi, Kerala, India (IST, UTC+5:30)

### 5.2 Hero

- Name (display): **DANWANTH YOGESH**
- Line 1 (body, ~22px, ink): "I build machine learning models and the software around them."
- Line 2 (body, muted): "Final-year Computer Science student at Rajagiri School of Engineering and Technology, Kochi. Most recently an AI/ML intern at Simelabs. Open to AI/ML and software engineering roles."
- Link row (mono): `Resume ↗` · `GitHub ↗` · `LinkedIn ↗` · `danwanthyog@gmail.com`
- Small status line (mono, muted): `Kochi · 21:04 IST`, a live local clock that updates every 30s, rendered client-side.

### 5.3 Work (#work)

About, two short paragraphs:

> I'm in my final year of B.Tech CSE at RSET (CGPA 8.56). I like the whole path from a messy dataset to something a person can actually click on: cleaning, modelling, evaluating, then building the app around it.
>
> This summer at Simelabs I trained models on healthcare, retail and product-formulation data and built a RAG chatbot over the company website. Before that I won HackSUS with a carpooling app and spent a summer writing Flask apps at Digispoc.

Experience list. Each entry: mono date on the left (or top on mobile), role + company, muted location, then bullets.

1. **AI/ML Intern, Simelabs**, Kochi, May–Jun 2026
   - Built and tuned classification, regression and clustering models on healthcare, retail and product-formulation data with Scikit-learn and XGBoost. Best results: 97% accuracy, R² 0.938.
   - Built a RAG chatbot that indexes the company website in a vector database and answers questions through the Gemini API.
   - Segmented customers by RFM with K-Means, hierarchical clustering and DBSCAN to find high-value and at-risk groups.
2. **Software Development Intern, Digispoc Technology**, Chennai, May–Jun 2024
   - Built Flask web apps on MySQL, including the schema and multi-user workflows.
   - Optimised queries and set up Apache/XAMPP environments, which made testing more reliable.

Education (same row style): **B.Tech, Computer Science and Engineering, Rajagiri School of Engineering and Technology**, 2023–2027 (expected), CGPA 8.56/10.

Also (small list): Winner, HackSUS Hackathon (ReturnLoop) · NPTEL Python for Data Science (2025) · NPTEL Cloud Computing (2026) · Cyber Security Workshop, RSET (2025).

### 5.4 Projects (#projects)

A list, not cards. Each item: mono meta line (`2026 · React · TypeScript · Supabase`), title in Archivo (~28px, normal width, 700), one-sentence summary in ink, 1–2 sentences of detail in muted, then links (`Live ↗`, `Code ↗`). Hairline between items. The title itself links to the primary link.

1. **Kards** (2026): "An anonymous real-time chat where every live conversation becomes a summary card."
   Detail: "Built on Supabase Realtime. A summarizer runs every 20 seconds, filters spam and writes headline summaries with GPT-4o mini, and an assistant called Densel reads the room and suggests replies so newcomers can jump in."
   Stack: React · TypeScript · Supabase · OpenRouter. Live: https://kards-hacksus.vercel.app/ · Code: https://github.com/Danwanth/Kards-Hacksus
2. **Gesture whiteboard for dysgraphia** (2026): "Write in the air with your finger; a CNN reads the letters."
   Detail: "MediaPipe hand tracking turns finger movement into strokes, with gesture erasing. A CNN trained on 47-class EMNIST (91.4% validation, 90.8% test) runs in the browser with TensorFlow.js, and a practice mode checks letters and words against a target."
   Stack: Python · TensorFlow · MediaPipe · React · TensorFlow.js. Code: https://github.com/Danwanth (TODO: exact repo URL)
3. **ReturnLoop** (HackSUS winner): "A carpool platform that matches riders and drivers going the same way."
   Detail: "Won the HackSUS hackathon. Route matching, clean trip flows and location-aware data."
   Stack: React · Express · MySQL. Code: https://github.com/Danwanth (TODO: exact repo URL)
4. **Car price predictor** (2026): "Estimates a used car's price from its specs."
   Detail: "Compared four regressors on 8,000+ listings. Random Forest won with R² 0.938 (cross-validated above 0.91). Handles missing values, outliers, skew and categorical encoding."
   Stack: Python · Scikit-learn · XGBoost · Streamlit. Live: https://dancarpricepred.streamlit.app/ · Code: https://github.com/Danwanth/Car-Price-Predictor
5. **Formulation analysis** (2026): "Predicting lab, sensory and quality outcomes for sunscreen and shampoo formulas."
   Detail: "Regression and classification pipelines on 6,000+ formulation records. XGBoost reached 97.0% accuracy and 94.4% balanced accuracy on quality, with SMOTE for class imbalance."
   Stack: Python · Scikit-learn · XGBoost · Pandas. (No public link; omit the links row.)

Mark every unverified repo URL with a `// TODO: confirm repo URL` comment in `site.ts`.

### 5.5 Starting XI (#skills): the signature section

Label `04 — Starting XI`. Intro line: "My stack, lined up in a 4-3-3. Hover or tap a player."

A **vertical, line-drawn football pitch** (attack at the top) in SVG: `rule`-coloured 1.5px strokes on the paper background (no green grass). Include the halfway line, centre circle, both penalty boxes, six-yard boxes, penalty spots and arcs. Proportions 68 × 105. Max width ~460px on desktop, full width on mobile.

Players are **HTML `<button>`s absolutely positioned over the SVG** (percent coordinates, so they're focusable and accessible): a 34–40px accent disc with the shirt number in `accent-ink` mono, and the skill name under it in mono 12px ink. A small "C" armband marker on the captain.

| Pos | No. | Skill | Role line (shown when selected) |
|---|---|---|---|
| GK | 1 | Git | "Last line of defence. Nothing ships without it." |
| LB | 3 | Supabase | "Auth, Postgres and realtime without running a server." |
| CB | 4 | SQL | "Holds the back line. MySQL and Postgres." |
| CB | 5 | Flask | "Reliable, no-nonsense Python backends." |
| RB | 2 | Node.js | "Gets up and down the wing: Express APIs and tooling." |
| CM | 8 | React | "Builds everything people actually click on." |
| CM | 10 (C) | Python | "Captain. Every model and most backends start here." |
| CM | 6 | TypeScript | "Keeps the shape. Catches mistakes before they happen." |
| LW | 11 | Scikit-learn | "The everyday finisher: classification, regression, clustering." |
| ST | 9 | XGBoost | "Top scorer: 97% accuracy on formulation data." |
| RW | 7 | RAG & LLMs | "Embeddings, vector DBs and the Gemini API." |

**Bench** (a mono line under the pitch): TensorFlow/Keras · OpenCV · MediaPipe · Pandas · NumPy · Express · Streamlit · Gemini API · Pinecone · ChromaDB · Java · C · Postman · Google Colab.

Behaviour: hovering, focusing or tapping a player selects it. Selected disc gets a ring. A caption line under the pitch (with `aria-live="polite"`) reads `No. 10 · Python (captain): Every model and most backends start here.` Default selection is Python. Arrow keys are not required; Tab order follows the formation (GK → defence → midfield → attack).

Under that, a plain **"Full list"** paragraph for recruiters/ATS: Languages: Python, SQL, JavaScript, TypeScript, Java, C. ML: Scikit-learn, XGBoost, Pandas, NumPy, Matplotlib, Seaborn. GenAI: RAG, embeddings, Pinecone, ChromaDB, Gemini API. CV: OpenCV, MediaPipe, CNNs, TensorFlow/Keras. Web: React, Node.js, Express, Flask, Streamlit, REST APIs, MySQL, Supabase. Tools: Git, Postman, VS Code, Colab.

### 5.6 Play (#play): Keepy-uppy (see section 6)

Label `05 — Play`. Intro: "Keepy-uppy. Click or tap the ball to kick it up, and don't let it hit the ground. Keyboard: focus the pitch and press Space when the ball is low."

### 5.7 Off the pitch (#interests)

Three short columns on desktop (stacked on mobile), each with a mono label and plain text, no badges:

- **Watching:** FC Barcelona. Favourites, past and present: Messi, Neymar, Kaká, Pedri, Yamal.
- **Playing:** Valorant, Minecraft, Assassin's Creed, Forza Horizon, Ghost of Tsushima, the Batman: Arkham series, eFootball and FIFA (not FC; never FC). Then, in mono: `Valorant  Danwanth#sesky` / `Xbox  Danterminater` / `eFootball  Danwanth`.
- **Riding:** "I ride a Royal Enfield Interceptor 650 and drive a Suzuki Swift. Dream garage: Ducati Panigale V4, Triumph Rocket 3 GT, Honda Africa Twin, Porsche 911, Mercedes-Benz GLS."

### 5.8 Contact (#contact)

- One line: "Email is the fastest way to reach me. I usually reply within a day or two."
- The email address large (Archivo, ~clamp(1.75rem, 5vw, 3rem)), as a `mailto:` link, followed by a small mono **Copy** button that copies it to the clipboard and changes to "Copied" for 2s.
- Then: LinkedIn ↗ · GitHub ↗ · Instagram ↗, and `Kochi, Kerala` in muted.

### 5.9 Footer

Mono, small, muted, one or two lines:
`© 2026 Danwanth Yogesh · React, TypeScript, Tailwind · Hosted on Vercel`
`Achievements 2/6` (a button that opens the achievements dialog) · `Some things on this page are hidden.`

---

## 6. Mini game: Keepy-uppy

### 6.1 Files

- `src/game/engine.ts`: pure TypeScript, no DOM or React. State, a fixed-timestep `step(dt)`, `kick(pointerX, pointerY)`, `kickKeyboard()`, events (touch, milestone, gameOver).
- `src/game/draw.ts`: canvas rendering of a given state.
- `src/components/KeepyUppy.tsx`: canvas, the rAF loop, input, the HTML overlay (score, best, commentary), localStorage, achievements hooks.

### 6.2 Canvas

- Width 100% of the content column, height 380px (desktop) / 320px (<640px). Handle `devicePixelRatio` and resize (ResizeObserver).
- Draw on the paper colour (read the CSS variables at draw time so theme and retro mode apply). Draw a ground line (ink, 2px) at the bottom with a few short grass ticks in `rule` colour. The ball is a classic football: an ink-stroked circle, paper fill, a central pentagon and partial edge pentagons in ink, rotated by its angle. A soft ink ellipse "shadow" on the ground under the ball that shrinks as the ball rises (a flat ellipse, not a blur).
- The canvas has `tabIndex=0`, `role="application"` and an `aria-label` describing the controls. Visible focus ring.

### 6.3 Physics (tune by playing; these are starting values in CSS px at 380px height)

- Fixed timestep 1/120 s with an accumulator; clamp frame dt to 50ms.
- Ball radius `r = 22` (scale with canvas height: `r = h * 0.058`).
- Gravity `g = 1900 px/s²`, rising 4% every 10 touches, capped at +40%.
- **Kick (pointer):** on `pointerdown`, if the distance from the pointer to the ball centre ≤ `hitRadius` (starts at `2.0 × r`, shrinks 0.05r every 10 touches, minimum `1.3 × r`): set `vy = -(880 + random 0–80)`; `vx += (ballX - pointerX) * 14`, clamped to ±650; `spin += vx * 0.015`; `touches++`. Clicking the left side of the ball sends it right, and vice versa.
- **Kick (keyboard):** Space/Enter while the canvas is focused kicks straight up (with small random vx ±60), only if the ball is in the lower 45% of the canvas and falling. Otherwise ignore. This makes it a timing game.
- Horizontal drag `vx *= 0.996` per step. Spin decays 0.99 per step and also follows vx slightly.
- Walls: bounce with restitution 0.75. Ceiling: if `y < r`, set `y = r` and `vy = abs(vy) * 0.4`.
- Ground: when the ball touches the ground while playing, the state becomes `over`. The ball does two small damped bounces and settles (visual only).
- States: `idle` (ball resting on the ground, overlay "Click the ball to start"; the first kick starts the game and counts as touch 1), `playing`, `over` (overlay "Dropped it. 14 touches." + "Best 22" + "Play again" button; clicking the canvas or the button resets to playing with the ball dropped from 40% height).
- Pause the loop when the canvas is off-screen (IntersectionObserver) or the tab is hidden. Cap at 60 renders/s.

### 6.4 Overlay and commentary (HTML over the canvas, top-left, mono)

- Score: big Archivo condensed number top-left. `Best 22` small next to it. Best is stored in localStorage `dy:keepy-best`.
- One commentary line that updates on milestones (`aria-live="polite"`):
  - 1: "And we're off."
  - 5: "Five. Warming up."
  - 10: "Ten. A proper number 10 performance."
  - 25: "Twenty-five. The crowd is on its feet."
  - 50: "Fifty. Okay, you've done this before."
  - 100: "A hundred. Go outside."
  - New best (once per game, when touches exceeds the previous best and previous best ≥ 5): "New personal best."
  - Game over, random pick: "Gravity wins again." / "VAR confirms: it touched the ground." / "The ball has left the chat." / "Unlucky. Go again."
- Achievements: touch 1 → `first-touch`; touch 10 → `number-ten`.

---

## 7. Easter eggs and achievements

### 7.1 Achievements system (`src/lib/achievements.tsx`)

- Static list of 6 achievements `{ id, title, description, hint }`. Unlocked ids are stored in localStorage `dy:achievements` (JSON array). All localStorage access is wrapped in try/catch (private mode).
- React context with `unlock(id)` and `unlocked: Set<string>`. `unlock` is a no-op if already unlocked. Otherwise it saves and shows a toast.
- **Toast** (bottom-left, max-w 340px): ink background, paper text, no shadow, 1px border. A mono label `ACHIEVEMENT UNLOCKED` with a tiny inline SVG trophy, then the title in Archivo, then the description in small text. Slides up 8px and fades in. Auto-dismisses after 4.5s and can be closed with a ✕ button. Queue them if several fire together. `role="status"`.
- **Dialog** (native `<dialog>`, opened from the footer counter and the console `achievements` command): lists all 6. Unlocked ones show the title and description. Locked ones show "???" and the hint in muted text. Shows `n / 6` and a "Reset" text button (with a confirm) that clears achievements and best score.

| id | Title | Description (after unlock) | Hint (before unlock) | Trigger |
|---|---|---|---|---|
| `first-touch` | First touch | "You kicked the ball." | "There's a ball on this page." | Keepy-uppy touch 1 |
| `number-ten` | Number 10 | "Ten keepy-uppies in a row." | "Get to double figures." | Keepy-uppy touch 10 |
| `konami` | Up, up, down, down | "The old code still works. Welcome to retro mode." | "Some codes never expire." | Konami code |
| `console` | Developer console | "Gamers know where the console key is." | "Press the key under Esc." | Open the console |
| `goat` | The GOAT | "Typed his name. Respect." | "Type the name of the greatest." | Typing `messi` |
| `offside` | Offside | "You went somewhere that doesn't exist." | "Try a page that isn't there." | Visiting the 404 page |

### 7.2 Key listener (`src/lib/useKeyEggs.ts`)

One global `keydown` listener. **Ignore events when the target is an `input`, `textarea`, `select` or contenteditable** (except the console's own input, which handles its own keys), and ignore events with Ctrl/Meta/Alt held.

- **Konami:** buffer the last 10 `event.key` values (lowercased). Match `arrowup arrowup arrowdown arrowdown arrowleft arrowright arrowleft arrowright b a` → toggle retro mode, unlock `konami`.
- **Typed words:** buffer the last 12 letters. Ending in `messi` → unlock `goat` and play the ball-roll effect. Ending in `siu` → show a plain toast (not an achievement): "Wrong club. Wrong player." Each word fires at most once per 5 seconds.
- **Console:** `` ` `` or `~` toggles the console and unlocks `console`.

### 7.3 Retro mode (Konami)

- Sets `data-retro` on `<html>` and persists it in localStorage `dy:retro`. Applied before first paint by the same inline script as the theme.
- CSS under `[data-retro]`: the LCD palette tokens (3.1); every font becomes "Press Start 2P" with `html { font-size: 12px }` and line-height 1.8 so it stays readable; border-radius 0 everywhere; a fixed, pointer-events-none scanline overlay (`repeating-linear-gradient` 0 to 2px transparent, 2 to 3px at 6% opacity). The hero name keeps its size.
- A small fixed top-right button `Exit retro mode` while active (the Konami code or the console's `retro` command toggles it too).
- The game automatically uses the palette, because it reads CSS variables.

### 7.4 Dev console (`src/components/Console.tsx`)

- A panel that drops from the top (height 45vh, max 420px, full width), ink background, paper text, mono 14px, 1px bottom border in accent. It animates `translateY` (instant under reduced motion).
- Output log plus an input line with the prompt `guest@danwanth:~$`. Focus the input on open and restore the previous focus on close. Close with Esc, `` ` `` or `~`, or a close button. `role="dialog"`, `aria-label="Developer console"`.
- Command history with ArrowUp/ArrowDown. Tab-completes command names.
- First lines on open: `Danwanth OS v2.0. Type 'help' for commands.`
- Commands (case-insensitive, trimmed):
  - `help`: lists the commands below with one-line descriptions (hide the joke commands).
  - `whoami`: "Danwanth Yogesh. Final-year CSE student at RSET, Kochi. AI/ML, Python, React. Barça fan."
  - `projects`: project names with links (rendered as real `<a>` tags).
  - `gamertags`: Valorant `Danwanth#sesky`, Xbox `Danterminater`, eFootball `Danwanth`.
  - `socials`: email, GitHub, LinkedIn, Instagram links.
  - `resume`: opens `/resume.pdf` in a new tab and prints "Opening resume…".
  - `play`: closes the console and scrolls to `#play`, then focuses the canvas.
  - `retro`: toggles retro mode (does NOT unlock `konami`; print "Tip: there's a cheat code for the achievement.").
  - `theme light` / `theme dark`: switches the theme.
  - `achievements`: prints `n/6` and opens the dialog.
  - `clear`: clears the output.
  - `exit`: closes the console.
  - Hidden jokes: `sudo hire danwanth` → "Permission granted. Opening your mail client…" then opens `mailto:` with subject "Let's talk". `sv_cheats 1` → "Cheats are not enabled on this server." `noclip` / `god` / `iddqd` → "Nice try." `sudo rm -rf /` → "Red card. Straight off."
  - Unknown: `command not found: <x>. Try 'help'.`

### 7.5 "messi" ball roll

A small football SVG (the same drawing as the game) rolls along the bottom of the viewport from left to right over 2.4s, rotating as it goes, then disappears. pointer-events none, fixed, z-index above content. Skip the animation under reduced motion (only the toast shows).

### 7.6 Offside 404 page

- A second Vite entry: `404.html` → `src/notfound.tsx` → `<NotFound/>`, built to `dist/404.html`. Vercel serves it with a 404 status for unknown paths. **Do not add a catch-all SPA rewrite** in `vercel.json`.
- Same header and footer, same tokens, the theme/retro init script included.
- Content: the mono label `VAR REVIEW`, then a big Archivo condensed `OFFSIDE.`, then "We checked the lines. The page you're looking for was in an offside position." A simple SVG under it: a strip of pitch with two vertical offside lines (one accent, one ink) and two dot "players", one slightly past the line. Then a link button `Back to the halfway line ↗` to `/`.
- On mount: unlock `offside`.

### 7.7 DevTools greeting

On load (once), `console.log` two styled lines: a bold "Hey, you opened DevTools." and "Try pressing ~ on the page, or remember an old cheat code." Nothing else in the console. There must be zero errors and warnings in a production build.

---

## 8. Theming

- `class="dark"` on `<html>` drives dark mode. Tailwind v4: `@custom-variant dark (&:where(.dark, .dark *));`.
- Initial theme: localStorage `dy:theme`, otherwise `prefers-color-scheme`. An **inline script in `<head>`** (in both `index.html` and `404.html`) applies `dark` and `data-retro` before paint, so there's no flash.
- Header toggle: a text button `Light` / `Dark` in mono (not a sun/moon icon), with an `aria-label`.
- All colours come from the tokens. Components never hard-code hex values (the game and the SVGs read CSS variables / `currentColor`).

---

## 9. Project structure

```
danwanth-site/
  index.html              # main entry: meta, OG tags, theme/retro init script
  404.html                # Offside entry
  vite.config.ts          # react + tailwind plugins, multi-page input {main, 404}
  vercel.json             # framework vite, cache headers for /assets; NO SPA rewrite
  public/
    resume.pdf            # already present
    favicon.svg
    robots.txt
  src/
    main.tsx
    notfound.tsx
    App.tsx
    index.css             # @import "tailwindcss"; @theme tokens; base; dark; retro
    data/site.ts          # every piece of content
    components/
      Header.tsx  Footer.tsx  Section.tsx  ThemeToggle.tsx
      Hero.tsx  Work.tsx  Projects.tsx  StartingXI.tsx  Pitch.tsx
      Play.tsx  KeepyUppy.tsx  OffThePitch.tsx  Contact.tsx
      Console.tsx  AchievementToasts.tsx  AchievementsDialog.tsx
      BallRoll.tsx  RetroExit.tsx  NotFound.tsx  LocalClock.tsx
    game/
      engine.ts  draw.ts
    lib/
      achievements.tsx  useKeyEggs.ts  theme.ts  retro.ts  storage.ts
  PLAN.md  README.md
```

**Dependencies (only these):** react, react-dom, @fontsource-variable/archivo (or @fontsource/archivo-narrow), @fontsource/ibm-plex-sans, @fontsource/ibm-plex-mono, @fontsource/press-start-2p. **Dev:** vite, @vitejs/plugin-react, typescript, @types/react, @types/react-dom, tailwindcss, @tailwindcss/vite. No UI kits, no shadcn, no framer-motion, no icon libraries, no router.

`index.html` meta: title `Danwanth Yogesh: AI/ML and software engineer`, description "Final-year CS student in Kochi building machine learning models and the software around them.", canonical `https://danwanth.vercel.app/`, OG title/description/url, `theme-color`, `lang="en"`.

---

## 10. Quality bar (must all be true before calling it done)

- `pnpm build` passes with zero TypeScript errors (strict mode, `noUnusedLocals`).
- No console errors or warnings in the browser (dev or preview).
- Main JS ≤ 90 KB gzipped (Press Start 2P is lazy-loaded).
- No horizontal scroll at 360px. Header, pitch, game and console all usable at 360px wide and with touch.
- Keyboard: everything reachable by Tab with a visible focus ring. The console and dialog trap or restore focus properly. Esc closes overlays.
- Lighthouse (desktop): Accessibility 100, Best Practices 100, SEO 100, Performance ≥ 95.
- The easter eggs never trigger while typing in a field. Retro mode and dark mode both look intentional, with no unreadable text.
- Re-read section 2 against the finished page. If anything looks like a template, fix it.

---

## 11. Milestones (one git commit each)

Commit trailer for every commit: `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`

- **M1** Scaffold (Vite React TS by hand or via create-vite into a temp folder, because this folder isn't empty), Tailwind v4, fonts, tokens, theme init script, Header/Footer/Section, theme toggle.
- **M2** Content sections from `site.ts`: Hero (+ clock), Work, Projects, Off the pitch, Contact (+ copy button).
- **M3** Starting XI pitch.
- **M4** Keepy-uppy engine, renderer and component.
- **M5** Achievements: context, toasts, dialog, footer counter. Wire the game achievements.
- **M6** Easter eggs: key listener, Konami/retro mode, console, messi/siu, ball roll, DevTools greeting.
- **M7** Offside 404 entry, meta/OG, favicon, robots.txt, vercel.json, a11y + responsive pass, README.
- **M8** (done by the lead, not the builder) Deploy to Vercel production.

---

## 12. Deployment (lead only; builders must NOT deploy or push)

- Vercel team `danwanthyog-4207s-projects`, project **`personal-website`** (`prj_7XdWQyu4ciOQ4NCNKuWNMPOzc8i4`), framework preset Vite, build `pnpm build`, output `dist`. Production domain **danwanth.vercel.app**.
- Rollback point: the current production deployment `dpl_HwrfYKCbm6fmp5je6hemRtY9FU1o` (old site). Instant rollback from the Vercel dashboard if needed.
- The project is Git-connected to `github.com/Danwanth/Personal_Website`. A future push to that repo would redeploy the **old** site over the new one. Follow-up: push this code to that repo (or a new repo and relink) so Git deploys keep working.

## 13. Later (out of scope for v1)

Real photo · generated OG image · a second game (penalty shootout) · short notes/blog · Vercel Analytics · exact repo links for the whiteboard and ReturnLoop.
