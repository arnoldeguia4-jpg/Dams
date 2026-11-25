// "Why Do We Say OK?": shots, cameras, actors, fx.
import { ss, easeOut, easeIn, back, spring, win, clamp, lerp, kick, idle, blinkAt, q } from './engine.js';
import { OUT, ARM, drawChar, drawText, Pen, fxBurst, fxPuff, crowd, drawBubble } from './cast.js';

export const TOTAL = 1583;
export const FLASHES = [[117, 124], [946, 953], [1421, 1428]];
export const STING = 1424;
const RX = -150, KX = 150;
const C = (f, pos, look, fov = 40, o = {}) => ({ f, pos, look, fov, ...o });

export const SHOTS = [
  { id: 'hook', a: 0, b: 67, light: 'day', at: [RX, 1, 0], span: 10,
    cam: [C(0, [RX + 0.2, 1.7, 4.6], [RX + 0.2, 1.7, 0]), C(67, [RX + 0.2, 1.75, 3.9], [RX + 0.2, 1.8, 0])], kicks: [[33, 0.03]], dof: () => ({ c: 4, pt: [RX, 1.6, 0.2] }) },
  { id: 'blame', a: 68, b: 120, light: 'lab', at: [0, 1, 0], span: 10,
    cam: [C(68, [-1.2, 1.6, 3.8], [-1.4, 1.4, 0.2]), C(120, [-1.3, 1.55, 3.2], [-1.4, 1.45, 0.2])], kicks: [[96, 0.03]], dof: () => ({ c: 5, pt: [-1.4, 1.4, 0.4] }) },
  { id: 'boston', a: 121, b: 243, light: 'lab', at: [0, 1, 0], span: 14,
    cam: [C(121, [0.6, 2.6, 9.5], [0.4, 2.0, -1]), C(243, [0.4, 2.2, 7.6], [0.2, 1.8, -1])], dof: () => ({ c: 0 }) },
  { id: 'abbr', a: 244, b: 334, light: 'lab', at: [-2, 1, -1], span: 10,
    cam: [C(244, [-1.6, 2.0, 5.6], [-2.0, 2.0, -2.5]), C(334, [-1.7, 2.0, 5.0], [-2.0, 2.0, -2.5])], dof: () => ({ c: 0 }) },
  { id: 'ns', a: 335, b: 456, light: 'lab', at: [-2, 1, -1], span: 10,
    cam: [C(335, [-2.2, 2.25, 4.6], [-2.2, 2.25, -3]), C(456, [-2.2, 2.25, 4.1], [-2.2, 2.3, -3])], kicks: [[386, 0.03], [440, 0.02]], dof: () => ({ c: 0 }) },
  { id: 'ow', a: 457, b: 575, light: 'lab', at: [-2, 1, -1], span: 10,
    cam: [C(457, [-1.0, 1.9, 4.8], [-2.0, 1.9, -2.5]), C(575, [-1.2, 1.9, 4.3], [-2.0, 1.95, -2.5])], kicks: [[499, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'press', a: 576, b: 771, light: 'lab', at: [4.5, 1, -1], span: 10,
    cam: [C(576, [3.6, 2.0, 5.6], [4.6, 1.8, -1.2]), C(690, [4.2, 1.95, 4.6], [4.6, 1.9, -0.6]), C(771, [4.5, 1.95, 3.6], [4.6, 1.9, -0.4])], kicks: [[672, 0.05], [692, 0.04]], dof: () => ({ c: 0 }) },
  { id: 'misspell', a: 772, b: 843, light: 'lab', at: [4.5, 1, -1], span: 10,
    cam: [C(772, [3.9, 1.85, 3.0], [4.4, 1.8, -0.4]), C(843, [3.9, 1.85, 2.6], [4.4, 1.8, -0.4])], dof: () => ({ c: 0 }) },
  { id: 'silly', a: 844, b: 949, light: 'lab', at: [-1, 1, 0], span: 10,
    cam: [C(844, [-2.4, 1.6, 5.6], [-2.4, 1.25, 0.3], 48), C(949, [-2.4, 1.55, 5.0], [-2.4, 1.2, 0.3], 48)], kicks: [[902, 0.02]], dof: () => ({ c: 4, pt: [-2.2, 1.2, 0.6] }) },
  { id: 'year', a: 950, b: 1075, light: 'day', at: [KX, 1, -1], span: 16,
    cam: [C(950, [KX + 0.5, 2.6, 11], [KX, 2.6, -2]), C(1075, [KX + 0.3, 2.4, 8.5], [KX, 2.5, -2])], kicks: [[1033, 0.02]], dof: () => ({ c: 0 }) },
  { id: 'nick', a: 1076, b: 1152, light: 'day', at: [KX, 1, -1], span: 14,
    cam: [C(1076, [KX, 3.5, 7.4], [KX, 3.7, -3.6]), C(1152, [KX, 3.6, 6.6], [KX, 3.9, -3.6])], kicks: [[1110, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'okbang', a: 1153, b: 1184, light: 'day', at: [KX, 1, 0], span: 14,
    cam: [C(1153, [KX, 2.2, 6.0], [KX, 2.6, -1]), C(1184, [KX, 2.2, 6.6], [KX, 2.6, -1])], kicks: [[1154, 0.06]], dof: () => ({ c: 0 }) },
  { id: 'rally', a: 1185, b: 1314, light: 'day', at: [KX, 1, 2], span: 16,
    cam: [C(1185, [KX - 3, 1.7, 8.5], [KX - 1, 1.8, 2]), C(1314, [KX + 3, 1.8, 8.0], [KX + 1, 1.9, 2], 40, { path: [[KX, 1.9, 8.8]] })], kicks: [[1253, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'lost', a: 1315, b: 1372, light: 'golden', at: [KX, 1, -2], span: 12,
    cam: [C(1315, [KX + 0.9, 2.2, 2.8], [KX + 0.8, 2.3, -2.2]), C(1372, [KX + 0.9, 2.2, 2.4], [KX + 0.8, 2.35, -2.2])], dof: () => ({ c: 0 }) },
  { id: 'won', a: 1373, b: 1423, light: 'golden', at: [KX, 1, 2], span: 16,
    cam: [C(1373, [KX, 1.6, 9.0], [KX, 2.6, 2]), C(1423, [KX, 1.7, 8.0], [KX, 2.9, 2])], kicks: [[1394, 0.04]], dof: () => ({ c: 0 }) },
  { id: 'thatswhy', a: 1424, b: TOTAL - 1, light: 'day', at: [RX, 1, 0], span: 10,
    cam: [C(1424, [RX + 0.4, 1.8, 5.4], [RX + 0.2, 1.8, 0]), C(1520, [RX + 0.3, 1.8, 4.2], [RX + 0.2, 1.85, 0]), C(TOTAL, [RX + 0.25, 1.85, 3.3], [RX + 0.2, 1.95, 0], 40, { roll: 3 })], kicks: [[1455, 0.04]], dof: () => ({ c: 4, pt: [RX, 1.7, 0.2] }) },
  { id: 'thumb', a: 9000, b: 9000, light: 'lab', at: [4.5, 1, -1], span: 10,
    cam: [C(9000, [4.05, 1.75, 3.6], [4.25, 1.75, -0.3], 50)], dof: () => ({ c: 0 }) },
];
export const shotAt = (f) => SHOTS.find((s) => f >= s.a && f <= s.b) || SHOTS[SHOTS.length - 2];

const ch = (id, who, f, pos, o = {}) => {
  const seed = who.seed || 1, I = idle(f, seed), bl = o.noBlink ? 0 : blinkAt(f, seed);
  const s = { who, expr: o.expr || 'neutral', mode: o.mode || 'stand', phase: o.phase || 0, blink: bl, armL: o.armL, armR: o.armR, propL: o.propL, propR: o.propR,
    tilt: q((o.tilt || 0) + I.tilt, 0.25), headTilt: q(o.headTilt || 0, 0.5), facing: o.facing || 0, look: o.look || 0, wave: o.wave, flipX: o.flipX };
  const key = JSON.stringify([s.expr, s.mode, q(s.phase, 0.05), s.blink, s.armL, s.armR, s.propL, s.propR, s.tilt, s.headTilt, s.facing, s.look, s.wave != null ? q(s.wave, 0.1) : null, s.flipX]);
  return { id, kind: 'char', pos: [pos[0] + (o.still ? 0 : I.dx), pos[1] + (o.dy || 0), pos[2]], h: o.h ?? 2.25, key, draw: (g) => drawChar(g, s), blobW: o.blobW };
};
const fx = (id, pos, h, key, draw, o = {}) => ({ id, kind: 'fx', pos, h, key, draw, yaw: o.yaw ?? 'full', soft: o.soft ?? true, res: o.res || [512, 512], unlit: o.unlit ?? true, order: o.order ?? 5 });
const burst = (id, f, at, pos, h = 0.6, col = '#fff3b0', n = 14) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'b' + q(t, 0.04), (g) => { g.save(); g.scale(g.canvas.width / 500, g.canvas.width / 500); fxBurst(new Pen(g), t, col); g.restore(); }); };
const puff = (id, f, at, pos, h = 0.5, n = 16) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'p' + q(t, 0.05), (g) => { g.save(); g.scale(g.canvas.width / 300, g.canvas.width / 300); fxPuff(new Pen(g), t); g.restore(); }); };
const mark = (id, txt, f, a, b, pos, h = 0.45, col = '#ffffff') => { if (f < a || f > b) return null; const s = back(win(f, a, a + 8)); return fx(id, pos, h * Math.max(0.05, s), 'm' + txt + q(s, 0.1), (g) => drawText(g, txt, { col, font: `bold ${Math.min(300, Math.round(720 / Math.max(1, txt.length)))}px Georgia, serif` })); };
const bubble = (id, txt, f, a, pos, h = 0.9) => { if (f < a) return null; const s = back(win(f, a, a + 8)); return fx(id, pos, h * Math.max(0.05, s), 'bb' + txt + q(s, 0.1), (g) => drawBubble(g, txt), { soft: false }); };
const hop = (f, i, amp = 0.18) => Math.max(0, Math.sin(f * 0.42 + i * 1.3)) * amp;

export const worldAt = (f) => {
  const S = shotAt(f);
  let rows = [];
  if (f >= 244) rows = [['ABBREVIATE!', '']];
  if (f >= 335) rows = [['ENOUGH SAID', f >= 384 ? 'N.S.' : '']];
  if (f >= 457) rows = [['ENOUGH SAID', 'N.S.'], ['ALL RIGHT', f >= 497 ? 'O.W.' : '']];
  return {
    rows, banner: f < 1076 ? 0 : f < 1108 ? 1 : 2,
    press: S.id === 'press' ? (f < 664 ? 0 : f < 672 ? easeIn(win(f, 664, 672)) : 1 - easeOut(win(f, 672, 690))) : 0,
    front: S.id === 'press' ? (f >= 690 ? back(win(f, 690, 700)) : 0) : ['misspell', 'thumb'].includes(S.id) ? 1 : 0,
    frontT: S.id === 'thumb' ? 0 : S.id === 'misspell' ? win(f, 776, 790) : 0,
  };
};

export const actorsAt = (f) => {
  const S = shotAt(f), A = [], add = (x) => x && A.push(x);
  switch (S.id) {
    case 'hook':
      add(ch('tx', OUT.texter, f, [RX, 0, 0.2], { expr: f > 30 ? 'shock' : 'neutral', armR: ARM.holdHi, propR: 'phone', armL: f > 30 ? ARM.shrug : ARM.hang, headTilt: f > 30 ? 6 : 0 }));
      add(bubble('b1', 'OK?', f, 30, [RX + 0.4, 2.8, 0.4], 0.85));
      break;
    case 'blame':
      add(ch('e1', OUT.ed1, f, [-1.4, 0, 0.4], { expr: f > 94 ? 'grin' : 'smile', armR: ARM.holdHi, propR: 'paper', armL: f > 94 ? ARM.up : ARM.hip, tilt: f > 94 ? 4 * Math.sin(f * 0.8) : 0 }));
      add(burst('jk', f, 95, [-0.7, 2.3, 0.6], 0.8)); add(mark('ha', 'HA!', f, 98, 120, [-2.1, 2.5, 0.7], 0.35, '#ffe066'));
      break;
    case 'boston': {
      add(mark('yr', '1839', f, 124, 240, [0.1, 3.0, 1.6], 0.8, '#ffe066'));
      const g = f > 203;
      add(ch('e1', OUT.ed1, f, [-0.95, 0, 1.4], { expr: g ? 'grin' : 'neutral', armR: ARM.holdHi, propR: 'paper', armL: ARM.hip, facing: 1 }));
      add(ch('e2', OUT.ed2, f, [1.0, 0, 1.5], { expr: g ? 'grin' : 'neutral', armR: g ? ARM.point : ARM.chin, armL: ARM.hang, facing: -1 }));
      break;
    }
    case 'abbr': add(ch('e2', OUT.ed2, f, [-1.05, 0, -1.9], { expr: f > 278 ? 'grin' : 'neutral', armR: f % 30 < 15 ? ARM.reach : ARM.point, propR: 'chalk', armL: ARM.hip, facing: -1 })); add(burst('ab', f, 300, [-2.2, 3.0, -2.9], 0.6)); break;
    case 'ns': add(burst('ns', f, 385, [-1.4, 2.6, -2.9], 0.8, '#ffe066')); add(mark('nf', '"NUFF SAID"', f, 405, 456, [-2.2, 0.95, -2.6], 1.4, '#ffffff')); break;
    case 'ow':
      add(ch('e1', OUT.ed1, f, [-1.3, 0, -0.5], { expr: f > 500 ? 'grin' : 'smile', armR: f > 500 ? ARM.up : ARM.hold, armL: ARM.hip, facing: -1, tilt: f > 500 ? 4 * Math.sin(f * 0.7) : 0 }));
      add(burst('ow', f, 498, [-1.4, 1.9, -2.9], 0.8, '#ffe066')); add(mark('ow2', '"OLL WRIGHT"', f, 540, 575, [-2.3, 0.95, -2.6], 1.1));
      break;
    case 'press':
      add(mark('dt', 'MARCH 23, 1839', f, 596, 660, [4.25, 3.0, 0.2], 1.2, '#ffe066'));
      add(ch('e2', OUT.ed2, f, [2.9, 0, -0.6], { expr: f > 692 ? 'grin' : 'neutral', armR: f > 692 ? ARM.cheer : ARM.reach, armL: ARM.hip, facing: 1 }));
      add(puff('st', f, 672, [4.6, 1.2, -1.0], 1.2, 14)); add(burst('ok', f, 692, [4.6, 2.2, -0.2], 1.6, '#ffe066', 16));
      break;
    case 'misspell': add(ch('e1', OUT.ed1, f, [3.4, 0, -0.1], { expr: 'grin', armR: ARM.point, armL: ARM.hip, facing: 1 })); add(burst('ms', f, 790, [4.6, 1.5, -0.2], 0.9, '#ff9a8a')); break;
    case 'silly': {
      const toss = f >= 888;
      add(ch('e1', OUT.ed1, f, [-1.6, 0, 0.6], { expr: toss ? 'smile' : 'grin', armR: toss ? (f < 900 ? ARM.lift : ARM.point) : ARM.holdHi, propR: toss ? undefined : 'paper', armL: ARM.hip, facing: -1, tilt: toss ? 0 : 4 * Math.sin(f * 0.8) }));
      add(ch('e2', OUT.ed2, f, [-2.6, 0, -0.1], { expr: 'grin', armR: ARM.hip, armL: ARM.chin, facing: 1 }));
      add(puff('t1', f, 900, [-3.3, 0.8, 0.7], 0.6)); add(puff('t2', f, 918, [-3.25, 0.9, 0.7], 0.5)); add(puff('t3', f, 932, [-3.35, 0.85, 0.7], 0.55));
      if (f >= 888 && f < 902) { const t = (f - 888) / 14; A.push(fx('ball', [lerp(-2.2, -3.3, t), 2.1 + Math.sin(t * Math.PI) * 0.6 - t * 1.2, 0.65], 0.25, 'ball', (g) => { const p = new Pen(g), w = g.canvas.width; p.ell(w / 2, w / 2, w * 0.38, w * 0.34, '#f4ecd2', w * 0.04); p.stroke([[w * 0.3, w * 0.4], [w * 0.6, w * 0.55]], w * 0.02); }, { soft: false })); }
      break;
    }
    case 'year': {
      add(mark('y40', '1840', f, 953, 1030, [KX, 5.4, -1.5], 1.0, '#ffe066'));
      add(ch('vb', OUT.vanburen, f, [KX, 1.0, -2.4], { expr: 'smile', armR: ARM.wave, wave: Math.sin(f * 0.3), armL: ARM.hip }));
      for (let i = 0; i < 6; i++) add(ch('c' + i, crowd(i), f, [KX - 3.4 + i * 1.35, 0, 1.6 + (i % 2) * 0.5], { expr: f > 1032 ? 'grin' : 'smile', armR: f > 1032 && i % 2 ? ARM.cheer : ARM.hang, armL: ARM.hang, dy: f > 1032 ? hop(f, i, 0.12) : 0 }));
      break;
    }
    case 'nick': add(ch('vb', OUT.vanburen, f, [KX + 1.1, 1.0, -2.4], { expr: f > 1110 ? 'grin' : 'smile', armR: f > 1110 ? ARM.point : ARM.hip, armL: ARM.hip, facing: -1 })); add(burst('nk', f, 1110, [KX - 0.9, 5.2, -3.5], 1.0, '#ffe066')); break;
    case 'okbang':
      add(mark('okb', 'O.K.!', f, 1152, 1184, [KX, 3.5, 0.5], 1.6, '#ffe066')); add(burst('okk', f, 1154, [KX, 3.5, 0.3], 3.0, '#fff3b0', 16));
      for (let i = 0; i < 5; i++) add(ch('c' + i, crowd(i), f, [KX - 2.6 + i * 1.3, 0, 1.4 + (i % 2) * 0.4], { expr: 'grin', armR: ARM.cheer, armL: ARM.up, dy: hop(f, i, 0.25) }));
      break;
    case 'rally':
      for (let i = 0; i < 9; i++) add(ch('c' + i, crowd(i + 1), f, [KX - 5 + i * 1.25, 0, 1.4 + (i % 3) * 0.6], { expr: f > 1250 ? 'grin' : 'smile', armR: i % 2 ? ARM.sign : ARM.cheer, propR: i % 2 ? 'okSign' : undefined, armL: i % 2 ? ARM.shake : ARM.up, dy: hop(f, i, 0.15), tilt: 3 * Math.sin(f * 0.4 + i) }));
      for (const [k, at] of [[0, 1252], [1, 1262], [2, 1276]]) add(mark('sh' + k, 'O.K.!', f, at, at + 26, [KX - 3 + k * 3, 3.0 + k * 0.2, 1.8], 0.5, '#ffe066'));
      break;
    case 'lost':
      add(ch('vb', OUT.vanburen, f, [KX + 0.95, 1.0, -2.0], { expr: 'pained', armR: ARM.holdHi, propR: 'hat', armL: ARM.hang, headTilt: -8, tilt: -3 }));
      add(mark('hw', 'HARRISON WINS', f, 1340, 1372, [KX + 0.8, 3.35, -1.6], 1.0, '#ffffff'));
      break;
    case 'won':
      for (let i = 0; i < 9; i++) add(ch('c' + i, crowd(i + 1), f, [KX - 5 + i * 1.25, 0, 1.4 + (i % 3) * 0.6], { expr: 'grin', armR: i % 2 ? ARM.sign : ARM.cheer, propR: i % 2 ? 'okSign' : undefined, armL: ARM.up, dy: hop(f, i, 0.2) }));
      add(mark('big', 'OK', f, 1392, 1423, [KX, 4.0, 2.0], 1.8, '#ffe066')); add(burst('bw', f, 1394, [KX, 4.0, 1.8], 3.4, '#fff3b0', 18));
      break;
    case 'thatswhy':
      add(ch('tx', OUT.texter, f, [RX, 0, 0.2], { expr: f > 1540 ? 'grin' : 'smile', armR: ARM.holdHi, propR: 'phone', armL: f > 1540 ? ARM.point : ARM.hang }));
      add(bubble('b2', 'OK', f, 1452, [RX + 0.4, 2.8, 0.4], 0.85)); add(burst('b2b', f, 1454, [RX + 0.4, 2.85, 0.35], 1.2, '#ffe066'));
      add(mark('oll', '"OLL KORRECT"', f, 1506, TOTAL, [RX + 0.05, 2.6, 0.7], 0.8, '#ffe066'));
      break;
    case 'thumb':
      add(ch('e1', OUT.ed1, 9000, [3.55, 0, 0.5], { expr: 'shock', armR: ARM.point, armL: ARM.up, facing: 1, still: true, noBlink: true }));
      break;
  }
  return A;
};

export const lookAt = (f) => {
  let flash = 0;
  for (const [a, b] of FLASHES) if (f >= a && f <= b) { const m = (a + b) / 2; flash = Math.max(flash, 1 - Math.abs(f - m) / ((b - a) / 2 + 0.5)); }
  return { flash: clamp(flash) * 0.95 };
};
