// "The Candy Bar That Invented the Microwave": shots, cameras, actors, fx.
import { ss, easeOut, easeIn, back, spring, win, clamp, lerp, kick, idle, blinkAt, q } from './engine.js';
import { OUT, ARM, drawChar, drawText, Pen, fxBurst, fxPuff, drawPopcorn, drawEggSplat, drawWaves } from './cast.js';

export const TOTAL = 1568;
export const FLASHES = [[166, 174], [1366, 1374]];
export const STING = 1520;
const FX = -120, SX = 120, KX = 200, OX = 280;
const C = (f, pos, look, fov = 40, o = {}) => ({ f, pos, look, fov, ...o });

export const SHOTS = [
  { id: 'hook', a: 0, b: 169, light: 'lab', at: [0, 1, -1], span: 8,
    cam: [C(0, [0.4, 1.6, 2.6], [0.1, 1.45, -1.0], 38), C(169, [0.3, 1.55, 1.7], [0.05, 1.4, -1.0], 38)], dof: () => ({ c: 11, pt: [0, 1.5, -0.9] }) },
  { id: 'ext', a: 170, b: 312, light: 'day', at: [FX, 4, -4], span: 24,
    cam: [C(170, [FX + 2, 14, 26], [FX + 3, 9, -8], 44), C(312, [FX - 1, 2.0, 7.5], [FX, 1.6, -1.5], 40, { path: [[FX + 1, 8, 14]] })], dof: () => ({ c: 0 }) },
  { id: 'radar', a: 313, b: 386, light: 'day', at: [FX + 6, 12, -8], span: 20,
    cam: [C(313, [FX - 4, 7, 14], [FX + 6, 12.5, -8], 44), C(386, [FX - 3, 7.5, 12.5], [FX + 6, 12.5, -8], 44)], dof: () => ({ c: 0 }) },
  { id: 'school', a: 387, b: 478, light: 'lab', at: [-3, 1, -3], span: 8,
    cam: [C(387, [-2.2, 1.7, 1.6], [-2.9, 1.7, -3.6], 40), C(478, [-2.3, 1.65, 1.0], [-2.9, 1.7, -3.6], 40)], dof: () => ({ c: 6, pt: [-2.4, 1.6, -2.0] }) },
  { id: 'walk', a: 479, b: 553, light: 'lab', at: [0, 1, -2], span: 8,
    cam: [C(479, [-1.8, 1.8, 4.2], [-1.2, 1.2, -1.5]), C(553, [-0.8, 1.7, 3.0], [0.1, 1.25, -2])], dof: () => ({ c: 3, pt: [0, 1.4, -1.4] }) },
  { id: 'mag', a: 554, b: 611, light: 'lab', at: [0.3, 1.4, -2.4], span: 6,
    cam: [C(554, [0.9, 1.6, -0.6], [0.3, 1.35, -2.4], 38), C(611, [0.7, 1.55, -0.9], [0.3, 1.35, -2.4], 38)], dof: () => ({ c: 10, pt: [0.3, 1.35, -2.2] }) },
  { id: 'goo', a: 612, b: 710, light: 'lab', at: [0, 1, -1], span: 8,
    cam: [C(612, [0.35, 1.55, 1.6], [0.05, 1.35, -1.2], 38), C(710, [0.3, 1.5, 1.0], [0.05, 1.35, -1.2], 38)], kicks: [[660, 0.03]], dof: () => ({ c: 10, pt: [0, 1.4, -1.1] }) },
  { id: 'mad', a: 711, b: 807, light: 'lab', at: [-3, 1, -1], span: 8,
    cam: [C(711, [-3.0, 1.55, 2.2], [-3.2, 1.3, -1.6], 40), C(807, [-3.1, 1.5, 1.6], [-3.2, 1.3, -1.6], 40)], kicks: [[745, 0.02], [765, 0.02]], dof: () => ({ c: 8, pt: [-3.2, 1.4, -1.4] }) },
  { id: 'curious', a: 808, b: 866, light: 'lab', at: [0, 1, -1], span: 8,
    cam: [C(808, [0.25, 1.62, 0.9], [0.0, 1.55, -1.2], 36), C(866, [0.22, 1.6, 0.5], [0.0, 1.55, -1.2], 36)], dof: () => ({ c: 12, pt: [0, 1.6, -1.1] }) },
  { id: 'popcorn', a: 867, b: 1024, light: 'lab', at: [0, 1, -2], span: 8,
    cam: [C(867, [1.6, 1.7, 2.3], [0.2, 1.3, -1.8]), C(957, [1.2, 1.65, 1.6], [0.2, 1.35, -1.8]), C(1024, [0.4, 2.2, 3.6], [0.2, 1.4, -1.8], 42)], kicks: [[960, 0.03], [975, 0.02]], dof: (f) => ({ c: f < 958 ? 6 : 2, pt: [0.3, 1.4, -1.6] }) },
  { id: 'egg', a: 1025, b: 1142, light: 'lab', at: [1.4, 1, -1.3], span: 8,
    cam: [C(1025, [1.8, 1.6, 3.4], [1.55, 1.2, -1.3]), C(1099, [1.8, 1.55, 2.6], [1.6, 1.25, -1.3]), C(1142, [1.8, 1.55, 2.9], [1.6, 1.3, -1.3], 40, { roll: -3 })], kicks: [[1100, 0.05]], dof: () => ({ c: 7, pt: [1.6, 1.3, -1.0] }) },
  { id: 'oven', a: 1143, b: 1369, light: 'day', at: [SX, 1, -1.8], span: 8,
    cam: [C(1143, [SX + 0.6, 1.4, 4.4], [SX + 0.1, 1.2, -1.8]), C(1240, [SX + 0.4, 1.0, 3.6], [SX + 0.1, 1.1, -1.8]), C(1300, [SX + 0.2, 0.9, 3.4], [SX + 0.05, 2.0, -1.8], 42), C(1369, [SX - 0.6, 1.1, 2.6], [SX - 0.9, 0.85, -1.4], 40)],
    kicks: [[1302, 0.04], [1320, 0.03]], dof: (f) => ({ c: 4, pt: f < 1300 ? [SX, 1.2, -1.5] : [SX - 1.2, 0.9, -1.1] }) },
  { id: 'kitchen', a: 1370, b: 1450, light: 'day', at: [KX, 1, -2], span: 8,
    cam: [C(1370, [KX + 0.35, 1.5, 3.8], [KX + 0.35, 1.1, -2.3]), C(1450, [KX + 0.35, 1.45, 3.2], [KX + 0.35, 1.1, -2.3])], dof: () => ({ c: 7, pt: [KX + 0.2, 1.2, -1.6] }) },
  { id: 'bonus', a: 1451, b: TOTAL - 1, light: 'golden', at: [OX, 1, -1.5], span: 8,
    cam: [C(1451, [OX + 0.2, 1.6, 3.4], [OX, 1.35, -1.6]), C(1519, [OX + 0.1, 1.55, 2.6], [OX - 0.3, 1.45, -1.4]), C(TOTAL, [OX - 0.25, 1.55, 1.1], [OX - 0.45, 1.5, -1.2], 38, { roll: 3 })],
    kicks: [[1521, 0.02]], dof: () => ({ c: 9, pt: [OX - 0.45, 1.55, -1.0] }) },
  { id: 'thumb', a: 9000, b: 9000, light: 'lab', at: [0, 1, -1], span: 8,
    cam: [C(9000, [0.25, 1.55, 1.9], [0.05, 1.4, -1.0], 38)], dof: () => ({ c: 10, pt: [0, 1.5, -0.9] }) },
];
export const shotAt = (f) => SHOTS.find((s) => f >= s.a && f <= s.b) || SHOTS[SHOTS.length - 2];

const ch = (id, who, f, pos, o = {}) => {
  const seed = who.seed || 1, I = idle(f, seed), bl = o.noBlink ? 0 : blinkAt(f, seed);
  const s = { who, expr: o.expr || 'neutral', mode: o.mode || 'stand', phase: o.phase || 0, blink: bl, armL: o.armL, armR: o.armR, propL: o.propL, propR: o.propR,
    tilt: q((o.tilt || 0) + I.tilt, 0.25), headTilt: q(o.headTilt || 0, 0.5), facing: o.facing || 0, look: o.look || 0, wave: o.wave, flipX: o.flipX };
  const key = JSON.stringify([s.expr, s.mode, q(s.phase, 0.05), s.blink, s.armL, s.armR, s.propL, s.propR, s.tilt, s.headTilt, s.facing, s.look, s.wave != null ? q(s.wave, 0.1) : null, s.flipX]);
  return { id, kind: 'char', pos: [pos[0] + (o.still ? 0 : I.dx), pos[1], pos[2]], h: o.h ?? 2.25, key, draw: (g) => drawChar(g, s), blobW: o.blobW };
};
const fx = (id, pos, h, key, draw, o = {}) => ({ id, kind: 'fx', pos, h, key, draw, yaw: o.yaw ?? 'full', soft: o.soft ?? true, res: o.res || [512, 512], unlit: o.unlit ?? true, order: o.order ?? 5 });
const burst = (id, f, at, pos, h = 0.6, col = '#fff3b0', n = 14) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'b' + q(t, 0.04), (g) => { g.save(); g.scale(g.canvas.width / 500, g.canvas.width / 500); fxBurst(new Pen(g), t, col); g.restore(); }); };
const puff = (id, f, at, pos, h = 0.5, n = 16) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'p' + q(t, 0.05), (g) => { g.save(); g.scale(g.canvas.width / 300, g.canvas.width / 300); fxPuff(new Pen(g), t); g.restore(); }); };
const mark = (id, txt, f, a, b, pos, h = 0.45, col = '#ffffff') => { if (f < a || f > b) return null; const s = back(win(f, a, a + 8)); return fx(id, pos, h * Math.max(0.05, s), 'm' + txt + q(s, 0.1), (g) => drawText(g, txt, { col, font: `bold ${Math.min(300, Math.round(1000 / Math.max(1, txt.length)))}px Georgia, serif` })); };
const waves = (id, f, pos, h, yaw = 'full') => fx(id, pos, h, 'w' + q((f / 30) % 1, 0.04), (g) => drawWaves(g, (f / 30) % 1), { yaw });

export const worldAt = (f) => ({ shot: shotAt(f).id, dish: f * 0.03, glow: 0.8 + 0.2 * Math.sin(f * 0.4), egg: shotAt(f).id === 'egg' && f < 1100, mwOn: shotAt(f).id === 'kitchen' });

export const actorsAt = (f) => {
  const S = shotAt(f), A = [], add = (x) => x && A.push(x), P = OUT.percy;
  switch (S.id) {
    case 'hook': {
      const goo = f >= 97;
      add(ch('pc', P, f, [0, 0, -1.0], { expr: goo ? 'shock' : 'pained', armR: ARM.show, propR: goo ? 'goo' : 'candy', armL: ARM.hip, tilt: goo ? -3 : 0, look: 0.6 }));
      add(waves('hw', f, [0.35, 1.4, -2.0], 1.1));
      if (goo) add(fx('drip', [0.36, 1.55 - 0.35 * (((f - 97) % 22) / 22), -0.95], 0.05, 'd', (g) => { g.fillStyle = '#6a3a20'; g.beginPath(); g.ellipse(256, 280, 140, 190, 0, 0, 7); g.fill(); }));
      add(burst('hb', f, 98, [0.4, 1.95, -0.9], 0.5));
      break;
    }
    case 'ext': {
      const t = win(f, 250, 300);
      add(ch('pc', P, f, [FX - 0.4, 0, -1.2], { expr: f > 260 ? 'grin' : 'smile', armR: f > 260 ? ARM.wave : ARM.hip, armL: ARM.hip, wave: 0.5 + 0.5 * Math.sin(f * 0.4) }));
      break;
    }
    case 'radar': {
      add(waves('rw', f, [FX + 6, 13.5, -5], 6));
      for (let i = 0; i < 3; i++) { const x = FX - 14 + ((f - 313) * 0.25 + i * 9) % 32; add(fx('pl' + i, [x, 18 + i * 2.5, -30], 2.2, 'plane', (g) => { const p = new Pen(g); g.save(); g.scale(g.canvas.width / 512, g.canvas.width / 512); p.poly([[60, 256], [400, 236], [460, 256], [400, 276]], '#7d848c', 10); p.poly([[220, 250], [300, 120], [330, 120], [300, 250]], '#6a7078', 10); p.poly([[220, 262], [300, 392], [330, 392], [300, 262]], '#6a7078', 10); p.poly([[70, 250], [110, 190], [130, 190], [120, 250]], '#6a7078', 8); g.restore(); }, { soft: true })); }
      break;
    }
    case 'school': {
      add(ch('pc', P, f, [-2.35, 0, -2.0], { expr: f > 420 ? 'smile_closed' : 'smile', armR: ARM.point, armL: ARM.hip, facing: -1 }));
      add(mark('ab', 'A+', f, 430, 478, [-1.8, 2.25, -1.9], 0.4, '#ffe066'));
      break;
    }
    case 'walk': {
      const t = win(f, 485, 540), x = lerp(-2.4, -0.2, ss(t)), z = lerp(0.2, -1.3, ss(t));
      add(ch('pc', P, f, [x, 0, z], { expr: 'smile', mode: t > 0 && t < 1 ? 'stroll' : 'stand', phase: (f * 0.05) % 1, armR: ARM.hang, armL: ARM.hang }));
      add(waves('ww', f, [0.3, 1.4, -1.8], 1.0));
      break;
    }
    case 'mag': add(waves('mw', f, [0.3, 1.38, -1.9], 1.2)); add(burst('mb', f, 556, [0.3, 1.55, -1.9], 0.5, '#ffd080')); break;
    case 'goo': {
      const pulled = f >= 632, shock = f >= 658;
      add(ch('pc', P, f, [0, 0, -1.2], { expr: shock ? 'shock' : 'neutral', armR: pulled ? ARM.show : ARM.pocket, propR: pulled ? 'goo' : undefined, armL: shock ? ARM.up : ARM.hang, tilt: shock ? -3 : 0, look: 0.5 }));
      add(waves('gw', f, [0.7, 1.35, -1.7], 0.9));
      add(mark('gx', '!', f, 658, 710, [0.4, 2.2, -1.1], 0.4, '#ffe066'));
      break;
    }
    case 'mad': {
      const stomp = f > 740 ? Math.abs(Math.sin(f * 0.35)) : 0;
      add(ch('cw', OUT.cowork, f, [-3.2, 0, -1.6], { expr: f > 740 ? 'pained' : 'stern', armR: ARM.show, propR: 'goo', armL: f > 740 ? ARM.up : ARM.hip, tilt: 4 * Math.sin(f * 0.35) * (f > 740 ? 1 : 0) }));
      add(puff('st1', f, 745, [-3.1, 0.15, -1.4], 0.6, 12)); add(puff('st2', f, 765, [-3.3, 0.15, -1.4], 0.6, 12));
      add(mark('grr', '#@!', f, 750, 807, [-2.8, 2.2, -1.5], 0.45, '#ff8060'));
      break;
    }
    case 'curious': {
      const idea = f >= 840;
      add(ch('pc', P, f, [0, 0, -1.2], { expr: idea ? 'grin' : 'neutral', armR: ARM.chin, armL: ARM.hip, look: idea ? 0 : 0.7, headTilt: idea ? -4 : 5 }));
      add(burst('id', f, 840, [0.25, 2.05, -1.1], 0.55));
      break;
    }
    case 'popcorn': {
      const pop = f >= 958;
      add(ch('pc', P, f, [-0.25, 0, -1.4], { expr: pop ? 'laugh' : 'grin', armR: ARM.reach, propR: pop ? undefined : 'popbag', armL: pop ? ARM.up : ARM.hip }));
      add(ch('cw', OUT.cowork, f, [1.25, 0, -0.9], { expr: pop ? 'shock' : 'neutral', armR: pop ? ARM.up : ARM.hang, armL: pop ? ARM.up : ARM.chin }));
      for (let k = 0; k < 4; k++) { const t = (f - 958 - k * 9) / 40; if (t >= 0 && t <= 1) A.push(fx('pop' + k, [0.2 + (k - 1.5) * 0.4, 1.4 + (k % 2) * 0.3, -1.6], 2.0, 'pp' + k + q(t, 0.025), (g) => drawPopcorn(g, t, k), { order: 6 })); }
      if (pop) A.push(fx('popf', [0.2, 0.1, -0.6], 1.4, 'pf', (g) => drawPopcorn(g, 0.9, 7), { yaw: 0, order: 4 }));
      add(waves('pw', f, [0.35, 1.38, -1.9], 1.0));
      break;
    }
    case 'egg': {
      const boom = f >= 1100;
      add(ch('pc', P, f, [0.6, 0, -1.6], { expr: boom ? 'shock' : 'grin', armR: boom ? ARM.up : ARM.point, armL: ARM.hip }));
      add(ch('cw', OUT.cowork, f, [2.15, 0, -1.1], { expr: boom ? 'dazed' : 'neutral', armR: ARM.hang, armL: ARM.chin, tilt: boom ? -5 : 8, facing: -1 }));
      const t = (f - 1100) / 20; if (t >= 0) A.push(fx('splat', [1.95, 1.55, -0.95], 0.9 * Math.min(1, 0.4 + t), 'sp' + q(Math.min(1, t), 0.05), (g) => drawEggSplat(g, Math.min(1, t)), { order: 6 }));
      add(burst('eb', f, 1100, [1.6, 1.1, -1.2], 0.8, '#ffffff'));
      break;
    }
    case 'oven': {
      add(ch('pc', P, f, [SX + 0.85, 0, -1.4], { expr: f > 1300 ? 'shock' : 'grin', armR: f > 1300 ? ARM.up : ARM.hip, armL: f < 1300 ? ARM.point : ARM.up, facing: -1 }));
      add(puff('crack', f, 1302, [SX, 0.15, -1.2], 1.6, 18));
      add(mark('six', '6 FT', f, 1245, 1298, [SX - 0.75, 2.2, -1.6], 0.4, '#ffe066'));
      break;
    }
    case 'kitchen': {
      const ding = f >= 1420;
      add(ch('kid', OUT.kid, f, [KX - 0.5, 0, -1.6], { expr: ding ? 'relief_open' : 'smile', armR: ding ? ARM.cheer : ARM.hang, armL: ding ? ARM.cheer : ARM.hang }));
      add(ch('par', OUT.parent, f, [KX + 1.2, 0, -1.7], { expr: 'smile_closed', armR: ding ? ARM.hold : ARM.hang, propR: ding ? 'mwbowl' : undefined, armL: ARM.hip, facing: -1 }));
      add(burst('ding', f, 1420, [KX + 0.4, 1.55, -2.4], 0.5));
      add(mark('dg', 'DING!', f, 1420, 1450, [KX + 0.4, 1.85, -2.3], 0.35, '#ffe066'));
      break;
    }
    case 'bonus': {
      const got = f >= 1500, sting = f >= 1520;
      add(ch('boss', OUT.boss, f, [OX + 0.7, 0, -2.4], { expr: 'grin', armR: got ? ARM.hip : ARM.reach, propR: got ? undefined : 'bill', armL: ARM.hip, facing: -1 }));
      add(ch('pc', P, f, [OX - 0.45, 0, -1.2], { expr: sting ? 'neutral' : got ? 'smile' : 'grin', armR: got ? ARM.show : ARM.reach, propR: got ? 'bill' : undefined, armL: ARM.hang, look: sting ? 0 : 0.6, noBlink: sting }));
      break;
    }
    case 'thumb': {
      add(ch('pc', P, 9000, [0, 0, -1.0], { expr: 'shock', armR: ARM.show, propR: 'goo', armL: ARM.up, tilt: -3, still: true, noBlink: true }));
      add(waves('tw', 9000, [0.35, 1.4, -2.0], 1.1));
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
