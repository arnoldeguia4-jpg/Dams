// Story timeline for "Si Malakas at si Maganda" (Visayan creation tale): shots timed to the silence-aligned phrases of the user's voiceover (TOTAL 2047).
import { ss, easeOut, back, win, clamp, lerp, idle, blinkAt, q } from './engine.js';
import { OUT, ARM, drawChar, drawText, drawTag, drawBird, drawWave, drawBolt, glow, Pen, fxBurst, fxPuff, fxStars } from './cast.js';
import { ISLE, ISLANDS } from './world.js';

export const TOTAL = 2047;
export const MUSIC_STOP = 1797;
const WIPES = [316], IRIS_OUT = [2018, 2044];
const TOP = 1.45, BIRD = [-1.2, TOP + 0.3, -5.6], BAM = [0.9, TOP, -6.2];
const ROCK_T = ISLANDS.map((_, i) => 940 + i * 9);

// ---------------- shots ----------------
const k = (f, pos, look, fov = 42, o = {}) => ({ f, pos, look, fov, ...o });
const D = (pt, c = 5) => () => ({ c, pt });
export const SHOTS = [
  { id: 'hook', a: 0, b: 198, light: 'golden', at: [0, 1, -8], span: 14, cam: [k(0, [1.0, 3.2, 6.0], [0.6, 2.6, -6.4], 44), k(198, [0.9, 2.9, 3.2], [0.6, 2.6, -6.4], 42)], dof: D([0.8, 2.4, -6.3], 3) },
  { id: 'tiredfly', a: 199, b: 324, light: 'day', at: [0, 1, -20], span: 30, cam: [k(199, [0, 12, 6], [0, 12, -20], 44), k(324, [0, 12.5, 4], [0, 12.5, -20], 44)], dof: () => ({ c: 0 }) },
  { id: 'void', a: 325, b: 606, light: 'day', at: [0, 1, -40], span: 50, cam: [k(325, [0, 6, 20], [0, 10, -60], 50), k(481, [0, 7, 16], [0, 11, -60], 50), k(482, [-6, 14, 2], [0, 14, -24], 46), k(606, [-6, 14, 0], [2, 14, -24], 46)], dof: () => ({ c: 0 }) },
  { id: 'tired', a: 607, b: 708, light: 'day', at: [0, 1, -20], span: 30, cam: [k(607, [0.3, 13.8, -14], [0, 13.6, -22], 42), k(708, [0.3, 13.7, -15], [0, 13.5, -22], 42)], dof: () => ({ c: 0 }) },
  { id: 'fight', a: 709, b: 883, light: 'day', at: [0, 1, -30], span: 50, cam: [k(709, [0, 5, 14], [0, 8, -30], 50), k(883, [0, 7, 18], [0, 12, -30], 52)], kicks: [[790, 0.05], [830, 0.04]], dof: () => ({ c: 0 }) },
  { id: 'sky', a: 884, b: 1028, light: 'day', at: [0, 1, -40], span: 60, cam: [k(884, [0, 4, 24], [0, 16, -40], 52), k(1028, [0, 8, 30], [0, 8, -50], 54)], kicks: [[890, 0.05], [950, 0.04], [985, 0.04]], dof: () => ({ c: 0 }) },
  { id: 'isles', a: 1029, b: 1145, light: 'day', at: [0, 1, -50], span: 80, cam: [k(1029, [0, 26, 34], [0, 0, -50], 54), k(1145, [0, 30, 40], [0, 0, -60], 54)], kicks: [[1081, 0.04]], dof: () => ({ c: 0 }) },
  { id: 'rest', a: 1146, b: 1261, light: 'golden', at: [0, 1, -6], span: 12, cam: [k(1146, [-0.6, 2.4, -1.6], [-1.2, 2.0, -5.6], 42), k(1261, [-0.7, 2.3, -2.2], [-1.2, 2.0, -5.6], 40)], dof: D(BIRD, 4) },
  { id: 'bonk', a: 1262, b: 1403, light: 'golden', at: [0, 1, -6], span: 12, cam: [k(1262, [-0.75, 2.6, -0.4], [-0.8, 1.9, -5.8], 44), k(1403, [-0.75, 2.5, -1.0], [-0.8, 1.9, -5.8], 42)], kicks: [[1326, 0.05]], dof: D(BIRD, 3) },
  { id: 'peck', a: 1404, b: 1512, light: 'golden', at: [0, 1, -6], span: 12, cam: [k(1404, [-0.6, 2.5, -0.9], [-0.65, 2.0, -5.9], 42), k(1512, [-0.62, 2.45, -1.3], [-0.65, 2.0, -5.9], 40)], kicks: [[1450, 0.02], [1466, 0.02], [1482, 0.02]], dof: D([-0.6, 2.0, -5.9], 4) },
  { id: 'split', a: 1513, b: 1796, light: 'golden', at: [0, 1, -6], span: 12, cam: [k(1513, [0.4, 2.6, 0.6], [0.4, 2.3, -6.0], 44), k(1680, [0.4, 2.7, 1.4], [0.4, 2.5, -6.0], 44), k(1796, [0.4, 2.7, 1.0], [0.4, 2.6, -6.0], 42)], kicks: [[1572, 0.06]], dof: D([0.4, 2.5, -6.0], 3) },
  { id: 'thumb', a: 9000, b: 9000, light: 'golden', at: [0, 1, -6], span: 12, cam: [k(9000, [-0.6, 2.45, -1.2], [-0.65, 2.05, -5.9], 40)], dof: D([-0.6, 2.0, -5.9], 3) },
  { id: 'twist', a: 1797, b: TOTAL - 1, light: 'golden', at: [0, 1, -6], span: 12, cam: [k(1797, [0.3, 2.7, 1.6], [0.2, 2.6, -6.0], 44), k(1905, [0.2, 3.0, -1.0], [0.25, 3.3, -6.0], 40, { ease: ss }), k(TOTAL, [0.22, 3.15, -2.4], [0.25, 3.55, -6.0], 34, { roll: 3 })], dof: D([0.25, 3.5, -6.0], 4) },
];
export const shotAt = (f) => SHOTS.find((s) => f >= s.a && f < s.b + 1) || SHOTS[SHOTS.length - 1];

// ---------------- helpers ----------------
const ch = (id, who, f, pos, o = {}) => {
  const seed = who.seed || 1, I = idle(f, seed), bl = o.noBlink ? 0 : blinkAt(f, seed);
  const s = { who, expr: o.expr || 'neutral', mode: o.mode || 'stand', phase: o.phase || 0, blink: bl, armL: o.armL, armR: o.armR,
    tilt: q((o.tilt || 0) + I.tilt, 0.25), headTilt: q(o.headTilt || 0, 0.5), facing: o.facing || 0, look: o.look || 0, wave: o.wave, head: o.head, flipX: o.flipX };
  const key = JSON.stringify([s.expr, s.mode, q(s.phase, 0.05), s.blink, s.armL, s.armR, s.tilt, s.headTilt, s.facing, s.look, s.flipX, who.id]);
  return { id, kind: 'char', pos: [pos[0] + (o.still ? 0 : I.dx), pos[1] + (o.still ? 0 : I.bob * 0.3), pos[2]], h: o.h ?? 2.25, key, draw: (g) => drawChar(g, s), blobW: o.blobW, opacity: o.opacity, soft: o.opacity != null ? true : undefined };
};
const fx = (id, pos, h, key, draw, o = {}) => ({ id, kind: 'fx', pos: o.ground ? [pos[0], pos[1] + 0.38 * h, pos[2]] : pos, h, key, draw, yaw: o.yaw ?? 'full', soft: o.soft ?? true, res: o.res || [512, 512], unlit: o.unlit ?? true, order: o.order ?? 5, opacity: o.opacity, tiltX: o.tiltX });
const burst = (id, f, at, pos, h = 0.6, col = '#fff3b0', n = 14) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'b' + q(t, 0.04) + col, (g) => { g.save(); g.scale(g.canvas.width / 500, g.canvas.width / 500); fxBurst(new Pen(g), t, col); g.restore(); }, { order: 7 }); };
const puff = (id, f, at, pos, h = 0.5, n = 16) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'p' + q(t, 0.05), (g) => { g.save(); g.scale(g.canvas.width / 300, g.canvas.width / 300); fxPuff(new Pen(g), t); g.restore(); }, { order: 8 }); };
const pop = (f, a, b) => (f < a || f > b ? 0 : back(win(f, a, a + 7)) * (1 - ss(win(f, b - 6, b))));
const label = (id, f, a, b, pos, txt, h = 0.34, col = '#ffffff') => { const s = pop(f, a, b); if (s <= 0.02) return null; return fx(id, pos, h * s, 'l' + txt + col, (g) => drawText(g, txt, { col }), { order: 9, res: [1024, 384] }); };
const tag = (id, f, a, b, pos, txt, h = 0.3) => { const s = pop(f, a, b); if (s <= 0.02) return null; return fx(id, pos, h * s, 'tg' + txt, (g) => drawTag(g, txt), { order: 9, res: [1024, 384] }); };
const bird = (id, f, pos, h, state, o = {}) => { const t = state === 'fly' ? (f * 0.09) % 1 : state === 'peck' ? (f * 0.12) % 1 : 0; return fx(id, pos, h, 'bd' + state + q(t, 0.1) + (o.flip ? 'f' : ''), (g) => { if (o.flip) { g.translate(g.canvas.width, 0); g.scale(-1, 1); } drawBird(g, state, t); }, { order: o.order ?? 6 }); };
const zzz = (id, f, pos, h = 0.4) => fx(id, [pos[0], pos[1] + 0.2 * ((f % 40) / 40), pos[2]], h, 'z' + Math.floor((f % 40) / 13), (g) => drawText(g, 'z'.repeat(1 + Math.floor((f % 40) / 13)), { col: '#ffffff' }), { order: 9, res: [512, 256] });

// ---------------- world state ----------------
export const worldAt = (f) => {
  const S = shotAt(f), w = { shot: S.id, l2: null, lt: 0, islands: ISLANDS.map(() => 0), rocks: [], bamboo: null, split: 0 };
  const created = S.id === 'hook' || f >= 1079;
  ISLANDS.forEach((_, i) => { w.islands[i] = S.id === 'hook' ? 1 : created ? ss(win(f, 1079 + i * 3, 1100 + i * 3)) : 0; });
  if (f >= 709 && f < 1079) { w.l2 = 'night'; w.lt = 0.65 * ss(win(f, 709, 785)) * (1 - ss(win(f, 1040, 1079))); }
  ROCK_T.forEach((t0, i) => { if (f >= t0 && f < t0 + 24 && S.id === 'sky') { const t = (f - t0) / 24, [x, z] = ISLANDS[i]; w.rocks.push({ i, pos: [x, lerp(60, 0.5, t * t), z], rot: f * 0.2 + i }); } });
  if (f >= 1262 && S.id !== 'hook') { const drift = ss(win(f, 1262, 1324)); w.bamboo = { pos: [lerp(5, BIRD[0] + 0.6, drift), lerp(0.2, TOP + 0.18, ss(win(f, 1300, 1324))), BIRD[2] - 0.2], lying: true }; }
  if (f >= 1570 && S.id !== 'thumb') w.split = ss(win(f, 1570, 1590));
  if (S.id === 'hook') { w.bamboo = { pos: BAM, lying: false, glow: true }; }
  if (S.id === 'thumb') { w.bamboo = { pos: [BIRD[0] + 0.6, TOP + 0.18, BIRD[2] - 0.2], lying: true }; }
  return w;
};

// ---------------- actors + fx per frame ----------------
export const actorsAt = (f) => {
  const S = shotAt(f), w = worldAt(f), A = [], add = (x) => { if (Array.isArray(x)) x.forEach((y) => y && A.push(y)); else if (x) A.push(x); };
  switch (S.id) {
    case 'hook': {
      add(fx('bg', [BAM[0], 2.5, BAM[2] - 0.3], 3.6, 'bg', (g) => glow(g, '255,226,140', 0.85), { order: 3 }));
      const a = 0.5 * ss(win(f, 74, 110));
      if (a > 0.02) { add(ch('gm', OUT.malakas, f, [BAM[0] - 0.9, TOP, BAM[2] + 0.3], { expr: 'smile_closed', armL: ARM.hang, armR: ARM.hang, opacity: a, blobW: 0.001 })); add(ch('gf', OUT.maganda, f, [BAM[0] + 0.9, TOP, BAM[2] + 0.3], { expr: 'smile_closed', armL: ARM.hang, armR: ARM.hang, opacity: a, blobW: 0.001 })); }
      if (f >= 199) add(bird('b', f, [BAM[0] - 1.2, 2.2 + 0.1 * Math.sin(f * 0.2), BAM[2] + 1.0], 1.0, 'fly'));
      break;
    }
    case 'tiredfly': {
      add(bird('b', f, [lerp(-6, 6, (f - 199) / 125), 12 + 0.6 * Math.sin(f * 0.18), -20], 2.6, 'fly'));
      add(label('sigh', f, 250, 324, [lerp(-6, 6, (f - 199) / 125) + 1.5, 14.2, -20], 'HAAAY…', 1.2, '#ffffff'));
      break;
    }
    case 'void': {
      add(label('lng', f, 414, 481, [0, 26, -60], 'LANGIT', 6, '#ffffff')); add(label('dgt', f, 420, 481, [0, 3.5, -40], 'DAGAT', 5, '#9fd4ff'));
      if (f >= 482) add(bird('b', f, [lerp(-10, 10, (f - 482) / 124), 14 + 0.5 * Math.sin(f * 0.2), -24], 2.6, 'fly'));
      break;
    }
    case 'tired': {
      add(bird('b', f, [0, 13.4 + 0.4 * Math.sin(f * 0.1), -22], 2.6, f >= 652 ? 'tired' : 'fly'));
      add(label('nope', f, 655, 708, [1.6, 15.3, -22], '?', 1.0, '#ffe066'));
      break;
    }
    case 'fight': {
      const dive = ss(win(f, 709, 740));
      add(bird('b', f, [lerp(-3, 1, dive), lerp(14, 4, dive) + (f > 760 ? lerp(0, 8, ss(win(f, 760, 790))) : 0), -26], 2.4, f < 760 ? 'angry' : 'fly'));
      add(puff('splash', f, 742, [1, 1.5, -26], 5, 18));
      for (const [i, x, at] of [[0, -14, 785], [1, 12, 800], [2, -2, 818], [3, 20, 840]]) { const r = ss(win(f, at, at + 26)); if (r > 0.02) add(fx('wv' + i, [x, 6 + 6 * r, -36], 14, 'wv' + q(r, 0.05), (g) => drawWave(g, r), { order: 5, opacity: 1 - ss(win(f, at + 50, at + 70)) })); }
      add(label('sp', f, 715, 760, [1.6, 8, -26], 'SPLASH!', 2.6, '#9fd4ff'));
      break;
    }
    case 'sky': {
      for (const at of [890, 930, 985]) if (f >= at && f < at + 8) add(fx('bolt' + at, [(at % 7) * 6 - 18, 30, -60], 26, 'bolt', drawBolt, { order: 4 }));
      ROCK_T.forEach((t0, i) => { const [x, z] = ISLANDS[i]; add(puff('rs' + i, f, t0 + 24, [x, 2, z], 10, 20)); });
      add(label('bt', f, 940, 1028, [-14, 20, -60], 'BATO!', 7, '#ffffff'));
      break;
    }
    case 'isles': {
      add(label('isla', f, 1083, 1145, [0, 14, -50], 'ISLA!', 8, '#ffe066'));
      ISLANDS.forEach(([x, z, r], i) => add(burst('ib' + i, f, 1079 + i * 3, [x, 3, z], r * 1.5, '#fff3b0', 16)));
      break;
    }
    case 'rest': {
      add(bird('b', f, BIRD, 1.15, f >= 1184 ? 'relax' : 'perch', { order: 6 }));
      if (f >= 1146 && f < 1184) add(puff('land', f, 1146, [BIRD[0], TOP, BIRD[2] + 0.2], 0.8, 14));
      add(label('ahh', f, 1190, 1261, [BIRD[0] + 0.1, BIRD[1] + 1.0, BIRD[2]], 'AHHH…', 0.36, '#ffffff'));
      break;
    }
    case 'bonk': {
      const hit = f >= 1324;
      add(bird('b', f, BIRD, 1.15, hit ? 'shock' : 'relax'));
      add(burst('bk', f, 1324, [BIRD[0] + 0.3, TOP + 0.4, BIRD[2] + 0.2], 0.8));
      add(label('bonk', f, 1326, 1403, [BIRD[0] + 0.5, BIRD[1] + 0.75, BIRD[2]], 'BONK!', 0.4, '#ffe066'));
      break;
    }
    case 'peck': case 'thumb': {
      const F = S.id === 'thumb' ? 1470 : f, pk = F >= 1446;
      add(bird('b', F, [BIRD[0] + 0.15, BIRD[1], BIRD[2]], 1.2, pk ? 'peck' : 'angry'));
      if (pk) for (const at of [1450, 1466, 1482]) add(label('tok' + at, F, at, at + 14, [BIRD[0] + 0.7 + (at % 3) * 0.15, BIRD[1] + 0.95, BIRD[2] + 0.1], 'TOK!', 0.34, '#ffffff'));
      if (S.id === 'thumb') { add(fx('crack', [BIRD[0] + 0.75, TOP + 0.25, BIRD[2] - 0.1], 0.9, 'crk', (g) => glow(g, '255,226,140', 0.9), { order: 4 })); add(fx('tb', [BIRD[0] + 0.75, TOP + 0.25, BIRD[2] - 0.15], 1.0, 'tb', (g) => { g.save(); g.scale(g.canvas.width / 500, g.canvas.width / 500); fxBurst(new Pen(g), 0.5, '#fff3b0', 12); g.restore(); }, { order: 4 })); }
      break;
    }
    case 'split': {
      const out = f >= 1593, k2 = ss(win(f, 1593, 1620));
      add(bird('b', f, [BIRD[0] - 0.4, BIRD[1], BIRD[2] + 0.2], 1.15, out ? 'shock' : 'angry'));
      add(fx('sg', [BIRD[0] + 1.6, TOP + 0.8, BIRD[2] - 0.4], 2.6 * ss(win(f, 1560, 1580)) + 0.01, 'sg' + q(ss(win(f, 1560, 1580)), 0.1), (g) => glow(g, '255,226,140', 0.9), { order: 3 }));
      add(burst('sb', f, 1572, [BIRD[0] + 1.6, TOP + 0.6, BIRD[2] - 0.2], 2.2, '#fff6c0', 18));
      if (out) { add(ch('mal', OUT.malakas, f, [BIRD[0] + 1.05, TOP + 0.15 * (1 - k2), BIRD[2] - 0.6], { expr: f >= 1640 ? 'smile' : 'shock', armL: ARM.hang, armR: f >= 1650 ? ARM.wave : ARM.hang, facing: 1 }));
        add(ch('mag', OUT.maganda, f, [BIRD[0] + 2.25, TOP + 0.15 * (1 - k2), BIRD[2] - 0.6], { expr: f >= 1640 ? 'smile_closed' : 'shock', armL: ARM.hang, armR: ARM.hang, facing: -1 }));
        add(puff('op', f, 1593, [BIRD[0] + 1.65, TOP + 0.8, BIRD[2] - 0.4], 2.0, 18)); }
      add(tag('tm', f, 1709, 1796, [BIRD[0] + 1.05, TOP + 2.65, BIRD[2] - 0.5], 'MALAKAS', 0.36));
      add(tag('tf', f, 1730, 1796, [BIRD[0] + 2.25, TOP + 2.65, BIRD[2] - 0.5], 'MAGANDA', 0.36));
      break;
    }
    case 'twist': {
      add(ch('mal', OUT.malakas, f, [BIRD[0] + 1.05, TOP, BIRD[2] - 0.6], { expr: 'smile', armL: ARM.hang, armR: f >= 1820 && f < 1900 ? ARM.point : ARM.hang, facing: 1, look: -0.3 }));
      add(ch('mag', OUT.maganda, f, [BIRD[0] + 2.25, TOP, BIRD[2] - 0.6], { expr: f >= 1900 ? 'relief_open' : 'smile_closed', armL: ARM.hang, armR: ARM.hang, facing: -1, look: -0.4 }));
      add(bird('b', f, [BIRD[0] + 1.05, TOP + 2.45, BIRD[2] - 0.5], 0.75, f >= 1905 ? 'sleep' : 'tired'));
      if (f >= 1910) add(zzz('z', f, [BIRD[0] + 1.5, TOP + 3.0, BIRD[2] - 0.45], 0.28));
      break;
    }
  }
  return A;
};

export const lookAt = (f) => {
  let wipe = -1, iris = 2, flash = 0;
  for (const w of WIPES) if (f >= w && f <= w + 12) wipe = lerp(-0.35, 1.3, ss((f - w) / 12));
  if (f < 26) iris = lerp(0.0, 1.25, easeOut(f / 26));
  if (f >= IRIS_OUT[0] && f < 9000) iris = lerp(1.25, 0.0, ss(win(f, IRIS_OUT[0], IRIS_OUT[1])));
  for (const [a, b, m] of [[890, 896, 0.5], [930, 936, 0.4], [985, 991, 0.4], [1079, 1089, 0.6], [1570, 1582, 0.45]]) if (f >= a && f <= b) flash = Math.max(flash, m * (1 - Math.abs(f - (a + b) / 2) / ((b - a) / 2 + 0.5)));
  return { flash, fade: 0, wipe, iris, irisC: f >= IRIS_OUT[0] ? [0.5, 0.55] : [0.5, 0.5] };
};
