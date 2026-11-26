// Cast for "The War That Killed Only a Pig" (Pig War, San Juan Island, 1859).
import { Pen, bodyFront, INK, fxBurst, fxPuff, fxStars, RIFLEMAN, OFFICER } from './toonbase.js';
export { Pen, INK, fxBurst, fxPuff, fxStars };

const farmHat = (p, h) => { const { cx, crown, HH, W, u } = h; p.ell(cx, crown + 0.2 * HH, 0.68 * W, 0.08 * HH, '#b08a4a', 2.4 * u); p.poly([[cx - 0.34 * W, crown + 0.2 * HH], [cx - 0.28 * W, crown - 0.16 * HH], [cx + 0.28 * W, crown - 0.16 * HH], [cx + 0.34 * W, crown + 0.2 * HH]], '#c9a05a', 2.4 * u); p.band([[cx - 0.33 * W, crown + 0.12 * HH], [cx + 0.33 * W, crown + 0.12 * HH]], '#6a3a22', 0.05 * HH, 1 * u); };
const beard = (col) => (p, h) => { const { cx, crown, HH, W, u } = h; p.poly([[cx - 0.45 * W, crown + 0.62 * HH], [cx - 0.38 * W, crown + 0.92 * HH], [cx, crown + 1.1 * HH], [cx + 0.38 * W, crown + 0.92 * HH], [cx + 0.45 * W, crown + 0.62 * HH], [cx + 0.26 * W, crown + 0.84 * HH], [cx, crown + 0.9 * HH], [cx - 0.26 * W, crown + 0.84 * HH]], col, 2.2 * u); };
const kepi = (col) => (p, h) => { const { cx, crown, HH, W, u } = h; p.poly([[cx - 0.4 * W, crown + 0.3 * HH], [cx - 0.34 * W, crown - 0.08 * HH], [cx + 0.3 * W, crown - 0.02 * HH], [cx + 0.4 * W, crown + 0.3 * HH]], col, 2.4 * u); p.ell(cx, crown + 0.32 * HH, 0.44 * W, 0.05 * HH, '#1d1a22', 2 * u); p.dot(cx, crown + 0.12 * HH, 4 * u, '#e8c45a'); };
const bicorne = (p, h) => { const { cx, crown, HH, W, u } = h; p.poly([[cx - 0.62 * W, crown + 0.22 * HH], [cx, crown - 0.22 * HH], [cx + 0.62 * W, crown + 0.22 * HH], [cx, crown + 0.12 * HH]], '#1d1f2e', 2.4 * u); p.dot(cx, crown + 0.02 * HH, 6 * u, '#e8c45a'); };
const pickel = (p, h) => { const { cx, crown, HH, W, u } = h; p.ell(cx, crown + 0.14 * HH, 0.42 * W, 0.22 * HH, '#2a2a30', 2.4 * u, 180, 360); p.band([[cx - 0.44 * W, crown + 0.16 * HH], [cx + 0.44 * W, crown + 0.16 * HH]], '#e8c45a', 0.05 * HH, 1.2 * u); p.poly([[cx - 0.05 * W, crown - 0.06 * HH], [cx, crown - 0.34 * HH], [cx + 0.05 * W, crown - 0.06 * HH]], '#e8c45a', 2 * u); p.ell(cx, crown + 0.02 * HH, 0.06 * W, 0.04 * HH, '#e8c45a', 1.4 * u); };
const sideburns = (p, h) => { const { cx, crown, HH, W, u } = h; for (const s of [-1, 1]) p.ell(cx + s * 0.4 * W, crown + 0.68 * HH, 0.12 * W, 0.2 * HH, '#f4f1ea', 2 * u); };
const epaulets = (p, c) => { const { tcx, chin, HH, u } = c; for (const s of [-1, 1]) p.ell(tcx + s * 36 * u, chin + 0.06 * HH, 14 * u, 7 * u, '#e8c45a', 2 * u); };
const crossbelt = (p, c) => { const { tcx, chin, HH, u } = c; p.stroke([[tcx - 30 * u, chin + 0.04 * HH], [tcx + 28 * u, chin + 0.6 * HH]], 7 * u, '#f1efe6'); p.stroke([[tcx + 30 * u, chin + 0.04 * HH], [tcx - 28 * u, chin + 0.6 * HH]], 7 * u, '#f1efe6'); };

export const OUT = {
  cutlar: { id: 'cutlar', o: { jacket: '#8a5a3a', pants: '#3b4a6a', boots: '#3a2a22', hat: 'hair', hair: '#6a4a2a', skin: '#f2c49a', buttons: '#5a3a22' }, head: (p, h) => { beard('#6a4a2a')(p, h); farmHat(p, h); }, seed: 3 },
  griffin: { id: 'griffin', o: { jacket: '#2a2a34', pants: '#3a3a44', boots: '#1d1a1a', hat: 'tophat', skin: '#f5d6b4', moustache: '#8a5a3a', buttons: '#9aa3a8' }, seed: 9 },
  usa: (k) => ({ id: 'usa' + k, o: { ...RIFLEMAN, jacket: '#2f4a8a', pants: '#5a7ab0', hat: 'hair', hair: ['#3a2a20', '#7a4a22', '#c9a46a', '#2a201a'][k % 4], skin: ['#f5d6b4', '#e9b07f', '#c48a5e', '#f2c49a'][k % 4], belt: '#f1efe6', buttons: '#e8c45a' }, head: kepi('#2f4a8a'), seed: 40 + k }),
  brit: (k) => ({ id: 'brit' + k, o: { ...RIFLEMAN, jacket: '#c0353a', pants: '#2a2a34', hat: 'shako', belt: null, skin: ['#f5d6b4', '#f2c49a', '#e9c8a0'][k % 3], buttons: '#e8c45a' }, extra: crossbelt, seed: 60 + k }),
  admiral: { id: 'admiral', o: { ...OFFICER, jacket: '#1d2a4a', pants: '#1d2a4a', hat: 'hair', hair: '#d9d4c4', skin: '#f5d6b4', sash: null, moustache: '#d9d4c4', sword: false, buttons: '#e8c45a' }, extra: epaulets, head: bicorne, seed: 21 },
  kaiser: { id: 'kaiser', o: { ...OFFICER, jacket: '#3a4a3a', pants: '#2a2a34', hat: 'hair', hair: '#f4f1ea', skin: '#f5d6b4', sash: '#e8c45a', moustache: '#f4f1ea', sword: false, buttons: '#e8c45a' }, extra: epaulets, head: (p, h) => { sideburns(p, h); pickel(p, h); }, seed: 27 },
};

export const ARM = {
  hang: [14, 45, 17, 86], up: [16, -28, 22, -82], point: [32, -2, 64, -14], hip: [28, 28, 6, 52], cross: [22, 30, -14, 22],
  shrug: [30, 14, 44, -12], hold: [18, 42, -6, 52, true], holdHi: [20, 30, -4, 20, true], aim: [26, 10, 56, 4, true], cheer: [20, -30, 34, -80],
  toast: [22, 0, 18, -46, true], stamp: [24, 20, 30, 40, true], stampUp: [22, -10, 24, -40, true], wag: [26, -4, 40, -46],
};

const bill = (txt) => (p, x, y, u) => { p.poly([[x - 26 * u, y - 4 * u], [x + 26 * u, y - 4 * u], [x + 26 * u, y - 34 * u], [x - 26 * u, y - 34 * u]], '#9ad08a', 2 * u); p.dot(x, y, 5.5 * u); p.g.save(); p.g.font = `bold ${15 * u}px Georgia, serif`; p.g.textAlign = 'center'; p.g.fillStyle = '#1f4a2a'; p.g.fillText(txt, x, y - 13 * u); p.g.restore(); };
export const PROP = {
  rifle: (p, x, y, u) => { p.band([[x - 6 * u, y + 30 * u], [x + 60 * u, y - 10 * u]], '#5a3a22', 6 * u, 1.4 * u); p.band([[x + 40 * u, y + 2 * u], [x + 100 * u, y - 34 * u]], '#3a3a44', 3.5 * u, 1.2 * u); p.dot(x, y, 5.5 * u); },
  bill10: bill('$10'), bill100: bill('$100'),
  cuffs: (p, x, y, u) => { p.ell(x - 8 * u, y - 10 * u, 9 * u, 9 * u, null, 3 * u); p.ell(x + 10 * u, y - 10 * u, 9 * u, 9 * u, null, 3 * u); p.dot(x, y, 5.5 * u); },
  mug: (p, x, y, u) => { p.poly([[x - 12 * u, y - 4 * u], [x + 12 * u, y - 4 * u], [x + 12 * u, y - 34 * u], [x - 12 * u, y - 34 * u]], '#c9a46a', 2.2 * u); p.ell(x, y - 34 * u, 12 * u, 4 * u, '#f4efe2', 1.6 * u); p.dot(x, y, 5.5 * u); },
  stamp: (p, x, y, u) => { p.band([[x, y], [x, y - 26 * u]], '#7a5230', 7 * u, 1.4 * u); p.poly([[x - 16 * u, y + 2 * u], [x + 16 * u, y + 2 * u], [x + 16 * u, y + 12 * u], [x - 16 * u, y + 12 * u]], '#c2453c', 1.6 * u); p.dot(x, y, 5.5 * u); },
  scope: (p, x, y, u) => { p.band([[x, y], [x + 46 * u, y - 18 * u]], '#c9a040', 8 * u, 1.6 * u); p.dot(x, y, 5.5 * u); },
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
export const drawText = (g, txt, { col = '#ffffff', font = 'bold 300px Georgia, serif', stroke = INK, lw = 22 } = {}) => {
  const w = g.canvas.width, h = g.canvas.height; g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.lineWidth = lw; g.strokeStyle = stroke; g.lineJoin = 'round'; g.strokeText(txt, w / 2, h / 2, w * 0.94); g.fillStyle = col; g.fillText(txt, w / 2, h / 2, w * 0.94);
};
/** the pig, side view on a 512 canvas. munch 0..1 = head bob; angel = halo + wings; facing -1 flips */
export const drawPig = (g, { munch = 0, angel = 0, facing = 1, col = '#3d3438' } = {}) => {
  const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); if (facing < 0) { g.translate(512, 0); g.scale(-1, 1); }
  g.lineWidth = 9; g.strokeStyle = INK; g.lineJoin = 'round';
  if (angel > 0) { g.globalAlpha = angel; g.fillStyle = '#ffffff'; for (const sx of [-1, 1]) { g.beginPath(); g.ellipse(240 + sx * 20, 230, 70, 34, -0.6 * sx - 0.4, 0, 7); g.fill(); g.stroke(); }
    g.strokeStyle = '#f2c440'; g.lineWidth = 12; g.beginPath(); g.ellipse(360, 150, 50, 14, 0, 0, 7); g.stroke(); g.lineWidth = 9; g.strokeStyle = INK; g.globalAlpha = 1; }
  g.fillStyle = col;
  for (const lx of [170, 210, 300, 340]) { g.beginPath(); g.rect(lx - 12, 320, 24, 70); g.fill(); g.stroke(); }
  g.beginPath(); g.ellipse(250, 290, 140, 85, 0, 0, 7); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(112, 270); g.bezierCurveTo(80, 250, 90, 220, 110, 235); g.stroke();
  const hy = 270 + 18 * munch; g.beginPath(); g.ellipse(370, hy, 62, 56, 0, 0, 7); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(350, hy - 50); g.lineTo(372, hy - 90); g.lineTo(392, hy - 46); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#e8a0a8'; g.beginPath(); g.ellipse(430, hy + 10, 26, 30, 0, 0, 7); g.fill(); g.stroke();
  g.fillStyle = INK; g.beginPath(); g.ellipse(425, hy + 2, 5, 8, 0, 0, 7); g.ellipse(437, hy + 16, 5, 8, 0, 0, 7); g.fill();
  if (angel > 0.5) { g.lineWidth = 6; g.beginPath(); g.arc(385, hy - 12, 10, Math.PI * 0.1, Math.PI * 0.9); g.stroke(); } else { g.fillStyle = '#ffffff'; g.beginPath(); g.arc(385, hy - 14, 10, 0, 7); g.fill(); g.fillStyle = INK; g.beginPath(); g.arc(388, hy - 14, 5, 0, 7); g.fill(); }
  g.restore(); };
/** map of the strait with the island between the two shores, 1024x1024 */
export const drawMap = (g, { usa = 0, mark = 0 } = {}) => { const s = g.canvas.width; g.save(); g.scale(s / 1024, s / 1024);
  g.fillStyle = '#efe0b8'; g.strokeStyle = INK; g.lineWidth = 14; g.beginPath(); g.rect(40, 120, 944, 784); g.fill(); g.stroke();
  g.fillStyle = '#9cc4d8'; g.fillRect(48, 128, 928, 768);
  g.fillStyle = '#b5cf8a'; g.lineWidth = 8;
  g.beginPath(); g.moveTo(48, 128); g.lineTo(380, 128); g.bezierCurveTo(330, 300, 300, 520, 240, 896); g.lineTo(48, 896); g.closePath(); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(976, 128); g.lineTo(700, 128); g.bezierCurveTo(740, 320, 820, 600, 760, 896); g.lineTo(976, 896); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = usa > 0.5 ? '#c8d8f0' : '#d9c07a'; g.beginPath(); g.moveTo(470, 420); g.bezierCurveTo(560, 360, 620, 470, 580, 560); g.bezierCurveTo(540, 640, 440, 600, 450, 520); g.closePath(); g.fill(); g.stroke();
  const flag = (x, y, us) => { g.lineWidth = 6; g.beginPath(); g.moveTo(x, y); g.lineTo(x, y - 110); g.stroke(); if (us) { for (let i = 0; i < 6; i++) { g.fillStyle = i % 2 ? '#ffffff' : '#c2453c'; g.fillRect(x, y - 110 + i * 12, 100, 12); } g.fillStyle = '#2f4a8a'; g.fillRect(x, y - 110, 44, 36); }
    else { g.fillStyle = '#2f4a8a'; g.fillRect(x, y - 110, 100, 70); g.strokeStyle = '#ffffff'; g.lineWidth = 12; g.beginPath(); g.moveTo(x, y - 110); g.lineTo(x + 100, y - 40); g.moveTo(x + 100, y - 110); g.lineTo(x, y - 40); g.moveTo(x + 50, y - 110); g.lineTo(x + 50, y - 40); g.moveTo(x, y - 75); g.lineTo(x + 100, y - 75); g.stroke(); g.strokeStyle = '#c2453c'; g.lineWidth = 6; g.stroke(); g.strokeStyle = INK; }
    g.lineWidth = 6; g.strokeRect(x, y - 110, 100, us ? 72 : 70); };
  flag(820, 760, true); flag(110, 400, false);
  if (mark > 0) { g.globalAlpha = mark; g.strokeStyle = '#e2453c'; g.lineWidth = 12; g.beginPath(); g.ellipse(520, 490, 130, 120, 0, 0, 7); g.stroke(); g.globalAlpha = 1; }
  if (usa > 0) { g.globalAlpha = usa; flag(500, 520, true); g.globalAlpha = 1; }
  g.restore(); };
/** a running horse, side view 512 */
export const drawHorse = (g, ph = 0, col = '#8a5a34') => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); g.lineWidth = 8; g.strokeStyle = INK; g.fillStyle = col;
  const a = Math.sin(ph * Math.PI * 2) * 0.5;
  for (const [x, k] of [[170, 1], [200, -1], [320, -1], [350, 1]]) { g.save(); g.translate(x, 300); g.rotate(a * k); g.beginPath(); g.rect(-11, 0, 22, 110); g.fill(); g.stroke(); g.restore(); }
  g.beginPath(); g.ellipse(260, 280, 130, 60, 0, 0, 7); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(360, 250); g.lineTo(420, 150); g.lineTo(470, 170); g.lineTo(420, 270); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#2a1a12'; g.beginPath(); g.moveTo(380, 230); g.lineTo(415, 150); g.lineTo(400, 145); g.lineTo(360, 230); g.fill();
  g.beginPath(); g.moveTo(130, 270); g.quadraticCurveTo(70, 280, 80, 340); g.lineWidth = 16; g.strokeStyle = '#2a1a12'; g.stroke();
  g.fillStyle = INK; g.beginPath(); g.arc(440, 175, 6, 0, 7); g.fill(); g.restore(); };
/** pages of a wall calendar flipping, 512: year shown */
export const drawCalendar = (g, year) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); g.fillStyle = '#f4f1ea'; g.strokeStyle = INK; g.lineWidth = 10; g.beginPath(); g.rect(96, 80, 320, 360); g.fill(); g.stroke();
  g.fillStyle = '#c2453c'; g.fillRect(96, 80, 320, 90); g.strokeRect(96, 80, 320, 90); g.fillStyle = '#ffffff'; g.font = 'bold 70px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('YEAR', 256, 126);
  g.fillStyle = INK; g.font = 'bold 130px Georgia, serif'; g.fillText(String(year), 256, 320); g.restore(); };
/** comic BANG! burst text */
export const drawBang = (g, txt = 'BANG!') => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); g.fillStyle = '#ffe066'; g.strokeStyle = INK; g.lineWidth = 10; g.beginPath();
  for (let i = 0; i < 22; i++) { const a = i / 22 * Math.PI * 2, r = i % 2 ? 140 : 235; g.lineTo(256 + r * Math.cos(a), 256 + r * 0.66 * Math.sin(a)); } g.closePath(); g.fill(); g.stroke();
  g.font = 'bold 120px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineWidth = 14; g.strokeText(txt, 256, 262); g.fillStyle = '#c2453c'; g.fillText(txt, 256, 262); g.restore(); };
/** document with a red seal, 512 */
export const drawDecree = (g, seal = 0) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); g.fillStyle = '#efe0b8'; g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.rect(110, 60, 292, 392); g.fill(); g.stroke();
  g.strokeStyle = '#8a7a5a'; g.lineWidth = 6; for (let i = 0; i < 8; i++) { g.beginPath(); g.moveTo(140, 110 + i * 30); g.lineTo(372 - (i % 3) * 30, 110 + i * 30); g.stroke(); }
  if (seal > 0) { g.globalAlpha = seal; g.fillStyle = '#c2453c'; g.beginPath(); g.arc(330, 380, 46, 0, 7); g.fill(); g.strokeStyle = INK; g.lineWidth = 6; g.stroke(); g.globalAlpha = 1; }
  g.restore(); };
