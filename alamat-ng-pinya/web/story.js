// Story timeline for "Alamat ng Pinya": Pinang who never looks, Aling Rosa's wish, and the fruit full of eyes (TOTAL 2522, user's voiceover).
import { ss, easeOut, back, win, clamp, lerp, idle, blinkAt, q } from './engine.js';
import { OUT, VIL, ARM, drawChar, drawLying, drawText, drawTag, drawPina, drawSprout, drawPot, drawRice, drawLadle, drawTorch, glow, Pen, fxBurst, fxPuff } from './cast.js';
import { YX, PATCH } from './world.js';

export const TOTAL = 2522;
export const MUSIC_STOP = 2240;
const WIPES = [240], IRIS_OUT = [2488, 2518];
const ROSA_BED = [-2.6, 0.62, -2.6], PIN_K = [1.85, 0, -2.7], POT = [2.6, 1.05, -3.75], RICE = [3.15, 0.4, -3.1];
const FRUIT = [PATCH[0], 1.25, PATCH[2] + 0.1];

// ---------------- shots ----------------
const k = (f, pos, look, fov = 42, o = {}) => ({ f, pos, look, fov, ...o });
const D = (pt, c = 4) => () => ({ c, pt });
const N0 = () => ({ c: 0 });
export const SHOTS = [
  { id: 'hook', a: 0, b: 247, light: 'golden', at: PATCH, span: 10, cam: [k(0, [PATCH[0] + 0.8, 2.2, PATCH[2] + 6.5], [PATCH[0], 1.3, PATCH[2]], 44), k(247, [PATCH[0] + 0.3, 1.6, PATCH[2] + 3.2], [PATCH[0], 1.3, PATCH[2]], 40)], dof: D(FRUIT, 3) },
  { id: 'kuboOut', a: 248, b: 357, light: 'day', at: [YX - 4, 1, -7], span: 18, cam: [k(248, [YX + 3, 3.5, 6], [YX - 4.5, 2.6, -7], 48), k(357, [YX + 1.5, 3.0, 3.5], [YX - 4.5, 2.6, -7], 46)], dof: N0 },
  { id: 'inside', a: 358, b: 487, light: 'day', at: [0, 1, -2], span: 10, cam: [k(358, [0.2, 1.9, 4.2], [0, 1.2, -2.5], 46), k(487, [0.1, 1.8, 3.2], [0, 1.2, -2.5], 44)], dof: D([0, 1.2, -2.4], 2) },
  { id: 'love', a: 488, b: 688, light: 'day', at: [0, 1, -2], span: 10, cam: [k(488, [0.1, 1.8, 3.8], [0.0, 1.0, -2.4], 46), k(688, [0.1, 1.7, 3.1], [0.05, 1.0, -2.4], 46)], dof: D([0.3, 1.0, -2.4], 2) },
  { id: 'sick', a: 689, b: 897, light: 'day', at: [-2, 1, -2.6], span: 10, cam: [k(689, [-1.9, 2.3, 2.8], [-2.1, 0.6, -2.5], 46), k(897, [-1.9, 2.2, 2.2], [-2.0, 0.6, -2.5], 46)], dof: D([-2.4, 0.7, -2.6], 3) },
  { id: 'ask', a: 898, b: 1164, light: 'day', at: [2.4, 1, -3], span: 10, cam: [k(898, [2.45, 1.8, 2.6], [2.45, 1.0, -3.0], 46), k(1164, [2.45, 1.75, 1.9], [2.45, 1.0, -3.0], 46)], kicks: [[929, 0.02], [1016, 0.02], [1097, 0.02]], dof: D([2.2, 1.0, -2.9], 3) },
  { id: 'ladle', a: 1165, b: 1277, light: 'day', at: [2, 1, -2.7], span: 8, cam: [k(1165, [2.2, 1.0, -0.5], [2.15, 0.9, -2.7], 40), k(1277, [2.2, 0.98, -0.9], [2.15, 0.9, -2.7], 38)], kicks: [[1213, 0.03]], dof: D([2.1, 0.95, -2.7], 5) },
  { id: 'curse', a: 1278, b: 1600, light: 'golden', at: [0, 1, -2.6], span: 10, cam: [k(1278, [-1.9, 1.7, 1.0], [-2.3, 0.75, -2.5], 44), k(1347, [-1.9, 1.65, 0.6], [-2.3, 0.8, -2.5], 44), k(1348, [-1.2, 1.2, -0.4], [-2.2, 0.95, -2.6], 40), k(1396, [-1.25, 1.2, -0.7], [-2.2, 0.95, -2.6], 40), k(1397, [1.0, 1.4, 0.2], [1.6, 0.9, -2.7], 42), k(1600, [1.2, 1.3, -0.6], [1.7, 0.9, -2.7], 40)], kicks: [[1349, 0.04]], dof: D([0, 0.9, -2.6], 2) },
  { id: 'vanish', a: 1601, b: 1668, light: 'golden', at: [0, 1, -2.6], span: 10, cam: [k(1601, [1.6, 1.6, 1.2], [1.7, 0.8, -2.7], 46), k(1668, [1.6, 1.55, 0.8], [1.7, 0.75, -2.7], 46)], dof: D([0.4, 0.8, -2.6], 2) },
  { id: 'search', a: 1669, b: 1789, light: 'night', at: [YX, 1, -4], span: 16, cam: [k(1669, [YX - 1, 2.2, 5], [YX - 1, 1.2, -4], 48), k(1789, [YX - 0.5, 2.0, 3.8], [YX - 1, 1.2, -4], 46)], dof: N0 },
  { id: 'grow', a: 1790, b: 1951, light: 'day', at: PATCH, span: 10, cam: [k(1790, [PATCH[0] - 0.5, 2.0, PATCH[2] + 4.8], [PATCH[0] - 0.5, 0.9, PATCH[2]], 44), k(1951, [PATCH[0] - 0.5, 1.8, PATCH[2] + 4.0], [PATCH[0] - 0.5, 0.9, PATCH[2]], 44)], dof: D([PATCH[0], 0.8, PATCH[2]], 2) },
  { id: 'fruit', a: 1952, b: 2076, light: 'day', at: PATCH, span: 10, cam: [k(1952, [PATCH[0] + 0.2, 1.5, PATCH[2] + 3.0], [PATCH[0], 1.15, PATCH[2]], 40), k(2076, [PATCH[0] + 0.2, 1.4, PATCH[2] + 2.4], [PATCH[0], 1.15, PATCH[2]], 40)], kicks: [[2011, 0.04]], dof: D(FRUIT, 3) },
  { id: 'name', a: 2077, b: 2239, light: 'golden', at: PATCH, span: 10, cam: [k(2077, [PATCH[0] - 0.45, 1.8, PATCH[2] + 4.4], [PATCH[0] - 0.45, 1.1, PATCH[2]], 44), k(2239, [PATCH[0] - 0.45, 1.7, PATCH[2] + 3.8], [PATCH[0] - 0.45, 1.1, PATCH[2]], 44)], dof: D([PATCH[0] - 0.5, 1.0, PATCH[2]], 2) },
  { id: 'twist', a: 2240, b: TOTAL - 1, light: 'golden', at: PATCH, span: 10, cam: [k(2240, [PATCH[0] + 0.3, 1.6, PATCH[2] + 3.4], [PATCH[0], 1.25, PATCH[2]], 42), k(TOTAL, [PATCH[0] + 0.05, 1.3, PATCH[2] + 1.2], [PATCH[0], 1.25, PATCH[2]], 34, { roll: 3 })], dof: D(FRUIT, 4) },
  { id: 'thumb', a: 9000, b: 9000, light: 'golden', at: PATCH, span: 10, cam: [k(9000, [PATCH[0] - 0.35, 1.3, PATCH[2] + 4.0], [PATCH[0] - 0.4, 1.1, PATCH[2]], 40)], dof: N0 },
];
export const shotAt = (f) => SHOTS.find((s) => f >= s.a && f < s.b + 1) || SHOTS[SHOTS.length - 1];

// ---------------- helpers ----------------
const ch = (id, who, f, pos, o = {}) => {
  const seed = who.seed || 1, I = idle(f, seed), bl = o.noBlink ? 0 : blinkAt(f, seed);
  const s = { who, expr: o.expr || 'neutral', mode: o.mode || 'stand', phase: o.phase || 0, blink: bl, armL: o.armL, armR: o.armR, tilt: q((o.tilt || 0) + I.tilt, 0.25), headTilt: q(o.headTilt || 0, 0.5), facing: o.facing || 0, look: o.look || 0, wave: o.wave, head: o.head, flipX: o.flipX };
  const key = JSON.stringify([s.expr, s.mode, q(s.phase, 0.05), s.blink, s.armL, s.armR, s.tilt, s.headTilt, s.facing, s.look, s.flipX, who.id]);
  return { id, kind: 'char', pos: [pos[0] + (o.still ? 0 : I.dx), pos[1], pos[2]], h: o.h ?? 2.0, key, draw: (g) => drawChar(g, s), blobW: o.blobW, blob: o.blob, opacity: o.opacity, soft: o.opacity != null ? true : undefined };
};
const fx = (id, pos, h, key, draw, o = {}) => ({ id, kind: 'fx', pos, h, key, draw, yaw: o.yaw ?? 'full', soft: o.soft ?? true, res: o.res || [512, 512], unlit: o.unlit ?? true, order: o.order ?? 5, opacity: o.opacity, roll: o.roll });
const burst = (id, f, at, pos, h = 0.6, col = '#fff3b0', n = 14) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'b' + q(t, 0.04) + col, (g) => { g.save(); g.scale(g.canvas.width / 500, g.canvas.width / 500); fxBurst(new Pen(g), t, col); g.restore(); }, { order: 7 }); };
const puff = (id, f, at, pos, h = 0.5, n = 16) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'p' + q(t, 0.05), (g) => { g.save(); g.scale(g.canvas.width / 300, g.canvas.width / 300); fxPuff(new Pen(g), t); g.restore(); }, { order: 8 }); };
const pop = (f, a, b) => (f < a || f > b ? 0 : back(win(f, a, a + 7)) * (1 - ss(win(f, b - 6, b))));
const label = (id, f, a, b, pos, txt, h = 0.34, col = '#ffffff') => { const s = pop(f, a, b); if (s <= 0.02) return null; return fx(id, pos, h * s, 'l' + txt + col, (g) => drawText(g, txt, { col }), { order: 9, res: [1024, 384] }); };
const tag = (id, f, a, b, pos, txt, h = 0.3) => { const s = pop(f, a, b); if (s <= 0.02) return null; return fx(id, pos, h * s, 'tg' + txt, (g) => drawTag(g, txt), { order: 9, res: [1024, 384] }); };
const prop = (id, pos, h, key, draw, o = {}) => fx(id, pos, h, key, draw, { unlit: false, order: o.order ?? 4, roll: o.roll });
const pina = (f, o = {}) => { const blink = (f % 70) < 4, eyes = o.eyes ?? 1, e = blink && eyes > 0.5 ? 0.1 : eyes; const look = o.look ?? 0, grow = o.grow ?? 1;
  return prop('pina', [FRUIT[0], FRUIT[1] - 0.55 * (1 - grow), FRUIT[2]], 1.1, 'pn' + q(e, 0.1) + q(look, 0.25) + (o.wink ? 'w' : '') + q(grow, 0.05), (g) => drawPina(g, e, { look, wink: o.wink, grow }), { order: 5 }); };
const sprout = (f, t) => prop('spr', [PATCH[0], 0.15 + 0.5 * 1.3, PATCH[2]], 1.3, 'sp' + q(t, 0.05), (g) => drawSprout(g, t), { order: 4 });
const rosa = (f, pos, o = {}) => ch('rosa', OUT.rosa, f, pos, { h: 2.05, ...o });
const pinang = (f, pos, o = {}) => ch('pinang', OUT.pinang, f, pos, { h: 1.55, ...o });
const rosaLying = (f, expr = 'dazed') => { const s = { who: OUT.rosa, expr, mode: 'stand', armL: ARM.hang, armR: ARM.hang, blink: 0 };
  return fx('rosaL', ROSA_BED, 1.23, 'rl' + expr, (g) => drawLying(g, s), { res: [1024, 614], unlit: false, order: 3 }); };
const ladle = (id, pos, h = 0.42, roll = 0) => prop(id, pos, h, 'ld', drawLadle, { roll, order: 6 });
const kitchen = () => [prop('pot', POT, 0.6, 'pot', drawPot), prop('rice', RICE, 0.75, 'rice', drawRice)];

// ---------------- per frame ----------------
export const actorsAt = (f) => {
  const S = shotAt(f), A = [], add = (x) => { if (Array.isArray(x)) x.forEach((y) => y && A.push(y)); else if (x) A.push(x); };
  switch (S.id) {
    case 'hook': {
      add(sprout(f, 1)); add(pina(f, { eyes: f < 47 ? 0 : ss(win(f, 47, 56)), look: f >= 137 ? Math.sin((f - 137) * 0.08) : 0, wink: f >= 200 && f < 212 }));
      add(burst('hb', f, 48, [FRUIT[0], FRUIT[1], FRUIT[2] - 0.05], 1.6, '#fff3b0', 16));
      add(label('mm', f, 62, 136, [FRUIT[0], FRUIT[1] + 1.05, FRUIT[2]], 'MAY MATA?!', 0.42, '#ffe066'));
      break; }
    case 'kuboOut': {
      add(label('kb', f, 300, 357, [YX - 4.5, 6.4, -6], 'KUBO', 1.0, '#ffffff'));
      break; }
    case 'inside': {
      add(rosa(f, [-0.7, 0, -2.4], { expr: 'smile', armL: ARM.hang, armR: f > 380 ? ARM.wave : ARM.hang, facing: 1 }));
      add(pinang(f, [0.8, 0, -2.3], { expr: 'grin', armL: ARM.hang, armR: ARM.hang, facing: -1 }));
      add(tag('tr', f, 395, 487, [-0.7, 2.35, -2.35], 'ALING ROSA', 0.3)); add(tag('tp', f, 425, 487, [0.8, 1.85, -2.25], 'PINANG', 0.28));
      add(kitchen());
      break; }
    case 'love': {
      const sw = Math.sin(f * 0.25);
      add(rosa(f, [lerp(-0.95, -0.35, 0.5 + 0.5 * Math.sin(f * 0.03)), 0, -2.1], { expr: 'smile_closed', armL: [20, 40 + 15 * sw, 30, 60 + 20 * sw], armR: [20, 40 + 15 * sw, 30, 60 + 20 * sw], facing: 1 }));
      add(pinang(f, [0.85, 0, -2.6], { mode: 'sit', expr: f > 588 ? 'whistle' : 'smile_closed', armL: ARM.hang, armR: ARM.hip }));
      add(fx('broom', [lerp(-0.95, -0.35, 0.5 + 0.5 * Math.sin(f * 0.03)) + 0.35, 0.45, -2.0], 0.9, 'br', (g) => { g.strokeStyle = '#1e1a24'; g.lineWidth = 30; g.beginPath(); g.moveTo(330, 40); g.lineTo(230, 380); g.stroke(); g.strokeStyle = '#a8784a'; g.lineWidth = 18; g.stroke(); g.fillStyle = '#d9b860'; g.strokeStyle = '#1e1a24'; g.lineWidth = 8; g.beginPath(); g.moveTo(180, 370); g.lineTo(290, 380); g.lineTo(300, 500); g.lineTo(140, 490); g.closePath(); g.fill(); g.stroke(); }, { unlit: false, roll: 0.12 * sw }));
      add(label('ps', f, 592, 688, [0.85, 1.5, -2.5], 'PRINSESA', 0.38, '#ffe066'));
      add(kitchen());
      break; }
    case 'sick': {
      add(rosaLying(f, f >= 794 ? 'pained' : 'dazed'));
      add(pinang(f, [-1.35, 0, -1.7], { expr: 'nervous', armL: ARM.hang, armR: ARM.hang, facing: -1 }));
      add(label('ls', f, 800, 897, [-2.0, 1.45, -2.4], 'LUGAW, ANAK…', 0.32, '#ffffff'));
      add(label('ub', f, 728, 790, [-2.6, 1.3, -2.6], 'UBO! UBO!', 0.26, '#cfe8ff'));
      break; }
    case 'ask': {
      const call = (f >= 898 && f < 935) || (f >= 987 && f < 1020) || (f >= 1066 && f < 1100);
      add(pinang(f, PIN_K, { expr: call ? 'grin' : 'whistle', armL: call ? ARM.wave : ARM.hang, armR: ARM.hold, facing: -1, look: -0.5 }));
      add(ladle('lad', [PIN_K[0] + 0.4, 0.72, PIN_K[2] + 0.1], 0.4, -0.3));
      add(kitchen());
      add(label('q1', f, 929, 1164, [POT[0], POT[1] + 0.6, POT[2]], 'KALDERO?', 0.28, '#ffe066'));
      add(label('q2', f, 1016, 1164, [RICE[0], RICE[1] + 0.75, RICE[2]], 'BIGAS?', 0.28, '#ffe066'));
      add(label('q3', f, 1097, 1164, [PIN_K[0] - 0.3, 1.85, PIN_K[2]], 'SANDOK?', 0.28, '#ffe066'));
      add(label('in', f, 898, 926, [PIN_K[0] - 0.4, 1.95, PIN_K[2]], 'INAY!', 0.26, '#ffffff'));
      add(label('in2', f, 987, 1013, [PIN_K[0] - 0.4, 1.95, PIN_K[2]], 'INAY!', 0.26, '#ffffff'));
      add(label('in3', f, 1066, 1094, [PIN_K[0] - 0.4, 1.95, PIN_K[2]], 'INAY!', 0.26, '#ffffff'));
      add(burst('pb', f, 929, POT, 0.9)); add(burst('rb', f, 1016, RICE, 1.0));
      break; }
    case 'ladle': {
      add(pinang(f, PIN_K, { expr: f >= 1212 ? 'shock' : 'whistle', armL: ARM.hang, armR: ARM.hold, facing: -1 }));
      add(ladle('lad', [PIN_K[0] + 0.4, 0.72, PIN_K[2] + 0.1], 0.4, -0.3));
      add(burst('lb', f, 1212, [PIN_K[0] + 0.4, 0.78, PIN_K[2] + 0.05], 0.6, '#ffe066'));
      add(label('hw', f, 1214, 1277, [PIN_K[0] + 0.3, 1.12, PIN_K[2] + 0.15], 'HAWAK MO NA!', 0.16, '#ffe066'));
      break; }
    case 'curse': {
      const up = f >= 1300, point = f >= 1348;
      if (!up) add(rosaLying(f, 'pained'));
      else add(rosa(f, [-2.3, 0, -2.4], { mode: 'sit', expr: point ? 'stern' : 'pained', armL: ARM.hang, armR: point ? ARM.point : ARM.hang, facing: 1 }));
      const glowA = ss(win(f, 1397, 1560));
      if (glowA > 0.02) add(fx('cg', [PIN_K[0] - 0.2, 0.8, PIN_K[2] - 0.2], 2.6 * glowA, 'cg' + q(glowA, 0.1), (g) => glow(g, '255,214,90', 0.85), { order: 2 }));
      add(pinang(f, [PIN_K[0] - 0.2, 0, PIN_K[2]], { expr: f >= 1397 ? 'shock' : 'whistle', armL: ARM.hang, armR: ARM.hold, facing: -1 }));
      add(ladle('lad', [PIN_K[0] + 0.2, 0.72, PIN_K[2] + 0.1], 0.4, -0.3));
      add(label('sm', f, 1352, 1396, [-2.3, 1.45, -2.3], 'SANA…', 0.24, '#ffe066'));
      add(kitchen());
      break; }
    case 'vanish': {
      add(rosa(f, [-2.3, 0, -2.4], { mode: 'sit', expr: 'shock', armL: ARM.shield, armR: ARM.hang, facing: 1 }));
      add(puff('vp', f, 1601, [PIN_K[0] - 0.2, 0.8, PIN_K[2]], 1.8, 22));
      add(ladle('lad', [PIN_K[0] - 0.1, Math.max(0.05, 0.72 - 0.7 * easeOut(win(f, 1606, 1622))), PIN_K[2] + 0.1], 0.4, lerp(-0.3, 1.5, win(f, 1606, 1622))));
      add(kitchen());
      add(label('nw', f, 1612, 1668, [PIN_K[0] - 0.2, 1.4, PIN_K[2]], 'POOF!', 0.34, '#ffffff'));
      break; }
    case 'search': {
      for (let i = 0; i < 4; i++) { const x = YX - 3 + i * 1.6, z = -4 - (i % 2) * 0.8; add(ch('v' + i, OUT[VIL[i]], f, [x, 0, z], { expr: 'nervous', armL: ARM.hang, armR: ARM.up, look: Math.sin(f * 0.05 + i) })); add(fx('tc' + i, [x + 0.35, 1.95, z + 0.05], 0.6, 'tc' + Math.floor(f / 3) % 4, (g) => drawTorch(g, Math.floor(f / 3) % 4), { order: 6 })); add(fx('tg' + i, [x + 0.35, 2.0, z - 0.1], 1.6, 'tgl', (g) => glow(g, '255,190,90', 0.55), { order: 3 })); }
      add(rosa(f, [YX - 0.6, 0, -2.8], { expr: 'pained', armL: ARM.shield, armR: ARM.hang }));
      add(label('ps2', f, 1680, 1744, [YX - 0.6, 2.45, -2.8], 'PINANG?!', 0.4, '#ffffff'));
      add(label('wl', f, 1748, 1789, [YX - 1, 3.0, -4], 'WALA.', 0.6, '#ff8a7a'));
      break; }
    case 'grow': {
      const t = ss(win(f, 1850, 1928));
      if (t > 0.02) add(sprout(f, t));
      add(rosa(f, [PATCH[0] - 1.0, 0, PATCH[2] + 0.5], { expr: t > 0.5 ? 'shock' : 'pained', armL: ARM.hang, armR: t > 0.5 ? ARM.point : ARM.hang, facing: 1 }));
      add(puff('gp', f, 1850, [PATCH[0], 0.3, PATCH[2] + 0.1], 0.9, 18));
      add(label('dy', f, 1800, 1849, [PATCH[0] - 0.5, 2.45, PATCH[2]], 'ILANG ARAW…', 0.36, '#ffffff'));
      break; }
    case 'fruit': {
      add(sprout(f, 1)); add(pina(f, { grow: easeOut(win(f, 1952, 1996)), eyes: f < 2010 ? 0 : ss(win(f, 2010, 2018)), look: f >= 2030 ? Math.sin((f - 2030) * 0.1) : 0 }));
      add(burst('eb', f, 2010, [FRUIT[0], FRUIT[1], FRUIT[2] - 0.05], 1.8, '#fff3b0', 16));
      add(label('dl', f, 1960, 2008, [FRUIT[0], FRUIT[1] + 0.85, FRUIT[2]], 'DILAW', 0.3, '#ffe066'));
      add(label('mt', f, 2014, 2076, [FRUIT[0], FRUIT[1] + 0.85, FRUIT[2]], 'MATA?!', 0.36, '#ffffff'));
      break; }
    case 'name': {
      add(sprout(f, 1)); add(pina(f, { look: -0.6 }));
      add(rosa(f, [PATCH[0] - 0.95, 0, PATCH[2] + 0.5], { mode: 'sit', expr: 'relief', armL: ARM.hang, armR: ARM.reach, facing: 1 }));
      add(tag('n1', f, 2080, 2146, [PATCH[0] - 0.45, 2.3, PATCH[2]], 'PINANG', 0.34));
      add(puff('np', f, 2147, [PATCH[0] - 0.45, 2.3, PATCH[2] + 0.1], 0.8, 12));
      add(tag('n2', f, 2152, 2239, [PATCH[0] - 0.45, 2.3, PATCH[2]], 'PINYA', 0.4));
      break; }
    case 'twist': {
      add(sprout(f, 1)); add(pina(f, { look: f < 2371 ? Math.sin((f - 2240) * 0.06) : 0.6, wink: f >= 2400 && f < 2440 }));
      add(label('lh', f, 2375, 2470, [FRUIT[0], FRUIT[1] + 0.7, FRUIT[2]], 'NAKITA KO NA!', 0.2, '#ffe066'));
      break; }
    case 'thumb': {
      add(fx('tgw', [FRUIT[0] - 0.2, 1.2, FRUIT[2] - 0.4], 3.2, 'tgw', (g) => glow(g, '255,226,120', 0.9), { order: 2 }));
      add(sprout(9000, 1)); add(pina(9001, { look: -0.8 }));
      add(pinang(9000, [PATCH[0] - 0.95, 0, PATCH[2] + 0.5], { expr: 'shock', armL: ARM.shield, armR: ARM.hold, facing: 1, noBlink: true }));
      add(ladle('tl', [PATCH[0] - 0.55, 0.72, PATCH[2] + 0.6], 0.4, -0.3));
      break; }
  }
  return A;
};

export const lookAt = (f) => {
  let wipe = -1, iris = 2, flash = 0;
  for (const w of WIPES) if (f >= w && f <= w + 12) wipe = lerp(-0.35, 1.3, ss((f - w) / 12));
  if (f < 26) iris = lerp(0.0, 1.25, easeOut(f / 26));
  if (f >= IRIS_OUT[0] && f < 9000) iris = lerp(1.25, 0.0, ss(win(f, IRIS_OUT[0], IRIS_OUT[1])));
  for (const [a, b, m] of [[1595, 1607, 0.6], [1664, 1672, 0.35], [2006, 2014, 0.4]]) if (f >= a && f <= b) flash = Math.max(flash, m * (1 - Math.abs(f - (a + b) / 2) / ((b - a) / 2 + 0.5)));
  return { flash, fade: 0, wipe, iris, irisC: f >= IRIS_OUT[0] ? [0.5, 0.55] : [0.5, 0.5] };
};
