const chips    = document.querySelectorAll('#chips .chip');
const products = document.querySelectorAll('.product');
const cards    = document.querySelectorAll('#cca-grid .cca-card');
const basketSummary = document.getElementById('basket-summary');
const summaryName   = document.getElementById('summary-name');
const summaryCount  = document.getElementById('summary-count');
const summaryLine   = document.getElementById('summary-line');
const summaryClear  = document.getElementById('summary-clear');
const receiptLive   = document.getElementById('receipt-live');
const storeStatus   = document.getElementById('store-status');
const basketScene   = document.getElementById('scene');

// ── Filter ──────────────────────────────────────────────────────────────────

function getFilterData(cat, sourceEl) {
  const source = sourceEl || document.querySelector(`[data-cat="${cat}"]`);
  const chip = document.querySelector(`#chips .chip[data-cat="${cat}"]`);
  return {
    title: source?.dataset.title || chip?.dataset.title || (cat === 'all' ? 'All aisles' : cat.toUpperCase()),
    count: source?.dataset.count || chip?.dataset.count || '120',
    aisle: source?.dataset.aisle || chip?.dataset.aisle || 'Vivace Mart',
  };
}

function updateShoppingUI(cat, sourceEl) {
  const data = getFilterData(cat, sourceEl);
  products.forEach(p => p.classList.toggle('is-selected', cat !== 'all' && p.dataset.cat === cat));

  if (cat === 'all') {
    basketSummary?.classList.remove('is-active');
    if (receiptLive) receiptLive.textContent = 'Receipt open · browsing all aisles';
    if (storeStatus) {
      storeStatus.querySelector('.status-copy').innerHTML = 'Currently browsing <strong>all stocked aisles</strong>.';
      storeStatus.querySelector('.status-ticket').textContent = '120 CCAs · receipt #VVC26';
    }
    return;
  }

  basketSummary?.classList.add('is-active');
  if (summaryName) summaryName.textContent = data.title;
  if (summaryCount) summaryCount.textContent = `${data.count} in view`;
  if (summaryLine) summaryLine.textContent = `${data.aisle} added to your basket. Explore the CCAs stocked under this school.`;
  if (receiptLive) receiptLive.textContent = `Added ${data.title} · ${data.count} CCAs · ${data.aisle}`;
  if (storeStatus) {
    storeStatus.querySelector('.status-copy').innerHTML = `Currently browsing <strong>${data.title}</strong>.`;
    storeStatus.querySelector('.status-ticket').textContent = `${data.count} CCAs · ${data.aisle}`;
  }
}

function applyFilter(cat, sourceEl) {
  chips.forEach(c => c.classList.toggle('active', c.dataset.cat === cat));
  cards.forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
  });
  updateShoppingUI(cat, sourceEl);
}

chips.forEach(c => c.addEventListener('click', () => applyFilter(c.dataset.cat, c)));
summaryClear?.addEventListener('click', () => applyFilter('all'));

// ── Search ───────────────────────────────────────────────────────────────────

const search = document.getElementById('search-input');
if (search) {
  search.addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase();
    cards.forEach(card => {
      card.style.display = card.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

// ── Basket fruit animation ───────────────────────────────────────────────────

function animateBasketFruit(product) {
  if (!product.classList.contains('school-fruit')) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const rect   = product.getBoundingClientRect();
  const flight = product.cloneNode(true);
  flight.classList.add('fruit-flight');
  Object.assign(flight.style, {
    left:   rect.left + 'px',
    top:    rect.top  + 'px',
    width:  rect.width + 'px',
    height: rect.height + 'px',
  });
  flight.style.setProperty('--r', product.style.getPropertyValue('--r') || '0deg');
  document.body.appendChild(flight);
  flight.addEventListener('animationend', () => flight.remove(), { once: true });

  if (basketScene) {
    basketScene.classList.remove('is-scanning');
    void basketScene.offsetWidth;
    basketScene.classList.add('is-scanning');
    window.setTimeout(() => basketScene.classList.remove('is-scanning'), 780);
  }

  product.classList.add('is-picked');
  window.setTimeout(() => product.classList.remove('is-picked'), 520);
}

// ── Product click (basket fruits + CCA cards) ────────────────────────────────

products.forEach(p => p.addEventListener('click', () => {
  const cat = p.dataset.cat;
  applyFilter(cat, p);
  animateBasketFruit(p);

  const delay = p.classList.contains('school-fruit') ? 260 : 0;
  window.setTimeout(() =>
    document.getElementById('explore').scrollIntoView({ behavior: 'smooth', block: 'start' }),
    delay
  );
}));
