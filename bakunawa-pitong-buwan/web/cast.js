// Cast for "Ang Ahas na Lumunok ng Pitong Buwan" (Bakunawa, Visayan myth): outfits, props, fx drawings.
import { Pen, bodyFront, INK, fxBurst, fxPuff, fxStars } from './toonbase.js';
export { Pen, INK, fxBurst, fxPuff, fxStars };

const SK1 = '#c48a5e', SK2 = '#b07a52', SK3 = '#d29c6e';
const radiance = (p, h) => { const { cx, crown, HH, W, u } = h; for (let i = 0; i < 9; i++) { const a = Math.PI * (1.05 + 0.9 * i / 8), r0 = 0.62 * W, r1 = 0.86 * W; p.stroke([[cx + r0 * Math.cos(a), crown + 0.35 * HH + r0 * Math.sin(a)], [cx + r1 * Math.cos(a), crown + 0.35 * HH + r1 * Math.sin(a)]], 4 * u, '#f2c440'); } p.ell(cx, crown + 0.02 * HH, 0.2 * W, 0.07 * HH, '#f2c440', 2 * u); };
const robeTrim = (p, c) => { const { tcx, chin, HH, u } = c; p.stroke([[tcx - 18 * u, chin], [tcx, chin + 0.32 * HH], [tcx + 18 * u, chin]], 3 * u, '#f2c440'); for (let i = -2; i <= 2; i++) p.dot(tcx + i * 7 * u, chin + 0.62 * HH, 2 * u, '#f2c440'); };
const patadyong = (col) => (p, c) => { const { tcx, chin, HH, u } = c; for (let i = 0; i < 3; i++) p.stroke([[tcx - 22 * u, chin + (0.6 + i * 0.08) * HH], [tcx + 22 * u, chin + (0.6 + i * 0.08) * HH]], 2.2 * u, col); };
const putong = (col) => (p, h) => { const { cx, crown, HH, W, u } = h; p.band([[cx - 0.44 * W, crown + 0.2 * HH], [cx + 0.44 * W, crown + 0.2 * HH]], col, 0.09 * HH, 1.6 * u); p.ell(cx + 0.36 * W, crown + 0.16 * HH, 0.07 * W, 0.05 * HH, col, 1.4 * u); };
const bun = (p, h) => { const { cx, crown, HH, W, u } = h; p.ell(cx, crown + 0.0 * HH, 0.17 * W, 0.11 * HH, '#1d1414', 3 * u); };

export const OUT = {
  bathala: { id: 'bathala', o: { jacket: '#f4f1ea', pants: '#f4f1ea', boots: '#c9a040', hat: 'hair', hair: '#e9e2d4', skin: '#d9a07a', dress: '#f4f1ea', buttons: '#f2c440' }, extra: robeTrim, head: radiance, seed: 3 },
  v1: { id: 'v1', o: { jacket: '#c9a45a', pants: '#4a3426', boots: '#6a4a32', hat: 'hair', hair: '#1d1414', skin: SK2, buttons: '#7a2420' }, head: putong('#c2453c'), seed: 11 },
  v2: { id: 'v2', o: { jacket: '#f4efe2', pants: '#3a2a2a', boots: '#6a4a32', hat: 'hair', hair: '#1d1414', skin: SK3, dress: '#7a3a5a', buttons: '#c2453c' }, extra: patadyong('#f2c440'), head: bun, seed: 17 },
  v3: { id: 'v3', o: { jacket: '#5a7a9a', pants: '#3a2a2a', boots: '#6a4a32', hat: 'hair', hair: '#a8a29a', skin: SK1, buttons: '#f4f1ea' }, head: putong('#2b4c9a'), seed: 23 },
  kid: { id: 'kid', o: { jacket: '#e9a040', pants: '#5a3a2a', boots: '#6a4a32', hat: 'hair', hair: '#1d1414', skin: SK1, build: 'kid', buttons: '#7a2420' }, seed: 31 },
  kid2: { id: 'kid2', o: { jacket: '#3fa060', pants: '#3a2a2a', boots: '#6a4a32', hat: 'hair', hair: '#1d1414', skin: SK2, build: 'kid', dress: '#c2453c', buttons: '#f4f1ea' }, seed: 37 },
};

export const ARM = {
  hang: [14, 45, 17, 86], up: [16, -28, 22, -82], point: [32, -2, 64, -14], hip: [28, 28, 6, 52],
  shrug: [30, 14, 44, -12], hold: [18, 42, -6, 52, true], holdHi: [20, 30, -4, 20, true], chin: [18, 42, -14, -4, true],
  reach: [30, 20, 58, 30, true], lift: [22, 4, 10, -40, true], cheer: [20, -30, 34, -80], wave: [22, -20, 34, -66],
  bangHi: [24, -10, 10, -50, true], bangLo: [26, 20, 8, 10, true], cast: [30, -20, 56, -58], open: [34, -8, 60, -30],
};

const kaldero = (p, x, y, u) => { p.ell(x, y + 6 * u, 26 * u, 8 * u, '#2a2a30', 2.4 * u); p.poly([[x - 26 * u, y + 6 * u], [x + 26 * u, y + 6 * u], [x + 20 * u, y + 34 * u], [x - 20 * u, y + 34 * u]], '#3a3a44', 2.4 * u); p.ell(x - 30 * u, y + 12 * u, 6 * u, 4 * u, null, 2 * u); p.ell(x + 30 * u, y + 12 * u, 6 * u, 4 * u, null, 2 * u); p.dot(x, y, 5.5 * u); };
export const PROP = {
  kaldero,
  sandok: (p, x, y, u) => { p.band([[x, y], [x - 4 * u, y - 44 * u]], '#8a5a34', 4 * u, 1.4 * u, 'round'); p.ell(x - 5 * u, y - 50 * u, 9 * u, 7 * u, '#9aa3a8', 2 * u); p.dot(x, y, 5.5 * u); },
  orb: (p, x, y, u) => { p.ell(x, y - 10 * u, 14 * u, 14 * u, '#fff6d8', 2.4 * u); p.dot(x, y, 5.5 * u); },
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
/** a moon on a 512 canvas: glow halo, disc, craters; bite 0..1 = dark serpent-mouth shadow sliding over it (eclipse);
 *  bamboo 0..1 = bamboo stalks + leaves drawn as soft grey shadows on the face; tremble px */
export const drawMoon = (g, { bite = 0, bamboo = 0, halo = 0.7, tremble = 0, bcol = '#8a8a7a', ba = 0.5 } = {}) => {
  const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); g.translate(tremble, 0);
  const gr = g.createRadialGradient(256, 256, 60, 256, 256, 256); gr.addColorStop(0, `rgba(255,248,220,${halo})`); gr.addColorStop(1, 'rgba(255,248,220,0)'); g.fillStyle = gr; g.fillRect(0, 0, 512, 512);
  g.save(); g.beginPath(); g.arc(256, 256, 150, 0, 7); g.clip();
  const mg = g.createRadialGradient(220, 210, 20, 256, 256, 160); mg.addColorStop(0, '#fffbe8'); mg.addColorStop(1, '#efe2b8'); g.fillStyle = mg; g.fillRect(0, 0, 512, 512);
  g.fillStyle = 'rgba(200,185,150,0.45)'; for (const [x, y, r] of [[200, 200, 22], [300, 180, 14], [320, 300, 26], [210, 320, 16], [270, 250, 10]]) { g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); }
  if (bamboo > 0) {
    g.globalAlpha = ba * Math.min(1, bamboo * 1.5); g.strokeStyle = bcol; g.lineCap = 'round';
    for (const [x, tilt] of [[200, -0.12], [245, 0.05], [290, -0.05], [330, 0.12]]) {
      g.lineWidth = 14; g.beginPath(); g.moveTo(x, 410); g.lineTo(x + 260 * Math.sin(tilt), 410 - 260 * bamboo); g.stroke();
      g.lineWidth = 4; for (let k = 1; k < 6; k++) { const yy = 410 - k * 44 * bamboo; g.beginPath(); g.moveTo(x - 10, yy); g.lineTo(x + 10, yy); g.stroke(); }
      g.fillStyle = bcol; for (let k = 0; k < 3; k++) { const yy = 410 - (90 + k * 60) * bamboo; g.beginPath(); g.ellipse(x + 26, yy, 26, 7, -0.6, 0, 7); g.fill(); g.beginPath(); g.ellipse(x - 26, yy - 14, 24, 6, 0.6, 0, 7); g.fill(); }
    }
    g.globalAlpha = 1;
  }
  if (bite > 0) { g.fillStyle = 'rgba(20,24,40,0.93)'; g.beginPath(); g.arc(256 + 320 - 300 * bite, 256, 170, 0, 7); g.fill(); }
  g.restore();
  g.lineWidth = 6; g.strokeStyle = 'rgba(36,23,38,0.6)'; g.beginPath(); g.arc(256, 256, 150, 0, 7); g.stroke();
  g.restore();
};
/** twinkling stars field, 1024 */
export const drawStars = (g, t = 0, n = 120) => { const s = g.canvas.width; g.save(); g.scale(s / 1024, s / 1024);
  for (let i = 0; i < n; i++) { const r1 = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1, r2 = Math.abs(Math.sin(i * 78.233) * 12345.678) % 1, b = 0.5 + 0.5 * Math.sin(t * 3 + i * 1.7), r = 1.5 + 2 * (i % 3);
    g.fillStyle = `rgba(255,250,230,${0.4 + 0.6 * b})`; g.beginPath(); g.arc(r1 * 1024, r2 * 1024, r, 0, 7); g.fill(); }
  g.restore(); };
/** soft cloud puff, 512 */
export const drawCloud = (g, a = 1) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); g.fillStyle = `rgba(240,240,255,${0.92 * a})`;
  for (const [x, y, r] of [[150, 300, 90], [250, 250, 120], [360, 290, 95], [200, 330, 80], [310, 335, 85]]) { g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); }
  g.restore(); };
export const drawText = (g, txt, { col = '#ffffff', font = 'bold 300px Georgia, serif', stroke = INK, lw = 22 } = {}) => {
  const w = g.canvas.width, h = g.canvas.height; g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.lineWidth = lw; g.strokeStyle = stroke; g.lineJoin = 'round'; g.strokeText(txt, w / 2, h / 2); g.fillStyle = col; g.fillText(txt, w / 2, h / 2);
};
/** lightning bolt, 512 */
export const drawBolt = (g, a = 1) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); g.fillStyle = `rgba(255,245,180,${a})`; g.strokeStyle = `rgba(36,23,38,${a})`; g.lineWidth = 8;
  g.beginPath(); g.moveTo(280, 20); g.lineTo(190, 250); g.lineTo(260, 250); g.lineTo(200, 492); g.lineTo(340, 200); g.lineTo(270, 200); g.lineTo(330, 20); g.closePath(); g.fill(); g.stroke(); g.restore(); };

/** a little campfire flame, 256 */
export const drawFlame = (g, t = 0) => { const s = g.canvas.width; g.save(); g.scale(s / 256, s / 256);
  const fl = (x, h, w, c) => { g.fillStyle = c; g.beginPath(); g.moveTo(x - w, 220); g.quadraticCurveTo(x - w, 220 - h * 0.5, x + 6 * Math.sin(t * 7 + x), 220 - h); g.quadraticCurveTo(x + w, 220 - h * 0.5, x + w, 220); g.closePath(); g.fill(); };
  fl(128, 150 + 20 * Math.sin(t * 9), 50, '#ff7a30'); fl(110, 100 + 15 * Math.sin(t * 11), 28, '#ffb040'); fl(148, 110 + 15 * Math.sin(t * 8 + 1), 28, '#ffb040'); fl(128, 70 + 10 * Math.sin(t * 13), 20, '#fff0a0');
  g.restore(); };
/** comic "KLANG!" clang star, 512 */
export const drawClang = (g, txt = 'KLANG!') => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512);
  g.fillStyle = '#ffe066'; g.strokeStyle = INK; g.lineWidth = 10; g.beginPath();
  for (let i = 0; i < 20; i++) { const a = i / 20 * Math.PI * 2, r = i % 2 ? 150 : 240; g.lineTo(256 + r * Math.cos(a), 256 + r * 0.62 * Math.sin(a)); }
  g.closePath(); g.fill(); g.stroke();
  g.font = 'bold 110px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineWidth = 14; g.strokeText(txt, 256, 262); g.fillStyle = '#c2453c'; g.fillText(txt, 256, 262);
  g.restore(); };
