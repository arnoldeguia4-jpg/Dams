// "Why Is the Statue of Liberty Green?": shots, cameras, statue tint, actors, fx.
import { ss, easeOut, easeIn, back, spring, win, clamp, lerp, kick, idle, blinkAt, q } from './engine.js';
import { OUT, ARM, drawChar, drawText, Pen, fxBurst, fxPuff, crowd, drawWeather, drawLayers } from './cast.js';

export const TOTAL = 1694;
export const FLASHES = [[134, 142], [809, 817], [1545, 1551]];
export const STING = 1548;
const CX = 150;
const C = (f, pos, look, fov = 40, o = {}) => ({ f, pos, look, fov, ...o });

export const SHOTS = [
  { id: 'hook', a: 0, b: 138, light: 'day', at: [0, 12, 0], span: 30,
    cam: [C(0, [10, 14, 30], [0, 20, 0], 40), C(78, [6, 18, 24], [0, 22, 0], 40), C(138, [3, 22, 15], [0.5, 24, 0], 38, { roll: -3 })], kicks: [[82, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'gift', a: 139, b: 271, light: 'day', at: [0, 4, 10], span: 24,
    cam: [C(139, [1, 4.5, 31], [0, 11, 4], 46), C(205, [1, 4.6, 29.5], [0, 12, 4], 46), C(271, [3, 6, 30], [0, 16, 0], 46)], kicks: [[212, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'penny', a: 272, b: 344, light: 'golden', at: [0, 20, 0], span: 20,
    cam: [C(272, [7, 25, 16], [0, 23.5, 0], 38), C(344, [5, 25.5, 13], [0, 24, 0], 38)], dof: () => ({ c: 0 }) },
  { id: 'secret', a: 345, b: 591, light: 'night', at: [0, 12, 0], span: 30,
    cam: [C(345, [-12, 10, 30], [0, 16, 0], 44), C(591, [-6, 12, 24], [0, 18, 0], 44)], dof: () => ({ c: 0 }) },
  { id: 'lapse', a: 592, b: 764, light: 'day', at: [0, 12, 0], span: 30,
    cam: [C(592, [-14, 14, 22], [0, 18, 0], 42), C(680, [14, 15, 22], [0, 18, 0], 42, { path: [[0, 15, 26]] }), C(764, [6, 20, 13], [0, 22, 0], 40)], dof: () => ({ c: 0 }) },
  { id: 'panic', a: 765, b: 812, light: 'day', at: [0, 1, 16], span: 14,
    cam: [C(765, [0.6, 1.3, 22.5], [0.2, 7, 8], 50), C(812, [0.6, 1.2, 21.8], [0.2, 7.5, 8], 50)], kicks: [[768, 0.03]], dof: () => ({ c: 4, pt: [0, 1.6, 16.5] }) },
  { id: 'congress', a: 813, b: 997, light: 'lab', at: [CX, 1, -1.5], span: 10,
    cam: [C(813, [CX, 1.7, 5.6], [CX, 1.4, -1.6]), C(900, [CX + 0.3, 1.6, 4.2], [CX + 0.3, 1.3, -1.6]), C(997, [CX + 0.6, 1.5, 3.2], [CX + 0.6, 1.4, -1.3])], kicks: [[870, 0.03]], dof: () => ({ c: 4, pt: [CX, 1.4, -1.2] }) },
  { id: 'protest', a: 998, b: 1121, light: 'day', at: [0, 1, 16], span: 20,
    cam: [C(998, [0.5, 2.0, 24.8], [0.5, 3.6, 14]), C(1121, [0.5, 1.9, 24.0], [0.5, 4.0, 14])], kicks: [[1000, 0.02], [1062, 0.02]], dof: () => ({ c: 2, pt: [0.5, 1.6, 17.5] }) },
  { id: 'engineers', a: 1122, b: 1251, light: 'day', at: [0, 13, 2], span: 16,
    cam: [C(1122, [2.5, 13.3, 9.5], [0.5, 14.2, 2.5]), C(1251, [2.0, 13.4, 8.2], [0.6, 14.3, 2.6])], dof: () => ({ c: 6, pt: [1.2, 14.0, 4.0] }) },
  { id: 'armor', a: 1252, b: 1480, light: 'day', at: [0, 13, 2], span: 16,
    cam: [C(1252, [1.6, 14.5, 9.6], [0.4, 15.2, 2.4]), C(1480, [1.2, 14.6, 8.4], [0.4, 15.0, 2.4])], kicks: [[1324, 0.03]], dof: () => ({ c: 7, pt: [0.6, 15, 4.6] }) },
  { id: 'unused', a: 1481, b: 1547, light: 'golden', at: [4, 1, 15], span: 10,
    cam: [C(1481, [4.15, 1.5, 20.4], [4.15, 1.2, 15.3]), C(1547, [4.15, 1.45, 19.7], [4.15, 1.2, 15.3])], dof: () => ({ c: 5, pt: [4.1, 1.0, 15.6] }) },
  { id: 'thatswhy', a: 1548, b: TOTAL - 1, light: 'golden', at: [0, 12, 0], span: 30,
    cam: [C(1548, [8, 6, 34], [0, 14, 0], 42), C(1640, [4, 14, 22], [0, 20, 0], 42), C(TOTAL, [2.4, 20, 13], [0.6, 24, 0], 40, { roll: 3 })], dof: () => ({ c: 0 }) },
  { id: 'thumb', a: 9000, b: 9000, light: 'day', at: [0, 1, 16], span: 20,
    cam: [C(9000, [0.4, 1.3, 25.0], [0.3, 7.5, 10], 52)], dof: () => ({ c: 0 }) },
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
const Y = 0.5; // island ground

export const tintAt = (f) => {
  if (f < 80) return 1;                       // today: green
  if (f < 345) return 0;                      // 1886: copper
  if (f < 592) return 0.18 * win(f, 430, 591);
  if (f < 765) return 0.18 + 0.82 * ss(win(f, 600, 740));
  return 1;
};
export const worldAt = (f) => {
  const S = shotAt(f);
  return { shot: S.id, tint: S.id === 'thumb' ? 1 : tintAt(f), gift: S.id === 'gift' ? easeIn(win(f, 205, 222)) : S.id === 'hook' ? 1 : 1, giftVis: S.id === 'gift', buckets: ['unused', 'protest', 'thumb'].includes(S.id) };
};

export const actorsAt = (f) => {
  const S = shotAt(f), A = [], add = (x) => x && A.push(x);
  switch (S.id) {
    case 'hook': add(mark('q', '?', f, 20, 76, [3, 26, 2], 2.4, '#ffe066')); add(burst('rw', f, 80, [0, 24, 1.5], 6, '#ffffff', 16)); break;
    case 'gift': {
      const open = f >= 212;
      add(ch('fr', OUT.french, f, [-2.7, 2.7, 13.3], { expr: open ? 'grin' : 'smile', armR: open ? ARM.cheer : ARM.point, armL: ARM.hip, facing: 1 }));
      add(ch('us', OUT.yank, f, [2.7, 2.7, 13.2], { expr: open ? 'shock' : 'smile', armR: open ? ARM.up : ARM.hang, armL: open ? ARM.up : ARM.hip, facing: -1 }));
      add(puff('gp', f, 206, [0, 4, 8], 9, 20)); add(burst('gb', f, 216, [0, 18, 4], 10, '#fff3b0', 20));
      break;
    }
    case 'penny': for (const [k, at] of [[0, 280], [1, 300], [2, 322]]) add(burst('pg' + k, f, at, [-0.6 + k * 0.8, 21.5 + k * 1.2, 1.4], 1.2, '#fff8c8', 16)); break;
    case 'secret': A.push(fx('wx', [0, 16, 8], 30, 'wx' + q(f / 30, 0.05), (g) => drawWeather(g, f / 30), { order: 7 })); break;
    case 'lapse': add(mark('yr', f < 680 ? '1886' : f < 730 ? '1896' : '1906', f, 600, 764, [-5, 22, 6], 2.6, '#ffe066')); break;
    case 'panic': for (let i = 0; i < 4; i++) add(ch('pp' + i, crowd(i), f, [-1.6 + i * 1.05, Y, 16.4 + (i % 2) * 0.3], { expr: 'shock', armR: ARM.up, armL: i % 2 ? ARM.up : ARM.chin, look: -0.3 })); break;
    case 'congress': {
      const bang = f >= 868;
      add(ch('s1', OUT.sen1, f, [CX - 0.55, 0.11, -1.4], { expr: bang ? 'stern' : 'neutral', armR: bang ? ARM.lift : ARM.holdHi, propR: 'gavel', armL: ARM.hip }));
      add(ch('s2', OUT.sen2, f, [CX + 0.6, 0.11, -1.3], { expr: 'grin', armR: ARM.holdHi, propR: 'moneybag', armL: ARM.hang, facing: -1 }));
      add(puff('gv', f, 870, [CX - 0.2, 1.3, -1.0], 0.6, 10)); add(burst('mb', f, 905, [CX + 0.8, 1.9, -1.0], 0.5));
      break;
    }
    case 'protest': for (let i = 0; i < 6; i++) { const up = Math.sin(f * 0.45 + i * 1.7) > 0;
      add(ch('pr' + i, crowd(i + 2), f, [-2.4 + i * 1.0, Y, 17.4 + (i % 2) * 0.6], { expr: f > 1060 ? 'stern' : 'pained', armR: i % 2 ? ARM.sign : (up ? ARM.cheer : ARM.shake), propR: i % 2 ? 'protest' : undefined, armL: up ? ARM.shake : ARM.hip, tilt: 3 * Math.sin(f * 0.4 + i) })); }
      add(mark('sx', '!!', f, 1062, 1121, [0.6, 4.6, 17], 0.8, '#ff7060')); break;
    case 'engineers': {
      add(ch('e1', OUT.eng1, f, [0.9, 12.3, 4.3], { expr: f > 1195 ? 'shock' : 'neutral', armR: ARM.reach, propR: 'magnifier', armL: ARM.hip, blob: false }));
      add(ch('e2', OUT.eng2, f, [1.75, 12.3, 3.8], { expr: f > 1195 ? 'grin' : 'neutral', armR: ARM.chin, armL: ARM.hang, facing: -1 }));
      add(burst('eb', f, 1193, [1.3, 14.9, 4.1], 0.7));
      break;
    }
    case 'armor': {
      const t = back(win(f, 1300, 1314), 1.4); if (t > 0.02) A.push(fx('layers', [0.75, 15.15, 4.6], 1.15 * t, 'ly' + q(t, 0.05), (g) => drawLayers(g), { soft: true, order: 7 }));
      add(ch('e1', OUT.eng1, f, [1.6, 12.3, 4.3], { expr: 'grin', armR: ARM.point, armL: ARM.hip, facing: -1 }));
      add(burst('ar', f, 1322, [0.55, 15.9, 4.8], 1.2, '#bff5c8', 16));
      break;
    }
    case 'unused': {
      add(ch('pt', OUT.painter, f, [3.35, Y, 15.3], { expr: 'nervous', armR: ARM.hang, armL: ARM.hang, tilt: -4, headTilt: 6, facing: -1 }));
      add(puff('dr', f, 1500, [4.3, 0.9, 15.7], 0.5, 12));
      A.push(fx('web', [4.75, 0.62, 15.75], 0.28, 'web', (g) => { const s = g.canvas.width; g.strokeStyle = 'rgba(245,245,255,0.95)'; g.lineWidth = 6; for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(0, 0); g.lineTo(s * Math.cos(i * 0.31), s * Math.sin(i * 0.31)); g.stroke(); } for (let r = 1; r < 5; r++) { g.beginPath(); for (let i = 0; i < 6; i++) { const rr = r * s / 5; g.lineTo(rr * Math.cos(i * 0.31), rr * Math.sin(i * 0.31)); } g.stroke(); } }, { yaw: 0 }));
      break;
    }
    case 'thatswhy': add(burst('end', f, 1650, [0.3, 26.5, 1.5], 4, '#fff8c8', 20)); add(burst('end2', f, 1680, [-0.5, 18, 2.5], 3, '#bff5c8', 18)); break;
    case 'thumb': {
      add(ch('pr1', crowd(3), 9000, [-0.5, Y, 21.0], { expr: 'shock', armR: ARM.up, armL: ARM.up, still: true, noBlink: true }));
      add(ch('pr2', OUT.painter, 9000, [0.95, Y, 21.3], { expr: 'pained', armR: ARM.holdHi, propR: 'brush', armL: ARM.hang, propL: 'bucket', facing: -1, still: true, noBlink: true }));
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
