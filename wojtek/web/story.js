// "The Bear Who Joined the Army" (Wojtek): shots, cameras, actors, fx.
import { ss, easeOut, easeIn, back, spring, win, clamp, lerp, kick, idle, blinkAt, q } from './engine.js';
import { OUT, ARM, drawChar, drawText, Pen, fxBurst, fxPuff, drawBear, drawBadge } from './cast.js';

export const TOTAL = 1751;
export const FLASHES = [[196, 204], [1496, 1504]];
export const STING = 99999;
const DX = -120, OX = 120, KX = 220, ZX = 320;
const C = (f, pos, look, fov = 40, o = {}) => ({ f, pos, look, fov, ...o });

export const SHOTS = [
  { id: 'hook', a: 0, b: 128, light: 'day', at: [0, 1, 2], span: 12,
    cam: [C(0, [-4.2, 1.7, 6.2], [-4.2, 1.35, 2]), C(90, [1.6, 1.7, 6.2], [1.6, 1.35, 2]), C(128, [2.2, 1.65, 5.6], [2.2, 1.45, 2])], dof: () => ({ c: 4, pt: [0, 1.4, 2] }) },
  { id: 'actual', a: 129, b: 199, light: 'day', at: [2.4, 1, 2], span: 8,
    cam: [C(129, [2.45, 1.75, 4.6], [2.4, 1.6, 2], 38), C(199, [2.45, 1.75, 4.0], [2.4, 1.62, 2], 38)], kicks: [[131, 0.03]], dof: () => ({ c: 11, pt: [2.4, 1.65, 2.1] }) },
  { id: 'desert', a: 200, b: 387, light: 'golden', at: [DX, 1, 2], span: 20,
    cam: [C(200, [DX - 4, 7, 22], [DX, 2, 0], 44), C(276, [DX + 1, 2.2, 10], [DX + 0.5, 1.2, 2], 40), C(387, [DX + 1.2, 1.8, 7.6], [DX + 0.6, 1.2, 2], 40)], dof: () => ({ c: 3, pt: [DX + 0.6, 1.2, 2.2] }) },
  { id: 'trade', a: 388, b: 466, light: 'golden', at: [DX, 1, 2], span: 12,
    cam: [C(388, [DX + 0.6, 1.6, 6.8], [DX + 0.4, 1.15, 2]), C(466, [DX + 0.55, 1.55, 6.0], [DX + 0.4, 1.15, 2])], dof: () => ({ c: 6, pt: [DX + 0.6, 1.2, 2.2] }) },
  { id: 'brother', a: 467, b: 532, light: 'day', at: [0, 1, 1], span: 12,
    cam: [C(467, [-0.6, 1.4, 5.6], [-0.5, 1.0, 1]), C(532, [-0.5, 1.35, 5.0], [-0.5, 1.0, 1])], dof: () => ({ c: 6, pt: [-0.5, 1, 1.2] }) },
  { id: 'bottle', a: 533, b: 594, light: 'day', at: [0, 1, 1], span: 8,
    cam: [C(533, [-0.4, 1.3, 3.4], [-0.5, 1.15, 1]), C(594, [-0.45, 1.3, 3.0], [-0.5, 1.15, 1])], dof: () => ({ c: 10, pt: [-0.5, 1.2, 1.1] }) },
  { id: 'wrestle', a: 595, b: 633, light: 'day', at: [0, 1, 1], span: 8,
    cam: [C(595, [0.0, 1.4, 5.0], [0.0, 1.1, 1]), C(633, [0.1, 1.4, 4.6], [0.0, 1.1, 1])], kicks: [[600, 0.03], [615, 0.03]], dof: () => ({ c: 5, pt: [0, 1.1, 1.1] }) },
  { id: 'sleep', a: 634, b: 709, light: 'night', at: [-2.5, 1, 1.5], span: 10,
    cam: [C(634, [-2.3, 1.4, 6.6], [-2.4, 1.0, 1.4]), C(709, [-2.3, 1.35, 5.8], [-2.4, 1.0, 1.4])], dof: () => ({ c: 4, pt: [-2.4, 1, 2] }) },
  { id: 'nopets', a: 710, b: 839, light: 'lab', at: [OX, 1, -1.5], span: 8,
    cam: [C(710, [OX - 0.8, 1.7, 3.2], [OX - 1.2, 1.7, -2.5]), C(770, [OX - 0.6, 1.65, 2.8], [OX - 1.3, 1.9, -2.5]), C(839, [OX - 0.2, 1.5, 3.6], [OX, 1.2, -1.5])], dof: () => ({ c: 5, pt: [OX - 0.5, 1.5, -1.6] }) },
  { id: 'enlist', a: 840, b: 1065, light: 'lab', at: [OX, 1, -1.5], span: 8,
    cam: [C(840, [OX - 0.3, 1.6, 4.6], [OX - 0.3, 1.25, -1.5]), C(968, [OX + 0.4, 1.4, 3.0], [OX + 0.2, 1.0, -1.4]), C(1065, [OX + 1.0, 1.2, 2.6], [OX + 1.3, 0.6, -1.0])], kicks: [[935, 0.03]], dof: (f) => ({ c: 6, pt: f < 968 ? [OX, 1.3, -1.2] : [OX + 1.2, 0.6, -1.0] }) },
  { id: 'cassino', a: 1066, b: 1300, light: 'golden', at: [KX, 1, -3], span: 20,
    cam: [C(1066, [KX - 2, 4.5, 14], [KX, 6, -30], 44), C(1130, [KX - 1.6, 2.0, 2.8], [KX - 0.8, 1.4, -2.4], 42), C(1300, [KX + 1.6, 2.0, 2.2], [KX + 1.2, 1.5, -2.4], 42)],
    kicks: [[1150, 0.02], [1220, 0.02]], dof: () => ({ c: 3, pt: [KX, 1.3, -2.8] }) },
  { id: 'badge', a: 1301, b: 1499, light: 'day', at: [0, 1, 2], span: 12,
    cam: [C(1301, [0.4, 1.7, 7.2], [0.4, 1.4, 2]), C(1430, [0.4, 1.6, 5.6], [0.4, 1.5, 2]), C(1499, [4.5, 1.65, 4.0], [4.5, 1.6, 0.8], 38, { path: [[3, 1.6, 5]] })], kicks: [[1336, 0.03]], dof: (f) => ({ c: 5, pt: f < 1432 ? [0.4, 1.5, 2] : [4.5, 1.6, 0.8] }) },
  { id: 'zoo', a: 1500, b: 1607, light: 'day', at: [ZX, 1, -1], span: 16,
    cam: [C(1500, [ZX + 2, 2.6, 10], [ZX, 1.2, -1], 42), C(1607, [ZX + 1, 2.4, 8.5], [ZX, 1.2, -1], 42)], dof: () => ({ c: 0 }) },
  { id: 'visit', a: 1608, b: TOTAL - 1, light: 'day', at: [ZX, 1, 0], span: 14,
    cam: [C(1608, [ZX - 0.5, 2.0, 8.6], [ZX - 0.5, 1.3, 1]), C(1668, [ZX + 0.2, 1.9, 6.2], [ZX, 1.2, 0]), C(TOTAL, [ZX + 0.3, 1.6, 4.4], [ZX, 1.2, 0], 40, { roll: 2 })], kicks: [[1690, 0.02], [1712, 0.02]], dof: () => ({ c: 4, pt: [ZX, 1.2, 0.2] }) },
  { id: 'thumb', a: 9000, b: 9000, light: 'golden', at: [KX, 1, -3], span: 16,
    cam: [C(9000, [KX - 0.3, 1.7, 2.4], [KX - 0.4, 1.6, -2.6], 40)], dof: () => ({ c: 8, pt: [KX - 0.4, 1.6, -2.5] }) },
];
export const shotAt = (f) => SHOTS.find((s) => f >= s.a && f <= s.b) || SHOTS[SHOTS.length - 2];

const ch = (id, who, f, pos, o = {}) => {
  const seed = who.seed || 1, I = idle(f, seed), bl = o.noBlink ? 0 : blinkAt(f, seed);
  const s = { who, expr: o.expr || 'neutral', mode: o.mode || 'stand', phase: o.phase || 0, blink: o.closed ? 1 : bl, armL: o.armL, armR: o.armR, propL: o.propL, propR: o.propR,
    tilt: q((o.tilt || 0) + I.tilt, 0.25), headTilt: q(o.headTilt || 0, 0.5), facing: o.facing || 0, look: o.look || 0, wave: o.wave, flipX: o.flipX };
  const key = JSON.stringify([s.expr, s.mode, q(s.phase, 0.05), s.blink, s.armL, s.armR, s.propL, s.propR, s.tilt, s.headTilt, s.facing, s.look, s.wave != null ? q(s.wave, 0.1) : null, s.flipX]);
  return { id, kind: 'char', pos: [pos[0] + (o.still ? 0 : I.dx), pos[1], pos[2]], h: o.h ?? 2.25, key, draw: (g) => drawChar(g, s), blobW: o.blobW };
};
const bear = (id, f, pos, o = {}) => {
  const s = { pose: o.pose || 'stand', expr: o.expr || 'happy', cap: !!o.cap, corporal: !!o.corporal, phase: o.phase || 0, blink: o.noBlink ? 0 : blinkAt(f, 77) };
  const key = JSON.stringify([s.pose, s.expr, s.cap, s.corporal, q(s.phase, 0.0625), s.blink]);
  return { id, kind: 'char', pos, h: o.h ?? 2.6, key, draw: (g) => drawBear(g, s), blobW: 1.3 };
};
const fx = (id, pos, h, key, draw, o = {}) => ({ id, kind: 'fx', pos, h, key, draw, yaw: o.yaw ?? 'full', soft: o.soft ?? true, res: o.res || [512, 512], unlit: o.unlit ?? true, order: o.order ?? 5 });
const burst = (id, f, at, pos, h = 0.6, col = '#fff3b0', n = 14) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'b' + q(t, 0.04), (g) => { g.save(); g.scale(g.canvas.width / 500, g.canvas.width / 500); fxBurst(new Pen(g), t, col); g.restore(); }); };
const puff = (id, f, at, pos, h = 0.5, n = 16) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'p' + q(t, 0.05), (g) => { g.save(); g.scale(g.canvas.width / 300, g.canvas.width / 300); fxPuff(new Pen(g), t); g.restore(); }); };
const mark = (id, txt, f, a, b, pos, h = 0.45, col = '#ffffff') => { if (f < a || f > b) return null; const s = back(win(f, a, a + 8)); return fx(id, pos, h * Math.max(0.05, s), 'm' + txt + q(s, 0.1), (g) => drawText(g, txt, { col, font: `bold ${Math.min(300, Math.round(1000 / Math.max(1, txt.length)))}px Georgia, serif` })); };

export const worldAt = (f) => ({ shot: shotAt(f).id, fire: shotAt(f).id === 'sleep', flag: Math.sin(f * 0.2), gun: shotAt(f).id === 'cassino' ? Math.max(0, 1 - ((f - 1150) % 70) / 6) : 0 });

export const actorsAt = (f) => {
  const S = shotAt(f), A = [], add = (x) => x && A.push(x);
  const sol = [OUT.sold1, OUT.sold2, OUT.sold3];
  switch (S.id) {
    case 'hook': case 'actual': {
      for (let i = 0; i < 5; i++) add(ch('l' + i, sol[i % 3], f, [-4.6 + i * 1.35, 0, 2.1], { expr: f > 135 ? 'shock' : 'stern', armR: ARM.salute, armL: ARM.hang, look: f > 135 ? 1 : 0, still: true }));
      add(bear('wb', f, [2.4, 0, 2.0], { pose: 'salute', cap: true, expr: f > 129 ? 'happy' : 'neutral' }));
      add(burst('hb', f, 131, [2.9, 2.6, 2.1], 0.6));
      break;
    }
    case 'desert': case 'trade': {
      const traded = f >= 420;
      const t = win(f, 276, 340);
      add(ch('boy', OUT.boy, f, [DX + 1.3, 0, 2.2], { expr: traded ? 'grin' : 'smile', armR: traded ? ARM.holdHi : ARM.hold2, propR: traded ? undefined : 'cub', armL: ARM.hang, h: 2.0, facing: -1 }));
      add(ch('s1', OUT.sold1, f, [lerp(DX - 2.8, DX - 0.2, ss(t)), 0, 2.0], { expr: traded ? 'grin' : 'smile', mode: t > 0 && t < 1 ? 'stroll' : 'stand', phase: (f * 0.05) % 1, armR: traded ? ARM.hold2 : ARM.reach, propR: traded ? 'cub' : undefined, armL: ARM.hang }));
      if (S.id === 'desert') add(ch('s2', OUT.sold2, f, [lerp(DX - 3.8, DX - 1.3, ss(t)), 0, 1.6], { expr: 'smile', mode: t > 0 && t < 1 ? 'stroll' : 'stand', phase: (f * 0.05 + 0.4) % 1, armR: ARM.hang, armL: ARM.hang }));
      add(burst('tr', f, 420, [DX + 0.5, 2.0, 2.3], 0.6, '#ffd0e0'));
      add(mark('nm', '"WOJTEK"', f, 440, 466, [DX + 0.3, 2.35, 2.2], 0.32, '#ffe066'));
      break;
    }
    case 'brother': {
      add(bear('cub', f, [-0.5, 0, 1.1], { h: 1.3, expr: 'happy' }));
      add(ch('s1', OUT.sold1, f, [-1.5, 0, 1.0], { expr: 'grin', armR: ARM.reach, armL: ARM.hang }));
      add(ch('s2', OUT.sold2, f, [0.5, 0, 0.9], { expr: 'smile_closed', armR: ARM.hang, armL: ARM.reach, facing: -1 }));
      break;
    }
    case 'bottle': add(bear('cub', f, [-0.5, 0, 1.1], { h: 1.5, pose: 'bottle', expr: 'happy' })); add(burst('bt', f, 545, [-0.2, 1.6, 1.2], 0.4)); break;
    case 'wrestle': {
      add(bear('wb', f, [0.35, 0, 1.0], { h: 2.2, pose: 'wrestle', phase: (f * 0.06) % 1, expr: 'happy' }));
      add(ch('s3', OUT.sold3, f, [-0.45, 0, 1.15], { expr: 'laugh', armR: ARM.wrestle, armL: ARM.up, tilt: 10 * Math.sin(f * 0.38), still: true }));
      add(puff('w1', f, 600, [0, 0.2, 1.3], 0.8)); add(puff('w2', f, 615, [0.2, 0.2, 1.3], 0.8));
      break;
    }
    case 'sleep': {
      add(bear('wb', f, [-2.4, 0, 1.2], { h: 2.2, pose: 'sleep', expr: 'happy', noBlink: true }));
      add(ch('s1', OUT.sold1, f, [-3.4, 0, 1.4], { expr: 'smile_closed', armR: ARM.hang, armL: ARM.hang, tilt: 6, still: true, noBlink: true }));
      add(ch('s2', OUT.sold2, f, [-1.4, 0, 1.5], { expr: 'smile_closed', armR: ARM.hang, armL: ARM.hang, tilt: -6, still: true, noBlink: true }));
      for (let k = 0; k < 3; k++) { const t = ((f - 634) / 40 + k / 3) % 1; add(fx('z' + k, [-2.1 + t * 0.6, 2.4 + t * 0.9, 1.2], 0.25 + 0.2 * t, 'z' + q(t, 0.1), (g) => drawText(g, 'z', { col: '#ffffff' }))); }
      break;
    }
    case 'nopets': {
      add(ch('clk', OUT.clerk, f, [OX + 0.3, 0, -2.2], { expr: f > 771 ? 'stern' : 'neutral', armR: f > 771 ? ARM.point : ARM.hang, armL: ARM.hip, facing: -1 }));
      add(bear('wb', f, [OX - 0.9, 0, -0.9], { h: 2.3, expr: f > 790 ? 'shock' : 'happy' }));
      add(mark('np', '!', f, 772, 839, [OX + 0.5, 2.3, -2.1], 0.4, '#ff8060'));
      break;
    }
    case 'enlist': {
      const stamp = f >= 930;
      add(ch('clk', OUT.clerk, f, [OX + 0.3, 0, -2.2], { expr: stamp ? 'grin' : 'neutral', armR: stamp ? ARM.reach : ARM.lift, propR: 'stamp', armL: ARM.hip, facing: -1 }));
      add(bear('wb', f, [OX - 0.75, 0, -1.0], { h: 2.3, pose: f > 908 ? 'salute' : 'stand', cap: f > 908 }));
      add(puff('stp', f, 932, [OX + 0.1, 0.95, -1.45], 0.6, 12)); add(burst('sb', f, 934, [OX + 0.1, 1.1, -1.4], 0.5));
      add(burst('rb', f, 975, [OX + 1.4, 0.8, -0.8], 0.5));
      break;
    }
    case 'cassino': {
      const t = win(f, 1130, 1300);
      for (let i = 0; i < 2; i++) add(ch('cs' + i, sol[i], f, [KX - 2.6 + t * 2.4 + i * 1.3, 0, -2.4 - i * 0.6], { expr: 'stern', mode: 'stroll', phase: (f * 0.05 + i * 0.3) % 1, armR: ARM.lift, armL: ARM.lift, propR: 'cub' === 0 ? 'cub' : undefined }));
      add(bear('wb', f, [KX - 1.0 + t * 2.4, 0, -2.0], { h: 2.5, pose: 'carry', phase: (f * 0.05) % 1, cap: true, expr: 'happy' }));
      for (let k = 0; k < 3; k++) add(puff('sm' + k, f, 1150 + k * 70, [KX + 4.2, 2.6, -3.8], 2.4, 30));
      for (let k = 0; k < 4; k++) add(puff('far' + k, f, 1070 + k * 45, [KX - 6 + k * 5, 14, -36], 8, 40));
      break;
    }
    case 'badge': {
      for (let i = 0; i < 4; i++) add(ch('bs' + i, sol[i % 3], f, [-1.6 + i * 0.75 + (i > 1 ? 1.6 : 0), 0, 2.3], { expr: 'laugh', armR: ARM.cheer, armL: ARM.wave, still: true }));
      add(bear('wb', f, [0.4, 0, 2.0], { pose: 'salute', cap: true, corporal: f >= 1336, expr: 'happy' }));
      add(burst('cp', f, 1336, [0.4, 1.8, 2.3], 1.0));
      A.push(fx('badge', [4.5, 1.6, 0.8], 1.2, 'badge', (g) => drawBadge(g), { yaw: 0, soft: false, unlit: false, order: 0 }));
      add(burst('bg', f, 1436, [4.5, 1.6, 0.9], 1.6, '#fff3b0', 18));
      break;
    }
    case 'zoo': add(bear('wb', f, [ZX, 0, -1.0], { pose: 'wave', phase: (f * 0.02) % 1, expr: 'happy' })); break;
    case 'visit': {
      const climb = win(f, 1668, 1700);
      add(bear('wb', f, [ZX + 0.3, 0, -0.2], { pose: f > 1690 ? 'wrestle' : 'wave', phase: (f * 0.05) % 1, expr: 'happy' }));
      add(ch('v1', OUT.vet1, f, [ZX - 1.2 + 0.6 * climb, 1.3 * Math.sin(Math.PI * climb), lerp(3.0, 0.2, climb)], { expr: 'laugh', armR: f > 1700 ? ARM.wrestle : ARM.up, armL: ARM.up, tilt: f > 1700 ? 8 * Math.sin(f * 0.4) : 0 }));
      add(ch('v2', OUT.vet2, f, [ZX + 1.6 - 0.3 * climb, 1.3 * Math.sin(Math.PI * Math.max(0, climb - 0.15)), lerp(3.2, 0.4, Math.max(0, climb - 0.15))], { expr: 'grin', armR: ARM.up, armL: f > 1700 ? ARM.wrestle : ARM.up, facing: -1 }));
      add(puff('vp', f, 1712, [ZX + 0.2, 0.3, 0.4], 1.4, 20));
      add(burst('end', f, 1735, [ZX + 0.3, 2.9, -0.1], 0.8, '#ffd0e0'));
      break;
    }
    case 'thumb': {
      add(bear('wb', 9000, [KX - 0.4, 0, -2.6], { h: 2.5, pose: 'carry', phase: 0.25, cap: true, expr: 'happy', noBlink: true }));
      add(ch('cs0', OUT.sold1, 9000, [KX - 1.55, 0, -2.3], { expr: 'shock', armR: ARM.up, armL: ARM.up, still: true, noBlink: true }));
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
