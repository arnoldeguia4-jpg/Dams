// node render.mjs <outdir> "<frames: 0-10,40,...>"   (RESUME=1 skips existing)
import { createRequire } from 'module'; const { chromium } = createRequire(import.meta.url)('/opt/node-tools/node_modules/playwright/index.js');
import http from 'http'; import fs from 'fs'; import path from 'path';
const [,, out, spec] = process.argv;
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), 'web');
const mime = { '.js': 'text/javascript', '.html': 'text/html' };
const srv = http.createServer((q, r) => { const p = path.join(root, decodeURIComponent(q.url.split('?')[0]).replace(/^\/$/, '/index.html')); fs.readFile(p, (e, d) => { if (e) { r.writeHead(404); r.end(); } else { r.writeHead(200, { 'content-type': mime[path.extname(p)] || 'application/octet-stream' }); r.end(d); } }); });
await new Promise((res) => srv.listen(0, res)); const port = srv.address().port;
const frames = []; for (const part of spec.split(',')) { const [a, b] = part.split('-').map(Number); for (let f = a; f <= (b ?? a); f++) frames.push(f); }
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.log('[page]', m.text().slice(0, 300)); });
page.on('pageerror', (e) => console.log('[pageerror]', e.message));
await page.goto(`http://localhost:${port}/index.html`);
await page.waitForFunction(() => window.ready === true, null, { timeout: 120000 });
let t0 = Date.now(), n = 0;
for (const f of frames) {
  const file = path.join(out, `f${String(f).padStart(4, '0')}.jpg`);
  if (process.env.RESUME && fs.existsSync(file)) continue;
  const data = await page.evaluate((f) => { window.renderFrame(f); return document.getElementById('c').toDataURL('image/jpeg', 0.95); }, f);
  fs.writeFileSync(file, Buffer.from(data.split(',')[1], 'base64')); n++;
  if (n % 10 === 0 || n === 1) console.log(`frame ${f} done (${n}/${frames.length}) ${((Date.now() - t0) / n / 1000).toFixed(2)} s/f`);
}
console.log('DONE', n, 'frames', ((Date.now() - t0) / 1000).toFixed(0), 's');
await browser.close(); srv.close();
