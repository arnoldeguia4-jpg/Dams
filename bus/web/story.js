// "Why Are School Buses Yellow?": shots, cameras, actors, fx.
import { ss, easeOut, easeIn, back, spring, win, clamp, lerp, kick, idle, blinkAt, q } from './engine.js';
import { OUT, ARM, drawChar, drawText, Pen, fxBurst, fxPuff, crowd } from './cast.js';

export const TOTAL = 1638;
export const FLASHES = [[144, 151], [1048, 1055], [1444, 1451]];
export const STING = 1448;
const RX = -150, KX = 150;
const C = (f, pos, look, fov = 40, o = {}) => ({ f, pos, look, fov, ...o });

export const SHOTS = [
  { id: 'hook', a: 0, b: 71, light: 'day', at: [RX, 1, 0], span: 16,
    cam: [C(0, [RX + 7, 1.6, 7.5], [RX - 1, 2.0, 0.5]), C(71, [RX + 6, 1.7, 6.6], [RX + 1, 2.2, 0.5])], dof: () => ({ c: 0 }) },
  { id: 'blame', a: 72, b: 143, light: 'lab', at: [KX, 1, 0], span: 10,
    cam: [C(72, [KX + 0.3, 1.75, 4.2], [KX + 0.2, 1.65, 1.2]), C(143, [KX + 0.3, 1.75, 3.6], [KX + 0.2, 1.7, 1.2])], kicks: [[100, 0.03]], dof: () => ({ c: 4, pt: [KX, 1.6, 1.4] }) },
  { id: 'yard', a: 144, b: 276, light: 'day', at: [0, 1, 0], span: 24,
    cam: [C(144, [2, 4.5, 26], [0, 3.0, -2], 44), C(276, [1, 3.6, 22], [0, 2.6, -2], 44)], kicks: [[252, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'red', a: 277, b: 308, light: 'day', at: [-8, 1, 0], span: 14,
    cam: [C(277, [-4.2, 1.9, 9.5], [-8, 1.6, 0.5]), C(308, [-4.0, 1.9, 9.0], [-7.6, 1.6, 0.5])], kicks: [[289, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'blue', a: 309, b: 345, light: 'day', at: [0, 1, 0], span: 14,
    cam: [C(309, [3.6, 1.9, 9.5], [0, 1.6, 0.5]), C(345, [3.8, 1.9, 9.0], [0.4, 1.6, 0.5])], kicks: [[320, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'farm', a: 346, b: 441, light: 'day', at: [8.5, 1, 0], span: 14,
    cam: [C(346, [10.2, 2.5, 6.2], [7.8, 2.0, 0.5]), C(441, [9.8, 2.45, 5.6], [7.8, 2.1, 0.5])], dof: () => ({ c: 0 }) },
  { id: 'cyr', a: 442, b: 552, light: 'lab', at: [KX, 1, 0], span: 10,
    cam: [C(442, [KX - 0.4, 2.0, 5.2], [KX - 0.4, 2.3, -2]), C(552, [KX - 0.4, 2.0, 4.6], [KX - 0.4, 2.35, -2])], kicks: [[462, 0.02]], dof: () => ({ c: 0 }) },
  { id: 'meeting', a: 553, b: 685, light: 'lab', at: [KX, 1, 0], span: 12,
    cam: [C(553, [KX + 1.0, 2.6, 8.8], [KX, 1.6, 0]), C(685, [KX + 0.4, 2.4, 7.6], [KX, 1.6, 0])], dof: () => ({ c: 0 }) },
  { id: 'paint', a: 686, b: 849, light: 'lab', at: [KX, 1, -1], span: 12,
    cam: [C(686, [KX - 3.4, 2.6, 2.6], [KX - 3.4, 2.6, -3]), C(849, [KX + 3.4, 2.6, 2.6], [KX + 3.4, 2.6, -3])], dof: () => ({ c: 0 }) },
  { id: 'argue', a: 850, b: 901, light: 'lab', at: [KX, 1, 0], span: 10,
    cam: [C(850, [KX, 1.9, 5.4], [KX, 1.5, 0.6]), C(901, [KX, 1.9, 5.0], [KX, 1.5, 0.6])], kicks: [[852, 0.03], [870, 0.03], [886, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'picked', a: 902, b: 1047, light: 'lab', at: [KX, 1, -1], span: 10,
    cam: [C(902, [KX - 0.8, 2.3, 4.8], [KX - 1.3, 2.3, -2.8]), C(1047, [KX - 1.1, 2.4, 2.4], [KX - 1.3, 2.5, -2.8])], kicks: [[970, 0.04]], dof: () => ({ c: 0 }) },
  { id: 'why', a: 1048, b: 1149, light: 'day', at: [RX, 1, 0], span: 16,
    cam: [C(1048, [RX - 2.6, 2.3, 11.5], [RX - 2.6, 2.1, 0.5]), C(1149, [RX - 0.6, 2.3, 10.8], [RX - 0.6, 2.1, 0.5])], dof: () => ({ c: 0 }) },
  { id: 'dawn', a: 1150, b: 1180, light: 'golden', at: [RX, 1, 0], span: 16,
    cam: [C(1150, [RX + 9, 1.3, 6], [RX + 1, 1.9, 0.5]), C(1180, [RX + 8.5, 1.3, 5.6], [RX + 1, 1.9, 0.5])], dof: () => ({ c: 0 }) },
  { id: 'fog', a: 1181, b: 1217, light: 'fog', at: [RX, 1, 0], span: 16,
    cam: [C(1181, [RX + 14, 1.6, 3.0], [RX + 2, 1.8, 0.5]), C(1217, [RX + 13, 1.6, 2.9], [RX + 2, 1.8, 0.5])], dof: () => ({ c: 0 }) },
  { id: 'corner', a: 1218, b: 1281, light: 'day', at: [RX, 1, 2], span: 14,
    cam: [C(1218, [RX + 2.2, 1.5, 7.6], [RX + 2.0, 1.4, 3.4]), C(1281, [RX + 2.2, 1.5, 7.2], [RX + 2.0, 1.45, 3.4])], dof: () => ({ c: 0 }) },
  { id: 'letters', a: 1282, b: 1362, light: 'day', at: [RX, 1, 0], span: 14,
    cam: [C(1282, [RX - 0.6, 2.6, 11.5], [RX - 0.6, 2.5, 1.2]), C(1362, [RX - 0.6, 2.65, 10.2], [RX - 0.6, 2.6, 1.2])], kicks: [[1310, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'states', a: 1363, b: 1443, light: 'day', at: [0, 1, 0], span: 24,
    cam: [C(1363, [-6, 2.6, 12], [-8, 1.8, 0.5]), C(1386, [-6, 2.6, 12], [-8, 1.8, 0.5]), C(1402, [2, 2.6, 12], [0, 1.8, 0.5]), C(1420, [10.5, 2.6, 12], [8.5, 1.8, 0.5]), C(1443, [10.5, 2.6, 11.2], [8.5, 1.8, 0.5])], kicks: [[1376, 0.03], [1396, 0.03], [1413, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'thatswhy', a: 1444, b: TOTAL - 1, light: 'golden', at: [0, 1, 2], span: 18,
    cam: [C(1444, [2.6, 1.5, 11], [0.4, 2.0, 1.5]), C(1560, [1.6, 1.6, 8.6], [0.3, 2.1, 1.5]), C(TOTAL, [1.2, 1.7, 7.0], [0.2, 2.2, 1.5], 40, { roll: 3 })], dof: () => ({ c: 0 }) },
  { id: 'thumb', a: 9000, b: 9000, light: 'day', at: [RX, 1, 2], span: 14,
    cam: [C(9000, [RX + 3.4, 1.4, 8.4], [RX + 1.2, 1.9, 1.5], 46)], dof: () => ({ c: 0 }) },
];
export const shotAt = (f) => SHOTS.find((s) => f >= s.a && f <= s.b) || SHOTS[SHOTS.length - 2];

const ch = (id, who, f, pos, o = {}) => {
  const seed = who.seed || 1, I = idle(f, seed), bl = o.noBlink ? 0 : blinkAt(f, seed);
  const s = { who, expr: o.expr || 'neutral', mode: o.mode || 'stand', phase: o.phase || 0, blink: bl, armL: o.armL, armR: o.armR, propL: o.propL, propR: o.propR,
    tilt: q((o.tilt || 0) + I.tilt, 0.25), headTilt: q(o.headTilt || 0, 0.5), facing: o.facing || 0, look: o.look || 0, wave: o.wave, flipX: o.flipX };
  const key = JSON.stringify([s.expr, s.mode, q(s.phase, 0.05), s.blink, s.armL, s.armR, s.propL, s.propR, s.tilt, s.headTilt, s.facing, s.look, s.wave != null ? q(s.wave, 0.1) : null, s.flipX]);
  return { id, kind: 'char', pos: [pos[0] + (o.still ? 0 : I.dx), pos[1] + (o.dy || 0), pos[2]], h: o.h ?? 2.25, key, draw: (g) => drawChar(g, s), blobW: o.blobW };
};
const kid = (id, who, f, pos, o = {}) => ch(id, who, f, pos, { h: 1.55, ...o });
const fx = (id, pos, h, key, draw, o = {}) => ({ id, kind: 'fx', pos, h, key, draw, yaw: o.yaw ?? 'full', soft: o.soft ?? true, res: o.res || [512, 512], unlit: o.unlit ?? true, order: o.order ?? 5 });
const burst = (id, f, at, pos, h = 0.6, col = '#fff3b0', n = 14) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'b' + q(t, 0.04), (g) => { g.save(); g.scale(g.canvas.width / 500, g.canvas.width / 500); fxBurst(new Pen(g), t, col); g.restore(); }); };
const puff = (id, f, at, pos, h = 0.5, n = 16) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'p' + q(t, 0.05), (g) => { g.save(); g.scale(g.canvas.width / 300, g.canvas.width / 300); fxPuff(new Pen(g), t); g.restore(); }); };
const mark = (id, txt, f, a, b, pos, h = 0.45, col = '#ffffff') => { if (f < a || f > b) return null; const s = back(win(f, a, a + 8)); return fx(id, pos, h * Math.max(0.05, s), 'm' + txt + q(s, 0.1), (g) => drawText(g, txt, { col, font: `bold ${Math.min(300, Math.round(720 / Math.max(1, txt.length)))}px Georgia, serif` })); };
const hop = (f, i, amp = 0.18) => Math.max(0, Math.sin(f * 0.42 + i * 1.3)) * amp;
const KIDS = ['kid1', 'kid2', 'kid3', 'kid4'];

export const worldAt = (f) => {
  const S = shotAt(f);
  const y = (at) => f >= at || S.id === 'thatswhy';
  let roadX = RX;
  if (S.id === 'hook') roadX = RX - 9 + 9 * easeOut(win(f, 0, 60));
  if (S.id === 'why') roadX = RX - 2 + 2 * win(f, 1048, 1149);
  if (S.id === 'dawn' || S.id === 'fog') roadX = RX - 3 + 4 * win(f, 1150, 1217);
  if (S.id === 'corner') roadX = RX - 7 + 4.5 * easeOut(win(f, 1225, 1262));
  if (S.id === 'thumb') roadX = RX - 2.2;
  return { roadX, redY: y(1376) && f >= 1363, blueY: y(1396) && f >= 1363, truckY: y(1413) && f >= 1363, pick: f >= 925 && f < 1048 ? 1 : 0 };
};

export const actorsAt = (f) => {
  const S = shotAt(f), A = [], add = (x) => x && A.push(x);
  switch (S.id) {
    case 'hook': add(mark('q', '?', f, 36, 71, [RX + 1.5, 4.2, 1.0], 1.4, '#ffe066')); break;
    case 'blame': add(ch('cy', OUT.cyr, f, [KX + 0.2, 0.11, 1.3], { expr: f > 98 ? 'stern' : 'neutral', armR: ARM.hip, armL: ARM.hip })); add(burst('st', f, 99, [KX + 0.8, 2.3, 1.4], 0.6, '#ff9a8a')); break;
    case 'yard': {
      add(mark('yr', '1939', f, 152, 245, [0, 6.5, 2], 2.6, '#ffe066'));
      const mess = f > 250;
      KIDS.forEach((k, i) => add(kid('k' + i, OUT[k], f, [-4 + i * 2.6, 0, 3.6], { expr: mess ? 'shock' : 'smile', armR: mess ? ARM.shrug : ARM.hang, armL: mess ? ARM.shrug : ARM.hang, facing: i % 2 ? -1 : 1 })));
      add(puff('m1', f, 252, [-8, 2.5, 2], 2.5)); add(puff('m2', f, 258, [0, 2.5, 2], 2.5)); add(puff('m3', f, 264, [8.5, 2.2, 2], 2.5));
      break;
    }
    case 'red': add(kid('k1', OUT.kid1, f, [-5.6, 0, 3.2], { expr: 'pained', armR: ARM.point, armL: ARM.hip, facing: -1 })); add(mark('rd', 'RED', f, 280, 308, [-8, 3.6, 1.8], 1.0, '#ff7060')); break;
    case 'blue': add(kid('k2', OUT.kid2, f, [2.4, 0, 3.2], { expr: 'pained', armR: ARM.point, armL: ARM.hip, facing: -1 })); add(mark('bl', 'BLUE', f, 312, 345, [0, 3.6, 1.8], 1.0, '#8fb8ff')); break;
    case 'farm':
      for (let i = 0; i < 4; i++) add(kid('fk' + i, OUT[KIDS[i]], f, [8.5 - 2.2 + i * 1.1, 1.45, 0.5 + (i % 2 ? 0.55 : -0.55)], { expr: i % 2 ? 'nervous' : 'pained', armR: ARM.up, armL: ARM.hang, dy: hop(f, i, 0.12), h: 1.4 }));
      add(mark('bn', 'BENCHES?!', f, 400, 441, [8.0, 3.7, 1.5], 1.4, '#ffe066'));
      break;
    case 'cyr': add(ch('cy', OUT.cyr, f, [KX - 0.4, 0.11, -1.6], { expr: f > 470 ? 'smile' : 'neutral', armR: f > 470 ? ARM.point : ARM.hip, armL: ARM.hip, facing: 1 })); break;
    case 'meeting': {
      add(mark('ny', 'NEW YORK', f, 556, 640, [KX, 3.6, -1], 1.4, '#ffe066'));
      const who = [OUT.sen1, OUT.eng1, OUT.sen2, OUT.eng2, OUT.yank];
      who.forEach((w, i) => { const t = easeOut(win(f, 600 + i * 10, 630 + i * 10)); add(ch('ex' + i, { ...w, head: w === OUT.yank ? undefined : w.head }, f, [KX - 2.6 + i * 1.3, 0.11, -0.5 + (1 - t) * 3.5 * (i % 2 ? 1 : -1) * 0], { expr: 'smile', armR: ARM.hang, armL: ARM.hang, dy: 0 })); });
      add(ch('cy', OUT.cyr, f, [KX - 3.6, 0.11, 1.6], { expr: 'smile', armR: ARM.wave, wave: Math.sin(f * 0.3), armL: ARM.hip, facing: 1 }));
      break;
    }
    case 'paint':
      add(mark('50', '50 SHADES', f, 700, 760, [KX - 2.4, 3.95, -2.6], 1.2, '#ffe066'));
      add(mark('lm', 'LEMON', f, 768, 808, [KX - 1.4, 1.3, -2.6], 0.9, '#fff04a'));
      add(mark('or', 'ORANGE-RED', f, 808, 849, [KX + 3.4, 1.3, -2.6], 1.0, '#ff7a50'));
      break;
    case 'argue': {
      const who = [OUT.sen1, OUT.eng1, OUT.sen2, OUT.eng2];
      who.forEach((w, i) => add(ch('ar' + i, w, f, [KX - 1.8 + i * 1.2, 0.11, -0.6], { expr: i % 2 ? 'stern' : 'pained', armR: (f + i * 7) % 20 < 10 ? ARM.point : ARM.shake, armL: ARM.shake, facing: i < 2 ? 1 : -1, tilt: 4 * Math.sin(f * 0.6 + i) })));
      add(mark('a1', '!!', f, 852, 901, [KX - 1.2, 2.8, -0.2], 0.6, '#ff7060')); add(mark('a2', '?!', f, 868, 901, [KX + 1.2, 2.9, -0.2], 0.6, '#ffe066'));
      break;
    }
    case 'picked':
      add(ch('cy', OUT.cyr, f, [KX - 0.4, 0.11, -1.6], { expr: f > 968 ? 'grin' : 'smile', armR: ARM.point, armL: ARM.hip, facing: -1 }));
      add(burst('pk', f, 925, [KX - 1.3, 2.6, -2.6], 1.0, '#fff3b0')); add(burst('pk2', f, 970, [KX - 1.3, 2.6, -2.6], 1.6, '#ffe066', 18));
      add(mark('th', 'THIS ONE!', f, 972, 1047, [KX - 1.3, 3.85, -2.6], 1.0, '#ffffff'));
      break;
    case 'why': add(mark('w', '?', f, 1060, 1149, [RX - 1.6 + win(f, 1048, 1149) * 2, 4.4, 1.6], 1.4, '#ffe066')); break;
    case 'dawn': add(burst('dn', f, 1152, [RX + 4.8, 1.2, 0.3], 1.4, '#fff3b0')); break;
    case 'corner': {
      const turned = f > 1250;
      add(kid('ck', OUT.kid3, f, [RX + 2.0, 0, 3.4], { expr: turned ? 'shock' : 'neutral', armR: turned ? ARM.point : ARM.hang, armL: ARM.hang, facing: turned ? -1 : 0, look: turned ? -0.5 : 0 }));
      add(mark('ey', '!', f, 1252, 1281, [RX + 2.3, 2.1, 3.4], 0.5, '#ffe066'));
      break;
    }
    case 'letters': add(burst('lt', f, 1310, [RX - 0.6, 2.75, 1.5], 1.2, '#ffffff')); break;
    case 'states':
      add(puff('s1', f, 1373, [-8, 1.8, 2], 4)); add(puff('s2', f, 1393, [0, 1.8, 2], 4)); add(puff('s3', f, 1410, [8.5, 1.8, 2], 4));
      add(burst('sb1', f, 1377, [-8, 3.4, 2], 2.2, '#ffe066')); add(burst('sb2', f, 1397, [0, 3.4, 2], 2.2, '#ffe066')); add(burst('sb3', f, 1414, [8.5, 3.4, 2], 2.2, '#ffe066'));
      break;
    case 'thatswhy':
      KIDS.forEach((k, i) => add(kid('k' + i, OUT[k], f, [-1.4 + i * 1.0, 0, 3.3 + (i % 2) * 0.4], { expr: 'grin', armR: f > 1560 ? ARM.cheer : ARM.hang, armL: f > 1560 ? ARM.up : ARM.hang, dy: f > 1560 ? hop(f, i, 0.15) : 0 })));
      add(ch('cy', OUT.cyr, f, [2.6, 0, 3.0], { expr: 'smile', armR: f > 1516 ? ARM.point : ARM.hip, armL: ARM.hip, facing: -1 }));
      add(burst('end', f, 1562, [0.3, 3.6, 2.0], 2.6, '#ffe066', 18));
      break;
    case 'thumb':
      add(ch('cy', OUT.cyr, 9000, [RX + 2.6, 0, 3.6], { expr: 'shock', armR: ARM.lift, propR: 'swatch', armL: ARM.up, facing: -1, still: true, noBlink: true }));
      break;
  }
  return A;
};

export const lookAt = (f) => {
  let flash = 0;
  for (const [a, b] of FLASHES) if (f >= a && f <= b) { const m = (a + b) / 2; flash = Math.max(flash, 1 - Math.abs(f - m) / ((b - a) / 2 + 0.5)); }
  return { flash: clamp(flash) * 0.95 };
};
