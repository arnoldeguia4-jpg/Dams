// Story timeline for "Ang Kalat ng Dalawang Higante" (Chocolate Hills): shots timed to the silence-aligned phrases of the user's voiceover (TOTAL 1864).
import { ss, easeOut, back, win, clamp, lerp, idle, blinkAt, q } from './engine.js';
import { OUT, ARM, drawChar, drawText, drawDayBoard, drawGhostGiants, sweat, angry, glow, Pen, fxBurst, fxPuff, fxStars } from './cast.js';
import { PX, G1, G2, DECK, HILLS } from './world.js';

export const TOTAL = 1864;
export const MUSIC_STOP = 1400;
const WIPES = [300, 1557], IRIS_OUT = [1836, 1862];
const A1 = [PX + G1[0], 0, G1[2]], A2 = [PX + G2[0], 0, G2[2]];
const GH = 20;
export const THROWS = HILLS.map((h, i) => { const t = 574 + i * 11; const type = t < 637 ? 0 : t < 731 ? 1 : t < 806 ? 2 : i % 3; return { t, by: i % 2, type, hill: i }; });
const FLY = 18;

// ---------------- shots ----------------
const k = (f, pos, look, fov = 42, o = {}) => ({ f, pos, look, fov, ...o });
const D = (pt, c = 5) => () => ({ c, pt });
export const SHOTS = [
  { id: 'hook', a: 0, b: 164, light: 'day', at: [0, 1, -20], span: 50, cam: [k(0, [0, 10, 16], [0, 1, -34], 46), k(164, [1.5, 7.5, 8], [0, 1.4, -34], 46)], dof: () => ({ c: 0 }) },
  { id: 'lola', a: 165, b: 218, light: 'day', at: [0, 2, 4], span: 12, cam: [k(165, [1.2, 3.0, 9.6], [0.2, 2.6, 4.0], 42), k(218, [1.1, 2.95, 9.2], [0.2, 2.65, 4.0], 42)], dof: D([0.2, 2.7, 4.4], 4) },
  { id: 'legend', a: 219, b: 311, light: 'golden', at: [0, 1, -20], span: 50, cam: [k(219, [-1.0, 6.0, 9.0], [0, 6, -40], 48), k(311, [-0.6, 6.5, 6.0], [0, 7, -40], 46)], dof: () => ({ c: 0 }) },
  { id: 'past', a: 312, b: 431, light: 'day', at: [PX, 1, -30], span: 40, cam: [k(312, [PX, 10, 26], [PX, 10, -30], 48), k(431, [PX, 10.5, 20], [PX, 10.5, -30], 48)], kicks: [[361, 0.04]], dof: () => ({ c: 0 }) },
  { id: 'why', a: 432, b: 573, light: 'day', at: [PX, 1, -30], span: 30, cam: [k(432, [PX + G1[0] + 1.6, 15.6, -3], [PX + G1[0] + 0.6, 15.6, -30], 42), k(494, [PX + G1[0] + 1.5, 15.7, -5], [PX + G1[0] + 0.4, 16.5, -30], 42), k(495, [PX, 13, 14], [PX, 13, -30], 46), k(573, [PX, 13, 10], [PX, 13.2, -30], 44)], kicks: [[515, 0.06]], dof: () => ({ c: 0 }) },
  { id: 'throw', a: 574, b: 805, light: 'day', at: [PX, 1, -30], span: 50, cam: [k(574, [PX + 4, 12, 30], [PX, 8, -32], 54), k(700, [PX - 3, 14, 32], [PX, 7, -34], 56), k(805, [PX + 2, 16, 34], [PX, 6, -36], 58)], kicks: [[592, 0.04], [655, 0.04], [749, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'days', a: 806, b: 1019, light: 'day', at: [PX, 1, -30], span: 50, cam: [k(806, [PX, 24, 40], [PX, 6, -34], 56), k(1019, [PX, 26, 44], [PX, 6, -34], 56)], dof: () => ({ c: 0 }) },
  { id: 'tired', a: 1020, b: 1149, light: 'golden', at: [PX, 1, -30], span: 40, cam: [k(1020, [PX, 11, 24], [PX, 9, -30], 50), k(1149, [PX, 10.5, 18], [PX, 9, -30], 48)], kicks: [[1105, 0.05]], dof: () => ({ c: 0 }) },
  { id: 'friends', a: 1150, b: 1288, light: 'golden', at: [PX, 1, -30], span: 30, cam: [k(1150, [PX, 10, 14], [PX, 10, -30], 48), k(1288, [PX, 10, 10], [PX, 10.2, -30], 46)], dof: () => ({ c: 0 }) },
  { id: 'leave', a: 1289, b: 1399, light: 'golden', at: [PX, 1, -40], span: 50, cam: [k(1289, [PX + 2, 12, 20], [PX, 9, -40], 48), k(1399, [PX + 2, 14, 24], [PX, 6, -60], 48)], dof: () => ({ c: 0 }) },
  { id: 'problem', a: 1400, b: 1568, light: 'golden', at: [PX, 1, -30], span: 50, cam: [k(1400, [PX - 10, 16, 20], [PX, 1, -34], 52), k(1475, [PX + 6, 18, 22], [PX, 1, -36], 52), k(1568, [PX + 8, 20, 24], [PX, 2, -60], 50)], kicks: [[1478, 0.05]], dof: () => ({ c: 0 }) },
  { id: 'thumb', a: 9000, b: 9000, light: 'day', at: [PX, 1, -30], span: 50, cam: [k(9000, [PX - 5.5, 14.5, -6], [PX - 4.4, 17.5, -30], 50)], dof: () => ({ c: 0 }) },
  { id: 'today', a: 1569, b: TOTAL - 1, light: 'day', at: [0, 1, -20], span: 50, cam: [k(1569, [0, 14, 20], [0, 1, -34], 50), k(1711, [1, 9, 14], [0, 1.5, -34], 48), k(1729, [2.0, 3.6, 12.5], [2.2, 3.5, 5.0], 44, { ease: ss }), k(TOTAL, [2.15, 3.5, 9.5], [2.2, 3.45, 5.0], 38, { roll: 3 })], dof: (f) => ({ c: f > 1729 ? 3 : 0, pt: [2.2, 3.4, 5.1] }) },
];
export const shotAt = (f) => SHOTS.find((s) => f >= s.a && f < s.b + 1) || SHOTS[SHOTS.length - 1];

// ---------------- helpers ----------------
const ch = (id, who, f, pos, o = {}) => {
  const seed = who.seed || 1, I = idle(f, seed), bl = o.noBlink ? 0 : blinkAt(f, seed);
  const s = { who, expr: o.expr || 'neutral', mode: o.mode || 'stand', phase: o.phase || 0, blink: bl, armL: o.armL, armR: o.armR,
    tilt: q((o.tilt || 0) + I.tilt, 0.25), headTilt: q(o.headTilt || 0, 0.5), facing: o.facing || 0, look: o.look || 0, wave: o.wave, head: o.head, flipX: o.flipX };
  const key = JSON.stringify([s.expr, s.mode, q(s.phase, 0.05), s.blink, s.armL, s.armR, s.tilt, s.headTilt, s.facing, s.look, s.wave != null ? q(s.wave, 0.1) : null, s.flipX, who.id, o.hk || '']);
  const sc = (o.h ?? 2.25) / 2.25;
  return { id, kind: 'char', pos: [pos[0] + (o.still ? 0 : I.dx * sc), pos[1] + (o.still ? 0 : I.bob * 0.3 * sc), pos[2]], h: o.h ?? 2.25, key, draw: (g) => drawChar(g, s), blobW: o.blobW };
};
const fx = (id, pos, h, key, draw, o = {}) => ({ id, kind: 'fx', pos: o.ground ? [pos[0], pos[1] + 0.38 * h, pos[2]] : pos, h, key, draw, yaw: o.yaw ?? 'full', soft: o.soft ?? true, res: o.res || [512, 512], unlit: o.unlit ?? true, order: o.order ?? 5, opacity: o.opacity, tiltX: o.tiltX });
const burst = (id, f, at, pos, h = 0.6, col = '#fff3b0', n = 14) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'b' + q(t, 0.04) + col, (g) => { g.save(); g.scale(g.canvas.width / 500, g.canvas.width / 500); fxBurst(new Pen(g), t, col); g.restore(); }, { order: 7 }); };
const puff = (id, f, at, pos, h = 0.5, n = 16) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'p' + q(t, 0.05), (g) => { g.save(); g.scale(g.canvas.width / 300, g.canvas.width / 300); fxPuff(new Pen(g), t); g.restore(); }, { order: 8 }); };
const pop = (f, a, b) => (f < a || f > b ? 0 : back(win(f, a, a + 7)) * (1 - ss(win(f, b - 6, b))));
const label = (id, f, a, b, pos, txt, h = 0.34, col = '#ffffff') => { const s = pop(f, a, b); if (s <= 0.02) return null; return fx(id, pos, h * s, 'l' + txt + col, (g) => drawText(g, txt, { col }), { order: 9, res: [1024, 384] }); };
const giant = (id, who, f, pos, o = {}) => ch(id, who, f, pos, { h: GH, ...o });
/** which arm pose a giant has right now given the throw schedule */
const throwArm = (f, by) => { for (const T of THROWS) if (T.by === by) { if (f >= T.t - 8 && f < T.t) return ARM.windup; if (f >= T.t && f < T.t + 7) return ARM.throw; } return null; };

// ---------------- world state ----------------
export const worldAt = (f) => {
  const S = shotAt(f), w = { shot: S.id, l2: null, lt: 0, rocks: [], mounds: HILLS.map(() => 0), past: S.id !== 'hook' && S.id !== 'lola' && S.id !== 'legend' && S.id !== 'today' };
  const ff = S.id === 'thumb' ? 700 : f;
  THROWS.forEach((T, i) => {
    const land = T.t + FLY;
    if (ff >= land) w.mounds[i] = ss(win(ff, land, land + 6));
    if (ff >= T.t && ff < land) { const t = (ff - T.t) / FLY, from = T.by ? [G2[0] - 2.5, 17, G2[2] + 1] : [G1[0] + 2.5, 17, G1[2] + 1], h = HILLS[T.hill], to = [h.x, 0.8, h.z];
      w.rocks.push({ idx: T.type + 3 * (i % 2), pos: [lerp(from[0], to[0], t), lerp(from[1], to[1], t) + 12 * Math.sin(Math.PI * t), lerp(from[2], to[2], t)], rot: ff * 0.3 + i }); }
  });
  if (S.id === 'days') { w.l2 = 'night'; w.lt = 0.85 * (0.5 - 0.5 * Math.cos(2 * Math.PI * (f - 806) / 54)); }
  return w;
};

// ---------------- actors + fx per frame ----------------
export const actorsAt = (f) => {
  const S = shotAt(f), w = worldAt(f), A = [], add = (x) => { if (Array.isArray(x)) x.forEach((y) => y && A.push(y)); else if (x) A.push(x); };
  const landings = (f0, f1) => THROWS.forEach((T, i) => { const land = T.t + FLY; if (land < f0 - 20 || land > f1) return; const h = HILLS[T.hill];
    add(puff('lp' + i, f, land, [PX + h.x, 1.4, h.z + 1], T.type === 2 ? 6 : 4, T.type === 2 ? 22 : 16)); });
  switch (S.id) {
    case 'hook': {
      add(label('bohol', f, 30, 160, [0, 9.5, -30], 'BOHOL', 4.5, '#ffe066'));
      break;
    }
    case 'lola': {
      const y = 1.32;
      add(ch('lola', OUT.lola, f, [-0.5, y, 4.3], { expr: 'smile', armL: ARM.hip, armR: ARM.point, facing: 1, look: 0.3 }));
      add(ch('k1', OUT.kid1, f, [0.7, y, 4.6], { h: 1.6, expr: 'smile', armL: ARM.hang, armR: ARM.hang, facing: -1, look: -0.4 }));
      add(ch('k2', OUT.kid2, f, [1.3, y, 4.2], { h: 1.6, expr: 'relief_open', armL: ARM.hang, armR: ARM.hang, facing: -1 }));
      break;
    }
    case 'legend': {
      const a = 0.42 * ss(win(f, 225, 260));
      for (const [id, who, x, fc] of [['gg1', OUT.g1, -9, 1], ['gg2', OUT.g2, 9, -1]]) { const c = ch(id, who, f, [x, 0, -46], { h: 26, expr: 'stern', armL: ARM.hip, armR: ARM.fist, facing: fc, still: true }); c.opacity = a; c.soft = true; c.blobW = 0.001; add(c); }
      break;
    }
    case 'past': {
      const mad = f >= 359;
      add(giant('g1', OUT.g1, f, A1, { expr: mad ? 'stern' : 'neutral', armL: ARM.hip, armR: mad ? ARM.fist : ARM.hang, facing: 1, head: mad ? angry : undefined, hk: mad ? 'a' : '' }));
      add(giant('g2', OUT.g2, f, A2, { expr: mad ? 'stern' : 'neutral', armL: ARM.hip, armR: mad ? ARM.fist : ARM.hang, facing: -1, head: mad ? angry : undefined, hk: mad ? 'a' : '' }));
      add(puff('ap1', f, 312, [A1[0], 4, A1[2] + 1], 9, 20)); add(puff('ap2', f, 318, [A2[0], 4, A2[2] + 1], 9, 20));
      if (mad) { add(puff('st1', f, 365, [A1[0] + 1, 20.5, A1[2]], 4, 18)); add(puff('st2', f, 372, [A2[0] - 1, 20.5, A2[2]], 4, 18)); }
      break;
    }
    case 'why': {
      const basta = f >= 495;
      add(giant('g1', OUT.g1, f, A1, { expr: basta ? 'stern' : 'nervous', armL: ARM.hip, armR: basta ? ARM.fist : ARM.scratch, facing: 1, head: basta ? angry : undefined, hk: basta ? 'a' : '' }));
      add(giant('g2', OUT.g2, f, A2, { expr: basta ? 'stern' : 'nervous', armL: ARM.hip, armR: basta ? ARM.fist : ARM.shrug, facing: -1, head: basta ? angry : undefined, hk: basta ? 'a' : '' }));
      add(label('q', f, 436, 494, [A1[0] + 3.2, 20.5, A1[2] + 1], '?', 2.2, '#ffe066'));
      add(burst('bb', f, 515, [PX, 14, -29], 10, '#ffb0a0'));
      break;
    }
    case 'throw': case 'days': case 'thumb': {
      const F = S.id === 'thumb' ? 700 : f;
      const a1 = throwArm(F, 0), a2 = throwArm(F, 1);
      add(giant('g1', OUT.g1, F, A1, { expr: a1 ? 'stern' : 'pained', armL: ARM.hip, armR: a1 || ARM.fist, facing: 1, head: angry, hk: 'a' }));
      add(giant('g2', OUT.g2, F, A2, { expr: a2 ? 'stern' : 'pained', armL: ARM.hip, armR: a2 || ARM.fist, facing: -1, head: angry, hk: 'a' }));
      if (S.id !== 'thumb') landings(f, f);
      if (S.id === 'days') { const n = f >= 984 ? 5 : f >= 950 ? 3 : f >= 904 ? 2 : 1; add(fx('day', [PX, 30, -26], 6 * back(win(f, n === 1 ? 806 : n === 2 ? 904 : n === 3 ? 950 : 984, (n === 1 ? 806 : n === 2 ? 904 : n === 3 ? 950 : 984) + 7)), 'day' + n, (g) => drawDayBoard(g, n), { res: [1024, 512], order: 9 })); }
      if (S.id === 'throw') { add(label('bato', f, 578, 636, [PX, 27, -30], 'BATO!', 4, '#ffffff')); add(label('lupa', f, 640, 730, [PX, 27, -30], 'LUPA!', 4, '#e9b07a')); add(label('buh', f, 734, 805, [PX, 27, -30], 'BUHANGIN!', 4, '#f2d27a')); }
      break;
    }
    case 'tired': {
      const sit = f >= 1095;
      add(giant('g1', OUT.g1, f, [A1[0] + 1.5, 0, A1[2]], { mode: sit ? 'sit' : 'stand', expr: 'pained', armL: ARM.hang, armR: ARM.hang, facing: 1, head: sweat, hk: 's', tilt: sit ? 0 : 4 * Math.sin(f * 0.08) }));
      add(giant('g2', OUT.g2, f, [A2[0] - 1.5, 0, A2[2]], { mode: sit ? 'sit' : 'stand', expr: 'pained', armL: ARM.hang, armR: ARM.hang, facing: -1, head: sweat, hk: 's', tilt: sit ? 0 : -4 * Math.sin(f * 0.08) }));
      add(puff('sit1', f, 1100, [A1[0] + 2, 1.5, A1[2] + 2], 7, 22)); add(puff('sit2', f, 1104, [A2[0] - 2, 1.5, A2[2] + 2], 7, 22));
      break;
    }
    case 'friends': {
      const laugh = f >= 1205, shake = f >= 1238;
      add(giant('g1', OUT.g1, f, [A1[0] + (shake ? 3.4 : 1.5), 0, A1[2]], { mode: shake ? 'stand' : 'sit', expr: laugh ? 'laugh' : 'neutral', armL: ARM.hang, armR: shake ? ARM.shake : ARM.hang, facing: 1, look: 0.5 }));
      add(giant('g2', OUT.g2, f, [A2[0] - (shake ? 3.4 : 1.5), 0, A2[2]], { mode: shake ? 'stand' : 'sit', expr: laugh ? 'relief_open' : 'neutral', armL: ARM.hang, armR: shake ? ARM.shake : ARM.hang, facing: -1, look: -0.5 }));
      add(burst('hs', f, 1240, [PX, 11, -29], 8, '#fff3b0', 16));
      add(puff('stand', f, 1236, [PX, 1.5, -27], 10, 18));
      break;
    }
    case 'leave': {
      const t = ss(win(f, 1289, 1399)), z = lerp(-30, -66, t);
      add(giant('g1', OUT.g1, f, [PX - 3.6, 0, z], { mode: 'stroll', phase: (f * 0.03) % 1, expr: 'laugh', armL: ARM.hang, armR: ARM.hug, facing: 1 }));
      add(giant('g2', OUT.g2, f, [PX + 3.6, 0, z - 0.2], { mode: 'stroll', phase: (f * 0.03 + 0.5) % 1, expr: 'relief_open', armL: ARM.hang, armR: ARM.hug, facing: -1 }));
      break;
    }
    case 'problem': {
      add(giant('g1', OUT.g1, f, [PX - 2.6, 0, -95], { expr: f >= 1478 ? 'shock' : 'laugh', armL: ARM.hang, armR: ARM.hug, facing: 1 }));
      add(giant('g2', OUT.g2, f, [PX + 2.6, 0, -95.2], { expr: f >= 1478 ? 'shock' : 'relief_open', armL: ARM.hang, armR: ARM.hug, facing: -1 }));
      add(label('oops', f, 1480, 1568, [PX, 26, -95], 'OOPS!', 8, '#ffe066'));
      break;
    }
    case 'today': {
      add(label('ch', f, 1575, 1700, [0, 10, -30], 'CHOCOLATE HILLS', 6, '#f2d27a'));
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
  for (const [a, b] of [[1238, 1244]]) if (f >= a && f <= b) flash = 0.3;
  return { flash, fade: 0, wipe, iris, irisC: f >= IRIS_OUT[0] ? [0.5, 0.52] : [0.5, 0.5] };
};
