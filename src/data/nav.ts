// Main site navigation (structure follows miradex.bg). Catalog URLs point to the future Spanish main site.

export const mainNav = [
  { label: 'Каталог', href: '#', hasMenu: true },
  { label: 'Галерея', href: '#' },
  { label: 'Калькулятор', href: '#' },
  { label: 'Полезная информация', href: '#', hasMenu: true },
  { label: 'О нас', href: '#', hasMenu: true },
];

/** Product directions (miradex.bg: Метални огради, Метални облицовки, Системи за огради). */
export const productLines = [
  {
    id: 'vallas',
    title: 'Металлические заборы',
    text: 'Жалюзи, ромб, ранчо и штакетник: Atlas, Sigma, Piramida, Gamma, Romb, Terra, Tisa, Simetrica.',
    img: '/img/photos/atlas-wood-house.jpg',
  },
  {
    id: 'revestimientos',
    title: 'Металлическая облицовка',
    text: 'Фасадный сайдинг Saturn, Jupiter и Venus в тех же цветах, что и забор.',
    img: '/img/photos/jupiter-facade-house.jpg',
  },
  {
    id: 'sistemas',
    title: 'Системы для заборов',
    text: 'Бетонные блоки, столбы и конструкции для готового ограждения.',
    img: '/img/photos/atlas-wood-street.jpg',
  },
];

/** Footer B2B map (strategy 9.2): every audience gets its own link. Sector pages are not built yet. */
export const sectorLinks = [
  'Компании по заборам и ограждениям',
  'Монтажные компании и установщики',
  'Компании по воротам и автоматике',
  'Окна, перголы, фасады и outdoor',
  'Металлообрабатывающие компании',
  'Строительные компании и подрядчики',
  'Девелоперы и крупные проекты',
  'Архитекторы, дизайнеры и проектировщики',
  'Риелторы и агентства недвижимости',
  'Ландшафт, бассейны и благоустройство',
  'Строительные магазины и шоурумы',
  'Дистрибьюторы и оптовые компании',
  'Интернет-магазины и онлайн-дистрибьюторы',
].map((label) => ({ label, href: '#' }));
