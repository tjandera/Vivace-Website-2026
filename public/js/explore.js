// ── State ────────────────────────────────────────────────────────────────────
const chips         = document.querySelectorAll('#chips .chip');
const products      = document.querySelectorAll('.product');
const grid          = document.getElementById('cca-grid');
const search        = document.getElementById('search-input');
const resultsCount  = document.getElementById('results-count');
const loadMoreRow   = document.getElementById('load-more-row');
const loadMoreBtn   = document.getElementById('load-more');
const basketSummary = document.getElementById('basket-summary');
const summaryName   = document.getElementById('summary-name');
const summaryCount  = document.getElementById('summary-count');
const summaryLine   = document.getElementById('summary-line');
const summaryClear  = document.getElementById('summary-clear');

const ROWS_PER_LOAD = 3;
let activeCat  = 'all';
let loadedRows = ROWS_PER_LOAD;

// ── Helpers ──────────────────────────────────────────────────────────────────
function getCards() {
  return grid ? Array.from(grid.querySelectorAll('.cca-card')) : [];
}

function getGridColumns() {
  if (!grid) return 1;
  const tracks = getComputedStyle(grid).gridTemplateColumns
    .split(/\s+/).filter(t => t && t !== 'none');
  return Math.max(1, tracks.length);
}

function visibleLimit() {
  return loadedRows * getGridColumns();
}

// ── UI updates ───────────────────────────────────────────────────────────────
function updateResultsCount(visible, total) {
  if (!resultsCount) return;
  const chip  = document.querySelector(`#chips .chip[data-cat="${activeCat}"]`);
  const label = activeCat === 'all' ? 'Full shelf' : (chip?.dataset.title || activeCat.toUpperCase());
  resultsCount.textContent = `${label}: ${visible} / ${total}`;
}

function updateLoadMore(shown, total) {
  if (!loadMoreRow || !loadMoreBtn) return;
  const hasMore = shown < total;
  loadMoreRow.hidden = !hasMore;
  loadMoreBtn.hidden = !hasMore;
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

// ── Filter ───────────────────────────────────────────────────────────────────
function applyFilter(cat, resetRows) {
  if (cat !== undefined) activeCat = cat;
  if (resetRows) loadedRows = ROWS_PER_LOAD;

  chips.forEach(c => c.classList.toggle('active', c.dataset.cat === activeCat));
  products.forEach(p => p.classList.toggle('is-selected', activeCat !== 'all' && p.dataset.cat === activeCat));
  updateBasketSummary(activeCat);

  const q     = search ? search.value.trim().toLowerCase() : '';
  const limit = visibleLimit();
  let matched = 0;
  let shown   = 0;

  getCards().forEach(card => {
    const catMatch  = activeCat === 'all' || card.dataset.cat === activeCat;
    const textMatch = !q || card.textContent.toLowerCase().includes(q);
    const isMatch   = catMatch && textMatch;
    if (isMatch) matched++;
    const show = isMatch && matched <= limit;
    card.style.display = show ? '' : 'none';
    if (show) shown++;
  });

  updateResultsCount(shown, matched);
  updateLoadMore(shown, matched);
}

// ── Event binding ─────────────────────────────────────────────────────────────
chips.forEach(c => c.addEventListener('click', () => applyFilter(c.dataset.cat, true)));

summaryClear?.addEventListener('click', () => applyFilter('all', true));

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    loadedRows += ROWS_PER_LOAD;
    applyFilter(activeCat, false);
  });
}

if (search) {
  search.addEventListener('input', () => applyFilter(activeCat, true));
}

window.addEventListener('resize', () => applyFilter(activeCat, false), { passive: true });

products.forEach(p => p.addEventListener('click', () => {
  applyFilter(p.dataset.cat, true);
  const delay = p.classList.contains('school-fruit') ? 200 : 0;
  setTimeout(() =>
    document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
    delay
  );
}));

// ── Card click → navigate (if not clicking the "View →" link directly) ───────
if (grid) {
  grid.addEventListener('click', e => {
    const card = e.target.closest('.cca-card');
    if (!card || e.target.closest('a')) return;
    const link = card.querySelector('a.more');
    if (link) window.location.href = link.href;
  });
}

// ── Init ─────────────────────────────────────────────────────────────────────
// Check for a pre-selected school injected by the page (e.g. /explore/acf)
const _preset = (typeof window !== 'undefined' && window.VIVACE_ACTIVE_SCHOOL) || '';
if (_preset) {
  const preChip = document.querySelector(`#chips .chip[data-cat="${_preset}"]`);
  preChip ? applyFilter(_preset, true) : applyFilter('all', true);
} else {
  applyFilter('all', true);
}
