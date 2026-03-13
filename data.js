// Supermercados de Argentina
const SUPERMARKETS = [
  { id: 'coto',       name: 'Coto',        color: '#e30613', logo: '🔴' },
  { id: 'carrefour',  name: 'Carrefour',   color: '#003087', logo: '🔵' },
  { id: 'dia',        name: 'Dia',         color: '#cc0000', logo: '🟥' },
  { id: 'jumbo',      name: 'Jumbo',       color: '#00853e', logo: '🟢' },
  { id: 'changomas',  name: 'Changomás',   color: '#f7941d', logo: '🟠' },
  { id: 'vea',        name: 'Vea',         color: '#0071ce', logo: '🔷' },
  { id: 'disco',      name: 'Disco',       color: '#e2001a', logo: '🟤' },
  { id: 'anonima',    name: 'La Anónima',  color: '#e30613', logo: '🟡' },
];

// Catálogo de productos con precios en pesos argentinos (ARS) — marzo 2026
const PRODUCTS = [
  // ---------- LÁCTEOS ----------
  {
    id: 1, name: 'Leche entera', category: 'lacteos', unit: '1 L (sachet)',
    prices: { coto: 980, carrefour: 1050, dia: 920, jumbo: 1120, changomas: 990, vea: 1030, disco: 1150, anonima: 950 },
  },
  {
    id: 2, name: 'Leche descremada', category: 'lacteos', unit: '1 L',
    prices: { coto: 1020, carrefour: 1090, dia: 960, jumbo: 1160, changomas: 1035, vea: 1075, disco: 1190, anonima: 990 },
  },
  {
    id: 3, name: 'Yogur entero (pack 4)', category: 'lacteos', unit: '4 × 125 g',
    prices: { coto: 1350, carrefour: 1480, dia: 1250, jumbo: 1600, changomas: 1380, vea: 1420, disco: 1650, anonima: 1290 },
  },
  {
    id: 4, name: 'Manteca', category: 'lacteos', unit: '200 g',
    prices: { coto: 1650, carrefour: 1820, dia: 1520, jumbo: 1980, changomas: 1700, vea: 1760, disco: 2050, anonima: 1580 },
  },
  {
    id: 5, name: 'Queso cremoso', category: 'lacteos', unit: '200 g',
    prices: { coto: 2100, carrefour: 2350, dia: 1950, jumbo: 2550, changomas: 2200, vea: 2280, disco: 2650, anonima: 2000 },
  },
  {
    id: 6, name: 'Queso mozzarella', category: 'lacteos', unit: '250 g',
    prices: { coto: 2400, carrefour: 2650, dia: 2200, jumbo: 2900, changomas: 2500, vea: 2580, disco: 3000, anonima: 2280 },
  },
  {
    id: 7, name: 'Dulce de leche', category: 'lacteos', unit: '400 g',
    prices: { coto: 1480, carrefour: 1620, dia: 1380, jumbo: 1750, changomas: 1520, vea: 1570, disco: 1820, anonima: 1420 },
  },

  // ---------- FRUTAS Y VERDURAS ----------
  {
    id: 10, name: 'Manzanas red delicious', category: 'frutas', unit: '1 kg',
    prices: { coto: 1200, carrefour: 1350, dia: 1100, jumbo: 1480, changomas: 1250, vea: 1290, disco: 1520, anonima: 1150 },
  },
  {
    id: 11, name: 'Bananas', category: 'frutas', unit: '1 kg',
    prices: { coto: 950, carrefour: 1080, dia: 880, jumbo: 1200, changomas: 990, vea: 1020, disco: 1250, anonima: 920 },
  },
  {
    id: 12, name: 'Tomates redondos', category: 'frutas', unit: '1 kg',
    prices: { coto: 1450, carrefour: 1620, dia: 1350, jumbo: 1750, changomas: 1500, vea: 1540, disco: 1800, anonima: 1380 },
  },
  {
    id: 13, name: 'Papas', category: 'frutas', unit: '2 kg',
    prices: { coto: 1100, carrefour: 1250, dia: 1020, jumbo: 1380, changomas: 1150, vea: 1190, disco: 1420, anonima: 1060 },
  },
  {
    id: 14, name: 'Cebollas', category: 'frutas', unit: '1 kg',
    prices: { coto: 850, carrefour: 980, dia: 790, jumbo: 1080, changomas: 890, vea: 920, disco: 1120, anonima: 810 },
  },
  {
    id: 15, name: 'Naranjas', category: 'frutas', unit: '2 kg',
    prices: { coto: 1300, carrefour: 1450, dia: 1200, jumbo: 1600, changomas: 1350, vea: 1390, disco: 1650, anonima: 1250 },
  },
  {
    id: 16, name: 'Lechuga', category: 'frutas', unit: '1 ud',
    prices: { coto: 750, carrefour: 860, dia: 690, jumbo: 950, changomas: 790, vea: 810, disco: 980, anonima: 720 },
  },
  {
    id: 17, name: 'Zapallo anco', category: 'frutas', unit: '1 kg',
    prices: { coto: 680, carrefour: 790, dia: 620, jumbo: 880, changomas: 710, vea: 740, disco: 910, anonima: 650 },
  },

  // ---------- CARNES ----------
  {
    id: 20, name: 'Asado de tira', category: 'carnes', unit: '1 kg',
    prices: { coto: 6500, carrefour: 7200, dia: 6100, jumbo: 7800, changomas: 6700, vea: 6900, disco: 8100, anonima: 6300 },
  },
  {
    id: 21, name: 'Milanesas de nalga', category: 'carnes', unit: '1 kg',
    prices: { coto: 7200, carrefour: 7900, dia: 6800, jumbo: 8600, changomas: 7400, vea: 7600, disco: 8900, anonima: 6900 },
  },
  {
    id: 22, name: 'Vacío', category: 'carnes', unit: '1 kg',
    prices: { coto: 6800, carrefour: 7500, dia: 6400, jumbo: 8200, changomas: 7000, vea: 7200, disco: 8500, anonima: 6500 },
  },
  {
    id: 23, name: 'Pechuga de pollo', category: 'carnes', unit: '1 kg',
    prices: { coto: 4200, carrefour: 4700, dia: 3900, jumbo: 5100, changomas: 4350, vea: 4480, disco: 5300, anonima: 4000 },
  },
  {
    id: 24, name: 'Pollo entero', category: 'carnes', unit: '1 kg',
    prices: { coto: 2800, carrefour: 3100, dia: 2600, jumbo: 3400, changomas: 2900, vea: 2980, disco: 3550, anonima: 2680 },
  },
  {
    id: 25, name: 'Atún al natural (lata)', category: 'carnes', unit: '170 g',
    prices: { coto: 1150, carrefour: 1280, dia: 1070, jumbo: 1390, changomas: 1190, vea: 1230, disco: 1450, anonima: 1100 },
  },

  // ---------- PANADERÍA ----------
  {
    id: 30, name: 'Pan lactal', category: 'panaderia', unit: '500 g',
    prices: { coto: 1380, carrefour: 1520, dia: 1280, jumbo: 1650, changomas: 1420, vea: 1470, disco: 1700, anonima: 1320 },
  },
  {
    id: 31, name: 'Medialunas (pack 6)', category: 'panaderia', unit: '6 uds',
    prices: { coto: 980, carrefour: 1100, dia: 900, jumbo: 1200, changomas: 1020, vea: 1050, disco: 1250, anonima: 940 },
  },
  {
    id: 32, name: 'Galletitas dulces', category: 'panaderia', unit: '200 g',
    prices: { coto: 850, carrefour: 960, dia: 790, jumbo: 1050, changomas: 880, vea: 910, disco: 1090, anonima: 810 },
  },
  {
    id: 33, name: 'Alfajor triple', category: 'panaderia', unit: '1 ud',
    prices: { coto: 650, carrefour: 720, dia: 600, jumbo: 780, changomas: 670, vea: 690, disco: 810, anonima: 620 },
  },

  // ---------- BEBIDAS ----------
  {
    id: 40, name: 'Agua mineral', category: 'bebidas', unit: '6 × 1,5 L',
    prices: { coto: 3200, carrefour: 3550, dia: 2980, jumbo: 3850, changomas: 3300, vea: 3400, disco: 3990, anonima: 3080 },
  },
  {
    id: 41, name: 'Coca-Cola', category: 'bebidas', unit: '2,25 L',
    prices: { coto: 1850, carrefour: 2050, dia: 1720, jumbo: 2250, changomas: 1920, vea: 1980, disco: 2330, anonima: 1780 },
  },
  {
    id: 42, name: 'Gaseosa lima-limón', category: 'bebidas', unit: '2,25 L',
    prices: { coto: 1200, carrefour: 1350, dia: 1100, jumbo: 1480, changomas: 1250, vea: 1290, disco: 1540, anonima: 1150 },
  },
  {
    id: 43, name: 'Cerveza Quilmes (pack 6)', category: 'bebidas', unit: '6 × 340 ml',
    prices: { coto: 4500, carrefour: 4980, dia: 4200, jumbo: 5400, changomas: 4650, vea: 4800, disco: 5600, anonima: 4300 },
  },
  {
    id: 44, name: 'Vino tinto Malbec', category: 'bebidas', unit: '750 ml',
    prices: { coto: 3200, carrefour: 3550, dia: 2980, jumbo: 3850, changomas: 3300, vea: 3400, disco: 3990, anonima: 3080 },
  },
  {
    id: 45, name: 'Jugo en polvo (caja)', category: 'bebidas', unit: '20 sobres',
    prices: { coto: 950, carrefour: 1060, dia: 880, jumbo: 1160, changomas: 990, vea: 1020, disco: 1200, anonima: 910 },
  },

  // ---------- DESPENSA ----------
  {
    id: 50, name: 'Yerba mate', category: 'despensa', unit: '500 g',
    prices: { coto: 2100, carrefour: 2350, dia: 1950, jumbo: 2550, changomas: 2200, vea: 2270, disco: 2650, anonima: 2000 },
  },
  {
    id: 51, name: 'Arroz largo fino', category: 'despensa', unit: '1 kg',
    prices: { coto: 1050, carrefour: 1180, dia: 980, jumbo: 1290, changomas: 1090, vea: 1130, disco: 1340, anonima: 1010 },
  },
  {
    id: 52, name: 'Fideos spaghetti', category: 'despensa', unit: '500 g',
    prices: { coto: 780, carrefour: 880, dia: 720, jumbo: 960, changomas: 810, vea: 840, disco: 1000, anonima: 750 },
  },
  {
    id: 53, name: 'Aceite de girasol', category: 'despensa', unit: '1,5 L',
    prices: { coto: 2650, carrefour: 2950, dia: 2480, jumbo: 3200, changomas: 2750, vea: 2840, disco: 3320, anonima: 2550 },
  },
  {
    id: 54, name: 'Harina 000', category: 'despensa', unit: '1 kg',
    prices: { coto: 750, carrefour: 840, dia: 690, jumbo: 920, changomas: 780, vea: 810, disco: 960, anonima: 720 },
  },
  {
    id: 55, name: 'Azúcar', category: 'despensa', unit: '1 kg',
    prices: { coto: 820, carrefour: 920, dia: 760, jumbo: 1010, changomas: 850, vea: 880, disco: 1050, anonima: 790 },
  },
  {
    id: 56, name: 'Huevos (docena)', category: 'despensa', unit: '12 uds',
    prices: { coto: 2800, carrefour: 3100, dia: 2600, jumbo: 3400, changomas: 2900, vea: 2980, disco: 3520, anonima: 2680 },
  },
  {
    id: 57, name: 'Tomate triturado (tetra)', category: 'despensa', unit: '1 kg',
    prices: { coto: 980, carrefour: 1100, dia: 910, jumbo: 1200, changomas: 1020, vea: 1050, disco: 1250, anonima: 940 },
  },
  {
    id: 58, name: 'Mayonesa', category: 'despensa', unit: '500 g',
    prices: { coto: 1650, carrefour: 1830, dia: 1530, jumbo: 1990, changomas: 1710, vea: 1770, disco: 2060, anonima: 1580 },
  },

  // ---------- LIMPIEZA ----------
  {
    id: 60, name: 'Detergente ropa líquido', category: 'limpieza', unit: '3 L',
    prices: { coto: 5200, carrefour: 5750, dia: 4850, jumbo: 6250, changomas: 5380, vea: 5560, disco: 6500, anonima: 5000 },
  },
  {
    id: 61, name: 'Lavandina', category: 'limpieza', unit: '1 L',
    prices: { coto: 680, carrefour: 760, dia: 630, jumbo: 830, changomas: 710, vea: 730, disco: 860, anonima: 650 },
  },
  {
    id: 62, name: 'Papel higiénico (4 rollos)', category: 'limpieza', unit: '4 uds',
    prices: { coto: 1850, carrefour: 2060, dia: 1720, jumbo: 2250, changomas: 1920, vea: 1980, disco: 2330, anonima: 1780 },
  },
  {
    id: 63, name: 'Jabón en polvo', category: 'limpieza', unit: '1 kg',
    prices: { coto: 2200, carrefour: 2450, dia: 2050, jumbo: 2670, changomas: 2280, vea: 2360, disco: 2770, anonima: 2110 },
  },
  {
    id: 64, name: 'Lavavajillas', category: 'limpieza', unit: '500 ml',
    prices: { coto: 980, carrefour: 1100, dia: 910, jumbo: 1200, changomas: 1020, vea: 1050, disco: 1250, anonima: 940 },
  },

  // ---------- CONGELADOS ----------
  {
    id: 70, name: 'Empanadas congeladas (caja)', category: 'congelados', unit: '12 uds',
    prices: { coto: 3500, carrefour: 3900, dia: 3250, jumbo: 4250, changomas: 3650, vea: 3770, disco: 4400, anonima: 3350 },
  },
  {
    id: 71, name: 'Papas fritas congeladas', category: 'congelados', unit: '700 g',
    prices: { coto: 2100, carrefour: 2350, dia: 1950, jumbo: 2560, changomas: 2200, vea: 2270, disco: 2660, anonima: 2010 },
  },
  {
    id: 72, name: 'Helado de crema', category: 'congelados', unit: '1 L',
    prices: { coto: 3200, carrefour: 3550, dia: 2980, jumbo: 3860, changomas: 3310, vea: 3420, disco: 4000, anonima: 3080 },
  },
];

const CATEGORY_LABELS = {
  lacteos:    'Lácteos',
  frutas:     'Frutas y Verduras',
  carnes:     'Carnes',
  panaderia:  'Panadería',
  bebidas:    'Bebidas',
  despensa:   'Despensa',
  limpieza:   'Limpieza',
  congelados: 'Congelados',
};
