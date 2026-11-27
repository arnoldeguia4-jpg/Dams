// "Why Is Super Glue So Strong?": shots, cameras, actors, fx.
import { ss, easeOut, easeIn, back, spring, win, clamp, lerp, kick, idle, blinkAt, q } from './engine.js';
import { OUT, ARM, drawChar, drawText, Pen, fxBurst, fxPuff, drawBubble, drawDrop, drawBulb } from './cast.js';

export const TOTAL = 1688;
export const FLASHES = [[163, 170], [782, 789], [1288, 1295], [1476, 1483]];
export const STING = 1479;
const JX = 150, SX = -150, FX = 300;
const C = (f, pos, look, fov = 40, o = {}) => ({ f, pos, look, fov, ...o });

export const SHOTS = [
  { id: 'hook', a: 0, b: 126, light: 'lab', at: [0, 1, 0], span: 10,
    cam: [C(0, [-1.3, 1.6, 3.6], [-1.4, 1.5, 0]), C(126, [-1.3, 1.6, 2.9], [-1.4, 1.55, 0])], kicks: [[78, 0.03], [128, 0.05]], dof: () => ({ c: 4, pt: [-1.4, 1.5, 0.3] }) },
  { id: 'twice', a: 127, b: 162, light: 'lab', at: [0, 1, 0], span: 10,
    cam: [C(127, [-1.3, 1.6, 2.9], [-1.4, 1.55, 0]), C(162, [-1.3, 1.6, 2.7], [-1.4, 1.55, 0])], kicks: [[128, 0.05]], dof: () => ({ c: 4, pt: [-1.4, 1.5, 0.3] }) },
  { id: 'war', a: 163, b: 252, light: 'golden', at: [FX, 1, 0], span: 16,
    cam: [C(163, [FX + 0.5, 1.7, 6], [FX, 1.7, 0]), C(252, [FX + 0.4, 1.65, 4.8], [FX, 1.7, 0])], dof: () => ({ c: 0 }) },
  { id: 'coover', a: 253, b: 423, light: 'lab', at: [0, 1, -1], span: 12,
    cam: [C(253, [1.6, 2.1, 7.5], [1.4, 1.6, -1.5]), C(423, [1.8, 1.8, 5.2], [1.8, 1.5, -1.5])], dof: () => ({ c: 0 }) },
  { id: 'tested', a: 424, b: 547, light: 'lab', at: [0, 1, -1], span: 10,
    cam: [C(424, [-1.1, 1.65, 3.4], [-1.3, 1.5, -1]), C(547, [-1.1, 1.65, 2.9], [-1.3, 1.5, -1])], kicks: [[517, 0.02]], dof: () => ({ c: 0 }) },
  { id: 'stuck', a: 548, b: 711, light: 'lab', at: [0, 1, -1], span: 10,
    cam: [C(548, [-1.1, 1.7, 3.4], [-1.3, 1.6, -0.6]), C(711, [-1.1, 1.75, 2.6], [-1.3, 1.65, -0.6])], kicks: [[603, 0.03], [627, 0.03], [660, 0.04]], dof: () => ({ c: 0 }) },
  { id: 'rejected', a: 712, b: 781, light: 'lab', at: [0, 1, -1], span: 10,
    cam: [C(712, [-1.0, 1.8, 4.2], [-1.2, 1.8, -0.6]), C(781, [-1.0, 1.8, 3.8], [-1.2, 1.8, -0.6])], kicks: [[748, 0.07]], dof: () => ({ c: 0 }) },
  { id: 'jet', a: 782, b: 946, light: 'day', at: [JX, 1, -2], span: 18,
    cam: [C(782, [JX + 1.0, 2.2, 10.5], [JX + 0.6, 1.7, -2.5]), C(946, [JX + 1.2, 2.1, 9.0], [JX + 0.9, 1.7, -2.5])], dof: () => ({ c: 0 }) },
  { id: 'glued', a: 947, b: 1043, light: 'day', at: [JX, 1, -2], span: 14,
    cam: [C(947, [JX + 2.6, 2.4, 2.4], [JX + 1.6, 2.0, -2.4]), C(1043, [JX + 2.4, 2.4, 1.8], [JX + 1.6, 2.0, -2.4])], kicks: [[975, 0.05]], dof: () => ({ c: 0 }) },
  { id: 'think', a: 1044, b: 1219, light: 'lab', at: [0, 1, -1], span: 10,
    cam: [C(1044, [-1.3, 1.75, 4.0], [-1.3, 1.85, -0.6]), C(1219, [-1.3, 1.8, 3.0], [-1.3, 1.95, -0.6])], kicks: [[1125, 0.04], [1221, 0.05]], dof: () => ({ c: 0 }) },
  { id: 'product', a: 1220, b: 1287, light: 'lab', at: [0, 1, -1], span: 10,
    cam: [C(1220, [-1.3, 1.8, 3.0], [-1.3, 1.95, -0.6]), C(1287, [-1.3, 1.8, 2.7], [-1.3, 2.0, -0.6])], dof: () => ({ c: 0 }) },
  { id: 'store', a: 1288, b: 1379, light: 'day', at: [SX, 1, -1], span: 14,
    cam: [C(1288, [SX, 2.0, 6.8], [SX, 2.0, -2.5]), C(1379, [SX, 2.0, 5.4], [SX, 1.95, -2.5])], dof: () => ({ c: 0 }) },
  { id: 'drop', a: 1380, b: 1475, light: 'lab', at: [0, 1, 0], span: 10,
    cam: [C(1380, [-1.0, 1.45, 0.9], [-1.0, 1.15, -1.6]), C(1475, [-1.0, 1.4, 0.5], [-1.0, 1.15, -1.6])], kicks: [[1420, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'thatswhy', a: 1476, b: TOTAL - 1, light: 'golden', at: [SX, 1, 0], span: 14,
    cam: [C(1476, [SX + 0.6, 1.7, 6.2], [SX + 0.1, 1.9, 0]), C(1580, [SX + 0.4, 1.75, 4.6], [SX + 0.1, 1.95, 0]), C(TOTAL, [SX + 0.3, 1.8, 3.6], [SX + 0.1, 2.0, 0], 40, { roll: 3 })], kicks: [[1553, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'thumb', a: 9000, b: 9000, light: 'lab', at: [0, 1, -1], span: 10,
    cam: [C(9000, [-1.2, 1.75, 3.4], [-1.3, 1.8, -0.6], 46)], dof: () => ({ c: 0 }) },
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
const stamp = (id, f, at, b, pos, h = 1.0) => { if (f < at || f > b) return null; const s = 1 + 1.5 * (1 - easeOut(win(f, at, at + 6))); return fx(id, pos, h * s, 'st' + q(s, 0.05), (g) => { const w = g.canvas.width; g.save(); g.translate(w / 2, w / 2); g.rotate(-0.25); g.strokeStyle = '#d0303a'; g.lineWidth = 22; g.strokeRect(-230, -80, 460, 160); g.fillStyle = '#d0303a'; g.font = 'bold 110px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('REJECTED', 0, 6); g.restore(); }, { soft: false }); };
const shake = (f, at, n = 10, a = 6) => (f >= at && f < at + n ? a * Math.sin((f - at) * 2.5) * (1 - (f - at) / n) : 0);

export const worldAt = (f) => ({ canopyStuck: f >= 972 });

export const actorsAt = (f) => {
  const S = shotAt(f), A = [], add = (x) => x && A.push(x);
  switch (S.id) {
    case 'hook':
      add(ch('cv', OUT.coover, f, [-1.4, 0, 0.3], { expr: f > 76 ? 'pained' : 'neutral', armR: ARM.holdHi, propR: 'glue', armL: ARM.hip }));
      add(mark('q', '?', f, 30, 126, [-0.8, 2.55, 0.4], 0.5, '#ffe066'));
      add(stamp('r1', f, 78, 126, [-1.4, 1.55, 0.6], 0.9));
      break;
    case 'twice':
      add(ch('cv', OUT.coover, f, [-1.4, 0, 0.3], { expr: 'shock', armR: ARM.holdHi, propR: 'glue', armL: ARM.up }));
      add(stamp('r1', f, 120, 162, [-1.65, 1.3, 0.6], 0.8)); add(stamp('r2', f, 128, 162, [-1.15, 1.85, 0.65], 0.8));
      add(mark('x2', 'x2', f, 130, 162, [-0.7, 2.45, 0.5], 0.4, '#ffe066'));
      break;
    case 'war':
      add(mark('yr', '1942', f, 170, 250, [FX, 3.2, 0.3], 1.2, '#ffe066'));
      add(ch('sd', OUT.soldier, f, [FX, 0, 0.2], { expr: 'nervous', armR: ARM.holdHi, propR: 'scope', armL: ARM.hip }));
      break;
    case 'coover':
      add(ch('cv', OUT.coover, f, [1.6, 0, -0.9], { expr: 'smile', armR: f > 380 ? ARM.point : ARM.hip, armL: ARM.hip, facing: 1 }));
      add(mark('nm', 'HARRY COOVER', f, 300, 423, [1.5, 2.75, -0.6], 1.9, '#ffe066'));
      add(mark('gs', 'GUN SIGHT', f, 380, 423, [2.4, 1.95, -1.6], 1.1, '#ffffff'));
      break;
    case 'tested':
      add(ch('cv', OUT.coover, f, [-1.3, 0, -0.9], { expr: f > 516 ? 'nervous' : 'smile', armR: ARM.holdHi, propR: 'glue', armL: ARM.hip }));
      add(mark('cy', 'CYANOACRYLATE', f, 450, 515, [-1.3, 2.55, -0.7], 1.0, '#ffe066'));
      add(mark('pr', '?', f, 517, 547, [-0.7, 2.4, -0.7], 0.45, '#ff7060'));
      break;
    case 'stuck': {
      const s3 = f >= 600;
      add(ch('cv', OUT.coover, f, [-1.3, 0, -0.5], { expr: f > 655 ? 'pained' : 'shock', armR: s3 ? ARM.up : ARM.holdHi, propR: s3 ? 'stuck' : 'glue', armL: ARM.shake, tilt: shake(f, 603) + shake(f, 627) + shake(f, 660) }));
      add(burst('t1', f, 603, [-0.7, 2.3, -0.3], 0.5)); add(burst('t2', f, 627, [-0.9, 2.5, -0.3], 0.5)); add(burst('t3', f, 660, [-0.8, 2.4, -0.3], 0.6, '#ff9a8a'));
      add(mark('st', 'STUCK!', f, 552, 600, [-1.9, 2.45, -0.4], 0.6, '#ffe066'));
      break;
    }
    case 'rejected':
      add(ch('cv', OUT.coover, f, [-1.2, 0, -0.5], { expr: 'pained', armR: ARM.up, propR: 'stuck', armL: ARM.hang, headTilt: -6 }));
      add(mark('ts', 'TOO STICKY', f, 714, 781, [-1.2, 2.7, -0.3], 0.9, '#ffe066'));
      add(stamp('rj', f, 746, 781, [-1.2, 1.5, 0.2], 1.3));
      break;
    case 'jet': {
      add(mark('yr', '1951', f, 790, 870, [JX + 0.8, 4.0, -2], 1.4, '#ffe066'));
      add(ch('cv', OUT.coover, f, [JX + 2.0, 0, 1.4], { expr: 'smile', armR: ARM.holdHi, propR: 'glue', armL: ARM.hip, facing: -1 }));
      add(ch('c2', OUT.chem2, f, [JX - 0.4, 0, 1.5], { expr: 'smile', armR: ARM.point, armL: ARM.hip, facing: 1 }));
      add(mark('cn', 'CANOPY', f, 866, 946, [JX + 1.6, 3.0, -2.2], 1.2, '#ffffff'));
      break;
    }
    case 'glued':
      add(ch('c2', OUT.chem2, f, [JX + 1.4, 0, -1.2], { expr: f > 972 ? 'shock' : 'smile', armR: ARM.reach, armL: f > 972 ? ARM.up : ARM.hip, facing: 1, tilt: f > 972 ? shake(f, 975, 20, 8) : 0 }));
      add(burst('gl', f, 973, [JX + 1.8, 2.3, -2.2], 0.9, '#ffe066')); add(mark('gu', 'GLUED!', f, 980, 1043, [JX + 1.5, 3.1, -1.8], 0.8, '#ff7060'));
      break;
    case 'think': {
      const idea = f >= 1122;
      add(ch('cv', OUT.coover, f, [-1.3, 0, -0.6], { expr: idea ? 'grin' : 'neutral', armR: idea ? ARM.up : ARM.chin, armL: ARM.hip, propR: undefined }));
      if (idea) A.push(fx('bulb', [-1.3, 2.75, -0.4], 0.75 * back(win(f, 1122, 1132)), 'bulb' + q(back(win(f, 1122, 1132)), 0.1), (g) => drawBulb(g), { soft: false }));
      add(mark('wt', 'WAIT...', f, 1124, 1148, [-0.6, 2.5, -0.4], 0.6, '#ffffff'));
      add(mark('pb', 'STICKY = PROBLEM?', f, 1150, 1219, [-1.3, 3.35, -0.4], 1.1, '#ff9a8a'));
      break;
    }
    case 'product':
      add(ch('cv', OUT.coover, f, [-1.3, 0, -0.6], { expr: 'grin', armR: ARM.holdHi, propR: 'glue', armL: ARM.cheer }));
      add(mark('pd', 'STICKY = PRODUCT!', f, 1220, 1287, [-1.3, 3.0, -0.4], 1.1, '#ffe066')); add(burst('pb', f, 1222, [-1.3, 2.6, -0.3], 1.2, '#ffe066', 16));
      break;
    case 'store':
      for (let i = 0; i < 3; i++) add(ch('sh' + i, { o: { ...OUT.chem2.o, jacket: ['#c25a7a', '#5a8fc2', '#d9a441'][i], hat: 'hair', hair: ['#2a1d16', '#c9a46a', '#5a3b2a'][i] }, seed: 90 + i }, f, [SX - 1.8 + i * 1.8, 0, 0.6 + (i % 2) * 0.3], { expr: 'grin', armR: i === 1 ? ARM.holdHi : ARM.point, propR: i === 1 ? 'glue' : undefined, armL: ARM.hip, facing: i === 0 ? 1 : i === 2 ? -1 : 0 }));
      add(burst('sb', f, 1334, [SX, 3.5, -2.5], 1.6, '#ffe066', 16));
      break;
    case 'drop': {
      const t = win(f, 1382, 1410);
      A.push(fx('dp', [-1.0, 1.85 - 0.6 * easeIn(t), -1.55], 0.18, 'dp', (g) => drawDrop(g, 0), { soft: false }));
      add(burst('db', f, 1414, [-1.0, 1.2, -1.5], 0.6, '#ffffff'));
      add(mark('sc', 'SECONDS!', f, 1430, 1475, [-1.0, 1.75, -1.5], 0.8, '#ffe066'));
      A.push(fx('pcs', [-1.0, 1.1, -1.6], 0.5, 'pcs' + (f >= 1414 ? 1 : 0), (g) => { const w = g.canvas.width, p = new Pen(g); g.save(); g.scale(w / 512, w / 512); const gap = f >= 1414 ? 0 : 40; p.poly([[60, 200], [250 - gap, 200], [250 - gap, 330], [60, 330]], '#c87a3a', 8); p.poly([[262 + gap, 200], [452, 200], [452, 330], [262 + gap, 330]], '#c87a3a', 8); g.restore(); }, { soft: false }));
      break;
    }
    case 'thatswhy':
      add(ch('cv', OUT.coover, f, [SX + 0.1, 0, 0.3], { expr: 'grin', armR: ARM.holdHi, propR: 'glue', armL: f > 1553 ? ARM.cheer : ARM.hip }));
      add(mark('fl', 'FAILURE', f, 1553, 1588, [SX + 0.1, 2.5, 0.6], 0.65, '#ff7060'));
      add(mark('ok', 'THE POINT!', f, 1600, TOTAL, [SX + 0.1, 2.5, 0.6], 0.75, '#ffe066'));
      add(burst('end', f, 1600, [SX + 0.1, 2.5, 0.5], 1.2, '#ffe066', 18));
      break;
    case 'thumb':
      add(ch('cv', OUT.coover, 9000, [-1.3, 0, -0.6], { expr: 'shock', armR: ARM.up, propR: 'stuck', armL: ARM.shake, still: true, noBlink: true }));
      break;
  }
  return A;
};

export const lookAt = (f) => {
  let flash = 0;
  for (const [a, b] of FLASHES) if (f >= a && f <= b) { const m = (a + b) / 2; flash = Math.max(flash, 1 - Math.abs(f - m) / ((b - a) / 2 + 0.5)); }
  return { flash: clamp(flash) * 0.95 };
};
