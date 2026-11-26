// Cast for "Napoleon vs the Rabbits" (1807): Napoleon, Berthier, Tsar Alexander, hunters, General Thiébault; rabbits as fx drawings.
import { Pen, bodyFront, INK, fxBurst, fxPuff, fxStars, OFFICER } from './toonbase.js';
export { Pen, INK, fxBurst, fxPuff, fxStars };

const bicorne = (wide = 0.7) => (p, h) => { const { cx, crown, HH, W, u } = h; p.poly([[cx - wide * W, crown + 0.24 * HH], [cx - 0.2 * W, crown - 0.16 * HH], [cx + 0.2 * W, crown - 0.16 * HH], [cx + wide * W, crown + 0.24 * HH], [cx, crown + 0.14 * HH]], '#1d1f2e', 2.4 * u); p.ell(cx + 0.18 * W, crown + 0.02 * HH, 0.07 * W, 0.06 * HH, '#2f4a8a', 1.4 * u); p.ell(cx + 0.18 * W, crown + 0.02 * HH, 0.035 * W, 0.03 * HH, '#c0353a', 0); };
const forelock = (p, h) => { const { cx, crown, HH, W, u } = h; p.poly([[cx - 0.1 * W, crown + 0.22 * HH], [cx + 0.04 * W, crown + 0.4 * HH], [cx + 0.12 * W, crown + 0.24 * HH]], '#2a201a', 1.4 * u); };
const epaulets = (col = '#e8c45a') => (p, c) => { const { tcx, chin, HH, u } = c; for (const s of [-1, 1]) p.ell(tcx + s * 36 * u, chin + 0.06 * HH, 14 * u, 7 * u, col, 2 * u); };
const lapels = (col) => (p, c) => { const { tcx, chin, HH, u } = c; p.poly([[tcx - 20 * u, chin], [tcx, chin + 0.5 * HH], [tcx - 30 * u, chin + 0.45 * HH]], col, 1.6 * u); p.poly([[tcx + 20 * u, chin], [tcx, chin + 0.5 * HH], [tcx + 30 * u, chin + 0.45 * HH]], col, 1.6 * u); };
const huntHat = (p, h) => { const { cx, crown, HH, W, u } = h; p.ell(cx, crown + 0.2 * HH, 0.55 * W, 0.07 * HH, '#3a4a2a', 2.2 * u); p.poly([[cx - 0.3 * W, crown + 0.2 * HH], [cx - 0.24 * W, crown - 0.1 * HH], [cx + 0.24 * W, crown - 0.1 * HH], [cx + 0.3 * W, crown + 0.2 * HH]], '#4a5a3a', 2.2 * u); p.stroke([[cx + 0.2 * W, crown - 0.04 * HH], [cx + 0.42 * W, crown - 0.34 * HH]], 3 * u, '#c0353a'); };
const glassesNose = (p, h) => { const { cx, crown, HH, W, u } = h; p.ell(cx - 0.16 * W, crown + 0.5 * HH, 0.1 * W, 0.08 * HH, null, 2 * u); p.ell(cx + 0.16 * W, crown + 0.5 * HH, 0.1 * W, 0.08 * HH, null, 2 * u); };

export const OUT = {
  napoleon: { id: 'napoleon', o: { ...OFFICER, jacket: '#5a6068', pants: '#f1efe6', boots: '#1d1a1a', hat: 'hair', hair: '#2a201a', skin: '#f5d6b4', sash: null, moustache: null, sword: false, buttons: '#e8c45a', build: 'adult' }, extra: (p, c) => { lapels('#2f4a8a')(p, c); epaulets()(p, c); }, head: (p, h) => { forelock(p, h); bicorne(0.72)(p, h); }, seed: 3 },
  berthier: { id: 'berthier', o: { ...OFFICER, jacket: '#2f4a8a', pants: '#f1efe6', boots: '#1d1a1a', hat: 'hair', hair: '#8a6a4a', skin: '#f2c49a', sash: '#c0353a', moustache: null, sword: false, buttons: '#e8c45a' }, extra: epaulets(), head: bicorne(0.55), seed: 9 },
  tsar: { id: 'tsar', o: { ...OFFICER, jacket: '#f1efe6', pants: '#1d2a4a', boots: '#1d1a1a', hat: 'hair', hair: '#c9a46a', skin: '#f5d6b4', sash: '#2f8ad0', moustache: null, sword: false, buttons: '#e8c45a' }, extra: epaulets(), seed: 15 },
  hunter: (k) => ({ id: 'hunter' + k, o: { jacket: ['#3f6a3a', '#4a5a2a', '#5a6a3a'][k % 3], pants: '#d9c9a0', boots: '#3a2a22', hat: 'hair', hair: '#5a3a22', skin: ['#f5d6b4', '#f2c49a', '#e9b07f'][k % 3], buttons: '#e8c45a' }, head: huntHat, seed: 40 + k }),
  thiebault: { id: 'thiebault', o: { jacket: '#2f4a8a', pants: '#2a2a34', boots: '#1d1a1a', hat: 'hair', hair: '#e9e2d4', skin: '#f2c49a', buttons: '#e8c45a', moustache: '#e9e2d4', build: 'stout' }, extra: epaulets(), head: glassesNose, seed: 21 },
};

export const ARM = {
  hang: [14, 45, 17, 86], up: [16, -28, 22, -82], point: [32, -2, 64, -14], hip: [28, 28, 6, 52], cross: [22, 30, -14, 22], vest: [20, 34, -16, 30, true],
  shrug: [30, 14, 44, -12], hold: [18, 42, -6, 52, true], holdHi: [20, 30, -4, 20, true], aim: [26, 10, 56, 4, true], cheer: [20, -30, 34, -80],
  shake: [30, 30, 58, 34, true], whip: [24, -20, 50, -60, true], whip2: [30, 20, 64, 30, true], flail: [24, -40, 40, -90], write: [22, 40, 0, 50, true],
};

export const PROP = {
  gun: (p, x, y, u) => { p.band([[x - 6 * u, y + 30 * u], [x + 60 * u, y - 10 * u]], '#5a3a22', 6 * u, 1.4 * u); p.band([[x + 40 * u, y + 2 * u], [x + 100 * u, y - 34 * u]], '#3a3a44', 3.5 * u, 1.2 * u); p.dot(x, y, 5.5 * u); },
  whip: (p, x, y, u) => { p.band([[x, y], [x + 4 * u, y - 40 * u]], '#3a2a22', 4 * u, 1 * u); p.stroke([[x + 4 * u, y - 40 * u], [x + 30 * u, y - 60 * u], [x + 60 * u, y - 50 * u]], 2 * u, '#3a2a22'); p.dot(x, y, 5.5 * u); },
  pen: (p, x, y, u) => { p.stroke([[x, y], [x + 18 * u, y - 40 * u]], 3 * u, '#f4f1ea'); p.dot(x, y, 5.5 * u); },
  treaty: (p, x, y, u) => { p.poly([[x - 26 * u, y - 4 * u], [x + 26 * u, y - 4 * u], [x + 26 * u, y - 44 * u], [x - 26 * u, y - 44 * u]], '#efe0b8', 2 * u); p.ell(x + 14 * u, y - 12 * u, 6 * u, 6 * u, '#c0353a', 1 * u); p.dot(x, y, 5.5 * u); },
  none: () => {},
};

export const drawChar = (g, s) => {
  const C = s.who;
  g.save(); g.scale(g.canvas.width / 600, g.canvas.height / 1000);
  if (s.flipX) { g.translate(600, 0); g.scale(-1, 1); }
  const p = new Pen(g);
  bodyFront(p, C.o, {
    phase: s.phase || 0, expr: s.expr || 'neutral', mode: s.mode || 'stand', look: s.look || 0, blink: s.blink || 0, lift: 50,
    tilt: s.tilt || 0, headTilt: s.headTilt || 0, wave: s.wave, facing: s.facing || 0, seed: C.seed || 1,
    armL: s.armL, armR: s.armR,
    extra: C.extra, headExtra: (pp, h) => { if (C.head) C.head(pp, h); if (s.head) s.head(pp, h); },
    hold: (pp, h) => {
      if (s.propR && h.R) (PROP[s.propR] || PROP.none)(pp, h.R[0], h.R[1], h.u);
      if (s.propL && h.L) (PROP[s.propL] || PROP.none)(pp, h.L[0], h.L[1], h.u);
    },
  });
  g.restore();
};

// ---------------- fx ----------------
export const glow = (g, rgb = '255,236,170', a = 0.8) => { const s = g.canvas.width, gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2); gr.addColorStop(0, `rgba(${rgb},${a})`); gr.addColorStop(0.4, `rgba(${rgb},${a * 0.45})`); gr.addColorStop(1, `rgba(${rgb},0)`); g.fillStyle = gr; g.fillRect(0, 0, s, s); };
export const drawText = (g, txt, { col = '#ffffff', font = 'bold 260px Georgia, serif', stroke = INK, lw = 22 } = {}) => {
  const w = g.canvas.width, h = g.canvas.height; g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.lineWidth = lw; g.strokeStyle = stroke; g.lineJoin = 'round'; g.strokeText(txt, w / 2, h / 2, w * 0.94); g.fillStyle = col; g.fillText(txt, w / 2, h / 2, w * 0.94);
};
const RCOL = ['#f4f1ea', '#c9a47a', '#8a6a4a', '#e9e2d4', '#a8a29a'];
/** one rabbit at (x,y) size s on a 2D context; hop 0..1, facing ±1, front = looking at camera (big eyes) */
const rabbit = (g, x, y, s, hop, facing, col, front) => {
  g.save(); g.translate(x, y - Math.abs(Math.sin(hop * Math.PI)) * 0.35 * s); g.scale(facing * s / 100, s / 100);
  g.lineWidth = 7; g.strokeStyle = INK; g.fillStyle = col;
  if (front) {
    for (const e of [-1, 1]) { g.beginPath(); g.ellipse(e * 22, -110, 13, 42, e * 0.15, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#e8a0a8'; g.beginPath(); g.ellipse(e * 22, -108, 6, 28, e * 0.15, 0, 7); g.fill(); g.fillStyle = col; }
    g.beginPath(); g.ellipse(0, 0, 52, 46, 0, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.ellipse(0, -58, 40, 36, 0, 0, 7); g.fill(); g.stroke();
    g.fillStyle = INK; for (const e of [-1, 1]) { g.beginPath(); g.arc(e * 15, -64, 8, 0, 7); g.fill(); } g.fillStyle = '#ffffff'; for (const e of [-1, 1]) { g.beginPath(); g.arc(e * 15 + 3, -67, 3, 0, 7); g.fill(); }
    g.fillStyle = '#e8a0a8'; g.beginPath(); g.ellipse(0, -48, 6, 4, 0, 0, 7); g.fill();
  } else {
    g.beginPath(); g.ellipse(0, 0, 60, 40, 0, 0, 7); g.fill(); g.stroke();
    g.beginPath(); g.ellipse(-58, 8, 14, 14, 0, 0, 7); g.fillStyle = '#ffffff'; g.fill(); g.stroke(); g.fillStyle = col;
    g.beginPath(); g.ellipse(46, -28, 30, 26, 0, 0, 7); g.fill(); g.stroke();
    for (const e of [0, 14]) { g.beginPath(); g.ellipse(36 + e, -80, 10, 32, 0.2, 0, 7); g.fill(); g.stroke(); }
    g.fillStyle = INK; g.beginPath(); g.arc(58, -32, 5, 0, 7); g.fill();
  }
  g.restore(); };
/** a swarm of n rabbits on a 1024 canvas; t = time (s); spread 0..1 how far they've come; dir: 'side' or 'front' */
export const drawSwarm = (g, t, { n = 40, seed = 1, dir = 'front', size = 1 } = {}) => {
  const s = g.canvas.width; g.save(); g.scale(s / 1024, s / 1024);
  const rows = [];
  for (let i = 0; i < n; i++) { const r1 = Math.abs(Math.sin(i * 12.9898 + seed) * 43758.5453) % 1, r2 = Math.abs(Math.sin(i * 78.233 + seed) * 12345.678) % 1;
    rows.push({ x: 60 + r1 * 904, y: 420 + r2 * 560, ph: r1 * 3, col: RCOL[i % 5] }); }
  rows.sort((a, b) => a.y - b.y);
  for (const R of rows) { const sc = (0.45 + 0.55 * (R.y - 420) / 560) * 70 * size; rabbit(g, R.x + (dir === 'side' ? (t * 90) % 60 : 0), R.y, sc, (t * 2.2 + R.ph) % 1, dir === 'side' ? -1 : 1, R.col, dir === 'front'); }
  g.restore(); };
/** single rabbit card, 512 */
export const drawRabbit = (g, { hop = 0, front = true, col = '#f4f1ea', facing = 1 } = {}) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); rabbit(g, 256, 400, 190, hop, facing, col, front); g.restore(); };
/** wooden cage with door open/closed, 512 */
export const drawCage = (g, open = 0) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); g.lineWidth = 9; g.strokeStyle = INK;
  g.fillStyle = '#c9a46a'; g.beginPath(); g.rect(80, 160, 352, 260); g.fill(); g.stroke(); g.fillStyle = '#2a2018'; g.beginPath(); g.rect(110, 190, 292, 200); g.fill();
  if (open < 1) { g.strokeStyle = '#8a5a34'; g.lineWidth = 12; for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(130 + i * 50, 190); g.lineTo(130 + i * 50, 190 + 200 * (1 - open)); g.stroke(); } }
  g.restore(); };
/** quill + memoir page, 512 */
export const drawMemoir = (g) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); g.fillStyle = '#efe0b8'; g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.rect(110, 70, 292, 380); g.fill(); g.stroke();
  g.strokeStyle = '#6a5a3a'; g.lineWidth = 5; for (let i = 0; i < 9; i++) { g.beginPath(); g.moveTo(140, 120 + i * 32); for (let x = 140; x < 370 - (i % 3) * 30; x += 18) g.lineTo(x + 9, 120 + i * 32 + (x % 36 ? -5 : 5)); g.stroke(); }
  g.restore(); };
