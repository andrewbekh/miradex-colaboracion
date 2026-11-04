// Content model of a scenario landing. One template (src/components/LandingPage.astro) renders every landing;
// a page is defined only by its content file, so blocks, business types and videos are added by data.
import type { ScenarioId } from '../scenarios';

export interface Feature { icon: string; title: string; text: string }

/** How this business can work with MIRADEX. `to` links to another landing when the way belongs to it. */
export interface BusinessWay {
  title: string;
  text: string;
  /** further paragraphs and the bold one-line summary, for ways that explain a mechanism (stores) */
  more?: string[];
  strong?: string;
  to?: ScenarioId;
  /** business id on the target landing, when it differs from this one (the link opens that panel) */
  toType?: string;
  /** link text when the format's short name does not fit */
  linkLabel?: string;
}

/** A business type the visitor should recognise themselves in (strategy 3.x "Подходит для", section 7). */
export interface Business {
  id: string;
  icon: string;
  name: string;
  /** main logic for this business (strategy section 7) */
  logic: string;
  /** advantages for this business */
  gains: string[];
  ways: BusinessWay[];
  /** film that speaks to this business (catalog in src/data/videos.ts) */
  video?: number;
  /** what this film gives this business; without it the panel shows the film title */
  videoCaption?: string;
  /** long ways: gains on top, the ways as two cards side by side */
  waysWide?: boolean;
  /** value preselected in the lead form (one of businessTypes in src/data/scenarios.ts) */
  formType: string;
}

/** A film shown on the page with its audience and description. `points` are no longer shown (Nikita, 04.11.2026). */
export interface VideoRow { num: number; audience: string; lead: string; points?: string[] }

export type BlockKey =
  | 'hero' | 'businesses' | 'drivers' | 'videos' | 'why' | 'economics' | 'support'
  | 'resp' | 'product' | 'steps' | 'projects' | 'other' | 'faq' | 'final';

/** One story per page, by Nikita's structure of «Продавать»: interest → possibilities for this business → the economics →
 *  product advantages → support → how to start → projects → objections → form.
 *  'drivers', 'resp', 'why' and 'other' are switched on per landing with `order`. */
export const defaultOrder: BlockKey[] = [
  'hero', 'businesses', 'videos', 'economics', 'product', 'support', 'steps', 'projects', 'faq', 'final',
];

export interface Landing {
  id: ScenarioId;
  meta: { title: string; description: string };
  order?: BlockKey[];
  /** one label for every main button of the page: first screen, business panel, economics, final form, page bar */
  cta?: string;
  ctaShort?: string;
  /** eyebrow: audience line, kept for meta and the Spanish version, not shown on the page (client feedback) */
  hero: { eyebrow: string; title: string; lead: string | string[]; quickTitle?: string; quickText?: string; quickDone?: string; image: string; imageAlt: string; note: string; cta?: string };
  /** hint: one line under the panel instead of the per-business «Для заявки пригодится» */
  businesses: { title: string; lead: string; hint?: string; items: Business[] };
  drivers?: { title: string; lead: string; items: Feature[] };
  videos: { title: string; lead: string; items: VideoRow[] };
  why?: { title?: string; text?: string };
  economics: {
    title: string; lead: string; sources: { title: string; text: string }[]; factors?: string[];
    sourcesLabel?: string; factorsLabel?: string; factorsIntro?: string; principle: string; model: { title: string; text: string; cta?: string };
  };
  support: { title: string; lead: string; groups: { icon: string; title: string; items: string[] }[] };
  resp?: { title: string; lead: string; miradex: string[]; partner: string[]; partnerTitle?: string; note?: string };
  product: { title: string; lead: string };
  steps: { title?: string; lead?: string; items: { title: string; text: string }[] };
  projects: {
    title: string; lead: string; items?: Feature[]; cols?: 2 | 3 | 4;
    gallery: { src: string; caption: string }[];
    reference?: { eyebrow: string; title: string; text: string; stats: { value: string; label: string }[]; link: { label: string; href: string } };
  };
  other?: { title: string; lead: string };
  faq: { q: string; a: string }[];
  final: { title: string; text: string; pointsTitle?: string; points?: string[] };
}
