// Story timeline for "Ang Luyang Naging Ginto": shots, cameras, light, actors and effects as pure functions of the frame.
import { ss, easeOut, easeIn, back, win, clamp, lerp, idle, blinkAt, q } from './engine.js';
import { OUT, ARM, drawChar, drawText, drawGinger, drawMotes, drawNo, drawMaiden, glow, Pen, fxBurst, fxPuff } from './cast.js';
import { HX, LX, GARDEN, RIDGE, pathX } from './world.js';

export const TOTAL = 1739;
export const FLASHES = [[150, 162], [1060, 1072], [1516, 1528]];
export const MUSIC_STOP = 1676;
const MAR = [-0.6, 0, -13.1], HUN = [0.75, 0, -12.6];
const TOSS = [985, 1012, 1038];

// ---------------- shots ----------------
export const SHOTS = [
  { id: 'hook', a: 0, b: 158, light: 'golden', at: [0, 1, -3], span: 10,
    cam: [{ f: 0, pos: [0.55, 0.32, 3.1], look: [0.1, 0.45, -3], fov: 42 }, { f: 158, pos: [0.45, 0.4, 2.7], look: [0.05, 0.7, -3], fov: 42 }],
    kicks: [], dof: (f) => ({ c: 9, pt: f < 85 ? [pathX(1.2) + 0.1, 0.1, 1.2] : [0, 1.2, -3.2] }) },
  { id: 'mtn', a: 159, b: 330, light: 'forest', at: [0, 1, -10], span: 18,
    cam: [{ f: 159, pos: [2.5, 1.0, 8], look: [0, 9, -40], fov: 46 }, { f: 260, pos: [1.6, 1.4, 0], look: [0, 3, -20], fov: 44, ease: ss }, { f: 330, pos: [0.6, 1.4, -7.4], look: [-0.4, 1.3, -13.5], fov: 42 }],
    dof: () => ({ c: 0 }) },
  { id: 'maria', a: 331, b: 388, light: 'forest', at: [0, 1, -13], span: 8,
    cam: [{ f: 331, pos: [-0.35, 1.35, -10.4], look: [-0.6, 1.3, -13.1], fov: 40 }, { f: 388, pos: [-0.4, 1.35, -10.7], look: [-0.6, 1.32, -13.1], fov: 40 }],
    dof: () => ({ c: 8, pt: [-0.6, 1.4, -13.1] }) },
  { id: 'meet', a: 389, b: 556, light: 'forest', at: [0, 1, -13], span: 8,
    cam: [{ f: 389, pos: [0.4, 1.3, -7.8], look: [0.2, 1.15, -12.8], fov: 42 }, { f: 556, pos: [0.15, 1.3, -8.4], look: [0.08, 1.15, -12.85], fov: 40 }],
    dof: () => ({ c: 5, pt: [0.1, 1.3, -12.8] }) },
  { id: 'nope', a: 557, b: 674, light: 'forest', at: [0, 1, -13], span: 8,
    cam: [{ f: 557, pos: [0.15, 1.35, -8.6], look: [0.08, 1.25, -12.85], fov: 40 }, { f: 674, pos: [0.1, 1.35, -9.0], look: [0.08, 1.25, -12.85], fov: 40 }],
    dof: () => ({ c: 5, pt: [0.1, 1.4, -12.8] }) },
  { id: 'fill', a: 675, b: 780, light: 'forest', at: [0, 1, -13], span: 8,
    cam: [{ f: 675, pos: [0.1, 1.35, -9.0], look: [0.08, 1.2, -12.85], fov: 40 }, { f: 742, pos: [0.25, 1.3, -9.4], look: [0.15, 1.15, -12.8], fov: 40 }, { f: 780, pos: [0.85, 1.25, -10.5], look: [0.75, 1.15, -12.6], fov: 40 }],
    dof: () => ({ c: 7, pt: [0.6, 1.2, -12.7] }) },
  { id: 'huh', a: 781, b: 817, light: 'forest', at: [0, 1, -13], span: 8,
    cam: [{ f: 781, pos: [0.8, 1.45, -10.25], look: [0.75, 1.4, -12.6], fov: 40 }, { f: 817, pos: [0.8, 1.45, -10.4], look: [0.75, 1.4, -12.6], fov: 40 }],
    dof: () => ({ c: 10, pt: [0.75, 1.5, -12.55] }) },
  { id: 'heavy', a: 818, b: 953, light: 'forest', at: [0, 1, -7], span: 12,
    cam: [{ f: 818, pos: [0.9, 1.35, -5.6], look: [0.3, 1.15, -10], fov: 42 }, { f: 953, pos: [0.7, 1.15, 0.2], look: [0.1, 1.0, -4], fov: 42 }],
    dof: () => ({ c: 5, pt: [0.2, 1.1, -6] }) },
  { id: 'toss', a: 954, b: 1065, light: 'forest', at: [0, 1, -5], span: 12,
    cam: [{ f: 954, pos: [1.1, 0.85, 1.4], look: [0.0, 0.9, -5], fov: 46 }, { f: 1065, pos: [1.2, 0.8, 1.0], look: [0.0, 0.75, -5.5], fov: 46 }],
    dof: () => ({ c: 3, pt: [0, 1, -3.6] }) },
  { id: 'home', a: 1066, b: 1257, light: 'golden', at: [HX, 1, 0], span: 10,
    cam: [{ f: 1066, pos: [HX + 1.6, 1.4, 5.2], look: [HX + 0.4, 1.2, 0.8], fov: 42 }, { f: 1170, pos: [HX + 0.5, 1.45, 3.4], look: [HX + 0.6, 1.4, 0.9], fov: 40 },
      { f: 1257, pos: [HX + 0.55, 1.5, 3.0], look: [HX + 0.62, 1.45, 0.9], fov: 40 }],
    kicks: [[1219, 0.04]], dof: () => ({ c: 7, pt: [HX + 0.6, 1.45, 0.95] }) },
  { id: 'gossip', a: 1258, b: 1307, light: 'golden', at: [HX, 1, 0], span: 10,
    cam: [{ f: 1258, pos: [HX - 0.9, 1.35, 4.6], look: [HX - 1.5, 1.2, 1.3], fov: 40 }, { f: 1307, pos: [HX - 1.1, 1.35, 4.3], look: [HX - 1.5, 1.2, 1.3], fov: 40 }],
    dof: () => ({ c: 6, pt: [HX - 1.5, 1.4, 1.3] }) },
  { id: 'dig', a: 1308, b: 1421, light: 'night', at: [0, 1, -14], span: 10,
    cam: [{ f: 1308, pos: [2.2, 1.7, -7.6], look: [0.0, 0.7, -14.2], fov: 44 }, { f: 1421, pos: [1.6, 1.5, -8.6], look: [0.0, 0.7, -14.2], fov: 44 }],
    dof: () => ({ c: 3, pt: [0, 0.8, -14] }) },
  { id: 'gone', a: 1422, b: 1520, light: 'forest', at: [0, 1, -15], span: 10,
    cam: [{ f: 1422, pos: [0.1, 1.4, -11.6], look: [-0.4, 1.3, -15.5], fov: 40 }, { f: 1520, pos: [0.05, 1.5, -12.3], look: [-0.4, 1.6, -15.5], fov: 40 }],
    dof: () => ({ c: 6, pt: [-0.4, 1.4, -15.5] }) },
  { id: 'thumb', a: 9000, b: 9000, light: 'golden', at: [HX, 1, 0], span: 8,
    cam: [{ f: 9000, pos: [HX + 0.55, 1.55, 3.2], look: [HX + 0.7, 1.65, 0.9], fov: 42 }], dof: () => ({ c: 6, pt: [HX + 0.6, 1.5, 0.95] }) },
  { id: 'final', a: 1521, b: TOTAL - 1, light: 'golden', at: [LX, 1, 0], span: 10,
    cam: [{ f: 1521, pos: [LX + 1.0, 1.15, 5.4], look: [LX, 1.15, 1.6], fov: 42 }, { f: 1580, pos: [LX + 0.9, 1.2, 5.6], look: [LX, 1.3, 1.6], fov: 42 },
      { f: 1665, pos: [LX + 0.6, 2.4, 8.5], look: [RIDGE.x, 7, RIDGE.z], fov: 42, ease: ss }, { f: 1712, pos: [LX + 0.6, 2.4, 8.5], look: [RIDGE.x, 7, RIDGE.z], fov: 40 },
      { f: TOTAL, pos: [LX + 0.6, 2.4, 8.5], look: [RIDGE.x - 2, 7.5, RIDGE.z], fov: 33, roll: 3 }],
    dof: (f) => ({ c: f < 1600 ? 6 : 0, pt: [LX, 1.3, 1.6] }) },
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
const fx = (id, pos, h, key, draw, o = {}) => ({ id, kind: 'fx', pos: o.ground ? [pos[0], pos[1] + 0.38 * h, pos[2]] : pos, h, key, draw, yaw: o.yaw ?? 'full', soft: o.soft ?? true, res: o.res || [512, 512], unlit: o.unlit ?? true, order: o.order ?? 5, opacity: o.opacity, tiltX: o.tiltX });
const burst = (id, f, at, pos, h = 0.6, col = '#fff3b0', n = 14) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'b' + q(t, 0.04) + col, (g) => { g.save(); g.scale(g.canvas.width / 500, g.canvas.width / 500); fxBurst(new Pen(g), t, col); g.restore(); }, { order: 7 }); };
const puff = (id, f, at, pos, h = 0.5, n = 16) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'p' + q(t, 0.05), (g) => { g.save(); g.scale(g.canvas.width / 300, g.canvas.width / 300); fxPuff(new Pen(g), t); g.restore(); }, { order: 6 }); };
const mark = (id, txt, f, a, b, pos, h = 0.45, col = '#ffffff') => { if (f < a || f > b) return null; const s = back(win(f, a, a + 6)); return fx(id, pos, h * Math.max(0.05, s), 'm' + txt + col, (g) => drawText(g, txt, { col, font: 'bold 300px Georgia, serif', lw: 24 }), { order: 7 }); };
const glowFx = (id, pos, h, a = 0.8, rgb = '255,226,140', order = 4) => fx(id, pos, h, 'gl' + q(a, 0.05) + rgb, (g) => glow(g, rgb, a), { order });
const gingerFx = (id, pos, h, gold) => fx(id, pos, h, 'gg' + q(gold, 0.1), (g) => drawGinger(g, { gold }), { order: 6, ground: true });
/** a ginger tossed over the shoulder: arc from `from` to `to` over n frames, then lies there turning gold */
const tossed = (id, f, at, from, to, n = 14) => {
  if (f < at) return [];
  const t = clamp((f - at) / n), y = lerp(from[1], to[1], t) + 1.1 * Math.sin(Math.PI * t), p = [lerp(from[0], to[0], t), y, lerp(from[2], to[2], t)];
  const gold = ss(win(f, at + n + 2, at + n + 10));
  const out = [t < 1 ? fx(id, p, 0.2, 'gf', (g) => drawGinger(g, {}), { order: 6 }) : gingerFx(id, to, 0.22, gold)];
  if (f >= at + n + 2) { const b = burst(id + 'b', f, at + n + 3, [to[0], to[1] + 0.12, to[2]], 0.5, '#fff3b0', 12); if (b) out.push(b); }
  return out;
};

// ---------------- world state ----------------
export const worldAt = (f) => {
  const S = shotAt(f), w = { shot: S.id };
  w.holes = S.id === 'dig' ? Math.floor(clamp((f - 1325) / 22, 0, 4)) : S.id === 'gone' ? 4 : 0;
  w.maiden = S.id === 'final' ? ss(win(f, 1680, 1712)) : 0;
  return w;
};

// ---------------- actors + fx per frame ----------------
export const actorsAt = (f) => {
  const S = shotAt(f), A = [], add = (x) => { if (Array.isArray(x)) x.forEach((y) => y && A.push(y)); else if (x) A.push(x); };
  const mariaAura = (pos, a = 0.7) => add(glowFx('aura', [pos[0], pos[1] + 1.2, pos[2] - 0.08], 2.6, a, '255,244,200', 3));
  switch (S.id) {
    case 'hook': {
      const walk = win(f, 0, 95), z = lerp(-8.5, -3.2, walk), x = pathX(z) - 0.1;
      const tossing = f >= 104 && f < 116;
      add(ch('hun', OUT.hunter, f, [x, 0, z], { mode: walk < 1 ? 'stroll' : 'stand', phase: (f * 0.045) % 1, expr: f > 100 ? 'pained' : 'neutral', armR: tossing ? ARM.toss : ARM.carryLo, armL: ARM.carryLo, propL: 'salakotFew', tilt: f > 100 ? -4 : -2 }));
      add(gingerFx('g0', [pathX(1.2) + 0.12, 0, 1.2], 0.24, ss(win(f, 48, 60))));
      add(glowFx('g0glow', [pathX(1.2) + 0.12, 0.12, 1.15], 0.8, 0.7 * ss(win(f, 48, 60)), '255,220,120', 5));
      add(burst('g0b', f, 54, [pathX(1.2) + 0.12, 0.2, 1.25], 0.55));
      add(tossed('t0', f, 108, [x + 0.25, 1.8, z], [pathX(-5.2) + 0.3, 0, -5.4]));
      break;
    }
    case 'mtn': {
      A.push(fx('motes', [0, 2.6, -11], 12, 'mo' + q(f / 30, 0.1), (g) => drawMotes(g, { t: f / 30, n: 60, a: ss(win(f, 262, 300)) }), { order: 6, res: [1024, 1024] }));
      break;
    }
    case 'maria': {
      const on = f >= 333;
      if (on) { add(ch('mar', OUT.maria, f, MAR, { expr: 'smile_closed', armL: ARM.hip, armR: ARM.wave, wave: 0.5 + 0.5 * Math.sin(f * 0.3) })); mariaAura(MAR, 0.75); }
      add(burst('mb', f, 333, [MAR[0], 1.3, MAR[2] + 0.2], 1.6, '#fff8d0', 14));
      add(puff('mp', f, 331, [MAR[0], 0.9, MAR[2] + 0.2], 1.4, 18));
      A.push(fx('motes', [0, 2.2, -12], 8, 'mo' + q(f / 30, 0.1), (g) => drawMotes(g, { t: f / 30, n: 40 }), { order: 6, res: [1024, 1024] }));
      break;
    }
    case 'meet': {
      const walk = win(f, 389, 445), hp = [lerp(2.6, HUN[0], ss(walk)), 0, lerp(-9.6, HUN[2], ss(walk))], show = f >= 512;
      add(ch('mar', OUT.maria, f, MAR, { expr: 'smile', armL: ARM.hip, armR: ARM.hang, facing: 1 }));
      mariaAura(MAR, 0.6);
      add(ch('hun', OUT.hunter, f, hp, { mode: walk > 0 && walk < 1 ? 'stroll' : 'stand', phase: (f * 0.05) % 1, expr: show ? 'pained' : f > 460 ? 'nervous' : 'shock', armL: ARM.hang, armR: show ? ARM.lift : ARM.hang, propR: 'sack', facing: -1, tilt: f > 470 && f < 512 ? 3 * Math.sin(f * 0.6) : 0 }));
      break;
    }
    case 'nope': {
      const wag = Math.sin(f * 0.45) > 0 ? 1 : -1;
      add(ch('mar', OUT.maria, f, MAR, { expr: 'smile_closed', armL: ARM.hip, armR: ARM.wag, facing: wag, headTilt: 4 * wag }));
      mariaAura(MAR, 0.6);
      add(ch('hun', OUT.hunter, f, HUN, { expr: f < 592 ? 'grin' : f < 632 ? 'nervous' : f < 640 ? 'grin' : 'nervous', armL: ARM.hang, armR: ARM.hang, facing: -1 }));
      if (f >= 586 && f < 628) A.push(fx('no1', [0.1, 2.15, -12.6], 0.55 * back(win(f, 586, 594)), 'nm', (g) => drawNo(g, 'meat'), { order: 7 }));
      if (f >= 634 && f < 674) A.push(fx('no2', [0.1, 2.15, -12.6], 0.55 * back(win(f, 634, 642)), 'nc', (g) => drawNo(g, 'coin'), { order: 7 }));
      break;
    }
    case 'fill': {
      const took = f >= 690, given = f >= 745;
      const mProp = !took || given ? undefined : f < 712 ? 'salakotEmpty' : f < 728 ? 'salakotFew' : 'salakotFull';
      add(ch('mar', OUT.maria, f, MAR, { expr: 'smile_closed', armL: ARM.hip, armR: took && !given ? ARM.holdHi : ARM.hang, propR: mProp, facing: 1 }));
      mariaAura(MAR, 0.6);
      add(ch('hun', took ? OUT.hunterBare : OUT.hunter, f, HUN, { expr: given ? 'neutral' : 'smile', armL: given ? ARM.carry : ARM.hang, armR: given ? ARM.carry : ARM.hang, propR: given ? 'salakotFull' : undefined, facing: -1 }));
      for (const [i, at] of [700, 710, 720, 730].entries()) add(burst('fb' + i, f, at, [MAR[0] + 0.25, 1.45, MAR[2] + 0.25], 0.35, '#fff3b0', 10));
      add(puff('hatp', f, 688, [HUN[0], 1.95, HUN[2] + 0.1], 0.5, 12));
      break;
    }
    case 'huh': {
      add(ch('hun', OUT.hunterBare, f, HUN, { expr: 'neutral', armL: ARM.carry, armR: ARM.carry, propR: 'salakotFull', headTilt: 6, look: -0.3 }));
      add(mark('q', '?', f, 781, 817, [HUN[0] + 0.35, 2.1, HUN[2] + 0.1], 0.4, '#ffe066'));
      break;
    }
    case 'heavy': {
      const t = win(f, 818, 953), z = lerp(-10.5, -4.2, t), heavy = ss(win(f, 860, 940));
      add(ch('hun', OUT.hunterBare, f, [pathX(z), 0, z], { mode: 'stroll', phase: (f * lerp(0.05, 0.03, heavy)) % 1, expr: heavy > 0.5 ? 'pained' : heavy > 0.15 ? 'nervous' : 'neutral',
        armL: heavy > 0.4 ? ARM.carryLo : ARM.carry, armR: heavy > 0.4 ? ARM.carryLo : ARM.carry, propR: 'salakotFull', tilt: -6 * heavy + 2 * heavy * Math.sin(f * 0.3) }));
      if (f > 905) add(fx('sweat', [pathX(z) + 0.32, 1.95, z + 0.05], 0.12, 'sw', (g) => { const s = g.canvas.width; g.fillStyle = '#9fd4ff'; g.beginPath(); g.ellipse(s / 2, s * 0.6, s * 0.25, s * 0.33, 0, 0, 7); g.fill(); g.lineWidth = s * 0.06; g.strokeStyle = '#241726'; g.stroke(); }, { order: 7 }));
      break;
    }
    case 'toss': {
      const hz = -3.6, hx = pathX(hz), at = TOSS.find((a) => f >= a && f < a + 9), n = TOSS.filter((a) => f >= a + 4).length;
      add(ch('hun', OUT.hunterBare, f, [hx, 0, hz], { expr: f > 1045 ? 'relief_open' : 'pained', armR: at ? ARM.toss : ARM.carryLo, armL: ARM.carryLo, propL: n >= 3 ? 'ginger' : n >= 1 ? 'salakotFew' : 'salakotFull', tilt: n >= 3 ? 0 : -4 + n }));
      TOSS.forEach((a, i) => add(tossed('t' + i, f, a + 2, [hx + 0.25, 1.8, hz], [pathX(hz - 1.4 - i * 0.9) + (i - 1) * 0.35, 0, hz - 1.4 - i * 0.9])));
      break;
    }
    case 'home': {
      const walk = win(f, 1066, 1112), hp = [lerp(HX + 2.4, HX + 0.6, ss(walk)), 0, 0.9], holding = f >= 1118, gold = f >= 1219;
      add(ch('hun', OUT.hunterBare, f, hp, { mode: walk < 1 ? 'stroll' : 'stand', phase: (f * 0.045) % 1, expr: gold ? (f < 1240 ? 'shock' : 'laugh') : f > 1180 ? 'shock' : 'neutral',
        armR: holding ? ARM.lift : ARM.carryLo, propR: holding ? (gold ? 'goldGinger' : 'ginger') : undefined, armL: holding ? ARM.hip : ARM.carryLo, propL: holding ? undefined : 'salakotEmpty', look: holding ? 0.2 : 0 }));
      const k = ss(win(f, 1179, 1225));
      if (k > 0) add(glowFx('hg', [HX + 0.95, 1.75, 0.8], 0.5 + 0.6 * k, 0.85 * k, '255,220,120', 5));
      add(burst('hk', f, 1181, [HX + 0.95, 1.75, 1.08], 0.4, '#fff3b0', 10));
      add(burst('hgold', f, 1219, [HX + 0.95, 1.75, 1.1], 1.0, '#ffffff', 14));
      A.push(fx('lamp', [HX + 1.05, 1.62, -1.05], 0.9, 'lp', (g) => glow(g, '255,200,120', 0.6), { order: 3 }));
      break;
    }
    case 'gossip': {
      add(ch('g1', OUT.g1, f, [HX - 1.9, 0, 1.2], { expr: 'grin', armL: ARM.hip, armR: ARM.point, facing: 1 }));
      add(ch('g2', OUT.g2, f, [HX - 1.1, 0, 1.45], { expr: 'grin', armL: ARM.hang, armR: ARM.whisper, facing: -1 }));
      add(mark('ex', '!', f, 1282, 1307, [HX - 1.9, 2.15, 1.25], 0.35, '#ffe066'));
      break;
    }
    case 'dig': {
      const P = [[-1.3, -13.2], [1.1, -13.4], [0.0, -15.0]];
      [OUT.g1, OUT.g2, OUT.g3].forEach((who, i) => {
        const up = Math.sin(f * 0.35 + i * 2) > 0;
        add(ch('g' + i, who, f, [GARDEN[0] + P[i][0], 0, P[i][1]], { expr: 'grin', armR: up ? ARM.lift : ARM.dig, armL: ARM.hip, propR: 'shovel', tilt: up ? 3 : -3 }));
      });
      for (let i = 0; i < 3; i++) for (const at of [1330, 1366, 1402]) add(puff('d' + i + at, f, at + i * 6, [GARDEN[0] + P[i][0] + 0.25, 0.25, P[i][1] + 0.2], 0.7, 16));
      break;
    }
    case 'gone': {
      const vanish = f >= 1478;
      if (!vanish) { add(ch('mar', OUT.maria, f, [-0.4, 0, -15.5], { expr: f > 1440 ? 'nervous' : 'neutral', armL: ARM.hang, armR: ARM.hang, look: -0.3, headTilt: -3 })); mariaAura([-0.4, 0, -15.5], 0.6 * (1 - win(f, 1460, 1478))); }
      add(puff('vp', f, 1474, [-0.4, 1.1, -15.3], 1.8, 20));
      add(burst('vb', f, 1476, [-0.4, 1.3, -15.3], 1.3, '#fff8d0', 14));
      A.push(fx('motes', [-0.4, 1.8 + 0.02 * Math.max(0, f - 1478), -15.4], 4, 'mo' + q(f / 30, 0.1), (g) => drawMotes(g, { t: f / 30, n: 30, seed: 9, a: ss(win(f, 1474, 1490)) * (1 - ss(win(f, 1505, 1520))) }), { order: 6, res: [1024, 1024] }));
      break;
    }
    case 'thumb': {
      add(ch('hun', OUT.hunterBare, 9000, [HX + 0.55, 0, 0.9], { expr: 'shock', armR: [30, -4, 40, -38, true], armL: ARM.hip, still: true, noBlink: true, look: 0.3 }));
      add(glowFx('tg', [HX + 0.95, 1.78, 0.8], 1.2, 0.95, '255,220,120', 3));
      A.push(fx('tb', [HX + 0.95, 1.78, 0.78], 1.3, 'tb', (g) => { g.save(); g.scale(g.canvas.width / 500, g.canvas.width / 500); fxBurst(new Pen(g), 0.6, '#fff3b0', 12); g.restore(); }, { order: 4 }));
      A.push(fx('tgg', [HX + 0.93, 1.74, 0.97], 0.42, 'tgg', (g) => drawGinger(g, { gold: 1 }), { order: 8 }));
      break;
    }
    case 'final': {
      const w = worldAt(f);
      add(ch('lola', OUT.lola, f, [LX - 0.45, 0, 1.6], { expr: 'smile_closed', armL: ARM.hip, armR: f > 1545 ? ARM.point : ARM.hang, facing: 1 }));
      add(ch('kid', OUT.kid, f, [LX + 0.35, 0, 1.9], { expr: f > 1600 ? 'relief_open' : 'smile', armL: ARM.hang, armR: ARM.hang, headTilt: -4, look: -0.3 }));
      A.push(fx('hill', [RIDGE.x, 0.39 * RIDGE.w / 2, RIDGE.z + 26], RIDGE.w / 2, 'hill', (g) => drawMaiden(g, 1, true), { yaw: 0, order: 1, res: [1024, 512] }));
      if (w.maiden > 0) A.push(fx('maiden', [RIDGE.x, 0.39 * RIDGE.w / 2, RIDGE.z + 25], RIDGE.w / 2, 'md' + q(w.maiden, 0.05), (g) => drawMaiden(g, w.maiden), { yaw: 0, order: 6, res: [1024, 512] }));
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
