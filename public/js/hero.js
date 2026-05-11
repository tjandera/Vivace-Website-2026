// ── Hero wordmark colour-pop interaction ──────────────────────────────────────
const wordmark = document.querySelector('.hero-wordmark');
if (wordmark) {
  // Each entry: text colour, coloured drop shadow, year accent colour
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

    // Restart the pop animation cleanly
    wordmark.classList.remove('is-popping');
    void wordmark.offsetWidth;           // force reflow so animation re-fires
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
