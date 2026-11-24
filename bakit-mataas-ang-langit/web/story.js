// Story timeline for "Bakit Mataas ang Langit": shots, cameras, light, world state, actors and effects as pure functions of the frame.
import { ss, easeOut, easeIn, back, win, clamp, lerp, idle, blinkAt, q } from './engine.js';
import { OUT, ARM, gripArms, drawChar, drawText, drawMoonComb, drawStars, drawDots, comb, beads, Pen, fxBurst, fxPuff, fxStars } from './cast.js';
import { SKY0, MORTAR } from './world.js';

export const TOTAL = 1938;
export const FLASHES = [[134, 146], [1313, 1319], [1588, 1600]];
export const MUSIC_STOP = 1719;
const MOON = [0, 55, -100], STARS = [0, 70, -200];
const TOKS = [627, 704, 721, 736, 790];
export const BLAG = 1315;

// ---------------- shots ----------------
export const SHOTS = [
  { id: 'hook', a: 0, b: 140, light: 'night', at: [0, 1, 0], span: 14,
    cam: [{ f: 0, pos: [1.3, 1.2, 7.2], look: [0.3, 1.3, 0], fov: 42 }, { f: 40, pos: [1.2, 1.1, 6.8], look: [0.25, 3.0, -2], fov: 42 },
      { f: 95, pos: [1.0, 1.0, 6.4], look: MOON, fov: 34, ease: ss }, { f: 140, pos: [1.0, 1.0, 6.3], look: MOON, fov: 20 }],
    dof: (f) => ({ c: f < 40 ? 4 : 0, pt: [0.6, 1.2, 2.4] }) },
  { id: 'lowsky', a: 141, b: 395, light: 'day', at: [0, 1, 0], span: 16,
    cam: [{ f: 141, pos: [7.5, 0.9, 11.5], look: [0, 1.3, -2], fov: 46 }, { f: 236, pos: [5.6, 0.95, 8.2], look: [1.2, 1.4, -1], fov: 46 },
      { f: 237, pos: [4.6, 1.25, 5.4], look: [2.5, 1.55, 1.0], fov: 40 }, { f: 285, pos: [4.2, 1.25, 4.8], look: [2.5, 1.7, 1.0], fov: 40 },
      { f: 330, pos: [3.6, 1.3, 3.7], look: [2.55, 2.05, 1.15], fov: 40 }, { f: 395, pos: [3.4, 1.35, 3.3], look: [2.55, 2.08, 1.15], fov: 40 }],
    dof: (f) => ({ c: f < 237 ? 0 : 7, pt: f < 300 ? [2.4, 1.6, 1.2] : [2.55, 2.05, 1.2] }) },
  { id: 'tug', a: 396, b: 545, light: 'day', at: [0, 1, 0], span: 8,
    cam: [{ f: 396, pos: [-0.5, 1.3, 4.6], look: [0.05, 1.1, 0.1], fov: 42 }, { f: 545, pos: [-0.45, 1.3, 3.5], look: [0.05, 1.15, 0.1], fov: 40 }],
    dof: () => ({ c: 6, pt: [0, 1.3, 0.1] }) },
  { id: 'tok1', a: 546, b: 700, light: 'day', at: [0, 1, 0], span: 8,
    cam: [{ f: 546, pos: [-0.5, 1.2, 3.4], look: [0.1, 1.45, 0.2], fov: 42 }, { f: 625, pos: [-0.5, 1.15, 3.1], look: [0.1, 1.6, 0.2], fov: 42 },
      { f: 700, pos: [-0.45, 1.1, 2.9], look: [0.1, 1.7, 0.25], fov: 42 }],
    kicks: [[627, 0.05]], dof: () => ({ c: 5, pt: [0.05, 1.5, 0.2] }) },
  { id: 'tok3', a: 701, b: 840, light: 'day', at: [0, 1, 0], span: 8,
    cam: [{ f: 701, pos: [-0.4, 1.45, 2.6], look: [0.03, 1.55, 0.05], fov: 40 }, { f: 840, pos: [-0.4, 1.5, 2.3], look: [0.02, 1.6, 0.05], fov: 40 }],
    kicks: [[704, 0.04], [721, 0.04], [736, 0.05], [790, 0.07]], dof: () => ({ c: 9, pt: [0, 1.6, 0.05] }) },
  { id: 'hang', a: 841, b: 1020, light: 'day', at: [0, 1, 0], span: 8,
    cam: [{ f: 841, pos: [-0.35, 1.35, 3.2], look: [0.0, 1.35, 0.0], fov: 40 }, { f: 920, pos: [0.5, 1.3, 3.2], look: [0.0, 1.5, 0.0], fov: 40 },
      { f: 960, pos: [0.45, 1.2, 2.2], look: [0.0, 2.05, 0.15], fov: 40 }, { f: 1020, pos: [0.4, 1.2, 2.0], look: [0.0, 2.08, 0.15], fov: 40 }],
    dof: (f) => ({ c: 7, pt: f < 935 ? [0, 1.55, 0] : [0, 2.05, 0.15] }) },
  { id: 'plead', a: 1021, b: 1210, light: 'day', at: [0, 1, 0], span: 8,
    cam: [{ f: 1021, pos: [0.2, 0.9, 2.5], look: [0.0, 1.5, 0.0], fov: 42 }, { f: 1162, pos: [0.15, 0.95, 2.2], look: [0.0, 1.55, 0.0], fov: 42 },
      { f: 1163, pos: [0.55, 1.25, 1.7], look: [0.05, 2.08, 0.1], fov: 40 }, { f: 1210, pos: [0.55, 1.25, 1.65], look: [0.05, 2.08, 0.1], fov: 40 }],
    dof: (f) => ({ c: f < 1163 ? 6 : 4, pt: f < 1163 ? [0, 1.6, 0] : [0.05, 2.08, 0.15] }) },
  { id: 'swing', a: 1211, b: 1330, light: 'day', at: [0, 1, 0], span: 9,
    cam: [{ f: 1211, pos: [-0.6, 0.85, 3.0], look: [0.05, 1.35, 0.1], fov: 44 }, { f: 1300, pos: [-0.7, 0.7, 3.2], look: [0.05, 1.5, 0.1], fov: 46 }, { f: 1330, pos: [-0.75, 0.65, 3.3], look: [0.05, 1.7, 0.1], fov: 48 }],
    kicks: [[BLAG, 0.1]], dof: () => ({ c: 4, pt: [0, 1.4, 0.2] }) },
  { id: 'rise', a: 1331, b: 1593, light: 'day', at: [0, 1, 0], span: 16,
    cam: [{ f: 1331, pos: [3.6, 0.55, 6.8], look: [0, 2.6, 0], fov: 50 }, { f: 1420, pos: [3.6, 0.55, 7.4], look: [0, 3.2, -2], fov: 56 },
      { f: 1520, pos: [3.4, 0.6, 7.6], look: [0, 6, -6], fov: 58, ease: ss }, { f: 1525, pos: [-0.35, 1.4, 2.6], look: [0, 1.62, 0], fov: 40 }, { f: 1593, pos: [-0.3, 1.4, 2.4], look: [0, 1.66, 0], fov: 40 }],
    dof: (f) => ({ c: f < 1525 ? 0 : 7, pt: [0, 1.6, 0] }) },
  { id: 'thumb', a: 9000, b: 9000, light: 'day', at: [0, 1, 0], span: 8,
    cam: [{ f: 9000, pos: [-0.45, 1.25, 2.55], look: [0.02, 1.62, 0.1], fov: 42 }], dof: () => ({ c: 4, pt: [0, 1.6, 0.1] }) },
  { id: 'final', a: 1594, b: TOTAL - 1, light: 'night', at: [0, 1, 0], span: 10,
    cam: [{ f: 1594, pos: [0.55, 1.25, 3.2], look: [0.0, 1.45, 0], fov: 42 }, { f: 1679, pos: [0.5, 1.2, 3.0], look: [0.0, 1.6, 0], fov: 42 },
      { f: 1719, pos: [0.5, 1.0, 3.0], look: MOON, fov: 34, ease: ss }, { f: 1812, pos: [0.5, 1.0, 3.0], look: MOON, fov: 15, roll: 4 },
      { f: 1880, pos: [0.5, 1.0, 3.0], look: [0, 40, -100], fov: 52, roll: 0 }, { f: TOTAL, pos: [0.5, 1.0, 3.0], look: [0, 42, -100], fov: 50 }],
    dof: (f) => ({ c: f < 1690 ? 5 : 0, pt: [0, 1.5, 0] }) },
];
export const shotAt = (f) => SHOTS.find((s) => f >= s.a && f <= s.b) || SHOTS[SHOTS.length - 1];

// ---------------- helpers ----------------
const ch = (id, who, f, pos, o = {}) => {
  const seed = who.seed || 1, I = idle(f, seed), bl = o.noBlink ? 0 : blinkAt(f, seed);
  const s = { who, hid: id, expr: o.expr || 'neutral', mode: o.mode || 'stand', phase: o.phase || 0, blink: bl, armL: o.armL, armR: o.armR, propL: o.propL, propR: o.propR,
    tilt: q((o.tilt || 0) + I.tilt, 0.25), headTilt: q(o.headTilt || 0, 0.5), facing: o.facing || 0, look: o.look || 0, wave: o.wave, head: o.head, flipX: o.flipX };
  const key = JSON.stringify([s.expr, s.mode, q(s.phase, 0.05), s.blink, s.armL, s.armR, s.propL, s.propR, s.tilt, s.headTilt, s.facing, s.look, s.wave != null ? q(s.wave, 0.1) : null, s.flipX, o.tag, who.id || who.seed]);
  return { id, kind: 'char', pos: [pos[0] + (o.still ? 0 : I.dx), pos[1] + (o.still ? 0 : I.bob * 0.3), pos[2]], h: o.h ?? 2.25, key, draw: (g) => drawChar(g, s), blobW: o.blobW };
};
const fx = (id, pos, h, key, draw, o = {}) => ({ id, kind: 'fx', pos: o.ground ? [pos[0], pos[1] + 0.38 * h, pos[2]] : pos, h, key, draw, yaw: o.yaw ?? 'full', soft: o.soft ?? true, res: o.res || [512, 512], unlit: o.unlit ?? true, order: o.order ?? 5, opacity: o.opacity });
const burst = (id, f, at, pos, h = 0.6, col = '#fff3b0', n = 14) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'b' + q(t, 0.04) + col, (g) => { g.save(); g.scale(g.canvas.width / 500, g.canvas.width / 500); fxBurst(new Pen(g), t, col); g.restore(); }); };
const puff = (id, f, at, pos, h = 0.5, n = 16) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'p' + q(t, 0.05), (g) => { g.save(); g.scale(g.canvas.width / 300, g.canvas.width / 300); fxPuff(new Pen(g), t); g.restore(); }); };
const mark = (id, txt, f, a, b, pos, h = 0.45, col = '#ffffff', font) => { if (f < a || f > b) return null; const s = back(win(f, a, a + 6)); return fx(id, pos, h * Math.max(0.05, s), 'm' + txt + col, (g) => drawText(g, txt, { col, font: font || 'bold 210px Arial Black, Arial, sans-serif', lw: 26 }), { order: 7 }); };
const dizzy = (id, f, a, b, pos, h = 0.5) => (f < a || f > b ? null : fx(id, pos, h, 'dz' + q((f - a) / 24 % 1, 0.04), (g) => { g.save(); g.scale(g.canvas.width / 420, g.canvas.width / 420); g.translate(0, 105); fxStars(new Pen(g), (f - a) / 24 % 1); g.restore(); }, { order: 7 }));

/** grip height curve (0 low .. 3 top) for pounding: a smooth up/down cycle peaking at `peaks`, resting low between */
const poundT = (f, period, lo, hi, ph = 0) => lo + (hi - lo) * (0.5 - 0.5 * Math.cos(((f + ph) / period) * Math.PI * 2));
const strike = (f, at, rise = 12, fall = 8, hi = 2.6, lo = 0.4) => (f < at - rise || f > at + fall ? null : f <= at ? lo + (hi - lo) * easeOut(win(f, at - rise, at)) : hi - (hi - lo) * ss(win(f, at, at + fall)));

// ---------------- world state ----------------
export const skyAt = (f) => (f < BLAG ? SKY0 : SKY0 + 160 * Math.pow(win(f, BLAG, 1560), 2.1) + 0.6 * easeOut(win(f, BLAG, BLAG + 6)));
export const worldAt = (f) => {
  const S = shotAt(f), w = { shot: S.id };
  w.night = S.light === 'night';
  w.skyY = S.id === 'thumb' ? SKY0 : skyAt(f);
  w.skyVis = !w.night && w.skyY < 140;
  w.skyOp = 1 - ss(win(w.skyY, 25, 120));
  w.mtns = w.night || w.skyY > 12;
  w.itemsUp = (f >= 945 && f < 9000) || S.id === 'thumb'; // comb + beads stuck on the sky
  w.grip = gripAt(f);
  return w;
};
/** grip t for Tuglibon's pestle (null = pestle resting in the mortar, not held) */
export const gripAt = (f) => {
  const S = shotAt(f);
  if (S.id === 'tug') return poundT(f, 26, 0.0, 1.4);
  if (S.id === 'tok1') { const s = strike(f, 627, 22, 12, 2.4, 0.3); return s ?? (f < 605 ? poundT(f, 26, 0.0, 1.4) : 0.3); }
  if (S.id === 'tok3') { for (const at of TOKS.slice(1)) { const s = strike(f, at, at === 790 ? 14 : 8, 7, 2.4, 0.4); if (s != null) return s; } return f < 750 ? 0.4 : 0.4; }
  if (S.id === 'hang') return f < 850 ? 0.4 : null;
  if (S.id === 'plead') return null;
  if (S.id === 'swing') { if (f < 1222) return null; if (f < 1290) return lerp(0.3, 1.0, ss(win(f, 1222, 1250))) - 0.6 * ss(win(f, 1262, 1290)); if (f <= BLAG) return lerp(0.4, 3.0, easeIn(win(f, 1290, BLAG))); return 3.0; }
  if (S.id === 'rise') return f < 1525 ? 3.0 : null;
  if (S.id === 'thumb') return 2.8;
  return null;
};

// ---------------- actors + fx per frame ----------------
const tugOut = (f) => (f >= 905 && f < 9000 || f >= 1594 ? OUT.tugBare : f >= 880 && f < 9000 ? OUT.tugMid : OUT.tug);
export const actorsAt = (f) => {
  const S = shotAt(f), A = [], add = (x) => x && A.push(x), w = worldAt(f);
  const T = [0, 0, 0];
  const grip = w.grip;
  const tugGrip = (o) => add(ch('tug', tugOut(f), f, T, { armL: gripArms(grip, true), armR: gripArms(grip), ...o }));
  const sky = w.skyY;
  // the comb + beads stuck on the sky underside
  if (w.itemsUp && w.skyVis && w.skyOp > 0.25) {
    const pop = S.id === 'thumb' ? 1 : back(win(f, 945, 953));
    A.push(fx('skyComb', [-0.32, sky - 0.07, 0.18], 0.3 * (1 + 0.12 * (sky - SKY0)) * Math.max(0.05, pop), 'sc', (g) => { const p = new Pen(g), s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); comb(p, 256, 256, 400, '#e9c46a', 9); g.restore(); }, { order: 6, opacity: w.skyOp }));
    A.push(fx('skyBeads', [0.38, sky - 0.07, 0.22], 0.34 * (1 + 0.12 * (sky - SKY0)) * Math.max(0.05, pop), 'sb', (g) => { const p = new Pen(g), s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); beads(p, 256, 150, 360, 1.0, 6); g.restore(); }, { order: 6, opacity: w.skyOp }));
  }
  if (w.night) {
    const tw = S.id === 'final' ? ss(win(f, 1890, 1915)) * (1 - 0.5 * ss(win(f, 1915, 1937))) : 0;
    A.push(fx('stars', STARS, 300, 'st' + q(f / 30, 0.1) + q(tw, 0.05), (g) => drawStars(g, { t: f / 30, tw, n: 160 }), { order: 3, res: [1024, 1024] }));
    const k = S.id === 'hook' ? ss(win(f, 70, 115)) : 1;
    const mg = S.id === 'final' ? 0.85 + 0.15 * ss(win(f, 1740, 1790)) : 0.85, mh = S.id === 'final' ? 16 * (1 + 0.15 * back(win(f, 1755, 1775)) - 0.15 * ss(win(f, 1775, 1800))) : 16;
    A.push(fx('moon', MOON, mh, 'mn' + q(k, 0.05) + q(mg, 0.05), (g) => drawMoonComb(g, { k, glowA: mg }), { order: 4 }));
    if (S.id === 'hook') add(burst('mb', f, 112, [MOON[0], MOON[1], MOON[2] + 1], 20, '#fff3b0', 16));
    if (S.id === 'final') { }
  }
  switch (S.id) {
    case 'hook': {
      add(ch('kid', OUT.kid, f, [0.6, 0, 2.4], { expr: f > 60 ? 'relief_open' : 'smile', armL: ARM.hang, armR: f > 60 ? ARM.point : ARM.hang, headTilt: -4, look: 0.2 }));
      add(ch('v2', OUT.vil2, f, [-0.5, 0, 1.6], { expr: 'smile_closed', armL: ARM.hip, armR: ARM.hang }));
      break;
    }
    case 'lowsky': {
      const touch = f >= 250;
      add(ch('v1', OUT.vil1, f, [2.4, touch ? 0.08 : 0, 1.2], { h: touch ? 2.45 : 2.25, expr: f > 300 ? 'grin' : touch ? 'smile' : 'smile', armR: touch ? ARM.touchUp : ARM.hang, armL: ARM.hip, still: touch }));
      add(ch('v2', OUT.vil2, f, [0.9, 0, -0.6], { expr: 'smile_closed', armL: ARM.hip, armR: ARM.hang }));
      add(ch('kid', OUT.kid, f, [3.7, 0, 0.2], { expr: f > 255 ? 'grin' : 'smile', armL: ARM.cheer, armR: f > 255 ? ARM.cheer : ARM.hang }));
      add(ch('tugBg', OUT.tug, f, [-1.2, 0, -1.4], { expr: 'smile', armL: gripArms(poundT(f, 26, 0.15, 1.1), true), armR: gripArms(poundT(f, 26, 0.15, 1.1)) }));
      add(burst('touch', f, 256, [2.55, SKY0 - 0.08, 1.25], 0.35, '#ffffff', 10));
      break;
    }
    case 'tug': tugGrip({ expr: f < 470 ? 'smile' : 'smile_closed', look: -0.2 }); break;
    case 'tok1': {
      const hit = f >= 627;
      tugGrip({ expr: hit ? (f < 650 ? 'shock' : 'stern') : 'smile', look: hit ? 0.5 : 0, headTilt: hit && f > 650 ? -6 : 0 });
      add(burst('t1', f, 627, [MORTAR[0], SKY0 - 0.05, MORTAR[2] + 0.05], 0.5, '#ffffff', 12));
      add(mark('tok', 'TOK!', f, 627, 652, [MORTAR[0] + 0.55, SKY0 - 0.25, MORTAR[2]], 0.32, '#ffe066'));
      add(puff('dust1', f, 630, [MORTAR[0], SKY0 - 0.2, MORTAR[2] + 0.05], 0.4, 22));
      break;
    }
    case 'tok3': {
      const bonk = f >= 790;
      tugGrip({ expr: bonk ? (f < 800 ? 'pained' : 'dazed') : f > 700 ? 'stern' : 'stern', tilt: bonk ? 4 * Math.sin(f * 0.25) : 0, armR: bonk && f > 800 ? ARM.rub : gripArms(grip) });
      for (const [i, at] of TOKS.slice(1, 4).entries()) { add(burst('tb' + i, f, at, [MORTAR[0], SKY0 - 0.05, MORTAR[2] + 0.05], 0.42, '#ffffff', 10)); add(mark('tk' + i, 'TOK!', f, at, at + 12, [MORTAR[0] + (i - 1) * 0.35, SKY0 - 0.28 - 0.05 * i, MORTAR[2]], 0.24, '#ffe066')); }
      add(burst('bonk', f, 790, [0.02, 1.85, 0.1], 0.5, '#ffffff', 10));
      add(dizzy('dz', f, 798, 840, [0.0, 1.92, 0.12], 0.42));
      break;
    }
    case 'hang': {
      const nk = f >= 848 && f < 880, cm = f >= 885 && f < 905, upA = f >= 920 && f < 950;
      const armL = upA ? ARM.touchUp : f < 850 ? gripArms(0.4, true) : nk ? ARM.chin : f < 920 ? ARM.holdHi : ARM.hip;
      const armR = upA ? ARM.touchUp : f < 850 ? gripArms(0.4) : nk ? ARM.chin : cm ? ARM.rub : f < 920 ? ARM.holdHi : ARM.hip;
      add(ch('tug', tugOut(f), f, [T[0], upA ? 0.05 : 0, T[2]], { expr: upA ? 'smile' : f > 955 ? 'smile_closed' : 'smile', armL, armR, propL: f >= 880 && f < 945 ? 'beads' : undefined, propR: f >= 905 && f < 945 ? 'comb' : undefined, look: upA ? 0.3 : 0 }));
      add(burst('hs', f, 946, [0.02, SKY0 - 0.08, 0.2], 0.55, '#fff3b0', 12));
      break;
    }
    case 'plead': {
      if (f < 1163) add(ch('tug', OUT.tugBare, f, T, { expr: f < 1090 ? 'smile' : 'grin', armL: ARM.pray, armR: ARM.pray, headTilt: -3, look: 0.2 }));
      else {
        A.push(fx('dots', [0.05, SKY0 - 0.35, 0.35], 0.3, 'd' + Math.min(3, Math.floor((f - 1168) / 8)), (g) => { if (f >= 1168) drawDots(g); }, { order: 7 }));
      }
      break;
    }
    case 'swing': {
      const blag = f >= BLAG;
      const crouch = f > 1262 && f < BLAG ? 0.05 * ss(win(f, 1262, 1290)) : 0;
      add(ch('tug', OUT.tugBare, f, [T[0], -crouch, T[2]], { expr: blag ? 'grin' : f > 1262 ? 'stern' : 'stern', armL: grip == null ? ARM.hip : gripArms(grip, true), armR: grip == null ? ARM.hip : gripArms(grip), still: f > 1290 }));
      add(burst('blag', f, BLAG, [MORTAR[0], SKY0 + 0.05, MORTAR[2] + 0.05], 1.6, '#ffffff', 16));
      add(mark('blag', 'BLAG!', f, BLAG, 1330, [MORTAR[0] + 0.7, SKY0 - 0.35, MORTAR[2]], 0.5, '#ffe066'));
      add(puff('bp', f, BLAG + 2, [MORTAR[0], SKY0 - 0.15, MORTAR[2] + 0.05], 1.0, 22));
      break;
    }
    case 'rise': {
      const sad = f >= 1525;
      add(ch('tug', OUT.tugBare, f, T, { expr: sad ? (f > 1555 ? 'nervous' : 'shock') : f > 1400 ? 'shock' : 'grin', armL: sad ? ARM.touchUp : gripArms(3, true), armR: sad ? ARM.hang : gripArms(3), look: 0.3, headTilt: -4 }));
      if (!sad) { add(ch('v1', OUT.vil1, f, [2.3, 0, 1.4], { expr: 'shock', armL: ARM.up, armR: ARM.up })); add(ch('kid', OUT.kid, f, [-1.6, 0, 1.0], { expr: 'relief_open', armL: ARM.cheer, armR: ARM.cheer })); }
      break;
    }
    case 'thumb': {
      add(ch('tug', OUT.tugBare, 9000, T, { expr: 'shock', armL: gripArms(2.8, true), armR: gripArms(2.8), still: true, noBlink: true, look: 0.3 }));
      A.push(fx('tglow', [0.03, SKY0 - 0.12, 0.2], 1.3, 'tg', (g) => { const s = g.canvas.width, gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2); gr.addColorStop(0, 'rgba(255,240,180,0.9)'); gr.addColorStop(0.45, 'rgba(255,220,140,0.45)'); gr.addColorStop(1, 'rgba(255,220,140,0)'); g.fillStyle = gr; g.fillRect(0, 0, s, s); }, { order: 5 }));
      A.push(fx('tburst', [0.03, SKY0 - 0.12, 0.18], 1.2, 'tb', (g) => { g.save(); g.scale(g.canvas.width / 500, g.canvas.width / 500); fxBurst(new Pen(g), 0.55, '#fff3b0', 12); g.restore(); }, { order: 4 }));
      break;
    }
    case 'final': {
      add(ch('tug', OUT.tugBare, f, T, { expr: f < 1650 ? 'smile' : 'smile_closed', armL: ARM.hip, armR: f > 1640 ? ARM.point : ARM.hang, headTilt: -4, look: 0.3 }));
      add(ch('kid', OUT.kid, f, [0.75, 0, 0.6], { expr: 'relief_open', armL: ARM.hang, armR: ARM.hang, headTilt: -4 }));
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
