// Story timeline for "Kung Bakit Maalat ang Dagat" (Ilocano tale of Angalo, the giant bridge, and the ant): shots on the user's voiceover (TOTAL 2229).
import { ss, easeOut, back, win, clamp, lerp, idle, blinkAt, q } from './engine.js';
import { OUT, VIL, ARM, drawChar, drawLying, drawText, drawTag, drawSack, drawAnt, glow, Pen, fxBurst, fxPuff } from './cast.js';
import { VX, SX, IR } from './world.js';

export const TOTAL = 2229;
export const MUSIC_STOP = 1951;
const WIPES = [205, 1944], IRIS_OUT = [2196, 2226];
// ground height on an island (sand dome + grass dome) at x,z
const gy = (x, z) => { let y = 0; for (const cx of [VX, SX]) { const d = Math.hypot(x - cx, z + 6); y = Math.max(y, d < IR ? 1.32 * Math.sqrt(1 - (d / IR) ** 2) : 0, d < IR * 0.8 ? 0.15 + 1.41 * Math.sqrt(1 - (d / (IR * 0.8)) ** 2) : 0); } return y; };
const SHORE = VX + 8.2, SZ = -1.5;                  // village shore spot facing the gap
const LY = { pos: [0, 6.0, -6], h: 24 };            // the lying giant card (width 40)
const WALK = (x) => 8.3 + 0.0 * x;                  // walking height on his legs (tuned from stills)
const ROCK = [VX + 9.2, 0.75, 2.5];

// ---------------- shots ----------------
const k = (f, pos, look, fov = 42, o = {}) => ({ f, pos, look, fov, ...o });
const D = (pt, c = 4) => () => ({ c, pt });
const N0 = () => ({ c: 0 });
export const SHOTS = [
  { id: 'hook', a: 0, b: 134, light: 'golden', at: [VX + 8, 1, -2], span: 20, cam: [k(0, [SHORE + 3.5, 2.4, SZ + 6.5], [SHORE - 0.5, 1.5, SZ - 1], 44), k(134, [SHORE + 2.4, 2.1, SZ + 4.4], [SHORE - 0.2, 1.6, SZ - 1], 42)], dof: D([SHORE, 1.5, SZ], 3) },
  { id: 'antHook', a: 135, b: 210, light: 'golden', at: ROCK, span: 8, cam: [k(135, [ROCK[0] + 0.4, 1.25, ROCK[2] + 2.0], [ROCK[0], 1.1, ROCK[2]], 40), k(210, [ROCK[0] + 0.3, 1.2, ROCK[2] + 1.5], [ROCK[0], 1.1, ROCK[2]], 38)], dof: D([ROCK[0], 1.1, ROCK[2]], 5) },
  { id: 'fresh', a: 211, b: 380, light: 'day', at: [SHORE, 1, SZ], span: 14, cam: [k(211, [SHORE + 3.0, 2.2, SZ + 5.0], [SHORE, 1.4, SZ], 44), k(380, [SHORE + 2.2, 2.0, SZ + 3.8], [SHORE, 1.5, SZ], 42)], dof: D([SHORE, 1.5, SZ], 3) },
  { id: 'salt', a: 381, b: 578, light: 'day', at: [SX, 1, -6], span: 30, cam: [k(381, [SX - 22, 6, 22], [SX, 4, -6], 44), k(488, [SX - 16, 5, 16], [SX, 4, -6], 42), k(489, [SHORE + 1.0, 2.4, SZ + 5.5], [SHORE + 0.4, 1.6, SZ - 1], 46), k(578, [SHORE + 0.8, 2.3, SZ + 4.8], [SHORE + 0.4, 1.6, SZ - 1], 46)], dof: N0 },
  { id: 'nobridge', a: 579, b: 658, light: 'day', at: [0, 1, -4], span: 34, cam: [k(579, [SHORE - 2, 4.5, SZ + 10], [6, 1.5, -6], 50), k(658, [SHORE - 1, 4.2, SZ + 8.5], [6, 1.5, -6], 50)], dof: N0 },
  { id: 'angalo', a: 659, b: 853, light: 'day', at: [0, 1, -8], span: 40, cam: [k(659, [SHORE - 1, 1.8, SZ + 7], [0, 6, -12], 52), k(740, [SHORE - 1, 1.7, SZ + 6.5], [0, 14, -12], 54, { ease: ss }), k(853, [SHORE - 1.5, 1.7, SZ + 7.5], [0, 16, -12], 54)], kicks: [[675, 0.04]], dof: N0 },
  { id: 'liedown', a: 854, b: 1093, light: 'day', at: [0, 1, -6], span: 50, cam: [k(854, [0, 14, 40], [0, 8, -8], 48), k(1017, [0, 12, 44], [0, 4, -6], 52, { ease: ss }), k(1093, [0, 13, 46], [0, 4, -6], 52)], kicks: [[890, 0.04]], dof: N0 },
  { id: 'cross', a: 1094, b: 1342, light: 'day', at: [8, 1, -6], span: 20, cam: [k(1094, [15, WALK(14) + 3.6, 7.5], [13, WALK(13) + 0.6, -6], 44), k(1342, [12, WALK(11) + 3.4, 6.5], [11, WALK(10) + 0.6, -6], 44)], dof: D([12, WALK(12), -5.4], 2) },
  { id: 'ant', a: 1343, b: 1591, light: 'day', at: [2, 1, -6], span: 12, cam: [k(1343, [10.5, WALK(10) + 1.4, -0.6], [10.4, WALK(10) + 0.35, -5.4], 40), k(1591, [10.4, WALK(10) + 1.3, -1.2], [10.3, WALK(10) + 0.35, -5.4], 38)], kicks: [[1543, 0.05]], dof: D([10, WALK(10) + 0.3, -5.4], 5) },
  { id: 'aray', a: 1592, b: 1624, light: 'day', at: [300, 1, -10], span: 30, cam: [k(1592, [300, 19.5, 12], [300, 19.0, -10], 40), k(1624, [300, 19.5, 10.5], [300, 19.0, -10], 40)], kicks: [[1593, 0.08], [1600, 0.06]], dof: N0 },
  { id: 'fall', a: 1625, b: 1829, light: 'day', at: [0, 1, -6], span: 40, cam: [k(1625, [12, 9, 20], [10, 5, -6], 48), k(1829, [11, 7, 18], [10, 2.5, -6], 50)], kicks: [[1627, 0.06], [1640, 0.04]], dof: N0 },
  { id: 'saved', a: 1830, b: 1950, light: 'day', at: [SHORE, 1, SZ], span: 16, cam: [k(1830, [SHORE + 3, 2.6, SZ + 6], [SHORE + 1, 1.2, SZ - 0.5], 46), k(1887, [SHORE + 2.6, 2.4, SZ + 5.4], [SHORE + 1, 1.2, SZ - 0.5], 46), k(1888, [SHORE + 6, 3.2, SZ + 4], [SHORE + 8, 0.2, SZ - 3], 44), k(1950, [SHORE + 6, 3.0, SZ + 3.4], [SHORE + 8, 0.2, SZ - 3], 44)], dof: N0 },
  { id: 'today', a: 1951, b: 2102, light: 'golden', at: [SHORE, 1, SZ], span: 14, cam: [k(1951, [SHORE + 3.0, 2.2, SZ + 5.0], [SHORE, 1.4, SZ], 44), k(2102, [SHORE + 2.2, 2.0, SZ + 3.8], [SHORE, 1.5, SZ], 42)], dof: D([SHORE, 1.5, SZ], 3) },
  { id: 'twist', a: 2103, b: TOTAL - 1, light: 'golden', at: ROCK, span: 8, cam: [k(2103, [ROCK[0] + 0.6, 1.4, ROCK[2] + 2.6], [ROCK[0], 1.1, ROCK[2]], 40), k(TOTAL, [ROCK[0] + 0.15, 1.2, ROCK[2] + 1.1], [ROCK[0], 1.12, ROCK[2]], 34, { roll: 3 })], dof: D([ROCK[0], 1.1, ROCK[2]], 5) },
  { id: 'thumb', a: 9000, b: 9000, light: 'day', at: [300, 1, -10], span: 30, cam: [k(9000, [300.8, 18.8, 13], [300.8, 18.0, -10], 44)], dof: N0 },
];
export const shotAt = (f) => SHOTS.find((s) => f >= s.a && f < s.b + 1) || SHOTS[SHOTS.length - 1];

// ---------------- helpers ----------------
const ch = (id, who, f, pos, o = {}) => {
  const seed = who.seed || 1, I = idle(f, seed), bl = o.noBlink ? 0 : blinkAt(f, seed);
  const s = { who, expr: o.expr || 'neutral', mode: o.mode || 'stand', phase: o.phase || 0, blink: bl, armL: o.armL, armR: o.armR, tilt: q((o.tilt || 0) + I.tilt, 0.25), headTilt: q(o.headTilt || 0, 0.5), facing: o.facing || 0, look: o.look || 0, wave: o.wave, head: o.head, flipX: o.flipX };
  const key = JSON.stringify([s.expr, s.mode, q(s.phase, 0.05), s.blink, s.armL, s.armR, s.tilt, s.headTilt, s.facing, s.look, s.flipX, who.id]);
  return { id, kind: 'char', pos: [pos[0] + (o.still ? 0 : I.dx), pos[1], pos[2]], h: o.h ?? 2.0, key, draw: (g) => drawChar(g, s), blobW: o.blobW, blob: o.blob, opacity: o.opacity, soft: o.opacity != null ? true : undefined, roll: o.roll };
};
const fx = (id, pos, h, key, draw, o = {}) => ({ id, kind: 'fx', pos, h, key, draw, yaw: o.yaw ?? 'full', soft: o.soft ?? true, res: o.res || [512, 512], unlit: o.unlit ?? true, order: o.order ?? 5, opacity: o.opacity, roll: o.roll });
const burst = (id, f, at, pos, h = 0.6, col = '#fff3b0', n = 14) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'b' + q(t, 0.04) + col, (g) => { g.save(); g.scale(g.canvas.width / 500, g.canvas.width / 500); fxBurst(new Pen(g), t, col); g.restore(); }, { order: 7 }); };
const puff = (id, f, at, pos, h = 0.5, n = 16) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'p' + q(t, 0.05), (g) => { g.save(); g.scale(g.canvas.width / 300, g.canvas.width / 300); fxPuff(new Pen(g), t); g.restore(); }, { order: 8 }); };
const pop = (f, a, b) => (f < a || f > b ? 0 : back(win(f, a, a + 7)) * (1 - ss(win(f, b - 6, b))));
const label = (id, f, a, b, pos, txt, h = 0.34, col = '#ffffff') => { const s = pop(f, a, b); if (s <= 0.02) return null; return fx(id, pos, h * s, 'l' + txt + col, (g) => drawText(g, txt, { col }), { order: 9, res: [1024, 384] }); };
const tag = (id, f, a, b, pos, txt, h = 0.3) => { const s = pop(f, a, b); if (s <= 0.02) return null; return fx(id, pos, h * s, 'tg' + txt, (g) => drawTag(g, txt), { order: 9, res: [1024, 384] }); };
const sack = (id, pos, h = 0.6, o = {}) => fx(id, pos, h, 'sk' + (o.spill || 0), (g) => drawSack(g, o.spill || 0), { order: o.order ?? 6, unlit: false, roll: o.roll });
const ant = (id, f, pos, h, state, o = {}) => { const t = state === 'walk' ? (f * 0.15) % 1 : 0; return fx(id, pos, h, 'an' + state + q(t, 0.1) + (o.flip ? 'f' : ''), (g) => { if (o.flip) { g.translate(g.canvas.width, 0); g.scale(-1, 1); } drawAnt(g, state, t); }, { order: o.order ?? 7, unlit: false }); };
const lying = (f, o = {}) => { const s = { who: OUT.angalo, expr: o.expr || 'smile_closed', mode: 'stand', armL: ARM.hang, armR: ARM.hang, blink: 0 };
  return fx('lying', [LY.pos[0], LY.pos[1] + (o.dy || 0), LY.pos[2]], LY.h, 'ly' + s.expr, (g) => drawLying(g, s), { res: [2048, 1229], order: 2, unlit: false, opacity: o.opacity, roll: o.roll }); };
// a villager on the shore
const vil = (i, f, x, z, o = {}) => ch('v' + i, OUT[VIL[i % 4]], f, [x, gy(x, z), z], { h: 1.9, ...o });

// ---------------- per frame ----------------
export const actorsAt = (f) => {
  const S = shotAt(f), A = [], add = (x) => { if (Array.isArray(x)) x.forEach((y) => y && A.push(y)); else if (x) A.push(x); };
  switch (S.id) {
    case 'hook': case 'today': {
      const today = S.id === 'today', taste = today ? f >= 2010 : f >= 78;
      add(vil(0, f, SHORE, SZ, { expr: taste ? 'pained' : 'smile', armR: taste ? ARM.reach : ARM.hang, armL: ARM.hang, tilt: taste ? -4 : 0 }));
      if (taste) add(label('ma', f, today ? 2012 : 80, today ? 2102 : 134, [SHORE + 0.2, gy(SHORE, SZ) + 2.25, SZ], 'MAALAT!', 0.5, '#ffe066'));
      if (taste) add(puff('sp', f, today ? 2010 : 78, [SHORE + 0.5, gy(SHORE, SZ) + 1.6, SZ + 0.2], 0.6, 14));
      break; }
    case 'antHook': case 'twist': {
      const tw = S.id === 'twist';
      add(ant('a', f, [ROCK[0] + (tw ? 0 : lerp(-0.4, 0.05, win(f, 135, 175))), ROCK[1] + 0.18, ROCK[2] + 0.2], 0.42, tw ? 'smug' : f < 175 ? 'walk' : 'smug'));
      if (!tw) add(label('q', f, 178, 210, [ROCK[0] + 0.05, ROCK[1] + 0.6, ROCK[2] + 0.2], 'SIYA?!', 0.22, '#ffe066'));
      else add(label('ty', f, 2140, TOTAL, [ROCK[0] + 0.0, ROCK[1] + 0.58, ROCK[2] + 0.2], 'SALAMAT, LANGGAM.', 0.14, '#ffffff'));
      break; }
    case 'fresh': {
      const drink = f >= 317;
      add(vil(1, f, SHORE, SZ, { expr: drink ? 'relief_open' : 'smile', armR: drink ? ARM.reach : ARM.hang, armL: ARM.hang }));
      add(vil(2, f, SHORE - 2.2, SZ - 1.4, { expr: 'smile', armL: ARM.hang, armR: ARM.wave }));
      add(label('mt', f, 259, 316, [SHORE + 1.4, gy(SHORE, SZ) + 2.6, SZ + 0.4], 'MATABANG', 0.42, '#9fd4ff'));
      add(label('ah', f, 320, 380, [SHORE + 0.4, gy(SHORE, SZ) + 2.6, SZ], 'AHHH!', 0.42, '#ffffff'));
      break; }
    case 'salt': {
      if (f < 489) { add(fx('sg', [SX, 6, -9], 22, 'sg', (g) => glow(g, '255,250,230', 0.7), { order: 1 })); add(label('bn', f, 432, 488, [SX, 12.0, -6], 'BUNDOK NG ASIN', 3.4, '#ffffff')); }
      else { for (let i = 0; i < 4; i++) add(vil(i, f, SHORE - 1.6 + i * 1.05, SZ - 0.6 - (i % 2) * 0.7, { expr: 'grin', armL: ARM.cheer, armR: ARM.cheer, still: true }));
        add(label('gg', f, 492, 578, [SHORE, gy(SHORE, SZ) + 2.9, SZ - 0.5], 'GUSTONG-GUSTO!', 0.5, '#ffe066')); }
      break; }
    case 'nobridge': {
      for (let i = 0; i < 4; i++) add(vil(i, f, SHORE - 1.6 + i * 1.05, SZ - 0.6 - (i % 2) * 0.7, { expr: f >= 617 ? 'nervous' : 'neutral', armL: ARM.hip, armR: ARM.hip }));
      add(label('wt', f, 619, 658, [SHORE + 5, 3.2, SZ - 1], 'WALANG TULAY', 1.2, '#ff8a7a'));
      break; }
    case 'angalo': {
      const rise = easeOut(win(f, 659, 720));
      add(ch('ag', OUT.angalo, f, [0, lerp(-30, -3, rise), -12], { h: 30, expr: f >= 741 ? 'grin' : 'smile', armL: ARM.hang, armR: f >= 760 ? ARM.wave : ARM.hang, blob: false }));
      add(puff('sp1', f, 668, [0, 2, -10], 14, 24));
      for (let i = 0; i < 3; i++) add(vil(i, f, SHORE - 1.2 + i * 1.1, SZ - 0.4 - (i % 2) * 0.5, { expr: 'shock', armL: ARM.shield, armR: ARM.hang }));
      add(tag('tA', f, 700, 759, [0, 9, -9], 'ANGALO', 3.2));
      add(label('mb', f, 760, 853, [0, 9, -9], 'MABAIT', 2.6, '#ffe066'));
      add(label('tg', f, 790, 853, [0, 6.2, -9], 'SOBRANG TANGKAD', 2.0, '#ffffff'));
      break; }
    case 'liedown': {
      const down = ss(win(f, 860, 900));
      if (down < 1) add(ch('ag', OUT.angalo, f, [0, lerp(-3, -24, down), -12], { h: 30, expr: 'smile_closed', armL: ARM.hang, armR: ARM.hang, blob: false, opacity: 1 - win(f, 885, 900) }));
      if (f >= 885) add(lying(f, { opacity: win(f, 885, 900) }));
      add(puff('sp2', f, 884, [0, 2, -4], 26, 26));
      for (let i = 0; i < 4; i++) add(vil(i, f, SHORE - 1.6 + i * 1.05, SZ - 0.6 - (i % 2) * 0.7, { expr: f >= 1018 ? 'grin' : 'shock', armL: f >= 1018 ? ARM.cheer : ARM.hang, armR: f >= 1018 ? ARM.cheer : ARM.hang }));
      add(label('tl', f, 1020, 1093, [0, 16, -6], 'TULAY!', 5, '#ffe066'));
      add(burst('tb', f, 1018, [0, 9, -7], 18, '#fff3b0', 16));
      break; }
    case 'cross': {
      add(lying(f, { expr: 'smile_closed' }));
      for (let i = 0; i < 7; i++) { const x = 18.5 - ((f - 1094) * 0.02 + i * 1.6) % 11, wy = WALK(x); add(vil(i + 4, f, x, -5.0, { expr: 'smile', armL: ARM.carry, armR: ARM.carry, mode: 'stroll', phase: (f * 0.03 + i * 0.3) % 1, facing: -1, still: true, blob: false, h: 1.6 })); A[A.length - 1].pos[1] = wy; add(sack('s' + i, [x, wy + 1.38, -5.0], 0.55)); }
      add(label('n1', f, 1250, 1291, [12, WALK(12) + 3.3, -5], 'ISANG DAAN', 0.9, '#ffffff'));
      add(label('n2', f, 1292, 1309, [12, WALK(12) + 3.3, -5], 'DALAWANG DAAN', 0.9, '#ffffff'));
      add(label('n3', f, 1310, 1342, [12, WALK(12) + 3.3, -5], 'TATLONG DAAN!', 1.0, '#ffe066'));
      break; }
    case 'ant': {
      add(lying(f, { expr: 'smile_closed' }));
      const walk = f >= 1456 && f < 1541, x = lerp(11.4, 10.15, ss(win(f, 1456, 1530)));
      if (f >= 1450) add(ant('a', f, [x, WALK(10) + 0.18, -5.3], 0.5, walk ? 'walk' : f >= 1541 ? 'bite' : 'smug', { flip: true }));
      add(burst('kb', f, 1541, [10.05, WALK(10) + 0.12, -5.25], 0.6, '#ff8a7a'));
      add(label('kg', f, 1543, 1591, [10.2, WALK(10) + 0.75, -5.3], 'KAGAT!', 0.3, '#ff8a7a'));
      add(label('lg', f, 1470, 1540, [x, WALK(10) + 0.6, -5.3], 'MALIIT NA LANGGAM', 0.16, '#ffffff'));
      break; }
    case 'aray': case 'thumb': {
      const T = S.id === 'thumb';
      add(fx('bg', [300, 22, -12], 30, 'bgl', (g) => glow(g, '255,210,160', 0.8), { order: 1 }));
      add(ch('ag', OUT.angalo, f, [300, -3, -10], { h: 30, expr: 'pained', armL: ARM.shield, armR: ARM.up, blob: false, tilt: T ? -3 : 3 * Math.sin(f * 1.3) }));
      if (!T) add(label('ar', f, 1592, 1624, [300, 24.8, -9], 'ARAY!', 3.0, '#ff6a5a'));
      if (T) { add(ant('ta', f, [302.5, 16.4, 0], 2.6, 'bite', { flip: true, order: 9 })); add(burst('tb', 9007, 9000, [301.8, 17.0, -1], 3.2, '#ff8a7a')); }
      break; }
    case 'fall': {
      const jolt = Math.max(0, 1 - (f - 1625) / 30) * Math.sin((f - 1625) * 0.9);
      add(lying(f, { expr: f < 1700 ? 'pained' : 'nervous', dy: 1.8 * jolt, roll: 0.03 * jolt }));
      for (let i = 0; i < 6; i++) { const x0 = 17.5 - i * 1.6, t0 = 1630 + i * 4, t = clamp((f - t0) / 40); const yy = t <= 0 ? WALK(x0) : WALK(x0) + 4 * t - 13 * t * t * 1.4;
        if (yy > -1) { add(vil(i + 4, f, x0 + t * (i % 2 ? 1.5 : -1.5), -4.6, { expr: 'shock', armL: ARM.up, armR: ARM.up, still: true, blob: false, h: 1.6 })); A[A.length - 1].pos[1] = yy; add(sack('fs' + i, [x0 + t * (i % 2 ? -1 : 2), yy + 1.4 + t * 2, -4.6], 0.6, { roll: t * 4 * (i % 2 ? 1 : -1), spill: t })); }
        add(puff('fp' + i, f, t0 + 33, [x0, 1.0, -4.0], 2.2, 18)); }
      for (let i = 0; i < 6; i++) add(burst('wb' + i, f, 1760 + i * 6, [17.5 - i * 1.6, 0.6, -4.0], 2.0, '#ffffff', 18));
      add(label('as', f, 1756, 1829, [11, 8.5, -4], 'ASIN… PLOP!', 2.0, '#ffffff'));
      break; }
    case 'saved': {
      if (f < 1888) { for (let i = 0; i < 4; i++) add(vil(i, f, SHORE - 1.6 + i * 1.05, SZ - 0.6 - (i % 2) * 0.7, { expr: 'relief', armL: ARM.hang, armR: ARM.hang }));
        add(label('lg2', f, 1832, 1887, [SHORE + 0.6, gy(SHORE, SZ) + 2.4, SZ - 0.5], 'LIGTAS ✓', 0.5, '#7ae07a')); }
      else { for (let i = 0; i < 3; i++) add(sack('es' + i, [SHORE + 6.5 + i * 1.6, 0.15 + 0.08 * Math.sin(f * 0.15 + i), SZ - 2.5 - i], 0.7, { spill: 1, roll: 1.4 }));
        add(label('xa', f, 1890, 1950, [SHORE + 8, 2.4, SZ - 3], 'ASIN ✗', 1.0, '#ff8a7a')); }
      break; }
  }
  return A;
};

export const worldAt = (f) => ({ shot: shotAt(f).id });

export const lookAt = (f) => {
  let wipe = -1, iris = 2, flash = 0;
  for (const w of WIPES) if (f >= w && f <= w + 12) wipe = lerp(-0.35, 1.3, ss((f - w) / 12));
  if (f < 26) iris = lerp(0.0, 1.25, easeOut(f / 26));
  if (f >= IRIS_OUT[0] && f < 9000) iris = lerp(1.25, 0.0, ss(win(f, IRIS_OUT[0], IRIS_OUT[1])));
  for (const [a, b, m] of [[884, 894, 0.35], [1592, 1598, 0.4]]) if (f >= a && f <= b) flash = Math.max(flash, m * (1 - Math.abs(f - (a + b) / 2) / ((b - a) / 2 + 0.5)));
  return { flash, fade: 0, wipe, iris, irisC: f >= IRIS_OUT[0] ? [0.5, 0.45] : [0.5, 0.5] };
};
