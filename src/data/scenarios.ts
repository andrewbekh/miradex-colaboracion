// Five cooperation scenarios (strategy, section 3). Order matches the strategy and the header dropdown.
// Copy is a Spanish draft for the client to edit.

export type ScenarioId = 'vender' | 'instalar' | 'proyectos' | 'recomendar' | 'negocio';

export type Tone = 'mint' | 'sky' | 'blue';

export interface Scenario {
  id: ScenarioId;
  num: string;
  tone: Tone;        // badge colour, same everywhere: 1 mint, 2 sky, 3 blue, 4 mint, 5 sky
  title: string;      // "Quiero..." as in the strategy
  short: string;      // nav / select label
  promise: string;    // one-line business promise
  audience: string[]; // short "para quién" tags
  href: string;
  image: string;     // banner photo on the hub (provisional, miradex.bg)
  video: { num: number; title: string; duration: string };
}

export const scenarios: Scenario[] = [
  {
    id: 'vender',
    tone: 'mint',
    num: '01',
    title: 'Quiero vender MIRADEX',
    short: 'Vender MIRADEX',
    promise: 'Precio de socio y margen en cada venta, sin producción propia.',
    audience: ['Vallas y cerramientos', 'Puertas y automatismos', 'Tiendas y distribuidores'],
    href: '/colaboracion/vender',
    image: '/img/photos/romb-pro-house.jpg',
    video: { num: 4, title: 'Añada Miradex a su catálogo', duration: '3:00-3:15' },
  },
  {
    id: 'instalar',
    tone: 'sky',
    num: '02',
    title: 'Quiero vender e instalar',
    short: 'Vender e instalar',
    promise: 'Gane con el producto y con la instalación, y reciba pedidos locales.',
    audience: ['Instaladores', 'Metalistería', 'Contratistas'],
    href: '/colaboracion/vender-e-instalar',
    image: '/img/photos/atlas-wood-street.jpg',
    video: { num: 3, title: 'Empresas de construcción e instalación', duration: '2:50-3:10' },
  },
  {
    id: 'proyectos',
    tone: 'blue',
    num: '03',
    title: 'Quiero comprar para proyectos',
    short: 'Comprar para proyectos',
    promise: 'Condiciones especiales para obra, promociones y grandes volúmenes.',
    audience: ['Constructoras', 'Promotoras', 'Proyectos comerciales'],
    href: '/colaboracion/proyectos',
    image: '/img/photos/atlas-villas.jpg',
    video: { num: 6, title: 'Miradex para constructoras y promotoras', duration: '3:00-3:15' },
  },
  {
    id: 'recomendar',
    tone: 'mint',
    num: '04',
    title: 'Quiero recomendar clientes',
    short: 'Recomendar clientes',
    promise: 'Recomiende MIRADEX y reciba una recompensa tras cada venta.',
    audience: ['Arquitectos', 'Inmobiliarias', 'Paisajismo y piscinas'],
    href: '/colaboracion/recomendar',
    image: '/img/photos/simetrica-black-house.jpg',
    video: { num: 11, title: 'Programa de referidos Miradex', duration: '2:30-2:50' },
  },
  {
    id: 'negocio',
    tone: 'sky',
    num: '05',
    title: 'Quiero crear un negocio MIRADEX',
    short: 'Negocio MIRADEX',
    promise: 'Construya su propio negocio con el producto y el modelo MIRADEX.',
    audience: ['Emprendedores', 'Empresas con nueva unidad', 'Distribuidores fuertes'],
    href: '/colaboracion/negocio-miradex',
    image: '/img/photos/atlas-modern-house.jpg',
    video: { num: 2, title: 'Cree su propio negocio con Miradex', duration: '3:00-3:20' },
  },
];

export const scenarioById = (id?: string) => scenarios.find((s) => s.id === id);

/** Business types for the lead form (strategy 9.2 audiences + CRM "tipo de negocio"). */
export const businessTypes = [
  'Vallas y cerramientos',
  'Instalación y montaje',
  'Puertas y automatismos',
  'Ventanas, pérgolas, fachadas u outdoor',
  'Metalistería',
  'Constructora o contratista',
  'Promotora o grandes proyectos',
  'Arquitectura, diseño o ingeniería',
  'Inmobiliaria',
  'Paisajismo, piscinas o exteriores',
  'Tienda de materiales o showroom',
  'Distribución o mayorista',
  'Tienda online',
  'Emprendedor o nuevo proyecto',
  'Otro',
];

/** Badge colours: text on sky and blue is white, on mint it is ink (client rule). */
export const toneStyle = (t: Tone) =>
  t === 'mint' ? 'background:var(--c-mint);color:var(--c-ink)' : `background:var(--c-${t});color:var(--c-white)`;
