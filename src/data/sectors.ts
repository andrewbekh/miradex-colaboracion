// Industry landings (strategy 5.2, 6 and 7): one page per audience, showing every format that fits it.
// Each page is assembled from the scenario landings: the business entries listed in `formats`
// (logic, gains, ways), the industry video, and economics, support, steps, projects and FAQ of the `primary` format.
// Ads for an audience lead straight here; the hub shows all of them in «Выберите свой бизнес».
import type { ScenarioId } from './scenarios';
import type { Feature } from './landings/types';
import { installerDrivers } from './landings/instalar';

export interface Sector {
  id: string;            // URL slug (Spanish, as the future site)
  name: string;          // audience, as in the strategy map
  short: string;         // card and bar label
  icon: string;
  title: string;         // hero: the business promise for this audience
  lead: string[];        // two short paragraphs, as on the format landings
  image: string;
  video: number;         // industry film (strategy 7)
  primary: ScenarioId;   // format whose economics, support, steps and FAQ the page uses
  formats: [ScenarioId, string][]; // relevant formats + business id on that landing (opens it via ?type=)
  form: string;          // business type preselected in the lead form
  /** «Почему MIRADEX выгоден вашему бизнесу»: own arguments; without them the page lists the gains of its formats */
  why?: Feature[];
  /** product cards adapted to this business (by card id): only the description changes, never the names or the facts (Nikita, 04.11.2026) */
  range?: Record<string, string>;
}

export const sectors: Sector[] = [
  {
    id: 'vallas', name: 'Компании по заборам и ограждениям', short: 'Заборы и ограждения', icon: 'fence',
    title: 'Премиальная линейка ограждений для ваших клиентов',
    lead: ['Расширьте ассортимент современными металлическими ограждениями европейского производства, предложите клиентам больше вариантов дизайна и увеличьте средний чек.', 'Партнёрские цены и изготовление по индивидуальным размерам: без собственного производства и склада готовой продукции.'],
    image: '/img/photos/romb-pro-house.jpg', video: 4, primary: 'vender',
    formats: [['vender', 'fences'], ['instalar', 'fences']], form: 'Заборы и ограждения',
  },
  {
    id: 'instaladores', name: 'Монтажные компании и установщики', short: 'Монтаж и бригады', icon: 'wrench',
    title: 'Зарабатывайте на продаже и монтаже MIRADEX',
    lead: ['Зарабатывайте на продаже продукции и её монтаже. Получайте дополнительные местные заказы от MIRADEX и загружайте свою бригаду новыми объектами.', 'Партнёрские цены, обучение монтажу и техническая поддержка на первых объектах.'],
    image: '/img/photos/installer-drill.jpg', video: 3, primary: 'instalar',
    formats: [['instalar', 'installers'], ['recomendar', 'installers']], form: 'Монтаж и установка', why: installerDrivers,
  },
  {
    id: 'puertas', name: 'Компании по воротам и автоматике', short: 'Ворота и автоматика', icon: 'door-open',
    title: 'Продавайте клиенту весь периметр, а не только ворота',
    lead: ['Предлагайте клиентам не только ворота, но и современные металлические ограждения в едином стиле.', 'Увеличивайте стоимость заказа и зарабатывайте на комплексном обустройстве территории, без поиска новых клиентов.'],
    image: '/img/photos/gate-wood.jpg', video: 5, primary: 'vender',
    formats: [['vender', 'gates'], ['instalar', 'gates'], ['recomendar', 'related']], form: 'Ворота и автоматика',
    range: { vallas: 'Жалюзи, ромб, ранчо и штакетник для продажи в едином стиле с воротами. Более 10 моделей, индивидуальные размеры и свыше 25 цветовых решений.' },
  },
  {
    id: 'ventanas-pergolas-fachadas', name: 'Окна, перголы, фасады и outdoor', short: 'Окна, перголы, фасады', icon: 'layers',
    title: 'Ограждение для клиентов, которые у вас уже есть',
    lead: ['Предлагайте существующим клиентам комплексные решения для обустройства дома и территории: ограждения, фасадные системы и декоративную металлическую облицовку.', 'Дополнительные продажи без необходимости искать новых клиентов.'],
    image: '/img/photos/jupiter-facade-house.jpg', video: 5, primary: 'vender',
    formats: [['vender', 'windows'], ['instalar', 'outdoor'], ['recomendar', 'related']], form: 'Окна, перголы, фасады, outdoor',
    range: { revestimientos: 'Фасадный сайдинг Saturn, Jupiter и Venus и декоративные металлические рейки SENA для фасадов, стен и потолков: логичное дополнение к вашим проектам.' },
  },
  {
    id: 'metalisteria', name: 'Металлообрабатывающие компании', short: 'Металлообработка', icon: 'hammer',
    title: 'Меньше ручного производства, больше объектов',
    lead: ['Используйте готовые металлические ограждения MIRADEX вместо трудоёмкого самостоятельного изготовления.', 'Производство по индивидуальным размерам без расширения собственных мощностей: зарабатывайте на продаже и монтаже.'],
    image: '/img/photos/coil-worker.jpg', video: 3, primary: 'instalar',
    formats: [['instalar', 'metal'], ['vender', 'metal']], form: 'Металлообработка', why: installerDrivers,
  },
  {
    id: 'constructoras', name: 'Строительные компании и подрядчики', short: 'Строительство и подряд', icon: 'hard-hat',
    title: 'Цена, сроки и объём для ваших объектов',
    lead: ['Закупайте ограждения, ворота и фасадные решения для своих объектов на индивидуальных условиях.', 'Специальная цена с учётом объёма, производство по размерам проекта и техническая поддержка на каждом этапе.'],
    image: '/img/photos/atlas-villas.jpg', video: 6, primary: 'proyectos',
    formats: [['proyectos', 'builders'], ['instalar', 'contractors']], form: 'Строительная компания или подрядчик',
  },
  {
    id: 'promotoras', name: 'Девелоперы и крупные жилые проекты', short: 'Девелопмент', icon: 'building',
    title: 'Единая архитектура и поставки по очередям',
    lead: ['Используйте одну модель и один цвет ограждений на десятках и сотнях домов.', 'Производство и поставки по очередям в соответствии с графиком строительства.'],
    image: '/img/photos/atlas-modern-house.jpg', video: 7, primary: 'proyectos',
    formats: [['proyectos', 'developers']], form: 'Девелопер или крупные проекты',
  },
  {
    id: 'arquitectos', name: 'Архитекторы, дизайнеры и проектировщики', short: 'Архитектура и дизайн', icon: 'pencil-ruler',
    title: 'Ограждение, ворота и фасад в одной концепции',
    lead: ['Используйте решения MIRADEX в своих проектах: геометрия, цвета и фактуры под концепцию объекта.', 'Получайте вознаграждение, когда заказчик покупает по вашей рекомендации.'],
    image: '/img/photos/simetrica-black-house.jpg', video: 8, primary: 'recomendar',
    formats: [['recomendar', 'architects']], form: 'Архитектура, дизайн, проектирование',
    range: { revestimientos: 'Фасадный сайдинг Saturn, Jupiter и Venus и декоративные металлические рейки SENA для фасадов, стен и потолков в единой концепции с ограждением.' },
  },
  {
    id: 'inmobiliarias', name: 'Риелторы и агентства недвижимости', short: 'Недвижимость', icon: 'key-round',
    title: 'Рекомендуйте MIRADEX после сделки',
    lead: ['После покупки дома клиенту часто нужны ограждение и благоустройство. Рекомендуйте MIRADEX своим клиентам.', 'Консультации, расчёты и сопровождение заказов мы берём на себя, а вы получаете вознаграждение за состоявшиеся продажи.'],
    image: '/img/photos/sigma-red-house.jpg', video: 9, primary: 'recomendar',
    formats: [['recomendar', 'realtors']], form: 'Недвижимость',
  },
  {
    id: 'paisajismo-piscinas', name: 'Ландшафт, бассейны и благоустройство', short: 'Ландшафт и бассейны', icon: 'trees',
    title: 'Ограждение в ваш проект или рекомендация клиенту',
    lead: ['Включайте ограждения MIRADEX в проекты садов, бассейнов и благоустройства и зарабатывайте на их продаже.', 'Или передавайте клиентов MIRADEX и получайте вознаграждение после состоявшейся продажи.'],
    image: '/img/photos/piramida-garden.jpg', video: 10, primary: 'vender',
    formats: [['vender', 'landscape'], ['instalar', 'landscape'], ['recomendar', 'landscape']], form: 'Ландшафт, бассейны, благоустройство',
    range: { vallas: 'Жалюзи, ромб, ранчо и штакетник для приватности сада и зоны отдыха. Более 10 моделей, индивидуальные размеры и свыше 25 цветовых решений.' },
  },
  {
    id: 'tiendas-showrooms', name: 'Строительные магазины и шоурумы', short: 'Магазины и шоурумы', icon: 'store',
    title: 'Стенд MIRADEX в вашем магазине',
    lead: ['Выберите удобную модель сотрудничества: самостоятельные продажи через своих сотрудников или стенд с QR-кодом.', 'Дополнительный доход от существующего потока покупателей, без необходимости содержать склад готовой продукции.'],
    image: '/img/photos/terra-wood.jpg', video: 12, primary: 'vender',
    formats: [['vender', 'stores'], ['recomendar', 'stores']], form: 'Строительный магазин или шоурум',
  },
  {
    id: 'distribuidores', name: 'Дистрибьюторы и оптовые компании', short: 'Дистрибуция и опт', icon: 'warehouse',
    title: 'Новая товарная категория и объёмные закупки',
    lead: ['Расширяйте ассортимент современных металлических ограждений и увеличивайте продажи через существующую клиентскую и дилерскую сеть.', 'Индивидуальные партнёрские цены с учётом объёмов и производство под заказ без складских запасов.'],
    image: '/img/photos/factory-coils.jpg', video: 4, primary: 'vender',
    formats: [['vender', 'distributors'], ['negocio', 'dealers']], form: 'Дистрибьютор или опт',
  },
  {
    id: 'tiendas-online', name: 'Интернет-магазины и онлайн-дистрибьюторы', short: 'Интернет-магазины', icon: 'globe',
    title: 'Металлические ограждения в вашем онлайн-каталоге',
    lead: ['Расширяйте ассортимент своего интернет-магазина современными металлическими ограждениями MIRADEX.', 'Продавайте по всей Испании, а производство под размеры клиента и доставку MIRADEX берёт на себя.'],
    image: '/img/photos/atlas-wood-house.jpg', video: 4, primary: 'vender',
    formats: [['vender', 'online']], form: 'Интернет-магазин',
  },
];

export const sectorHref = (id: string) => `/colaboracion/para/${id}`;

const order: ScenarioId[] = ['vender', 'instalar', 'proyectos', 'recomendar', 'negocio'];

/** «Какой у вас бизнес?» on the hub: the industry pages + three audiences served by a format page directly.
 *  name = short label on the card (one line), title = full audience name (tooltip and screen readers). */
export const businessCards = [
  ...sectors.map((s) => ({ icon: s.icon, name: s.short, title: s.name, href: sectorHref(s.id), formats: order.filter((id) => s.formats.some(([f]) => f === id)) })),
  { icon: 'hotel', name: 'Отели и объекты', title: 'Отели и коммерческие объекты', href: '/colaboracion/proyectos?type=hotels', formats: ['proyectos'] as ScenarioId[] },
  { icon: 'rocket', name: 'Новый бизнес', title: 'Предприниматели и новый бизнес', href: '/colaboracion/negocio-miradex', formats: ['negocio'] as ScenarioId[] },
  { icon: 'handshake', name: 'Другой бизнес', title: 'Другой бизнес: рекомендуйте клиентов', href: '/colaboracion/recomendar', formats: ['recomendar'] as ScenarioId[] },
];
