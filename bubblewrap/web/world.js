// "Why Do We Wrap Things in Bubble Wrap?" sets: NJ workshop 1957 (origin), living room (x 150), greenhouse (x -150), shipping dock (x 300).
import { THREE, scene, toon, unlit, tbox, cyl, sph, cone, plane, group } from './engine.js';
import * as P from './paint.js';
import { drawBubbles } from './cast.js';

const M = { wood: toon('#8a5a34'), dark: toon('#2a2a30'), steel: toon('#8d949c'), white: toon('#f2efe6'), green: toon('#3f6a3a'), leaf: toon('#5aa04a'), card: toon('#c9a06a') };
const lab = (s, w, h, bg, fg, fs = 120) => unlit('#ffffff', P.label(s, { w: 1024, h: Math.round(1024 * h / w), bg, fg, font: `bold ${fs}px Georgia, serif` }));
const bubTex = (rep = 1, r = 22) => { const c = document.createElement('canvas'); c.width = c.height = 512; drawBubbles(c.getContext('2d'), r); const t = P.ctex(c, true); t.repeat.set(rep, rep); return t; };
const bubMat = (rep = 1) => toon('#ffffff', bubTex(rep), { transparent: true, opacity: 0.92, side: THREE.DoubleSide });

export const build = () => {
  const H = {};
  // ---------------- workshop 1957 (origin) ----------------
  tbox(40, 0.1, 30, toon('#ffffff', P.planks('#8a6a4a', 11, 6)), { y: -0.05, tm: 3 });
  tbox(16, 5, 0.2, toon('#ffffff', P.brick('#b4654c', 4)), { y: 2.5, z: -3, tm: 1.5 });
  tbox(3.2, 0.1, 1.2, M.wood, { x: -0.8, y: 0.92, z: -1.8 }); tbox(3.1, 0.88, 1.1, toon('#5a3a22'), { x: -0.8, y: 0.44, z: -1.8 });
  const pr = group({ x: -0.8, y: 0.97, z: -1.8 }); for (const x of [-1.1, 1.1]) tbox(0.15, 1.3, 0.15, M.steel, { x, y: 0.65, parent: pr }); tbox(2.4, 0.15, 0.4, M.steel, { y: 1.3, parent: pr });
  H.platen = tbox(2.0, 0.12, 0.8, toon('#c0353a'), { y: 0.9, parent: pr });
  H.sheetA = plane(1.9, 0.75, bubMat(1), { y: 0.03, rx: -Math.PI / 2, parent: pr }); H.sheetA.userData.noND = true;
  H.plainA = plane(1.9, 0.75, toon('#cfe9ef', null, { transparent: true, opacity: 0.6 }), { y: 0.02, rx: -Math.PI / 2, parent: pr });
  for (let k = 0; k < 4; k++) cyl(0.18, 0.18, 0.5, toon('#cfe9ef'), { x: 2.4, y: 0.25 + k * 0.0, z: -2.2 + k * 0.45, rz: Math.PI / 2, seg: 14 });
  plane(1.9, 0.55, lab('NEW JERSEY', 1.9, 0.55, '#2a2030', '#f2d98a', 120), { x: -0.8, y: 4.75, z: -2.88 });
  tbox(1.3, 1.3, 0.1, toon('#bcd8ef'), { x: 2.6, y: 2.6, z: -2.88 }); tbox(1.4, 0.1, 0.2, M.wood, { x: 2.6, y: 1.9, z: -2.85 });
  // ---------------- living room (x 150) ----------------
  const L = group({ x: 150 });
  tbox(16, 0.1, 12, toon('#ffffff', P.planks('#b89a70', 21, 6)), { y: 0.06, parent: L, tm: 1.5 });
  tbox(16, 5, 0.2, toon('#e9d9b0'), { y: 2.5, z: -3.1, parent: L });
  const wp = plane(6, 4.2, bubMat(4), { y: 2.3, z: -2.98, parent: L }); wp.userData.noND = true;
  tbox(3.0, 0.5, 1.0, toon('#c25a7a'), { x: 0.4, y: 0.35, z: -2.0, parent: L }); tbox(3.0, 0.7, 0.3, toon('#a84a68'), { x: 0.4, y: 0.8, z: -2.45, parent: L });
  cyl(0.06, 0.06, 1.6, M.dark, { x: -2.4, y: 0.8, z: -2.2, parent: L, seg: 6 }); cone(0.35, 0.4, toon('#f2c440'), { x: -2.4, y: 1.75, z: -2.2, parent: L, seg: 10 });
  plane(1.6, 0.5, lab('1958', 1.6, 0.5, '#f2efe6', '#2a2030', 150), { x: 2.6, y: 4.3, z: -2.95, parent: L });
  // ---------------- greenhouse (x -150) ----------------
  const G = group({ x: -150 });
  tbox(80, 0.1, 60, toon('#ffffff', P.grass('#6f9a45', 7)), { y: -0.05, parent: G, tm: 6 });
  const gh = group({ z: -3, parent: G });
  for (const [w, h, d, x, y, z, ry] of [[6, 2.6, 0.05, 0, 1.3, 2, 0], [6, 2.6, 0.05, 0, 1.3, -2, 0], [4, 2.6, 0.05, 3, 1.3, 0, Math.PI / 2], [4, 2.6, 0.05, -3, 1.3, 0, Math.PI / 2]]) { const pl = plane(w, h, bubMat(3), { x, y, z, ry, parent: gh }); pl.userData.noND = true; }
  for (const s of [-1, 1]) { const r = plane(6, 2.4, bubMat(3), { y: 3.2, z: s * 1.0, parent: gh }); r.rotation.x = -Math.PI / 2 + s * 1.0; r.userData.noND = true; }
  for (const [x, z] of [[-3, 2], [3, 2], [-3, -2], [3, -2]]) tbox(0.08, 2.6, 0.08, M.white, { x, y: 1.3, z, parent: gh });
  H.plants = [];
  for (let i = 0; i < 5; i++) { const pg = group({ x: -2 + i, y: 0, z: 0.5, parent: gh }); cyl(0.22, 0.18, 0.4, toon('#c87a3a'), { y: 0.2, parent: pg, seg: 10 }); const l = sph(0.32, M.leaf, { y: 0.6, parent: pg, seg: 10 }); H.plants.push(l); }
  for (let i = 0; i < 6; i++) { const c = plane(40, 18, unlit('#ffffff', P.cloudTex(i + 3), { transparent: true, fog: false, depthWrite: false }), { x: -280 + i * 50, y: 40, z: -150 }); c.userData.noND = true; }
  // ---------------- shipping dock (x 300) ----------------
  const D = group({ x: 300 });
  tbox(30, 0.1, 20, toon('#8a8a88'), { y: -0.05, parent: D });
  tbox(30, 6, 0.3, toon('#9aa3a8'), { y: 3, z: -5, parent: D });
  const pc = group({ x: 0, z: -1.6, parent: D }); H.computer = pc;
  for (let i = 0; i < 3; i++) { const b = tbox(1.0, 1.6, 0.8, toon(i === 1 ? '#5a6f8a' : '#7a8aa0'), { x: -1.1 + i * 1.1, y: 0.8, parent: pc }); }
  for (let i = 0; i < 2; i++) { cyl(0.22, 0.22, 0.06, M.dark, { x: -1.1 + i * 2.2, y: 1.1, z: 0.42, rx: Math.PI / 2, parent: pc, seg: 16 }); }
  for (let k = 0; k < 6; k++) tbox(0.5, 0.06, 0.02, toon(k % 2 ? '#f2c440' : '#c0353a'), { x: -0.2 + (k % 3) * 0.2, y: 1.2 - Math.floor(k / 3) * 0.15, z: 0.41, parent: pc });
  plane(1.6, 0.4, lab('COMPUTER', 1.6, 0.4, '#2a2030', '#f2efe6', 110), { y: 1.82, z: 0.41, parent: pc });
  H.wrap = tbox(3.5, 1.8, 1.0, bubMat(3), { x: 0, y: 0.9, z: -1.6, parent: D }); H.wrap.userData.noND = true;
  H.boxes = group({ x: 4.5, z: -2, parent: D });
  for (let i = 0; i < 9; i++) tbox(0.9, 0.7, 0.9, M.card, { x: (i % 3) * 0.95, y: 0.35 + Math.floor(i / 3) * 0.72, z: (i % 2) * 0.2, parent: H.boxes });
  H.shipSign = plane(1.8, 0.5, lab('SHIPPING', 1.8, 0.5, '#c0353a', '#ffffff', 120), { y: 4.4, z: -4.8, parent: D });
  return H;
};
