// "The Warship That Sank Before Leaving Town" (Vasa, 1628): shots, cameras, ship state, actors, fx.
import { ss, easeOut, easeIn, back, spring, win, clamp, lerp, kick, idle, blinkAt, q } from './engine.js';
import { OUT, ARM, drawChar, drawText, Pen, fxBurst, fxPuff, crowd, drawLion, drawWindCloud, drawSplash, drawBubbles, drawFlashes } from './cast.js';

export const TOTAL = 1744;
export const FLASHES = [[168, 176], [1480, 1490], [1609, 1619]];
export const STING = 1707;
const QY = 1.02, MX = 300, SX = 600;

// ---------------- ship ----------------
export const shipAt = (f) => {
  if (f === 9000) return { x: 0, z: 2, y: -1.2, heel: 0.5, bill: 0.6 };
  let x = 0, z = 2, y = 0, heel = 0.015 * Math.sin(f * 0.05), bill = 0;
  if (f >= 483 && f < 628) heel += (f > 553 ? 0.1 : 0.04) * Math.sin(f * 0.13);
  if (f >= 651 && f < 797) { const ph = (f - 651) / 48; heel += 0.09 * Math.sin(Math.PI * ph); }
  if (f >= 797 && f < 952) { const a = f < 844 ? 0.2 : 0.2 * Math.max(0, 1 - (f - 844) / 60); heel += a * Math.sin((f - 797) * 0.16); }
  if (f >= 952) { const t = clamp((f - 952) / (1480 - 952)); x = 14 * ss(t) + 4 * t; z = 2 - 13 * ss(t); }
  if (f >= 1155) bill = ss(win(f, 1160, 1185));
  if (f >= 1234) heel = 0.35 * ss(win(f, 1234, 1270));
  if (f >= 1282) { heel = 0.35 + 0.2 * win(f, 1282, 1367); y = -0.8 * win(f, 1282, 1367); }
  if (f >= 1368) { heel = 0.55 + 0.15 * win(f, 1368, 1480); y = -0.8 - 9 * easeIn(win(f, 1372, 1478)); }
  if (f >= 1486) { x = 0; z = -30; heel = 0.08; y = f < 1550 ? -9 : -9 + 8.4 * ss(win(f, 1550, 1604)); bill = 0; }
  return { x, z, y, heel, bill };
};

const C = (f, pos, look, fov = 40, o = {}) => ({ f, pos, look, fov, ...o });
const S0 = shipAt(1100), S1 = shipAt(1200), S2 = shipAt(1300), S3 = shipAt(1420);
export const SHOTS = [
  { id: 'hook', a: 0, b: 111, light: 'day', at: [0, 4, 2], span: 20,
    cam: [C(0, [22, 2.4, -19], [4, 6.5, 2], 45), C(111, [9, 3.0, -23], [-3, 7.5, 2], 45, { path: [[16, 2.6, -22]] })], dof: () => ({ c: 0 }) },
  { id: 'minutes', a: 112, b: 172, light: 'day', at: [-2, 2, 9], span: 8,
    cam: [C(112, [-1.7, 2.65, 13.6], [-2.0, 2.4, 9.6], 38), C(172, [-1.75, 2.6, 13.0], [-2.0, 2.45, 9.6], 38)], kicks: [[150, 0.02]], dof: () => ({ c: 11, pt: [-2, 2.6, 9.6] }) },
  { id: 'stock', a: 173, b: 250, light: 'day', at: [0, 4, 5], span: 40,
    cam: [C(173, [-30, 30, -52], [2, 6, 8], 46), C(250, [-20, 13, -40], [2, 6, 8], 46)], dof: () => ({ c: 0 }) },
  { id: 'cannons', a: 251, b: 325, light: 'day', at: [0, 2, 4], span: 14,
    cam: [C(251, [-9, 2.2, -13.5], [-8, 1.8, 1], 42), C(325, [8, 2.2, -13.5], [9, 1.8, 1], 42)], dof: () => ({ c: 4, pt: [0, 1.6, -1.2] }) },
  { id: 'statues', a: 326, b: 378, light: 'day', at: [-12, 5, 2], span: 10,
    cam: [C(326, [-19, 5.2, 5.5], [-12, 5.4, 2], 42), C(378, [-18, 5.6, 3.8], [-12, 5.4, 2], 42)], dof: () => ({ c: 7, pt: [-12.3, 5, 2] }) },
  { id: 'gold', a: 379, b: 482, light: 'day', at: [8, 3, -6], span: 24,
    cam: [C(379, [18, 1.9, -21], [6, 4.5, 0], 44), C(482, [17, 2.0, -19], [5, 5, 0], 44)], kicks: [[420, 0.02]], dof: () => ({ c: 5, pt: [15, 1.6, -15] }) },
  { id: 'problem', a: 483, b: 627, light: 'day', at: [0, 6, 2], span: 30,
    cam: [C(483, [1, 8, -40], [0, 8.5, 2], 40), C(627, [0.5, 8, -36], [0, 8.5, 2], 40)], dof: () => ({ c: 0 }) },
  { id: 'deck', a: 628, b: 796, light: 'day', at: [-1, 4, 2], span: 12,
    cam: [C(628, [11.5, 9.2, 6.0], [2.3, 3.9, 2], 46), C(796, [11, 9.0, 5.6], [2.3, 3.9, 2], 46)], dof: () => ({ c: 0 }) },
  { id: 'rock', a: 797, b: 951, light: 'day', at: [-1, 4, 2], span: 12,
    cam: [C(797, [11, 9.0, 5.6], [2.3, 3.9, 2], 46), C(844, [10.4, 8.6, 5.3], [2.0, 4.2, 2], 44, { roll: 4 }), C(951, [10, 8.4, 5.1], [1.8, 4.4, 2], 42, { roll: 0 })],
    kicks: [[844, 0.03], [895, 0.02]], dof: () => ({ c: 0 }) },
  { id: 'launch', a: 952, b: 1035, light: 'day', at: [2, 2, 5], span: 24,
    cam: [C(952, [-6, 3, -16], [3, 4.5, 5], 44), C(1035, [-5, 3.2, -18], [8, 4.5, 0], 44)], dof: () => ({ c: 0 }) },
  { id: 'crowd', a: 1036, b: 1095, light: 'day', at: [2, 2, 10], span: 10,
    cam: [C(1036, [2, 3.0, 4.2], [2, 2.2, 14], 40), C(1095, [2, 3.0, 5.0], [2, 2.2, 14], 40)], dof: () => ({ c: 4, pt: [2, 2, 13.5] }) },
  { id: 'salute', a: 1096, b: 1154, light: 'day', at: [S0.x, 2, S0.z], span: 16,
    cam: [C(1096, [S0.x - 3, 2.6, S0.z - 16], [S0.x - 2, 2.0, S0.z - 3]), C(1154, [S0.x + 3, 2.6, S0.z - 15], [S0.x + 3, 2.0, S0.z - 3])],
    kicks: [[1100, 0.03], [1112, 0.03], [1124, 0.03], [1136, 0.03]], dof: () => ({ c: 3, pt: [S0.x, 2, S0.z - 5] }) },
  { id: 'wind', a: 1155, b: 1233, light: 'day', at: [S1.x, 6, S1.z], span: 30,
    cam: [C(1155, [S1.x - 4, 8, S1.z - 46], [S1.x - 4, 10, S1.z]), C(1233, [S1.x - 2, 8, S1.z - 42], [S1.x - 1, 9, S1.z])], dof: () => ({ c: 0 }) },
  { id: 'lean', a: 1234, b: 1281, light: 'day', at: [S1.x, 4, S1.z], span: 30,
    cam: [C(1234, [S1.x + 1, 4, S1.z - 34], [S1.x, 6, S1.z], 40), C(1281, [S1.x + 1, 3.6, S1.z - 30], [S1.x, 5.5, S1.z], 40, { roll: 4 })], dof: () => ({ c: 0 }) },
  { id: 'water', a: 1282, b: 1367, light: 'day', at: [S2.x, 1, S2.z], span: 16,
    cam: [C(1282, [S2.x + 1.5, 1.2, S2.z - 10], [S2.x + 0.5, 0.6, S2.z - 3]), C(1367, [S2.x - 1, 1.1, S2.z - 9.4], [S2.x - 1.5, 0.4, S2.z - 3])], kicks: [[1290, 0.02]], dof: () => ({ c: 3, pt: [S2.x, 0.8, S2.z - 4.5] }) },
  { id: 'sank', a: 1368, b: 1485, light: 'day', at: [S3.x, 2, S3.z], span: 34,
    cam: [C(1368, [4, 3.4, 14.6], [S3.x, 4, S3.z], 42), C(1485, [5, 3.2, 14.2], [S3.x, 3, S3.z], 42)], dof: () => ({ c: 0 }) },
  { id: 'seabed', a: 1486, b: 1542, light: 'underwater', at: [SX, -27, 0], span: 24,
    cam: [C(1486, [SX + 16, -24.6, 16], [SX, -26, 0], 44), C(1542, [SX + 12, -25.0, 13], [SX - 1, -25.5, 0], 44)], dof: () => ({ c: 0 }) },
  { id: 'salvage', a: 1543, b: 1614, light: 'day', at: [0, 2, -30], span: 30,
    cam: [C(1543, [20, 4, -6], [0, 2.2, -30], 44), C(1614, [17, 4.5, -9], [0, 3.5, -30], 44)], dof: () => ({ c: 0 }) },
  { id: 'museum', a: 1615, b: 1706, light: 'museum', at: [MX, 4, 4], span: 30,
    cam: [C(1615, [MX + 7, 2.6, 24], [MX, 5.5, 0], 46), C(1706, [MX + 5, 2.6, 22.5], [MX, 5.5, 0], 46)], dof: () => ({ c: 2, pt: [MX + 2, 2, 15] }) },
  { id: 'sank2', a: 1707, b: TOTAL - 1, light: 'museum', at: [MX, 4, 4], span: 30,
    cam: [C(1707, [MX + 5, 2.6, 22.5], [MX, 5.5, 0], 46), C(TOTAL, [MX + 4, 2.6, 19], [MX, 6.2, 0], 44, { roll: 3 })], kicks: [[1712, 0.03]], dof: () => ({ c: 2, pt: [MX + 2, 2, 15] }) },
  { id: 'thumb', a: 9000, b: 9000, light: 'day', at: [0, 4, 2], span: 20,
    cam: [C(9000, [3.2, 3.0, -34], [-1, 7.2, 2], 46)], dof: () => ({ c: 3, pt: [2.4, 1.6, -30.5] }) },
];
export const shotAt = (f) => SHOTS.find((s) => f >= s.a && f <= s.b) || SHOTS[SHOTS.length - 2];

// ---------------- helpers ----------------
const ch = (id, who, f, pos, o = {}) => {
  const seed = who.seed || 1, I = idle(f, seed), bl = o.noBlink ? 0 : blinkAt(f, seed);
  const s = { who, expr: o.expr || 'neutral', mode: o.mode || 'stand', phase: o.phase || 0, blink: bl, armL: o.armL, armR: o.armR, propL: o.propL, propR: o.propR,
    tilt: q((o.tilt || 0) + I.tilt, 0.25), headTilt: q(o.headTilt || 0, 0.5), facing: o.facing || 0, look: o.look || 0, wave: o.wave, flipX: o.flipX };
  const key = JSON.stringify([s.expr, s.mode, q(s.phase, 0.05), s.blink, s.armL, s.armR, s.propL, s.propR, s.tilt, s.headTilt, s.facing, s.look, s.wave != null ? q(s.wave, 0.1) : null, s.flipX]);
  return { id, kind: 'char', pos: [pos[0] + (o.still ? 0 : I.dx), pos[1], pos[2]], h: o.h ?? 2.25, key, draw: (g) => drawChar(g, s), blobW: o.blobW, blob: o.blob };
};
const fx = (id, pos, h, key, draw, o = {}) => ({ id, kind: 'fx', pos, h, key, draw, yaw: o.yaw ?? 'full', soft: o.soft ?? true, res: o.res || [512, 512], unlit: o.unlit ?? true, order: o.order ?? 5 });
const burst = (id, f, at, pos, h = 0.6, col = '#fff3b0', n = 14) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'b' + q(t, 0.04), (g) => { g.save(); g.scale(g.canvas.width / 500, g.canvas.width / 500); fxBurst(new Pen(g), t, col); g.restore(); }); };
const puff = (id, f, at, pos, h = 0.5, n = 16) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'p' + q(t, 0.05), (g) => { g.save(); g.scale(g.canvas.width / 300, g.canvas.width / 300); fxPuff(new Pen(g), t); g.restore(); }); };
const mark = (id, txt, f, a, b, pos, h = 0.45, col = '#ffffff') => { if (f < a || f > b) return null; const s = back(win(f, a, a + 8)); return fx(id, pos, h * Math.max(0.05, s), 'm' + txt + q(s, 0.1), (g) => drawText(g, txt, { col, font: `bold ${Math.min(300, Math.round(1000 / Math.max(1, txt.length)))}px Georgia, serif` })); };
/** deck point (local x, z across beam) -> world, following ship roll */
const onDeck = (S, lx, lz) => { const c = Math.cos(S.heel), s = Math.sin(S.heel), yy = 3.86; return [S.x + lx, S.y + yy * c + lz * s, S.z - yy * s + lz * c]; };

export const worldAt = (f) => ({ ship: shipAt(f), shot: shotAt(f).id, lids: f >= 1090 ? 1 : 0.25, sinkTilt: f >= 1707 ? 0.05 * easeOut(win(f, 1708, 1716)) * (1 - 0.3 * spring((f - 1716) / 30)) : 0 });

// ---------------- actors ----------------
export const actorsAt = (f) => {
  const Sh = shotAt(f), A = [], add = (x) => x && A.push(x), S = shipAt(f);
  switch (Sh.id) {
    case 'hook': add(burst('g1', f, 70, [-9.5, 7.6, -0.5], 1.4, '#fff3b0', 20)); break;
    case 'thumb': {
      add(ch('adm', OUT.admiral, 9000, [2.35, 1.15, -30.9], { expr: 'shock', armR: ARM.up, armL: ARM.up, tilt: 4, still: true, noBlink: true, blob: false }));
      for (let k = 0; k < 3; k++) A.push(fx('tsp' + k, [-6 + k * 4, 1.0, -2.6], 2.2, 'tsp' + k, (g) => drawSplash(g, 0.35 + k * 0.1), { res: [512, 512] }));
      break;
    }
    case 'minutes': {
      add(ch('adm', OUT.admiral, f, [-2.0, QY, 9.6], { expr: f > 140 ? 'nervous' : 'neutral', armR: ARM.holdHi, propR: 'watch', armL: ARM.hip, look: -0.5 }));
      add(mark('m20', '20 min', f, 140, 172, [-1.4, 3.35, 9.5], 0.35, '#ffe066'));
      break;
    }
    case 'stock': for (let i = 0; i < 8; i++) add(ch('cs' + i, crowd(i), f, [-10 + i * 2.6, QY, 9.6 + (i % 2) * 1.5], { expr: 'smile', armR: i % 2 ? ARM.wave : ARM.hang, wave: 0.5 + 0.5 * Math.sin(f * 0.3 + i) })); break;
    case 'cannons': add(burst('cn', f, 290, [0.2, 2.3, -1.6], 0.6)); break;
    case 'statues': {
      for (let j = 0; j < 3; j++) A.push(fx('lion' + j, [-12.25, 4.6 + (j === 1 ? 1.1 : 0), 0.7 + j * 1.3], 1.0, 'lion', (g) => drawLion(g), { yaw: -Math.PI / 2, soft: false, unlit: false, res: [400, 500], order: 0 }));
      add(burst('st', f, 340, [-12.5, 6.4, 2.0], 0.8, '#fff3b0', 16));
      break;
    }
    case 'gold': {
      add(ch('en', OUT.enemy, f, [15.3, 0.46, -15.3], { expr: f > 410 ? 'pained' : 'shock', armR: ARM.shade, armL: f > 410 ? ARM.shade : ARM.hang, tilt: -4, blob: false }));
      for (const [k, at] of [[0, 395], [1, 418], [2, 440], [3, 462]]) add(burst('gl' + k, f, at, [-4 + k * 4.5, 5.5 + (k % 2) * 2, -1.2], 4.0, '#fff8c8', 18));
      break;
    }
    case 'problem': {
            add(mark('hv', '!!', f, 556, 627, [0, 25, 2], 3.0, '#ffe066'));
      break;
    }
    case 'deck': case 'rock': {
      const rock = Sh.id === 'rock', stop = f >= 844, three = f >= 895;
      const ap = onDeck(S, -0.2, -1.4);
      add(ch('adm', OUT.admiral, f, ap, { expr: rock ? (stop ? (three ? 'stern' : 'shock') : 'nervous') : 'stern', armR: rock && stop ? ARM.stop : ARM.point, armL: ARM.hip, tilt: S.heel * 40 }));
      for (let i = 0; i < 6; i++) {
        const run = f >= 651 && !(rock && stop), ph = (f - 651) / 48, dir = Math.floor(ph) % 2 ? -1 : 1, frac = ph - Math.floor(ph);
        const lz = run ? dir * (-1.7 + 3.4 * ss(frac)) : (rock && stop ? -1.8 + (i % 3) * 0.3 : 1.7 * (i % 2 ? 1 : -1));
        const fall = rock && stop && f < 905;
        const p = onDeck(S, 0.9 + i * 0.9, lz + (i % 2) * 0.25);
        add(ch('sl' + i, OUT.sailor(i), f, p, { expr: fall ? 'dazed' : run ? 'grin' : 'nervous', mode: fall ? 'fall' : run ? 'march' : 'stand', phase: (f * 0.09 + i * 0.2) % 1, armR: ARM.hang, armL: ARM.hang, tilt: S.heel * 40, still: true, h: 2.1 }));
      }
      if (rock) { add(mark('st', 'STOP!', f, 846, 890, [ap[0] + 0.6, ap[1] + 2.2, ap[2]], 0.6, '#ff7060')); add(mark('3x', '3x', f, 896, 951, [ap[0] + 0.2, ap[1] + 2.5, ap[2]], 0.7, '#ffe066')); }
      break;
    }
    case 'launch': {
            for (let i = 0; i < 4; i++) add(ch('cl' + i, crowd(i + 3), f, [-12 + i * 1.6, QY, 9.6 + (i % 2) * 0.6], { expr: 'grin', armR: ARM.wave, wave: 0.5 + 0.5 * Math.sin(f * 0.4 + i) }));
      add(puff('rope', f, 960, [-1, 1.4, 8.2], 1.2, 14));
      break;
    }
    case 'crowd': case 'sank': {
      const shock = Sh.id === 'sank';
      for (let i = 0; i < 8; i++) {
        const up = Math.sin(f * 0.5 + i * 1.3) > 0;
        add(ch('cr' + i, crowd(i), f, shock ? [1.5 + i * 0.95, QY, 10.4 + (i % 2) * 0.5] : [-1.3 + i * 0.95, QY, 13.2 + (i % 2) * 0.5], shock
          ? { expr: f > 1432 ? 'shock' : 'nervous', armL: f > 1432 ? ARM.up : ARM.chin, armR: f > 1432 ? ARM.up : ARM.hang }
          : { expr: 'laugh', armL: up ? ARM.cheer : ARM.wave, armR: i % 3 === 0 ? ARM.holdHi : (up ? ARM.wave : ARM.cheer), propR: i % 3 === 0 ? 'flag' : undefined }));
      }
      if (shock) add(fx('bub', [S3.x, 0.6, S3.z + 2], 4, 'bb' + q(f / 30, 0.1), (g) => drawBubbles(g, f / 30, 3), { res: [512, 512] }));
      break;
    }
    case 'salute': {
      const port = [[-7.3, 2.25], [-4.3, 2.25], [-1.3, 2.25], [1.7, 2.25]];
      port.forEach(([lx, y], k) => { const at = 1100 + k * 12; add(puff('sm' + k, f, at, [S.x + lx, S.y + y, S.z - 4.6], 2.2, 24)); add(burst('fl' + k, f, at, [S.x + lx, S.y + y, S.z - 4.3], 0.9, '#ffd080', 8)); });
      break;
    }
    case 'wind': {
      const t = back(win(f, 1158, 1172), 1.4);
      if (t > 0.02) A.push(fx('wc', [S.x - 9, 20, S.z + 6], 10 * t, 'wc' + q(f / 30, 0.05) + q(t, 0.1), (g) => drawWindCloud(g, f / 30), { res: [600, 400] }));
      break;
    }
    case 'water': {
      for (let k = 0; k < 4; k++) { const tt = ((f - 1286 - k * 7) % 28) / 28; if (f > 1286 + k * 7) A.push(fx('sp' + k, [S.x - 5 + k * 3, 1.0, S.z - 4.4], 1.8, 'sp' + q(tt, 0.05), (g) => drawSplash(g, tt), { res: [512, 512] })); }
      break;
    }
    case 'seabed': {
      A.push(fx('bubs', [SX + 2, -24, 3], 6, 'bs' + q(f / 30, 0.1), (g) => drawBubbles(g, f / 30, 7), { res: [512, 512] }));
      add(mark('yr', '1961', f, 1500, 1542, [SX + 4, -22.5, 4], 1.6, '#ffe066'));
      break;
    }
    case 'salvage': {
      for (let k = 0; k < 4; k++) { const tt = ((f - 1590 - k * 5) % 30) / 30; if (f > 1590) A.push(fx('mud' + k, [-8 + k * 5, 0.6, -26], 2.4, 'md' + q(tt, 0.05), (g) => drawSplash(g, tt), { res: [512, 512] })); }
      break;
    }
    case 'museum': case 'sank2': {
      const end = Sh.id === 'sank2';
      for (let i = 0; i < 6; i++) add(ch('tu' + i, OUT.tourist(i), f, [MX - 3.2 + i * 1.3, 0, 14.2 + (i % 2) * 1.0], end
        ? { expr: 'shock', armR: ARM.up, armL: ARM.up }
        : { expr: i % 2 ? 'grin' : 'smile', armR: i % 2 ? ARM.camera : ARM.point, propR: i % 2 ? 'cam' : undefined, armL: ARM.hang }));
      if (!end) A.push(fx('flash', [MX, 6, 4], 14, 'fl' + q(f / 30, 0.05), (g) => drawFlashes(g, f / 30), { res: [512, 512] }));
      add(burst('end', f, 1712, [MX - 6, 10, 4], 2.4, '#ffffff', 12));
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
