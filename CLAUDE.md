# Portfolio Website — Project Brief (v2, full rebuild)

## What this is
A personal portfolio for Mohamed Elhayyany, targeting Technical Customer Success
Manager and Sales roles. Single page, static, English only. This is a REBUILD —
the previous version was too close to a resume. This one goes deeper: real case
studies with context and outcomes, not bullet lists.

## Tech rules — do not deviate
- Plain HTML, CSS, and vanilla JavaScript only. No frameworks, no npm, no build.
- No CDN links except Google Fonts.
- Three files at root: `index.html`, `style.css`, `script.js`.
- Must work by double-clicking `index.html`.
- Mobile first, correct at 375px.
- All colours and spacing as CSS custom properties.
- Semantic HTML, meaningful `alt` text, skip-to-content link.
- Respect `prefers-reduced-motion` everywhere.

## Assets
- `assets/images/portrait.jpg`
- `assets/docs/cv.pdf`
- Never invent filenames. Ask if an image is needed that does not exist.

## CRITICAL RULE
Never invent content. No fabricated metrics, client names, project names,
testimonials, or outcomes. Anything marked `[TO CONFIRM]` must be left as a
visible placeholder for the site owner to fill in — do not guess a value and do
not quietly drop the section.

---

## Design direction

Structure and motion modelled on saad.moatassime.com. Colours stay as below.

### Colour (unchanged from v1)
```
--bg:          #08080A
--surface:     #131316
--border:      #232329
--text:        #FFFFFF
--body:        #C7C7CE
--muted:       #86868F
--accent:      #8B5CF6
--accent-soft: #A78BFA
```
Accent only on links, buttons, hover, active states, tags, section markers.
One violet glow permitted per screen, heavily blurred and low opacity.

### Typography
- Inter from Google Fonts: 400, 500, 600, 700, 800.
- Hero name: `clamp(3rem, 12vw, 8rem)`, weight 800, line-height 0.9,
  letter-spacing -0.03em. Terminal punctuation (the full stop after the name)
  rendered in `--accent`.
- Section headings: `clamp(2rem, 5vw, 3.5rem)`, weight 700.
- Selected words inside body copy may be weight 600 in `--text` while the rest
  of the sentence is `--body` — this emphasis pattern is used throughout.
- Occasional italic accent word in headings for rhythm.
- Small labels: 0.75rem, uppercase, letter-spacing 0.16em, `--muted`.
- Body: 1.05rem, line-height 1.75, `--body`, max 65ch.

### Section headers
Every section opens with a two-part label in the small label style:
`01 — Profile`, `02 — Selected Work`, `03 — Capabilities`,
`04 — Background`, `05 — Content`. Number in `--accent`, title in `--muted`.

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
- Horizontal scroll for the Work section on desktop, drag and wheel supported.
- All hover behaviour gated behind `(hover: hover)` so touch devices never get
  stuck hover states.

---

## Page sections, in order

1. **Nav** — fixed. Name at left, links at right, plus a Resume link that
   downloads `cv.pdf`. Transparent over the hero, translucent blurred
   background once scrolled. Active section highlighted. Mobile: full-screen
   overlay menu, wipe-in from right, staggered numbered links.

2. **Hero** — full height.
   - Eyebrow label: `Technical Customer Success`
   - Name, huge, with an accent full stop
   - Pitch with emphasised phrases (see content)
   - Buttons: `Get in touch`, `View work`, `Resume`
   - A row of four stat blocks beneath: value large, label small
   - Portrait to the right on desktop, greyscale, colour on scroll position
     on touch and on hover on desktop
   - `Scroll` indicator at the bottom
   - Availability line: `Open to new roles · Marrakech, Morocco`

3. **Marquee** — infinite horizontal strip of capability keywords, repeating.

4. **About (01 — Profile)** — a lead sentence at heading size with an italic
   accent word, then two paragraphs. Beside it, a small definition list:
   Role, Based in, Focus, Languages, Status. Then four animated counters.

5. **Impact banner** — a single statement standing between two sections. No
   section number, no heading, no label — just the line, centred, in large
   uppercase type, with one hairline above and one below. The figure is set
   in `--accent-2` at about three times the size of the words beside it.
   Fades in on scroll like any other section child.

6. **Selected Work (02)** — the centrepiece. Five case study cards in a
   horizontal scroll row on desktop (drag, wheel, and arrow keys), stacked
   vertically on mobile. Each card contains:
   - index number (01–05)
   - date range and context label
   - role title and organisation
   - 3–4 bullets describing what was built or run and what changed
   - a row of small tag chips
   Cards lift and glow on hover. Do not link them anywhere unless a URL is
   given in the content below.

7. **Capabilities (03)** — grouped tag chips under category headings:
   Customer Success, Sales, Technical, Tools, Practices.

8. **Marquee CTA** — large infinite scrolling text: `Keep Customers · Grow
   Revenue · Automate The Rest ·` repeating, accent-tinted.

9. **Content (05)** — four vertical 9:16 video cards, floating, no solid
   background panel, idle float animation, parallax, lightbox with arrows,
   dots, keyboard and swipe navigation with direction-locked gestures.

10. **Background (04)** — education, languages.

11. **Contact** — large closing statement with an italic accent word, email as
    a `mailto:` link, phone as `tel:`, city. No form.

12. **Footer** — name, role, location, current year.

---

## Content

### Hero
Eyebrow: Technical Customer Success
Name: Mohamed Elhayyany.
Pitch: Sales gets the customer. **Support keeps them.** Automation makes both
scale. I've done all three.
Availability: Open to new roles · Marrakech, Morocco

Stat blocks:
- `100+` — Customers managed
- `50+` — Sales closed
- `98%` — Policy accuracy at scale
- `15%` — Revenue growth in 2 months

### Marquee keywords
Customer Success · Account Management · Full-Cycle Sales · Onboarding ·
Retention · Workflow Automation · AI Agents · Data Analysis · Content Strategy

### About (01 — Profile)
Lead: A customer-facing operator who turns *friction* into retention.

Paragraph 1: Over four years I've worked every side of the customer
relationship — answering calls at Terrain 360, moderating content at scale for
Majorel, and now owning the full client lifecycle at SafeApps. Support taught me
how customers fail. Data taught me why. Automation is how I stop it happening
twice.

Paragraph 2: Today I manage high-priority SaaS accounts from onboarding through
renewal, run full-cycle outreach that converts prospects into long-term
subscribers, and build the automated workflows that remove manual work from my
clients' operations. On the side I founded **Postry**, a wall art brand I run
end to end — which is where I learned what retention costs when the customer is
paying you directly. I work in Arabic, English, and French.

Definition list:
- Role — Technical Customer Success Manager
- Based in — Marrakech, Morocco
- Focus — Retention · Revenue · Automation
- Languages — Arabic · English · French · Spanish
- Also — Founder, Postry (DTC wall art)
- Status — Open to work

Counters:
- `4+` Years customer-facing
- `250+` Posters sold in three months
- `98%` Accuracy at review scale
- `4` Languages

### Impact banner
Sits between About and Selected Work. One line, uppercase, centred:
`15%` `Revenue growth in 2 months.`
The figure is amber (`--accent-2`) at roughly three times the size of the
rest of the line. Hairline above and below, nothing else.

### Selected Work (02)

**01 — Automation & AI Agent Delivery**
SafeApps (eGrow) · 2025 — Present · Marrakech
- Built custom automated workflows and AI-driven agents for client operations,
  tailored per account rather than sold as a template.
- Designed the automations around what each client's team was actually doing
  manually, then removed that work.
- Built WhatsApp automations for the moments customers actually care about:
  automatic order confirmation on purchase, and delivery tracking updates
  pushed to the customer as the parcel moves.
- Built transactional email flows alongside them so clients reach customers
  on whichever channel they respond to.
- Implemented Facebook Conversions API integrations, sending server-side
  conversion events so clients' ad targeting and attribution stop depending
  on browser tracking.
Tags: Zapier · AI Agents · Workflow Design · Client Discovery

**02 — Account Ownership & Retention**
SafeApps (eGrow) · 2025 — Present · Marrakech
- Contributed to a 15% increase in company revenue within two months through structured outreach and account expansion.
- Manage a portfolio of over 100 active customer accounts across onboarding, technical support, and renewal.
- Troubleshoot complex platform errors directly with users rather than handing
  them to a queue.
- Closed over 50 sales through structured outreach and qualification and turned them into long term subscribers.
Tags: Onboarding · Technical Support · Renewals · Cold Outreach

**03 — Brand Content & Customer Education**
SafeApps (eGrow) · 2025 — Present · Marrakech
- On-camera face of the brand across marketing campaigns and product
  advertising.
- Run Meta ad campaigns for clients, managing audience targeting, ad creative, and conversion optimisation through the Conversions API integrations.
- Produce educational tutorials that reduce the support load by answering
  common questions before they become tickets.
- Own the content end to end — scripting, filming, editing, publishing.
Tags: Video Production · Product Education · Premiere Pro · CapCut

**04 — Moderation at Scale & Team Enablement**
Majorel Outsourcing · 2022 — 2024 · Marrakech
- Reviewed hundreds of user posts and advertisements daily against detailed
  platform policy, sustaining a 98% accuracy rate.
- Trained and mentored incoming moderators on tools and workflows, shortening
  ramp-up time for the team.
- Escalated high-risk cases — illegal activity, credible threats — to internal
  teams and authorities under time pressure.
- Analysed moderation data to surface recurring patterns and recommend process
  changes rather than only enforcing case by case.
Tags: Policy Enforcement · Training · Escalation · Data Analysis

**05 — Postry — Founder**
Independent venture · January 2026 — Present · Morocco
- Founded and run Postry, a self-printed wall art brand selling A4 and A3
  prints direct to customers in Morocco.
- Built the storefront end to end on Shopify — product catalogue, theme
  customisation, and a bundle selector driving tiered pricing that lifts
  average order value.
- Run the whole operation solo: printing, product photography and mockups,
  pricing, listings, and customer conversations.
- Chose a deliberately low-overhead stack, avoiding recurring app
  subscriptions so margin stays in the business.
- Sold over 250 posters in the first three months, moving from launch to a
  consistently profitable operation without outside funding.
- Won business clients alongside individual buyers, including Experience
  Morocco, plus commissions from artists and content creators.
Tags: Shopify · DTC E-commerce · Pricing Strategy · Product Photography ·
Customer Support

### Capabilities (03)
- Customer Success — Account Management · Onboarding · Retention · Renewals ·
  Escalation · De-escalation · Technical Support
- Sales — Full-Cycle Sales · Lead Qualification · Cold Outreach · Upselling ·
  Pipeline Management
- Technical — Workflow Automation · AI Agents · Troubleshooting · Data Analysis
  · Reporting
- Meta Ads — Ad Campaign
- Tools — Zapier · Power BI · Excel · Google Sheets · Claude Code ·
  Adobe Premiere Pro · Adobe Illustrator · CapCut · Microsoft Office
- E-commerce — Shopify · Storefront Build · Pricing & Bundling · Product
  Photography · Order Fulfilment
- Practices — Client Discovery · Process Improvement · Team Training ·
  Multilingual Support
- Financial Markets Analysis · Risk Management · TradingView · MetaTrader 4 & 5

### Marquee CTA
Bring Customers · Keep Them · Grow Revenue · Automate The Rest ·

### Content videos (05)
Four YouTube Shorts, vertical 9:16. Embed URLs — do not use the /shorts/ form:
- https://www.youtube.com/embed/ZDRf9FOJpMA
- https://www.youtube.com/embed/pGP2rb5e0_U
- https://www.youtube.com/embed/bJdhYTdqVE4
- https://www.youtube.com/embed/Mcrh3GoqDTk
Thumbnails: https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg
Fall back to hqdefault.jpg where maxresdefault is unavailable.
No captions beneath the cards — the thumbnails speak for themselves.

### Background (04)
Education:
- Professional Foundations & Data Analytics — ALX Africa — 2024–2025
- Bachelor's Degree in Economics — Cadi Ayyad University, Marrakech — 2022–2024
- Baccalaureate — Ibn Toumert High School, Marrakech — 2022
Certifications:
- Funded Futures Trader — Funded Next — 2026
- Funded Forex Trader — Funding Pips — 2025
- Professional Foundations & Data Analytics — ALX Africa — 2025
Certificate images: assets/images/cert-funding-pips.png, assets/images/cert-funded-next.png, 
Languages:
- Arabic — Native
- English — Fluent
- French — C1
- Spanish — B1



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
- Explain each block in plain language — the owner is not a developer.
- Never add placeholder copy, fake testimonials, or invented numbers.
- - Never add placeholder boxes or notes-to-self to the rendered page.
