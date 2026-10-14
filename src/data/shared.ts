// Content shared by the hub and landings. Facts come from the strategy (6.1), miradex.partners and video scripts.

/** Reference advantages grid (miradex.partners). */
export const advantages = [
  { icon: 'ruler', title: 'Individualización', text: 'Medidas para cada obra, paleta RAL y diferentes texturas.' },
  { icon: 'globe', title: 'Escalabilidad', text: 'Trabajamos en los países balcánicos de la UE y ahora crecemos en España.' },
  { icon: 'badge-check', title: 'Resultados', text: 'Más de 1000 proyectos realizados en países de la UE.' },
  { icon: 'hourglass', title: 'Durabilidad', text: 'Sin repintar, barnizar ni tratar: dura décadas.' },
  { icon: 'layers', title: 'Materiales', text: 'Acero premium KG Dongbu Steel (Corea del Sur), conforme a normas europeas.' },
  { icon: 'factory', title: 'Producción en la UE', text: 'Fábrica en Rumanía, ciclo completo y automatización: calidad estable.' },
];

/** Product facts (strategy 6.1). */
export const productStats = [
  { value: '10+', label: 'modelos de vallas' },
  { value: '25+', label: 'colores y acabados' },
  { value: '30 años', label: 'garantía técnica máxima*' },
  { value: '15 años', label: 'garantía estética máxima*' },
  { value: '3-5 días', label: 'de producción (laborables)' },
  { value: '5-10 días', label: 'de entrega en España (laborables)' },
];
export const statsFootnote = '* Según el acabado elegido.';

/** FAQ entries repeated on several pages. */
export const faq = {
  territory: { q: '¿Ofrecen exclusividad territorial?', a: '<p>No. Puede vender MIRADEX en toda España. En lugar de un territorio, protegemos los clientes y proyectos que usted registra.</p>' },
  protection: { q: '¿Cómo se protegen mis clientes y proyectos?', a: '<p>Los clientes y proyectos que usted registra quedan protegidos frente a la venta directa. Antes de empezar le explicamos las reglas de registro y protección.</p>' },
  leadTimes: { q: '¿Cuáles son los plazos de producción y entrega?', a: '<p>Producción a medida en 3-5 días laborables y entrega en España en 5-10 días laborables: como máximo 15 días laborables desde el pedido.</p>' },
  warranty: { q: '¿Qué garantía tiene el producto?', a: '<p>Según el acabado elegido, hasta 30 años de garantía técnica y hasta 15 años de garantía estética.</p>' },
  stock: { q: '¿Necesito tener stock?', a: '<p>No. Los productos se fabrican a medida para cada proyecto, así que no necesita un gran stock de medidas y colores.</p>' },
};

export const finalPoints = ['Le respondemos en 24 horas', 'Sus datos son confidenciales', 'Sin exclusividad territorial: protegemos a su cliente'];
