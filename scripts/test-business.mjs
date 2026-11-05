// The chosen business and the ad source reach every form of a landing; every main button of «Продавать» has one label.
import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const p = await b.newPage();
const base = process.env.BASE ?? 'http://localhost:4321';
await p.setViewport({ width: 1440, height: 900 });
await p.goto(`${base}/colaboracion?utm_source=meta&utm_campaign=hub`, { waitUntil: 'networkidle0' });
await p.goto(`${base}/colaboracion/vender`, { waitUntil: 'networkidle0' });
console.log('utm kept after moving to a landing:', await p.$eval('#solicitud [data-utm]', (e) => e.value));
console.log('final form before choice:', await p.$eval('#solicitud [data-business-select]', (e) => e.value || '(empty)'));
await p.evaluate(() => document.querySelector('[data-bt-tab="stores"]').click());
console.log('final form after choosing stores:', await p.$eval('#solicitud [data-business-select]', (e) => e.value));
console.log('quick form after choosing stores:', await p.$eval('.hero [data-business-hidden]', (e) => e.value));
await p.evaluate(() => document.querySelector('[data-sbar] [data-open-form]').click());
console.log('popup from the page bar:', await p.$eval('#lead-modal [data-business-select]', (e) => e.value), '/', await p.$eval('#lead-modal [data-scenario-select]', (e) => e.value));
await p.evaluate(() => document.querySelector('#lead-modal').close());
const labels = await p.$$eval('.hero button[type=submit], .bt__panel.is-active .bt__cta, .eco__cta, #solicitud .lf__send, #lead-modal .lf__send, .sb__cta-long', (els) => els.map((e) => e.textContent.trim()));
console.log('main buttons:', [...new Set(labels)].join(' | '), `(${labels.length})`);
await p.evaluate(() => document.querySelector('.bt__panel.is-active [data-video-proxy]').click());
console.log('film link shows the notice:', await p.$eval('.bt__panel.is-active .video__frame', (e) => e.classList.contains('is-soon')));
// deep link, then the panel with long ways at both widths
await p.goto(`${base}/colaboracion/vender?type=stores`, { waitUntil: 'networkidle0' });
console.log('deep link preselects:', await p.$eval('#solicitud [data-business-select]', (e) => e.value));
const shot = async (w, name) => {
  await p.setViewport({ width: w, height: 900, deviceScaleFactor: w < 800 ? 2 : 1 });
  await p.goto(`${base}/colaboracion/vender?type=stores`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 400));
  const el = await p.$('#type-stores');
  await el.screenshot({ path: `shots/${name}-${w}.png` });
};
await shot(1440, 'v3-stores');
await shot(390, 'v3-stores');
// every page answers
for (const path of ['/', '/colaboracion', '/colaboracion/vender', '/colaboracion/vender-e-instalar', '/colaboracion/proyectos', '/colaboracion/recomendar', '/colaboracion/negocio-miradex', '/colaboracion/para/vallas', '/colaboracion/para/arquitectos', '/colaboracion/para/promotoras', '/colaboracion/proyectos?type=hotels']) {
  const r = await p.goto(base + path, { waitUntil: 'domcontentloaded' });
  const text = await p.evaluate(() => document.body.innerText);
  console.log(path, r.status(), /1000\+|более 1000|бетонн|20\+ цвет|—|–/i.test(text) ? `FOUND: ${text.match(/.{0,30}(1000\+|более 1000|бетонн|20\+ цвет|—|–).{0,30}/i)[0]}` : 'clean');
}
await b.close();
