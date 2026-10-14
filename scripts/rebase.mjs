// Post-build: prefix root-absolute URLs in dist/ with a base path, so the static site works
// from a sub-folder such as https://<user>.github.io/<repo>/. Usage: BASE=/repo node scripts/rebase.mjs
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const base = (process.env.BASE ?? '').replace(/\/$/, '');
if (!base) { console.log('rebase: BASE is empty, nothing to do'); process.exit(0); }

const files = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(html|css|js)$/.test(f)) files.push(p);
  }
})('dist');

// attributes and CSS url() that start with a single "/" (not "//")
const attr = /(\s(?:href|src|action|poster|content)=["'])\/(?!\/)/g;
const cssUrl = /(url\(\s*["']?)\/(?!\/)/g;
let changed = 0;
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  let out = f.endsWith('.html') ? src.replace(attr, `$1${base}/`) : src;
  out = out.replace(cssUrl, `$1${base}/`);
  if (out !== src) { writeFileSync(f, out); changed++; }
}
console.log(`rebase: ${changed} files prefixed with ${base}`);
