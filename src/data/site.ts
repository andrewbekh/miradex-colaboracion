// Global settings for the Spanish site. Placeholders are listed in docs/TODO.md.

export const site = {
  lang: 'es',
  /** Draft for client review: every page is noindex and robots.txt blocks crawlers. Set to false at launch. */
  draft: true,
  /** Header item label. Client decides: 'Colaboración' | 'Profesionales' | 'Para empresas' */
  navLabel: 'Colaboración',
  hubPath: '/colaboracion',
  contacts: {
    phone: '+34 900 000 000',            // placeholder: teléfono España
    whatsapp: null as string | null,     // placeholder: número WhatsApp (34XXXXXXXXX); without it the button links to #whatsapp
    email: 'hello@miradex.com',          // from miradex.partners; confirm the Spanish B2B address
  },
  /** Where the lead form posts. null = demo mode (validates, shows success, logs payload). */
  formEndpoint: null as string | null,   // TODO: CRM / endpoint
  privacyUrl: '#', // TODO: política de privacidad
  responsePromise: 'Le respondemos en 24 horas. Sus datos son confidenciales.',
};

export const whatsappHref = (text = 'Hola, me interesa colaborar con MIRADEX') =>
  site.contacts.whatsapp ? `https://wa.me/${site.contacts.whatsapp}?text=${encodeURIComponent(text)}` : '#whatsapp';
