// Microwave sets: radar lab (origin), factory exterior with radar dish (x -120), showroom with the first
// microwave oven (x 120), modern kitchen (x 200), office (x 280).
import { THREE, scene, toon, unlit, tbox, cyl, sph, cone, plane, group, place } from './engine.js';
import * as P from './paint.js';

const M = {
  floor: toon('#ffffff', P.tiles('#c9c2b0', '#8a8474', 3, 6)), wall: toon('#ffffff', P.plaster('#a9b8a8', 2)), wall2: toon('#ffffff', P.plaster('#d8cdb4', 22)),
  steel: toon('#ffffff', P.metal('#9aa3a8', 8)), dark: toon('#2a2a30'), copper: toon('#c87a3a'), wood: toon('#8a5a34'), bench: toon('#ffffff', P.planks('#7a5232', 4, 3)),
  green: toon('#3f6a52'), screen: unlit('#7ff0a0'), glow: unlit('#ffb060'), red: toon('#c0353a'), cream: toon('#efe8d8'), brick: toon('#ffffff', P.brick('#9a4a34', 4)),
  roof: toon('#5d6470'), glass: toon('#33405a'), white: toon('#f4f1ea'), counter: toon('#ffffff', P.tiles('#f2efe6', '#c9c2b0', 5, 4)), cab: toon('#5f8fa8'),
};
const chalk = (() => { const c = document.createElement('canvas'); c.width = 1024; c.height = 512; const g = c.getContext('2d');
  g.fillStyle = '#24382e'; g.fillRect(0, 0, 1024, 512); g.strokeStyle = '#7a5a3a'; g.lineWidth = 24; g.strokeRect(0, 0, 1024, 512);
  g.fillStyle = '#eef2e8'; g.font = 'bold 46px Georgia, serif';
  ['λ = c / f', 'P = V · I', '∇ × E = −∂B/∂t', 'f = 2.45 GHz ?', 'ω = 2πf'].forEach((t, i) => g.fillText(t, 60 + (i % 2) * 460, 100 + i * 80));
  g.strokeStyle = '#eef2e8'; g.lineWidth = 5; g.beginPath(); for (let x = 560; x < 960; x += 4) g.lineTo(x, 380 + 50 * Math.sin((x - 560) / 30)); g.stroke();
  return P.ctex(c, false); })();

export const build = () => {
  const H = {};
  // ---------------- lab (origin) ----------------
  tbox(12, 0.1, 10, M.floor, { y: -0.05, tm: 1.2 });
  tbox(12, 4, 0.2, M.wall, { y: 2, z: -4, tm: 3 }); tbox(0.2, 4, 10, M.wall, { x: -6, y: 2, tm: 3 }); tbox(0.2, 4, 10, M.wall, { x: 6, y: 2, tm: 3 });
  plane(2.6, 1.3, unlit('#ffffff', chalk), { x: -3.2, y: 2.1, z: -3.88 });
  for (const x of [2.6, 4.4]) plane(1.3, 1.6, unlit('#bfd8ef'), { x, y: 2.3, z: -3.88 });
  // magnetron rig: cabinet + copper tube + horn
  const rig = group({ x: 0.3, z: -2.4 }); H.rig = rig;
  tbox(1.6, 1.1, 0.9, M.steel, { y: 0.55, parent: rig }); tbox(1.5, 0.05, 0.85, M.dark, { y: 1.12, parent: rig });
  for (let k = 0; k < 4; k++) { cyl(0.07, 0.07, 0.05, M.dark, { x: -0.55 + k * 0.3, y: 0.8, z: 0.46, rx: Math.PI / 2, parent: rig, seg: 12 }); sph(0.04, k % 2 ? M.red : M.screen, { x: -0.55 + k * 0.3, y: 0.55, z: 0.46, parent: rig, seg: 8 }); }
  const mag = group({ y: 1.35, parent: rig }); H.mag = mag;
  cyl(0.2, 0.2, 0.45, M.copper, { rz: Math.PI / 2, parent: mag, seg: 20 }); for (let k = 0; k < 6; k++) cyl(0.28, 0.28, 0.02, M.copper, { x: -0.18 + k * 0.07, rz: Math.PI / 2, parent: mag, seg: 20 });
  const horn = cone(0.3, 0.6, M.steel, { y: 0, z: 0.45, rx: -Math.PI / 2, parent: mag, seg: 4 }); horn.rotation.y = Math.PI / 4;
  H.magGlow = sph(0.1, M.glow, { z: 0.76, parent: mag, seg: 10 }); H.magGlow.userData.noND = true;
  for (let k = 0; k < 3; k++) { const c = cyl(0.03, 0.03, 1.6, M.dark, { x: 0.7 - k * 0.1, y: 0.6, z: -0.5, rz: 0.6, parent: rig, seg: 6 }); }
  // bench with oscilloscopes + popcorn/egg table
  tbox(2.6, 0.08, 0.9, M.bench, { x: -3.4, y: 0.92, z: -2.9 }); tbox(2.5, 0.88, 0.8, M.green, { x: -3.4, y: 0.44, z: -2.9 });
  for (const x of [-4.2, -3.2]) { tbox(0.6, 0.45, 0.45, M.cream, { x, y: 1.2, z: -3.0 }); plane(0.42, 0.3, M.screen, { x, y: 1.22, z: -2.77 }); }
  H.table = group({ x: 1.6, z: -1.3 }); tbox(0.8, 0.06, 0.6, M.wood, { y: 0.9, parent: H.table }); for (const [x, z] of [[-0.35, -0.25], [0.35, -0.25], [-0.35, 0.25], [0.35, 0.25]]) tbox(0.05, 0.9, 0.05, M.wood, { x, y: 0.45, z, parent: H.table });
  H.egg = sph(0.06, M.white, { x: 1.6, y: 1.0, z: -1.3, seg: 12 }); H.egg.scale.set(1, 1.3, 1);
  // ---------------- factory exterior (x -120) ----------------
  const F = group({ x: -120 });
  tbox(200, 0.1, 200, toon('#ffffff', P.cobble('#8d877c', 6)), { y: -0.05, parent: F, tm: 2 });
  tbox(26, 9, 12, M.brick, { y: 4.5, z: -8, parent: F, tm: 2.4 });
  for (let k = 0; k < 6; k++) for (let fl = 0; fl < 2; fl++) tbox(2.2, 2.2, 0.1, M.glass, { x: -10 + k * 4, y: 2.6 + fl * 3.6, z: -1.94, parent: F });
  tbox(2.2, 2.8, 0.1, toon('#3a4a5a'), { x: 0, y: 1.4, z: -1.94, parent: F });
  plane(6, 1.0, unlit('#ffffff', P.label('RADAR LAB', { w: 1024, h: 170, bg: '#1d2a44', fg: '#f2e2b0', border: '#c9a040', font: 'bold 110px Georgia, serif' })), { y: 8.2, z: -1.88, parent: F });
  const mast = group({ x: 6, y: 9, z: -8, parent: F }); cyl(0.2, 0.25, 4, M.steel, { y: 2, parent: mast, seg: 8 });
  H.dish = group({ y: 4.2, parent: mast });
  const dg = new THREE.SphereGeometry(2.6, 24, 12, 0, Math.PI * 2, 0, 0.7); const dish = new THREE.Mesh(dg, toon('#c9ccd2', null, { side: THREE.DoubleSide })); place(dish, { parent: H.dish, rx: Math.PI / 2 + 0.25 }); dish.position.z = 2.6;
  cyl(0.06, 0.06, 1.6, M.dark, { z: 0.9, rx: Math.PI / 2 + 0.25, parent: H.dish, seg: 6 });
  for (let i = 0; i < 5; i++) { const c = plane(40, 18, unlit('#ffffff', P.cloudTex(i + 3), { transparent: true, fog: false, depthWrite: false }), { x: -100 + i * 50, y: 50 + (i % 3) * 12, z: -200, parent: F }); c.userData.noND = true; }
  // ---------------- showroom (x 120) ----------------
  const S = group({ x: 120 });
  tbox(14, 0.1, 12, toon('#ffffff', P.planks('#8a6a4a', 41, 5)), { y: -0.05, parent: S, tm: 1.6 });
  tbox(14, 5, 0.2, M.wall2, { y: 2.5, z: -4, parent: S, tm: 3 });
  const oven = group({ z: -1.8, parent: S }); H.oven = oven;
  tbox(1.2, 0.08, 1.0, M.dark, { y: 0.04, parent: oven });
  tbox(1.0, 1.85, 0.85, M.steel, { y: 0.98, parent: oven, tm: 1 });
  tbox(0.7, 0.55, 0.04, toon('#1d2430'), { y: 1.1, z: 0.44, parent: oven }); H.ovenWin = plane(0.6, 0.45, unlit('#ffcf70'), { y: 1.1, z: 0.465, parent: oven });
  for (let k = 0; k < 3; k++) cyl(0.06, 0.06, 0.05, M.dark, { x: -0.25 + k * 0.25, y: 1.6, z: 0.44, rx: Math.PI / 2, parent: oven, seg: 12 });
  tbox(0.06, 0.4, 0.06, M.dark, { x: 0.42, y: 1.1, z: 0.47, parent: oven });
  // floor scale with a display
  tbox(1.4, 0.1, 1.2, toon('#6a6f78'), { y: 0.05, z: -1.8, parent: S });
  H.scaleLabel = plane(0.8, 0.32, unlit('#ffffff', P.label('750 LB', { w: 512, h: 200, bg: '#1d1d24', fg: '#ff6a40', border: '#888', font: 'bold 120px Georgia, serif' })), { x: -1.2, y: 0.9, z: -1.1, parent: S });
  tbox(0.9, 0.4, 0.1, M.dark, { x: -1.2, y: 0.9, z: -1.16, parent: S }); tbox(0.08, 0.7, 0.08, M.dark, { x: -1.2, y: 0.35, z: -1.2, parent: S });
  plane(4, 0.8, unlit('#ffffff', P.label('1947', { w: 800, h: 160, bg: '#c0353a', fg: '#ffffff', border: null, font: 'bold 120px Georgia, serif' })), { y: 3.6, z: -3.88, parent: S });
  // ---------------- modern kitchen (x 200) ----------------
  const K = group({ x: 200 });
  tbox(12, 0.1, 10, toon('#ffffff', P.tiles('#e8e2d6', '#b8b0a0', 7, 6)), { y: -0.05, parent: K, tm: 1.2 });
  tbox(12, 3.2, 0.2, toon('#ffffff', P.plaster('#f2dcc0', 72)), { y: 1.6, z: -3, parent: K });
  tbox(5, 0.9, 0.7, M.cab, { y: 0.45, z: -2.55, parent: K }); tbox(5.1, 0.06, 0.75, M.counter, { y: 0.93, z: -2.55, parent: K, tm: 0.6 });
  for (let k = 0; k < 4; k++) tbox(1.1, 0.7, 0.4, M.cab, { x: -1.8 + k * 1.2, y: 2.1, z: -2.75, parent: K });
  tbox(0.9, 2.0, 0.8, M.white, { x: 3.2, y: 1.0, z: -2.5, parent: K });
  const mw = group({ x: 0.4, y: 0.96, z: -2.55, parent: K }); H.mw = mw;
  tbox(0.6, 0.36, 0.42, toon('#2e2e36'), { y: 0.18, parent: mw }); H.mwWin = plane(0.36, 0.24, unlit('#ffd88a'), { x: -0.06, y: 0.19, z: 0.215, parent: mw });
  tbox(0.12, 0.26, 0.02, toon('#55555f'), { x: 0.22, y: 0.19, z: 0.215, parent: mw });
  // ---------------- office (x 280) ----------------
  const O = group({ x: 280 });
  tbox(12, 0.1, 10, toon('#ffffff', P.planks('#6a4a30', 51, 6)), { y: -0.05, parent: O, tm: 1.4 });
  tbox(12, 3.6, 0.2, toon('#ffffff', P.plaster('#cbbf9e', 52)), { y: 1.8, z: -3, parent: O });
  plane(1.6, 1.4, unlit('#bfd8ef'), { x: 2.2, y: 2.0, z: -2.88, parent: O });
  tbox(2.0, 0.08, 1.0, M.wood, { y: 0.78, z: -1.8, parent: O }); tbox(1.9, 0.74, 0.9, toon('#5a3a22'), { y: 0.37, z: -1.8, parent: O });
  plane(1.2, 0.6, unlit('#ffffff', P.label('BONUS', { w: 512, h: 256, bg: '#f4ecd2', fg: '#2a2030', font: 'bold 100px Georgia, serif' })), { x: -2.3, y: 2.2, z: -2.88, parent: O });
  return H;
};
