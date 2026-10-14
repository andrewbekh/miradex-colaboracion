// Screenshots at the three target breakpoints.
// Usage: node scripts/shots.mjs <path-or-url> [prefix] [widths] 
// env SLICE=<px> also writes viewable slices to shots/slices; env ACTION=modal opens the form popup first.
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const target = process.argv[2] ?? '/';
const prefix = process.argv[3] ?? 'page';
const widths = (process.argv[4] ?? '1440,768,390').split(',').map(Number);
const base = process.env.BASE ?? 'http://localhost:4321';
const slice = Number(process.env.SLICE ?? 0);
const url = /^(https?|file):/.test(target) ? target : base + target;

mkdirSync('shots/slices', { recursive: true });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
for (const w of widths) {
  const page = await browser.newPage();
  const dpr = w < 800 ? 2 : 1;
  await page.setViewport({ width: w, height: 900, deviceScaleFactor: dpr });
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  // load lazy images: walk the page, then return to top
  await page.evaluate(async () => {
    document.querySelectorAll('img[loading="lazy"]').forEach((i) => i.setAttribute('loading', 'eager'));
    for (let y = 0; y < document.documentElement.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
    window.scrollTo(0, 0);
    await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))));
    await new Promise((r) => setTimeout(r, 300));
  });
  if (process.env.ACTION === 'modal') {
    await page.evaluate(() => document.querySelector('[data-open-form]')?.click());
    await new Promise((r) => setTimeout(r, 400));
    const file = `shots/${prefix}-${w}.png`;
    await page.screenshot({ path: file });
    console.log(file);
    await page.close();
    continue;
  }
  const file = `shots/${prefix}-${w}.png`;
  await page.screenshot({ path: file, fullPage: true });
  console.log(file);
  if (slice) {
    const H = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0, i = 0; y < H; y += slice, i++) {
      const p = `shots/slices/${prefix}-${w}-${i}.png`;
      await page.screenshot({ path: p, clip: { x: 0, y, width: w, height: Math.min(slice, H - y) }, captureBeyondViewport: true });
      console.log(p);
    }
  }
  await page.close();
}
await browser.close();
