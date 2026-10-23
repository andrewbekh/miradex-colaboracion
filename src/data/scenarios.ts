// Five cooperation scenarios (strategy, section 3). Order matches the strategy and the header dropdown.

export type ScenarioId = 'vender' | 'instalar' | 'proyectos' | 'recomendar' | 'negocio';

export type Tone = 'mint' | 'sky' | 'blue';

export interface Scenario {
  id: ScenarioId;
  num: string;
  tone: Tone;         // badge colour, same everywhere: 1 mint, 2 sky, 3 blue, 4 mint, 5 sky
  title: string;      // "Хочу..." as in the strategy
  short: string;      // nav / select label
  promise: string;    // one-line business promise
  audience: string[]; // short "для кого" tags
  href: string;
  image: string;      // banner photo on the hub (provisional, miradex.bg)
}

export const scenarios: Scenario[] = [
  {
    id: 'vender', tone: 'mint', num: '01',
    title: 'Хочу продавать MIRADEX',
    short: 'Продавать MIRADEX',
    promise: 'Партнёрская цена и маржа с каждой продажи без собственного производства.',
    audience: ['Заборы и ограждения', 'Ворота и автоматика', 'Магазины и дистрибьюторы'],
    href: '/colaboracion/vender',
    image: '/img/photos/romb-pro-house.jpg',
  },
  {
    id: 'instalar', tone: 'sky', num: '02',
    title: 'Хочу продавать и устанавливать',
    short: 'Продавать и устанавливать',
    promise: 'Зарабатывайте на продукции и на монтаже, получайте местные заказы.',
    audience: ['Монтажники', 'Металлообработка', 'Подрядчики'],
    href: '/colaboracion/vender-e-instalar',
    image: '/img/photos/atlas-wood-street.jpg',
  },
  {
    id: 'proyectos', tone: 'blue', num: '03',
    title: 'Хочу покупать для проектов',
    short: 'Покупать для проектов',
    promise: 'Специальные условия для строительства, девелопмента и крупных объёмов.',
    audience: ['Строительные компании', 'Девелоперы', 'Коммерческие объекты'],
    href: '/colaboracion/proyectos',
    image: '/img/photos/atlas-villas.jpg',
  },
  {
    id: 'recomendar', tone: 'mint', num: '04',
    title: 'Хочу рекомендовать клиентов',
    short: 'Рекомендовать клиентов',
    promise: 'Рекомендуйте MIRADEX и получайте вознаграждение после каждой продажи.',
    audience: ['Архитекторы', 'Риелторы', 'Ландшафт и бассейны'],
    href: '/colaboracion/recomendar',
    image: '/img/photos/simetrica-black-house.jpg',
  },
  {
    id: 'negocio', tone: 'sky', num: '05',
    title: 'Хочу делать бизнес MIRADEX',
    short: 'Бизнес MIRADEX',
    promise: 'Постройте собственный бизнес на продукции и модели MIRADEX.',
    audience: ['Предприниматели', 'Новый бизнес-юнит', 'Сильные дилеры'],
    href: '/colaboracion/negocio-miradex',
    image: '/img/photos/atlas-modern-house.jpg',
  },
];

export const scenarioById = (id?: string) => scenarios.find((s) => s.id === id);

/** Business types for the lead form (strategy 7 and 9.2 audiences, CRM "тип бизнеса"). */
export const businessTypes = [
  'Заборы и ограждения',
  'Монтаж и установка',
  'Ворота и автоматика',
  'Окна, перголы, фасады, outdoor',
  'Металлообработка',
  'Строительная компания или подрядчик',
  'Девелопер или крупные проекты',
  'Отели и коммерческие объекты',
  'Корпоративный заказчик',
  'Архитектура, дизайн, проектирование',
  'Недвижимость',
  'Ландшафт, бассейны, благоустройство',
  'Строительный магазин или шоурум',
  'Дистрибьютор или опт',
  'Интернет-магазин',
  'Предприниматель или новый проект',
  'Другое',
];

/** Badge colours: text on sky and blue is white, on mint it is ink (client rule). */
export const toneStyle = (t: Tone) =>
  t === 'mint' ? 'background:var(--c-mint);color:var(--c-ink)' : `background:var(--c-${t});color:var(--c-white)`;
