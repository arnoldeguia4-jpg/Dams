// Story timeline: shots, cameras, light, world state, actors and effects as pure functions of the frame.
import { THREE, ss, easeOut, easeIn, back, spring, win, clamp, lerp, kick, idle, blinkAt, q } from './engine.js';
import { OUT, ARM, drawChar, drawGerm, drawSpore, drawText, drawConfetti, drawColony, Pen, fxBurst, fxPuff, crowd } from './cast.js';

export const TOTAL = 2322;
const LX = -120, MX = 60, OX = 150, FX = 200, CX = 260, SX = 320;
export const FLASHES = [[163, 172], [674, 684], [1594, 1603], [2168, 2178]];

// ---------------- shots ----------------
// each: a..b frames, light, action point (shadow centre), cam keys, dof {c, pt}
export const SHOTS = [
  { id: 'hook', a: 0, b: 168, light: 'lab', at: [1, 1, -1.8], span: 7,
    cam: [{ f: 0, pos: [-0.3, 1.45, 1.05], look: [-0.33, 1.3, -2.0], fov: 40 }, { f: 98, pos: [-0.28, 1.43, 0.75], look: [-0.32, 1.32, -2.0], fov: 40 },
      { f: 128, pos: [2.0, 1.6, 0.6], look: [3.65, 1.0, -1.55], fov: 40, ease: easeOut, path: [[1.0, 1.6, 0.4]] }, { f: 170, pos: [2.25, 1.5, 0.15], look: [3.65, 0.98, -1.55], fov: 40 }],
    dof: (f) => ({ c: 10, pt: f < 112 ? [-0.25, 1.4, -1.6] : [3.65, 1.0, -1.5] }) },
  { id: 'london', a: 169, b: 242, light: 'day', at: [LX, 5, -5], span: 30,
    cam: [{ f: 169, pos: [LX + 4, 34, 40], look: [LX + 2, 9, -12], fov: 45 }, { f: 242, pos: [LX + 3.0, 9.6, 6.5], look: [LX + 3.4, 9.2, -7.5], fov: 42, ease: ss, path: [[LX + 2, 18, 18]] }],
    dof: () => ({ c: 0 }) },
  { id: 'brilliant', a: 243, b: 400, light: 'lab', at: [0.5, 1, -1.8], span: 7,
    cam: [{ f: 243, pos: [0.3, 1.75, 4.2], look: [0.0, 1.25, -2.0], fov: 42 }, { f: 320, pos: [0.25, 1.6, 2.2], look: [0.1, 1.3, -1.8], fov: 40 },
      { f: 350, pos: [0.9, 1.5, 0.6], look: [1.05, 1.15, -2.1], fov: 40 }, { f: 400, pos: [0.85, 1.45, 0.3], look: [1.0, 1.1, -2.1], fov: 40 }],
    kicks: [[366, 0.05]], dof: (f) => ({ c: f < 330 ? 4 : 9, pt: f < 330 ? [0, 1.5, -1.5] : [1.0, 1.2, -1.6] }) },
  { id: 'dishes', a: 401, b: 505, light: 'lab', at: [-1, 1.5, -2.5], span: 7,
    cam: [{ f: 401, pos: [-3.3, 2.1, -0.9], look: [-2.8, 1.75, -2.85], fov: 40 }, { f: 505, pos: [0.2, 1.75, -0.8], look: [0.5, 1.55, -2.85], fov: 40, path: [[-1.6, 1.6, -0.6]] }],
    dof: (f) => ({ c: 8, pt: [lerp(-2.8, 0.4, win(f, 401, 505)), 1.8, -2.85] }) },
  { id: 'gerald', a: 506, b: 555, light: 'lab', at: [MX + 0.8, 0, 1], span: 6,
    cam: [{ f: 506, pos: [MX + 1.05, 1.0, 3.9], look: [MX + 0.95, 0.32, 1.1], fov: 38 }, { f: 555, pos: [MX + 1.0, 0.85, 3.4], look: [MX + 0.95, 0.32, 1.1], fov: 38 }],
    dof: () => ({ c: 12, pt: [MX + 0.7, 0.3, 1.05] }) },
  { id: 'holiday', a: 556, b: 678, light: 'lab', at: [-3, 1, 0.5], span: 7,
    cam: [{ f: 556, pos: [-0.5, 1.55, 3.8], look: [-2.8, 1.2, 0.5], fov: 40 }, { f: 678, pos: [-1.1, 1.5, 3.0], look: [-3.6, 1.2, 0.6], fov: 40 }],
    dof: () => ({ c: 4, pt: [-3, 1.4, 0.6] }) },
  { id: 'back', a: 679, b: 744, light: 'lab', at: [-2, 1, -0.5], span: 7,
    cam: [{ f: 679, pos: [-1.6, 1.6, 3.0], look: [-4.0, 1.25, 0.7], fov: 40 }, { f: 700, pos: [-1.6, 1.6, 3.0], look: [-3.6, 1.25, 0.5], fov: 40 }, { f: 722, pos: [-0.5, 1.6, 2.0], look: [-0.8, 1.3, -1.1], fov: 40 },
      { f: 744, pos: [0.15, 1.5, 0.3], look: [-0.25, 1.4, -1.6], fov: 40 }],
    kicks: [[684, 0.04]], dof: (f) => ({ c: f < 712 ? 3 : 8, pt: f < 712 ? [-4, 1.4, 0.7] : [-0.3, 1.5, -1.5] }) },
  { id: 'mould', a: 745, b: 802, light: 'lab', at: [MX, 0, 0], span: 5,
    cam: [{ f: 745, pos: [MX + 0.05, 3.1, 2.6], look: [MX - 0.15, 0.1, 0.05], fov: 40 }, { f: 802, pos: [MX - 0.1, 2.1, 1.6], look: [MX - 0.25, 0.1, 0.1], fov: 40 }],
    dof: () => ({ c: 9, pt: [MX - 0.27, 0.1, 0.14] }) },
  { id: 'gross', a: 803, b: 857, light: 'lab', at: [0, 1, -1.5], span: 6,
    cam: [{ f: 803, pos: [0.2, 1.5, 0.45], look: [-0.1, 1.38, -1.55], fov: 38 }, { f: 857, pos: [0.25, 1.5, 0.2], look: [-0.08, 1.38, -1.55], fov: 38 }],
    kicks: [[804, 0.025]], dof: () => ({ c: 12, pt: [-0.15, 1.55, -1.5] }) },
  { id: 'ring', a: 858, b: 1137, light: 'lab', at: [MX, 0, 0], span: 5,
    cam: [{ f: 858, pos: [MX + 0.1, 2.6, 2.9], look: [MX - 0.2, 0.1, 0.25], fov: 40 }, { f: 1000, pos: [MX - 0.05, 1.55, 1.75], look: [MX - 0.25, 0.1, 0.35], fov: 40 },
      { f: 1040, pos: [MX - 0.1, 1.5, 1.6], look: [MX - 0.28, 0.1, 0.3], fov: 40 }, { f: 1075, pos: [MX + 0.05, 2.5, 2.3], look: [MX - 0.27, 0.1, 0.15], fov: 40, roll: -3 },
      { f: 1137, pos: [MX - 0.2, 1.35, 1.45], look: [MX - 0.55, 0.45, -0.1], fov: 40, roll: 0 }],
    kicks: [[1015, 0.03], [1108, 0.03]], dof: (f) => ({ c: 10, pt: f < 1100 ? [MX - 0.27, 0.1, 0.6] : [MX - 0.72, 0.8, -0.1] }) },
  { id: 'juice', a: 1138, b: 1235, light: 'lab', at: [0.5, 1, -1.5], span: 6,
    cam: [{ f: 1138, pos: [1.6, 1.5, 1.2], look: [0.5, 1.35, -1.6], fov: 40 }, { f: 1235, pos: [1.0, 1.5, 0.5], look: [0.45, 1.4, -1.6], fov: 40, path: [[1.4, 1.5, 0.8]] }],
    dof: () => ({ c: 9, pt: [0.55, 1.5, -1.5] }) },
  { id: 'germs', a: 1236, b: 1337, light: 'lab', at: [MX, 0, 0], span: 5,
    cam: [{ f: 1236, pos: [MX, 1.7, 3.6], look: [MX, 0.45, 0], fov: 40 }, { f: 1337, pos: [MX + 0.1, 1.35, 2.7], look: [MX, 0.35, 0.1], fov: 40 }],
    kicks: [[1262, 0.03]], dof: () => ({ c: 9, pt: [MX, 0.3, 0.3] }) },
  { id: 'catch', a: 1338, b: 1497, light: 'lab', at: [0, 1, -1], span: 7,
    cam: [{ f: 1338, pos: [0.15, 1.5, 0.7], look: [0.0, 1.45, -1.5], fov: 40 }, { f: 1425, pos: [0.25, 1.55, 1.9], look: [0.0, 1.3, -1.4], fov: 40 }, { f: 1497, pos: [0.35, 1.55, 2.3], look: [0.0, 1.25, -1.3], fov: 40 }],
    dof: (f) => ({ c: 7, pt: f < 1430 ? [0, 1.5, -1.5] : [0, 1.4, -0.6] }) },
  { id: 'shelf', a: 1498, b: 1597, light: 'lab', at: [3.5, 1.5, -2.5], span: 5,
    cam: [{ f: 1498, pos: [3.55, 1.95, -0.6], look: [3.74, 1.88, -2.85], fov: 40 }, { f: 1597, pos: [3.68, 1.9, -1.35], look: [3.74, 1.88, -2.85], fov: 40 }],
    dof: () => ({ c: 9, pt: [3.55, 1.8, -2.8] }) },
  { id: 'oxford', a: 1598, b: 1711, light: 'golden', at: [OX, 1, 0], span: 9,
    cam: [{ f: 1598, pos: [OX - 2.2, 1.7, 6.8], look: [OX - 0.4, 1.15, 0], fov: 42 }, { f: 1711, pos: [OX + 1.6, 1.55, 6.2], look: [OX + 0.4, 1.1, 0], fov: 42, path: [[OX - 0.2, 1.6, 6.3]] }],
    kicks: [[1682, 0.025]], dof: () => ({ c: 5, pt: [OX, 1.4, 2.0] }) },
  { id: 'factory', a: 1712, b: 1800, light: 'day', at: [FX, 2, -3], span: 16,
    cam: [{ f: 1712, pos: [FX - 7, 2.0, 4.5], look: [FX - 3, 1.4, -2], fov: 44 }, { f: 1800, pos: [FX + 5.5, 2.4, 5.2], look: [FX + 8, 1.6, -2], fov: 44 }],
    dof: () => ({ c: 0 }) },
  { id: 'scratch', a: 1801, b: 1885, light: 'day', at: [LX - 24, 1, 2.5], span: 8,
    cam: [{ f: 1801, pos: [LX - 24.0, 1.2, 7.4], look: [LX - 24.0, 0.95, 2.4], fov: 40 }, { f: 1885, pos: [LX - 24.05, 1.15, 6.7], look: [LX - 24.0, 0.95, 2.4], fov: 40 }],
    dof: () => ({ c: 9, pt: [LX - 24.4, 1.0, 2.6] }) },
  { id: 'spore', a: 1886, b: 2002, light: 'night', at: [CX, 3, -1], span: 9,
    cam: [{ f: 1886, pos: [CX + 0.4, 3.8, 10.5], look: [CX - 0.2, 3.6, -1.5], fov: 44 }, { f: 1930, pos: [CX + 0.2, 3.4, 9.2], look: [CX - 0.4, 2.8, -1.5], fov: 44 },
      { f: 2002, pos: [CX + 1.0, 5.6, 3.2], look: [CX + 0.6, 4.9, -2.1], fov: 42, path: [[CX + 1.4, 4.2, 6.5]] }],
    dof: (f) => ({ c: f < 1960 ? 0 : 6, pt: [CX + 0.6, 4.9, -2.1] }) },
  { id: 'genius', a: 2003, b: 2113, light: 'lab', at: [3, 1, -1], span: 6,
    cam: [{ f: 2003, pos: [2.15, 1.55, 1.1], look: [3.2, 1.45, -0.7], fov: 40 }, { f: 2052, pos: [2.35, 1.55, 0.6], look: [3.2, 1.5, -0.7], fov: 40 }, { f: 2113, pos: [2.5, 1.55, 0.25], look: [3.2, 1.52, -0.7], fov: 38 }],
    kicks: [[2095, 0.02]], dof: () => ({ c: 10, pt: [3.2, 1.55, -0.6] }) },
  { id: 'nobel', a: 2114, b: 2173, light: 'stage', at: [SX, 2, -2], span: 10,
    cam: [{ f: 2114, pos: [SX + 0.5, 2.7, 7.6], look: [SX - 0.1, 2.0, -2.4], fov: 27 }, { f: 2173, pos: [SX + 0.3, 2.65, 6.8], look: [SX - 0.1, 2.05, -2.4], fov: 27 }],
    dof: () => ({ c: 4, pt: [SX, 2.2, -2.4] }) },
  { id: 'final', a: 2174, b: TOTAL - 1, light: 'night', at: [0.3, 1, -2], span: 5,
    cam: [{ f: 2174, pos: [0.35, 1.7, 0.9], look: [0.35, 1.0, -2.05], fov: 40 }, { f: 2290, pos: [0.36, 1.2, -1.55], look: [0.35, 0.98, -2.05], fov: 40, roll: 4 }, { f: TOTAL, pos: [0.36, 1.17, -1.62], look: [0.35, 0.98, -2.05], fov: 40, roll: 4.5 }],
    dof: () => ({ c: 12, pt: [0.35, 0.98, -2.05] }) },
];
export const shotAt = (f) => SHOTS.find((s) => f >= s.a && f <= s.b) || SHOTS[SHOTS.length - 1];

// ---------------- characters ----------------
const ch = (id, who, f, pos, o = {}) => {
  const seed = who.seed || 1, I = idle(f, seed), bl = o.noBlink ? 0 : blinkAt(f, seed);
  const s = { who, expr: o.expr || 'neutral', mode: o.mode || 'stand', phase: o.phase || 0, blink: bl, armL: o.armL, armR: o.armR, propL: o.propL, propR: o.propR,
    tilt: q((o.tilt || 0) + I.tilt, 0.25), headTilt: q(o.headTilt || 0, 0.5), facing: o.facing || 0, look: o.look || 0, wave: o.wave, knee: o.knee, head: o.head, flipX: o.flipX };
  const key = JSON.stringify([s.expr, s.mode, q(s.phase, 0.05), s.blink, s.armL, s.armR, s.propL, s.propR, s.tilt, s.headTilt, s.facing, s.look, s.wave != null ? q(s.wave, 0.1) : null, s.knee, s.flipX, o.tag]);
  return { id, kind: 'char', pos: [pos[0] + (o.still ? 0 : I.dx), pos[1] + (o.still ? 0 : I.bob * 0.3), pos[2]], h: o.h ?? 2.25, key, draw: (g) => drawChar(g, s), blobW: o.blobW };
};
const armsBlend = (A, B, t) => A.map((v, i) => (i < 4 ? Math.round(lerp(v, B[i], ss(t))) : (t > 0.5 ? B[i] : v)));
const fx = (id, pos, h, key, draw, o = {}) => ({ id, kind: 'fx', pos: o.ground ? [pos[0], pos[1] + 0.38 * h, pos[2]] : pos, h, key, draw, yaw: o.yaw ?? 'full', soft: o.soft ?? true, res: o.res || [512, 512], unlit: o.unlit ?? true, order: o.order ?? 5 });
const burst = (id, f, at, pos, h = 0.6, col = '#fff3b0') => { const t = (f - at) / 14; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'b' + q(t, 0.04), (g) => { g.save(); g.scale(g.canvas.width / 500, g.canvas.width / 500); fxBurst(new Pen(g), t, col); g.restore(); }); };
const puff = (id, f, at, pos, h = 0.5, n = 16) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'p' + q(t, 0.05), (g) => { g.save(); g.scale(g.canvas.width / 300, g.canvas.width / 300); fxPuff(new Pen(g), t); g.restore(); }); };
const mark = (id, txt, f, a, b, pos, h = 0.45, col = '#ffffff') => { if (f < a || f > b) return null; const s = back(win(f, a, a + 8)); return fx(id, pos, h * Math.max(0.05, s), 'm' + txt, (g) => drawText(g, txt, { col })); };

// ---------------- world state ----------------
export const worldAt = (f) => {
  const S = shotAt(f), w = { shot: S.id };
  w.towerTilt = f < 170 ? 2.2 * Math.sin(f * 0.21) + 1.2 * Math.sin(f * 0.53) : 0;
  w.topple = f < 362 ? 0 : easeIn(win(f, 362, 372)) * 1.5;
  w.door = 0;
  if (S.id === 'holiday') w.door = f < 596 ? 0 : f < 640 ? ss(win(f, 596, 612)) : 1 - easeIn(win(f, 648, 656));
  if (S.id === 'back') w.door = f < 680 ? 0 : back(win(f, 680, 686), 1.2) * (1 - ss(win(f, 715, 735)));
  w.lightBlend = S.id === 'holiday' ? ss(win(f, 656, 676)) : 0;
  w.year = S.id === 'shelf' ? Math.min(1939, 1929 + Math.floor(win(f, 1505, 1588) * 10.99)) : 1928;
  w.dust = S.id === 'shelf' ? win(f, 1505, 1590) : 0;
  w.flicker = S.id === 'shelf' ? 0.5 + 0.5 * Math.sin(win(f, 1505, 1590) * Math.PI * 20) : 0;
  // macro dish state
  if (S.id === 'gerald') w.dish = { mould: 0, ring: 0, gone: 0, circle: 0, dense: true };
  if (S.id === 'mould') w.dish = { mould: 0.55 + 0.45 * ss(win(f, 750, 795)), ring: 0.15, gone: 0, circle: 0 };
  if (S.id === 'ring') w.dish = { mould: 1, ring: 0.15 + 0.85 * ss(win(f, 862, 935)), gone: ss(win(f, 925, 975)), circle: ss(win(f, 1048, 1100)) };
  if (S.id === 'germs') w.dish = { mould: 0, ring: 0, gone: 0, circle: 0, dense: false };
  w.sign = S.id === 'ring' ? back(win(f, 1105, 1118), 2.2) : 0;
  w.dropper = S.id === 'germs' ? 4 - 1.6 * ss(win(f, 1236, 1252)) : 99;
  w.drop = S.id === 'germs' ? (f < 1250 ? null : f < 1262 ? 2.3 - 2.2 * easeIn(win(f, 1250, 1262)) : null) : null;
  w.bottleT = (f - 1712) / 30;
  w.heroGlow = S.id === 'final' ? 0.6 + 0.4 * ss(win(f, 2180, 2240)) + 0.3 * Math.sin(f * 0.15) * 0.2 : 0;
  return w;
};

// ---------------- actors + fx per frame ----------------
export const actorsAt = (f) => {
  const S = shotAt(f), A = [], add = (x) => x && A.push(x);
  const F = OUT.fleming;
  switch (S.id) {
    case 'hook': {
      const shrug = f > 108 ? ss(win(f, 108, 120)) : 0;
      add(ch('fl', F, f, [0.02, 0, -1.45], { expr: f < 108 ? 'whistle' : 'smile', armL: ARM.hip, armR: shrug > 0.5 ? ARM.shrug : ARM.hip, armLx: 1, look: f < 108 ? -0.6 : 0.3, headTilt: f < 108 ? 6 * Math.sin(f * 0.12) : 4 }));
      if (f > 132) add(fx('drip', [3.75 + 0.5, 1.28 - 0.4 * ((f - 132) % 18) / 18, -1.5], 0.06, 'd', (g) => { g.fillStyle = '#8fd0ff'; g.beginPath(); g.ellipse(256, 280, 120, 170, 0, 0, 7); g.fill(); g.lineWidth = 30; g.strokeStyle = '#241726'; g.stroke(); }));
      add(puff('clat', f, 140, [3.55, 1.0, -1.1], 0.4));
      break;
    }
    case 'london': {
      for (let i = 0; i < 4; i++) { const ph = (f * 0.035 + i * 0.25) % 1, x = LX - 10 + i * 6 + (f - 169) * 0.03 * (i % 2 ? 1 : -1);
        add(ch('w' + i, crowd(i), f, [x, 0, -5.5 + (i % 2) * 10.5], { mode: 'stroll', phase: ph, expr: 'smile', still: true })); }
      break;
    }
    case 'brilliant': {
      const shock = f >= 363;
      add(ch('fl', F, f, [0, 0, -1.5], { expr: shock ? 'shock' : f > 285 ? 'grin' : 'smile', armR: shock ? ARM.up : f > 285 ? ARM.up : ARM.hip, armL: shock ? ARM.up : ARM.hip, tilt: shock ? -4 : 0, look: shock ? 0.8 : 0 }));
      add(burst('sp', f, 288, [0.35, 2.25, -1.4], 0.7));
      add(puff('crash', f, 370, [1.75, 1.05, -2.0], 0.9, 20));
      add(burst('crashb', f, 369, [1.8, 1.1, -1.95], 0.6, '#ffffff'));
      break;
    }
    case 'dishes': break;
    case 'gerald': {
      const bob = 0.02 * Math.sin(f * 0.3), wave = f > 528;
      A.push(fx('gerald', [MX + 0.7, 0.1 + bob, 1.05], 0.45, 'g' + (wave ? 1 : 0) + q(Math.sin(f * 0.3), 0.25), (g) => drawColony(g, { t: f / 30, expr: 'smile' }), { yaw: 'full', soft: false, unlit: false, order: 0, ground: true }));
      if (wave) add(burst('gsp', f, 540, [MX + 0.95, 0.65, 1.05], 0.35));
      break;
    }
    case 'holiday': {
      const walk = win(f, 600, 648), x = lerp(-2.7, -4.6, ss(walk)), z = lerp(0.6, 0.75, walk), gone = f > 648;
      if (!gone) add(ch('fl', OUT.flemingHol, f, [x, 0, z], { expr: f < 598 ? 'grin' : 'smile_closed', mode: walk > 0 && walk < 1 ? 'stroll' : 'stand', phase: (f * 0.05) % 1,
        armR: f < 598 ? ARM.wave : ARM.hang, propL: 'suitcase', armL: ARM.hang, wave: f < 598 ? 0.5 + 0.5 * Math.sin(f * 0.5) : undefined }));
      if (f > 600 && f < 640) add(fx('note', [x + 0.3, 2.15, z], 0.3, 'n', (g) => drawText(g, '♪', { col: '#2a3b7a', font: 'bold 380px Georgia, serif', lw: 0 })));
      add(puff('slam', f, 656, [-4.3, 1.2, 1.1], 0.8));
      break;
    }
    case 'back': {
      const walk = win(f, 692, 732), x = lerp(-4.0, -0.25, ss(walk)), z = lerp(0.75, -1.5, ss(walk));
      const atBench = f > 732;
      add(ch('fl', atBench ? F : OUT.flemingTan, f, [x, 0, z], { expr: atBench ? (f > 738 ? 'neutral' : 'smile') : 'grin', mode: walk > 0 && walk < 1 ? 'stroll' : 'stand', phase: (f * 0.05) % 1,
        armR: atBench ? ARM.holdHi : f < 692 ? ARM.up : ARM.hang, propR: atBench ? 'mouldDish' : undefined, propL: atBench ? undefined : 'suitcase', look: atBench ? -0.5 : 0, tag: atBench ? 'b' : 't' }));
      add(puff('coat', f, 729, [x, 1.0, z + 0.1], 1.6, 12));
      if (f >= 739) add(fx('squint', [x + 0.0, 1.6, z + 0.05], 0.01, 'x', () => {}));
      break;
    }
    case 'mould': break;
    case 'gross': {
      const g2 = f >= 813;
      add(ch('fl', F, f, [-0.1, 0, -1.5], { expr: g2 ? (f > 845 ? 'nervous' : 'neutral') : 'pained', armR: g2 ? ARM.reach : ARM.reach, propR: 'mouldDish', armL: g2 ? ARM.shrug : ARM.hip, tilt: g2 ? 2 : -5, headTilt: g2 ? 0 : 8, look: f > 845 ? 0.8 : 0 }));
      add(mark('ew', '!', f, 804, 822, [0.3, 2.1, -1.4], 0.35, '#c6f0a0'));
      break;
    }
    case 'ring': {
      const ringR = 0.95, mx = MX - 0.27, mz = 0.136;
      [[60, 940], [95, 955], [130, 968]].forEach(([deg, at], i) => {
        const a = deg * Math.PI / 180, pos = [mx + ringR * Math.cos(a), 0.1, mz + ringR * Math.sin(a)], pop = clamp((f - at) / 12, 0, 1);
        if (f < at + 12) A.push(fx('col' + i, pos, 0.32, 'c' + q(pop, 0.08) + q(Math.sin(f * 0.25 + i), 0.5), (g) => drawColony(g, { t: f / 30, expr: 'smile', pop }), { soft: pop > 0, unlit: false, order: 0, ground: true }));
      });
      // the survivor that is "not dying"... then gone
      { const a = 75 * Math.PI / 180, pos = [mx + 0.78 * Math.cos(a), 0.1, mz + 0.78 * Math.sin(a)], pop = clamp((f - 1016) / 12, 0, 1);
        if (f >= 975 && f < 1030) A.push(fx('surv', pos, 0.36, 's' + q(pop, 0.08) + q(f / 30, 0.1), (g) => drawColony(g, { t: f / 30, expr: 'dazed', pop }), { soft: pop > 0, unlit: false, order: 0, ground: true })); }
      add(burst('gone', f, 1015, [mx + 0.2, 0.45, mz + 0.75], 0.45, '#ffffff'));
      break;
    }
    case 'juice': {
      const look = f > 1205;
      add(ch('fl', F, f, [0.55, 0, -1.5], { expr: look ? 'grin' : 'neutral', armR: look ? ARM.lift : ARM.holdHi, propR: 'flask', armL: ARM.hip, look: look ? 0.4 : -0.4, headTilt: look ? -4 : 3 }));
      add(burst('js', f, 1212, [0.72, 2.0, -1.4], 0.5));
      break;
    }
    case 'germs': {
      const P = [[-0.6, 0.4], [0.5, 0.5], [-0.1, 0.9], [0.8, -0.2], [-0.9, -0.3], [0.2, -0.5]];
      P.forEach(([x, z], i) => {
        const at = 1268 + i * 9, pop = clamp((f - at) / 12, 0, 1), scared = f > 1258;
        if (f < at + 12) A.push(fx('germ' + i, [MX + x, 0.1, z], 0.5, 'g' + i + q(pop, 0.08) + (scared ? 's' : 'a') + q(Math.sin(f * 0.3 + i), 0.5), (g) => drawGerm(g, { seed: i, t: f / 30, pop, expr: scared ? 'scared' : 'angry', col: ['#8a4fc2', '#5fa84a', '#c2504f'][i % 3] }), { soft: pop > 0, unlit: false, order: 0, res: [400, 400], ground: true }));
      });
      add(burst('drop', f, 1262, [MX, 0.35, 0.05], 0.7, '#fff1a0'));
      break;
    }
    case 'catch': {
      const shake = f > 1390 && f < 1425 ? 6 * Math.sin(f * 1.4) : 0;
      add(ch('fl', F, f, [0, 0, -1.5], { expr: f < 1384 ? 'neutral' : f < 1432 ? 'nervous' : 'nervous', armR: f < 1432 ? ARM.holdHi : ARM.point, propR: 'vial', armL: ARM.hang, tilt: shake * 0.3, look: f > 1432 ? 0.7 : 0 }));
      if (f > 1405 && f < 1425) add(fx('dropl', [0.2, 1.62 - 0.3 * win(f, 1405, 1425), -1.4], 0.05, 'd', (g) => { g.fillStyle = '#f0c93a'; g.beginPath(); g.ellipse(256, 280, 140, 190, 0, 0, 7); g.fill(); g.lineWidth = 30; g.strokeStyle = '#241726'; g.stroke(); }));
      const t1 = win(f, 1432, 1497);
      add(ch('c1', OUT.coll1, f, [lerp(2.2, -1.4, t1), 0, -0.5], { mode: 'stroll', phase: (f * 0.05) % 1, expr: 'whistle', armL: ARM.hang, armR: ARM.hang, flipX: true }));
      add(ch('c2', OUT.coll2, f, [lerp(3.4, -0.3, t1), 0, -0.25], { mode: 'stroll', phase: (f * 0.05 + 0.3) % 1, expr: 'smile_closed', armL: ARM.chin, armR: ARM.hang, flipX: true }));
      break;
    }
    case 'shelf': {
      const t = win(f, 1505, 1590);
      A.push(fx('web', [3.92, 1.88, -2.78], 0.35 * Math.max(0.05, t), 'w' + q(t, 0.1), (g) => { const s = g.canvas.width; g.strokeStyle = 'rgba(245,245,255,0.9)'; g.lineWidth = 6; for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(s, 0); g.lineTo(s - s * Math.cos(i * 0.31), s * Math.sin(i * 0.31)); g.stroke(); } for (let r = 1; r < 5; r++) { g.beginPath(); for (let i = 0; i < 6; i++) { const rr = r * s / 5; g.lineTo(s - rr * Math.cos(i * 0.31), rr * Math.sin(i * 0.31)); } g.stroke(); } }, { yaw: 0 }));
      break;
    }
    case 'oxford': {
      const lift = f > 1676;
      add(ch('o1', OUT.ox1, f, [OX - 0.95, 0, 2.0], { expr: 'smile', armR: ARM.hold, propR: 'ladle', armL: ARM.hip, tilt: 3 * Math.sin(f * 0.2) }));
      add(ch('o2', OUT.ox2, f, [OX + 0.05, 0, 2.25], { expr: lift ? 'grin' : 'smile', armR: lift ? ARM.lift : ARM.hang, propR: 'bucket', armL: lift ? ARM.cheer : ARM.hang }));
      add(ch('o3', OUT.ox3, f, [OX + 1.05, 0, 2.0], { expr: 'grin', armR: ARM.point, armL: ARM.hip, facing: -1 }));
      add(burst('bk', f, 1680, [OX + 0.25, 1.9, 2.35], 0.6));
      break;
    }
    case 'factory': break;
    case 'scratch': {
      const fixed = f >= 1838;
      add(ch('kid', OUT.kid, f, [LX - 24.45, 0.08, 2.6], { expr: fixed ? 'relief_open' : 'pained', knee: fixed ? '#f0c8a0' : '#d0453c', armL: fixed ? ARM.cheer : ARM.hang, armR: fixed ? ARM.cheer : ARM.chin, h: 2.25 }));
      add(ch('par', OUT.parent, f, [LX - 23.6, 0.08, 2.45], { expr: fixed ? 'smile_closed' : 'smile', armL: ARM.reach, propL: fixed ? undefined : 'plaster', armR: ARM.hip, facing: -1 }));
      add(burst('pl', f, 1838, [LX - 24.55, 0.6, 2.75], 0.5));
      break;
    }
    case 'spore': {
      add(ch('flc', F, f, [CX - 1.2, 3.875, -1.6], { expr: 'neutral', armR: ARM.chin, armL: ARM.hang, look: -0.3 }));
      const t = win(f, 1902, 1992), pts = [[CX - 2.0, 1.3, -2.4], [CX + 0.5, 1.8, -1.2], [CX + 3.0, 2.8, -1.0], [CX + 3.1, 4.6, -1.3], [CX + 1.4, 5.3, -1.8], [CX + 0.6, 4.92, -2.1]];
      const n = pts.length - 1, s = ss(t) * n, i = Math.min(n - 1, Math.floor(s)), u = s - i, P0 = pts[i], P1 = pts[i + 1];
      const pos = [lerp(P0[0], P1[0], u), lerp(P0[1], P1[1], u) + 0.08 * Math.sin(f * 0.3), lerp(P0[2], P1[2], u)];
      if (f < 2000) A.push(fx('spore', pos, 0.45, 'sp' + q(f / 30, 0.2), (g) => drawSpore(g, f / 30), { order: 6 }));
      add(burst('land', f, 1993, [CX + 0.6, 5.1, -2.05], 0.5, '#bff5c8'));
      break;
    }
    case 'genius': {
      const looked = f >= 2058, aha = f >= 2093;
      add(ch('fl', F, f, [3.2, 0, -0.7], { expr: aha ? 'grin' : looked ? 'neutral' : 'smile', armR: looked ? ARM.hip : ARM.scrub, propR: looked ? undefined : 'brush', armL: looked ? ARM.holdHi : ARM.hold, propL: 'mouldDish', look: looked ? -0.8 : 0.2, headTilt: looked && !aha ? 6 : 0, tilt: f < 2050 ? 2 * Math.sin(f * 0.6) : 0 }));
      add(mark('q', '?', f, 2025, 2055, [3.5, 1.95, -0.6], 0.4, '#ffe066'));
      add(mark('ex', '!', f, 2093, 2113, [3.5, 1.95, -0.6], 0.45, '#ffe066'));
      break;
    }
    case 'nobel': {
      add(ch('fln', OUT.flemingNobel, f, [SX - 0.2, 1.0, -2.4], { expr: 'relief_open', armR: ARM.wave, wave: 0.5 + 0.5 * Math.sin(f * 0.4), armL: ARM.hang }));
      for (let i = 0; i < 6; i++) { const up = Math.sin(f * 0.5 + i * 1.3) > 0;
        add(ch('cr' + i, crowd(i), f, [SX - 1.6 + i * 0.62, 0, 1.6 + (i % 2) * 0.35], { expr: 'grin', armL: up ? ARM.cheer : ARM.wave, armR: up ? ARM.wave : ARM.cheer, still: false })); }
      A.push(fx('conf', [SX, 2.3, 0.5], 4, 'cf' + f, (g) => drawConfetti(g, (f - 2114) / 30, 3), { res: [512, 512] }));
      break;
    }
    case 'final': {
      const g = (worldAt(f).heroGlow);
      A.push(fx('glow', [0.35, 1.02, -2.03], 0.5 + 0.08 * g, 'gl' + q(g, 0.05), (gg) => { const s = gg.canvas.width, gr = gg.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2); gr.addColorStop(0, `rgba(190,255,200,${0.55 * g})`); gr.addColorStop(0.4, `rgba(140,230,170,${0.25 * g})`); gr.addColorStop(1, 'rgba(120,220,160,0)'); gg.fillStyle = gr; gg.fillRect(0, 0, s, s); }, { order: 6 }));
      add(burst('end', f, 2296, [0.42, 1.14, -2.0], 0.22, '#fff8c0'));
      break;
    }
  }
  return A;
};

export const lookAt = (f) => {
  let flash = 0;
  for (const [a, b] of FLASHES) if (f >= a && f <= b) { const m = (a + b) / 2; flash = Math.max(flash, 1 - Math.abs(f - m) / ((b - a) / 2 + 0.5)); }
  return { flash: clamp(flash) * 0.95 };
};
