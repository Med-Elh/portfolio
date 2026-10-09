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

## The role title, at two lengths
Spelling is exact in both. "Technical Customer Success Manager", never
"manager" or "CSM"; "Business Developer", never "Business Development" in
the full version.

**Full: `Technical Customer Success Manager & Business Developer`**
Used wherever there is room: the sidebar blurb, the hero portrait's
`alt`, the hero tagline above 900px, and the footer.

**STEP 36: the `<head>` is the one exception, and it spells out "and".**
The `<title>`, `og:title`, `og:image:alt` and `twitter:title` now read
`Technical Customer Success Manager and Business Developer`, with the
word, not the ampersand. This was asked for explicitly. It is a
deliberate divergence from the rule above rather than a drift, and it is
confined to those four tags: the on-page uses all keep `&amp;`.

If the two are ever reunified, the `<head>` is the half to change, not
the page, because a search result and a share card are read as prose
while the sidebar blurb and the footer are read as a label.

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
- `assets/images/portrait-cutout.png` 1200x1500, 280KB. The hero. **Read
  the dimension rule under the portrait's edges before replacing it.**
- `assets/images/portrait.jpg` 928x1152, 593KB. **Social cards only**, the
  `og:image` and `twitter:image`. Nothing a visitor loads points at it, and
  it must stay this size: a share card built from a thumbnail is a
  thumbnail. Do not "optimise" it.
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
   (`100+` accounts, `100+` sales, `15%`, `98%`, `250+`), and they
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
- **The `15%` had no subject in the hero and sidebar stats**, which read
  as his personal revenue. It is **company revenue overall, driven mainly
  by new sales from outreach**. The stat label is now
  `Company revenue growth in 2 months`, the '25 card says
  `+15% company revenue`, and the '25 panel names the driver.
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
campaigns. That is the evidence for the word "Technical" in the title and
for the "Automation-minded" trait chip in the hero.

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
   - Eyebrow label: `Technical Customer Success`
   - Name, huge, with an accent full stop
   - Buttons, STEP 40, and the hierarchy is the point: `Book a meeting`
     FILLED and first, `Get in touch` outlined, `View work` a plain link
     with an arrow, `Resume` phone only. Three buttons of equal weight
     meant no primary at all.
   - A row of four stat blocks beneath: value large, label small
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

`[square brackets]` mark the yellow marker, and it is on **"are
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

Stat blocks (hero and sidebar, the same four). STEP 36 corrected the
fourth label and **STEP 39 gave the other three a timeframe**:
- `100+` Accounts, onboarding to renewal
- `100+` Sales closed in under 3 months
- `250+` Posters sold, first 3 months
- `15%` Company revenue growth in 2 months

The third is `250+`, NOT "98% Policy accuracy at scale", which is what
this file used to claim and the page never said.

**The hero's four labels and the sidebar's four must stay
character-for-character identical.** The morph flies the SIDEBAR stat from
the hero's position while the hero's own copy fades out, aligned on the
number chip, so different label text reads as the words changing in
mid-flight. There is no crossfade for them, and since STEP 40 there is no
crossfade anywhere in the morph: `.sb__resume`'s two stacked labels are
deleted, because the button that travels now says the same thing at both
ends. See the STEP 40 section above.

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
on a yellow marker.
- **Customer Success** - [100+ client accounts] managed from onboarding to
  renewal
- **Business Development** - [100+ sales] closed in under 3 months, plus
  B2B clients like Experience Morocco
- **Marketing** - Meta ad campaigns and a brand that sold [250+ posters]
  in the first 3 months
- **Team Leadership** - Led a team of 12 at Majorel (ByteDance / TikTok
  account) with [98% accuracy]

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
operation from. [100+ client accounts] and 100+ sales in under 3 months,
and [+15% company revenue].

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
   onboarding to renewal, 100+ sales in under 3 months, Meta ad campaigns,
   UGC video, and the 15% company revenue growth driven mainly by new
   sales from outreach.
  tags: Customer Success · Business Development · Marketing
  what I brought: Integrations built, not just configured · Client retention from day one · New revenue through sales

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

**And there is no yellow marker in any of the seven cards now, which is a
change and a deliberate one.** Yellow's documented job on this page is a
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

`[square brackets]` mark the yellow marker in each result line.

1. **Customer Success** - [100+ client accounts], onboarding to renewal
   I take clients from onboarding to renewal, so they get value fast and
   stay.
   Then, in `.hlp__text--auto`: I built the WhatsApp order confirmation
   and delivery tracking flows, the transactional email sequences, and
   the Meta Conversions API integrations that fixed attribution for our
   customers' campaigns.
   What you get: Smooth onboarding / Proactive check-ins / Fewer churned
   accounts
2. **Business Development** - [100+ sales] closed in under 3 months
   I find the right partners and accounts, then turn conversations into
   signed deals.
   What you get: Qualified leads / Full-cycle outreach / New B2B
   partnerships
3. **Marketing** - the result is THREE stacked lines, not one:
   [3] months. / [8,000] followers. / [250+] posters sold.
   Same font size as the other two cards' result lines, leading tightened
   to 1.1 with 0.2em between the lines, so they read as one punch. The
   yellow carries the NUMBER only in each line: a marker under every word
   is a yellow block, not an emphasis. The three lines fade up 10px one
   after another, 70ms apart, starting 300ms after `.hlp.is-in` lands, so
   they arrive inside the card's own 600ms entrance rather than after it.
   `html.rm` and `.no-js` both leave all three simply there.
   I built the account from zero, ran the ad campaigns and the influencer
   collabs, and turned the audience into paying customers.
   What you get: Targeted ad campaigns / Influencer collaborations /
   Content that converts

Under the panel, centred, one filled accent button: `Let's talk`, linking
to `#contact`. It is the only place that phrase appears in the section.
Growth now carries the same pair (see `.gr__cta`), so `Let's talk`
appears twice on the page, once per section, which is intended: they are
one offer made in two places, not two offers.

#### STEP 36: the automation claim, evidenced, and why it is NOT a fourth card
Automation was claimed in the hero copy ("build the automations that let
both scale") and in a hero trait chip ("Automation-minded"), plus the CTA
marquee and the old meta description, and **evidenced nowhere on the
page**. Two of those four claims are gone now (the marquee is deleted and
the meta description is rewritten); the hero's two stay, and this is what
backs them up.

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
- The result, three stat chips: `8K` followers, `250+` posters sold,
  `3` months

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
- The challenge, STEP 39 rewrote it so it names the product: `eGrow runs
  a business's whole operation from one place, on the WhatsApp API.
  Explaining that in a video people actually watch is the hard part.`

  It used to read "A SaaS product that needed content people actually
  watch", which told a reader nothing about why the content was hard to
  make. **The product IS the challenge here**, so the block has to say
  what the product is. See the eGrow section near the top of this file.
- What I did, four step pills: `Script` / `Film` / `Edit` /
  `Post on IG + YouTube`
- The result, one line with the outcome on the yellow marker: `Steady
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

This also means **the page is back to beige, charcoal and yellow
throughout.** The chat was the one part that was not, because it was
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

## Working style
- Show a plan before writing significant code.
- Build one section at a time.
- Explain each block in plain language. The owner is not a developer.
- Never add placeholder copy, fake testimonials, or invented numbers.
- - Never add placeholder boxes or notes-to-self to the rendered page.
