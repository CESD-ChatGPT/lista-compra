const LIST_KEY  = 'lista-compra-items';
const SHOPS_KEY = 'lista-compra-shops';   // cadenas habilitadas
const LOC_KEY   = 'lista-compra-location';

// ── State ────────────────────────────────────────────────────────────────────
let shoppingList  = loadJSON(LIST_KEY, []);
let enabledShops  = loadJSON(SHOPS_KEY, null); // null = mostrar todo
let userLocation  = loadJSON(LOC_KEY, null);   // { lat, lng, label }
let nearbyChains  = [];  // supermercados detectados cerca

// ── Helpers ──────────────────────────────────────────────────────────────────
function loadJSON(key, def) {
  try { return JSON.parse(localStorage.getItem(key)) ?? def; }
  catch { return def; }
}
function saveJSON(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

function escapeHtml(s) {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function fmt(n) {
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

// ── Geolocation ───────────────────────────────────────────────────────────────
async function detectLocation() {
  setLocationStatus('Detectando ubicación...', 'loading');

  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      setLocationStatus('Tu navegador no soporta geolocalización', 'error');
      return reject(new Error('no-geolocation'));
    }
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      err => {
        setLocationStatus('No se pudo obtener la ubicación', 'error');
        reject(err);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
}

function setLocationStatus(text, state = 'ok') {
  const el = document.getElementById('locationText');
  const bar = document.getElementById('locationBar');
  el.textContent = text;
  bar.dataset.state = state;
}

async function loadNearbySupermarkets(lat, lng) {
  try {
    const res = await fetch(`/api/supermercados/cercanos?lat=${lat}&lng=${lng}&radio=4000`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const chains = await res.json();
    return chains;
  } catch (err) {
    console.warn('[Supermercados cercanos]', err.message);
    return [];
  }
}

async function handleDetectLocation() {
  document.getElementById('btnLocation').disabled = true;
  document.getElementById('btnLocationSettings').disabled = true;
  try {
    const { lat, lng } = await detectLocation();
    userLocation = { lat, lng };
    saveJSON(LOC_KEY, userLocation);

    setLocationStatus('Buscando supermercados en tu zona...', 'loading');
    nearbyChains = await loadNearbySupermarkets(lat, lng);

    if (nearbyChains.length) {
      // Si es la primera vez, habilitar todas las cadenas detectadas
      if (enabledShops === null) {
        enabledShops = nearbyChains.map(c => c.id);
        saveJSON(SHOPS_KEY, enabledShops);
      }
      setLocationStatus(`${nearbyChains.length} supermercado${nearbyChains.length !== 1 ? 's' : ''} encontrado${nearbyChains.length !== 1 ? 's' : ''} cerca tuyo`, 'ok');
    } else {
      setLocationStatus('No se encontraron supermercados cercanos (radio 4 km)', 'warn');
    }

    renderSettings();
    // Refrescar búsqueda si hay texto
    const q = document.getElementById('searchInput').value.trim();
    if (q) renderSearch(q);

  } catch (err) {
    // ya manejado en detectLocation
  } finally {
    document.getElementById('btnLocation').disabled = false;
    document.getElementById('btnLocationSettings').disabled = false;
  }
}

document.getElementById('btnLocation').addEventListener('click', handleDetectLocation);
document.getElementById('btnLocationSettings').addEventListener('click', handleDetectLocation);

// ── Search ────────────────────────────────────────────────────────────────────
const searchInput    = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');
const resultsEl      = document.getElementById('searchResults');

let searchTimer = null;

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim();
  clearSearchBtn.style.display = q ? '' : 'none';
  clearTimeout(searchTimer);
  if (!q) { renderSearch(''); return; }
  resultsEl.innerHTML = '<p class="hint">Buscando...</p>';
  searchTimer = setTimeout(() => renderSearch(q), 400);
});

clearSearchBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearSearchBtn.style.display = 'none';
  renderSearch('');
  searchInput.focus();
});

async function renderSearch(query) {
  if (!query) {
    resultsEl.innerHTML = '<p class="hint">Escribí el nombre de un producto para comparar precios en tu zona.</p>';
    return;
  }

  resultsEl.innerHTML = '<p class="hint loading">⏳ Buscando precios en Precios Claros...</p>';

  // Intentar API real primero
  try {
    const params = new URLSearchParams({ q: query });
    if (userLocation) {
      params.set('lat', userLocation.lat);
      params.set('lng', userLocation.lng);
    }

    const res = await fetch(`/api/productos/buscar?${params}`);
    const data = await res.json();

    if (data.source === 'precios_claros' && data.productos?.length) {
      renderRealResults(data.productos, query);
      return;
    }
  } catch (err) {
    console.warn('[API search]', err.message);
  }

  // Fallback: datos estáticos
  renderStaticResults(query);
}

function renderRealResults(productos, query) {
  if (!productos.length) {
    resultsEl.innerHTML = `<p class="hint">Sin resultados en Precios Claros para <strong>${escapeHtml(query)}</strong>.<br>Probá con otro término.</p>`;
    return;
  }

  const filteredByShop = (precios) => {
    if (!enabledShops || !enabledShops.length) return precios;
    return precios.filter(p => enabledShops.includes(normalizeKey(p.cadena)));
  };

  const cards = productos.map(prod => {
    const precios = filteredByShop(prod.precios);
    if (!precios.length) return '';
    const minPrecio = precios[0].precio;

    const rows = precios.map(p => {
      const isBest = p.precio === minPrecio;
      const diff   = p.precio - minPrecio;
      return `<div class="price-row${isBest ? ' cheapest' : ''}">
        <span class="shop-logo">${chainLogoHtml(p.cadena)}</span>
        <span class="shop-name">${escapeHtml(p.cadena)}</span>
        <span class="shop-price">${fmt(p.precio)}</span>
        ${isBest
          ? '<span class="best-tag">Mejor precio</span>'
          : `<span class="diff">+${fmt(diff)}</span>`}
        <button class="btn-add-list"
          data-product="${escapeHtml(prod.nombre)}"
          data-shop="${escapeHtml(p.cadena)}"
          data-price="${p.precio}"
          title="Añadir a mi lista">+</button>
      </div>`;
    }).join('');

    const subtitle = [prod.marca, prod.presentacion].filter(Boolean).join(' · ');

    return `<div class="product-card">
      <div class="product-header">
        ${productImgHtml(prod.ean)}
        <div class="product-info">
          <span class="product-name">${escapeHtml(prod.nombre)}</span>
          ${subtitle ? `<span class="product-unit">${escapeHtml(subtitle)}</span>` : ''}
        </div>
      </div>
      <div class="source-tag">Precios Claros 🟢</div>
      <div class="price-list">${rows}</div>
    </div>`;
  }).filter(Boolean);

  if (!cards.length) {
    resultsEl.innerHTML = `<p class="hint">Sin supermercados activos para mostrar.<br>Activá supermercados en "Mis supermercados".</p>`;
    return;
  }

  resultsEl.innerHTML = cards.join('');
}

function renderStaticResults(query) {
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const matches = PRODUCTS.filter(p => {
    const name = p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    return name.includes(q);
  });

  if (!matches.length) {
    resultsEl.innerHTML = `<p class="hint">Sin resultados para <strong>${escapeHtml(query)}</strong>.</p>`;
    return;
  }

  // Filtrar por supermercados activos
  const activeShopIds = enabledShops
    ? SUPERMARKETS.filter(s => enabledShops.includes(s.id)).map(s => s.id)
    : SUPERMARKETS.map(s => s.id);

  const cards = matches.map(prod => {
    const rows = SUPERMARKETS
      .filter(s => activeShopIds.includes(s.id))
      .map(s => ({ s, price: prod.prices[s.id] ?? null }))
      .filter(r => r.price !== null)
      .sort((a, b) => a.price - b.price);

    if (!rows.length) return '';
    const minPrice = rows[0].price;

    const rowsHtml = rows.map(r => {
      const isBest = r.price === minPrice;
      return `<div class="price-row${isBest ? ' cheapest' : ''}">
        <span class="shop-logo">${chainLogoHtml(r.s.name)}</span>
        <span class="shop-name">${escapeHtml(r.s.name)}</span>
        <span class="shop-price">${fmt(r.price)}</span>
        ${isBest ? '<span class="best-tag">Mejor precio</span>' : `<span class="diff">+${fmt(r.price - minPrice)}</span>`}
        <button class="btn-add-list"
          data-product="${escapeHtml(prod.name)}"
          data-shop="${escapeHtml(r.s.name)}"
          data-price="${r.price}"
          title="Añadir a mi lista">+</button>
      </div>`;
    }).join('');

    return `<div class="product-card">
      <div class="product-header">
        ${productImgHtml(prod.ean ?? null)}
        <div class="product-info">
          <span class="product-name">${escapeHtml(prod.name)}</span>
          <span class="product-unit">${escapeHtml(prod.unit)}</span>
        </div>
      </div>
      <div class="source-tag fallback">Precios de referencia ⚠️</div>
      <div class="price-list">${rowsHtml}</div>
    </div>`;
  }).filter(Boolean);

  resultsEl.innerHTML = cards.length
    ? cards.join('')
    : `<p class="hint">Sin supermercados activos para mostrar.</p>`;
}

resultsEl.addEventListener('click', e => {
  const btn = e.target.closest('.btn-add-list');
  if (!btn) return;
  addToList(btn.dataset.product, btn.dataset.shop, parseFloat(btn.dataset.price));
  btn.textContent = '✓';
  btn.classList.add('added');
  setTimeout(() => { btn.textContent = '+'; btn.classList.remove('added'); }, 1400);
});

// ── Shopping list ─────────────────────────────────────────────────────────────
const itemListEl    = document.getElementById('itemList');
const listActionsEl = document.getElementById('listActions');
const listCountEl   = document.getElementById('listCount');
const manualInput   = document.getElementById('manualInput');

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
  if (!shoppingList.length) {
    itemListEl.innerHTML = '<li class="empty-list">Sin artículos. Buscá un producto o añadilo manualmente.</li>';
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
        <span class="item-name">${escapeHtml(item.name)}</span>${meta}
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

// ── Settings: supermercados ──────────────────────────────────────────────────
function renderSettings() {
  const el = document.getElementById('supermarketList');

  // Combinar los de la API + los estáticos como fallback
  const allChains = nearbyChains.length
    ? nearbyChains
    : SUPERMARKETS.map(s => ({ id: s.id, name: s.name }));

  document.getElementById('settingsHint').textContent = nearbyChains.length
    ? `${nearbyChains.length} supermercado${nearbyChains.length !== 1 ? 's' : ''} detectado${nearbyChains.length !== 1 ? 's' : ''} en tu zona (radio 4 km).`
    : 'Detectá tu ubicación para ver los supermercados de tu zona.';

  if (!allChains.length) {
    el.innerHTML = '<li class="empty-settings">Sin supermercados detectados aún.</li>';
    return;
  }

  const active = enabledShops ?? allChains.map(c => c.id);

  el.innerHTML = allChains.map(c => {
    const on = active.includes(c.id);
    const branches = c.branches?.length ? `<span class="branch-count">${c.branches.length} sucursal${c.branches.length !== 1 ? 'es' : ''}</span>` : '';
    return `<li class="supermarket-item">
      <label class="toggle-label">
        <input type="checkbox" data-id="${escapeHtml(c.id)}"${on ? ' checked' : ''} />
        <span class="toggle-slider"></span>
      </label>
      <span class="shop-logo shop-logo-lg">${chainLogoHtml(c.name)}</span>
      <span class="supermarket-name">${escapeHtml(c.name)}</span>
      ${branches}
    </li>`;
  }).join('');

  el.querySelectorAll('input[type=checkbox]').forEach(cb => {
    cb.addEventListener('change', () => {
      const allIds = allChains.map(c => c.id);
      const prev   = enabledShops ?? allIds;
      enabledShops = cb.checked
        ? [...new Set([...prev, cb.dataset.id])]
        : prev.filter(id => id !== cb.dataset.id);
      saveJSON(SHOPS_KEY, enabledShops);
      const q = document.getElementById('searchInput').value.trim();
      if (q) renderSearch(q);
    });
  });
}

// ── Utils ─────────────────────────────────────────────────────────────────────
function normalizeKey(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Logos reales de cadenas via Clearbit (fallback a emoji)
const CHAIN_DOMAINS = {
  'coto':        'coto.com.ar',
  'carrefour':   'carrefour.com.ar',
  'jumbo':       'jumbo.com.ar',
  'dia':         'dia.com.ar',
  'changom':     'changomas.com.ar',
  'walmart':     'walmart.com.ar',
  'vea':         'vea.com.ar',
  'disco':       'disco.com.ar',
  'libertad':    'hiperlibertad.com.ar',
  'mayorista':   'mayorista10.com.ar',
  'maxiconsumo': 'maxiconsumo.com.ar',
  'toledo':      'supermercadostoledo.com.ar',
  'lanonima':    'lanonima.com.ar',
};

const CHAIN_EMOJI = {
  'coto': '🔴', 'carrefour': '🔵', 'jumbo': '🟢', 'dia': '🟥',
  'changom': '🟠', 'walmart': '🟠', 'vea': '🔷', 'disco': '🟤',
  'libertad': '🟣', 'mayorista': '🏪',
};

function chainDomain(name) {
  const n = name.toLowerCase().replace(/\s+/g,'');
  for (const [key, domain] of Object.entries(CHAIN_DOMAINS)) {
    if (n.includes(key)) return domain;
  }
  return null;
}

function chainEmoji(name) {
  const n = name.toLowerCase();
  for (const [key, emoji] of Object.entries(CHAIN_EMOJI)) {
    if (n.includes(key)) return emoji;
  }
  return '🏬';
}

// Devuelve HTML con logo real + emoji de fallback
function chainLogoHtml(name) {
  const domain  = chainDomain(name);
  const emoji   = chainEmoji(name);
  const alt     = escapeHtml(name);
  if (!domain) return `<span class="chain-emoji">${emoji}</span>`;
  const src = `https://logo.clearbit.com/${domain}`;
  return `<img class="chain-logo-img"
    src="${src}"
    alt="${alt}"
    onerror="this.style.display='none';this.nextElementSibling.style.display='inline'"
  /><span class="chain-emoji" style="display:none">${emoji}</span>`;
}

// Mantener para compatibilidad con data.js estático
function chainLogo(name) { return chainEmoji(name); }

// URL directa de imagen de producto en Open Food Facts (por EAN)
// Si el producto no existe, el onerror la oculta automáticamente
function offImgUrl(ean) {
  if (!ean) return null;
  const s = String(ean).replace(/\D/g,'').padStart(13,'0');
  const path = `${s.slice(0,3)}/${s.slice(3,6)}/${s.slice(6,9)}/${s.slice(9)}`;
  return `https://images.openfoodfacts.org/images/products/${path}/front_es.400.jpg`;
}

function productImgHtml(ean) {
  const url = offImgUrl(ean);
  if (!url) return '';
  return `<img class="product-img"
    src="${url}"
    alt="Foto del producto"
    onerror="this.parentElement.classList.add('no-img')"
    loading="lazy"
  />`;
}

// ── Init ──────────────────────────────────────────────────────────────────────
renderSearch('');
renderList();
renderSettings();

// Si ya tenemos ubicación guardada, cargar supermercados cercanos
if (userLocation) {
  setLocationStatus('Actualizando supermercados de tu zona...', 'loading');
  loadNearbySupermarkets(userLocation.lat, userLocation.lng).then(chains => {
    if (chains.length) {
      nearbyChains = chains;
      if (enabledShops === null) {
        enabledShops = chains.map(c => c.id);
        saveJSON(SHOPS_KEY, enabledShops);
      }
      setLocationStatus(`${chains.length} supermercados encontrados cerca tuyo`, 'ok');
      renderSettings();
    } else {
      setLocationStatus('Ubicación guardada — sin supermercados detectados', 'warn');
    }
  });
}
