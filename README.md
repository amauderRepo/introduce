# Intro — Bintang Fajar Putera Faza

Static personal site / portfolio. No build step, no dependencies — just open `index.html`.

- `index.html` — main page: content, structure, and the Writeups section
- `styles.css` — styling for the main page (light/dark theme via `data-theme`, rounded cards,
  responsive layout, print styles)
- `site.js` — shared behavior: theme toggle, mobile menu, scroll state, scroll-spy, scroll reveals
- `writeups/` — one detail page per writeup (e.g. `writeups/touch.html`)
- `writeups.css` — article styles used by the writeup detail pages
- `pipeline.css` — interactive Pipeline section styles (pipeline switcher, stage list,
  sticky detail panel, reference tables and checklists)
- `assets/writeups/<machine>/` — screenshots and box art for each writeup
- `favicon.svg`, `robots.txt` — site assets
- `CNAME` — custom domain for GitHub Pages: `portofolio.bintangfajar.my.id`

## Writeups

The main page shows a short review card per machine (`#writeups`); each card links to a full
detail page under `writeups/`. A detail page reuses `styles.css` + `site.js` and adds
`writeups.css` for the article prose, the terminal-style machine card, code blocks and
screenshots.

To add a writeup:

1. Copy its screenshots into `assets/writeups/<machine>/`.
2. Duplicate an existing page in `writeups/` (e.g. `touch.html`) and edit the content.
3. Add a `.writeup-card` to the `#writeups` grid in `index.html` linking to it.

## Pipeline

The `#pipeline` section on the main page holds all pipeline detail — there are no separate
pipeline pages. It uses the same interaction as the reference's methodology section: a
clickable stage list on the left, with a sticky detail panel on the right that shows the
selected stage's description, `Artifacts` and `Gate`.

A switcher above it covers three pipelines:

- **Vulnerability Assessment** — recurring, breadth-first lifecycle (11 stages).
- **Penetration Testing** — point-in-time, stage-gated engagement (9 stages).
- **Playing Labs** — the training loop that produces the writeups (8 stages).

Below the interactive area, each pipeline keeps its supporting reference material (standards,
scope, engagement models, tooling, KPIs, …) as tables and checklists. `pipeline.css` loads after
`styles.css`.

To change a pipeline, edit its `data-pipe="…"` panel in `index.html` (each `<button class="stage">`
on the left has a matching `<div class="detail">` on the right, in the same order).

## Theme

The site defaults to the visitor's system color scheme, with a manual toggle in the navbar that
persists to `localStorage` under the `theme` key (`light` / `dark`). An inline script in `<head>`
applies the theme before paint to avoid a flash. Scroll reveals only hide content while
JavaScript is running (`html.js`), so a no-JS visitor still sees everything.

## Local preview

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```
