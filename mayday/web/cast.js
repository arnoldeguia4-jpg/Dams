// Cast for "The Messy Desk That Saved Millions": outfits, props, effect drawings, the petri dish surface.
import { Pen, bodyFront, INK, SKIN, SKINS, KID, PARENT, townsfolk, mix, shade, fxBurst, fxPuff, fxStars } from './toonbase.js';
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

const beret = (p, h) => { const { cx, crown, HH, W, u } = h; p.ell(cx + 0.05 * W, crown + 0.1 * HH, 0.34 * W, 0.11 * HH, '#22222a', 4 * u, 180, 360); p.ell(cx + 0.05 * W, crown + 0.1 * HH, 0.34 * W, 0.03 * HH, '#22222a', 3 * u); p.stroke([[cx + 0.05 * W, crown - 0.01 * HH], [cx + 0.07 * W, crown - 0.05 * HH]], 3 * u); };
const bowler = (p, h) => { const { cx, crown, HH, W, u } = h, y = crown + 0.2 * HH; p.ell(cx, y - 0.08 * HH, 0.28 * W, 0.2 * HH, '#2a2622', 4 * u, 180, 360); p.ell(cx, y, 0.42 * W, 0.05 * HH, '#2a2622', 4 * u); };
const tophat = (p, h) => { const { cx, crown, HH, W, u } = h, y = crown + 0.2 * HH; p.poly([[cx - 0.3 * W, y], [cx - 0.3 * W, y - 0.75 * HH], [cx + 0.3 * W, y - 0.75 * HH], [cx + 0.3 * W, y]], '#24222a', 4 * u); p.band([[cx - 0.3 * W, y - 0.1 * HH], [cx + 0.3 * W, y - 0.1 * HH]], '#7a2a2a', 0.1 * HH, 1 * u); p.ell(cx, y, 0.46 * W, 0.05 * HH, '#24222a', 4 * u); };
const stripes = (p, c) => { const { tcx, chin, HH, u } = c; for (let i = 1; i < 5; i++) p.stroke([[tcx - 30 * u, chin + i * 0.17 * HH], [tcx + 30 * u, chin + i * 0.17 * HH]], 3.4 * u, '#2b4c9a'); p.poly([[tcx - 12 * u, chin + 2 * u], [tcx + 12 * u, chin + 2 * u], [tcx + 18 * u, chin + 0.12 * HH], [tcx - 18 * u, chin + 0.12 * HH]], '#d0303a', 1.4 * u); };
const suit = (col) => (p, c) => { const { tcx, chin, HH, u } = c; p.poly([[tcx - 10 * u, chin], [tcx, chin + 0.3 * HH], [tcx + 10 * u, chin]], '#ffffff', 2 * u); p.poly([[tcx - 4 * u, chin + 3 * u], [tcx + 4 * u, chin + 3 * u], [tcx + 6 * u, chin + 0.45 * HH], [tcx, chin + 0.52 * HH], [tcx - 6 * u, chin + 0.45 * HH]], col, 2 * u); };
export const OUT = {
  french: { o: { jacket: '#f2efe6', pants: '#3b3f52', boots: '#2a2220', hat: 'hair', hair: '#2a201a', skin: SKINS[0], moustache: '#2a201a', buttons: '#f2efe6' }, extra: stripes, head: beret, seed: 5 },
  yank: { o: { jacket: '#3a3a5a', pants: '#2a2a34', boots: '#1d1a1a', hat: 'hair', hair: '#c9b08a', skin: SKINS[1], buttons: '#d9b45a', moustache: '#c9b08a' }, extra: suit('#c0353a'), head: tophat, seed: 9 },
  sen1: { o: { jacket: '#2e2e3a', pants: '#24242c', boots: '#1d1a1a', hat: 'hair', hair: '#d0d0d0', skin: SKINS[0], buttons: '#8a8a96', moustache: '#d0d0d0', build: 'stout' }, extra: suit('#2b4c9a'), seed: 13 },
  sen2: { o: { jacket: '#4a3a2a', pants: '#2c2c36', boots: '#1d1a1a', hat: 'hair', hair: '#5a3b2a', skin: SKINS[2], buttons: '#8a8a96' }, extra: suit('#7a2a2a'), head: glasses, seed: 17 },
  eng1: { o: { jacket: '#8a6a44', pants: '#4a4038', boots: '#2a2220', hat: 'hair', hair: '#3a2a20', skin: SKINS[1], buttons: '#5a3a22' }, extra: suit('#2f5a3a'), head: bowler, seed: 21 },
  eng2: { o: { jacket: '#5a6a7a', pants: '#3b3f52', boots: '#2a2220', hat: 'hair', hair: '#a8622e', skin: SKINS[0], buttons: '#d9d4c4', moustache: '#a8622e' }, extra: suit('#c9a040'), head: glasses, seed: 25 },
  painter: { o: { jacket: '#f2efe6', pants: '#f2efe6', boots: '#4a3020', hat: 'cap', cap: '#f2efe6', skin: SKINS[2] }, seed: 29 },
};
export const crowd = (v) => ({ o: townsfolk(v), seed: 40 + v });

// arm poses: [elbow dx, elbow dy, hand dx, hand dy, front?] in u from the shoulder, x mirrored per side
export const ARM = {
  hang: [14, 45, 17, 86], up: [16, -28, 22, -82], point: [32, -2, 64, -14], hip: [28, 28, 6, 52],
  shrug: [30, 14, 44, -12], hold: [18, 42, -6, 52, true], holdHi: [20, 30, -4, 20, true], chin: [18, 42, -14, -4, true],
  reach: [30, 20, 58, 30, true], lift: [22, 4, 10, -40, true], cheer: [20, -30, 34, -80], scrub: [26, 20, 2, 30, true],
  wave: [22, -20, 34, -66], sign: [16, -10, 4, -70, true], shake: [30, -10, 40, -50],
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
  magnifier: (p, x, y, u) => { p.band([[x, y + 4 * u], [x + 10 * u, y - 20 * u]], '#6a4a2e', 4 * u, 1.2 * u, 'round'); p.ell(x + 16 * u, y - 34 * u, 15 * u, 15 * u, 'rgba(200,235,255,0.7)', 3 * u); p.dot(x, y, 5.5 * u); },
  brush: (p, x, y, u) => { p.band([[x, y + 4 * u], [x + 4 * u, y - 30 * u]], '#8a5a34', 4 * u, 1.2 * u, 'round'); p.poly([[x - 6 * u, y - 30 * u], [x + 14 * u, y - 30 * u], [x + 12 * u, y - 46 * u], [x - 4 * u, y - 46 * u]], '#c87a3a', 2 * u); p.dot(x, y, 5.5 * u); },
  bucket: (p, x, y, u) => { p.poly([[x - 16 * u, y + 2 * u], [x + 16 * u, y + 2 * u], [x + 13 * u, y + 32 * u], [x - 13 * u, y + 32 * u]], '#9aa3a8', 2.4 * u); p.ell(x, y + 2 * u, 16 * u, 4.5 * u, '#c87a3a', 2 * u); p.dot(x, y, 5.5 * u); },
  gavel: (p, x, y, u) => { p.band([[x, y + 4 * u], [x + 18 * u, y - 24 * u]], '#6a4a2e', 4 * u, 1.2 * u, 'round'); p.poly([[x + 8 * u, y - 36 * u], [x + 32 * u, y - 22 * u], [x + 26 * u, y - 12 * u], [x + 2 * u, y - 26 * u]], '#5a3a22', 2 * u); p.dot(x, y, 5.5 * u); },
  protest: (p, x, y, u) => { p.band([[x, y + 30 * u], [x, y - 60 * u]], '#8a5a34', 3.5 * u, 1.2 * u, 'round'); p.poly([[x - 34 * u, y - 100 * u], [x + 34 * u, y - 100 * u], [x + 34 * u, y - 56 * u], [x - 34 * u, y - 56 * u]], '#f6ecd2', 2.4 * u); const g = p.g; g.save(); g.fillStyle = '#c0353a'; g.font = `900 ${11 * u}px Georgia, serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('HANDS OFF', x, y - 86 * u); g.fillText('LIBERTY!', x, y - 70 * u); g.restore(); p.dot(x, y, 5.5 * u); },
  moneybag: (p, x, y, u) => { p.poly([[x - 16 * u, y + 2 * u], [x + 16 * u, y + 2 * u], [x + 22 * u, y + 30 * u], [x + 12 * u, y + 40 * u], [x - 12 * u, y + 40 * u], [x - 22 * u, y + 30 * u]], '#c9a46a', 2.4 * u); const g = p.g; g.save(); g.fillStyle = '#2a7a3a'; g.font = `900 ${20 * u}px Georgia, serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('$', x, y + 24 * u); g.restore(); p.dot(x, y, 5.5 * u); },
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

/** rain + wind + salt sparkle weather overlay on a 512 x 512 canvas, t seconds */
export const drawWeather = (g, t) => {
  const w = g.canvas.width; g.save(); g.scale(w / 512, w / 512);
  g.strokeStyle = 'rgba(200,225,255,0.85)'; g.lineWidth = 4;
  for (let i = 0; i < 40; i++) { const x = (i * 53 + t * 260) % 560 - 40, y = (i * 97 + t * 900) % 560 - 40; g.beginPath(); g.moveTo(x, y); g.lineTo(x - 14, y + 34); g.stroke(); }
  g.strokeStyle = 'rgba(255,255,255,0.9)'; g.lineWidth = 6; g.lineCap = 'round';
  for (let k = 0; k < 3; k++) { const yy = 120 + k * 130, sh = (t * 300 + k * 90) % 700 - 150; g.beginPath(); g.moveTo(sh, yy); g.bezierCurveTo(sh + 60, yy - 30, sh + 120, yy + 30, sh + 180, yy); g.stroke(); }
  g.restore();
};
/** cut-away diagram: copper under a green patina skin, 512 x 512 */
export const drawLayers = (g) => {
  const p = new Pen(g); g.save(); g.scale(g.canvas.width / 512, g.canvas.width / 512); p.ol = 8;
  p.poly([[40, 240], [472, 240], [472, 470], [40, 470]], '#c87a3a', 8); p.poly([[40, 160], [472, 160], [472, 240], [40, 240]], '#6fb59a', 8);
  g.fillStyle = '#ffffff'; g.font = 'bold 50px Georgia, serif'; g.textAlign = 'center'; g.lineWidth = 9; g.strokeStyle = '#241726';
  g.strokeText('PATINA', 256, 218); g.fillText('PATINA', 256, 218); g.strokeText('COPPER', 256, 375); g.fillText('COPPER', 256, 375);
  for (let k = 0; k < 5; k++) { const x = 70 + k * 90; p.poly([[x, 20], [x + 20, 20], [x + 20, 80], [x + 34, 80], [x + 10, 130], [x - 14, 80], [x, 80]], '#9fd4ff', 5); }
  g.restore();
};

// ---------------- "Why Do We Say OK?" additions ----------------
const sideburns = (p, h) => { const { cx, hc, W, HH, u } = h; for (const s of [-1, 1]) { p.ell(cx + s * 0.46 * W, hc + 0.02 * HH, 0.14 * W, 0.2 * HH, '#e6dccb', 3 * u); p.ell(cx + s * 0.4 * W, hc - 0.22 * HH, 0.12 * W, 0.08 * HH, '#e6dccb', 3 * u); } };
const visor = (p, h) => { const { cx, crown, HH, W, u } = h, y = crown + 0.3 * HH; p.poly([[cx - 0.36 * W, y], [cx + 0.36 * W, y], [cx + 0.28 * W, y + 0.1 * HH], [cx - 0.28 * W, y + 0.1 * HH]], 'rgba(60,170,110,0.85)', 3 * u); };
const vest = (col) => (p, c) => { const { tcx, chin, HH, u } = c; p.poly([[tcx - 24 * u, chin + 4 * u], [tcx, chin + 0.34 * HH], [tcx + 24 * u, chin + 4 * u], [tcx + 24 * u, chin + 0.6 * HH], [tcx - 24 * u, chin + 0.6 * HH]], col, 2.4 * u); p.poly([[tcx - 9 * u, chin], [tcx, chin + 0.3 * HH], [tcx + 9 * u, chin]], '#ffffff', 2 * u); p.ell(tcx, chin + 5 * u, 7 * u, 4 * u, '#2a2030', 1.6 * u); for (let i = 0; i < 3; i++) p.dot(tcx, chin + (0.38 + i * 0.07) * HH, 2.4 * u, '#d9b45a'); };
const hoodie = (p, c) => { const { tcx, chin, HH, u } = c; p.ell(tcx, chin + 2 * u, 26 * u, 8 * u, '#3a6fb0', 2.4 * u); for (const s of [-1, 1]) p.stroke([[tcx + s * 6 * u, chin + 6 * u], [tcx + s * 7 * u, chin + 0.26 * HH]], 2 * u, '#f2efe6'); p.poly([[tcx - 20 * u, chin + 0.5 * HH], [tcx + 20 * u, chin + 0.5 * HH], [tcx + 16 * u, chin + 0.64 * HH], [tcx - 16 * u, chin + 0.64 * HH]], '#3a6fb0', 2 * u); };
Object.assign(OUT, {
  texter: { o: { jacket: '#4a86c8', pants: '#2f3a52', boots: '#e8e2d2', hat: 'hair', hair: '#2a1d16', skin: SKINS[2] }, extra: hoodie, seed: 33 },
  ed1: { o: { jacket: '#f2efe6', pants: '#3b3f52', boots: '#2a2220', hat: 'hair', hair: '#6a4026', skin: SKINS[0], moustache: '#6a4026', buttons: '#f2efe6' }, extra: vest('#7a2a2a'), head: visor, seed: 37 },
  ed2: { o: { jacket: '#f2efe6', pants: '#4a4038', boots: '#2a2220', hat: 'hair', hair: '#c9a46a', skin: SKINS[1], buttons: '#f2efe6' }, extra: vest('#2b4c6a'), head: glasses, seed: 41 },
  vanburen: { o: { jacket: '#2a2a3a', pants: '#2a2a34', boots: '#1d1a1a', hat: 'none', skin: SKINS[0], buttons: '#8a8a96', build: 'stout' }, extra: suit('#f2efe6'), head: sideburns, seed: 45 },
});
const txt = (p, s, x, y, size, col = '#2a2030', font = 'Georgia, serif') => { const g = p.g; g.save(); g.fillStyle = col; g.font = `900 ${size}px ${font}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, x, y); g.restore(); };
Object.assign(PROP, {
  phone: (p, x, y, u) => { p.poly([[x - 9 * u, y - 30 * u], [x + 9 * u, y - 30 * u], [x + 9 * u, y + 4 * u], [x - 9 * u, y + 4 * u]], '#22222a', 2.2 * u); p.poly([[x - 6.5 * u, y - 26 * u], [x + 6.5 * u, y - 26 * u], [x + 6.5 * u, y - 1 * u], [x - 6.5 * u, y - 1 * u]], '#9fd4ff', 0); p.dot(x, y, 5.5 * u); },
  paper: (p, x, y, u) => { p.poly([[x - 30 * u, y - 52 * u], [x + 30 * u, y - 52 * u], [x + 30 * u, y + 8 * u], [x - 30 * u, y + 8 * u]], '#f4ecd2', 2.4 * u); txt(p, 'POST', x, y - 42 * u, 10 * u); p.stroke([[x - 26 * u, y - 35 * u], [x + 26 * u, y - 35 * u]], 1.4 * u); txt(p, 'O.K.', x, y - 18 * u, 22 * u, '#c0353a'); for (let i = 0; i < 3; i++) p.stroke([[x - 24 * u, y - 4 * u + i * 4 * u], [x + 24 * u, y - 4 * u + i * 4 * u]], 1 * u, '#8a8070'); p.dot(x, y, 5.5 * u); },
  okSign: (p, x, y, u) => { p.band([[x, y + 30 * u], [x, y - 60 * u]], '#8a5a34', 3.5 * u, 1.2 * u, 'round'); p.poly([[x - 30 * u, y - 104 * u], [x + 30 * u, y - 104 * u], [x + 30 * u, y - 56 * u], [x - 30 * u, y - 56 * u]], '#f6ecd2', 2.4 * u); txt(p, 'O.K.', x, y - 80 * u, 24 * u, '#c0353a'); p.dot(x, y, 5.5 * u); },
  chalk: (p, x, y, u) => { p.band([[x, y], [x + 6 * u, y - 12 * u]], '#f4f4ee', 3 * u, 1 * u, 'round'); p.dot(x, y, 5.5 * u); },
  hat: (p, x, y, u) => { p.poly([[x - 14 * u, y - 4 * u], [x - 14 * u, y - 34 * u], [x + 14 * u, y - 34 * u], [x + 14 * u, y - 4 * u]], '#24222a', 2.4 * u); p.ell(x, y - 3 * u, 22 * u, 4 * u, '#24222a', 2.4 * u); p.dot(x, y, 5.5 * u); },
});
// speech bubble with text
export const drawBubble = (g, s, col = '#ffffff', fg = '#2a2030') => { const w = g.canvas.width, h = g.canvas.height; const p = new Pen(g); g.save(); g.scale(w / 512, h / 512);
  p.ell(256, 220, 220, 160, col, 10); p.poly([[180, 350], [130, 470], [260, 370]], col, 0); g.strokeStyle = INK; g.lineWidth = 10; g.beginPath(); g.moveTo(180, 362); g.lineTo(130, 470); g.lineTo(250, 374); g.stroke();
  g.fillStyle = fg; g.font = `900 ${s.length > 3 ? 120 : 170}px Georgia, serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, 256, 226); g.restore(); };
// chalkboard: [[big, small], ...] lines; reveal 0..n
export const drawBoard = (g, rows) => { const w = g.canvas.width, h = g.canvas.height; g.save(); g.scale(w / 1024, h / 640);
  g.fillStyle = '#6a4a2e'; g.fillRect(0, 0, 1024, 640); g.fillStyle = '#2f4a3a'; g.fillRect(28, 28, 968, 584);
  g.fillStyle = 'rgba(255,255,255,0.06)'; for (let i = 0; i < 40; i++) g.fillRect((i * 173) % 960 + 30, (i * 97) % 560 + 30, 80, 6);
  g.textAlign = 'center'; g.textBaseline = 'middle';
  rows.forEach(([a, b, col], i) => { const y = 150 + i * 200; g.fillStyle = '#f4f4ee'; g.font = '900 74px Georgia, serif'; g.fillText(a, 300, y); if (b) { g.fillText('→', 560, y); g.fillStyle = col || '#ffe066'; g.font = '900 110px Georgia, serif'; g.fillText(b, 780, y); } });
  g.restore(); };
// big newspaper front page
export const drawFront = (g, t = 1) => { const w = g.canvas.width, h = g.canvas.height; g.save(); g.scale(w / 640, h / 800);
  g.fillStyle = '#f4ecd2'; g.fillRect(0, 0, 640, 800); g.strokeStyle = INK; g.lineWidth = 12; g.strokeRect(6, 6, 628, 788);
  g.fillStyle = '#2a2030'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '900 62px Georgia, serif'; g.fillText('BOSTON', 320, 70); g.fillText('MORNING POST', 320, 140);
  g.font = 'italic 30px Georgia, serif'; g.fillText('March 23, 1839', 320, 195); g.fillRect(40, 220, 560, 6);
  g.fillStyle = '#c0353a'; g.font = '900 230px Georgia, serif'; g.fillText('O.K.', 320, 380);
  g.fillStyle = '#2a2030'; g.font = 'italic 900 54px Georgia, serif'; g.fillText('"oll korrect"', 320, 530);
  if (t > 0) { g.globalAlpha = Math.min(1, t); g.font = '900 44px Georgia, serif'; g.fillText('(all correct)', 320, 610); g.strokeStyle = '#c0353a'; g.lineWidth = 10; g.beginPath(); g.ellipse(320, 530, 250, 60, 0, 0, Math.PI * 2); g.stroke(); }
  g.globalAlpha = 1; g.fillStyle = '#8a8070'; for (let i = 0; i < 5; i++) g.fillRect(60, 660 + i * 24, 520, 8);
  g.restore(); };

// ---------------- "Why Are School Buses Yellow?" additions ----------------
Object.assign(OUT, {
  cyr: { o: { jacket: '#4a4a5a', pants: '#33333e', boots: '#2a2220', hat: 'hair', hair: '#3a2a20', skin: SKINS[0], buttons: '#8a8a96' }, extra: suit('#c9a040'), head: glasses, seed: 51 },
  kid1: { o: { ...KID, jacket: '#e2453c', cap: '#2b4c9a' }, seed: 61 },
  kid2: { o: { ...KID, jacket: '#3a9a5a', hat: 'hair', hair: '#2a1d16', skin: SKINS[2] }, seed: 63 },
  kid3: { o: { ...KID, jacket: '#8a5ac9', hat: 'hair', hair: '#c9a46a', skin: SKINS[1] }, seed: 65 },
  kid4: { o: { ...KID, jacket: '#f2c440', cap: '#e2453c', skin: SKINS[1] }, seed: 67 },
});
Object.assign(PROP, {
  swatch: (p, x, y, u) => { p.poly([[x - 9 * u, y - 60 * u], [x + 9 * u, y - 60 * u], [x + 9 * u, y + 4 * u], [x - 9 * u, y + 4 * u]], '#f2b21c', 2.4 * u); p.dot(x, y, 5.5 * u); },
});
