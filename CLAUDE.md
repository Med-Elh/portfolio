# Portfolio Website. Project Brief (v2, full rebuild)

## What this is
A personal portfolio for Mohamed Elhayyany, targeting Technical Customer Success
Manager and Sales roles. Single page, static, English only. This is a REBUILD.
The previous version was too close to a resume. This one goes deeper: real case
studies with context and outcomes, not bullet lists.

# Token-saving rules

## Reading files
- Never read a whole file if you only need part of it. Use grep/search first, then read only the relevant lines.
- Don't re-read a file you already read in this session unless it changed.
- Don't explore the whole project. Only open files directly related to my request.
- Ignore node_modules, dist, build, .git, lock files, and images.

## Working
- Before a big task, give me a short plan (max 5 bullet points) and wait for my OK.
- Make the smallest change that solves the problem. Don't refactor or "improve" code I didn't ask about.
- Edit files with small targeted edits, not full rewrites.
- If something is unclear, ask me one short question instead of guessing and exploring.
- When running commands, limit output (e.g. use `| tail -20`, `--quiet`). Don't run full test suites unless I ask.

## Answers
- Be brief. No long explanations, no summaries of what you did unless I ask.
- Don't repeat code back to me after editing it.
- Don't create extra files (READMEs, docs, examples) unless I ask.

# Compact instructions
When compacting, keep only: current task, decisions made, files changed, and open errors.

## Tech rules, do not deviate
- Plain HTML, CSS, and vanilla JavaScript only. No frameworks, no npm, no build.
- No CDN links except Google Fonts.
- Three files at root: `index.html`, `style.css`, `script.js`.
- Must work by double-clicking `index.html`.
- Mobile first, correct at 375px.
- All colours and spacing as CSS custom properties.
- Semantic HTML, meaningful `alt` text, skip-to-content link.
- Respect `prefers-reduced-motion` everywhere.
- **Never use em dashes or en dashes in site text.** No `—` and no `–`
  anywhere a visitor can read them: body copy, headings, labels, `alt`
  text, `aria-label`, `<title>` and the social meta tags. Use a comma, a
  full stop, a colon or "and". Section labels are `01 / Work`. Date
  ranges are `2021 - 2022` with a plain hyphen and spaces around it.

## File encoding
- All project files are UTF-8 with no BOM.
- **`index.html`, `style.css` and `script.js` contain zero bytes above
  0x7F.** That is the check after any bulk edit: a non-ASCII byte in one
  of them means something wrote a literal character that an entity or a
  `\u` / CSS escape should be carrying.
- Never read or write them with PowerShell without `-Encoding utf8`.
  PowerShell 5.1 defaults to the system codepage and silently corrupts
  every non-ASCII character.
- Prefer HTML entities and `\u` escapes over literal non-ASCII.
- After a bulk edit, grep the three site files for `Â` and `â€`.

**This file and `docs/` keep their literal characters on purpose** and
must never be swept: the middle dots in the copy specs, the `±` in the
mobile rail note, the `→` in the pitch band entry, the em dash and en
dash inside the rule that forbids them, and the U+FEFF in the CNAME
section, which is there to show what a BOM does to the domain. The
mojibake grep is for the three site files, not for these.

## The custom domain and CNAME. DO NOT BREAK THIS
The site is served from **https://mohamedelhayyany.com** through GitHub
Pages, and a file called `CNAME` at the root of the repository is the
only thing that points the domain at it. It holds one line:

```
mohamedelhayyany.com
```

**Never delete it, never rename it, never change its contents**, and make
sure it is included in every deploy or build output. It ships as-is, at
the root, alongside `index.html`.

This matters more than it looks. GitHub Pages reads `CNAME` on every
publish and treats it as the source of truth for the custom domain
setting. A deploy that replaces the repository tree WITHOUT the file in
it does not leave the domain alone: Pages sees the custom domain removed
and unsets it, the site drops back to the `github.io` address, and every
link anyone has to mohamedelhayyany.com breaks until it is put back and
DNS settles. Deleting the file is not a no-op, it is an instruction.

Three rules that follow from that:
- Any script that empties the output directory before writing to it must
  put `CNAME` back, or exclude it from the clean.
- It is a plain text file with **no byte order mark and no trailing
  content**: 21 bytes, the domain and one `\n`. A BOM makes Pages read
  the domain as `﻿mohamedelhayyany.com` and reject it.
- It is the bare apex domain, with no scheme, no `www.` and no trailing
  slash. If the domain ever moves to `www`, the file changes and so do
  the absolute URLs in `<head>` (below). They are two halves of one
  setting and must never disagree.

**The absolute URLs in `<head>` are part of this.** The canonical link,
`og:url`, `og:image` and `twitter:image` are all
`https://mohamedelhayyany.com/...`, not the old
`med-elh.github.io/portfolio/` they were served from before. A share card
or a search result built from the old address sends people to a redirect
at best. If the domain changes, these change with it.


## CRITICAL RULE
Never invent content. No fabricated metrics, client names, project names,
testimonials, or outcomes. Anything marked `[TO CONFIRM]` must be left as a
visible placeholder for the site owner to fill in. Do not guess a value and do
not quietly drop the section.

---


## The palette

Light. Steel grey, midnight charcoal, coral as the single accent. Every
colour on the page is behind a token: there is not one palette literal
in `index.html` and only the particle pair in `script.js`.

```
--bg:            #F7F7F5   /* warm off white, the page ground          */
--bg-glow:       #FFF1ED   /* the hero's one soft coral radial         */
--surface:       #FFFFFF   /* cards and panels                         */
--surface-strong:#F0F2F3   /* the steel secondary panel                */
--surface-tint:  #FFE4DD   /* pale coral: THE marker, --text on it     */
--surface-steel: #E7EAED   /* steel tint                               */
--border:        #E6E3DE   /* hairline borders                         */
--text:          #17191C   /* midnight charcoal, 16.42:1 on --bg       */
--body:          #3A4047   /* DERIVED, see below. 9.77:1               */
--muted:         #5A6169   /* labels and captions, 5.85:1              */
--faint:         #6C7278   /* MEASURED, not the brief's. 4.54:1        */
--accent:        #FF4B32   /* coral: fills, dots, bars, 3.11:1         */
--accent-text:   #C72F1C   /* MEASURED, not the brief's. 5.08:1        */
--accent-hover:  #EE4531   /* MEASURED, not the brief's                */
--accent-on:     #17191C   /* ON a coral fill, 5.29:1                  */
--accent-glow:   rgba(255, 75, 50, 0.22)
--brand:         #FF4B32   /* FIXED both themes: chips, pills, badges  */
--on-brand:      #17191C   /* FIXED both themes, 5.29:1                */
--ink-block:     #17191C   /* declared, read by nothing yet            */
--bg-blur:       rgba(247, 247, 245, 0.82)  /* --bg with alpha        */
--wordmark:      #EDEDEA   /* read by one dead rule on .hero__word     */
--cursor-ink:    #FFFFFF   /* FIXED and not a palette colour, see below */
```

Dark, `[data-theme="dark"]` on `<html>`:

```
--bg:          #1A1C20   /* LIFTED charcoal, not near black */
--surface:     #232629
--surface-strong: #2C3136
--surface-tint:   #3A2420   /* deep coral brown. ADDED in STEP 43: this
                               line was documented here and was missing
                               from style.css, which is what made every
                               marker unreadable in dark mode. --text on
                               it is 13.01:1 */
--surface-steel:  #262A2E
--border:      #33383D
--text:        #F2F3F4
--body:        #D4D9DD   /* DERIVED, the mirror of light's --body */
--muted:       #AEB5BB
--faint:       #929DA7   /* the brief's value; passes here */
--accent:       #FF4B32   /* the accent does NOT invert any more */
--accent-hover: #FF8C7B   /* on a dark page the hover is LIGHTER */
--accent-text:  #FF6A55   /* the LIGHTER cut here, darker in light */
--accent-on:    #17191C   /* unchanged: the accent is unchanged */
--accent-glow:  rgba(255, 75, 50, 0.28)
--bg-glow:      rgba(255, 75, 50, 0.07)   /* an alpha here, a hex in light */
--ink-block:    #F2F3F4   /* INVERTS: the light block in a dark grid */
--wordmark:     #22262A
--bg-blur:      rgba(26, 28, 32, 0.86)
--chip-bg:      #101216   /* stat chips, plus a light hairline */
glow tint:      rgba(255, 75, 50, 0.20)
particles:      lighter coral pair, alpha x 0.55
```

**Three cuts of coral, and which to use is not a preference.**
`--accent` #FF4B32 is 3.11:1 on `--bg`: SURFACES and GRAPHICS only, a
fill, a dot, a bar, an icon, a figure at display size. `--accent-text`
is for TEXT at any size and clears 4.5:1 on every surface in the
palette. `--jr-open-year` #FF6A55 is accent text on a dark surface.

**Three kinds of token, and it matters which is which.**
1. **THEME** tokens flip: `--text`, `--surface`, `--border`, the rest.
2. **FIXED** tokens do not, because they are a colour ON something whose
   own colour never changes: `--brand`, `--on-brand`, `--gr-badge`,
   `--chip-bg`, `--avatar-bg`, `--overlay`, `--overlay-ink`,
   `--cursor-ink`, `--hx-head`, `--hx-head-halo`.
3. **INVERTED** tokens flip the other way: the whole `--vid-*` set and
   `--gr-figure`. `--vid-*` is the Growth band's palette; the name is
   historical.

There is no fourth kind. Contrast is measured, not assumed: 4.5:1 for
text, 3:1 for text above 24px and for UI graphics.

## Live traps

Each of these has cost a step already. The full story is in
`docs/HISTORY.md` at the step named.

- **The `[data-reveal]` observer writes `index * 100ms` as an INLINE
  `transition-delay`.** A plain `nth-child` stagger in CSS is silently
  ignored. Override with `!important` or do not fight it. (STEP 47)
- **The three nav lists pair BY INDEX** through `data-fly-nav="N"` and
  `sbLinks[N]` in document order. Same length, same order, changed in
  the same edit, every time. Nothing throws if they disagree: six
  labels simply land in the wrong rows. (STEP 36)
- **A sidebar stat with neither `data-sb-stat` nor `data-sb-late` is
  INVISIBLE**, not merely unanimated. It starts at `opacity: 0` and the
  morph is the only thing that fades one up. (STEP 44)
- **`id="content"` names the Growth band.** The sidebar's dark-panel
  switch finds it by that id. Do not rename it.
- **No blur on the hero portrait, ever.** It carries three intersected
  masks and a `drop-shadow` that reads the masked alpha; `filter` is not
  composited, so every write re-rasterises the whole stack. (STEP 33)
- **Portrait PNG: at or under about 1200x1500.** Decoded memory is
  `width x height x 4` and PNG has no compressed form in RAM. Pixel
  dimensions, not file size: a 300KB PNG that is 3750px wide crashes an
  iPhone exactly as an 11MB one does. (STEP 33)
- **A percentage `max-height` against an indefinite height is ignored.**
  Use a viewport unit. (STEP 47a)
- **When a note says a token flips, check the dark block for it** rather
  than trusting the note. A pair where one flips and the other silently
  does not is worse than two that both stay put. (STEP 43)
- **`--surface-tint` must be declared in BOTH theme blocks.**
- **Do not reintroduce the `--cv-*` tokens** for a single bubble.
- **Do not ship `_baseline-*` images.** `_baseline-step33` holds the
  only high-resolution portrait and `_baseline-step18` the only
  uncropped collages, which is why they are tracked.
- **`tools/` is build tooling and is not deployed.** The three-files
  rule is about the SITE.
- **Never use em dashes or en dashes in site text**, and that includes
  `alt`, `aria-label`, `<title>` and the social meta tags.

## Where everything else lives

This file is the rules. Three files hold the rest, and none of them is
loaded unless you open it.

- **`docs/CURRENT.md`** what the page IS: every section in order, all
  the copy, the assets, the positioning line, the design detail and the
  measurements. Read it before editing a section.
- **`docs/HISTORY.md`** why it is that way: one entry per STEP, the
  reasoning, the measurements, and what was tried and rejected. Read the
  relevant entry before undoing a decision.
- **`docs/BUILD.md`** the share card generator and `tools/fonts`.

**Anything in those three is explanation, not instruction.** If you find
a rule in them that is not also here, it is in the wrong file: lift it
into Live traps above.

## Working style
- Show a plan before writing significant code.
- Build one section at a time.
- Explain each block in plain language. The owner is not a developer.
- Never add placeholder copy, fake testimonials, or invented numbers.
- - Never add placeholder boxes or notes-to-self to the rendered page.

---

