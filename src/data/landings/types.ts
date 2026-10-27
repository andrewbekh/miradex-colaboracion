// Content model of a scenario landing. One template (src/components/LandingPage.astro) renders every landing;
// a page is defined only by its content file, so blocks, business types and videos are added by data.
import type { ScenarioId } from '../scenarios';

export interface Feature { icon: string; title: string; text: string }

/** How this business can work with MIRADEX. `to` links to another landing when the way belongs to it. */
export interface BusinessWay { title: string; text: string; to?: ScenarioId }

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
  /** value preselected in the lead form (one of businessTypes in src/data/scenarios.ts) */
  formType: string;
}

/** A film shown on the page next to its text; rows alternate sides. */
export interface VideoRow { num: number; audience: string; lead: string; points: string[] }

export interface Cta { title: string; text?: string; cta?: string }

export type BlockKey =
  | 'hero' | 'businesses' | 'drivers' | 'videos' | 'why' | 'ctaA' | 'ways' | 'economics' | 'model' | 'support'
  | 'resp' | 'ctaB' | 'product' | 'fit' | 'steps' | 'projects' | 'ctaC' | 'other' | 'faq' | 'final';

export const defaultOrder: BlockKey[] = [
  'hero', 'businesses', 'videos', 'why', 'ctaA', 'ways', 'economics', 'model', 'support', 'resp', 'ctaB',
  'product', 'fit', 'steps', 'projects', 'ctaC', 'other', 'faq', 'final',
];

export interface Landing {
  /** dealer formats explain the open national model (strategy 10, updated 20.10.2026) */
  openModel?: boolean;
  id: ScenarioId;
  meta: { title: string; description: string };
  order?: BlockKey[];
  /** eyebrow: audience line, kept for meta and the Spanish version, not shown on the page (client feedback) */
  hero: { eyebrow: string; title: string; lead: string; image: string; imageAlt: string; note: string; cta?: string };
  businesses: { title: string; lead: string; items: Business[] };
  drivers?: { title: string; lead: string; items: Feature[] };
  videos: { title: string; lead: string; items: VideoRow[] };
  why?: { title?: string; text?: string };
  ways: { title: string; lead: string; items: Feature[]; cols?: 2 | 3 | 4; links: ScenarioId[]; linksTitle?: string };
  economics: {
    title: string; lead: string; sources: { title: string; text: string }[]; factors?: string[];
    sourcesLabel?: string; factorsLabel?: string; principle: string; model: { title: string; text: string };
  };
  support: { title: string; lead: string; groups: { icon: string; title: string; items: string[] }[] };
  resp: { title: string; lead: string; miradex: string[]; partner: string[]; partnerTitle?: string; note?: string };
  product: { title: string; lead: string };
  fit: { title?: string; fit: string[]; notFit: string[] };
  steps: { title?: string; items: { title: string; text: string }[] };
  projects: {
    title: string; lead: string; items?: Feature[]; cols?: 2 | 3 | 4;
    gallery: { src: string; caption: string }[];
    reference?: { eyebrow: string; title: string; text: string; stats: { value: string; label: string }[]; link: { label: string; href: string } };
  };
  ctaA: Cta; ctaB: Cta; ctaC: Cta;
  other?: { title: string; lead: string };
  faq: { q: string; a: string }[];
  final: { title: string; text: string };
}
