const LIST_KEY   = 'lista-compra-items';
const SHOPS_KEY  = 'lista-compra-shops';

// ── State ───────────────────────────────────────────────────────────────────
let shoppingList  = loadJSON(LIST_KEY, []);
let enabledShops  = loadJSON(SHOPS_KEY, SUPERMARKETS.map(s => s.id));

// ── Helpers ─────────────────────────────────────────────────────────────────
function loadJSON(key, def) {
  try { return JSON.parse(localStorage.getItem(key)) ?? def; }
  catch { return def; }
}
function saveJSON(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function fmt(n) {
  // Formato pesos argentinos: $ 1.200 (sin decimales para precios enteros)
  return '$ ' + Math.round(n).toLocaleString('es-AR');
}

// ── Tabs ─────────────────────────────────────────────────────────────────────
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(s => s.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// ── Search ───────────────────────────────────────────────────────────────────
const searchInput   = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');
const resultsEl     = document.getElementById('searchResults');

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim();
  clearSearchBtn.style.display = q ? '' : 'none';
  renderSearch(q);
});

clearSearchBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearSearchBtn.style.display = 'none';
  renderSearch('');
  searchInput.focus();
});

function renderSearch(query) {
  if (!query) {
    resultsEl.innerHTML = '<p class="hint">Escribe el nombre de un producto para comparar precios en tu zona.</p>';
    return;
  }

  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const matches = PRODUCTS.filter(p => {
    const name = p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return name.includes(q);
  });

  if (matches.length === 0) {
    resultsEl.innerHTML = '<p class="hint">Sin resultados para <strong>' + escapeHtml(query) + '</strong>.</p>';
    return;
  }

  resultsEl.innerHTML = matches.map(p => buildProductCard(p)).join('');
}

function buildProductCard(product) {
  const active = SUPERMARKETS.filter(s => enabledShops.includes(s.id));
  if (active.length === 0) {
    return `<div class="product-card">
      <div class="product-header"><span class="product-name">${escapeHtml(product.name)}</span><span class="product-unit">${escapeHtml(product.unit)}</span></div>
      <p class="hint">Activa supermercados en la pestaña "Mis supermercados".</p>
    </div>`;
  }

  const rows = active
    .map(s => ({ s, price: product.prices[s.id] ?? null }))
    .filter(r => r.price !== null)
    .sort((a, b) => a.price - b.price);

  if (rows.length === 0) return '';

  const minPrice = rows[0].price;

  const rowsHtml = rows.map((r, i) => {
    const isCheapest = r.price === minPrice;
    return `<div class="price-row${isCheapest ? ' cheapest' : ''}">
      <span class="shop-logo">${r.s.logo}</span>
      <span class="shop-name">${escapeHtml(r.s.name)}</span>
      <span class="shop-price">${fmt(r.price)}</span>
      ${isCheapest ? '<span class="best-tag">Mejor precio</span>' : `<span class="diff">+${fmt(r.price - minPrice)}</span>`}
      <button class="btn-add-list" data-product="${escapeHtml(product.name)}" data-shop="${escapeHtml(r.s.name)}" data-price="${r.price}" title="Añadir a mi lista">+</button>
    </div>`;
  }).join('');

  return `<div class="product-card">
    <div class="product-header">
      <span class="product-name">${escapeHtml(product.name)}</span>
      <span class="product-unit">${escapeHtml(product.unit)}</span>
    </div>
    <div class="price-list">${rowsHtml}</div>
  </div>`;
}

resultsEl.addEventListener('click', e => {
  const btn = e.target.closest('.btn-add-list');
  if (!btn) return;
  addToList(btn.dataset.product, btn.dataset.shop, parseFloat(btn.dataset.price));
  // Visual feedback
  btn.textContent = '✓';
  btn.classList.add('added');
  setTimeout(() => { btn.textContent = '+'; btn.classList.remove('added'); }, 1200);
});

// ── Shopping list ────────────────────────────────────────────────────────────
const itemListEl   = document.getElementById('itemList');
const listActionsEl = document.getElementById('listActions');
const listCountEl  = document.getElementById('listCount');
const manualInput  = document.getElementById('manualInput');

document.getElementById('manualAdd').addEventListener('click', () => {
  const val = manualInput.value.trim();
  if (val) { addToList(val); manualInput.value = ''; }
});
manualInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('manualAdd').click();
});

document.getElementById('clearDone').addEventListener('click', () => {
  shoppingList = shoppingList.filter(i => !i.done);
  saveJSON(LIST_KEY, shoppingList);
  renderList();
});
document.getElementById('clearAll').addEventListener('click', () => {
  if (!confirm('¿Vaciar toda la lista?')) return;
  shoppingList = [];
  saveJSON(LIST_KEY, shoppingList);
  renderList();
});

itemListEl.addEventListener('click', e => {
  const item = e.target.closest('.item');
  if (!item) return;
  const id = Number(item.dataset.id);
  if (e.target.closest('[data-action="delete"]')) {
    shoppingList = shoppingList.filter(i => i.id !== id);
  } else {
    const obj = shoppingList.find(i => i.id === id);
    if (obj) obj.done = !obj.done;
  }
  saveJSON(LIST_KEY, shoppingList);
  renderList();
});

function addToList(name, shop = null, price = null) {
  shoppingList.unshift({ id: Date.now(), name, shop, price, done: false });
  saveJSON(LIST_KEY, shoppingList);
  renderList();
  updateListBadge();
}

function renderList() {
  if (shoppingList.length === 0) {
    itemListEl.innerHTML = '<li class="empty-list">Sin artículos. Busca un producto o añádelo manualmente.</li>';
    listActionsEl.style.display = 'none';
    updateListBadge();
    return;
  }

  itemListEl.innerHTML = shoppingList.map(item => {
    const meta = item.shop
      ? `<span class="item-meta">${escapeHtml(item.shop)}${item.price ? ' · ' + fmt(item.price) : ''}</span>`
      : '';
    return `<li class="item${item.done ? ' done' : ''}" data-id="${item.id}">
      <div class="item-check" title="Marcar"></div>
      <div class="item-text">
        <span class="item-name">${escapeHtml(item.name)}</span>
        ${meta}
      </div>
      <button class="btn-delete" data-action="delete" title="Eliminar">✕</button>
    </li>`;
  }).join('');

  listActionsEl.style.display = 'flex';
  updateListBadge();
}

function updateListBadge() {
  const pending = shoppingList.filter(i => !i.done).length;
  listCountEl.textContent = pending > 0 ? pending : '';
}

// ── Supermarkets settings ────────────────────────────────────────────────────
function renderSettings() {
  const el = document.getElementById('supermarketList');
  el.innerHTML = SUPERMARKETS.map(s => {
    const on = enabledShops.includes(s.id);
    return `<li class="supermarket-item">
      <label class="toggle-label">
        <input type="checkbox" data-id="${s.id}"${on ? ' checked' : ''} />
        <span class="toggle-slider"></span>
      </label>
      <span class="shop-logo">${s.logo}</span>
      <span class="supermarket-name">${escapeHtml(s.name)}</span>
    </li>`;
  }).join('');

  el.querySelectorAll('input[type=checkbox]').forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) {
        if (!enabledShops.includes(cb.dataset.id)) enabledShops.push(cb.dataset.id);
      } else {
        enabledShops = enabledShops.filter(id => id !== cb.dataset.id);
      }
      saveJSON(SHOPS_KEY, enabledShops);
      // Refresh search if visible
      if (searchInput.value.trim()) renderSearch(searchInput.value.trim());
    });
  });
}

// ── Init ─────────────────────────────────────────────────────────────────────
renderSearch('');
renderList();
renderSettings();
