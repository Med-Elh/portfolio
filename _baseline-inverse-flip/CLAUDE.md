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

## Assets
- `assets/images/portrait.jpg`
- `assets/docs/cv.pdf`
- Never invent filenames. Ask if an image is needed that does not exist.

## CRITICAL RULE
Never invent content. No fabricated metrics, client names, project names,
testimonials, or outcomes. Anything marked `[TO CONFIRM]` must be left as a
visible placeholder for the site owner to fill in. Do not guess a value and do
not quietly drop the section.

---

## Design direction

Structure and motion modelled on saad.moatassime.com. Colours stay as below.

### Colour (light warm-beige base, violet accent)
```
--bg:          #d6d0c1   /* warm beige page background */
--surface:     #e3dfd3   /* sidebar blocks, cards, stat boxes, pills */
--border:      rgba(0, 0, 0, 0.08)
--text:        #111111   /* near-black: headings, nav, emphasis */
--body:        #4a463d   /* secondary text, body copy */
--muted:       #7a7568   /* faint labels and captions */
--accent:      #7c3aed   /* primary accent */
--accent-soft: #6d28d9   /* the HOVER state, darker not lighter */
--accent-2:    #e8d900   /* see the note below */
--bg-blur:     rgba(214, 208, 193, 0.82)  /* --bg with alpha: nav card, menu */
--wordmark:    #c9c2b0   /* the oversized name behind the hero: a shade
                            darker than --bg, a stamp not a headline */
```
This is a LIGHT theme. Anything that used white text on the old dark
background now uses `--text`. The only hard-coded `#FFFFFF` left is white
sitting on violet: the filled button, the sidebar CTA, the skip link.

Violet is the primary accent throughout: buttons (violet fill, white text,
`--accent-soft` on hover), the active nav item, progress bars, carousel
arrows, link hovers, focus rings, the availability dot, the timeline
thread and its markers, and every number that used to be amber.

`--accent-2` is kept at the requested yellow but is **never a foreground**:
against `--bg` it measures **1.05:1**, because a bright yellow and a light
beige sit at nearly the same luminance. It is only ever a surface with
dark text on top of it. That means the marker behind a key fact in the
Work cards, the highlighted word in a lead sentence, the section number
chip, or an image wash, as in the ME-band collage fallback. If a true second
accent is ever wanted as a foreground, it has to be a bronze or olive dark
enough to pass. `#6b5410` reaches 4.68:1.

Never put violet and yellow on the same small element. Text on the yellow
marker is `--text`, not violet.

One bloom permitted per screen, heavily blurred and low opacity. `--glow`
is a gradient, not a flat colour. Three elements use it as a
`background-image`, and it is a warm grey-brown, reading as a soft shadow
cloud behind the content rather than a light source. `--glow-warm` is the
one exception, behind the Contact heading only. Background particles are
violet and dark grey at low opacity (`PARTICLE_RGB` in script.js).

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
`04 / UGC Content`, `05 / What People Say`, `06 / Contact`.
Number in `--accent`, title in `--muted`.

### Motion
- Scroll reveals: children rise 24px and fade, 100ms stagger, 600ms,
  `cubic-bezier(0.16, 1, 0.3, 1)`, once only.
- Two infinite horizontal marquees (see sections below), CSS-transform driven,
  paused on hover, paused when off screen.
- Stat counters animate from 0 to their value when scrolled into view, once.
- Reactive particle canvas behind all content, violet, low opacity, cursor-
  reactive on desktop and scroll-reactive on touch. 30fps cap, tab-hidden pause,
  reduced count under 768px.
- Custom cursor with sparkle trail on desktop only, via `(hover: hover)`.
- All hover behaviour gated behind `(hover: hover)` so touch devices never get
  stuck hover states.

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
   - Availability line: `Open to new roles · Marrakech, Morocco`

2b. **Pitch band**. The pitch, moved out from under the name and given a
   screen of its own between the Hero and Work. Section-heading scale,
   left-aligned, weight 400 with the one emphasised clause at 700 in
   `--accent`. Beneath it a small row: circular portrait avatar, an
   "Open to new roles" pill, and a `Get in touch` button to `#contact`.
   Fades in on scroll. It is also what the hero-to-sidebar migration
   measures its run against. script.js anchors on the first
   `[data-reveal]` below the hero zone, which is this.

3. **Marquee**. Infinite horizontal strip of capability keywords, repeating.

4. **Work (01)** - the whole of it. The old Selected Work section is gone;
   this one absorbed it, and the old Background section before that.

   A lead sentence at heading size with the accent word on the yellow
   marker, a four-line intro (max ~560px), then a **strengths row**: four
   blocks - Customer Success, Business Development, Marketing, Team
   Leadership - each a small violet icon, the strength name, and one line
   of proof carrying its number on a yellow marker. Four across, 2x2 under
   1200px, one column under 620px. The blocks come up one after another
   when the row arrives and the numbers count up; deliberately once only,
   unlike the cards below.

   Then the timeline: five cards alternating right/left down the page,
   centres ~60vh apart, horizontal offsets varied so it wanders rather
   than zigzags. Each card carries 1-3 strength tags under its summary,
   saying which strength that role built.

   A single SVG cubic curve runs through them, drawn with
   stroke-dasharray/stroke-dashoffset against scroll position so it
   unwinds in reverse on the way back up, and continuing past the last
   card as a dashed run-on. **The path is never written by hand**:
   script.js reads where the cards actually landed, runs a Catmull-Rom
   spline through their anchor points and emits the cubics, re-measuring
   on debounced resize, on font load, and on every frame while a card is
   opening. The ring dots are placed at the very points the path was
   built from, so they are on the line by construction.

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
   kept**, and both UGC Content and What People Say now reuse them. The
   contract: [data-rail] wrapper, [data-rail-row] track, optional
   [data-rail-prev/next] arrows and [data-rail-fill] progress bar, plus
   two opt-ins, data-rail-nowheel (leave the wheel to the page) and
   data-rail-momentum (throw, then settle on the nearest card).

6. **How I Can Help (03)** - a two-line heading, one dark line and one
   in --body, then a single panel holding three cards: Customer
   Success, Business Development, Marketing. Each is a violet badge and
   title, a result line with its number on the yellow marker, a short
   description, a "What you get" list of three, and a Let's talk link
   to Contact.

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

8. **UGC Content (04)** - the page's one dark band, full width and
   passing under the sidebar. The inner content keeps the ordinary
   section gutter and the ordinary `.wrap`, so the pill, heading,
   paragraph and the start of the video row land on exactly the same left
   edge as every section above. Padding does not shrink a background box,
   so the dark fill still runs the full width. Six vertical 9:16 Shorts in a draggable row with a
   progress bar, a number pill and a topic pill on each, and the existing
   lightbox (arrows, dots, swipe) now covering all six. The old floating
   cards, their idle bob, the scroll parallax and the mobile deck are
   gone with the layout they belonged to.

8b. **Name divider**. The full name on two lines, MOHAMED / ELHAYYANY,
   filled yellow, sitting **immediately before Contact**. Decorative and
   aria-hidden: the name is already the page title, the hero wordmark and
   the sidebar logo, and a fourth reading helps nobody.

   Drawn as one SVG. **The clipPath and the visible letters are the same
   `<text>` nodes**, so the yellow and the window the photographs appear
   through cannot drift apart the way a CSS clip built from a duplicate
   copy of the text would once a web font loads.

   On a fine pointer, moving across the name spawns a photograph from
   `assets/collages/` every ~70px of pointer travel, clipped to the
   letters, fading in and out over 1.2s with at most 14 alive. Distance,
   not pointer events: a pointermove can fire sixty times over ten pixels.
   No trail on touch or under reduced motion; the yellow name stays.

8c. **What People Say (05)**. Heading over a drag-only row of three
   quote cards, with a dash indicator top right, one dash per card, the
   active one wider and violet. Clicking a dash scrolls to that card.

   **Drag only, on purpose.** The row opts out of the shared carousel's
   wheel handling with `data-rail-nowheel`, so a vertical wheel over the
   cards scrolls the page as normal, and opts in to `data-rail-momentum`
   for the throw and the settle on the nearest card. Both attributes are
   generic: any other rail can use them.

   On a fine pointer, hovering the row hides the site's own cursor and
   shows a 90px violet puck reading DRAG with an arrow either side. It
   follows by lerp, scales in and out, and shrinks while held. It does
   not exist at all on a touch screen.
9. **Contact (06)**. Large closing statement with an italic accent word, email as
    a `mailto:` link, phone as `tel:`, city. No form.

10. **Footer**. Name, role, location, current year.

---

## Content

### Hero
Eyebrow: Technical Customer Success
Headline (two lines):
Customers Stay.
Revenue Grows.
Availability: Open to new roles · Marrakech, Morocco

Wordmark (the oversized name behind the portrait), two lines:
MOHAMED
ELHAYYANY
Yellow `#f5e500`, Inter 800, uppercase, line-height 0.85. ELHAYYANY is the
wider word and sets the size. The font-size is in `vw` and the box is a
percentage, so it spans ~92% of the hero at every width. The portrait sits
in front, its head crossing the second line.

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
Status pill: Open to new roles
Button: Get in touch → `#contact`

Stat blocks:
- `100+` Customers managed
- `50+` Sales closed
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
Four blocks: violet icon, strength name, one line of proof with its number
on a yellow marker.
- **Customer Success** - [100+ accounts] managed from onboarding to renewal
- **Business Development** - [50+ sales] closed and B2B clients like
  Experience Morocco
- **Marketing** - Meta ad campaigns and a brand that sold [250+ posters]
- **Team Leadership** - Team Lead at Majorel with [98% accuracy]

#### Colour inside this section
Violet carries it: the year numbers, the timeline dots and the tool
badges. Yellow has one job only: a `<mark class="jr__hl">` behind a key
fact, always with dark text (`--text`) on it, **max two per card**. There
are no certificate images anywhere in this section.

The year is `--accent` (#7c3aed) on the light card and steps up to
**#a78bfa** inside an opened card, because full-strength violet on
near-black is 1.2:1. Same size and weight either way.

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
Short: [100+ accounts], 50+ sales and [+15% revenue] in 2 months at SafeApps.
More: I own the full client lifecycle for SaaS accounts, from onboarding
to renewal, and I close new business: 50+ sales so far. I run Meta ad
campaigns (targeting, creative, conversion optimisation) and set up the
tracking and messaging flows that keep clients engaged. I also script,
film and edit UGC videos for the brand.
  tags: Customer Success · Business Development · Marketing
  what I brought: Client retention from day one · New revenue through sales · Ad campaigns that convert

**'26 / Founded Postry** [current] · badges P / shopping bag · Postry ·
2026 - Present
Short: [250+ posters] sold in 3 months, B2B clients, zero outside funding.
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

Card: panel colour, radius 20px, 340px, big violet icon, bold title, short
text with a yellow marker on the key fact. It is centred on its own chip,
nudged back on screen if that would hang it off an edge, and flipped above
the chip when there is no room below. On a phone it goes full width at the
bottom of the screen instead.

- SUCCESS / Customer Success - I own the client lifecycle from onboarding
  to renewal for [100+ SaaS accounts].
- GROWTH / Business Development - I source partnerships and new accounts,
  from B2B clients like [Experience Morocco] to creator collaborations.
- MARKETING / Marketing - I run [Meta ad campaigns]: audience targeting,
  creative and conversion optimisation. I also create UGC videos that
  explain the product and drive sign-ups.
- RETENTION / Retention - Clear onboarding, fast answers and regular
  check-ins, so [clients stay] and grow.
- SALES / Sales - Full-cycle outreach that turned prospects into [50+
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

Below 900px and under reduced motion: no pin, no dimming, smaller heading
and sentence, everything simply readable.

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
2. **Business Development** - [50+ sales] closed
   I find the right partners and accounts, then turn conversations into
   signed deals.
   What you get: Qualified leads / Full-cycle outreach / New B2B
   partnerships
3. **Marketing** - [250+ posters] sold with zero funding
   I run Meta ad campaigns and build brands that turn attention into
   sales.
   What you get: Targeted ad campaigns / Clear messaging / Conversion
   tracking

Every card ends with `Let's talk` linking to `#contact`.

The highlight colour is `#d9d4c5`, a step darker than `--panel`. The
three card titles do not all wrap to the same number of lines, so each
title reserves two lines and centres its text in them - that is what
keeps the badges, the result lines and the links level across the row.
The min-height for it has to sit on the title, not on the badge row: an
em on the row resolves against its inherited 16px, not the title's size.
### Marquee CTA
Bring Customers · Keep Them · Grow Revenue · Automate The Rest ·

### UGC Content (04)
**This is the page's one dark band** - #111111, ink #eae8e3, muted
#b8b4aa, sharp edges and no gradient into the beige. It runs full width
and passes UNDER the fixed sidebar, which is what the sidebar's own dark
switch below is for.

Pill "04 / UGC CONTENT". Heading, two lines, left aligned: "Content That"
in #eae8e3 over "Sells" in #8a8578. To its right (stacked under it on
mobile): "UGC videos I created for SafeApps (eGrow): scripting, filming
and editing short-form content that explains the product and drives
sign-ups."

Under the paragraph, three light pills: Scripting, Filming, Editing.

Six YouTube Shorts in a horizontal 9:16 row, 520px tall on desktop and
70vw on mobile, radius 20px, gap 20px, running off the right edge. Embed
URLs - do not use the /shorts/ form and do not keep any "?si=" tracking:
- 01 https://www.youtube.com/embed/ZDRf9FOJpMA
- 02 https://www.youtube.com/embed/pGP2rb5e0_U
- 03 https://www.youtube.com/embed/bJdhYTdqVE4
- 04 https://www.youtube.com/embed/Mcrh3GoqDTk
- 05 https://www.youtube.com/embed/Ww1czn0Qe0s
- 06 https://www.youtube.com/embed/nIiiE35wzrE
Thumbnails: https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg
Fall back to hqdefault.jpg where maxresdefault is unavailable.

Each card carries a number pill (01 to 06) top left and the label
"UGC · eGrow" top right. **These are UGC videos made for SafeApps
(eGrow), the company he works for**, not personal vlogs: scripting,
filming and editing short-form content that explains the product and
drives sign-ups.

The row is the shared [data-rail] carousel (drag, wheel, touch) with a
progress bar - violet fill on a #333 track. The lightbox, its arrows,
dots and swipe are unchanged and cover all six automatically: the module
finds its cards by [data-video-id], so there is no count written down.

Opened from `file://` a card opens the real Short in a new tab instead:
YouTube's embed refuses to configure without an origin. That is
deliberate and pre-dates this section.




Nav labels for this section: the sidebar and the mobile menu say **UGC
Content**; the hero's own nav row says just **UGC**, because that row is a
tight horizontal strip. The hero-to-sidebar morph pairs them by index, so
the two lists must stay the same length and the same order.
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

Dark panel style (`.sb__panel.is-dark`): background #1f1f1f, border
rgba(255,255,255,0.08), text #eae8e3, muted #b8b4aa. Nav items #eae8e3,
the active one still violet with white text. Ticker chips and the email
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
violet badge with a quote mark top right, and a footer of a dark round
avatar carrying the initial of the role, the role in bold and a small
muted line under it. The row starts on the wrap's content edge and runs
off the right; the trailing gutter is what lets the last card come fully
into view rather than stopping flush against the screen edge.

Below 900px the cards are 85vw and there is no drag puck.
### Name divider
MOHAMED / ELHAYYANY, yellow `#f5e500`, both lines one size, the longer
one spanning 92% of the SVG's 1000-unit viewBox.

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
### Contact
Heading: Let's keep your customers *around*.
Line: Open to Technical Customer Success and Sales roles, in Morocco or remote.
Email: mohamedelhayyany@gmail.com
Phone: +212 694 561 949
Location: Marrakech, Morocco

---

## Working style
- Show a plan before writing significant code.
- Build one section at a time.
- Explain each block in plain language. The owner is not a developer.
- Never add placeholder copy, fake testimonials, or invented numbers.
- - Never add placeholder boxes or notes-to-self to the rendered page.
