/*
 * public/js/hero.js
 *
 * Three things happen here:
 *   1. Clicking the hero wordmark cycles through a colour palette (the "pop").
 *   2. navigateWithDoors() triggers the page-transition animation before any
 *      internal navigation — keeps the door close/open effect consistent.
 *   3. The school fruit buttons in the basket hero route to /explore/:school
 *      through that same door transition.
 */

// ── Hero wordmark colour-pop interaction ──────────────────────────────────────
const wordmark = document.querySelector('.hero-wordmark');
if (wordmark) {
  const palette = [
    { text: 'var(--green)',  shadow: 'rgba(73,173,119,.28)',  year: 'var(--red)'    },
    { text: 'var(--red)',    shadow: 'rgba(226,58,41,.28)',   year: 'var(--green)'  },
    { text: 'var(--blue)',   shadow: 'rgba(60,115,214,.28)',  year: 'var(--yellow)' },
    { text: 'var(--orange)', shadow: 'rgba(255,120,40,.28)',  year: 'var(--blue)'   },
    { text: 'var(--pink)',   shadow: 'rgba(234,90,137,.28)',  year: 'var(--yellow)' },
    { text: 'var(--yellow)', shadow: 'rgba(241,173,43,.28)',  year: 'var(--ink)'    },
  ];

  let idx = 0;
  const yearEl = wordmark.querySelector('.title-year');

  wordmark.setAttribute('role', 'button');
  wordmark.setAttribute('tabindex', '0');
  wordmark.setAttribute('aria-label', 'VIVACE — click to change colour');

  function pop() {
    idx = (idx + 1) % palette.length;
    const c = palette[idx];
    wordmark.style.color      = c.text;
    wordmark.style.textShadow = `3px 3px 0 #fff, 7px 7px 0 ${c.shadow}`;
    if (yearEl) yearEl.style.color = c.year;
    wordmark.classList.remove('is-popping');
    void wordmark.offsetWidth;
    wordmark.classList.add('is-popping');
  }

  wordmark.addEventListener('click', pop);
  wordmark.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pop(); }
  });
  wordmark.addEventListener('animationend', () => {
    wordmark.classList.remove('is-popping');
  });
}

// ── Page-transition helper ────────────────────────────────────────────────────
function navigateWithDoors(url) {
  const pt = document.getElementById('page-transition');
  if (pt) {
    pt.classList.add('is-closing');
    setTimeout(() => { window.location.href = url; }, 580);
  } else {
    window.location.href = url;
  }
}

// ── School fruit buttons → door-close then route to /explore/:school ─────────
document.querySelectorAll('.school-fruit').forEach(btn => {
  btn.addEventListener('click', () => {
    const school = btn.dataset.cat;
    if (school) navigateWithDoors(`/explore/${school}`);
  });
});
