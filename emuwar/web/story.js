// "The War Australia Lost to Birds": shots, cameras, world state, actors, fx — pure functions of the frame.
import { ss, easeOut, easeIn, back, spring, win, clamp, lerp, kick, idle, blinkAt, q } from './engine.js';
import { OUT, ARM, drawChar, drawText, Pen, fxBurst, fxPuff, drawEmu, drawTankBubble } from './cast.js';

export const TOTAL = 1703;
export const FLASHES = [[186, 194], [1626, 1634]];
export const STING = 1631;

const C = (f, pos, look, fov = 40, o = {}) => ({ f, pos, look, fov, ...o });
export const SHOTS = [
  { id: 'hook', a: 0, b: 148, light: 'day', at: [0.5, 1, 4.5], span: 8,
    cam: [C(0, [0.55, 1.45, 9.4], [0.55, 1.25, 4.3]), C(148, [0.6, 1.42, 8.3], [0.55, 1.25, 4.3])], dof: () => ({ c: 6, pt: [0.5, 1.5, 4.4] }) },
  { id: 'lost', a: 149, b: 190, light: 'day', at: [1, 1, 4.5], span: 8,
    cam: [C(149, [1.55, 1.6, 7.0], [1.2, 1.45, 4.2], 38), C(190, [1.5, 1.58, 6.6], [1.2, 1.47, 4.2], 38)], kicks: [[150, 0.02]], dof: () => ({ c: 11, pt: [1.3, 1.6, 4.2] }) },
  { id: 'wa', a: 191, b: 239, light: 'day', at: [0, 2, -6], span: 30,
    cam: [C(191, [-6, 16, 30], [3, 1.5, -8], 44), C(239, [-2, 7.5, 22], [3, 1.5, -8], 44)], dof: () => ({ c: 0 }) },
  { id: 'march', a: 240, b: 359, light: 'day', at: [2, 1, 0], span: 12,
    cam: [C(240, [-3.2, 1.9, 7.6], [-2.2, 1.1, 0.3]), C(359, [5.2, 1.7, 7.0], [5.6, 1.1, 0.3], 40, { path: [[1.0, 1.8, 7.4]] })], dof: () => ({ c: 4, pt: [1, 1.3, 0.5] }) },
  { id: 'buffet', a: 360, b: 421, light: 'day', at: [6, 1, -1], span: 8,
    cam: [C(360, [6.6, 1.05, 4.6], [6.4, 0.85, 0.0]), C(421, [6.5, 1.0, 3.9], [6.35, 0.85, 0.0])], dof: () => ({ c: 10, pt: [6.4, 0.9, 0.2] }) },
  { id: 'phone', a: 422, b: 493, light: 'day', at: [-12, 1, -10], span: 8,
    cam: [C(422, [-10.8, 1.95, -5.8], [-11.6, 1.5, -10.2]), C(493, [-11.0, 1.92, -6.4], [-11.6, 1.52, -10.2])], kicks: [[430, 0.02]], dof: () => ({ c: 8, pt: [-11.6, 1.6, -10.2] }) },
  { id: 'army', a: 494, b: 683, light: 'day', at: [1, 1, 5], span: 10,
    cam: [C(494, [-2.0, 1.5, 8.9], [-2.0, 1.2, 5]), C(548, [-1.8, 1.5, 8.7], [-1.9, 1.2, 5]), C(572, [-0.35, 1.5, 9.2], [-0.35, 1.1, 5]),
      C(600, [1.9, 1.35, 8.6], [1.95, 0.8, 5]), C(632, [2.1, 1.35, 8.4], [2.0, 0.8, 5]), C(650, [3.55, 1.45, 8.2], [3.55, 0.7, 5]), C(683, [0.9, 2.5, 13.4], [0.9, 1.0, 5])],
    kicks: [[642, 0.02], [652, 0.02], [662, 0.025]], dof: (f) => ({ c: f < 665 ? 6 : 2, pt: [f < 572 ? -2 : f < 620 ? 1.9 : 3.5, 1.1, 5] }) },
  { id: 'plan', a: 684, b: 758, light: 'day', at: [0, 1, 4], span: 12,
    cam: [C(684, [0.1, 1.6, 9.2], [0, 1.2, 3.0]), C(758, [0.15, 1.6, 8.5], [0, 1.2, 3.0])], dof: () => ({ c: 4, pt: [0, 1.5, 5] }) },
  { id: 'scatter', a: 759, b: 890, light: 'day', at: [6, 1, -5], span: 16,
    cam: [C(759, [6, 9.5, 9.5], [6, 0, -4.5], 44), C(890, [6, 8.2, 7.6], [6, 0, -5], 44)], kicks: [[811, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'ambush', a: 891, b: 975, light: 'day', at: [23, 1, -3], span: 10,
    cam: [C(891, [21.2, 1.35, 4.4], [22.6, 1.0, -3]), C(975, [21.3, 1.3, 3.7], [22.4, 1.0, -2.5])], kicks: [[937, 0.04]], dof: () => ({ c: 5, pt: [21.6, 1.0, -0.2] }) },
  { id: 'chase', a: 976, b: 1079, light: 'day', at: [8, 1, -1], span: 16,
    cam: [C(976, [-1.5, 2.3, 7.5], [1.5, 1.0, -1.5], 44), C(1023, [6.5, 2.3, 7.4], [9.5, 1.0, -1.5], 44), C(1079, [12.0, 2.5, 7.8], [16, 1.0, -1.5], 44)],
    dof: () => ({ c: 0 }) },
  { id: 'tanks', a: 1080, b: 1187, light: 'day', at: [0, 1, 5], span: 8,
    cam: [C(1080, [0.3, 1.55, 8.6], [0.35, 1.6, 5]), C(1187, [0.35, 1.58, 7.8], [0.4, 1.65, 5])], kicks: [[1160, 0.02]], dof: () => ({ c: 7, pt: [0, 1.6, 5] }) },
  { id: 'home', a: 1188, b: 1367, light: 'day', at: [-6, 1, 4], span: 20,
    cam: [C(1188, [-4, 2.8, 17.5], [-4, 1.0, 4]), C(1367, [-4, 2.6, 16.0], [-4, 1.0, 4])], dof: () => ({ c: 0 }) },
  { id: 'bounty', a: 1368, b: 1536, light: 'golden', at: [-12, 1, -10], span: 8,
    cam: [C(1368, [-11.3, 1.95, -6.0], [-12.2, 1.45, -10.6]), C(1536, [-11.5, 1.85, -7.1], [-12.2, 1.45, -10.6])], dof: () => ({ c: 7, pt: [-12.2, 1.5, -10.4] }) },
  { id: 'lostwar', a: 1537, b: 1630, light: 'golden', at: [0, 1, 4.5], span: 10,
    cam: [C(1537, [0.3, 1.7, 10.2], [0.2, 1.25, 4.6]), C(1630, [0.25, 1.6, 8.6], [0.2, 1.3, 4.6], 40, { roll: -2 })], dof: () => ({ c: 4, pt: [0, 1.5, 4.8] }) },
  { id: 'fly', a: 1631, b: TOTAL - 1, light: 'golden', at: [1, 1, 4.3], span: 8,
    cam: [C(1631, [1.45, 1.6, 7.6], [1.2, 1.4, 4.2], 38), C(1702, [1.4, 1.55, 6.6], [1.2, 1.45, 4.2], 38, { roll: 3 })], kicks: [[1676, 0.03]], dof: () => ({ c: 10, pt: [1.25, 1.5, 4.2] }) },
  { id: 'thumb', a: 9000, b: 9000, light: 'day', at: [0.5, 1, 4.5], span: 8,
    cam: [C(9000, [0.7, 1.5, 8.6], [0.7, 1.35, 4.3])], dof: () => ({ c: 8, pt: [0.5, 1.5, 4.4] }) },
];
export const shotAt = (f) => SHOTS.find((s) => f >= s.a && f <= s.b) || SHOTS[SHOTS.length - 2];

// ---------------- helpers ----------------
const ch = (id, who, f, pos, o = {}) => {
  const seed = who.seed || 1, I = idle(f, seed), bl = o.noBlink ? 0 : blinkAt(f, seed);
  const s = { who, expr: o.expr || 'neutral', mode: o.mode || 'stand', phase: o.phase || 0, blink: bl, armL: o.armL, armR: o.armR, propL: o.propL, propR: o.propR,
    tilt: q((o.tilt || 0) + I.tilt, 0.25), headTilt: q(o.headTilt || 0, 0.5), facing: o.facing || 0, look: o.look || 0, wave: o.wave, flipX: o.flipX };
  const key = JSON.stringify([s.expr, s.mode, q(s.phase, 0.05), s.blink, s.armL, s.armR, s.propL, s.propR, s.tilt, s.headTilt, s.facing, s.look, s.wave != null ? q(s.wave, 0.1) : null, s.flipX]);
  return { id, kind: 'char', pos: [pos[0] + (o.still ? 0 : I.dx), pos[1], pos[2]], h: o.h ?? 2.25, key, draw: (g) => drawChar(g, s), blobW: o.blobW };
};
const emu = (id, f, pos, o = {}) => {
  const s = { phase: o.phase ?? 0, mode: o.mode || 'stand', expr: o.expr || 'neutral', bib: o.bib, flip: !!o.flip, blink: o.noBlink ? 0 : blinkAt(f, o.seed ?? id.length * 7), hop: o.hop || 0, helmet: o.helmet };
  const key = JSON.stringify([s.mode, q(s.phase, 0.0625), s.expr, s.bib, s.flip, s.blink, q(s.hop, 4), s.helmet]);
  return { id, kind: 'char', pos, h: 2.25, key, draw: (g) => drawEmu(g, s), blobW: 1.1 };
};
const fx = (id, pos, h, key, draw, o = {}) => ({ id, kind: 'fx', pos: o.ground ? [pos[0], pos[1] + 0.38 * h, pos[2]] : pos, h, key, draw, yaw: o.yaw ?? 'full', soft: o.soft ?? true, res: o.res || [512, 512], unlit: o.unlit ?? true, order: o.order ?? 5 });
const burst = (id, f, at, pos, h = 0.6, col = '#fff3b0') => { const t = (f - at) / 14; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'b' + q(t, 0.04), (g) => { g.save(); g.scale(g.canvas.width / 500, g.canvas.width / 500); fxBurst(new Pen(g), t, col); g.restore(); }); };
const puff = (id, f, at, pos, h = 0.5, n = 16) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'p' + q(t, 0.05), (g) => { g.save(); g.scale(g.canvas.width / 300, g.canvas.width / 300); fxPuff(new Pen(g), t); g.restore(); }); };
const mark = (id, txt, f, a, b, pos, h = 0.45, col = '#ffffff') => { if (f < a || f > b) return null; const s = back(win(f, a, a + 8)); return fx(id, pos, h * Math.max(0.05, s), 'm' + txt + q(s, 0.1), (g) => drawText(g, txt, { col })); };

// truck path: { x, z, ry (0 = driving +x), speed m/f, vis }
const truckAt = (f) => {
  const S = shotAt(f).id;
  if (S === 'chase') { const t = (f - 976) / 30; const x = -2 + 5.2 * t - 0.9 * Math.max(0, t - 1.6) ** 2; return { x, z: -1.6, ry: 0, speed: 1, vis: true, bounce: 1 }; }
  if (S === 'home') {
    if (f < 1212) return { x: -2, z: 5.0, ry: Math.PI, speed: 0, vis: true };
    if (f < 1282) return { x: -2 - 34 * easeIn(win(f, 1214, 1276)), z: 5.0, ry: Math.PI, speed: 1, vis: true, bounce: 1 };
    if (f < 1320) return { x: -36 + 34 * easeOut(win(f, 1282, 1312)), z: 5.0, ry: 0, speed: f < 1312 ? 1 : 0, vis: true, bounce: 1 };
    return { x: -2 - 34 * easeIn(win(f, 1322, 1360)), z: 5.0, ry: Math.PI, speed: 1, vis: true, bounce: 1 };
  }
  if (S === 'army' || S === 'plan' || S === 'tanks' || S === 'lostwar') return { x: -4.6, z: 2.4, ry: 0, speed: 0, vis: true };
  return { x: -4.6, z: 2.4, ry: 0, speed: 0, vis: S === 'hook' || S === 'lost' || S === 'fly' };
};

export const worldAt = (f) => {
  const S = shotAt(f), w = { shot: S.id };
  w.truck = truckAt(f);
  const pop = (a) => (f < a ? 0 : back(win(f, a, a + 10), 2));
  w.guns = S.id === 'army' ? [pop(578), pop(598)] : ['plan', 'tanks', 'lostwar'].includes(S.id) ? [1, 1] : [0, 0];
  w.crates = S.id === 'army' ? [0, 1, 2, 3, 4, 5].map((i) => (f < 640 + i * 5 ? -1 : 1 - easeIn(win(f, 640 + i * 5, 648 + i * 5)))) : ['plan', 'tanks'].includes(S.id) ? [0, 0, 0, 0, 0, 0] : [-1, -1, -1, -1, -1, -1];
  w.jam = S.id === 'ambush' ? easeOut(win(f, 937, 950)) : 0;
  w.fan = f * 0.12;
  w.coins = S.id === 'bounty' ? win(f, 1380, 1400) : 0;
  return w;
};

// ---------------- actors ----------------
export const actorsAt = (f) => {
  const S = shotAt(f), A = [], add = (x) => x && A.push(x), T = truckAt(f);
  switch (S.id) {
    case 'hook': {
      const decl = f >= 54;
      add(ch('maj', OUT.major, f, [-0.05, 0, 4.6], { expr: decl ? 'stern' : 'neutral', armR: decl ? ARM.point : ARM.hip, armL: ARM.holdHi, propL: decl ? 'scroll' : undefined, tilt: decl ? 3 : 0 }));
      add(puff('scr', f, 52, [-0.35, 1.35, 4.7], 0.5, 10));
      add(emu('e0', f, [1.15, 0, 4.3], { flip: true, expr: f > 120 ? 'surprise' : 'neutral' }));
      add(mark('ex0', '!', f, 120, 148, [1.0, 2.05, 4.3], 0.4, '#ffe066'));
      break;
    }
    case 'lost': {
      add(emu('e0', f, [1.15, 0, 4.3], { flip: true, expr: 'smug' }));
      add(ch('maj', OUT.major, f, [-0.05, 0, 4.6], { expr: 'nervous', armR: ARM.sad, armL: ARM.sad, tilt: -4, headTilt: 6 }));
      break;
    }
    case 'wa': {
      for (let i = 0; i < 6; i++) add(emu('w' + i, f, [2 + i * 1.6, 0.55, -3 - (i % 3) * 2], { mode: 'peck', phase: (f * 0.03 + i * 0.3) % 1, flip: i % 2 === 1, seed: i }));
      break;
    }
    case 'march': {
      for (let i = 0; i < 12; i++) { const x = -9 + i * 1.5 + (f - 240) * 0.07; add(emu('m' + i, f, [x, 0, 0.6 + (i % 2) * 0.35], { mode: 'walk', phase: (f * 0.045 + i * 0.13) % 1, seed: i })); }
      break;
    }
    case 'buffet': {
      add(emu('b0', f, [6.35, 0.55, -0.2], { mode: f > 395 ? 'stand' : 'peck', phase: (f * 0.05) % 1, bib: true, expr: f > 395 ? 'happy' : 'neutral', seed: 3 }));
      add(emu('b1', f, [5.3, 0.55, -1.6], { mode: 'peck', phase: (f * 0.04 + 0.3) % 1, flip: true, seed: 5 }));
      add(emu('b2', f, [7.5, 0.55, -2.4], { mode: 'peck', phase: (f * 0.045 + 0.6) % 1, seed: 7 }));
      add(burst('bf', f, 396, [6.75, 1.9, 0.0], 0.5));
      break;
    }
    case 'phone': {
      add(ch('far', OUT.farmer, f, [-11.6, 0.4, -10.3], { expr: f < 450 ? 'shock' : 'laugh', armR: ARM.phone, propR: 'phone', armL: ARM.ear, propL: 'ear', tilt: 3 * Math.sin(f * 0.5) }));
      add(mark('ph', '!', f, 428, 470, [-11.2, 2.4, -10.2], 0.4, '#ffe066'));
      for (let i = 0; i < 3; i++) add(emu('pe' + i, f, [-6 + i * 1.8, 0, -8 - i], { mode: 'peck', phase: (f * 0.04 + i * 0.3) % 1, seed: i }));
      break;
    }
    case 'army': case 'plan': case 'tanks': case 'lostwar': {
      const army = S.id === 'army', plan = S.id === 'plan', tanks = S.id === 'tanks', lw = S.id === 'lostwar';
      const sIn = army ? back(win(f, 551, 561), 2) : 1;
      if (army) {
        add(ch('maj', OUT.major, f, [-2.0, 0, 5.0], { expr: 'stern', armR: f > 505 ? ARM.salute : ARM.hip, armL: ARM.hip }));
        add(puff('pm', f, 494, [-2.0, 0.9, 5.2], 1.2, 12));
        if (f >= 551) { add(ch('s1', OUT.sold1, f, [-0.95, 0, 5.1], { expr: 'grin', armR: ARM.salute, armL: ARM.hang, h: 2.25 * sIn })); add(ch('s2', OUT.sold2, f, [0.15, 0, 5.0], { expr: 'smile', armR: ARM.salute, armL: ARM.hang, h: 2.25 * sIn })); }
        add(puff('ps', f, 551, [-0.4, 0.8, 5.3], 1.4, 12)); add(puff('pg1', f, 578, [1.45, 0.5, 5.2], 0.9)); add(puff('pg2', f, 598, [2.55, 0.5, 5.3], 0.9));
        add(burst('bul', f, 668, [3.6, 1.6, 5.2], 0.6));
      } else if (plan) {
        add(ch('maj', OUT.major, f, [0.0, 0, 5.0], { expr: 'stern', armR: ARM.holdHi, propR: 'map', armL: ARM.point }));
        add(ch('s1', OUT.sold1, f, [-1.15, 0, 5.2], { expr: 'neutral', armR: ARM.hang, armL: ARM.hang }));
        add(ch('s2', OUT.sold2, f, [1.15, 0, 5.2], { expr: 'neutral', armR: ARM.chin, armL: ARM.hang }));
        for (let i = 0; i < 5; i++) add(emu('pl' + i, f, [-3 + i * 1.7, 0.55, -2.5 - (i % 2) * 1.5], { mode: f > 720 ? 'stand' : 'peck', phase: (f * 0.04 + i * 0.3) % 1, flip: i % 2 === 0, expr: f > 725 ? 'smug' : 'neutral', seed: i }));
      } else if (tanks) {
        add(ch('maj', OUT.major, f, [0.0, 0, 5.0], { expr: f > 1150 ? 'shock' : 'stern', armR: f > 1150 ? ARM.up : ARM.point, armL: ARM.hip, tilt: f > 1150 ? -3 : 0 }));
        const t = back(win(f, 1105, 1120), 1.6); if (t > 0.01) A.push(fx('bub', [0.85, 2.45, 4.9], 1.25 * t, 'tb' + q(t, 0.05) + q(f / 30, 0.1), (g) => drawTankBubble(g, t, f / 30), { res: [600, 600] }));
      } else if (lw) {
        add(ch('maj', OUT.major, f, [0.0, 0, 5.0], { expr: 'pained', armR: ARM.holdHi, propR: 'whiteflag', armL: ARM.sad, tilt: -3 }));
        add(ch('s1', OUT.sold1, f, [-1.15, 0, 5.2], { expr: 'nervous', armR: ARM.sad, armL: ARM.sad, tilt: -5 }));
        add(ch('s2', OUT.sold2, f, [1.15, 0, 5.2], { expr: 'pained', armR: ARM.sad, armL: ARM.sad, tilt: 4 }));
        for (let i = 0; i < 4; i++) add(emu('lw' + i, f, [-2.4 + i * 1.6, 0, 1.9], { expr: 'smug', flip: i % 2 === 0, seed: i }));
      }
      break;
    }
    case 'scatter': {
      const sc = f >= 810, t = (f - 810) / 30;
      for (let i = 0; i < 14; i++) {
        const a = i / 14 * Math.PI * 2 + 0.2, r0 = 0.6 + (i % 3) * 0.5, r = r0 + (sc ? 7.5 * t * (0.8 + 0.3 * (i % 4) / 3) : 0);
        const x = 6 + r * Math.cos(a), z = -5 + r * Math.sin(a) * 0.8;
        add(emu('s' + i, f, [x, 0.55, z], { mode: sc ? 'run' : 'peck', phase: (f * (sc ? 0.11 : 0.04) + i * 0.17) % 1, flip: sc ? Math.cos(a) < 0 : i % 2 === 0, expr: sc ? 'surprise' : 'neutral', seed: i }));
      }
      const ap = Math.min(1, (f - 759) / 50);
      add(ch('s1', OUT.sold1, f, [3.2 + 1.2 * ap, 0.55, -0.5 - 1.0 * ap], { expr: sc ? 'shock' : 'stern', mode: f < 810 ? 'stroll' : 'stand', phase: (f * 0.05) % 1, armR: sc ? ARM.up : ARM.hang, armL: sc ? ARM.up : ARM.hang }));
      add(ch('s2', OUT.sold2, f, [8.6 - 1.2 * ap, 0.55, -0.3 - 1.0 * ap], { expr: sc ? 'shock' : 'stern', mode: f < 810 ? 'stroll' : 'stand', phase: (f * 0.05 + 0.5) % 1, armR: sc ? ARM.up : ARM.hang, armL: sc ? ARM.up : ARM.hang }));
      add(puff('sd', f, 810, [6, 0.9, -5], 3.0, 20));
      break;
    }
    case 'ambush': {
      const jam = f >= 937;
      add(ch('s1', OUT.sold1, f, [21.0, 0, 0.35], { expr: jam ? 'shock' : 'stern', mode: 'sit', armR: jam ? ARM.up : ARM.reach, armL: jam ? ARM.up : ARM.hold, tilt: 4 }));
      add(ch('s2', OUT.sold2, f, [22.2, 0, 0.6], { expr: jam ? 'pained' : 'grin', mode: 'sit', armR: ARM.chin, armL: ARM.hang }));
      for (let i = 0; i < 4; i++) add(emu('d' + i, f, [23.5 + i * 1.3, 0, -7.6 + (i % 2) * 0.6], { mode: f > 945 ? 'stand' : 'peck', phase: (f * 0.04 + i * 0.3) % 1, flip: true, expr: f > 948 ? 'smug' : 'neutral', seed: i }));
      add(puff('jam', f, 938, [22.3, 0.8, 0.1], 0.9, 20)); add(burst('jb', f, 937, [22.3, 0.75, 0.15], 0.5, '#ffd0a0'));
      add(mark('jm', '!', f, 938, 975, [21.4, 1.7, 0.6], 0.4, '#ffe066'));
      break;
    }
    case 'chase': {
      for (let i = 0; i < 6; i++) { const lead = 5.5 + i * 1.4 + Math.max(0, (f - 1023) / 30) * (6 + i); add(emu('c' + i, f, [T.x + lead, 0.55, -2.4 + (i % 3) * 0.8], { mode: 'run', phase: (f * 0.12 + i * 0.21) % 1, expr: f > 1023 ? 'smug' : 'neutral', seed: i })); }
      const bob = 0.05 * Math.abs(Math.sin(f * 0.9));
      add(ch('s1', OUT.sold1, f, [T.x - 1.1, 0.82 + bob, T.z + 0.2], { expr: f > 1030 ? 'nervous' : 'stern', armR: ARM.reach, armL: ARM.hold, tilt: 5 * Math.sin(f * 0.8), still: true }));
      if (f > 1030) add(puff('ex', f, 1030 + (f - 1030) - ((f - 1030) % 10), [T.x - 2.6, 0.6, T.z], 0.6, 10));
      break;
    }
    case 'home': {
      if (T.vis && T.x > -14) add(ch('s1', OUT.sold1, f, [T.x + 1.1, 0.82 + 0.04 * Math.abs(Math.sin(f * 0.9)), T.z + 0.3], { expr: f < 1282 || f >= 1320 ? 'neutral' : 'grin', armR: f >= 1282 && f < 1320 ? ARM.wave : ARM.hang, armL: ARM.hang, still: true, wave: 0.5 + 0.5 * Math.sin(f * 0.5) }));
      for (let i = 0; i < 5; i++) { const look = T.x < -2 ? -1 : 1; add(emu('h' + i, f, [0.5 + i * 1.4, 0, 2.3], { flip: (T.x < 0.5 + i * 1.4) !== (i === 99), expr: f > 1330 ? 'smug' : 'neutral', seed: i })); }
      add(mark('q1', '?', f, 1290, 1320, [3.3, 2.1, 2.3], 0.45, '#ffe066'));
      break;
    }
    case 'bounty': {
      const got = f >= 1400, win2 = f >= 1476;
      add(ch('off', OUT.official, f, [-12.95, 0.4, -11.2], { expr: 'smile', armR: got ? ARM.hang : ARM.reach, armL: ARM.hang }));
      add(ch('far', OUT.farmer, f, [-11.65, 0.4, -10.25], { expr: win2 ? 'relief_open' : got ? 'grin' : 'smile', armR: got ? (win2 ? ARM.cheer : ARM.holdHi) : ARM.reach, propR: got ? 'moneybag' : undefined, armL: win2 ? ARM.cheer : ARM.hip }));
      add(burst('bw', f, 1478, [-11.4, 2.3, -10.1], 0.6));
      break;
    }
    case 'fly': {
      const tt = f - 1631, hop = tt > 18 && tt < 46 ? 120 * Math.sin(Math.PI * (tt - 18) / 28) : 0, landed = tt >= 46;
      add(emu('e0', f, [1.15, 0, 4.3], { flip: true, mode: landed ? 'stand' : 'flap', phase: (f * 0.09) % 1, hop, expr: landed ? 'smug' : 'surprise', noBlink: true }));
      add(puff('land', f, 1677, [1.2, 0.3, 4.4], 0.9));
      add(burst('end', f, 1684, [0.7, 2.0, 4.2], 0.35, '#fff8c0'));
      break;
    }
    case 'thumb': {
      add(ch('maj', OUT.major, 9000, [-0.15, 0, 4.6], { expr: 'shock', armR: ARM.up, armL: ARM.up, tilt: -4, still: true, noBlink: true }));
      add(emu('e0', 9000, [1.25, 0, 4.3], { flip: true, expr: 'smug', noBlink: true }));
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
