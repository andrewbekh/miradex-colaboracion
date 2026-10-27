// Global settings. Placeholders are listed in docs/TODO.md.

export const site = {
  lang: 'ru',
  /** Draft for client review: every page is noindex and robots.txt blocks crawlers. Set to false at launch. */
  draft: true,
  /** Header item label. Client decides the final Spanish one: 'Colaboración' | 'Profesionales' | 'Para empresas' */
  navLabel: 'Сотрудничество',
  hubPath: '/colaboracion',
  contacts: {
    phone: '+34 900 000 000',            // placeholder: Spanish phone
    whatsapp: null as string | null,     // placeholder: WhatsApp number (34XXXXXXXXX); without it the button links to #whatsapp
    email: 'hello@miradex.com',          // from miradex.partners; confirm the Spanish B2B address
  },
  /** Where the lead form posts. null = demo mode (validates, shows success, logs payload). */
  formEndpoint: null as string | null,
  privacyUrl: '#',
  responsePromise: 'Ответим в течение 24 часов. Без обязательств, данные конфиденциальны.',
};

export const whatsappHref = (text = 'Здравствуйте, хочу обсудить сотрудничество с MIRADEX') =>
  site.contacts.whatsapp ? `https://wa.me/${site.contacts.whatsapp}?text=${encodeURIComponent(text)}` : '#whatsapp';
