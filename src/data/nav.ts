// Main site navigation (structure follows miradex.bg; Spanish labels are drafts).
// Catalog URLs point to the future Spanish main site.

export const mainNav = [
  { label: 'Catálogo', href: '#', hasMenu: true },   // TODO: URLs del sitio principal ES
  { label: 'Muestras', href: '#' },
  { label: 'Galería', href: '#' },
  { label: 'Calculadora', href: '#' },
  { label: 'Información útil', href: '#', hasMenu: true },
  { label: 'Sobre nosotros', href: '#', hasMenu: true },
];

/** Product directions (miradex.bg: Метални огради, Метални облицовки, Системи за огради). */
export const productLines = [
  {
    id: 'vallas',
    title: 'Vallas metálicas',
    text: 'Lamas, rombo, rancho y listones: Atlas, Sigma, Piramida, Gamma, Romb, Terra, Tisa, Simetrica.',
    img: '/img/photos/atlas-wood-house.jpg',
  },
  {
    id: 'revestimientos',
    title: 'Revestimientos metálicos',
    text: 'Revestimiento de fachada Saturn, Jupiter y Venus, en los mismos colores que la valla.',
    img: '/img/photos/jupiter-facade-house.jpg',
  },
  {
    id: 'sistemas',
    title: 'Sistemas de vallado',
    text: 'Bloques de hormigón, columnas y estructuras para un cerramiento completo.',
    img: '/img/photos/atlas-wood-street.jpg',
  },
];

/** Footer B2B map (strategy 9.2): every audience gets its own link. Sector pages are not built yet. */
export const sectorLinks = [
  'Empresas de vallas y cerramientos',
  'Empresas de instalación e instaladores',
  'Puertas y automatismos',
  'Ventanas, pérgolas, fachadas y outdoor',
  'Metalistería y carpintería metálica',
  'Constructoras y contratistas',
  'Promotoras y grandes proyectos',
  'Arquitectos, diseñadores e ingenieros',
  'Inmobiliarias y agentes',
  'Paisajismo, piscinas y exteriores',
  'Almacenes de materiales y showrooms',
  'Distribuidores y mayoristas',
  'Tiendas online y distribución digital',
].map((label) => ({ label, href: '#' })); // TODO: páginas sectoriales
