# introduce

Let me introduce Project—as the name suggests—as a way to introduce myself.

A one-page introduction for **Bintang Fajar Putera Faza**, cybersecurity engineer. Content originated from the `/about` page of the Amauder portfolio (`lom-inspired-web`); the design was written from scratch afterwards and no longer shares anything with that project's theme.

Static HTML and CSS, no build step, no dependencies, no JavaScript.

## Deploy to GitHub Pages

No build step. The site is two files of static output, so push and enable Pages.

The remote already exists and already carries the initial commit:

```bash
cd intro-about
git remote add origin git@github.com:amauderRepo/introduce.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source → Deploy from a branch → `main` / `root`**, wait for the green check, and the site is live at `https://amauderRepo.github.io/introduce/`.

There is no workflow file and nothing to build. GitHub Pages serves the repo root as-is.

Asset paths in `index.html` are relative (`styles.css`, not `/styles.css`) so the page works from the `/introduce/` subpath that project sites use. If you later add a custom domain, the paths stay correct either way.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The entire page. Content is static HTML, no templating. |
| `styles.css` | Design tokens and all layout. |
| `favicon.svg` | `B` monogram in the display serif, over the accent rule. |
| `robots.txt` | Allows all crawlers. |

## Design

**Light technical document on blueprint paper.** Warm paper, near-black ink, one vermilion accent. The page is built to read like an engineering drawing rather than a security-themed landing page.

Graphic layer (the "drawing sheet" language):

- **Grid substrate** (`.sheet`) — two scales, 24px at 0.07 alpha and 120px at 0.045, so the grid reads as material, not content. A fixed layer behind everything. Keep it under 0.08: above that, lines start competing with text.
- **Crop marks** (`.crop`) — L-shaped marks in all four corners marking the print boundary.
- **Margin rail** (`.rail`) — vertical document metadata (`Sheet 01 / 01`, `Scale 1:1`, `Rev A`) pinned to the viewport edge. Hidden below `66rem` so it never collides with content.

### Section order

The hero carries no number: numbering belongs to the seven data sections below it.

| # | Section | Component |
| --- | --- | --- |
| 01 | Work Experience | `.log` |
| 02 | Projects | `.log` |
| 03 | Organization | `.log` |
| 04 | Education | `.log` |
| 05 | Awards & Recognition | `.matrix` / `.chip` |
| 06 | Skills | `.matrix` / `.chip` |
| 07 | Contact | `.channels` / `.channel` |

**One `.log` component serves four sections.** Work Experience, Projects, Organization, and Education all have the same data shape — period, title, affiliation, bullet points — so they share a single implementation and cannot drift apart visually. Adding an eighth log-based section needs no new CSS.

**Awards & Recognition is grouped by issuing body**, so four certifications collapse into three rows instead of four repeated pairs. The issuer is the row key; the chip never repeats it.

Typographic system:

- **Three tiers.** Display serif for the name, the tagline, job titles, and channel names (`--font-display`); system sans for prose; monospace for labels, dates, and handles.
- **Three line weights, not one.** Line weight is the drawing language, so weight carries meaning:

  | Token | Weight | Marks |
  | --- | --- | --- |
  | `--rule` | 1px, `#c6c3b7` | dividers *inside* a section — matrix rows, log entries, contact rows |
  | `--rule-bold` | 2px, `#8b887c` | section boundaries: the `border-top` on every `.section`, the intro block's left rule, and the logo tiles |
  | `--rule-strong` | 2px, `#191917` | page furniture: the letterhead rule, and the log bullet marks |

  Internal dividers stay hairline on purpose. If a row divider were as heavy as the section rule, the eye would read two dozen competing lines instead of seven clean sections.
- **Justified prose** (`text-align: justify`) on exactly two selectors: `.hero__intro p` and `.log__points li` — the only running-text blocks on the page. Headings, the tagline, mono labels, chips, and the short affiliation lines stay left-aligned, because justifying a line that holds one or two words stretches the spacing badly and leaves a ragged right edge on a short block.
- **Hyphenation is required, not decorative.** The justify rule also sets `hyphens: auto`. Without it, justification fills every gap with space and the middle lines break into rivers, worst of all at narrow measures. This relies on `<html lang="en">` for the browser's dictionary — change the `lang` if the page's language changes, or the hyphenation will be wrong.
- **Text width equals rule width.** There is deliberately no `max-width` in `ch` on any prose block: `.hero__intro`, `.log__points li`, `.section__lead`, and `.hero__role` all run the full `.page` column, so every text right edge lands flush with the section rules, matrix borders, and log borders. The old `--measure: 68ch` token is gone for exactly this reason. Lines get long as a result, and `hyphens: auto` is what keeps that readable.
- **The tagline is the one deliberate exception.** `.hero__tagline` stays at `30ch`. It is a display pull quote using `text-wrap: balance`, and balancing needs a narrow measure to split the sentence into two even lines; given the full column it would collapse to a single long line that hangs short of the rule.
- **Accent discipline.** `--accent` marks section numbers, the short rule under the name, the tagline, and the log period on narrow screens. Chips and contact rows go vermilion on hover.
- **Locked data columns.** `.matrix__row` and `.log__entry` both use `grid-template-columns: 9rem 1fr` so every value starts on the same vertical line. Below `34rem` the key drops to its own row.

Contact section:

- **App icons, not text links.** `.channel__mark` holds an inline `<svg>` of the real platform mark (WhatsApp, LinkedIn) at `viewBox="0 0 24 24"`. Paths are verbatim from [Simple Icons](https://simpleicons.org).
- **Icons are inlined, not linked.** No icon font, no sprite sheet, no CDN `<img>`. This keeps the page at zero third-party requests.
- **Monochrome by default.** Each glyph is filled with `var(--ink)` and turns `--accent` on hover. Full-colour brand marks would fight the single-accent palette; the silhouette is still identifiable, and it prints.
- **Each SVG is `aria-hidden` and `focusable="false"`**, with the platform name as visible text next to it, so the accessible name comes from real text rather than the graphic.

Behaviour:

- **No webfonts, no analytics, no cookies, no JavaScript.** Zero third-party requests; the page works with scripts disabled.
- **Print stylesheet** removes the grid, crop marks, and rail entirely, drops the accent to black, forces the channel logos to black so they survive a mono printer, hides the skip link, and sets `break-inside: avoid` so no section, log entry, matrix row, or channel row splits across a page.

Content is a static copy of your Amauder `/about` data. If you change roles or skills there, this page does not update on its own.

## Removed content

An earlier draft had a **Findings** section listing the eleven production systems where vulnerabilities were found and reported: Universitas Airlangga, Universitas Teknokrat, Universitas Brawijaya, Komisi Penyiaran Indonesia, PT Transjakarta, KOMINFO Kota Makassar, Diskominfo Kab. Wonosobo, Diskominfo Kota Cimahi, Diskominfo Kota Probolinggo, Diskominfo Kota Pekalongan, Diskominfo Kota Pontianak.

That list was dropped when the section was renamed **Awards & Recognition** and refilled with certifications — vulnerability disclosures do not belong under a heading that frames them as recognition. The names are recorded here so they are not lost, and the project work that led to them is now visible in **Projects** instead. To bring the list back, give it its own section rather than folding it into Awards.

> **Before publishing anything like that list again:** those are other people's production systems and several are government agencies with disclosure policies that may restrict publication. Confirm you have permission per institution first.

## Accessibility

- Skip link to `#main-content`, and `<main tabindex="-1">` so the skip link actually moves focus. The outline on `main` is suppressed because focus lands there programmatically rather than by pointer.
- One `<h1>`, seven `<h2>` sections with `aria-labelledby`, and an `<h3>` per log entry.
- The four log-based sections are `<ol>` because each is a dated sequence, newest first. Contact is a `<ul>` because each row is a single self-contained action, not a term paired with a value. Both keep their structure for screen readers.
- Platform logos are `aria-hidden="true"` with `focusable="false"`, so the link's accessible name is the visible text — `WhatsApp`, `LinkedIn` — not a graphic.
- External links carry `rel="noreferrer noopener"`, and the `↗` glyph is `aria-hidden` since it duplicates the URL's destination.
- `prefers-reduced-motion` collapses transitions; there is no animation to disable otherwise.

## Updating the content

Everything lives in `index.html`:

- Intro: paragraphs inside `.hero__intro`. First paragraph has no top margin, later ones use the `p + p` rule.
- Work Experience, Projects, Organization, Education: one `.log__entry` per item. `.log__when` holds the period, `.log__what` the title, affiliation, and bullet points. The `<ol>` numbering is suppressed by CSS, so add entries newest-first and the visual order follows.
- Awards & Recognition: one `.matrix__row` per issuing body, key in `.matrix__key`, one `.chip` per certification. Do not repeat the issuer inside the chip.
- Skills: one `.matrix__row` per category, label in `.matrix__key`, items as `.chip`.
- Contact: one `.channels__item` per platform, holding a `.channel` link made of `.channel__mark` (the SVG tile), `.channel__text` (name plus handle), and `.channel__ext` (the `↗`).

### Adding a contact platform

Copy an existing `.channels__item` and swap three things: the `href`, the visible text, and the SVG path. To get a path, look the platform up on [Simple Icons](https://simpleicons.org), copy the `d` attribute out of the source SVG, and keep the `viewBox="0 0 24 24"`. Nothing else needs to change — `.channel__mark svg` sizes and fills it.

If you re-add an email address, use a `mailto:` href; there is no mail icon for that in this set, so a hand-drawn envelope is the one case worth designing rather than copying.

## Local preview

Any static server works:

```bash
python3 -m http.server 8000
```

There is no `.env`, no dependency, and nothing to rebuild after an edit — refresh the browser. View at `http://localhost:8000`.

Asset paths are relative, so the page also works when opened from a subdirectory, which is what GitHub Pages project sites use.