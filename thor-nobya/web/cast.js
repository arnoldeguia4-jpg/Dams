// Cast for "Ang Diyos na Nagnobya" (Þrymskviða, Poetic Edda): Thor, Thor-as-bride, Loki, Freyja, the giant Thrym; props and fx.
import { Pen, bodyFront, INK, fxBurst, fxPuff, fxStars } from './toonbase.js';
export { Pen, INK, fxBurst, fxPuff, fxStars };

const RED = '#c8562a';
/** big red beard over the lower face (drawn after the face) */
export const beard = (col = RED) => (p, h) => { const { cx, crown, HH, W, u } = h;
  p.poly([[cx - 0.47 * W, crown + 0.58 * HH], [cx - 0.42 * W, crown + 0.9 * HH], [cx - 0.2 * W, crown + 1.1 * HH], [cx, crown + 1.18 * HH], [cx + 0.2 * W, crown + 1.1 * HH], [cx + 0.42 * W, crown + 0.9 * HH], [cx + 0.47 * W, crown + 0.58 * HH],
    [cx + 0.32 * W, crown + 0.8 * HH], [cx + 0.14 * W, crown + 0.9 * HH], [cx - 0.14 * W, crown + 0.9 * HH], [cx - 0.32 * W, crown + 0.8 * HH]], col, 2.4 * u); };
export const helmetBand = (p, h) => { const { cx, crown, HH, W, u } = h; p.band([[cx - 0.46 * W, crown + 0.24 * HH], [cx + 0.46 * W, crown + 0.24 * HH]], '#9aa3a8', 0.08 * HH, 1.6 * u); };
/** bridal veil: translucent white over the head and face down to the beard, flower crown on top */
export const veil = (p, h) => { const { cx, crown, HH, W, u } = h;
  p.poly([[cx - 0.5 * W, crown + 0.18 * HH], [cx - 0.6 * W, crown + 0.78 * HH], [cx + 0.6 * W, crown + 0.78 * HH], [cx + 0.5 * W, crown + 0.18 * HH], [cx, crown - 0.04 * HH]], 'rgba(250,248,255,0.5)', 2 * u);
  for (let i = -3; i <= 3; i++) p.ell(cx + i * 0.14 * W, crown + 0.08 * HH - Math.abs(i) * 0.012 * HH, 0.07 * W, 0.05 * HH, ['#f4c2d0', '#fff3b0', '#f4f1ea'][(i + 3) % 3], 1.4 * u); };
export const necklace = (p, c) => { const { tcx, chin, HH, u } = c; p.arc(tcx, chin + 0.02 * HH, 30 * u, 22 * u, 20, 160, 3 * u, '#f2c440'); for (let i = 0; i < 5; i++) { const a = (30 + i * 30) * Math.PI / 180; p.dot(tcx + 30 * u * Math.cos(a), chin + 0.02 * HH + 22 * u * Math.sin(a), 4.5 * u, '#f2c440'); } };
const lokiHorns = (p, h) => { const { cx, crown, HH, W, u } = h; for (const s of [-1, 1]) p.poly([[cx + s * 0.26 * W, crown + 0.12 * HH], [cx + s * 0.42 * W, crown - 0.22 * HH], [cx + s * 0.36 * W, crown + 0.18 * HH]], '#3f8a42', 2 * u); };
const braid = (col) => (p, h) => { const { cx, crown, HH, W, u } = h; for (const s of [-1, 1]) p.band([[cx + s * 0.44 * W, crown + 0.4 * HH], [cx + s * 0.5 * W, crown + 1.15 * HH]], col, 0.09 * HH, 1.6 * u, 'round'); };
const flowerCrown = (p, h) => { const { cx, crown, HH, W, u } = h; for (let i = -3; i <= 3; i++) p.ell(cx + i * 0.13 * W, crown + 0.1 * HH - Math.abs(i) * 0.015 * HH, 0.065 * W, 0.05 * HH, ['#f2c440', '#e88aa8', '#f4f1ea'][(i + 3) % 3], 1.4 * u); };
const giantBrow = (p, h) => { const { cx, crown, HH, W, u } = h; p.band([[cx - 0.4 * W, crown + 0.04 * HH], [cx + 0.4 * W, crown + 0.04 * HH]], '#6a6a72', 0.12 * HH, 1.6 * u); for (const s of [-1, 1]) p.poly([[cx + s * 0.2 * W, crown + 0.02 * HH], [cx + s * 0.3 * W, crown - 0.2 * HH], [cx + s * 0.38 * W, crown + 0.02 * HH]], '#e9dcb0', 2 * u); };
const fur = (col) => (p, c) => { const { tcx, chin, HH, u } = c; p.band([[tcx - 34 * u, chin + 0.06 * HH], [tcx + 34 * u, chin + 0.06 * HH]], col, 0.12 * HH, 1.6 * u, 'round'); };
const belt = (p, c) => { const { tcx, chin, HH, u } = c; p.band([[tcx - 36 * u, chin + 0.62 * HH], [tcx + 36 * u, chin + 0.62 * HH]], '#5a3a22', 0.07 * HH, 1.4 * u); p.ell(tcx, chin + 0.62 * HH, 7 * u, 6 * u, '#f2c440', 1.4 * u); };

export const OUT = {
  thor: { id: 'thor', o: { jacket: '#3a5a9a', pants: '#5a4030', boots: '#4a3020', hat: 'hair', hair: RED, skin: '#f2c49a', build: 'stout', moustache: RED, buttons: '#c8a040' }, extra: (p, c) => { fur('#8a6a4a')(p, c); belt(p, c); }, head: (p, h) => { beard()(p, h); helmetBand(p, h); }, seed: 3 },
  thorPJ: { id: 'thorPJ', o: { jacket: '#9a8a70', pants: '#7a6a52', boots: '#f2c49a', hat: 'hair', hair: RED, skin: '#f2c49a', build: 'stout', moustache: RED, buttons: '#7a6a52' }, head: beard(), seed: 3 },
  bride: { id: 'bride', o: { jacket: '#f4f1ea', pants: '#f4f1ea', boots: '#4a3020', hat: 'hair', hair: RED, skin: '#f2c49a', build: 'stout', moustache: RED, dress: '#f4f1ea', buttons: '#f2c440' }, extra: necklace, head: (p, h) => { beard()(p, h); veil(p, h); }, seed: 3 },
  brideBare: { id: 'brideBare', o: { jacket: '#f4f1ea', pants: '#f4f1ea', boots: '#4a3020', hat: 'hair', hair: RED, skin: '#f2c49a', build: 'stout', moustache: RED, dress: '#f4f1ea', buttons: '#f2c440' }, extra: necklace, head: (p, h) => { beard()(p, h); helmetBand(p, h); }, seed: 3 },
  loki: { id: 'loki', o: { jacket: '#2f7a4a', pants: '#2a2a30', boots: '#2a2a30', hat: 'hair', hair: '#1d1414', skin: '#f5d6b4', buttons: '#f2c440' }, head: lokiHorns, seed: 9 },
  lokiMaid: { id: 'lokiMaid', o: { jacket: '#e88aa8', pants: '#e88aa8', boots: '#2a2a30', hat: 'hair', hair: '#1d1414', skin: '#f5d6b4', dress: '#e88aa8', buttons: '#f4f1ea' }, head: (p, h) => { lokiHorns(p, h); flowerCrown(p, h); }, seed: 9 },
  freyja: { id: 'freyja', o: { jacket: '#c2453c', pants: '#c2453c', boots: '#6a4a32', hat: 'hair', hair: '#f2d27a', skin: '#ffe2c2', dress: '#c2453c', buttons: '#f2c440' }, extra: necklace, head: (p, h) => { braid('#f2d27a')(p, h); flowerCrown(p, h); }, seed: 15 },
  heimdall: { id: 'heimdall', o: { jacket: '#e9e2d4', pants: '#5a5a6a', boots: '#3a2a22', hat: 'hair', hair: '#f2e6c0', skin: '#e9c8a0', buttons: '#f2c440' }, head: helmetBand, seed: 21 },
  thrym: { id: 'thrym', o: { jacket: '#5a4a3a', pants: '#3a3a44', boots: '#2a2020', hat: 'hair', hair: '#3a3a44', skin: '#8aa0b4', build: 'stout', buttons: '#9aa3a8', moustache: '#3a3a44' }, extra: (p, c) => { fur('#7a6a5a')(p, c); belt(p, c); }, head: giantBrow, seed: 27 },
  g1: { id: 'g1', o: { jacket: '#6a5a44', pants: '#3a3a44', boots: '#2a2020', hat: 'hair', hair: '#5a4a3a', skin: '#9ab0a0', build: 'stout', buttons: '#9aa3a8' }, head: giantBrow, seed: 33 },
  g2: { id: 'g2', o: { jacket: '#4a5a6a', pants: '#3a3a44', boots: '#2a2020', hat: 'hair', hair: '#2a2a30', skin: '#a0a0b8', build: 'stout', buttons: '#9aa3a8' }, head: giantBrow, seed: 39 },
};

export const ARM = {
  hang: [14, 45, 17, 86], up: [16, -28, 22, -82], point: [32, -2, 64, -14], hip: [28, 28, 6, 52], cross: [22, 30, -14, 22],
  shrug: [30, 14, 44, -12], hold: [18, 42, -6, 52, true], holdHi: [20, 30, -4, 20, true], chin: [18, 42, -14, -4, true],
  reach: [30, 20, 58, 30, true], lift: [22, 4, 10, -40, true], cheer: [20, -30, 34, -80], wave: [22, -20, 34, -66],
  eat: [22, 30, -10, -2, true], lap: [24, 44, -4, 62, true], raise: [22, -24, 16, -70, true], whisper: [20, 30, -12, 6, true],
};

/** Mjolnir: short-handled square hammer head */
const hammer = (p, x, y, u, big = 1) => { const k = u * big; p.band([[x, y + 12 * k], [x, y - 26 * k]], '#7a5230', 7 * k, 1.6 * k); p.poly([[x - 24 * k, y - 26 * k], [x + 24 * k, y - 26 * k], [x + 28 * k, y - 30 * k], [x + 28 * k, y - 62 * k], [x + 24 * k, y - 66 * k], [x - 24 * k, y - 66 * k], [x - 28 * k, y - 62 * k], [x - 28 * k, y - 30 * k]], '#6a727a', 2.4 * k); p.poly([[x - 28 * k, y - 40 * k], [x + 28 * k, y - 40 * k], [x + 28 * k, y - 52 * k], [x - 28 * k, y - 52 * k]], '#c9a040', 1.6 * k); p.dot(x, y, 5.5 * u); };
export const PROP = {
  hammer: (p, x, y, u) => hammer(p, x, y, u, 1),
  hammerBig: (p, x, y, u) => hammer(p, x, y, u, 1.5),
  leg: (p, x, y, u) => { p.ell(x, y - 18 * u, 18 * u, 26 * u, '#a8542a', 2.4 * u); p.band([[x, y - 40 * u], [x, y - 58 * u]], '#f4efe2', 6 * u, 1.4 * u, 'round'); p.dot(x, y, 5.5 * u); },
  fish: (p, x, y, u) => { p.ell(x, y - 16 * u, 10 * u, 22 * u, '#e88a6a', 2.2 * u); p.poly([[x, y - 36 * u], [x - 9 * u, y - 48 * u], [x + 9 * u, y - 48 * u]], '#e88a6a', 2 * u); p.dot(x, y, 5.5 * u); },
  mug: (p, x, y, u) => { p.poly([[x - 12 * u, y - 4 * u], [x + 12 * u, y - 4 * u], [x + 12 * u, y - 34 * u], [x - 12 * u, y - 34 * u]], '#8a5a34', 2.2 * u); p.ell(x, y - 34 * u, 12 * u, 4 * u, '#f4efe2', 1.6 * u); p.dot(x, y, 5.5 * u); },
  flower: (p, x, y, u) => { p.band([[x, y], [x, y - 30 * u]], '#3f8a42', 3 * u, 1 * u); p.ell(x, y - 34 * u, 9 * u, 9 * u, '#e88aa8', 1.6 * u); p.dot(x, y, 5.5 * u); },
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
/** burning eyes peeking through the veil (overlay on the bride's face) */
export const eyesFire = (p, h) => { const { cx, crown, HH, W, u } = h; for (const s of [-1, 1]) { const x = cx + s * 0.17 * W, y = crown + 0.5 * HH; p.ell(x, y - 8 * u, 16 * u, 22 * u, '#ff7a30', 0); p.ell(x, y - 4 * u, 9 * u, 13 * u, '#fff0a0', 0); } };

// ---------------- fx ----------------
export const glow = (g, rgb = '255,236,170', a = 0.8) => { const s = g.canvas.width, gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2); gr.addColorStop(0, `rgba(${rgb},${a})`); gr.addColorStop(0.4, `rgba(${rgb},${a * 0.45})`); gr.addColorStop(1, `rgba(${rgb},0)`); g.fillStyle = gr; g.fillRect(0, 0, s, s); };
export const drawText = (g, txt, { col = '#ffffff', font = 'bold 300px Georgia, serif', stroke = INK, lw = 22 } = {}) => {
  const w = g.canvas.width, h = g.canvas.height; g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.lineWidth = lw; g.strokeStyle = stroke; g.lineJoin = 'round'; g.strokeText(txt, w / 2, h / 2); g.fillStyle = col; g.fillText(txt, w / 2, h / 2);
};
/** lightning bolt, 512 */
export const drawBolt = (g, a = 1) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); g.fillStyle = `rgba(255,245,180,${a})`; g.strokeStyle = `rgba(36,23,38,${a})`; g.lineWidth = 8;
  g.beginPath(); g.moveTo(280, 20); g.lineTo(190, 250); g.lineTo(260, 250); g.lineTo(200, 492); g.lineTo(340, 200); g.lineTo(270, 200); g.lineTo(330, 20); g.closePath(); g.fill(); g.stroke(); g.restore(); };
/** an old rune scroll (no readable text: rune-like strokes), 512 */
export const drawScroll = (g) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512);
  g.fillStyle = '#efe0b8'; g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.rect(96, 70, 320, 380); g.fill(); g.stroke();
  for (const y of [70, 450]) { g.fillStyle = '#c9a46a'; g.beginPath(); g.ellipse(256, y, 180, 22, 0, 0, 7); g.fill(); g.stroke(); }
  g.strokeStyle = '#6a4a2a'; g.lineWidth = 6; let r = 1;
  for (let row = 0; row < 7; row++) for (let k = 0; k < 7; k++) { r = (r * 9301 + 49297) % 233280; const x = 130 + k * 38, y = 120 + row * 46, t = r % 4; g.beginPath(); g.moveTo(x, y); g.lineTo(x, y + 30); if (t === 0) { g.moveTo(x, y); g.lineTo(x + 14, y + 10); } else if (t === 1) { g.moveTo(x, y + 8); g.lineTo(x + 14, y); g.moveTo(x, y + 18); g.lineTo(x + 14, y + 10); } else if (t === 2) { g.moveTo(x - 8, y + 8); g.lineTo(x + 8, y + 22); } else { g.moveTo(x, y + 15); g.lineTo(x + 12, y + 30); } g.stroke(); }
  g.restore(); };
/** roast ox on a platter: n 0..1 eaten (1 = bones), 512 */
export const drawOx = (g, eaten = 0) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512);
  g.fillStyle = '#c9ccd0'; g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.ellipse(256, 360, 230, 70, 0, 0, 7); g.fill(); g.stroke();
  if (eaten < 0.95) { const k = 1 - eaten; g.fillStyle = '#a8542a'; g.beginPath(); g.ellipse(256, 300 + 40 * eaten, 170 * Math.max(0.25, k), 95 * Math.max(0.25, k), 0, 0, 7); g.fill(); g.stroke();
    g.fillStyle = 'rgba(255,220,160,0.5)'; g.beginPath(); g.ellipse(220, 270 + 40 * eaten, 60 * k, 22 * k, -0.3, 0, 7); g.fill(); }
  g.strokeStyle = '#f4efe2'; g.lineWidth = 14; g.lineCap = 'round';
  for (const [x0, y0, x1, y1] of [[150, 330, 210, 250], [362, 330, 302, 250], [210, 345, 300, 345]]) if (eaten > 0.6) { g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); }
  g.restore(); };
/** a row of salmon on a board, n left (0..8), 512 */
export const drawFish = (g, n = 8) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512);
  g.fillStyle = '#8a5a34'; g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.rect(40, 280, 432, 70); g.fill(); g.stroke();
  for (let i = 0; i < 8; i++) { const x = 70 + i * 53; if (i < n) { g.fillStyle = '#e88a6a'; g.beginPath(); g.ellipse(x, 245, 20, 48, 0, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.moveTo(x, 290); g.lineTo(x - 16, 308); g.lineTo(x + 16, 308); g.closePath(); g.fill(); g.stroke(); }
    else { g.strokeStyle = '#f4efe2'; g.lineWidth = 6; g.beginPath(); g.moveTo(x, 205); g.lineTo(x, 290); for (let k = 0; k < 4; k++) { g.moveTo(x - 12, 220 + k * 18); g.lineTo(x + 12, 220 + k * 18); } g.stroke(); g.strokeStyle = INK; g.lineWidth = 8; } }
  g.restore(); };
/** idea light bulb, 256 */
export const drawBulb = (g) => { const s = g.canvas.width; g.save(); g.scale(s / 256, s / 256); g.fillStyle = '#fff3b0'; g.strokeStyle = INK; g.lineWidth = 8;
  g.beginPath(); g.arc(128, 100, 60, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#9aa3a8'; g.beginPath(); g.rect(100, 160, 56, 40); g.fill(); g.stroke(); g.restore(); };
