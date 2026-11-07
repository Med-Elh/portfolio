# What the page is now

The live state of the site: its sections, its copy, its tokens and its
measurements. **CLAUDE.md holds the rules; this holds the facts.** Why
any of it is the way it is lives in `docs/HISTORY.md`.

---

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
  `assets/images` until STEP 33 with nothing referencing them. Do not
  add images back for them without a reason.

  **`#certbox` is no longer inert, and that is STEP 47.** For six steps
  it had no `[data-cert]` trigger anywhere in the markup and therefore
  could never open. The Systems section's "See the actual flow" link is
  one now, so the overlay is live, reachable and on screen: it shows
  `assets/flow-weblane.png`. Three things changed with it, and they were
  latent bugs rather than new features, which is what six steps of dead
  code buys you. It gained a caption, a focus trap and `role="dialog"`
  plus `aria-modal`, and its close button moved off `--muted`, which is
  3.00:1 on that near-black ground in light mode and was never seen
  because nothing could open the thing. The new token is `--overlay-ink`,
  FIXED in both themes for the same reason `--overlay` is.


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

`--faint` was corrected here and then **read by nothing for five
steps**: it was declared in both theme blocks while `var(--faint)`
appeared nowhere in the file, so the brief's failing value could not
have broken anything visible. It was fixed so that the next thing to use
it would not inherit the failure silently.

**STEP 47 is that next thing, and it vindicates the decision.**
`.wis__num`, the 01 / 02 / 03 down the left of the What I Solve rows, is
the first real reader of the token, and `.sy__fnote` is the second. The
shipped `#6C7278` is 4.54:1 on `--bg`; the brief's `#8A8F94` was 3.04:1
and would have failed a 14px number outright. Five steps of nothing
reading a token is exactly how a silently wrong value survives to the
day something needs it, which is the argument for fixing one when you
find it rather than when it finally matters.

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
   marker, a four-line intro (max ~560px), and then straight into the
   timeline.

   **The strengths row is DELETED, in STEP 47.** Four blocks sat between
   the intro and the timeline: Customer Success, Business Development,
   Marketing, Team Leadership, each an accent icon, the strength name and
   a proof line whose figure counted up on the marker. It was the same
   four areas in the same order as the four How I Can Help cards and the
   same four figures as the Results grid, so the reader met all of it
   three times. Gone with it: `.st`, `.st__item`, `.st__ico`, `.st__name`,
   `.st__proof`, the nth-child stagger, the 1200px and 620px column steps,
   the `html.rm` and `.no-js` fallbacks, and the `[data-st-count]`
   counter module in script.js. **No fact was lost**: the team of 12 and
   the 98% are in the '22 card, the 100+ accounts and 150+ sales in the
   '25 card, the 300+ posters in the '26 card.

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

5. **What I Solve (04)**, `#capabilities` - a two-column header over
   three hairline rows. **STEP 47 replaced "What I Bring"**, which was a
   huge two-line gradient heading over one sentence with an inline chip
   on each capability, pinned for an extra viewport height with its words
   coming into focus left to right on scroll. See the Content section
   below for what it says now and why the old one went.

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

Stat blocks. **The hero has FOUR and the sidebar has THREE since STEP
47**, which is the one place the two lists are allowed to differ. It was
four and four, then four and six in STEP 44. STEP 36 corrected the
revenue label, STEP 39 gave three of them a timeframe, and STEP 43
raised two of the figures.

The hero's four, in `data-fly-stat` order:
- `100+` Accounts, onboarding to renewal
- `150+` Sales closed in under 3 months
- `300+` Posters sold, first 3 months
- `25%` Company revenue growth in 2 months

The third is `300+`, NOT "98% Policy accuracy at scale", which is what
this file used to claim and the page never said.

The sidebar's three, in reading order down a SINGLE column:
- `$50k+` Ad spend managed to date          (no hero twin, `data-sb-late`)
- `2% to 5%` Lead conversion, after automation  (no hero twin, `data-sb-late`)
- `150+` Sales closed in under 3 months     (hero 1, `data-sb-stat="1"`)

**It was six, 2x3, and STEP 47 cut it to three.** The reason is the
Results grid, which carries the same figures one screen below: a reader
scrolling past the sidebar met every number twice. These three are the
ones that are not the grid's own headline, one per discipline:
marketing, then automation, then sales.

Dropped from here and still on the page: `100+ Accounts` and `25%
Company revenue` are hero stats, `300+ Posters` is a hero stat and the
'26 timeline card, and `Zero to a brand` was the odd phrase among the
figures and is what the '26 card says at length. **`.sb__num--text` and
the `--sb-num` custom property it needed are therefore read by nothing
now**, and are kept rather than swept: the trap they exist for is real
and documented under STEP 44, and the next phrase-shaped stat will want
them.

**The grid is one column, not two.** Three in a two-column grid leaves
the third alone on a row beside an empty cell, and a column of three in
a column-shaped panel reads as a list rather than as a broken grid. It
also hands each label the full panel width, so "Lead conversion, after
automation" sets on two lines instead of three.

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

#### Strengths row: DELETED in STEP 47
It replaced the counters, and then it repeated the page. Four blocks,
each an accent icon, a strength name and one line of proof with its
number on a tinted marker:

- **Customer Success** - [100+ client accounts] managed from onboarding to
  renewal
- **Business Development** - [150+ sales] closed in under 3 months, plus
  B2B clients like Experience Morocco
- **Marketing** - Meta ad campaigns and a brand that sold [300+ posters]
  in the first 3 months
- **Team Leadership** - Led a team of 12 at Majorel (ByteDance / TikTok
  account) with [98% accuracy]

**Those are the same four areas, in the same order, as the four How I
Can Help cards, and the same four figures as the Results grid.** Work
goes from its intro into the timeline now, which is the evidence the row
was summarising. Every figure above still appears in the timeline card
for the year it happened in, which is where it means something: a figure
with a date behind it reads as a fact and the same figure in a grid of
four reads as a claim.

The copy is kept here because it is the full phrasing of each proof
line, and the shortened sidebar labels are measured against it.

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

### What I Solve (04). STEP 47 replaced What I Bring
Pill "04 / WHAT I ACTUALLY SOLVE". Then a two column header and three
rows, and nothing else. No cards, no icons, no chips, no figures.

```
  .wis__head    heading left, qualifier right and BOTTOM aligned
  .wis__rows    three .wis__row, hairline above each, one below the last
                .wis__num   mono, --faint, 40px column   01 / 02 / 03
                .wis__prob  heavy, ~34px, max 14ch
                .wis__ans   --muted, 16px, max 420px
```

Heading, max 16ch: **The customer was never the problem.**

Qualifier, `--muted`, 17px, 380px: Three failures I see again and again.
Every one of them looks like a product problem and turns out to be a
communication problem.

1. **Traffic grows. Nobody buys.** I find where the journey breaks,
   between the ad, the landing page and the first reply, before anyone
   asks for more budget.
2. **The lead goes cold after the first reply.** I run the handoff
   between marketing and sales so every enquiry is actually followed up,
   not just logged somewhere.
3. **They churn and nobody saw it coming.** Churn is decided in the
   first two weeks, not at renewal. I make onboarding concrete and check
   in before there is a reason to complain.

#### Why the old section went, and it is a content argument
What stood here was one sentence pinned for an extra viewport height,
its words coming into focus left to right on scroll, with eight inline
chips and eight hover cards. About 400 lines of CSS and 230 of
JavaScript. Every part of it worked.

**It said the same thing How I Can Help says one section later, and it
said it about HIM.** Customer Success, Business Development, Marketing,
Retention, Sales, Team Leadership, Languages, Automation: the same areas
as the Help cards and the deleted strengths row, a third telling. STEP
36 had already rewritten the seven cards from results to method on
exactly that ground, and that bought one step.

**The deeper fault is that the cards were behind a hover.** They carried
methods and opinions, which are the most arguable things on the page,
and an argument behind a hover is an argument most readers never meet.
STEP 36 wrote that the cards "say HOW he works, which is the one thing a
capability list can add". True, and it does not answer why that belongs
in a tooltip.

**So the section is the reader's problem now and the next one is the
answer.** That is what lets the two sit next to each other: problem,
then answer. There is deliberately **not one digit** here apart from the
row numbers and the section marker. The figures belong to How I Can Help
and the Results grid, and a number in this section would make it compete
with them again.

**The id is still `capabilities`** and must stay unless four things
change together: the sidebar link, the hero nav link, the mobile menu
link and the section observer. The LABEL is "WHAT I ACTUALLY SOLVE" and
the three nav lists say "What I Solve"; that difference is intended, the
marker is a statement and a nav item is a name.

#### The entrance, and the trap in the shared riser
Three rows, fade and rise, **80ms apart**. It is the page's own
`[data-reveal]` riser and there is **no JavaScript for it at all**,
which is also why `html.rm` and the no-JS fallback needed nothing: both
are properties of the riser.

**The trap, and it will catch the next section too.** The riser has no
stagger of its own. The shared observer in script.js walks every
`[data-reveal]` in a section in document order and writes
`index * 100ms` as an **inline** `transition-delay`. An inline style
beats any class selector, so a plain `nth-child` delay in CSS is
silently ignored, which is what happened first: the rows measured
300 / 400 / 500ms.

The rows are children 3, 4 and 5 of the section, behind the marker, the
heading and the qualifier. So rows two and three override with
`!important`, which is the only thing that beats an inline style, and
**row one deliberately keeps the observer's own 300ms**:

```
  .js .wis__row:nth-child(2) { transition-delay: 380ms !important; }
  .js .wis__row:nth-child(3) { transition-delay: 460ms !important; }
```

Measured: 0.3s / 0.38s / 0.46s. The rows still follow the header in the
section's rhythm and only the gap BETWEEN them changes. **The 300ms
anchor is the count of revealables ahead of the rows**, so adding a
fourth element to the header block moves both numbers.

`!important` is used here the same way `html.rm .hx__portrait` uses it
on the drop-shadow: to win against something written at a higher
precedence by code that is right for every other section.

#### What the deletion took with it
From index.html: `.wib`, `.wib__sticky`, `.wib__line`, `.wib__w`,
`.wib__slot`, eight `.wib__chip` buttons with their `.wib__sr` labels
and carets, and eight `.wib__card`.

From style.css: the whole STEP 5 block, plus `html.rm .wib__w` out of
the no-blur list and the `.wib__chip` 44px tap-target pad out of the
touch block.

From script.js: the scroll-position reveal, the card placement maths,
open and close, focus and Escape, and the resize and font-load
re-measures.

**One finding from it is worth keeping, because the next pinned section
will hit it.** The run is `box.height - innerHeight`, so a pin's reveal
distance is whatever is LEFT OVER after the sticky screen, not the
block's height. At 110vh that was about 90px of scroll for 31 words and
the reveal arrived already finished, reading as no animation at all. The
dial is the block height; 150vh is what made it readable.
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

