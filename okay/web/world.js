// "Why Do We Say OK?" sets: Boston Morning Post newsroom 1839 (origin), modern bedroom (x -150), 1840 campaign rally (x 150).
import { THREE, scene, toon, unlit, tbox, cyl, sph, cone, plane, group } from './engine.js';
import * as P from './paint.js';
import { drawBoard, drawFront, drawBubble } from './cast.js';

const dyn = (w, h, draw) => { const c = document.createElement('canvas'); c.width = w; c.height = h; const t = P.ctex(c, false); let key = null;
  return { tex: t, set: (k, ...a) => { if (k === key) return; key = k; const g = c.getContext('2d'); g.clearRect(0, 0, w, h); draw(g, ...a); t.needsUpdate = true; } }; };
const M = { wood: toon('#8a5a34'), dark: toon('#3a2a20'), iron: toon('#3a3a44'), steel: toon('#6a6f78'), paper: toon('#f4ecd2'), red: toon('#c0353a'), blue: toon('#2b4c9a'), white: toon('#f2efe6'), green: toon('#3f6a3a') };

export const build = () => {
  const H = {};
  // ---------------- newsroom (origin) ----------------
  tbox(30, 0.1, 30, toon('#ffffff', P.planks('#8a6a4a', 11, 6)), { y: -0.05, tm: 3 });
  tbox(16, 5, 0.2, toon('#ffffff', P.plaster('#d9c9a6', 12)), { y: 2.5, z: -3.2 });
  tbox(0.2, 5, 10, toon('#ffffff', P.plaster('#cdbd9a', 13)), { x: -8, y: 2.5, z: 1.8 });
  for (const x of [-5.5, 5.5]) { tbox(1.6, 2.0, 0.1, toon('#bcd8ef'), { x, y: 2.6, z: -3.08 }); tbox(1.8, 0.12, 0.2, M.wood, { x, y: 1.55, z: -3.0 }); tbox(0.08, 2.0, 0.12, M.wood, { x, y: 2.6, z: -3.02 }); }
  plane(4.2, 0.7, unlit('#ffffff', P.label('BOSTON MORNING POST', { w: 1024, h: 170, bg: '#2a2030', fg: '#f2d98a', border: '#c9a040', font: 'bold 92px Georgia, serif' })), { y: 4.3, z: -3.08 });
  H.board = dyn(1024, 640, (g, rows) => drawBoard(g, rows));
  plane(3.2, 2.0, unlit('#ffffff', H.board.tex), { x: -2.2, y: 2.3, z: -3.07 });
  for (const [x, z] of [[-1.6, -0.8], [1.8, -0.6]]) { tbox(1.8, 0.08, 0.9, M.wood, { x, y: 0.78, z }); tbox(1.7, 0.74, 0.8, M.dark, { x, y: 0.37, z }); for (let k = 0; k < 3; k++) tbox(0.5, 0.02, 0.35, M.paper, { x: x - 0.5 + k * 0.45, y: 0.83 + k * 0.01, z: z + 0.1 }); }
  cyl(0.06, 0.06, 0.25, toon('#2a2a30'), { x: 2.3, y: 0.95, z: -0.7, seg: 8 }); sph(0.07, toon('#f2efe6'), { x: 2.35, y: 1.1, z: -0.7, seg: 8 });
  // printing press (x 4.6)
  const pr = group({ x: 4.6, z: -1.6 }); H.press = pr;
  tbox(2.4, 0.9, 1.4, M.iron, { y: 0.45, parent: pr }); for (const x of [-1.0, 1.0]) tbox(0.25, 2.6, 0.25, M.iron, { x, y: 1.3, parent: pr });
  tbox(2.4, 0.3, 0.6, M.iron, { y: 2.6, parent: pr }); cyl(0.12, 0.12, 1.1, M.steel, { y: 2.0, parent: pr, seg: 10 });
  H.platen = tbox(1.6, 0.18, 1.0, M.steel, { y: 1.5, parent: pr });
  const wh = cyl(0.55, 0.55, 0.12, M.red, { x: 1.35, y: 1.2, rx: 0, rz: Math.PI / 2, parent: pr, seg: 18 }); H.wheel = wh;
  tbox(1.4, 0.04, 0.9, M.paper, { y: 0.92, parent: pr });
  for (let k = 0; k < 6; k++) tbox(0.6, 0.06, 0.42, M.paper, { x: 6.4, y: 0.03 + k * 0.06, z: -0.9 + (k % 2) * 0.03 });
  // wastebasket
  H.bin = group({ x: -3.3, z: 0.6 }); cyl(0.32, 0.25, 0.6, toon('#7a6a4a'), { y: 0.3, parent: H.bin, seg: 14 });
  H.front = dyn(640, 800, (g, t) => drawFront(g, t));
  H.frontPlane = plane(1.6, 2.0, unlit('#ffffff', H.front.tex), { x: 4.6, y: 1.9, z: -0.2 });
  // ---------------- modern room (x -150) ----------------
  const R = group({ x: -150 });
  tbox(14, 0.1, 12, toon('#ffffff', P.planks('#b89a70', 21, 6)), { y: -0.05, parent: R, tm: 1.5 });
  tbox(14, 5, 0.2, toon('#9cc3d8'), { y: 2.5, z: -3, parent: R }); tbox(0.2, 5, 10, toon('#8db4ca'), { x: -5, y: 2.5, z: 1.5, parent: R });
  tbox(2.2, 1.6, 0.1, toon('#e9f4ff'), { x: 2.2, y: 2.6, z: -2.9, parent: R }); tbox(2.4, 0.1, 0.2, M.white, { x: 2.2, y: 1.75, z: -2.85, parent: R });
  tbox(1.6, 0.08, 0.8, M.white, { x: -2.2, y: 0.76, z: -1.8, parent: R }); for (const x of [-2.9, -1.5]) tbox(0.08, 0.76, 0.7, M.white, { x, y: 0.38, z: -1.8, parent: R });
  tbox(0.7, 0.45, 0.04, toon('#22222a'), { x: -2.2, y: 1.05, z: -2.05, parent: R }); cyl(0.25, 0.3, 0.4, toon('#c87a3a'), { x: 3.8, y: 0.2, z: -2.2, parent: R, seg: 12 }); sph(0.55, M.green, { x: 3.8, y: 0.85, z: -2.2, parent: R, seg: 12 });
  tbox(3.6, 0.45, 1.8, toon('#d0a050'), { x: 1.4, y: 0.22, z: -1.6, parent: R }); tbox(3.6, 0.6, 0.3, toon('#c09040'), { x: 1.4, y: 0.6, z: -2.4, parent: R });
  plane(1.4, 1.0, unlit('#ffffff', P.label('OK', { w: 400, h: 280, bg: '#f2c440', fg: '#2a2030', font: 'bold 200px Georgia, serif' })), { x: -3.8, y: 2.6, z: -2.88, parent: R });
  // ---------------- rally (x 150) ----------------
  const K = group({ x: 150 });
  tbox(80, 0.1, 60, toon('#ffffff', P.grass('#6f9a45', 31)), { y: -0.05, parent: K, tm: 6 });
  tbox(8, 1.0, 3.4, toon('#ffffff', P.planks('#9a6a40', 32, 6)), { y: 0.5, z: -2.6, parent: K });
  for (let i = 0; i < 9; i++) { const f = cone(0.35, 0.5, i % 3 === 0 ? M.red : i % 3 === 1 ? M.white : M.blue, { x: -3.6 + i * 0.9, y: 0.7, z: -0.88, parent: K, seg: 3 }); f.rotation.z = Math.PI; }
  for (const x of [-2.0, 2.0]) cyl(0.08, 0.08, 6, M.wood, { x, y: 3, z: -3.8, parent: K, seg: 8 });
  H.banner = dyn(1024, 620, (g, mode) => { g.fillStyle = '#f4ecd2'; g.fillRect(0, 0, 1024, 620); g.strokeStyle = '#c0353a'; g.lineWidth = 22; g.strokeRect(11, 11, 1002, 598); g.textAlign = 'center'; g.textBaseline = 'middle';
    if (mode === 0) { g.fillStyle = '#2b3b7a'; g.font = '900 170px Georgia, serif'; g.fillText('VAN BUREN', 512, 220); g.fillStyle = '#c0353a'; g.fillText('1840', 512, 430); }
    else { const line = (parts, y, size) => { g.font = `900 ${size}px Georgia, serif`; let tw = 0; parts.forEach(([s]) => tw += g.measureText(s).width); let x = 512 - tw / 2; g.textAlign = 'left';
        parts.forEach(([s, hi]) => { const w = g.measureText(s).width; g.fillStyle = hi && mode === 2 ? '#c0353a' : '#2b3b7a'; g.fillText(s, x, y); if (hi && mode === 2) { g.strokeStyle = '#c0353a'; g.lineWidth = 10; g.beginPath(); g.arc(x + w / 2, y - 4, size * 0.62, 0, Math.PI * 2); g.stroke(); } x += w; }); };
      line([['O', true], ['LD', false]], 200, 190); line([['K', true], ['INDERHOOK', false]], 440, 128); } });
  plane(3.8, 2.3, unlit('#ffffff', H.banner.tex), { x: 150, y: 4.7, z: -3.75 });
  tbox(0.9, 1.1, 0.6, M.wood, { x: 150, y: 1.55, z: -2.0 });
  for (let i = 0; i < 7; i++) { const t = group({ x: 150 - 24 + i * 8, z: -18 - (i % 2) * 4 }); cyl(0.25, 0.35, 3, M.wood, { y: 1.5, parent: t, seg: 6 }); sph(2.4, M.green, { y: 4.4, parent: t, seg: 12 }); }
  for (let i = 0; i < 4; i++) { const hx = 150 - 30 + i * 18; tbox(6, 4, 5, toon(['#c9a07a', '#b8b0a0', '#a4553c', '#d9c9a6'][i]), { x: hx, y: 2, z: -30, }); const rf = cone(4.6, 2.4, toon('#5d6470'), { x: hx, y: 5.2, z: -30, seg: 4 }); rf.rotation.y = Math.PI / 4; }
  for (let i = 0; i < 6; i++) { const c = plane(40, 18, unlit('#ffffff', P.cloudTex(i + 3), { transparent: true, fog: false, depthWrite: false }), { x: -100 + i * 60, y: 45 + (i % 3) * 10, z: -200 }); c.userData.noND = true; }
  return H;
};
