// Cast for "Ang Luyang Naging Ginto" (Maria Makiling legend): outfits, props, effect drawings.
import { Pen, bodyFront, INK, mix, fxBurst, fxPuff, fxStars } from './toonbase.js';
export { Pen, INK, fxBurst, fxPuff, fxStars };

const SK1 = '#c48a5e', SK2 = '#b07a52', SK3 = '#d29c6e', SKM = '#dca57c';
export const GINGER = '#d9b37a', GOLD = '#f2c440';

// a knobby ginger root centred at x,y, width w; gold = gilded version
export const ginger = (p, x, y, w, gold = false, lw = 3) => {
  const c = gold ? GOLD : GINGER, d = gold ? '#c9952a' : '#b88f58';
  const lobes = [[-0.32, 0.05, 0.22, 0.17], [-0.08, -0.06, 0.24, 0.2], [0.18, 0.04, 0.22, 0.18], [0.36, -0.12, 0.13, 0.12], [-0.14, -0.26, 0.12, 0.13]];
  for (const [dx, dy, rx, ry] of lobes) p.ell(x + dx * w, y + dy * w, rx * w, ry * w, c, lw);
  for (const [dx, dy] of [[-0.2, 0.04], [0.05, -0.04], [0.28, -0.04]]) p.stroke([[x + dx * w, y + (dy - 0.1) * w], [x + dx * w, y + (dy + 0.1) * w]], lw * 0.7, d);
  if (gold) for (const [dx, dy] of [[-0.12, -0.12], [0.2, -0.04]]) p.ell(x + dx * w, y + dy * w, 0.05 * w, 0.03 * w, '#fff6c8', 0);
};
// salakot (wide conical hat). onHead: drawn on the head; bowl: upside-down full of ginger, held at x,y
const salakotShape = (p, x, y, w, col = '#c9a05a', lw = 3) => {
  p.poly([[x - w / 2, y], [x - w * 0.08, y - w * 0.32], [x + w * 0.08, y - w * 0.32], [x + w / 2, y]], col, lw);
  for (let i = 1; i < 4; i++) p.stroke([[x - w / 2 * (1 - i * 0.22), y - w * 0.32 * i * 0.22 * 1.1], [x + w / 2 * (1 - i * 0.22), y - w * 0.32 * i * 0.22 * 1.1]], lw * 0.5, '#8a6a32');
  p.ell(x, y - w * 0.33, w * 0.06, w * 0.03, '#8a6a32', lw * 0.6);
};
export const salakotBowl = (p, x, y, w, n = 6, gold = false, lw = 3) => {
  for (let i = 0; i < n; i++) ginger(p, x + (i - (n - 1) / 2) * w * 0.15, y - w * 0.04 - (i % 2) * w * 0.07, w * 0.3, gold, lw * 0.8);
  p.poly([[x - w / 2, y], [x + w / 2, y], [x + w * 0.08, y + w * 0.32], [x - w * 0.08, y + w * 0.32]], '#c9a05a', lw);
  for (let i = 1; i < 4; i++) p.stroke([[x - w / 2 * (1 - i * 0.22), y + w * 0.32 * i * 0.22 * 1.1], [x + w / 2 * (1 - i * 0.22), y + w * 0.32 * i * 0.22 * 1.1]], lw * 0.5, '#8a6a32');
};

// ---- head + body extras ----
const salakotHead = (p, h) => { const { cx, crown, HH, W, u } = h; salakotShape(p, cx, crown + 0.2 * HH, 1.25 * W, '#c9a05a', 3 * u); };
const longHair = (p, c) => { // long black hair falling over both shoulders, with a flower
  const { tcx, chin, HH, u } = c;
  for (const s of [-1, 1]) p.poly([[tcx + s * 22 * u, chin - 6 * u], [tcx + s * 34 * u, chin + 0.1 * HH], [tcx + s * 32 * u, chin + 0.62 * HH], [tcx + s * 22 * u, chin + 0.7 * HH], [tcx + s * 18 * u, chin + 0.2 * HH]], '#1d1414', 2.4 * u);
  for (let i = -3; i <= 3; i++) p.dot(tcx + i * 5 * u, chin + 0.42 * HH, 1.8 * u, '#f4f1ea');
};
const flowerCrown = (p, h) => { const { cx, crown, HH, W, u } = h; const cols = ['#f4f1ea', '#f2c440', '#e88aa8', '#f4f1ea', '#e88aa8', '#f2c440', '#f4f1ea'];
  for (let i = 0; i < 7; i++) { const x = cx + (i - 3) * 0.12 * W, y = crown + 0.17 * HH + Math.abs(i - 3) * 0.02 * HH; p.ell(x, y, 0.05 * W, 0.05 * W, cols[i], 1.6 * u); p.dot(x, y, 0.016 * W, '#c9952a'); } };
const greyBun = (p, h) => { const { cx, crown, HH, W, u } = h; p.ell(cx, crown + 0.02 * HH, 0.17 * W, 0.11 * HH, '#a8a29a', 3 * u); };
const kerchief = (col) => (p, h) => { const { cx, crown, HH, W, u } = h; p.band([[cx - 0.42 * W, crown + 0.22 * HH], [cx + 0.42 * W, crown + 0.22 * HH]], col, 0.07 * HH, 1.4 * u); };

export const OUT = {
  maria: { id: 'maria', o: { jacket: '#f4efe2', pants: '#e8f0e0', boots: '#c9a05a', hat: 'hair', hair: '#1d1414', skin: SKM, dress: '#cfe6c8', buttons: '#f2c440' }, extra: longHair, head: flowerCrown, seed: 7 },
  hunter: { id: 'hunter', o: { jacket: '#e9dcc0', pants: '#6a4a32', boots: '#5a3a22', hat: 'hair', hair: '#1d1414', skin: SK2, buttons: '#8a6a32' }, head: salakotHead, seed: 13 },
  hunterBare: { id: 'hunterBare', o: { jacket: '#e9dcc0', pants: '#6a4a32', boots: '#5a3a22', hat: 'hair', hair: '#1d1414', skin: SK2, buttons: '#8a6a32' }, seed: 13 },
  g1: { id: 'g1', o: { jacket: '#8c3b4a', pants: '#3a2a2a', boots: '#4a3426', hat: 'hair', hair: '#241a16', skin: SK1, moustache: '#241a16', buttons: '#f2c440', build: 'stout' }, seed: 21 },
  g2: { id: 'g2', o: { jacket: '#2f5f6a', pants: '#4a3426', boots: '#4a3426', hat: 'hair', hair: '#1d1414', skin: SK3, buttons: '#f4f1ea' }, head: kerchief('#c2453c'), seed: 25 },
  g3: { id: 'g3', o: { jacket: '#b5653f', pants: '#3a2a2a', boots: '#4a3426', hat: 'hair', hair: '#1d1414', skin: SK1, dress: '#5a3a5a', buttons: '#f4f1ea' }, seed: 29 },
  lola: { id: 'lola', o: { jacket: '#5a7a9a', pants: '#3a2a2a', boots: '#4a3426', hat: 'hair', hair: '#a8a29a', skin: SK2, dress: '#7a3a3a', buttons: '#f4f1ea' }, head: greyBun, seed: 33 },
  kid: { id: 'kid', o: { jacket: '#d9a441', pants: '#5a3a2a', boots: '#6a4a32', hat: 'hair', hair: '#1d1414', skin: SK1, build: 'kid', buttons: '#7a2420' }, seed: 31 },
};

// arm poses: [elbow dx, elbow dy, hand dx, hand dy, front?] in u from the shoulder, x mirrored per side
export const ARM = {
  hang: [14, 45, 17, 86], up: [16, -28, 22, -82], point: [32, -2, 64, -14], hip: [28, 28, 6, 52],
  shrug: [30, 14, 44, -12], hold: [18, 42, -6, 52, true], holdHi: [20, 30, -4, 20, true], chin: [18, 42, -14, -4, true],
  reach: [30, 20, 58, 30, true], lift: [22, 4, 10, -40, true], cheer: [20, -30, 34, -80], wave: [22, -20, 34, -66],
  carry: [26, 34, -10, 30, true], carryLo: [24, 44, -8, 58, true], toss: [20, -34, -6, -70], rub: [24, -10, -8, -52, true],
  dig: [28, 30, 26, 62, true], whisper: [18, 30, -20, -12, true], wag: [26, -10, 30, -46],
};

// ---------------- props held in the hand ----------------
export const PROP = {
  sack: (p, x, y, u) => { p.poly([[x - 12 * u, y], [x + 12 * u, y], [x + 16 * u, y + 34 * u], [x - 16 * u, y + 34 * u]], '#b8a47a', 2.2 * u); p.stroke([[x - 10 * u, y + 4 * u], [x + 10 * u, y + 4 * u]], 2 * u, '#7a6a4a'); p.dot(x, y, 5.5 * u); },
  salakotEmpty: (p, x, y, u) => { salakotShape(p, x, y - 2 * u, 70 * u, '#c9a05a', 2.4 * u); p.dot(x, y, 5.5 * u); },
  salakotFull: (p, x, y, u) => { salakotBowl(p, x, y - 8 * u, 74 * u, 6, false, 2.4 * u); p.dot(x, y, 5.5 * u); },
  salakotFew: (p, x, y, u) => { salakotBowl(p, x, y - 8 * u, 74 * u, 3, false, 2.4 * u); p.dot(x, y, 5.5 * u); },
  ginger: (p, x, y, u) => { ginger(p, x, y - 10 * u, 34 * u, false, 2.2 * u); p.dot(x, y, 5.5 * u); },
  goldGinger: (p, x, y, u) => { ginger(p, x, y - 10 * u, 34 * u, true, 2.2 * u); p.dot(x, y, 5.5 * u); },
  bigGold: (p, x, y, u) => { ginger(p, x, y - 22 * u, 70 * u, true, 3 * u); p.dot(x, y, 5.5 * u); },
  shovel: (p, x, y, u) => { p.band([[x, y - 40 * u], [x, y + 40 * u]], '#8a5a34', 4 * u, 1.4 * u, 'round'); p.poly([[x - 11 * u, y + 40 * u], [x + 11 * u, y + 40 * u], [x + 9 * u, y + 64 * u], [x, y + 72 * u], [x - 9 * u, y + 64 * u]], '#9aa3a8', 2 * u); p.dot(x, y, 5.5 * u); },
  none: () => {},
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
/** ginger root fx on a 512 canvas; gold 0..1 blends to gold with a glint */
export const drawGinger = (g, { gold = 0 } = {}) => {
  const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512);
  if (gold > 0) { g.save(); g.scale(512 / s, 512 / s); glow(g, '255,220,120', 0.75 * gold); g.restore(); }
  ginger(new Pen(g), 256, 280, 300, gold > 0.5, 9);
  g.restore();
};
/** fireflies / spirit motes on a 1024 canvas */
export const drawMotes = (g, { t = 0, n = 40, seed = 5, a = 1 } = {}) => {
  const s = g.canvas.width; g.save(); g.scale(s / 1024, s / 1024);
  for (let i = 0; i < n; i++) {
    const r1 = Math.abs(Math.sin(i * 12.9898 + seed) * 43758.5453) % 1, r2 = Math.abs(Math.sin(i * 78.233 + seed) * 12345.678) % 1;
    const x = (r1 * 1024 + 40 * Math.sin(t * 0.9 + i)) % 1024, y = (r2 * 1024 - t * 30 * (0.5 + r1) + 2048) % 1024, b = a * (0.5 + 0.5 * Math.sin(t * 4 + i * 2.1));
    const gr = g.createRadialGradient(x, y, 0, x, y, 22); gr.addColorStop(0, `rgba(255,248,190,${b})`); gr.addColorStop(1, 'rgba(255,248,190,0)'); g.fillStyle = gr; g.fillRect(x - 22, y - 22, 44, 44);
  }
  g.restore();
};
/** a thought icon: drumstick or coin, struck through with a red X, on a 512 canvas */
export const drawNo = (g, kind) => {
  const s = g.canvas.width, p = new Pen(g); g.save(); g.scale(s / 512, s / 512);
  p.ell(256, 256, 200, 200, '#ffffff', 10);
  if (kind === 'meat') { p.ell(230, 230, 95, 75, '#b5653f', 9); p.band([[300, 290], [370, 360]], '#f4efe2', 26, 8, 'round'); p.ell(385, 375, 22, 22, '#f4efe2', 8); }
  else { p.ell(256, 256, 100, 100, '#f2c440', 10); p.ell(256, 256, 62, 62, null, 7); p.stroke([[256, 215], [256, 297]], 10, '#c9952a'); }
  p.stroke([[120, 120], [392, 392]], 30, '#e2453c'); p.stroke([[392, 120], [120, 392]], 30, '#e2453c');
  g.restore();
};
/** the sleeping maiden outline over the mountain, on a 1024x512 canvas (soft glowing line art) */
export const drawMaiden = (g, a = 1, hill = false) => {
  const w = g.canvas.width, h = g.canvas.height; g.save(); g.scale(w / 1024, h / 512);
  g.lineCap = 'round'; g.lineJoin = 'round';
  g.translate(0, 452); g.scale(1, 2.3); g.translate(0, -452);
  const path = () => { g.beginPath(); g.moveTo(0, 452); g.lineTo(40, 430);
    g.bezierCurveTo(70, 400, 90, 330, 150, 318); // hair flowing up to the head
    g.bezierCurveTo(190, 300, 215, 290, 232, 300); // forehead
    g.bezierCurveTo(240, 304, 236, 318, 248, 324); // nose
    g.bezierCurveTo(256, 330, 248, 340, 258, 346); // lips
    g.bezierCurveTo(266, 352, 262, 362, 280, 366); // chin
    g.bezierCurveTo(320, 372, 350, 362, 380, 330); // neck to chest
    g.bezierCurveTo(410, 300, 450, 300, 480, 330); // chest
    g.bezierCurveTo(540, 380, 640, 372, 700, 352); // waist
    g.bezierCurveTo(760, 300, 820, 300, 850, 345); // knees
    g.bezierCurveTo(890, 390, 950, 395, 1000, 430); // feet
    g.lineTo(1024, 446);
  };
  if (hill) { path(); g.lineTo(1024, 512); g.lineTo(0, 512); g.closePath(); const gr = g.createLinearGradient(0, 290, 0, 512); gr.addColorStop(0, '#5f8a6e'); gr.addColorStop(1, '#7f9f86'); g.fillStyle = gr; g.fill(); g.strokeStyle = 'rgba(36,23,38,0.55)'; g.lineWidth = 3; path(); g.stroke(); g.restore(); return; }
  g.strokeStyle = `rgba(255,236,170,${0.25 * a})`; g.lineWidth = 34; path(); g.stroke();
  g.strokeStyle = `rgba(255,244,205,${0.55 * a})`; g.lineWidth = 14; path(); g.stroke();
  g.strokeStyle = `rgba(255,255,240,${0.95 * a})`; g.lineWidth = 5; path(); g.stroke();
  g.restore();
};
