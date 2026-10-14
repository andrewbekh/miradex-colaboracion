// Smoke test for the shared lead form: validation, ES phone mask, demo submit, popup preselect.
import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const p = await b.newPage();
const logs = []; p.on('console', (m) => logs.push(m.text()));
await p.goto('http://localhost:4321/componentes?utm_source=meta&utm_campaign=test', { waitUntil: 'networkidle0' });
const f = '#solicitud form';
await p.click(`${f} button[type=submit]`);
const errs = await p.$$eval(`${f} [aria-invalid=true]`, (els) => els.map((e) => e.name));
console.log('empty submit, invalid:', errs.join(','));
await p.select(`${f} select[name=business_type]`, 'Instalación y montaje');
await p.type(`${f} input[name=city]`, 'Valencia');
await p.type(`${f} input[name=name]`, 'Test');
await p.type(`${f} input[name=email]`, 'test@empresa.es');
await p.type(`${f} input[name=phone]`, '+34612345678');
console.log('phone masked:', await p.$eval(`${f} input[name=phone]`, (e) => e.value));
await p.click(`${f} .chip input[value="Equipo comercial"]`);
await p.click(`${f} input[name=consent]`);
await p.click(`${f} button[type=submit]`);
await new Promise((r) => setTimeout(r, 300));
console.log('success visible:', await p.$eval(`${f} .lf__done`, (e) => !e.hidden));
console.log('payload:', logs.find((l) => l.includes('MIRADEX lead')));
// modal scenario preselect
await p.evaluate(() => document.querySelector('[data-open-form][data-scenario="no-se"]').click());
console.log('modal open:', await p.$eval('#lead-modal', (d) => d.open), 'scenario:', await p.$eval('#lead-modal [data-scenario-radio]:checked', (s) => s.value));
// role switch: installer shows zone and crew, hides business profile
await p.click('#lead-modal .role input[value="instalar"]');
const vis = await p.$$eval('#lead-modal [data-for]', (els) => els.filter((e) => !e.hidden).map((e) => e.querySelector('input,select')?.name));
console.log('instalar fields:', vis.join(','));
await p.click('#lead-modal .role input[value="proyectos"]');
console.log('proyectos fields:', (await p.$$eval('#lead-modal [data-for]', (els) => els.filter((e) => !e.hidden).map((e) => e.querySelector('input,select')?.name))).join(','));
await b.close();
