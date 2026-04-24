const LIST_KEY   = 'lista-compra-items';
const SHOPS_KEY  = 'lista-compra-shops';   // cadenas habilitadas
const LOC_KEY    = 'lista-compra-location';
const LANG_KEY   = 'lista-compra-lang';
const BUDGET_KEY = 'lista-compra-budget';

// ── i18n ──────────────────────────────────────────────────────────────────────
const UI = {
  es: {
    tabSearch: 'Buscar', tabGondola: 'Góndolas', tabList: 'Mi lista', tabSettings: 'Mis supers',
    searchPlaceholder: 'Buscar producto (ej: leche, arroz...)',
    searchHint: 'Escribí el nombre de un producto para comparar precios en tu zona.',
    detecting: 'Detectando ubicación...', detect: 'Detectar',
    detectHint: 'Detectá tu ubicación para ver supermercados de tu zona',
    detectLocationBtn: '📍 Detectar ubicación',
    searching: '⏳ Buscando precios en Precios Claros...',
    bestPrice: 'Mejor precio', add: 'Añadir',
    addManual: 'Añadir artículo manualmente...',
    clearDone: 'Eliminar comprados', clearAll: 'Vaciar lista',
    translating: '🌐 Traduciendo al español...',
    translatedAs: (q) => `🌐 Buscando en español: "${q}"`,
    confirmClear: '¿Vaciar toda la lista?',
    emptyList: 'Sin artículos. Buscá un producto o añadilo manualmente.',
    noResults: (q) => `Sin resultados para <strong>${q}</strong>.`,
    budget: '💰 Presupuesto', budgetPlaceholder: 'Tu presupuesto...',
    totalInList: 'Total estimado', budgetLeft: 'Restante',
    budgetOver: '⚠ Presupuesto superado',
    youSave: 'ahorrás',
    educTip: '💡 Comparar precios entre supermercados puede ahorrarte hasta un 30% en tu compra mensual.',
  },
  en: {
    tabSearch: 'Search', tabGondola: 'Aisles', tabList: 'My list', tabSettings: 'My stores',
    searchPlaceholder: 'Search product (e.g: milk, rice...)',
    searchHint: 'Type a product name to compare prices in your area.',
    detecting: 'Detecting location...', detect: 'Detect',
    detectHint: 'Detect your location to see nearby supermarkets',
    detectLocationBtn: '📍 Detect location',
    searching: '⏳ Searching prices...',
    bestPrice: 'Best price', add: 'Add',
    addManual: 'Add item manually...',
    clearDone: 'Remove purchased', clearAll: 'Clear list',
    translating: '🌐 Translating to Spanish...',
    translatedAs: (q) => `🌐 Searching in Spanish: "${q}"`,
    confirmClear: 'Clear the entire list?',
    emptyList: 'No items. Search a product or add one manually.',
    noResults: (q) => `No results for <strong>${q}</strong>.`,
    budget: '💰 Budget', budgetPlaceholder: 'Your budget...',
    totalInList: 'Estimated total', budgetLeft: 'Remaining',
    budgetOver: '⚠ Budget exceeded',
    youSave: 'you save',
    educTip: '💡 Comparing prices between supermarkets can save you up to 30% on your monthly shopping.',
  },
  pt: {
    tabSearch: 'Buscar', tabGondola: 'Corredores', tabList: 'Minha lista', tabSettings: 'Meus mercados',
    searchPlaceholder: 'Buscar produto (ex: leite, arroz...)',
    searchHint: 'Digite o nome de um produto para comparar preços na sua área.',
    detecting: 'Detectando localização...', detect: 'Detectar',
    detectHint: 'Detecte sua localização para ver supermercados próximos',
    detectLocationBtn: '📍 Detectar localização',
    searching: '⏳ Buscando preços...',
    bestPrice: 'Melhor preço', add: 'Adicionar',
    addManual: 'Adicionar item manualmente...',
    clearDone: 'Remover comprados', clearAll: 'Limpar lista',
    translating: '🌐 Traduzindo para espanhol...',
    translatedAs: (q) => `🌐 Buscando em espanhol: "${q}"`,
    confirmClear: 'Limpar toda a lista?',
    emptyList: 'Sem itens. Busque um produto ou adicione manualmente.',
    noResults: (q) => `Sem resultados para <strong>${q}</strong>.`,
    budget: '💰 Orçamento', budgetPlaceholder: 'Seu orçamento...',
    totalInList: 'Total estimado', budgetLeft: 'Restante',
    budgetOver: '⚠ Orçamento excedido',
    youSave: 'você economiza',
    educTip: '💡 Comparar preços entre supermercados pode economizar até 30% nas suas compras mensais.',
  },
  fr: {
    tabSearch: 'Rechercher', tabGondola: 'Rayons', tabList: 'Ma liste', tabSettings: 'Mes supers',
    searchPlaceholder: 'Rechercher un produit (ex: lait, riz...)',
    searchHint: 'Tapez un nom de produit pour comparer les prix dans votre zone.',
    detecting: 'Détection de la position...', detect: 'Détecter',
    detectHint: 'Détectez votre position pour voir les supermarchés proches',
    detectLocationBtn: '📍 Détecter la position',
    searching: '⏳ Recherche de prix...',
    bestPrice: 'Meilleur prix', add: 'Ajouter',
    addManual: 'Ajouter un article manuellement...',
    clearDone: 'Supprimer les achetés', clearAll: 'Vider la liste',
    translating: '🌐 Traduction en espagnol...',
    translatedAs: (q) => `🌐 Recherche en espagnol: "${q}"`,
    confirmClear: 'Vider toute la liste?',
    emptyList: 'Aucun article. Recherchez un produit ou ajoutez-en un.',
    noResults: (q) => `Aucun résultat pour <strong>${q}</strong>.`,
    budget: '💰 Budget', budgetPlaceholder: 'Votre budget...',
    totalInList: 'Total estimé', budgetLeft: 'Restant',
    budgetOver: '⚠ Budget dépassé',
    youSave: 'vous économisez',
    educTip: '💡 Comparer les prix entre supermarchés peut vous faire économiser jusqu'à 30% sur vos courses mensuelles.',
  },
  de: {
    tabSearch: 'Suchen', tabGondola: 'Gänge', tabList: 'Meine Liste', tabSettings: 'Meine Märkte',
    searchPlaceholder: 'Produkt suchen (z.B: Milch, Reis...)',
    searchHint: 'Geben Sie einen Produktnamen ein, um Preise in Ihrer Nähe zu vergleichen.',
    detecting: 'Standort wird erkannt...', detect: 'Erkennen',
    detectHint: 'Erkenne deinen Standort, um Supermärkte in der Nähe zu sehen',
    detectLocationBtn: '📍 Standort erkennen',
    searching: '⏳ Preise werden gesucht...',
    bestPrice: 'Bester Preis', add: 'Hinzufügen',
    addManual: 'Artikel manuell hinzufügen...',
    clearDone: 'Gekaufte entfernen', clearAll: 'Liste leeren',
    translating: '🌐 Übersetzung ins Spanische...',
    translatedAs: (q) => `🌐 Suche auf Spanisch: "${q}"`,
    confirmClear: 'Die gesamte Liste leeren?',
    emptyList: 'Keine Artikel. Suchen Sie ein Produkt oder fügen Sie eines hinzu.',
    noResults: (q) => `Keine Ergebnisse für <strong>${q}</strong>.`,
    budget: '💰 Budget', budgetPlaceholder: 'Ihr Budget...',
    totalInList: 'Geschätzte Summe', budgetLeft: 'Verbleibend',
    budgetOver: '⚠ Budget überschritten',
    youSave: 'Sie sparen',
    educTip: '💡 Preisvergleiche zwischen Supermärkten können bis zu 30% Ihrer monatlichen Einkaufskosten einsparen.',
  },
  it: {
    tabSearch: 'Cerca', tabGondola: 'Corsie', tabList: 'La mia lista', tabSettings: 'I miei super',
    searchPlaceholder: 'Cerca prodotto (es: latte, riso...)',
    searchHint: 'Digita il nome di un prodotto per confrontare i prezzi nella tua zona.',
    detecting: 'Rilevamento posizione...', detect: 'Rileva',
    detectHint: 'Rileva la tua posizione per vedere i supermercati vicini',
    detectLocationBtn: '📍 Rileva posizione',
    searching: '⏳ Ricerca prezzi...',
    bestPrice: 'Miglior prezzo', add: 'Aggiungi',
    addManual: 'Aggiungi articolo manualmente...',
    clearDone: 'Rimuovi acquistati', clearAll: 'Svuota lista',
    translating: '🌐 Traduzione in spagnolo...',
    translatedAs: (q) => `🌐 Ricerca in spagnolo: "${q}"`,
    confirmClear: 'Svuotare tutta la lista?',
    emptyList: 'Nessun articolo. Cerca un prodotto o aggiungine uno.',
    noResults: (q) => `Nessun risultato per <strong>${q}</strong>.`,
    budget: '💰 Budget', budgetPlaceholder: 'Il tuo budget...',
    totalInList: 'Totale stimato', budgetLeft: 'Rimanente',
    budgetOver: '⚠ Budget superato',
    youSave: 'risparmi',
    educTip: '💡 Confrontare i prezzi tra supermercati può farti risparmiare fino al 30% sulla spesa mensile.',
  },
  zh: {
    tabSearch: '搜索', tabGondola: '货架', tabList: '购物清单', tabSettings: '超市设置',
    searchPlaceholder: '搜索商品（例如：牛奶、大米...）',
    searchHint: '输入商品名称，比较您所在区域各超市的价格。',
    detecting: '正在定位...', detect: '定位',
    detectHint: '定位您的位置，查看附近的超市',
    detectLocationBtn: '📍 定位',
    searching: '⏳ 正在搜索价格...',
    bestPrice: '最优价格', add: '添加',
    addManual: '手动添加商品...',
    clearDone: '删除已购', clearAll: '清空清单',
    translating: '🌐 正在翻译为西班牙语...',
    translatedAs: (q) => `🌐 西班牙语搜索："${q}"`,
    confirmClear: '确定清空整个购物清单？',
    emptyList: '暂无商品。搜索商品或手动添加。',
    noResults: (q) => `未找到 <strong>${q}</strong> 的结果。`,
    budget: '💰 预算', budgetPlaceholder: '输入预算金额...',
    totalInList: '预计总计', budgetLeft: '剩余',
    budgetOver: '⚠ 超出预算',
    youSave: '节省',
    educTip: '💡 比较各超市价格，每月可节省高达30%的购物费用。',
  },
};

let currentLang = localStorage.getItem(LANG_KEY) || 'es';

function t(key) {
  return (UI[currentLang] || UI.es)[key] || (UI.es)[key] || key;
}

// In-memory translation cache (keyed by lang + texts JSON)
const txCache = new Map();

async function translateTexts(texts, targetLang, sourceLang = 'es') {
  if (!texts.length || targetLang === sourceLang) return texts;
  const key = `${sourceLang}→${targetLang}:${JSON.stringify(texts)}`;
  if (txCache.has(key)) return txCache.get(key);
  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts, targetLang, sourceLang }),
    });
    const { translations } = await res.json();
    const result = Array.isArray(translations) ? translations : texts;
    txCache.set(key, result);
    return result;
  } catch {
    return texts;
  }
}

function applyUITranslations() {
  const lang = currentLang;
  // Tab labels (keeping badge inside tabList)
  document.getElementById('tabSearch').childNodes[0].textContent = t('tabSearch') + ' ';
  document.getElementById('tabGondola').textContent = t('tabGondola');
  const tabList = document.getElementById('tabList');
  const badge = tabList.querySelector('.badge-count');
  tabList.textContent = t('tabList') + ' ';
  tabList.appendChild(badge);
  document.getElementById('tabSettings').textContent = t('tabSettings');

  // data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
  // data-i18n-placeholder elements
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  // Search input placeholder
  const si = document.getElementById('searchInput');
  if (si) si.placeholder = t('searchPlaceholder');

  // Update html lang attribute
  document.documentElement.lang = lang;

  // Update active lang button
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  // Budget bar labels
  const budgetLabel = document.getElementById('budgetLabel');
  if (budgetLabel) budgetLabel.textContent = t('budget');
  const budgetInput = document.getElementById('budgetInput');
  if (budgetInput) budgetInput.placeholder = t('budgetPlaceholder');
}

// ── State ────────────────────────────────────────────────────────────────────
let shoppingList  = loadJSON(LIST_KEY, []);
let enabledShops  = loadJSON(SHOPS_KEY, null); // null = mostrar todo
let userLocation  = loadJSON(LOC_KEY, null);   // { lat, lng, label }
let nearbyChains  = [];  // supermercados detectados cerca
let budgetAmount  = loadJSON(BUDGET_KEY, null); // null = sin presupuesto

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

// ── Language selector ─────────────────────────────────────────────────────────
document.getElementById('langSelector').addEventListener('click', e => {
  const btn = e.target.closest('.lang-btn');
  if (!btn) return;
  const lang = btn.dataset.lang;
  if (lang === currentLang) return;
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  applyUITranslations();
  // Clear translation cache for new lang, re-run search if active
  const q = document.getElementById('searchInput').value.trim();
  if (q) {
    document.getElementById('searchResults').innerHTML = `<p class="hint">${t('searching')}</p>`;
    renderSearch(q);
  } else {
    document.getElementById('searchResults').innerHTML = `<p class="hint">${t('searchHint')}</p>`;
  }
});

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
  setLocationStatus(t('detecting'), 'loading');

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
  resultsEl.innerHTML = `<p class="hint">${currentLang !== 'es' ? t('translating') : t('searching')}</p>`;
  searchTimer = setTimeout(() => renderSearch(q), 400);
});

clearSearchBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearSearchBtn.style.display = 'none';
  renderSearch('');
  searchInput.focus();
});

async function renderSearch(query) {
  const hintEl = document.getElementById('translationHint');

  if (!query) {
    hintEl.style.display = 'none';
    resultsEl.innerHTML = `<p class="hint">${t('searchHint')}</p>`;
    return;
  }

  // Translate query from user language to Spanish if needed
  let searchQuery = query;
  if (currentLang !== 'es') {
    resultsEl.innerHTML = `<p class="hint loading">${t('translating')}</p>`;
    const [translated] = await translateTexts([query], 'es', currentLang);
    searchQuery = translated || query;
    hintEl.style.display = '';
    document.getElementById('translationHintText').textContent =
      t('translatedAs')(searchQuery).replace('🌐 ', '');
  } else {
    hintEl.style.display = 'none';
  }

  resultsEl.innerHTML = `<p class="hint loading">${t('searching')}</p>`;

  // Intentar API real primero
  try {
    const params = new URLSearchParams({ q: searchQuery });
    if (userLocation) {
      params.set('lat', userLocation.lat);
      params.set('lng', userLocation.lng);
    }

    const res = await fetch(`/api/productos/buscar?${params}`);
    const data = await res.json();

    if (data.source === 'precios_claros' && data.productos?.length) {
      await renderRealResults(data.productos, query);
      return;
    }
  } catch (err) {
    console.warn('[API search]', err.message);
  }

  // Fallback: datos estáticos
  await renderStaticResults(query, searchQuery);
}

async function renderRealResults(productos, query) {
  if (!productos.length) {
    resultsEl.innerHTML = `<p class="hint">${t('noResults')(escapeHtml(query))}</p>`;
    return;
  }

  // Translate product names if not in Spanish
  if (currentLang !== 'es') {
    const names = productos.map(p => p.nombre);
    const translated = await translateTexts(names, currentLang, 'es');
    productos = productos.map((p, i) => ({ ...p, nombre: translated[i] || p.nombre }));
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
          ? `<span class="best-tag">${t('bestPrice')}</span>`
          : `<span class="diff">+${fmt(diff)}</span><span class="savings-pct">${t('youSave')} ${Math.round((diff/p.precio)*100)}%</span>`}
        <button class="btn-add-list"
          data-product="${escapeHtml(prod.nombre)}"
          data-shop="${escapeHtml(p.cadena)}"
          data-price="${p.precio}"
          title="${t('add')}">+</button>
      </div>`;
    }).join('');

    return `<div class="product-card">
      <div class="product-header">
        ${productImgHtml(prod.ean)}
        <div class="product-info">
          <span class="product-name">${escapeHtml(prod.nombre)}</span>
          ${prod.marca ? `<span class="product-brand">${escapeHtml(prod.marca)}</span>` : ''}
          ${prod.presentacion ? `<span class="product-unit">${escapeHtml(prod.presentacion)}</span>` : ''}
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

async function renderStaticResults(query, searchQueryEs = query) {
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const qEs   = norm(searchQueryEs);
  const qUser = norm(query);
  const matches = PRODUCTS.filter(p => {
    const name = norm(p.name);
    return name.includes(qEs) || name.includes(qUser);
  });

  if (!matches.length) {
    resultsEl.innerHTML = `<p class="hint">${t('noResults')(escapeHtml(query))}</p>`;
    return;
  }

  // Translate product names if not in Spanish
  let displayNames = matches.map(p => p.name);
  if (currentLang !== 'es') {
    displayNames = await translateTexts(displayNames, currentLang, 'es');
  }

  // Filtrar por supermercados activos
  const activeShopIds = enabledShops
    ? SUPERMARKETS.filter(s => enabledShops.includes(s.id)).map(s => s.id)
    : SUPERMARKETS.map(s => s.id);

  const cards = matches.map((prod, idx) => {
    const displayName = displayNames[idx] || prod.name;
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
        ${isBest ? `<span class="best-tag">${t('bestPrice')}</span>` : `<span class="diff">+${fmt(r.price - minPrice)}</span><span class="savings-pct">${t('youSave')} ${Math.round(((r.price-minPrice)/r.price)*100)}%</span>`}
        <button class="btn-add-list"
          data-product="${escapeHtml(displayName)}"
          data-shop="${escapeHtml(r.s.name)}"
          data-price="${r.price}"
          title="${t('add')}">+</button>
      </div>`;
    }).join('');

    return `<div class="product-card">
      <div class="product-header">
        ${productImgHtml(prod.ean ?? null)}
        <div class="product-info">
          <span class="product-name">${escapeHtml(displayName)}</span>
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
  if (!confirm(t('confirmClear'))) return;
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
    itemListEl.innerHTML = `<li class="empty-list">${t('emptyList')}</li>`;
    listActionsEl.style.display = 'none';
    renderBudgetSummary();
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
  renderBudgetSummary();
  updateListBadge();
}

function renderBudgetSummary() {
  let summaryEl = document.getElementById('budgetSummary');
  if (!summaryEl) {
    summaryEl = document.createElement('div');
    summaryEl.id = 'budgetSummary';
    summaryEl.className = 'budget-summary';
    const listSection = document.getElementById('tab-list');
    listSection.insertBefore(summaryEl, listSection.querySelector('.add-form-simple').nextSibling);
  }

  const total = shoppingList
    .filter(i => i.price && !i.done)
    .reduce((acc, i) => acc + i.price, 0);

  if (!budgetAmount || total === 0) {
    summaryEl.style.display = 'none';
    return;
  }

  const remaining = budgetAmount - total;
  const pct = Math.min(100, Math.round((total / budgetAmount) * 100));
  const over = remaining < 0;

  summaryEl.style.display = '';
  summaryEl.innerHTML = `
    <div class="budget-summary-row">
      <span class="budget-summary-label">${t('totalInList')}:</span>
      <span class="budget-summary-value">${fmt(total)}</span>
    </div>
    <div class="budget-summary-row">
      <span class="budget-summary-label ${over ? 'budget-over-label' : ''}">${over ? t('budgetOver') : t('budgetLeft') + ':'}${over ? '' : ''}</span>
      <span class="budget-summary-value ${over ? 'budget-over-label' : ''}">${over ? '' : fmt(remaining)}</span>
    </div>
    <div class="budget-progress-bar">
      <div class="budget-progress-fill ${over ? 'over' : ''}" style="width:${pct}%"></div>
    </div>
    <div class="budget-pct-label">${pct}% ${over ? '📛' : pct >= 80 ? '⚠️' : '✅'}</div>
  `;
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
function offImgUrl(ean, variant = 'front_es') {
  if (!ean) return null;
  const s = String(ean).replace(/\D/g,'').padStart(13,'0');
  const path = `${s.slice(0,3)}/${s.slice(3,6)}/${s.slice(6,9)}/${s.slice(9)}`;
  return `https://images.openfoodfacts.org/images/products/${path}/${variant}.400.jpg`;
}

// Cadena de fallback: front_es → front_fr → front → onerror
function imgFallbackAttr(ean) {
  const u2 = offImgUrl(ean, 'front_fr');
  const u3 = offImgUrl(ean, 'front');
  return `onerror="const i=this;if(!i._fb){i._fb=1;i.src='${u2}'}else if(i._fb===1){i._fb=2;i.src='${u3}'}else{i.style.display='none';const s=i.nextElementSibling;if(s)s.style.display='block'}"`;
}

function productImgHtml(ean) {
  const url = offImgUrl(ean);
  if (!url) return '';
  return `<img class="product-img"
    src="${url}"
    alt="Foto del producto"
    ${imgFallbackAttr(ean)}
    loading="lazy"
  />`;
}

// Imagen para la góndola: incluye emoji de respaldo visible cuando la foto falla
function shelfImgHtml(ean) {
  const url = offImgUrl(ean);
  if (!url) return '<span class="shelf-no-img">🛒</span>';
  return `<img class="product-img"
    src="${url}"
    alt="Foto del producto"
    ${imgFallbackAttr(ean)}
    loading="lazy"
  /><span class="shelf-no-img" style="display:none">🛒</span>`;
}

// ── Góndolas ──────────────────────────────────────────────────────────────────
// Definición local — las gondolas se renderizan inmediatamente sin esperar API
const GONDOLA_DEFS_LOCAL = [
  { id: 'lacteos',     label: 'Lácteos',           emoji: '🥛', color: '#dbeafe' },
  { id: 'bebidas',     label: 'Bebidas',            emoji: '🥤', color: '#fce7f3' },
  { id: 'panificados', label: 'Panificados',        emoji: '🍞', color: '#fef3c7' },
  { id: 'carnes',      label: 'Carnes',             emoji: '🥩', color: '#fee2e2' },
  { id: 'almacen',     label: 'Almacén',            emoji: '🫙', color: '#dcfce7' },
  { id: 'congelados',  label: 'Congelados',         emoji: '🧊', color: '#e0f2fe' },
  { id: 'limpieza',    label: 'Limpieza',           emoji: '🧹', color: '#f0fdf4' },
  { id: 'higiene',     label: 'Higiene personal',   emoji: '🧴', color: '#faf5ff' },
  { id: 'fiambres',    label: 'Fiambres',           emoji: '🥓', color: '#fff7ed' },
  { id: 'pastas',      label: 'Pastas y Cereales',  emoji: '🍝', color: '#fefce8' },
  { id: 'aceites',     label: 'Aceites y Salsas',   emoji: '🫒', color: '#ecfdf5' },
  { id: 'golosinas',   label: 'Golosinas',          emoji: '🍬', color: '#fdf2f8' },
];

let gondolaDefs = GONDOLA_DEFS_LOCAL;  // ya tiene data, no espera API
let activeGondola = null;
let selectedShelfProduct = null;

function initGondolas() {
  // Render inmediato con datos locales
  renderGondolaHome();
  // Luego intentar actualizar desde el server (en segundo plano)
  fetch('/api/gondolas')
    .then(r => r.json())
    .then(defs => {
      if (Array.isArray(defs) && defs.length) {
        gondolaDefs = defs;
        if (!activeGondola) renderGondolaHome(); // actualizar solo si no hay góndola abierta
      }
    })
    .catch(() => {});  // ignorar error — ya tenemos datos locales
}

function renderGondolaHome() {
  // Educational tip
  const introEl = document.querySelector('.gondola-intro');
  if (introEl) introEl.textContent = t('educTip');

  const grid = document.getElementById('gondolaGrid');
  grid.innerHTML = gondolaDefs.map(g => `
    <button class="gondola-card" data-id="${escapeHtml(g.id)}"
      style="--gondola-bg:${escapeHtml(g.color)}">
      <span class="gondola-card-emoji">${g.emoji}</span>
      <span class="gondola-card-label">${escapeHtml(g.label)}</span>
    </button>
  `).join('');

  grid.querySelectorAll('.gondola-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const def = gondolaDefs.find(g => g.id === btn.dataset.id);
      if (def) openGondola(def);
    });
  });
}

async function openGondola(def) {
  activeGondola = def;
  selectedShelfProduct = null;

  document.getElementById('gondolaHome').style.display  = 'none';
  document.getElementById('gondolaShelf').style.display = '';
  document.getElementById('gondolaPricePanel').style.display = 'none';

  const titleEl = document.getElementById('gondolaShelfTitle');
  titleEl.textContent = `${def.emoji} ${def.label}`;
  titleEl.style.background = def.color;

  const scroll = document.getElementById('gondolaShelfScroll');
  scroll.innerHTML = '<div class="gondola-loading">⏳ Cargando góndola...</div>';

  try {
    const params = new URLSearchParams({ gondola: def.id });
    if (userLocation) { params.set('lat', userLocation.lat); params.set('lng', userLocation.lng); }

    const res  = await fetch(`/api/gondolas/articulos?${params}`);
    const data = await res.json();

    if (!data.productos?.length) {
      scroll.innerHTML = '<p class="hint">Sin productos disponibles en esta sección.</p>';
      return;
    }
    renderShelf(data.productos, def.color);
  } catch (err) {
    scroll.innerHTML = `<p class="hint">Error al cargar la góndola: ${escapeHtml(err.message)}</p>`;
  }
}

function renderShelf(productos, color) {
  const scroll = document.getElementById('gondolaShelfScroll');
  scroll.style.setProperty('--shelf-color', color);

  scroll.innerHTML = productos.map(prod => {
    const bestPrice = prod.precios[0];
    return `<div class="shelf-item" data-ean="${escapeHtml(prod.ean)}"
        data-nombre="${escapeHtml(prod.nombre)}"
        data-marca="${escapeHtml(prod.marca || '')}">
      <div class="shelf-item-img">${shelfImgHtml(prod.ean)}</div>
      <p class="shelf-item-name">${escapeHtml(truncate(prod.nombre, 28))}</p>
      ${prod.marca ? `<p class="shelf-item-brand">${escapeHtml(prod.marca)}</p>` : ''}
      ${bestPrice
        ? `<p class="shelf-item-price">${fmt(bestPrice.precio)}</p>
           <p class="shelf-item-chain">${escapeHtml(bestPrice.cadena)}</p>`
        : `<p class="shelf-item-price no-price">Sin precio</p>`}
    </div>`;
  }).join('');

  scroll.querySelectorAll('.shelf-item').forEach(item => {
    item.addEventListener('click', () => selectShelfProduct(item, productos));
  });
}

function selectShelfProduct(item, productos) {
  // Toggle si hacen click al mismo
  if (selectedShelfProduct === item.dataset.ean) {
    selectedShelfProduct = null;
    document.getElementById('gondolaPricePanel').style.display = 'none';
    document.querySelectorAll('.shelf-item').forEach(i => i.classList.remove('selected'));
    return;
  }

  selectedShelfProduct = item.dataset.ean;
  document.querySelectorAll('.shelf-item').forEach(i => i.classList.remove('selected'));
  item.classList.add('selected');

  const prod = productos.find(p => p.ean === item.dataset.ean);
  if (!prod) return;

  const panel = document.getElementById('gondolaPricePanel');
  panel.style.display = '';

  const imgHtml  = productImgHtml(prod.ean);
  const minPrice = prod.precios[0]?.precio;

  const rows = prod.precios.map(p => {
    const isBest = p.precio === minPrice;
    return `<div class="price-row${isBest ? ' cheapest' : ''}">
      <span class="shop-logo">${chainLogoHtml(p.cadena)}</span>
      <span class="shop-name">${escapeHtml(p.cadena)}</span>
      <span class="shop-price">${fmt(p.precio)}</span>
      ${isBest ? '<span class="best-tag">Mejor precio</span>' : `<span class="diff">+${fmt(p.precio - minPrice)}</span>`}
      <button class="btn-add-list"
        data-product="${escapeHtml(prod.nombre)}"
        data-shop="${escapeHtml(p.cadena)}"
        data-price="${p.precio}"
        title="Añadir a mi lista">+</button>
    </div>`;
  }).join('');

  panel.innerHTML = `
    <div class="gondola-price-header">
      ${imgHtml || ''}
      <div class="product-info">
        <span class="product-name">${escapeHtml(prod.nombre)}</span>
        ${prod.marca ? `<span class="product-brand">${escapeHtml(prod.marca)}</span>` : ''}
        ${prod.presentacion ? `<span class="product-unit">${escapeHtml(prod.presentacion)}</span>` : ''}
      </div>
    </div>
    <div class="price-list">${rows || '<p class="hint">Sin precios disponibles.</p>'}</div>
  `;

  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Evento "Añadir a lista" dentro del panel de la góndola
document.getElementById('gondolaPricePanel').addEventListener('click', e => {
  const btn = e.target.closest('.btn-add-list');
  if (!btn) return;
  addToList(btn.dataset.product, btn.dataset.shop, parseFloat(btn.dataset.price));
  btn.textContent = '✓';
  btn.classList.add('added');
  setTimeout(() => { btn.textContent = '+'; btn.classList.remove('added'); }, 1400);
});

// Botón volver
document.getElementById('btnBackGondola').addEventListener('click', () => {
  activeGondola = null;
  selectedShelfProduct = null;
  document.getElementById('gondolaHome').style.display  = '';
  document.getElementById('gondolaShelf').style.display = 'none';
  document.getElementById('gondolaPricePanel').style.display = 'none';
});

function truncate(str, max) {
  return str.length <= max ? str : str.slice(0, max - 1) + '…';
}

// ── Budget bar ───────────────────────────────────────────────────────────────
(function initBudgetBar() {
  const input    = document.getElementById('budgetInput');
  const clearBtn = document.getElementById('clearBudget');

  if (budgetAmount !== null) {
    input.value = budgetAmount;
    clearBtn.style.display = '';
  }

  input.addEventListener('input', () => {
    const val = parseFloat(input.value);
    if (!isNaN(val) && val > 0) {
      budgetAmount = val;
      saveJSON(BUDGET_KEY, val);
      clearBtn.style.display = '';
    } else {
      budgetAmount = null;
      saveJSON(BUDGET_KEY, null);
      clearBtn.style.display = 'none';
    }
    renderList();
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    budgetAmount = null;
    saveJSON(BUDGET_KEY, null);
    clearBtn.style.display = 'none';
    renderList();
  });
})();

// ── Init ──────────────────────────────────────────────────────────────────────
applyUITranslations();
renderSearch('');
renderList();
renderSettings();
initGondolas();

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
