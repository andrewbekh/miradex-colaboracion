// Content shared by the hub and landings. Facts come from the strategy (6.1), miradex.partners and video scripts.

/** Advantages grid (miradex.partners, original Russian copy). */
export const advantages = [
  { icon: 'ruler', title: 'Индивидуализация', text: 'Размеры под объект, палитра RAL, разные фактуры.' },
  { icon: 'globe', title: 'Опыт в ЕС', text: 'Работаем в странах ЕС на Балканах, теперь и в Испании.' },
  { icon: 'badge-check', title: 'Результаты', text: 'Более 1000 реализованных проектов в странах ЕС.' },
  { icon: 'hourglass', title: 'Долговечность', text: 'Без перекраски, лакировки и биозащиты: служит десятилетиями.' },
  { icon: 'layers', title: 'Материалы', text: 'Премиальная сталь KG Dongbu Steel (Южная Корея), соответствует европейским стандартам.' },
  { icon: 'factory', title: 'Производство в ЕС', text: 'Европейский завод TOP PROFIL SISTEM: полный цикл и автоматизация, стабильное качество.' },
];

/** Product facts (strategy 6.1). */
export const productStats = [
  { value: '10+', label: 'моделей ограждений' },
  { value: '25+', label: 'цветов и покрытий' },
  { value: 'до 30 лет', label: 'техническая гарантия*' },
  { value: 'до 15 лет', label: 'эстетическая гарантия*' },
];
export const statsFootnote = '* В зависимости от выбранного покрытия.';

/** The open national model (strategy 1 and 10): hub, dealer landings and industry pages. */
export const modelPillars = [
  { icon: 'map', kicker: 'Продажи', title: 'Национальные', text: 'Партнёр может находиться в любой точке Испании и продавать MIRADEX по всей стране. MIRADEX тоже ведёт национальные продажи.' },
  { icon: 'map-pin', kicker: 'Монтаж', title: 'Локальный', text: 'Монтаж и сервис организуются на месте через сеть проверенных монтажных партнёров.' },
  { icon: 'network', kicker: 'Партнёрская сеть', title: 'Открытая', text: 'Клиенты не закрепляются за партнёрами: каждый развивает и удерживает свою клиентскую базу. Для отдельных крупных проектов возможны письменные договорённости.' },
];

/** FAQ entries repeated on several pages. */
export const faq = {
  territory: { q: 'Даёте ли вы территориальный эксклюзив?', a: '<p>Нет. Продажи национальные: продавать MIRADEX можно по всей Испании, MIRADEX тоже продаёт напрямую по всей стране, а монтаж организуется локально. Каждый партнёр сам формирует и удерживает свою клиентскую базу.</p>' },
  network: { q: 'Закрепляются ли клиенты за партнёром?', a: '<p>Нет. MIRADEX работает как открытая партнёрская сеть: стандартные клиенты не регистрируются и не закрепляются за партнёрами, клиент сам выбирает, у кого покупать. Партнёр удерживает клиента качеством работы: консультацией, скоростью ответа, расчётами, замером, монтажом и сервисом. Для отдельных крупных проектов возможны индивидуальные письменные договорённости.</p>' },
  fairPlay: { q: 'Не уведёт ли MIRADEX моего клиента?', a: '<p>MIRADEX не использует коммерческую информацию, которую вы передаёте, чтобы перехватить сделку, и ждёт такого же подхода от партнёров. Явные случаи использования конфиденциальной информации другого партнёра рассматриваются отдельно.</p>' },
  leadTimes: { q: 'Какие сроки производства и доставки?', a: '<p>Производство под размеры за 3-5 рабочих дней, доставка по Испании за 5-10 рабочих дней: не больше 15 рабочих дней от заказа.</p>' },
  warranty: { q: 'Какая гарантия на продукцию?', a: '<p>В зависимости от покрытия: до 30 лет технической гарантии и до 15 лет эстетической.</p>' },
  stock: { q: 'Нужен ли склад?', a: '<p>Нет. Продукция изготавливается под размеры каждого проекта, поэтому держать запас размеров и цветов не нужно.</p>' },
};

export const finalPoints = ['Ответим в течение 24 часов', 'Без обязательств', 'Данные конфиденциальны', 'Продажи по всей Испании, без территориальных ограничений'];

/** Realized projects: the gallery block of miradex.bg (big photo, «model | colour», thumbnails), without category tabs
 *  and without links. Photos are from miradex.bg until the Spanish selection is ready (docs/TODO.md). */
export const projectGallery = [
  { src: '/img/photos/romb-pro-house.jpg', model: 'Romb Pro', color: 'Антрацит RAL 7016' },
  { src: '/img/photos/atlas-villas.jpg', model: 'Atlas', color: 'Графит RAL 7024' },
  { src: '/img/photos/sigma-red-house.jpg', model: 'Sigma', color: 'Оксидно-красный RAL 3009' },
  { src: '/img/photos/tisa-wood-stone.jpg', model: 'Tisa', color: 'Тёмный орех' },
  { src: '/img/photos/jupiter-facade-house.jpg', model: 'Фасад Jupiter', color: 'Графит RAL 7024' },
  { src: '/img/photos/gate-wood.jpg', model: 'Ворота Romb Grande', color: 'Орех' },
  { src: '/img/photos/atlas-mountain.jpg', model: 'Atlas', color: 'Антрацит RAL 7016' },
  { src: '/img/photos/terra-wood.jpg', model: 'Terra', color: 'Золотой дуб' },
  { src: '/img/photos/simetrica-black.jpg', model: 'Simetrica', color: 'Чёрный RAL 9005' },
  { src: '/img/photos/piramida-garden.jpg', model: 'Piramida', color: 'Графит RAL 7024' },
  { src: '/img/photos/atlas-wood-house.jpg', model: 'Atlas', color: 'Тёмный орех' },
  { src: '/img/photos/romb-mini-street.jpg', model: 'Romb Mini', color: 'Антрацит RAL 7016' },
  { src: '/img/photos/jupiter-facade-black.jpg', model: 'Фасад Jupiter', color: 'Чёрный RAL 9005' },
  { src: '/img/photos/simetrica-slats.jpg', model: 'Simetrica', color: 'Графит RAL 7024' },
  { src: '/img/photos/siding-wood.jpg', model: 'Сайдинг', color: 'Золотой дуб' },
  { src: '/img/photos/gate-wood-2.jpg', model: 'Ворота Romb Grande', color: 'Орех' },
];

/** «Образцы и стенды» strip in support (placeholders until the photos are chosen: src undefined = grey placeholder). */
export const samplePhotos: { title: string; src?: string }[] = [
  { title: 'Образцы всех покрытий' },
  { title: 'Демонстрационные стенды' },
  { title: 'Стенд MIRADEX на выставке' },
];
