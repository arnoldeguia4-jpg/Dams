// "Why Is It Called a Popsicle?": shots, cameras, actors, fx, transitions.
import { ss, easeOut, easeIn, back, spring, win, clamp, lerp, kick, idle, blinkAt, q } from './engine.js';
import { OUT, ARM, drawChar, drawText, Pen, fxBurst, fxPuff, crowd, drawBubble, drawFrost } from './cast.js';

export const TOTAL = 1422;
export const FLASHES = [];
export const STING = 1313;
export const TRANSITIONS = [[165, 'zoom'], [254, 'whip'], [412, 'whip'], [467, 'iris'], [582, 'zoom'], [612, 'punch'], [759, 'whip'], [826, 'punch'], [871, 'whip'],
  [989, 'zoom'], [1055, 'whip'], [1100, 'punch'], [1142, 'whip'], [1316, 'iris']];
const KX = 150, OX = -150, PY = 0.5;
const C = (f, pos, look, fov = 40, o = {}) => ({ f, pos, look, fov, ...o });

export const SHOTS = [
  { id: 'hook', a: 0, b: 164, light: 'day', at: [0, 1, 0], span: 12,
    cam: [C(0, [0.9, 1.4, 2.6], [0.9, 1.3, -0.6]), C(164, [0.9, 1.4, 2.1], [0.9, 1.35, -0.6])], kicks: [[68, 0.03]], dof: () => ({ c: 4, pt: [0.9, 1.3, -0.4] }) },
  { id: 'oak', a: 165, b: 253, light: 'day', at: [0, 1, -1], span: 16,
    cam: [C(165, [0.2, 2.4, 9.5], [0.2, 2.0, -2]), C(253, [0.2, 2.2, 8.0], [0.2, 1.9, -2])], dof: () => ({ c: 0 }) },
  { id: 'mix', a: 254, b: 411, light: 'day', at: [1, 1, -1], span: 10,
    cam: [C(254, [1.2, 1.4, 2.2], [1.25, 1.25, -1]), C(411, [1.2, 1.4, 1.6], [1.3, 1.25, -1])], dof: () => ({ c: 4, pt: [1.3, 1.3, -0.9] }) },
  { id: 'porch', a: 412, b: 466, light: 'golden', at: [1, 1, -1], span: 12,
    cam: [C(412, [0.6, 1.6, 4.4], [0.9, 1.3, -1]), C(466, [0.6, 1.6, 4.0], [0.9, 1.3, -1])], dof: () => ({ c: 0 }) },
  { id: 'night', a: 467, b: 581, light: 'night', at: [1, 1, -1], span: 14,
    cam: [C(467, [-0.5, 2.2, 7.5], [0.6, 1.8, -1.5]), C(581, [0, 2.0, 5.5], [0.9, 1.5, -1.2])], kicks: [[532, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'morning', a: 582, b: 758, light: 'day', at: [1.6, 1, -1], span: 10,
    cam: [C(582, [1.6, 1.55, 0.6], [1.6, 1.42, -1.0]), C(758, [1.6, 1.55, 0.2], [1.6, 1.45, -1.0])], dof: () => ({ c: 0 }) },
  { id: 'lick', a: 759, b: 870, light: 'day', at: [1, 1, -1], span: 10,
    cam: [C(759, [1.0, 1.4, 2.8], [1.0, 1.3, -0.8]), C(870, [1.0, 1.4, 2.2], [1.0, 1.35, -0.8])], dof: () => ({ c: 0 }) },
  { id: 'friends', a: 871, b: 988, light: 'day', at: [0, 1, 1], span: 14,
    cam: [C(871, [0.3, 1.4, 5.8], [0.3, 1.3, 1.2]), C(988, [0.3, 1.4, 4.8], [0.3, 1.3, 1.2])], dof: () => ({ c: 0 }) },
  { id: 'dad', a: 989, b: 1054, light: 'lab', at: [KX, 1, -1], span: 12,
    cam: [C(989, [KX - 0.2, 1.8, 4.6], [KX - 0.2, 1.7, -1]), C(1054, [KX - 0.2, 1.8, 4.0], [KX - 0.2, 1.75, -1])], dof: () => ({ c: 0 }) },
  { id: 'kids', a: 1055, b: 1141, light: 'lab', at: [KX, 1, -1], span: 12,
    cam: [C(1055, [KX - 0.2, 1.5, 4.6], [KX - 0.2, 1.4, -0.6]), C(1141, [KX - 0.2, 1.5, 4.0], [KX - 0.2, 1.45, -0.6])], kicks: [[1101, 0.04]], dof: () => ({ c: 0 }) },
  { id: 'patent', a: 1142, b: 1315, light: 'lab', at: [OX, 1, -1], span: 12,
    cam: [C(1142, [OX, 2.2, 5.0], [OX, 2.0, -2.5]), C(1315, [OX, 2.3, 3.0], [OX, 2.3, -2.8])], kicks: [[1186, 0.04]], dof: () => ({ c: 0 }) },
  { id: 'thatswhy', a: 1316, b: TOTAL - 1, light: 'golden', at: [KX, 1, -1], span: 12,
    cam: [C(1316, [KX - 0.2, 1.5, 4.6], [KX - 0.2, 1.4, -0.6]), C(TOTAL, [KX - 0.2, 1.5, 3.2], [KX - 0.2, 1.5, -0.6], 40, { roll: 3 })], dof: () => ({ c: 0 }) },
  { id: 'thumb', a: 9000, b: 9000, light: 'day', at: [1, 1, -1], span: 10,
    cam: [C(9000, [1.0, 1.35, 2.0], [1.0, 1.3, -0.8], 46)], dof: () => ({ c: 0 }) },
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
const mark = (id, txt, f, a, b, pos, h = 0.45, col = '#ffffff') => { if (f < a || f > b) return null; const s = back(win(f, a, a + 8)); return fx(id, pos, h * Math.max(0.05, s), 'm' + txt + q(s, 0.1), (g) => drawText(g, txt, { col, font: `bold ${Math.min(300, Math.round(720 / Math.max(1, txt.length)))}px Georgia, serif` })); };
const bubble = (id, txt, f, a, b, pos, h = 0.9) => { if (f < a || f > b) return null; const s = back(win(f, a, a + 8)); return fx(id, pos, h * Math.max(0.05, s), 'bb' + txt + q(s, 0.1), (g) => drawBubble(g, txt), { soft: false }); };
const hop = (f, i, amp = 0.15) => Math.max(0, Math.sin(f * 0.42 + i * 1.3)) * amp;

export const worldAt = (f) => {
  const S = shotAt(f);
  const frozen = f >= 582 || S.id === 'thumb' ? 1 : S.id === 'night' ? win(f, 520, 581) : 0;
  return { frozen, frost: S.id === 'night' ? ss(win(f, 500, 560)) : (S.id === 'morning' ? 1 - win(f, 650, 758) : 0), cupVis: f < 759 && S.id !== 'thumb' };
};

export const actorsAt = (f) => {
  const S = shotAt(f), A = [], add = (x) => x && A.push(x);
  switch (S.id) {
    case 'hook':
      add(kid('fk', OUT.frankKid, f, [0.6, PY, -0.6], { expr: f > 68 ? 'grin' : 'smile', armR: ARM.holdHi, propR: 'pop', armL: ARM.hip }));
      add(mark('q', '?', f, 20, 66, [0.95, 1.95, -0.4], 0.35, '#ffe066'));
      add(mark('age', 'AGE 11', f, 72, 164, [0.95, 2.0, -0.4], 0.4, '#ffe066'));
      break;
    case 'oak':
      add(mark('yr', '1905', f, 170, 253, [0.4, 4.3, -2.5], 1.3, '#ffe066'));
      add(kid('fk', OUT.frankKid, f, [0.4, PY, -1.0], { expr: 'smile', armR: ARM.wave, wave: Math.sin(f * 0.3), armL: ARM.hip }));
      break;
    case 'mix':
      add(kid('fk', OUT.frankKid, f, [0.85, PY, -1.3], { expr: 'smile', armR: (f % 20) < 10 ? ARM.reach : ARM.scrub, armL: ARM.hip, facing: 1 }));
      add(mark('sd', 'SODA POWDER', f, 260, 354, [1.3, 1.95, -0.9], 0.55, '#ffffff')); add(mark('st', 'STICK', f, 356, 411, [1.3, 1.95, -0.9], 0.4, '#ffe066'));
      break;
    case 'porch':
      add(kid('fk', OUT.frankKid, f, [0.15, PY, -1.6], { expr: 'smile', armR: ARM.wave, wave: Math.sin(f * 0.3), armL: ARM.hang, facing: -1 }));
      add(mark('fg', 'FORGOT IT!', f, 430, 466, [0.9, 2.2, -0.9], 0.75, '#ffe066'));
      break;
    case 'night': {
      const fr = ss(win(f, 500, 560));
      if (fr > 0.02) A.push(fx('fr', [0.8, 1.7, -0.5], 2.6, 'fr' + q(f / 30, 0.1), (g) => drawFrost(g, f / 40), { order: 7 }));
      add(mark('cd', 'COLD', f, 490, 530, [0.7, 2.5, -1], 0.7, '#9fd4ff')); add(mark('rc', 'REALLY COLD!', f, 532, 581, [0.7, 2.5, -1], 1.0, '#cfe9ff'));
      break;
    }
    case 'morning':
      add(burst('fz', f, 612, [1.6, 1.4, -0.95], 0.4, '#e6f6ff')); add(mark('fs', 'FROZEN!', f, 614, 670, [1.6, 1.78, -0.95], 0.32, '#9fd4ff'));
      add(mark('hd', 'A HANDLE!', f, 672, 758, [1.6, 1.78, -0.95], 0.34, '#ffe066'));
      break;
    case 'lick':
      add(kid('fk', OUT.frankKid, f, [1.0, PY, -0.8], { expr: f > 824 ? 'grin' : 'shock', armR: ARM.holdHi, propR: 'pop', armL: f > 824 ? ARM.cheer : ARM.hip }));
      add(burst('dl', f, 826, [1.35, 1.75, -0.6], 0.6, '#ffe066')); add(mark('dlc', 'DELICIOUS!', f, 828, 870, [1.0, 2.05, -0.6], 0.6, '#ff9a8a'));
      break;
    case 'friends':
      add(kid('fk', OUT.frankKid, f, [0.3, 0, 1.4], { expr: 'grin', armR: ARM.holdHi, propR: 'pop', armL: ARM.hip }));
      for (let i = 0; i < 3; i++) add(kid('fr' + i, OUT[['kid2', 'kid3', 'kid4'][i]], f, [-0.8 + i * 1.1 + (i > 0 ? 0.4 : 0), 0, 1.9 + (i % 2) * 0.2], { expr: 'shock', armR: ARM.up, armL: ARM.hang, dy: hop(f, i, 0.08), facing: i ? -1 : 1 }));
      add(mark('ep', 'THE EPSICLE', f, 878, 988, [0.3, 2.05, 1.6], 0.9, '#ffe066'));
      break;
    case 'dad':
      add(ch('fd', OUT.frankDad, f, [KX - 0.2, 0.11, -0.6], { expr: 'smile', armR: ARM.hip, armL: ARM.hip }));
      add(mark('yl', 'YEARS LATER', f, 992, 1054, [KX - 0.2, 2.6, -0.4], 0.9, '#ffffff'));
      break;
    case 'kids':
      add(ch('fd', OUT.frankDad, f, [KX + 0.6, 0.11, -0.9], { expr: f > 1100 ? 'grin' : 'smile', armR: ARM.holdHi, propR: 'pop', armL: ARM.hip, facing: -1 }));
      for (let i = 0; i < 2; i++) add(kid('kd' + i, OUT[['kid1', 'kid4'][i]], f, [KX - 1.0 + i * 0.75, 0.11, -0.3], { expr: 'grin', armR: ARM.up, armL: ARM.cheer, dy: hop(f, i, 0.12), facing: 1 }));
      add(bubble('ps', "POP'S 'SICLE!", f, 1098, 1141, [KX - 0.35, 2.2, -0.1], 0.85));
      break;
    case 'patent':
      add(mark('yr', '1924', f, 1146, 1230, [OX, 3.55, -2.6], 0.9, '#ffe066'));
      add(burst('pb', f, 1186, [OX + 0.5, 1.6, -2.6], 0.7, '#ffe066'));
      break;
    case 'thatswhy':
      add(ch('fd', OUT.frankDad, f, [KX + 0.6, 0.11, -0.9], { expr: 'grin', armR: ARM.holdHi, propR: 'pop', armL: f > 1370 ? ARM.point : ARM.hip, facing: -1 }));
      for (let i = 0; i < 2; i++) add(kid('kd' + i, OUT[['kid1', 'kid4'][i]], f, [KX - 1.0 + i * 0.75, 0.11, -0.3], { expr: 'grin', armR: ARM.holdHi, propR: 'pop', armL: ARM.cheer, facing: 1 }));
      add(mark('eq', "POP + 'SICLE", f, 1372, TOTAL, [KX - 0.2, 2.6, -0.3], 0.95, '#ffe066')); add(burst('eb', f, 1372, [KX - 0.2, 2.6, -0.4], 1.2, '#ffe066', 18));
      break;
    case 'thumb':
      add(kid('fk', OUT.frankKid, 9000, [1.0, PY, -0.8], { expr: 'shock', armR: ARM.holdHi, propR: 'pop', armL: ARM.up, still: true, noBlink: true }));
      break;
  }
  return A;
};

export const lookAt = (f) => {
  let flash = 0;
  for (const [a, b] of FLASHES) if (f >= a && f <= b) { const m = (a + b) / 2; flash = Math.max(flash, 1 - Math.abs(f - m) / ((b - a) / 2 + 0.5)); }
  return { flash: clamp(flash) * 0.95 };
};
