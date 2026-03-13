// Supermercados disponibles
const SUPERMARKETS = [
  { id: 'mercadona',  name: 'Mercadona',  color: '#00883a', logo: '🟢' },
  { id: 'carrefour',  name: 'Carrefour',  color: '#003087', logo: '🔵' },
  { id: 'lidl',       name: 'Lidl',       color: '#0050aa', logo: '🟡' },
  { id: 'dia',        name: 'Dia',        color: '#e30613', logo: '🔴' },
  { id: 'alcampo',    name: 'Alcampo',    color: '#e2001a', logo: '🟠' },
  { id: 'eroski',     name: 'Eroski',     color: '#cc0000', logo: '🟤' },
  { id: 'aldi',       name: 'Aldi',       color: '#00529b', logo: '🔷' },
  { id: 'consum',     name: 'Consum',     color: '#f39200', logo: '🟨' },
];

// Catálogo de productos con precios por supermercado
// precio: €  |  unidad: presentación del producto
const PRODUCTS = [
  // ---------- LÁCTEOS ----------
  {
    id: 1, name: 'Leche entera', category: 'lacteos', unit: '1 L',
    prices: { mercadona: 0.79, carrefour: 0.85, lidl: 0.75, dia: 0.82, alcampo: 0.80, eroski: 0.88, aldi: 0.73, consum: 0.84 },
  },
  {
    id: 2, name: 'Leche desnatada', category: 'lacteos', unit: '1 L',
    prices: { mercadona: 0.76, carrefour: 0.83, lidl: 0.72, dia: 0.79, alcampo: 0.78, eroski: 0.85, aldi: 0.70, consum: 0.81 },
  },
  {
    id: 3, name: 'Yogur natural (pack 4)', category: 'lacteos', unit: '4 uds',
    prices: { mercadona: 0.65, carrefour: 0.72, lidl: 0.59, dia: 0.68, alcampo: 0.70, eroski: 0.74, aldi: 0.55, consum: 0.71 },
  },
  {
    id: 4, name: 'Mantequilla', category: 'lacteos', unit: '250 g',
    prices: { mercadona: 1.85, carrefour: 2.10, lidl: 1.69, dia: 1.95, alcampo: 1.99, eroski: 2.15, aldi: 1.60, consum: 2.05 },
  },
  {
    id: 5, name: 'Queso manchego curado', category: 'lacteos', unit: '200 g',
    prices: { mercadona: 2.95, carrefour: 3.20, lidl: 2.75, dia: 3.05, alcampo: 3.10, eroski: 3.35, aldi: 2.65, consum: 3.15 },
  },
  {
    id: 6, name: 'Queso fresco', category: 'lacteos', unit: '250 g',
    prices: { mercadona: 1.25, carrefour: 1.40, lidl: 1.15, dia: 1.30, alcampo: 1.35, eroski: 1.45, aldi: 1.10, consum: 1.38 },
  },

  // ---------- FRUTAS Y VERDURAS ----------
  {
    id: 10, name: 'Manzanas golden', category: 'frutas', unit: '1 kg',
    prices: { mercadona: 1.49, carrefour: 1.65, lidl: 1.35, dia: 1.55, alcampo: 1.59, eroski: 1.72, aldi: 1.29, consum: 1.60 },
  },
  {
    id: 11, name: 'Plátanos', category: 'frutas', unit: '1 kg',
    prices: { mercadona: 1.55, carrefour: 1.70, lidl: 1.45, dia: 1.60, alcampo: 1.62, eroski: 1.75, aldi: 1.39, consum: 1.65 },
  },
  {
    id: 12, name: 'Tomates rama', category: 'frutas', unit: '1 kg',
    prices: { mercadona: 1.99, carrefour: 2.20, lidl: 1.85, dia: 2.05, alcampo: 2.10, eroski: 2.30, aldi: 1.75, consum: 2.15 },
  },
  {
    id: 13, name: 'Patatas', category: 'frutas', unit: '2 kg',
    prices: { mercadona: 1.29, carrefour: 1.45, lidl: 1.19, dia: 1.35, alcampo: 1.39, eroski: 1.50, aldi: 1.10, consum: 1.40 },
  },
  {
    id: 14, name: 'Cebollas', category: 'frutas', unit: '1 kg',
    prices: { mercadona: 0.89, carrefour: 0.99, lidl: 0.79, dia: 0.92, alcampo: 0.95, eroski: 1.05, aldi: 0.75, consum: 0.96 },
  },
  {
    id: 15, name: 'Naranjas', category: 'frutas', unit: '2 kg',
    prices: { mercadona: 2.49, carrefour: 2.70, lidl: 2.29, dia: 2.55, alcampo: 2.60, eroski: 2.80, aldi: 2.19, consum: 2.65 },
  },
  {
    id: 16, name: 'Lechuga iceberg', category: 'frutas', unit: '1 ud',
    prices: { mercadona: 0.89, carrefour: 0.99, lidl: 0.79, dia: 0.92, alcampo: 0.95, eroski: 1.05, aldi: 0.75, consum: 0.97 },
  },
  {
    id: 17, name: 'Pimientos rojos', category: 'frutas', unit: '1 kg',
    prices: { mercadona: 1.79, carrefour: 1.99, lidl: 1.65, dia: 1.85, alcampo: 1.90, eroski: 2.05, aldi: 1.55, consum: 1.92 },
  },

  // ---------- CARNES Y PESCADOS ----------
  {
    id: 20, name: 'Pechuga de pollo', category: 'carnes', unit: '500 g',
    prices: { mercadona: 3.50, carrefour: 3.80, lidl: 3.25, dia: 3.65, alcampo: 3.70, eroski: 3.95, aldi: 3.10, consum: 3.75 },
  },
  {
    id: 21, name: 'Carne picada mixta', category: 'carnes', unit: '400 g',
    prices: { mercadona: 2.75, carrefour: 3.00, lidl: 2.55, dia: 2.85, alcampo: 2.90, eroski: 3.10, aldi: 2.45, consum: 2.95 },
  },
  {
    id: 22, name: 'Jamón serrano lonchas', category: 'carnes', unit: '100 g',
    prices: { mercadona: 1.99, carrefour: 2.25, lidl: 1.85, dia: 2.10, alcampo: 2.15, eroski: 2.35, aldi: 1.75, consum: 2.20 },
  },
  {
    id: 23, name: 'Atún en aceite (pack 3)', category: 'carnes', unit: '3 × 80 g',
    prices: { mercadona: 1.45, carrefour: 1.65, lidl: 1.35, dia: 1.55, alcampo: 1.59, eroski: 1.72, aldi: 1.25, consum: 1.60 },
  },
  {
    id: 24, name: 'Salmón fresco', category: 'carnes', unit: '300 g',
    prices: { mercadona: 5.90, carrefour: 6.50, lidl: 5.50, dia: 6.10, alcampo: 6.20, eroski: 6.80, aldi: 5.25, consum: 6.30 },
  },

  // ---------- PANADERÍA ----------
  {
    id: 30, name: 'Pan de molde', category: 'panaderia', unit: '500 g',
    prices: { mercadona: 1.25, carrefour: 1.40, lidl: 1.15, dia: 1.30, alcampo: 1.35, eroski: 1.45, aldi: 1.09, consum: 1.38 },
  },
  {
    id: 31, name: 'Baguette', category: 'panaderia', unit: '1 ud',
    prices: { mercadona: 0.35, carrefour: 0.39, lidl: 0.29, dia: 0.38, alcampo: 0.40, eroski: 0.45, aldi: 0.27, consum: 0.39 },
  },
  {
    id: 32, name: 'Cereales con miel', category: 'panaderia', unit: '500 g',
    prices: { mercadona: 2.15, carrefour: 2.45, lidl: 1.99, dia: 2.25, alcampo: 2.30, eroski: 2.55, aldi: 1.89, consum: 2.35 },
  },

  // ---------- BEBIDAS ----------
  {
    id: 40, name: 'Agua mineral', category: 'bebidas', unit: '6 × 1,5 L',
    prices: { mercadona: 2.15, carrefour: 2.40, lidl: 1.95, dia: 2.25, alcampo: 2.30, eroski: 2.55, aldi: 1.85, consum: 2.35 },
  },
  {
    id: 41, name: 'Coca-Cola', category: 'bebidas', unit: '2 L',
    prices: { mercadona: 2.05, carrefour: 2.30, lidl: 1.95, dia: 2.15, alcampo: 2.20, eroski: 2.40, aldi: 1.89, consum: 2.25 },
  },
  {
    id: 42, name: 'Zumo de naranja', category: 'bebidas', unit: '1 L',
    prices: { mercadona: 1.35, carrefour: 1.55, lidl: 1.25, dia: 1.45, alcampo: 1.49, eroski: 1.65, aldi: 1.19, consum: 1.50 },
  },
  {
    id: 43, name: 'Cerveza (pack 6)', category: 'bebidas', unit: '6 × 33 cl',
    prices: { mercadona: 3.85, carrefour: 4.20, lidl: 3.55, dia: 3.99, alcampo: 4.05, eroski: 4.35, aldi: 3.40, consum: 4.10 },
  },
  {
    id: 44, name: 'Vino tinto', category: 'bebidas', unit: '75 cl',
    prices: { mercadona: 3.50, carrefour: 3.90, lidl: 3.20, dia: 3.65, alcampo: 3.75, eroski: 4.00, aldi: 3.05, consum: 3.80 },
  },

  // ---------- DESPENSA ----------
  {
    id: 50, name: 'Arroz', category: 'despensa', unit: '1 kg',
    prices: { mercadona: 0.95, carrefour: 1.10, lidl: 0.89, dia: 0.99, alcampo: 1.05, eroski: 1.15, aldi: 0.85, consum: 1.08 },
  },
  {
    id: 51, name: 'Pasta espaguetis', category: 'despensa', unit: '500 g',
    prices: { mercadona: 0.65, carrefour: 0.79, lidl: 0.59, dia: 0.69, alcampo: 0.72, eroski: 0.82, aldi: 0.55, consum: 0.75 },
  },
  {
    id: 52, name: 'Aceite de oliva virgen extra', category: 'despensa', unit: '1 L',
    prices: { mercadona: 6.85, carrefour: 7.50, lidl: 6.50, dia: 7.10, alcampo: 7.20, eroski: 7.80, aldi: 6.25, consum: 7.30 },
  },
  {
    id: 53, name: 'Aceite de girasol', category: 'despensa', unit: '1 L',
    prices: { mercadona: 1.85, carrefour: 2.10, lidl: 1.70, dia: 1.95, alcampo: 1.99, eroski: 2.20, aldi: 1.65, consum: 2.05 },
  },
  {
    id: 54, name: 'Tomate frito', category: 'despensa', unit: '400 g',
    prices: { mercadona: 0.85, carrefour: 0.99, lidl: 0.79, dia: 0.89, alcampo: 0.92, eroski: 1.05, aldi: 0.75, consum: 0.95 },
  },
  {
    id: 55, name: 'Huevos L (docena)', category: 'despensa', unit: '12 uds',
    prices: { mercadona: 2.35, carrefour: 2.60, lidl: 2.15, dia: 2.45, alcampo: 2.50, eroski: 2.75, aldi: 2.05, consum: 2.55 },
  },
  {
    id: 56, name: 'Legumbres cocidas (bote)', category: 'despensa', unit: '400 g',
    prices: { mercadona: 0.75, carrefour: 0.89, lidl: 0.69, dia: 0.79, alcampo: 0.82, eroski: 0.95, aldi: 0.65, consum: 0.85 },
  },

  // ---------- LIMPIEZA ----------
  {
    id: 60, name: 'Detergente lavadora', category: 'limpieza', unit: '40 dosis',
    prices: { mercadona: 5.95, carrefour: 6.80, lidl: 5.50, dia: 6.25, alcampo: 6.40, eroski: 6.95, aldi: 5.25, consum: 6.50 },
  },
  {
    id: 61, name: 'Lavavajillas líquido', category: 'limpieza', unit: '750 ml',
    prices: { mercadona: 1.45, carrefour: 1.65, lidl: 1.30, dia: 1.55, alcampo: 1.59, eroski: 1.75, aldi: 1.25, consum: 1.60 },
  },
  {
    id: 62, name: 'Papel de cocina (4 rollos)', category: 'limpieza', unit: '4 uds',
    prices: { mercadona: 2.55, carrefour: 2.80, lidl: 2.35, dia: 2.65, alcampo: 2.70, eroski: 2.95, aldi: 2.25, consum: 2.75 },
  },
  {
    id: 63, name: 'Papel higiénico (12 rollos)', category: 'limpieza', unit: '12 uds',
    prices: { mercadona: 4.95, carrefour: 5.50, lidl: 4.60, dia: 5.15, alcampo: 5.25, eroski: 5.75, aldi: 4.40, consum: 5.35 },
  },

  // ---------- CONGELADOS ----------
  {
    id: 70, name: 'Pizza congelada', category: 'congelados', unit: '350 g',
    prices: { mercadona: 2.65, carrefour: 2.95, lidl: 2.45, dia: 2.75, alcampo: 2.80, eroski: 3.05, aldi: 2.30, consum: 2.85 },
  },
  {
    id: 71, name: 'Guisantes congelados', category: 'congelados', unit: '750 g',
    prices: { mercadona: 1.35, carrefour: 1.55, lidl: 1.25, dia: 1.45, alcampo: 1.49, eroski: 1.65, aldi: 1.19, consum: 1.50 },
  },
  {
    id: 72, name: 'Helado de vainilla', category: 'congelados', unit: '1 L',
    prices: { mercadona: 2.95, carrefour: 3.30, lidl: 2.70, dia: 3.10, alcampo: 3.15, eroski: 3.45, aldi: 2.55, consum: 3.20 },
  },
];

const CATEGORY_LABELS = {
  lacteos:    'Lácteos',
  frutas:     'Frutas y Verduras',
  carnes:     'Carnes y Pescados',
  panaderia:  'Panadería',
  bebidas:    'Bebidas',
  despensa:   'Despensa',
  limpieza:   'Limpieza',
  congelados: 'Congelados',
};
