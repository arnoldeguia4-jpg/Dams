// "Why Is Super Glue So Strong?" sets: 1942 chemistry lab (origin), 1951 jet hangar (x 150), 1958 store (x -150), field (x 300).
import { THREE, scene, toon, unlit, tbox, cyl, sph, cone, plane, group } from './engine.js';
import * as P from './paint.js';

const M = { wood: toon('#8a5a34'), dark: toon('#2a2a30'), steel: toon('#8d949c'), white: toon('#f2efe6'), glass: toon('#cfe9ef'), green: toon('#3f6a3a'), olive: toon('#6a7040'), silver: toon('#b8bcc4') };
const lab = (s, w, h, bg, fg, fs = 120) => unlit('#ffffff', P.label(s, { w: 1024, h: Math.round(1024 * h / w), bg, fg, font: `bold ${fs}px Georgia, serif` }));
const flask = (o, col = '#9fd4ff') => { const g = group(o); cone(0.18, 0.3, toon(col), { y: 0.15, parent: g, seg: 12 }); cyl(0.05, 0.05, 0.2, M.glass, { y: 0.4, parent: g, seg: 8 }); return g; };

export const build = () => {
  const H = {};
  // ---------------- lab 1942 (origin) ----------------
  tbox(30, 0.1, 30, toon('#ffffff', P.tiles('#dfe7e2', '#8d9a95', 3, 8)), { y: -0.05, tm: 3 });
  tbox(14, 5, 0.2, toon('#ffffff', P.plaster('#e9e0c9', 2)), { y: 2.5, z: -3 });
  for (const [x, w] of [[-2, 3.4], [2.4, 3.0]]) { tbox(w, 0.1, 1.1, toon('#2a2a30'), { x, y: 0.92, z: -2.0 }); tbox(w - 0.1, 0.88, 1.0, M.wood, { x, y: 0.44, z: -2.0 }); }
  for (let i = 0; i < 6; i++) flask({ x: -3.4 + i * 0.55, y: 0.97, z: -2.1 }, ['#9fd4ff', '#f0c93a', '#a0e0b0'][i % 3]);
  tbox(3.2, 0.08, 0.35, M.wood, { x: -2, y: 2.4, z: -2.8 }); for (let i = 0; i < 7; i++) cyl(0.08, 0.08, 0.35, toon(['#c0353a', '#2b4c9a', '#f0c93a'][i % 3]), { x: -3.3 + i * 0.42, y: 2.62, z: -2.8, seg: 8 });
  plane(2.6, 0.6, lab('EASTMAN KODAK LAB', 2.6, 0.6, '#2a2030', '#f2d98a', 100), { y: 4.1, z: -2.88 });
  const gs = group({ x: 2.4, y: 0.97, z: -2.0 }); tbox(0.08, 0.5, 0.08, M.dark, { y: 0.25, parent: gs }); cyl(0.12, 0.12, 0.9, M.dark, { y: 0.55, rz: Math.PI / 2, parent: gs, seg: 12 }); cyl(0.11, 0.11, 0.02, M.glass, { x: 0.46, y: 0.55, rz: Math.PI / 2, parent: gs, seg: 12 });
  tbox(1.4, 1.4, 0.1, toon('#bcd8ef'), { x: 4.6, y: 2.6, z: -2.9 }); tbox(1.5, 0.1, 0.2, M.wood, { x: 4.6, y: 1.85, z: -2.85 });
  // ---------------- jet hangar 1951 (x 150) ----------------
  const J = group({ x: 150 });
  tbox(40, 0.1, 30, toon('#7a7a78'), { y: -0.05, parent: J });
  tbox(30, 9, 0.3, toon('#9aa3a8'), { y: 4.5, z: -8, parent: J });
  const jet = group({ z: -2.5, parent: J }); H.jet = jet;
  cyl(0.7, 0.55, 7, M.silver, { rz: Math.PI / 2, y: 1.5, parent: jet, seg: 16 }); cone(0.7, 1.6, M.silver, { x: 4.3, y: 1.5, rz: -Math.PI / 2, parent: jet, seg: 16 });
  const wing = tbox(2.2, 0.12, 4.6, M.silver, { x: -0.2, y: 1.3, parent: jet }); wing.rotation.y = 0.0;
  tbox(1.2, 1.4, 0.1, M.silver, { x: -3.2, y: 2.4, parent: jet }); tbox(1.2, 0.1, 2.6, M.silver, { x: -3.2, y: 1.7, parent: jet });
  H.canopy = sph(0.6, toon('#9fd4ff', null, { transparent: true, opacity: 0.85 }), { x: 1.8, y: 2.05, parent: jet, seg: 16 }); H.canopy.scale.set(1.6, 0.8, 0.9);
  for (const [x, z] of [[2.6, 0], [-0.6, -1.4], [-0.6, 1.4]]) { tbox(0.08, 0.7, 0.08, M.dark, { x, y: 0.45, z, parent: jet }); cyl(0.25, 0.25, 0.15, M.dark, { x, y: 0.25, z, rx: Math.PI / 2, parent: jet, seg: 12 }); }
  plane(3.4, 0.7, lab('1951 · JET TEST', 3.4, 0.7, '#2b3b7a', '#f2efe6', 110), { y: 6.2, z: -7.8, parent: J });
  // ---------------- store 1958 (x -150) ----------------
  const S = group({ x: -150 });
  tbox(20, 0.1, 14, toon('#ffffff', P.tiles('#e8dcc8', '#b0a090', 5, 6)), { y: -0.05, parent: S, tm: 2 });
  tbox(14, 5, 0.2, toon('#f2d9b0'), { y: 2.5, z: -3, parent: S });
  for (let r = 0; r < 4; r++) tbox(4.4, 0.08, 0.6, M.wood, { y: 0.6 + r * 0.6, z: -2.6, parent: S });
  for (const x of [-2.2, 2.2]) tbox(0.1, 2.5, 0.6, M.wood, { x, y: 1.25, z: -2.6, parent: S });
  H.tubes = [];
  for (let r = 0; r < 4; r++) for (let i = 0; i < 9; i++) { const t = group({ x: -1.9 + i * 0.47, y: 0.64 + r * 0.6, z: -2.55, parent: S }); tbox(0.22, 0.36, 0.08, M.white, { y: 0.18, parent: t }); cone(0.05, 0.12, toon('#c0353a'), { y: 0.42, parent: t, seg: 6 }); tbox(0.23, 0.06, 0.09, toon('#2b4c9a'), { y: 0.22, parent: t }); }
  plane(3.6, 0.8, lab('NEW! SUPER GLUE', 3.6, 0.8, '#c0353a', '#ffffff', 120), { y: 3.5, z: -2.88, parent: S });
  plane(1.4, 0.5, lab('1958', 1.4, 0.5, '#f2efe6', '#2a2030', 150), { x: -4, y: 3.4, z: -2.88, parent: S });
  tbox(3.0, 1.0, 1.0, toon('#8a5a34'), { x: 4, y: 0.5, z: 0.5, parent: S });
  // ---------------- field 1942 (x 300) ----------------
  const F = group({ x: 300 });
  tbox(200, 0.1, 200, toon('#ffffff', P.dirt('#8a7a5a', 71)), { y: -0.05, parent: F, tm: 4 });
  for (let k = 0; k < 10; k++) sph(0.6 + (k % 3) * 0.4, toon('#8d8478'), { x: -12 + k * 2.6, y: 0.1, z: -5 - (k % 4) * 1.6, parent: F, seg: 8 }).scale.set(1.4, 0.6, 1);
  for (let i = 0; i < 6; i++) { const c = plane(40, 18, unlit('#ffffff', P.cloudTex(i + 3), { transparent: true, fog: false, depthWrite: false }), { x: 180 + i * 50, y: 40, z: -150 }); c.userData.noND = true; }
  return H;
};
