// Cast for "Bakit Mataas ang Langit" (Bagobo legend): outfits, props, effect drawings (comb-moon, bead-stars).
import { Pen, bodyFront, INK, SKINS, mix, shade, fxBurst, fxPuff, fxStars } from './toonbase.js';
export { Pen, INK, fxBurst, fxPuff, fxStars };

const BROWN = '#c48a5e', BROWN2 = '#b07a52', BROWN3 = '#d29c6e';
export const COMB = '#e9c46a', BEADS = ['#f4f1ea', '#e2453c', '#f2c440', '#2f5fa8', '#f4f1ea', '#1d1a1a'];

// hand-drawn comb (suklay): a rounded spine with teeth, centred at x,y, width w
export const comb = (p, x, y, w, col = COMB, lw = 3) => {
  const h = w * 0.42, sp = h * 0.38;
  p.poly([[x - w / 2, y - h / 2 + sp * 0.3], [x - w * 0.42, y - h / 2], [x + w * 0.42, y - h / 2], [x + w / 2, y - h / 2 + sp * 0.3], [x + w / 2, y - h / 2 + sp], [x - w / 2, y - h / 2 + sp]], col, lw);
  const n = 9;
  for (let i = 0; i < n; i++) {
    const tx = x - w / 2 + w * (i + 0.5) / n, tw = w / n * 0.55;
    p.poly([[tx - tw / 2, y - h / 2 + sp], [tx + tw / 2, y - h / 2 + sp], [tx + tw / 2 * 0.7, y + h / 2], [tx - tw / 2 * 0.7, y + h / 2]], col, lw * 0.8);
  }
  for (let i = 0; i < 3; i++) p.dot(x - w * 0.2 + i * w * 0.2, y - h / 2 + sp * 0.55, lw * 0.9, '#c2453c');
};
// bead string (kuwintas): an arc of round beads
export const beads = (p, x, y, w, open = 0.5, lw = 2.4) => {
  const n = 15;
  for (let i = 0; i < n; i++) {
    const a = Math.PI * (0.5 - open / 2 + open * i / (n - 1));
    const bx = x + (w / 2) * Math.cos(a) * (i % 2 ? 1 : 1), by = y + (w / 2) * Math.sin(a) * 0.85;
    p.ell(x + (bx - x), by, w * 0.055, w * 0.055, BEADS[i % BEADS.length], lw);
  }
};

// Bagobo-inspired blouse beadwork + skirt bands (respectful, simplified)
const beadwork = (necklace) => (p, c) => {
  const { tcx, chin, HH, u } = c;
  for (let r = 0; r < 2; r++) for (let i = -4; i <= 4; i++) p.dot(tcx + i * 6 * u, chin + (0.2 + r * 0.06) * HH, 1.7 * u, r ? '#f2c440' : '#f4f1ea');
  p.stroke([[tcx - 20 * u, chin + 0.62 * HH], [tcx + 20 * u, chin + 0.62 * HH]], 2.2 * u, '#f2c440');
  if (necklace) for (let i = 0; i < 11; i++) { const a = Math.PI * (0.12 + 0.76 * i / 10); p.ell(tcx + 15 * u * Math.cos(a), chin + 2 * u + 9 * u * Math.sin(a), 2.6 * u, 2.6 * u, BEADS[i % BEADS.length], 1.1 * u); }
};
const bun = (withComb) => (p, h) => {
  const { cx, crown, HH, W, u } = h;
  p.ell(cx + 0.02 * W, crown + 0.02 * HH, 0.2 * W, 0.13 * HH, '#1d1414', 3 * u);
  if (withComb) comb(p, cx + 0.04 * W, crown - 0.07 * HH, 0.3 * W, COMB, 2.2 * u);
};
const headband = (col) => (p, h) => { const { cx, crown, HH, W, u } = h; p.band([[cx - 0.42 * W, crown + 0.2 * HH], [cx + 0.42 * W, crown + 0.2 * HH]], col, 0.06 * HH, 1.4 * u); };

const TUG = { jacket: '#7a2420', pants: '#3a2a2a', boots: '#6a4a32', hat: 'hair', hair: '#1d1414', skin: BROWN, dress: '#3a2230', buttons: '#f2c440' };
export const OUT = {
  tug: { id: 'tug', o: TUG, extra: beadwork(true), head: bun(true), seed: 5 },
  tugMid: { id: 'tugMid', o: TUG, extra: beadwork(false), head: bun(true), seed: 5 },
  tugBare: { id: 'tugBare', o: TUG, extra: beadwork(false), head: bun(false), seed: 5 },
  vil1: { o: { jacket: '#c9a45a', pants: '#4a3426', boots: '#6a4a32', hat: 'hair', hair: '#1d1414', skin: BROWN2, buttons: '#7a2420' }, head: headband('#b0283a'), seed: 11 },
  vil2: { o: { jacket: '#2f4a5a', pants: '#3a2a2a', boots: '#6a4a32', hat: 'hair', hair: '#241a16', skin: BROWN3, dress: '#7a3a2a', buttons: '#f4f1ea' }, extra: beadwork(false), seed: 17 },
  kid: { o: { jacket: '#d9a441', pants: '#5a3a2a', boots: '#6a4a32', hat: 'hair', hair: '#1d1414', skin: BROWN, build: 'kid', buttons: '#7a2420' }, seed: 31 },
};

// arm poses: [elbow dx, elbow dy, hand dx, hand dy, front?] in u from the shoulder, x mirrored per side
export const ARM = {
  hang: [14, 45, 17, 86], up: [16, -28, 22, -82], point: [32, -2, 64, -14], hip: [28, 28, 6, 52],
  shrug: [30, 14, 44, -12], hold: [18, 42, -6, 52, true], holdHi: [20, 30, -4, 20, true], chin: [18, 42, -14, -4, true],
  reach: [30, 20, 58, 30, true], lift: [22, 4, 10, -40, true], cheer: [20, -30, 34, -80], wave: [22, -20, 34, -66],
  // pestle grips: both hands near the body centre at different heights
  // R = hand outward on the right; L crosses the body so both hands meet on the right side
  gripLo: [32, 36, 28, 44, true], gripMid: [34, 18, 30, 10, true], gripHi: [30, -8, 28, -30, true], gripTop: [24, -34, 24, -72, true],
  xgripLo: [30, 34, -68, 34, true], xgripMid: [30, 14, -70, 0, true], xgripHi: [26, -10, -68, -40, true], xgripTop: [20, -36, -62, -82, true],
  pray: [24, 30, -18, 6, true], touchUp: [26, -32, 30, -92], rub: [24, -10, -8, -52, true],
};
export const gripArms = (t, left = false) => { // t: 0 low .. 3 top, interpolated
  const K = left ? [ARM.xgripLo, ARM.xgripMid, ARM.xgripHi, ARM.xgripTop] : [ARM.gripLo, ARM.gripMid, ARM.gripHi, ARM.gripTop], i = Math.max(0, Math.min(2, Math.floor(t))), u = Math.max(0, Math.min(1, t - i));
  return K[i].map((v, k) => (k < 4 ? Math.round(v + (K[i + 1][k] - v) * u) : true));
};

// ---------------- props held in the hand ----------------
export const PROP = {
  comb: (p, x, y, u) => { comb(p, x, y - 10 * u, 34 * u, COMB, 2 * u); p.dot(x, y, 5.5 * u); },
  beads: (p, x, y, u) => { beads(p, x, y + 4 * u, 40 * u, 1.0, 1.4 * u); p.dot(x, y, 5.5 * u); },
  none: () => {},
};

/** draw a character card (600 x 1000 design units); records hand positions into HANDS[s.hid] */
export const HANDS = {};
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
      if (s.hid) HANDS[s.hid] = { L: h.L && [s.flipX ? 600 - h.L[0] : h.L[0], h.L[1]], R: h.R && [s.flipX ? 600 - h.R[0] : h.R[0], h.R[1]] };
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
const glow = (g, cx, cy, r, rgb, a) => { const gr = g.createRadialGradient(cx, cy, 0, cx, cy, r); gr.addColorStop(0, `rgba(${rgb},${a})`); gr.addColorStop(0.45, `rgba(${rgb},${a * 0.4})`); gr.addColorStop(1, `rgba(${rgb},0)`); g.fillStyle = gr; g.fillRect(cx - r, cy - r, 2 * r, 2 * r); };
/** the moon that is a comb, on a 512 canvas. k 0..1 = how much the comb shape reads (teeth + gold) vs plain pale moon */
export const drawMoonComb = (g, { k = 1, glowA = 0.8 } = {}) => {
  const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512);
  glow(g, 256, 256, 250, '255,244,200', glowA);
  const p = new Pen(g), col = mix('#f6f0d8', '#f2d27a', k);
  comb(p, 256, 262, 300, col, 7);
  g.restore();
};
/** bead-stars on a 1024 canvas: beads twinkle; tw 0..1 extra brightness, seed */
export const drawStars = (g, { t = 0, tw = 0, seed = 3, n = 46 } = {}) => {
  const s = g.canvas.width; g.save(); g.scale(s / 1024, s / 1024);
  const p = new Pen(g);
  for (let i = 0; i < n; i++) {
    const r1 = Math.abs(Math.sin(i * 12.9898 + seed) * 43758.5453) % 1, r2 = Math.abs(Math.sin(i * 78.233 + seed) * 12345.678) % 1;
    const x = 20 + r1 * 984, y = 20 + r2 * 984, b = 0.55 + 0.45 * Math.sin(t * 3 + i * 1.7), r = (2.2 + 1.4 * (i % 3)) * (1 + 0.7 * tw);
    glow(g, x, y, r * 3.2, '255,245,210', 0.3 * b + 0.4 * tw);
    p.ell(x, y, r, r, BEADS[i % 4 === 3 ? 0 : i % 4], 0.8);
  }
  g.restore();
};
export const drawDots = (g) => { const p = new Pen(g), s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); for (let i = 0; i < 3; i++) p.ell(150 + i * 106, 256, 30, 30, '#ffffff', 10); g.restore(); };
