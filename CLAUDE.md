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
- Never read or write them with PowerShell without `-Encoding utf8`.
  PowerShell 5.1 defaults to the system codepage and silently corrupts
  every non-ASCII character.
- Prefer HTML entities and `\u` escapes over literal non-ASCII characters
  in `index.html` and `script.js`.
- After any bulk edit, grep for `Â` and `â€` before committing.

**STEP 46 made the three site files ASCII-only, so the rule above is now
enforceable by a byte count rather than by a habit.** `index.html`,
`style.css` and `script.js` contain **zero bytes above 0x7F**, and that is
the check to run after any bulk edit: if one of them has a non-ASCII byte,
something wrote a literal character that an entity or an escape should be
carrying.

The bug that prompted it: `style.css` had been saved **with a BOM** and
`.marquee__item::after` held `content: "Â·"`, two real characters, so the
marquee read `CUSTOMER SUCCESS Â· BUSINESS DEVELOPMENT`. It is
`content: "\00B7"` now, a CSS escape, which no codepage round trip can
corrupt because every byte of it is ASCII. 149 em dashes in `style.css`
comments were mojibake of the same kind (`â€"`) and are plain hyphens.

**The separator is drawn by CSS, not by the markup**, which is why
grepping `index.html` for the dot finds nothing: `.marquee__item` is
`display: flex` with `gap: var(--space-lg)`, and the `::after` is a flex
child, so the spacing around the dot comes from the gap and not from
characters in the string. Do not "fix" a spacing problem here by padding
the `content` value.

**CLAUDE.md itself keeps its literal characters on purpose** and must not
be swept: the middle dots in the timeline and marquee copy specs, the `±`
in the mobile rail note, the `→` in the pitch band entry, the em dash and
en dash inside the rule that forbids them, and the U+FEFF in the CNAME
section, which is there to show what a BOM does to the domain. A sweep
that makes this file ASCII destroys four pieces of documentation.

**So the mojibake grep is for the three site files, not for this one.**
The two sequences it looks for are written out above as examples, so a
whole-project grep always hits CLAUDE.md and that hit is never the bug.

## The positioning line (STEP 44 replaced it)
**`Marketing, Sales & Customer Success`**, and that is now the ONLY
length. Spelling is exact: three areas, in that order, with the Oxford
comma absent and the ampersand before the last.

Used in five places: the hero tagline spans, the sidebar blurb's
neighbour, the hero portrait's `alt`, the footer, and the `<head>`.

**The `<head>` spells out "and", and that exception survives.** The
`<title>`, `og:title` and `twitter:title` read
`Marketing, Sales and Customer Success`, with the word, not the
ampersand. STEP 36 asked for this explicitly and the reason still holds:
a search result and a share card are read as prose, while the footer and
the hero tagline are read as a label. It is confined to those three tags;
every on-page use keeps `&amp;`.

**There is no short version any more, and nothing needs one.** It used to
be `Customer Success & Business Development`, for the hero tagline below
900px, because the full title was 52 characters and wrapped to three
lines at 360px, pushing "That's Mohamed." away from the line it answers.
The new line is **35 characters, shorter than that short version's 40**,
so there is nothing left to shorten. `.hx__tagfull` and `.hx__tagshort`
both carry it: they are kept as two spans because `.hx__tagfull` is
`display: none` below 900px, so collapsing to one span means editing that
pair of rules too. CSS shows exactly one per breakpoint, so the line is
never read twice and the hidden one is out of the accessibility tree.

**What it replaced, and why.** It was
`Technical Customer Success Manager & Business Developer`. The site read
as a customer success person who also did some marketing, when the work
is three things: the ads that bring customers in, the deals, and the
accounts afterwards. Marketing leads the line because it is first in the
sequence and was last on the page.

**THE JOB TITLE IS A DIFFERENT STRING AND DID NOT CHANGE.** The '25
timeline card's `.jr__title` still reads `Customer Success &amp; Sales`,
which is his actual title at SafeApps. A positioning line says what
someone does; a job title says what they are called. Do not sweep one
into the other.

The ampersand is written `&amp;` everywhere, including in text content
where a bare `&` would also parse. One form throughout means a later edit
cannot move a string from text into an attribute and break it.

## The hero's three traits (STEP 44)
`Marketing`, `Business development`, `Customer success`, in that order,
in `.hx__traits`. Each carries the icon its area already uses in the
strengths row and the Help cards, so a mark means one thing across the
page.

There were five and they described a character rather than the work:
`Multilingual`, `Technical`, `Revenue-driven`, `Builder`,
`Automation-minded`. The languages are a Work card and a What I Bring
chip, and the automation claim is evidenced in the Help section, so
nothing in them is lost. The panel is a fixed-width vertical column, so
five to three makes it shorter and changes nothing else.

## Assets
- `assets/images/portrait-cutout.png` 1200x1500, 280KB. The hero. **Read
  the dimension rule under the portrait's edges before replacing it.**
- `assets/og-image.jpg` 1200x630, 46KB. The link preview card, the
  `og:image` and `twitter:image`. **Generated, never hand-edited**: run
  `tools/build-og-image.ps1` from the repository root and it is rewritten.
  See the social card section below.
- `assets/images/portrait.jpg` 928x1152, 593KB. **Referenced by nothing
  since the card replaced it** as `og:image` and `twitter:image`. It is the
  only full-size copy of this photograph in the tree, so it is kept rather
  than deleted. Do not "optimise" it and do not point a tag back at it: a
  raw portrait is cropped differently by every app that renders a preview,
  which is the problem the card exists to solve.
- `assets/images/portrait-avatar.jpg` 184x228, 7KB. The derived small copy,
  used by the pitch band's 46px avatar and by the favicon. Both were
  loading the 593KB original for a picture drawn at 46px and at 16px.
- `assets/collages/` sixteen 571x400 JPEGs, the name divider's trail.
  Desktop only, and since STEP 33 they are not fetched on a touch screen.
- `assets/docs/cv.pdf`
- Never invent filenames. Ask if an image is needed that does not exist.
- **There are no certificate images.** Four `cert-*.png` sat in
  `assets/images` until STEP 33 with nothing referencing them; the
  `#certbox` lightbox that would have shown them has no `[data-cert]`
  trigger anywhere in the markup, so it can never open. The markup, CSS
  and JS for it are still there and inert. Do not add images back to it
  without a reason.

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

## The link preview card is drawn, not photographed (STEP 42)

> **OUT OF DATE SINCE STEP 41, and deliberately left so for now.** This
> card is generated by `tools/build-og-image.ps1`, which has the OLD
> beige, charcoal and yellow baked into it as literals, so the shipped
> `assets/og-image.jpg` still shows the previous palette while the site
> itself is steel, charcoal and coral. Nothing on the page is wrong; the
> SHARE CARD is. Fixing it is a separate job: edit the colour constants
> in that script (the beige ground, the `--surface` disc, the yellow
> rule) and re-run it, then look at the centre square crop. The rest of
> this section still describes the card's geometry correctly.

`og:image` and `twitter:image` pointed at `portrait.jpg`, a 928x1152
photograph. **Every app that renders a link preview crops to its own
shape**, so WhatsApp, LinkedIn and Instagram were each cutting the head
somewhere different. `assets/og-image.jpg` replaces it: 1200x630, the
site's own palette, Inter at the weights the page uses,
46KB at quality 90 against a 300KB ceiling.

**The middle 630x630 is the real canvas, and that is the whole design
constraint.** Instagram and several others crop a preview to a square, so
anything outside `x 285..915` is lost. Everything that matters is inside
it, and inset a further 60px, so the content clears 60px of every edge of
the CARD and of the SQUARE. Outside the square is background and one soft
bloom, which has nothing in it a crop can cut in half.

**It is stacked and centred, not portrait-left and text-right.** The split
was built and measured first: inside 630px the text column came out at
276px, which set the role title at 17px, and the content then ran edge to
edge in the square crop, which is the one crop the margin exists to
survive. Stacking gives every line the full 510px measure. Top to bottom:
a 200px disc holding the portrait, the two-line wordmark at Inter 800 with
the page's own -0.03em tracking, the yellow rule, the role title, the
domain.

**The portrait is `portrait-cutout.png` clipped to a circle**, framed from
measured alpha: the hair starts at y=41, the head is widest around y=250
to 300, the chin is near y=580 and the shoulders are full width by y=820.
The crop square is 950px at `cx 535`, top at `y -92`, which puts the hair
about 14% down the disc and stops well above y=1249 where the asset is a
hard crop. The disc is `--surface`, a shade lighter than the page, so what
shows around the head reads as a tile.

**The accent is a 56x5 rule and nothing else.** When this was written the
accent on the card was the yellow, 1.18:1 on the beige, which is why it
was never a foreground anywhere on the site and why a social card was the
last place to make an exception. **Coral is 3.11:1 on the new ground and
could carry the role title**, so when the card is regenerated that is a
live choice rather than a closed one. The 56x5 rule is still the better
answer: a coral title on a card that is cropped four different ways is a
second thing competing with the name.

**The title carries the ampersand and the meta tags spell out "and".**
That is not drift: the `<head>` exception is for tags read as prose, and
the card is a brand surface like the sidebar blurb. The line break is set
by hand, because greedy wrapping leaves the `&` dangling at the end of
line one.

### Regenerating it
```
powershell -ExecutionPolicy Bypass -File tools\build-og-image.ps1
```
Add `-PreviewDir <folder>` to also write the full card and the centre
square crop, which is what to look at before shipping a change.

**Inter is not installed on Windows and the script needs it at build
time**, so `tools/fonts/` holds Inter 400, 500, 700 and 800 as TTF. They
are fetched once from Google Fonts if missing and are **build-time only**:
nothing is served from there, and the page still loads Inter from Google
Fonts itself. The fetch uses an old Android user agent deliberately, which
is what makes the API return plain TTF; a modern one returns woff2 and an
MSIE one returns eot, and WPF reads neither.

**`tools/` is build tooling and must not be deployed.** The three files at
the root rule is about the SITE; this is beside it, like `_baseline-*`.
`assets/og-image.jpg` is the only thing from this step that ships.

## What a visitor can select (STEP 23)
Double-clicking the hero portrait put a blue selection rectangle over it,
showing the image's full rectangular bounds and undoing the mask. The
portrait already had `pointer-events: none`, which is why that was a
surprise: **pointer-events and user-select are different properties.**
The first stops the element receiving a click; it does nothing about the
element being inside a selection RANGE, and the highlight then paints
across the box the mask exists to hide.

Decoration is `user-select: none`, `-webkit-touch-callout: none` (the
long-press "save image" sheet is the touch version of the same problem),
and `::selection { background: transparent }` so a selection dragged from
text above simply leaves no mark as it passes over. Every `<img>` also
carries `draggable="false"` in the markup AND `-webkit-user-drag: none`
in CSS: the attribute stops the native image drag, the property is what
Safari reads, and without both a drag starting on an image inside a
draggable row drags the picture out of the page instead of moving the
row.

The list is decoration only: the two big names, stat numbers, section
labels, marquee words, timeline years, avatars, the logo pill and every
image. **Body copy, headings, timeline text, quote cards and every
contact value stay selectable**, because someone copying the email
address is a person trying to hire him.

Verified by selecting the whole document: the copied text contains the
email and the phone number and does NOT contain "MOHAMED" or
"ELHAYYANY".

One behaviour that is correct and looks odd: double-clicking over the
portrait still selects a word of the headline underneath it. That is the
`pointer-events: none` working as intended, so the buttons and headline
beneath the portrait stay clickable. The image itself is not selected and
no rectangle appears over it.

## Platform icons are the real brand marks (STEP 30)
Every platform logo on the site is the official glyph, inline in the
markup. **No icon library, no external request, no hand-drawn
approximation.** The sidebar's LinkedIn mark and the contact card's were
both close-enough redraws before this and are not any more.

The marks in use: Instagram, YouTube, LinkedIn, WhatsApp. Each one is a
24x24 `viewBox` with a single `<path>`, which is what keeps it crisp at
every size the page draws it: 13px in the contact sub-link, 15px in the
mobile menu, 17px in a Growth round button, 22px in a Growth badge.

**Single colour by default, brand colour in one place.** Everywhere on
the page a platform mark is `fill="currentColor"`, so it inherits the
palette and its own hover. The exception is the Growth cards' badges,
where the point is that the platform is recognised at a glance, so the
glyph keeps Instagram's gradient, YouTube's red and LinkedIn's blue.

**The brand-colour badge is an off-white tile, and that is measured.** On
the dark band `--vid-chip` is #2a2a2a, and against it YouTube's red is
3.3:1 and LinkedIn's blue 2.07:1: a brand colour is chosen to sit on
white and goes muddy anywhere else. On `--gr-badge` (#f4f1ea, FIXED in
both themes) the red is 3.54:1 and the blue 5.6:1, and Instagram's
gradient reads at every stop. It is also what a brand guideline asks for.

**Instagram's gradient is defined once.** It is the one mark that is not
a flat colour, so a `<linearGradient id="gr-ig">` sits in a 0x0
absolutely positioned SVG at the top of the Growth section and both cards
reference it. A 0x0 SVG rather than a `display: none` one: some engines
drop a hidden SVG's referenced gradients along with it.

**Naming.** A mark is decoration and carries `aria-hidden="true"`; the
accessible name goes on the control around it. The Growth round buttons
are icon-only, so each carries its own `aria-label` naming the platform
and saying the link opens in a new tab. Every `<svg>` also carries
`focusable="false"`, or IE-era Edge puts them in the tab order.

**The mobile menu gained a LinkedIn row**, because the sidebar carries
that link and the sidebar does not exist below 900px: a phone had no
route to the profile at all.

## The custom cursor inverts what is under it (STEP 31)
It was painted in `--accent`, which STEP 30 turned into the colour of the
page's own text. That is exactly the colour of the one section that
reverses out, so it vanished on the Growth band in light mode and on the
same band in dark mode, and it was never reliable over the hero portrait
or the collage photographs either, which no token flip could have fixed.

`.cursor-dot` and `.cursor-ring` are now pure white with
`mix-blend-mode: difference`, so the cursor paints 255 minus its backdrop
and cannot match what it crosses.

**Three things this depends on, none of them optional:**
1. Both elements are direct children of `<body>`. Blending composites
   against the backdrop of the nearest stacking context that isolates.
   **Do not wrap them in a container with `isolation: isolate`.** That is
   the intuitive move and it is backwards: it would isolate the cursor
   FROM the page, leaving it to blend against transparent black, which
   makes white stay white and undoes the whole thing.
2. No ancestor may carry `filter`, `backdrop-filter`, `opacity` below 1,
   or a transform. `html` and `body` were checked and carry none.
3. The colour is pure white. Any other value inverts to something that is
   not the complement and the cursor goes muddy on mid-tones.

`.cursor-ring.is-hovering` no longer changes colour, because white is
what makes the inversion true. It grows and thickens instead.

**The honest limit**: difference blending has nothing to say at exactly
mid-grey, where 255 minus 128 is 127. This palette has no mid-grey
surface.

**The fallback** is `@supports not (mix-blend-mode: difference)`: a solid
`--accent` with a 1px `--accent-on` ring and a soft dark shadow, so one
of the two edges reads on any backdrop.

**The testimonial drag puck stays filled**, because the word DRAG inside
it has to stay readable and difference would invert the label with the
disc. It takes the outline and the shadow instead.

**Measuring this is harder than it looks**, and three harness bugs cost
more than the fix did. Written down so the next person skips them:
`Page.captureScreenshot`'s `clip` is in PAGE coordinates AND re-renders
`position: fixed` elements relative to the crop, so the cursor lands in
the frame only by accident; sampling "the most contrasting pixel near the
point" measures whatever letter is under it, not the cursor; and
`CURSOR_IDLE_DELAY` is 500ms, so a screenshot taken later than that
catches a cursor that has already hidden itself. Capture the full
viewport, diff two frames with the canvas hidden and animations paused,
and shoot inside 500ms.

## The site crashed every iPhone, and it was one file (STEP 33)
The symptom: the page loaded for about a second and the tab died with "A
problem repeatedly occurred" or "Can't open this page". Safari AND Chrome
on iPhone, private mode too, **as the hero appeared**. Two browsers and no
JavaScript error means memory, not a bug.

**`portrait-cutout.png` had been replaced with the camera original:
3750x4688, 11MB.** That is 17.6 megapixels, and a PNG has no compressed
form in memory, so the browser expands it to `3750 x 4688 x 4 bytes` =
**70.3MB of RAM** before a single pixel is drawn. An iPhone tab has a
budget in the low hundreds of MB. The asset is 1200x1500 / 280KB now,
which is **6.9MB decoded**, a tenfold cut, and that alone is the fix.

**File size is not the number that matters. Pixel dimensions are.** This
is the whole lesson and it is counter-intuitive enough to be worth the
paragraph: `width x height x 4` is the cost, and PNG compression does not
reduce it. A 300KB PNG that is still 3750px wide crashes exactly the same
way an 11MB one does, which is why "I compressed it" is not on its own an
answer. Check the dimensions.

**Why the hero specifically, and not some heavier section further down.**
The portrait is the one element on the page carrying three INTERSECTED
mask layers and a `drop-shadow` that reads the masked alpha. Intersect
cannot be done in one pass and `drop-shadow` needs the masked result
rasterised first, so that 70MB bitmap was the input to several full-size
surfaces. Then two separate pieces of code blurred it:

1. `@keyframes mi-portrait`, the phone intro, 10px to 0 over 760ms on the
   hero's **first paint**. The blur is gone; the keyframe now names only
   `transform` and `opacity`. It deliberately does not mention `filter` at
   all, which is not the same as setting it to `--hx-shadow`: a keyframe
   that never mentions a property does not own it, so the stylesheet's own
   `filter` applies for the whole run and the drop-shadow survives without
   being repeated.
2. The scroll parallax in script.js, writing `style.filter` with a blur on
   **every scroll frame**. Also gone. `transform` and `opacity` are
   composited, so the layer is rasterised once and the GPU moves it;
   `filter` is not, so every write re-rasterised the whole stack.

**The collage trail was warming up on phones.** All sixteen pictures
fetched and `decode()`d two viewports early, with no pointer check, for a
trail that refuses any pointer that is not a mouse. 585KB over the wire
and about 14.6MB of decoded bitmaps held deliberately alive for the rest
of the visit, to draw nothing. `mbWarmUp()` now returns early unless
`(hover: hover) and (pointer: fine)`, read at call time, and the
`pointermove` handler calls it too so a device that gains a mouse later
still warms up.

**780KB of assets were referenced by nothing** and are deleted: the four
`cert-*.png` and `portrait-cutout1.png`. See the Assets list.

`_baseline-step33/` holds the previous three files and, under
`assets/images/`, every deleted asset plus
`portrait-cutout-original-3750x4688.png`. **The 11MB original is the only
high-resolution copy of the portrait, so it was archived rather than
overwritten.** Do not ship that folder's images.

**What was considered and deliberately NOT done**, so it is not
re-litigated: a separate mobile `srcset` for the portrait, and collapsing
the three mask layers to one below 900px. At 6.9MB decoded neither earns
its complexity, and the masks are load-bearing (the asset is still a hard
crop at the bottom, re-measured). Merging the page's scroll-driven
animations into one rAF loop was also declined: it is a refactor across
about twenty modules, and it was not what was crashing the page.

## The other half: composited layers on a phone (STEP 34)
STEP 33 took the hero portrait from 70.3MB of decoded bitmap to 6.9MB and
**the tab still died, intermittently**: sometimes the page loaded,
sometimes the same "A problem repeatedly occurred". **Intermittent is the
diagnosis, not a complication.** A hard limit fails every time. A budget
you are sitting on top of fails when the phone happens to be busy, so
something large was still resident, and on iOS what is large is never the
markup. It is the number of composited layers and what each one has to be
blurred through.

**A `backdrop-filter` is not a colour.** Each one makes the compositor
snapshot the region behind the element, blur that copy, and keep the
buffers. At a phone's DPR of 3 a single full-viewport layer is
`390 x 844 x 9 x 4` = about **11.8MB before the blur's own ping-pong
buffers**. Four of these on the first screen is the rest of the crash.

**`visibility: hidden` and `opacity: 0` do not take an element out of the
compositing tree. `display: none` does.** That one sentence is most of
this step. Both of the two biggest items were things nobody could see.

What was resident on every phone visit, all of it invisible:

1. **`.menu`**, the overlay nav: `position: fixed`, `inset: 0`,
   `backdrop-filter: blur(20px)`, a FULL-VIEWPORT backdrop blur held open
   from the first paint because it is hidden with `visibility: hidden`.
   The `transform: translateX(100%)` beside it is itself a promotion
   trigger. The single biggest item.
2. **`.cursor-glow`**: `position: fixed`, 400x400, `will-change:
   transform`, hidden on touch with `opacity: 0`. About 5.8MB of layer,
   for a glow that follows a cursor a phone does not have.
3. **`.noise`**: `position: fixed`, `inset: 0`, a tiled `feTurbulence`
   SVG at 3% opacity. Another full-viewport layer, and procedural noise
   has to be rasterised rather than decoded. At 3% on a 390px screen it
   is invisible.
4. **Two `.bg-glow`**: `position: fixed`, `filter: blur(90px)`. A 90px
   blur needs a surface padded by roughly three times its radius on every
   side, so a 218px square becomes about 760px, times DPR 3. Fixed, so
   never off screen and never discarded.
5. **Four `.hx__stat`** chips in the hero, `backdrop-filter: blur(6px)`
   each, plus **`.topbar`**, sticky and always on screen, at `blur(10px)`.
6. **Eight `.mb__shot`** SVG `<image>` nodes carrying `will-change:
   transform, opacity`, built by an IIFE on every device, inside a clipped
   group, for a trail whose `pointermove` handler refuses anything that is
   not a mouse. The pool is built on demand now, from `mbWarmUp()`, so it
   shares the one `(hover: hover) and (pointer: fine)` gate.
7. **`will-change: transform`** on `.hx__stat` and `.hx__btn` at all
   widths, promoting eight elements for a morph that only exists above
   900px. `.hx__word` KEEPS its hint: the phone parallax writes a
   transform to it every scroll frame, which is what will-change is for.

**The fix is not "remove the blurs and accept a flatter page", and this is
the part worth keeping.** Two observations did the work:

- **Both glows are already radial gradients** (`--glow`, `--glow-warm`).
  The blur was softening something already soft, for a GPU surface the
  size of the screen. Dropping only the `filter` keeps the gradient and
  keeps the bloom. They are not hidden on mobile.
- **Every `backdrop-filter` here sat on a background that was already
  nearly opaque**: `--bg-blur-solid` is 0.97 alpha, `--bg-blur-bar` 0.92,
  `--panel-soft` 0.72. Removing the blur and closing that last few per
  cent to a flat token is a difference you cannot see at 390px, because
  there was never much showing through to blur. The topbar goes the whole
  way to opaque deliberately: 8% translucency with no blur is content
  ghosting through, which looks worse than either option.

It all lives in one appended `@media (max-width: 899px)` block at the foot
of style.css, so **desktop is untouched** and the whole thing is one
block to read or revert. The morph, the sidebar, the rail and the noise
keep their blurs above 900px.

**Things that were checked and are already correct**, so nobody re-audits
them: `.cursor-dot` and `.cursor-ring` are `display: none` outside
`(hover: hover)`, so the `mix-blend-mode: difference` that would force the
whole page into one blended buffer never engages on touch. `.sb` is
`display: none` below 900px. `.certbox` has a `.certbox[hidden]` rule, so
its full-viewport `backdrop-filter` really is gone. `.bg-canvas` keeps its
`translateZ(0)` and `will-change`, which are load-bearing on iOS. The
marquee tracks keep theirs, because they genuinely animate. `.nav`,
`.hero__glow`, `.hero__media`, `.menu__glow` and `.mig-stat` are dead CSS
with no element in the markup.

## What the bisect actually found (STEP 35)
STEP 33 and STEP 34 both reduced real memory and neither one stopped the
crash. At that point the right move was to stop reading code and measure,
so the page was bisected **on the device**, with the browser's 27 tabs left
open so the test ran under the hard condition rather than the easy one.
Seven builds, each the real site with exactly one thing removed:

```
  no JavaScript ........ pass
  no CSS ............... pass
  NO PORTRAIT .......... pass
  MOTION TURNED DOWN ... pass
  no particle canvas ... intermittent
  HERO ONLY ............ intermittent
  the real page ........ intermittent
```

**Read those three capitals together and there is only one answer left.**
Hero-only failing kills "the page is too long" outright. No-portrait
passing and motion-down passing, while hero-only fails, leaves the
portrait **while it is being animated**. Not the portrait, which is fine
sitting still. Not animation, which is fine on everything else on the
page. The combination.

**Why that combination and nothing else.** The portrait carries three mask
layers composited with `intersect`, which cannot be done in one pass, plus
a `drop-shadow` that reads the MASKED alpha and therefore cannot begin
until that intersection is resolved. Standing still, that stack is paid
once. Under an animation that changes the size it rasterises at, it is
paid again and again.

**So the `scale` went first, and it is the important one.** A translate
moves a texture the compositor already has. A scale changes the size that
texture has to exist at. `scale(1.05)` came out of `@keyframes
mi-portrait` and `1 + p * 0.06` came out of the parallax; both keep their
travel and their fade, which is what the effect reads as anyway. Nothing
else on the page scales the portrait now.

Then, below 900px only:
- **No `drop-shadow`.** The single most expensive declaration on the
  element, because it is a second full-size pass over the first one's
  result. On a phone the portrait sits on a flat background at 82% of a
  390px screen and the depth was not doing work. This takes the dark
  theme's `brightness(1.1) contrast(0.95)` with it, since they ride in the
  same token: the portrait is a shade flatter on a dark phone.
- **Two mask layers, not three**, and the radial is retuned to
  `ellipse 50% 86% at 50% 38%, #000 62%, rgba(0,0,0,0.6) 81%, transparent
  100%`. Both numbers were picked by looking at the page on the device,
  through `_crashtest/mask.html` (the radius) and `_crashtest/fade.html`
  (the stops), one axis at a time. Dropping the horizontal layer without
  retuning left the sides visibly hard cut, because at the original
  `ellipse 80%` the falloff sat outside the picture and the outer columns
  were landing at about 42% opacity; a 42% edge running down the image
  reads as a cut. Tuning the two axes separately is safe in this order and
  only this order: once the horizontal radius is 50% the outer column is
  outside the ellipse and therefore fully transparent whatever the stops
  say, so moving the stops can pull the fade off the jacket without ever
  touching the edges that were already approved.
  The horizontal layer goes because the radial is an ellipse centred on
  the face and already pulls the sides in.
  The vertical stays (it dissolves the shoulders into the section below)
  and the radial stays (it keeps the falloff on the head rather than on
  the middle of a box whose bottom third is a hard crop). One fewer
  surface to intersect against. The dark theme's background glow is still
  cut correctly, because it is a background on this element and two layers
  clip it as well as three.

**Two cascade traps, both real, both caught by looking rather than
assuming:**

1. `html.rm .hx__portrait` carries `filter: var(--hx-shadow) !important`,
   so that the blanket `filter: none !important` which strips blur
   transitions cannot take the drop-shadow with it. Sound on desktop. On a
   phone it would have silently undone the rule above **for exactly the
   visitors who have turned motion down**, who are the likeliest to be on
   a struggling device. STEP 35 re-declares it at the same specificity and
   importance, later in the file.
2. script.js's reduced-motion branch was writing
   `hxPortrait.style.filter = HX_SHADOW` every frame. An inline style beats
   a stylesheet, so that one line would have reinstated the shadow too. It
   existed only to overwrite a leftover blur from the other branch, and
   there is no blur in either branch since STEP 33. It is gone; the
   cascade decides now.

**The lesson, and it is about method rather than CSS.** Two confident
diagnoses in a row were each partly right and each insufficient, and both
were reached by reading the code. The thing that actually resolved it was
seven builds and a phone. When a fix does not land, the next step is a
measurement, not a better theory.

## The site presented skills, not evidence (STEP 36)
An audit of the finished page found the layout and the engineering sound
and the CONTENT arranged against itself. Three measurements made the
case, and they are worth keeping because they are the reason for every
change in this step:

1. **Of 1,212 visible words, about 382 were unique substance** about what
   he actually did. Another 205 were the SAME facts restated, and roughly
   625 were headings, labels, navigation and category names. For every
   word about the work there were about 1.6 words of framing.
2. **Five of the six headline numbers could not be judged by a stranger**
   (`100+` accounts, `100+` sales, `25%`, `98%`, `300+`), and they
   appeared between four and seven times each, so the repetition
   compounded the ambiguity instead of the credibility. Only
   `0 to 8,000 followers in 3 months` had a start point, a duration and
   an outcome.
3. **The strongest evidence on the page sat at screen 10.3 of 14.7**,
   behind both drop-off zones: the Growth band is the only section with a
   starting condition, named decisions and measured outcomes.

**This step is positioning, structure and height. It deliberately does
NOT write the case studies**, which are the next pass. What it does is
make room for them and stop the page arguing with itself.

What changed, in one list: the through line went into the pitch band;
Growth moved from fourth to second; `.wib` went from 200vh to 110vh and
its seven cards from results to method; the automation claim got its
first evidence; both full-width marquees were deleted; Growth got a call
to action; the `<head>` meta was rewritten; and four facts were corrected.

**Measured, 1440x900, computed from the CSS tokens rather than a browser:
13,238px to 12,456px, 14.7 screens to 13.8.** The reclaim was 1,132px
(810 from the pin, 322 from the two marquees) and 350px went back into
new content. The height is the smaller half of the result. The larger
half is that Growth is now at screen 5.4 instead of 10.3.

**One thing got worse and is written down rather than hidden.** Work
still carries no call to action across its 3.9 screens, and Growth's sits
at the END of Growth, so the first clickable thing after the hero is now
6.9 screens down where it used to be 6.2. The next pass should put a CTA
inside or immediately after Work.

### The four facts that were wrong, and where they lived
- **Majorel's client account was invisible.** `Majorel` was named in four
  visible places and `ByteDance` / `TikTok` in none. All four now carry
  the account, because it is what gives the moderation work its scale.
- **No team size appeared anywhere on the site.** Zero occurrences. Four
  places described the leadership work unquantified, which is also why
  `98%` could not be judged. It is **a team of 12** now.
- **The revenue figure had no subject in the hero and sidebar stats**,
  which read as his personal revenue. It is **company revenue overall,
  driven mainly by new sales from outreach**. The stat label is now
  `Company revenue growth in 2 months`, the '25 card says
  `+25% company revenue`, and the '25 panel names the driver.
- **eGrow's customer type was never described at all.** Nothing on the
  page restricted it to e-commerce, which was checked; the gap is that a
  reader cannot tell what the product does or who buys it. **It is a SaaS
  tool sold to businesses of all kinds.** Not fixed in this pass, because
  it needs copy rather than a correction. See the Growth card 2 note.

## An animation the reader has to outlast (STEP 37)
The Contact section was rebuilt. The structure and the reasoning are under
Contact in the Content section; this is the lesson, because it generalises
and the site is likely to hit it again.

**The section's own animation was the thing standing between a visitor and
the action.** The STEP 20 conversation played four timed message beats
with typing dots, then staged three action rows 70ms apart: about **2.2
seconds to the first address and 2.5 to the last**. Every part of it was
built carefully. The beats were tuned as conversation pace, the dots did
double duty, the markup was the finished state so a failed observer left
everything on screen, and the contrast was measured in both themes. None
of that was wrong. It was all in service of something that should not have
been there.

**The test that matters is not "is this animation good", it is "what is
the reader waiting for".** A visitor who has scrolled to Contact has
already decided to get in touch. The one thing they want is an address,
and the animation delivered addresses last, in the order the designer
found most satisfying rather than the order the reader needed. On a
section like Growth or the hero, where the reader is still being
persuaded, an entrance earns its time. On the section where they act, it
is a toll.

**So the rule for this page: motion may introduce content, never gate an
action.** The entrance that is left is the page's ordinary
`[data-reveal]` riser, six elements 100ms apart, fading up over 600ms.
Nothing is sequential, nothing is on a timer, nothing has a `.is-live`
state to wind back, and every link is in the DOM, focusable and clickable
from the first frame with JavaScript on, off, or reduced.

**Deleting the sequencer deleted more than it added.** 99 lines out of
script.js, about 250 out of style.css, and the section gained a fourth
contact method and a primary action. The scene was the most intricate
thing in the file and the simplest thing replaced it better. That is
worth remembering the next time a section seems to need a scene.

**What survived, and why it is the right half.** The exchange is copy: two
bubbles that say what he is open to. Keeping it cost nothing, because a
bubble that is simply present has no timing to get wrong. The performance
around it is what went. When something in this file looks like it has to
go, check first whether only its CHOREOGRAPHY has to go.

### STEP 38's postscript: the bubbles went too
The paragraph above was written one step too early. STEP 38 deleted the
exchange as well, and the section is better again.

**That is the part worth keeping.** The STEP 37 reasoning was right about
the playback and wrong about the panel: it treated "it is copy" as
sufficient justification for keeping something, when the real test is
whether the copy needed that container. Two bubbles, a chat header, an
avatar, a status line, a timestamp, a read receipt and fourteen palette
tokens were carrying one sentence, which is now a single muted line in
the heading block.

So the test is not "is this content or decoration". It is **"how much
structure is this content paying for"**. A sentence that needs a quoted
interface around it to be read is a sentence in the wrong place.

Three deletions in a row, each one defended at the time, each one leaving
the section better. **When that happens twice, stop defending the next
one and try removing it.**

## What eGrow actually is (STEP 39)
**The brief never said, and the site never said either.** For a long time
the page described the product as "SaaS accounts" and "a SaaS product",
which is a category, not a product. Written down here because it is the
one fact about his current job that cannot be derived from anything in
the repository, and because half his job title depends on it.

> **eGrow is a SaaS platform that lets businesses run and automate their
> operations from one place. It is built on the WhatsApp API and
> integrates with Shopify, delivery companies and other platforms, so a
> business manages everything in one tool instead of switching between
> several.**

SafeApps is the company, eGrow is the product. The site writes it as
`SafeApps (eGrow)` in the '25 card's label and `@egrowdotcom` in the
Growth card's handle.

**Who buys it: businesses of all kinds, NOT only e-commerce.** This was
checked before and nothing on the page ever claimed otherwise, but the
name reads as an e-commerce tool by implication and a DTC wall art brand
sits one card below it, so the ambiguity was real. The Shopify
integration is one of several, not the whole product.

**This is what makes "Technical Customer Success Manager" mean
something**, and that connection is now on the page rather than implied.
The product IS APIs and integrations, so supporting it means working in
them. What he built himself: the WhatsApp order confirmation and delivery
tracking flows, the transactional email sequences, and the Meta
Conversions API integrations that fixed attribution for customers' ad
campaigns. That is the evidence for the word "Technical" in his job
title, and it is the Help section's `.hlp__text--auto` that carries it on
the page. **It used to back the hero's "Automation-minded" trait chip
too, and that chip went in STEP 44** along with the four others, so the
Help card is the only place the automation work is now named.

**It is said in three places, at three depths**, and that layering is
deliberate rather than repetition:
1. The '25 card FACE, one line: "SafeApps makes eGrow, one platform a
   business runs its whole operation from." A reader learns what the
   company does without opening the card.
2. The '25 Read more panel, the full paragraph above, then a second
   paragraph on the integrations he built.
3. The Growth eGrow card's "The challenge" block, which names the product
   because the product IS the challenge: "eGrow runs a business's whole
   operation from one place, on the WhatsApp API. Explaining that in a
   video people actually watch is the hard part." It used to read "A SaaS
   product that needed content people actually watch", which told a
   reader nothing about why the content was hard to make.

**Known duplication, left in on purpose.** The integrations are named
twice: in the '25 panel, framed as what technical means in the role, and
in the Help section's Customer Success card as `.hlp__text--auto`, framed
as a capability. Different frames, same facts. If one has to go, the Help
one is the weaker of the two now that the timeline explains the product.

**The `<head>` meta description still says "100+ SaaS accounts
managed"** and was not in scope for STEP 39. It is the last place on the
page that uses "SaaS" as if it explained something.

## Booking is available from everywhere, and the morph moved (STEP 40)
The calendar link is `https://cal.com/mohamed-elhayyany-my4ujj/15min`.
**Four places, one label, one URL, `target="_blank"`, `rel="noopener
noreferrer"` on every one.** If a fifth is ever added, it matches all
four of those or it is wrong.

```
  hero      .hx__btn--book    FILLED, first, and the morph source
  sidebar   .sb__book         FILLED, above Resume, the morph TARGET
  menu      .menu__book       FILLED, above the Resume and contact links
  contact   .ctc__card--primary   the primary of the four cards
```

### The morph re-target, and why it was not fragile
The hero's filled button flies into `#sb-book` now instead of
`#sb-resume`. **The change is one argument to `pair()`**, and that is
worth understanding before touching this again: `pair(real, hero, from,
to, opts)` measures both elements with `getBoundingClientRect()` on the
frame it needs them and derives the deltas, the scale and the
counter-scale from that. Nothing in it is tuned to a position. The new
button sits about 60px higher in the column and the arithmetic does not
care.

**What IS load-bearing on the target**, all three carried over from
`.sb__resume`:
1. `transform-origin: 0 0`. `pair()` computes `dx`/`dy` on the assumption
   that the scale happens about the element's own top-left corner. Change
   this and the landing is out by the element's own size.
2. An inner label (`.sb__bookin`) passed as `counter`, which gets
   `scale(sy / sx, 1)` every frame so the type does not stretch while the
   box does.
3. A set `min-height` rather than a height inferred from the line box, so
   the height ratio `scale: 'height'` reads is stable once the font loads.

**DELETED with the old arrangement:** `.sb__rin`, `.sb__r1`, `.sb__r2`,
the `sbR1` / `sbR2` variables, and the crossfade block in `apply()` that
faded "Get in touch" out and "Resume" in across the window 0.5 to 0.7 of
the travelling button's progress. All of it existed for one reason: the
flying element had to wear a different name on the way than it had on
arrival. Both ends say "Book a meeting", so there is nothing to fade.
**That is the real win here. The morph has one fewer moving part than it
did.**

**`.sb__resume` became a late arrival.** It keeps its id, class and place
as the last element of the sidebar, it reads "Resume" from the first
frame, and script.js pushes it into `sbLate` so it fades up over the last
20% of the run like the blurb and the email box. It needed
`.js .sb .sb__resume { opacity: 0 }` adding to the morph-start list, or it
would sit there fully formed while the rest of the column assembled.

**One deviation from the brief, stated plainly.** It asked for the hero's
"Get in touch" to keep flying and land on the new Book button.
`data-fly-btn="0"` moved to the Book button instead, so the morph pairs
like with like. Pairing "Get in touch" to "Book a meeting" would have
meant the label, the fill and the arrow all changing inside the first 8%
of the run, which is a button turning into a different button in mid-air
rather than one object moving. **The revert is moving that one attribute
back and repointing the two `.hx.is-gone .hx__btn--book` rules.**

### Only one filled button per screen: where that holds and where it does not
It holds WITHIN every section, and on the hero, and in the menu. STEP 40
fixed the one case it had just broken: the pitch band's "Get in touch"
was filled, which put a second filled button on the same screen as the
sidebar's AND made the same words primary there and secondary in the
hero. It is `.btn--outline` now.

**It does NOT hold on desktop between the sidebar and three sections.**
`.sb__book` is `position: fixed` and on screen from 900px up, so in
Growth, How I Can Help and Contact there are two filled buttons visible
at once. **This is not new**: `.sb__resume` was `--accent-fill` before
this step and did exactly the same thing. It is recorded rather than
fixed because fixing it means a decision about the whole page, not about
this step:
- demote `.gr__ctabtn`, `.hlp__btn` and `.ctc__card--primary` to
  outlined, leaving the sidebar as the page's one standing primary; or
- tint `.sb__book` instead of filling it, which costs the morph its
  like-for-like landing.

The hero is exempt by construction: the hero button fades out as the
sidebar button fades in, in the same place, over the first 8%.

### The sidebar fits, measured
Seven children now (intro, stats, nav, ticker, mail, book, resume). At
**800px tall and 1440 wide** the column's natural content is about 606px
against 696px of room, so the second button lands with roughly 90px of
slack and **no font size had to change**. The brief's instruction was gaps
before type, and the existing
`@media (min-width: 900px) and (max-height: 920px)` block was already
doing that: it takes `.js .sb` to `gap: 8px` and `padding-block: 12px`,
and STEP 40 only added `.sb__book` alongside `.sb__resume` in the two
step-down blocks at 920px and 820px. `.sb__nav` is `flex: 1`, so it is
what gives up the room.

## CRITICAL RULE
Never invent content. No fabricated metrics, client names, project names,
testimonials, or outcomes. Anything marked `[TO CONFIRM]` must be left as a
visible placeholder for the site owner to fill in. Do not guess a value and do
not quietly drop the section.

---

## Design direction

Structure and motion modelled on saad.moatassime.com. Colours stay as below.

### Colour (light steel base, coral accent). STEP 41
**STEP 41 replaced the whole palette.** It was beige, charcoal and yellow
(and violet before STEP 30). It is now **steel grey, midnight charcoal
and coral, with coral as the single accent.** Backgrounds are light and
soft, not solid strong colour, and no whole section is filled with a
strong colour except the Growth band, which keeps its dark treatment.

This was a palette edit and not a sweep, for the same reason STEP 30 was:
every colour on the page was already behind a token. There is not one
palette literal in index.html (only Instagram's gradient and YouTube's
red, which are brand marks) and only the particle pair in script.js.

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

This is still a LIGHT theme. **What sits on the accent is the page's INK,
not an off white**, and that is the inversion of the old palette: charcoal
needed something light on it, coral is light enough that near-black is the
readable choice. The only `#FFFFFF` left outside the palette block is
`--cursor-ink`, which is not a colour choice at all (see below).

Coral is the primary accent throughout: buttons (accent fill,
`--accent-on` text, `--accent-hover` on hover), the active nav item,
progress bars, carousel arrows, link hovers, focus rings, the timeline
thread and its markers, the Growth cards' label markers, the Growth
figure, the particles, and every chip that used to be yellow. The
availability dot is the one exception and stays green: it means
"available", not "brand".

**Interactivity can come from hue again, and that reverses STEP 30's
central rule.** The charcoal accent was the colour of the page's own
text, so a button had to be a SOLID FILL and a link could not simply be
tinted. Coral is a hue, so an accent-coloured thing reads as interactive
on its own. The fills and the inverted-text active nav item are kept
because they work, not because they are now required.

**Three cuts of one colour, and which one to use is not a preference:**
- `--accent` **#FF4B32** is 3.11:1 on `--bg`. That clears the 3:1 floor
  for a UI component and for text above 24px, and misses 4.5:1. It is for
  SURFACES and GRAPHICS: a fill, a dot, a bar, an icon, a figure at
  display size.
- `--accent-text` **#C72F1C** is for TEXT, at any size. 5.08:1 on `--bg`,
  5.45:1 on `--surface`, 4.85:1 on `--surface-strong`, 4.51:1 on
  `--surface-steel`, 4.52:1 on `--surface-tint`. **It was chosen to clear
  4.5:1 on every surface in the palette**, so there is no "accent text may
  not go here" rule to remember. That is deliberate: a rule of that shape
  is what the old yellow cost most.
- `--jr-open-year` **#FF6A55**, the dark theme's lighter cut, for accent
  text on a dark surface in either theme. The opened timeline card is the
  only one. 6.24:1 in light, 4.65:1 in dark.

**Three of the brief's values were measured and changed. All three are
recorded in style.css at the declaration:**

| token | asked for | measured | shipped | measured |
|---|---|---|---|---|
| `--faint` | `#8A8F94` | 3.04:1 on `--bg` | `#6C7278` | 4.54:1 |
| `--accent-text` | `#D93A24` | 4.27:1 on `--bg` | `#C72F1C` | 5.08:1 |
| `--accent-hover` | `#E63E27` | 4.26:1 under `--accent-on` | `#EE4531` | 4.64:1 |

The hover one is the interesting one: a filled button's label is small
text, and taking coral DARKER on hover drops its contrast against a
near-black label. `#EE4531` is still a deeper, denser coral than
`--accent` and carries the label.

`--faint` is corrected but **nothing reads it**: it is declared in both
theme blocks and `var(--faint)` appears nowhere in the file, so the
brief's value would not have broken anything visible. It is fixed so the
next thing to use it does not inherit the failure silently.

**`--body` is DERIVED and is not in the brief.** The brief gives three
inks and the page uses four: body copy is `--body` and small labels are
`--muted`, and the pattern of a weight-600 word in `--text` inside a
`--body` sentence needs them to be different colours. Collapsing them
would flatten an emphasis pattern used throughout.

#### The yellow split in two, and that is the main structural change
`--accent-2` and `--on-accent-2` are **deleted**, along with the
`--yellow` alias. One token was doing two unrelated jobs and the two go
to different places:

1. **The marker behind a key fact** is `--surface-tint` with `--text` on
   it, **an OPAQUE pale block**, 14.41:1 in light and 13.01:1 in dark.
   Five rules: `.jr__hl`, `.jr__lead em`, `.gr__hl`, `.ct__hl`, and the
   dead `.pitch-band__line strong` gradient, which is the highlighter
   stroke variant kept on the same token so it cannot drift.

   **The claim that the tint flips with the theme was not true of
   style.css for a long time**, and that is the sentence that cost two
   steps: the token was declared in `:root` and never in the dark block,
   so in dark mode the fill stayed pale coral under near-white ink and
   every marked fact on the page was unreadable. STEP 43 found it and
   routed around it with nine tokens of its own and a translucent chip;
   STEP 45 deleted those and declared the missing line. **It is true
   now.** See the STEP 43 and STEP 45 sections at the foot of this file.

   **Opacity is what keeps it one pair of values.** A block that paints
   its own ground does not care what is behind it, so there is no
   per-surface override anywhere: the same two tokens hold on the page,
   on a white card, on a steel panel, on the dark band in either
   direction and inside an opened timeline card.
2. **A chip, a pill or a badge** is `--brand` with `--on-brand`, 5.29:1.
   `--brand` is **FIXED in both themes AND on the dark band**, which is
   exactly the role the yellow played. Seven rules: `.section__num`,
   `.stat__value`, `.rail__stat-value`, `.hx__badge`, `.sb__logo`,
   `.logo-pill`, `.sb__logo::before`, plus `.hx__num` and `.sb__num`,
   which are coral numerals on `--chip-bg`.

Both old names are **gone from the file rather than aliased**, and so is
`--yellow`. A token called `--accent-2` holding a pale tint, or one
called `--yellow` holding a coral, is a trap for the next edit.

**One rule had to WIDEN, and it is easy to miss.** The reading highlight
dims an inactive section number to `--muted`. On the old yellow chip the
light theme's `--muted` was a dark grey at 5.6:1 and only the dark
theme's light grey failed, so the override that forces the ink back was
scoped to `[data-theme="dark"]`. **Coral is a mid-luminance colour, so
both greys fail on it** (2.26:1 light, 2.35:1 dark) and the scope had to
go. The rule is now
`.js .section:not(.is-active) .section__num { color: var(--on-brand) }`,
same specificity as the dimmer and later in the file.

`--surface-steel` and `--ink-block` are declared because the palette the
redesign is built on names them, and **nothing reads either one yet**.
The tinted grid they are for arrives in a later step.

#### `--cursor-ink` is not a palette colour
The custom cursor is `mix-blend-mode: difference`, which paints 255 minus
its backdrop, and **pure white is the only value for which that inversion
is the true complement.** It does not flip with the theme, the palette
must never reach it, and nothing else may use it. It is a token only so
that nothing in style.css is a bare literal. See STEP 31.

### Dark theme (STEP 10)

`[data-theme="dark"]` on `<html>`. There is one block of overrides near the
top of style.css and nothing else in the file knows the theme exists: no
component carries a colour literal any more.

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

**`--brand`, `--on-brand` and `--ctc-prim-sub` / `--ctc-prim-well` are
NOT redeclared here**, and that is the headline change: they are colours
on the accent, and the accent no longer moves.

#### The accent stopped inverting, and that is the structural change
The old accent was charcoal, the colour of the LIGHT page's text, so on a
dark page it had to flip to an off white or it would have been invisible,
and everything sitting on it flipped with it.

**Coral is a hue rather than a value**: #FF4B32 is 3.11:1 on the light
ground and 5.12:1 on this one, so it works on both and the brand colour
is the same colour in both themes, which is what a brand colour should
be. `--accent-on` is #17191C in both. `--on-accent` still tracks
`--accent-on` rather than holding a literal, because the dark band
rebinds `--accent-on` and the alias has to follow it there.

What still flips is `--accent-text`, and **the split is now the reverse
of the light theme's**: there the small-text cut is DARKER than the
accent, here it is LIGHTER. Both exist because coral at 3.11:1 on the
light ground cannot carry small text.

**Three kinds of token, and it matters which is which.**
1. THEME tokens flip: `--text`, `--surface`, `--border` and the rest.
2. FIXED tokens do not, because they are a colour ON something whose own
   colour never changes, or because they are not a palette colour at
   all: `--brand` and `--on-brand` (the coral chip and its ink, the pair
   the old yellow left behind, fixed in both themes AND on the dark
   band), `--gr-badge` (the white tile a real brand logo sits on),
   `--chip-bg`, `--avatar-bg`, `--overlay`, and `--cursor-ink`. (The
   laptop scene's `--ct-*` tokens went with the laptop in STEP 19, and
   `--scrim` went with the video lightbox in STEP 29.)

   **`--on-accent-2` used to be in this list and is DELETED.** It was
   near-black on yellow, and the yellow did not flip so its ink could
   not either. The marker is `--surface-tint`, which DOES flip now that
   the dark block declares it, so its ink is simply `--text`.

   **There is no fourth kind of token.** STEP 43 introduced one, a set
   keyed to the SURFACE rather than the theme, because its translucent
   marker had to know what was behind it. STEP 45 made the marker opaque
   and deleted all nine. Three kinds is the whole taxonomy again.

   **`--on-accent` left this list in STEP 30 and has not come back.** It
   tracks `--accent-on` for the dark band's sake, above.
3. INVERTED tokens flip the other way: the whole `--vid-*` set, plus
   `--gr-figure`. The `--vid-*` name is historical. It is the dark
   band's palette, and the band is Growth now.

   **`--gr-rim` was in this list and is DELETED.** It was a near-black
   stroke round the yellow Growth figure, which existed only because
   yellow was 1.02:1 on the light band. `--gr-figure` replaces it with
   the colour itself: #FF4B32 on the dark band, #C72F1C on the light
   one. Two values, because the band inverts and the coral does not.

**Shadows deepen, they do not invert.** `--shadow-1` to `--shadow-4` go
from rgba(0,0,0,0.05..0.32) to 0.30..0.70. A light shadow on a dark page
is a glow, and a glow on every card makes a dark theme look radioactive.

**`--accent-fill` and `--accent-fill-hi` are still aliases of `--accent`
and `--accent-hover`.** They existed because the violet `#8b5cf6`
measured 4.23:1 under white text and most of that text is small, so a
filled control needed a darker cut of its own. Neither charcoal nor coral
does, for opposite reasons: charcoal carried white at 14.6:1 either way,
and coral carries the page's own ink at 5.29:1 either way. The names stay
because twenty-four rules read them, and because a future accent may need
the split again.

**The dark band still inverts, and STEP 41 kept that deliberately.** It
is the page's one reversed-out section, so it is dark on a light page and
light on a dark one, and the sidebar panels that pass over it switch to
whichever style it is not. The switch code in script.js is untouched:
`.is-dark` still only means "this panel is over the band", and only the
values underneath it swap. `--vid-bg` is **#1A1C20**, the dark palette's
own `--bg`, and the rest of the set is restated from that palette;
in dark mode it becomes **#F0F2F3** with the light palette under it.

**The accent rebinding inside `.gr` stays, and the REASON for it
changed.** It was written because the old accent was the colour of the
page's text and therefore invisible on the one section whose background
is the other one. Coral has no such problem, 5.12:1 on the dark band. The
rebinding now buys HIERARCHY rather than visibility: a filled control
inside a reversed-out section wants the band's own two tones, and a coral
fill in the middle of it would read as a second accent. Do not delete the
block on the grounds that the old reason is gone.

**No flash on load.** An inline script in `<head>`, above the stylesheet
link, reads localStorage then `prefers-color-scheme` and writes the
attribute before the first paint. It is deliberately duplicated logic
rather than part of the theme module, because anything deferred runs after
the first paint and the page would show a frame of the wrong theme.

**The crossfade is temporary.** script.js puts `.is-theming` on `<html>`,
which turns on a 0.3s transition for background-color, border-color,
color, fill, stroke and box-shadow, then takes it off after 320ms. That
gets no transition on first load by construction, no permanent transition
fighting every component for the rest of the visit, and nothing to undo.

**The toggle** is a round icon button, moon in light and sun in dark, both
icons always present and crossfading with a rotate. Three copies, one
visible at a time: in the sidebar beside the LinkedIn button, in the hero
top right until the sidebar goes live, and in the mobile top bar beside
MENU. `aria-label` says which mode it switches TO, and it carries
`aria-pressed`.

**Contrast is checked, not assumed. STEP 41 measured 86 pairs across both
themes and both states of the band, and all 86 pass**: 4.5:1 for text,
3:1 for text above 24px and for UI graphics. Four values moved to make
that true and every one is recorded at its declaration: `--faint`,
`--accent-text`, `--accent-hover`, and `--ctc-prim-sub`'s alpha, which
went 0.82 to 0.86 because the old alpha composited to 4.28:1 on the
coral fill and the new one reaches 4.54:1.

The traps found by measuring, in this step and earlier ones: text on the
marker; the reading highlight dimming a section number that sits on a
chip, which STEP 41 had to widen from the dark theme to BOTH because
coral is mid-luminance and both greys fail on it; `--accent-text` landing
on a tinted block, which is why the shipped value clears 4.5:1 on every
surface in the palette rather than only on `--bg`; and the dark band's
marker inheriting the page's grey rather than the band's. Contact's
accent was another until STEP 19 deleted the laptop it lived inside, and
the conversation that replaced it brought the same kind, `--cv-live` at
0.78rem failing at 2.85:1, before STEP 38 deleted that too.

One bloom permitted per screen, heavily blurred and low opacity. `--glow`
is a gradient, not a flat colour. Three elements use it as a
`background-image`, and since STEP 41 it is a coral wash at low alpha,
reading as the accent bleeding into the ground. `--glow-warm`, behind the
Contact heading only, is the fainter of the two; it used to be the one
deliberate exception to "glows follow the accent" and is not an exception
any more. The phone intro's bloom is `--bloom`, the one gradient drawn at
full strength and animated to nothing.

**The hero ground is `--bg` plus ONE large soft radial of `--bg-glow`
near the top centre, and nothing stronger.** It is `--hero-wash`, a
`background-image` on `.hx` rather than a third fixed element, because
STEP 34 spent a whole step removing composited layers from the first
screen and an image on an element that is already painted costs nothing.
`--bg-glow` is a flat colour in both themes, an opaque pale coral in
light and a 0.07 alpha in dark, so one value sets the gradient's inner
stop either way.

Background particles are the accent and a steel grey at low opacity
(`PARTICLE_SETS` in script.js, **the one place in the project that holds
a duplicate of a palette value**: a `getComputedStyle` per particle per
frame is what the loop cannot afford, so the four values are written
there and have to be changed there when the palette moves).

### A keyframe offset is not a selector (STEP 28's one bug, fixed in 31)
The rewrite that moved every reduced-motion rule from a media query to
`html.rm` also prefixed the OFFSETS inside two `@keyframes` blocks, as
`html.rm 0%`, `html.rm 35%`, `html.rm from`. An invalid keyframe
selector drops the whole block, so `mi-fade` and `mi-fade-out` had no
states at all and the phone's reduced-motion intro ran a 500ms animation
that did nothing and left the bloom up. The scoping belongs on the rules
that USE the animation, where it already was.

### Motion is the SITE's setting, not the operating system's (STEP 28)
**The page animates by default, including when iOS Reduce Motion is on.**
Nothing reads `prefers-reduced-motion` any more. The class `html.rm` is
what turns motion down, and it is set by the visitor through the control
in the footer, remembered in `localStorage` under `motion`, and applied
by the inline head script before the first paint so the intro never
starts playing before being told not to.

Every rule that used to live inside an
`@media (prefers-reduced-motion: reduce)` block is now scoped to
`html.rm` instead. The rules themselves are untouched; they simply wait
for a class. Two blocks that also carried a width condition kept the
width query and lost only the motion one. In JavaScript, `reducedMotion`
is no longer a MediaQueryList but a plain object with a `.matches`
property, so all twenty-odd modules below read it exactly as before.

Scoping gotcha, since it bit during the rewrite: `html.rm` has to MERGE
with a selector that already starts with `html` or `:root`, never sit in
front of it. `html.rm html.is-intro .x` matches nothing, because one
`html` cannot contain another.

**The honest cost, written down so nobody has to rediscover it.** A
visitor with a vestibular disorder who has set Reduce Motion at the OS
level now gets the full parallax on arrival and has to find the footer
control to turn it off. That is the trade the site owner chose, on the
grounds that iOS Reduce Motion is switched on far more often than people
expect and was leaving the site looking static and half-built for people
who had never asked THIS site for anything. It is why the control exists,
why it is a labelled button and not an icon, and why it is in the footer
of every screen rather than inside a menu. Do not remove it.

The settings a module reads once at init (the What I Bring fade, the
desktop morph's `live` flag) only change on the next load. The class
persists, so a reload always lands correctly; the toggle is immediate for
everything driven by CSS and by per-frame reads, which is most of it.

### What "reduced" means when it is on: soften, do not remove (STEP 11)
There is no blanket `animation-duration: 0.01ms` any more. Animations keep
their durations and easing; what is removed is **distance, scale, rotation,
blur, parallax, pinning and momentum**. Nothing may travel further than
`--rm-shift` (6px) or scale by more than 0.02. The vestibular trigger is
large movement across the viewport, not the existence of a transition, and
the old approach meant most of the site simply did not animate on iOS,
where Reduce Motion is on far more often than people expect.

These run in **both** modes: counters and count-ups, the typing scene, the
word-by-word reveal (fade only, no blur), the timeline line drawing, card
reveals (fade only), the marquees (unchanged), the dark-section sidebar
switch, and the phone intro (fade version).

### The portrait's edges (STEP 13, re-measured in STEP 33)
`portrait-cutout.png` is only half a cutout, and this is measured, not
guessed. **The asset was replaced in STEP 33 and is now 1200x1500, 280KB**
(it was 448x557, and for a while a catastrophic 3750x4688: see STEP 33
below). Re-measured on the current file, and the character is unchanged:
the alpha row at face level reads `0 0 0 0 255 255 255 255 0 0 0`, so the
head is properly cut out, but at shoulder level it reads 255 all the way
across, **474 of the 1500 rows on the left edge are fully opaque, 510 on
the right, and all 1200 along the bottom**. That is 31.6% / 34.0% / 100%,
against the old asset's 32.5% / 34.5% / 100%: the same crop, resized. The
lower third is a hard crop. The straight cut is the image, not the mask.
Fixing it properly needs a new asset; until then the mask hides it.

**So the three mask layers below are still load-bearing.** A bigger,
cleaner-looking file did not remove the reason they exist, and nothing
about STEP 33 licenses simplifying them.

**A replacement photo was tried in STEP 22 and rolled back.** Worth
keeping the finding, because the next replacement can hit it too: that
PNG had no fully transparent pixel anywhere. 38.4% of its canvas was
exactly `rgba(0, 0, 0, 77)`, a uniform 30% black wash over the whole
rectangle. The mask multiplies alpha, so it faded the wash at the edges
but could not remove it, and the hero showed the portrait inside a
visible grey box with a hard top edge cutting across MOHAMED.

**So measure the alpha before anything else when the photo changes.** A
PNG exported with a flattened or semi-transparent background looks
correct in a viewer that composites it on white and wrong on this page,
and the symptom is a grey rectangle that reads as a CSS fault rather than
an asset fault. If it needs repairing, remap the channel linearly
(`new = (old - floor) / (255 - floor) * 255`, clamped at 0) rather than
thresholding it, or the feathered edge around the hair goes jagged.

**STEP 36c: the asset is 1000x1250 truecolour now, and the reason was a
line down the jacket.** The 280KB file was an INDEXED PNG quantised to 256
colours, and a large near-black jacket is exactly what that ruins: the
whole jacket held **15 distinct colours**, so the soft edge of the lapel
became a one-pixel step from luma 16 to luma 33 and read as a drawn line.
It survived every change to the mask, which is what proved it was in the
asset. Measured on the 3750x4688 original, that same block holds 893
colours and the edge is a gradual ten-pixel transition.

It is regenerated from the archived original in `_baseline-step33/`, not
re-saved from the small file, because the colour information was already
gone. Resampled **premultiplied**: interpolating straight alpha bleeds
colour out of transparent pixels and leaves a dark halo round the hair,
which is the standard way a cutout is ruined on resize. Encoded through
WIC rather than GDI+, worth about 40% of the file size.

`1000x1250, 1047KB` is a chosen point on a measured curve. 1000px covers a
phone exactly (320 CSS px at 3x needs 960) and is mildly soft on a 2x
desktop, which wants ~1224. It costs 767KB of download against the banded
file and **hands back 2.1MB of decoded memory**, 6.9MB to 4.8MB, which on
this page is the number that matters. A denoise pass over the dark areas
saved a further 140KB and cost 18% of the measured hair detail, so it was
dropped.

**If it is ever re-compressed, the quantiser MUST dither.** That is the
whole difference between 280KB that looks right and 280KB with a line in
it. An undithered 256-colour pass over this image puts the line straight
back, and it reads as a CSS fault rather than an asset fault, exactly as
the wash in STEP 22 did. Note also that WPF's own Indexed8 conversion was
tried and **destroys the alpha channel outright** (100% opaque out), so it
is not an option.

The STEP 33 replacement was measured against exactly that and passes:
**41.35% fully transparent**, 57.28% fully opaque, **1.36% in between**,
which is a proper anti-aliased outline rather than a threshold, and **no
single intermediate alpha value covers more than 2% of the canvas**, so
there is no uniform wash. Top corners 0, bottom corners 255. Run that
check, not a look at the file in a viewer, on the next replacement too.

**And measure the PIXEL DIMENSIONS, not the file size.** This is the STEP
33 lesson and it is the one that actually took the site down. Decoded
memory is `width x height x 4 bytes` and a PNG has no compressed form in
RAM, so how well the file zips says nothing about what it costs a phone. A
300KB PNG that is still 3750px wide crashes an iPhone exactly as a 11MB
one does. **Keep it at or under about 1200x1500.**

Three mask layers, **intersected**. The default composite is `add`, which
unions them: every layer would only ever make the picture more visible
and the whole thing would do nothing. `mask-composite: intersect` (plus
`-webkit-mask-composite: source-in` for Safari) means a pixel survives
only where all three agree.
- horizontal: transparent at 0%, opaque 18% to 82%, transparent at 100%
- vertical: the last 25% fades out, so the shoulders dissolve into the
  section below rather than stopping on the image's own bottom edge
- radial: an ellipse centred at 50% 38%, which is the face, not the
  middle of a box whose bottom third is shoulders

The mask colours are the only ones in style.css outside the palette, and
deliberately: in a mask the colour is an opacity stop, not a colour.
Tokenising them would let the theme change how much of the portrait is
visible. It blends into whichever `--bg` is behind it either way, because
what fades is alpha.

`--hx-shadow` is a `drop-shadow` in `--shadow-2`, which reads the MASKED
alpha, so the shadow follows the feathered silhouette rather than the
image's rectangle, and deepens on the dark page instead of glowing. **It
has to be repeated in every keyframe and every inline write that touches
`filter`**, because whatever sets `filter` last owns the whole property.
The reduced-motion block is the same trap: `filter: none` there would take
the shadow with the blur, so the portrait is excepted and keeps it.

### The phone's hero parallax (STEP 13, blur removed in STEP 33)
Below 900px, read from scrollY on a rAF so scrolling back up runs it
backwards through the same numbers rather than replaying in reverse.
Portrait: translateY -15% of the distance scrolled, scale 1 to 1.06, fade
from progress 0.5. The name moves at twice the portrait's
rate so the two visibly come apart. The headline and buttons are gone by
0.6, leaving the portrait alone for the second half. Reduced motion: fade
only, in the same order.

**There is no blur on the portrait here any more, and there must not be
one again.** It was 0 to 10px, written to `style.filter` on every scroll
frame of the hero. `transform` and `opacity` are composited, so the layer
is rasterised once and the GPU moves it; `filter` is not, so each write
re-rasterised a picture carrying three intersected masks AND a drop-shadow
that reads the masked alpha. That is several full-size surfaces per frame
on the page's first screen. See STEP 33.

**The intro has to hand the properties back first.** Its animations are
filled, and a filled animation outranks an inline style, so every
transform, opacity and filter the parallax writes would be silently
ignored. `html.is-settled` drops them, added on a 2100ms timer OR on the
first scroll past 1% of the hero, whichever comes first. This is the same
trick `.hx.is-ready` plays for the desktop morph.

### Mobile intro (STEP 11)
The hero name and portrait used to appear off to the side and jump to the
centre on first load. Cause: `@keyframes hx-rise` and `hx-in-x` bake in
`translateX(-50%)`, which IS the centring for the absolutely positioned
desktop hero, and those `.js .hx__*` animation rules applied at every
width. On a phone both elements are ordinary flex items centred by their
container, so the keyframe dragged them half their own width left and held
them there for the whole 1.9s intro. Measured at 390px: portrait at x=48,
headline at x=16, against a viewport centre of 195. **The desktop intro
keyframes are now scoped to `min-width: 900px`.**

The phone has its own intro: bloom, then the name letter by letter, then
the portrait, then headline, buttons, stats and traits, then the top bar.
`.is-loading` from the inline head script holds the hero until the fonts
and the portrait are in; the inline script arms its own 1600ms fallback so
a failure in script.js cannot leave the page covered.

**The letter split is mobile only.** On desktop the wordmark is what the
hero-to-sidebar FLIP measures and morphs, and inline-block letters do not
carry the same text metrics as a plain run, which would put that 0.00px
landing off.

### Typography
- Inter from Google Fonts: 400, 500, 600, 700, 800.
- Hero name: `clamp(3rem, 12vw, 8rem)`, weight 800, line-height 0.9,
  letter-spacing -0.03em. Terminal punctuation (the full stop after the name)
  rendered in `--accent`.
- Section headings: `clamp(2rem, 5vw, 3.5rem)`, weight 700.
- Selected words inside body copy may be weight 600 in `--text` while the rest
  of the sentence is `--body`. This emphasis pattern is used throughout.
- Occasional italic accent word in headings for rhythm.
- Small labels: 0.75rem, uppercase, letter-spacing 0.16em, `--muted`.
- Body: 1.05rem, line-height 1.75, `--body`, max 65ch.

### Section headers
Every section opens with a two-part label in the small label style:
`01 / Work`, `02 / Growth`, `03 / What I Bring`,
`04 / How I Can Help`, `05 / What People Say`, `06 / Contact`.
Number in `--accent`, title in `--muted`.

**The numbers are positional and were renumbered in STEP 36** when
Growth moved up from fourth to second. They are typed into the markup in
six places plus the six `.menu__num` values in the mobile menu, so a
future reorder has to touch both lists. Growth's marker renders its title
uppercase from the markup (`GROWTH`), which is unchanged.

### Motion
- Scroll reveals: children rise 24px and fade, 100ms stagger, 600ms,
  `cubic-bezier(0.16, 1, 0.3, 1)`, once only.
- Two infinite horizontal marquees (see sections below), CSS-transform driven,
  paused on hover, paused when off screen.
- Stat counters animate from 0 to their value when scrolled into view, once.
- Reactive particle canvas behind all content, accent-tinted, low opacity, cursor-
  reactive on desktop and scroll-reactive on touch. 30fps cap, tab-hidden pause,
  reduced count under 768px.
- Custom cursor with sparkle trail on desktop only, via `(hover: hover)`.
- All hover behaviour gated behind `(hover: hover)` so touch devices never get
  stuck hover states.

### Spacing between sections on mobile
Below 900px the gap at a section boundary is **80px**, measured from the
last thing painted above it to the first thing painted below it, with the
reveals at rest. Nothing in that stack may be sized in `vh`: 12vh and 16vh
are comfortable on a laptop and 101px and 135px on a 390x844 phone, and
they stack at every boundary. The scrolling text band's own 24px padding
sits inside its two hairlines and is part of the band, not part of the gap.

The Work section ends where the timeline ends. Its dashed tail runs 90px
on mobile and finishes above the last card's bottom edge, so there is no
run-on to leave room for, and `.jr` carries 1.5rem of breathing room
rather than a vh-based reserve.

---

## Page sections, in order

**STEP 36 reordered the page and renumbered it. The live order is:**

```
  Hero
  01 / Work          #work
  02 / Growth        #content     <- moved up from 04
  pitch band                      <- moved down, and rewritten
  03 / What I Bring  #capabilities
  04 / How I Can Help #help
  05 / What People Say #say
  name divider       #mb
  06 / Contact       #contact
```

**Why Growth moved, and it is the whole point of the reorder.** It is the
only section on the page with a complete causal chain, a starting
condition, named decisions and measured outcomes, and it was sitting at
screen 10.3 of 14.7, behind both of the page's drop-off zones. It is now
at screen 5.4, directly after Work, where the reader arrives with the
career context and nothing else in between.

**The numbering is positional, so it moves when a section does.** Three
markers changed: Growth 04 to 02, What I Bring 02 to 03, How I Can Help
03 to 04. Work stays 01, What People Say stays 05, Contact stays 06. The
mobile menu's `.menu__num` values carry the same numbers and were changed
with them.

**Three nav lists have to agree, and two of them agree BY INDEX.** The
hero-to-sidebar morph pairs them with `data-fly-nav="N"` on the hero link
and `sbLinks[N]` in sidebar DOCUMENT order, so reordering one without the
other silently flies each link to the wrong row. All three are now:
Work, Growth, What I Bring, How I Can Help, What People Say, Contact.
Verified index for index after the move. The hero row keeps its short
labels (`Help`, `Reviews`), which is unchanged and intended.

**The sidebar's active-state observer is order-agnostic** and needed no
change: it looks a link up by `[data-sb-link][href="#" + id]` from the
observed section's own id.

**`id="content"` still names the Growth band** and must keep doing so:
the sidebar's dark-panel switch finds the band with
`getElementById('content')`. Moving the section does not affect it.

1. **Nav**. Fixed. Name at left, links at right, plus a Resume link that
   downloads `cv.pdf`. Transparent over the hero, translucent blurred
   background once scrolled. Active section highlighted. Mobile: full-screen
   overlay menu, wipe-in from right, staggered numbered links.

2. **Hero**. Full height.
   - Eyebrow label: there is none in the markup and has not been for some
     time. This entry used to promise `Technical Customer Success`.
   - Name, huge, with an accent full stop
   - Buttons, STEP 40, and the hierarchy is the point: `Book a meeting`
     FILLED and first, `Get in touch` outlined, `View work` a plain link
     with an arrow, `Resume` phone only. Three buttons of equal weight
     meant no primary at all.
   - A row of four stat blocks beneath: value large, label small. The
     SIDEBAR carries six since STEP 44; these four are unchanged.
   - `.hx__tag`, the positioning line, then `.hx__desc`, one sentence:
     `I bring customers in, close them, and keep them.` STEP 44 replaced
     "I keep customers happy, bring new ones in, and build the automations
     that let both scale", which led with retention and ended on a claim
     the page had to evidence elsewhere.
   - `.hx__traits`, three items: Marketing, Business development,
     Customer success. See the traits section near the top of this file.
   - Portrait to the right on desktop, greyscale, colour on scroll position
     on touch and on hover on desktop
   - `Scroll` indicator at the bottom
   - Availability line: `Based in Morocco. Working with the world.`

2b. **Pitch band**. **This entry was stale until STEP 40; the Content
   section's own Pitch band entry is the authority.** It does NOT sit
   between the Hero and Work: STEP 36 moved it to between Growth and What
   I Bring, and replaced its single line with the three stepped blocks of
   the through line.

   Beneath it a small row: circular portrait avatar, a "Working with the
   world" pill, and a `Get in touch` button to `#contact`. **That button
   is `.btn--outline` since STEP 40**, not filled: it was a second filled
   button on the same desktop screen as the sidebar's, and the hero's own
   "Get in touch" is the outlined secondary, so the same words were
   carrying two different weights.

   Fades in on scroll with the shared `[data-reveal]` riser.

   The old claim that this is what the hero-to-sidebar migration measures
   its run against was also stale: the run is `RUN = 0.75` of a viewport
   in script.js and the pin height is `.js .hz { height: 150vh }`. No
   element is measured for it.

3. **Marquee. DELETED in STEP 36.** It was an infinite horizontal strip
   of capability keywords between the pitch band and What I Bring. Every
   word in it was a heading somewhere else on the page. The sidebar
   ticker survives and is the page's only marquee now. See the Marquee
   keywords note in the Content section.

4. **Work (01)** - the whole of it. The old Selected Work section is gone;
   this one absorbed it, and the old Background section before that.

   A lead sentence at heading size with the accent word on the tinted
   marker, a four-line intro (max ~560px), then a **strengths row**: four
   blocks - Customer Success, Business Development, Marketing, Team
   Leadership - each a small accent icon, the strength name, and one line
   of proof carrying its number on a tinted marker. Four across, 2x2 under
   1200px, one column under 620px. The blocks come up one after another
   when the row arrives and the numbers count up; deliberately once only,
   unlike the cards below.

   Then the timeline: five cards alternating right/left down the page,
   centres ~60vh apart, horizontal offsets varied so it wanders rather
   than zigzags. Each card carries 1-3 strength tags under its summary,
   saying which strength that role built.

   A single SVG curve runs through them, drawn with
   stroke-dasharray/stroke-dashoffset against scroll position so it
   unwinds in reverse on the way back up, and continuing past the last
   card as a dashed run-on. **The path is never written by hand**:
   script.js reads where the cards actually landed and emits the cubics,
   re-measuring on debounced resize, on font load, and on every frame
   while a card is opening. The ring dots are placed at the very points
   the path was built from, so they are on the line by construction.

   **STEP 12: precise, not hand-drawn.** One symmetric cubic per gap,
   every gap built identically. The handle is `(0, 0.72 * segment
   height)`, added at the first dot and subtracted at the second, so the
   control polygon maps onto itself when rotated about the segment's
   midpoint. Measured swing is **83 to 87% of the content width** from
   900px to 1920px.

   **The handle is vertical, and that is forced, not chosen.** Three
   things were asked at once: one symmetric cubic per segment, collinear
   tangents through every dot, and the same horizontal amplitude in every
   segment. Give the handle any horizontal component and the third fails:
   the handle points one way while the dots alternate sides, so the
   segment running with it gets no overshoot and the segment running
   against it gets a lot. Measured, that was 261px of reach on one segment
   and 648px on the next, from an identical construction. A vertical
   handle has no direction to disagree with.

   **So the width comes from the dots, not the handle.** With a vertical
   handle a segment reaches exactly as far as the gap between its two
   dots. Two consequences, and both are load-bearing:

   1. The dots sit on each card's OUTER edge. The inner edges of two 540px
      cards in a 1028px column are only ~96px apart, which would cap every
      sweep at 96px however the bezier was built.
   2. The five varied card indents (`--o1` to `--o5`) are gone, replaced
      by one 4% indent mirrored left and right. Five different indents
      meant five different sweeps no matter how uniformly the curve was
      generated. That is where "precise, not hand-drawn" actually gets
      decided, not in the bezier.

   Nothing is clamped or fitted any more. A vertical handle cannot leave
   the box its two dots are in, so the curve cannot reach the page edge.

   **The line is dotted, and the reveal moved to a mask.** It used to draw
   itself with `stroke-dasharray` plus a running `stroke-dashoffset`. The
   dot pattern needs the dasharray for itself, and one property cannot do
   both, so the reveal now lives on a copy of the same path inside an SVG
   `<mask>`: white, 14px wide, carrying the dasharray/dashoffset pair. The
   visible path keeps its dots and appears where the mask has been drawn.
   Same scroll mechanic, same exact reversal on the way back up. script.js
   writes the identical `d` to both paths; if they ever diverge the mask
   reveals a shape the line does not follow.

   Dots, not dashes: `stroke-dasharray: 0.01 10` with round caps. A dash
   LENGTH of zero paints one round cap per position, which at a 2px stroke
   is a 2px circle. A 2px dash would paint a 4px pill once the caps are
   added and read as a short dash. 0.01 rather than a bare 0 because some
   engines drop a zero-length dash entirely. The tail keeps real dashes
   (`10 12`), because it is an ending rather than more of the line, and its
   own reveal is opacity, so it never touched the dasharray.

   **`JR_DROP` (40px) sits the path below the cards' centre line.** Added
   to every anchor, so the curve and the dots move together and the dots
   stay on the path by construction. It translates the path rather than
   stretching it: same length, same section height, tail still inside the
   box.

   **Stacking: line 0, cards 1, dots 3.** The line runs BEHIND the cards;
   each card hides the stretch under it and the curve reappears on the
   other side. That is why it is at full opacity with no mask: the cards
   do the hiding. A mask would also have needed rebuilding every time a
   card opened or the column reflowed. The dots need a layer of their own
   (`.jr__dots`) because a dot inside `.jr__list` can never paint above a
   sibling of the list, however high its own z-index. `.jr__rule`, the
   hairline that joined a card to a vertical line beside it, is gone on
   desktop; there is no vertical run left for it to join.

   Below 900px the line is a rail down the left with a 40px wave on it
   (±20px), same mirrored construction, behind the cards.

   A card is hidden (opacity 0, translateY 40px) until its own top comes
   up past 75% of the viewport, and hides again when it drops back below.
   That check is read on the same frame as the line, which is what keeps
   card, dot and line arriving together. The year counts up every time.

   "Read more" turns a card dark (#1f1f1f) in place: the year swaps to its
   full four digits at the same size and weight, the summary and its tags
   collapse, and the long text opens followed by a short **What I brought**
   list. So it reads: big full year, close button, title, badges, full
   text, what I brought. One at a time, closed by the button or Escape.
   Below 900px the column is single and the curve straightens into a rail.

5. **What I Bring (03)** - a huge two-line gradient heading, then one
   sentence with an inline chip on each capability. Hovering, tapping or
   pressing Enter on a chip opens a card anchored to it. The sentence is
   pinned for one extra viewport height and its words come into focus
   left to right on scroll position, so it unwinds on the way back up.
   See the Content section below for the wording, the cards and the two
   stacking traps the reveal sets.

   The old four-card [data-rail] carousel that lived here is gone, but
   **the rail's JavaScript and its .cardrail chrome were deliberately
   kept**, and What People Say still uses them. The
   contract: [data-rail] wrapper, [data-rail-row] track, optional
   [data-rail-prev/next] arrows and [data-rail-fill] progress bar, plus
   two opt-ins, data-rail-nowheel (leave the wheel to the page) and
   data-rail-momentum (throw, then settle on the nearest card).

6. **How I Can Help (04)** - a two-line heading, one dark line and one
   in --body, then a single panel holding three cards: **Marketing,
   Business Development, Customer Success**, which is the STEP 44 order.
   It ran the other way round and put the page's own sequence of work
   backwards. Each is an accent badge and
   title, a result line with its number on the tinted marker, a short
   description, and a "What you get" list of three. The list is pinned to
   the bottom of the card with `margin-top: auto`, so the three cards
   finish flush however differently the copy above wraps.

   **One call to action for the section**, not one per card: a single
   filled accent button, centred under the panel, reading `Let's talk`
   and linking to Contact.

   **The highlight is one element that slides**, not three backgrounds
   fading in and out - three crossfades read as a flicker as the cursor
   crosses the row. **It rests on the FIRST card since STEP 44**, follows
   the hovered card (and the focused one, for keyboard users), and
   returns to the first on leave. `hlpHome` in script.js was
   `Math.floor(hlpCards.length / 2)` and is the constant `0`: "the
   middle" was only ever shorthand for "the card that matters", and
   Marketing is that card now. It is measured from where the cards
   actually are, so it
   survives a change of copy or a reflow. Below 900px there is no cursor
   to follow: the highlight is dropped and every card wears the colour.

   **The reveal stagger needed no change.** The delays are
   `.hlp.is-in .hlp__card:nth-child(3)` and `(4)`, and `.hlp__glide` is
   child 1, so the cards are children 2, 3 and 4 and the stagger follows
   document order. Reordering the markup reorders the stagger with it.

   Cards fade up 26px one after another when the panel arrives; under
   reduced motion they are simply there and the highlight jumps rather
   than travels.

7. **Marquee CTA. Deleted in STEP 36, RESTORED in STEP 38** with new
   words and a new position. Large accent-tinted scrolling text, 252px of
   desktop height, now sitting between How I Can Help and What People Say.
   It reads `Customer Success · Business Development · Growth Marketing ·
   Team Leadership ·`.

   The old words were `Keep Customers · Grow Revenue · Automate The
   Rest ·`, and "Automate The Rest" is not coming back: it was the page's
   third unevidenced automation claim, and STEP 36 removed it on that
   basis. The four words here are the four things the sections on either
   side of it actually demonstrate.

   **It was restored from `_baseline-step36/`, not rebuilt.** STEP 36 only
   ever deleted the markup; the eight `.marquee--cta` CSS blocks and
   `body.is-migrating .marquee + .section` were left in the file and
   flagged as dead, so there was nothing to put back in style.css.

8. **Growth (02), and since STEP 36 it sits directly after Work** - the
   page's one dark band, full width and passing
   under the sidebar. The inner content keeps the ordinary section gutter
   and the ordinary `.wrap`, so the pill, heading, paragraph and the
   cards land on exactly the same left edge as every section above.
   Padding does not shrink a background box, so the dark fill still runs
   the full width. Two case study cards side by side, one column below
   1180px. See the Content section below for the copy, the card design
   and the whole of STEP 29 and STEP 30.

8b. **Name divider**. The full name on two lines, MOHAMED / ELHAYYANY,
   filled in `--text`, sitting **immediately before Contact**. Decorative and
   aria-hidden: the name is already the page title, the hero wordmark and
   the sidebar logo, and a fourth reading helps nobody.

   Drawn as one SVG. **The clipPath and the visible letters are the same
   `<text>` nodes**, so the letters and the window the photographs appear
   through cannot drift apart the way a CSS clip built from a duplicate
   copy of the text would once a web font loads.

   On a fine pointer, moving across the name spawns a photograph from
   `assets/collages/` every 90px of pointer travel, clipped to the
   letters, fading in and out over 1.2s. Distance, not pointer events: a
   pointermove can fire sixty times over ten pixels.
   No trail on touch or under reduced motion; the name itself stays.

   **Built for frame rate, and the shape of it is the point** (STEP 18).
   The first version created an `<image>` per spawn and removed it on two
   nested timers, so a fast scribble meant a dozen node insertions and
   removals a second, each a fresh image load, each starting its own CSS
   transition, all inside a clipped group. It stuttered. Four rules now,
   and none of them is optional:

   1. **A fixed pool of eight** `<image>` nodes, built once at init and
      reused for ever. Nothing is created or destroyed while it runs.
      Eight is not a ceiling that gets hit: at an ordinary mouse speed
      eight slots last about as long as one picture's 1.6s life, so the
      pool only truncates the tail during a hard scribble, which is the
      intended trade.
   2. **Every picture is fetched AND decoded before the section can be
      reached**, on an IntersectionObserver with two viewports of warning,
      and the `Image` objects are held in an array. The array is not
      bookkeeping: drop the references and the browser may throw the
      decoded bitmaps away, and the second pass across the name stalls
      exactly like the first.
   3. **One requestAnimationFrame loop** does the spawning and the fading.
      `pointermove` is passive and records two numbers. Nothing is on a
      timer, so nothing drifts and nothing is left running.
   4. **`transform: translate3d` only.** `x`, `y`, `width` and `height`
      are attributes written once at init, with x and y at minus half the
      box so the transform puts the picture's centre on the pointer. A
      spawn never touches geometry. `will-change: transform, opacity` and
      `backface-visibility: hidden` on the pool; no `filter`, no
      `box-shadow`, no blur anywhere near a moving element.

   There is **no CSS transition on `.mb__shot`**. The loop writes opacity
   every frame, and a transition on the same property would be a second
   animator restarting a 400ms run on every write.

   The clip is never rebuilt: it is the same two `<text>` nodes the
   letters are drawn from, sitting in the markup. `mbFit()` resizes them
   on font load and on debounced resize, which is the only time they move.

   Measured at 1440 with GPU compositing, scribbling across the name at
   ~1700 px/s: median frame 16.7ms, p95 16.9ms, **zero dropped frames**.

   **The pictures are stored at the size they are shown.** They were
   675-736 x ~1300 portrait JPEGs, drawn into a 300x210 box with
   `preserveAspectRatio: slice`, so the browser decoded all ~0.9MP and
   then cropped 61% of it away on every paint. They are now 571 x 400,
   the exact 10:7 the box shows, q82: 1.68MB to 0.54MB, 68% smaller, with
   nothing lost that a visitor could ever have seen. Originals are in
   `_baseline-step18/assets/collages/`. Do not re-crop them again and do
   not change the 300x210 box without redoing both.

8c. **What People Say (05)**. Heading over a drag-only row of three
   quote cards, with a dash indicator top right, one dash per card, the
   active one wider and in the accent. Clicking a dash scrolls to that card.

   **Drag only, on purpose.** The row opts out of the shared carousel's
   wheel handling with `data-rail-nowheel`, so a vertical wheel over the
   cards scrolls the page as normal, and opts in to `data-rail-momentum`
   for the throw and the settle on the nearest card. Both attributes are
   generic: any other rail can use them.

   **The end of the run is a resting position in its own right** (STEP
   18). `settle()` used to round to the nearest multiple of one card
   pitch, and the run almost never divides by the pitch: three 620px
   cards with 20px gaps in a 1032px window give 908px of travel against a
   640px pitch, so the third card's own start sits at 1280, which is
   372px past the end of the scroll and can never be reached. A drag that
   had already arrived at 908 was rounded back to 640 and sent there,
   leaving the last card two thirds off the screen, the dash indicator
   stuck on the second, and a second drag doing nothing at all, because
   908 always rounds back to the same place. `settle()` now takes `max`
   whenever it is the closer of the two candidates.

   `maxScroll()` was never wrong: `scrollWidth - clientWidth` already
   equals cards + gaps + the row's right padding minus the visible width,
   measured live, so it is right after fonts load and after a resize with
   nothing to recompute.

   **The trailing gutter is two things added together**, which is what it
   was missing. The `clamp(1rem, 3vw, 2.5rem)` half only cancels `.say`'s
   negative `margin-right`: it buys back the page gutter the row was
   deliberately pushed out through, and on its own it is a return to
   zero, not a gutter. On a phone that left the last card finishing flush
   with the screen while the first started 36px in. `var(--space-lg)` is
   the gutter proper, and it is the same token that sets `.say`'s
   `padding-left`, so the space before the first card and the space after
   the last are one value and cannot drift apart. Measured at 390: 36.0px
   leading, 36.5px trailing.

   On a fine pointer, hovering the row hides the site's own cursor and
   shows a 90px accent puck reading DRAG with an arrow either side. It
   follows by lerp, scales in and out, and shrinks while held. It does
   not exist at all on a touch screen.
9. **Contact (06). STEP 37 rebuilt it, STEP 38 stripped it.** No form, no
   sequence and no chat. The order is the heading block, centred, then
   four cards full width: one primary and three secondary. Described in
   full under Contact in the Content section below.

   **Everything is readable and clickable on arrival.** The STEP 20
   conversation sequencer took about 2.2 seconds to reach the first
   address, and the addresses are the purpose of the section. STEP 37
   deleted the playback and kept the bubbles as copy; STEP 38 deleted the
   bubbles, the panel, the live clock and all fourteen `--cv-*` tokens.
   There is no JavaScript in this section at all now.

   **The availability line survived the chat and moved into the heading
   block** as `.ct__avail`. It was the one piece of information in the
   bubbles, so it is not lost with them.

   **One primary action per screen.** The Book a meeting card is the
   accent fill, and nothing else in the section wears the accent as a
   fill. The Call and Video call icon buttons came out of the chat header
   for the same reason, although both pointed somewhere real.

   The old closing statement with magnetic email and phone links went in
   STEP 20, and so did the magnetic module itself: it was built for those
   links, nothing else used it, and `data-magnetic` no longer appears
   anywhere. The laptop typing scene and the line that briefly replaced
   it are both gone too.

   **The section is not pinned to one screen**, but it fits in one.
   STEP 18c reserved `calc(100svh - var(--ct-footer))`; STEP 19 dropped
   that along with `--ct-footer` and the `display: contents` grid that
   went with it, and it has not come back. The section is as tall as its
   content and the footer follows it. What makes it fit at 1280x720 is a
   height-keyed padding rule, not a reservation. See the one-screen note
   under Contact below.

   The phone's section padding from STEP 18c survives because it is still
   right: `14vh` of an 844px screen was spending 118px at the top AND the
   bottom, more than a quarter of a screen, on nothing.

10. **Footer**. Name, role, location, current year.

---

## Content

### Hero
Eyebrow: none. This line used to read `Technical Customer Success` and
there is no eyebrow element in the markup.
Headline (two lines):
Customers Stay.
Revenue Grows.
Positioning line (`.hx__tag`): `Marketing, Sales &amp; Customer Success.`
followed by `That's Mohamed.` in its own span.
Tagline (`.hx__desc`): I bring customers in, close them, and keep them.
Traits (`.hx__traits`): Marketing / Business development / Customer
success.
Availability: Based in Morocco. Working with the world.

Wordmark (the oversized name behind the portrait), two lines:
MOHAMED
ELHAYYANY
`--text`, Inter 800, uppercase, line-height 0.85. ELHAYYANY is the
wider word and sets the size. The font-size is in `vw` and the box is a
percentage, so it spans ~92% of the hero at every width. The portrait sits
in front, its head crossing the second line.

#### The name is `--text` in both themes, and STEP 41 took its rim off
**This is the clearest case on the page of a colour choice generating
structure, which is why the history is kept rather than deleted.**

The name used to be yellow `#f5e500` in both themes. On the dark page
that was 14.2:1 and fine. On the beige `#d6d0c1` it was **1.18:1**, and
no outline, shadow or second copy changes that number: a bright yellow
and a light beige sit at nearly the same luminance, which is the same
fact that kept the yellow off every foreground on the site. So the LETTER
could not carry the contrast and the EDGE had to: a `#111111` hairline,
12.28:1 against the beige and 14.47:1 against the yellow, making every
edge of every glyph a hard boundary.

**What that one unreadable colour cost**, all of it now deleted:
`--name-ink` and `--name-sw`; a `-webkit-text-stroke` on the wordmark and
a `stroke` / `stroke-width` on the divider; a `paint-order` on three
elements; a `max(0.6px, ...)` floor on the wordmark and a
`max(1.8px, ...)` floor on the divider in a media query of its own,
because 0.006em of a 14vw wordmark is 0.33px at 390 and Chrome draws that
as a third of an alpha value; and two per-frame `webkitTextStroke` writes
in script.js that wound the rim down across exactly the window that
turned the flying letters to ink.

**The name is `--text` now**, 16.42:1 on the light ground and 15.36:1 on
the dark one, and all of the above is gone. `--name` survives as a token
only because three surfaces and script.js read it by name.

Two things that follow and are easy to miss:
- **The collage trail now fills each letter completely.** It is clipped
  to the glyph outline, and it used to stop at the inside edge of the
  stroke, which is what left the rim standing around every photograph.
  There is no stroke, so there is no inset.
- **The flying copy has one fewer moving part.** script.js still
  interpolates the letters' colour from `--name` to the pill's own ink,
  but it reads `--on-brand` for the far end rather than a hard-coded
  `17,17,17`, and in LIGHT mode the two ends are the same value, so the
  morph is purely a move with no colour change at all. In dark the
  letters are off white and turn to ink as the coral pill fades up.

There is still no offset shadow, no glow, and no second copy of the text
anywhere on the page. An early pass used `0.030em` plus a `0.040em` hard
shadow, which read as a sticker rather than as a letter. Neither that nor
the hairline should come back: the name does not need help any more.

**The divider draws its own letters**, which is unchanged and still the
right shape. The two `<text>` nodes used to live inside the `clipPath`
with a yellow `<rect>` clipped to them, which left no glyph to stroke and
forced a layered approach. They are drawn directly, their own `fill` is
`--name`, and the `clipPath` reaches them through `<use>`. So the window
the photographs appear through is a REFERENCE to the painted shape rather
than a duplicate of it, which cannot drift when a web font lands.

**The sidebar logo pill at rest was never part of this**: it is dark ink
on a coral lozenge, 5.29:1, and has all the contrast it needs.

The same name, the same two lines and the same tracking appear in the
sidebar logo pill and in the mobile topbar pill. The hero wordmark and the
sidebar pill must keep **identical `letter-spacing` and `line-height`**: the
morph scales the real pill up by the ratio of the two font sizes, and that
only overlays the wordmark exactly while every em-based measurement matches.
Change one and you must change the other.

### Pitch band (its own section, between Growth and What I Bring)
**STEP 36 moved it and replaced the copy with the through line.** It used
to sit between Work and the keywords marquee and carry one line
("Marketing opens the door..."). It is now the argument the whole site is
organised around, in three blocks that step DOWN in size and weight,
because the order is a claim, then the evidence for it, then what follows
from it, and three paragraphs at one scale do not read as an argument.

1. `.pitch-band__line`, heading scale, weight 400:
   Most problems that look like product problems
   [are communication problems].
2. `.pitch-band__sub`, clamp(1.05rem, 2.1vw, 1.45rem), weight 400,
   `--body`: A customer who churns usually did not understand what they
   bought. A deal that stalls usually did not hear the value. A team that
   misses usually did not know the target.
3. `.pitch-band__close`, clamp(1rem, 1.7vw, 1.2rem), weight **600**,
   `--text`: Customer success, sales, team leadership and marketing are
   the same job done in different places: making what matters clear, and
   keeping it clear.

`[square brackets]` mark the tinted marker, and it is on **"are
communication problems" only**. That is the turn in the argument; a
marker on any more of the sentence is a yellow block rather than an
emphasis.

Step three goes back UP in weight while going down in size, deliberately:
it is the smallest of the three and the last thing read, and it is the
sentence every section below is supposed to echo.

All three share `max-width: min(100%, 46rem)` so the left edges line up
and the rag stays in one column. The 65ch body rule does not apply: this
is display text at a reading size, not body copy.

Status pill: Working with the world
Button: Get in touch → `#contact` (kept, unchanged)

Stat blocks. **The hero has FOUR and the sidebar has SIX since STEP 44**,
which is the one place the two lists are allowed to differ. STEP 36
corrected the revenue label, STEP 39 gave three of them a timeframe, and
STEP 43 raised two of the figures.

The hero's four, in `data-fly-stat` order:
- `100+` Accounts, onboarding to renewal
- `150+` Sales closed in under 3 months
- `300+` Posters sold, first 3 months
- `25%` Company revenue growth in 2 months

The third is `300+`, NOT "98% Policy accuracy at scale", which is what
this file used to claim and the page never said.

The sidebar's six, in reading order down the 2x3 grid:
- `$50k+` Ad spend managed to date          (no hero twin)
- `150+` Sales closed in under 3 months     (hero 1)
- `Zero to a brand` Postry, built and run by me   (no hero twin)
- `100+` Accounts, onboarding to renewal    (hero 0)
- `300+` Posters sold, first 3 months       (hero 2)
- `25%` Company revenue growth in 2 months  (hero 3)

**STEP 43 raised two figures and STEP 44 a third**: posters `250+` to
`300+`, revenue `15%` to `25%`, sales `100+` to `150+`. All three are the
owner's own updated numbers and each appears in several places, so the
lists under STEP 43 and STEP 44 at the foot of this file are what to
check against before changing any of them again. **The accounts figure is
also `100+` and is a DIFFERENT number**: it was deliberately left alone
when sales moved, and that is the mistake to avoid on the next pass.

**A label that exists in both lists must stay character-for-character
identical between them.** The morph flies the SIDEBAR stat from the
hero's position while the hero's own copy fades out, aligned on the
number chip, so different label text reads as the words changing in
mid-flight. There is no crossfade for them, and since STEP 40 there is no
crossfade anywhere in the morph: `.sb__resume`'s two stacked labels are
deleted, because the button that travels now says the same thing at both
ends. See the STEP 40 section above.

**The two lists no longer pair by position, and that is STEP 44's one
structural change.** `data-sb-stat` on a sidebar stat names the
`data-fly-stat` of its hero twin, and the two with no twin carry
`data-sb-late`. See the STEP 44 section at the foot of this file before
adding, removing or reordering a stat in either list.

**These are the SHORTENED forms, and the sidebar is why.** At 1440 the
sidebar column gives each stat about 127px at a 12px label, which is
about 19 characters a line. The full phrasings ("Client accounts,
onboarding to renewal", "Posters sold in my brand's first 3 months")
would run to three lines there and add 30px to the stat block. The
shortened forms are 28 to 34 characters, all two lines, and **the longest
of them is no longer than "Company revenue growth in 2 months" which was
already there and already fitted.** That is the test to apply to any new
label: 34 characters is the proven ceiling.

The full phrasings live where there is room: the strengths row, the
timeline cards and the Help cards.

**What this cost, measured rather than assumed.** Three labels went from
one line to two, so the stat block grew: **+15px in the sidebar** (both
grid rows are two lines now, where row one used to be one) and **+11px in
the hero on a phone**, for the same reason. The sidebar absorbs it because
`.sb__nav` is `flex: 1` and the column has about 130px of slack at a
900px viewport. The phone hero's stats are absolutely positioned, so the
11px extends downward; it is the one place worth eyeballing on a real
device.

**The timeframe is the part that matters.** If a label ever has to shrink
again, drop the descriptive words and keep the number of months.

### Marquee keywords: DELETED in STEP 36
The keyword strip that sat between the pitch band and What I Bring is
gone, along with the Marquee CTA (see below). Between them they were 62
words of category names, about 320px of desktop height, and no
information: every word in them is a heading somewhere else on the page.

**The sidebar ticker stays.** It is the one strip that earns its place,
because it is the only thing in the sidebar panel that moves and it is
positioning rather than navigation.

`.marquee` BASE rules are therefore still load-bearing and must not be
deleted: the ticker reads them, and `marquees` in script.js is
`querySelectorAll('.marquee')`, which now matches exactly one element.
The `.marquee--cta` rules (8 blocks) and
`body.is-migrating .marquee + .section` are now dead CSS, left in place
rather than swept, because nothing reads them and removing them is not
this pass.

### Sidebar ticker
The scrolling chip strip in the sidebar panel under the nav. Same marquee
mechanics as the page's other strips. The track holds the list twice and
slides exactly half its own width, so the loop has no seam. Both copies
must always be kept identical.
Team Leadership · Sales · Retention · Business Development · SaaS ·
Account Management · Partnerships · Client Onboarding
These are positioning words, not the tool stack: the tools live in
Capabilities and the languages in the Work '24 card.

### Work (01)
The section's angle is **customer success, business development and
marketing**, the three things the rest of the site should echo.

Lead: A customer-facing operator who turns *friction* into retention.
("friction" sits on the yellow marker, in dark text.)

Intro (max ~560px):
Customer success keeps clients. Business development brings new ones.
Marketing gets them through the door. I do all three.

#### Strengths row (replaced the counters)
Four blocks: accent icon, strength name, one line of proof with its number
on a tinted marker.
- **Customer Success** - [100+ client accounts] managed from onboarding to
  renewal
- **Business Development** - [150+ sales] closed in under 3 months, plus
  B2B clients like Experience Morocco
- **Marketing** - Meta ad campaigns and a brand that sold [300+ posters]
  in the first 3 months
- **Team Leadership** - Led a team of 12 at Majorel (ByteDance / TikTok
  account) with [98% accuracy]

#### Colour inside this section
The accent carries it: the year numbers, the timeline dots and the tool
badges. The tint has one job only: a `<mark class="jr__hl">` behind a key
fact, always with `--text` on it, **max two per card**. There
are no certificate images anywhere in this section.

The year is **`--accent-text`** on the light card, not `--accent`: the
brief names year numbers as accent TEXT, and although this one is 51px
and up and so would clear the 3:1 large-text floor on the full coral
(3.33:1 on the white card), the darker cut reaches 5.45:1 and the point
of having two cuts is that only surfaces and graphics take the light one.

Inside an OPENED card neither works: the card is `#17191C` and
`--accent-text` is 2.89:1 on it. It goes to `--jr-open-year`, **#FF6A55**,
the dark theme's lighter cut of the coral, 6.24:1 in light and 4.65:1 in
dark. Same size and weight either way; only the tint changes.

Before STEP 41 the problem here was the opposite and worth remembering:
the accent WAS `#1f1f1f`, which is also what the open card turns, so the
accent would have been colouring its own background, and `--jr-open-year`
was the accent inverted rather than a lighter cut of it.

#### Timeline cards
Five, alternating right / left. Each has a year with an apostrophe, a
title, a two-line summary, a company-initials badge overlapping a tool
badge, a `company · period` label, 1-3 strength tags and Read more. The two current roles
carry a green dot.

Opening a card swaps its year to the full four digits at the same size,
collapses the summary and reveals the long text, so the expanded card
reads: big full year · close button · title · badges · full text.

**'21 / First customers** · badges T3 / headset · Terrain 360 · Webhelp · 2021 - 2022
Short: Phone support at Terrain 360 and freelance design for Webhelp.
Where I learned what customers need.
More: Customer Service Advisor at Terrain 360, solving customer issues by
phone every day. In parallel, freelance graphic design for Webhelp
Agency, which taught me how to present an offer clearly.
  tags: Customer Success · Communication
  what I brought: Patience with difficult customers · Clear visual communication

**'22 / Leading a team** · badges MJ / shield ·
Majorel (ByteDance / TikTok account) · 2022 - 2024
Short: Content Moderator, then [Team Lead of 12] at Majorel on the
ByteDance / TikTok account, with [98% accuracy].
More: Reviewed content at scale against strict policies with 98%
accuracy on the ByteDance / TikTok account, then moved up to Team Lead of
a team of 12: training new moderators, mentoring the team and keeping
quality high.
  tags: Team Leadership · Quality
  what I brought: Coaching new team members · Consistent quality at scale

**'24 / Degree & marketing foundations** · badges UCA / graduation cap ·
Cadi Ayyad University · 2022 - 2024
Short: Economics degree, Google Digital Marketing, and English C2.
More: Bachelor's in Economics at Cadi Ayyad University. Google
Fundamentals of Digital Marketing and EF SET English C2. I work in
Arabic, English, French and Spanish.
  tags: Marketing · Languages
  what I brought: Marketing fundamentals · Four working languages

**'25 / Customer Success & Sales** [current] · badges SA / chart ·
SafeApps (eGrow) · 2025 - Present
Short: SafeApps makes eGrow, one platform a business runs its whole
operation from. [100+ client accounts] and 150+ sales in under 3 months,
and [+25% company revenue].

The FACE says what the company does, because a reader should not have to
open a card to find out what the job was. Still two marks, which is the
per-card maximum.

More, THREE paragraphs, in this order and for this reason:
1. What eGrow is. The full description is in the eGrow section near the
   top of this file. Everything else about the role reads differently once
   you know, and the job title is unexplained without it.
2. What technical means here: the product is APIs and integrations, so
   supporting it means working in them. He built the WhatsApp order
   confirmation and delivery tracking flows, the transactional email
   sequences, and the Meta Conversions API integrations that fixed
   attribution for customers' ad campaigns.
3. The customer success and sales work: the full client lifecycle,
   onboarding to renewal, 150+ sales in under 3 months, Meta ad campaigns,
   UGC video, and the 25% company revenue growth driven mainly by new
   sales from outreach.
  tags: Customer Success · Business Development · Marketing
  what I brought: Integrations built, not just configured · Client retention from day one · New revenue through sales

**'26 / Founded Postry** [current] · badges P / shopping bag · Postry ·
2026 - Present
Short: [300+ posters] sold in the first 3 months, B2B clients, zero
outside funding.
More: A DTC wall art brand on Shopify that I run end to end, from product
to marketing. I sourced B2B clients including [Experience Morocco], plus
artist and creator commissions. Profitable with zero outside funding.
  tags: Business Development · Marketing · Founder
  what I brought: Sourcing B2B partners · Building a brand from zero · Profitable without funding

`[square brackets]` above mark the tinted highlights.

The old Background section (education, certifications, languages) was
removed. What survived of it lives in the year it happened.

### What I Bring (03)
Pill "03 - WHAT I BRING", then a huge centred heading on two lines,
"What" / "I Bring?", with a vertical gradient from #111111 at the top of
the letters to #4a463d at the bottom. Under it a small centred pill,
"CAPABILITIES OVERVIEW".

Then one sentence carries the section. `[NAME]` is an inline chip:

"Customer success [SUCCESS], business development [GROWTH] and marketing
[MARKETING] combined - keeping every client [RETENTION], winning new ones
[SALES], and leading the people [TEAM] who make it happen, in four
languages [LANGUAGES]."

**The chips are buttons, not hover targets.** A card reachable only with a
mouse is a card half the visitors never read. Hover opens it, so does a
tap, so does Enter or Space; Escape, a tap outside, or moving the mouse
away closes it. Notably it does NOT open on focus alone - that would mean
the Enter which follows lands on an already-open card and closes it, so
the keyboard would be the one way in that did not work.

Card: panel colour, radius 20px, 340px, big accent icon, bold title, short
text. It is centred on its own chip, nudged back on screen if that would
hang it off an edge, and flipped above the chip when there is no room
below. On a phone it goes full width at the bottom of the screen instead.

#### STEP 36 rewrote all seven cards: method, not results
The seven cards used to restate the page's four numbers for the third
time, in different words, behind a hover. **Not one fact in them was new.**
They now say HOW he works in that area, which is the one thing a
capability list can add that the Work timeline cannot.

- SUCCESS / Customer Success - I make the first two weeks concrete. Most
  churn is decided there, not at renewal.
- GROWTH / Business Development - I sell what the product actually does,
  because I am the one who has to keep the account afterwards.
- MARKETING / Marketing - I read the ad data before I spend more on it. A
  campaign that cannot be measured is a guess.
- RETENTION / Retention - I check in before there is a reason to
  complain. An angry customer is usually a surprised customer.
- SALES / Sales - Full cycle, from first contact to signature, so nothing
  gets promised that cannot be delivered.
- TEAM / Team Leadership - People do not follow a manager, they follow
  clarity. Goal, reason, and where they stand.
- LANGUAGES / Languages - Arabic, English, French and Spanish. I meet
  customers in their own language.

**There is not one digit left in this section**, except the `03` in its
own section marker, and that is checked rather than assumed. The sentence
still reads "in four languages", which is the word and is part of the
sentence, not a card.

**And there is no marker in any of the seven cards now, which is a
change and a deliberate one.** The marker's documented job on this page is a
RESULT. These cards carry methods and opinions, and a marker under
"Most churn is decided there" would be the page putting its result colour
behind an assertion. The cards keep their icon and their bold title as
the visual anchor. Do not put the markers back without a number to put
them under.

#### The reveal, and STEP 36's cut to the pin
The sentence is pinned and the words come into focus left to right as you
scroll through it: opacity 0.15 to 1 and blur 4px to 0, each word on its
own slice of the run. It is read from scrollY every frame rather than
played on a timer, so scrolling back up runs it exactly backwards. No CSS
transition on the words - the scroll and a transition would be fighting
over the same two numbers.

**`.wib` went 200vh to 110vh in STEP 36 and is 150vh now.** The 110vh was
asked for specifically, to stop the section being 2.6 screens of page
height to bring 31 words into focus. What it cost was written down at the
time and then observed on the page: script.js computes the run as
`box.height - innerHeight`, so the run is whatever is left over after the
sticky screen, and at 110vh that was **10vh, about 90px at a 900px
window, for all 31 words**, under 3px of scroll each. The reveal ran and
reversed correctly and arrived finished. It read as no animation at all.

**150vh is the dial STEP 36 named, so it is the dial that was turned.**
The run is 50vh, about 450px, roughly 14px of scroll a word, and the
focus pull is something you scroll through again. `span` stays 0.85 and
the sticky screen stays a full 100vh: either of those would have bought
the same run by desynchronising the last word from the pin release, which
is the one thing that note said not to do. The section still does nothing
at all below 900px and nothing under `html.rm`, where `.wib` is
`height: auto`.

**Both gaps around the pin were cut with it**, and the two halves are a
pair: a 150vh block whose sticky screen centres one sentence in 100vh has
roughly half a screen of nothing above it and half a screen below.

**Above: `.wib { margin-top: -14vh }` from 900px up**, replacing
`clamp(2rem, 6vh, 4rem)`. A negative margin and NOT padding inside the
sticky screen, which was tried first: padding lifts the sentence off
centre, so it takes space off the top and hands the same space to the
bottom. The gap moves, it does not go. Pulling the whole block up takes
126px out of the top gap, leaves the bottom one alone and shortens the
page by the same 126px.

It cannot collide with the heading: the sentence sits
`(100vh - its own height) / 2` below the block's top, about 266px at
1440x900 against 126px of overlap, and the clearance grows with the
viewport. It cannot touch the reveal either, since the run is measured
from the block's 150vh.

**`html.rm .wib` and `.no-js .wib` put the positive margin back**, next
to the `height: auto` they already carried. There is no pinned screen in
either, so there is no empty half to pull up into, and the negative
margin would lift the sentence into the kicker.

**Below: `#capabilities { padding-bottom: 0 }` from 900px up.** The pin
releases with the sentence centred, so the section already ends on half a
screen of nothing; another 12vh of section padding under it was the
second half of the gap before How I Can Help. The next section keeps its
own `padding-top`, which is what separates the two. The phone's
`padding-bottom: 60px` is in a `max-width: 899px` block and is untouched.

Two traps worth remembering. An opacity below 1 makes each word its own
stacking context, so a card's z-index cannot reach past the word it lives
in and every later word paints over it; the word holding an open card is
lifted while it is open, and forced to full opacity so the card does not
inherit the word's dimming. And `filter` or `will-change` on a word makes
it a containing block for fixed-position descendants - both are scoped to
900px and up, or the phone's full-width card would position itself against
a single word.

Below 900px and under reduced motion: no pin, no dimming, everything
simply readable. The HEADING is smaller there; the sentence is not.

#### The sentence on a phone (STEP 18c)
It was `clamp(1.35rem, 6.4vw, 2.25rem)` in a 24px gutter, which put it at
25px in a 310px column on a 390px screen: a paragraph in the middle of
the page rather than the thing the section is built around. It is now
`clamp(26px, 7.2vw, 40px)` at `line-height: 1.2` in a **16px** gutter,
which is 26px at 360, 28px at 390 and 31px at 430, in a 326px column.
1.2 rather than 1.15 because at this size the tighter leading put one
line's descenders into the next line's caps.

The heading above it keeps the size it had. Desktop is untouched.

The chips go to `height: 0.85em`. They are icon-only buttons, their names
sit in a visually hidden span for the screen reader, so they are about
39px wide whatever the type does and can never be what pushes a line
over; they shrink only so they stay part of the sentence rather than
looking like buttons dropped into it.

**78% average line fill is the ceiling at this size, not a bug.**
Switching `text-wrap` from `pretty` to greedy was tried and measured no
different at 360, 390 or 430. The rag is set by the words: the sentence
carries "development", "combined" and "languages", and at 28px in a 326px
column any two of those overflow, so a line ends early whatever the
browser does. A larger font lowers the fill rather than raising it.

133px sat between the last line and the end of the section, 32px of the
sticky wrapper's own bottom padding and about 100px of shared section
padding, on a section whose content had already finished. The wrapper's
is now zero and `#capabilities` carries a flat 60px.

### How I Can Help (04)
Heading, two lines, left aligned: "Where I Make" in `--text`, "The
Difference" in `--body`.

Intro: Three areas, one goal: more customers who stay longer and spend
more.

`[square brackets]` mark the tinted marker in each result line.

**STEP 44 reordered these. Marketing is card one and the highlight rests
on it.** The copy inside each card is unchanged; only the order is.

1. **Marketing** - the result is THREE stacked lines, not one:
   [3] months. / [8,000] followers. / [300+] posters sold.
   Same font size as the other two cards' result lines, leading tightened
   to 1.1 with 0.2em between the lines, so they read as one punch. The
   tint carries the NUMBER only in each line: a marker under every word
   is a tinted block, not an emphasis. The three lines fade up 10px one
   after another, 70ms apart, starting 300ms after `.hlp.is-in` lands, so
   they arrive inside the card's own 600ms entrance rather than after it.
   `html.rm` and `.no-js` both leave all three simply there.
   I built the account from zero, ran the ad campaigns and the influencer
   collabs, and turned the audience into paying customers.
   What you get: Targeted ad campaigns / Influencer collaborations /
   Content that converts
2. **Business Development** - [150+ sales] closed in under 3 months
   I find the right partners and accounts, then turn conversations into
   signed deals.
   What you get: Qualified leads / Full-cycle outreach / New B2B
   partnerships
3. **Customer Success** - [100+ client accounts], onboarding to renewal
   I take clients from onboarding to renewal, so they get value fast and
   stay.
   Then, in `.hlp__text--auto`: I built the WhatsApp order confirmation
   and delivery tracking flows, the transactional email sequences, and
   the Meta Conversions API integrations that fixed attribution for our
   customers' campaigns.
   What you get: Smooth onboarding / Proactive check-ins / Fewer churned
   accounts

   **This is the tall card and it is now LAST rather than first**, which
   changes nothing: `.hlp__getlab` carries `margin-top: auto` on every
   card, so the three checklists stay flush on the bottom edge wherever
   the card sits.

Under the panel, centred, one filled accent button: `Let's talk`, linking
to `#contact`. It is the only place that phrase appears in the section.
Growth now carries the same pair (see `.gr__cta`), so `Let's talk`
appears twice on the page, once per section, which is intended: they are
one offer made in two places, not two offers.

#### STEP 36: the automation claim, evidenced, and why it is NOT a fourth card
Automation was claimed in the hero copy ("build the automations that let
both scale") and in a hero trait chip ("Automation-minded"), plus the CTA
marquee and the old meta description, and **evidenced nowhere on the
page**. STEP 36 removed two of those four (the marquee, the meta
description) and backed the hero's two up with the line in this card.

**STEP 44 removed the hero's two as well**, from the other end: the
`.hx__desc` sentence is "I bring customers in, close them, and keep
them." and the trait chips are the three areas, so neither mentions
automation any more. **The claim now exists in exactly one place, which
is the one place that evidences it**, and that is the right number. Do
not read this as a reason to delete `.hlp__text--auto`: it is the only
place on the page the integrations work is named, and the '25 timeline
panel is the only other.

**A fourth area was asked for first, and the grid cannot take one.**
Checked rather than assumed, and both halves matter:
1. `.hlp` is `grid-template-columns: repeat(3, minmax(0, 1fr))`, a hard
   three columns. A fourth card wraps to a second row and sits alone
   beside two empty cells.
2. `.hlp__glide`, the single highlight that slides between cards, is
   `top: 16px; bottom: 16px`, so it spans the FULL panel height, and
   script.js sizes it from `card.offsetWidth` / `card.offsetLeft`. On a
   two-row grid it would paint as a full-height block behind a
   half-height card. The highlight is the section's one piece of motion
   and it would be the visible failure, not the empty cells.

So the line lives in the **Customer Success** card, as
`.hlp__text--auto`: a step down in size with a hairline above it, so it
reads as supporting detail under that card's own claim rather than as a
second claim of equal weight. It keeps `--body` rather than `--muted`,
because it is the only place the automation work is named and a footnote
colour would undersell it.

**Only one card carries it, so card one is taller than the other two,
and that is already handled.** `.hlp__getlab` has `margin-top: auto`, so
the three "What you get" checklists stay flush on the bottom edge
whatever the copy above them does. This is the same mechanism that was
already absorbing the Marketing card's three stacked result lines.

The highlight colour is `#d9d4c5`, a step darker than `--panel`. The
three card titles do not all wrap to the same number of lines, so each
title reserves two lines and centres its text in them - that is what
keeps the badges and the result lines level across the row. The "What
you get" block carries `margin-top: auto` so the checklists sit flush on
the bottom of every card whatever the copy above them does.
The min-height for it has to sit on the title, not on the badge row: an
em on the row resolves against its inherited 16px, not the title's size.
### Marquee CTA: deleted in STEP 36, restored in STEP 38
`Customer Success · Business Development · Growth Marketing ·
Team Leadership ·`

It sits **between How I Can Help and What People Say**, which is where it
was before STEP 36 deleted it in relation to the sections around it. The
Growth band still follows Work directly with no separator, which is what
STEP 36 was really about.

**Four items per copy now, not three**, and both `.marquee__group` copies
must stay identical and the same LENGTH. The track slides exactly half
its own width, so one extra word in one copy shows as a jump every time
the loop comes round. This is the same rule the keyword strip had and the
sidebar ticker still has.

**`querySelectorAll('.marquee')` matches two elements again**: this
section and the sidebar ticker. The observer that pauses a marquee off
screen iterates the list, so both are driven with no change to script.js.
That was true before STEP 36 and is true again; nothing in the module is
written for a single strip.

**Restored from `_baseline-step36/` rather than retyped**, so the markup
is the original. Its CSS was never swept: the eight `.marquee--cta`
blocks and `body.is-migrating .marquee + .section` sat in style.css
through STEP 36 and STEP 37 as documented dead rules, and are live again.

### Growth (02)
**This is the page's one dark band** - #111111, ink #eae8e3, muted
#b8b4aa, sharp edges and no gradient into the beige. It runs full width
and passes UNDER the fixed sidebar, which is what the sidebar's own dark
switch below is for. The band is older than what stands in it: STEP 29
deleted the six UGC videos, their carousel, their phone stack and their
lightbox and put two case study cards here, and **STEP 30 renamed the
section from Channels to Growth and rebuilt the cards.** The band, the
inverted palette and the sidebar switch survived both.

Pill "02 / GROWTH". Heading, two lines, left aligned: "Accounts I Grew"
in #eae8e3 over "From The Ground Up" in #8a8578. To its right (stacked
under it on mobile): "I don't just make content. I build the strategy,
film it, edit it and run the posting schedule, then watch the numbers
move."

The section keeps `id="content"`. **Do not rename it**: the sidebar's
dark switch finds the band by that id, and the nav, the mobile menu and
the hero nav row all link to it. The class went from `.ch` to `.gr` with
the section name; the id did not.

#### The card
A tall panel with a soft inner gradient from `--vid-panel` to
`--vid-card`, a fine top highlight line, a hairline border and 44px of
padding (`clamp(26px, 3vw, 44px)`).

The gradient is on `background-image` with the flat colour underneath on
`background-color`: two properties, so the hover can brighten the border
without touching the fill, and a browser that drops the gradient still
paints a panel. The highlight is a `::before` at z-index 1, inset 14%
from both corners so it reads as a light catching the top edge rather
than as a border, and the card carries `isolation: isolate` or that
pseudo-element paints over the header.

Top to bottom: the header, a thin divider, the centrepiece block, the
three labelled blocks, the tags.

**Header.** The brand logo badge on the left, the handle in bold beside
it, the platform links as small round icon buttons pushed right with
`margin-left: auto`. It wraps, and below about 1300px it has to: two
42px badges, a handle and two 38px buttons need more than the 292px a
card has at the narrow end of the two-up range. A wrapped links row
keeps its auto margin and lands right-aligned under the handle.

**The centrepiece block** has its own inset background, so the figure
reads as the card's centre rather than as the first line of the body.
The inset is an inner shadow plus a hairline on `--vid-chip`, not a
lighter fill: a lighter panel on a panel is another card, and this is a
recess in the one it is in.

**The three labelled blocks are separated by hairlines, not gaps.** The
rule goes on each block's TOP and `:first-child` is excepted, so the
count can change without a `:last-child` rule to match. Each label
carries a small accent marker before it, a 14x3px bar rather than a dot:
at that size a dot reads as a bullet and a bar reads as a rule.

**Tags** are a wrapped row with thin borders and no fill. Six of them
filled would read as six buttons.

**Hover** (fine pointer only): the card lifts 6px, the border goes to
`--vid-line-3`, the shadow deepens and the logo badge scales to 1.08.
300ms on every one of them.

#### The copy, as it actually stands

**This file described the STEP 29 prose for a long time after the page
had stopped using it.** The sentences below are not paragraphs any more:
"What I did" is a numbered row of step pills (`.gr__steps` / `.gr__step`,
an `<ol>` because the order IS the content, with the arrows between them
generated by CSS so only the list order reaches a screen reader), and
card 1's "The result" is three stat chips (`.gr__stats`) in the same
shape as the sidebar stats. The old tag rows are gone with the prose.
Read the markup, not a remembered paragraph.

**Card 1**
- handle `@postry_art`, one link, Instagram
  `https://www.instagram.com/postry_art`
- figure `0 to 8,000`, label "followers in 3 months". The markup holds
  the FINISHED figure and script.js winds it back to zero before counting.
- The challenge, one line: `New brand. Zero audience. Zero budget.`
- What I did, five step pills: `Strategy` / `Film` / `Edit` /
  `Influencer collabs` / `Paid ads`
- The result, three stat chips: `8K` followers, `300+` posters sold,
  `3` months

**Card 2**
- handle `@egrowdotcom`, two links, Instagram
  `https://www.instagram.com/egrowdotcom` and YouTube
  `https://www.youtube.com/@eGrowdotcom`
- **No figure. None was supplied and one is never guessed.** The
  centrepiece block carries `Instagram + YouTube` instead, with
  "short form content, scripted to edit" under it, in the same style at a
  size that fits two words rather than five characters. It is NOT coral:
  that is a label, and the accent's job in this block is a result. Do not put
  a number here, and do not leave a visible placeholder either.
- The challenge, STEP 39 rewrote it so it names the product: `eGrow runs
  a business's whole operation from one place, on the WhatsApp API.
  Explaining that in a video people actually watch is the hard part.`

  It used to read "A SaaS product that needed content people actually
  watch", which told a reader nothing about why the content was hard to
  make. **The product IS the challenge here**, so the block has to say
  what the product is. See the eGrow section near the top of this file.
- What I did, four step pills: `Script` / `Film` / `Edit` /
  `Post on IG + YouTube`
- The result, one line with the outcome on the tinted marker: `Steady
  content that explains the tool and drives [sign-ups].`

**What eGrow is: CLOSED in STEP 39.** This used to be an open issue here,
noting that the page described the product as "SaaS accounts" and "A SaaS
product" and never said what it did or who bought it. It says both now,
in three places at three depths. The full description and the reasoning
live in the eGrow section near the top of this file; do not keep a second
copy of it here.

#### STEP 36: the section's call to action
The band is the strongest evidence on the page and it had nothing to
click. `.gr__cta` sits under the grid, inside the same `.wrap`: one line,
`.gr__ctaline` ("Want the same for your product?"), and one
`.btn--filled` to `#contact` reading `Let's talk`.

**Centred, although every heading in the band is left aligned.** It sits
under a two-column grid rather than inside a text column, so the button
belongs to both cards rather than to the left one.

**No colour rule was needed.** `--accent` is already rebound to the
`--vid-*` set on `.gr`, so `.btn--filled` picks up the band's palette and
inverts with the theme for free. The arrow opens from 0.5rem to 0.8rem on
hover, the same 200ms as `.hlp__btn`, so the pair reads as one offer
rather than two.

Below 600px the line and the button stack and the button goes full width:
a small centred pill under a full-width line reads as an afterthought.

**Equal heights, and the second card is the one that needs help.** A card
without the figure block is about 135px shorter than one with it, and the
two are the same height, so that space has to go somewhere deliberate.
`.gr__block--grow` carries `margin-top: auto` on the second card's result
block, so the slack collects in ONE place, above a conclusion, where it
reads as separation. Spread evenly between the three blocks it read as a
card that had run out of things to say. Both cards' result lines are also
a step up in size and into the band's full ink. Measured at 1440: both
cards 835px, tag row 1px off the padding box in each.

#### The figure is coral, and STEP 41 took its rim off too
It is `--gr-figure`, and it carries the one difference the two bands
need: **`#FF4B32` on the dark band** (5.12:1 on the band, 3.94:1 on the
`--vid-chip` recess the figure actually sits in) and **`#C72F1C` on the
light one** that the dark theme turns this into (4.51:1 on that chip,
where the full coral would be 2.93:1). Two values, because the band
inverts and the coral does not. `.gr__statnum`, the three stat chips in
card 1, reads the same token so the two stay one decision.

**`--gr-rim` is DELETED, and the reason it existed is the same one the
hero wordmark's rim had.** The figure was the yellow, 12.6:1 on the dark
band and **1.02:1** on the light one, where no colour choice fixed it. So
the letter could not carry the contrast and a stroke did: `--gr-rim` was
`transparent` in light and `#111111` in dark, with a `max(1px, 0.018em)`
width whose floor existed because 0.018em of a 37px figure is 0.65px on a
phone, plus a `paint-order: stroke fill` to keep the glyph its true
weight. `.gr__num--soft` even carried a `-webkit-text-stroke: 0
transparent` purely to cancel it.

Every one of those is gone. Coral carries itself on either band, and a
stroke round a glyph that does not need one only chews it back.

`font-variant-numeric: tabular-nums`, because the count-up rewrites the
text every frame and proportional figures would change the line's width
as the digits go round.

#### The animation
The cards fade up 26px one after another when the grid arrives, 90ms
apart, and the figure counts up from 0 to 8,000 with it, starting 260ms
in so it is not racing the card's own entrance. Once only: this is an
arrival, and a figure that re-ran every time the section came back into
view would read as a loading state rather than as a result.

**The markup holds the finished figure**, `8,000`, and script.js winds it
back to zero immediately before it starts counting. No JavaScript, or an
observer that never fires, leaves the real number on the page.

**The thousands separator is written out, not left to
`toLocaleString`**, which formats to the VISITOR's locale and sets the
same number as "8.000" across much of Europe. Read as English that is
eight.

The count-up runs under reduced motion too, which is what the brief says
for every counter on the page. What goes there is the travel: the cards
fade in where they already are, and neither the hover lift nor the badge
scale happens.

#### Two up above 1180px, one column below it, and 1180 is measured
The sidebar's gutter takes about 370px off the wrap, so the column is far
narrower than the viewport: 528px at a 900px window against 1028px at
1440. Two cards in 528px left 170px of content inside each, which stood
the card over 1000px tall and broke the header, the figure and half the
block text over extra lines. 1180 is where a card's content reaches 292px
and the header fits on one line again. The heading goes single column at
the same point: the paragraph beside it is up to 20rem, which at 900px
left the heading 160px to set "From The Ground Up" in.

Below 900px the round icon buttons go to the 44px touch floor and the
badge comes down to 38px to keep the header on one row.

#### Nav labels
The sidebar, the mobile menu and the hero nav row all say **Growth** (the
hero row renders it uppercase from CSS). The hero-to-sidebar morph pairs
the two nav lists by index, so they must stay the same length and the
same order. Re-measured after the rename: worst offset 0.00px across 12
items.

**STEP 36 moved Growth to second in all three lists**, which is the
change that index pairing is most exposed to. The order everywhere is now
Work, Growth, What I Bring, How I Can Help, What People Say, Contact, and
`data-fly-nav` runs 0 to 5 down that list. Reordering the hero row alone,
or the sidebar alone, flies every link to the wrong row without throwing
anything: there is no error to catch, only six labels landing in the
wrong places. Change both, in the same edit, every time.

#### What was deleted with the videos, and must not come back
The six embed URLs and their thumbnails, the `[data-video-id]` module,
the lightbox and its arrows, dots, swipe and focus trap, the
`data-rail-smooth` transform engine (STEP 24) and the phone stack built
on it (STEP 26, 27), `.vid__*` and `.lightbox*` in style.css, the
`--scrim` and `--lightbox-frame` tokens, and `@keyframes vid-swipe`.

**The page is back to one carousel engine**, the shared `[data-rail]`
scroller, which What People Say still uses. The `data-rail-smooth`
opt-out at the top of that module is gone with the engine it deferred to.

**The `--vid-*` token set stays, and its name is historical.** It is this
band's palette, the page's one INVERTED set, and the sidebar's `.is-dark`
switch reads it too. Renaming it would touch three unrelated modules to
no effect.

#### The sidebar over the dark band
There was never an existing "dark section switch" to reuse - I searched
for one when the old Work section was deleted and none existed. This is
new code.

**Each panel decides for itself.** On every scroll frame (rAF, passive)
it compares its own MIDDLE against the dark band's top and bottom edges,
so as the band rises the panels flip one after another up the column and
back again on the way down. The middle rather than the edge: switching on
the edge leaves a panel several hundred pixels of scroll half in one
world and half in the other, which reads as a rendering fault.

**The accent is rebound inside the band, and inside these panels** (STEP
30). The page accent is the colour of the PAGE's text, and this band is
the one place whose background is the other one, so an unmodified accent
lands charcoal on #111111 in light and off-white on #e3dfd3 in dark: both
invisible. `.gr`, `.sb__panel.is-dark`, `.sb__book.is-dark` (added in
STEP 40, because that is the accent-FILLED button now) and
`.sb__resume.is-dark` all
rebind `--accent`, `--accent-hover`, `--accent-text`, `--accent-on`,
`--accent-soft`, `--accent-fill`, `--accent-fill-hi`, `--on-accent`
and `--accent-ring` to the `--vid-*` set, so every component keeps
reading `--accent` and gets the right answer, and it inverts for free
because `--vid-ink` already does.

**Every alias is re-declared there, and that is not belt-and-braces.** A
custom property inherits its COMPUTED value, so a `var()` written in
`:root` is substituted at `:root` and the RESULT is what descends.
Setting `--accent-on` alone left `--on-accent` still holding `:root`'s
`#f4f1ea`, which put near-white text on the near-white sidebar pill the
rebinding exists to create. This was a real bug, caught by looking at a
screenshot rather than by reading the cascade.

Dark panel style (`.sb__panel.is-dark`): background #1f1f1f, border
rgba(255,255,255,0.08), text #eae8e3, muted #b8b4aa. Nav items #eae8e3,
the active one still filled with inverted text. Ticker chips and the email
box #2a2a2a. LinkedIn button #2a2a2a. Stat chips keep their dark fill and
yellow numbers but gain a hairline light border, or they vanish into the
panel. **The logo pill stays coral with dark ink in both worlds**, because
`--brand` is FIXED and is never rebound by the band.
Transition: background-color and color 250ms.
### What People Say (05)
Pill "05 / WHAT PEOPLE SAY". Heading, two lines, left aligned: "From
People" in `--text` over "I've Worked With" in `--body`.

**Three cards, and only three.** These are real things that were said to
him. There are no names, no photographs and no company logos, because he
did not supply any. Do not add a fourth card, a name, a face or a
employer to make the row look fuller.

1. **So many skills in one person.**
   "How can one person have all these skills?"
   Manager / Direct manager / avatar M
2. **Can really do it all.**
   "I didn't believe it at first, but you really can do a lot of things."
   Coworker / Team member / avatar C
3. **Brings life to the office.**
   "You bring so much life to the office."
   Coworker / Team member / avatar C

Card: `--panel`, radius 24px, padding 36px, ~620px wide, soft shadow, a
accent badge with a quote mark top right, and a footer of a dark round
avatar carrying the initial of the role, the role in bold and a small
muted line under it. The row starts on the wrap's content edge and runs
off the right; the trailing gutter is what lets the last card come fully
into view rather than stopping flush against the screen edge.

Below 900px the cards are 85vw and there is no drag puck.
### Name divider
MOHAMED / ELHAYYANY, `--name` (which is `--text`), both lines one size,
the longer one spanning 92% of the SVG's 1000-unit viewBox. **They carry
no stroke since STEP 41**; the hairline rim they used to need, and why,
is under the Hero wordmark above. The two `<text>` nodes are DRAWN, not
just used as a clip shape, and the `clipPath` refers to them through
`<use>`, so there is one set of letters and the photographs are cut from
the very shape that is painted. The `<rect>` that used to be clipped to
them is gone, and with the rim gone a photograph now fills each letter to
its true outline rather than stopping inside a stroke.

**The size is a measured constant in style.css, not a clamp.** The viewBox
is fixed, so the correct size in user units never changes with the window;
the name is therefore right with no JavaScript and right on the first
paint. script.js only nudges it when a fallback face is standing in for
Inter, and it reads the size already in force rather than one it wrote
itself. Writing `style.fontSize` on an SVG `<text>` and measuring straight
after can hand back the PREVIOUS size's width, and a fitter that trusts
that walks the name down to nothing over a few resizes.

Trail images: every file in `assets/collages/`, listed explicitly, never
globbed. Two are awkwardly named, one with spaces and one an emoji, so the
list is percent-encoded; both were checked over HTTP and both serve. Do
not rename them and do not invent new ones.
### Contact (06). STEP 38 removed the chat
**Three steps, and each one deleted something.** That pattern is the most
useful thing in this entry:

```
  STEP 20  built a WhatsApp scene that played a timed conversation
  STEP 31  restyled it to the real thing, 13 tokens and a gradient tail
  STEP 37  deleted the 2.2s playback, kept the two bubbles as copy
  STEP 38  deleted the bubbles, the panel and every token behind them
```

The section read better after every one of those. **That is the signal:
the scene was never the content.** What is left is the shortest thing
that does the job.

```
  .ctc__intro   pill, heading, line, availability line   CENTRED
  .ctc          four cards, one primary                  full width
```

Nothing else. No wrapper is left where the panel was: `.ctc__intro` is
the first child of `.wrap`.

#### The copy
Pill "06 / CONTACT".

Heading: **Tell me what you're working on.**

Line: A role, a team that needs sorting out, or a growth problem you
cannot name yet. I would like to hear about it.

Availability, `.ct__avail`, smaller and muted: Open to Customer Success,
Business Development and Growth roles. Remote, hybrid or on-site.

**The availability line is the one thing rescued from the chat.** It was
the outgoing bubble's text and it was the only information in the
bubbles, so it moved here rather than going with the panel. It is
deliberately quieter than the invitation above it: it qualifies the
invitation rather than being a second one, and at the invitation's size
the two competed. `--muted` is 5.6:1 in light and 7.4:1 in dark at
0.9375rem, so it is quiet without becoming decoration.

It names the ROLES first and the arrangement second, because which roles
is what a recruiter is scanning for.

#### The heading block is CENTRED, which reverses STEP 19
STEP 19 set `.contact { text-align: left }` and the reasoning was sound
at the time: the section carried "a heading, a scene and a card column",
and centring a layout that wide made the eye hunt for the start of each
line.

**There is no scene now.** There is a heading block and a symmetric
four-across row, and a left aligned heading over a symmetric full-width
row leaves a visible hole on the right. So `.ctc__intro` carries
`text-align: center` and `.contact` KEEPS `text-align: left`, so exactly
one block opts out and everything inside the cards stays left aligned,
which is what a label above a value needs.

Both measures (`.ct__line` at 560px, `.ct__avail` at 52ch) take
`margin-inline: auto`, or the block would be centred text hanging off a
left edge.

**The alternative was the split layout**, heading left with the four
cards stacked right. It was rejected on two counts: a vertical list of
four reads as a menu and flattens the primary card, which is the one
thing on this screen that has to dominate; and at 1200px, where the
sidebar still takes about 370px off the wrap, each column is only ~405px
and the heading sets in three lines.

#### Everything deleted, so nobody hunts for it
From index.html: `.cv`, `.cv__panel`, `.cv__head`, `.cv__av`,
`.cv__avimg`, `.cv__who`, `.cv__name`, `.cv__status`, `.cv__live`,
`.cv__thread`, both `.cv__msg` bubbles, `.cv__meta`, `.cv__time`,
`.cv__ticks`, and the `visually-hidden` "Read" span.

From style.css: every rule above, their five phone overrides, and the
`.cv__av` / `.cv__avimg` entries in the STEP 23 selection, `::selection`
and `-webkit-user-drag` lists, where they were stopping the avatar being
selected or dragged.

From script.js: `cvTime`, `cvStamp` and the `visibilitychange` listener
that re-read the clock. **There is no JavaScript in this section at
all now.**

**The whole `--cv-*` token family is deleted from BOTH theme blocks.**
Fourteen tokens: `--cv-panel`, `--cv-wall`, `--cv-in`, `--cv-in-ink`,
`--cv-out`, `--cv-out-ink`, `--cv-stamp`, `--cv-row`, `--cv-hover`,
`--cv-shadow`, `--cv-live`, `--cv-dot`, `--cv-tick`, `--cv-wa`.

They existed because a chat panel is a surface STACK the palette did not
have: a sheet, a wall behind the bubbles, and two bubble colours on top,
with `--surface` and `--panel` being the same colour here so a bubble
painted `--panel` on a `--panel` sheet would have been invisible. There
is no such stack any more. **Do not reintroduce them for a single
bubble**; the reason they were a family rather than two colours is in
that sentence and it still holds.

This also means **the page is three colours throughout** (steel, charcoal
and coral since STEP 41; beige, charcoal and yellow when this was
written). The chat was the one part that was not, because it was
quoting an interface. The only quoted colours left are Instagram's
gradient and YouTube's red in the Growth badges, which are brand marks
rather than a palette.

`.visually-hidden` is now unused in the markup and is kept: it is a
one-rule generic utility and the next piece of markup may want it.

#### The four cards, unchanged from STEP 37
`.ctc` is a grid: two columns by default (tablet), four from 1200px, one
below 600px. Explicit breakpoints rather than `auto-fit`, because
auto-fit gives three across plus an orphan somewhere in the range and a
row of four actions reading 3 + 1 looks like a mistake.

Every card is `min-height: 72px`, which is both the brief's floor and
what two lines plus the padding comes to. **That also clears the 56px tap
target**, so there is no separate mobile minimum.

1. **Book a meeting** / `15 minutes, no prep needed`
   `https://cal.com/mohamed-elhayyany-my4ujj/15min`, new tab, real
   calendar glyph, arrow after the title. **PRIMARY.**
2. **Email me** / `mohamedelhayyany@gmail.com`
   `mailto:` with a prefilled subject and body, plus a Copy button that
   reads "Copied" for 1.5s.
3. **WhatsApp** / `+212 694 561 949`
   `https://wa.me/212694561949`, new tab, the real brand glyph.
4. **LinkedIn** / `Mohamed Elhayyany`
   `https://linkedin.com/in/mohamed-elhayyany`, new tab, the real brand
   glyph.

Both brand marks are `fill="currentColor"`, per STEP 30, because here the
mark is an affordance rather than a logo.

**Exactly one primary action.** `.ctc__card--primary` is the accent FILL
with `--accent-on` text and a deeper shadow in `--accent-glow`. Nothing
else in the section wears the accent as a fill. Contrast: the title is
**14.6:1** in both themes; `--ctc-prim-sub` is the card's own ink at
reduced alpha so it tracks the theme flip, **10.4:1 light** and **8.7:1
dark**. The badge is `--ctc-prim-well`, a translucent well of the card's
ink, because a panel-coloured tile on a charcoal fill reads as a hole
punched in the card.

**The email card is the one that is not an anchor.** A `<button>` inside
an `<a>` is invalid, so that card is a container with the link stretched
over it by `.ctc__hit` and the Copy button above it on `z-index`,
cancelling the event so a copy never also opens the mail app. The icon,
title and address stay plain text in the accessibility tree.

`.ctc__copy` is deliberately compact and the width is the reason: at four
columns a card is ~248px at 1440, leaving ~114px for the address, and
"mohamedelhayyany" alone is ~104px at 0.8125rem. At the usual
`6px 10px` / `0.6875rem` the button pushed it to three lines; at
`5px 9px` / `0.65rem` it sets as two, which is what the `<wbr>` at the @
is for. **Do not grow this button without re-checking the address at
1440.**

#### The animation is the entrance and nothing else
The page's shared `[data-reveal]` riser, not a scene. **Six revealables**
in document order: the heading block and each of the four cards, plus
whatever precedes them. They rise 24px and fade over 600ms on `--ease`,
staged 100ms apart by an inline `transition-delay` the observer writes.
`transform` and `opacity` only.

`[data-reveal]` is on each CARD, not on the `.ctc` list, and that is
load-bearing: the list would be a revealable too, so its opacity would
multiply with each card's and the row would fade in twice.

**No JavaScript was written for it.** Reduced motion and the no-JS
fallback are properties of the shared riser: `html.rm` holds opacity at 1
and cuts travel to `--rm-shift`, and `.no-js [data-reveal]` leaves
everything present. **All four cards work with JavaScript disabled**:
three are plain anchors and the fourth is a stretched anchor. Only the
Copy button needs script, and the card underneath it is a `mailto:`
either way.

The hover lift is 3px, gated behind `(hover: hover) and (pointer: fine)`,
with an `html.rm` rule that removes the lift and the arrow slide.

#### One screen, and it now fits with no special case
**The short-viewport override is DELETED.** STEP 37 needed one: the chat
panel was ~245px on its own, which put the section near 750px at
1280x720 on top of the 202px its own 14vh padding already spends.

With the panel gone the content is about 344px:

```
  1280x720    202 padding + 344 = 546px
  1440x900    252 padding + 344 = 596px
  1920x1080   288 padding + 344 = 632px
```

All three fit with the DEFAULT padding and no media query. Keeping the
override would only make a section that already fits look top-heavy on a
laptop. If a scene is ever added back, that rule is the first to
reinstate, and `(min-width: 900px) and (max-height: 820px)` is the query
the rest of style.css already uses for it.

The footer follows as ordinary content. Nothing reserves height against
it; `--ct-footer` went in STEP 19 and has not come back.

#### OPEN ISSUE, carried over from STEP 37 and still open
**No desktop screen names the country.** "Based in Morocco" appears
exactly once in the markup, in `.menu__place`, and the mobile menu is
`display: none` above 900px. The pitch band pill says "Working with the
world" with no country, and the footer carries name, role and year but no
location, although the page section list in this file says it should
carry one.

The availability line says "Remote, hybrid or on-site", which is the
arrangement, not the place. This was never asked for and is a side effect
of replacing the old `.ct__line`, which used to read
"Based in Morocco. [Working with the world]."

Three ways to close it, none applied: extend `.ct__avail` to
"... Remote, hybrid or on-site, from Morocco"; add the location to the
footer, which is what the section list already promises; or restore a
short line of its own. **The footer is the cheapest and the only one that
puts it on every screen.**

**No city anywhere on the site, and no "open to roles worldwide"
phrasing.** The location is the country. The Work timeline keeps "Cadi
Ayyad University": that is where a degree was taken, not a statement
about where he will work.

---

## The marker was unreadable in dark mode for one missing line (STEP 43)
The symptom: in dark mode "100+ client accounts", "150+ sales",
"300+ posters", "98% accuracy" and the word "friction" in the Work
headline were a light fill carrying light text, and were effectively
invisible. Every other marked fact on the page with them.

**The cause was one line that was never written.** `--surface-tint` is
declared in `:root` as `#FFE4DD`, a pale coral, and the
`[data-theme="dark"]` block **never redeclared it**. The marker was
`--surface-tint` with `--text` on it, and `--text` DOES flip, so in dark
mode near-white ink landed on a pale coral block at about 1.1:1. This
file documented the dark value as `#3A2420` and style.css never had it.

**That is the lesson and it is not about colour.** The STEP 41 note said
"the tint FLIPS with the theme, so the ink on it has to flip too", and
reasoned correctly from a premise that was false about the file. A pair
of tokens where one flips and the other silently does not is worse than
two that both stay put, because the ink is chosen on the assumption that
the surface moved with it. **When a note says a token flips, check the
dark block for it rather than trusting the note.**

### What STEP 43 did about it, and why STEP 45 undid most of it
**The diagnosis above is right and the fix was wrong, and that is the
part worth keeping.** STEP 43 gave the marker nine tokens of its own
(`--mark-lt-*`, `--mark-dk-*` and three aliases) and made it a
translucent coral chip with a 1px border, a 5px radius and no
`backdrop-filter`. A translucent fill tints whatever is under it, so one
pair of values worked on the page, on a white card and on a steel panel
alike, which is a genuinely elegant property.

The cost was that a translucent fill **has to know what is behind it**,
and two surfaces on this page do not follow the theme: the Growth band
is dark on a light page and light on a dark one, and the opened timeline
card is dark in both. So the nine tokens needed two more rules rebinding
them per surface, and a FOURTH kind of token in the taxonomy, keyed to
the surface rather than the theme.

**STEP 45 deleted all of it** and put the marker back on
`--surface-tint`, which by then existed in both themes because STEP 43's
other half had declared it. See the STEP 45 section below. It is kept on
record here because the chip was not a mistake in itself: if a
translucent marker is ever wanted, this is what it costs, and the file
still has the two deleted rebindings described at the places they went.

### The figures went up with it
The owner's numbers changed, so `250+` became `300+` and `15%` became

### The figures went up with it
The owner's numbers changed, so `250+` became `300+` and `15%` became
`25%` everywhere. **`data-st-count` has to move with the text it is
inside**: the strengths row counts the number up from zero, so the
attribute and the visible digits are two copies of one figure.

---

## Marketing was the thing done last (STEP 44)
The site read as a customer success person who also did some marketing.
It is meant to read as someone who does three things, with marketing
first, because marketing is first in the sequence: the ads bring the
customer in, the sale closes them, customer success keeps them.

**Nothing was added to make that case.** Every fact was already on the
page. What was wrong was the ORDER and the LABELS, and this step is
almost entirely reordering and renaming, plus one stat that was missing
and one figure that was out of date.

### The sales figure
`100+ sales` became `150+` in six places. **`100+ client accounts` is a
different number and did not move**, which is the trap in this step: the
two were the same string, so a careless find and replace takes both. The
accounts figure is still `100+` and is correct. `300+ posters` likewise
did not move.

`data-st-count` has to change with the text it is inside: the strengths
row counts the number up from zero, so the attribute and the visible
digits are two copies of one figure.

### The positioning line
`Technical Customer Success Manager & Business Developer` became
`Marketing, Sales & Customer Success`, in five places. The full entry is
in the positioning line section near the top of this file, including why
the short variant is gone and why the `<head>` still spells out "and".

**The job title did NOT change.** The '25 timeline card still reads
`Customer Success &amp; Sales`, which is his real title. That separation
was asked for explicitly.

**`og:image:alt` and `twitter:image:alt` were deliberately left alone.**
They describe the generated share card, which still shows the old beige
palette and the old title because `tools/build-og-image.ps1` has those
baked in as literals. Changing the alt to the new line would describe a
picture that does not exist. Regenerating the card is its own job, and
the alt text changes with it, not before it. See the social card section.

### Six sidebar stats, and the morph had to stop counting
The sidebar carried four stats and **not one of them was a marketing
number**, on a page whose whole argument is that the three areas are one
job. It is six now, 2x3, ad spend first.

**The structural part: the morph used to pair hero stat N with sidebar
stat N by array position**, `pair(sbStats[s], heroStats[s], ...)`. That
is correct only while the two lists are the same things in the same
order, and it fails in two ways at once when they are not:
1. Position pairs the wrong things. "100+ Accounts" would have flown
   into "$50k+ Ad spend".
2. **A sidebar stat starts at `opacity: 0`** (it is in the morph-start
   list in style.css) and the morph is the only thing that fades one up,
   so the two stats with no hero twin would never have become visible at
   all. That is the half worth remembering: an unpaired element here is
   not merely unanimated, it is invisible.

So pairing is explicit. `data-sb-stat` on a sidebar stat holds the
`data-fly-stat` value of its hero twin, the loop looks the twin up by
attribute, and the two with no twin carry `data-sb-late` and are pushed
into `sbLate`, the existing list of things that simply fade up over the
last 20% of the run. **The two lists can now differ in length and in
order without the morph caring**, which is what should have been true
before.

**Known and accepted: two of the four cross paths in flight.** The hero
runs Accounts then Sales; this column runs Sales then Accounts. The
order here is the one that was asked for. Swapping the hero's first two
stat blocks is the entire fix if the crossing is ever unwanted.

### "Zero to a brand" is a phrase in a row of figures
It is a `.sb__num` like the other five, same chip, same coral, same
weight, at **60% of their size with the break forced by a `<br>`** so
the chip is the same shape at every breakpoint. It is meant to read as a
deliberate odd one out.

**The size needed a custom property, and the reason is a real trap.**
`font-size: 60%` or `0.6em` on `.sb__num--text` resolves against the
PARENT's font size, not against the number's own, so it measured 60% of
the stat's inherited 16px rather than of the chip's 26px and came out
bigger than the figures it was supposed to be smaller than. `--sb-num`
now lives on `.sb__stats` and both read it; the four breakpoints each
set it once. Coral on `--chip-bg` is 5.29:1 in light and 5.63:1 in dark,
so the size drop costs it nothing at 4.5:1.

### The sidebar still fits, and nothing had to shrink
Measured at **1440x800**, where the `(min-width: 900px) and
(max-height: 920px)` block is in force. A stat row there is about 52px: a
24px chip, a two-line 10px label, 3px between them. The third row plus
its 8px gap is about **60px**, and "Zero to a brand" is two lines of
11.4px in a chip sized for one, so row one is about 3px taller again.
Call it **63px against the 90px of slack STEP 40 measured in this
column**, with `.sb__nav` on `flex: 1` giving it up.

So the brief's instruction, gaps and label size before number size, did
not have to be acted on: **the gaps and the label size in that block are
the ones that were already there, and the number size is untouched.** At
`max-height: 660px` the blurb and the ticker already hide, which buys far
more than a row costs.

### Help, and the hero
Help is Marketing, Business Development, Customer Success, and `hlpHome`
is the constant `0` rather than `Math.floor(hlpCards.length / 2)`. The
reveal stagger is `nth-child` based and followed the markup on its own.
Full note under How I Can Help.

The hero's five character traits became the three areas, and `.hx__desc`
became one sentence. Both are recorded in the sections above. The one
consequence worth noting is that **automation is now claimed in exactly
one place, the Help card that evidences it**, where STEP 36 left it
claimed in two and evidenced in one.

---

## The marker is a flat block again (STEP 45)
The glass chip went. The marker is `--surface-tint` with `--text` on it,
an **opaque** pale block, which is what it was before STEP 43:

```
  padding: 0 0.16em
  border-radius: 3px
  background-color: var(--surface-tint)
  color: var(--text)
  box-decoration-break: clone  (+ the -webkit- pair)
  no border
```

Four live rules: `.jr__hl`, `.jr__lead em`, `.gr__hl`, `.ct__hl`.

### What this deleted
- **All nine `--mark-*` tokens**, from both theme blocks.
- **The `.gr` marker rebinding and its `[data-theme="dark"]` twin**, the
  two rules that keyed the chip to the band rather than the theme.
- **The `--mark-*` block on `.jr__card.is-open`.**
- **The fourth kind of token.** The taxonomy near the top of this file is
  back to three: theme, fixed, inverted.

### Why an opaque fill is the simplification, in one sentence
**A block that paints its own ground does not care what is behind it**,
so contrast is one pair of values and it holds everywhere the marker
appears with no per-surface override: the page, a white card, a steel
panel, the dark band in either direction, and an opened timeline card.
The translucent chip's elegance was that one pair of values tinted any
surface correctly; the catch was that it then had to be TOLD which
surface, which is what the two deleted rules were doing.

```
  light   --surface-tint #FFE4DD  +  --text #17191C   14.41:1
  dark    --surface-tint #3A2420  +  --text #F2F3F4   13.01:1
```

Two pairs, both well past 4.5:1, and no third case. The STEP 43 section
has the twelve-pair table the translucent version needed.

### On the dark band it is a bright block, and that is intended
Unchanged from before STEP 43, and worth restating because it looks like
an oversight: the marker is a PAGE-level pair rather than a band one on
purpose. The tint is the same pale block on the Growth band as it is in
Work, and that sameness is what makes a marker read as a marker wherever
it appears. In light mode that is a pale block on a dark band; in dark
mode a dark brown block on a light band. Both are the marker doing its
job.

### Two small inconsistencies that are deliberate
1. **`.jr__lead em` has no radius** where the other three take 3px. The
   line is `clamp(2rem, 5vw, 3.5rem)`, so the marker's box is around
   70px tall and 3px of corner on it is below the threshold of visible.
   A radius that read at that size would have to be big enough to turn
   the block into a lozenge, which is the opposite of a marker.
2. **Its padding is `0 0.12em` against the others' `0 0.16em`**, for the
   mirror of that reason: 0.16em of a 56px word is 9px either side,
   which is a visible gap where the same value on body copy is about
   3px. Both are in `em`, so they track the type the whole way down.

### The highlighter stroke is written and dead
`.pitch-band__line strong, .about__lead em` is a gradient marker, the
fill stopping at 78% of the line box so the caps sit just above the ink.
Neither selector matches anything: the pitch band's turn is a
`<mark class="jr__hl">` and there is no `.about__lead` on the page.

It was offered as the alternative when the chip came out and the flat
block was chosen. **It is kept, on `--surface-tint`, so the two cannot
drift**: if the stroke is ever wanted, it is already written and already
correct in both themes.

---

## Working style
- Show a plan before writing significant code.
- Build one section at a time.
- Explain each block in plain language. The owner is not a developer.
- Never add placeholder copy, fake testimonials, or invented numbers.
- - Never add placeholder boxes or notes-to-self to the rendered page.
