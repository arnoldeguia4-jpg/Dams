// Story timeline for "Ang Diyos na Nagnobya" (Þrymskviða): shots timed to the Scribe word frames of take 1 (TOTAL 1752).
import { ss, easeOut, back, win, clamp, lerp, idle, blinkAt, q } from './engine.js';
import { OUT, ARM, drawChar, drawText, drawBolt, drawScroll, drawOx, drawFish, drawBulb, eyesFire, veil, necklace, beard, helmetBand, glow, Pen, fxBurst, fxPuff, fxStars } from './cast.js';
import { FX, GX } from './world.js';

export const TOTAL = 1752;
export const FLASHES = [[700, 708], [1584, 1594]];
export const MUSIC_STOP = 1524;
const THR = [GX - 2.0, 0, -3.6], LOK = [GX - 1.0, 0, -2.95], BRI = [GX + 0.2, 0, -3.3];

// ---------------- shots ----------------
export const SHOTS = [
  { id: 'hook', a: 0, b: 168, light: 'stage', at: [GX, 1, -3], span: 12,
    cam: [{ f: 0, pos: [GX - 0.6, 2.4, 4.6], look: [GX - 0.8, 2.1, -3.2], fov: 50 }, { f: 168, pos: [GX + 0.15, 2.2, 0.0], look: [GX + 0.2, 2.0, -3.3], fov: 42 }],
    kicks: [[140, 0.04]], dof: () => ({ c: 4, pt: [GX + 0.2, 1.9, -3.3] }) },
  { id: 'edda', a: 169, b: 330, light: 'golden', at: [0, 1, -3], span: 10,
    cam: [{ f: 169, pos: [-0.6, 1.4, 3.0], look: [-0.4, 1.0, -3.2], fov: 46 }, { f: 330, pos: [-0.2, 1.4, 2.4], look: [0.0, 1.0, -3.2], fov: 46 }],
    kicks: [[296, 0.05]], dof: () => ({ c: 3, pt: [-1.2, 1.0, -2.6] }) },
  { id: 'thrym', a: 331, b: 437, light: 'stage', at: [GX - 2, 1, -3], span: 10,
    cam: [{ f: 331, pos: [GX - 1.4, 1.0, 2.6], look: [GX - 2.0, 2.6, -3.6], fov: 46 }, { f: 437, pos: [GX - 1.6, 1.1, 1.6], look: [GX - 2.0, 2.8, -3.6], fov: 44 }],
    kicks: [[404, 0.04]], dof: () => ({ c: 4, pt: [GX - 2.0, 2.6, -3.6] }) },
  { id: 'freyja', a: 438, b: 573, light: 'golden', at: [FX, 1, -2], span: 10,
    cam: [{ f: 438, pos: [FX + 0.2, 1.5, 3.4], look: [FX, 1.35, -2.5], fov: 44 }, { f: 573, pos: [FX + 0.15, 1.5, 2.4], look: [FX, 1.4, -2.5], fov: 44 }],
    kicks: [[533, 0.06]], dof: () => ({ c: 5, pt: [FX, 1.5, -2.5] }) },
  { id: 'idea', a: 574, b: 700, light: 'golden', at: [0, 1, -2], span: 10,
    cam: [{ f: 574, pos: [0.4, 1.5, 3.8], look: [0.4, 1.3, -1.8], fov: 46 }, { f: 700, pos: [0.6, 1.5, 3.0], look: [0.7, 1.35, -1.8], fov: 46 }],
    kicks: [[645, 0.05]], dof: () => ({ c: 3, pt: [0.4, 1.3, -1.8] }) },
  { id: 'dress', a: 701, b: 856, light: 'golden', at: [0, 1, -2], span: 10,
    cam: [{ f: 701, pos: [0.55, 1.55, 2.6], look: [0.5, 1.45, -1.5], fov: 44 }, { f: 785, pos: [0.55, 1.55, 2.3], look: [0.5, 1.5, -1.5], fov: 44 }, { f: 795, pos: [0.95, 1.5, 3.2], look: [1.0, 1.35, -1.4], fov: 46, ease: ss }, { f: 856, pos: [0.95, 1.5, 3.0], look: [1.0, 1.35, -1.4], fov: 46 }],
    dof: () => ({ c: 3, pt: [0.7, 1.4, -1.4] }) },
  { id: 'feast', a: 857, b: 1072, light: 'stage', at: [GX, 1, -3], span: 10,
    cam: [{ f: 857, pos: [GX + 0.3, 2.1, 1.2], look: [GX + 0.3, 1.7, -3.0], fov: 46 }, { f: 1072, pos: [GX + 0.35, 2.05, 0.6], look: [GX + 0.35, 1.7, -3.0], fov: 46 }],
    kicks: [[967, 0.03], [1020, 0.03], [1040, 0.03], [1060, 0.03]], dof: () => ({ c: 3, pt: [GX + 0.2, 1.6, -2.8] }) },
  { id: 'loki1', a: 1073, b: 1204, light: 'stage', at: [GX - 1.5, 1, -3], span: 10,
    cam: [{ f: 1073, pos: [GX - 1.2, 2.0, 2.4], look: [GX - 1.5, 2.1, -3.2], fov: 46 }, { f: 1204, pos: [GX - 1.25, 2.0, 1.8], look: [GX - 1.5, 2.15, -3.2], fov: 46 }],
    dof: () => ({ c: 3, pt: [GX - 1.4, 2, -3.2] }) },
  { id: 'peek', a: 1205, b: 1295, light: 'stage', at: [GX, 1, -3], span: 10,
    cam: [{ f: 1205, pos: [GX + 0.2, 1.95, -0.4], look: [GX + 0.2, 1.9, -3.3], fov: 42 }, { f: 1266, pos: [GX + 0.2, 1.95, -1.1], look: [GX + 0.2, 1.92, -3.3], fov: 40 }, { f: 1295, pos: [GX + 0.2, 1.95, -1.3], look: [GX + 0.2, 1.92, -3.3], fov: 40 }],
    kicks: [[1268, 0.07]], dof: () => ({ c: 4, pt: [GX + 0.2, 1.9, -3.3] }) },
  { id: 'react', a: 1296, b: 1326, light: 'stage', at: [GX - 2, 1, -3], span: 10,
    cam: [{ f: 1296, pos: [GX - 1.7, 2.6, 0.6], look: [GX - 2.0, 2.8, -3.6], fov: 44 }, { f: 1326, pos: [GX - 1.7, 2.6, 0.9], look: [GX - 2.0, 2.8, -3.6], fov: 44 }],
    kicks: [[1297, 0.06]], dof: () => ({ c: 4, pt: [GX - 2, 2.8, -3.6] }) },
  { id: 'loki2', a: 1327, b: 1408, light: 'stage', at: [GX - 1.5, 1, -3], span: 10,
    cam: [{ f: 1327, pos: [GX - 1.25, 2.0, 1.9], look: [GX - 1.5, 2.1, -3.2], fov: 46 }, { f: 1408, pos: [GX - 1.3, 2.0, 1.5], look: [GX - 1.5, 2.15, -3.2], fov: 46 }],
    dof: () => ({ c: 3, pt: [GX - 1.4, 2, -3.2] }) },
  { id: 'hammer', a: 1409, b: 1523, light: 'stage', at: [GX - 1, 1, -3], span: 10,
    cam: [{ f: 1409, pos: [GX - 0.5, 2.1, 1.8], look: [GX - 0.5, 1.95, -3.2], fov: 46 }, { f: 1523, pos: [GX - 0.15, 2.0, 0.8], look: [GX - 0.1, 1.9, -3.2], fov: 44 }],
    dof: () => ({ c: 3, pt: [GX - 0.3, 1.7, -3.2] }) },
  { id: 'thumb', a: 9000, b: 9000, light: 'stage', at: [GX, 1, -3], span: 10,
    cam: [{ f: 9000, pos: [GX + 0.25, 1.85, -0.6], look: [GX + 0.25, 1.95, -3.3], fov: 44 }], dof: () => ({ c: 3, pt: [GX + 0.2, 1.9, -3.3] }) },
  { id: 'twist', a: 1524, b: TOTAL - 1, light: 'stage', at: [GX, 1, -3], span: 12,
    cam: [{ f: 1524, pos: [GX + 0.2, 1.95, 0.4], look: [GX + 0.2, 1.9, -3.3], fov: 44 }, { f: 1586, pos: [GX + 0.2, 1.95, 0.0], look: [GX + 0.2, 1.95, -3.3], fov: 44 },
      { f: 1592, pos: [GX + 0.2, 1.8, 2.6], look: [GX - 0.6, 2.2, -3.3], fov: 50 }, { f: 1690, pos: [GX + 0.3, 2.0, 0.9], look: [GX + 0.2, 2.55, -3.3], fov: 44, ease: ss },
      { f: TOTAL, pos: [GX + 0.3, 2.05, 0.5], look: [GX + 0.2, 2.6, -3.3], fov: 40, roll: 3 }],
    kicks: [[1586, 0.08], [1620, 0.05], [1660, 0.05]], dof: () => ({ c: 3, pt: [GX + 0.2, 2.2, -3.3] }) },
];
export const shotAt = (f) => SHOTS.find((s) => f >= s.a && f < s.b + 1) || SHOTS[SHOTS.length - 1];

// ---------------- helpers ----------------
const ch = (id, who, f, pos, o = {}) => {
  const seed = who.seed || 1, I = idle(f, seed), bl = o.noBlink ? 0 : blinkAt(f, seed);
  const s = { who, expr: o.expr || 'neutral', mode: o.mode || 'stand', phase: o.phase || 0, blink: bl, armL: o.armL, armR: o.armR, propL: o.propL, propR: o.propR,
    tilt: q((o.tilt || 0) + I.tilt, 0.25), headTilt: q(o.headTilt || 0, 0.5), facing: o.facing || 0, look: o.look || 0, wave: o.wave, head: o.head, flipX: o.flipX };
  const key = JSON.stringify([s.expr, s.mode, q(s.phase, 0.05), s.blink, s.armL, s.armR, s.propL, s.propR, s.tilt, s.headTilt, s.facing, s.look, s.wave != null ? q(s.wave, 0.1) : null, s.flipX, who.id, o.hk || '']);
  return { id, kind: 'char', pos: [pos[0] + (o.still ? 0 : I.dx), pos[1] + (o.still ? 0 : I.bob * 0.3), pos[2]], h: o.h ?? 2.25, key, draw: (g) => drawChar(g, s), blobW: o.blobW };
};
const fx = (id, pos, h, key, draw, o = {}) => ({ id, kind: 'fx', pos: o.ground ? [pos[0], pos[1] + 0.38 * h, pos[2]] : pos, h, key, draw, yaw: o.yaw ?? 'full', soft: o.soft ?? true, res: o.res || [512, 512], unlit: o.unlit ?? true, order: o.order ?? 5, opacity: o.opacity, tiltX: o.tiltX });
const burst = (id, f, at, pos, h = 0.6, col = '#fff3b0', n = 14) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'b' + q(t, 0.04) + col, (g) => { g.save(); g.scale(g.canvas.width / 500, g.canvas.width / 500); fxBurst(new Pen(g), t, col); g.restore(); }, { order: 7 }); };
const puff = (id, f, at, pos, h = 0.5, n = 16) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'p' + q(t, 0.05), (g) => { g.save(); g.scale(g.canvas.width / 300, g.canvas.width / 300); fxPuff(new Pen(g), t); g.restore(); }, { order: 8 }); };
const stars = (id, f, pos, h = 0.6) => fx(id, pos, h, 'st' + q((f % 20) / 20, 0.1), (g) => { g.save(); g.scale(g.canvas.width / 300, g.canvas.width / 300); fxStars(new Pen(g), (f % 20) / 20); g.restore(); }, { order: 8 });
const mark = (id, txt, f, a, b, pos, h = 0.45, col = '#ffffff') => { if (f < a || f > b) return null; const s = back(win(f, a, a + 6)); return fx(id, pos, h * Math.max(0.05, s), 'm' + txt + col, (g) => drawText(g, txt, { col, font: 'bold 300px Georgia, serif', lw: 24 }), { order: 7 }); };
const glowFx = (id, pos, h, a = 0.8, rgb = '255,226,140', order = 4) => fx(id, pos, h, 'gl' + q(a, 0.05) + rgb, (g) => glow(g, rgb, a), { order });
const fire = (f) => glowFx('pit', [GX + 5.5, 0.9, 1.2], 3.2, 0.55 + 0.08 * Math.sin(f * 0.7), '255,150,60', 3);
// Thor mid-dress-up: stage 0 plain, 1 veil, 2 + necklace, 3 full bride
const dressed = (k) => k >= 3 ? OUT.bride : k === 0 ? OUT.thor : { ...OUT.thor, id: 'thorD' + k, extra: k >= 2 ? necklace : OUT.thor.extra, head: (p, h) => { beard()(p, h); veil(p, h); } };

// ---------------- world state ----------------
export const worldAt = (f) => {
  const S = shotAt(f), w = { shot: S.id };
  w.tip = [1020, 1040, 1060].map((a) => (S.id === 'feast' || f > 1072) && f >= a ? ss(win(f, a, a + 8)) : 0);
  return w;
};

// ---------------- actors + fx per frame ----------------
export const actorsAt = (f) => {
  const S = shotAt(f), w = worldAt(f), A = [], add = (x) => { if (Array.isArray(x)) x.forEach((y) => y && A.push(y)); else if (x) A.push(x); };
  const hall = (o = {}) => {
    add(fire(f));
    if (o.thrym !== false) add(ch('thr', OUT.thrym, f, o.thrPos || THR, { h: 3.4, expr: o.thrExpr || 'smile', armL: o.thrArmL || ARM.hip, armR: o.thrArmR || ARM.hang, propR: o.thrProp, look: o.thrLook ?? 0.4, tilt: o.thrTilt || 0, mode: o.thrMode }));
    if (o.loki !== false) add(ch('lok', OUT.lokiMaid, f, LOK, { expr: o.lokExpr || 'smile', armL: o.lokArmL || ARM.hang, armR: o.lokArmR || ARM.hang, look: o.lokLook ?? -0.3 }));
    if (o.bride !== false) add(ch('bri', o.brideWho || OUT.bride, f, [BRI[0], o.briY || 0, BRI[2]], { expr: o.briExpr || 'smile_closed', armL: o.briArmL || ARM.hang, armR: o.briArmR || ARM.hang, propR: o.briProp, propL: o.briPropL, look: o.briLook ?? -0.2, head: o.briHead, hk: o.briHead ? 'eyes' : '' }));
    if (o.food !== false) add(fx('ox', [GX + 0.15, 1.17, -1.6], 0.55, 'ox' + q(o.ox ?? 0, 0.05), (g) => drawOx(g, o.ox ?? 0), { ground: true, order: 6 }));
    if (o.food !== false) add(fx('fish', [GX + 0.95, 1.17, -1.7], 0.5, 'fi' + (o.fish ?? 8), (g) => drawFish(g, o.fish ?? 8), { ground: true, order: 6 }));
  };
  switch (S.id) {
    case 'hook': {
      hall({ thrExpr: 'grin', lokExpr: 'smile_closed', briExpr: 'smile_closed' });
      add(mark('q', '?', f, 138, 168, [GX + 0.62, 2.55, -3.2], 0.35, '#ffe066'));
      break;
    }
    case 'edda': {
      const up = f >= 236, stand = f >= 262;
      const tp = stand ? [lerp(-1.1, -0.2, ss(win(f, 262, 288))), 0, lerp(-2.6, -3.0, ss(win(f, 262, 288)))] : [-1.1, 0, -2.6];
      add(ch('thor', OUT.thorPJ, f, tp, { mode: stand ? (f < 288 ? 'stroll' : 'stand') : 'sit', phase: (f * 0.05) % 1, expr: f >= 296 ? 'shock' : up ? 'neutral' : 'smile_closed', armL: f >= 296 ? ARM.up : up && !stand ? ARM.up : ARM.hang, armR: f >= 296 ? ARM.up : ARM.hang, look: f >= 290 ? 0.6 : 0 }));
      if (f < 236) add(fx('scroll', [-0.2, 1.75, 0.6], 0.9 * back(win(f, 170, 180)), 'scr', drawScroll, { order: 9 }));
      add(mark('ex', '!', f, 296, 330, [tp[0] + 0.1, 2.35, tp[2] + 0.1], 0.4, '#ffe066'));
      add(mark('q2', '?', f, 300, 330, [2.6, 1.6, -4.0], 0.35, '#ffe066'));
      break;
    }
    case 'thrym': {
      add(fire(f));
      add(ch('thr', OUT.thrym, f, [GX - 2.0, 0, -3.6], { h: 3.4, expr: 'grin', armL: ARM.hip, armR: f >= 403 ? ARM.point : ARM.raise, propR: f >= 403 ? undefined : 'hammerBig', look: 0 }));
      add(glowFx('hg', [GX - 1.75, 3.0, -3.4], 0.9, f < 403 ? 0.5 : 0, '200,220,255', 5));
      add(mark('q', '?', f, 404, 437, [GX - 1.2, 3.6, -3.4], 0.5, '#ffe066'));
      break;
    }
    case 'freyja': {
      const no = f >= 530;
      add(ch('fre', OUT.freyja, f, [FX, 0, -2.5], { expr: no ? 'stern' : 'smile_closed', armL: no ? ARM.cross : ARM.hang, armR: no ? ARM.cross : ARM.holdHi, propR: no ? undefined : 'flower', headTilt: no ? -4 : 3 }));
      add(puff('fp', f, 532, [FX, 0.25, -2.3], 1.2, 14));
      add(mark('no', 'X', f, 534, 573, [FX + 0.6, 2.3, -2.3], 0.4, '#e8302c'));
      break;
    }
    case 'idea': {
      const ptg = f >= 640;
      add(ch('lok', OUT.loki, f, [-0.25, 0, -1.6], { expr: ptg ? 'grin' : 'smile', armL: ARM.hang, armR: ptg ? ARM.point : ARM.chin, look: ptg ? 0.5 : -0.2 }));
      add(ch('hei', OUT.heimdall, f, [0.4, 0, -2.4], { expr: ptg ? 'grin' : 'neutral', armL: ARM.hip, armR: ptg ? ARM.point : ARM.hang, look: ptg ? 0.5 : 0 }));
      add(ch('thor', OUT.thor, f, [1.35, 0, -1.4], { expr: f >= 648 ? 'shock' : 'neutral', armL: ARM.hip, armR: ARM.hip, look: -0.4 }));
      if (f >= 618 && f < 640) add(fx('bulb', [-0.45, 2.45, -1.5], 0.4 * back(win(f, 618, 624)), 'bulb', drawBulb, { order: 7, res: [256, 256] }));
      add(mark('ex', '!', f, 650, 700, [1.6, 2.45, -1.3], 0.38, '#ffe066'));
      break;
    }
    case 'dress': {
      const k = f >= 756 ? 3 : f >= 727 ? 2 : f >= 703 ? 1 : 0;
      add(ch('thor', dressed(k), f, [0.5, 0, -1.5], { expr: k >= 3 ? 'pained' : 'nervous', armL: ARM.hang, armR: ARM.hang, hk: 'd' + k }));
      for (const at of [703, 727, 756]) add(puff('dp' + at, f, at - 2, [0.5, 1.4, -1.3], 1.4, 14));
      if (f >= 790) add(ch('lok', OUT.lokiMaid, f, [1.55, 0, -1.25], { expr: 'grin', armL: ARM.hip, armR: ARM.wave, look: -0.3 }));
      add(puff('lp', f, 788, [1.55, 1.2, -1.1], 1.4, 14));
      break;
    }
    case 'feast': {
      const ox = ss(win(f, 890, 965)), fish = 8 - Math.min(8, Math.floor(clamp((f - 970) / 4, 0, 8))), bite = Math.floor(f / 7) % 2 === 0;
      const prop = f < 968 ? 'leg' : f < 1006 ? 'fish' : 'mug';
      hall({ ox, fish, thrExpr: f > 900 ? 'shock' : 'smile', thrLook: 0.6, lokExpr: f > 950 ? 'nervous' : 'smile', briExpr: bite ? 'laugh' : 'grin', briArmR: bite ? ARM.eat : ARM.hold, briProp: prop });
      for (const at of [920, 990, 1066]) add(puff('cr' + at, f, at, [GX + 0.4, 2.0, -3.0], 0.5, 12));
      break;
    }
    case 'loki1': case 'loki2': {
      const l2 = S.id === 'loki2';
      hall({ thrExpr: l2 ? (f > 1380 ? 'relief' : 'nervous') : (f > 1150 ? 'smile_closed' : 'neutral'), thrLook: 0.3, lokExpr: l2 ? 'nervous' : 'smile_closed', lokArmR: ARM.whisper, lokLook: -0.6, briExpr: 'smile_closed', ox: 1, fish: 0 });
      break;
    }
    case 'peek': {
      const fireOn = f >= 1267;
      hall({ thrym: false, loki: false, briExpr: fireOn ? 'stern' : 'smile_closed', briHead: fireOn ? eyesFire : undefined, food: false });
      add(burst('eb', f, 1267, [GX + 0.2, 2.0, -3.1], 1.1, '#ff9a40', 12));
      break;
    }
    case 'react': {
      hall({ thrExpr: 'shock', thrTilt: -6, bride: false, loki: false, ox: 1, fish: 0 });
      add(mark('ex', '!', f, 1297, 1326, [GX - 1.3, 3.7, -3.4], 0.5, '#ffe066'));
      break;
    }
    case 'hammer': {
      const t = ss(win(f, 1409, 1470)), give = f >= 1500;
      const tp = [lerp(GX - 2.0, GX - 1.1, t), 0, lerp(-3.6, -3.5, t)];
      hall({ thrPos: tp, thrExpr: 'smile_closed', thrArmR: f >= 1478 ? ARM.reach : ARM.lift, thrProp: give ? undefined : 'hammerBig', thrMode: t > 0 && t < 1 ? 'stroll' : undefined, loki: false,
        briExpr: give ? 'grin' : 'smile_closed', briArmR: give ? ARM.lap : ARM.hang, briProp: give ? 'hammer' : undefined, food: false });
      break;
    }
    case 'twist': {
      const bare = f >= 1546, up = f >= 1556, after = f >= 1588;
      hall({ thrExpr: after ? 'dazed' : 'shock', thrMode: after ? 'fall' : undefined, thrPos: after ? [GX - 1.8, 0, -3.0] : THR, loki: !after, lokExpr: 'nervous',
        brideWho: bare ? OUT.brideBare : OUT.bride, briExpr: up ? 'grin' : 'stern', briHead: !bare ? eyesFire : undefined, briArmR: up ? ARM.raise : ARM.lap, briArmL: up ? ARM.hip : ARM.hang, briProp: up ? 'hammerBig' : 'hammer', food: false, briY: up ? 0.35 * ss(win(f, 1556, 1566)) : 0 });
      add(puff('vp', f, 1544, [GX + 0.2, 2.1, -3.1], 1.3, 16));
      if (after) add(stars('st', f, [GX - 1.8, 1.0, -2.6], 0.8));
      for (const at of [1584, 1620, 1660]) if (f >= at && f < at + 10) add(fx('bolt' + at, [GX + 0.2 + (at % 3 - 1) * 1.2, 3.6, -3.6], 2.6, 'bolt', (g) => drawBolt(g, 1), { order: 3 }));
      break;
    }
    case 'thumb': {
      hall({ thrym: false, loki: false, briExpr: 'stern', briHead: eyesFire, briArmR: ARM.raise, briProp: 'hammerBig', food: false });
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
