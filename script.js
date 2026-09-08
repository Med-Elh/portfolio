/* ==========================================================================
   Mohamed Elhayyany — Portfolio (v2)

   Three jobs for now:
   1. Give the nav a background once the page is scrolled.
   2. Open and close the mobile menu.
   3. Rise the hero content into place on load.

   The particle canvas, the sparkle cursor, the marquees, the counters,
   the horizontal work scroll and the scroll-spy all come later.
   ========================================================================== */

(function () {
  'use strict';

  /* Tells the stylesheet JavaScript is running, so it is safe to start
     revealable content hidden. Without this class it stays visible. */
  document.documentElement.classList.add('js');

  /* Read once and shared by everything below */
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  /* Deliberately not the same as finePointer above — this mirrors the
     bare (hover: hover) media queries in style.css exactly (the custom
     cursor, the atmosphere's cursor-tracking pieces), so JavaScript and
     CSS can never disagree about which devices count as "desktop" */
  var hoverCapable = window.matchMedia('(hover: hover)');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------------------
     Nav background on scroll
     ------------------------------------------------------------------ */

  var nav = document.getElementById('nav');

  if (nav) {
    var navTicking = false;

    function updateNav() {
      navTicking = false;
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
    }

    function queueNav() {
      if (!navTicking) {
        navTicking = true;
        requestAnimationFrame(updateNav);
      }
    }

    updateNav();
    window.addEventListener('scroll', queueNav, { passive: true });
  }

  /* ------------------------------------------------------------------
     Mobile menu
     ------------------------------------------------------------------ */

  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');

  if (burger && menu) {
    var menuStops = menu.querySelectorAll('a');

    function menuIsOpen() {
      return burger.getAttribute('aria-expanded') === 'true';
    }

    /* A class rather than the hidden attribute: display: none cannot be
       transitioned, and the panel has to wipe out as well as in */
    function openMenu() {
      menu.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('is-locked');

      if (menuStops.length) {
        menuStops[0].focus();
      }
    }

    function closeMenu(returnFocus) {
      menu.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('is-locked');

      if (returnFocus) {
        burger.focus();
      }
    }

    burger.addEventListener('click', function () {
      if (menuIsOpen()) {
        closeMenu(true);
      } else {
        openMenu();
      }
    });

    /* Tapping a link jumps to that section, so close up behind it */
    for (var i = 0; i < menuStops.length; i++) {
      menuStops[i].addEventListener('click', function () {
        closeMenu(false);
      });
    }

    /* A tap anywhere on the panel that isn't a link or a button counts as
       tapping the backdrop. The link handler above has already run by
       then, so this can't fire twice for one tap. */
    menu.addEventListener('click', function (event) {
      if (!event.target.closest('a, button')) {
        closeMenu(true);
      }
    });

    /* The burger is the close button while the panel is open, so it
       belongs in the focus ring — otherwise a keyboard user can see the
       cross but never reach it */
    function trapStops() {
      var stops = [burger];

      for (var t = 0; t < menuStops.length; t++) {
        stops.push(menuStops[t]);
      }

      return stops;
    }

    document.addEventListener('keydown', function (event) {
      if (!menuIsOpen()) {
        return;
      }

      if (event.key === 'Escape') {
        closeMenu(true);
        return;
      }

      /* Keep Tab cycling inside the panel while it covers the page */
      if (event.key === 'Tab') {
        var stops = trapStops();
        var first = stops[0];
        var last = stops[stops.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    /* Widening past the breakpoint brings the inline links back, which
       would otherwise leave the panel stranded over the page */
    window.addEventListener('resize', function () {
      if (menuIsOpen() && window.innerWidth >= 900) {
        closeMenu(false);
      }
    });
  }

  /* ------------------------------------------------------------------
     In-page links scroll smoothly, with a real fallback

     html { scroll-behavior: smooth } handles this on its own in current
     browsers, but iOS Safari only shipped it in 15.4 — before that a nav
     tap jumps instantly, and CSS offers no way to feature-detect it.
     This intercepts same-page hash links and drives the scroll itself:
     window.scrollTo({ behavior: 'smooth' }) where the browser has it,
     and a hand-rolled rAF tween where it doesn't.

     It covers the nav, the mobile menu, the dot rail, the hero buttons
     and the skip link in one delegated handler, since all of them are
     just <a href="#...">.
     ------------------------------------------------------------------ */

  var supportsSmoothScroll =
    'scrollBehavior' in document.documentElement.style;

  /* Measured off the element rather than read from --nav-height, which
     is authored in rem — and rem needs the root font size to become the
     pixels scrollTo wants. Measuring is both shorter and correct if the
     nav's height ever stops matching the variable. */
  function navOffset() {
    var navEl = document.querySelector('.nav');

    return navEl ? navEl.offsetHeight : 72;
  }

  function tweenScrollTo(top) {
    var start = window.scrollY;
    var delta = top - start;
    var began = null;
    var DURATION = 600;

    function step(now) {
      if (began === null) {
        began = now;
      }

      var t = Math.min((now - began) / DURATION, 1);
      /* Same settle as the rest of the page — fast out, long tail */
      var eased = 1 - Math.pow(1 - t, 3);

      window.scrollTo(0, start + delta * eased);

      if (t < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  document.addEventListener('click', function (event) {
    /* Let the browser handle anything that isn't a plain left click:
       new tab, new window, download, and so on */
    if (event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    var link = event.target.closest && event.target.closest('a[href*="#"]');

    if (!link) {
      return;
    }

    /* Only same-document links. Comparing the resolved path keeps this
       from firing on a link to another page that happens to carry a
       fragment, and works under file:// as well as over http. */
    if (link.pathname !== window.location.pathname ||
        link.search !== window.location.search) {
      return;
    }

    var id = link.hash.slice(1);

    if (!id) {
      return;
    }

    var target = document.getElementById(id);

    if (!target) {
      return;
    }

    event.preventDefault();

    var top = Math.max(
      window.scrollY + target.getBoundingClientRect().top - navOffset() - 12,
      0
    );

    if (reducedMotion.matches) {
      window.scrollTo(0, top);
    } else if (supportsSmoothScroll) {
      window.scrollTo({ top: top, behavior: 'smooth' });
    } else {
      tweenScrollTo(top);
    }

    /* preventDefault() skipped the browser's own focus move, which the
       skip link in particular depends on. preventScroll keeps focusing
       from fighting the scroll that is already under way. */
    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
    }

    try {
      target.focus({ preventScroll: true });
    } catch (err) {
      target.focus();
    }

    /* Keeps the address bar and the back button honest, without the
       instant jump that assigning location.hash would cause */
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', '#' + id);
    }
  });

  /* ------------------------------------------------------------------
     Hero content rises in on load

     The hero is on screen from the start, so this is a load sequence
     rather than a scroll reveal. Later sections get the scroll version.
     ------------------------------------------------------------------ */

  var risers = document.querySelectorAll('[data-rise]');

  if (risers.length) {
    if (reducedMotion.matches) {
      for (var r = 0; r < risers.length; r++) {
        risers[r].classList.add('is-risen');
      }
    } else {
      /* 50ms, not the 100ms the scroll-triggered reveals use — the hero
         is the very first thing on screen, so a shorter stagger keeps
         the worst case (last item: 6 * 50ms delay + the 450ms
         --rise-time-hero duration) well under a second on a slow device */
      for (var s = 0; s < risers.length; s++) {
        risers[s].style.transitionDelay = (s * 50) + 'ms';
      }

      /* One frame's grace so the browser registers the starting state
         and actually runs the transition rather than jumping to the end */
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          for (var t = 0; t < risers.length; t++) {
            risers[t].classList.add('is-risen');
          }
        });
      });
    }
  }

  /* ------------------------------------------------------------------
     Hero split on scroll

     Mapped straight from scroll position, not animated: 0 to one
     viewport height of scroll maps onto 0 to 60% translation, with
     opacity going 1 to 0 across the same range. Because it is a pure
     function of scrollY it reverses exactly on the way back up, with
     no state to get out of step.

     Desktop sends the copy left and the portrait right. Below 900px
     there is nowhere to send them — the two sit stacked, not side by
     side — so that width only fades.
     ------------------------------------------------------------------ */

  var heroEl = document.getElementById('hero');

  if (heroEl && !reducedMotion.matches) {
    var splitWide = window.matchMedia('(min-width: 900px)');
    var splitMax = 60;

    var splitLeft = [];
    /* .stats is deliberately not in here. Everything listed gets
       opacity: 1 - scrollY/viewportHeight written straight onto it, and
       the stat row sits low in the hero — lowest of all on a phone,
       where the column is stacked and taller than one screen. That meant
       the numbers were already part-faded by the time they scrolled into
       view and hit zero while still on screen. Left out of the split
       entirely, they neither fade nor move: they simply sit there until
       they leave the top of the viewport. */
    var leftSel = ['.hero__intro', '.hero__actions', '.hero__availability'];

    for (var ls = 0; ls < leftSel.length; ls++) {
      var found = heroEl.querySelector(leftSel[ls]);
      if (found) {
        splitLeft.push(found);
      }
    }

    var splitRight = heroEl.querySelector('.hero__media');
    var splitReady = false;
    var splitTicking = false;

    function writeSplit(el, percent, fade) {
      if (!el) {
        return;
      }

      el.style.transform = percent === 0
        ? ''
        : 'translate3d(' + percent + '%, 0, 0)';
      el.style.opacity = fade;
    }

    function applySplit() {
      splitTicking = false;

      if (!splitReady) {
        return;
      }

      var viewH = window.innerHeight || 1;
      var progress = window.scrollY / viewH;

      if (progress < 0) { progress = 0; }
      if (progress > 1) { progress = 1; }

      var fade = 1 - progress;
      /* Sideways only where the two columns actually sit side by side */
      var shift = splitWide.matches ? progress * splitMax : 0;

      for (var i = 0; i < splitLeft.length; i++) {
        writeSplit(splitLeft[i], -shift, fade);
      }

      writeSplit(splitRight, shift, fade);

      /* Fully faded means fully gone — otherwise the buttons would still
         be sitting there catching clicks from behind the next section */
      heroEl.style.pointerEvents = progress >= 1 ? 'none' : '';
    }

    function queueSplit() {
      if (!splitTicking) {
        splitTicking = true;
        requestAnimationFrame(applySplit);
      }
    }

    /* Nothing may be written until the load-in rise has finished, or the
       two would fight over the same transform and opacity. The stylesheet
       drops the rise transition at the same moment (.is-split-ready), so
       what follows tracks the scroll exactly instead of easing behind it. */
    function armSplit() {
      if (splitReady) {
        return;
      }

      splitReady = true;
      heroEl.classList.add('is-split-ready');
      applySplit();
    }

    /* 7 risers, 50ms apart, 450ms each — 800ms clears the last of them.
       A page restored mid-scroll has no rise to wait for. */
    if (window.scrollY > 0) {
      armSplit();
    } else {
      setTimeout(armSplit, 800);
    }

    window.addEventListener('scroll', queueSplit, { passive: true });

    window.addEventListener('resize', function () {
      /* Crossing the breakpoint leaves a stale sideways offset behind */
      if (!splitWide.matches) {
        for (var c = 0; c < splitLeft.length; c++) {
          splitLeft[c].style.transform = '';
        }

        if (splitRight) {
          splitRight.style.transform = '';
        }
      }

      queueSplit();
    });
  }

  /* ------------------------------------------------------------------
     Section dots — the fill travelling down the hairline

     The active dot itself is handled by the reading-highlight observer
     further down (it matches .dots__dot with the same selector it uses
     for the nav links). This only draws how far down the page you are.
     ------------------------------------------------------------------ */

  var dotsFill = document.getElementById('dots-fill');

  if (dotsFill && !reducedMotion.matches) {
    var dotsTicking = false;

    function applyDotsFill() {
      dotsTicking = false;

      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - window.innerHeight;
      var travelled = scrollable > 0 ? window.scrollY / scrollable : 0;

      if (travelled < 0) { travelled = 0; }
      if (travelled > 1) { travelled = 1; }

      dotsFill.style.transform = 'scaleY(' + travelled + ')';
    }

    function queueDotsFill() {
      if (!dotsTicking) {
        dotsTicking = true;
        requestAnimationFrame(applyDotsFill);
      }
    }

    applyDotsFill();
    window.addEventListener('scroll', queueDotsFill, { passive: true });
    window.addEventListener('resize', queueDotsFill);
  }

  /* ------------------------------------------------------------------
     Section reveals

     A section coming into view brings its own children up with it, each
     one 100ms behind the last. The stagger is worked out here rather
     than in the stylesheet, so a section can hold any number of children
     without needing a matching rule. Once only — never replayed.
     ------------------------------------------------------------------ */

  var revealables = document.querySelectorAll('[data-reveal]');

  function revealAll() {
    for (var a = 0; a < revealables.length; a++) {
      revealables[a].classList.add('is-revealed');
    }
  }

  if (!revealables.length) {
    /* nothing to do */

  } else if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    /* Reduced motion, or a browser too old to observe: show it outright
       rather than leaving it hidden for good */
    revealAll();

  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      for (var e = 0; e < entries.length; e++) {
        if (!entries[e].isIntersecting) {
          continue;
        }

        var kids = entries[e].target.querySelectorAll('[data-reveal]');

        for (var k = 0; k < kids.length; k++) {
          kids[k].classList.add('is-revealed');
        }

        revealObserver.unobserve(entries[e].target);
      }
    /* 0.05, not 0.15. The threshold is a fraction of the *target*, and
       the target here is a whole section — on a phone the taller ones
       run several screens deep, so the most of themselves they can ever
       have on screen at once is viewportHeight / sectionHeight. Past
       about six and a half screens tall that ceiling drops under 0.15
       and the section would never reach its own trigger, leaving its
       children stuck at opacity 0 for good. A low threshold has no such
       cliff, and 0.01 removes it entirely — on iOS the root height moves
       under you as the address bar collapses, so the less any decision
       rests on a ratio of it, the better. The rootMargin is what
       actually sets the trigger point: a target has to be a tenth of a
       screen clear of the bottom edge before it counts as arrived. */
    }, { threshold: 0.01, rootMargin: '0px 0px -10% 0px' });

    var revealSections = document.querySelectorAll('section');

    for (var rs = 0; rs < revealSections.length; rs++) {
      var children = revealSections[rs].querySelectorAll('[data-reveal]');

      if (!children.length) {
        continue;
      }

      for (var c = 0; c < children.length; c++) {
        children[c].style.transitionDelay = (c * 100) + 'ms';
      }

      revealObserver.observe(revealSections[rs]);
    }

    /* Anything tagged outside a section would otherwise stay hidden,
       since nothing would be watching for it */
    for (var o = 0; o < revealables.length; o++) {
      if (!revealables[o].closest('section')) {
        revealables[o].classList.add('is-revealed');
      }
    }
  }

  /* ------------------------------------------------------------------
     Section reading highlight

     Whichever .section the rootMargin below finds sitting in the
     middle 20% of the viewport gets .is-active, along with its
     matching nav and mobile-menu links; every other .section (and
     style.css's .js .section rule) falls back to the dimmed, muted
     state. Hero is never a .section, so it's never touched here — it
     stays at full opacity regardless, as required.
     ------------------------------------------------------------------ */

  var highlightSections = document.querySelectorAll('.section[id]');

  /* Runs whatever the motion setting says, because it drives two
     separate things: the section dimming (decorative — switched off in
     the stylesheet's reduced-motion block, which pins .section to full
     opacity) and the active-section highlight in the nav and the mobile
     menu (functional — it is how you know where you are on the page).
     Gating the observer itself took the second one out with the first. */
  if (highlightSections.length && 'IntersectionObserver' in window) {

    /* The right-edge section dots are matched by the same selector, so
       they light up from this one observer with no second pass */
    function navLinksFor(id) {
      return document.querySelectorAll(
        '.nav__link[href="#' + id + '"], .menu__link[href="#' + id + '"], .dots__dot[href="#' + id + '"]'
      );
    }

    var highlightObserver = new IntersectionObserver(function (entries) {
      for (var hi = 0; hi < entries.length; hi++) {
        var section = entries[hi].target;
        var links = navLinksFor(section.id);

        section.classList.toggle('is-active', entries[hi].isIntersecting);

        for (var hl = 0; hl < links.length; hl++) {
          links[hl].classList.toggle('is-active', entries[hi].isIntersecting);
        }
      }
    }, { rootMargin: '-40% 0px -40% 0px' });

    for (var hs = 0; hs < highlightSections.length; hs++) {
      highlightObserver.observe(highlightSections[hs]);
    }
  }

  /* ------------------------------------------------------------------
     Section headings — character split, clip-mask reveal

     Each character is wrapped in a small overflow: hidden mask
     (.char-clip) around the piece that actually rises (.char), with a
     25ms-per-character delay written inline. Whitespace is left as
     plain text rather than split, so normal word-wrapping still works.
     aria-label carries the plain, un-split sentence, so a screen
     reader hears one sentence rather than one letter at a time — see
     https://www.w3.org/TR/wai-aria-1.2/#aria-label, which takes
     precedence over an element's text content once it's set.
     ------------------------------------------------------------------ */

  var splitTargets = document.querySelectorAll('[data-split-reveal]');

  if (splitTargets.length && !reducedMotion.matches && 'IntersectionObserver' in window) {

    function splitChars(el) {
      var index = 0;

      function walk(node) {
        if (node.nodeType === 3) {
          var text = node.textContent;
          var frag = document.createDocumentFragment();

          for (var i = 0; i < text.length; i++) {
            var ch = text[i];

            if (/\s/.test(ch)) {
              frag.appendChild(document.createTextNode(ch));
              continue;
            }

            var clip = document.createElement('span');
            clip.className = 'char-clip';

            var inner = document.createElement('span');
            inner.className = 'char';
            inner.textContent = ch;
            inner.style.transitionDelay = (index * 25) + 'ms';
            index++;

            clip.appendChild(inner);
            frag.appendChild(clip);
          }

          node.parentNode.replaceChild(frag, node);
        } else if (node.nodeType === 1 && node.tagName !== 'BR') {
          var children = Array.prototype.slice.call(node.childNodes);

          for (var wc = 0; wc < children.length; wc++) {
            walk(children[wc]);
          }
        }
      }

      el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());

      var startingChildren = Array.prototype.slice.call(el.childNodes);

      for (var sc = 0; sc < startingChildren.length; sc++) {
        walk(startingChildren[sc]);
      }
    }

    var splitObserver = new IntersectionObserver(function (entries) {
      for (var se = 0; se < entries.length; se++) {
        if (!entries[se].isIntersecting) {
          continue;
        }

        entries[se].target.classList.add('is-split-revealed');
        splitObserver.unobserve(entries[se].target);
      }
    /* Was 0.4. A heading is short enough that 40% of it was always
       reachable, so this was never at risk of the cliff the reveal
       observer has — but it did mean the character animation waited on
       a fraction of a viewport height that iOS keeps changing. Same
       treatment as the others: trigger on the margin, not the ratio. */
    }, { threshold: 0.01, rootMargin: '0px 0px -10% 0px' });

    for (var st = 0; st < splitTargets.length; st++) {
      splitChars(splitTargets[st]);
      splitObserver.observe(splitTargets[st]);
    }
  }

  /* ------------------------------------------------------------------
     Counters

     The finished number is already in the HTML, so it reads correctly
     with JavaScript off. This resets it to zero and counts up, once.
     ------------------------------------------------------------------ */

  var counters = document.querySelectorAll('[data-count]');

  /* Deliberately not gated on reduced motion. A counter that skips
     straight to its final value has not been calmed — it has simply
     stopped being a counter, and the one thing the animation is there
     to communicate (that this is a quantity that accumulated) is gone.
     The movement is small, contained, and triggered by arriving at it. */
  if (counters.length && 'IntersectionObserver' in window) {
    var COUNT_TIME = 1400;

    function runCounter(el) {
      /* Two things can start a counter now — the observer and the
         load-time sweep below — and whichever arrives second must do
         nothing, or the number visibly restarts from zero */
      if (el.getAttribute('data-counted') === 'true') {
        return;
      }

      el.setAttribute('data-counted', 'true');

      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';

      if (isNaN(target)) {
        return;
      }

      var started = null;

      function step(now) {
        if (started === null) {
          started = now;
        }

        var progress = Math.min((now - started) / COUNT_TIME, 1);

        /* Fast at first, easing to a stop — a linear count reads as a
           stopwatch rather than as something arriving */
        var eased = 1 - Math.pow(1 - progress, 3);

        el.textContent = Math.round(target * eased) + suffix;

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      el.textContent = '0' + suffix;
      requestAnimationFrame(step);
    }

    var counterObserver = new IntersectionObserver(function (entries) {
      for (var n = 0; n < entries.length; n++) {
        if (entries[n].isIntersecting) {
          runCounter(entries[n].target);
          counterObserver.unobserve(entries[n].target);
        }
      }
    /* Starts as soon as the number edges into view rather than waiting
       for half of it, so the count is already running by the time it is
       properly on screen. 0.01 rather than 0.05 because iOS recomputes
       the viewport as the address bar grows and shrinks, and a ratio
       measured against a shifting root is worth trusting as little as
       possible. The rootMargin does the real work of deciding when. */
    }, { threshold: 0.01, rootMargin: '0px 0px -10% 0px' });

    for (var cn = 0; cn < counters.length; cn++) {
      counterObserver.observe(counters[cn]);
    }

    /* iOS Safari intermittently never delivers the first callback batch
       for an observer created during page load — the counters then sit
       at their final value, having never counted. This is the backstop:
       half a second after the document is ready, anything already on
       screen is started by hand. runCounter refuses to run twice, so on
       every browser that behaved normally this finds nothing to do. */
    function sweepVisibleCounters() {
      var viewH = window.innerHeight || document.documentElement.clientHeight;

      for (var cs = 0; cs < counters.length; cs++) {
        var box = counters[cs].getBoundingClientRect();

        if (box.top < viewH && box.bottom > 0) {
          runCounter(counters[cs]);
          counterObserver.unobserve(counters[cs]);
        }
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        setTimeout(sweepVisibleCounters, 500);
      });
    } else {
      setTimeout(sweepVisibleCounters, 500);
    }
  }

  /* ------------------------------------------------------------------
     Selected Work — horizontal scrolling

     A normal scroll container, nothing more: the page's own vertical
     scroll is never touched. Sideways movement comes from the browser
     itself (trackpad, touch swipe) plus four things set up here —
     click-and-drag, the wheel, the arrow keys, and the two arrow
     buttons — all of which just move .work__row's native scrollLeft.
     ------------------------------------------------------------------ */

  var workRow = document.getElementById('work-row');
  var workWide = window.matchMedia('(min-width: 900px)');

  if (workRow) {

    function cardStep() {
      var card = workRow.querySelector('.card');

      if (!card) {
        return workRow.clientWidth * 0.8;
      }

      /* One card plus the gap between them */
      var styles = getComputedStyle(workRow);
      return card.getBoundingClientRect().width + parseFloat(styles.columnGap || 0);
    }

    /* ---- drag ---- */

    var dragging = false;
    var dragStartX = 0;
    var dragStartScroll = 0;
    var dragMoved = 0;

    function dragAvailable() {
      return workWide.matches && finePointer.matches;
    }

    function syncDragCursor() {
      workRow.classList.toggle('is-draggable', dragAvailable());
    }

    workRow.addEventListener('mousedown', function (event) {
      if (!dragAvailable()) {
        return;
      }

      dragging = true;
      dragMoved = 0;
      dragStartX = event.pageX;
      dragStartScroll = workRow.scrollLeft;
      workRow.classList.add('is-dragging');
      /* Mandatory scroll-snap fights a drag's many small scrollLeft
         writes (see the comment on .is-snap-suspended in style.css) —
         suspended for the drag's duration, restored on mouseup below */
      workRow.classList.add('is-snap-suspended');

      /* Stops the browser starting its own text selection or image drag */
      event.preventDefault();
    });

    document.addEventListener('mousemove', function (event) {
      if (!dragging) {
        return;
      }

      var travelled = event.pageX - dragStartX;
      dragMoved = Math.abs(travelled);
      workRow.scrollLeft = dragStartScroll - travelled;
    });

    document.addEventListener('mouseup', function () {
      if (!dragging) {
        return;
      }

      dragging = false;
      workRow.classList.remove('is-dragging');
      /* Snap re-engages now, so letting go settles the row on the
         nearest card rather than wherever the drag happened to stop */
      workRow.classList.remove('is-snap-suspended');
    });

    /* A drag that ends over a card would otherwise register as a click */
    workRow.addEventListener('click', function (event) {
      if (dragMoved > 6) {
        event.preventDefault();
        event.stopPropagation();
      }
    }, true);

    /* ---- wheel ----
       A vertical wheel gesture over the row moves it sideways. Once the
       row has run out of travel the event is left alone, so the page
       carries on scrolling instead of the row swallowing the gesture. */

    var wheelSnapTimer = null;

    workRow.addEventListener('wheel', function (event) {
      if (!workWide.matches) {
        return;
      }

      /* A genuinely sideways gesture is already handled by the browser */
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }

      var maxScroll = workRow.scrollWidth - workRow.clientWidth;
      var atStart = workRow.scrollLeft <= 0;
      var atEnd = workRow.scrollLeft >= maxScroll - 1;

      if ((event.deltaY < 0 && atStart) || (event.deltaY > 0 && atEnd)) {
        return;
      }

      event.preventDefault();

      /* Same fight as the drag handler above — suspended for as long as
         wheel events keep arriving, then restored a short idle moment
         after they stop, so the row settles on the nearest card once
         the gesture is actually over rather than mid-scroll */
      workRow.classList.add('is-snap-suspended');

      if (wheelSnapTimer) {
        clearTimeout(wheelSnapTimer);
      }

      wheelSnapTimer = setTimeout(function () {
        wheelSnapTimer = null;
        workRow.classList.remove('is-snap-suspended');
      }, 150);

      workRow.scrollLeft += event.deltaY;
    }, { passive: false });

    /* ---- arrow keys ----
       The row is focusable, so browsers already scroll it by a small step.
       This moves a whole card at a time instead. */

    workRow.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
        return;
      }

      if (!workWide.matches) {
        return;
      }

      event.preventDefault();

      workRow.scrollBy({
        left: event.key === 'ArrowRight' ? cardStep() : -cardStep(),
        behavior: reducedMotion.matches ? 'auto' : 'smooth'
      });
    });

    /* ---- progress bar and arrow buttons ----
       All three — the bar, and each arrow's enabled state — are driven
       by the row's own native scrollLeft, read fresh on every scroll
       event. Nothing here ever touches the page's vertical scroll. */

    var workProgressBar = document.getElementById('work-progress-bar');
    var workPrev = document.getElementById('work-prev');
    var workNext = document.getElementById('work-next');

    function setWorkProgress(value) {
      if (workProgressBar) {
        workProgressBar.style.transform = 'scaleX(' + value + ')';
      }
    }

    function updateWorkControls() {
      var maxScroll = workRow.scrollWidth - workRow.clientWidth;

      setWorkProgress(maxScroll > 0 ? workRow.scrollLeft / maxScroll : 0);

      if (workPrev) {
        workPrev.disabled = workRow.scrollLeft <= 0;
      }

      if (workNext) {
        workNext.disabled = workRow.scrollLeft >= maxScroll - 1;
      }
    }

    workRow.addEventListener('scroll', updateWorkControls, { passive: true });

    if (workPrev) {
      workPrev.addEventListener('click', function () {
        workRow.scrollBy({
          left: -cardStep(),
          behavior: reducedMotion.matches ? 'auto' : 'smooth'
        });
      });
    }

    if (workNext) {
      workNext.addEventListener('click', function () {
        workRow.scrollBy({
          left: cardStep(),
          behavior: reducedMotion.matches ? 'auto' : 'smooth'
        });
      });
    }

    /* Belt and braces: the row should already open at its natural start,
       but this guarantees card 01 is what's on screen on load rather than
       trusting scroll-anchoring or any other browser default to leave it
       there on its own */
    workRow.scrollLeft = 0;

    updateWorkControls();
    window.addEventListener('resize', updateWorkControls);

    syncDragCursor();
    window.addEventListener('resize', syncDragCursor);
  }

  /* ------------------------------------------------------------------
     Selected Work — cards that open on a phone

     Below 900px a card shows only its header until it is tapped. The
     animation is entirely CSS (grid-template-rows 0fr to 1fr); all this
     does is move the .is-open class around and keep aria-expanded on
     each toggle in step with it.

     Above 900px the cards show everything at once, so the width check
     lives inside the handler rather than around the whole block —
     that way a resize across the breakpoint needs no re-binding.
     ------------------------------------------------------------------ */

  var workCardEls = document.querySelectorAll('.work__row .card');
  var cardsCollapsible = window.matchMedia('(max-width: 899px)');

  if (workCardEls.length) {

    function setCardOpen(card, open) {
      card.classList.toggle('is-open', open);

      var toggle = card.querySelector('.card__toggle');

      if (toggle) {
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
    }

    /* Opening one closes the rest, so only ever one is down at a time */
    function openOnlyCard(card) {
      for (var oc = 0; oc < workCardEls.length; oc++) {
        setCardOpen(workCardEls[oc], workCardEls[oc] === card);
      }
    }

    for (var wc = 0; wc < workCardEls.length; wc++) {
      (function (card) {
        function toggleCard() {
          if (!cardsCollapsible.matches) {
            return;
          }

          if (card.classList.contains('is-open')) {
            setCardOpen(card, false);
          } else {
            openOnlyCard(card);
          }
        }

        var toggle = card.querySelector('.card__toggle');

        if (toggle) {
          /* The button is the keyboard and screen-reader route in; the
             card-wide handler below is the easy thumb target. Stopping
             propagation here keeps one tap from toggling twice. */
          toggle.addEventListener('click', function (event) {
            event.stopPropagation();
            toggleCard();
          });
        }

        card.addEventListener('click', function (event) {
          /* Never swallow a real link inside a card */
          if (event.target.closest && event.target.closest('a')) {
            return;
          }

          toggleCard();
        });
      })(workCardEls[wc]);
    }
  }

  /* ------------------------------------------------------------------
     Marquee

     The sliding itself is a CSS animation. All this does is stop it
     while the strip is off screen, so the browser isn't compositing
     something nobody can see.
     ------------------------------------------------------------------ */

  var marquees = document.querySelectorAll('.marquee');

  if (marquees.length && 'IntersectionObserver' in window) {
    var marqueeObserver = new IntersectionObserver(function (entries) {
      for (var m = 0; m < entries.length; m++) {
        entries[m].target.classList.toggle('is-paused', !entries[m].isIntersecting);
      }
    /* The 200px skirt matters on iOS. With a bare threshold of 0 the
       strip counts as off screen the instant it touches the viewport
       edge — and iOS moves that edge on its own as the address bar
       collapses and expands, which can land a "not intersecting"
       callback while the marquee is plainly visible, pausing it with
       nothing to start it again until the next scroll. Pausing only
       once it is a clear 200px away keeps the off-screen saving while
       putting that race well out of reach. */
    }, { threshold: 0, rootMargin: '200px 0px 200px 0px' });

    for (var q = 0; q < marquees.length; q++) {
      marqueeObserver.observe(marquees[q]);
    }
  }

  /* ------------------------------------------------------------------
     Content — video thumbnails, lightbox, and the floating cards

     Three independent pieces:
     1. Swap a thumbnail to hqdefault if maxresdefault doesn't exist —
        YouTube serves a small placeholder image rather than a 404, so
        this has to be detected by size, not by a failed request.
     2. The lightbox: opens on a card click, builds the iframe fresh
        each time (never before, never reused), and destroys it again on
        close or on switching videos, so nothing plays off screen.
     3. An idle bob plus a scroll parallax on each .video__float,
        entirely separate from the cards' own hover transform.
     ------------------------------------------------------------------ */

  var videoCards = document.querySelectorAll('.video__card[data-video-id]');

  /* ---- thumbnail fallback ---- */

  var thumbs = document.querySelectorAll('.video__thumb[data-fallback]');

  function useFallbackThumb(img) {
    var fallback = img.getAttribute('data-fallback');

    if (fallback && img.src !== fallback) {
      img.src = fallback;
    }
  }

  function checkThumb(img) {
    /* YouTube's "no maxresdefault" placeholder is a fixed 120x90 —
       anything that small is the placeholder, not a real thumbnail */
    if (img.naturalWidth > 0 && img.naturalWidth <= 120) {
      useFallbackThumb(img);
    }
  }

  for (var t = 0; t < thumbs.length; t++) {
    (function (img) {
      img.addEventListener('error', function () {
        useFallbackThumb(img);
      });

      img.addEventListener('load', function () {
        checkThumb(img);
      });

      /* It may already have finished loading before this ran */
      if (img.complete) {
        if (img.naturalWidth === 0) {
          useFallbackThumb(img);
        } else {
          checkThumb(img);
        }
      }
    })(thumbs[t]);
  }

  /* ---- lightbox ---- */

  var lightbox = document.getElementById('lightbox');
  var lightboxFrame = document.getElementById('lightbox-frame');
  var lightboxClose = document.getElementById('lightbox-close');
  var lightboxPrev = document.getElementById('lightbox-prev');
  var lightboxNext = document.getElementById('lightbox-next');
  var lightboxDots = document.getElementById('lightbox-dots');

  /* Assigned by the mobile deck further down. It gets first refusal on
     a card tap: on the deck, tapping a card behind the front one should
     bring it forward rather than open the lightbox. Returns true once
     it has handled the tap itself. Declared up here — every var in this
     file is hoisted to the top of the one enclosing function — so the
     click handler below can safely read it regardless of source order;
     by the time a real tap fires, deckClaimsTap has already been set. */
  var deckClaimsTap = null;

  if (videoCards.length && lightbox && lightboxFrame && lightboxClose &&
      lightboxPrev && lightboxNext && lightboxDots) {

    var FADE = 200;
    var videoIds = [];
    var dots = [];
    var currentVideo = 0;
    var switchTimer = null;
    var lastCard = null;

    for (var v = 0; v < videoCards.length; v++) {
      videoIds.push(videoCards[v].getAttribute('data-video-id'));
    }

    /* Built from the cards rather than hand-written in the HTML, so a
       fifth video would need no matching markup here */
    for (var d = 0; d < videoIds.length; d++) {
      (function (index) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'lightbox__dot';
        dot.setAttribute('aria-label', 'Show video ' + (index + 1));

        dot.addEventListener('click', function () {
          goToVideo(index);
        });

        lightboxDots.appendChild(dot);
        dots.push(dot);
      })(d);
    }

    function updateDots() {
      for (var i = 0; i < dots.length; i++) {
        var on = i === currentVideo;
        dots[i].classList.toggle('is-current', on);

        if (on) {
          dots[i].setAttribute('aria-current', 'true');
        } else {
          dots[i].removeAttribute('aria-current');
        }
      }
    }

    /* Emptying the container destroys the old iframe outright — nothing
       short of removal actually stops a playing embed */
    function mountVideo() {
      lightboxFrame.innerHTML = '';

      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/' + videoIds[currentVideo] + '?autoplay=1&rel=0';
      iframe.title = 'Video ' + (currentVideo + 1) + ' by Mohamed Elhayyany';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.setAttribute('allowfullscreen', '');

      lightboxFrame.appendChild(iframe);
    }

    function goToVideo(index, immediate) {
      var count = videoIds.length;
      /* Wraps both ways, so next from the last lands on the first */
      index = ((index % count) + count) % count;

      if (index === currentVideo && !immediate) {
        return;
      }

      currentVideo = index;
      updateDots();

      if (switchTimer) {
        clearTimeout(switchTimer);
        switchTimer = null;
      }

      if (immediate) {
        lightboxFrame.classList.remove('is-switching');
        mountVideo();
        return;
      }

      lightboxFrame.classList.add('is-switching');

      switchTimer = setTimeout(function () {
        switchTimer = null;
        mountVideo();
        lightboxFrame.classList.remove('is-switching');
      }, FADE);
    }

    function lightboxIsOpen() {
      return !lightbox.hidden;
    }

    function openLightbox(card, index) {
      var id = card.getAttribute('data-video-id');

      if (!id) {
        return;
      }

      /* A page opened straight from disk has no origin for YouTube to
         validate the embed against — the player refuses to configure at
         all. Nothing in the embed itself can fix that, so send the
         visitor to the real Short instead. Once this is on a real
         address, the lightbox below runs as designed. */
      if (window.location.protocol === 'file:') {
        window.open('https://www.youtube.com/shorts/' + id, '_blank', 'noopener');
        return;
      }

      lightbox.hidden = false;
      document.body.classList.add('is-locked');

      goToVideo(index, true);

      lastCard = card;
      lightboxClose.focus();
    }

    function closeLightbox() {
      if (switchTimer) {
        clearTimeout(switchTimer);
        switchTimer = null;
      }

      lightboxFrame.innerHTML = '';
      lightboxFrame.classList.remove('is-switching');
      lightbox.hidden = true;
      document.body.classList.remove('is-locked');

      if (lastCard) {
        lastCard.focus();
        lastCard = null;
      }
    }

    for (var c = 0; c < videoCards.length; c++) {
      (function (card, index) {
        card.addEventListener('click', function () {
          if (deckClaimsTap && deckClaimsTap(index)) {
            return;
          }

          openLightbox(card, index);
        });
      })(videoCards[c], c);
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', function () { goToVideo(currentVideo - 1); });
    lightboxNext.addEventListener('click', function () { goToVideo(currentVideo + 1); });

    /* A click that lands on the backdrop itself, not on any control or
       the frame, closes the lightbox */
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (!lightboxIsOpen()) {
        return;
      }

      if (event.key === 'Escape') {
        closeLightbox();
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToVideo(currentVideo - 1);
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToVideo(currentVideo + 1);
        return;
      }

      /* Keep Tab cycling through the lightbox's own controls only */
      if (event.key === 'Tab') {
        var stops = lightbox.querySelectorAll('button');

        if (!stops.length) {
          return;
        }

        var first = stops[0];
        var last = stops[stops.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    /* ---- swipe, direction-locked ----
       The axis is decided once, on the first move past a small
       threshold, and held for the rest of the gesture. A swipe that
       starts vertical (someone trying to scroll, or just an imprecise
       touch) can never suddenly count as a horizontal nav swipe partway
       through, and vice versa. */

    var SWIPE_LOCK = 10;
    var SWIPE_TRIGGER = 50;

    var swipeStartX = 0;
    var swipeStartY = 0;
    var swipeAxis = null;
    var swipeTracking = false;

    lightbox.addEventListener('touchstart', function (event) {
      if (event.touches.length !== 1) {
        swipeTracking = false;
        return;
      }

      swipeTracking = true;
      swipeAxis = null;
      swipeStartX = event.touches[0].clientX;
      swipeStartY = event.touches[0].clientY;
    }, { passive: true });

    lightbox.addEventListener('touchmove', function (event) {
      if (!swipeTracking || event.touches.length !== 1) {
        return;
      }

      var dx = event.touches[0].clientX - swipeStartX;
      var dy = event.touches[0].clientY - swipeStartY;

      if (swipeAxis === null) {
        if (Math.abs(dx) < SWIPE_LOCK && Math.abs(dy) < SWIPE_LOCK) {
          return;
        }

        swipeAxis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      }

      /* A horizontal gesture over the lightbox is never also trying to
         scroll the (locked) page underneath, so this is safe to claim */
      if (swipeAxis === 'x') {
        event.preventDefault();
      }
    }, { passive: false });

    lightbox.addEventListener('touchend', function (event) {
      if (!swipeTracking) {
        return;
      }

      var lockedTo = swipeAxis;
      swipeTracking = false;
      swipeAxis = null;

      if (lockedTo !== 'x') {
        return;
      }

      var dx = event.changedTouches[0].clientX - swipeStartX;

      if (Math.abs(dx) > SWIPE_TRIGGER) {
        goToVideo(currentVideo + (dx < 0 ? 1 : -1));
      }
    }, { passive: true });

    lightbox.addEventListener('touchcancel', function () {
      swipeTracking = false;
      swipeAxis = null;
    }, { passive: true });
  }

  /* ---- mobile deck ----
     Below 900px the four cards are a stack rather than a row: the front
     card at full size, the other three behind it offset down and scaled
     via --depth (0 for the front card, 1/2/3 behind), which .video and
     .video__card read in style.css. A swipe — or a tap on one of the
     cards showing behind — brings a different card to the front; a tap
     on the front card falls through to deckClaimsTap above and opens
     the lightbox instead. */

  var videosWide = window.matchMedia('(min-width: 900px)');
  var deckList = document.querySelector('.videos');
  var deckItems = document.querySelectorAll('.video');
  var deckDotsWrap = document.getElementById('videos-dots');

  if (deckList && deckItems.length && deckDotsWrap) {
    var deckFront = 0;
    var deckDots = [];

    function deckDepth(index) {
      var n = deckItems.length;
      return ((index - deckFront) % n + n) % n;
    }

    function applyDeck() {
      for (var i = 0; i < deckItems.length; i++) {
        var depth = deckDepth(i);
        deckItems[i].style.setProperty('--depth', depth);

        /* On the deck, a card behind the front one promotes rather than
           plays, so it should not announce itself as a play button */
        var card = deckItems[i].querySelector('.video__card');

        if (card) {
          card.setAttribute(
            'aria-label',
            (videosWide.matches || depth === 0)
              ? 'Play video ' + (i + 1)
              : 'Bring video ' + (i + 1) + ' to the front'
          );
        }

        if (deckDots[i]) {
          deckDots[i].classList.toggle('is-current', depth === 0);

          if (depth === 0) {
            deckDots[i].setAttribute('aria-current', 'true');
          } else {
            deckDots[i].removeAttribute('aria-current');
          }
        }
      }
    }

    function setDeckFront(index) {
      var n = deckItems.length;
      deckFront = ((index % n) + n) % n;
      applyDeck();
    }

    for (var dd = 0; dd < deckItems.length; dd++) {
      (function (index) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'videos__dot';
        dot.setAttribute('aria-label', 'Show video ' + (index + 1));

        dot.addEventListener('click', function () {
          setDeckFront(index);
        });

        deckDotsWrap.appendChild(dot);
        deckDots.push(dot);
      })(dd);
    }

    /* The lightbox's own card click handler calls this before it opens
       anything, and stands aside if this returns true */
    deckClaimsTap = function (index) {
      if (videosWide.matches || deckDepth(index) === 0) {
        return false;
      }

      setDeckFront(index);
      return true;
    };

    /* ---- swipe, direction-locked ----
       Same technique as the lightbox's own swipe above: the axis is
       decided once, on the first move past a small threshold, and held
       for the rest of the gesture, so a vertical scroll can never
       suddenly count as a card change partway through, or the reverse. */

    var DECK_SWIPE_LOCK = 10;
    var DECK_SWIPE_TRIGGER = 50;

    var deckStartX = 0;
    var deckStartY = 0;
    var deckAxis = null;
    var deckTracking = false;

    deckList.addEventListener('touchstart', function (event) {
      if (videosWide.matches || event.touches.length !== 1) {
        deckTracking = false;
        return;
      }

      deckTracking = true;
      deckAxis = null;
      deckStartX = event.touches[0].clientX;
      deckStartY = event.touches[0].clientY;
    }, { passive: true });

    /* passive: false is required — a passive listener may not call
       preventDefault, and the browser would scroll under the swipe */
    deckList.addEventListener('touchmove', function (event) {
      if (!deckTracking || event.touches.length !== 1) {
        return;
      }

      var dx = event.touches[0].clientX - deckStartX;
      var dy = event.touches[0].clientY - deckStartY;

      if (deckAxis === null) {
        if (Math.abs(dx) < DECK_SWIPE_LOCK && Math.abs(dy) < DECK_SWIPE_LOCK) {
          return;
        }

        deckAxis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      }

      /* Locked horizontal: this is the swipe, not a page scroll */
      if (deckAxis === 'x') {
        event.preventDefault();
      }
    }, { passive: false });

    deckList.addEventListener('touchend', function (event) {
      if (!deckTracking) {
        return;
      }

      var lockedTo = deckAxis;
      deckTracking = false;
      deckAxis = null;

      if (lockedTo !== 'x') {
        return;
      }

      var dx = event.changedTouches[0].clientX - deckStartX;

      if (Math.abs(dx) > DECK_SWIPE_TRIGGER) {
        setDeckFront(deckFront + (dx < 0 ? 1 : -1));
      }
    }, { passive: true });

    /* An interrupted gesture — an incoming call, a system edge-swipe —
       must not leave the deck believing a swipe is still under way */
    deckList.addEventListener('touchcancel', function () {
      deckTracking = false;
      deckAxis = null;
    }, { passive: true });

    /* Relabels the cards if a resize crosses the 900px breakpoint live */
    window.addEventListener('resize', applyDeck);

    applyDeck();
  }

  /* ---- idle float and scroll parallax ----
     Desktop only — on the mobile deck, each card independently bobbing
     on top of the stack's own depth offset would read as jitter rather
     than as a physical stack. Two movements on .video__float, never on
     .video__card — that split keeps this every-frame transform apart
     from the card's own transitioned hover transform, so the two can
     never collide. */

  var floaters = document.querySelectorAll('.video__float');
  var contentSection = document.getElementById('content');

  if (floaters.length && contentSection && !reducedMotion.matches) {
    var FLOAT_FPS = 30;
    var FLOAT_FRAME = 1000 / FLOAT_FPS;
    var FLOAT_TAU = Math.PI * 2;

    /* One entry per card. Periods share no common multiple worth
       mentioning, so the four never drift back into sync. */
    var FLOAT_PERIOD = [5000, 6500, 8000, 7200];
    var FLOAT_AMP = [10, 8, 12, 9];
    var FLOAT_PHASE = [0, 2.1, 4.2, 1.3];

    /* Parallax rate relative to the page scroll — 1.0 holds the line,
       the others drift a little ahead of or behind it */
    var FLOAT_RATE = [0.9, 1.0, 1.1, 0.95];
    var FLOAT_SHIFT_CAP = 60;

    var floatRaf = null;
    var floatLast = 0;

    function floatFrame(now) {
      floatRaf = requestAnimationFrame(floatFrame);

      if (now - floatLast < FLOAT_FRAME) {
        return;
      }

      floatLast = now;

      var viewH = window.innerHeight;
      var box = contentSection.getBoundingClientRect();

      /* Off screen and out of mind — no reads, no writes */
      if (box.bottom < -200 || box.top > viewH + 200) {
        return;
      }

      var fromCentre = (box.top + box.height / 2) - viewH / 2;

      for (var i = 0; i < floaters.length; i++) {
        var slot = i % FLOAT_PERIOD.length;

        var drift = Math.sin(
          (now / FLOAT_PERIOD[slot]) * FLOAT_TAU + FLOAT_PHASE[slot]
        ) * FLOAT_AMP[slot];

        /* A rate of 1.0 means no extra offset — that card holds the
           line the others drift ahead of or behind */
        var shift = fromCentre * (FLOAT_RATE[slot] - 1);

        if (shift > FLOAT_SHIFT_CAP) { shift = FLOAT_SHIFT_CAP; }
        if (shift < -FLOAT_SHIFT_CAP) { shift = -FLOAT_SHIFT_CAP; }

        floaters[i].style.transform =
          'translate3d(0, ' + (drift + shift).toFixed(2) + 'px, 0)';
      }
    }

    function startFloat() {
      if (floatRaf === null) {
        floatLast = 0;
        floatRaf = requestAnimationFrame(floatFrame);
      }
    }

    function stopFloat() {
      if (floatRaf !== null) {
        cancelAnimationFrame(floatRaf);
        floatRaf = null;
      }

      /* Clears any offset the loop had written, so resizing down to the
         deck never leaves a stale float transform sitting on top of it —
         .video__float and .video__card are different elements, but the
         float's offset would still visibly nudge the deck card it wraps */
      for (var f = 0; f < floaters.length; f++) {
        floaters[f].style.transform = '';
      }
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden || !videosWide.matches) {
        stopFloat();
      } else {
        startFloat();
      }
    });

    /* Starts and stops live if a resize crosses the 900px breakpoint */
    window.addEventListener('resize', function () {
      if (videosWide.matches && !document.hidden) {
        startFloat();
      } else {
        stopFloat();
      }
    });

    if (videosWide.matches) {
      startFloat();
    }
  }

  /* ------------------------------------------------------------------
     Contact — touch response

     The magnetic pull below needs a cursor to reach for, so on a touch
     screen the two links answer to the finger instead: a press scales
     them slightly and sends a ripple out from under the text. The look
     of both lives in style.css behind (hover: none) — all this does is
     put the classes on and take them off again.
     ------------------------------------------------------------------ */

  var touchLinks = document.querySelectorAll(
    '.contact__email, .contact__phone, .contact__linkedin'
  );

  /* How long the pressed state is held before it is allowed to ease
     back, counted from the moment of contact */
  var TAP_HOLD = 200;

  /* No reduced-motion gate. This is the only feedback a touch device
     gets that a tap landed — desktop has hover and the magnetic pull
     instead — so removing it leaves the link feeling broken rather than
     calm. The motion is a response to a deliberate action, not ambient,
     which is the distinction the setting is actually drawing. */
  if (touchLinks.length && !hoverCapable.matches) {
    for (var tl = 0; tl < touchLinks.length; tl++) {
      (function (link) {
        var tapAt = 0;
        var tapTimer = null;

        link.addEventListener('touchstart', function () {
          tapAt = Date.now();

          if (tapTimer) {
            clearTimeout(tapTimer);
            tapTimer = null;
          }

          link.classList.add('is-tapped');

          /* Re-adding the class alone will not replay an animation that
             has already run once. Dropping it, reading a layout property
             to force the style change to be applied, then adding it back
             is what restarts the ripple on every tap. */
          link.classList.remove('is-rippling');
          void link.offsetWidth;
          link.classList.add('is-rippling');
        }, { passive: true });

        function releaseTap() {
          /* A tap is usually over in well under a tenth of a second, so
             releasing on touchend alone would put the class on and take
             it off again inside a frame or two and nothing would ever be
             seen. Holding out the remainder of TAP_HOLD is what turns it
             into a deliberate press rather than a flicker. */
          var elapsed = Date.now() - tapAt;
          var wait = TAP_HOLD - elapsed;

          if (wait < 0) {
            wait = 0;
          }

          if (tapTimer) {
            clearTimeout(tapTimer);
          }

          tapTimer = setTimeout(function () {
            tapTimer = null;
            link.classList.remove('is-tapped');
          }, wait);
        }

        link.addEventListener('touchend', releaseTap, { passive: true });
        link.addEventListener('touchcancel', releaseTap, { passive: true });

        /* Cleared once the ripple has finished so the next tap starts
           from nothing rather than from a spent animation */
        link.addEventListener('animationend', function (event) {
          if (event.animationName === 'contact-ripple') {
            link.classList.remove('is-rippling');
          }
        });
      })(touchLinks[tl]);
    }
  }

  /* ------------------------------------------------------------------
     Contact — magnetic links

     A spring integrated per frame, not a CSS transition. Each element
     carries a position and a velocity; every frame the velocity is
     pushed toward the offset the cursor is asking for and then damped,
     which is what gives the movement weight — it arrives with a little
     overshoot and settles, rather than sliding along a fixed curve.

     The two halves are tuned differently on purpose: reaching for the
     cursor is stiff and lightly damped, so it snaps; returning is soft
     and heavily damped, so it eases home without bouncing.

     Gated on hover capability — exactly the query the stylesheet uses
     for the same links — so a touch device gets plain links.
     ------------------------------------------------------------------ */

  var magnets = document.querySelectorAll('[data-magnetic]');

  if (magnets.length && hoverCapable.matches && !reducedMotion.matches) {
    var MAGNET_RADIUS = 80;
    var MAGNET_STRENGTH = 10;

    /* Reaching out: stiff spring, light damping — fast, with a touch of
       overshoot as it arrives. Coming back: softer and heavily damped,
       so it glides home instead of springing past the resting point. */
    var PULL_STIFFNESS = 0.28;
    var PULL_DAMPING = 0.60;
    /* Near critical damping. A springier return rebounded ~20% past the
       resting point on the way back, which reads as a wobble rather than
       as the text settling — the pull is where the elasticity belongs. */
    var BACK_STIFFNESS = 0.09;
    var BACK_DAMPING = 0.86;

    /* Below this, movement is no longer worth a frame */
    var MAGNET_REST = 0.05;

    /* How far toward the cursor a link may travel, as a fraction of the
       distance to it. Short of 1 so it always stops just before the
       pointer rather than landing on top of it or shooting past. */
    var MAGNET_CHASE_LIMIT = 0.85;

    /* Displacement past which a link counts as having left its own patch
       and may be sitting on top of a neighbour */
    var MAGNET_STRAY = 8;

    /* data-magnet-radius takes plain pixels, or a vw/vh value for a
       reach that should scale with the window rather than being pinned
       to one screen size. The contact links use vw so "about half the
       page" stays about half the page on any display. */
    function magnetRadiusOf(node) {
      var raw = (node.getAttribute('data-magnet-radius') || '').trim();
      var value = parseFloat(raw);

      if (isNaN(value)) {
        return MAGNET_RADIUS;
      }

      if (/vw$/i.test(raw)) {
        return window.innerWidth * value / 100;
      }

      if (/vh$/i.test(raw)) {
        return window.innerHeight * value / 100;
      }

      return value;
    }

    var magnetSpecs = [];

    for (var mi = 0; mi < magnets.length; mi++) {
      var mNode = magnets[mi];

      magnetSpecs.push({
        el: mNode,
        radius: magnetRadiusOf(mNode),
        strength: parseFloat(mNode.getAttribute('data-magnet-strength')) || MAGNET_STRENGTH,
        /* Optional ceiling on vertical travel, in pixels. Sideways is
           where the reaching reads anyway; up and down is the axis on
           which stacked links collide, so the two contact links cap it
           to less than half the gap between them and can never meet.
           0 means uncapped. */
        maxY: parseFloat(mNode.getAttribute('data-magnet-max-y')) || 0,
        /* Where it is, and how fast it is going */
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        /* Last value written to --magnet-near, so the custom property is
           only touched when it actually changes */
        near: -1
      });
    }

    var magnetX = -99999;
    var magnetY = -99999;
    var magnetPointerIn = false;
    var magnetRaf = null;

    function magnetFrame() {
      var awake = false;
      /* Which link the cursor is actually aiming at, and how far it is
         from it. Settled after the loop below — see the pass that hands
         out pointer-events. */
      var aimedAt = -1;
      var closestEdge = Infinity;

      for (var i = 0; i < magnetSpecs.length; i++) {
        var spec = magnetSpecs[i];
        var el = spec.el;
        var rect = el.getBoundingClientRect();

        /* getBoundingClientRect reports the element where it currently
           sits, offset and all. Subtracting the offset back out recovers
           where it actually lives, so the pull is always measured from a
           fixed point and can never chase its own tail into a wobble. */
        var midX = rect.left + rect.width / 2 - spec.x;
        var midY = rect.top + rect.height / 2 - spec.y;
        var halfW = rect.width / 2;
        var halfH = rect.height / 2;

        var targetX = 0;
        var targetY = 0;
        var closeness = 0;
        var edgeDist = Infinity;

        if (magnetPointerIn) {
          /* Distance to the nearest point on the element rather than to
             its centre — the email runs a few hundred pixels wide, and
             measuring from the centre would leave its ends unresponsive */
          var nearX = Math.min(Math.max(magnetX, midX - halfW), midX + halfW);
          var nearY = Math.min(Math.max(magnetY, midY - halfH), midY + halfH);
          var edgeX = magnetX - nearX;
          var edgeY = magnetY - nearY;
          edgeDist = Math.sqrt(edgeX * edgeX + edgeY * edgeY);

          if (edgeDist < spec.radius) {
            closeness = 1 - edgeDist / spec.radius;

            /* Tracks both axes: the offset points at wherever the cursor
               actually is, not just left/right along the text */
            var dx = magnetX - midX;
            var dy = magnetY - midY;
            var dist = Math.sqrt(dx * dx + dy * dy) || 1;

            /* Capped at most of the way to the cursor rather than the
               raw strength. Travel this large would otherwise overshoot
               the pointer whenever it came close, and the text would sit
               shuddering around it instead of coming to rest under it —
               this way it always stops just short and settles. */
            var pull = Math.min(closeness * spec.strength, dist * MAGNET_CHASE_LIMIT);

            targetX = (dx / dist) * pull;
            targetY = (dy / dist) * pull;

            /* Sideways travel stays as long as it likes; vertical is
               clamped, so a link can lean hard toward the cursor without
               ever climbing into the one stacked above or below it */
            if (spec.maxY) {
              if (targetY > spec.maxY) { targetY = spec.maxY; }
              if (targetY < -spec.maxY) { targetY = -spec.maxY; }
            }
          }
        }

        var engaged = closeness > 0;
        var stiffness = engaged ? PULL_STIFFNESS : BACK_STIFFNESS;
        var damping = engaged ? PULL_DAMPING : BACK_DAMPING;

        spec.vx = (spec.vx + (targetX - spec.x) * stiffness) * damping;
        spec.vy = (spec.vy + (targetY - spec.y) * stiffness) * damping;
        spec.x += spec.vx;
        spec.y += spec.vy;

        var settled = !engaged &&
          Math.abs(spec.x) < MAGNET_REST && Math.abs(spec.y) < MAGNET_REST &&
          Math.abs(spec.vx) < MAGNET_REST && Math.abs(spec.vy) < MAGNET_REST;

        if (settled) {
          spec.x = 0;
          spec.y = 0;
          spec.vx = 0;
          spec.vy = 0;
          el.style.transform = '';
        } else {
          el.style.transform =
            'translate(' + spec.x.toFixed(2) + 'px, ' + spec.y.toFixed(2) + 'px)';
          awake = true;
        }

        /* Drives the underline stretch and the brightening in the
           stylesheet. Rounded, so a value is only written when it has
           moved enough to be worth a style recalculation. */
        var rounded = Math.round(closeness * 100) / 100;

        if (rounded !== spec.near) {
          spec.near = rounded;
          el.style.setProperty('--magnet-near', rounded);
        }

        if (engaged) {
          awake = true;
        }

        /* Aim is judged against where the link has been pulled to, not
           where it lives. The physics above deliberately works from the
           home position so the pull cannot chase its own tail — but a
           person points at what is actually on the screen in front of
           them, so the two questions need different geometry.

           <= rather than <, so when the cursor sits inside two
           overlapping links (both at distance 0) the later one wins,
           matching the one the browser paints on top. */
        if (magnetPointerIn) {
          var seenX = Math.min(Math.max(magnetX, rect.left), rect.right);
          var seenY = Math.min(Math.max(magnetY, rect.top), rect.bottom);
          var seenDx = magnetX - seenX;
          var seenDy = magnetY - seenY;
          var seenEdge = Math.sqrt(seenDx * seenDx + seenDy * seenDy);

          if (seenEdge <= closestEdge) {
            closestEdge = seenEdge;
            aimedAt = i;
          }
        }
      }

      /* A link that has wandered a long way from home is sitting over
         ground that belongs to something else. The email is 883px wide
         and travels far enough to cover the phone completely, so a click
         aimed at the phone but a few pixels off would land on the email
         and open a mail client instead. Whichever link the cursor is
         actually nearest keeps its clicks; any other one that has strayed
         stops intercepting them until it comes home. */
      for (var w = 0; w < magnetSpecs.length; w++) {
        var other = magnetSpecs[w];
        var strayed = Math.abs(other.x) > MAGNET_STRAY ||
                      Math.abs(other.y) > MAGNET_STRAY;

        other.el.style.pointerEvents = (strayed && w !== aimedAt) ? 'none' : '';
      }

      /* Idle until something moves again, rather than burning a frame
         forever on elements that are all sitting still */
      magnetRaf = awake ? requestAnimationFrame(magnetFrame) : null;
    }

    function wakeMagnets() {
      if (magnetRaf === null) {
        magnetRaf = requestAnimationFrame(magnetFrame);
      }
    }

    document.addEventListener('mousemove', function (e) {
      magnetX = e.clientX;
      magnetY = e.clientY;
      magnetPointerIn = true;
      wakeMagnets();
    }, { passive: true });

    /* The cursor can leave the window without firing another mousemove —
       without these, a link caught mid-pull would stay pulled */
    document.addEventListener('mouseleave', function () {
      magnetPointerIn = false;
      wakeMagnets();
    });

    window.addEventListener('blur', function () {
      magnetPointerIn = false;
      wakeMagnets();
    });

    /* The page can move under a perfectly still cursor, which changes
       the distance to every one of these without a mousemove firing */
    window.addEventListener('scroll', wakeMagnets, { passive: true });

    /* A viewport-relative reach has to be recalculated when the viewport
       itself changes, or it would stay sized to the window as it was on
       load */
    window.addEventListener('resize', function () {
      for (var rr = 0; rr < magnetSpecs.length; rr++) {
        magnetSpecs[rr].radius = magnetRadiusOf(magnetSpecs[rr].el);
      }

      wakeMagnets();
    });
  }

  /* ------------------------------------------------------------------
     Atmosphere — background particles, sparkle trail, and the custom
     cursor, all sharing one canvas

     Particles: 50 desktop / 20 under 768px, mixed violet and amber,
     drifting slowly and wrapping at the edges. On a fine pointer, ones
     within 150px of the cursor nudge away and brighten; on touch,
     scroll velocity nudges all of them instead.

     Sparkles: emitted on cursor movement, proportional to speed, capped
     at 40 live at once, each drifting outward, shrinking and fading
     over 700ms.

     Cursor: two small DOM elements (dot, ring) with independent lerp
     speeds, so the ring visibly trails the dot; the ring grows over
     links, buttons, video cards and work cards. A separate glow div
     tracks the raw cursor position with no lag.

     The whole block is skipped under reduced motion — no draw loop, no
     cursor elements ever gain .is-active, and the reduced-motion block
     in style.css restores the native cursor and hides them outright.
     ------------------------------------------------------------------ */

  var bgCanvas = document.getElementById('bg-canvas');

  if (bgCanvas && bgCanvas.getContext && !reducedMotion.matches) {
    var atmosCtx = bgCanvas.getContext('2d');
    var mobileParticles = window.matchMedia('(max-width: 768px)');
    var atmosDpr = Math.min(window.devicePixelRatio || 1, 2);

    /* 30fps on desktop. Under 768px the cap drops to 24 — the GPU is
       weaker and the canvas is competing with the page's own scroll
       compositing, and at this particle count and drift speed 24 is
       still smooth to the eye. */
    function atmosFrameBudget() {
      return mobileParticles.matches ? 1000 / 24 : 1000 / 30;
    }

    var atmosLastFrame = 0;
    var atmosRaf = null;

    /* Observed interval between rAF callbacks, smoothed. Used only to
       tell a 60Hz screen from a 120Hz one — see the parity skip in
       atmosFrame. */
    var rafInterval = 16.7;
    var rafPrev = 0;
    var atmosParity = 0;

    var canvasW = 0;
    var canvasH = 0;

    var PARTICLE_RGB = ['139, 92, 246', '245, 166, 35'];
    var particles = [];

    var pointerX = -9999;
    var pointerY = -9999;
    var pointerActive = false;

    var lastScrollY = window.scrollY;
    var scrollImpulse = 0;

    var sparkles = [];
    var SPARKLE_CAP = 40;
    var SPARKLE_LIFE = 700;

    function particleTarget() {
      return mobileParticles.matches ? 15 : 50;
    }

    function makeParticle() {
      return {
        x: Math.random() * canvasW,
        y: Math.random() * canvasH,
        r: 1.2 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        /* Still low, per the brief — but the old 0.06 floor was so far
           under the near-black background that the cursor reaction was
           happening and simply couldn't be seen */
        alpha: 0.10 + Math.random() * 0.14,
        rgb: PARTICLE_RGB[Math.random() < 0.5 ? 0 : 1]
      };
    }

    function seedParticles() {
      var target = particleTarget();
      particles = [];

      for (var pi = 0; pi < target; pi++) {
        particles.push(makeParticle());
      }
    }

    function resizeAtmosCanvas() {
      canvasW = window.innerWidth;
      canvasH = window.innerHeight;
      bgCanvas.width = canvasW * atmosDpr;
      bgCanvas.height = canvasH * atmosDpr;
      bgCanvas.style.width = canvasW + 'px';
      bgCanvas.style.height = canvasH + 'px';
      atmosCtx.setTransform(atmosDpr, 0, 0, atmosDpr, 0, 0);
    }

    resizeAtmosCanvas();
    seedParticles();

    window.addEventListener('resize', function () {
      resizeAtmosCanvas();

      if (particles.length !== particleTarget()) {
        seedParticles();
      }
    });

    /* ---- pointer tracking, for both the repulsion below and the
       cursor further down ---- */

    if (hoverCapable.matches) {
      document.addEventListener('mousemove', function (e) {
        pointerX = e.clientX;
        pointerY = e.clientY;
        pointerActive = true;
      }, { passive: true });

      document.addEventListener('mouseleave', function () {
        pointerActive = false;
      });
    }

    /* ---- scroll velocity, mobile only ---- */

    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      scrollImpulse += (y - lastScrollY) * 0.04;
      lastScrollY = y;
    }, { passive: true });

    /* ---- sparkle emission, proportional to cursor speed ---- */

    if (hoverCapable.matches) {
      var sparkleLastX = null;
      var sparkleLastY = null;

      document.addEventListener('mousemove', function (e) {
        if (sparkleLastX === null) {
          sparkleLastX = e.clientX;
          sparkleLastY = e.clientY;
          return;
        }

        var dx = e.clientX - sparkleLastX;
        var dy = e.clientY - sparkleLastY;
        var speed = Math.sqrt(dx * dx + dy * dy);

        sparkleLastX = e.clientX;
        sparkleLastY = e.clientY;

        /* No sparkle trail at all under 768px — this is a width check,
           deliberately separate from hoverCapable above, since a narrow
           hover-capable device (a touchscreen laptop window resized
           down, say) should still lose the trail at this width */
        if (mobileParticles.matches) {
          return;
        }

        var toEmit = Math.min(Math.floor(speed / 8), 3);

        for (var se = 0; se < toEmit && sparkles.length < SPARKLE_CAP; se++) {
          var angle = Math.random() * Math.PI * 2;
          var force = 0.3 + Math.random() * 0.6;

          sparkles.push({
            x: e.clientX,
            y: e.clientY,
            vx: Math.cos(angle) * force,
            vy: Math.sin(angle) * force,
            born: performance.now(),
            r: 1 + Math.random() * 1.5,
            rgb: PARTICLE_RGB[Math.random() < 0.5 ? 0 : 1]
          });
        }
      }, { passive: true });
    }

    /* ---- draw loop — background particles, then sparkles, same canvas ---- */

    function atmosFrame(now) {
      atmosRaf = requestAnimationFrame(atmosFrame);

      if (rafPrev) {
        var rafDelta = now - rafPrev;

        /* Ignore the huge gap after a backgrounded tab resumes */
        if (rafDelta > 0 && rafDelta < 100) {
          rafInterval += (rafDelta - rafInterval) * 0.1;
        }
      }

      rafPrev = now;

      /* Render every other frame — but only on a high-refresh phone.
         On a 120Hz screen rAF fires twice as often as the 24fps budget
         below can ever admit, so dropping half the callbacks costs
         nothing visible and halves the work done per second.
         On an ordinary 60Hz screen this is deliberately skipped: the
         24fps budget already admits roughly every third frame there,
         and an unconditional parity skip on top of it would compound
         to 15fps, which reads as stutter rather than as economy. */
      if (mobileParticles.matches && rafInterval < 11) {
        atmosParity ^= 1;

        if (atmosParity) {
          return;
        }
      }

      if (now - atmosLastFrame < atmosFrameBudget()) {
        return;
      }

      atmosLastFrame = now;

      atmosCtx.clearRect(0, 0, canvasW, canvasH);

      var isMobile = mobileParticles.matches;

      /* Decays every frame regardless of whether a new scroll event
         landed this frame, so one fast flick settles back to nothing
         rather than leaving every particle nudged forever */
      scrollImpulse *= 0.9;

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (isMobile) {
          p.y += scrollImpulse;
        }

        /* Wrap at the edges, with a little slack so nothing pops in
           visibly right at the boundary */
        if (p.x < -10) { p.x = canvasW + 10; }
        if (p.x > canvasW + 10) { p.x = -10; }
        if (p.y < -10) { p.y = canvasH + 10; }
        if (p.y > canvasH + 10) { p.y = -10; }

        var drawAlpha = p.alpha;

        if (!isMobile && pointerActive) {
          var dx = p.x - pointerX;
          var dy = p.y - pointerY;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 0 && dist < 150) {
            /* Both the drift and the brightening are stronger than they
               were — the effect reads as a reaction now rather than as
               a couple of pixels moving somewhere off in the dark */
            var push = (1 - dist / 150) * 1.8;
            p.x += (dx / dist) * push;
            p.y += (dy / dist) * push;
            drawAlpha = Math.min(p.alpha * 4, 0.75);
          }
        }

        atmosCtx.beginPath();
        atmosCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        atmosCtx.fillStyle = 'rgba(' + p.rgb + ', ' + drawAlpha + ')';
        atmosCtx.fill();
      }

      for (var j = sparkles.length - 1; j >= 0; j--) {
        var sp = sparkles[j];
        var age = now - sp.born;

        if (age >= SPARKLE_LIFE) {
          sparkles.splice(j, 1);
          continue;
        }

        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.96;
        sp.vy *= 0.96;

        var progress = age / SPARKLE_LIFE;
        var sparkleAlpha = 0.5 * (1 - progress);
        var sparkleR = Math.max(sp.r * (1 - progress * 0.6), 0.2);

        atmosCtx.beginPath();
        atmosCtx.arc(sp.x, sp.y, sparkleR, 0, Math.PI * 2);
        atmosCtx.fillStyle = 'rgba(' + sp.rgb + ', ' + sparkleAlpha + ')';
        atmosCtx.fill();
      }
    }

    function startAtmosphere() {
      if (atmosRaf === null) {
        atmosLastFrame = 0;
        /* Dropped too, so the first frame after a hidden tab resumes
           doesn't feed a multi-second gap into the interval average */
        rafPrev = 0;
        atmosRaf = requestAnimationFrame(atmosFrame);
      }
    }

    function stopAtmosphere() {
      if (atmosRaf !== null) {
        cancelAnimationFrame(atmosRaf);
        atmosRaf = null;
      }
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        stopAtmosphere();
      } else {
        startAtmosphere();
      }
    });

    startAtmosphere();

    /* ---- custom cursor: dot, ring, glow — desktop only ---- */

    if (hoverCapable.matches) {
      var cursorDot = document.getElementById('cursor-dot');
      var cursorRing = document.getElementById('cursor-ring');
      var cursorGlow = document.getElementById('cursor-glow');

      if (cursorDot && cursorRing && cursorGlow) {
        var cursorActive = false;
        var dotX = 0, dotY = 0;
        var ringX = 0, ringY = 0;
        var cursorTargetX = 0, cursorTargetY = 0;
        var CURSOR_IDLE_DELAY = 500;
        var cursorIdleTimer = null;

        function showCursor() {
          cursorDot.classList.add('is-active');
          cursorRing.classList.add('is-active');
          cursorGlow.classList.add('is-active');
        }

        /* Hidden again after half a second with no movement, rather
           than left parked wherever the mouse happened to stop — a
           dot sitting still in empty space (say, between the Contact
           subtitle and the email link) read as a stray leftover mark,
           not a cursor */
        function hideCursor() {
          cursorDot.classList.remove('is-active');
          cursorRing.classList.remove('is-active');
          cursorGlow.classList.remove('is-active');
        }

        document.addEventListener('mousemove', function (e) {
          cursorTargetX = e.clientX;
          cursorTargetY = e.clientY;

          /* First real position we have — snap straight there instead
             of lerping in from the 0,0 default */
          if (!cursorActive) {
            cursorActive = true;
            dotX = cursorTargetX;
            dotY = cursorTargetY;
            ringX = cursorTargetX;
            ringY = cursorTargetY;
          }

          showCursor();

          if (cursorIdleTimer) {
            clearTimeout(cursorIdleTimer);
          }

          cursorIdleTimer = setTimeout(hideCursor, CURSOR_IDLE_DELAY);
        }, { passive: true });

        var CURSOR_GROW_SELECTOR = 'a, button, .video__card, .card';

        document.addEventListener('mouseover', function (e) {
          if (e.target.closest && e.target.closest(CURSOR_GROW_SELECTOR)) {
            cursorRing.classList.add('is-hovering');
          }
        });

        document.addEventListener('mouseout', function (e) {
          if (e.target.closest && e.target.closest(CURSOR_GROW_SELECTOR)) {
            cursorRing.classList.remove('is-hovering');
          }
        });

        function cursorFrame() {
          requestAnimationFrame(cursorFrame);

          if (!cursorActive) {
            return;
          }

          /* The dot catches up quickly; the ring trails further behind
             it, which is what reads as one following the other rather
             than two dots moving in lockstep */
          dotX += (cursorTargetX - dotX) * 0.35;
          dotY += (cursorTargetY - dotY) * 0.35;
          ringX += (cursorTargetX - ringX) * 0.15;
          ringY += (cursorTargetY - ringY) * 0.15;

          cursorDot.style.transform = 'translate3d(' + dotX + 'px, ' + dotY + 'px, 0)';
          cursorRing.style.transform = 'translate3d(' + ringX + 'px, ' + ringY + 'px, 0)';
          cursorGlow.style.transform =
            'translate3d(' + cursorTargetX + 'px, ' + cursorTargetY + 'px, 0)';
        }

        requestAnimationFrame(cursorFrame);
      }
    }
  }

  /* ------------------------------------------------------------------
     Footer — current year, computed rather than typed in so it never
     goes stale
     ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------
     Certificate lightbox

     The links point at the image files, so with JavaScript off a tap
     still opens the certificate — this only upgrades that to an overlay.
     Not gated on reduced motion: opening and closing a viewer is
     functional, and the overlay does not animate anyway.
     ------------------------------------------------------------------ */

  var certLinks = document.querySelectorAll('[data-cert]');
  var certBox = document.getElementById('certbox');
  var certImg = document.getElementById('certbox-img');
  var certClose = document.getElementById('certbox-close');

  if (certLinks.length && certBox && certImg && certClose) {
    var certOpener = null;

    function openCert(link) {
      var full = link.querySelector('img');

      certImg.src = link.getAttribute('href');
      /* The thumbnail already describes the certificate, so the overlay
         reuses it rather than inventing a second wording */
      certImg.alt = full ? full.getAttribute('alt') : '';

      certOpener = link;
      certBox.hidden = false;
      document.body.classList.add('is-locked');
      certClose.focus();
    }

    function closeCert() {
      certBox.hidden = true;
      /* Dropped so a large scan is not held in memory, and so reopening
         cannot flash the previous certificate for a frame */
      certImg.src = '';
      document.body.classList.remove('is-locked');

      if (certOpener) {
        certOpener.focus();
        certOpener = null;
      }
    }

    for (var ci = 0; ci < certLinks.length; ci++) {
      (function (link) {
        link.addEventListener('click', function (event) {
          /* Anything asking for a new tab or window is left alone */
          if (event.metaKey || event.ctrlKey || event.shiftKey ||
              event.altKey || event.button !== 0) {
            return;
          }

          event.preventDefault();
          openCert(link);
        });
      }(certLinks[ci]));
    }

    certClose.addEventListener('click', closeCert);

    /* A tap on the backdrop, but not on the image itself */
    certBox.addEventListener('click', function (event) {
      if (event.target === certBox) {
        closeCert();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !certBox.hidden) {
        closeCert();
      }
    });
  }

  var footerYear = document.getElementById('footer-year');

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

})();
