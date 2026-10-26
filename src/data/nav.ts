// Main site navigation (structure follows miradex.bg). Catalog URLs point to the future Spanish main site.
import { sectors, sectorHref } from './sectors';

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

/** Footer B2B map (strategy 9.2): every audience links to its own industry page. */
export const sectorLinks = sectors.map((s) => ({ label: s.name, href: sectorHref(s.id) }));
