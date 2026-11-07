/* Zashi Magazine — small runtime: scale layouts, lazy-play GIF videos, entrance animations, menus, signup popup. */
(function () {
  var root = document.documentElement;

  function fit() {
    var vw = root.clientWidth;
    root.style.setProperty('--zd', Math.min(1, vw / 1280));
    root.style.setProperty('--zm', vw / 320);
  }
  fit();
  window.addEventListener('resize', fit);

  var vids = [].slice.call(document.querySelectorAll('video.lazyv'));
  var anims = [].slice.call(document.querySelectorAll('.anim'));
  if ('IntersectionObserver' in window) {
    var vo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          if (!v.getAttribute('src')) v.src = v.getAttribute('data-src');
          var p = v.play(); if (p && p.catch) p.catch(function () {});
        } else if (v.getAttribute('src')) { v.pause(); }
      });
    }, { rootMargin: '300px 0px' });
    vids.forEach(function (v) { vo.observe(v); });
    var ao = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('run'); ao.unobserve(e.target); }
      });
    }, { threshold: 0.01 });
    anims.forEach(function (el) { ao.observe(el); });
  } else {
    vids.forEach(function (v) { v.src = v.getAttribute('data-src'); });
    anims.forEach(function (el) { el.classList.add('run'); });
  }

  // slideshow galleries
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.gal.ss').forEach(function (g) {
    var figs = [].slice.call(g.querySelectorAll('figure')), i = 0, timer = null;
    if (figs.length < 2) return;
    var warm = function (n) { var im = figs[(n + figs.length) % figs.length].querySelector('img'); if (im) im.loading = 'eager'; };
    var show = function (n) { figs[i].classList.remove('on'); i = (n + figs.length) % figs.length; figs[i].classList.add('on'); warm(i + 1); };
    warm(0); warm(1);
    g.querySelector('.prev').addEventListener('click', function () { show(i - 1); });
    g.querySelector('.next').addEventListener('click', function () { show(i + 1); });
    var ms = +g.getAttribute('data-auto');
    var start = function () { if (ms && !still && !timer) timer = setInterval(function () { show(i + 1); }, ms); };
    var stop = function () { clearInterval(timer); timer = null; };
    g.addEventListener('mouseenter', stop); g.addEventListener('mouseleave', start);
    g.addEventListener('focusin', stop); g.addEventListener('focusout', start);
    start();
  });
  // scrolling strips
  document.querySelectorAll('.gal.sl').forEach(function (g) {
    var t = g.querySelector('.sl-track');
    var step = function () { var im = t.querySelector('img'); return im ? im.offsetWidth + parseFloat(getComputedStyle(t).columnGap || 0) : 200; };
    g.querySelector('.prev').addEventListener('click', function () { t.scrollBy({ left: -step(), behavior: still ? 'auto' : 'smooth' }); });
    g.querySelector('.next').addEventListener('click', function () { t.scrollBy({ left: step(), behavior: still ? 'auto' : 'smooth' }); });
  });

  // phone menu
  var mm = document.getElementById('mmenu');
  document.querySelectorAll('.burger').forEach(function (b) {
    b.addEventListener('click', function () { mm.hidden = false; b.setAttribute('aria-expanded', 'true'); });
  });
  if (mm) {
    mm.querySelector('.x').addEventListener('click', function () {
      mm.hidden = true;
      document.querySelectorAll('.burger').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    });
  }

  // newsletter popup (shown once per visitor)
  var pop = document.getElementById('signup');
  if (pop) {
    var KEY = 'zashi-signup-seen', seen = false;
    try { seen = localStorage.getItem(KEY) === '1'; } catch (e) {}
    if (!seen) setTimeout(function () { pop.hidden = false; }, 1500);
    var close = function () { pop.hidden = true; try { localStorage.setItem(KEY, '1'); } catch (e) {} };
    pop.querySelector('.x').addEventListener('click', close);
    var form = pop.querySelector('form');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var email = form.email.value.trim();
      var say = function (msg) { form.innerHTML = '<p class="thanks">' + msg + '</p>'; };
      // Set window.ZASHI_SIGNUP_URL to a newsletter service endpoint (e.g. Buttondown) to collect signups directly.
      if (window.ZASHI_SIGNUP_URL) {
        var fd = new FormData(); fd.append('email', email);
        fetch(window.ZASHI_SIGNUP_URL, { method: 'POST', body: fd })
          .then(function (r) {
            if (!r.ok) throw new Error(r.status);
            say('Thank you! You\u2019re on the list.');
            try { localStorage.setItem(KEY, '1'); } catch (e) {}
          })
          .catch(function () { say('That didn\u2019t go through. Try again, or email contact@zashimagazine.com.'); });
      } else {
        say('Signups aren\u2019t switched on yet. Email contact@zashimagazine.com to join the list.');
      }
    });
  }
})();
