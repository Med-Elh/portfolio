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

  /* ------------------------------------------------------------------
     STEP 10 - theme

     First, because the rest of the file reads the theme (the particle
     field picks its colours from it) and because the toggle should work
     from the first frame a visitor can reach it.

     The attribute on <html> is already correct by the time this runs: the
     inline block in <head> set it before the stylesheet was requested,
     which is what stops the page flashing light before it turns dark.
     What is left here is the button, the saving, and keeping the page in
     step with the system setting for anyone who has not chosen yet.
     ------------------------------------------------------------------ */

  /* Filled in by the atmosphere block far below, which is inside an `if`
     and therefore cannot expose a function declaration to this scope in
     strict mode. Null until then, and null forever on a device that never
     starts the canvas at all, which is why every call site checks. */
  var applyParticleTheme = null;

  var root = document.documentElement;
  var themeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  var themeToggles = document.querySelectorAll('[data-theme-toggle]');
  var themeTimer = null;

  /* Whether the visitor has made a choice, as opposed to being shown the
     system's. Read once: after the first toggle it is true for good. */
  var themeChosen = false;

  try {
    var saved = localStorage.getItem('theme');
    themeChosen = saved === 'dark' || saved === 'light';
  } catch (err) {
    /* Storage can throw outright, not just return null, in a locked-down
       browser. Nothing breaks: the page follows the system setting and
       the toggle still works for the length of the visit. */
    themeChosen = false;
  }

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  /* The button always offers the other one, so its label is the opposite
     of what is on screen */
  function labelThemeToggles(theme) {
    var label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

    for (var i = 0; i < themeToggles.length; i++) {
      themeToggles[i].setAttribute('aria-label', label);
      themeToggles[i].setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
  }

  function applyTheme(theme, animate) {
    if (animate) {
      /* On for the length of the crossfade and then off again, so no
         element on the page is left carrying a transition it did not ask
         for. See the .is-theming block in style.css. */
      root.classList.add('is-theming');

      if (themeTimer) { clearTimeout(themeTimer); }

      themeTimer = setTimeout(function () {
        themeTimer = null;
        root.classList.remove('is-theming');
      }, 320);
    }

    root.setAttribute('data-theme', theme);
    labelThemeToggles(theme);

    /* The canvas is painted, not styled, so it cannot inherit any of
       this. It is told. */
    if (applyParticleTheme) { applyParticleTheme(); }
  }

  labelThemeToggles(currentTheme());

  for (var tg = 0; tg < themeToggles.length; tg++) {
    themeToggles[tg].addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';

      themeChosen = true;

      try {
        localStorage.setItem('theme', next);
      } catch (err) {
        /* Same as above: the choice holds for this visit and is forgotten
           on the next one, which beats the button not working at all. */
      }

      applyTheme(next, true);
    });
  }

  /* The system setting no longer drives anything. The site opens dark on
     a first visit whatever the device says, so following that setting
     mid-visit would move the page out from under someone who never asked
     for it. themeQuery is kept only so the media query object still
     exists for anything that reads it. */

  /* ------------------------------------------------------------------
     STEP 11 - the phone intro

     Two jobs: hold the hero back until it can be measured, then play it.

     THE HOLD. The inline block in <head> put .is-loading on <html> and
     armed a 1600ms fallback of its own, so a failure in this file cannot
     leave the page covered. This does the proper version: uncover once
     the fonts are in AND the portrait has decoded, because both of those
     move the hero's layout and an intro that plays against reflowing text
     is the thing it was added to replace.

     THE SPLIT. The wordmark's letters are wrapped one at a time so they
     can rise out of a clip box. That happens ONLY below 900px and only
     once: on desktop the wordmark is the element the hero-to-sidebar FLIP
     measures and morphs, and inline-block letters do not carry the same
     text metrics as a plain run, which would put that landing off. The
     desktop markup stays exactly as it was.

     Everything here is written to the iOS rules in CLAUDE.md: var only,
     no optional chaining, no nullish coalescing, no template literals,
     rAF rather than timers for anything that paints.
     ------------------------------------------------------------------ */

  var miMobile = window.matchMedia('(max-width: 899px)');
  var miDone = false;

  function miSplitWordmark() {
    var word = document.getElementById('hx-word');

    if (!word || word.getAttribute('data-mi-split') === '1') { return; }

    var linesList = word.querySelectorAll('.hx__ln');
    var total = 0;

    for (var l = 0; l < linesList.length; l++) {
      var line = linesList[l];
      var text = line.textContent;
      var frag = document.createDocumentFragment();

      for (var c = 0; c < text.length; c++) {
        /* Each letter is its own clip box with the glyph inside it. A
           single overflow:hidden on the LINE would clip sideways too, and
           at -0.02em tracking the outer letters sit right on that edge. */
        var clip = document.createElement('span');
        clip.className = 'mi__letter';
        clip.style.animationDelay = (total * 30) + 'ms';

        var glyph = document.createElement('i');
        glyph.textContent = text.charAt(c);

        clip.appendChild(glyph);
        frag.appendChild(clip);
        total++;
      }

      line.textContent = '';
      line.appendChild(frag);
    }

    word.setAttribute('data-mi-split', '1');
  }

  function miStart() {
    if (miDone) { return; }
    miDone = true;

    if (miMobile.matches) { miSplitWordmark(); }

    document.documentElement.classList.remove('is-loading');

    /* Next frame, so the uncovering and the first animation frame are not
       the same paint. Released together, the browser coalesces them and
       the intro starts already part-way through. */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.documentElement.classList.add('is-intro');

        /* The intro's animations are filled, so they own transform,
           opacity and filter for good and any inline write is ignored
           while they are on. Dropping them once the run is over is what
           lets the scroll parallax take over. 2100ms is the last beat
           (the top bar at 1600 plus its 380) with a margin. */
        window.setTimeout(function () {
          document.documentElement.classList.add('is-settled');
        }, 2100);
      });
    });
  }

  /* The safety net. 1500ms as briefed, and deliberately shorter than the
     inline fallback so this is normally the one that fires. */
  var miTimer = window.setTimeout(miStart, 1500);

  function miReady() {
    var waits = [];

    if (document.fonts && document.fonts.ready) {
      waits.push(document.fonts.ready);
    }

    var portrait = document.getElementById('hx-portrait');

    if (portrait) {
      if (portrait.decode) {
        /* decode() rejects on a broken image, and a broken portrait is no
           reason to keep the hero hidden */
        waits.push(portrait.decode().catch(function () { return null; }));
      } else if (!portrait.complete) {
        waits.push(new Promise(function (resolve) {
          portrait.addEventListener('load', resolve);
          portrait.addEventListener('error', resolve);
        }));
      }
    }

    if (!waits.length || !window.Promise) { return; }

    Promise.all(waits).then(function () {
      window.clearTimeout(miTimer);
      miStart();
    });
  }

  miReady();

  /* Once per page load. A theme toggle or a resize crossing 900px must
     not replay it, which is why miDone is checked rather than the class:
     the class is what CSS animates from and re-adding it would restart
     every keyframe. */

  /* ------------------------------------------------------------------
     STEP 13 - the phone's hero parallax

     Everything in the hero is carried out of the way on scroll, at
     different rates, so the layers come apart instead of sliding off as
     one picture. The portrait lags the page, the name outruns it, and
     the copy leaves first.

     Read from scrollY on a rAF rather than played on a timer, which is
     what makes it exact in both directions: scrolling back up runs it
     backwards through the same numbers rather than replaying an
     animation in reverse.

     transform and opacity only, plus a blur on the portrait. Nothing here
     can move the layout: the hero is a fixed height and every element
     keeps its box. -------------------------------------------------- */

  var hxPortrait = document.getElementById('hx-portrait');
  var hxWord = document.getElementById('hx-word');
  var hxLead = document.getElementById('hx-lead');
  var hxHero = document.querySelector('.hx');

  if (hxPortrait && hxHero) {
    var hxTicking = false;
    var hxOn = false;

    /* The shadow has to be repeated in every filter this writes, for the
       same reason the keyframes carry it: whatever sets `filter` last
       owns the whole property. */
    var HX_SHADOW = 'drop-shadow(0 12px 28px var(--shadow-2))';

    function hxClamp(v) { return v < 0 ? 0 : (v > 1 ? 1 : v); }

    function hxClear(el) {
      if (!el) { return; }
      el.style.transform = '';
      el.style.opacity = '';
      el.style.filter = '';
    }

    function hxDraw() {
      hxTicking = false;

      /* Desktop has the morph, which owns these same properties. The two
         must never both be writing. */
      if (!miMobile.matches) {
        if (hxOn) {
          hxOn = false;
          hxClear(hxPortrait);
          hxClear(hxWord);
          hxClear(hxLead);
        }
        return;
      }

      hxOn = true;

      var run = hxHero.offsetHeight || window.innerHeight || 1;
      var p = hxClamp(window.scrollY / run);
      var soft = reducedMotion.matches;

      /* The intro normally hands these properties back on a timer. If the
         visitor scrolls before that timer fires, they want the parallax
         more than they want the rest of the intro, so the handover
         happens here instead. Belt and braces: whichever comes first. */
      if (p > 0.01) { document.documentElement.classList.add('is-settled'); }

      /* The copy goes first and is gone by 0.6, so the portrait is alone
         on screen for the second half of the hero rather than everything
         leaving together. */
      var leadOut = hxClamp(p / 0.6);
      /* The portrait holds its opacity until halfway, then fades out. */
      var fade = hxClamp((p - 0.5) / 0.5);

      if (soft) {
        /* Fade only: no parallax, no blur, no scale. The layers still
           leave in order, they just do not travel to do it. */
        hxPortrait.style.transform = '';
        hxPortrait.style.filter = HX_SHADOW;
        hxPortrait.style.opacity = (1 - fade).toFixed(3);

        if (hxWord) { hxWord.style.transform = ''; hxWord.style.opacity = (1 - leadOut * 0.85).toFixed(3); }
        if (hxLead) { hxLead.style.transform = ''; hxLead.style.opacity = (1 - leadOut).toFixed(3); }
        return;
      }

      /* -15% of the distance scrolled, so it lags the page by that much */
      var pShift = -(p * run * 0.15);
      var pScale = 1 + p * 0.06;

      hxPortrait.style.transform =
        'translate3d(0, ' + pShift.toFixed(1) + 'px, 0) scale(' + pScale.toFixed(4) + ')';
      hxPortrait.style.opacity = (1 - fade).toFixed(3);
      hxPortrait.style.filter = HX_SHADOW + ' blur(' + (fade * 10).toFixed(2) + 'px)';

      /* Twice the portrait's rate, so the two visibly come apart rather
         than travelling together */
      if (hxWord) {
        hxWord.style.transform = 'translate3d(0, ' + (-(p * run * 0.3)).toFixed(1) + 'px, 0)';
        hxWord.style.opacity = (1 - leadOut * 0.85).toFixed(3);
      }

      if (hxLead) {
        hxLead.style.transform = 'translate3d(0, ' + (-(leadOut * 60)).toFixed(1) + 'px, 0)';
        hxLead.style.opacity = (1 - leadOut).toFixed(3);
      }
    }

    function hxQueue() {
      if (!hxTicking) { hxTicking = true; requestAnimationFrame(hxDraw); }
    }

    window.addEventListener('scroll', hxQueue, { passive: true });
    window.addEventListener('resize', hxQueue);
    if (miMobile.addEventListener) { miMobile.addEventListener('change', hxQueue); }
    hxQueue();
  }

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
     STEP 2 — hero to sidebar, as an inverse FLIP

     There are no flying copies any more. The REAL sidebar elements do the
     travelling: each one is pushed back onto its hero counterpart at the
     start and released toward its own slot as you scroll. At the end its
     transform is exactly `none`, so it is simply sitting where it lives —
     there is nothing to hand over to and nothing that can land wrong.

     The only swap is at the very beginning. Over the first 8% the hero
     item fades out while the real sidebar item fades in on the same spot,
     which is a dissolve between two things occupying the same pixels.
     After that only the real items are on screen.

     Progress is a pure function of scrollY, so scrolling back up runs the
     exact same numbers backwards.

     Desktop only. Below 900px the sidebar is display:none and the zone has
     no extra height, so this stands down.
     ------------------------------------------------------------------ */

  var hz = document.getElementById('hz');
  var hx = document.getElementById('hero');
  var sb = document.getElementById('sb');

  if (hz && hx && sb) {
    var wide = window.matchMedia('(min-width: 900px)');

    /* Viewport heights of scroll the morph is spread over. The pin (the
       extra height on .hz) is deliberately much shorter than this: the
       sidebar is position:fixed, so its items keep animating perfectly
       well after the hero has scrolled off, and pinning for the whole run
       is what used to leave the right-hand side empty at the end. */
    /* Three quarters of a viewport of scroll, against a pin zone of 110vh.
       That pairing is what decides where Profile has got to by the time the
       morph finishes, and it has to clear one more hurdle than the eye:
       style.css dims every .section to 35% until the reading-highlight
       observer finds it crossing the 40–45% band. At RUN 0.5 the morph
       ended with Profile's top still at 60% of the viewport — on screen,
       but dimmed to a third, which is exactly the "main area is empty"
       everyone was looking at. At 0.75 it ends at about 40% and Profile is
       lit the moment the sidebar lands. */
    var RUN = 0.75;
    var SWAP = 0.08;

    var word = document.getElementById('hx-word');
    var wordIn = hx.querySelector('.hx__wordin');
    var portrait = document.getElementById('hx-portrait');
    var lead = document.getElementById('hx-lead');
    var traits = document.getElementById('hx-traits');
    var tag = document.getElementById('hx-tag');
    var desc = document.getElementById('hx-desc');

    var heroNav = [].slice.call(hx.querySelectorAll('[data-fly-nav]'));
    var heroStats = [].slice.call(hx.querySelectorAll('[data-fly-stat]'));
    var heroGo = hx.querySelector('[data-fly-btn="0"]');
    var divs = [].slice.call(hx.querySelectorAll('.hx__div'));

    var sbLogo = document.getElementById('sb-logo');
    var sbLogoIn = sb.querySelector('.sb__logoin');

    /* The colour the flying pill's text starts from: whatever --name is
       for the current theme. Cached, and only re-read when data-theme
       actually changes, so the per-frame cost is one string compare
       rather than a getComputedStyle. */
    var nameRGB = [245, 229, 0];
    var nameInk = '#111111';
    var nameSW = 0;      /* --name-sw in em, 0 in dark */
    var nameTheme = null;

    function readNameRGB() {
      var th = document.documentElement.getAttribute('data-theme');

      if (th === nameTheme) { return; }

      nameTheme = th;

      var cs = getComputedStyle(document.documentElement);
      var v = cs.getPropertyValue('--name').trim();
      var m = v.match(/^#([0-9a-fA-F]{6})$/);

      if (m) {
        nameRGB = [
          parseInt(m[1].slice(0, 2), 16),
          parseInt(m[1].slice(2, 4), 16),
          parseInt(m[1].slice(4, 6), 16)
        ];
      }

      /* The rim. Read in em and kept in em: the pill is scaled by a CSS
         transform for the whole flight, so an em-based stroke rides that
         scale for free and stays a hairline relative to the letters at
         every size on the way. A px value would have to be divided by the
         scale on every frame. */
      nameInk = cs.getPropertyValue('--name-ink').trim() || 'transparent';
      nameSW = parseFloat(cs.getPropertyValue('--name-sw')) || 0;
    }
    var sbLinks = [].slice.call(sb.querySelectorAll('[data-sb-link]'));
    var sbStats = [].slice.call(sb.querySelectorAll('.sb__stat'));
    var sbResume = document.getElementById('sb-resume');
    var sbPanels = [].slice.call(sb.querySelectorAll('.sb__panel'));
    var sbR1 = sb.querySelector('.sb__r1');
    var sbR2 = sb.querySelector('.sb__r2');

    /* Everything in the sidebar with no hero counterpart: it cannot travel
       from anywhere, so it simply arrives at the end. */
    var sbLate = [];

    ['.sb__blurb', '.sb__icon', '.sb__track',
     '.sb__addr', '.sb__copy'].forEach(function (sel) {
      var el = sb.querySelector(sel);
      if (el) { sbLate.push(el); }
    });

    /* The real sidebar elements that travel, each with the hero box it
       starts on and its own slice of the run. */
    var moves = [];
    /* The hero elements that dissolve out under them */
    var heroFade = [];

    var measured = false;
    var ticking = false;
    var running = null;

    /* A cubic ease-out, not the exponential one used elsewhere. On a
       scroll-linked animation the user IS the clock, and an exponential
       curve is 83% finished a third of the way in — the items arrived
       almost at once and then sat still for the rest of the scroll. This
       keeps them visibly moving to about two thirds of the way through and
       still settles rather than stops. */
    function easeOut(t) {
      if (t <= 0) { return 0; }
      if (t >= 1) { return 1; }
      var u = 1 - t;
      return 1 - u * u * u;
    }

    function win(p, from, to) {
      var t = (p - from) / (to - from);
      return t < 0 ? 0 : (t > 1 ? 1 : t);
    }

    function fontOf(el) {
      return parseFloat(window.getComputedStyle(el).fontSize) || 16;
    }

    /* While the hero is pinned its rect.top is 0 whatever the scroll, so a
       measurement taken mid-pin matches one taken at the very top. Once the
       pin releases the hero starts sliding up, and this puts the reading
       back where it would have been. */
    function pinShift() {
      var over = window.scrollY - (hz.offsetHeight - hx.offsetHeight);
      return over > 0 ? over : 0;
    }

    /* real  — the sidebar element that will actually be transformed
       hero  — where it has to start from
       align — the inner box of `real` that must sit on `alignTo` inside
               `hero`. Padding, chips and icons mean the element's own box
               is rarely the thing the eye is matching up.
       Scale comes from the font size for text, because a text box's width
       depends on letter-spacing and wrapping, not on its type size. */
    function pair(real, hero, from, to, opts) {
      if (!real || !hero) { return; }

      var o = opts || {};
      var align = o.align || real;
      var alignTo = o.alignTo || hero;

      var shift = pinShift();
      var A = real.getBoundingClientRect();
      var a = align.getBoundingClientRect();
      var H = alignTo.getBoundingClientRect();

      if (!A.height || !a.height || !H.height) { return; }

      var s = o.scale === 'height' ? H.height / a.height
                                   : fontOf(alignTo) / fontOf(align);

      if (!(s > 0) || !isFinite(s)) { s = 1; }

      /* A filled pill has to cover its counterpart exactly, or it visibly
         changes width at the swap. Scale the box on both axes independently
         and counter-scale the label inside it, so the shape matches while
         the type still scales evenly. */
      var sx = s;

      if (o.counter) {
        sx = H.width / a.width;
        if (!(sx > 0) || !isFinite(sx)) { sx = s; }
      }

      /* Scaling happens about `real`'s own top-left, so the offset from
         that corner to the alignment box is multiplied by the scale — which
         is why a card's padding used to throw the numbers out by tens of
         pixels. */
      moves.push({
        el: real,
        dx: H.left - A.left - (a.left - A.left) * sx,
        dy: (H.top + shift) - A.top - (a.top - A.top) * s,
        s: s,
        sx: sx,
        counter: o.counter || null,
        from: from,
        to: to
      });
    }

    function measure() {
      /* Read the elements at rest: an inline transform left over from the
         last frame would be baked into the new deltas. */
      for (var c = 0; c < moves.length; c++) {
        moves[c].el.style.transform = '';
        if (moves[c].counter) { moves[c].counter.style.transform = ''; }
      }

      moves = [];

      var undo = [];

      function neutral(el, prop, value) {
        if (!el) { return; }
        undo.push([el, prop, el.style.getPropertyValue(prop)]);
        el.style.setProperty(prop, value);
      }

      /* The panels build in with a scale; measuring a box through a scaled
         ancestor reads it 4% small. Flatten them for the reading. */
      for (var z = 0; z < sbPanels.length; z++) { neutral(sbPanels[z], '--bgs', '1'); }

      if (lead) { neutral(lead, 'transform', 'translateX(-50%)'); }

      /* 1 — the wordmark becomes the logo pill. Measured on the inner
         spans, so the pill's padding and the wordmark's full-width box stay
         out of it and the letters line up with the letters. */
      pair(sbLogo, word, 0.02, 1, { align: sbLogoIn, alignTo: wordIn });

      /* 2 — six hero nav items to six sidebar rows. Staggered starts, but
         every one of them reaches 1 at p = 1. */
      for (var n = 0; n < heroNav.length; n++) {
        var idx = parseInt(heroNav[n].getAttribute('data-fly-nav'), 10);
        var row = sbLinks[idx];

        if (row) {
          pair(row, heroNav[n], 0.06 + n * 0.03, 1,
               { align: row.querySelector('.sb__txt') });
        }
      }

      /* 3 — four stat cards to four sidebar stats, chip and label moving
         as one item, aligned on the number chip. */
      for (var s = 0; s < heroStats.length; s++) {
        var st = sbStats[s];

        if (st) {
          pair(st, heroStats[s], 0.05 + s * 0.03, 1, {
            align: st.querySelector('.sb__num'),
            alignTo: heroStats[s].querySelector('.hx__num')
          });
        }
      }

      /* 4 — Get in touch becomes Resume. Both are filled pills, so here the
         whole box is the thing to match and height is the honest ratio. */
      pair(sbResume, heroGo, 0.05, 1, { scale: 'height', counter: sb.querySelector('.sb__rin') });

      for (var u = undo.length - 1; u >= 0; u--) {
        if (undo[u][2]) { undo[u][0].style.setProperty(undo[u][1], undo[u][2]); }
        else { undo[u][0].style.removeProperty(undo[u][1]); }
      }

      heroFade = [].concat(heroNav, heroStats);

      if (word) { heroFade.push(word); }
      if (heroGo) { heroFade.push(heroGo); }

      measured = true;
    }

    /* Put everything back to the plain, untransformed page: mobile, reduced
       motion, or simply scrolled back to the top of the hero. */
    function reset() {
      for (var m = 0; m < moves.length; m++) {
        moves[m].el.style.transform = '';
        moves[m].el.style.opacity = '';
        moves[m].el.__q = null;
      }

      moves = [];
      measured = false;

      sb.classList.remove('is-morphing', 'is-live');
      hx.classList.remove('is-gone');

      [].concat(heroNav, heroStats, divs,
                [word, heroGo, portrait, lead, traits, tag, desc])
        .forEach(function (el) {
          if (!el) { return; }
          el.style.opacity = '';
          el.style.transform = '';
          el.style.filter = '';
        });

      [].concat(sbPanels, sbLinks, sbStats, sbLate,
                [sbLogo, sbLogoIn, sbResume, sbR1, sbR2, sb.querySelector('.sb__rin')])
        .forEach(function (el) {
          if (!el) { return; }
          el.style.opacity = '';
          el.style.transform = '';
          el.style.color = '';
          el.style.removeProperty('--bgo');
          el.style.removeProperty('--bgs');
          el.style.removeProperty('--pill');
          /* The outline the morph wrote onto the flying copy. Left behind
             it would keep a stale rim on the resting pill, which the brief
             says must not change.

             The SHORTHAND, not the two longhands it was written through:
             setting style.webkitTextStrokeWidth serialises into
             `-webkit-text-stroke`, and removing the longhands leaves that
             shorthand sitting in the inline style. */
          el.style.removeProperty('-webkit-text-stroke');
          el.style.removeProperty('text-shadow');
        });

      var icons = sb.querySelectorAll('.sb__ico');

      for (var ic = 0; ic < icons.length; ic++) { icons[ic].style.opacity = ''; }
    }

    function apply() {
      ticking = false;

      var live = wide.matches && !reducedMotion.matches;

      if (live !== running) {
        running = live;
        reset();
        /* No morph to run: the sidebar is simply page furniture, always on */
        sb.classList.toggle('is-live', !live && wide.matches);
      }

      if (!live) { return; }
      if (!measured) { measure(); }

      var vh = window.innerHeight || 1;
      var p = window.scrollY / (RUN * vh);

      if (p < 0) { p = 0; }
      if (p > 1) { p = 1; }

      sb.classList.add('is-morphing');

      /* --- the one swap, and it is at the START ---------------------------
         Both sides of it are in the same place on screen, so it reads as
         one item changing, not as two items trading places. */
      var swap = win(p, 0, SWAP);
      var into = swap.toFixed(3);
      var outof = (1 - swap).toFixed(3);

      for (var h = 0; h < heroFade.length; h++) { heroFade[h].style.opacity = outof; }

      /* --- the travel ---------------------------------------------------- */
      for (var i = 0; i < moves.length; i++) {
        var m = moves[i];
        var q = easeOut(win(p, m.from, m.to));

        var sy = m.s + (1 - m.s) * q;
        var sx = m.sx + (1 - m.sx) * q;
        var rx = m.dx * (1 - q);
        var ry = m.dy * (1 - q);

        /* Land on exactly `none`, not on a matrix that rounds to the
           identity. Anything inside a twentieth of a pixel and half a
           thousandth of scale IS arrived, and saying so in the style
           attribute means the element stops being a composited layer and
           goes back to being an ordinary part of the sidebar. */
        var home = q >= 1 || (Math.abs(rx) < 0.05 && Math.abs(ry) < 0.05 &&
                              Math.abs(sx - 1) < 0.0005 && Math.abs(sy - 1) < 0.0005);

        m.el.style.transform = home ? 'none'
          : 'translate3d(' + rx.toFixed(2) + 'px, ' + ry.toFixed(2) + 'px, 0) scale(' +
            sx.toFixed(4) + ', ' + sy.toFixed(4) + ')';

        /* Undo the box's horizontal stretch for the label riding inside it */
        if (m.counter) {
          m.counter.style.transform = home ? 'none' : 'scale(' + (sy / sx).toFixed(4) + ', 1)';
        }

        m.el.style.opacity = into;
        m.el.__q = q;
        m.el.__s = sy;
      }

      /* Everything with no hero counterpart simply arrives */
      var late = win(p, 0.8, 1).toFixed(3);

      for (var l = 0; l < sbLate.length; l++) { sbLate[l].style.opacity = late; }

      /* --- the trimmings, each on its own item's progress ----------------
         An icon is a child of the row, so it scales with the row: at the
         start it would be a 170px chevron. It arrives late instead, once
         the row is close enough to its real size for an icon to read as
         one. */
      for (var k = 0; k < sbLinks.length; k++) {
        var ico = sbLinks[k].querySelector('.sb__ico');
        var lq = sbLinks[k].__q;

        if (ico) {
          ico.style.opacity = (lq == null) ? late : win(lq, 0.3, 0.8).toFixed(3);
        }
      }

      /* The name itself is the travelling item and is legible the whole way.
         It leaves as the hero's yellow letters and only turns to ink just
         before the pill slides in underneath — otherwise the wordmark
         changes colour the instant you start scrolling, which reads as a
         swap rather than a move. Both windows sit at the end of the
         journey, where the letters are close to their real size, so the
         pill never appears as a giant lozenge. */
      if (sbLogoIn) {
        /* Driven off how big the letters still are rather than off q. The
           wordmark starts nearly thirteen times its final size, so a plain
           progress window would paint the pill while it was still a metre
           wide. 1/scale is 0.5 at double size and 1 at rest. */
        var shrunk = 1 / (sbLogo.__s || 1);
        var ink = win(shrunk, 0.33, 0.72);

        /* This used to interpolate from a hard-coded 245,229,0. That was
           the yellow that survived into light mode: the flying pill's
           text started yellow whatever the page was, and only turned
           near-black on the last third of the journey. It reads --name
           now, so it starts as whatever the hero wordmark actually is.
           In light mode that is the same near-black it ends on, so there
           is no colour change left to see; in dark it is the yellow it
           always was. */
        readNameRGB();

        sbLogoIn.style.color = 'rgb(' +
          Math.round(nameRGB[0] + (17 - nameRGB[0]) * ink) + ', ' +
          Math.round(nameRGB[1] + (17 - nameRGB[1]) * ink) + ', ' +
          Math.round(nameRGB[2] + (17 - nameRGB[2]) * ink) + ')';

        /* The light-theme rim leaves on exactly the window the colour
           arrives on. It has to: the rim exists because yellow on beige is
           1.05:1, and the moment the letters turn to ink on a yellow pill
           that problem is gone and a black rim round black letters is just
           mud. In dark nameSW is 0 and the write is a no-op. */
        sbLogoIn.style.webkitTextStrokeWidth =
          (nameSW * (1 - ink)).toFixed(5) + 'em';
        sbLogoIn.style.webkitTextStrokeColor = nameInk;

        sbLogo.style.setProperty('--pill', win(shrunk, 0.62, 0.97).toFixed(3));
      }

      /* Resume is violet from the first frame, so only the label changes */
      if (sbResume) {
        var lab = win(sbResume.__q || 0, 0.5, 0.7);

        if (sbR1) { sbR1.style.opacity = (1 - lab).toFixed(3); }
        if (sbR2) { sbR2.style.opacity = lab.toFixed(3); }
      }

      /* Panel backgrounds build in behind the arriving items. They are
         painted on a pseudo-element, because fading the panel itself would
         take every travelling item inside it down to nothing with it. */
      for (var pa = 0; pa < sbPanels.length; pa++) {
        var pw = win(p, 0.5 + pa * 0.05, 0.9 + pa * 0.02);

        sbPanels[pa].style.setProperty('--bgo', pw.toFixed(3));
        sbPanels[pa].style.setProperty('--bgs', (0.96 + 0.04 * pw).toFixed(4));
      }

      /* --- and the hero empties out -------------------------------------- */
      if (portrait) {
        var pf = win(p, 0, 0.55);

        portrait.style.filter = pf > 0.002 ? 'blur(' + (pf * 30).toFixed(1) + 'px)' : '';
        portrait.style.opacity = (1 - pf).toFixed(3);
      }

      if (lead) {
        var lf = win(p, 0.04, 0.5);

        lead.style.transform = 'translateX(-50%) translate3d(0, ' +
          (easeOut(lf) * -160).toFixed(1) + 'px, 0)';
        lead.style.opacity = (1 - lf).toFixed(3);
      }

      var gone = (1 - win(p, 0.02, 0.36)).toFixed(3);

      [traits, tag, desc].forEach(function (el) { if (el) { el.style.opacity = gone; } });

      var dv = (1 - win(p, 0, 0.2)).toFixed(3);

      for (var d = 0; d < divs.length; d++) { divs[d].style.opacity = dv; }

      /* Once they are at zero, take them out of hit-testing too, so the
         invisible hero nav cannot swallow a click meant for the sidebar
         sitting on top of it. */
      hx.classList.toggle('is-gone', p >= SWAP);

      /* Not 0.999. The last stretch moves items by fractions of a pixel, so
         a reader who stops just short of the end would be looking at a
         finished sidebar that does not answer the mouse. By 0.97 everything
         is home to within a pixel, which is the honest moment to hand it
         back its hover states and its clicks. */
      sb.classList.toggle('is-live', p >= 0.97);
    }

    function queue() {
      if (!ticking) { ticking = true; requestAnimationFrame(apply); }
    }

    var resizeTimer = null;

    function remeasure() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () { measured = false; queue(); }, 150);
    }

    /* The intro keyframes hold these elements translated and blurred for
       their first 1.95s — and a filled animation outranks an inline style,
       so until it is over both the start boxes and every write would be
       wrong. Measure once it has finished and let go of them. */
    function ready() {
      hx.classList.add('is-ready');
      measured = false;
      queue();
    }

    if (reducedMotion.matches) { ready(); } else { window.setTimeout(ready, 1950); }

    apply();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', remeasure);

    /* Inter arrives after first paint and text metrics decide where each of
       these lands, so measure again once it is in. */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(remeasure);
    }

    if (wide.addEventListener) { wide.addEventListener('change', remeasure); }
  }

  /* ------------------------------------------------------------------
     Reveal safety net

     [data-reveal] starts at opacity 0 and waits for an IntersectionObserver
     to release it. If that observer never fires for an element — a section
     that was already on screen when it was registered, a browser that
     throttles it, a layout that moved under it — the content stays
     invisible for good. This sweeps anything that is in the viewport and
     still hidden, on every scroll tick, and costs one boundingRect per
     element until it is released.
     ------------------------------------------------------------------ */

  var pending = [].slice.call(document.querySelectorAll('[data-reveal]'));

  if (pending.length) {
    var sweeping = false;

    function sweep() {
      sweeping = false;

      var vh = window.innerHeight || 0;

      for (var i = pending.length - 1; i >= 0; i--) {
        var el = pending[i];

        if (el.classList.contains('is-revealed')) {
          pending.splice(i, 1);
          continue;
        }

        var box = el.getBoundingClientRect();

        if (box.top < vh && box.bottom > 0) {
          el.classList.add('is-revealed');
          pending.splice(i, 1);
        }
      }

      if (!pending.length) {
        window.removeEventListener('scroll', queueSweep);
        window.removeEventListener('resize', queueSweep);
      }
    }

    function queueSweep() {
      if (!sweeping) {
        sweeping = true;
        requestAnimationFrame(sweep);
      }
    }

    window.addEventListener('scroll', queueSweep, { passive: true });
    window.addEventListener('resize', queueSweep);
    /* One pass a beat after load, for anything on screen from the start */
    window.setTimeout(queueSweep, 1200);
  }

  var sbNavLinks = document.querySelectorAll('[data-sb-link]');

  if (sbNavLinks.length && 'IntersectionObserver' in window) {
    var sbObserver = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        var id = entries[i].target.id;
        var link = document.querySelector('[data-sb-link][href="#' + id + '"]');

        if (link) {
          link.classList.toggle('is-active', entries[i].isIntersecting);
        }
      }
    }, { rootMargin: '-40% 0px -55% 0px' });

    for (var sn = 0; sn < sbNavLinks.length; sn++) {
      var target = document.getElementById(sbNavLinks[sn].getAttribute('href').slice(1));
      if (target) { sbObserver.observe(target); }
    }
  }

  var copyBtn = document.getElementById('sb-copy');

  if (copyBtn) {
    var copyLabel = copyBtn.querySelector('.sb__copy-text');
    var copyTimer = null;

    copyBtn.addEventListener('click', function () {
      var value = copyBtn.getAttribute('data-copy') || '';

      function done() {
        if (!copyLabel) { return; }
        copyLabel.textContent = 'Copied';
        window.clearTimeout(copyTimer);
        copyTimer = window.setTimeout(function () {
          copyLabel.textContent = 'Copy';
        }, 1500);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done, done);
      } else {
        /* file:// and older browsers have no async clipboard */
        var tmp = document.createElement('textarea');
        tmp.value = value;
        tmp.setAttribute('readonly', '');
        tmp.style.position = 'fixed';
        tmp.style.opacity = '0';
        document.body.appendChild(tmp);
        tmp.select();
        try { document.execCommand('copy'); } catch (e) { /* nothing to do */ }
        document.body.removeChild(tmp);
        done();
      }
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
     middle half of the viewport gets .is-active, along with its
     matching nav and mobile-menu links; every other .section (and
     style.css's .js .section rule) falls back to the dimmed, muted
     state. Hero is never a .section, so it's never touched here — it
     stays at full opacity regardless, as required.

     The band used to be the middle 20%, which meant a section had to be
     nearly centred before it lit up — about 140px of scrolling after its
     own content had already started revealing. For the section directly
     after the hero that read as a dead stretch: the sidebar had finished
     forming, Profile was on screen, and it was still sitting at 35%
     opacity with no nav link lit. The middle half puts .is-active within
     a few pixels of the reveal trigger, so a section brightens as its
     heading animates in rather than long afterwards.
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
    }, { rootMargin: '-40% 0px -55% 0px' });

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

  /* STEP 11: no longer gated on the motion setting. The character reveal
     runs in both modes; under reduced motion the stylesheet caps each
     character's rise to --rm-shift, so it fades in place rather than
     climbing out of its clip box. (Nothing on the page currently carries
     [data-split-reveal] since the old Contact heading was replaced, so
     this is the contract for the next thing that does.) */
  if (splitTargets.length && 'IntersectionObserver' in window) {

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
     Card rails — reusable horizontal scrollers

     Found by attribute, not by id, so one copy of this drives every rail
     on the page and adding another section needs no new JavaScript:

       [data-rail]          the wrapper
       [data-rail-row]        the scrolling track inside it
       [data-rail-prev/next]  the arrows
       [data-rail-fill]       the progress bar's inner span

     Everything is native overflow scrolling underneath — touch swipe and
     trackpad come for free from the browser, which is why there is no
     touch handling here at all. What is added is the three things the
     browser does not give you on a horizontal row: mouse drag, vertical
     wheel mapped onto horizontal scroll, and the arrows.
     ------------------------------------------------------------------ */

  var rails = document.querySelectorAll('[data-rail]');

  for (var r = 0; r < rails.length; r++) {
    (function (rail) {
      var row = rail.querySelector('[data-rail-row]');

      if (!row) {
        return;
      }

      /* data-rail-smooth rails are driven by the transform engine
         further down, which owns their position entirely. Both engines
         running on one row would fight: this one writes scrollLeft and
         that one writes a transform, and the result is a row that moves
         twice as far as the gesture asked for. */
      if (rail.hasAttribute('data-rail-smooth')) {
        return;
      }

      var prev = rail.querySelector('[data-rail-prev]');
      var next = rail.querySelector('[data-rail-next]');
      var fill = rail.querySelector('[data-rail-fill]');

      /* Two opt-ins, both off unless the markup asks for them:

         data-rail-nowheel   leave the wheel alone entirely, so a vertical
                             wheel over the cards scrolls the page. For a
                             row that is meant to be dragged and nothing
                             else, turning the wheel sideways is a surprise.
         data-rail-momentum  carry the throw after the mouse comes up, then
                             settle on the nearest card. */
      var noWheel = rail.hasAttribute('data-rail-nowheel');
      var hasMomentum = rail.hasAttribute('data-rail-momentum');

      /* One card plus one gap — measured, so it stays right when the card
         width or the gap changes at a breakpoint */
      function step() {
        var card = row.firstElementChild;

        if (!card) {
          return row.clientWidth * 0.8;
        }

        var gap = parseFloat(window.getComputedStyle(row).columnGap);

        return card.getBoundingClientRect().width + (gap > 0 ? gap : 0);
      }

      function maxScroll() {
        return row.scrollWidth - row.clientWidth;
      }

      /* Drag is a pointer affordance: pointless on touch, where the
         native swipe already does it, and the cursor change would be a
         lie. Re-checked on resize rather than bound once. */
      var finePointerRail = window.matchMedia('(hover: hover) and (pointer: fine)');

      function syncDragCursor() {
        row.classList.toggle('is-draggable',
          finePointerRail.matches && maxScroll() > 1);
      }

      /* ---- progress bar and arrow states ---- */

      function update() {
        var max = maxScroll();
        var at = max > 0 ? row.scrollLeft / max : 0;

        if (fill) {
          fill.style.transform = 'scaleX(' + at.toFixed(4) + ')';
        }

        if (prev) {
          prev.disabled = row.scrollLeft <= 1;
        }

        if (next) {
          next.disabled = row.scrollLeft >= max - 1;
        }
      }

      /* ---- arrows ---- */

      function nudge(direction) {
        row.scrollBy({
          left: step() * direction,
          behavior: reducedMotion.matches ? 'auto' : 'smooth'
        });
      }

      if (prev) {
        prev.addEventListener('click', function () { nudge(-1); });
      }

      if (next) {
        next.addEventListener('click', function () { nudge(1); });
      }

      /* ---- keyboard, once the row itself has focus ---- */

      row.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          nudge(1);
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          nudge(-1);
        }
      });

      /* ---- wheel: vertical scroll becomes horizontal ----
         Only while the row actually has somewhere to go in the direction
         of the gesture. At either end the event is left alone, so the
         page carries on scrolling past the section instead of trapping
         the wheel — the thing that makes carousels miserable. */

      var snapTimer = null;

      function suspendSnap() {
        row.classList.add('is-snap-suspended');
        window.clearTimeout(snapTimer);
        snapTimer = window.setTimeout(function () {
          row.classList.remove('is-snap-suspended');
        }, 140);
      }

      row.addEventListener('wheel', function (event) {
        if (noWheel) {
          return;
        }

        if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
          return;
        }

        var max = maxScroll();
        var goingRight = event.deltaY > 0;

        if (max <= 0) {
          return;
        }

        if (goingRight && row.scrollLeft >= max - 1) {
          return;
        }

        if (!goingRight && row.scrollLeft <= 1) {
          return;
        }

        event.preventDefault();
        suspendSnap();
        row.scrollLeft += event.deltaY;
      }, { passive: false });

      /* ---- mouse drag ---- */

      var dragging = false;
      var dragStartX = 0;
      var dragStartScroll = 0;
      var dragMoved = 0;
      var lastX = 0;
      var lastT = 0;
      var velocity = 0;
      var glideId = 0;

      function stopGlide() {
        if (glideId) { cancelAnimationFrame(glideId); glideId = 0; }
      }

      /* Settle on whichever card is nearest where the throw ran out.

         "Nearest card" is not the same as "nearest multiple of one card".
         The run almost never divides by the card pitch: three 620px cards
         with 20px gaps in a 1032px window give 908px of travel against a
         640px pitch, so the last card's own start sits at 1280, which is
         372px past the end of the scroll and can never be reached. Round
         to the pitch alone and a drag that had already arrived at 908 was
         sent back to 640 — the third card left two thirds off the screen,
         the dash indicator stuck on the second, and dragging again did
         nothing at all, because 908 always rounds back to the same place.

         The end of the run is therefore a resting position in its own
         right, and it wins whenever it is the closer of the two. That is
         also what puts the last card fully on screen with the trailing
         gutter behind it, which is the whole reason the gutter is
         there. */
      function settle() {
        var card = row.firstElementChild;

        if (!card) { row.classList.remove('is-snap-suspended'); return; }

        var per = step();
        var at = row.scrollLeft;
        var max = maxScroll();
        var target = Math.round(at / per) * per;

        if (target > max) { target = max; }
        if (target < 0) { target = 0; }

        if (Math.abs(max - at) < Math.abs(target - at)) { target = max; }

        row.scrollTo({ left: target, behavior: reducedMotion.matches ? 'auto' : 'smooth' });

        /* Snap is suspended for the whole throw, because mandatory snap and
           a scrollLeft written every frame pull against each other. Putting
           it back on a fixed timer raced the smooth scroll: snap re-engaged
           while the settle was still travelling and stopped it short of the
           card. So wait for the scroll to actually come to rest, and give up
           after a second in case it never quite does. */
        if (reducedMotion.matches) {
          row.classList.remove('is-snap-suspended');
          return;
        }

        var was = -1;
        var still = 0;
        var gaveUp = Date.now() + 1000;

        (function watch() {
          var at = Math.round(row.scrollLeft);

          still = (at === was) ? still + 1 : 0;
          was = at;

          if (still >= 3 || Date.now() > gaveUp) {
            row.classList.remove('is-snap-suspended');
            return;
          }

          requestAnimationFrame(watch);
        }());
      }

      function glide() {
        velocity *= 0.94;

        var at = row.scrollLeft;
        var max = maxScroll();

        row.scrollLeft = at - velocity;

        /* Stop at the ends rather than grinding against them */
        if (row.scrollLeft <= 0 || row.scrollLeft >= max) { velocity = 0; }

        if (Math.abs(velocity) < 0.4) {
          glideId = 0;
          settle();
          return;
        }

        glideId = requestAnimationFrame(glide);
      }

      row.addEventListener('mousedown', function (event) {
        if (!finePointerRail.matches || event.button !== 0) {
          return;
        }

        stopGlide();
        dragging = true;
        dragMoved = 0;
        velocity = 0;
        dragStartX = event.clientX;
        lastX = event.clientX;
        lastT = (window.performance && performance.now()) || Date.now();
        dragStartScroll = row.scrollLeft;
        row.classList.add('is-dragging');
        suspendSnap();
      });

      window.addEventListener('mousemove', function (event) {
        if (!dragging) {
          return;
        }

        var travelled = event.clientX - dragStartX;

        if (hasMomentum) {
          var now = (window.performance && performance.now()) || Date.now();
          var dt = now - lastT;

          /* px per frame at 60fps, smoothed so one jittery sample cannot
             throw the whole gesture */
          if (dt > 0) {
            var v = (event.clientX - lastX) * (16.7 / dt);
            velocity = velocity * 0.7 + v * 0.3;
          }

          lastX = event.clientX;
          lastT = now;
        }

        dragMoved = Math.abs(travelled);
        suspendSnap();
        row.scrollLeft = dragStartScroll - travelled;
      });

      window.addEventListener('mouseup', function () {
        if (!dragging) {
          return;
        }

        dragging = false;
        row.classList.remove('is-dragging');

        if (hasMomentum && !reducedMotion.matches && Math.abs(velocity) > 0.5) {
          row.classList.add('is-snap-suspended');
          stopGlide();
          glideId = requestAnimationFrame(glide);
          return;
        }

        if (hasMomentum) { settle(); return; }

        row.classList.remove('is-snap-suspended');
      });

      /* A drag that happened to start on a link or button must not also
         count as a click on it when the mouse comes up */
      row.addEventListener('click', function (event) {
        if (dragMoved > 6) {
          event.preventDefault();
          event.stopPropagation();
        }
      }, true);

      row.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', function () {
        syncDragCursor();
        update();
      });

      row.scrollLeft = 0;
      syncDragCursor();
      update();
    })(rails[r]);
  }

  /* ------------------------------------------------------------------
     STEP 24 - the smooth rail

     A second carousel engine, opted into with data-rail-smooth. Only the
     UGC video row uses it. What People Say stays on the scrollLeft
     engine above, because its dash indicator reads scrollLeft and its
     drag limits were measured against that behaviour.

     The difference is who owns the position. A native scroller is owned
     by the browser and lands on the exact pixel the gesture asked for,
     every frame, which is what made the row feel like it jumped. Here
     the gesture only ever moves a TARGET, and one rAF loop walks the
     real offset a fraction of the way toward it each frame. That
     fraction is the whole effect.

     Nothing in the loop touches a layout property. The row is moved with
     translate3d and the progress bar with scaleX, both composite-only.
     ------------------------------------------------------------------ */

  var smoothRails = document.querySelectorAll('[data-rail-smooth]');

  for (var sr = 0; sr < smoothRails.length; sr++) {
    (function (rail) {
      var view = rail.querySelector('[data-rail-view]');
      var row = rail.querySelector('[data-rail-row]');
      var fill = rail.querySelector('[data-rail-fill]');
      var prev = rail.querySelector('[data-rail-prev]');
      var next = rail.querySelector('[data-rail-next]');

      if (!view || !row) { return; }

      var EASE = 0.12;      /* how far toward the target each frame */
      var DECAY = 0.94;     /* how fast a throw runs out */
      var RUBBER = 3;       /* past an end, a drag moves at a third speed */
      var STOP = 0.05;      /* under this, the loop has arrived */

      var at = 0;           /* where the row actually is */
      var to = 0;           /* where it is heading */
      var max = 0;
      var vel = 0;
      var raf = 0;
      var dragging = false;
      var pointerId = null;
      var paged = false;    /* touch pages one card at a time */
      var lastX = 0, lastT = 0, downX = 0, downTo = 0, moved = 0;

      /* A touch swipe advances exactly ONE card, whatever its speed.

         Free scrolling with momentum is right for a mouse, where the
         pointer is precise and a throw is deliberate. On a phone it is
         not: the card is 332px of a 370px viewport, so one card IS the
         screen, and a gesture that lands anywhere other than a card
         boundary shows half of one video and half of the next. Velocity
         made that worse rather than better, because a hard flick carried
         two or three cards and a gentle one rounded back to where it
         started, so the same gesture did different things.

         So on touch the velocity decides only the DIRECTION, never the
         distance. Below both thresholds the swipe is treated as a change
         of mind and the card springs back. */
      var PAGE_DIST = 40;   /* px of travel that counts as a swipe */
      var PAGE_VEL = 2.5;   /* or this much speed, for a fast short flick */

      /* ---- measuring ----
         The travel is the track's full scroll width, INCLUDING the
         trailing padding, less the width on screen. scrollWidth reports
         that even though nothing scrolls natively any more: it is the
         overflow of the content box either way. Re-read after fonts and
         images land and on resize, because both change card heights and
         the row's own width. */
      function measure() {
        var before = max;
        var last = row.lastElementChild;

        if (last) {
          /* Measured from the cards, NOT from scrollWidth. Chrome leaves
             a flex container's trailing padding out of scrollWidth, so
             trusting it made the run 820px against the 896px the content
             actually occupies, and the last card came to rest flush with
             the screen edge with no gutter behind it at all. Measured on
             this row: scrollWidth 1852, real content 1928.

             Both rects move with the transform by the same amount, so
             their difference is independent of where the row currently
             sits and this can be called mid-gesture. */
          var pr = parseFloat(window.getComputedStyle(row).paddingRight) || 0;
          var span = last.getBoundingClientRect().right - row.getBoundingClientRect().left;

          max = Math.max(0, span + pr - view.clientWidth);
        } else {
          max = Math.max(0, row.scrollWidth - view.clientWidth);
        }

        /* A resize that shortens the run must not leave the row parked
           past the new end. */
        if (to > max) { to = max; }
        if (at > max) { at = max; }
        if (before !== max) { apply(); paint(); }
      }

      function cardStep() {
        var card = row.firstElementChild;

        if (!card) { return view.clientWidth * 0.8; }

        var gap = parseFloat(window.getComputedStyle(row).columnGap);

        return card.getBoundingClientRect().width + (gap > 0 ? gap : 0);
      }

      /* ---- writing ----
         translate3d and not translateX: the z keeps the row on its own
         composited layer on engines that still need the hint. */
      function apply() {
        row.style.transform = 'translate3d(' + (-at).toFixed(2) + 'px, 0, 0)';
      }

      function paint() {
        if (fill) {
          fill.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, Math.max(0, at / max)) : 0).toFixed(4) + ')';
        }

        if (prev) { prev.disabled = at <= 1; }
        if (next) { next.disabled = at >= max - 1; }
      }

      /* ---- the loop ----
         One rAF for the whole rail. It starts when something asks the
         row to move and stops itself once it has arrived, so an idle
         page runs no animation frames at all. */
      function frame() {
        raf = 0;

        if (!dragging) {
          /* A throw, decaying. Folded into the target rather than into
             the position, so the easing below still smooths it. */
          if (vel) {
            to += vel;
            vel *= DECAY;

            if (Math.abs(vel) < 0.4) { vel = 0; settle(); }
          }

          /* Springing back from a rubber-banded overscroll. */
          if (to < 0) { to += (0 - to) * 0.2; if (to > -0.5) { to = 0; } }
          else if (to > max) { to += (max - to) * 0.2; if (to < max + 0.5) { to = max; } }
        }

        var d = to - at;

        if (Math.abs(d) < STOP && !vel && !dragging) {
          at = to;
          apply();
          paint();
          return;
        }

        at += d * (reducedMotion.matches ? 1 : EASE);
        apply();
        paint();

        raf = requestAnimationFrame(frame);
      }

      function kick() {
        if (!raf) { raf = requestAnimationFrame(frame); }
      }

      /* Nearest card, clamped. max is a resting place in its own right:
         the run rarely divides by the card pitch, so rounding alone
         would stop short of the last card and never reach it. This is
         the same trap the What People Say row hit. */
      function settle() {
        if (reducedMotion.matches) { to = Math.max(0, Math.min(max, to)); kick(); return; }

        var per = cardStep();
        var target = Math.round(to / per) * per;

        if (target > max) { target = max; }
        if (target < 0) { target = 0; }
        if (Math.abs(max - to) < Math.abs(target - to)) { target = max; }

        to = target;
        kick();
      }

      /* ---- drag ----
         pointermove does two assignments and nothing else. No geometry
         is read, no style is written, and the listener is passive: the
         loop is what moves the row. */
      row.addEventListener('pointerdown', function (event) {
        if (event.pointerType === 'mouse' && event.button !== 0) { return; }

        dragging = true;
        pointerId = event.pointerId;
        paged = event.pointerType !== 'mouse';
        vel = 0;
        moved = 0;
        downX = lastX = event.clientX;
        downTo = to;
        lastT = event.timeStamp;
        row.classList.add('is-dragging');

        try { row.setPointerCapture(event.pointerId); } catch (e) { /* not fatal */ }

        kick();
      });

      row.addEventListener('pointermove', function (event) {
        if (!dragging || event.pointerId !== pointerId) { return; }

        var dx = event.clientX - downX;
        var want = downTo - dx;

        /* Rubber band. Past either end the row still follows the finger,
           at a third of the distance, so the edge is felt rather than
           hit. It springs back in the loop when the pointer goes up. */
        if (want < 0) { want = want / RUBBER; }
        else if (want > max) { want = max + (want - max) / RUBBER; }

        to = reducedMotion.matches ? Math.max(0, Math.min(max, want)) : want;

        var dt = event.timeStamp - lastT;

        if (dt > 0) {
          /* px per frame at 60fps, smoothed so one jittery sample cannot
             throw the whole gesture. */
          var v = -(event.clientX - lastX) * (16.7 / dt);
          vel = vel * 0.7 + v * 0.3;
        }

        moved += Math.abs(event.clientX - lastX);
        lastX = event.clientX;
        lastT = event.timeStamp;

        kick();
      }, { passive: true });

      function release(event) {
        if (!dragging || (event && event.pointerId !== pointerId)) { return; }

        dragging = false;
        pointerId = null;
        row.classList.remove('is-dragging');

        /* ---- touch: one card, decided by direction ---- */
        if (paged) {
          var per = cardStep();
          /* The card the gesture STARTED on, not the one it is nearest
             now: rounding the current position is what let a long drag
             skip two cards and a short one round back to the start. */
          var from = Math.round(downTo / per);
          var travelled = downX - lastX;   /* positive = swiped forward */
          var dir = 0;

          if (travelled > PAGE_DIST || vel > PAGE_VEL) { dir = 1; }
          else if (travelled < -PAGE_DIST || vel < -PAGE_VEL) { dir = -1; }

          vel = 0;
          to = Math.max(0, Math.min(max, (from + dir) * per));
          kick();

          return;
        }

        if (reducedMotion.matches) { vel = 0; settle(); return; }

        /* Only carry a throw that is actually a throw. Below this the
           gesture was a slow reposition and momentum would overshoot it. */
        if (Math.abs(vel) < 1.5) { vel = 0; settle(); }

        kick();
      }

      row.addEventListener('pointerup', release);
      row.addEventListener('pointercancel', release);

      /* A drag that ends on a card must not also open the lightbox. The
         threshold is the same few pixels a click naturally wanders. */
      row.addEventListener('click', function (event) {
        if (moved > 6) { event.preventDefault(); event.stopPropagation(); }
      }, true);

      /* ---- wheel and trackpad ----
         A horizontal trackpad swipe arrives as deltaX and is taken
         whole. A vertical wheel is only taken while the row still has
         somewhere to go in that direction, so at either end the page
         carries on scrolling instead of the wheel being trapped. */
      row.addEventListener('wheel', function (event) {
        var dx = event.deltaX;
        var dy = event.deltaY;
        var horizontal = Math.abs(dx) > Math.abs(dy);
        var delta = horizontal ? dx : dy;

        if (!max) { return; }
        if (!horizontal) {
          if (delta > 0 && to >= max - 1) { return; }
          if (delta < 0 && to <= 1) { return; }
        }

        event.preventDefault();
        vel = 0;
        to = Math.max(0, Math.min(max, to + delta));
        kick();
      }, { passive: false });

      /* ---- keyboard ---- */
      row.addEventListener('keydown', function (event) {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') { return; }

        event.preventDefault();
        vel = 0;
        to = Math.max(0, Math.min(max, to + cardStep() * (event.key === 'ArrowRight' ? 1 : -1)));
        kick();
      });

      if (prev) { prev.addEventListener('click', function () { vel = 0; to = Math.max(0, to - cardStep()); kick(); }); }
      if (next) { next.addEventListener('click', function () { vel = 0; to = Math.min(max, to + cardStep()); kick(); }); }

      /* ---- thumbnails ----
         They are already <img> with loading="lazy", explicit width and
         height, and the iframe is only built when the lightbox opens, so
         nothing here changes the markup. What it adds is a decode before
         the row is reachable: lazy loading on a HORIZONTAL row means the
         cards off to the right have not loaded when the drag starts, and
         they pop in mid-gesture. Decoding them early costs one round of
         network at a point where nothing is moving.

         The Image objects are held in an array on purpose. Drop the
         references and the browser may throw the decoded bitmaps away
         again before the row is ever used. */
      var warmed = false;
      var warm = [];

      function warmUp() {
        if (warmed) { return; }

        warmed = true;

        var imgs = row.querySelectorAll('img');

        for (var i = 0; i < imgs.length; i++) {
          (function (el) {
            el.loading = 'eager';

            var im = new Image();

            im.decoding = 'async';
            im.src = el.currentSrc || el.src;
            warm.push(im);

            if (im.decode) { im.decode()['catch'](function () {}); }
          })(imgs[i]);
        }
      }

      if (window.IntersectionObserver) {
        var io = new IntersectionObserver(function (entries) {
          if (!entries[0].isIntersecting) { return; }

          io.disconnect();
          warmUp();
          measure();
        }, { rootMargin: '200% 0px' });

        io.observe(rail);
      } else {
        window.addEventListener('load', function () { warmUp(); measure(); });
      }

      /* ---- wiring ---- */
      var rz = null;

      window.addEventListener('resize', function () {
        window.clearTimeout(rz);
        rz = window.setTimeout(measure, 150);
      });

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(measure);
      }

      /* Images settling changes the row's width, and the row is the
         thing being measured. */
      window.addEventListener('load', measure);

      measure();
      apply();
      paint();
    })(smoothRails[sr]);
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

     Two independent pieces:
     1. Swap a thumbnail to hqdefault if maxresdefault doesn't exist —
        YouTube serves a small placeholder image rather than a 404, so
        this has to be detected by size, not by a failed request.
     2. The lightbox: opens on a card click, builds the iframe fresh
        each time (never before, never reused), and destroys it again on
        close or on switching videos, so nothing plays off screen.

     It finds its cards by [data-video-id], so the arrows, the dots and
     the swipe all covered six videos the moment two more were added to
     the markup — there is no count written down anywhere here.

     The layout itself is now the shared [data-rail] carousel, and the
     floating-card bob, the scroll parallax and the mobile deck that used
     to live here are gone with the layout they belonged to.
     ------------------------------------------------------------------ */

  var videoCards = document.querySelectorAll('[data-video-id]');

  /* ---- thumbnail fallback ---- */

  var thumbs = document.querySelectorAll('[data-fallback]');

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

  /* ------------------------------------------------------------------
     Atmosphere — background particles, sparkle trail, and the custom
     cursor, all sharing one canvas

     Particles: 50 desktop / 20 under 768px, mixed violet and dark grey,
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

    /* Violet and a warm dark grey. On the old near-black page these were
       violet and amber and worked by being brighter than the background;
       on beige they have to work by being darker than it, so the second
       colour is a grey-brown rather than a second accent.

       STEP 10: and on a dark page they have to go back to being lighter
       than it, so there are two sets and a pair of alpha multipliers. The
       brief asks for lower opacity in dark mode, which is also what the
       physics of the thing wants: a light mote on near-black is far more
       visible than a dark one on beige at the same alpha. */
    var PARTICLE_SETS = {
      light: ['124, 58, 237', '90, 84, 74'],
      dark:  ['167, 139, 250', '190, 182, 168']
    };
    var PARTICLE_ALPHA = { light: 1, dark: 0.55 };

    var PARTICLE_RGB = PARTICLE_SETS.light;
    var particleAlpha = 1;

    var particles = [];

    /* Assigned to the outer variable rather than declared, so the theme
       module at the top of this file can reach it: this whole block sits
       inside an `if`, and a function declaration in a block is scoped to
       that block under strict mode.

       Re-read on every theme change. The particles themselves are not
       rebuilt: each keeps its position and drift and only its colour
       string is swapped, so the field does not visibly restart. */
    applyParticleTheme = function () {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      var set = dark ? PARTICLE_SETS.dark : PARTICLE_SETS.light;

      PARTICLE_RGB = set;
      particleAlpha = dark ? PARTICLE_ALPHA.dark : PARTICLE_ALPHA.light;

      for (var pi = 0; pi < particles.length; pi++) {
        particles[pi].rgb = set[pi % set.length];
      }
    };

    /* The page may have loaded straight into dark mode */
    applyParticleTheme();

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
        atmosCtx.fillStyle = 'rgba(' + p.rgb + ', ' + (drawAlpha * particleAlpha) + ')';
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
        atmosCtx.fillStyle = 'rgba(' + sp.rgb + ', ' + (sparkleAlpha * particleAlpha) + ')';
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

        var CURSOR_GROW_SELECTOR = 'a, button, .vid__card, .jr__card';

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
  /* ------------------------------------------------------------------
     STEP 3 — the Journey timeline

     Nothing about the curve is written by hand. script.js reads where the
     five cards actually landed, runs a Catmull-Rom spline through their
     anchor points and writes that out as one cubic path — so the line
     survives a change of copy, of type size, or of window, and the dots
     sit ON it because they are placed at the very points it was built
     from.

     Drawing is stroke-dashoffset against scroll position, which means it
     unwinds exactly in reverse on the way back up. The dots light as the
     drawn length passes them.
     ------------------------------------------------------------------ */

  var jr = document.getElementById('jr');
  var jrLine = document.getElementById('jr-line');
  var jrTail = document.getElementById('jr-tail');

  if (jr && jrLine && jrTail) {
    var jrItems = [].slice.call(jr.querySelectorAll('[data-jr-item]'));
    var jrNarrow = window.matchMedia('(max-width: 899px)');

    /* Lifted out of the cards into their own layer above the line. Taken
       by reference first, so everything below still addresses them by
       index and nothing has to go looking for them inside a card again. */
    var jrDotLayer = document.getElementById('jr-dots');
    var jrDots = [];

    (function () {
      for (var i = 0; i < jrItems.length; i++) {
        var dot = jrItems[i].querySelector('[data-jr-dot]');

        jrDots.push(dot || null);

        if (dot && jrDotLayer) { jrDotLayer.appendChild(dot); }
      }
    })();

    var anchors = [];      /* {x, y} in .jr coordinates */
    var marks = [];        /* length along the path at each anchor */
    var mainLen = 0;
    var jrTicking = false;
    var animating = 0;     /* cards currently opening or closing */

    function clamp01(v) { return v < 0 ? 0 : (v > 1 ? 1 : v); }

    function win(p, from, to) { return clamp01((p - from) / (to - from)); }

    /* ---- the curve's one construction -------------------------------
       There is no table any more and nothing varies from segment to
       segment. Every gap between two dots is ONE cubic bezier, built the
       same way, which is what makes the line read as drawn by an
       instrument rather than by a hand.

       Both handles are the same vector: out of the first dot it is
       +(hx, hy), and into the second dot it is the same vector subtracted
       from the end point. Two things follow, and they are the whole
       design:

       SYMMETRY. The control polygon is A, A+h, B-h, B. Rotate that 180
       degrees about the segment's midpoint and it maps onto itself, so
       every S-curve is balanced about its own centre.

       NO KINK. The tangent leaving a dot and the tangent arriving at it
       are the same vector at every dot on the path, so they are collinear
       by construction rather than by tuning. There is no seam to see
       because there is no seam.

         JR_HX  the horizontal half-reach of each sweep, as a fraction of
                the content width. This is what makes the curve wide: a
                handle longer than the gap between the two dots pushes the
                curve out past both of them before it comes back.
         JR_HY  the vertical part of the same handle, as a fraction of the
                segment's height. It is what stops the sweep curling back
                on itself and keeps the line travelling down the page.
       ---------------------------------------------------------------- */
    /* The handle is PURELY VERTICAL, and that is forced, not chosen.

       Three things were asked of this curve at once: one symmetric cubic
       per segment, tangents collinear through every dot, and the same
       horizontal amplitude in every segment. Give the handle any
       horizontal component and the third fails: the handle points one way
       while the dots alternate sides, so the segment running with the
       handle gets no overshoot and the segment running against it gets a
       lot. Measured, that was 261px of reach on one segment and 648px on
       the next, from an identical construction.

       A vertical handle has no direction to disagree with. Every segment
       then reaches exactly as far as the gap between its two dots, which
       is the same gap every time now that the card indents are uniform.
       The width comes from where the dots are, and the bezier only has to
       be even. */
    /* 0.72 rather than 0.5: the handle is most of the segment's height,
       which holds the curve near vertical as it leaves a dot and puts all
       of the crossing into the middle. At 0.55 the middle was long enough
       to read as a straight diagonal with rounded ends rather than as a
       sweep. */
    var JR_HY = 0.72;
    var JR_WAVE_H = 69;   /* gives the phone's wave a 40px reach */

    /* Stroke half-width plus the dot's radius: the margin the curve has
       to stay inside so it never reaches the page edge or adds a
       horizontal scrollbar. */
    var JR_WAVE = 20;      /* the phone's tail, per the brief */
    /* How far below each card's centre the line runs. A translation, not
       a stretch: every anchor moves by the same amount, so the path keeps
       its length and the section keeps its height. */
    var JR_DROP = 40;

    /* With a vertical handle the curve can never leave the box its two
       dots are in, so there is nothing left to clamp and nothing to
       solve. The old fitter and its cubic-extreme solver went with the
       horizontal handle that needed them. */

    /* ---- where the line has to pass ---------------------------------
       Beside each card, on the side facing the middle of the column:
       level with the card's centre and just outside the thin rule. The
       side is recorded here rather than worked out again later, because
       it is what decides which way each sweep goes. */
    function readAnchors() {
      var box = jr.getBoundingClientRect();
      var narrow = jrNarrow.matches;
      var out = [];

      for (var i = 0; i < jrItems.length; i++) {
        var card = jrItems[i].querySelector('[data-jr-card]');
        if (!card) { continue; }

        var r = card.getBoundingClientRect();
        var right = jrItems[i].classList.contains('jr__item--r');

        out.push({
          /* The OUTER edge, not the inner one. The inner edges of two
             540px cards in a 1028px column are only about 96px apart, and
             the reach of a segment is exactly the distance between its two
             dots, so anchoring there caps the sweep at 96px however the
             bezier is built. On the outer edges they are most of the
             column apart, which is where the width comes from. */
          x: narrow ? 22 : (right ? r.right - box.left : r.left - box.left),
          /* JR_DROP sits the whole path a little below the cards' centre
             line. Adding it to every anchor moves the curve and the dots
             together, so the dots stay on the path by construction rather
             than needing their own correction, and the path is translated
             rather than stretched: same length, same section height. */
          y: r.top - box.top + r.height / 2 + JR_DROP,
          side: right ? 1 : -1
        });
      }

      return out;
    }

    /* ---- the curve ----------------------------------------------------
       One symmetric cubic per gap, every gap built identically. The
       handle vector is the same at both ends of every segment and at
       every dot on the path, which is what gives continuous tangents
       with nothing to tune.

       The line runs BEHIND the cards. Each card hides the stretch passing
       under it and the curve reappears on the other side, so the sweeps
       read as one continuous route glimpsed between the cards rather than
       as a ribbon laid over them. That is why it is back at full opacity:
       the cards do the hiding, so the line does not have to apologise for
       being there.
       ------------------------------------------------------------------ */
    function ribbon(pts) {
      if (pts.length < 2) { return ''; }

      var box = jr.getBoundingClientRect();
      var W = box.width;
      var narrow = jrNarrow.matches;
      var d = 'M' + pts[0].x.toFixed(1) + ',' + pts[0].y.toFixed(1);
      var i;

      /* The phone keeps a rail with a lean on it: the same one-cubic
         construction, with the horizontal reach cut to 20px so it reads
         as a gentle wave down the left rather than a sweep across. */
      /* The phone is the one place a horizontal handle is safe: both dots
         share an x, so there is no direction for it to disagree with and
         both alternating segments come out identical anyway. 69 is the
         handle that yields the 20px each way the brief asks for. */
      if (narrow) {
        for (i = 0; i < pts.length - 1; i++) {
          var na = pts[i];
          var nb = pts[i + 1];
          var nhy = (nb.y - na.y) * JR_HY;

          /* Mirrored, exactly like the desktop segments: +h out and -h in.
             Both dots share an x here, so one mirrored pair is one full
             wave, out to +20px and back through -20px. Two handles on the
             SAME side would be a one-sided bulge instead, and a 52px one
             at that. */
          d += ' C' + (na.x + JR_WAVE_H).toFixed(1) + ',' + (na.y + nhy).toFixed(1) +
               ' ' + (nb.x - JR_WAVE_H).toFixed(1) + ',' + (nb.y - nhy).toFixed(1) +
               ' ' + nb.x.toFixed(1) + ',' + nb.y.toFixed(1);
        }

        return d;
      }

      for (i = 0; i < pts.length - 1; i++) {
        var a = pts[i];
        var b = pts[i + 1];
        var hy = (b.y - a.y) * JR_HY;

        /* A + (0, hy) and B - (0, hy). Nothing else: equal handles,
           mirrored about the segment's midpoint, vertical at both ends,
           so the tangent through every dot is the same line and the
           segments meet with nothing to see. */
        d += ' C' + a.x.toFixed(1) + ',' + (a.y + hy).toFixed(1) +
             ' ' + b.x.toFixed(1) + ',' + (b.y - hy).toFixed(1) +
             ' ' + b.x.toFixed(1) + ',' + b.y.toFixed(1);
      }

      return d;
    }

    /* The short dashed run-on past the last card. It leaves on the same
       handle vector the solid path arrives on, so the dashes carry on the
       curve's direction rather than starting a new shape, then eases to a
       stop. This is the only dashed thing on the path. */
    function tailPath(pts) {
      if (!pts.length) { return ''; }

      var last = pts[pts.length - 1];
      var box = jr.getBoundingClientRect();
      var W = box.width;

      if (jrNarrow.matches) {
        var nRun = 90;
        return 'M' + last.x.toFixed(1) + ',' + last.y.toFixed(1) +
               ' q' + JR_WAVE.toFixed(1) + ',' + (nRun * 0.55).toFixed(1) +
               ' ' + (JR_WAVE * 0.4).toFixed(1) + ',' + nRun.toFixed(1);
      }

      /* The short dashed run-on, built on the same vertical handle so it
         leaves the last dot on the curve's own tangent and eases to a
         stop. It draws back toward the middle of the column, which is the
         one direction that cannot run into the page edge. */
      /* 260, not 150: the old tail stopped well short of the bottom of
         the section and left the run-on looking cut off rather than
         trailing away. There is room for it. Measured at 1440, the tail
         used to end at y 2660 in a 2898px box, so this uses some of the
         238px that was empty and still finishes inside. */
      var run = 260;
      var hy = run * JR_HY;
      var endX = last.x - last.side * W * 0.16;
      var endY = last.y + run;

      return 'M' + last.x.toFixed(1) + ',' + last.y.toFixed(1) +
             ' C' + last.x.toFixed(1) + ',' + (last.y + hy).toFixed(1) +
             ' ' + endX.toFixed(1) + ',' + (endY - hy).toFixed(1) +
             ' ' + endX.toFixed(1) + ',' + endY.toFixed(1);
    }

    /* Length along the path at each anchor. The path goes through every
       anchor exactly, so this samples it once and keeps the nearest hit —
       far cheaper than rebuilding a sub-path per point, and it stays
       right however the spline bulges between them. */
    function measureMarks() {
      var total = jrLine.getTotalLength();
      /* Raised from 480 with the wide version: the path is roughly twice
         as long now and doubles back on itself, so a coarse walk could
         land a dot's nearest hit on the wrong side of a U-turn. */
      var steps = 900;
      var best = [];
      var i;

      for (i = 0; i < anchors.length; i++) { best.push({ d: Infinity, len: 0 }); }

      for (var s = 0; s <= steps; s++) {
        var len = total * s / steps;
        var pt = jrLine.getPointAtLength(len);

        for (i = 0; i < anchors.length; i++) {
          var ax = pt.x - anchors[i].x;
          var ay = pt.y - anchors[i].y;
          var dist = ax * ax + ay * ay;

          if (dist < best[i].d) { best[i].d = dist; best[i].len = len; }
        }
      }

      marks = best.map(function (b) { return b.len; });
      mainLen = total;
    }

    /* The dots now live in one layer of their own directly inside .jr,
       which is the same coordinate space the anchors are measured in, so
       placing them is a straight copy. They used to sit inside their
       cards and every position had to have the card's own offset
       subtracted back out; that went when the line moved on top of the
       cards, because a dot inside .jr__list can never paint above a
       sibling of the list however high its z-index. */
    function placeDots() {
      for (var i = 0; i < jrDots.length; i++) {
        if (jrDots[i] && anchors[i]) {
          jrDots[i].style.left = anchors[i].x.toFixed(1) + 'px';
          jrDots[i].style.top = anchors[i].y.toFixed(1) + 'px';
        }
      }
    }

    /* The cheap half: re-path and re-place, no length sampling. Run every
       frame while a card is opening, because the cards below it are
       sliding and the line has to keep up with them. */
    function repath() {
      anchors = readAnchors();
      jrLine.setAttribute('d', ribbon(anchors));
      jrTail.setAttribute('d', tailPath(anchors));
      placeDots();
    }

    function remeasureJr() {
      repath();
      measureMarks();
      drawJr();
    }

    function drawJr() {
      jrTicking = false;

      if (!mainLen) { return; }

      /* STEP 11: this used to short-circuit under reduced motion and draw
         the whole line at once. It draws normally now. The line is on the
         brief's always-run list and it earns the place: the drawing IS
         the content here, it is what says the five cards are one route
         rather than five boxes, and a stroke length changing is not
         movement across the viewport. The cards it brings in fade instead
         of rising, which the stylesheet's movement cap handles. */

      var vh = window.innerHeight || 1;
      var box = jr.getBoundingClientRect();
      var lastY = anchors.length ? anchors[anchors.length - 1].y : box.height;

      revealJr(vh);

      /* Drawing starts as the first card comes up the screen and is
         finished by the time the last dot is comfortably in view.
         box.top is the only thing that moves: it counts DOWN as you
         scroll, so progress is how far it has fallen from its starting
         value, over the distance between the two. */
      var startTop = vh * 0.72;
      var endTop = vh * 0.5 - lastY;
      var p = clamp01((startTop - box.top) / (startTop - endTop));

      jrLine.style.strokeDasharray = mainLen + ' ' + mainLen;
      jrLine.style.strokeDashoffset = (mainLen * (1 - p)).toFixed(1);

      var drawn = mainLen * p;

      for (var i = 0; i < jrDots.length; i++) {
        /* The floor keeps the first dot, whose mark is 0, from sitting
           there lit before a single pixel of line has been drawn */
        if (jrDots[i]) {
          jrDots[i].classList.toggle('is-on', drawn > 0 && drawn >= marks[i] - 2);
        }
      }

      jrTail.style.opacity = win(p, 0.9, 1).toFixed(3);
    }

    function queueJr() {
      if (!jrTicking) { jrTicking = true; requestAnimationFrame(drawJr); }
    }

    /* ---- the cards: reveal, and the year counting up ----------------- */

    /* An opened card states its year in full; a closed one abbreviates it.
       Same element, same size, same weight — only the digits change. */
    function yearText(el, open) {
      var n = parseInt(el.getAttribute('data-jr-year'), 10);

      if (open) { return el.getAttribute('data-jr-full') || String(2000 + n); }

      return "'" + (n < 10 ? '0' + n : String(n));
    }

    /* Runs every time a card arrives, not once for the life of the page, so
       the token is there to stop two count-ups racing on one element when
       the card is scrolled past quickly in both directions. */
    function countYear(el) {
      var target = parseInt(el.getAttribute('data-jr-year'), 10);

      if (isNaN(target)) { return; }

      var card = el.closest('[data-jr-card]');

      if (card && card.classList.contains('is-open')) {
        el.textContent = yearText(el, true);
        return;
      }

      function show(n) { el.textContent = "'" + (n < 10 ? '0' + n : String(n)); }

      /* STEP 11: the count-up runs under reduced motion too. Nothing
         moves: the digits change in place, in a box whose size is fixed
         by tabular figures. It is on the always-run list. */

      var token = (el.__run || 0) + 1;
      var start = 0;

      el.__run = token;

      function step(now) {
        if (el.__run !== token) { return; }
        if (start === 0) { start = now; }

        var t = clamp01((now - start) / 800);

        /* Settles rather than stops */
        show(Math.round(target * (1 - Math.pow(1 - t, 3))));

        if (t < 1) { requestAnimationFrame(step); }
      }

      show(0);
      requestAnimationFrame(step);
    }

    /* A card is in once its own top has come up past three quarters of the
       screen, and out again the moment it drops back below — the same
       scrollY that drives the line, read on the same frame, which is what
       keeps the card, its dot and the line arriving together. */
    function revealJr(vh) {
      for (var i = 0; i < jrItems.length; i++) {
        var item = jrItems[i];
        var show = item.getBoundingClientRect().top < vh * 0.75;

        if (show === item.classList.contains('is-in')) { continue; }

        item.classList.toggle('is-in', show);

        var year = item.querySelector('[data-jr-year]');

        if (show && year) { countYear(year); }
      }
    }

    /* ---- read more --------------------------------------------------
       One open at a time. Opening one makes the column below it taller,
       so the line is re-pathed on every frame of the transition — without
       that it would stay where the cards used to be and the dots would
       drift off it. */
    function follow() {
      if (animating > 0) {
        repath();
        if (mainLen) {
          mainLen = jrLine.getTotalLength();
          drawJr();
        }
        requestAnimationFrame(follow);
      }
    }

    function setOpen(card, open) {
      var btn = card.querySelector('[data-jr-more]');
      var year = card.querySelector('[data-jr-year]');

      if (card.classList.contains('is-open') === open) { return; }

      card.classList.toggle('is-open', open);
      if (btn) { btn.setAttribute('aria-expanded', open ? 'true' : 'false'); }

      if (year) {
        /* Cancels any count-up still in flight, so it cannot overwrite the
           full year a moment after the card has opened */
        year.__run = (year.__run || 0) + 1;
        year.textContent = yearText(year, open);
      }

      animating++;
      if (animating === 1) { requestAnimationFrame(follow); }

      window.setTimeout(function () {
        animating--;
        /* Settled: take the expensive reading again so the dots are back
           on the line exactly rather than approximately. */
        if (animating === 0) { remeasureJr(); }
      }, 500);
    }

    function closeAll(except) {
      var open = jr.querySelectorAll('[data-jr-card].is-open');

      for (var i = 0; i < open.length; i++) {
        if (open[i] !== except) { setOpen(open[i], false); }
      }
    }

    jr.addEventListener('click', function (event) {
      var more = event.target.closest('[data-jr-more]');

      if (more) {
        var card = more.closest('[data-jr-card]');
        closeAll(card);
        setOpen(card, true);
        return;
      }

      var close = event.target.closest('[data-jr-close]');

      if (close) {
        var owner = close.closest('[data-jr-card]');
        setOpen(owner, false);
        var back = owner.querySelector('[data-jr-more]');
        /* Focus was on a button that is about to be invisible */
        if (back) { back.focus(); }
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') { return; }

      var open = jr.querySelector('[data-jr-card].is-open');

      if (open) {
        setOpen(open, false);
        var back = open.querySelector('[data-jr-more]');
        if (back) { back.focus(); }
      }
    });

    /* ---- wiring ------------------------------------------------------ */

    var jrResize = null;

    function jrDebounced() {
      window.clearTimeout(jrResize);
      jrResize = window.setTimeout(remeasureJr, 150);
    }

    remeasureJr();
    window.addEventListener('scroll', queueJr, { passive: true });
    window.addEventListener('resize', jrDebounced);
    window.addEventListener('load', remeasureJr);

    /* Card heights depend on where the text wraps, which depends on the
       font that is still loading */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(jrDebounced);
    }

    if (jrNarrow.addEventListener) { jrNarrow.addEventListener('change', jrDebounced); }
  }


  /* ------------------------------------------------------------------
     STEP 4 - the strengths row

     Four claims with a number each, under the Work intro. The blocks come
     up one after another when the row arrives, and the figure inside each
     yellow marker counts up to its value.

     Deliberately once only, unlike the timeline cards below it: this row
     is read on the way past, not scrolled back and forth over, and a
     headline number that resets every time you scroll up would read as a
     glitch rather than as motion.
     ------------------------------------------------------------------ */

  var stRow = document.getElementById('st');

  if (stRow) {
    var stCounts = [].slice.call(stRow.querySelectorAll('[data-st-count]'));

    function stRun() {
      stRow.classList.add('is-in');

      /* STEP 11: the strength counters run under reduced motion too, for
         the same reason as the year count-up: the number changes in
         place, nothing travels. */

      for (var i = 0; i < stCounts.length; i++) {
        (function (el, delay) {
          var target = parseInt(el.getAttribute('data-st-count'), 10);

          if (isNaN(target)) { return; }

          el.textContent = '0';

          window.setTimeout(function () {
            var start = 0;

            function step(now) {
              if (start === 0) { start = now; }

              var t = (now - start) / 900;

              if (t > 1) { t = 1; }

              el.textContent = String(Math.round(target * (1 - Math.pow(1 - t, 3))));

              if (t < 1) { requestAnimationFrame(step); }
            }

            requestAnimationFrame(step);
          }, delay);
        }(stCounts[i], i * 90));
      }
    }

    if ('IntersectionObserver' in window) {
      var stSeen = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          stRun();
          stSeen.disconnect();
        }
      }, { rootMargin: '0px 0px -15% 0px' });

      stSeen.observe(stRow);
    } else {
      stRun();
    }
  }


  /* ------------------------------------------------------------------
     STEP 5 - What I Bring

     Two things live here.

     The reveal: the sentence is pinned for one extra viewport height, and
     how far through that you have scrolled decides how many of its words
     are in focus. Each word gets its own slice of the run, so they come
     in left to right; because it is read from scrollY every frame rather
     than played on a timer, scrolling back up runs it exactly backwards.

     The cards: a chip is a button, so the card opens on hover, on tap,
     and on Enter or Space. It is centred on its chip and then pushed back
     inside the viewport if that would hang it off an edge, and flipped
     above the chip if there is no room below.
     ------------------------------------------------------------------ */

  var wib = document.getElementById('wib');
  var wibLine = document.getElementById('wib-line');

  if (wib && wibLine) {
    var wibWords = [].slice.call(wibLine.querySelectorAll('.wib__w'));
    var wibSlots = [].slice.call(wibLine.querySelectorAll('.wib__slot'));
    var wibWide = window.matchMedia('(min-width: 900px)');
    var wibTicking = false;
    var wibOpen = null;

    function wibClamp(v) { return v < 0 ? 0 : (v > 1 ? 1 : v); }

    function wibDraw() {
      wibTicking = false;

      /* STEP 11: the word-by-word reveal runs under reduced motion now,
         as a fade only. The blur is what had to go, not the reveal: a
         focus pull is one of the strongest triggers on the list, and the
         opacity ramp on its own still reads the sentence left to right.
         Below 900px there is no pin and no reveal at all, so the words
         are simply left alone there. */
      var wibFade = reducedMotion.matches;

      if (!wibWide.matches) {
        for (var r = 0; r < wibWords.length; r++) {
          wibWords[r].style.opacity = '';
          wibWords[r].style.filter = '';
        }
        return;
      }

      var box = wib.getBoundingClientRect();
      var run = box.height - (window.innerHeight || 1);

      if (run <= 0) { return; }

      /* box.top counts down from 0 as the zone scrolls past */
      var p = wibClamp(-box.top / run);

      /* Every word is done by 0.85 so the last one is readable for a beat
         before the pin lets go, rather than arriving as it releases. */
      var span = 0.85;
      var step = span / wibWords.length;

      for (var i = 0; i < wibWords.length; i++) {
        /* A word holding an open card is shown in full whatever the scroll
           says: the card is its child, so the word's own opacity would
           otherwise be multiplied through the card and its text. */
        if (wibWords[i].classList.contains('is-lift')) {
          wibWords[i].style.opacity = '1';
          wibWords[i].style.filter = 'none';
          continue;
        }

        var t = wibClamp((p - i * step) / (step * 2.2));

        wibWords[i].style.opacity = (0.15 + 0.85 * t).toFixed(3);
        /* Fade only under reduced motion. The word still comes into
           focus, it just does it with opacity instead of a focus pull. */
        wibWords[i].style.filter = (wibFade || t >= 1)
          ? 'none'
          : 'blur(' + (4 * (1 - t)).toFixed(2) + 'px)';
      }
    }

    function wibQueue() {
      if (!wibTicking) { wibTicking = true; requestAnimationFrame(wibDraw); }
    }

    /* ---- the cards ---- */

    /* Safe to call while the card is open: it works out where the card
       WOULD sit unshifted, so re-running it on scroll does not accumulate
       an offset or flicker the flip on and off. */
    function wibPlace(slot) {
      var card = slot.querySelector('[data-wib-card]');
      var btn = slot.querySelector('[data-wib-chip]');

      if (!card || !btn || !wibWide.matches) { return; }

      var chip = btn.getBoundingClientRect();
      var vw = document.documentElement.clientWidth;
      var vh = window.innerHeight || 1;
      var rect = card.getBoundingClientRect();
      var had = parseFloat(slot.style.getPropertyValue('--wib-shift')) || 0;
      var pad = 12;

      /* Take the shift already applied back out before measuring */
      var left = rect.left - had;
      var right = rect.right - had;
      var shift = 0;

      if (left < pad) { shift = pad - left; }
      else if (right > vw - pad) { shift = (vw - pad) - right; }

      slot.style.setProperty('--wib-shift', Math.round(shift) + 'px');

      /* Above the chip when there is no room below it and there is above */
      var below = vh - chip.bottom;
      var above = chip.top;

      slot.classList.toggle('is-up',
        below < rect.height + 20 && above > rect.height + 20);
    }

    function wibShut(slot) {
      if (!slot) { return; }
      slot.classList.remove('is-open');

      if (slot.parentElement) { slot.parentElement.classList.remove('is-lift'); }

      var btn = slot.querySelector('[data-wib-chip]');
      if (btn) { btn.setAttribute('aria-expanded', 'false'); }
      if (wibOpen === slot) { wibOpen = null; }
      wibQueue();
    }

    function wibShow(slot) {
      if (wibOpen && wibOpen !== slot) { wibShut(wibOpen); }
      if (!slot || slot.classList.contains('is-open')) { return; }

      /* Measured while it is laid out but still invisible, so the flip and
         the nudge are decided before anyone sees it */
      /* Lifted before it is shown, so the card is never painted behind the
         words that come after it, even for one frame */
      if (slot.parentElement) { slot.parentElement.classList.add('is-lift'); }

      wibPlace(slot);
      slot.classList.add('is-open');

      var btn = slot.querySelector('[data-wib-chip]');
      if (btn) { btn.setAttribute('aria-expanded', 'true'); }

      wibOpen = slot;
      wibQueue();
    }

    for (var s = 0; s < wibSlots.length; s++) {
      (function (slot) {
        var btn = slot.querySelector('[data-wib-chip]');

        if (!btn) { return; }

        btn.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();

          if (slot.classList.contains('is-open')) { wibShut(slot); }
          else { wibShow(slot); }
        });

        /* Pointer only, so a tap does not open on hover and immediately
           close on the click that follows it */
        slot.addEventListener('pointerenter', function (event) {
          if (event.pointerType === 'mouse') { wibShow(slot); }
        });

        slot.addEventListener('pointerleave', function (event) {
          if (event.pointerType === 'mouse') { wibShut(slot); }
        });

        /* No open-on-focus. Focus alone opening the card would mean the
           Enter that follows it lands on an already-open card and closes
           it again, so the keyboard would be the one way in that does not
           work. Enter and Space arrive here as a click. Tabbing away does
           close it. */
        slot.addEventListener('focusout', function (event) {
          if (!slot.contains(event.relatedTarget)) { wibShut(slot); }
        });
      }(wibSlots[s]));
    }

    document.addEventListener('click', function (event) {
      if (wibOpen && !wibOpen.contains(event.target)) { wibShut(wibOpen); }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && wibOpen) {
        var btn = wibOpen.querySelector('[data-wib-chip]');
        wibShut(wibOpen);
        if (btn) { btn.focus(); }
      }
    });

    var wibResize = null;

    window.addEventListener('scroll', function () {
      wibQueue();

      /* Follow the chip rather than close. Closing on scroll looked
         reasonable until you reach a chip with the keyboard: focusing it
         scrolls it into view, that fires this handler, and the card shut
         again in the same frame it opened - so it could never be opened
         without a mouse at all. The card is anchored to the chip, so it
         moves on its own; only the flip and the nudge need redoing. */
      if (wibOpen) { wibPlace(wibOpen); }
    }, { passive: true });

    window.addEventListener('resize', function () {
      window.clearTimeout(wibResize);
      if (wibOpen) { wibShut(wibOpen); }
      wibResize = window.setTimeout(wibDraw, 120);
    });

    wibDraw();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(wibDraw);
    }

    if (wibWide.addEventListener) { wibWide.addEventListener('change', wibDraw); }
  }


  /* ------------------------------------------------------------------
     STEP 6 - How I Can Help

     One highlight, three cards. It is measured from where the cards
     actually are rather than assumed to be a third of the panel, so it
     stays right when the copy changes their widths or the panel reflows.

     The middle card is home. Hover moves the highlight to whichever card
     the cursor is over; leaving the panel sends it back.
     ------------------------------------------------------------------ */

  var hlp = document.getElementById('hlp');

  if (hlp) {
    var hlpGlide = hlp.querySelector('[data-hlp-glide]');
    var hlpCards = [].slice.call(hlp.querySelectorAll('[data-hlp-card]'));
    var hlpWide = window.matchMedia('(min-width: 900px)');
    var hlpHome = Math.floor(hlpCards.length / 2);
    var hlpAt = null;

    function hlpMove(card) {
      if (!hlpGlide || !card || !hlpWide.matches) { return; }

      hlpGlide.style.width = card.offsetWidth + 'px';
      hlpGlide.style.transform = 'translateX(' + card.offsetLeft + 'px)';
      hlpAt = card;
    }

    function hlpReset() { hlpMove(hlpCards[hlpHome]); }

    for (var i = 0; i < hlpCards.length; i++) {
      (function (card) {
        /* Pointer, not mouseenter: a tap should not leave the highlight
           stranded on a card the finger has already left. */
        card.addEventListener('pointerenter', function (event) {
          if (event.pointerType === 'mouse') { hlpMove(card); }
        });
      }(hlpCards[i]));
    }

    hlp.addEventListener('pointerleave', function (event) {
      if (event.pointerType === 'mouse') { hlpReset(); }
    });

    /* Keyboard users travel through the links inside the cards, so the
       highlight follows the focus too rather than sitting still. */
    hlp.addEventListener('focusin', function (event) {
      var card = event.target.closest('[data-hlp-card]');
      if (card) { hlpMove(card); }
    });

    hlp.addEventListener('focusout', function (event) {
      if (!hlp.contains(event.relatedTarget)) { hlpReset(); }
    });

    if ('IntersectionObserver' in window) {
      var hlpSeen = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          hlp.classList.add('is-in');
          hlpSeen.disconnect();
        }
      }, { rootMargin: '0px 0px -12% 0px' });

      hlpSeen.observe(hlp);
    } else {
      hlp.classList.add('is-in');
    }

    var hlpResize = null;

    window.addEventListener('resize', function () {
      window.clearTimeout(hlpResize);
      hlpResize = window.setTimeout(function () {
        /* Snap rather than glide to the new geometry: a resize is not an
           interaction, and watching it slide across would be noise. */
        var keep = hlpGlide ? hlpGlide.style.transition : '';

        if (hlpGlide) { hlpGlide.style.transition = 'none'; }

        hlpMove(hlpAt && hlpWide.matches ? hlpAt : hlpCards[hlpHome]);

        if (hlpGlide) {
          /* Read something back so the "none" is flushed before the real
             transition goes on again, or the browser collapses both into
             one style change and animates anyway. */
          void hlpGlide.offsetWidth;
          hlpGlide.style.transition = keep;
        }
      }, 120);
    });

    hlpReset();

    /* Card widths follow the text, and Inter lands after the first paint */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(hlpReset);
    }

    window.addEventListener('load', hlpReset);

    if (hlpWide.addEventListener) { hlpWide.addEventListener('change', hlpReset); }
  }


  /* ------------------------------------------------------------------
     The sidebar over the dark band

     There was no existing "dark section switch" to reuse - I looked for
     one when the old Work section was deleted and there never was any.
     This is new.

     Each sidebar panel decides for itself. On every scroll frame it
     compares its own middle against the dark section's top and bottom
     edges, so as the band rises the panels flip one after another from
     the bottom of the column up, and back again on the way down. The
     middle, not the top edge: switching on the edge means a panel spends
     several hundred pixels of scroll half in one world and half in the
     other, which reads as a rendering fault rather than as a design.

     The colours are all in style.css under .sb__panel.is-dark - this only
     decides which panels wear it.
     ------------------------------------------------------------------ */

  var darkBand = document.getElementById('content');
  var sbPanelsDark = document.querySelectorAll('#sb .sb__panel, #sb .sb__resume');

  if (darkBand && sbPanelsDark.length) {
    var darkWide = window.matchMedia('(min-width: 900px)');
    var darkTicking = false;

    function darkPaint() {
      darkTicking = false;

      var band = darkBand.getBoundingClientRect();
      var on = darkWide.matches;

      for (var i = 0; i < sbPanelsDark.length; i++) {
        var p = sbPanelsDark[i].getBoundingClientRect();
        var mid = p.top + p.height / 2;

        sbPanelsDark[i].classList.toggle('is-dark',
          on && mid >= band.top && mid <= band.bottom);
      }
    }

    function darkQueue() {
      if (!darkTicking) { darkTicking = true; requestAnimationFrame(darkPaint); }
    }

    window.addEventListener('scroll', darkQueue, { passive: true });
    window.addEventListener('resize', darkQueue);

    if (darkWide.addEventListener) { darkWide.addEventListener('change', darkQueue); }

    darkPaint();
  }


  /* The video row's cards come up one after another when the row arrives.
     Once only: the row is scrolled sideways, not up and down past. */
  var vidRail = document.querySelector('.vid__rail');

  if (vidRail) {
    if ('IntersectionObserver' in window) {
      var vidSeen = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          vidRail.classList.add('is-in');
          vidSeen.disconnect();
        }
      }, { rootMargin: '0px 0px -12% 0px' });

      vidSeen.observe(vidRail);
    } else {
      vidRail.classList.add('is-in');
    }
  }


  /* ------------------------------------------------------------------
     What People Say

     Three things: the dash indicator over the row, the drag puck that
     replaces the cursor while the pointer is over it, and the entrance.

     The puck follows the pointer by lerp rather than by writing the raw
     position, so it trails the hand slightly instead of being welded to
     it. It only exists on a fine pointer: on a touch screen there is no
     cursor to replace and nothing to tell the visitor to drag with.
     ------------------------------------------------------------------ */

  var sayRail = document.getElementById('say-rail');

  if (sayRail) {
    var sayRow = sayRail.querySelector('[data-rail-row]');
    var sayDashes = [].slice.call(document.querySelectorAll('[data-say-dash]'));
    var sayItems = [].slice.call(sayRail.querySelectorAll('.say__item'));

    /* ---- the dash indicator ---- */

    /* Centres, not left edges. The row cannot scroll the last card's left
       edge up to its own left edge - it runs out of scroll first - so a
       left-edge test reports the second-to-last card as current even when
       the last one is the only one properly on screen. */
    function sayNearest() {
      if (!sayRow || !sayItems.length) { return 0; }

      var box = sayRow.getBoundingClientRect();
      var mid = box.left + box.width / 2;
      var best = 0;
      var bestGap = Infinity;

      for (var i = 0; i < sayItems.length; i++) {
        var r = sayItems[i].getBoundingClientRect();
        var gap = Math.abs((r.left + r.width / 2) - mid);

        if (gap < bestGap) { bestGap = gap; best = i; }
      }

      return best;
    }

    function sayPaint() {
      var at = sayNearest();

      for (var i = 0; i < sayDashes.length; i++) {
        sayDashes[i].classList.toggle('is-on', i === at);
        sayDashes[i].setAttribute('aria-current', i === at ? 'true' : 'false');
      }
    }

    if (sayRow) {
      sayRow.addEventListener('scroll', sayPaint, { passive: true });
      window.addEventListener('resize', sayPaint);
      sayPaint();
    }

    for (var d = 0; d < sayDashes.length; d++) {
      (function (index) {
        sayDashes[index].addEventListener('click', function () {
          if (!sayRow || !sayItems[index]) { return; }

          sayRow.scrollTo({
            left: sayItems[index].offsetLeft - sayItems[0].offsetLeft,
            behavior: reducedMotion.matches ? 'auto' : 'smooth'
          });
        });
      }(d));
    }

    /* ---- the drag puck ---- */

    var sayCursor = document.getElementById('say-cursor');
    var sayFine = window.matchMedia('(hover: hover) and (pointer: fine)');

    if (sayCursor && sayRow) {
      var puckX = 0, puckY = 0, aimX = 0, aimY = 0;
      var puckOn = false, puckRaf = 0;

      function puckFrame() {
        puckX += (aimX - puckX) * 0.18;
        puckY += (aimY - puckY) * 0.18;

        sayCursor.style.transform =
          'translate3d(' + puckX.toFixed(1) + 'px, ' + puckY.toFixed(1) + 'px, 0) translate(-50%, -50%)';

        if (puckOn) { puckRaf = requestAnimationFrame(puckFrame); }
        else { puckRaf = 0; }
      }

      sayRow.addEventListener('pointerenter', function (event) {
        if (event.pointerType !== 'mouse' || !sayFine.matches) { return; }

        aimX = puckX = event.clientX;
        aimY = puckY = event.clientY;
        puckOn = true;
        sayCursor.classList.add('is-on');
        /* Hide the site's own cursor so there are never two */
        document.body.classList.add('is-say-drag');

        if (!puckRaf) { puckRaf = requestAnimationFrame(puckFrame); }
      });

      sayRow.addEventListener('pointermove', function (event) {
        if (event.pointerType !== 'mouse') { return; }
        aimX = event.clientX;
        aimY = event.clientY;
      });

      sayRow.addEventListener('pointerleave', function (event) {
        if (event.pointerType !== 'mouse') { return; }
        puckOn = false;
        sayCursor.classList.remove('is-on', 'is-held');
        document.body.classList.remove('is-say-drag');
      });

      sayRow.addEventListener('pointerdown', function (event) {
        if (event.pointerType === 'mouse') { sayCursor.classList.add('is-held'); }
      });

      window.addEventListener('pointerup', function () {
        sayCursor.classList.remove('is-held');
      });

      if (sayFine.addEventListener) {
        sayFine.addEventListener('change', function () {
          if (!sayFine.matches) {
            puckOn = false;
            sayCursor.classList.remove('is-on', 'is-held');
            document.body.classList.remove('is-say-drag');
          }
        });
      }
    }

    /* ---- entrance ---- */

    if ('IntersectionObserver' in window) {
      var saySeen = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          sayRail.classList.add('is-in');
          saySeen.disconnect();
        }
      }, { rootMargin: '0px 0px -12% 0px' });

      saySeen.observe(sayRail);
    } else {
      sayRail.classList.add('is-in');
    }
  }


  /* ------------------------------------------------------------------
     The name divider, and the photo trail inside it

     The letters are SVG text, and the clipPath uses those same nodes, so
     the yellow you see and the window the photographs appear through can
     never drift apart.

     Sizing follows the hero's rule: both lines share one size, and the
     longer word spans about 92% of the width. That is measured rather
     than guessed - getComputedTextLength after the font has actually
     loaded - so it holds at any width and survives a change of face.

     The trail spawns on DISTANCE TRAVELLED, not on pointer events. A
     pointermove can fire sixty times crossing ten pixels, and one image
     per event would be a wall of pictures rather than a trail.
     ------------------------------------------------------------------ */

  var mb = document.getElementById('mb');
  var mbSvg = document.getElementById('mb-svg');
  var mbTrail = document.getElementById('mb-trail');

  if (mb && mbSvg && mbTrail) {
    var MB_VIEW_W = 1000;
    var MB_VIEW_H = 420;

    /* All sixteen files in assets/collages, listed rather than globbed,
       and percent-encoded because that is how two of them are spelled on
       disk: one has spaces, one is an emoji. Both were checked over HTTP
       and both serve. CLAUDE.md forbids inventing or renaming asset
       filenames, so they go in as they are. */
    var MB_SHOTS = [
      'assets/collages/download%20(26).jfif',
      'assets/collages/download%20(27).jfif',
      'assets/collages/download%20(28).jfif',
      'assets/collages/download%20(29).jfif',
      'assets/collages/download%20(30).jfif',
      'assets/collages/download%20(31).jfif',
      'assets/collages/download%20(32).jfif',
      'assets/collages/download%20(33).jfif',
      'assets/collages/download%20(34).jfif',
      'assets/collages/download%20(44).jfif',
      'assets/collages/download%20(45).jfif',
      'assets/collages/download%20(46).jfif',
      'assets/collages/download%20(47).jfif',
      'assets/collages/download%20(48).jfif',
      'assets/collages/_Faroe%20Islands_%20The%20Iconic%20Grass-Roofed%20Cottage_.jfif',
      'assets/collages/%F0%9F%96%A4_.jfif'
    ];

    var mbT1 = document.getElementById('mb-t1');
    var mbT2 = document.getElementById('mb-t2');
    var mbFine = window.matchMedia('(hover: hover) and (pointer: fine)');

    /* There is nothing else to keep in step any more. The outline is a
       stroke on these two nodes and the clip is a <use> of them, so sizing
       them sizes everything the section draws. */

    /* ---- size the two lines so the longer one fills ~92% ---- */

    /* MB_SIZE in style.css is the measured size that puts ELHAYYANY on 92%
       of the viewBox with Inter loaded. It is a real number rather than a
       starting guess: the viewBox is a fixed 1000 x 420 whatever the screen
       does, so the right size in user units never changes with the window.
       The page is therefore correct with no JavaScript, and correct on the
       very first paint.

       This only nudges it, for the case where Inter has not arrived and a
       fallback face with different metrics is standing in. */
    function mbFit() {
      if (!mbT1 || !mbT2 || !mbT1.getComputedTextLength) { return; }

      var target = MB_VIEW_W * 0.92;

      /* Read the size actually in force rather than one this function put
         there, so repeated calls cannot walk it anywhere. */
      var size = parseFloat(window.getComputedStyle(mbT1).fontSize);

      if (!size) { return; }

      /* A layout read on the element itself. Writing style.fontSize on an
         SVG <text> and calling getComputedTextLength straight afterwards
         can hand back the PREVIOUS size's width: getBBox does not reliably
         flush it. Measuring what is already there sidesteps the question. */
      var widest = Math.max(mbT1.getComputedTextLength(), mbT2.getComputedTextLength());

      /* A reading this far from the mark is not a font with different
         metrics, it is a bad measurement, and acting on it is how the name
         ends up two pixels tall. */
      if (widest > target * 0.5 && widest < target * 2) {
        size = size * (target / widest);
        mbT1.style.fontSize = size + 'px';
        mbT2.style.fontSize = size + 'px';
      }

      /* Two lines at 0.86 line-height, centred in the box. y is a baseline,
         so each drops by roughly its own cap height. */
      var lead = size * 0.86;
      var top = (MB_VIEW_H - lead * 2) / 2;
      mbT1.setAttribute('y', (top + lead * 0.78).toFixed(1));
      mbT2.setAttribute('y', (top + lead + lead * 0.78).toFixed(1));
    }

    mbFit();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(mbFit);
    }

    var mbResize = null;

    window.addEventListener('resize', function () {
      window.clearTimeout(mbResize);
      mbResize = window.setTimeout(mbFit, 150);
    });

    /* ---- the trail ----

       Rebuilt for frame rate. The old version created an <image> on every
       spawn and removed it on two nested timers, so a fast scribble across
       the name meant a dozen node insertions and removals a second, each
       one a fresh image load, each one starting its own CSS transition,
       all of it landing inside a clipped group. Four things fixed, in the
       order they cost:

       1. Nothing is created or destroyed while the animation runs. A pool
          of eight <image> nodes is built once and reused for ever.
       2. Every picture is fetched AND decoded before the section can be
          reached, and the Image objects are kept in an array so nothing is
          collected and re-decoded later. A decode on the first frame of a
          gesture is the single most visible stall there is.
       3. One requestAnimationFrame loop does all the work. pointermove is
          passive and records two numbers.
       4. Position is transform: translate3d only. x, y, width and height
          are attributes written once at init, so a spawn never touches
          geometry and never invalidates layout.

       The clip is not rebuilt at all: it is the same two <text> nodes the
       letters are drawn from, sitting in the markup. mbFit() resizes them
       on font load and on resize, which is the only time they move. */

    if (!reducedMotion.matches) {
      var SPAWN_EVERY = 90;   /* SCREEN px of pointer travel between pictures */
      var LIFE = 1200;        /* ms at full strength before the fade out */
      var FADE_IN = 140;
      var FADE_OUT = 420;
      var POOL = 8;           /* fixed, created once, never added to */
      var SHOT_W = 300;
      var SHOT_H = 210;

      var mbLastX = null, mbLastY = null, mbRun = 0, mbPick = 0;

      /* ---- the pool ----
         x and y are set to minus half the box, so translate3d(x, y) puts
         the CENTRE of the picture on the pointer and the transform is the
         only thing that ever changes. */
      var mbPool = [];
      var mbBorn = [];        /* spawn time per slot, 0 means free */
      var mbSlot = 0;

      (function () {
        for (var i = 0; i < POOL; i++) {
          var el = document.createElementNS('http://www.w3.org/2000/svg', 'image');

          el.setAttributeNS(null, 'x', (-SHOT_W / 2).toFixed(1));
          el.setAttributeNS(null, 'y', (-SHOT_H / 2).toFixed(1));
          el.setAttributeNS(null, 'width', SHOT_W);
          el.setAttributeNS(null, 'height', SHOT_H);
          el.setAttributeNS(null, 'preserveAspectRatio', 'xMidYMid slice');
          el.setAttribute('class', 'mb__shot');
          el.style.opacity = '0';

          mbTrail.appendChild(el);
          mbPool.push(el);
          mbBorn.push(0);
        }
      }());

      /* ---- warm every picture up before it is needed ----
         new Image() gets it over the wire; decode() turns it into a bitmap
         off the main thread. Both have to happen, and both have to happen
         EARLY: an <image href> set for the first time mid-gesture pays for
         the fetch and the decode on the frame it is set.

         The array is not bookkeeping, it is the point. Drop the references
         and the browser is free to throw the decoded bitmaps away, and the
         second pass across the name stalls exactly like the first. */
      var mbWarm = [];
      var mbWarmed = false;

      function mbWarmUp() {
        if (mbWarmed) { return; }

        mbWarmed = true;

        for (var i = 0; i < MB_SHOTS.length; i++) {
          var im = new Image();

          im.decoding = 'async';
          im.src = MB_SHOTS[i];
          mbWarm.push(im);

          /* A rejection here is a missing file or a file:// quirk, not
             something to report: the trail simply has one fewer picture. */
          if (im.decode) { im.decode()['catch'](function () {}); }
        }
      }

      if (window.IntersectionObserver) {
        /* Two viewports of warning. Far enough that the work is finished
           long before the name is on screen, near enough that a visitor
           who never scrolls down never pays for it. */
        var mbIO = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) { mbWarmUp(); mbIO.disconnect(); }
        }, { rootMargin: '200% 0px' });

        mbIO.observe(mb);
      } else {
        window.addEventListener('load', mbWarmUp);
      }

      /* Client pixels to viewBox units. preserveAspectRatio is meet, so the
         drawing is letterboxed inside the element and the pointer has to be
         mapped through that box rather than through the element's own
         edges. Called once a frame, from the frame, never from an event. */
      function mbMap(cx, cy) {
        var box = mbSvg.getBoundingClientRect();

        if (!box.width || !box.height) { return null; }

        var scale = Math.min(box.width / MB_VIEW_W, box.height / MB_VIEW_H);
        var offX = box.left + (box.width - MB_VIEW_W * scale) / 2;
        var offY = box.top + (box.height - MB_VIEW_H * scale) / 2;

        return { x: (cx - offX) / scale, y: (cy - offY) / scale };
      }

      /* Take the next slot round. The oldest picture in the pool is the one
         that goes, which is what a fixed pool means: scribble fast enough
         and the tail is shorter, rather than the page filling with nodes.
         At an ordinary mouse speed eight slots last about as long as one
         picture's life, so the ceiling is never reached. */
      function mbSpawn(x, y, now) {
        var at = mbSlot;
        var el = mbPool[at];
        var src = MB_SHOTS[mbPick % MB_SHOTS.length];

        mbSlot = (mbSlot + 1) % POOL;
        mbPick++;

        /* The href is the one attribute that still changes, and only when
           this slot's turn comes round to a different picture. The bitmap
           is already decoded, so it is a pointer swap, not a load. */
        if (el.__src !== src) {
          el.setAttributeNS(null, 'href', src);
          el.__src = src;
        }

        el.style.transform =
          'translate3d(' + x.toFixed(1) + 'px, ' + y.toFixed(1) + 'px, 0)';

        mbBorn[at] = now;
      }

      /* ---- the one loop ----
         Spawning and fading both live here. Nothing is on a timer, so
         there is no drift between the two and no timer left running after
         the pointer has gone. It stops itself the moment there is nothing
         on screen and no pointer over the name, and costs nothing at all
         for the rest of the visit. */
      var mbRAF = 0;
      var mbPX = 0, mbPY = 0, mbHave = false;

      function mbFrame(now) {
        var alive = 0;
        var i;

        mbRAF = 0;

        if (mbHave) {
          var p = mbMap(mbPX, mbPY);

          if (p) {
            if (mbLastX === null) { mbLastX = mbPX; mbLastY = mbPY; }

            var dx = mbPX - mbLastX;
            var dy = mbPY - mbLastY;

            /* Distance travelled, not events fired. A pointermove can
               report sixty times over ten pixels, and spawning per event
               is how the old one buried itself. */
            mbRun += Math.sqrt(dx * dx + dy * dy);
            mbLastX = mbPX;
            mbLastY = mbPY;

            if (mbRun >= SPAWN_EVERY) {
              mbRun = 0;
              mbSpawn(p.x, p.y, now);
            }
          }
        }

        for (i = 0; i < POOL; i++) {
          if (!mbBorn[i]) { continue; }

          var age = now - mbBorn[i];

          if (age >= LIFE + FADE_OUT) {
            mbBorn[i] = 0;
            mbPool[i].style.opacity = '0';
            continue;
          }

          alive++;

          mbPool[i].style.opacity = (age < FADE_IN ? age / FADE_IN
            : age < LIFE ? 1
            : 1 - (age - LIFE) / FADE_OUT).toFixed(3);
        }

        if (mbHave || alive) { mbRAF = requestAnimationFrame(mbFrame); }
      }

      function mbKick() {
        if (!mbRAF) { mbRAF = requestAnimationFrame(mbFrame); }
      }

      /* Two writes and a boolean. Everything else waits for the frame. */
      mb.addEventListener('pointermove', function (event) {
        if (event.pointerType !== 'mouse' || !mbFine.matches) { return; }

        mbPX = event.clientX;
        mbPY = event.clientY;
        mbHave = true;
        mbKick();
      }, { passive: true });

      mb.addEventListener('pointerleave', function () {
        mbHave = false;
        mbLastX = null;
        mbLastY = null;
        mbRun = 0;
      }, { passive: true });
    }
  }

  /* ------------------------------------------------------------------
     STEP 11 - the top bar hides going down and comes back going up

     Phone only. The bar is 60px of a 844px screen, which is worth giving
     back while someone is reading, and worth having within reach the
     moment they turn round and head for the nav.

     A threshold and a floor, because neither on its own behaves. Without
     the 6px threshold the bar flickers on the sub-pixel jitter iOS
     produces at the end of a flick; without the 80px floor it hides while
     the hero is still on screen, which looks like a bug rather than a
     behaviour. It never hides while the menu is open, or the close button
     would go with it.
     ------------------------------------------------------------------ */

  var topbar = document.getElementById('topbar');

  if (topbar) {
    var tbLast = window.scrollY;
    var tbTicking = false;
    var TB_FLOOR = 80;
    var TB_STEP = 6;

    function tbApply() {
      tbTicking = false;

      var y = window.scrollY;
      var delta = y - tbLast;

      if (Math.abs(delta) < TB_STEP) { return; }

      /* The menu owns the bar while it is open: the burger inside it is
         the close button. */
      var open = document.body.classList.contains('is-locked');

      topbar.classList.toggle('is-tucked', delta > 0 && y > TB_FLOOR && !open);
      tbLast = y;
    }

    window.addEventListener('scroll', function () {
      if (!tbTicking) { tbTicking = true; requestAnimationFrame(tbApply); }
    }, { passive: true });
  }

  /* ------------------------------------------------------------------
     STEP 20 - Contact: the conversation

     Replaces "The Line That Connects", which is gone from this file, from
     style.css and from index.html, and the laptop typing scene before it.

     A chat panel plays a short exchange when it comes into view, then the
     three contact methods arrive as the actions in the bar.

     The run is a chain of timeouts rather than one keyframe, because it
     is a sequence of separate things happening in order at conversation
     pace rather than one thing moving. All the handles go in one array so
     it can be cancelled in a single pass.
     ------------------------------------------------------------------ */

  var cv = document.getElementById('cv');

  if (cv) {
    var cvSteps = [].slice.call(cv.querySelectorAll('[data-cv-step]'));
    var cvActs = [].slice.call(cv.querySelectorAll('[data-cv-act]'));
    var cvTime = cv.querySelector('[data-cv-time]');
    var cvTimers = [];

    /* ---- the live timestamp ----
       The visitor's own clock, in their own locale and timezone, rather
       than a frozen 09:41. A fixed time on a page someone opens at
       midnight is the same small lie as a green dot that is always on.
       Written into a <time> with a machine-readable datetime, and if
       anything here throws the element simply stays empty and the line
       reads "Delivered", which is why the separator is generated by CSS
       from :not(:empty) rather than typed into the markup. */
    function cvStamp() {
      if (!cvTime) { return; }

      try {
        var now = new Date();

        cvTime.textContent = now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        });

        cvTime.setAttribute('datetime',
          now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes());
      } catch (e) {
        cvTime.textContent = '';
      }
    }

    cvStamp();

    /* A tab left open overnight would still be claiming the message
       arrived at breakfast. Re-read the clock when the page is looked at
       again; nothing runs while it is hidden. */
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) { cvStamp(); }
    });

    /* ---- the run ---- */

    function cvAt(delay, fn) {
      cvTimers.push(window.setTimeout(fn, delay));
    }

    function cvShow(el) {
      if (el) { el.classList.add('is-in'); }
    }

    function cvPlay() {
      /* Message beats, not UI beats. Each bubble's own entrance is 200ms
         (see style.css); these are the gaps BETWEEN them, and they are
         long on purpose, because the thing being animated is a
         conversation and a conversation has pauses. Read the pauses as
         content, not as easing.

         The typing dots do double duty. They appear before the reply, so
         the reply looks composed rather than pasted, then disappear as it
         lands, then come back at the end where they read as the OTHER
         side starting to type: an invitation rather than a promise. */
      cvAt(180, function () { cvShow(cvSteps[0]); });          /* the question */
      cvAt(620, function () { cvShow(cvSteps[3]); });          /* dots: composing */
      cvAt(1680, function () {
        if (cvSteps[3]) { cvSteps[3].classList.remove('is-in'); }
        cvShow(cvSteps[1]);                                    /* the answer */
      });
      cvAt(1960, function () { cvShow(cvSteps[2]); });         /* Delivered */

      /* The three actions, 70ms apart. Everything arriving at once reads
         as a single block appearing; 70ms is enough to see them as three
         separate things without making anyone wait for the third. */
      for (var i = 0; i < cvActs.length; i++) {
        (function (el, n) {
          cvAt(2240 + n * 70, function () { cvShow(el); });
        })(cvActs[i], i);
      }

      /* And the dots return, after the last action has landed. */
      cvAt(2240 + cvActs.length * 70 + 420, function () { cvShow(cvSteps[3]); });
    }

    function cvFinish() {
      for (var i = 0; i < cvTimers.length; i++) { window.clearTimeout(cvTimers[i]); }

      cvTimers.length = 0;

      for (var s = 0; s < cvSteps.length; s++) { cvShow(cvSteps[s]); }
      for (var a = 0; a < cvActs.length; a++) { cvShow(cvActs[a]); }
    }

    /* ---- arming ----
       The markup is the finished state, so .is-live is what winds it back,
       and it is only ever written immediately before the run starts. A
       visitor whose browser never fires the observer, or who has
       JavaScript off, keeps the whole conversation and all three
       addresses. Those addresses are the point of the section; they are
       never staked on a gesture that may not come. */
    function cvArm() {
      cv.classList.add('is-live');

      /* Under reduced motion the bubbles still arrive in order, because
         the order IS the content, but style.css takes the travel and the
         scale out and they only fade. Nothing about the timing changes,
         so there is one sequence to reason about rather than two. */
      cvPlay();
    }

    if (window.IntersectionObserver) {
      var cvIO = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) { return; }

        cvIO.disconnect();
        cvArm();
      }, {
        /* 0.55 of the panel, and the bottom 12% of the viewport does not
           count as "seen".

           0.4 with no margin started the conversation too early: the
           panel is about 477px tall at 1440x900, so 40% of it is 191px,
           and 191px creeping above the fold is enough to fire while the
           panel is still mostly below the screen. The first bubble had
           been and gone before you arrived.

           Together these put the trigger at roughly the panel's top
           crossing the middle of the screen, which is where a reader has
           actually arrived at the section rather than merely approaching
           it. Still the PANEL and not the section: the section is taller
           than a phone screen, so a threshold on it could never be met
           and the run would never start. That is the trap the laptop
           scene hit. */
        threshold: 0.55,
        rootMargin: '0px 0px -12% 0px'
      });

      cvIO.observe(cv.querySelector('[data-cv-panel]') || cv);
    }

    /* If the panel is torn off screen mid-run, or the tab is closed, the
       timers would keep firing into nothing. Cheap insurance. */
    window.addEventListener('pagehide', cvFinish);
  }

  /* ------------------------------------------------------------------
     Copy to clipboard

     Kept from the old Contact section and lifted out of it: it belonged
     to the email card, not to the laptop, and the laptop is gone.

     navigator.clipboard needs a secure context, and a page opened by
     double-clicking index.html is not one, which is the case this site
     actually has to work in. So there is a hidden textarea and
     execCommand behind it.
     ------------------------------------------------------------------ */

  function ctCopyFallback(text) {
    var pad = document.createElement('textarea');

    pad.value = text;
    pad.setAttribute('readonly', '');
    pad.style.position = 'fixed';
    pad.style.top = '-1000px';
    pad.style.opacity = '0';

    document.body.appendChild(pad);
    pad.select();

    try {
      document.execCommand('copy');
    } catch (e) {
      /* Nothing useful to do: the label below still says Copied, and the
         address is selectable on the card either way. */
    }

    document.body.removeChild(pad);
  }

  function ctCopy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).catch(function () {
        ctCopyFallback(text);
      });

      return;
    }

    ctCopyFallback(text);
  }

  var ctCopyBtns = document.querySelectorAll('[data-ct-copy]');

  for (var cb = 0; cb < ctCopyBtns.length; cb++) {
    (function (btn) {
      var label = btn.querySelector('[data-ct-copylabel]') || btn;
      var resting = label.textContent;
      var back = null;

      btn.addEventListener('click', function () {
        ctCopy(btn.getAttribute('data-ct-copy'));

        label.textContent = 'Copied';

        if (back) { clearTimeout(back); }

        back = setTimeout(function () {
          back = null;
          label.textContent = resting;
        }, 1500);
      });
    })(ctCopyBtns[cb]);
  }

})();
