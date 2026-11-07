# Why it is the way it is

One section per STEP, oldest first. **Nothing here is a rule.** Every
rule these steps produced has been lifted into CLAUDE.md; this is the
reasoning, the measurements, and the things that were tried and
rejected.

Read a section before undoing the decision it describes.

---

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


## The three site files became ASCII-only (STEP 46)

The rule this produced is in CLAUDE.md under File encoding. This is
the bug that prompted it and the reasoning kept with it.

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


---

## The page stopped repeating itself, and it went into git (STEP 47)
Four sections said the same four things. What I Bring listed Customer
Success, Business Development, Marketing and the rest as capabilities;
How I Can Help listed the same areas as services; the Work strengths row
listed them a third time with the figures; and the sidebar carried the
six numbers the Results grid already shows. **Nothing was added in this
step. Three of those four were deleted or rewritten and the fourth was
left exactly alone.**

**Measured at 1440x900: 16,878px to 15,370px, 18.75 screens to 17.08.**

```
  Work           3779 -> 3516   the strengths row
  Systems        2656 -> 2192   two blocks and the long paragraph
  #capabilities  1849 -> 1068   the 150vh pin
                      -1508px
```

The height is the smaller half of the result. The larger half is that
the page now makes one argument per section instead of the same
argument four times.

### What changed, in one list
- **What I Bring became What I Solve.** Its own entry is in the Content
  section above, including the inline-delay trap in the shared riser.
- **The Work strengths row is deleted.** Entry under Work (01).
- **Systems lost two blocks and gained one line.** Below.
- **The sidebar went six stats to three, in one column.** Entry under
  the stat blocks above.
- **How I Can Help is untouched.** Below.
- Earlier in the same session: the Systems flow diagram and the live
  `#certbox`, and the About photos on mobile. Both below.

### How I Can Help was deliberately not touched
Its four cards, their results, their bodies and their "what you get"
lists are exactly as they were, and **it keeps its single `Let's talk`
button**. What I Solve has no call to action, so there is no pair of
identical CTAs to resolve, and the button belongs under the answer
rather than under the problem.

**This is now the page's largest remaining duplication and it is a
known one.** The four Help result lines are `3 months. 8,000 followers.
300+ posters sold.`, `150+ sales closed in under 3 months`, `100+
client accounts, onboarding to renewal` and `2% to 5% lead conversion`.
Every one of those figures also appears in the hero, the Results grid,
Systems or the sidebar. Measured across the rendered page:

```
  150+        5 zones   sidebar, hero, Work timeline, Results, Help
  300+        4         hero, Work, Results, Help
  100+        3         hero, Work, Help
  25%         3         hero, Work, Results
  2% to 5%    3         sidebar, Systems, Help
  $50k+       2         sidebar, Results
  8,000       2         Results, Help
```

Work's share of that is correct and should stay: a figure inside the
timeline card for the year it happened in is evidence, not repetition.
**The live question is whether the Help cards need figures at all.**
Taking them out and leaving the cards as capability statements would
clear three of the seven rows above at once. Not done, because it was
explicitly out of scope.

One cosmetic mismatch left on purpose: `.hlp__intro` reads "Four areas,
one goal" and What I Solve says "Three failures". Both are accurate and
the two sections sit together, so the counts read as a mismatch at a
glance.

### Systems, trimmed
The featured card was title, three labelled blocks, the diagram, the
result strip, the pills and the link. "The problem" and "The detail
that matters" are gone outright and the long "What it does" paragraph
is one line:

> Leads came in from the form and were chased by hand. Most went cold
> before the meeting. Now none of it is manual.

**The diagram is why.** That paragraph was a prose walk through the
same eighteen steps the reader was about to see drawn, so it was the
diagram's caption written before the diagram existed. What is left is
the before and the after, which is the one thing a flow chart cannot
show. `.sy__lead` is a step above the old `.sy__blocktx` in size and
into `--body`, because it is the only prose in the card now: at
`--muted` and 16px it read as a caption under the title rather than as
the claim the diagram goes on to prove.

The three supporting cards were already one sentence of body each and
needed no change.

---


## The flow diagram, and the lightbox dead for six steps (STEP 47a)
The Wel'blane featured card carries the automation as **HTML and CSS
boxes, not a picture and not one big SVG**. The text stays sharp at any
zoom, it can be selected and searched, it costs nothing to decode, and
it reflows into one column on a phone instead of being scrolled
sideways.

Seven steps: three in a chain, then a branch at step 3 into a four-step
"Correct" path and a one-step "Needs fixing" path.

**The connectors are CSS and hang off the step BELOW each join**, on
its `::before` (a 2px `--border` rail) and `::after` (an
`--accent-text` chevron). Hanging them off the lower box means the last
step needs no exception and the number of steps can change without a
connector having to be added with it.

**The split is a bracket, not two angled lines, and that is a real
decision.** Each branch draws its own half of the horizontal bar
outward from its own centre to the middle of the gap, where the two
meet. The obvious way, one bar spanning 25% to 75% of the split, is
wrong by a quarter of the gap at each end, because a 1fr column's
centre is not at 25% of the row once there is a gap between the
columns. Angled lines were asked for and need a length tied to the
column width, which drifts; the bracket is exact at any width.

**`--faint` failed its one job here and the check caught it.** The
"Needs fixing" path was specified in `--faint`, which is 4.333:1 on
`--surface-strong` in light mode, under the 4.5:1 floor, although it
clears it in dark at 4.752:1. That path is `--muted` instead, 5.59:1
and 6.33:1. `--faint` carries the note line below the diagram, where it
sits on `--surface` and measures 4.87:1 and 5.51:1.

### The lightbox was already there and had never opened
`#certbox` has been in the markup since STEP 33 with a full handler in
script.js: open, close button, Escape, backdrop click, focus return.
**It had no `[data-cert]` trigger anywhere, so it could never open.**
The "See the actual flow" link is one, and the overlay is live.

Six steps of dead code meant six steps of unnoticed faults, all fixed
with it:

- **A caption**, `data-cert-cap` on the trigger, and `data-cert-alt`
  for a text link that has no thumbnail to borrow an alt from.
- **A focus trap.** It returned focus on close and never trapped it, so
  Tab walked out of the overlay into the page behind.
- **`role="dialog"` and `aria-modal`.**
- **The close button was `--muted`**, which is 3.00:1 on the overlay in
  light mode and 9.07:1 in dark. `--overlay-ink` (#C9CCD0) is FIXED in
  both themes for the same reason `--overlay` and `--overlay-btn` are:
  the surface under it is dark whichever theme the page is in. 10.67:1.
- **The image sizing was a percentage against an indefinite height.**
  `max-height: 100%` on the image resolved against a frame whose height
  came from its content, so it was ignored and the picture rendered
  full size while the frame scrolled. It is `calc(92vh - 56px)` now: a
  viewport unit is definite whatever its ancestors are doing.

**The image is lazy by construction.** The handler sets `src` on open,
so `assets/flow-weblane.png` is never fetched until someone asks for
it, which is stricter than `loading="lazy"`.

On a phone the image is given `width: 680px` and the frame is left to
scroll, because a wide diagram fitted to 92vw is 359px of unreadable
type. The browser's own pinch zoom works on top of that.

---


## The About photos on mobile (STEP 47b)
They were full width and stacked below 480px. They are the desktop
block scaled down now, overlapping at **every** width.

**Only the ceiling moves.** `--ab-main` is
`clamp(150px, 46vw, 200px)` below 900px and every size inside the block
is a percentage of `--ab-w`, so the small card stays at 54% of the main
one and the overhang stays at a third of the small card to the right
and the same distance below, with nothing to keep in step by hand.

Measured, and it is the same three ratios at all three widths:

```
         main    small   % of main   overhang R / B   gutters L / R
  360   165.6     89.4     54.0       29.5 / 29.5      55.0 / 55.0
  390   179.4     96.9     54.0       31.9 / 31.9      61.8 / 61.8
  430   197.8    106.8     54.0       35.2 / 35.2      71.0 / 71.0
```

Radius 18px to 12px, ring 4px to 3px, shadow `0 18px 40px` to
`0 8px 20px`, caption 12px to 11px, and 32px between the block and the
text.

**The deleted unstack was defended at the time and was the wrong
answer.** Its note argued that a rotated full-width card could push
past the right edge of a 360 screen. That cannot arise: `--tilt` is
`0deg`, and the block's own width already includes the overhang, so the
small card is inside the box at every size. Document `scrollWidth`
never exceeds the viewport at 360, 390 or 430.

**One thing the scale-down broke, and the fix is the same two
percentages.** At 179px the small card sat on top of the end of "Most
of the work looks like this." On desktop this never arises: the line is
about 170px at 12px and the small card's edge is past 200px into a
380px card. The main caption is `max-width: 63.8%` below 900px, which
is `(100 - 45.85) / 84.9`: the small card's left edge over the main
card's width. It tracks the overlap at every width like everything else
here.

**Neither photo is interactive anywhere on the site**, and that was
asked for explicitly: no wrapper, no lightbox, no zoom, no hover lift,
no cursor change, `pointer-events: none` on the images,
`draggable="false"` in the markup. `.ab__card` joined the STEP 23
`user-select` list **and the `::selection` list with it**, which is the
established pair in this file: without the second, a selection dragged
down from the heading paints a bar across both captions on the way
past. Worth knowing that this makes the two captions unselectable,
which the STEP 23 note did not anticipate. A one-line label on a
decorative photograph was judged to be on the same footing as the
section labels already in that list.

---


## The project is in git now (STEP 47c)
It was not a repository for forty-six steps. `git init -b main`, two
commits, no remote at first.

**`.gitignore` is three lines**: `.DS_Store`, `Thumbs.db`,
`desktop.ini`. Nothing else is ignored, and that reverses a proposal to
ignore the archives. They are 72MB of the 76MB tree, but
`_baseline-step33` holds the only high-resolution copy of the hero
portrait and `_baseline-step18` the only uncropped collages, so
ignoring them would leave the irreplaceable files out of version
control. 76MB is unremarkable for git and these files never change
again.

**`.gitattributes` exists for CNAME and nothing else matters as much.**
`core.autocrlf` is `true` on this machine, which checks text files out
with CRLF. **A CNAME checked out with CRLF is 22 bytes and GitHub Pages
rejects it**, which unsets the custom domain and drops the site to the
github.io address. `CNAME text eol=lf` pins it. Images, fonts and PDFs
are marked `binary` so nothing inserts a carriage return into them.

The three site files were CRLF and are **LF** now: the STEP 47 edits
ran through tools that emit LF and script.js came out mixed, so all
three were normalised rather than left half and half. They are
deliberately not pinned: autocrlf stores LF and checks CRLF back out,
which is lossless, and line endings change nothing about how the page
renders or how it opens from a double click.

### The GitHub repo has an unrelated history, and that is the open item
`origin` is `github.com/Med-Elh/portfolio`. Fetched read-only; nothing
pushed, merged or rebased.

```
  origin/main   50 commits, 2026-08-08 to 2026-11-05, 434 files
  local main     2 commits, 2026-11-07,                518 files
  merge-base    NONE
```

**All 50 commits on origin were made through github.com's web
interface.** Every committer is `GitHub <noreply@github.com>`. That is
why there is no shared history: the local tree was never a repository,
so the two were always going to be unrelated.

**origin is an older version of the same site.** It has no Systems
section and no About section, and it still has the `.wib` pinned
sentence and the strengths row. Nothing on origin is content the local
tree lacks.

**Exactly one file exists on origin and not locally**, and it is junk:
a root-level `portrait-avatar.jpg`, byte identical to
`assets/images/portrait-avatar.jpg` (both `b7268c3`), referenced by
nothing. origin's own index.html points at the `assets/images/` copy.
It is a stray upload to the wrong folder.

Checked and absent from origin: any `google*.html` verification file,
`robots.txt`, `sitemap`, `.well-known`. **origin's CNAME is byte
identical to the local one**, 21 bytes ending in the domain and one
newline.

**Reconciling the two is not done and should not be guessed at.** The
local tree is ahead on content and the remote holds the published
history. Whatever route is taken, the three rules at the top of the
CNAME section still apply, and the root `portrait-avatar.jpg` is the
one thing on origin that can be dropped on sight.

