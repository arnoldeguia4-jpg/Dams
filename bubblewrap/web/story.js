// "Why Do We Wrap Things in Bubble Wrap?": shots, cameras, actors, fx, transitions.
import { ss, easeOut, easeIn, back, spring, win, clamp, lerp, kick, idle, blinkAt, q } from './engine.js';
import { OUT, ARM, drawChar, drawText, Pen, fxBurst, fxPuff, crowd, drawBubble, drawBubbles } from './cast.js';

export const TOTAL = 1645;
export const FLASHES = [[1286, 1293]];
export const STING = 1515;
export const TRANSITIONS = [[157, 'zoom'], [254, 'whip'], [370, 'whip'], [436, 'whip'], [584, 'punch'], [604, 'punch'], [631, 'punch'], [673, 'whip'],
  [757, 'whip'], [925, 'punch'], [974, 'iris'], [1052, 'whip'], [1210, 'zoom'], [1396, 'whip'], [1472, 'punch'], [1484, 'punch'], [1495, 'punch'], [1518, 'iris']];
const LX = 150, GX = -150, DX = 300;
const C = (f, pos, look, fov = 40, o = {}) => ({ f, pos, look, fov, ...o });

export const SHOTS = [
  { id: 'hook', a: 0, b: 156, light: 'lab', at: [-0.8, 1, -1], span: 10,
    cam: [C(0, [-0.8, 1.75, 3.6], [-0.8, 1.6, -1]), C(156, [-0.8, 1.75, 2.9], [-0.8, 1.6, -1])], kicks: [[79, 0.05], [121, 0.05]], dof: () => ({ c: 0 }) },
  { id: 'nj', a: 157, b: 253, light: 'lab', at: [0, 1, -1], span: 14,
    cam: [C(157, [-0.4, 2.4, 8.4], [-0.6, 2.0, -1.5]), C(253, [-0.5, 2.2, 7.2], [-0.6, 1.9, -1.5])], dof: () => ({ c: 0 }) },
  { id: 'names', a: 254, b: 369, light: 'lab', at: [0, 1, -1], span: 12,
    cam: [C(254, [-0.8, 1.7, 3.6], [-0.8, 1.7, -0.5]), C(369, [-0.8, 1.75, 3.2], [-0.8, 1.75, -0.5])], dof: () => ({ c: 0 }) },
  { id: 'idea', a: 370, b: 435, light: 'lab', at: [0, 1, -1], span: 12,
    cam: [C(370, [-0.2, 1.7, 3.4], [-0.2, 1.85, -0.5]), C(435, [-0.2, 1.75, 3.0], [-0.2, 1.9, -0.5])], dof: () => ({ c: 0 }) },
  { id: 'seal', a: 436, b: 583, light: 'lab', at: [-0.8, 1, -1.8], span: 10,
    cam: [C(436, [-0.8, 3.6, 0.4], [-0.8, 1.0, -1.8]), C(583, [-0.8, 3.3, 0.1], [-0.8, 1.0, -1.8])], kicks: [[512, 0.04]], dof: () => ({ c: 0 }) },
  { id: 'adjs', a: 584, b: 672, light: 'lab', at: [-0.8, 1, -1.8], span: 10,
    cam: [C(584, [-0.8, 3.0, -0.3], [-0.8, 0.95, -1.8]), C(672, [-0.8, 2.8, -0.6], [-0.8, 0.95, -1.8])], dof: () => ({ c: 0 }) },
  { id: 'nobody', a: 673, b: 756, light: 'day', at: [LX, 1, -1], span: 12,
    cam: [C(673, [LX + 0.3, 2.0, 6.0], [LX + 0.3, 2.0, -2.5]), C(756, [LX + 0.3, 2.0, 5.2], [LX + 0.3, 2.0, -2.5])], kicks: [[741, 0.06]], dof: () => ({ c: 0 }) },
  { id: 'green', a: 757, b: 973, light: 'day', at: [GX, 1, -2], span: 16,
    cam: [C(757, [GX + 0.6, 2.6, 12.5], [GX, 2.0, -3]), C(973, [GX + 0.4, 2.3, 10.0], [GX, 1.8, -3])], kicks: [[926, 0.05]], dof: () => ({ c: 0 }) },
  { id: 'ibm', a: 974, b: 1051, light: 'lab', at: [DX, 1, -1], span: 14,
    cam: [C(974, [DX + 0.3, 2.0, 6.5], [DX, 1.3, -1.6]), C(1051, [DX + 0.3, 1.9, 5.6], [DX, 1.3, -1.6])], dof: () => ({ c: 0 }) },
  { id: 'ship', a: 1052, b: 1209, light: 'lab', at: [DX, 1, -1], span: 14,
    cam: [C(1052, [DX + 0.8, 1.7, 4.8], [DX + 0.2, 1.3, -1.4]), C(1209, [DX + 0.6, 1.7, 4.0], [DX + 0.1, 1.3, -1.4])], kicks: [[1150, 0.04], [1170, 0.04]], dof: () => ({ c: 0 }) },
  { id: 'perfect', a: 1210, b: 1285, light: 'lab', at: [DX, 1, -1], span: 14,
    cam: [C(1210, [DX + 0.3, 2.0, 5.6], [DX, 1.3, -1.6]), C(1285, [DX + 0.3, 2.0, 4.8], [DX, 1.3, -1.6])], dof: () => ({ c: 0 }) },
  { id: 'today', a: 1286, b: 1395, light: 'day', at: [DX + 4, 1, -2], span: 14,
    cam: [C(1286, [DX + 3.0, 2.4, 6.2], [DX + 5.0, 1.4, -2]), C(1395, [DX + 4.0, 2.2, 5.0], [DX + 5.4, 1.3, -2])], dof: () => ({ c: 0 }) },
  { id: 'hobby', a: 1396, b: 1517, light: 'day', at: [LX, 1, 0], span: 12,
    cam: [C(1396, [LX + 0.3, 1.5, 5.0], [LX + 0.3, 1.4, 0]), C(1517, [LX + 0.3, 1.5, 4.0], [LX + 0.3, 1.4, 0])], dof: () => ({ c: 0 }) },
  { id: 'thatswhy', a: 1518, b: TOTAL - 1, light: 'golden', at: [LX, 1, -1], span: 12,
    cam: [C(1518, [LX + 0.3, 2.0, 6.4], [LX + 0.3, 2.0, -2.5]), C(1600, [LX + 0.3, 2.0, 5.2], [LX + 0.3, 2.05, -2.5]), C(TOTAL, [LX + 0.3, 2.0, 4.2], [LX + 0.3, 2.1, -2.5], 40, { roll: 3 })], dof: () => ({ c: 0 }) },
  { id: 'thumb', a: 9000, b: 9000, light: 'day', at: [LX, 1, -1], span: 12,
    cam: [C(9000, [LX + 0.3, 1.75, 2.0], [LX + 0.3, 1.75, -1.2], 46)], dof: () => ({ c: 0 }) },
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
const stamp = (id, f, at, b, pos, h = 1.0, txt = 'REJECTED') => { if (f < at || f > b) return null; const s = 1 + 1.5 * (1 - easeOut(win(f, at, at + 6))); return fx(id, pos, h * s, 'st' + txt + q(s, 0.05), (g) => { const w = g.canvas.width; g.save(); g.translate(w / 2, w / 2); g.rotate(-0.25); g.strokeStyle = '#d0303a'; g.lineWidth = 22; g.strokeRect(-200, -70, 400, 140); g.fillStyle = '#d0303a'; g.font = `bold ${Math.round(500 / txt.length)}px Georgia, serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(txt, 0, 6); g.restore(); }, { soft: false }); };
const sheetFx = (id, pos, h, wob = 0) => fx(id, pos, h, 'sh' + q(wob, 0.1), (g) => { const w = g.canvas.width; g.save(); g.translate(w / 2, w / 2); g.rotate(wob * 0.1); g.translate(-w / 2, -w / 2); const c = document.createElement('canvas'); c.width = c.height = 360; drawBubbles(c.getContext('2d'), 26); g.drawImage(c, 76, 76); g.strokeStyle = '#141018'; g.lineWidth = 8; g.strokeRect(76, 76, 360, 360); g.restore(); }, { soft: false });
const popFx = (id, f, at, pos, h = 0.5) => { if (f < at || f > at + 12) return null; const s = back(win(f, at, at + 5)); return fx(id, pos, h * Math.max(0.05, s), 'pop' + q(s, 0.1), (g) => drawText(g, 'POP!', { col: '#ffe066', font: 'bold 200px Georgia, serif' })); };

export const worldAt = (f) => {
  const S = shotAt(f);
  return {
    press: S.id === 'seal' ? (f < 495 ? easeIn(win(f, 470, 495)) : 1 - easeOut(win(f, 505, 525))) : 0,
    sealed: f >= 510 || S.id === 'thumb',
    wilt: S.id === 'green' ? ss(win(f, 925, 960)) : 0,
    wrapped: (S.id === 'perfect' || S.id === 'thumb') ? easeOut(win(f, 1210, 1225)) : (f >= 1210 && f < 1286 ? 1 : 0),
  };
};

export const actorsAt = (f) => {
  const S = shotAt(f), A = [], add = (x) => x && A.push(x);
  switch (S.id) {
    case 'hook':
      A.push(sheetFx('hs', [-0.8, 1.7, -0.8], 1.3, Math.sin(f * 0.1)));
      add(mark('q', '?', f, 20, 76, [-0.2, 2.65, -0.6], 0.5, '#ffe066'));
      add(stamp('r1', f, 79, 156, [-0.8, 1.35, -0.5], 0.75)); add(stamp('r2', f, 121, 156, [-0.8, 2.05, -0.45], 0.75));
      add(mark('x2', 'x2', f, 124, 156, [-0.8, 2.65, -0.4], 0.35, '#ffe066'));
      break;
    case 'nj':
      add(mark('yr', '1957', f, 162, 250, [-0.7, 3.55, -1.2], 1.1, '#ffe066'));
      add(ch('fd', OUT.fielding, f, [-1.7, 0, -0.6], { expr: 'smile', armR: f > 203 ? ARM.wave : ARM.hip, wave: Math.sin(f * 0.3), armL: ARM.hip, facing: 1 }));
      add(ch('cv', OUT.chavannes, f, [0.3, 0, -0.5], { expr: 'smile', armR: ARM.hip, armL: f > 203 ? ARM.wave : ARM.hang, wave: Math.sin(f * 0.3 + 1), facing: -1 }));
      break;
    case 'names':
      add(ch('fd', OUT.fielding, f, [-1.3, 0, -0.5], { expr: 'grin', armR: ARM.point, armL: ARM.hip, facing: 1 }));
      add(ch('cv', OUT.chavannes, f, [-0.3, 0, -0.4], { expr: 'grin', armR: ARM.hip, armL: ARM.point, facing: -1 }));
      add(mark('n1', 'FIELDING', f, 258, 369, [-1.15, 2.6, -0.3], 0.5, '#ffe066')); add(mark('n2', 'CHAVANNES', f, 300, 369, [-0.45, 2.85, -0.2], 0.5, '#ffffff'));
      break;
    case 'idea':
      add(ch('fd', OUT.fielding, f, [-0.2, 0, -0.5], { expr: f > 400 ? 'grin' : 'smile', armR: f > 400 ? ARM.cheer : ARM.chin, armL: ARM.hip }));
      add(mark('wp', 'TOUCHABLE WALLPAPER?', f, 402, 435, [-0.2, 2.9, -0.3], 1.25, '#ffe066')); add(burst('ib', f, 400, [-0.2, 2.6, -0.3], 0.8));
      break;
    case 'seal':
      add(burst('sb', f, 512, [-0.8, 1.5, -1.6], 1.0, '#ffffff')); add(mark('ab', 'AIR BUBBLES!', f, 515, 583, [-0.8, 1.55, -1.3], 0.6, '#ffe066'));
      break;
    case 'adjs': {
      const w = f < 604 ? 'BUMPY' : f < 631 ? 'SHINY' : 'FUTURISTIC';
      add(mark('aj' + w, w, f, f < 604 ? 584 : f < 631 ? 604 : 631, 672, [-0.8, 1.4, -1.5], 0.55, ['#ffe066', '#9fe8ff', '#ff9ae0'][f < 604 ? 0 : f < 631 ? 1 : 2]));
      if (f >= 604 && f < 640) add(burst('sh', f, 604, [-0.3, 1.2, -1.6], 0.5, '#ffffff'));
      break;
    }
    case 'nobody':
      add(ch('cu', crowd(3), f, [LX - 0.5, 0.11, -0.6], { expr: f > 700 ? 'stern' : 'neutral', armR: ARM.hip, armL: f > 700 ? ARM.shake : ARM.hip, facing: 1 }));
      add(ch('c2', crowd(4), f, [LX + 1.1, 0.11, -0.4], { expr: f > 715 ? 'pained' : 'neutral', armR: ARM.chin, armL: ARM.hip, facing: -1 }));
      add(mark('no', 'NO THANKS', f, 705, 740, [LX + 0.3, 3.4, -2.3], 1.1, '#ffffff'));
      add(stamp('r3', f, 741, 756, [LX + 0.3, 2.6, -2.0], 1.4));
      break;
    case 'green':
      add(ch('fd', OUT.fielding, f, [GX - 0.9, 0, 2.6], { expr: f > 925 ? 'pained' : 'grin', armR: f > 925 ? ARM.chin : ARM.point, armL: ARM.hip, facing: 1 }));
      add(mark('gi', 'GREENHOUSE', f, 810, 920, [GX, 5.1, -1.5], 2.6, '#ffe066')); add(mark('gi2', 'INSULATION', f, 820, 920, [GX, 4.3, -1.5], 2.6, '#ffffff'));
      add(stamp('r4', f, 926, 973, [GX, 3.0, -0.5], 1.6, 'FLOPPED'));
      break;
    case 'ibm':
      add(ch('wk', OUT.worker, f, [DX + 1.6, 0, 0], { expr: 'nervous', armR: ARM.chin, armL: ARM.hip, facing: -1 }));
      add(mark('ib', 'IBM', f, 998, 1051, [DX, 2.75, -1.0], 0.8, '#9fd4ff'));
      break;
    case 'ship':
      add(ch('wk', OUT.worker, f, [DX + 1.2, 0, -0.2], { expr: f > 1140 ? 'shock' : 'nervous', armR: f > 1140 ? ARM.up : ARM.reach, armL: ARM.up, facing: -1, tilt: f > 1145 ? 4 * Math.sin(f * 0.8) : 0 }));
      add(mark('fr', 'FRAGILE!', f, 1080, 1209, [DX, 2.4, -1.0], 0.8, '#ff7060'));
      add(puff('cr', f, 1150, [DX - 0.6, 0.4, -0.9], 0.7)); add(puff('cr2', f, 1170, [DX + 0.6, 0.4, -0.9], 0.6));
      break;
    case 'perfect':
      add(ch('wk', OUT.worker, f, [DX + 1.6, 0, 0], { expr: 'grin', armR: ARM.cheer, armL: ARM.up, facing: -1 }));
      add(ch('fd', OUT.fielding, f, [DX - 1.7, 0, 0.1], { expr: 'grin', armR: ARM.cheer, armL: ARM.hip, facing: 1 }));
      add(burst('pf', f, 1214, [DX, 1.5, -0.9], 2.0, '#ffe066', 16)); add(mark('pf2', 'PERFECT!', f, 1222, 1285, [DX, 2.8, -0.9], 0.9, '#ffe066'));
      break;
    case 'today':
      add(mark('wd', 'WORLDWIDE', f, 1312, 1395, [DX + 5.2, 3.0, -1.6], 1.2, '#ffe066'));
      for (let i = 0; i < 3; i++) add(burst('tb' + i, f, 1312 + i * 12, [DX + 4.6 + i * 0.95, 1.6 + (i % 2) * 0.7, -1.5], 0.6, '#ffffff'));
      break;
    case 'hobby':
      for (let i = 0; i < 3; i++) add(ch('pp' + i, crowd(i + 5), f, [LX - 0.45 + i * 0.75, 0.11, 0.2 + (i % 2) * 0.3], { expr: f > 1470 ? 'grin' : 'smile', armR: ARM.holdHi, propR: 'sheet', armL: ARM.hip, dy: f > 1470 && (f % 12 < 4) ? 0.05 : 0 }));
      add(popFx('p1', f, 1472, [LX - 0.6, 2.7, 0.6])); add(popFx('p2', f, 1484, [LX + 0.4, 2.85, 0.6])); add(popFx('p3', f, 1495, [LX + 1.1, 2.6, 0.6]));
      add(mark('hb', 'NEW HOBBY', f, 1420, 1468, [LX + 0.3, 2.75, 0.5], 0.9, '#ffe066'));
      break;
    case 'thatswhy':
      add(ch('fd', OUT.fielding, f, [LX - 0.7, 0.11, -1.4], { expr: 'grin', armR: ARM.point, armL: ARM.hip, facing: 1 }));
      add(ch('cv', OUT.chavannes, f, [LX + 1.3, 0.11, -1.3], { expr: 'grin', armR: ARM.hip, armL: f > 1585 ? ARM.cheer : ARM.point, facing: -1 }));
      add(mark('wl', 'WALLPAPER!', f, 1590, TOTAL, [LX + 0.3, 3.75, -2.6], 1.1, '#ffe066')); add(burst('wb', f, 1590, [LX + 0.3, 3.75, -2.6], 1.6, '#ffe066', 18));
      break;
    case 'thumb':
      add(ch('fd', OUT.fielding, 9000, [LX + 0.3, 0.11, -1.2], { expr: 'shock', armR: ARM.holdHi, propR: 'sheet', armL: ARM.up, still: true, noBlink: true }));
      break;
  }
  return A;
};

export const lookAt = (f) => {
  let flash = 0;
  for (const [a, b] of FLASHES) if (f >= a && f <= b) { const m = (a + b) / 2; flash = Math.max(flash, 1 - Math.abs(f - m) / ((b - a) / 2 + 0.5)); }
  return { flash: clamp(flash) * 0.95 };
};
