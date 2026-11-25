// Story timeline for "Why is a marathon 26.2 miles?": shots, cameras, light, actors and effects as pure functions of the frame.
import { ss, easeOut, back, win, clamp, lerp, idle, blinkAt, q } from './engine.js';
import { OUT, ARM, runArms, crowd, drawChar, drawText, drawPlate, drawX, drawStamp, drawMap, drawTape, drawCalendar, glow, Pen, fxBurst, fxPuff, fxStars } from './cast.js';
import { GX, CX, SX, STONE, BALCONY } from './world.js';

export const TOTAL = 1823;
export const FLASHES = [[258, 268], [394, 404], [926, 936], [1563, 1573]];
export const MUSIC_STOP = 1717;
const FALLS = [[1300, 1320], [1346, 1364], [1388, 1406]];
const PLATE = [STONE[0], 0.62, STONE[2] + 0.16];

// ---------------- shots ----------------
const PCAM = [];
for (let f = 1229; f <= 1562; f += 12) { const x = pietriX(Math.min(f, 1562)); PCAM.push({ f, pos: [x + 0.45, 1.35, 4.4], look: [x + 0.05, 1.15, 0.3], fov: 42, ease: (t) => t }); }
export const SHOTS = [
  { id: 'hook', a: 0, b: 262, light: 'day', at: [0, 1, 0], span: 8,
    cam: [{ f: 0, pos: [STONE[0] - 0.1, 0.95, 3.0], look: [STONE[0], 0.85, 0], fov: 40 }, { f: 262, pos: [STONE[0], 0.9, 2.0], look: [STONE[0], 0.78, 0], fov: 40 }],
    kicks: [[135, 0.03], [172, 0.03], [232, 0.05]], dof: () => ({ c: 9, pt: [STONE[0], 0.8, 0.2] }) },
  { id: 'greek', a: 263, b: 398, light: 'golden', at: [GX, 1, -2], span: 12,
    cam: [{ f: 263, pos: [GX - 4.2, 1.2, 4.2], look: [GX - 4.6, 1.2, -2], fov: 42 }, { f: 372, pos: [GX + 1.9, 1.2, 4.0], look: [GX + 1.9, 1.2, -2], fov: 42, ease: (t) => t }, { f: 398, pos: [GX + 2.0, 1.2, 3.6], look: [GX + 2.0, 1.2, -2], fov: 42 }],
    kicks: [[376, 0.05]], dof: () => ({ c: 4, pt: [GX, 1.2, -2] }) },
  { id: 'royal', a: 399, b: 453, light: 'day', at: [CX, 2, -6], span: 22,
    cam: [{ f: 399, pos: [CX + 3, 1.6, 26], look: [CX, 7, -8], fov: 46 }, { f: 453, pos: [CX + 2.5, 1.7, 22], look: [CX, 7.4, -8], fov: 44 }],
    dof: () => ({ c: 0 }) },
  { id: 'plan', a: 454, b: 629, light: 'day', at: [CX, 1, 2], span: 10,
    cam: [{ f: 454, pos: [CX + 0.4, 1.5, 7.6], look: [CX + 0.2, 1.45, 2.4], fov: 42 }, { f: 629, pos: [CX + 0.6, 1.5, 6.6], look: [CX + 0.4, 1.45, 2.4], fov: 42 }],
    dof: () => ({ c: 4, pt: [CX + 0.3, 1.5, 2.5] }) },
  { id: 'start', a: 630, b: 790, light: 'day', at: [CX, 2, -2], span: 18,
    cam: [{ f: 630, pos: [CX + 0.8, 0.9, 7.5], look: [CX + 0.6, 1.4, 0], fov: 46 }, { f: 716, pos: [CX + 1.0, 0.9, 7.0], look: [CX + 0.9, 2.0, -2], fov: 46 },
      { f: 790, pos: [CX + 1.4, 1.0, 6.2], look: [BALCONY.x, 4.9, BALCONY.z], fov: 42, ease: ss }],
    dof: () => ({ c: 0 }) },
  { id: 'nursery', a: 791, b: 925, light: 'day', at: [CX, 4, -6], span: 10,
    cam: [{ f: 791, pos: [BALCONY.x + 0.3, 4.7, -1.2], look: [BALCONY.x, 5.1, BALCONY.z], fov: 40 }, { f: 925, pos: [BALCONY.x + 0.2, 4.8, -1.8], look: [BALCONY.x, 5.15, BALCONY.z], fov: 40 }],
    dof: () => ({ c: 5, pt: [BALCONY.x, 5.2, BALCONY.z] }) },
  { id: 'stadium', a: 926, b: 1115, light: 'day', at: [SX, 1, -4], span: 18,
    cam: [{ f: 926, pos: [SX + 7, 2.6, 13], look: [SX, 1.8, -5], fov: 46 }, { f: 962, pos: [SX + 6, 2.4, 11], look: [SX, 2.0, -5], fov: 46 },
      { f: 1010, pos: [SX + 0.6, 2.4, -1.2], look: [SX, 2.3, -6.7], fov: 40, ease: ss }, { f: 1115, pos: [SX + 0.5, 2.4, -1.6], look: [SX, 2.3, -6.7], fov: 40 }],
    dof: (f) => ({ c: f < 1000 ? 0 : 6, pt: [SX, 2.3, -6.7] }) },
  { id: 'tape', a: 1116, b: 1228, light: 'day', at: [SX - 3, 1, 0], span: 12,
    cam: [{ f: 1116, pos: [SX - 3.5, 1.3, 6.4], look: [SX - 3.2, 0.8, 1], fov: 44 }, { f: 1228, pos: [SX - 2.6, 1.25, 6.0], look: [SX - 2.4, 0.8, 1], fov: 44 }],
    dof: () => ({ c: 3, pt: [SX - 3, 0.8, 1] }) },
  { id: 'pietri', a: 1229, b: 1562, light: 'day', at: [SX - 3, 1, 0], span: 12,
    cam: PCAM,
    kicks: [[1312, 0.03], [1358, 0.03], [1400, 0.03], [1521, 0.05]], dof: () => ({ c: 4, pt: [SX - 2, 1.2, 0.3] }) },
  { id: 'official', a: 1563, b: 1716, light: 'day', at: [0, 1, 0], span: 8,
    cam: [{ f: 1563, pos: [STONE[0] - 0.5, 1.3, 3.6], look: [STONE[0] - 0.4, 1.0, 0], fov: 42 }, { f: 1716, pos: [STONE[0] - 0.3, 1.2, 3.0], look: [STONE[0] - 0.2, 0.95, 0], fov: 42 }],
    kicks: [[1690, 0.04]], dof: () => ({ c: 6, pt: [STONE[0] - 0.4, 1.0, 0.2] }) },
  { id: 'thumb', a: 9000, b: 9000, light: 'golden', at: [0, 1, 0], span: 8,
    cam: [{ f: 9000, pos: [1.2, 1.25, 3.9], look: [1.2, 1.1, 0], fov: 44 }], dof: () => ({ c: 5, pt: [1.1, 1.1, 0.2] }) },
  { id: 'final', a: 1717, b: TOTAL - 1, light: 'golden', at: [0, 1, 0], span: 10,
    cam: [{ f: 1717, pos: [STONE[0] + 1.0, 0.75, 3.0], look: [STONE[0], 0.8, 0], fov: 40 }, { f: TOTAL, pos: [STONE[0] + 0.25, 0.78, 1.35], look: [STONE[0], 0.7, 0], fov: 38, roll: 3 }],
    dof: () => ({ c: 8, pt: [STONE[0], 0.7, 0.2] }) },
];
export const shotAt = (f) => SHOTS.find((s) => f >= s.a && f <= s.b) || SHOTS[SHOTS.length - 1];

// ---------------- helpers ----------------
const ch = (id, who, f, pos, o = {}) => {
  const seed = who.seed || 1, I = idle(f, seed), bl = o.noBlink ? 0 : blinkAt(f, seed);
  const s = { who, expr: o.expr || 'neutral', mode: o.mode || 'stand', phase: o.phase || 0, blink: bl, armL: o.armL, armR: o.armR, propL: o.propL, propR: o.propR,
    tilt: q((o.tilt || 0) + I.tilt, 0.25), headTilt: q(o.headTilt || 0, 0.5), facing: o.facing || 0, look: o.look || 0, wave: o.wave, head: o.head, flipX: o.flipX };
  const key = JSON.stringify([s.expr, s.mode, q(s.phase, 0.05), s.blink, s.armL, s.armR, s.propL, s.propR, s.tilt, s.headTilt, s.facing, s.look, s.wave != null ? q(s.wave, 0.1) : null, s.flipX, who.id]);
  return { id, kind: 'char', pos: [pos[0] + (o.still ? 0 : I.dx), pos[1] + (o.still ? 0 : I.bob * 0.3), pos[2]], h: o.h ?? 2.25, key, draw: (g) => drawChar(g, s), blobW: o.blobW };
};
const fx = (id, pos, h, key, draw, o = {}) => ({ id, kind: 'fx', pos: o.ground ? [pos[0], pos[1] + 0.38 * h, pos[2]] : pos, h, key, draw, yaw: o.yaw ?? 'full', soft: o.soft ?? true, res: o.res || [512, 512], unlit: o.unlit ?? true, order: o.order ?? 5, opacity: o.opacity });
const burst = (id, f, at, pos, h = 0.6, col = '#fff3b0', n = 14) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'b' + q(t, 0.04) + col, (g) => { g.save(); g.scale(g.canvas.width / 500, g.canvas.width / 500); fxBurst(new Pen(g), t, col); g.restore(); }, { order: 7 }); };
const puff = (id, f, at, pos, h = 0.5, n = 16) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'p' + q(t, 0.05), (g) => { g.save(); g.scale(g.canvas.width / 300, g.canvas.width / 300); fxPuff(new Pen(g), t); g.restore(); }, { order: 6 }); };
const mark = (id, txt, f, a, b, pos, h = 0.45, col = '#ffffff') => { if (f < a || f > b) return null; const s = back(win(f, a, a + 6)); return fx(id, pos, h * Math.max(0.05, s), 'm' + txt + col, (g) => drawText(g, txt, { col, font: 'bold 300px Georgia, serif', lw: 24 }), { order: 7 }); };
const popCard = (id, f, a, b, pos, h, key, draw, o = {}) => { if (f < a || f > b) return null; const s = back(win(f, a, a + 7)); return fx(id, pos, h * Math.max(0.05, s), key, draw, { order: 7, ...o }); };
const dizzy = (id, f, a, b, pos, h = 0.5) => (f < a || f > b ? null : fx(id, pos, h, 'dz' + q((f - a) / 24 % 1, 0.04), (g) => { g.save(); g.scale(g.canvas.width / 420, g.canvas.width / 420); g.translate(0, 105); fxStars(new Pen(g), (f - a) / 24 % 1); g.restore(); }, { order: 7 }));
const plate = (f, txt, x = 0) => fx('plate', PLATE, 0.62, 'pl' + txt + q(x, 0.1), (g) => drawPlate(g, txt, { x }), { yaw: 0, order: 6, soft: false });

// ---------------- world state ----------------
export const worldAt = (f) => ({ tape: !(f >= 1495 && f < 9000) });
export function pietriX(f) {
  // stagger along the track toward the finish (SX), standing still during each fall
  let x = SX - 8.5 + 0.022 * (Math.min(f, 1426) - 1229);
  for (const [a, b] of FALLS) x -= 0.022 * clamp(Math.min(f, 1426) - a, 0, b - a);
  if (f > 1426) x += (SX + 0.6 - x) * ss(win(f, 1426, 1500));
  return x;
}

// ---------------- actors + fx per frame ----------------
export const actorsAt = (f) => {
  const S = shotAt(f), A = [], add = (x) => { if (Array.isArray(x)) x.forEach((y) => y && A.push(y)); else if (x) A.push(x); };
  switch (S.id) {
    case 'hook': {
      const txt = f < 123 ? '26.2' : f < 159 ? '25' : f < 199 ? '26' : '26.2';
      const x = f >= 123 && f < 159 ? ss(win(f, 132, 140)) : f >= 159 && f < 199 ? ss(win(f, 169, 177)) : 0;
      add(plate(f, txt, x));
      add(mark('q', '?', f, 36, 118, [STONE[0] + 0.25, 1.45, 0.35], 0.4, '#ffe066'));
      add(burst('two', f, 232, [STONE[0], 0.7, 0.35], 1.1, '#fff3b0', 16));
      add(puff('swap1', f, 121, [STONE[0], 0.65, 0.3], 0.7, 10)); add(puff('swap2', f, 157, [STONE[0], 0.65, 0.3], 0.7, 10)); add(puff('swap3', f, 197, [STONE[0], 0.65, 0.3], 0.7, 10));
      break;
    }
    case 'greek': {
      const stop = f >= 372, x = stop ? GX + 1.9 : lerp(GX - 5.5, GX + 1.9, win(f, 263, 372)), [L, R] = runArms(f, 0.55);
      add(ch('greek', OUT.greek, f, [x, 0, -2], { mode: stop ? 'stand' : 'march', phase: (f * 0.08) % 1, expr: stop ? 'shock' : 'grin', armL: stop ? ARM.shrug : L, armR: stop ? ARM.shrug : R }));
      add(popCard('nope', f, 376, 398, [GX + 1.9, 1.3, -1.7], 1.6, 'x', drawX));
      break;
    }
    case 'royal': {
      add(burst('cr', f, 405, [CX - 6, 17.5, -7], 4, '#f2c440', 16));
      break;
    }
    case 'plan': {
      add(ch('off', OUT.official, f, [CX - 0.15, 0, 3.1], { expr: f > 600 ? 'grin' : 'smile', armR: f > 520 ? ARM.point : ARM.hang, armL: ARM.hip, propL: 'scroll', facing: 1 }));
      add(fx('map', [CX + 0.95, 1.45, 2.4], 1.4, 'mp' + q(ss(win(f, 520, 600)), 0.04) + (f > 590 ? 'L' : ''), (g) => drawMap(g, ss(win(f, 520, 600)), f > 590 ? '≈ 26 MILES' : ''), { yaw: 0, order: 4, res: [1024, 1024], soft: false }));
      add(popCard('cal', f, 472, 560, [CX - 0.9, 2.45, 2.6], 0.75, 'c1908', (g) => drawCalendar(g, 1908)));
      break;
    }
    case 'start': {
      const R = [[OUT.run1, -1.8], [OUT.run2, -0.6], [OUT.pietri, 0.6], [OUT.run3, 1.8]];
      R.forEach(([who, dx], i) => add(ch('r' + i, who, f, [CX + 0.8 + dx, 0, 1.6], { expr: i === 2 ? 'grin' : 'smile', armL: ARM.hip, armR: i % 2 ? ARM.hang : ARM.hip })));
      add(ch('kidA', OUT.prince, f, [BALCONY.x - 0.5, BALCONY.y, BALCONY.z + 0.25], { expr: 'laugh', armL: ARM.wave, armR: ARM.cheer, wave: 0.5 + 0.5 * Math.sin(f * 0.4) }));
      add(ch('kidB', OUT.princess, f, [BALCONY.x + 0.5, BALCONY.y, BALCONY.z + 0.25], { expr: 'grin', armL: ARM.cheer, armR: ARM.wave, wave: 0.5 + 0.5 * Math.sin(f * 0.4 + 1) }));
      break;
    }
    case 'nursery': {
      add(ch('kidA', OUT.prince, f, [BALCONY.x - 0.5, BALCONY.y, BALCONY.z + 0.25], { expr: f > 870 ? 'laugh' : 'grin', armL: ARM.wave, armR: ARM.cheer, wave: 0.5 + 0.5 * Math.sin(f * 0.4) }));
      add(ch('kidB', OUT.princess, f, [BALCONY.x + 0.5, BALCONY.y, BALCONY.z + 0.25], { expr: 'grin', armL: ARM.cheer, armR: ARM.wave, wave: 0.5 + 0.5 * Math.sin(f * 0.4 + 1) }));
      add(burst('nb', f, 850, [BALCONY.x, 6.3, BALCONY.z + 0.4], 0.8, '#fff3b0', 14));
      break;
    }
    case 'stadium': {
      add(ch('queen', OUT.queen, f, [SX, 1.25, -6.75], { expr: f > 1070 ? 'grin' : 'smile_closed', armL: ARM.hip, armR: f > 1070 ? ARM.wave : ARM.hang, wave: 0.5 + 0.5 * Math.sin(f * 0.3) }));
      for (let i = 0; i < 10; i++) { const r = i % 3, x = SX - 9 + i * 2 + (i > 4 ? 2.4 : 0); add(ch('cr' + i, crowd(i), f, [x, 0.6 + r * 0.6, -5.2 - r * 1.4], { expr: 'grin', armL: Math.sin(f * 0.4 + i) > 0 ? ARM.cheer : ARM.hang, armR: ARM.wave, wave: 0.5 + 0.5 * Math.sin(f * 0.3 + i), still: true })); }
      add(burst('seat', f, 1074, [SX + 0.5, 3.3, -6.3], 0.8, '#f2c440', 14));
      break;
    }
    case 'tape': {
      const t = ss(win(f, 1122, 1200));
      add(fx('tape', [SX - 3.2, 0.5, 1.2], 0.5, 'tp' + q(t, 0.02), (g) => drawTape(g, t, '+385 YD'), { yaw: 0, res: [1024, 256], order: 6 }));
      add(ch('off', OUT.official, f, [SX - 6.3, 0, 0.9], { expr: f > 1190 ? 'shock' : 'neutral', armL: ARM.hold, armR: ARM.hip }));
      break;
    }
    case 'pietri': {
      const x = pietriX(f), fall = FALLS.find(([a, b]) => f >= a && f < b), helped = f >= 1426 && f < 1515, dq = f >= 1521;
      const [L, R] = runArms(f, 0.35);
      add(ch('pie', OUT.pietri, f, [x, 0, 0.3], { mode: fall ? 'fall' : helped || f < 1426 ? 'stroll' : 'stand', phase: (f * 0.035) % 1, expr: dq ? 'dazed' : fall ? 'pained' : helped ? 'dazed' : 'pained', armL: helped ? ARM.over : L, armR: helped ? ARM.over : R, tilt: fall ? 0 : 6 * Math.sin(f * 0.17) }));
      for (const [a, b] of FALLS) { add(puff('fp' + a, f, a + 2, [x, 0.25, 0.5], 0.9, 14)); add(dizzy('dz' + a, f, a + 4, b + 6, [x, 1.95, 0.4], 0.45)); }
      if (f >= 1418) { add(ch('o1', OUT.official, f, [x - 0.55, 0, 0.45], { mode: helped ? 'stroll' : 'stand', phase: (f * 0.035) % 1, expr: 'nervous', armL: ARM.hang, armR: ARM.reach, facing: 1 }));
        add(ch('o2', OUT.official2, f, [x + 0.55, 0, 0.45], { mode: helped ? 'stroll' : 'stand', phase: (f * 0.035 + 0.5) % 1, expr: dq ? 'stern' : 'nervous', armL: ARM.reach, armR: dq ? ARM.point : ARM.hang, facing: -1 })); }
      add(burst('tapeb', f, 1496, [SX, 1.2, 0.4], 0.9, '#ffffff', 12));
      add(popCard('dq', f, 1521, 1562, [x, 1.4, 0.9], 1.0, 'dq', (g) => drawStamp(g, 'DQ'), { res: [1024, 512] }));
      break;
    }
    case 'official': {
      add(plate(f, '26.2'));
      const stamping = f >= 1680 && f < 1700;
      add(ch('off', OUT.official, f, [STONE[0] - 1.15, 0, 0.45], { expr: f > 1700 ? 'grin' : 'smile', armR: stamping ? ARM.stamp : ARM.hold, propR: 'stamp', armL: ARM.hip, facing: 1 }));
      add(popCard('cal', f, 1640, 1716, [STONE[0] - 1.1, 2.3, 0.3], 0.7, 'c1921', (g) => drawCalendar(g, 1921)));
      if (f >= 1690) A.push(fx('stampO', [PLATE[0], PLATE[1] - 0.05, PLATE[2] + 0.04], 0.5 * back(win(f, 1690, 1697)), 'so', (g) => drawStamp(g, 'OFFICIAL'), { yaw: 0, res: [1024, 512], order: 7 }));
      add(puff('sp', f, 1690, [PLATE[0], 0.55, PLATE[2] + 0.2], 0.6, 12));
      break;
    }
    case 'thumb': {
      add(fx('tglow', [STONE[0], 0.8, -0.1], 2.2, 'tg', (g) => glow(g, '255,226,140', 0.95), { order: 2 }));
      A.push(fx('tburst', [STONE[0], 0.8, -0.12], 2.0, 'tb', (g) => { g.save(); g.scale(g.canvas.width / 500, g.canvas.width / 500); fxBurst(new Pen(g), 0.6, '#fff3b0', 12); g.restore(); }, { order: 3 }));
      add(plate(f, '26.2'));
      add(ch('pie', OUT.pietri, 9000, [0.75, 0, 0.35], { expr: 'shock', armL: ARM.hip, armR: ARM.point, still: true, noBlink: true, look: 0.5 }));
      break;
    }
    case 'final': {
      const k = ss(win(f, 1760, 1800));
      add(fx('fglow', [STONE[0], 0.8, -0.1], 1.6 + 0.6 * k, 'fg' + q(k, 0.05), (g) => glow(g, '255,226,140', 0.4 + 0.5 * k), { order: 2 }));
      add(plate(f, '26.2'));
      [[OUT.run1, -0.9, 0], [OUT.run2, 0.8, 12], [OUT.run3, -0.2, 24]].forEach(([who, x, d], i) => { const z = -14 + 0.12 * (f - 1717 - d); const [L, R] = runArms(f, 0.55, i);
        if (z > -14 && z < 3) add(ch('fr' + i, who, f, [x, 0, z], { mode: 'march', phase: (f * 0.08 + i * 0.3) % 1, expr: 'grin', armL: L, armR: R })); });
      add(burst('fb', f, 1800, [STONE[0], 0.72, 0.4], 1.0, '#fff3b0', 16));
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
