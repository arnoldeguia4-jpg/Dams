// Story timeline for "The Day It Rained Meat" (Kentucky, 1876): shots timed to the silence-aligned phrases of the user's voiceover (TOTAL 1871).
import { ss, easeOut, back, win, clamp, lerp, idle, blinkAt, q } from './engine.js';
import { OUT, ARM, drawChar, drawText, drawMeatRain, drawMeat, drawScatter, drawVulture, drawBubble, drawCalendar, drawChalk, queasy, glow, Pen, fxBurst, fxPuff } from './cast.js';
import { LX, KETTLE } from './world.js';

export const TOTAL = 1871;
export const MUSIC_STOP = 1682;
const CR = [0.55, 0, -2.2], M1 = [-1.0, 0, -1.6], M2 = [0.1, 0, -1.5];
const WIPES = [140, 1044, 1246], IRIS_OUT = [1840, 1866];

// ---------------- shots ----------------
const k = (f, pos, look, fov = 42, o = {}) => ({ f, pos, look, fov, ...o });
const D = (pt, c = 5) => () => ({ c, pt });
export const SHOTS = [
  { id: 'hook', a: 0, b: 143, light: 'day', at: [0, 1, -3], span: 14, cam: [k(0, [3.6, 2.4, 6.4], [0.6, 1.6, -3.0], 46), k(143, [2.6, 1.9, 4.2], [0.6, 1.7, -2.6], 44)], kicks: [[60, 0.03]], dof: D([0.6, 1.4, -2.2], 2) },
  { id: 'date', a: 144, b: 277, light: 'day', at: [3, 1, 0], span: 12, cam: [k(144, [4.0, 1.95, 5.6], [4.0, 2.0, 2.7], 40), k(180, [4.0, 1.95, 5.3], [4.0, 2.0, 2.7], 40), k(181, [3.0, 1.5, 6.4], [4.0, 1.9, 1.6], 42), k(214, [3.1, 1.5, 6.0], [4.0, 1.9, 1.6], 42), k(240, [2.0, 1.2, 4.0], [-2, 14, -30], 48, { ease: ss }), k(277, [2.0, 1.2, 3.8], [-2, 16, -30], 46)], dof: () => ({ c: 0 }) },
  { id: 'soap', a: 278, b: 411, light: 'day', at: [1, 1, -2], span: 10, cam: [k(278, [0.9, 1.55, 2.0], [0.8, 1.35, -2.3], 42), k(345, [0.9, 1.5, 1.6], [0.8, 1.3, -2.3], 42), k(411, [1.2, 1.4, 1.2], [1.0, 0.9, -2.1], 44)], kicks: [[352, 0.04]], dof: D([0.6, 1.4, -2.2], 4) },
  { id: 'more', a: 412, b: 489, light: 'day', at: [0, 1, -2], span: 12, cam: [k(412, [1.4, 1.8, 3.6], [0.6, 1.2, -2.2], 46), k(489, [1.6, 2.2, 4.6], [0.6, 1.2, -2.6], 48)], kicks: [[447, 0.03]], dof: () => ({ c: 0 }) },
  { id: 'piece', a: 490, b: 595, light: 'day', at: [0, 1, -1], span: 8, cam: [k(490, [-0.1, 0.55, 0.4], [-0.3, 0.15, -1.0], 40), k(595, [-0.15, 0.45, 0.1], [-0.3, 0.15, -1.0], 36)], dof: D([-0.3, 0.2, -1.0], 9) },
  { id: 'sky', a: 596, b: 672, light: 'day', at: [0, 1, -2], span: 12, cam: [k(596, [0.4, 0.8, 1.0], [0.0, 14, -14], 54), k(672, [0.4, 0.8, 1.0], [0.6, 18, -12], 50)], dof: () => ({ c: 0 }) },
  { id: 'field', a: 673, b: 768, light: 'day', at: [0, 1, -6], span: 20, cam: [k(673, [0.0, 9.0, 4.0], [0.0, 0.0, -6.0], 52), k(768, [0.4, 12.5, 5.0], [0.2, 0.0, -6.5], 52)], dof: () => ({ c: 0 }) },
  { id: 'neigh', a: 769, b: 936, light: 'day', at: [0, 1, -2], span: 12, cam: [k(769, [-0.2, 1.6, 3.6], [-0.5, 1.3, -1.8], 46), k(880, [-0.4, 1.55, 2.6], [-0.45, 1.4, -1.6], 42), k(936, [-0.45, 1.55, 2.0], [-0.45, 1.45, -1.6], 40)], kicks: [[900, 0.03]], dof: D([-0.45, 1.4, -1.6], 4) },
  { id: 'taste', a: 937, b: 1048, light: 'day', at: [0, 1, -2], span: 10, cam: [k(937, [-1.0, 1.6, 1.4], [-1.0, 1.55, -1.6], 40), k(996, [-1.0, 1.6, 1.2], [-1.0, 1.55, -1.6], 40), k(997, [0.1, 1.6, 1.4], [0.1, 1.55, -1.5], 40), k(1048, [0.1, 1.6, 1.2], [0.1, 1.55, -1.5], 40)], dof: D([-0.5, 1.6, -1.6], 5) },
  { id: 'lab', a: 1049, b: 1249, light: 'lab', at: [LX, 1, -2], span: 10, cam: [k(1049, [LX - 0.4, 1.6, 2.0], [LX - 0.6, 1.4, -2.4], 44), k(1105, [LX - 0.5, 1.6, 1.6], [LX - 0.6, 1.45, -2.4], 42), k(1106, [LX + 0.2, 1.8, 2.4], [LX, 2.0, -4.0], 44), k(1203, [LX + 0.2, 1.8, 2.0], [LX, 2.0, -4.0], 44), k(1204, [LX, 1.6, 2.6], [LX, 1.4, -2.0], 46), k(1249, [LX, 1.6, 2.2], [LX, 1.4, -2.0], 46)], kicks: [[1206, 0.04], [1222, 0.03]], dof: D([LX, 1.5, -2.6], 3) },
  { id: 'where', a: 1250, b: 1315, light: 'golden', at: [0, 1, -2], span: 12, cam: [k(1250, [1.4, 1.4, 3.2], [0.6, 1.5, -2.2], 44), k(1315, [1.2, 1.3, 2.6], [0.6, 1.7, -2.2], 42)], dof: D([0.6, 1.6, -2.2], 4) },
  { id: 'vult', a: 1316, b: 1502, light: 'golden', at: [0, 1, -6], span: 20, cam: [k(1316, [0.0, 1.5, 4.0], [0, 18, -12], 50), k(1405, [0.0, 1.6, 3.4], [1, 20, -12], 48), k(1406, [2.0, 14, -2], [3.0, 19.5, -10], 42), k(1502, [2.1, 14.4, -2.6], [3.0, 19.5, -10], 40)], kicks: [[1460, 0.05]], dof: () => ({ c: 0 }) },
  { id: 'guess', a: 1503, b: 1681, light: 'golden', at: [0, 1, -4], span: 20, cam: [k(1503, [2.6, 1.0, 5.4], [0.0, 7.0, -8.0], 52), k(1681, [2.4, 1.2, 4.6], [0.0, 8.0, -8.0], 50)], dof: () => ({ c: 0 }) },
  { id: 'thumb', a: 9000, b: 9000, light: 'day', at: [1, 1, -2], span: 10, cam: [k(9000, [0.75, 1.65, 2.0], [0.7, 1.75, -2.2], 42)], dof: D([0.6, 1.5, -2.2], 3) },
  { id: 'twist', a: 1682, b: TOTAL - 1, light: 'golden', at: [0, 1, -2], span: 10, cam: [k(1682, [-0.45, 1.5, 2.8], [-0.45, 1.45, -1.6], 42), k(1785, [-0.45, 1.55, 1.6], [-0.45, 1.6, -1.6], 40, { ease: ss }), k(TOTAL, [-0.45, 1.6, 0.9], [-0.45, 1.68, -1.6], 36, { roll: 3 })], dof: D([-0.45, 1.6, -1.6], 4) },
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
const pop = (f, a, b) => (f < a || f > b ? 0 : back(win(f, a, a + 7)) * (1 - ss(win(f, b - 6, b))));
const label = (id, f, a, b, pos, txt, h = 0.34, col = '#ffffff') => { const s = pop(f, a, b); if (s <= 0.02) return null; return fx(id, pos, h * s, 'l' + txt + col, (g) => drawText(g, txt, { col }), { order: 9, res: [1024, 384] }); };
const rnd = (i, s = 1) => Math.abs(Math.sin(i * 12.9898 + s * 7.1) * 43758.5453) % 1;
/** a meat chunk falling from the sky to a ground spot, landing at `land` */
const falling = (id, f, land, pos, h = 0.28) => { const t0 = land - 18; if (f < t0) return []; const out = [];
  if (f < land) { const t = (f - t0) / 18; out.push(fx(id, [pos[0], lerp(7, 0.1, t * t), pos[2]], h, 'mf' + (id.length % 3), (g) => drawMeat(g, id.length % 3), { order: 6 })); }
  else { out.push(fx(id, pos, h, 'mg' + (id.length % 3), (g) => drawMeat(g, id.length % 3), { ground: true, order: 5 })); const p = puff(id + 'p', f, land, [pos[0], 0.15, pos[2] + 0.05], 0.35, 12); if (p) out.push(p); }
  return out; };
const groundMeat = (f, count, from = 0) => { const out = []; for (let i = from; i < count; i++) { const x = -3 + rnd(i) * 7, z = -4.2 + rnd(i, 2) * 4.2; if (Math.hypot(x - CR[0], z - CR[2]) < 0.5) continue; out.push(fx('gm' + i, [x, 0, z], 0.22 + rnd(i, 3) * 0.12, 'mg' + (i % 3), (g) => drawMeat(g, i % 3), { ground: true, order: 4 })); } return out; };
const rain = (id, f, pos, h, o = {}) => fx(id, pos, h, 'rain' + id + q(f / 30, 0.034), (g) => drawMeatRain(g, f / 30, o), { order: o.order ?? 7, res: [1024, 1024] });
const vulture = (id, f, pos, h, o = {}) => fx(id, pos, h, 'v' + q(((f * 0.06) + (o.ph || 0)) % 1, 0.1) + (o.sick || 0) + (o.facing || 1), (g) => drawVulture(g, ((f * 0.06) + (o.ph || 0)) % 1, o), { order: 6 });
const flock = (f, n, c, r, y, o = {}) => { const out = []; for (let i = 0; i < n; i++) { const a = f * 0.008 * (1 + rnd(i) * 0.4) + i * 2 * Math.PI / n; out.push(vulture('vu' + i, f, [c[0] + r * Math.cos(a), y + 2 * rnd(i, 4) + 0.6 * Math.sin(f * 0.03 + i), c[2] + r * 0.6 * Math.sin(a)], o.h ?? 3.2, { ph: rnd(i, 2), facing: Math.sin(a) > 0 ? -1 : 1, sick: o.sick && i < o.sick ? 1 : 0 })); } return out; };
const paper = (g) => { const w = g.canvas.width, h = g.canvas.height; g.fillStyle = '#efe6cf'; g.fillRect(0, 0, w, h); g.strokeStyle = '#2a1a1e'; g.lineWidth = 14; g.strokeRect(7, 7, w - 14, h - 14);
  g.fillStyle = '#2a1a1e'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = 'bold 66px Georgia, serif'; g.fillText('THE DAILY CURIOSITY  ·  1876', w / 2, 62, w - 60);
  g.fillRect(30, 100, w - 60, 6); g.font = 'bold 150px Georgia, serif'; g.fillText('MEAT MYSTERY', w / 2, 210, w - 60); g.font = 'bold 96px Georgia, serif'; g.fillStyle = '#8a1e24'; g.fillText('Blame the Vultures?', w / 2, 340, w - 60);
  g.fillStyle = '#6a5a4a'; for (let i = 0; i < 4; i++) g.fillRect(40 + (i % 2) * (w / 2), 420 + Math.floor(i / 2) * 40, w / 2 - 80, 14); };

// ---------------- world state ----------------
export const worldAt = (f) => ({ shot: shotAt(f).id, fire: true });

// ---------------- actors + fx per frame ----------------
export const actorsAt = (f) => {
  const S = shotAt(f), A = [], add = (x) => { if (Array.isArray(x)) x.forEach((y) => y && A.push(y)); else if (x) A.push(x); };
  const fire = () => add(fx('fire', [KETTLE[0], 0.25, KETTLE[2] + 0.1], 0.6, 'fr' + q((f % 12) / 12, 0.1), (g) => glow(g, '255,150,60', 0.7 + 0.2 * Math.sin(f)), { order: 3 }));
  const steam = () => { for (const at of [0, 20, 40]) add(puff('st' + at, f, f - ((f - at) % 60), [KETTLE[0] + 0.1, 1.1 + ((f - at) % 60) * 0.015, KETTLE[2]], 0.45, 60)); };
  const crouch = (o = {}) => add(ch('cr', OUT.crouch, f, CR, { expr: 'smile', armL: ARM.hang, armR: Math.floor(f / 10) % 2 ? ARM.stirA : ARM.stirB, propR: 'paddle', facing: 1, ...o }));
  switch (S.id) {
    case 'hook': {
      const r = f >= 57;
      crouch({ expr: r ? 'shock' : 'smile', armR: r ? ARM.shade : undefined, propR: r ? undefined : 'paddle', look: r ? -0.4 : 0 });
      fire(); steam();
      if (r) { add(rain('r1', f, [0.4, 2.2, -1.0], 5.0, { density: ss(win(f, 57, 110)), n: 34 })); add(groundMeat(f, Math.floor(14 * win(f, 70, 140)))); }
      break;
    }
    case 'date': {
      if (f < 181) add(fx('cal', [4.0, 2.0, 2.7], 1.3 * back(win(f, 144, 152)), 'cal', (g) => drawCalendar(g, 'MARCH', '3', '1876'), { res: [512, 640], order: 8 }));
      else if (f >= 230) add(fx('sun', [-4, 22, -40], 16, 'sun', (g) => glow(g, '255,244,200', 0.95), { order: 2 }));
      break;
    }
    case 'soap': {
      const hit = f >= 352;
      crouch({ expr: hit ? 'shock' : 'smile', armR: hit ? ARM.hang : undefined, propR: hit ? 'paddle' : 'paddle', look: hit ? -0.6 : 0 });
      fire(); steam(); add(falling('m0', f, 352, [-0.15, 0, -1.7], 0.3));
      if (hit) add(label('qm', f, 358, 411, [-0.15, 0.75, -1.65], '?', 0.3, '#ffe066'));
      break;
    }
    case 'more': {
      crouch({ expr: 'shock', armL: ARM.up, armR: ARM.up, propR: undefined, look: -0.3 });
      fire();
      add(falling('m0', f, 300, [-0.15, 0, -1.7], 0.3)); add(falling('m1', f, 420, [1.6, 0, -1.4], 0.3));
      if (f >= 445) { add(rain('r2', f, [0.4, 2.3, -0.6], 5.4, { density: ss(win(f, 445, 470)), n: 46 })); add(groundMeat(f, Math.floor(26 * win(f, 450, 489)))); }
      break;
    }
    case 'piece': {
      add(fx('pc', [-0.3, 0, -1.0], 0.42, 'pcbig', (g) => drawMeat(g, 0, true), { ground: true, order: 5 }));
      add(groundMeat(f, 10));
      if (f >= 537) add(fx('gl', [-0.3, 0.2, -1.05], 0.7, 'pcg', (g) => glow(g, '255,240,240', 0.35), { order: 3 }));
      break;
    }
    case 'sky': {
      add(fx('sun', [-3, 20, -24], 12, 'sun', (g) => glow(g, '255,244,200', 0.95), { order: 2 }));
      add(rain('r3', f, [0.4, 6.0, -4.0], 9.0, { n: 50, speed: 0.8 })); add(rain('r4', f, [0.4, 3.0, -1.4], 4.5, { n: 18, seed: 7 }));
      break;
    }
    case 'field': {
      add(fx('sc', [0, 0.03, -6], 11, 'sc' + q(ss(win(f, 673, 720)), 0.1), (g) => drawScatter(g, 0.3 + 0.7 * ss(win(f, 673, 720))), { res: [1024, 1024], order: 4, yaw: 0, tiltX: -Math.PI / 2 }));
      add(label('fld', f, 690, 768, [0, 2.2, -5.2], '100 × 50 YARDS', 1.5, '#ffe066'));
      break;
    }
    case 'neigh': {
      const ate = f >= 899, run = ss(win(f, 769, 820));
      add(ch('m1', OUT.man1, f, [lerp(-4, M1[0], run), 0, lerp(1, M1[2], run)], { mode: run < 1 ? 'stroll' : 'stand', phase: (f * 0.06) % 1, expr: ate ? 'grin' : f >= 860 ? 'smile' : 'shock', armR: ate ? (Math.floor(f / 8) % 2 ? ARM.eat : ARM.hold) : ARM.hang, propR: ate ? 'meat' : undefined, facing: 1 }));
      add(ch('m2', OUT.man2, f, [lerp(3, M2[0], run), 0, lerp(1, M2[2], run)], { mode: run < 1 ? 'stroll' : 'stand', phase: (f * 0.06 + 0.5) % 1, expr: ate ? 'laugh' : f >= 860 ? 'grin' : 'shock', armR: ate ? (Math.floor(f / 8) % 2 ? ARM.hold : ARM.eat) : ARM.hang, propR: ate ? 'meat' : undefined, facing: -1 }));
      add(ch('n1', OUT.n1, f, [-2.2, 0, -3.0], { expr: f >= 899 ? 'shock' : 'nervous', armL: ARM.hang, armR: ARM.hang })); add(ch('n3', OUT.n3, f, [1.4, 0, -3.2], { expr: f >= 899 ? 'shock' : 'neutral', armL: ARM.hip, armR: ARM.hang }));
      add(groundMeat(f, 22));
      if (f >= 840 && f < 899) add(label('idea', f, 842, 898, [-0.45, 2.55, -1.55], '!', 0.36, '#ffe066'));
      break;
    }
    case 'taste': {
      const b2 = f >= 997, chew = Math.floor(f / 7) % 2;
      add(ch('m1', OUT.man1, f, M1, { expr: b2 ? 'smile_closed' : 'relief_open', armR: !b2 && chew ? ARM.eat : ARM.hold, propR: 'meat', facing: 1 }));
      add(ch('m2', OUT.man2, f, M2, { expr: b2 ? 'relief_open' : 'smile_closed', armR: b2 && chew ? ARM.eat : ARM.hold, propR: 'meat', facing: -1 }));
      if (!b2) { const s = pop(f, 940, 996); if (s > 0.02) add(fx('bub1', [-1.15, 2.2, -1.4], 0.52 * s, 'bub1', (g) => drawBubble(g, 'MUTTON', 'sheep'), { res: [1024, 768], order: 9 })); }
      else { const s = pop(f, 1000, 1048); if (s > 0.02) add(fx('bub2', [0.25, 2.2, -1.3], 0.52 * s, 'bub2', (g) => drawBubble(g, 'VENISON', 'deer'), { res: [1024, 768], order: 9 })); }
      break;
    }
    case 'lab': {
      const lines = f >= 1151 ? ['LUNG?', 'ALGAE?'] : f >= 1106 ? ['LUNG?', ''] : ['SAMPLE', ''];
      add(fx('slate', [LX, 2.45, -5.3], 1.5, 'sl' + lines.join(), (g) => drawChalk(g, lines), { res: [1024, 512], order: 2, yaw: 0, soft: false }));
      const argue = f >= 1204, sw = Math.floor(f / 9) % 2;
      add(ch('s1', OUT.sci1, f, [LX - 0.9, 0, -2.9], { expr: argue ? 'stern' : f >= 1106 ? 'smile' : 'neutral', armL: ARM.hang, armR: argue ? (sw ? ARM.point : ARM.shrug) : f < 1106 ? ARM.scope : ARM.chalk, propR: f >= 1106 && f < 1204 ? 'chalk' : undefined, facing: argue ? 1 : 0 }));
      add(ch('s2', OUT.sci2, f, [LX + 0.9, 0, -2.9], { expr: argue ? 'stern' : f >= 1151 ? 'smile' : 'neutral', armL: ARM.hip, armR: argue ? (sw ? ARM.shrug : ARM.point) : f >= 1151 ? ARM.chalk : ARM.hang, propR: f >= 1151 && f < 1204 ? 'chalk' : undefined, facing: argue ? -1 : 0 }));
      if (argue) add(label('x', f, 1206, 1249, [LX, 2.55, -2.7], '≠', 0.4, '#ff8a7a'));
      break;
    }
    case 'where': {
      crouch({ expr: 'neutral', armL: ARM.hip, armR: ARM.shade, propR: undefined, look: -0.5, headTilt: -6 });
      fire(); add(groundMeat(f, 26));
      add(label('wq', f, 1270, 1315, [0.9, 2.6, -2.1], '?', 0.4, '#ffe066'));
      break;
    }
    case 'vult': {
      const close = f >= 1406;
      if (!close) add(flock(f, 6, [0, 0, -12], 6, 18, { h: 3.4 }));
      else {
        const sick = f >= 1440 ? 1 : 0, bob = Math.sin(f * 0.06);
        add(vulture('hero', f, [3.0, 19.5 + 0.2 * bob, -10], 3.2, { sick, ph: 0.2 }));
        add(label('ex', f, 1408, 1440, [3.0, 21.4, -10], '!', 0.6, '#ffe066'));
        if (f >= 1460) { for (let i = 0; i < 4; i++) { const t = (f - 1460 - i * 4) / 30; if (t < 0) continue; add(fx('dr' + i, [3.5 + i * 0.12, 18.9 - 6 * t * t, -9.8], 0.5, 'mf' + (i % 3), (g) => drawMeat(g, i % 3), { order: 7 })); } }
        add(vulture('v2', f, [-0.6, 20.6 + 0.3 * bob, -13], 2.4, { ph: 0.6, facing: -1 }));
      }
      break;
    }
    case 'guess': {
      add(flock(f, 9, [0, 0, -10], 7, 15, { h: 3.0, sick: 9 }));
      add(rain('r5', f, [0, 7, -6], 10, { n: 40, speed: 0.7, density: ss(win(f, 1574, 1630)) }));
      crouch({ expr: 'shock', armL: ARM.up, armR: ARM.up, propR: undefined, look: -0.5, headTilt: -8 });
      add(groundMeat(f, 26));
      const s = pop(f, 1505, 1572); if (s > 0.02) add(fx('paper', [1.6, 3.3, 0.0], 1.0 * s, 'paper', paper, { res: [1024, 512], order: 9 }));
      break;
    }
    case 'twist': {
      const real = f >= 1790, chew = Math.floor(f / 7) % 2;
      add(ch('m1', OUT.man1, f, M1, { expr: real ? 'shock' : 'relief_open', armR: real ? ARM.hang : chew ? ARM.eat : ARM.hold, propR: real ? 'meat' : 'meat', facing: 1, head: real ? queasy : undefined, hk: real ? 'q' : '' }));
      add(ch('m2', OUT.man2, f, M2, { expr: real ? 'pained' : 'grin', armR: real ? ARM.hang : chew ? ARM.hold : ARM.eat, propR: 'meat', facing: -1, head: real ? queasy : undefined, hk: real ? 'q' : '' }));
      if (f >= 1700) add(vulture('vt', f, [lerp(3.5, -3, win(f, 1700, 1840)), 3.4, -3.4], 1.6, { facing: -1, ph: 0.3 }));
      add(burst('rb', f, 1790, [-0.45, 2.2, -1.5], 0.9, '#c8f0a0'));
      break;
    }
    case 'thumb': {
      add(ch('cr', OUT.crouch, 9000, CR, { expr: 'shock', armL: ARM.up, armR: ARM.up, still: true, noBlink: true, look: -0.3 }));
      for (const [i, x, y, z, h] of [[0, -0.1, 2.5, -1.5, 0.6], [1, 1.2, 2.25, -1.6, 0.55], [2, 0.0, 1.25, -1.4, 0.45], [3, 1.35, 1.0, -1.5, 0.4], [4, 0.6, 2.95, -1.8, 0.4]]) add(fx('tm' + i, [x, y, z], h, 'mf' + (i % 3), (g) => drawMeat(g, i % 3), { order: 7 }));
      fire();
      break;
    }
  }
  return A;
};

export const lookAt = (f) => {
  let flash = 0, wipe = -1, iris = 2;
  for (const w of WIPES) if (f >= w && f <= w + 12) wipe = lerp(-0.35, 1.3, ss((f - w) / 12));
  if (f < 26) iris = lerp(0.0, 1.25, easeOut(f / 26));
  if (f >= IRIS_OUT[0] && f < 9000) iris = lerp(1.25, 0.0, ss(win(f, IRIS_OUT[0], IRIS_OUT[1])));
  for (const [a, b] of [[350, 356], [1788, 1794]]) if (f >= a && f <= b) flash = Math.max(flash, 0.35 * (1 - Math.abs(f - (a + b) / 2) / ((b - a) / 2 + 0.5)));
  return { flash, fade: 0, wipe, iris, irisC: f >= IRIS_OUT[0] ? [0.5, 0.56] : [0.5, 0.5] };
};
