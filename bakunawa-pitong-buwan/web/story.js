// Story timeline for "Ang Ahas na Lumunok ng Pitong Buwan" (Bakunawa): shots timed to the Scribe word frames of take 1.
import { ss, easeOut, easeIn, back, win, clamp, lerp, idle, blinkAt, q } from './engine.js';
import { OUT, ARM, drawChar, drawMoon, drawStars, drawCloud, drawBolt, drawFlame, drawClang, glow, Pen, fxBurst, fxPuff } from './cast.js';
import { SX, VX, KX } from './world.js';

export const TOTAL = 1663;
export const FLASHES = [[276, 286], [740, 748], [783, 790], [824, 831], [994, 1002], [1141, 1151], [1424, 1430]];
export const MUSIC_STOP = 1442;

// moons: sea sky, village sky, heaven
const ARCY = (i) => 10 * Math.sin(Math.PI * i / 6);
const SEAM = (i) => [SX - 30 + 10 * i, 30 + ARCY(i), -110];
const VILM = (i) => [VX - 30 + 10 * i, 32 + ARCY(i), -150];
const HEVM = (i) => [KX - 2.4 + 0.8 * i, 4.4 + 0.12 * ARCY(i), -4];
const LAST = 3; // the moon that survives (the highest, middle one)
const SW = [[0, 740], [1, 783], [2, 824], [6, 858], [5, 884], [4, 908]]; // [moon, bite frame]
const TAIL = [SX + 25, -4, -60];
const VMOON = [VX + 4, 38, -150];
const ELD = [VX - 0.9, 0, 0.9], K1 = [VX + 0.6, 0, 2.2], K2 = [VX + 1.25, 0, 1.6];
const BATH = [KX, 0, 0];

// ---------------- shots ----------------
const wideSea = (a, b) => [{ f: a, pos: [SX, 3, 30], look: [SX, 26, -100], fov: 52 }, { f: b, pos: [SX, 4, 20], look: [SX, 25, -100], fov: 50 }];
export const SHOTS = [
  { id: 'hook', a: 0, b: 163, light: 'seaNight', at: [SX, 1, -40], span: 40, cam: wideSea(0, 163), kicks: [[132, 0.05]], dof: () => ({ c: 0 }) },
  { id: 'elder', a: 164, b: 279, light: 'night', at: [VX, 1, 0], span: 10,
    cam: [{ f: 164, pos: [VX + 0.1, 1.2, 8.2], look: [VX, 2.6, -10], fov: 46 }, { f: 279, pos: [VX + 0.1, 1.2, 7.4], look: [VX, 3.2, -10], fov: 46 }],
    dof: () => ({ c: 3, pt: [VX, 1.0, 1.4] }) },
  { id: 'bathala', a: 280, b: 359, light: 'heaven', at: [KX, 1, 0], span: 10,
    cam: [{ f: 280, pos: [KX + 0.5, 1.0, 7.2], look: [KX, 3.0, -2], fov: 46 }, { f: 359, pos: [KX + 0.3, 1.1, 6.4], look: [KX, 3.2, -2], fov: 46 }],
    dof: () => ({ c: 2, pt: [KX, 2, 0] }) },
  { id: 'deep', a: 360, b: 494, light: 'seaNight', at: [SX, 1, -25], span: 30,
    cam: [{ f: 360, pos: [SX + 2, 2.5, 4], look: [SX - 12, 1.0, -30], fov: 46 }, { f: 494, pos: [SX + 2, 2.4, 0], look: [SX - 2, 1.4, -30], fov: 44 }],
    kicks: [[440, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'name', a: 495, b: 540, light: 'seaNight', at: [SX, 3, -22], span: 25,
    cam: [{ f: 495, pos: [SX + 13, 3.5, -1], look: [SX - 1, 5.0, -22], fov: 46 }, { f: 540, pos: [SX + 12, 3.8, -4], look: [SX - 1, 6.0, -22], fov: 46 }],
    kicks: [[505, 0.08]], dof: () => ({ c: 0 }) },
  { id: 'envy', a: 541, b: 618, light: 'seaNight', at: [SX, 3, -30], span: 30,
    cam: [{ f: 541, pos: [SX + 7, 4, -14], look: [SX - 2, 22, -100], fov: 48 }, { f: 618, pos: [SX + 6, 4.5, -18], look: [SX - 2, 26, -100], fov: 46 }],
    dof: () => ({ c: 0 }) },
  { id: 'rise', a: 619, b: 688, light: 'seaNight', at: [SX, 1, -60], span: 45, cam: wideSea(619, 688), kicks: [[625, 0.05], [650, 0.04]], dof: () => ({ c: 0 }) },
  { id: 'eat1', a: 689, b: 755, light: 'seaNight', at: [SX - 20, 20, -90], span: 45,
    cam: [{ f: 689, pos: [SX - 12, 20, -60], look: [SX - 26, 31, -110], fov: 48 }, { f: 755, pos: [SX - 14, 22, -66], look: [SX - 26, 31, -110], fov: 46 }],
    kicks: [[740, 0.06]], dof: () => ({ c: 0 }) },
  { id: 'eat23', a: 756, b: 837, light: 'seaNight', at: [SX - 15, 20, -90], span: 45,
    cam: [{ f: 756, pos: [SX - 4, 24, -66], look: [SX - 16, 35, -110], fov: 48 }, { f: 837, pos: [SX - 5, 25, -70], look: [SX - 13, 36, -110], fov: 46 }],
    kicks: [[783, 0.06], [824, 0.06]], dof: () => ({ c: 0 }) },
  { id: 'six', a: 838, b: 942, light: 'seaNight', at: [SX, 10, -80], span: 60,
    cam: [{ f: 838, pos: [SX + 6, 22, -64], look: [SX + 18, 34, -110], fov: 48 }, { f: 905, pos: [SX + 6, 22, -64], look: [SX + 14, 34, -110], fov: 48 },
      { f: 922, pos: [SX + 2, 8, 12], look: [SX + 4, 20, -90], fov: 52, ease: ss }, { f: 942, pos: [SX + 2, 8, 10], look: [SX + 4, 20, -90], fov: 52 }],
    kicks: [[858, 0.05], [884, 0.05], [908, 0.05], [930, 0.04]], dof: () => ({ c: 0 }) },
  { id: 'one', a: 943, b: 995, light: 'seaNight', at: [SX, 20, -90], span: 50,
    cam: [{ f: 943, pos: [SX - 3, 30, -78], look: [SX, 39, -110], fov: 44 }, { f: 995, pos: [SX - 2, 32, -86], look: [SX, 39.5, -110], fov: 40 }],
    dof: () => ({ c: 0 }) },
  { id: 'angry', a: 996, b: 1048, light: 'heaven', at: [KX, 1, 0], span: 10,
    cam: [{ f: 996, pos: [KX + 0.3, 1.5, 4.6], look: [KX, 2.0, 0], fov: 44 }, { f: 1048, pos: [KX + 0.25, 1.55, 3.9], look: [KX, 2.0, 0], fov: 44 }],
    kicks: [[1004, 0.06], [1030, 0.04]], dof: () => ({ c: 3, pt: [KX, 2, 0] }) },
  { id: 'plant', a: 1049, b: 1144, light: 'heaven', at: [KX, 1, 0], span: 10,
    cam: [{ f: 1049, pos: [KX + 0.5, 1.4, 6.6], look: [KX + 0.45, 2.6, -1.5], fov: 46 }, { f: 1144, pos: [KX + 0.6, 1.9, 5.4], look: [KX + 0.6, 3.0, -1.5], fov: 44 }],
    dof: () => ({ c: 2, pt: [KX + 0.8, 3, -1] }) },
  { id: 'still', a: 1145, b: 1261, light: 'seaNight', at: [SX, 1, -60], span: 45, cam: wideSea(1145, 1261), kicks: [[1200, 0.04]], dof: () => ({ c: 0 }) },
  { id: 'eclipse', a: 1262, b: 1303, light: 'night', at: [VX, 1, 0], span: 12,
    cam: [{ f: 1262, pos: [VX + 0.5, 1.1, 8], look: [VX + 2, 24, -140], fov: 46 }, { f: 1303, pos: [VX + 0.5, 1.0, 7.5], look: [VX + 2, 28, -140], fov: 42 }],
    dof: () => ({ c: 0 }) },
  { id: 'clang', a: 1304, b: 1383, light: 'night', at: [VX, 1, 0], span: 10,
    cam: [{ f: 1304, pos: [VX + 0.1, 1.5, 10.6], look: [VX, 1.4, 0.8], fov: 46 }, { f: 1383, pos: [VX + 0.1, 1.5, 9.6], look: [VX, 1.5, 0.8], fov: 46 }],
    kicks: [[1310, 0.03], [1330, 0.03], [1350, 0.03], [1370, 0.03]], dof: () => ({ c: 3, pt: [VX, 1.3, 1.5] }) },
  { id: 'spit', a: 1384, b: 1441, light: 'night', at: [VX, 1, 0], span: 12,
    cam: [{ f: 1384, pos: [VX + 0.5, 1.0, 7.5], look: [VX + 2, 28, -140], fov: 42 }, { f: 1441, pos: [VX + 0.5, 1.0, 7.5], look: [VX + 1, 30, -140], fov: 40 }],
    kicks: [[1424, 0.05]], dof: () => ({ c: 0 }) },
  { id: 'thumb', a: 9000, b: 9000, light: 'seaNight', at: [SX, 20, -90], span: 50,
    cam: [{ f: 9000, pos: [SX + 1, 33, -76], look: [SX + 2.5, 38.5, -110], fov: 46 }], dof: () => ({ c: 0 }) },
  { id: 'twist', a: 1442, b: TOTAL - 1, light: 'night', at: [VX, 1, 0], span: 12,
    cam: [{ f: 1442, pos: [VX + 0.1, 1.3, 6.0], look: [VX + 0.2, 2.2, 0], fov: 44 }, { f: 1486, pos: [VX + 0.1, 1.3, 6.0], look: [VX + 0.1, 3.4, -10], fov: 44 },
      { f: 1520, pos: [VX + 0.1, 1.3, 6.0], look: VMOON, fov: 26, ease: ss }, { f: 1600, pos: [VX + 0.1, 1.3, 6.0], look: VMOON, fov: 13 },
      { f: TOTAL, pos: [VX + 0.1, 1.3, 6.0], look: VMOON, fov: 11.5, roll: 3 }],
    dof: (f) => ({ c: f < 1490 ? 3 : 0, pt: [VX, 1.6, 1.5] }) },
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
const puff = (id, f, at, pos, h = 0.5, n = 16) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'p' + q(t, 0.05), (g) => { g.save(); g.scale(g.canvas.width / 300, g.canvas.width / 300); fxPuff(new Pen(g), t); g.restore(); }, { order: 6 }); };
const glowFx = (id, pos, h, a = 0.8, rgb = '255,226,140', order = 4) => fx(id, pos, h, 'gl' + q(a, 0.05) + rgb, (g) => glow(g, rgb, a), { order });
const moonFx = (id, pos, h, o = {}) => fx(id, pos, h, 'mn' + JSON.stringify([q(o.bite || 0, 0.02), q(o.bamboo || 0, 0.02), q(o.halo ?? 0.7, 0.05), q(o.tremble || 0, 1), o.bcol, o.ba]), (g) => drawMoon(g, o), { order: o.order ?? 2 });
const stars = (id, f, pos, h) => fx(id, pos, h, 'st' + q(f / 30, 0.2), (g) => drawStars(g, f / 30, 150), { order: 0, res: [1024, 1024] });
const clang = (id, f, at, pos, h = 0.7) => { if (f < at || f > at + 9) return null; return fx(id, pos, h * back(win(f, at, at + 4)), 'kl', (g) => drawClang(g), { order: 8 }); };
const flame = (f) => fx('flame', [VX, 0.42, 1.2], 0.9, 'fl' + q(f / 30, 0.1), (g) => drawFlame(g, f / 30), { order: 6, res: [256, 256] });

// ---------------- serpent choreography ----------------
const eaten = (f) => SW.filter(([, b]) => f >= b).map(([i]) => i);
const lumpT = (f) => SW.filter(([, b]) => f >= b).map(([, b], k) => lerp(0.14, 0.3 + 0.07 * k, ss(win(f, b, b + 24))));
const vadd = (a, b) => a.map((x, i) => x + b[i]);
const vl = (a, b, t) => a.map((x, i) => lerp(x, b[i], t));
const eatPose = (f) => {
  const k = SW.findIndex(([, b]) => f < b + 8);
  const rest = [SX - 10, 22, -90];
  if (k < 0) { const last = vadd(SEAM(SW[5][0]), [0, -1.5, 5]); return { head: vl(last, [SX + 8, 26, -96], ss(win(f, 916, 942))), mouth: 0, aim: SEAM(LAST) }; }
  const [mi, b] = SW[k], tgt = vadd(SEAM(mi), [0, -1.2, 5.5]);
  const prev = k === 0 ? rest : vadd(SEAM(SW[k - 1][0]), [0, -1.2, 5.5]), a0 = k === 0 ? 689 : SW[k - 1][1] + 4;
  const t = ss(win(f, a0, b - 6)), lunge = f < b ? 0 : 0;
  const head = vl(prev, tgt, t);
  const mouth = f < b ? win(f, b - 16, b - 6) : 1 - win(f, b, b + 5);
  return { head: vadd(head, [0, 0, lunge]), mouth, aim: f < b ? SEAM(mi) : vadd(SEAM(mi), [0, -6, 0]) };
};

// ---------------- world state ----------------
export const worldAt = (f) => {
  const S = shotAt(f), w = { shot: S.id };
  const snake = (o) => ({ tail: TAIL, scale: 2.2, arch: 6, wig: 2, phase: f * 0.04, ...o });
  switch (S.id) {
    case 'hook': { const r = ss(win(f, 78, 150)); w.snake = snake({ head: [SX - 4, lerp(-8, 16, r), -48], tail: [SX + 18, -5, -40], arch: 4 * r, mouth: win(f, 128, 140), aim: SEAM(LAST), vis: f >= 78 }); break; }
    case 'deep': { const t = win(f, 360, 494), up = ss(win(f, 410, 470)); w.snake = snake({ head: [SX - 26 + 26 * t, lerp(-0.6, 1.6, up), -34 + 4 * t], tail: [SX - 60 + 30 * t, -5, -70], arch: 2.4, wig: 6, phase: f * 0.08, aim: [SX + 12, 1.5 + 2 * up, -6] }); break; }
    case 'name': { const r = easeOut(win(f, 495, 512)); w.snake = snake({ head: [SX, lerp(1.5, 5.5, r), -22], tail: [SX + 6, -5, -60], arch: 5, mouth: win(f, 500, 506) * (1 - 0.4 * win(f, 528, 540)), aim: [SX - 30, 7, -12] }); break; }
    case 'envy': w.snake = snake({ head: [SX - 1, 7 + 0.6 * Math.sin(f * 0.05), -32], tail: [SX + 16, -5, -60], arch: 4, aim: SEAM(LAST), mouth: 0.1 }); break;
    case 'rise': { const r = easeOut(win(f, 622, 684)); w.snake = snake({ head: [SX - 10, lerp(-8, 22, r), lerp(-60, -90, r)], arch: 8 * r, aim: SEAM(0), mouth: 0.2 * r }); break; }
    case 'eat1': case 'eat23': case 'six': case 'one': { const e = eatPose(f); w.snake = snake({ ...e, arch: 8, lumps: lumpT(f) }); if (S.id === 'one') { w.snake.head = vadd(SEAM(LAST), [6, -5, 8]); w.snake.mouth = 0.15 + 0.1 * Math.sin(f * 0.2); w.snake.aim = SEAM(LAST); } break; }
    case 'still': { const r = ss(win(f, 1186, 1258)); w.snake = snake({ head: [SX - 4, lerp(-8, 30, r), lerp(-60, -98, r)], arch: 8 * r, aim: SEAM(LAST), mouth: win(f, 1236, 1252) }); break; }
    case 'eclipse': { const r = ss(win(f, 1262, 1298)); w.snake = snake({ head: vl([VX + 34, 18, -128], vadd(VMOON, [10, -4, 8]), r), tail: [VX + 40, -5, -100], arch: 6, scale: 2.6, aim: VMOON, mouth: 0.4 + 0.6 * win(f, 1280, 1295) }); w.bite = 0.85 * ss(win(f, 1272, 1303)); break; }
    case 'clang': w.fire = true; w.bite = 0.85; break;
    case 'spit': { const r = ss(win(f, 1398, 1430)); w.snake = snake({ head: vl(vadd(VMOON, [10, -4, 8]), [VX + 36, 12, -120], r), tail: [VX + 40, -5, -100], arch: 6, scale: 2.6, aim: vl(VMOON, [VX + 60, -10, -60], r), mouth: 1 - 0.7 * r }); w.bite = 0.85 * (1 - ss(win(f, 1394, 1426))); break; }
    case 'elder': w.fire = true; break;
    case 'twist': w.fire = true; w.bamboo = ss(win(f, 1492, 1556)); break;
    case 'thumb': w.snake = snake({ head: vadd(SEAM(LAST), [7.5, -1.2, 3]), tail: TAIL, arch: 8, mouth: 1, aim: SEAM(LAST), lumps: [0.3, 0.38, 0.45] }); break;
  }
  return w;
};

// ---------------- actors + fx per frame ----------------
export const actorsAt = (f) => {
  const S = shotAt(f), w = worldAt(f), A = [], add = (x) => { if (Array.isArray(x)) x.forEach((y) => y && A.push(y)); else if (x) A.push(x); };
  const seaSky = (gone, o = {}) => { add(stars('st', f, [SX, 40, -160], 150)); for (let i = 0; i < 7; i++) if (!gone.includes(i)) add(moonFx('m' + i, SEAM(i), o.h ?? 8, { halo: 0.7 + 0.12 * Math.sin(f * 0.07 + i), tremble: i === LAST ? o.tremble || 0 : 0, bamboo: o.bamboo || 0 })); };
  switch (S.id) {
    case 'hook': {
      seaSky([]);
      if (f >= 78) add(puff('sp', f, 80, [SX - 4, 1.5, -46], 10, 26));
      add(burst('hb', f, 134, [SX - 4, 17, -45], 9, '#d9f2ff', 14));
      break;
    }
    case 'elder': {
      add(stars('st', f, [VX, 40, -200], 180)); for (let i = 0; i < 7; i++) add(moonFx('m' + i, VILM(i), 10, { halo: 0.7 + 0.1 * Math.sin(f * 0.07 + i) }));
      const pt = f > 236;
      add(ch('eld', OUT.v3, f, ELD, { mode: 'sit', expr: pt ? 'smile' : 'smile_closed', armL: ARM.hang, armR: pt ? ARM.up : ARM.chin, facing: 1, look: pt ? -0.5 : 0.3 }));
      add(ch('k1', OUT.kid, f, K1, { h: 1.6, mode: 'sit', expr: f > 250 ? 'shock' : 'smile', armL: ARM.hang, armR: ARM.hang, facing: -1, look: f > 250 ? -0.5 : 0 }));
      add(ch('k2', OUT.kid2, f, K2, { h: 1.6, mode: 'sit', expr: f > 255 ? 'relief_open' : 'smile', armL: ARM.hang, armR: ARM.hang, facing: -1 }));
      add(flame(f)); add(glowFx('fg', [VX, 0.7, 1.1], 2.4, 0.55, '255,170,80', 3));
      break;
    }
    case 'bathala': {
      add(stars('st', f, [KX, 10, -60], 90));
      add(glowFx('aura', [KX, 1.5, -0.15], 4.2, 0.75, '255,236,170', 3));
      const casting = f >= 288 && f < 350;
      add(ch('bat', OUT.bathala, f, BATH, { h: 2.7, expr: 'smile_closed', armL: casting ? ARM.open : ARM.hang, armR: casting ? ARM.cast : ARM.hang, look: -0.4, still: true }));
      for (let i = 0; i < 7; i++) { const at = 292 + 8 * i; if (f >= at) { const s = back(win(f, at, at + 8)); add(moonFx('hm' + i, HEVM(i), 1.3 * Math.max(0.05, s), { halo: 0.8 })); } add(burst('hb' + i, f, at, HEVM(i), 1.4, '#fff8d0', 12)); }
      break;
    }
    case 'deep': {
      seaSky([], { h: 8 });
      add(puff('w1', f, 380, [SX - 22, 0.6, -33], 4, 30)); add(puff('w2', f, 430, [SX - 12, 0.6, -32], 4, 30));
      break;
    }
    case 'name': {
      seaSky([]);
      add(puff('np', f, 495, [SX, 1.2, -21], 9, 22));
      add(burst('nb', f, 505, [SX, 6, -24], 12, '#d9f2ff', 16));
      break;
    }
    case 'envy': {
      seaSky([], { h: 8 });
      for (let i = 0; i < 7; i++) add(glowFx('mg' + i, SEAM(i), 16, 0.35 + 0.25 * Math.sin(f * 0.09 + i), '255,248,210', 1));
      break;
    }
    case 'rise': {
      seaSky([]);
      add(puff('rp1', f, 622, [SX - 10, 1.5, -62], 14, 30)); add(puff('rp2', f, 640, [SX - 4, 1.5, -66], 10, 26));
      break;
    }
    case 'eat1': case 'eat23': case 'six': {
      seaSky(eaten(f));
      for (const [mi, b] of SW) { add(burst('eb' + mi, f, b, SEAM(mi), 12, '#fff8d0', 14)); }
      add(puff('burp', f, 930, vadd(eatPose(f).head, [0, 2, 3]), 8, 20));
      break;
    }
    case 'one': {
      seaSky(eaten(f), { tremble: Math.round(3 * Math.sin(f * 1.3)) });
      add(glowFx('lg', SEAM(LAST), 18, 0.35, '255,248,210', 1));
      break;
    }
    case 'angry': {
      add(stars('st', f, [KX, 10, -60], 90));
      add(glowFx('aura', [KX, 1.5, -0.15], 4.2, 0.85, '255,210,150', 3));
      add(ch('bat', OUT.bathala, f, BATH, { h: 2.7, expr: 'stern', armL: ARM.hip, armR: f > 1004 ? ARM.point : ARM.hang, look: 0.3, still: true }));
      if ((f >= 1000 && f < 1010) || (f >= 1026 && f < 1034)) add(fx('bolt', [KX + 1.6, 3.2, -1.5], 3.2, 'bolt', (g) => drawBolt(g, 1), { order: 2 }));
      if (f >= 1026 && f < 1034) add(fx('bolt2', [KX - 1.7, 3.4, -1.8], 2.8, 'bolt', (g) => drawBolt(g, 1), { order: 2 }));
      break;
    }
    case 'plant': {
      add(stars('st', f, [KX, 10, -60], 90));
      add(glowFx('aura', [KX, 1.5, -0.15], 4.2, 0.7, '255,236,170', 3));
      const bb = ss(win(f, 1080, 1138));
      add(ch('bat', OUT.bathala, f, BATH, { h: 2.7, expr: f > 1110 ? 'smile_closed' : 'stern', armL: ARM.hang, armR: f > 1070 && f < 1125 ? ARM.cast : ARM.hang, look: 0.4, still: true }));
      add(moonFx('lm', [KX + 0.95, 3.5, -1.2], 2.2, { bamboo: bb, bcol: '#3f8a42', ba: 0.95, halo: 0.85 }));
      add(burst('pb', f, 1080, [KX + 0.95, 3.5, -1.1], 1.3, '#c8ffb0', 14));
      add(burst('pb2', f, 1112, [KX + 0.95, 3.5, -1.1], 1.3, '#c8ffb0', 14));
      break;
    }
    case 'still': {
      seaSky([0, 1, 2, 4, 5, 6], { bamboo: 1 });
      if (f >= 1186) add(puff('sp', f, 1188, [SX - 4, 1.5, -62], 12, 28));
      break;
    }
    case 'eclipse': case 'spit': {
      add(stars('st', f, [VX, 40, -200], 180));
      add(moonFx('vm', VMOON, 24, { bite: w.bite, bamboo: 1, halo: 0.75 * (1 - 0.6 * w.bite) }));
      const cheer = S.id === 'spit' && f > 1426;
      add(ch('v1', OUT.v1, f, [VX - 0.3, 0, 2.6], { expr: cheer ? 'laugh' : 'shock', armL: cheer ? ARM.cheer : ARM.hang, armR: cheer ? ARM.cheer : ARM.point, look: -0.4, headTilt: -4 }));
      add(ch('kid', OUT.kid, f, [VX + 0.8, 0, 2.9], { h: 1.6, expr: cheer ? 'relief_open' : 'nervous', armL: cheer ? ARM.cheer : ARM.hang, armR: cheer ? ARM.cheer : ARM.hang, look: -0.4 }));
      add(burst('spb', f, 1424, VMOON, 34, '#fff8d0', 16));
      break;
    }
    case 'clang': {
      const ppl = [[OUT.v1, [VX - 1.35, 0, 1.6], 0], [OUT.v2, [VX - 0.45, 0, 0.9], 5], [OUT.kid, [VX + 0.45, 0, 2.2], 9, 1.6], [OUT.v3, [VX + 1.3, 0, 1.2], 3]];
      ppl.forEach(([who, pos, off, h], i) => {
        const hi = Math.floor((f + off) / 6) % 2 === 0;
        add(ch('c' + i, who, f, pos, { h: h || 2.25, expr: i === 2 ? 'grin' : 'stern', armL: ARM.hold, propL: 'kaldero', armR: hi ? ARM.bangHi : ARM.bangLo, propR: 'sandok', look: -0.2 }));
      });
      for (const [k, at] of [1310, 1330, 1350, 1370].entries()) add(clang('kl' + k, f, at, [VX - 1.2 + 0.8 * k, 2.6 + 0.2 * (k % 2), 1.8], 0.8));
      add(flame(f)); add(glowFx('fg', [VX, 0.7, 1.1], 2.4, 0.5, '255,170,80', 3));
      break;
    }
    case 'twist': {
      add(stars('st', f, [VX, 40, -200], 180));
      add(moonFx('vm', VMOON, 22, { bamboo: w.bamboo, halo: 0.75, ba: 0.55 + 0.1 * w.bamboo }));
      add(ch('eld', OUT.v3, f, [VX - 0.3, 0, 1.0], { expr: f > 1500 ? 'smile_closed' : 'smile', armL: ARM.hang, armR: f > 1470 ? ARM.up : ARM.hang, look: -0.5, headTilt: -4 }));
      add(ch('kid', OUT.kid, f, [VX + 0.5, 0, 1.6], { h: 1.6, expr: f > 1480 ? 'shock' : 'smile', armL: ARM.hang, armR: ARM.hang, look: -0.5, headTilt: -5 }));
      add(flame(f)); add(glowFx('fg', [VX, 0.7, 1.1], 2.4, 0.5, '255,170,80', 3));
      break;
    }
    case 'thumb': {
      seaSky([0, 1, 2, 4, 5, 6], { h: 9 });
      add(glowFx('tg', SEAM(LAST), 20, 0.7, '255,248,210', 1));
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
