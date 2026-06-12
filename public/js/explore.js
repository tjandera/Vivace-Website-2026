/*
 * public/js/explore.js
 *
 * Drives the CCA Explore page: filtering and search across CBD sections.
 * CCAs are grouped by school umbrella. Each school gets its own CBD info
 * card + grid below it. Clicking a specific chip shows only that umbrella
 * with non-clickable info cards. "All" shows every section with fully
 * clickable CCA cards.
 */

// ── Elements ──────────────────────────────────────────────────────────────────
const chips        = document.querySelectorAll('#chips .chip');
const products     = document.querySelectorAll('.product');
const search       = document.getElementById('search-input');
const resultsCount = document.getElementById('results-count');
const sectionsEl   = document.getElementById('cbd-sections');

const basketSummary = document.getElementById('basket-summary');
const summaryName   = document.getElementById('summary-name');
const summaryCount  = document.getElementById('summary-count');
const summaryLine   = document.getElementById('summary-line');
const summaryClear  = document.getElementById('summary-clear');

// ── State ─────────────────────────────────────────────────────────────────────
let activeCat = 'all';

// ── Helpers ───────────────────────────────────────────────────────────────────
function getSections() {
  return sectionsEl ? Array.from(sectionsEl.querySelectorAll('.cbd-section')) : [];
}

// ── UI updates ────────────────────────────────────────────────────────────────
function updateResultsCount(shown) {
  if (!resultsCount) return;
  const chip  = document.querySelector(`#chips .chip[data-cat="${activeCat}"]`);
  const label = activeCat === 'all' ? 'Full shelf' : (chip?.dataset.title || activeCat.toUpperCase());
  resultsCount.textContent = `${label}: ${shown} results`;
}

function updateBasketSummary(cat) {
  const chip = document.querySelector(`#chips .chip[data-cat="${cat}"]`);
  if (cat === 'all') {
    basketSummary?.classList.remove('is-active');
    return;
  }
  basketSummary?.classList.add('is-active');
  if (summaryName)  summaryName.textContent  = chip?.dataset.title || cat.toUpperCase();
  if (summaryCount) summaryCount.textContent = `${chip?.dataset.count || ''} in view`;
  if (summaryLine)  summaryLine.textContent  = `${chip?.dataset.aisle || ''} added to your basket.`;
}

// ── Filter ────────────────────────────────────────────────────────────────────
function applyFilter(cat) {
  if (cat !== undefined) activeCat = cat;

  chips.forEach(c => c.classList.toggle('active', c.dataset.cat === activeCat));
  products.forEach(p => p.classList.toggle('is-selected', activeCat !== 'all' && p.dataset.cat === activeCat));
  updateBasketSummary(activeCat);

  const q        = search ? search.value.trim().toLowerCase() : '';
  const showAll  = !q && activeCat === 'all';
  const showOne  = activeCat !== 'all';
  let totalShown = 0;

  // CBD overview + divider visibility
  const cbdOverview = document.getElementById('cbd-overview');
  const cbdDivider  = document.getElementById('cbd-cca-divider');
  if (cbdOverview) {
    const intro = cbdOverview.querySelector('.cbd-overview-intro');
    if (intro) intro.style.display = showAll ? '' : 'none';
    cbdOverview.querySelectorAll('.cbd-house-card').forEach(card => {
      if (showAll) {
        card.style.display = '';
      } else if (showOne) {
        card.style.display = card.dataset.school === activeCat ? '' : 'none';
      } else {
        card.style.display = 'none';
      }
    });
    cbdOverview.style.display = (!showAll && !showOne) ? 'none' : '';
  }
  if (cbdDivider) cbdDivider.style.display = showAll ? '' : 'none';

  getSections().forEach(section => {
    const sectionCat = section.dataset.school;
    const catMatch   = activeCat === 'all' || sectionCat === activeCat;

    if (!catMatch) {
      section.hidden = true;
      return;
    }

    // In specific-CBD mode cards become non-clickable display cards
    const grid = section.querySelector('.cca-grid');
    if (grid) grid.classList.toggle('cbd-active', activeCat !== 'all');

    // Filter cards within this section by search query
    const cards = Array.from(section.querySelectorAll('.cca-card'));
    let sectionShown = 0;

    cards.forEach(card => {
      const matches = !q || card.textContent.toLowerCase().includes(q);
      card.style.display = matches ? '' : 'none';
      if (matches) { sectionShown++; totalShown++; }
    });

    // Hide entire section if search yields no cards here
    section.hidden = q !== '' && sectionShown === 0;
  });

  updateResultsCount(totalShown);
}

// ── Events ────────────────────────────────────────────────────────────────────
chips.forEach(c => c.addEventListener('click', () => applyFilter(c.dataset.cat)));

summaryClear?.addEventListener('click', () => applyFilter('all'));

search?.addEventListener('input', () => applyFilter(activeCat));

window.addEventListener('resize', () => applyFilter(activeCat), { passive: true });

products.forEach(p => p.addEventListener('click', () => {
  applyFilter(p.dataset.cat);
  const delay = p.classList.contains('school-fruit') ? 200 : 0;
  setTimeout(() =>
    document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
    delay
  );
}));

document.getElementById('cbd-overview')?.addEventListener('click', e => {
  const link = e.target.closest('.cbd-jump-link');
  if (!link) return;

  const card = link.closest('.cbd-house-card');
  const cat = card?.dataset.school;
  if (!cat) return;

  e.preventDefault();
  applyFilter(cat);
  document.getElementById(`cbd-${cat}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Card click → navigate (disabled in CBD-specific mode)
sectionsEl?.addEventListener('click', e => {
  if (activeCat !== 'all') return;
  const card = e.target.closest('.cca-card');
  if (!card || e.target.closest('a') || e.target.closest('button')) return;
  const link = card.querySelector('a.more');
  if (link) window.location.href = link.href;
});

// ── Init ──────────────────────────────────────────────────────────────────────
const _preset = (typeof window !== 'undefined' && window.VIVACE_ACTIVE_SCHOOL) || '';
if (_preset) {
  const preChip = document.querySelector(`#chips .chip[data-cat="${_preset}"]`);
  preChip ? applyFilter(_preset) : applyFilter('all');
} else {
  applyFilter('all');
}
