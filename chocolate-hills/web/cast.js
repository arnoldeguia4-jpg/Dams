// Cast for "Ang Kalat ng Dalawang Higante" (Chocolate Hills, Bohol): two giants, a lola with two kids, fx drawings.
import { Pen, bodyFront, INK, fxBurst, fxPuff, fxStars } from './toonbase.js';
export { Pen, INK, fxBurst, fxPuff, fxStars };

const headband = (col) => (p, h) => { const { cx, crown, HH, W, u } = h; p.band([[cx - 0.46 * W, crown + 0.26 * HH], [cx + 0.46 * W, crown + 0.26 * HH]], col, 0.08 * HH, 1.6 * u); p.poly([[cx + 0.42 * W, crown + 0.24 * HH], [cx + 0.62 * W, crown + 0.16 * HH], [cx + 0.58 * W, crown + 0.36 * HH]], col, 1.6 * u); };
const beard = (col) => (p, h) => { const { cx, crown, HH, W, u } = h; p.poly([[cx - 0.46 * W, crown + 0.58 * HH], [cx - 0.4 * W, crown + 0.9 * HH], [cx - 0.18 * W, crown + 1.08 * HH], [cx, crown + 1.14 * HH], [cx + 0.18 * W, crown + 1.08 * HH], [cx + 0.4 * W, crown + 0.9 * HH], [cx + 0.46 * W, crown + 0.58 * HH], [cx + 0.3 * W, crown + 0.8 * HH], [cx + 0.12 * W, crown + 0.88 * HH], [cx - 0.12 * W, crown + 0.88 * HH], [cx - 0.3 * W, crown + 0.8 * HH]], col, 2.2 * u); };
const bahag = (col) => (p, c) => { const { tcx, chin, HH, u } = c; p.poly([[tcx - 30 * u, chin + 0.72 * HH], [tcx + 30 * u, chin + 0.72 * HH], [tcx + 12 * u, chin + 1.05 * HH], [tcx - 12 * u, chin + 1.05 * HH]], col, 1.8 * u); };
const salakot = (p, h) => { const { cx, crown, HH, W, u } = h; p.poly([[cx - 0.62 * W, crown + 0.28 * HH], [cx, crown - 0.22 * HH], [cx + 0.62 * W, crown + 0.28 * HH]], '#c9a05a', 2.2 * u); p.dot(cx, crown - 0.2 * HH, 4 * u, '#8a6a3a'); };
const bun = (p, h) => { const { cx, crown, HH, W, u } = h; p.ell(cx, crown + 0.0 * HH, 0.17 * W, 0.11 * HH, '#d9d4c4', 3 * u); };
export const sweat = (p, h) => { const { cx, crown, HH, W, u } = h; for (const s of [-1, 1]) p.ell(cx + s * 0.46 * W, crown + 0.42 * HH, 4 * u, 7 * u, '#9fd4ff', 1.6 * u); };
export const angry = (p, h) => { const { cx, crown, HH, W, u } = h; p.g.save(); p.g.globalAlpha = 0.28; p.ell(cx, crown + 0.6 * HH, 0.45 * W, 0.3 * HH, '#e2453c', 0); p.g.restore(); };

export const OUT = {
  g1: { id: 'g1', o: { jacket: '#3f8a4a', pants: '#5a3a22', boots: '#8a5a34', hat: 'hair', hair: '#1d1414', skin: '#b07a52', buttons: '#e8c45a', build: 'stout' }, extra: bahag('#c2453c'), head: headband('#c2453c'), seed: 3 },
  g2: { id: 'g2', o: { jacket: '#2f5f9a', pants: '#3a2a22', boots: '#8a5a34', hat: 'hair', hair: '#2a1a14', skin: '#c48a5e', buttons: '#f4f1ea', build: 'stout' }, extra: bahag('#f2c440'), head: (p, h) => { beard('#2a1a14')(p, h); headband('#f2c440')(p, h); }, seed: 9 },
  lola: { id: 'lola', o: { jacket: '#f4efe2', pants: '#3a2a2a', boots: '#6a4a32', hat: 'hair', hair: '#d9d4c4', skin: '#c48a5e', dress: '#7a3a5a', buttons: '#c2453c' }, head: bun, seed: 15 },
  kid1: { id: 'kid1', o: { jacket: '#e9a040', pants: '#5a3a2a', boots: '#6a4a32', hat: 'hair', hair: '#1d1414', skin: '#b07a52', build: 'kid', buttons: '#7a2420' }, seed: 21 },
  kid2: { id: 'kid2', o: { jacket: '#c2453c', pants: '#3a2a2a', boots: '#6a4a32', hat: 'hair', hair: '#1d1414', skin: '#d29c6e', build: 'kid', dress: '#3fa060', buttons: '#f4f1ea' }, seed: 25 },
  farmer: { id: 'farmer', o: { jacket: '#e9e2d4', pants: '#4a5a6a', boots: '#6a4a32', hat: 'hair', hair: '#1d1414', skin: '#b07a52', buttons: '#8a6a4a' }, head: salakot, seed: 31 },
};

export const ARM = {
  hang: [14, 45, 17, 86], up: [16, -28, 22, -82], point: [32, -2, 64, -14], hip: [28, 28, 6, 52], cross: [22, 30, -14, 22],
  shrug: [30, 14, 44, -12], hold: [18, 42, -6, 52, true], cheer: [20, -30, 34, -80], wave: [22, -20, 34, -66], fist: [26, 0, 40, -30],
  windup: [16, -30, -4, -70, true], throw: [34, -10, 72, -4], shake: [30, 30, 58, 34, true], hug: [30, 10, 62, -8], scratch: [18, 30, -10, -20, true],
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
  });
  g.restore();
};

// ---------------- fx ----------------
export const glow = (g, rgb = '255,236,170', a = 0.8) => { const s = g.canvas.width, gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2); gr.addColorStop(0, `rgba(${rgb},${a})`); gr.addColorStop(0.4, `rgba(${rgb},${a * 0.45})`); gr.addColorStop(1, `rgba(${rgb},0)`); g.fillStyle = gr; g.fillRect(0, 0, s, s); };
export const drawText = (g, txt, { col = '#ffffff', font = 'bold 230px Georgia, serif', stroke = INK, lw = 22 } = {}) => {
  const w = g.canvas.width, h = g.canvas.height; g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.lineWidth = lw; g.strokeStyle = stroke; g.lineJoin = 'round'; g.strokeText(txt, w / 2, h / 2, w * 0.94); g.fillStyle = col; g.fillText(txt, w / 2, h / 2, w * 0.94);
};
/** wooden day-counter board "ARAW n" (1024x512) */
export const drawDayBoard = (g, n) => { const w = g.canvas.width, h = g.canvas.height; g.save();
  g.fillStyle = '#c99a5e'; g.fillRect(0, 0, w, h); g.strokeStyle = 'rgba(110,70,30,0.35)'; g.lineWidth = 6; for (let y = 40; y < h; y += 60) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y + 8); g.stroke(); }
  g.strokeStyle = INK; g.lineWidth = 28; g.strokeRect(14, 14, w - 28, h - 28);
  g.fillStyle = '#3a2216'; g.font = 'bold 120px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('ARAW', w / 2, 150);
  g.font = 'bold 260px Georgia, serif'; g.fillText(String(n), w / 2, 340); g.restore(); };
/** a ghostly giant silhouette for the opening "legend says" beat (512x1024) */
export const drawGhostGiants = (g, a = 0.5) => { const w = g.canvas.width, h = g.canvas.height; g.save(); g.globalAlpha = a; g.fillStyle = '#fff8e0';
  for (const [x, s] of [[0.28, 1], [0.72, -1]]) { g.save(); g.translate(w * x, h); g.scale(s, 1);
    g.beginPath(); g.ellipse(0, -h * 0.78, w * 0.14, h * 0.09, 0, 0, 7); g.fill(); g.beginPath(); g.ellipse(0, -h * 0.45, w * 0.2, h * 0.28, 0, 0, 7); g.fill();
    g.beginPath(); g.moveTo(w * 0.15, -h * 0.6); g.lineTo(w * 0.32, -h * 0.82); g.lineTo(w * 0.27, -h * 0.85); g.lineTo(w * 0.1, -h * 0.62); g.fill(); g.restore(); }
  g.restore(); };
