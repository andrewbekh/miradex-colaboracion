// Main site navigation (structure follows miradex.bg). Catalog URLs point to the future Spanish main site.
import { sectors, sectorHref } from './sectors';

export const mainNav = [
  { label: 'Каталог', href: '#', hasMenu: true },
  { label: 'Галерея', href: '#' },
  { label: 'Калькулятор', href: '#' },
  { label: 'Полезная информация', href: '#', hasMenu: true },
  { label: 'О нас', href: '#', hasMenu: true },
];

/** Product directions: one approved text for all pages (Nikita, 04.11.2026). Industry pages may adapt `text`, never the names or facts.
 *  `images`: two photos side by side, because the cladding card shows two groups of materials; no src = grey placeholder.
 *  The gate photo and the SENA photo (from Nikita's document) are provisional, see docs/TODO.md. */
export const productLines: { id: string; title: string; text: string; images: { src?: string; alt: string; label?: string; labelMore?: string }[] }[] = [
  {
    id: 'vallas',
    title: 'Металлические ограждения',
    text: 'Жалюзи, ромб, ранчо и штакетник. Более 10 моделей, индивидуальные размеры и свыше 25 цветовых решений.',
    images: [{ src: '/img/photos/atlas-wood-house.jpg', alt: 'Металлическое ограждение Atlas у частного дома' }],
  },
  {
    id: 'revestimientos',
    title: 'Металлическая облицовка',
    text: 'Фасадный сайдинг Saturn, Jupiter и Venus, а также декоративные металлические рейки SENA для фасадов, стен и потолков.',
    images: [
      { src: '/img/photos/siding-grey-building.jpg', alt: 'Фасад здания с металлическим сайдингом', label: 'Фасад', labelMore: ': Saturn, Jupiter, Venus' },
      { src: '/img/photos/sena-interior.jpg', alt: 'Интерьер с декоративными рейками SENA', label: 'Интерьер', labelMore: ': рейки SENA' },
    ],
  },
  {
    id: 'sistemas',
    title: 'Системы для ограждений',
    text: 'Столбы, крепёжные элементы, ворота, калитки и сопутствующие конструкции для оформления объекта в едином архитектурном стиле.',
    images: [{ src: '/img/photos/terra-max-gate.jpg', alt: 'Ограждение и ворота Terra Max' }],
  },
];

/** Footer B2B map (strategy 9.2): every audience links to its own industry page. */
export const sectorLinks = sectors.map((s) => ({ label: s.name, href: sectorHref(s.id) }));
