// ── Mobile drawer ────────────────────────────────────────────────────────────
const hamb   = document.getElementById('hamb');
const drawer = document.getElementById('drawer');

if (hamb) hamb.addEventListener('click', () => drawer.classList.toggle('open'));
drawer.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => drawer.classList.remove('open'))
);

// ── Gooey blob ───────────────────────────────────────────────────────────────
const navWrap  = document.getElementById('nav-links');
const blob     = document.getElementById('nav-blob');
const trail    = document.getElementById('nav-blob-trail');
const navLinks = navWrap ? Array.from(navWrap.querySelectorAll('a')) : [];

function moveBlob(el) {
  if (!el) return;

  // Leader snaps fast, trailer lags — SVG filter merges them into a gooey bridge
  const x = el.offsetLeft;
  const w = el.offsetWidth;

  if (blob)  { blob.style.left  = x + 'px'; blob.style.width  = w + 'px'; blob.style.opacity  = '1'; }
  if (trail) { trail.style.left = x + 'px'; trail.style.width = w + 'px'; trail.style.opacity = '1'; }

  // blob-on controls text colour — only the item behind the blob gets cream text
  navLinks.forEach(a => a.classList.remove('blob-on'));
  el.classList.add('blob-on');
}

// Hover: blob follows the cursor, snaps back to the active section on leave
navLinks.forEach(a => a.addEventListener('mouseenter', () => moveBlob(a)));
if (navWrap) {
  navWrap.addEventListener('mouseleave', () => {
    const active = navWrap.querySelector('a.here');
    if (active) moveBlob(active);
  });
}

// ── Active link on scroll ────────────────────────────────────────────────────
const sections = ['home', 'about', 'explore', 'partners', 'faq', 'events'];

function syncNav() {
  let current = 'home';
  for (const id of sections) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top < 200) current = id;
  }
  navLinks.forEach(a => {
    const isActive = a.getAttribute('href') === '#' + current;
    a.classList.toggle('here', isActive);
    if (isActive) moveBlob(a);
  });
}

window.addEventListener('scroll', syncNav, { passive: true });

// Initial blob position — wait for layout so offsetLeft is accurate
window.addEventListener('load', () => {
  const active = navWrap && navWrap.querySelector('a.here');
  if (active) moveBlob(active);
});
