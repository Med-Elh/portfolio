# Portfolio Website. Project Brief (v2, full rebuild)

## What this is
A personal portfolio for Mohamed Elhayyany, targeting Technical Customer Success
Manager and Sales roles. Single page, static, English only. This is a REBUILD.
The previous version was too close to a resume. This one goes deeper: real case
studies with context and outcomes, not bullet lists.

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

## The role title, at two lengths
Spelling is exact in both. "Technical Customer Success Manager", never
"manager" or "CSM"; "Business Developer", never "Business Development" in
the full version.

**Full: `Technical Customer Success Manager & Business Developer`**
Used wherever there is room: the `<title>`, the meta description, the
og:title, og:image:alt and twitter:title, the sidebar blurb, the hero
portrait's `alt`, the hero tagline above 900px, and the footer.

**Short: `Customer Success & Business Development`**
For tight spaces. Currently one use: the hero tagline below 900px, where
the full title wrapped to three lines at 360px and pushed "That's
Mohamed." away from the title it answers. Both spans are in the markup and
CSS shows one per breakpoint, so the hidden one is out of the
accessibility tree and the line is never read twice.

The ampersand is written `&amp;` everywhere, including in text content
where a bare `&` would also parse. One form throughout means a later edit
cannot move a string from text into an attribute and break it.

## Assets
- `assets/images/portrait.jpg`
- `assets/docs/cv.pdf`
- Never invent filenames. Ask if an image is needed that does not exist.

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

## CRITICAL RULE
Never invent content. No fabricated metrics, client names, project names,
testimonials, or outcomes. Anything marked `[TO CONFIRM]` must be left as a
visible placeholder for the site owner to fill in. Do not guess a value and do
not quietly drop the section.

---

## Design direction

Structure and motion modelled on saad.moatassime.com. Colours stay as below.

### Colour (light warm-beige base, charcoal accent)
**STEP 30 replaced the violet accent with charcoal.** The palette is
beige, charcoal and yellow, and nothing else. Every violet on the page
was already behind a token, which is why this was a palette edit and not
a sweep: there was not one violet literal in index.html, and only the
particle pair in script.js.
```
--bg:           #d6d0c1   /* warm beige page background */
--surface:      #e3dfd3   /* sidebar blocks, cards, stat boxes, pills */
--border:       rgba(0, 0, 0, 0.08)
--text:         #111111   /* near-black: headings, nav, emphasis */
--body:         #4a463d   /* secondary text, body copy */
--muted:        #5c574c   /* faint labels and captions */
--accent:       #1f1f1f   /* primary accent, 10.7:1 on --bg */
--accent-hover: #000000   /* the HOVER state, darker not lighter */
--accent-text:  #1f1f1f   /* the accent as small text */
--accent-on:    #f4f1ea   /* what sits ON the accent, 14.6:1 */
--accent-glow:  rgba(31, 31, 31, 0.18)
--accent-2:     #f5e500   /* see the note below */
--bg-blur:     rgba(214, 208, 193, 0.82)  /* --bg with alpha: nav card, menu */
--wordmark:    #c9c2b0   /* the oversized name behind the hero: a shade
                            darker than --bg, a stamp not a headline */
```
This is a LIGHT theme. Anything that used white text on the old dark
background now uses `--text`. The only hard-coded `#FFFFFF` left is white
sitting on the accent, and it is `--accent-on` rather than a literal:
the filled button, the sidebar CTA, the skip link.

Charcoal is the primary accent throughout: buttons (accent fill,
`--accent-on` text, `--accent-hover` on hover), the active nav item,
progress bars, carousel arrows, link hovers, focus rings, the timeline
thread and its markers, the Growth cards' label markers, the particles,
and every number that used to be amber. The availability dot is the one
exception and stays green: it means "available", not "brand".

**The accent is now close to the body text colour, so interactivity
cannot come from hue.** It comes from shape and state instead, and this
is the rule, not a preference: a button is a SOLID FILL with inverted
text, the active nav item is filled with inverted text, and everything
else gets a border or a lift on hover. A charcoal link that looked
exactly like charcoal body copy would be the whole cost of this palette.

**Small accent text uses `--accent-text`, which is a separate token for
the dark theme's sake.** In light it is the same value as `--accent`,
because charcoal clears 4.5:1 at any size. In dark it steps back to the
page's own ink: a run of small text set in the same off-white as a filled
button glares.

**`--on-accent` is no longer a FIXED token.** White always sat on violet
because violet was dark in BOTH themes. The accent now flips from
charcoal to off-white, so what sits on it has to flip too, and
`--on-accent` tracks `--accent-on`.

`--accent-2` is the one colour STEP 30 did not touch, and it is **never a
foreground**: against `--bg` it measures **1.05:1**, because a bright yellow and a light
beige sit at nearly the same luminance. It is only ever a surface with
dark text on top of it. That means the marker behind a key fact in the
Work cards, the highlighted word in a lead sentence, the section number
chip, or an image wash, as in the ME-band collage fallback. If a true second
accent is ever wanted as a foreground, it has to be a bronze or olive dark
enough to pass. `#6b5410` reaches 4.68:1.

Never put the accent and yellow on the same small element. Text on the yellow
marker is `--on-accent-2`, which is `#111111` in BOTH themes. It is not
`--text`: `--text` flips, the yellow does not, and following it put
near-white on near-yellow at 1.07:1.

### Dark theme (STEP 10)

`[data-theme="dark"]` on `<html>`. There is one block of overrides near the
top of style.css and nothing else in the file knows the theme exists: no
component carries a colour literal any more.

```
--bg:          #141312   /* warm near-black, not neutral grey */
--surface:     #1f1d1a
--surface-strong: #2a2825
--border:      rgba(255, 255, 255, 0.08)
--text:        #eae8e3
--body:        #c9c4b8
--muted:       #b8b4aa
--faint:       #8a8578
--accent:       #f4f1ea   /* the accent INVERTS: off-white here */
--accent-hover: #ffffff   /* on a dark page the hover is LIGHTER */
--accent-text:  #eae8e3   /* the accent as small text: the page's ink */
--accent-on:    #141312   /* what sits ON the accent */
--accent-glow:  rgba(244, 241, 234, 0.16)
--accent-2:     #f5e500   /* unchanged: yellow is the constant */
--wordmark:    #211f1c
--bg-blur:     rgba(20, 19, 18, 0.86)
--chip-bg:     #0b0b0b   /* stat chips, plus a light hairline */
glow tint:     rgba(120, 105, 90, 0.18)
particles:     lighter pair, alpha x 0.55
```

**Three kinds of token, and it matters which is which.**
1. THEME tokens flip: `--text`, `--surface`, `--border` and the rest.
2. FIXED tokens do not, because they are a colour ON something whose own
   colour never changes: `--on-accent-2` (near-black on yellow),
   `--gr-badge` (the off-white tile a real brand logo sits on),
   `--chip-bg`, `--avatar-bg`, `--overlay`. (The laptop scene's
   `--ct-*` tokens went with the laptop in STEP 19, and `--scrim` went
   with the video lightbox in STEP 29.)

   **`--on-accent` used to be in this list and is not any more.** See
   the accent note above: the accent flips, so what sits on it flips.
3. INVERTED tokens flip the other way: the whole `--vid-*` set, plus
   `--gr-rim`. The name is historical. It is the dark band's palette,
   and the band is Growth now; see STEP 30 below.

**Shadows deepen, they do not invert.** `--shadow-1` to `--shadow-4` go
from rgba(0,0,0,0.05..0.32) to 0.30..0.70. A light shadow on a dark page
is a glow, and a glow on every card makes a dark theme look radioactive.

**`--accent-fill` and `--accent-fill-hi` are now aliases of `--accent`
and `--accent-hover`.** They existed because the violet `#8b5cf6`
measured 4.23:1 under white text and most of that text is small, so a
filled control needed a darker cut of its own. Charcoal does not: what
sits on it is 14.6:1 either way. The names stay because twenty-four rules
read them, and because a future accent may need the split again.

**The dark band inverts.** It is the page's one reversed-out section, so it
is dark on a light page and light on a dark one, and the sidebar panels
that pass over it switch to whichever style it is not. The switch code in
script.js is untouched: `.is-dark` still only means "this panel is over
the band", and only the values underneath it swap.

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

**Contrast is checked, not assumed.** Both themes clear 4.5:1 for body
text and 3:1 for large headings. The traps found by measuring: text on the
yellow marker, the reading highlight dimming a section number that sits on
a yellow chip, and the dark band's marker inheriting the page's grey
rather than the band's. Contact's accent was a fourth until STEP 19
deleted the laptop it lived inside. The conversation that stands there
now brought its own trap, and the same kind: `--cv-live`, the green
status dot's text, is 0.78rem and therefore NOT large text, so the floor
is 4.5:1 rather than 3:1. The first green failed at 2.85:1.

One bloom permitted per screen, heavily blurred and low opacity. `--glow`
is a gradient, not a flat colour. Three elements use it as a
`background-image`, and it is a warm grey-brown, reading as a soft shadow
cloud behind the content rather than a light source. `--glow-warm` is the
one exception, behind the Contact heading only. Background particles are
the accent and a dark grey at low opacity (`PARTICLE_RGB` in
script.js, the one place in that file that holds a palette value: a
`getComputedStyle` per particle per frame is what the loop cannot
afford, so the two values are written there and have to be changed
there when the palette moves).

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

### The portrait's edges (STEP 13)
`portrait-cutout.png` is only half a cutout, and this is measured, not
guessed. At 448x557: the alpha row at face level reads
`0 0 0 0 255 255 255 0 0 0 0`, so the head is properly cut out, but at
shoulder level it reads 255 all the way across, **181 of the 557 pixels
on the left edge are fully opaque, 192 on the right, and all 448 along
the bottom**. The lower third is a hard crop. The straight cut is the
image, not the mask. Fixing it properly needs a new asset; until then the
mask hides it.

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

### The phone's hero parallax (STEP 13)
Below 900px, read from scrollY on a rAF so scrolling back up runs it
backwards through the same numbers rather than replaying in reverse.
Portrait: translateY -15% of the distance scrolled, scale 1 to 1.06, fade
from progress 0.5, blur 0 to 10px. The name moves at twice the portrait's
rate so the two visibly come apart. The headline and buttons are gone by
0.6, leaving the portrait alone for the second half. Reduced motion: fade
only, in the same order.

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
`01 / Work`, `02 / What I Bring`, `03 / How I Can Help`,
`04 / Growth`, `05 / What People Say`, `06 / Contact`.
Number in `--accent`, title in `--muted`.

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

1. **Nav**. Fixed. Name at left, links at right, plus a Resume link that
   downloads `cv.pdf`. Transparent over the hero, translucent blurred
   background once scrolled. Active section highlighted. Mobile: full-screen
   overlay menu, wipe-in from right, staggered numbered links.

2. **Hero**. Full height.
   - Eyebrow label: `Technical Customer Success`
   - Name, huge, with an accent full stop
   - Buttons: `Get in touch`, `View work`, `Resume`
   - A row of four stat blocks beneath: value large, label small
   - Portrait to the right on desktop, greyscale, colour on scroll position
     on touch and on hover on desktop
   - `Scroll` indicator at the bottom
   - Availability line: `Based in Morocco. Working with the world.`

2b. **Pitch band**. The pitch, moved out from under the name and given a
   screen of its own between the Hero and Work. Section-heading scale,
   left-aligned, weight 400 with the one emphasised clause at 700 in
   `--accent`. Beneath it a small row: circular portrait avatar, an
   "Working with the world" pill, and a `Get in touch` button to `#contact`.
   Fades in on scroll. It is also what the hero-to-sidebar migration
   measures its run against. script.js anchors on the first
   `[data-reveal]` below the hero zone, which is this.

3. **Marquee**. Infinite horizontal strip of capability keywords, repeating.

4. **Work (01)** - the whole of it. The old Selected Work section is gone;
   this one absorbed it, and the old Background section before that.

   A lead sentence at heading size with the accent word on the yellow
   marker, a four-line intro (max ~560px), then a **strengths row**: four
   blocks - Customer Success, Business Development, Marketing, Team
   Leadership - each a small accent icon, the strength name, and one line
   of proof carrying its number on a yellow marker. Four across, 2x2 under
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

5. **What I Bring (02)** - a huge two-line gradient heading, then one
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

6. **How I Can Help (03)** - a two-line heading, one dark line and one
   in --body, then a single panel holding three cards: Customer
   Success, Business Development, Marketing. Each is an accent badge and
   title, a result line with its number on the yellow marker, a short
   description, and a "What you get" list of three. The list is pinned to
   the bottom of the card with `margin-top: auto`, so the three cards
   finish flush however differently the copy above wraps.

   **One call to action for the section**, not one per card: a single
   filled accent button, centred under the panel, reading `Let's talk`
   and linking to Contact.

   **The highlight is one element that slides**, not three backgrounds
   fading in and out - three crossfades read as a flicker as the cursor
   crosses the row. It rests on the middle card, follows the hovered card
   (and the focused one, for keyboard users), and returns to the middle
   on leave. It is measured from where the cards actually are, so it
   survives a change of copy or a reflow. Below 900px there is no cursor
   to follow: the highlight is dropped and every card wears the colour.

   Cards fade up 26px one after another when the panel arrives; under
   reduced motion they are simply there and the highlight jumps rather
   than travels.

7. **Marquee CTA**. Large infinite scrolling text: `Keep Customers · Grow
   Revenue · Automate The Rest ·` repeating, accent-tinted.

8. **Growth (04)** - the page's one dark band, full width and passing
   under the sidebar. The inner content keeps the ordinary section gutter
   and the ordinary `.wrap`, so the pill, heading, paragraph and the
   cards land on exactly the same left edge as every section above.
   Padding does not shrink a background box, so the dark fill still runs
   the full width. Two case study cards side by side, one column below
   1180px. See the Content section below for the copy, the card design
   and the whole of STEP 29 and STEP 30.

8b. **Name divider**. The full name on two lines, MOHAMED / ELHAYYANY,
   filled yellow, sitting **immediately before Contact**. Decorative and
   aria-hidden: the name is already the page title, the hero wordmark and
   the sidebar logo, and a fourth reading helps nobody.

   Drawn as one SVG. **The clipPath and the visible letters are the same
   `<text>` nodes**, so the yellow and the window the photographs appear
   through cannot drift apart the way a CSS clip built from a duplicate
   copy of the text would once a web font loads.

   On a fine pointer, moving across the name spawns a photograph from
   `assets/collages/` every 90px of pointer travel, clipped to the
   letters, fading in and out over 1.2s. Distance, not pointer events: a
   pointermove can fire sixty times over ten pixels.
   No trail on touch or under reduced motion; the yellow name stays.

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
9. **Contact (06)** - a two-line heading, an animated typing scene and
   three contact cards. No form. The old version (a large closing
   statement with magnetic email and phone links) is gone, and so is the
   magnetic module itself: it was built for those links, nothing else
   used it, and `data-magnetic` no longer appears anywhere.

   **The section is no longer pinned to one screen.** STEP 18c reserved
   `calc(100svh - var(--ct-footer))` so the heading, the laptop and the
   cards shared a view; STEP 19 dropped that along with `--ct-footer` and
   the `display: contents` grid that went with it. The heading is at full
   size and allowed above the fold, and what has to share a screen is the
   LINE and the THREE CARDS, which is the smaller promise and the one
   that matters. The section is as tall as its content and the footer
   follows it.

   Two things from STEP 18c survive because they are still right: the
   compact card, with the badge and the label on one row and the value
   under them, which is one 42px row saved on each of the three; and the
   phone's section padding, where `14vh` of an 844px screen was spending
   118px at the top AND the bottom, more than a quarter of a screen, on
   nothing.

   **The animation is the conversation (STEP 20)**, described in full
   under Contact in the Content section below. The laptop scene and the
   line that briefly replaced it are both deleted. The heading and the
   availability line stay in `.wrap` as ordinary stacked content, and the
   chat panel sits under them inside the same wrap.

10. **Footer**. Name, role, location, current year.

---

## Content

### Hero
Eyebrow: Technical Customer Success
Headline (two lines):
Customers Stay.
Revenue Grows.
Availability: Based in Morocco. Working with the world.

Wordmark (the oversized name behind the portrait), two lines:
MOHAMED
ELHAYYANY
Yellow `#f5e500`, Inter 800, uppercase, line-height 0.85. ELHAYYANY is the
wider word and sets the size. The font-size is in `vw` and the box is a
percentage, so it spans ~92% of the hero at every width. The portrait sits
in front, its head crossing the second line.

#### The name is yellow in both themes, with a hairline rim in light
`#f5e500` on the beige `#d6d0c1` measures **1.18:1**. No outline changes
that number and nothing ever will: a bright yellow and a light beige sit
at nearly the same luminance, which is the same fact that keeps
`--accent-2` off every foreground on the page. So the letter is not what
carries the contrast, the rim is: `#111111` against the beige is
**12.28:1** and against the yellow **14.47:1**, so every edge of every
glyph is a hard boundary. On the dark page the yellow is 14.2:1 on its
own and the rim is switched off entirely.

**A hairline, and nothing else.** `--name-sw` is `0.006em`, about 1.3px
at the hero size. There is no offset shadow, no glow, and no second copy
of the text anywhere on the page. An earlier pass used `0.030em` plus a
`0.040em` hard shadow, which read as a sticker rather than as a letter;
that is the thing this replaced, and it should not come back.

**Two tokens, one pair, three surfaces**: `--name-ink` and `--name-sw`.
Both are neutralised in dark rather than the rules being duplicated per
theme. `--name-sw` is `0px` there, never a bare `0`, because the phone
floors it with `max()` and `max()` containing a unitless zero is invalid
and throws the whole declaration away.

At a hairline it no longer matters whether the stroke is centred on the
outline or painted behind it: half of 0.006em is a third of a pixel, far
below where Inter 800 looks thinned. `paint-order: stroke fill` is still
there on the wordmark and `paint-order: stroke` on the divider, because
it costs nothing and keeps the glyph exact, but nothing depends on it.

**The divider draws its own letters now.** The two `<text>` nodes used to
live inside the `clipPath` with a yellow `<rect>` clipped to them, which
left no glyph to stroke and forced the layered approach. They are drawn
directly, their own `fill` is the yellow and their own `stroke` is the
rim, and the `clipPath` reaches them through `<use>`. So the window the
photographs appear through is a REFERENCE to the painted shape rather
than a duplicate of it, which is the same guarantee the original design
wanted and one element fewer. The trail is clipped to the glyph outline
and therefore stops at the inside edge of the stroke, leaving the rim
standing around every photograph.

**The phone needs a floor, and it is not decoration.** 0.006em against
the phone's 14vw wordmark is 0.33px at 390, which Chrome draws as a third
of an alpha value and the eye does not see at all, putting the name back
to the 1.18:1 it is outlined to escape. `max(0.6px, var(--name-sw))`
leaves every desktop width untouched and only engages below about a 100px
font. The divider's floor is written in user units (`max(1.8px, ...)`)
because in SVG a px IS a user unit: the viewBox is a fixed 1000 wide, so
one unit is 0.39 screen px at 390 and 1.44 at 1440.

**The flying copy winds the rim down as the pill forms.** script.js
writes the stroke onto `.sb__logoin` scaled by `1 - ink`, on exactly the
window that turns the letters to ink, in `em` so the value rides the
flight's CSS scale for free instead of needing to be divided by it every
frame. What lands in the sidebar is the ordinary pill. **The sidebar logo
pill at rest is not part of this**: it is dark text on a yellow lozenge
and already has all the contrast it needs.

Measured, light: wordmark stroke 1.15px at 1280, 1.29px at 1440, 1.72px
at 1920, 0.60px at 390; divider 0.84 / 0.99 / 1.37 / 0.70 css px. Zero
horizontal overflow at every one, no letters touching, no text-shadow
anywhere, exactly two `<text>` nodes in the divider SVG, and the collage
trail still reads inside the letters.

The same name, the same two lines and the same tracking appear in the
sidebar logo pill and in the mobile topbar pill. The hero wordmark and the
sidebar pill must keep **identical `letter-spacing` and `line-height`**: the
morph scales the real pill up by the ratio of the two font sizes, and that
only overlays the wordmark exactly while every em-based measurement matches.
Change one and you must change the other.

### Pitch band (its own section, between Hero and Work)
Marketing opens the door. Business development closes the deal.
**Customer success makes it last.** I've done all three.
(the middle clause sits on the yellow marker, in dark text)
Status pill: Working with the world
Button: Get in touch → `#contact`

Stat blocks:
- `100+` Customers managed
- `100+` Sales closed
- `98%` Policy accuracy at scale
- `15%` Revenue growth in 2 months

### Marquee keywords
Customer Success · Business Development · Marketing · Sales ·
Retention · Team Leadership · Account Management · Partnerships
(Both copies of the strip must stay identical - the track slides exactly
half its own width, so any difference shows as a jump in the loop.)

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
on a yellow marker.
- **Customer Success** - [100+ accounts] managed from onboarding to renewal
- **Business Development** - [100+ sales] closed and B2B clients like
  Experience Morocco
- **Marketing** - Meta ad campaigns and a brand that sold [250+ posters]
  in the first 3 months
- **Team Leadership** - Team Lead at Majorel with [98% accuracy]

#### Colour inside this section
The accent carries it: the year numbers, the timeline dots and the tool
badges. Yellow has one job only: a `<mark class="jr__hl">` behind a key
fact, always with dark text (`--text`) on it, **max two per card**. There
are no certificate images anywhere in this section.

The year is `--accent` on the light card. Inside an OPENED card it
cannot be: the card turns #1f1f1f, which after STEP 30 is the accent
itself, so the accent would be colouring its own background. It goes to
`--jr-open-year`, #f4f1ea, which is the accent inverted and 14.6:1 on
the open card. Same size and weight either way; only the tint changes.

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

**'22 / Leading a team** · badges MJ / shield · Majorel · 2022 - 2024
Short: Content Moderator, then [Team Lead] at Majorel, with [98% accuracy].
More: Reviewed content at scale against strict policies with 98%
accuracy, then moved up to Team Lead: training new moderators, mentoring
the team and keeping quality high.
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
Short: [100+ accounts], 100+ sales and [+15% revenue] in 2 months at SafeApps.
More: I own the full client lifecycle for SaaS accounts, from onboarding
to renewal, and I close new business: 100+ sales so far. I run Meta ad
campaigns (targeting, creative, conversion optimisation) and set up the
tracking and messaging flows that keep clients engaged. I also script,
film and edit UGC videos for the brand.
  tags: Customer Success · Business Development · Marketing
  what I brought: Client retention from day one · New revenue through sales · Ad campaigns that convert

**'26 / Founded Postry** [current] · badges P / shopping bag · Postry ·
2026 - Present
Short: [250+ posters] sold in the first 3 months, B2B clients, zero
outside funding.
More: A DTC wall art brand on Shopify that I run end to end, from product
to marketing. I sourced B2B clients including [Experience Morocco], plus
artist and creator commissions. Profitable with zero outside funding.
  tags: Business Development · Marketing · Founder
  what I brought: Sourcing B2B partners · Building a brand from zero · Profitable without funding

`[square brackets]` above mark the yellow highlights.

The old Background section (education, certifications, languages) was
removed. What survived of it lives in the year it happened.

### What I Bring (02)
Pill "02 - WHAT I BRING", then a huge centred heading on two lines,
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
text with a yellow marker on the key fact. It is centred on its own chip,
nudged back on screen if that would hang it off an edge, and flipped above
the chip when there is no room below. On a phone it goes full width at the
bottom of the screen instead.

- SUCCESS / Customer Success - I own the client lifecycle from onboarding
  to renewal for [100+ SaaS accounts].
- GROWTH / Business Development - I source partnerships and new accounts,
  from B2B clients like [Experience Morocco] to creator collaborations.
- MARKETING / Marketing - I run [Meta ad campaigns]: audience targeting,
  creative and conversion optimisation. I grew an Instagram account from
  [0 to 8,000 followers] in under a year, and I create UGC videos that
  explain the product and drive sign-ups.
- RETENTION / Retention - Clear onboarding, fast answers and regular
  check-ins, so [clients stay] and grow.
- SALES / Sales - Full-cycle outreach that turned prospects into [100+
  closed sales] and +15% revenue in 2 months.
- TEAM / Team Leadership - As Team Lead at Majorel I trained and mentored
  moderators while keeping [98% accuracy].
- LANGUAGES / Languages - [Arabic, English, French and Spanish] - I work
  with clients in their own language.

`[square brackets]` mark the yellow marker in each card.

#### The reveal
The sentence is pinned for one extra viewport height and the words come
into focus left to right as you scroll through it: opacity 0.15 to 1 and
blur 4px to 0, each word on its own slice of the run. It is read from
scrollY every frame rather than played on a timer, so scrolling back up
runs it exactly backwards. No CSS transition on the words - the scroll and
a transition would be fighting over the same two numbers.

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

### How I Can Help (03)
Heading, two lines, left aligned: "Where I Make" in `--text`, "The
Difference" in `--body`.

Intro: Three areas, one goal: more customers who stay longer and spend
more.

`[square brackets]` mark the yellow marker in each result line.

1. **Customer Success** - [100+ accounts] managed
   I take clients from onboarding to renewal, so they get value fast and
   stay.
   What you get: Smooth onboarding / Proactive check-ins / Fewer churned
   accounts
2. **Business Development** - [100+ sales] closed
   I find the right partners and accounts, then turn conversations into
   signed deals.
   What you get: Qualified leads / Full-cycle outreach / New B2B
   partnerships
3. **Marketing** - [0 to 8,000] followers on Instagram
   I grow the account, run the Meta ad campaigns and build the brand
   that turns attention into sales.
   What you get: Targeted ad campaigns / Clear messaging / Conversion
   tracking

Under the panel, centred, one filled accent button: `Let's talk`, linking
to `#contact`. It is the only place that phrase appears in the section.

The highlight colour is `#d9d4c5`, a step darker than `--panel`. The
three card titles do not all wrap to the same number of lines, so each
title reserves two lines and centres its text in them - that is what
keeps the badges and the result lines level across the row. The "What
you get" block carries `margin-top: auto` so the checklists sit flush on
the bottom of every card whatever the copy above them does.
The min-height for it has to sit on the title, not on the badge row: an
em on the row resolves against its inherited 16px, not the title's size.
### Marquee CTA
Bring Customers · Keep Them · Grow Revenue · Automate The Rest ·

### Growth (04)
**This is the page's one dark band** - #111111, ink #eae8e3, muted
#b8b4aa, sharp edges and no gradient into the beige. It runs full width
and passes UNDER the fixed sidebar, which is what the sidebar's own dark
switch below is for. The band is older than what stands in it: STEP 29
deleted the six UGC videos, their carousel, their phone stack and their
lightbox and put two case study cards here, and **STEP 30 renamed the
section from Channels to Growth and rebuilt the cards.** The band, the
inverted palette and the sidebar switch survived both.

Pill "04 / GROWTH". Heading, two lines, left aligned: "Accounts I Grew"
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

#### The copy, unchanged from STEP 29
**Card 1**
- handle `@postry_art`, one link, Instagram
  `https://www.instagram.com/postry_art`
- figure `0 to 8,000`, label "followers in under a year"
- The challenge: A brand new poster brand with no audience and no budget
  for reach.
- What I did: Built the content strategy, filmed and edited every post,
  set the posting schedule, ran collaborations with influencers and paid
  ad campaigns.
- The result: 8,000 followers from zero, feeding a store that sold 250+
  posters in its first 3 months.
- tags: Content strategy, Filming, Editing, Influencer collabs, Paid ads,
  Posting schedule

**Card 2**
- handle `@egrowdotcom`, two links, Instagram
  `https://www.instagram.com/egrowdotcom` and YouTube
  `https://www.youtube.com/@eGrowdotcom`
- **No figure. None was supplied and one is never guessed.** The
  centrepiece block carries `Instagram + YouTube` instead, with
  "short form content, scripted to edit" under it, in the same style at a
  size that fits two words rather than five characters. It is NOT yellow:
  that is a label, and yellow's job on this page is a result. Do not put
  a number here, and do not leave a visible placeholder either.
- The challenge: A SaaS product that needed short form content people
  would actually watch.
- What I did: Filmed and edited UGC videos for the product, defined the
  content strategy and ran the posting schedule across Instagram and
  YouTube.
- The result: A steady stream of product content that explains the tool
  and drives sign ups.
- tags: UGC video, Filming, Editing, Content strategy, Posting schedule

**Equal heights, and the second card is the one that needs help.** A card
without the figure block is about 135px shorter than one with it, and the
two are the same height, so that space has to go somewhere deliberate.
`.gr__block--grow` carries `margin-top: auto` on the second card's result
block, so the slack collects in ONE place, above a conclusion, where it
reads as separation. Spread evenly between the three blocks it read as a
card that had run out of things to say. Both cards' result lines are also
a step up in size and into the band's full ink. Measured at 1440: both
cards 835px, tag row 1px off the padding box in each.

#### The yellow figure needs a rim on the light band
`--accent-2` is 12.6:1 on the dark band and the figure is simply yellow
there. In the DARK theme the band inverts to the light one, where the
same yellow is **1.02:1** and no colour choice fixes that: it is the same
fact that keeps `--accent-2` off every foreground on the page.

So the letter does not carry the contrast there, the rim does, exactly as
the hero wordmark and the name divider do. `--gr-rim` is `transparent` in
light and `#111111` in dark, and the stroke WIDTH never changes, because
a transparent stroke paints nothing. `paint-order: stroke fill` keeps the
glyph its true weight. `max(1px, 0.018em)` is 1.08px at the desktop size,
which is where the wordmark's hairline lands too; the floor is for the
phone, where 0.018em of a 37px figure is 0.65px and Chrome draws it as a
fraction of an alpha value.

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
invisible. `.gr`, `.sb__panel.is-dark` and `.sb__resume.is-dark` all
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
panel. **The logo pill stays yellow with dark text in both worlds.**
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
MOHAMED / ELHAYYANY, yellow `#f5e500`, both lines one size, the longer
one spanning 92% of the SVG's 1000-unit viewBox. In light they carry the
hairline rim described under the Hero wordmark above, as their own
`stroke`. The two `<text>` nodes are DRAWN, not just used as a clip
shape, and the `clipPath` refers to them through `<use>`, so there is one
set of letters and the photographs are cut from the very shape that is
painted. The `<rect>` that used to be clipped to them is gone.

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
### Contact (06)
Pill "06 / CONTACT". Heading, two lines, left aligned: "Let's Work" in
`--text` over "Together" in `--body`, same scale as the other section
headings.

Line: Based in Morocco. [Working with the world].
(the bracketed part sits on the yellow marker, in dark text)

**No city anywhere on the site, and no "open to" phrasing.** The location
is the country, and the availability is that it does not limit anything.
The Work timeline keeps "Cadi Ayyad University" as it is: that is where a
degree was taken, not a statement about where he will work.

#### The scene: the conversation (STEP 20)
A chat panel plays a short exchange, then the three contact methods
arrive as the actions in the bar beneath it.

It replaces "The Line That Connects" (STEP 19), and the laptop typing
scene before that. Both are deleted: markup, CSS and JavaScript, plus the
line's `--tl-stroke` and `--tl-pulse` and the laptop's nine `--ct-*`
tokens. Do not bring any of it back.

**The copy, chosen deliberately and not to be rewritten casually:**

> Are you open to new work?
>
> **Yes. Based in Morocco, working with the world. Remote, hybrid or on
> site.**

Header: `Mohamed Elhayyany`, then a green dot and `Usually replies same
day`.

**Nothing here invents a person.** The grey bubble is a question anyone
might ask, not a quotation attributed to anybody. That matters because
What People Say a few sections up carries three REAL things that were
said to him, and a fabricated fourth sitting two sections below would be
read as one of the set. Three of the five drafts were rejected for
exactly this: they put a detailed brief in the mouth of an unnamed
recruiter.

**The green dot means something true.** It is attached to "usually
replies same day", which the site owner confirmed, and NOT to live
presence. A static page cannot know whether anyone is online, and a
presence light that is always green is the one element in a scene like
this that actually misleads someone.

**The timestamp is the visitor's own clock**, read with
`toLocaleTimeString` in their locale and timezone, and re-read on
`visibilitychange` so a tab left open overnight is not still claiming the
message arrived at breakfast. A frozen 09:41 is the same small lie as the
green dot. If anything throws, the `<time>` stays empty and the line
reads "Delivered", which is why the separator is generated by CSS from
`:not(:empty)` rather than typed into the markup. Non-breaking spaces in
that generated content, or it collapses against the text beside it and
sets as "Delivered ·04:12".

#### STEP 31: it is styled as WhatsApp on iOS
The sequence, the beats, the typing animation and the three contact rows
are unchanged. What changed is the surface treatment.

The panel is three bands now, not one padded box: HEADER, WALL, ACTION
BAR. The padding moved off `.cv__panel` and onto each band, because the
wall has to run edge to edge the way a chat background does and a padded
parent would have inset it. `overflow: hidden` clips the wall to the
radius.

```
              light      dark      what it is
--cv-panel    #efece4    #111b21   header and action bar
--cv-wall     #efe7dd    #0b141a   behind the bubbles
--cv-in       #ffffff    #202c33   incoming bubble
--cv-in-ink   #111b21    #e9edef   17.4:1 light, 12.1:1 dark
--cv-out      #dcf8c6    #005c4b   outgoing bubble
--cv-out-ink  #111b21    #e9edef   15.2:1 light, 6.8:1 dark
--cv-stamp    #55625a    #9fb3ac   timestamp, 4.9:1 on --cv-out
--cv-row      #e0dcd2    #202c33   action rows and header buttons
--cv-tick     #53bdeb              FIXED: the read receipt, both themes
--cv-wa       #25d366              FIXED: the brand green
```

**The tail is a radial-gradient, not a triangle.** The flick WhatsApp
draws is CONCAVE, and `radial-gradient(circle at <far corner>,
transparent 13px, <bubble> 13.5px)` takes a quarter-circle bite out of a
13x15 pseudo-element for one declaration and no extra markup. Each side
names its own colour rather than inheriting, so a later override on one
bubble cannot silently retint the other's tail.

**The timestamp and ticks sit INSIDE the outgoing bubble**, floated
right and dropped into the last line, which is how the real thing does
it: the text wraps around the stamp instead of the stamp taking a line of
its own and making every bubble a line taller. It is still its own
`[data-cv-step]`, so it still arrives after the message lands; nesting
does not disturb the sequencer, which collects `[data-cv-step]` in
document order and this is still the third of four. The one rule it
needed is `transform: none` while live, or it would travel a second time
inside a bubble that had already arrived.

**#53bdeb on #dcf8c6 is 1.86:1 and that is allowed.** The ticks are
decoration: a visually hidden "Read" sits beside them and carries the
state, the same way the status dot leans on the word next to it.
Darkening the blue would be inventing a colour the interface being quoted
does not have. In dark it is 3.74:1 anyway.

**The status line still says "usually replies same day", NOT "online".**
This was asked for as "online" in STEP 31 and is deliberately not that.
A static page cannot know whether anyone is online, and a presence light
that is always green is the one element in a scene like this that
actually misleads someone. It is the same reason the line was written
this way in STEP 20. The GREEN is WhatsApp's, the claim is not.

`--cv-live` is #00705c in light and #25d366 in dark. It cannot be
#25d366 in both: WhatsApp's own green measures **1.62:1** on the light
panel, and the status line is 0.78rem, which is not large text, so the
floor is 4.5:1. The DOT beside it is the real #25d366 in both themes,
because a dot is a graphic whose meaning is spelled out in the word right
next to it.

**The header's second button is a video call**, per the WhatsApp header,
and it points at `wa.me` because that is where a video call actually
happens. A camera glyph over a `mailto:` would be an affordance that
lies about what it does.

**Bubbles are 75% on desktop and 82% on a phone.** Not 75% on both: 75%
of a 326px column is 245px, and the reply is 72 characters, which at
0.95rem is six lines in a bubble taller than it is wide and stops reading
as a message.

The rest of the page stays beige, charcoal and yellow. This section is
quoting an interface, the same way the Growth badges quote a brand logo.

**Four surface tokens** were the STEP 20 original, because a chat panel is
a stack the palette did not have: a sheet, bubbles sitting ON the sheet,
and a hover state above those. `--surface` and `--panel` are the same
colour here, so a bubble painted `--panel` on a `--panel` sheet would be
invisible. That reasoning is why the list above exists at all.

`--cv-live` is 4.5:1, not 3:1. The status line is 0.78rem, which is not
large text, so the large-text floor does not apply to it. Measured,
`#12a150` was 2.85:1 on the sheet and failed; `#0f7a3a` is 4.60:1 and
still reads as a status light rather than as ink. In dark it goes to
`#46d07f` (8.08:1), because the light green is 2.6:1 on a dark sheet.

**The action bar is not three equal columns.** The address is one
unbreakable 26 character run and the other two values are about half
that. An even split gave the email 181px against the 190px it needs and
broke it over two lines while the phone row sat half empty, so the
columns are `1.25fr 1fr 1fr`.

#### The sequence
**The markup is the finished state** and script.js winds it back to play
it, the same contract every scene in this section has had. `.is-live` is
written only immediately before the run starts, so no JavaScript, an
exception before that point, or a browser that never fires the observer
all leave the whole conversation and all three addresses on screen.
Those addresses are the point of the section; they are never staked on a
gesture that may not come.

A chain of timeouts, not one keyframe, because it is separate things
happening in order at conversation pace. Every handle goes in one array
so the run can be cancelled in a single pass.

The gaps are **message beats, not UI beats**. Each bubble's own entrance
is 200ms; the 180 / 620 / 1680 / 1960ms marks between them are long on
purpose, because the thing being animated is a conversation and a
conversation has pauses. Read the pauses as content. The three actions
then arrive 70ms apart: enough to see them as three things rather than
one block, not enough to make anyone wait.

**The typing dots do double duty.** They appear before the reply, so it
looks composed rather than pasted, vanish as it lands, then return at the
end where they read as the OTHER side starting to type. That is an
invitation, not a promise that he is about to answer.

The dots are the one piece of CSS `animation` here rather than a
transition: predetermined, repeating, and off the main thread, so they
stay smooth while the rest of the page is still loading. Everything else
is a transition on named properties. Never `all`: a transition on `all`
would also animate the `background-color` the hover rule changes and the
two would fight over the same 200ms.

Entrances are `translateY(8px) scale(0.96)` plus opacity, never
`scale(0)`. Each bubble also comes from its own side, `-10px` for the
incoming and `+10px` for the outgoing, which is the one piece of spatial
information a thread carries: who said it.

**The observer watches the PANEL at 40%, not the section.** The section
is taller than a phone screen, so a threshold on it could never be met
and the run would never start. That is the trap the laptop scene hit.

**Reduced motion: fewer and gentler, not none.** The bubbles still arrive
in order, because the ORDER is the content and removing it leaves the
panel telling no story. What goes is the travel and the scale, so they
fade in where they already are, and the dots stop bouncing rather than
looping forever in the corner of the eye. The timing is identical, so
there is one sequence to reason about rather than two.

Phone: the bar stacks to one column with 56px minimum rows, the header's
two icon links are dropped, and the bubbles widen to 86%. Three across
would give each row about 110px on a 390px screen and break the address
over four lines.

Measured at 1440x900 and 390x844, both themes: the sequence runs in
order, the live clock writes, all three rows are real links, the typing
dots animate in normal motion and do not under reduced motion, and there
is no horizontal overflow. Contrast, light: incoming text 13.79:1,
outgoing 5.70:1, status 4.60:1, value 13.79:1, action label 6.56:1. Dark:
11.33, 7.10, 8.08, 11.33, 5.10.

One figure that is deliberately low: a bubble against its sheet is
1.16:1. That is a grouping, not a control boundary, and it is what every
messaging app does; the text inside it carries the contrast.

#### The cards
Email: mohamedelhayyany@gmail.com (`mailto:`) plus a Copy button that
reads "Copied" for 1.5s. The copy goes through `navigator.clipboard`
where there is a secure context and a hidden textarea plus
`execCommand` where there is not, which is the path that actually runs
when the page is opened by double-clicking index.html.
Phone: +212 694 561 949 (`tel:`) plus a WhatsApp link to
`https://wa.me/212694561949`.
LinkedIn: the value reads "Mohamed Elhayyany", not the URL. The whole
card is the click target, reached by stretching the "View profile"
anchor over it with a transparent `::after` rather than wrapping the
card in a link, so the label and the name stay plain text and the link
keeps a name of its own. Only this card does it: the other two each have
a control that a stretched link would cover. Opens in a new tab.

Layout: beside the scene from 1400px, three across from 1200 to 1399,
two across with the third spanning both from 900 to 1199, stacked below
900. 1400 and not 1200 for the side column: the sidebar is already gone
from the row by then, and at 1200 a 330px card column left the laptop
369px wide.

Location: Morocco. Open to roles worldwide, remote, hybrid or on-site,
and to relocation.
Site line: Based in Morocco. Working with the world.

---

## Working style
- Show a plan before writing significant code.
- Build one section at a time.
- Explain each block in plain language. The owner is not a developer.
- Never add placeholder copy, fake testimonials, or invented numbers.
- - Never add placeholder boxes or notes-to-self to the rendered page.
