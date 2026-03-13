const express = require('express');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname)));

// ── Precios Claros (gobierno argentino) ──────────────────────────────────────
// Todos los supermercados con más de 10 sucursales deben publicar sus precios.
const PC = 'https://precios.magyp.gob.ar/api';

async function pcFetch(url) {
  const res = await fetch(url, {
    headers: { Accept: 'application/json', 'User-Agent': 'lista-compra/1.0' },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Precios Claros HTTP ${res.status}`);
  return res.json();
}

// ── Overpass (OpenStreetMap) ─────────────────────────────────────────────────
async function overpassQuery(query) {
  const res = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `data=${encodeURIComponent(query)}`,
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`Overpass HTTP ${res.status}`);
  return res.json();
}

// ────────────────────────────────────────────────────────────────────────────
// GET /api/supermercados/cercanos?lat=-34.6&lng=-58.4&radio=3000
// Devuelve supermercados reales en la zona usando OpenStreetMap
// ────────────────────────────────────────────────────────────────────────────
app.get('/api/supermercados/cercanos', async (req, res) => {
  const { lat, lng, radio = 3000 } = req.query;
  if (!lat || !lng) return res.status(400).json({ error: 'Faltan lat y lng' });

  const query = `
    [out:json][timeout:30];
    (
      node["shop"="supermarket"](around:${radio},${lat},${lng});
      way["shop"="supermarket"](around:${radio},${lat},${lng});
    );
    out center tags;
  `;

  try {
    const data = await overpassQuery(query);
    const supers = data.elements
      .map(el => {
        const tags = el.tags || {};
        const name = tags.name || tags.brand || 'Supermercado';
        const coordLat = el.lat ?? el.center?.lat;
        const coordLng = el.lon ?? el.center?.lon;
        const address  = [tags['addr:street'], tags['addr:housenumber']]
          .filter(Boolean).join(' ') || tags['addr:full'] || null;

        return { id: el.id, name, address, lat: coordLat, lng: coordLng, brand: tags.brand || name };
      })
      .filter(s => s.name && s.lat);

    // Deduplicar por nombre de cadena + agrupar sucursales
    const chains = {};
    for (const s of supers) {
      const key = normalizeChain(s.name);
      if (!chains[key]) chains[key] = { id: key, name: key, branches: [] };
      chains[key].branches.push({ id: s.id, address: s.address, lat: s.lat, lng: s.lng });
    }

    res.json(Object.values(chains));
  } catch (err) {
    console.error('[Overpass]', err.message);
    res.status(502).json({ error: 'No se pudo obtener supermercados cercanos', detail: err.message });
  }
});

// Normaliza nombres de cadenas (ej: "Coto CICSA" → "Coto")
function normalizeChain(name) {
  const map = [
    [/coto/i, 'Coto'],
    [/carrefour/i, 'Carrefour'],
    [/jumbo/i, 'Jumbo'],
    [/\bdia\b/i, 'Dia'],
    [/changom/i, 'Changomás'],
    [/\bvea\b/i, 'Vea'],
    [/disco/i, 'Disco'],
    [/an[oó]nima/i, 'La Anónima'],
    [/walmart/i, 'Changomás'],
    [/hiperlibertad|libertad/i, 'HiperLibertad'],
    [/mayorista\s*10/i, 'Mayorista 10'],
    [/maxiconsumo/i, 'Maxiconsumo'],
    [/toledo/i, 'Toledo'],
    [/chango\s*m[aá]s/i, 'Changomás'],
    [/easy/i, 'Easy'],
    [/walmart/i, 'Walmart'],
    [/pricosmart|pricesmart/i, 'PriceSmart'],
    [/farmacity/i, 'Farmacity'],
  ];
  for (const [regex, canonical] of map) {
    if (regex.test(name)) return canonical;
  }
  // Capitalizar si no matchea
  return name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

// ────────────────────────────────────────────────────────────────────────────
// GET /api/productos/buscar?q=leche&lat=-34.6&lng=-58.4
// Busca productos en Precios Claros y devuelve precios por cadena
// ────────────────────────────────────────────────────────────────────────────
app.get('/api/productos/buscar', async (req, res) => {
  const { q, lat, lng } = req.query;
  if (!q) return res.status(400).json({ error: 'Falta parámetro q' });

  try {
    // 1. Buscar artículos
    const articulosData = await pcFetch(
      `${PC}/articulos/?nombre=${encodeURIComponent(q)}&limit=10`
    );
    const articulos = articulosData.results || articulosData || [];

    if (!articulos.length) {
      return res.json({ source: 'precios_claros', productos: [] });
    }

    // 2. Para cada artículo, buscar precios (con ubicación si está disponible)
    const productos = await Promise.allSettled(
      articulos.slice(0, 6).map(async art => {
        let preciosUrl = `${PC}/precios/?articulo=${encodeURIComponent(art.id)}&limit=200`;
        if (lat && lng) {
          preciosUrl += `&latitud=${lat}&longitud=${lng}&distancia=10`;
        }

        const preciosData = await pcFetch(preciosUrl);
        const precios = preciosData.results || preciosData || [];

        // Agrupar por cadena: quedarse con el precio mínimo de cada cadena
        const porCadena = {};
        for (const p of precios) {
          const cadena = normalizeChain(
            p.sucursal_nombre || p.sucursalNombre || p.cadena || p.comercioRazonSocial || 'Desconocido'
          );
          const precio = parseFloat(p.precio || p.precioLista || 0);
          if (!precio) continue;
          if (!porCadena[cadena] || precio < porCadena[cadena].precio) {
            porCadena[cadena] = {
              cadena,
              precio,
              sucursal: p.sucursal_nombre || p.sucursalNombre || null,
              direccion: p.sucursal_direccion || p.sucursalDireccion || null,
            };
          }
        }

        return {
          ean: art.id,
          nombre: art.nombre || art.productoNombre,
          marca: art.marca || art.marcaNombre || null,
          presentacion: art.presentacion || null,
          precios: Object.values(porCadena).sort((a, b) => a.precio - b.precio),
        };
      })
    );

    const exitosos = productos
      .filter(r => r.status === 'fulfilled' && r.value.precios.length > 0)
      .map(r => r.value);

    res.json({ source: 'precios_claros', productos: exitosos });
  } catch (err) {
    console.error('[Precios Claros]', err.message);
    res.status(502).json({
      error: 'Error al consultar Precios Claros',
      detail: err.message,
      source: 'error',
    });
  }
});

// ────────────────────────────────────────────────────────────────────────────
// GET /api/sucursales/buscar?cadena=Coto&lat=-34.6&lng=-58.4
// Busca sucursales de una cadena cerca de la ubicación (Precios Claros)
// ────────────────────────────────────────────────────────────────────────────
app.get('/api/sucursales/buscar', async (req, res) => {
  const { cadena, lat, lng, distancia = 5 } = req.query;
  if (!lat || !lng) return res.status(400).json({ error: 'Faltan lat y lng' });

  try {
    let url = `${PC}/sucursales/?latitud=${lat}&longitud=${lng}&distancia=${distancia}&limit=50`;
    if (cadena) url += `&cadena=${encodeURIComponent(cadena)}`;

    const data = await pcFetch(url);
    const sucursales = (data.results || data || []).map(s => ({
      id: s.id,
      nombre: normalizeChain(s.nombre || s.razonSocial || ''),
      direccion: s.direccion || s.domicilio || null,
      lat: s.lat || s.latitud,
      lng: s.lng || s.longitud,
    }));

    res.json(sucursales);
  } catch (err) {
    console.error('[Sucursales]', err.message);
    res.status(502).json({ error: 'Error al consultar sucursales', detail: err.message });
  }
});

// ── Góndolas: definición de secciones con términos de búsqueda ───────────────
const GONDOLA_DEFS = [
  { id: 'lacteos',     label: 'Lácteos',           emoji: '🥛', color: '#dbeafe', terms: ['leche', 'yogur', 'queso', 'crema', 'manteca'] },
  { id: 'bebidas',     label: 'Bebidas',            emoji: '🥤', color: '#fce7f3', terms: ['gaseosa', 'agua mineral', 'jugo', 'cerveza', 'soda'] },
  { id: 'panificados', label: 'Panificados',        emoji: '🍞', color: '#fef3c7', terms: ['pan lactal', 'galletitas', 'bizcochos', 'tostadas'] },
  { id: 'carnes',      label: 'Carnes',             emoji: '🥩', color: '#fee2e2', terms: ['carne vacuna', 'pollo', 'cerdo', 'pescado'] },
  { id: 'almacen',     label: 'Almacén',            emoji: '🫙', color: '#dcfce7', terms: ['arroz', 'azucar', 'harina', 'sal fina', 'aceite girasol'] },
  { id: 'congelados',  label: 'Congelados',         emoji: '🧊', color: '#e0f2fe', terms: ['hamburguesa congelada', 'helado', 'pizza congelada', 'vegetales congelados'] },
  { id: 'limpieza',    label: 'Limpieza',           emoji: '🧹', color: '#f0fdf4', terms: ['detergente', 'lavandina', 'desinfectante', 'limpiapisos', 'esponjas'] },
  { id: 'higiene',     label: 'Higiene personal',   emoji: '🧴', color: '#faf5ff', terms: ['shampoo', 'dentifrico', 'desodorante', 'jabon tocador'] },
  { id: 'fiambres',    label: 'Fiambres',           emoji: '🥓', color: '#fff7ed', terms: ['jamon cocido', 'salame', 'mortadela', 'queso en barra'] },
  { id: 'pastas',      label: 'Pastas y Cereales',  emoji: '🍝', color: '#fefce8', terms: ['fideos spaghetti', 'fideos moñito', 'cereales', 'avena'] },
  { id: 'aceites',     label: 'Aceites y Salsas',   emoji: '🫒', color: '#ecfdf5', terms: ['aceite oliva', 'salsa tomate', 'mayonesa', 'vinagre', 'ketchup'] },
  { id: 'golosinas',   label: 'Golosinas',          emoji: '🍬', color: '#fdf2f8', terms: ['chocolate', 'alfajor', 'chicle', 'caramelo', 'turron'] },
];

// ────────────────────────────────────────────────────────────────────────────
// GET /api/gondolas — lista de secciones disponibles
// ────────────────────────────────────────────────────────────────────────────
app.get('/api/gondolas', (_req, res) => {
  res.json(GONDOLA_DEFS.map(({ id, label, emoji, color }) => ({ id, label, emoji, color })));
});

// ────────────────────────────────────────────────────────────────────────────
// GET /api/gondolas/articulos?gondola=lacteos&lat=-34.6&lng=-58.4
// Busca artículos de la sección combinando varios términos, devuelve
// productos con imagen y mejor precio por cadena (carga progresiva).
// ────────────────────────────────────────────────────────────────────────────
app.get('/api/gondolas/articulos', async (req, res) => {
  const { gondola, lat, lng } = req.query;
  if (!gondola) return res.status(400).json({ error: 'Falta parámetro gondola' });

  const def = GONDOLA_DEFS.find(g => g.id === gondola);
  if (!def) return res.status(404).json({ error: 'Góndola no encontrada' });

  try {
    // Buscar artículos para cada término en paralelo
    const searches = await Promise.allSettled(
      def.terms.map(term =>
        pcFetch(`${PC}/articulos/?nombre=${encodeURIComponent(term)}&limit=6`)
      )
    );

    // Combinar y deduplicar por EAN
    const seen = new Set();
    const articulos = [];
    for (const r of searches) {
      if (r.status !== 'fulfilled') continue;
      for (const art of (r.value.results || r.value || [])) {
        if (!art.id || seen.has(art.id)) continue;
        seen.add(art.id);
        articulos.push(art);
      }
    }

    if (!articulos.length) return res.json({ gondola, productos: [] });

    // Para cada artículo obtener precios (paralelo, máximo 15)
    const withPrices = await Promise.allSettled(
      articulos.slice(0, 15).map(async art => {
        let url = `${PC}/precios/?articulo=${encodeURIComponent(art.id)}&limit=100`;
        if (lat && lng) url += `&latitud=${lat}&longitud=${lng}&distancia=10`;

        const prData = await pcFetch(url).catch(() => ({ results: [] }));
        const precios = prData.results || prData || [];

        const porCadena = {};
        for (const p of precios) {
          const cadena = normalizeChain(
            p.sucursal_nombre || p.sucursalNombre || p.cadena || p.comercioRazonSocial || ''
          );
          const precio = parseFloat(p.precio || p.precioLista || 0);
          if (!precio || !cadena) continue;
          if (!porCadena[cadena] || precio < porCadena[cadena].precio) {
            porCadena[cadena] = { cadena, precio };
          }
        }

        const preciosList = Object.values(porCadena).sort((a, b) => a.precio - b.precio);

        return {
          ean: art.id,
          nombre: art.nombre || art.productoNombre || '?',
          marca:  art.marca  || art.marcaNombre   || null,
          presentacion: art.presentacion || null,
          precios: preciosList,
        };
      })
    );

    const productos = withPrices
      .filter(r => r.status === 'fulfilled' && r.value.precios.length > 0)
      .map(r => r.value);

    res.json({ gondola, productos });
  } catch (err) {
    console.error('[Góndola]', err.message);
    res.status(502).json({ error: 'Error al cargar la góndola', detail: err.message });
  }
});

// ────────────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🛒 Lista de la Compra corriendo en http://localhost:${PORT}`);
  console.log(`   Precios Claros: ${PC}`);
  console.log(`   Abrí http://localhost:${PORT} en tu navegador\n`);
});
