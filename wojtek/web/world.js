// Wojtek sets: army camp (origin), Iranian desert road (x -120), enlistment tent office (x 120),
// Monte Cassino hillside (x 220), Scottish zoo enclosure (x 320).
import { THREE, scene, toon, unlit, tbox, cyl, sph, cone, plane, group, place } from './engine.js';
import * as P from './paint.js';

const M = {
  sand: toon('#ffffff', P.dirt('#d8b27a', 61)), olive: toon('#7d7a4e'), oliveD: toon('#5f5c3a'), canvas: toon('#a89a6a'), wood: toon('#8a5a34'), dark: toon('#2a2a30'),
  steel: toon('#6a6f60'), tire: toon('#1f1d22'), crate: toon('#8a7d50'), shell: toon('#c9a040'), rock: toon('#8d8478'), white: toon('#e8e2d2'),
  grass: toon('#ffffff', P.grass('#5f8a3a', 7)), stone: toon('#ffffff', P.cobble('#8a8478', 6)), water: toon('#5d8fb5'), green: toon('#3f6a3a'), red: toon('#c0353a'),
};
const tent = (o) => { const g = group(o); const c = cone(2.4, 2.6, M.canvas, { y: 1.3, parent: g, seg: 4, ry: Math.PI / 4 }); tbox(0.9, 1.4, 0.05, M.oliveD, { y: 0.7, z: 1.68, parent: g }); return g; };
const truck = (o) => { const g = group(o);
  tbox(1.4, 1.2, 1.6, M.olive, { x: 1.0, y: 1.1, parent: g }); tbox(1.0, 0.8, 1.4, M.olive, { x: 2.1, y: 0.9, parent: g }); tbox(2.8, 0.12, 1.9, M.oliveD, { x: -1.1, y: 0.75, parent: g });
  const cov = cyl(1.0, 1.0, 2.8, M.canvas, { x: -1.1, y: 1.0, rz: Math.PI / 2, parent: g, seg: 16 }); cov.scale.set(1, 1, 0.95);
  for (const [x, z] of [[2.0, -0.9], [2.0, 0.9], [-1.5, -0.9], [-1.5, 0.9]]) cyl(0.4, 0.4, 0.24, M.tire, { x, y: 0.4, z, rx: Math.PI / 2, parent: g, seg: 16 });
  return g; };
const crates = (x, z, n, parent) => { for (let i = 0; i < n; i++) { const c = tbox(0.7, 0.45, 0.5, M.crate, { x: x + (i % 3) * 0.75, y: 0.23 + Math.floor(i / 3) * 0.46, z, parent }); } };

export const build = () => {
  const H = {};
  // ---------------- camp (origin) ----------------
  tbox(400, 0.1, 400, M.sand, { y: -0.05, tm: 4 });
  for (const [x, z] of [[-6, -6], [-1, -8], [4, -7], [9, -6], [-10, -3]]) tent({ x, z });
  H.campTruck = truck({ x: 7, z: -1.5, ry: -0.3 });
  crates(-5, -1.5, 5);
  const pole = cyl(0.06, 0.06, 6, M.wood, { x: 0.5, y: 3, z: -4, seg: 6 });
  H.flag = plane(1.6, 1.0, unlit('#ffffff', (() => { const c = document.createElement('canvas'); c.width = 160; c.height = 100; const g = c.getContext('2d'); g.fillStyle = '#f4f1ea'; g.fillRect(0, 0, 160, 50); g.fillStyle = '#d0303a'; g.fillRect(0, 50, 160, 50); return P.ctex(c, false); })(), { side: THREE.DoubleSide }), { x: 1.3, y: 5.5, z: -4 });
  for (let i = 0; i < 8; i++) { const h = sph(30 + (i % 3) * 10, toon('#c9a06a'), { x: -150 + i * 45, y: -22, z: -160, seg: 16 }); h.scale.set(1.6, 0.8, 1); }
  H.fire = group({ x: -2.5, z: 1.5 }); for (let k = 0; k < 4; k++) { const l = tbox(0.9, 0.1, 0.1, M.wood, { y: 0.05, parent: H.fire }); l.rotation.y = k * Math.PI / 4; }
  H.flame = cone(0.3, 0.8, unlit('#ffa040'), { y: 0.45, parent: H.fire, seg: 8 }); H.flame.userData.noND = true;
  H.fireLight = new THREE.PointLight('#ffa050', 0, 8, 1.5); H.fireLight.position.set(-2.5, 1.0, 1.5); scene.add(H.fireLight);
  tbox(0.12, 1.0, 0.12, M.wood, { x: 4.5, y: 0.5, z: 0.7 }); tbox(1.35, 1.35, 0.08, M.wood, { x: 4.5, y: 1.6, z: 0.72 });
  // ---------------- desert road (x -120) ----------------
  const D = group({ x: -120 });
  tbox(200, 0.03, 4, toon('#b89a6a'), { y: 0.015, z: 2, parent: D });
  for (let i = 0; i < 9; i++) { const d = sph(8 + (i % 3) * 4, toon('#e0bc80'), { x: -40 + i * 10, y: -9, z: -22 - (i % 2) * 8, parent: D, seg: 14 }); d.scale.set(1.8, 0.6, 1); }
  for (let i = 0; i < 5; i++) { const m = sph(26 + i * 3, toon('#a88a66'), { x: -60 + i * 30, y: -10, z: -110, parent: D, seg: 12 }); m.scale.set(1.5, 0.9, 1); }
  H.desertTruck = truck({ x: -126, z: 2.0 });
  // ---------------- enlistment office (x 120) ----------------
  const O = group({ x: 120 });
  tbox(14, 0.1, 10, toon('#ffffff', P.planks('#8a6a4a', 41, 5)), { y: -0.05, parent: O, tm: 1.6 });
  tbox(14, 4, 0.2, M.canvas, { y: 2, z: -3, parent: O });
  tbox(2.0, 0.08, 1.0, M.wood, { y: 0.78, z: -1.6, parent: O }); tbox(1.9, 0.74, 0.9, toon('#5a3a22'), { y: 0.37, z: -1.6, parent: O });
  plane(1.4, 0.7, unlit('#ffffff', P.label('NO PETS', { w: 512, h: 256, bg: '#f4ecd2', fg: '#c0353a', font: 'bold 110px Georgia, serif' })), { x: -1.8, y: 2.2, z: -2.88, parent: O });
  H.paper = plane(0.5, 0.35, unlit('#ffffff', P.label('PTE. WOJTEK', { w: 512, h: 360, bg: '#f8f4e8', fg: '#2a2030', border: '#2a2030', font: 'bold 64px Georgia, serif' })), { x: 0.1, y: 0.83, z: -1.5, rx: -Math.PI / 2, parent: O });
  H.ration = group({ x: 120 + 1.4, z: -1.0 }); tbox(0.6, 0.4, 0.4, M.crate, { y: 0.2, parent: H.ration }); plane(0.5, 0.18, unlit('#ffffff', P.label('RATIONS', { w: 400, h: 140, bg: '#8a7d50', fg: '#1d1a14', border: null, font: 'bold 64px Georgia, serif' })), { y: 0.22, z: 0.205, parent: H.ration });
  // ---------------- Monte Cassino (x 220) ----------------
  const K = group({ x: 220 });
  tbox(60, 0.2, 30, toon('#ffffff', P.dirt('#8a7a5a', 71)), { y: -0.1, z: 5, parent: K, tm: 4 }); const slope = tbox(60, 2, 40, toon('#ffffff', P.dirt('#7a6a4a', 72)), { y: 2, z: -28, parent: K, tm: 4 }); slope.rotation.x = 0.3;
  for (let k = 0; k < 18; k++) sph(0.5 + (k % 3) * 0.4, M.rock, { x: -14 + k * 1.7, y: 0.2 - (k % 4) * 0.2, z: -3 - (k % 5) * 1.5, parent: K, seg: 8 }).scale.set(1.4, 0.7, 1);
  const mon = group({ y: 9, z: -38, parent: K }); tbox(20, 8, 8, M.white, { y: 4, parent: mon }); tbox(6, 12, 6, M.white, { x: -4, y: 6, parent: mon });
  for (let k = 0; k < 6; k++) tbox(1.5, 2.5, 0.3, toon('#3a3640'), { x: -8 + k * 3.2, y: 4, z: 4.05, parent: mon });
  const gun = group({ x: 3.4, y: 0.4, z: -3.8, parent: K }); H.gun = gun;
  for (const z of [-0.8, 0.8]) cyl(0.6, 0.6, 0.18, M.tire, { z, y: 0.6, rx: Math.PI / 2, parent: gun, seg: 16 });
  tbox(1.4, 0.4, 1.2, M.olive, { y: 0.9, parent: gun }); H.barrel = cyl(0.12, 0.16, 3.2, M.oliveD, { y: 1.5, x: 1.2, rz: -1.2, parent: gun, seg: 10 });
  crates(220 - 4.2, -2.5, 6); crates(220 + 1.4, -4.6, 4);
  // ---------------- zoo (x 320) ----------------
  const Z = group({ x: 320 });
  tbox(40, 0.1, 40, M.grass, { y: -0.05, parent: Z, tm: 3 });
  tbox(16, 1.3, 0.6, M.stone, { y: 0.65, z: 2.2, parent: Z, tm: 1.2 });
  for (let x = -8; x <= 8; x += 1.2) cyl(0.04, 0.04, 1.2, M.dark, { x, y: 1.9, z: 2.2, parent: Z, seg: 6 });
  tbox(16, 0.05, 0.05, M.dark, { y: 2.48, z: 2.2, parent: Z });
  for (const [x, z, r] of [[-3, -3, 1.4], [2.5, -4, 1.8], [5, -1.5, 1.0]]) sph(r, M.rock, { x, y: r * 0.3, z, parent: Z, seg: 10 }).scale.set(1.3, 0.7, 1);
  const pool = cyl(2.2, 2.2, 0.05, M.water, { x: -4.5, y: 0.03, z: -0.8, parent: Z, seg: 28 }); pool.castShadow = false;
  tbox(16, 4, 0.4, M.stone, { y: 2, z: -7, parent: Z, tm: 1.6 });
  for (let i = 0; i < 6; i++) { const t = group({ x: -16 + i * 6.5, z: -12, parent: Z }); cyl(0.2, 0.3, 3, M.wood, { y: 1.5, parent: t, seg: 6 }); sph(2.2, M.green, { y: 4.2, parent: t, seg: 12 }); }
  plane(2.4, 0.7, unlit('#ffffff', P.label('ZOO', { w: 512, h: 150, bg: '#2f4f3a', fg: '#f2e2b0', border: '#c9a040', font: 'bold 110px Georgia, serif' })), { x: 5.5, y: 2.0, z: 2.52, parent: Z });
  for (let i = 0; i < 5; i++) { const c = plane(40, 18, unlit('#ffffff', P.cloudTex(i + 3), { transparent: true, fog: false, depthWrite: false }), { x: -100 + i * 50, y: 45 + (i % 3) * 10, z: -200 }); c.userData.noND = true; }
  return H;
};
