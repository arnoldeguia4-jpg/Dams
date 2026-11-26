// Story timeline for "Napoleon vs the Rabbits" (1807): shots timed to the Scribe word frames of take 1 (TOTAL 1726).
import { ss, easeOut, back, win, clamp, lerp, idle, blinkAt, q } from './engine.js';
import { OUT, ARM, drawChar, drawText, drawRabbit, drawSwarm, drawCage, drawMemoir, glow, Pen, fxBurst, fxPuff, fxStars } from './cast.js';
import { TX, SX, CARR, PICNIC, CAGES } from './world.js';

export const TOTAL = 1726;
export const FLASHES = [[160, 168], [312, 320], [1398, 1406], [1518, 1526]];
export const MUSIC_STOP = 1522;
const NAP = [1.6, 0, -1.6];

// ---------------- shots ----------------
const k = (f, pos, look, fov = 42, o = {}) => ({ f, pos, look, fov, ...o });
const D = (pt, c = 5) => () => ({ c, pt });
export const SHOTS = [
  { id: 'hook', a: 0, b: 162, light: 'day', at: [2, 1, -2], span: 12, cam: [k(0, [1.8, 1.3, 2.8], [1.6, 1.5, -1.6], 42), k(118, [1.75, 1.45, 1.6], [1.6, 1.6, -1.6], 40), k(122, [1.9, 1.0, 2.8], [1.6, 0.9, -1.6], 46), k(162, [1.9, 1.0, 2.6], [1.6, 0.9, -1.6], 46)], kicks: [[124, 0.05]], dof: D([1.6, 1.4, -1.6], 4) },
  { id: 'tilsit', a: 163, b: 313, light: 'day', at: [TX, 1, -2], span: 12, cam: [k(163, [TX + 0.4, 1.6, 4.0], [TX, 1.5, -2.2], 44), k(313, [TX + 0.3, 1.6, 3.2], [TX, 1.5, -2.2], 42)], dof: D([TX, 1.6, -2.2], 3) },
  { id: 'berthier', a: 314, b: 417, light: 'day', at: [-1, 1, -2], span: 12, cam: [k(314, [-0.4, 1.6, 2.4], [-1.0, 1.5, -1.8], 42), k(417, [-0.5, 1.6, 2.0], [-1.0, 1.5, -1.8], 40)], dof: D([-1, 1.6, -1.8], 4) },
  { id: 'kit', a: 418, b: 553, light: 'day', at: [0, 1, -3], span: 12, cam: [k(418, [-2.2, 1.6, 2.2], [-2.6, 1.3, -1.6], 44), k(441, [-2.2, 1.6, 2.0], [-2.6, 1.3, -1.6], 44), k(442, [-1.2, 1.4, 1.4], [-1.5, 1.3, -1.4], 42), k(462, [-1.2, 1.4, 1.2], [-1.5, 1.3, -1.4], 42),
      k(463, [-4.0, 2.2, 1.4], [-4.2, 0.2, -1.6], 44), k(491, [-4.0, 2.0, 1.0], [-4.2, 0.2, -1.6], 44), k(492, [0, 1.6, -1.2], [0, 0.4, -5.3], 46), k(553, [0, 1.4, -2.0], [0, 0.4, -5.3], 44)], dof: () => ({ c: 0 }) },
  { id: 'cute', a: 554, b: 736, light: 'day', at: [0, 1, -4], span: 10, cam: [k(554, [0.8, 0.7, -2.8], [0.8, 0.4, -5.2], 40), k(736, [0.8, 0.65, -3.4], [0.8, 0.4, -5.2], 38)], dof: D([0.8, 0.5, -5.0], 6) },
  { id: 'open', a: 737, b: 899, light: 'day', at: [1, 1, -3], span: 12, cam: [k(737, [0, 1.3, -1.6], [0, 0.4, -5.2], 46), k(800, [0, 1.6, -0.6], [0.5, 0.6, -4.0], 48), k(838, [5.2, 1.4, 0.8], [1.6, 0.8, -2.8], 46), k(899, [4.8, 1.4, 0.6], [1.6, 0.9, -2.4], 44)], kicks: [[760, 0.04]], dof: () => ({ c: 0 }) },
  { id: 'dinner', a: 900, b: 964, light: 'day', at: [2, 1, -2], span: 10, cam: [k(900, [1.75, 1.55, 1.2], [1.6, 1.5, -1.6], 40), k(964, [1.75, 1.5, 0.9], [1.6, 1.45, -1.6], 40)], dof: D([1.6, 1.5, -1.6], 5) },
  { id: 'swarm', a: 965, b: 1125, light: 'day', at: [2, 1, -2], span: 12, cam: [k(965, [3.0, 2.2, 2.6], [1.6, 0.8, -1.6], 46), k(1057, [2.2, 1.4, 1.6], [1.6, 0.6, -1.6], 44), k(1090, [1.9, 1.7, 1.4], [1.6, 1.4, -1.6], 42), k(1125, [1.85, 1.7, 1.2], [1.6, 1.4, -1.6], 42)], kicks: [[1060, 0.03], [1092, 0.03]], dof: D([1.6, 1.0, -1.6], 3) },
  { id: 'whips', a: 1126, b: 1233, light: 'day', at: [1, 1, -2], span: 12, cam: [k(1126, [1.0, 1.7, 3.4], [1.0, 1.0, -1.6], 46), k(1233, [1.5, 1.6, 3.0], [2.4, 1.0, -1.8], 46)], kicks: [[1140, 0.03], [1160, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'run', a: 1234, b: 1401, light: 'day', at: [5, 1, -2], span: 14, cam: [k(1234, [3.6, 1.6, 4.0], [4.6, 1.0, -2.0], 46), k(1300, [5.4, 1.7, 3.4], [7.0, 1.2, -3.0], 46), k(1401, [6.6, 1.8, 2.4], [7.6, 1.4, -3.2], 44)], kicks: [[1300, 0.05]], dof: () => ({ c: 0 }) },
  { id: 'memoir', a: 1402, b: 1521, light: 'night', at: [SX, 1, -2], span: 10, cam: [k(1402, [SX + 0.3, 1.6, 1.6], [SX, 1.3, -2.6], 42), k(1521, [SX + 0.25, 1.55, 1.0], [SX, 1.3, -2.6], 40)], dof: D([SX, 1.4, -2.6], 4) },
  { id: 'thumb', a: 9000, b: 9000, light: 'day', at: [2, 1, -2], span: 10, cam: [k(9000, [1.75, 1.45, 1.3], [1.6, 1.35, -1.6], 42)], dof: D([1.6, 1.4, -1.6], 4) },
  { id: 'twist', a: 1522, b: TOTAL - 1, light: 'golden', at: [6, 1, -2], span: 14, cam: [k(1522, [1.7, 0.9, 1.8], [1.6, 1.9, -1.6], 44), k(1598, [1.7, 0.95, 1.5], [1.6, 2.0, -1.6], 42), k(1600, [3.0, 1.8, 6.0], [9.0, 1.2, -3.4], 50), k(1650, [9.5, 1.7, 4.4], [12, 1.4, -2.8], 44, { ease: ss }), k(TOTAL, [12.2, 1.65, 1.6], [13.7, 1.6, -2.6], 34, { roll: 3 })], dof: () => ({ c: 0 }) },
];
export const shotAt = (f) => SHOTS.find((s) => f >= s.a && f < s.b + 1) || SHOTS[SHOTS.length - 1];

// ---------------- helpers ----------------
const ch = (id, who, f, pos, o = {}) => {
  const seed = who.seed || 1, I = idle(f, seed), bl = o.noBlink ? 0 : blinkAt(f, seed);
  const s = { who, expr: o.expr || 'neutral', mode: o.mode || 'stand', phase: o.phase || 0, blink: bl, armL: o.armL, armR: o.armR, propL: o.propL, propR: o.propR,
    tilt: q((o.tilt || 0) + I.tilt, 0.25), headTilt: q(o.headTilt || 0, 0.5), facing: o.facing || 0, look: o.look || 0, wave: o.wave, head: o.head, flipX: o.flipX };
  const key = JSON.stringify([s.expr, s.mode, q(s.phase, 0.05), s.blink, s.armL, s.armR, s.propL, s.propR, s.tilt, s.headTilt, s.facing, s.look, s.wave != null ? q(s.wave, 0.1) : null, s.flipX, who.id]);
  return { id, kind: 'char', pos: [pos[0] + (o.still ? 0 : I.dx), pos[1] + (o.still ? 0 : I.bob * 0.3), pos[2]], h: o.h ?? 2.25, key, draw: (g) => drawChar(g, s), blobW: o.blobW };
};
const fx = (id, pos, h, key, draw, o = {}) => ({ id, kind: 'fx', pos: o.ground ? [pos[0], pos[1] + 0.38 * h, pos[2]] : pos, h, key, draw, yaw: o.yaw ?? 'full', soft: o.soft ?? true, res: o.res || [512, 512], unlit: o.unlit ?? true, order: o.order ?? 5, opacity: o.opacity, tiltX: o.tiltX });
const burst = (id, f, at, pos, h = 0.6, col = '#fff3b0', n = 14) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'b' + q(t, 0.04) + col, (g) => { g.save(); g.scale(g.canvas.width / 500, g.canvas.width / 500); fxBurst(new Pen(g), t, col); g.restore(); }, { order: 7 }); };
const puff = (id, f, at, pos, h = 0.5, n = 16) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'p' + q(t, 0.05), (g) => { g.save(); g.scale(g.canvas.width / 300, g.canvas.width / 300); fxPuff(new Pen(g), t); g.restore(); }, { order: 8 }); };
const mark = (id, txt, f, a, b, pos, h = 0.45, col = '#ffffff') => { if (f < a || f > b) return null; const s = back(win(f, a, a + 6)); return fx(id, pos, h * Math.max(0.05, s), 'm' + txt + col, (g) => drawText(g, txt, { col }), { order: 8, res: [1024, 512] }); };
const RC = ['#f4f1ea', '#c9a47a', '#8a6a4a', '#e9e2d4', '#a8a29a'];
const bun = (id, f, pos, o = {}) => fx(id, pos, o.h ?? 0.42, 'r' + q(o.hop || 0, 0.1) + (o.front === false ? 's' : 'f') + (o.facing || 1) + (o.col || 0), (g) => drawRabbit(g, { hop: o.hop || 0, front: o.front !== false, facing: o.facing || 1, col: RC[o.col || 0] }), { ground: true, order: 6 });
const rnd = (i, s = 1) => Math.abs(Math.sin(i * 12.9898 + s * 7.1) * 43758.5453) % 1;
/** N rabbits hopping from the cages toward a target, starting at f0 over dur frames */
const flock = (f, f0, dur, target, n = 16, o = {}) => { const out = [];
  for (let i = 0; i < n; i++) { const [cx, cz] = CAGES[i % 4], st = f0 + rnd(i) * 20; if (f < st) continue;
    const t = clamp((f - st) / (dur * (0.7 + 0.5 * rnd(i, 2)))), ang = rnd(i, 3) * Math.PI * 2, rad = 0.5 + 0.9 * rnd(i, 4);
    const tx = target[0] + Math.cos(ang) * rad, tz = target[2] + 0.4 + Math.sin(ang) * rad * 0.5;
    out.push(bun('b' + i, f, [lerp(cx, tx, ss(t)), 0, lerp(cz + 0.5, tz, ss(t))], { hop: ((f * 0.12) + rnd(i, 5)) % 1, front: o.front ?? true, col: i % 5, h: o.h ?? 0.38 })); }
  return out; };

// ---------------- world state ----------------
export const worldAt = (f) => {
  const S = shotAt(f);
  const doors = f >= 760 && f < 9000 ? ss(win(f, 760, 772)) : 0;
  const drive = S.id === 'twist' ? ss(win(f, 1600, 1725)) * 6 : 0;
  return { shot: S.id, doors, drive };
};

// ---------------- actors + fx per frame ----------------
export const actorsAt = (f) => {
  const S = shotAt(f), A = [], add = (x) => { if (Array.isArray(x)) x.forEach((y) => y && A.push(y)); else if (x) A.push(x); };
  const nap = (o) => add(ch('nap', OUT.napoleon, f, o.pos || NAP, { expr: 'smile', armL: ARM.hip, armR: ARM.vest, ...o }));
  switch (S.id) {
    case 'hook': {
      const r = f >= 122;
      nap({ expr: r ? 'shock' : 'smile', armR: r ? ARM.flail : ARM.vest, look: r ? -0.3 : 0 });
      if (r) add(bun('b0', f, [1.55, 0, -0.6], { hop: (f * 0.1) % 1, h: 0.5 }));
      add(burst('hb', f, 122, [1.55, 0.4, -0.5], 0.8));
      break;
    }
    case 'tilsit': {
      const cheer = f >= 260;
      add(ch('nap', OUT.napoleon, f, [TX - 0.55, 0.3, -2.2], { expr: cheer ? 'grin' : 'smile', armL: ARM.hip, armR: cheer ? ARM.cheer : ARM.shake, facing: 1 }));
      add(ch('tsar', OUT.tsar, f, [TX + 0.55, 0.3, -2.2], { expr: 'smile', armL: ARM.hold, propL: 'treaty', armR: cheer ? ARM.hang : ARM.shake, facing: -1 }));
      add(fx('bunT', [TX - 0.1, 2.75, -2.1], 0.45 * back(win(f, 262, 270)), 'bt', (g) => { const s = g.canvas.width; g.fillStyle = '#ffffff'; g.strokeStyle = '#241726'; g.lineWidth = s * 0.03; g.beginPath(); g.ellipse(s / 2, s / 2, s * 0.45, s * 0.38, 0, 0, 7); g.fill(); g.stroke(); g.save(); g.translate(s * 0.1, s * 0.05); g.scale(0.8, 0.8); drawRabbit(g, {}); g.restore(); }, { order: 8 }));
      break;
    }
    case 'berthier': {
      add(ch('ber', OUT.berthier, f, [-1.0, 0, -1.8], { expr: f > 374 ? 'grin' : 'smile', armL: ARM.hip, armR: f > 374 ? ARM.point : ARM.up, facing: f > 374 ? -1 : 0 }));
      add(mark('bn', 'BERTHIER', f, 350, 417, [-1.0, 2.6, -1.7], 0.26, '#ffe066'));
      break;
    }
    case 'kit': {
      if (f < 442) { add(ch('h0', OUT.hunter(0), f, [-3.2, 0, -1.8], { expr: 'grin', armL: ARM.hip, armR: ARM.hang, facing: 1 })); add(ch('h1', OUT.hunter(1), f, [-2.0, 0, -1.6], { expr: 'smile', armL: ARM.hang, armR: ARM.hip, facing: -1 })); }
      else if (f < 463) add(ch('h2', OUT.hunter(2), f, [-1.5, 0, -1.4], { expr: 'stern', armL: ARM.hold, armR: ARM.aim, propR: 'gun', facing: 1 }));
      else if (f >= 492) { for (let i = 0; i < 4; i++) { const [x, z] = CAGES[i]; add(bun('cb' + i, f, [x + 0.15, 0.05, z + 0.3], { hop: 0, col: i, h: 0.32 })); } add(mark('lots', '× HUNDREDS', f, 498, 553, [0, 1.25, -5.0], 0.32, '#ffe066')); }
      break;
    }
    case 'cute': {
      add(bun('c1', f, [0.8, 0, -4.7], { hop: f >= 600 ? 0 : 0, col: 0, h: 0.7 }));
      if (f >= 658) add(fx('heart', [1.05, 0.95, -4.6], 0.25 * back(win(f, 658, 664)), 'heart', (g) => { const s = g.canvas.width; g.fillStyle = '#e8507a'; g.strokeStyle = '#241726'; g.lineWidth = s * 0.05; g.beginPath(); g.moveTo(s / 2, s * 0.85); g.bezierCurveTo(s * 0.05, s * 0.5, s * 0.2, s * 0.1, s / 2, s * 0.35); g.bezierCurveTo(s * 0.8, s * 0.1, s * 0.95, s * 0.5, s / 2, s * 0.85); g.fill(); g.stroke(); }, { order: 8 }));
      if (f >= 600 && f < 658) add(mark('nw', 'NOT WILD', f, 600, 657, [0.8, 1.2, -4.6], 0.22, '#ffffff'));
      if (f >= 692) add(mark('far', 'FROM FARMERS', f, 692, 736, [0.8, 1.2, -4.6], 0.2, '#ffe066'));
      break;
    }
    case 'open': {
      nap({ expr: f >= 860 ? 'shock' : 'smile', armR: f >= 860 ? ARM.flail : ARM.vest });
      add(ch('ber', OUT.berthier, f, [-0.6, 0, -1.2], { expr: f >= 800 ? 'nervous' : 'grin', armL: ARM.hip, armR: f >= 800 ? ARM.shrug : ARM.point }));
      add(flock(f, 772, f >= 838 ? 110 : 140, NAP, 14));
      break;
    }
    case 'dinner': {
      nap({ expr: 'nervous', armR: ARM.hang, armL: ARM.hang, look: -0.4, headTilt: -4 });
      for (let i = 0; i < 5; i++) add(bun('d' + i, f, [1.05 + i * 0.28, 0, -1.0 + (i % 2) * 0.15], { hop: 0, col: i, h: 0.36 }));
      add(fx('think', [1.0, 2.4, -1.3], 0.34 * back(win(f, 930, 936)), 'th', (g) => drawText(g, '?', { col: '#ffe066' }), { order: 8 }));
      break;
    }
    case 'swarm': {
      const up = win(f, 1058, 1115);
      nap({ expr: f >= 1058 ? 'pained' : 'shock', armL: ARM.flail, armR: ARM.flail, tilt: 4 * Math.sin(f * 0.5) });
      add(flock(f, 940, 80, NAP, 18, { h: 0.38 }));
      const climbers = Math.floor(6 * up);
      for (let i = 0; i < climbers; i++) add(bun('cl' + i, f, [NAP[0] - 0.25 + (i % 3) * 0.25, 0.25 + i * 0.22, NAP[2] + 0.3], { hop: ((f * 0.15) + i * 0.3) % 1, col: (i + 2) % 5, h: 0.32 }));
      break;
    }
    case 'whips': {
      const back_ = ss(win(f, 1186, 1230));
      const np = [NAP[0] + 1.2 * back_, 0, NAP[2] - 0.2 * back_];
      add(ch('nap', OUT.napoleon, f, np, { expr: 'pained', armL: ARM.flail, armR: ARM.flail, mode: back_ > 0 && back_ < 1 ? 'stroll' : 'stand', phase: (f * 0.08) % 1 }));
      const sw = Math.floor(f / 8) % 2;
      add(ch('h0', OUT.hunter(0), f, [-0.4, 0, -1.2], { expr: 'stern', armL: ARM.hip, armR: sw ? ARM.whip : ARM.whip2, propR: 'whip', facing: 1 }));
      add(ch('h1', OUT.hunter(1), f, [0.4, 0, -2.4], { expr: 'nervous', armL: ARM.hip, armR: sw ? ARM.whip2 : ARM.whip, propR: 'whip', facing: 1 }));
      add(flock(f, 1000, 60, np, 16, { h: 0.38 }));
      break;
    }
    case 'run': {
      const t = ss(win(f, 1234, 1298)), inCar = f >= 1300;
      if (!inCar) add(ch('nap', OUT.napoleon, f, [lerp(2.8, CARR[0] - 0.4, t), 0, lerp(-1.8, CARR[2] + 1.0, t)], { mode: 'march', phase: (f * 0.12) % 1, expr: 'shock', armL: ARM.flail, armR: ARM.flail }));
      add(puff('door', f, 1298, [CARR[0], 1.4, CARR[2] + 0.9], 1.0, 14));
      if (inCar) add(ch('napw', OUT.napoleon, f, [CARR[0] + 0.2, 0.82, CARR[2] + 0.8], { blobW: 0.001, h: 1.1, expr: 'nervous', armL: ARM.hang, armR: ARM.hang, still: true }));
      const tp = inCar ? [CARR[0] + 0.2, 0, CARR[2] + 1.1] : [lerp(2.8, CARR[0] - 0.4, t), 0, lerp(-1.8, CARR[2] + 1.0, t)];
      add(flock(f, 1140, 80, tp, 16, { h: 0.38 }));
      if (f >= 1334) for (let i = 0; i < 4; i++) { const st = 1334 + i * 9, tt = clamp((f - st) / 12); if (f < st) continue; add(bun('jmp' + i, f, [CARR[0] - 0.4 + 0.2 * i + 0.4 * tt, 0.0 + 1.3 * Math.sin(Math.PI * tt) + 0.5 * tt, CARR[2] + 1.2 - 0.3 * tt], { hop: 0.5, col: i, h: 0.36 })); }
      break;
    }
    case 'memoir': {
      add(ch('thi', OUT.thiebault, f, [SX, 0, -2.9], { expr: f >= 1488 ? 'smile' : 'neutral', armL: ARM.hold, armR: ARM.write, propR: 'pen', look: 0.2 }));
      add(fx('page', [SX - 0.25, 1.0, -2.0], 0.5, 'pg', drawMemoir, { order: 6, tiltX: -1.2 }));
      add(mark('yr', 'YEARS LATER…', f, 1488, 1521, [SX, 2.75, -2.7], 0.28, '#ffe066'));
      break;
    }
    case 'thumb': {
      add(ch('nap', OUT.napoleon, 9000, NAP, { expr: 'shock', armL: ARM.flail, armR: ARM.flail, still: true, noBlink: true }));
      for (let i = 0; i < 6; i++) add(bun('tb' + i, 9000, [NAP[0] - 0.55 + i * 0.22, 0, NAP[2] + 0.5 + (i % 2) * 0.2], { hop: (i * 0.17) % 1, col: i % 5, h: 0.36 }));
      add(bun('top', 9000, [NAP[0] + 0.05, 1.72, NAP[2] + 0.1], { hop: 0, col: 0, h: 0.34 }));
      break;
    }
    case 'twist': {
      if (f < 1600) {
        add(ch('nap', OUT.napoleon, f, NAP, { expr: 'grin', armL: ARM.hip, armR: ARM.vest, still: true }));
        add(fx('glow', [NAP[0], 1.8, NAP[2] - 0.6], 3.0, 'gl', (g) => glow(g, '255,226,140', 0.6), { order: 3 }));
      } else {
        const dx = worldAt(f).drive;
        add(ch('napw', OUT.napoleon, f, [CARR[0] + 0.2 + dx, 0.82, CARR[2] + 0.8], { blobW: 0.001, h: 1.1, expr: 'pained', armL: ARM.hang, armR: ARM.hang, still: true }));
        add(bun('hat', f, [CARR[0] + 0.22 + dx, 1.86, CARR[2] + 0.84], { hop: 0, col: 0, h: 0.26 }));
        for (let i = 0; i < 14; i++) { const lag = 0.8 + rnd(i) * 3.0; add(bun('ch' + i, f, [CARR[0] - lag + dx * 0.92, 0, CARR[2] + 0.9 + rnd(i, 2) * 1.6], { hop: ((f * 0.15) + rnd(i, 3)) % 1, front: false, facing: 1, col: i % 5, h: 0.4 })); }
        for (const at of [1612, 1640, 1668, 1696]) add(puff('dust' + at, f, at, [CARR[0] - 1.2 + worldAt(at).drive, 0.3, CARR[2] + 0.6], 0.8, 16));
      }
      break;
    }
  }
  return A;
};

export const lookAt = (f) => {
  let flash = 0;
  for (const [a, b] of FLASHES) if (f >= a && f <= b) { const m = (a + b) / 2; flash = Math.max(flash, 1 - Math.abs(f - m) / ((b - a) / 2 + 0.5)); }
  return { flash: clamp(flash) * 0.9, fade: 0 };
};
