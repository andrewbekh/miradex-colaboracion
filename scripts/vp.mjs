// One viewport screenshot (no full page): node scripts/vp.mjs <path> <width> <scrollY|selector> <out> [height]
import puppeteer from 'puppeteer-core';
const [path, w, at, out, h = 900] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const p = await b.newPage();
const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
await p.setViewport({ width: +w, height: +h, deviceScaleFactor: +w < 800 ? 2 : 1 });
await p.goto('http://localhost:4321' + path, { waitUntil: 'networkidle0' });
await p.evaluate(() => document.fonts.ready);
await p.evaluate(async () => { document.querySelectorAll('img[loading="lazy"]').forEach((i) => i.setAttribute('loading', 'eager')); });
if (/^\d+$/.test(at)) await p.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), +at);
else await p.evaluate((s) => { const el = document.querySelector(s); window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 140, behavior: 'instant' }); }, at);
await new Promise((r) => setTimeout(r, 700));
await p.screenshot({ path: out });
const ov = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
console.log(out, 'overflow:', ov, errs.length ? 'ERR ' + errs.join(' | ') : '');
await b.close();
