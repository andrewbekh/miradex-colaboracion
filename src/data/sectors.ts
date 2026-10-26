// Industry landings (strategy 5.2, 6 and 7): one page per audience, showing every format that fits it.
// Each page is assembled from the scenario landings: the business entries listed in `formats`
// (logic, gains, ways), the industry video, and economics, support, steps, projects and FAQ of the `primary` format.
// Ads for an audience lead straight here; the hub shows all of them in «Выберите свой бизнес».
import type { ScenarioId } from './scenarios';

export interface Sector {
  id: string;            // URL slug (Spanish, as the future site)
  name: string;          // audience, as in the strategy map
  short: string;         // card and bar label
  icon: string;
  title: string;         // hero: the business promise for this audience
  lead: string;
  image: string;
  video: number;         // industry film (strategy 7)
  primary: ScenarioId;   // format whose economics, support, steps and FAQ the page uses
  formats: [ScenarioId, string][]; // relevant formats + business id on that landing (opens it via ?type=)
  form: string;          // business type preselected in the lead form
}

export const sectors: Sector[] = [
  {
    id: 'vallas', name: 'Компании по заборам и ограждениям', short: 'Заборы и ограждения', icon: 'fence',
    title: 'Премиальная линейка ограждений для ваших клиентов',
    lead: 'Добавьте MIRADEX к своему предложению: выше средний чек и маржа, производство под размер и никакого склада.',
    image: '/img/photos/romb-pro-house.jpg', video: 4, primary: 'vender',
    formats: [['vender', 'fences'], ['instalar', 'fences']], form: 'Заборы и ограждения',
  },
  {
    id: 'instaladores', name: 'Монтажные компании и установщики', short: 'Монтаж и бригады', icon: 'wrench',
    title: 'Зарабатывайте на продаже и монтаже MIRADEX',
    lead: 'Продукт, система монтажа и местные заказы от MIRADEX в вашей зоне.',
    image: '/img/photos/atlas-wood-street.jpg', video: 3, primary: 'instalar',
    formats: [['instalar', 'installers'], ['recomendar', 'installers']], form: 'Монтаж и установка',
  },
  {
    id: 'puertas', name: 'Компании по воротам и автоматике', short: 'Ворота и автоматика', icon: 'door-open',
    title: 'Продавайте клиенту весь периметр, а не только ворота',
    lead: 'Ворота, ограждение и фасад в одной концепции: дополнительная продажа тому же клиенту без поиска новых.',
    image: '/img/photos/gate-wood.jpg', video: 5, primary: 'vender',
    formats: [['vender', 'gates'], ['instalar', 'gates'], ['recomendar', 'related']], form: 'Ворота и автоматика',
  },
  {
    id: 'ventanas-pergolas-fachadas', name: 'Окна, перголы, фасады и outdoor', short: 'Окна, перголы, фасады', icon: 'layers',
    title: 'Ограждение для клиентов, которые у вас уже есть',
    lead: 'Вы продаёте окна, перголы или фасады: ограждение MIRADEX логично дополняет ваш проект и средний чек.',
    image: '/img/photos/jupiter-facade-house.jpg', video: 5, primary: 'vender',
    formats: [['vender', 'windows'], ['instalar', 'outdoor'], ['recomendar', 'related']], form: 'Окна, перголы, фасады, outdoor',
  },
  {
    id: 'metalisteria', name: 'Металлообрабатывающие компании', short: 'Металлообработка', icon: 'hammer',
    title: 'Меньше ручного производства, больше объектов',
    lead: 'Готовая система ограждений под размер вместо изготовления на месте: вы зарабатываете на продаже и монтаже.',
    image: '/img/photos/simetrica-black.jpg', video: 3, primary: 'instalar',
    formats: [['instalar', 'metal'], ['vender', 'metal']], form: 'Металлообработка',
  },
  {
    id: 'constructoras', name: 'Строительные компании и подрядчики', short: 'Строительство и подряд', icon: 'hard-hat',
    title: 'Цена, сроки и объём для ваших объектов',
    lead: 'Ограждения, ворота и фасад для проектов: специальные условия по объёму, производство под размеры и проектная поддержка.',
    image: '/img/photos/atlas-villas.jpg', video: 6, primary: 'proyectos',
    formats: [['proyectos', 'builders'], ['instalar', 'contractors']], form: 'Строительная компания или подрядчик',
  },
  {
    id: 'promotoras', name: 'Девелоперы и крупные жилые проекты', short: 'Девелопмент', icon: 'building',
    title: 'Единая архитектура и поставки по очередям',
    lead: 'Одна модель и цвет на десятках и сотнях домов, производство и поставки под график стройки.',
    image: '/img/photos/atlas-modern-house.jpg', video: 7, primary: 'proyectos',
    formats: [['proyectos', 'developers']], form: 'Девелопер или крупные проекты',
  },
  {
    id: 'arquitectos', name: 'Архитекторы, дизайнеры и проектировщики', short: 'Архитектура и дизайн', icon: 'pencil-ruler',
    title: 'Ограждение, ворота и фасад в одной концепции',
    lead: 'Архитектурные решения MIRADEX для ваших проектов и вознаграждение, когда клиент покупает по вашей рекомендации.',
    image: '/img/photos/simetrica-black-house.jpg', video: 8, primary: 'recomendar',
    formats: [['recomendar', 'architects']], form: 'Архитектура, дизайн, проектирование',
  },
  {
    id: 'inmobiliarias', name: 'Риелторы и агентства недвижимости', short: 'Недвижимость', icon: 'key-round',
    title: 'Рекомендуйте MIRADEX после сделки',
    lead: 'Новым владельцам часто нужен забор. Передайте контакт: MIRADEX консультирует и продаёт, вы получаете вознаграждение.',
    image: '/img/photos/sigma-red-house.jpg', video: 9, primary: 'recomendar',
    formats: [['recomendar', 'realtors']], form: 'Недвижимость',
  },
  {
    id: 'paisajismo-piscinas', name: 'Ландшафт, бассейны и благоустройство', short: 'Ландшафт и бассейны', icon: 'trees',
    title: 'Ограждение в ваш проект или рекомендация клиенту',
    lead: 'Включайте MIRADEX в проект сада или бассейна с маржой или передавайте клиента и получайте вознаграждение.',
    image: '/img/photos/piramida-garden.jpg', video: 10, primary: 'vender',
    formats: [['vender', 'landscape'], ['instalar', 'landscape'], ['recomendar', 'landscape']], form: 'Ландшафт, бассейны, благоустройство',
  },
  {
    id: 'tiendas-showrooms', name: 'Строительные магазины и шоурумы', short: 'Магазины и шоурумы', icon: 'store',
    title: 'Стенд MIRADEX в вашем магазине',
    lead: 'Продаёте сами с дилерской маржой или клиент сканирует QR-код, а вознаграждение получаете вы.',
    image: '/img/photos/terra-wood.jpg', video: 12, primary: 'vender',
    formats: [['vender', 'stores'], ['recomendar', 'stores']], form: 'Строительный магазин или шоурум',
  },
  {
    id: 'distribuidores', name: 'Дистрибьюторы и оптовые компании', short: 'Дистрибуция и опт', icon: 'warehouse',
    title: 'Новая товарная категория и объёмные закупки',
    lead: 'Партнёрская цена по реальному объёму и продукция под размер без складских запасов.',
    image: '/img/photos/romb-mini-street.jpg', video: 4, primary: 'vender',
    formats: [['vender', 'distributors'], ['negocio', 'dealers']], form: 'Дистрибьютор или опт',
  },
  {
    id: 'tiendas-online', name: 'Интернет-магазины и онлайн-дистрибьюторы', short: 'Интернет-магазины', icon: 'globe',
    title: 'Металлические ограждения в вашем онлайн-каталоге',
    lead: 'Вы продаёте онлайн по всей Испании, MIRADEX производит под размер и доставляет клиенту.',
    image: '/img/photos/atlas-wood-house.jpg', video: 4, primary: 'vender',
    formats: [['vender', 'online']], form: 'Интернет-магазин',
  },
];

export const sectorHref = (id: string) => `/colaboracion/para/${id}`;

const order: ScenarioId[] = ['vender', 'instalar', 'proyectos', 'recomendar', 'negocio'];

/** «Выберите свой бизнес» on the hub: the industry pages + three audiences served by a format page directly. */
export const businessCards = [
  ...sectors.map((s) => ({ icon: s.icon, name: s.name, href: sectorHref(s.id), formats: order.filter((id) => s.formats.some(([f]) => f === id)) })),
  { icon: 'hotel', name: 'Отели и коммерческие объекты', href: '/colaboracion/proyectos?type=hotels', formats: ['proyectos'] as ScenarioId[] },
  { icon: 'rocket', name: 'Предприниматели и новый бизнес', href: '/colaboracion/negocio-miradex', formats: ['negocio'] as ScenarioId[] },
  { icon: 'handshake', name: 'Другой бизнес: рекомендуйте клиентов', href: '/colaboracion/recomendar', formats: ['recomendar'] as ScenarioId[] },
];
