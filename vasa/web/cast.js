// Cast for "The Messy Desk That Saved Millions": outfits, props, effect drawings, the petri dish surface.
import { Pen, bodyFront, INK, SKIN, SKINS, KID, PARENT, townsfolk, mix, shade, fxBurst, fxPuff, fxStars, fxSplash } from './toonbase.js';
export { Pen, INK, fxBurst, fxPuff, fxStars };

const COAT = '#f1eee4';
const labcoat = (tie = '#b0283a') => (p, c) => {
  const { tcx, chin, HH, u } = c;
  p.poly([[tcx - 11 * u, chin + 1 * u], [tcx, chin + 0.36 * HH], [tcx + 11 * u, chin + 1 * u]], '#dfe6ee', 2 * u);
  p.stroke([[tcx - 15 * u, chin + 2 * u], [tcx - 2 * u, chin + 0.5 * HH]], 2.6 * u);
  p.stroke([[tcx + 15 * u, chin + 2 * u], [tcx + 2 * u, chin + 0.5 * HH]], 2.6 * u);
  const y = chin + 5 * u;
  if (tie) {
    p.poly([[tcx, y], [tcx - 10 * u, y - 5 * u], [tcx - 10 * u, y + 5 * u]], tie, 1.8 * u);
    p.poly([[tcx, y], [tcx + 10 * u, y - 5 * u], [tcx + 10 * u, y + 5 * u]], tie, 1.8 * u);
    p.dot(tcx, y, 3 * u, tie); p.ell(tcx, y, 3 * u, 3 * u, null, 1.5 * u);
  }
  p.poly([[tcx + 12 * u, chin + 0.62 * HH], [tcx + 26 * u, chin + 0.62 * HH], [tcx + 26 * u, chin + 0.74 * HH], [tcx + 12 * u, chin + 0.74 * HH]], null, 2 * u);
  p.stroke([[tcx + 16 * u, chin + 0.62 * HH], [tcx + 16 * u, chin + 0.55 * HH]], 2.2 * u, '#3060b0');
};
const medal = (p, c) => {
  const { tcx, chin, HH, u } = c;
  p.stroke([[tcx - 14 * u, chin], [tcx, chin + 0.42 * HH], [tcx + 14 * u, chin]], 4 * u, '#2d58b8');
  p.ell(tcx, chin + 0.48 * HH, 9 * u, 9 * u, '#f2c440', 2.2 * u);
  p.ell(tcx, chin + 0.48 * HH, 5 * u, 5 * u, null, 1.4 * u);
};
const glasses = (p, h) => {
  const { cx, hc, u, facing } = h, fx = cx + 7 * u * facing;
  for (const s of [-1, 1]) p.ell(fx + s * 13 * u, hc, 10 * u, 9 * u, null, 2.4 * u);
  p.stroke([[fx - 3 * u, hc - 1 * u], [fx + 3 * u, hc - 1 * u]], 2.2 * u);
};
const boater = (p, h) => {
  const { cx, crown, HH, W, u } = h, y = crown + 0.2 * HH;
  p.poly([[cx - 0.3 * W, y], [cx - 0.28 * W, y - 0.24 * HH], [cx + 0.28 * W, y - 0.24 * HH], [cx + 0.3 * W, y]], '#e8cf86', 4 * u);
  p.band([[cx - 0.29 * W, y - 0.07 * HH], [cx + 0.29 * W, y - 0.07 * HH]], '#2b3b7a', 0.06 * HH, 1.2 * u);
  p.ell(cx, y + 1 * u, 0.5 * W, 0.06 * HH, '#e2c477', 4 * u);
};

const featherHat = (p, h) => {
  const { cx, crown, HH, W, u } = h, y = crown + 0.22 * HH;
  p.poly([[cx - 0.26 * W, y], [cx - 0.2 * W, y - 0.24 * HH], [cx + 0.2 * W, y - 0.24 * HH], [cx + 0.26 * W, y]], '#1f1d24', 4 * u);
  p.ell(cx, y + 1 * u, 0.6 * W, 0.06 * HH, '#1f1d24', 4 * u);
  p.band([[cx - 0.24 * W, y - 0.05 * HH], [cx + 0.24 * W, y - 0.05 * HH]], '#c9a040', 0.05 * HH, 1 * u);
  const fx = cx + 0.18 * W, fy = y - 0.2 * HH; p.poly([[fx, fy], [fx + 0.35 * W, fy - 0.35 * HH], [fx + 0.42 * W, fy - 0.28 * HH], [fx + 0.08 * W, fy + 0.04 * HH]], '#f4f1ea', 3 * u);
};
const ruff = (p, c) => { const { tcx, chin, u } = c; for (let i = -3; i <= 3; i++) p.ell(tcx + i * 6 * u, chin + 2 * u, 5 * u, 4 * u, '#f6f2e8', 1.4 * u); };
const stripes = (col) => (p, c) => { const { tcx, chin, HH, u } = c; for (let i = 1; i < 5; i++) p.stroke([[tcx - 30 * u, chin + i * 0.17 * HH], [tcx + 30 * u, chin + i * 0.17 * HH]], 3.2 * u, col); };
const apron = (p, c) => { const { tcx, chin, HH, u } = c; p.poly([[tcx - 22 * u, chin + 0.3 * HH], [tcx + 22 * u, chin + 0.3 * HH], [tcx + 26 * u, chin + 1.0 * HH], [tcx - 26 * u, chin + 1.0 * HH]], '#c9a46a', 2.2 * u); };
export const OUT = {
  admiral: { o: { jacket: '#2b3b6a', pants: '#2a2a34', boots: '#1d1a1a', hat: 'hair', hair: '#6a4a30', moustache: '#6a4a30', skin: SKIN, buttons: '#e8c45a', build: 'stout' }, extra: ruff, head: featherHat, seed: 5 },
  sailor: (v) => ({ o: { jacket: '#efe9dc', pants: ['#4a5a7a', '#6a5038', '#3b3f52'][v % 3], boots: '#3a2a20', hat: 'cap', cap: ['#c0353a', '#3f6fb5', '#5d7a3a'][v % 3], skin: SKINS[v % 4] }, extra: stripes('#3f6fb5'), seed: 30 + v }),
  wright: { o: { jacket: '#8a6a44', pants: '#5a4a3a', boots: '#3a2a20', hat: 'hair', hair: '#c9b08a', skin: SKINS[1], buttons: '#5a3a22' }, extra: apron, seed: 15 },
  enemy: { o: { jacket: '#c0353a', pants: '#3b3f52', boots: '#2a2220', hat: 'cap', cap: '#2a2a34', skin: SKINS[2] }, seed: 19 },
  tourist: (v) => ({ o: { jacket: ['#e2453c', '#3fa0c5', '#f2c440', '#5d9a3a', '#c25a7a'][v % 5], pants: ['#3b5b9a', '#4a4038', '#2c2c36'][v % 3], boots: '#f4f1ea', hat: 'hair', hair: ['#2a201a', '#a8622e', '#e0c070', '#5a3b2a'][v % 4], skin: SKINS[v % 4] }, seed: 60 + v }),
};
export const crowd = (v) => ({ o: townsfolk(v), seed: 40 + v });

// arm poses: [elbow dx, elbow dy, hand dx, hand dy, front?] in u from the shoulder, x mirrored per side
export const ARM = {
  hang: [14, 45, 17, 86], up: [16, -28, 22, -82], point: [32, -2, 64, -14], hip: [28, 28, 6, 52],
  shrug: [30, 14, 44, -12], hold: [18, 42, -6, 52, true], holdHi: [20, 30, -4, 20, true], chin: [18, 42, -14, -4, true],
  reach: [30, 20, 58, 30, true], lift: [22, 4, 10, -40, true], cheer: [20, -30, 34, -80], scrub: [26, 20, 2, 30, true],
  wave: [22, -20, 34, -66], stop: [26, -10, 40, -60], shade: [18, 20, -6, -50, true], camera: [18, 30, -4, -30, true],
};

// ---------------- props held in the hand ----------------
export const PROP = {
  dish: (p, x, y, u, fill = '#e9d98a') => { p.ell(x, y - 6 * u, 20 * u, 7 * u, '#cfe9ef', 2.2 * u); p.ell(x, y - 7 * u, 15 * u, 4.5 * u, fill, 0); p.dot(x, y, 5.5 * u); },
  mouldDish: (p, x, y, u) => { PROP.dish(p, x, y, u); p.ell(x + 3 * u, y - 8 * u, 6 * u, 3 * u, '#5fae8f', 1.4 * u); },
  bigMould: (p, x, y, u) => { p.ell(x, y - 14 * u, 44 * u, 16 * u, '#cfe9ef', 3 * u); p.ell(x, y - 16 * u, 36 * u, 11 * u, '#ead593', 0); for (const [dx, dy] of [[-24, -14], [22, -20], [26, -12], [-18, -22], [8, -10]]) p.dot(x + dx * u, y + dy * u, 2.6 * u, '#d9b440'); p.ell(x - 4 * u, y - 17 * u, 14 * u, 6 * u, '#4fae8c', 2 * u); p.ell(x - 4 * u, y - 17 * u, 22 * u, 8.5 * u, null, 1.2 * u); p.dot(x, y, 5.5 * u); },
  suitcase: (p, x, y, u) => { p.poly([[x - 24 * u, y + 6 * u], [x + 24 * u, y + 6 * u], [x + 24 * u, y + 40 * u], [x - 24 * u, y + 40 * u]], '#8a4a2a', 3 * u); p.stroke([[x - 8 * u, y + 6 * u], [x - 6 * u, y], [x + 6 * u, y], [x + 8 * u, y + 6 * u]], 3 * u); p.stroke([[x - 24 * u, y + 20 * u], [x + 24 * u, y + 20 * u]], 2 * u, '#d9b45a'); p.dot(x, y, 5.5 * u); },
  flask: (p, x, y, u, juice = '#f0c93a') => { p.poly([[x - 5 * u, y - 44 * u], [x + 5 * u, y - 44 * u], [x + 5 * u, y - 26 * u], [x + 18 * u, y + 4 * u], [x - 18 * u, y + 4 * u], [x - 5 * u, y - 26 * u]], '#d8eef3', 2.4 * u); p.poly([[x - 12 * u, y - 10 * u], [x + 12 * u, y - 10 * u], [x + 17 * u, y + 2 * u], [x - 17 * u, y + 2 * u]], juice, 1.4 * u); p.dot(x, y - 4 * u, 5.5 * u); },
  vial: (p, x, y, u) => { p.poly([[x - 4 * u, y - 30 * u], [x + 4 * u, y - 30 * u], [x + 4 * u, y + 2 * u], [x - 4 * u, y + 2 * u]], '#d8eef3', 2 * u); p.poly([[x - 3 * u, y - 4 * u], [x + 3 * u, y - 4 * u], [x + 3 * u, y + 1 * u], [x - 3 * u, y + 1 * u]], '#f0c93a', 0); p.dot(x, y - 6 * u, 5 * u); },
  brush: (p, x, y, u) => { p.band([[x, y], [x + 20 * u, y - 26 * u]], '#9a6a3a', 5 * u, 1.5 * u, 'round'); p.poly([[x + 12 * u, y - 36 * u], [x + 34 * u, y - 20 * u], [x + 28 * u, y - 12 * u], [x + 6 * u, y - 28 * u]], '#c9a45a', 2 * u); for (let i = 0; i < 4; i++) p.stroke([[x + 9 * u + i * 6 * u, y - 31 * u + i * 4 * u], [x + 5 * u + i * 6 * u, y - 25 * u + i * 4 * u]], 2 * u); p.dot(x, y, 5.5 * u); },
  bucket: (p, x, y, u) => { p.poly([[x - 18 * u, y + 2 * u], [x + 18 * u, y + 2 * u], [x + 14 * u, y + 36 * u], [x - 14 * u, y + 36 * u]], '#9aa3a8', 2.6 * u); p.ell(x, y + 2 * u, 18 * u, 5 * u, '#e7d36a', 2.2 * u); p.dot(x, y, 5.5 * u); },
  ladle: (p, x, y, u) => { p.band([[x, y], [x - 6 * u, y + 50 * u]], '#8d949c', 3 * u, 1.2 * u, 'round'); p.ell(x - 7 * u, y + 54 * u, 9 * u, 5 * u, '#8d949c', 2 * u); p.dot(x, y, 5.5 * u); },
  plaster: (p, x, y, u) => { p.poly([[x - 12 * u, y - 4 * u], [x + 12 * u, y - 4 * u], [x + 12 * u, y + 4 * u], [x - 12 * u, y + 4 * u]], '#f0c8a0', 1.6 * u); p.dot(x, y, 5.5 * u); },
  watch: (p, x, y, u) => { p.ell(x, y - 14 * u, 15 * u, 15 * u, '#e8c45a', 2.6 * u); p.ell(x, y - 14 * u, 11 * u, 11 * u, '#fbf6e6', 1.2 * u); p.stroke([[x, y - 14 * u], [x, y - 22 * u]], 2 * u); p.stroke([[x, y - 14 * u], [x + 6 * u, y - 14 * u]], 2 * u); p.dot(x, y, 5.5 * u); },
  hammer: (p, x, y, u) => { p.band([[x, y + 8 * u], [x + 6 * u, y - 40 * u]], '#8a5a34', 4 * u, 1.2 * u, 'round'); p.poly([[x - 6 * u, y - 50 * u], [x + 20 * u, y - 48 * u], [x + 19 * u, y - 38 * u], [x - 7 * u, y - 40 * u]], '#7d848c', 2 * u); p.dot(x, y, 5.5 * u); },
  cam: (p, x, y, u) => { p.poly([[x - 16 * u, y - 18 * u], [x + 16 * u, y - 18 * u], [x + 16 * u, y + 4 * u], [x - 16 * u, y + 4 * u]], '#2a2a34', 2 * u); p.ell(x, y - 7 * u, 7 * u, 7 * u, '#8fb4d0', 1.6 * u); p.dot(x, y, 5.5 * u); },
  flag: (p, x, y, u) => { p.band([[x, y + 10 * u], [x + 3 * u, y - 80 * u]], '#8a5a34', 3 * u, 1.2 * u, 'round'); p.poly([[x + 3 * u, y - 80 * u], [x + 46 * u, y - 76 * u], [x + 44 * u, y - 50 * u], [x + 3 * u, y - 52 * u]], '#2b5fb0', 2 * u); p.stroke([[x + 18 * u, y - 79 * u], [x + 18 * u, y - 51 * u]], 6 * u, '#f2c440'); p.stroke([[x + 3 * u, y - 65 * u], [x + 45 * u, y - 63 * u]], 6 * u, '#f2c440'); p.dot(x, y, 5.5 * u); },
  none: (p, x, y, u) => {},
};

/** draw a character card (600 x 1000 design units) */
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
      if (s.knee) { const u = h.u; pp.ell(300 - 22 * u, 975 - 0.55 * 94 * u, 7 * u, 5 * u, s.knee, 1.4 * u); }
    },
  });
  g.restore();
};

// ---------------- effect drawings (canvas size given per call) ----------------
/** germ: spiky purple blob with an angry face, on a 400 x 400 canvas; pop 0..1 shrinks it */
export const drawGerm = (g, { seed = 1, t = 0, pop = 0, expr = 'angry', col = '#8a4fc2' }) => {
  const p = new Pen(g); g.save(); g.scale(g.canvas.width / 400, g.canvas.height / 400);
  const k = 1 - pop, cx = 200, cy = 220 + 6 * Math.sin(t * 9 + seed);
  if (k > 0.02) {
    const pts = [];
    for (let i = 0; i < 36; i++) { const a = (i / 36) * Math.PI * 2, r = (i % 3 === 0 ? 150 : 118) * k * (1 + 0.04 * Math.sin(t * 7 + i + seed)); pts.push([cx + r * Math.cos(a), cy + r * 0.92 * Math.sin(a)]); }
    p.poly(pts, col, 10 * k);
    if (k > 0.4) {
      const u = 1.6 * k;
      for (const s of [-1, 1]) {
        p.ell(cx + s * 34 * u, cy - 8 * u, 14 * u, 16 * u, '#ffffff', 5 * u);
        p.dot(cx + s * 30 * u, cy - 4 * u, 6 * u);
        p.stroke(expr === 'angry' ? [[cx + s * 14 * u, cy - 28 * u], [cx + s * 52 * u, cy - 40 * u]] : [[cx + s * 14 * u, cy - 40 * u], [cx + s * 52 * u, cy - 30 * u]], 7 * u);
      }
      if (expr === 'angry') p.arc(cx, cy + 36 * u, 22 * u, 10 * u, 200, 340, 6 * u);
      else p.ell(cx, cy + 34 * u, 10 * u, 13 * u, '#5a1e28', 4 * u);
    }
  }
  g.restore();
  if (pop > 0) { g.save(); g.scale(g.canvas.width / 300, g.canvas.height / 300); fxPuff(new Pen(g), Math.min(1, pop)); g.restore(); }
};
/** spore: glowing fuzzy green ball on a 256 x 256 canvas */
export const drawSpore = (g, t) => {
  const w = g.canvas.width, gr = g.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
  gr.addColorStop(0, 'rgba(220,255,200,1)'); gr.addColorStop(0.25, 'rgba(120,220,150,0.95)'); gr.addColorStop(0.6, 'rgba(90,200,140,0.35)'); gr.addColorStop(1, 'rgba(90,200,140,0)');
  g.fillStyle = gr; g.fillRect(0, 0, w, w);
  const p = new Pen(g); g.save(); g.scale(w / 256, w / 256);
  for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + t; p.stroke([[128 + 26 * Math.cos(a), 128 + 26 * Math.sin(a)], [128 + 44 * Math.cos(a), 128 + 44 * Math.sin(a)]], 5, '#2f7a52'); }
  p.ell(128, 128, 30, 30, '#6fcf8f', 6);
  g.restore();
};
export const drawText = (g, txt, { col = '#ffffff', font = 'bold 300px Georgia, serif', stroke = INK, lw = 22 } = {}) => {
  const w = g.canvas.width, h = g.canvas.height;
  g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.lineWidth = lw; g.strokeStyle = stroke; g.lineJoin = 'round'; g.strokeText(txt, w / 2, h / 2);
  g.fillStyle = col; g.fillText(txt, w / 2, h / 2);
};
export const drawConfetti = (g, t, seed = 1) => {
  const w = g.canvas.width, h = g.canvas.height, cols = ['#e2453c', '#f2c440', '#3f6fb5', '#5d9a3a', '#c25a7a', '#ffffff'];
  for (let i = 0; i < 70; i++) {
    const r1 = Math.sin(i * 12.9898 + seed) * 43758.5453 % 1, r2 = Math.sin(i * 78.233 + seed) * 12345.678 % 1;
    const x = (Math.abs(r1) * w + 30 * Math.sin(t * 3 + i)) % w, y = ((Math.abs(r2) * h * 0.6) + t * (220 + 120 * Math.abs(r1))) % h;
    g.save(); g.translate(x, y); g.rotate(t * 4 + i); g.fillStyle = cols[i % 6]; g.fillRect(-9, -5, 18, 10 * Math.abs(Math.cos(t * 6 + i))); g.restore();
  }
};
/** little colony character on the dish (Gerald): yellow blob with a face, 300 x 300 */
export const drawColony = (g, { t = 0, expr = 'smile', pop = 0 }) => {
  const p = new Pen(g); g.save(); g.scale(g.canvas.width / 300, g.canvas.height / 300);
  const k = 1 - pop;
  if (k > 0.05) {
    const pts = []; for (let i = 0; i < 40; i++) { const a = i / 40 * Math.PI * 2, r = 110 * k * (1 + 0.05 * Math.sin(5 * a + t * 5)); pts.push([150 + r * Math.cos(a), 170 + r * 0.8 * Math.sin(a)]); }
    p.poly(pts, '#f0d25a', 9 * k);
    const u = 1.3 * k;
    for (const s of [-1, 1]) {
      if (expr === 'dazed') { const sp = []; for (let q = 1; q < 12; q++) sp.push([150 + s * 30 * u + Math.cos(q + t * 8) * q * u, 160 + Math.sin(q + t * 8) * q * u]); p.stroke(sp, 4 * u); }
      else p.ell(150 + s * 30 * u, 160, 7 * u, 10 * u, INK, 0);
    }
    if (expr === 'dazed') p.ell(150, 200, 12 * u, 9 * u, '#5a1e28', 4 * u); else p.arc(150, 188, 18 * u, 9 * u, 20, 160, 5 * u);
  }
  g.restore();
  if (pop > 0) { g.save(); g.scale(g.canvas.width / 300, g.canvas.height / 300); fxPuff(new Pen(g), Math.min(1, pop)); g.restore(); }
};

const R = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
/** the macro petri dish surface on a square canvas: agar, colonies, mould, clear ring, drawn circle.
 *  s: { mould 0..1 (size), ring 0..1 (clear radius growth), gone 0..1 (colonies near the ring vanish), circle 0..1 (marker circle drawn), t } */
export const drawDish = (g, s) => {
  const w = g.canvas.width, c = w / 2, R0 = w * 0.47;
  g.fillStyle = '#c7dfe3'; g.fillRect(0, 0, w, w);
  g.fillStyle = '#ead9a0'; g.beginPath(); g.arc(c, c, R0, 0, Math.PI * 2); g.fill();
  // agar mottling
  for (let i = 0; i < 120; i++) { g.fillStyle = `rgba(200,170,90,${0.08 + 0.08 * R(i, 1)})`; g.beginPath(); g.arc(c + (R(i, 2) - 0.5) * 2 * R0 * 0.9, c + (R(i, 3) - 0.5) * 2 * R0 * 0.9, 10 + 30 * R(i, 4), 0, 6.3); g.fill(); }
  const mx = c - w * 0.08, my = c + w * 0.04, mr = w * 0.13 * (s.mould ?? 1), clear = mr + w * 0.12 * (s.ring ?? 1);
  // colonies: yellow dots everywhere outside the clear zone
  const N = s.dense ? 240 : 170;
  for (let i = 0; i < N; i++) {
    const a = R(i, 5) * 6.283, d = Math.sqrt(R(i, 6)) * R0 * 0.94, x = c + d * Math.cos(a), y = c + d * Math.sin(a);
    const dm = Math.hypot(x - mx, y - my); let k = 1;
    if (dm < clear) { const near = 1 - (clear - dm) / (clear - mr + 1e-3); k = Math.max(0, 1 - (s.gone ?? 1) * (1.6 - near)); }
    if (dm < mr * 1.05) k = 0;
    if (k <= 0.02) continue;
    const r = (6 + 9 * R(i, 7)) * (w / 1024) * k;
    g.fillStyle = '#7a5c1e'; g.beginPath(); g.arc(x, y, r + 2.5 * w / 1024, 0, 6.3); g.fill();
    g.fillStyle = mix('#f0cf52', '#fff1a8', R(i, 8)); g.beginPath(); g.arc(x, y, r, 0, 6.3); g.fill();
  }
  // clear halo: slightly lighter, glassy agar
  if ((s.ring ?? 1) > 0.05 && (s.mould ?? 1) > 0.05) {
    const gr = g.createRadialGradient(mx, my, mr, mx, my, clear);
    gr.addColorStop(0, 'rgba(255,250,225,0.55)'); gr.addColorStop(0.85, 'rgba(255,250,225,0.25)'); gr.addColorStop(1, 'rgba(255,250,225,0)');
    g.fillStyle = gr; g.beginPath(); g.arc(mx, my, clear, 0, 6.3); g.fill();
  }
  // mould: fuzzy blue-green colony with a white rim and stubble
  if ((s.mould ?? 1) > 0.02) {
    for (let i = 0; i < 90; i++) { const a = i / 90 * 6.283, rr = mr * (1.02 + 0.08 * R(i, 9)); g.strokeStyle = '#f4fff4'; g.lineWidth = 3 * w / 1024; g.beginPath(); g.moveTo(mx + mr * 0.8 * Math.cos(a), my + mr * 0.8 * Math.sin(a)); g.lineTo(mx + rr * Math.cos(a + 0.03 * Math.sin((s.t || 0) * 3 + i)), my + rr * Math.sin(a)); g.stroke(); }
    const gr = g.createRadialGradient(mx, my, 0, mx, my, mr);
    gr.addColorStop(0, '#2f7f6a'); gr.addColorStop(0.55, '#4fae8c'); gr.addColorStop(0.85, '#8fd6b0'); gr.addColorStop(1, '#e8fbe8');
    g.fillStyle = gr; g.beginPath(); g.arc(mx, my, mr, 0, 6.3); g.fill();
    for (let i = 0; i < 60; i++) { const a = R(i, 10) * 6.283, d = Math.sqrt(R(i, 11)) * mr * 0.8; g.fillStyle = R(i, 12) > 0.5 ? '#256b5a' : '#7fcaa5'; g.beginPath(); g.arc(mx + d * Math.cos(a), my + d * Math.sin(a), (3 + 5 * R(i, 13)) * w / 1024, 0, 6.3); g.fill(); }
    g.strokeStyle = '#1d3b33'; g.lineWidth = 5 * w / 1024; g.beginPath(); g.arc(mx, my, mr, 0, 6.3); g.stroke();
  }
  // marker circle ("keep out"), drawn clockwise with a slight wobble
  if ((s.circle ?? 0) > 0) {
    g.strokeStyle = '#d8302f'; g.lineWidth = 16 * w / 1024; g.lineCap = 'round'; g.beginPath();
    const A = (s.circle) * 6.45, n = 90;
    for (let i = 0; i <= n; i++) { const a = -1.9 + A * i / n, rr = clear * (1.02 + 0.025 * Math.sin(a * 3)); const x = mx + rr * Math.cos(a), y = my + rr * Math.sin(a); if (i) g.lineTo(x, y); else g.moveTo(x, y); }
    g.stroke();
  }
  // glass rim
  g.strokeStyle = '#33424a'; g.lineWidth = 10 * w / 1024; g.beginPath(); g.arc(c, c, R0, 0, 6.3); g.stroke();
  g.strokeStyle = 'rgba(255,255,255,0.7)'; g.lineWidth = 6 * w / 1024; g.beginPath(); g.arc(c, c, R0 - 12 * w / 1024, 3.6, 4.6); g.stroke();
  return { mx: mx / w, my: my / w, mr: mr / w, clear: clear / w };
};

/** gold lion statue (front-facing) on a 400 x 500 canvas */
export const drawLion = (g, t = 0) => {
  const p = new Pen(g); g.save(); g.scale(g.canvas.width / 400, g.canvas.height / 500); p.ol = 8;
  const G = '#e8b830', D = '#b8861c';
  for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; p.ell(200 + 95 * Math.cos(a), 170 + 95 * Math.sin(a), 42, 42, D, 7); }
  p.ell(200, 175, 92, 88, G, 8);
  for (const s of [-1, 1]) { p.ell(200 + s * 34, 150, 14, 16, '#ffffff', 5); p.dot(200 + s * 30, 154, 7); }
  p.poly([[180, 190], [220, 190], [200, 214]], '#5a3a1a', 5); p.arc(200, 222, 30, 18, 20, 160, 6);
  p.poly([[110, 290], [290, 290], [310, 480], [90, 480]], G, 8); p.stroke([[150, 330], [150, 470]], 6, D); p.stroke([[250, 330], [250, 470]], 6, D);
  g.restore();
};
/** puffy cloud with cheeks blowing wind, 600 x 400 */
export const drawWindCloud = (g, t) => {
  const p = new Pen(g); g.save(); g.scale(g.canvas.width / 600, g.canvas.height / 400); p.ol = 9;
  const blobs = [[200, 200, 120, 100], [320, 160, 120, 110], [420, 210, 100, 90], [300, 250, 160, 80]];
  for (const [x, y, rx, ry] of blobs) p.ell(x, y, rx, ry, null, 16);
  for (const [x, y, rx, ry] of blobs) p.ell(x, y, rx, ry, '#ffffff', 0);
  p.ell(250, 190, 12, 14, '#241726', 0); p.ell(320, 190, 12, 14, '#241726', 0);
  p.ell(205, 230, 34, 24, '#ffc8d0', 0); p.ell(365, 230, 34, 24, '#ffc8d0', 0);
  p.ell(170, 240, 22, 26, '#ffffff', 7); p.ell(165, 240, 8, 10, '#5a1e28', 0);
  for (let i = 0; i < 4; i++) { const yy = 190 + i * 30, sh = (t * 400 + i * 50) % 140; p.stroke([[130 - sh, yy], [60 - sh, yy + 6], [20 - sh, yy - 4]], 7, '#9fd4ff'); }
  g.restore();
};
export const drawSplash = (g, t) => { g.save(); g.scale(g.canvas.width / 800, g.canvas.height / 800); fxSplash(new Pen(g), t); g.restore(); };
export const drawBubbles = (g, t, seed = 1) => { const w = g.canvas.width, p = new Pen(g); for (let i = 0; i < 9; i++) { const x = (Math.abs(Math.sin(i * 12.9 + seed)) * w), y = w - ((t * 300 + i * 90) % w), r = 10 + 14 * Math.abs(Math.sin(i * 7.1)); p.ell(x, y, r, r, 'rgba(220,245,255,0.7)', 4); } };
export const drawFlashes = (g, t) => { const w = g.canvas.width; for (let i = 0; i < 6; i++) { const on = Math.sin(t * 9 + i * 2.3) > 0.85; if (!on) continue; const x = (i * 97) % w, y = 80 + (i * 61) % (w * 0.6); g.save(); g.translate(x, y); g.scale(w / 1500, w / 1500); fxBurst(new Pen(g), 0.3, '#ffffff', 8, 30, 160); g.restore(); } };
