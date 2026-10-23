// Brand pattern generator, built strictly on the brandbook grid ("Фирменные элементы / Паттерн", test task p. 9-10):
// - 1 to 3 columns; the narrow column is always half as wide as a wide one;
// - a wide column is a square split into 5 horizontal bands: x = wide column width / 5;
// - wide columns merge bands in whole x (x, 2x, 3x), the narrow column steps in ½x;
// - white gaps are allowed, more often in the narrow column;
// - no equal colours side by side at the same height, no colour repeated every other band in a column;
// - the pattern is cropped by height to fit the format (the parent sets overflow: hidden).
// Deterministic: the same seed always gives the same pattern, so pages are stable between builds.
// All heights below are counted in ½x.

export type Swatch = 'blue' | 'sky' | 'mint' | 'none' | 'photo';
export interface Band { h: number; c: Swatch }
export interface Column { kind: 'wide' | 'narrow'; bands: Band[] }
/** w = wide, n = narrow, read left to right */
export type Layout = 'w' | 'n' | 'wn' | 'nw' | 'wnw';
/** Photo merged into the grid in place of colour bands; from and size in x (½ steps allowed in a narrow column). */
export interface PhotoSlot { col: number; from: number; size: number }

const COLORS: Swatch[] = ['blue', 'sky', 'mint'];
/** blue is the base colour of the brand, sky and mint are additional */
const WEIGHT: Record<string, number> = { blue: 3, sky: 2, mint: 2 };
const SIZES = { wide: [2, 2, 4, 4, 6], narrow: [1, 1, 1, 1, 2, 2, 3, 4] };
const GAP_CHANCE = { wide: 0.16, narrow: 0.28 };

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

function rng(seed: string) {
  let a = hash(seed);
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(pool: Swatch[], t: number): Swatch {
  const sum = pool.reduce((s, c) => s + WEIGHT[c], 0);
  let acc = 0;
  for (const c of pool) { acc += WEIGHT[c] / sum; if (t < acc) return c; }
  return pool[pool.length - 1];
}

export const kindsOf = (layout: Layout) => [...layout].map((k) => (k === 'w' ? 'wide' : 'narrow') as Column['kind']);
/** Width of the whole pattern in x: wide = 5x, narrow = 2.5x. */
export const widthX = (layout: Layout) => kindsOf(layout).reduce((s, k) => s + (k === 'wide' ? 5 : 2.5), 0);

/** Colours of a column that overlap the range [y, y + h). */
function colorsIn(col: Column | undefined, y: number, h: number): Swatch[] {
  if (!col) return [];
  const out: Swatch[] = [];
  let acc = 0;
  for (const b of col.bands) {
    if (acc < y + h && acc + b.h > y) out.push(b.c);
    acc += b.h;
  }
  return out;
}

/** Band edges of a column, in ½x. */
function edgesOf(col: Column | undefined): number[] {
  if (!col) return [];
  let acc = 0;
  return col.bands.map((b) => (acc += b.h));
}

/**
 * @param seed    any string; same seed, same pattern
 * @param layout  columns, e.g. 'wn' = wide + narrow
 * @param heightX total height in x (the parent may crop it)
 */
export function brandGrid(seed: string, layout: Layout, heightX: number, opts: { photo?: PhotoSlot; gaps?: boolean } = {}): Column[] {
  const r = rng(`${seed}:${layout}:${heightX}`);
  const total = Math.round(heightX * 2);
  const { photo, gaps = true } = opts;
  const kinds = kindsOf(layout);
  const columns: (Column | undefined)[] = kinds.map(() => undefined);
  // wide columns first: their big blocks fix the rhythm, the narrow column's ½x bands then avoid both neighbours
  const order = kinds.map((k, i) => [k, i] as const).sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] === 'wide' ? -1 : 1));

  order.forEach(([kind, i]) => {
    const bands: Band[] = [];
    const slot = photo && photo.col === i ? { from: Math.round(photo.from * 2), size: Math.round(photo.size * 2) } : undefined;
    let y = 0;
    while (y < total) {
      if (slot && y === slot.from) {
        bands.push({ h: slot.size, c: 'photo' });
        y += slot.size;
        continue;
      }
      const sizes = SIZES[kind];
      let h = sizes[Math.floor(r() * sizes.length)];
      if (slot && y < slot.from && y + h > slot.from) h = slot.from - y;
      if (y + h > total) h = total - y;
      // a narrow band ends where a neighbour's band ends, so it never straddles two neighbour colours
      if (kind === 'narrow') {
        const next = [columns[i - 1], columns[i + 1]].flatMap((c) => edgesOf(c)).filter((e) => e > y).sort((m, n) => m - n)[0];
        if (next !== undefined && y + h > next) h = next - y;
      }

      const prev = bands.at(-1)?.c;
      const prev2 = bands.at(-2)?.c;
      const canGap = gaps && y > 0 && prev !== 'none' && prev !== 'photo' && r() < GAP_CHANCE[kind];
      if (canGap) {
        bands.push({ h, c: 'none' });
        y += h;
        continue;
      }
      const side = [...colorsIn(columns[i - 1], y, h), ...colorsIn(columns[i + 1], y, h)];
      const tries: Swatch[][] = [
        COLORS.filter((c) => c !== prev && c !== prev2 && !side.includes(c)),
        COLORS.filter((c) => c !== prev && !side.includes(c)),
        COLORS.filter((c) => c !== prev),
      ];
      // no colour fits: leave a white gap rather than break the rules
      if (!tries[0].length && gaps && prev !== 'none' && y > 0) {
        bands.push({ h, c: 'none' });
        y += h;
        continue;
      }
      const pool = tries.find((t) => t.length)!;
      bands.push({ h, c: pick(pool, r()) });
      y += h;
    }
    columns[i] = { kind, bands };
  });
  return columns as Column[];
}
