// Brand pattern generator (brandbook, "Фирменные элементы / Паттерн"):
// - rectangles in brand colors, 1 to 3 columns, one column always half as wide as the others;
// - grid built from squares split into 5 horizontal bands, merged vertically at random;
// - avoid equal colors side by side at the same height;
// - avoid repeating a color every other band in one column.
// Deterministic: the same seed always gives the same pattern, so pages are stable between builds.

export type Swatch = 'blue' | 'sky' | 'mint' | 'none';
export interface Band { h: number; c: Swatch }
export interface Column { w: number; bands: Band[] }

const COLORS: Swatch[] = ['blue', 'sky', 'mint'];

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

/** Column width ratios for 1, 2 or 3 columns (narrow = half of wide). */
export function widthsFor(cols: 1 | 2 | 3, narrowFirst = false): number[] {
  if (cols === 1) return [1];
  if (cols === 2) return narrowFirst ? [1, 2] : [2, 1];
  return [2, 1, 2];
}

function colorAt(col: Column | undefined, y: number): Swatch | undefined {
  if (!col) return undefined;
  let acc = 0;
  for (const b of col.bands) {
    if (y >= acc && y < acc + b.h) return b.c;
    acc += b.h;
  }
  return undefined;
}

/**
 * @param seed   any string; same seed, same pattern
 * @param cols   1 to 3 columns
 * @param units  total height in ½x units
 * @param gaps   allow white gaps in narrow columns (as in brandbook samples)
 */
export function makePattern(seed: string, cols: 1 | 2 | 3, units: number, opts: { gaps?: boolean; narrowFirst?: boolean } = {}): Column[] {
  const r = rng(`${seed}:${cols}:${units}`);
  const widths = widthsFor(cols, opts.narrowFirst);
  const columns: Column[] = [];
  const sizes = units <= 2 ? [1, 2] : [1, 2, 2, 3, 4];

  widths.forEach((w, i) => {
    const bands: Band[] = [];
    let y = 0;
    while (y < units) {
      let h = sizes[Math.floor(r() * sizes.length)];
      if (y + h > units) h = units - y;
      const prev = bands.at(-1)?.c;
      const prev2 = bands.at(-2)?.c;
      const left = colorAt(columns[i - 1], y);
      let pool: Swatch[] = COLORS.filter((c) => c !== prev && c !== left);
      const strict = pool.filter((c) => c !== prev2);
      if (strict.length) pool = strict;
      if (!pool.length) pool = COLORS.filter((c) => c !== prev);
      const narrow = w === 1 && widths.length > 1;
      const useGap = opts.gaps && narrow && prev !== 'none' && y > 0 && r() < 0.18;
      bands.push({ h, c: useGap ? 'none' : pool[Math.floor(r() * pool.length)] });
      y += h;
    }
    columns.push({ w, bands });
  });
  return columns;
}

/** Pick 1 to 3 columns from heading length, as the brandbook asks. */
export function colsForText(text: string): 1 | 2 | 3 {
  const n = text.length;
  if (n <= 14) return 1;
  if (n <= 34) return 2;
  return 3;
}
