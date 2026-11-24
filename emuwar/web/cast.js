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

const KHAKI = '#9c8f5c', KHAKI_D = '#7d7045';
const slouch = (p, h) => {
  const { cx, crown, HH, W, u } = h, y = crown + 0.24 * HH;
  p.poly([[cx - 0.27 * W, y], [cx - 0.22 * W, y - 0.25 * HH], [cx + 0.22 * W, y - 0.25 * HH], [cx + 0.27 * W, y]], KHAKI_D, 4 * u);
  p.band([[cx - 0.26 * W, y - 0.06 * HH], [cx + 0.26 * W, y - 0.06 * HH]], '#3a2e1e', 0.06 * HH, 1.2 * u);
  p.ell(cx, y + 1 * u, 0.52 * W, 0.055 * HH, KHAKI_D, 4 * u);
  p.poly([[cx - 0.5 * W, y], [cx - 0.3 * W, y - 0.3 * HH], [cx - 0.22 * W, y - 0.02 * HH]], KHAKI_D, 3.5 * u); // pinned-up side
  p.ell(cx - 0.33 * W, y - 0.1 * HH, 5 * u, 5 * u, '#c9a040', 1.5 * u);
};
const akubra = (col) => (p, h) => {
  const { cx, crown, HH, W, u } = h, y = crown + 0.22 * HH;
  p.poly([[cx - 0.28 * W, y], [cx - 0.23 * W, y - 0.26 * HH], [cx, y - 0.2 * HH], [cx + 0.23 * W, y - 0.26 * HH], [cx + 0.28 * W, y]], col, 4 * u);
  p.band([[cx - 0.27 * W, y - 0.06 * HH], [cx + 0.27 * W, y - 0.06 * HH]], '#2e2418', 0.05 * HH, 1.2 * u);
  p.ell(cx, y + 1 * u, 0.56 * W, 0.06 * HH, col, 4 * u);
};
const glasses = (p, h) => {
  const { cx, hc, u, facing } = h, fx = cx + 7 * u * facing;
  for (const s of [-1, 1]) p.ell(fx + s * 13 * u, hc, 10 * u, 9 * u, null, 2.4 * u);
  p.stroke([[fx - 3 * u, hc - 1 * u], [fx + 3 * u, hc - 1 * u]], 2.2 * u);
};
const tunic = (p, c) => { const { tcx, chin, HH, u } = c; p.stroke([[tcx - 13 * u, chin + 1 * u], [tcx, chin + 0.2 * HH], [tcx + 13 * u, chin + 1 * u]], 2.4 * u);
  for (const s of [-1, 1]) p.poly([[tcx + s * 10 * u, chin + 0.36 * HH], [tcx + s * 26 * u, chin + 0.36 * HH], [tcx + s * 26 * u, chin + 0.48 * HH], [tcx + s * 10 * u, chin + 0.48 * HH]], null, 2 * u);
  p.band([[tcx - 40 * u, chin + 0.78 * HH], [tcx + 40 * u, chin + 0.78 * HH]], '#6a4a2a', 0.07 * HH, 1.4 * u); };
export const OUT = {
  major: { o: { jacket: KHAKI, pants: KHAKI_D, boots: '#4a3020', hat: 'cap', cap: '#8a7d50', moustache: '#4a3426', skin: SKIN, buttons: '#d9b45a', build: 'stout' }, extra: tunic, seed: 5 },
  sold1: { o: { jacket: KHAKI, pants: KHAKI_D, boots: '#4a3020', hat: 'hair', hair: '#3a2a20', skin: SKINS[1], buttons: '#c9a040' }, extra: tunic, head: slouch, seed: 9 },
  sold2: { o: { jacket: KHAKI, pants: KHAKI_D, boots: '#4a3020', hat: 'hair', hair: '#a8622e', skin: SKINS[0], buttons: '#c9a040' }, extra: tunic, head: slouch, seed: 13 },
  farmer: { o: { jacket: '#5a7ab5', pants: '#6a5038', boots: '#4a3020', hat: 'hair', hair: '#5a3b2a', skin: '#f1c49b', buttons: '#e8e2d2' }, head: akubra('#7a5230'), seed: 17 },
  official: { o: { jacket: '#3a3a48', pants: '#2c2c36', boots: '#1d1a1a', hat: 'hair', hair: '#2a201a', skin: SKINS[2], buttons: '#8a8a96', moustache: '#2a201a' }, head: glasses, seed: 21 },
};
export const crowd = (v) => ({ o: townsfolk(v), seed: 40 + v });

// arm poses: [elbow dx, elbow dy, hand dx, hand dy, front?] in u from the shoulder, x mirrored per side
export const ARM = {
  hang: [14, 45, 17, 86], up: [16, -28, 22, -82], point: [32, -2, 64, -14], hip: [28, 28, 6, 52],
  shrug: [30, 14, 44, -12], hold: [18, 42, -6, 52, true], holdHi: [20, 30, -4, 20, true], chin: [18, 42, -14, -4, true],
  reach: [30, 20, 58, 30, true], lift: [22, 4, 10, -40, true], cheer: [20, -30, 34, -80], scrub: [26, 20, 2, 30, true],
  wave: [22, -20, 34, -66], salute: [26, -8, 6, -62], sad: [10, 50, 4, 78], phone: [16, 36, -8, 40, true], ear: [16, 10, -10, -42, true],
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
  scroll: (p, x, y, u) => { p.poly([[x - 26 * u, y - 70 * u], [x + 26 * u, y - 70 * u], [x + 26 * u, y + 6 * u], [x - 26 * u, y + 6 * u]], '#f4ecd2', 2.4 * u); for (const yy of [y - 70 * u, y + 6 * u]) p.ell(x, yy, 30 * u, 5 * u, '#e2d4ac', 2 * u); const g = p.g; g.save(); g.fillStyle = '#c9302c'; g.font = `900 ${22 * u}px Georgia, serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('WAR!', x, y - 32 * u); g.restore(); p.dot(x, y, 5.5 * u); },
  phone: (p, x, y, u) => { p.band([[x, y + 4 * u], [x, y - 40 * u]], '#1d1a1a', 4 * u, 1.2 * u); p.ell(x, y - 44 * u, 7 * u, 5 * u, '#1d1a1a', 1.5 * u); p.ell(x, y + 8 * u, 12 * u, 4 * u, '#1d1a1a', 1.5 * u); p.dot(x, y, 5.5 * u); },
  ear: (p, x, y, u) => { p.poly([[x - 4 * u, y - 4 * u], [x + 12 * u, y - 10 * u], [x + 12 * u, y + 6 * u]], '#1d1a1a', 1.5 * u); p.dot(x, y, 5.5 * u); },
  map: (p, x, y, u) => { p.poly([[x - 40 * u, y - 46 * u], [x + 30 * u, y - 50 * u], [x + 34 * u, y + 4 * u], [x - 38 * u, y + 8 * u]], '#efe2b8', 2.4 * u); p.stroke([[x - 30 * u, y - 10 * u], [x - 10 * u, y - 26 * u], [x + 8 * u, y - 18 * u]], 1.6 * u, '#3060b0'); p.stroke([[x + 14 * u, y - 26 * u], [x + 24 * u, y - 16 * u]], 2.4 * u, '#c9302c'); p.stroke([[x + 24 * u, y - 26 * u], [x + 14 * u, y - 16 * u]], 2.4 * u, '#c9302c'); p.dot(x, y, 5.5 * u); },
  whiteflag: (p, x, y, u) => { p.band([[x, y + 10 * u], [x + 4 * u, y - 90 * u]], '#8a5a34', 3 * u, 1.2 * u, 'round'); p.poly([[x + 4 * u, y - 90 * u], [x + 44 * u, y - 84 * u], [x + 40 * u, y - 62 * u], [x + 4 * u, y - 60 * u]], '#ffffff', 2.2 * u); p.dot(x, y, 5.5 * u); },
  moneybag: (p, x, y, u) => { p.poly([[x - 16 * u, y + 2 * u], [x + 16 * u, y + 2 * u], [x + 22 * u, y + 30 * u], [x + 12 * u, y + 40 * u], [x - 12 * u, y + 40 * u], [x - 22 * u, y + 30 * u]], '#c9a46a', 2.4 * u); p.stroke([[x - 10 * u, y + 4 * u], [x + 10 * u, y + 4 * u]], 3 * u, '#6a4a2a'); const g = p.g; g.save(); g.fillStyle = '#2a7a3a'; g.font = `900 ${20 * u}px Georgia, serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('£', x, y + 24 * u); g.restore(); p.dot(x, y, 5.5 * u); },
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

/** emu on a 600 x 1000 design space, feet at y 975, facing right (flip for left).
 *  s: { phase, mode: stand|walk|run|peck|flap, expr: neutral|smug|surprise|happy, bib, helmet, treads, flip, blink, hop, S, ox, oy } */
export const drawEmu = (g, s) => {
  const { phase = 0, mode = 'stand', expr = 'neutral', bib = false, helmet = false, treads = false, flip = false, blink = 0, hop = 0 } = s;
  const S = s.S ?? g.canvas.width / 600;
  g.save(); g.translate(s.ox || 0, s.oy || 0); g.scale(S, S); if (flip) { g.translate(600, 0); g.scale(-1, 1); }
  const p = new Pen(g); p.ol = 9;
  const two = Math.PI * 2, run = mode === 'run', walk = mode === 'walk';
  const bob = run ? 22 * Math.abs(Math.sin(two * phase)) : walk ? 9 * Math.abs(Math.sin(two * phase)) : 0;
  const bx = 270, by = 590 - bob - hop;
  const legCol = '#8a8378';
  if (!treads) for (const [side, ph] of [[0, 0], [1, 0.5]]) {
    const sw = run ? Math.sin(two * (phase + ph)) * 0.85 : walk ? Math.sin(two * (phase + ph)) * 0.42 : (side ? 0.1 : -0.1);
    const lift = run || walk ? Math.max(0, Math.cos(two * (phase + ph))) * (run ? 110 : 45) : 0;
    const hip = [bx + 20, by + 80], foot = [hip[0] + Math.sin(sw) * 240, 975 - lift - hop], knee = [(hip[0] + foot[0]) / 2 + 34, (hip[1] + foot[1]) / 2 - 10];
    p.line([hip, knee, foot], side ? legCol : '#76705f', 17);
    p.stroke([[foot[0] - 14, foot[1]], [foot[0] + 46, foot[1] + 2]], 9); p.stroke([[foot[0] - 2, foot[1]], [foot[0] + 34, foot[1] - 16]], 8);
  }
  // body: shaggy feather blob
  const pts = [];
  for (let i = 0; i < 80; i++) { const a = i / 80 * two, j = 1 + 0.07 * Math.sin(9 * a + 1) + 0.05 * Math.sin(17 * a); pts.push([bx + 180 * Math.cos(a) * j, by + 125 * Math.sin(a) * j * (Math.sin(a) > 0 ? 1.05 : 0.95)]); }
  p.poly(pts, '#5b4630', 9);
  for (let i = 0; i < 9; i++) { const x = bx - 130 + i * 30, y = by - 50 + (i % 3) * 40; p.stroke([[x, y], [x - 26, y + 34]], 5, '#3e2f20'); }
  if (mode === 'flap') { const a = Math.sin(two * phase * 2) * 0.9; const wx = bx + 30, wy = by - 40; p.poly([[wx, wy], [wx - 60 * Math.cos(a), wy - 70 * Math.sin(a) - 10], [wx - 70, wy + 10]], '#4a3826', 7); }
  if (treads) { p.poly([[bx - 190, 830], [bx + 190, 830], [bx + 220, 900], [bx + 190, 965], [bx - 190, 965], [bx - 220, 900]], '#4a4f40', 9); for (let i = 0; i < 6; i++) p.ell(bx - 150 + i * 60, 897, 26, 26, '#7d8470', 6);
    p.poly([[bx - 120, by + 70], [bx + 120, by + 70], [bx + 100, 835], [bx - 100, 835]], '#5f6a4c', 8); }
  // neck + head
  const peck = mode === 'peck', head = peck ? [bx + 230, 880 + 12 * Math.sin(two * phase * 2)] : [bx + 150 + (run ? 50 : 0), 250 + (run ? 40 : 0) + bob * 0.3 - hop];
  const n0 = [bx + 120, by - 70], ctrl = peck ? [bx + 250, by - 10] : [bx + 175, by - 220];
  p.line([n0, ctrl, head], '#8e9aad', 42);
  if (bib) { p.poly([[head[0] - 30, head[1] + 40], [head[0] + 30, head[1] + 40], [head[0], head[1] + 120]], '#ffffff', 6); p.stroke([[head[0] - 15, head[1] + 60], [head[0] + 15, head[1] + 60]], 5, '#d23b3b'); p.stroke([[head[0] - 8, head[1] + 85], [head[0] + 8, head[1] + 85]], 5, '#d23b3b'); }
  p.ell(head[0], head[1], 46, 40, '#6f7d93', 9);
  p.poly([[head[0] + 36, head[1] - 6], [head[0] + 90, head[1] + 8], [head[0] + 36, head[1] + 20]], '#3c3a3a', 6);
  if (helmet) { p.ell(head[0], head[1] - 18, 56, 40, '#5f6a4c', 8, 180, 360); p.stroke([[head[0] - 62, head[1] - 18], [head[0] + 62, head[1] - 18]], 10, '#3e4632'); }
  const ex = head[0] + 12, ey = head[1] - 8;
  if (blink >= 1) p.stroke([[ex - 14, ey], [ex + 14, ey]], 6);
  else if (expr === 'surprise') { p.ell(ex, ey, 20, 21, '#ffffff', 5); p.dot(ex + 4, ey, 7); }
  else if (expr === 'happy') p.arc(ex, ey + 4, 14, 10, 200, 340, 6);
  else { p.ell(ex, ey, 15, 16, '#ffffff', 5); p.dot(ex + 5, ey + (expr === 'smug' ? 5 : 1), 6.5);
    if (expr === 'smug') { p.poly([[ex - 17, ey - 17], [ex + 17, ey - 17], [ex + 17, ey], [ex - 17, ey]], '#6f7d93', 0); p.stroke([[ex - 17, ey], [ex + 17, ey - 2]], 5); p.stroke([[ex - 16, ey - 24], [ex + 16, ey - 18]], 6); } }
  g.restore();
};
/** thought bubble with an emu "tank" inside, 600 x 600 canvas; t 0..1 pop-in */
export const drawTankBubble = (g, t, ph) => {
  const w = g.canvas.width, k = w / 600, p = new Pen(g); g.save(); g.scale(k, k);
  const blobs = [[300, 260, 230, 190], [170, 230, 110, 100], [430, 230, 110, 100], [300, 120, 140, 90], [300, 380, 170, 90]];
  for (const [x, y, rx, ry] of blobs) p.ell(x, y, rx, ry, null, 14);
  for (const [x, y, rx, ry] of blobs) p.ell(x, y, rx, ry, '#ffffff', 0);
  p.ell(150, 500, 34, 28, '#ffffff', 9); p.ell(90, 560, 20, 17, '#ffffff', 7);
  g.restore();
  drawEmu(g, { mode: 'stand', expr: 'smug', helmet: true, treads: true, S: 0.36 * k, ox: 190 * k + 6 * Math.sin(ph * 20) * k, oy: 70 * k });
};
