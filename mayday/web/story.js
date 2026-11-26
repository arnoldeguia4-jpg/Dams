// "Why Do Pilots Yell Mayday?": shots, cameras, actors, fx.
import { ss, easeOut, easeIn, back, spring, win, clamp, lerp, kick, idle, blinkAt, q } from './engine.js';
import { OUT, ARM, drawChar, drawText, Pen, fxBurst, fxPuff, drawBubble, drawStatic } from './cast.js';

export const TOTAL = 1534;
export const FLASHES = [[143, 150], [575, 581], [874, 880], [1131, 1138], [1377, 1384]];
export const STING = 1381;
const RX = 150, SX = -150, SY = 40, PX = 300, GX = 450;
const C = (f, pos, look, fov = 40, o = {}) => ({ f, pos, look, fov, ...o });

export const SHOTS = [
  { id: 'hook', a: 0, b: 103, light: 'day', at: [SX, SY, 0], span: 16,
    cam: [C(0, [SX - 4.4, SY + 1.5, 2.6], [SX + 0.4, SY + 0.9, 0]), C(103, [SX - 3.8, SY + 1.5, 2.2], [SX + 0.4, SY + 1.0, 0])], kicks: [[44, 0.04], [60, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'french', a: 104, b: 142, light: 'day', at: [PX, 1, 0], span: 14,
    cam: [C(104, [PX + 0.4, 1.3, 4.6], [PX + 1.2, 4.6, -12]), C(142, [PX + 0.4, 1.3, 4.0], [PX + 1.2, 4.6, -12])], kicks: [[118, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'croydon', a: 143, b: 279, light: 'day', at: [0, 1, 0], span: 24,
    cam: [C(143, [2, 3.2, 18], [-2, 3.4, -4], 44), C(279, [1, 2.8, 14], [-2.5, 3.4, -4], 44)], kicks: [[249, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'sos', a: 280, b: 355, light: 'lab', at: [RX, 1, -1], span: 10,
    cam: [C(280, [RX - 0.2, 1.8, 4.6], [RX - 0.2, 1.6, -2]), C(355, [RX - 0.2, 1.8, 4.0], [RX - 0.2, 1.6, -2])], kicks: [[323, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'static', a: 356, b: 574, light: 'lab', at: [RX, 1, -1], span: 10,
    cam: [C(356, [RX + 0.1, 1.7, 2.6], [RX, 1.6, -2.4]), C(574, [RX + 0.1, 1.65, 1.6], [RX, 1.55, -2.4])], kicks: [[458, 0.04], [546, 0.05]], dof: () => ({ c: 0 }) },
  { id: 'story', a: 575, b: 707, light: 'lab', at: [RX, 1, -1], span: 10,
    cam: [C(575, [RX - 0.6, 1.75, 4.0], [RX - 0.6, 1.75, -1]), C(707, [RX - 0.6, 1.8, 3.4], [RX - 0.6, 1.85, -1])], kicks: [[690, 0.02]], dof: () => ({ c: 4, pt: [RX - 0.6, 1.7, -0.6] }) },
  { id: 'word', a: 708, b: 873, light: 'lab', at: [RX, 1, -1], span: 10,
    cam: [C(708, [RX - 0.2, 1.85, 4.6], [RX - 0.4, 1.9, -1]), C(873, [RX - 0.2, 1.85, 4.0], [RX - 0.4, 1.95, -1])], kicks: [[776, 0.02], [823, 0.02]], dof: () => ({ c: 0 }) },
  { id: 'map', a: 874, b: 937, light: 'lab', at: [RX + 2.6, 1, -1], span: 10,
    cam: [C(874, [RX + 2.6, 2.6, 2.4], [RX + 2.6, 2.6, -3]), C(937, [RX + 2.6, 2.6, 1.9], [RX + 2.6, 2.6, -3])], dof: () => ({ c: 0 }) },
  { id: 'paris', a: 938, b: 1040, light: 'golden', at: [PX, 1, 0], span: 14,
    cam: [C(938, [PX + 0.5, 1.4, 6.2], [PX + 1.0, 4.6, -12]), C(1040, [PX + 0.4, 1.4, 5.0], [PX + 0.9, 4.2, -12])], kicks: [[1011, 0.04]], dof: () => ({ c: 0 }) },
  { id: 'fast', a: 1041, b: 1130, light: 'lab', at: [RX, 1, -1], span: 10,
    cam: [C(1041, [RX - 0.6, 1.8, 4.4], [RX - 0.4, 2.0, -1]), C(1130, [RX - 0.6, 1.85, 3.8], [RX - 0.4, 2.1, -1])], kicks: [[1107, 0.05]], dof: () => ({ c: 0 }) },
  { id: 'world', a: 1131, b: 1275, light: 'day', at: [GX, 1, 0], span: 16,
    cam: [C(1131, [GX, 4.5, 14], [GX, 4.2, -2]), C(1275, [GX, 4.4, 11.5], [GX, 4.3, -2])], kicks: [[1241, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'three', a: 1276, b: 1376, light: 'day', at: [SX, SY, 0], span: 16,
    cam: [C(1276, [SX - 4.6, SY + 1.6, -2.4], [SX + 0.2, SY + 1.2, 0]), C(1376, [SX - 4.0, SY + 1.6, -2.1], [SX + 0.2, SY + 1.3, 0])], kicks: [[1290, 0.03], [1309, 0.03], [1328, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'thatswhy', a: 1377, b: TOTAL - 1, light: 'golden', at: [0, 1, 2], span: 20,
    cam: [C(1377, [1.2, 1.6, 9.5], [0, 2.0, 1.5]), C(1470, [0.8, 1.7, 7.4], [0, 2.1, 1.5]), C(TOTAL, [0.5, 1.75, 5.8], [0, 2.2, 1.5], 40, { roll: 3 })], kicks: [[1384, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'thumb', a: 9000, b: 9000, light: 'lab', at: [RX, 1, -1], span: 10,
    cam: [C(9000, [RX - 0.3, 1.8, 3.6], [RX - 0.3, 1.9, -1], 46)], dof: () => ({ c: 0 }) },
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
const bubble = (id, txt, f, a, b, pos, h = 0.9) => { if (f < a || f > b) return null; const s = back(win(f, a, a + 8)); return fx(id, pos, h * Math.max(0.05, s), 'bb' + txt + q(s, 0.1), (g) => drawBubble(g, txt), { soft: false }); };
const pilotIn = (f, o = {}) => ch('pl', OUT.pilot, f, [SX - 0.2, SY - 1.6 + 1.05, 0.05], { h: 1.6, ...o });

export const worldAt = (f) => {
  const S = shotAt(f);
  const bob = S.id === 'hook' ? 0.25 * Math.sin(f * 0.35) : 0.08 * Math.sin(f * 0.15);
  return { bob, roll: S.id === 'hook' ? 0.12 * Math.sin(f * 0.27) : 0.03 * Math.sin(f * 0.1), globe: f * 0.01 };
};

export const actorsAt = (f) => {
  const S = shotAt(f), A = [], add = (x) => x && A.push(x);
  const W = worldAt(f);
  switch (S.id) {
    case 'hook':
      add(ch('pl', OUT.pilot, f, [SX - 0.2, SY - 0.2 + W.bob, 0.05], { h: 1.6, expr: f > 40 ? 'shock' : 'nervous', armR: f > 40 ? ARM.up : ARM.hang, armL: ARM.up }));
      add(bubble('md', 'MAYDAY!', f, 40, 103, [SX - 0.3, SY + 1.85 + W.bob, 0.15], 0.75));
      for (const [k, at] of [[0, 10], [1, 30], [2, 50], [3, 70], [4, 90]]) add(puff('sm' + k, f, at, [SX + 2.6, SY + 0.2 + W.bob + (f - at) * 0.02, 0.6], 1.0, 22));
      break;
    case 'french': add(ch('fr', OUT.french, f, [PX + 0.4, 0.11, -0.4], { expr: f > 116 ? 'grin' : 'smile', armR: ARM.shrug, armL: ARM.shrug, headTilt: 6 })); add(burst('fb', f, 116, [PX + 1.1, 2.5, -0.3], 0.7)); break;
    case 'croydon':
      add(mark('yr', '1923', f, 150, 245, [-3, 7.2, -2], 2.2, '#ffe066'));
      add(ch('mk', OUT.mock, f, [-1.6, 0, 1.8], { expr: f > 248 ? 'stern' : 'neutral', armR: f > 248 ? ARM.chin : ARM.hang, armL: ARM.hip, facing: -1 }));
      add(puff('pr', f, 250, [-1.0, 2.9, 2.0], 0.8));
      break;
    case 'sos':
      add(ch('mk', OUT.mock, f, [RX - 0.7, 0.11, -1.2], { expr: 'neutral', armR: ARM.holdHi, propR: 'mic', armL: ARM.hip, facing: 1 }));
      add(bubble('sos', 'S.O.S.', f, 320, 355, [RX + 0.4, 2.65, -1.8], 1.1));
      break;
    case 'static': {
      A.push(fx('st', [RX, 1.75, -2.0], 1.3, 'st' + Math.floor(f / 3), (g) => drawStatic(g, f / 30), { order: 7 }));
      const broken = f >= 457 ? (f % 8 < 4 ? '?.O.?' : 'S.?.S') : 'S.O.S.';
      add(bubble('br', broken, f, 380, 574, [RX + 0.4, 2.55, -1.8], 0.9));
      if (f >= 545) add(mark('dd', '!!', f, 545, 574, [RX - 0.6, 2.5, -1.6], 0.5, '#ff7060'));
      break;
    }
    case 'story':
      add(ch('mk', OUT.mock, f, [RX - 0.6, 0.11, -0.6], { expr: f > 690 ? 'smile' : 'neutral', armR: ARM.chin, armL: ARM.hip }));
      add(mark('nm', 'FREDERICK MOCKFORD', f, 660, 707, [RX - 0.6, 2.75, -0.4], 1.4, '#ffe066'));
      add(mark('qq', '?', f, 590, 650, [RX + 0.1, 2.6, -0.5], 0.5, '#ffe066'));
      break;
    case 'word':
      add(ch('mk', OUT.mock, f, [RX - 0.4, 0.11, -0.8], { expr: 'smile', armR: f > 776 ? ARM.point : ARM.chin, armL: ARM.hip }));
      add(mark('hr', 'EASY TO HEAR', f, 776, 873, [RX - 0.4, 3.0, -0.6], 1.3, '#ffe066'));
      add(mark('sy', 'EASY TO SAY', f, 823, 873, [RX - 0.4, 2.6, -0.6], 1.2, '#ffffff'));
      break;
    case 'map': add(burst('pa', f, 906, [RX + 3.3, 1.95, -2.8], 0.6, '#ffe066')); break;
    case 'paris':
      add(ch('fr', OUT.french, f, [PX + 0.2, 0.11, 0.2], { expr: f > 1008 ? 'shock' : 'smile', armR: f > 1008 ? ARM.up : ARM.wave, wave: Math.sin(f * 0.3), armL: ARM.hip }));
      add(bubble('ma', "M'AIDEZ!", f, 1008, 1040, [PX + 0.55, 2.85, 0.5], 1.0));
      add(mark('hm', '"HELP ME"', f, 970, 1007, [PX + 0.4, 2.8, 0.5], 1.1, '#ffe066'));
      break;
    case 'fast': {
      const may = f >= 1105;
      add(ch('mk', OUT.mock, f, [RX - 0.8, 0.11, -0.8], { expr: may ? 'grin' : 'smile', armR: may ? ARM.cheer : ARM.holdHi, propR: may ? undefined : 'mic', armL: ARM.hip, facing: 1 }));
      add(bubble('fa', may ? 'MAYDAY!' : "M'AIDEZ", f, 1041, 1130, [RX - 0.25, 2.95, -0.5], 0.95));
      add(burst('mb', f, 1106, [RX - 0.25, 2.95, -0.45], 1.4, '#ffe066', 16));
      break;
    }
    case 'world':
      add(mark('27', '1927', f, 1140, 1230, [GX, 8.2, -1], 2.0, '#ffe066'));
      for (let k = 0; k < 4; k++) { const t = ((f - 1140 - k * 18) % 72) / 72; if (f > 1140 + k * 18) A.push(fx('rw' + k, [GX, 4, 1.2], 2 + t * 7, 'rw' + q(t, 0.04), (g) => { const w = g.canvas.width; g.strokeStyle = `rgba(255,224,102,${1 - t})`; g.lineWidth = 14; g.beginPath(); g.arc(w / 2, w / 2, w * 0.42, 0, 7); g.stroke(); }, { soft: false })); }
      add(mark('wd', 'WORLDWIDE', f, 1240, 1275, [GX, 0.9, 1.5], 1.4, '#ffffff'));
      break;
    case 'three':
      add(ch('pl', OUT.pilot, f, [SX - 0.2, SY - 0.2 + W.bob, 0.05], { h: 1.6, expr: 'shock', armR: ARM.up, armL: ARM.hang }));
      add(bubble('m1', 'MAYDAY!', f, 1288, 1376, [SX - 0.1, SY + 1.75 + W.bob, -0.3], 0.5));
      add(bubble('m2', 'MAYDAY!', f, 1307, 1376, [SX - 0.5, SY + 2.2 + W.bob, -0.2], 0.5));
      add(bubble('m3', 'MAYDAY!', f, 1326, 1376, [SX - 0.1, SY + 2.65 + W.bob, -0.3], 0.5));
      add(mark('x3', 'x3', f, 1340, 1376, [SX - 0.7, SY + 2.85 + W.bob, -0.1], 0.35, '#ffe066'));
      break;
    case 'thatswhy':
      add(ch('mk', OUT.mock, f, [-0.7, 0, 2.4], { expr: 'grin', armR: f > 1447 ? ARM.point : ARM.hip, armL: ARM.hip, facing: 1 }));
      add(ch('fr', OUT.french, f, [0.8, 0, 2.2], { expr: 'grin', armR: f > 1469 ? ARM.cheer : ARM.wave, wave: Math.sin(f * 0.3), armL: ARM.hip, facing: -1 }));
      add(mark('eq', "M'AIDEZ = MAYDAY", f, 1450, TOTAL, [0, 3.4, 2.4], 1.5, '#ffe066'));
      add(burst('eb', f, 1495, [0, 3.4, 2.2], 2.4, '#fff3b0', 18));
      break;
    case 'thumb':
      add(ch('mk', OUT.mock, 9000, [RX - 0.6, 0.11, -0.6], { expr: 'shock', armR: ARM.holdHi, propR: 'mic', armL: ARM.up, still: true, noBlink: true }));
      break;
  }
  return A;
};

export const lookAt = (f) => {
  let flash = 0;
  for (const [a, b] of FLASHES) if (f >= a && f <= b) { const m = (a + b) / 2; flash = Math.max(flash, 1 - Math.abs(f - m) / ((b - a) / 2 + 0.5)); }
  return { flash: clamp(flash) * 0.95 };
};
