// The 12 B2B films (scripts: docs/Miradex_Spain_b2b.docx, strategy section 7). Titles and lengths from the scripts.

export interface Video { num: number; title: string; duration: string; poster: string }

const v = (num: number, title: string, duration: string, poster: string): Video => ({ num, title, duration, poster: `/img/photos/${poster}.jpg` });

export const videos: Record<number, Video> = {
  1: v(1, 'MIRADEX для бизнеса: возможности сотрудничества', '3:10-3:30', 'atlas-mountain'),
  2: v(2, 'Постройте свой бизнес с MIRADEX', '3:00-3:20', 'atlas-villas'),
  3: v(3, 'Строительные и монтажные компании: больше возможностей заработать', '2:50-3:10', 'tisa-wood-stone'),
  4: v(4, 'Добавьте MIRADEX в свой ассортимент', '3:00-3:15', 'sigma-red-house'),
  5: v(5, 'Зарабатывайте больше с существующих клиентов', '2:50-3:05', 'gate-wood'),
  6: v(6, 'MIRADEX для строительных компаний и застройщиков', '3:00-3:15', 'romb-pro-house'),
  7: v(7, 'MIRADEX для девелоперов и жилой застройки', '3:00-3:20', 'atlas-mountain'),
  8: v(8, 'MIRADEX для архитекторов, дизайнеров и проектировщиков', '3:00-3:15', 'jupiter-facade-black'),
  9: v(9, 'MIRADEX для риелторов и агентств недвижимости', '2:30-2:50', 'simetrica-black-house'),
  10: v(10, 'MIRADEX для ландшафта, бассейнов и благоустройства', '2:40-3:00', 'piramida-garden'),
  11: v(11, 'Реферальная программа MIRADEX', '2:30-2:50', 'atlas-wood-house'),
  12: v(12, 'Демонстрационный стенд MIRADEX', '2:45-3:00', 'texture-wood'),
};
