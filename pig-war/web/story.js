// Story timeline for "The War That Killed Only a Pig" (San Juan Island, 1859): shots timed to the Scribe word frames of take 2 (TOTAL 2021).
import { ss, easeOut, back, win, clamp, lerp, idle, blinkAt, q } from './engine.js';
import { OUT, ARM, drawChar, drawText, drawPig, drawMap, drawHorse, drawCalendar, drawBang, drawDecree, glow, Pen, fxBurst, fxPuff, fxStars } from './cast.js';
import { KX, PATCH, CAMP } from './world.js';

export const TOTAL = 2021;
export const FLASHES = [[946, 954], [1545, 1553], [1751, 1759]];
export const MUSIC_STOP = 1878;
const PIG = [PATCH[0] + 0.4, 0, PATCH[2] + 0.9];

// ---------------- shots ----------------
const k = (f, pos, look, fov = 42, o = {}) => ({ f, pos, look, fov, ...o });
const D = (pt, c = 5) => () => ({ c, pt });
export const SHOTS = [
  { id: 'hook', a: 0, b: 198, light: 'day', at: [2, 1, -2], span: 12, cam: [k(0, [2.6, 2.2, 6.0], [2.5, 1.0, -2.0], 46), k(198, [2.6, 1.4, 3.4], [2.6, 0.9, -1.9], 44)], kicks: [[156, 0.04]], dof: D([2.6, 0.6, -2.4], 3) },
  { id: 'map', a: 199, b: 322, light: 'day', at: [2, 1, -2], span: 12, cam: [k(199, [2.4, 1.6, 3.0], [2.4, 1.6, -2], 44), k(322, [2.4, 1.6, 2.6], [2.4, 1.6, -2], 42)], dof: () => ({ c: 0 }) },
  { id: 'cutlar', a: 323, b: 420, light: 'day', at: [-3, 1, 0], span: 10, cam: [k(323, [-1.4, 1.5, -3.2], [-2.6, 1.3, 0.6], 42), k(420, [-1.6, 1.5, -2.6], [-2.6, 1.35, 0.6], 40)], dof: D([-2.6, 1.4, 0.6], 4) },
  { id: 'company', a: 421, b: 491, light: 'day', at: [10, 1, -2], span: 10, cam: [k(421, [10.6, 1.5, 2.4], [10, 1.1, -2], 44), k(491, [10.4, 1.5, 1.8], [10, 1.1, -2], 42)], dof: D([10, 1.2, -2], 3) },
  { id: 'morning', a: 492, b: 627, light: 'golden', at: [2, 1, -2], span: 10, cam: [k(492, [3.2, 1.1, 2.6], [2.6, 0.5, -1.7], 42), k(560, [3.1, 1.1, 2.2], [2.6, 0.5, -1.7], 42), k(565, [0.9, 1.6, 3.2], [0.3, 1.3, -0.6], 44), k(627, [0.9, 1.6, 2.8], [0.3, 1.3, -0.6], 44)], dof: D([2.6, 0.5, -2.4], 4) },
  { id: 'shot', a: 628, b: 670, light: 'golden', at: [1, 1, -1], span: 10, cam: [k(628, [-0.3, 1.5, 3.0], [0.8, 1.1, -1.2], 46), k(670, [-0.3, 1.5, 2.7], [0.8, 1.1, -1.2], 46)], kicks: [[655, 0.08]], dof: D([0.2, 1.3, -0.6], 4) },
  { id: 'money', a: 671, b: 827, light: 'golden', at: [1, 1, -1], span: 10, cam: [k(671, [0.85, 1.5, 4.0], [0.85, 1.3, -1.0], 46), k(827, [0.85, 1.5, 3.5], [0.85, 1.35, -1.0], 44)], kicks: [[772, 0.04]], dof: D([0.9, 1.35, -1.0], 4) },
  { id: 'march', a: 828, b: 945, light: 'day', at: [CAMP[0], 1, 0], span: 16, cam: [k(828, [CAMP[0] - 3.5, 1.3, 4.8], [CAMP[0] - 0.5, 1.2, 0], 46), k(945, [CAMP[0] - 2.5, 1.4, 4.4], [CAMP[0] + 0.5, 1.2, 0], 44)], dof: D([CAMP[0], 1.2, 0], 2) },
  { id: 'ships', a: 946, b: 1037, light: 'day', at: [0, 1, -30], span: 40, cam: [k(946, [-4, 10, -8], [-6, 2, -135], 66), k(1037, [-4, 9, -14], [-6, 2.5, -135], 62)], kicks: [[1005, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'standoff', a: 1038, b: 1290, light: 'day', at: [CAMP[0], 1, -10], span: 40, cam: [k(1038, [CAMP[0] + 1, 2.4, 3.0], [CAMP[0] + 1, 1.0, -3], 46), k(1160, [CAMP[0] + 2, 3.6, 4.0], [CAMP[0] + 6, 2, -30], 50), k(1290, [CAMP[0] + 3, 4.6, 5.5], [CAMP[0] + 8, 2, -40], 52)], dof: () => ({ c: 0 }) },
  { id: 'ready', a: 1291, b: 1386, light: 'day', at: [CAMP[0], 1, -2], span: 10, cam: [k(1291, [CAMP[0] + 0.4, 1.55, 0.6], [CAMP[0] + 0.1, 1.5, -2.2], 40), k(1343, [CAMP[0] + 0.35, 1.55, 0.3], [CAMP[0] + 0.1, 1.5, -2.2], 40), k(1344, [CAMP[0] + 2.4, 2.0, 3.8], [CAMP[0] + 1, 1.2, -2], 46), k(1386, [CAMP[0] + 2.6, 2.1, 4.2], [CAMP[0] + 1, 1.2, -2], 46)], dof: D([CAMP[0] + 0.1, 1.5, -2.2], 4) },
  { id: 'admiral', a: 1387, b: 1547, light: 'day', at: [6, 1, -6], span: 12, cam: [k(1387, [6.5, 1.6, -3.0], [6.0, 1.45, -6.4], 42), k(1547, [6.4, 1.6, -3.4], [6.0, 1.5, -6.4], 40)], dof: D([6, 1.5, -6.4], 3) },
  { id: 'party', a: 1548, b: 1753, light: 'golden', at: [14, 1, 2], span: 12, cam: [k(1548, [14.2, 1.9, 6.4], [14, 1.2, 2], 46), k(1627, [14.1, 1.8, 5.8], [14, 1.25, 2], 44), k(1628, [14.1, 1.8, 5.8], [14, 1.25, 2], 44), k(1715, [14.0, 1.7, 5.4], [14, 1.2, 2], 44), k(1716, [16.5, 1.4, 7.5], [14, 0.8, 4.5], 46), k(1753, [16.5, 1.4, 7.2], [14, 0.8, 4.5], 46)], dof: () => ({ c: 0 }) },
  { id: 'kaiser', a: 1754, b: 1877, light: 'lab', at: [KX, 1, -2], span: 10, cam: [k(1754, [KX + 0.3, 1.7, 1.8], [KX, 1.45, -2.6], 42), k(1877, [KX + 0.25, 1.65, 1.2], [KX, 1.45, -2.6], 40)], kicks: [[1838, 0.06]], dof: D([KX, 1.5, -2.6], 4) },
  { id: 'thumb', a: 9000, b: 9000, light: 'day', at: [2, 1, -2], span: 12, cam: [k(9000, [2.6, 1.3, 2.6], [2.55, 0.9, -1.8], 44)], dof: D([2.6, 0.6, -2.4], 3) },
  { id: 'twist', a: 1878, b: TOTAL - 1, light: 'golden', at: [2, 1, -2], span: 10, cam: [k(1878, [2.7, 1.3, 3.2], [2.6, 0.8, -1.7], 44), k(1950, [2.7, 1.5, 2.2], [2.6, 1.3, -1.7], 40, { ease: ss }), k(TOTAL, [2.7, 1.55, 1.6], [2.6, 1.5, -1.7], 34, { roll: 3 })], dof: D([2.6, 1.3, -2.3], 3) },
];
export const shotAt = (f) => SHOTS.find((s) => f >= s.a && f < s.b + 1) || SHOTS[SHOTS.length - 1];

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
const puff = (id, f, at, pos, h = 0.5, n = 16) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'p' + q(t, 0.05), (g) => { g.save(); g.scale(g.canvas.width / 300, g.canvas.width / 300); fxPuff(new Pen(g), t); g.restore(); }, { order: 8 }); };
const mark = (id, txt, f, a, b, pos, h = 0.45, col = '#ffffff') => { if (f < a || f > b) return null; const s = back(win(f, a, a + 6)); return fx(id, pos, h * Math.max(0.05, s), 'm' + txt + col, (g) => drawText(g, txt, { col, font: 'bold 260px Georgia, serif', lw: 22 }), { order: 8, res: [1024, 512] }); };
const glowFx = (id, pos, h, a = 0.8, rgb = '255,226,140', order = 4) => fx(id, pos, h, 'gl' + q(a, 0.05) + rgb, (g) => glow(g, rgb, a), { order });
const pig = (id, f, pos, o = {}) => fx(id, pos, o.h ?? 0.9, 'pig' + q(o.munch || 0, 0.1) + q(o.angel || 0, 0.1) + (o.facing || 1), (g) => drawPig(g, o), { ground: o.float ? false : true, order: 5 });
const us = (k, f, pos, o = {}) => ch('us' + k, OUT.usa(k), f, pos, o);
const gb = (k, f, pos, o = {}) => ch('gb' + k, OUT.brit(k), f, pos, o);

// ---------------- world state ----------------
export const worldAt = (f) => {
  const S = shotAt(f);
  return { shot: S.id, partyOn: f >= 1548 && f < 9000, flagWave: Math.sin(f * 0.2) };
};

// ---------------- actors + fx per frame ----------------
export const actorsAt = (f) => {
  const S = shotAt(f), A = [], add = (x) => { if (Array.isArray(x)) x.forEach((y) => y && A.push(y)); else if (x) A.push(x); };
  switch (S.id) {
    case 'hook': case 'thumb': {
      const F = S.id === 'thumb' ? 9000 : f;
      add(us(0, F, [PATCH[0] - 0.9, 0, PATCH[2] - 0.3], { expr: 'stern', armL: ARM.hang, armR: ARM.hang, facing: 1, look: 0.4 }));
      add(gb(0, F, [PATCH[0] + 1.9, 0, PATCH[2] - 0.4], { expr: 'stern', armL: ARM.hang, armR: ARM.hang, facing: -1, look: -0.4 }));
      add(pig('pig', F, PIG, { munch: 0.5 + 0.5 * Math.sin(F * 0.3), h: S.id === 'thumb' ? 0.85 : 0.75 }));
      if (S.id === 'hook') add(burst('pb', f, 154, [PIG[0], 0.6, PIG[2] + 0.1], 0.9));
      if (S.id === 'hook') add(mark('q', '?!', f, 156, 198, [PIG[0], 1.35, PIG[2]], 0.38, '#ffe066'));
      break;
    }
    case 'map': {
      add(fx('map', [2.4, 1.6, -2], 2.2, 'map' + q(ss(win(f, 220, 240)), 0.1), (g) => drawMap(g, { mark: ss(win(f, 220, 240)) }), { res: [1024, 1024], order: 6, yaw: 0, soft: false }));
      break;
    }
    case 'cutlar': {
      add(ch('cut', OUT.cutlar, f, [-2.6, 0, 0.6], { expr: 'smile', armL: ARM.hip, armR: f > 360 ? ARM.cheer : ARM.hang, facing: 0, look: 0 }));
      break;
    }
    case 'company': {
      add(ch('gri', OUT.griffin, f, [9.2, 0, -2.2], { expr: 'smile', armL: ARM.hip, armR: ARM.point, facing: 1 }));
      add(pig('p1', f, [10.4, 0, -2.0], { munch: 0.5 + 0.5 * Math.sin(f * 0.3), facing: -1, h: 0.6 }));
      add(pig('p2', f, [11.0, 0, -2.6], { munch: 0.5 + 0.5 * Math.sin(f * 0.25 + 1), h: 0.55 }));
      add(pig('p3', f, [10.6, 0, -3.2], { munch: 0.5 + 0.5 * Math.sin(f * 0.35 + 2), facing: -1, h: 0.5 }));
      break;
    }
    case 'morning': {
      const munch = 0.5 + 0.5 * Math.sin(f * 0.6);
      add(pig('pig', f, PIG, { munch }));
      for (const at of [500, 530, 600]) add(puff('d' + at, f, at, [PIG[0] + 0.4, 0.25, PIG[2] + 0.1], 0.4, 12));
      add(ch('cut', OUT.cutlar, f, [0.2, 0, -0.6], { expr: f > 600 ? 'stern' : f > 575 ? 'shock' : 'neutral', armL: ARM.hip, armR: f > 575 ? ARM.point : ARM.hang, facing: 1, look: 0.5 }));
      break;
    }
    case 'shot': {
      const fired = f >= 655;
      add(ch('cut', OUT.cutlar, f, [0.2, 0, -0.6], { expr: fired ? 'shock' : 'stern', armL: ARM.hold, armR: ARM.aim, propR: 'rifle', facing: 1, look: 0.6 }));
      if (!fired) add(pig('pig', f, PIG, { munch: 0.5 + 0.5 * Math.sin(f * 0.6) }));
      if (fired && f < 672) add(fx('bang', [1.3, 1.6, -0.9], 0.9 * back(win(f, 655, 660)), 'bang', (g) => drawBang(g), { order: 9 }));
      add(puff('sm', f, 655, [PIG[0], 0.5, PIG[2] + 0.2], 1.2, 16));
      break;
    }
    case 'money': {
      const cuffs = f >= 770;
      add(ch('cut', OUT.cutlar, f, [0.15, 0, -1.0], { expr: f >= 722 ? (cuffs ? 'shock' : 'nervous') : 'smile', armL: ARM.hang, armR: ARM.holdHi, propR: 'bill10', facing: 1 }));
      add(ch('gri', OUT.griffin, f, [1.55, 0, -1.2], { expr: f >= 722 ? 'stern' : 'neutral', armL: f >= 722 ? ARM.holdHi : ARM.hip, propL: f >= 722 ? 'bill100' : undefined, armR: cuffs ? ARM.point : ARM.hang, propR: cuffs ? 'cuffs' : undefined, facing: -1 }));
      add(mark('no', 'NO!', f, 724, 768, [1.55, 2.55, -1.0], 0.3, '#e8302c'));
      break;
    }
    case 'march': {
      for (let i = 0; i < 6; i++) { const row = Math.floor(i / 3), col = i % 3, t = (f - 828) / 30;
        add(us(i, f, [CAMP[0] - 3 + col * 1.2 + t * 0.9, 0, -0.4 + row * 1.2], { mode: 'march', phase: (f * 0.05 + i * 0.1) % 1, expr: 'stern', facing: 1 })); }
      add(mark('n64', '64', f, 902, 945, [CAMP[0] + 1.5, 2.9, 0], 0.55, '#ffe066'));
      break;
    }
    case 'ships': {
      add(mark('n5', '5', f, 1003, 1037, [-6, 22, -130], 14, '#ffe066'));
      break;
    }
    case 'standoff': {
      for (let i = 0; i < 6; i++) add(us(i, f, [CAMP[0] - 4 + i * 1.6, 0, -0.6 - (i % 2) * 0.6], { expr: 'stern', armL: ARM.hang, armR: ARM.hang, look: 0.2 }));
      add(mark('n461', '461', f, 1066, 1290, [CAMP[0] - 1.5, 3.6, -1.2], 0.8, '#7ab0ff'));
      add(mark('n14', '14 CANNONS', f, 1112, 1290, [CAMP[0] + 3.2, 2.6, -2.4], 0.6, '#ffffff'));
      add(mark('n2000', '2,000', f, 1175, 1290, [CAMP[0] + 6, 5.2, -18], 2.2, '#ff8a7a'));
      add(mark('n70', '70 GUNS', f, 1235, 1290, [CAMP[0] + 7, 3.6, -18], 1.6, '#ffffff'));
      break;
    }
    case 'ready': {
      if (f < 1344) { add(us(0, f, [CAMP[0] + 0.1, 0, -2.2], { expr: 'nervous', armL: ARM.hold, armR: ARM.aim, propR: 'rifle', facing: -1 })); add(mark('sw', '...', f, 1310, 1343, [CAMP[0] + 0.6, 2.4, -2.1], 0.3, '#ffffff')); }
      else { for (let i = 0; i < 4; i++) add(us(i, f, [CAMP[0] - 1 + i * 1.0, 0, -1.6 - (i % 2) * 0.5], { expr: 'nervous', armL: ARM.hold, armR: ARM.aim, propR: 'rifle', look: 0.1 })); add(mark('cr', '...', f, 1350, 1386, [CAMP[0] + 0.6, 2.8, -1.6], 0.4, '#ffffff')); }
      break;
    }
    case 'admiral': {
      const no = f >= 1404;
      add(ch('adm', OUT.admiral, f, [6, 0, -6.4], { expr: no ? 'stern' : 'neutral', armL: ARM.hip, armR: no ? ARM.wag : ARM.hang, facing: no ? (Math.sin(f * 0.4) > 0 ? 1 : -1) : 0 }));
      if (f >= 1500) { add(fx('bub', [6.7, 2.6, -6.3], 0.6 * back(win(f, 1500, 1508)), 'bub', (g) => { const s = g.canvas.width; g.fillStyle = '#ffffff'; g.strokeStyle = '#241726'; g.lineWidth = s * 0.03; g.beginPath(); g.ellipse(s / 2, s / 2, s * 0.45, s * 0.38, 0, 0, 7); g.fill(); g.stroke(); g.save(); g.translate(s * 0.15, s * 0.18); g.scale(0.7, 0.7); drawPig(g, {}); g.restore(); }, { order: 8 })); }
      break;
    }
    case 'party': {
      if (f < 1716) {
        const toast = Math.floor(f / 18) % 2 === 0;
        add(us(0, f, [12.6, 0, 1.4], { expr: 'laugh', armL: ARM.hang, armR: toast ? ARM.toast : ARM.hold, propR: 'mug', facing: 1 }));
        add(us(1, f, [13.6, 0, 1.3], { expr: 'grin', armL: ARM.hang, armR: ARM.hold, propR: 'mug', facing: 1 }));
        add(gb(0, f, [14.6, 0, 1.3], { expr: 'laugh', armL: ARM.hang, armR: toast ? ARM.hold : ARM.toast, propR: 'mug', facing: -1 }));
        add(gb(1, f, [15.6, 0, 1.4], { expr: 'grin', armL: ARM.hang, armR: ARM.hold, propR: 'mug', facing: -1 }));
        if (f >= 1628) { const yr = 1859 + Math.min(12, Math.floor((f - 1628) / 4)); add(fx('cal', [14.1, 2.7, 1.6], 0.75, 'cal' + yr, (g) => drawCalendar(g, yr), { order: 9 })); }
      } else {
        const t = (f - 1716) / 37;
        add(fx('h1', [lerp(11, 17.5, t), 0.85, 4.2], 1.6, 'h1' + q((f * 0.12) % 1, 0.1), (g) => drawHorse(g, (f * 0.12) % 1, '#8a5a34'), { order: 6 }));
        add(fx('h2', [lerp(10.6, 17.0, t), 0.85, 5.0], 1.6, 'h2' + q((f * 0.12 + 0.5) % 1, 0.1), (g) => drawHorse(g, (f * 0.12 + 0.5) % 1, '#f4f1ea'), { order: 6 }));
        for (let i = 0; i < 3; i++) add(puff('dust' + i, f, 1716 + i * 12, [lerp(11, 17.5, (i * 12) / 37) - 1, 0.25, 4.6], 0.6, 14));
      }
      break;
    }
    case 'kaiser': {
      const stampDown = f >= 1835 && f < 1846;
      add(ch('kai', OUT.kaiser, f, [KX, 0, -2.9], { expr: f >= 1846 ? 'smile' : 'stern', armL: ARM.hang, armR: stampDown ? ARM.stamp : ARM.stampUp, propR: 'stamp' }));
      add(fx('doc', [KX + 0.45, 1.06, -2.0], 0.42, 'doc' + (f >= 1838 ? 1 : 0), (g) => drawDecree(g, f >= 1838 ? 1 : 0), { order: 6, tiltX: -1.2 }));
      add(burst('sb', f, 1838, [KX + 0.45, 1.2, -1.9], 0.6));
      if (f >= 1846) add(fx('map2', [KX - 0.5, 2.5, -3.3], 1.1 * back(win(f, 1846, 1854)), 'map2', (g) => drawMap(g, { usa: 1 }), { res: [1024, 1024], order: 7, soft: false }));
      break;
    }
    case 'twist': {
      const up = ss(win(f, 1951, 2005));
      add(fx('pigA', [PIG[0], 0.32 + 0.9 * up, PIG[2]], 0.85, 'pa' + q(Math.min(1, (f - 1878) / 20), 0.1), (g) => drawPig(g, { angel: Math.min(1, (f - 1878) / 20) }), { order: 5 }));
      add(glowFx('halo', [PIG[0], 0.5 + 0.9 * up, PIG[2] - 0.1], 1.6, 0.45, '255,236,170', 3));
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
