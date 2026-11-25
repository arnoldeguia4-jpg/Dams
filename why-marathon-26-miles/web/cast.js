// Cast for "Why is a marathon 26.2 miles?": outfits, props, effect drawings.
import { Pen, bodyFront, INK, SKINS, townsfolk, fxBurst, fxPuff, fxStars } from './toonbase.js';
export { Pen, INK, fxBurst, fxPuff, fxStars };

const hanky = (col) => (p, h) => { const { cx, crown, HH, W, u } = h; p.poly([[cx - 0.4 * W, crown + 0.22 * HH], [cx - 0.3 * W, crown - 0.02 * HH], [cx + 0.3 * W, crown - 0.02 * HH], [cx + 0.4 * W, crown + 0.22 * HH]], col, 3 * u); for (const s of [-1, 1]) p.dot(cx + s * 0.36 * W, crown + 0.02 * HH, 0.04 * W, col); };
const laurel = (p, h) => { const { cx, crown, HH, W, u } = h; for (let i = -4; i <= 4; i++) p.ell(cx + i * 0.09 * W, crown + 0.18 * HH - Math.abs(i) * 0.012 * HH, 0.05 * W, 0.028 * W, '#5f9a3a', 1.4 * u); };
const crown = (p, h) => { const { cx, crown: cr, HH, W, u } = h; const y = cr + 0.02 * HH; p.poly([[cx - 0.22 * W, y + 0.06 * HH], [cx - 0.22 * W, y - 0.08 * HH], [cx - 0.11 * W, y - 0.02 * HH], [cx, y - 0.11 * HH], [cx + 0.11 * W, y - 0.02 * HH], [cx + 0.22 * W, y - 0.08 * HH], [cx + 0.22 * W, y + 0.06 * HH]], '#f2c440', 2.6 * u); p.dot(cx, y + 0.01 * HH, 0.025 * W, '#c2453c'); };
const sailorCollar = (p, c) => { const { tcx, chin, HH, u } = c; p.poly([[tcx - 18 * u, chin], [tcx, chin + 0.22 * HH], [tcx + 18 * u, chin], [tcx + 12 * u, chin - 3 * u], [tcx, chin + 0.12 * HH], [tcx - 12 * u, chin - 3 * u]], '#f4f1ea', 2 * u); };
const number = (n, col = '#c2453c') => (p, c) => { const { tcx, chin, HH, u } = c; p.poly([[tcx - 12 * u, chin + 0.12 * HH], [tcx + 12 * u, chin + 0.12 * HH], [tcx + 12 * u, chin + 0.3 * HH], [tcx - 12 * u, chin + 0.3 * HH]], '#f4f1ea', 1.4 * u); p.g.save(); p.g.font = `bold ${11 * u}px Arial`; p.g.textAlign = 'center'; p.g.textBaseline = 'middle'; p.g.fillStyle = col; p.g.fillText(n, tcx, chin + 0.21 * HH); p.g.restore(); };
const pearls = (p, c) => { const { tcx, chin, u } = c; for (let i = 0; i < 9; i++) { const a = Math.PI * (0.15 + 0.7 * i / 8); p.dot(tcx + 14 * u * Math.cos(a), chin + 2 * u + 7 * u * Math.sin(a), 1.9 * u, '#f4f1ea'); } };

export const OUT = {
  pietri: { id: 'pietri', o: { jacket: '#f4f1ea', pants: '#c2453c', boots: '#3a2a22', hat: 'hair', hair: '#2a201a', skin: SKINS[1], moustache: '#2a201a', buttons: '#f4f1ea' }, extra: number('19'), head: hanky('#f4f1ea'), seed: 3 },
  run1: { id: 'run1', o: { jacket: '#f4f1ea', pants: '#2b3b7a', boots: '#3a2a22', hat: 'hair', hair: '#6a4a30', skin: SKINS[0], buttons: '#f4f1ea' }, extra: number('7', '#2b3b7a'), seed: 11 },
  run2: { id: 'run2', o: { jacket: '#f4f1ea', pants: '#2f6f4a', boots: '#3a2a22', hat: 'hair', hair: '#c9a06a', skin: SKINS[2], buttons: '#f4f1ea' }, extra: number('23', '#2f6f4a'), seed: 17 },
  run3: { id: 'run3', o: { jacket: '#f4f1ea', pants: '#3a3d4a', boots: '#3a2a22', hat: 'hair', hair: '#1d1414', skin: SKINS[3], buttons: '#f4f1ea' }, extra: number('41', '#3a3d4a'), seed: 23 },
  greek: { id: 'greek', o: { jacket: '#f4f1ea', pants: '#c9a06a', boots: '#8a5a34', hat: 'hair', hair: '#2a201a', skin: SKINS[1], dress: '#f4f1ea', buttons: '#c9a040' }, head: laurel, seed: 9 },
  queen: { id: 'queen', o: { jacket: '#6a3a8a', pants: '#3a2a3a', boots: '#2a2020', hat: 'hair', hair: '#a8a29a', skin: SKINS[0], dress: '#6a3a8a', buttons: '#f2c440' }, extra: pearls, head: crown, seed: 29 },
  prince: { id: 'prince', o: { jacket: '#22305a', pants: '#22305a', boots: '#1d1a1a', hat: 'hair', hair: '#c9a06a', skin: SKINS[0], build: 'kid', buttons: '#f2c440' }, extra: sailorCollar, seed: 31 },
  princess: { id: 'princess', o: { jacket: '#f4f1ea', pants: '#f4f1ea', boots: '#1d1a1a', hat: 'hair', hair: '#6a4a30', skin: SKINS[0], build: 'kid', dress: '#e88aa8', buttons: '#c2453c' }, seed: 37 },
  official: { id: 'official', o: { jacket: '#2a2a34', pants: '#3a3a44', boots: '#1d1a1a', hat: 'tophat', skin: SKINS[1], moustache: '#5a4030', buttons: '#c9a040' }, seed: 41 },
  official2: { id: 'official2', o: { jacket: '#3a2a24', pants: '#3a3a44', boots: '#1d1a1a', hat: 'tophat', skin: SKINS[2], buttons: '#c9a040' }, seed: 43 },
};
export const crowd = (v) => ({ id: 'cr' + v, o: townsfolk(v), seed: 50 + v });

export const ARM = {
  hang: [14, 45, 17, 86], up: [16, -28, 22, -82], point: [32, -2, 64, -14], hip: [28, 28, 6, 52],
  shrug: [30, 14, 44, -12], hold: [18, 42, -6, 52, true], holdHi: [20, 30, -4, 20, true], chin: [18, 42, -14, -4, true],
  reach: [30, 20, 58, 30, true], lift: [22, 4, 10, -40, true], cheer: [20, -30, 34, -80], wave: [22, -20, 34, -66],
  runF: [24, 20, 4, 6, true], runB: [26, 40, 34, 60], limp: [30, 40, 40, 80], over: [30, -6, 46, -22], stamp: [22, -8, 6, -46, true],
};
export const runArms = (f, speed = 0.5, seed = 0) => { const s = Math.sin(f * speed + seed) > 0; return s ? [ARM.runF, ARM.runB] : [ARM.runB, ARM.runF]; };

export const PROP = {
  stamp: (p, x, y, u) => { p.band([[x, y], [x, y - 24 * u]], '#8a5a34', 5 * u, 1.4 * u, 'round'); p.poly([[x - 13 * u, y - 24 * u], [x + 13 * u, y - 24 * u], [x + 13 * u, y - 34 * u], [x - 13 * u, y - 34 * u]], '#c2453c', 2 * u); p.dot(x, y, 5.5 * u); },
  scroll: (p, x, y, u) => { p.poly([[x - 4 * u, y - 30 * u], [x + 22 * u, y - 30 * u], [x + 22 * u, y + 8 * u], [x - 4 * u, y + 8 * u]], '#f4ecd2', 2 * u); for (let i = 0; i < 4; i++) p.stroke([[x, y - 22 * u + i * 7 * u], [x + 18 * u, y - 22 * u + i * 7 * u]], 1.4 * u, '#8a7a5a'); p.dot(x, y, 5.5 * u); },
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

// ---------------- effect drawings ----------------
export const drawText = (g, txt, { col = '#ffffff', font = 'bold 300px Georgia, serif', stroke = INK, lw = 22 } = {}) => {
  const w = g.canvas.width, h = g.canvas.height;
  g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.lineWidth = lw; g.strokeStyle = stroke; g.lineJoin = 'round'; g.strokeText(txt, w / 2, h / 2);
  g.fillStyle = col; g.fillText(txt, w / 2, h / 2);
};
export const glow = (g, rgb = '255,236,170', a = 0.8) => { const s = g.canvas.width, gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2); gr.addColorStop(0, `rgba(${rgb},${a})`); gr.addColorStop(0.4, `rgba(${rgb},${a * 0.45})`); gr.addColorStop(1, `rgba(${rgb},0)`); g.fillStyle = gr; g.fillRect(0, 0, s, s); };
/** a carved number plate for the milestone, 512x512 */
export const drawPlate = (g, txt, { x = 0 } = {}) => {
  const s = g.canvas.width, p = new Pen(g); g.save(); g.scale(s / 512, s / 512);
  p.poly([[40, 120], [472, 120], [472, 392], [40, 392]], '#f4ecd2', 10);
  g.font = 'bold 190px Arial Black, Arial, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#241726'; g.fillText(txt, 256, 236);
  g.font = 'bold 62px Arial Black, Arial, sans-serif'; g.fillText('MILES', 256, 348);
  if (x > 0) { g.globalAlpha = x; p.stroke([[70, 140], [442, 372]], 34, '#e2453c'); p.stroke([[442, 140], [70, 372]], 34, '#e2453c'); g.globalAlpha = 1; }
  g.restore();
};
/** big red X stamp, 512 */
export const drawX = (g) => { const s = g.canvas.width, p = new Pen(g); g.save(); g.scale(s / 512, s / 512); p.stroke([[90, 90], [422, 422]], 70, '#e2453c'); p.stroke([[422, 90], [90, 422]], 70, '#e2453c'); g.restore(); };
/** rubber stamp text in a box, 1024x512 */
export const drawStamp = (g, txt, col = '#e2453c') => {
  const w = g.canvas.width, h = g.canvas.height; g.save(); g.translate(w / 2, h / 2); g.rotate(-0.12);
  g.strokeStyle = col; g.lineWidth = 26; g.strokeRect(-w * 0.42, -h * 0.32, w * 0.84, h * 0.64);
  g.font = `bold ${Math.round(h * 0.36)}px Arial Black, Arial, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(txt, 0, 4);
  g.restore();
};
/** a route map: castle -> stadium, path drawn up to t, label; 1024x1024 */
export const drawMap = (g, t, label) => {
  const s = g.canvas.width, p = new Pen(g); g.save(); g.scale(s / 1024, s / 1024);
  p.poly([[60, 120], [964, 120], [964, 900], [60, 900]], '#f4ecd2', 12);
  for (let i = 0; i < 9; i++) p.stroke([[60, 160 + i * 85], [964, 160 + i * 85]], 2, 'rgba(120,100,70,0.25)');
  const pts = [[190, 300], [300, 380], [360, 520], [520, 560], [640, 660], [760, 700], [840, 780]];
  const n = pts.length - 1, k = t * n, i0 = Math.floor(k), u = k - i0, path = pts.slice(0, i0 + 1);
  if (i0 < n) path.push([pts[i0][0] + (pts[i0 + 1][0] - pts[i0][0]) * u, pts[i0][1] + (pts[i0 + 1][1] - pts[i0][1]) * u]);
  g.setLineDash([26, 18]); p.stroke(path, 14, '#c2453c'); g.setLineDash([]);
  // castle + stadium icons
  p.poly([[140, 300], [140, 220], [160, 220], [160, 240], [180, 240], [180, 220], [200, 220], [200, 240], [220, 240], [220, 220], [240, 220], [240, 300]], '#9aa3a8', 6);
  p.ell(860, 800, 70, 40, '#d9c9a0', 6); p.ell(860, 800, 40, 20, '#6f9a45', 4);
  g.font = 'bold 84px Arial Black, Arial, sans-serif'; g.textAlign = 'center'; g.fillStyle = '#241726'; if (label) g.fillText(label, 560, 250);
  g.restore();
};
/** measuring tape strip with a label, 1024x256; t = how much is unrolled */
export const drawTape = (g, t, label) => {
  const w = g.canvas.width, h = g.canvas.height, L = Math.max(0.02, t) * w, p = new Pen(g);
  p.poly([[0, 60], [L, 60], [L, 196], [0, 196]], '#f2c440', 8);
  for (let x = 20; x < L; x += 40) p.stroke([[x, 60], [x, x % 200 < 40 ? 130 : 100]], 4, '#241726');
  if (t > 0.6) { g.globalAlpha = Math.min(1, (t - 0.6) * 3); g.font = 'bold 96px Arial Black, Arial, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineWidth = 14; g.strokeStyle = '#241726'; g.strokeText(label, L * 0.5, 128); g.fillStyle = '#ffffff'; g.fillText(label, L * 0.5, 128); g.globalAlpha = 1; }
};
/** wall calendar page, 512 */
export const drawCalendar = (g, year) => {
  const s = g.canvas.width, p = new Pen(g); g.save(); g.scale(s / 512, s / 512);
  p.poly([[96, 60], [416, 60], [416, 452], [96, 452]], '#f4f1ea', 10); p.poly([[96, 60], [416, 60], [416, 150], [96, 150]], '#c2453c', 10);
  for (const x of [170, 342]) p.ell(x, 60, 14, 26, '#9aa3a8', 6);
  g.font = 'bold 130px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#241726'; g.fillText(String(year), 256, 300);
  g.restore();
};
