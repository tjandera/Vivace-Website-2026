// ── Drawer menu ───────────────────────────────────────────────────────────────
const menuBtn      = document.getElementById('menu-btn');
const menuClose    = document.getElementById('menu-close');
const menuOverlay  = document.getElementById('menu-overlay');
const menuBackdrop = document.getElementById('menu-backdrop');

function openMenu() {
  if (!menuOverlay) return;
  menuOverlay.classList.add('is-open');
  menuBackdrop && menuBackdrop.classList.add('is-open');
  menuOverlay.setAttribute('aria-hidden', 'false');
  menuBackdrop && menuBackdrop.setAttribute('aria-hidden', 'false');
  menuBtn && menuBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  menuClose && menuClose.focus();
}

function closeMenu() {
  if (!menuOverlay) return;
  menuOverlay.classList.remove('is-open');
  menuBackdrop && menuBackdrop.classList.remove('is-open');
  menuOverlay.setAttribute('aria-hidden', 'true');
  menuBackdrop && menuBackdrop.setAttribute('aria-hidden', 'true');
  menuBtn && menuBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  menuBtn && menuBtn.focus();
}

menuBtn      && menuBtn.addEventListener('click', openMenu);
menuClose    && menuClose.addEventListener('click', closeMenu);
menuBackdrop && menuBackdrop.addEventListener('click', closeMenu);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('is-open')) {
    closeMenu();
  }
});

// ── Accordion sub-menus ───────────────────────────────────────────────────────
document.querySelectorAll('.overlay-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const sub      = document.getElementById(targetId);
    if (!sub) return;

    const isOpen = sub.classList.contains('is-open');

    // Close any other open sub-menu first
    document.querySelectorAll('.overlay-sub.is-open').forEach(s => {
      if (s !== sub) {
        s.classList.remove('is-open');
        s.setAttribute('aria-hidden', 'true');
        const t = document.querySelector(`[data-target="${s.id}"]`);
        if (t) t.setAttribute('aria-expanded', 'false');
      }
    });

    sub.classList.toggle('is-open', !isOpen);
    sub.setAttribute('aria-hidden', String(isOpen));
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});
