// "Why Are School Buses Yellow?" sets: 1939 schoolyard (origin), Columbia meeting room (x 150), dawn/fog road (x -150).
import { THREE, scene, toon, unlit, tbox, cyl, sph, cone, plane, group } from './engine.js';
import * as P from './paint.js';

export const YELLOW = '#f2b21c';
const M = { wood: toon('#8a5a34'), dark: toon('#2a2a30'), tire: toon('#1f1d22'), glass: toon('#33445a'), white: toon('#f2efe6'), green: toon('#3f6a3a'), road: toon('#5a5a60'), chrome: toon('#b8bcc4') };
const label = (s, w, h, o = {}) => unlit('#ffffff', P.label(s, { w: 1024, h: Math.round(1024 * h / w), bg: o.bg ?? '#f2b21c', fg: '#141414', border: null, font: `900 ${o.fs ?? 150}px Georgia, serif` }));

// a 1930s school bus; returns { g, mat } so the body colour can change
const bus = (col, o) => {
  const g = group(o), mat = toon(col);
  tbox(6.2, 2.0, 2.3, mat, { x: -0.4, y: 1.55, parent: g });           // body
  tbox(1.5, 1.1, 2.0, mat, { x: 3.4, y: 1.05, parent: g });            // hood
  tbox(6.25, 0.12, 2.35, M.dark, { x: -0.4, y: 1.15, parent: g });     // rub rail
  tbox(6.25, 0.12, 2.35, M.dark, { x: -0.4, y: 0.62, parent: g });
  for (let i = 0; i < 7; i++) for (const z of [-1.16, 1.16]) tbox(0.62, 0.62, 0.04, M.glass, { x: -3.1 + i * 0.82, y: 2.05, z, parent: g });
  tbox(0.05, 0.8, 1.9, M.glass, { x: 2.72, y: 2.0, parent: g });      // windshield
  for (const [x, z] of [[2.9, -1.1], [2.9, 1.1], [-2.6, -1.1], [-2.6, 1.1]]) cyl(0.45, 0.45, 0.3, M.tire, { x, y: 0.45, z, rx: Math.PI / 2, parent: g, seg: 16 });
  for (const z of [-0.7, 0.7]) { const h = sph(0.16, unlit('#fff6c8'), { x: 4.17, y: 1.2, z, parent: g, seg: 10 }); h.userData.noND = true; }
  tbox(0.1, 0.5, 2.1, M.chrome, { x: 4.18, y: 0.6, parent: g });
  const sides = [];
  for (const [z, ry] of [[1.19, 0], [-1.19, Math.PI]]) { const l = plane(3.4, 0.5, label('SCHOOL BUS', 3.4, 0.5, { bg: YELLOW }), { x: -0.6, y: 2.75, z, ry, parent: g }); sides.push(l); }
  sides.forEach((s) => (s.visible = col === YELLOW));
  return { g, mat, sides, col };
};
export const recolor = (b, col) => { b.mat.color.set(col); b.sides.forEach((s) => (s.visible = col === YELLOW)); };

export const build = () => {
  const H = {};
  // ---------------- schoolyard (origin) ----------------
  tbox(800, 0.1, 300, toon('#ffffff', P.grass('#6f9a45', 7)), { y: -0.05, tm: 10 });
  tbox(120, 0.04, 5, M.road, { y: 0.02, z: 0.5 });
  for (let i = 0; i < 20; i++) tbox(1.4, 0.02, 0.15, toon('#f2efe6'), { x: -60 + i * 6, y: 0.05, z: 0.5 });
  const sch = group({ x: 0, z: -12 });
  tbox(14, 5, 6, toon('#ffffff', P.brick('#a4553c', 4)), { y: 2.5, parent: sch, tm: 2 });
  const roof = cone(9.5, 3, toon('#5d6470'), { y: 6.5, parent: sch, seg: 4 }); roof.rotation.y = Math.PI / 4; roof.scale.set(1, 1, 0.6);
  tbox(1.6, 2.4, 1.6, M.white, { y: 8.4, parent: sch }); cone(1.3, 1.4, toon('#c0353a'), { y: 10.3, parent: sch, seg: 4 }).rotation.y = Math.PI / 4;
  for (let i = 0; i < 4; i++) tbox(1.4, 1.8, 0.1, toon('#bcd8ef'), { x: -5 + i * 3.3 + (i > 1 ? 0.6 : 0), y: 2.8, z: 3.02, parent: sch });
  tbox(1.6, 2.6, 0.1, M.wood, { x: 0.3, y: 1.3, z: 3.02, parent: sch });
  plane(4.4, 0.7, unlit('#ffffff', P.label('SCHOOL', { w: 1024, h: 160, bg: '#f2efe6', fg: '#2a2030', font: 'bold 120px Georgia, serif' })), { y: 4.4, z: 3.08, parent: sch });
  for (let i = 0; i < 8; i++) { const t = group({ x: -40 + i * 11, z: -22 - (i % 2) * 5 }); cyl(0.25, 0.35, 3, M.wood, { y: 1.5, parent: t, seg: 6 }); sph(2.4, M.green, { y: 4.4, parent: t, seg: 12 }); }
  for (let i = 0; i < 6; i++) { const c = plane(40, 18, unlit('#ffffff', P.cloudTex(i + 3), { transparent: true, fog: false, depthWrite: false }), { x: -120 + i * 50, y: 45 + (i % 3) * 10, z: -200 }); c.userData.noND = true; }
  H.red = bus('#c0353a', { x: -8, z: 0.5 }); H.blue = bus('#2d58b8', { x: 0, z: 0.5 });
  // farm truck with benches (x 8)
  const tr = group({ x: 8.5, z: 0.5 }); H.truck = tr; H.truckMat = toon('#6a5a3a');
  tbox(1.6, 1.6, 2.0, toon('#4a6a3a'), { x: 2.4, y: 1.3, parent: tr }); tbox(1.0, 0.9, 1.8, toon('#4a6a3a'), { x: 3.5, y: 0.95, parent: tr });
  tbox(4.4, 0.2, 2.3, H.truckMat, { x: -0.6, y: 0.95, parent: tr });
  for (const z of [-1.1, 1.1]) tbox(4.4, 0.5, 0.08, H.truckMat, { x: -0.6, y: 1.3, z, parent: tr });
  for (const z of [-0.7, 0.7]) tbox(4.0, 0.1, 0.35, M.wood, { x: -0.6, y: 1.4, z, parent: tr });
  for (const [x, z] of [[2.6, -1.0], [2.6, 1.0], [-1.8, -1.0], [-1.8, 1.0]]) cyl(0.45, 0.45, 0.3, M.tire, { x, y: 0.45, z, rx: Math.PI / 2, parent: tr, seg: 16 });
  H.yTruck = bus(YELLOW, { x: 8.5, z: 0.5 }); H.yTruck.g.visible = false;
  // ---------------- meeting room (x 150) ----------------
  const C = group({ x: 150 });
  tbox(16, 0.1, 12, toon('#ffffff', P.planks('#7a5232', 51, 6)), { y: 0.06, parent: C, tm: 1.4 });
  tbox(16, 5, 0.2, toon('#ffffff', P.plaster('#d6cdb8', 52)), { y: 2.5, z: -3, parent: C });
  const sw = document.createElement('canvas'); sw.width = 2000; sw.height = 400; const g = sw.getContext('2d');
  g.fillStyle = '#efe8d8'; g.fillRect(0, 0, 2000, 400);
  const c0 = new THREE.Color('#fff04a'), c1 = new THREE.Color('#c8321e'), cc = new THREE.Color();
  for (let i = 0; i < 50; i++) { g.fillStyle = `hsl(${56 - 50 * i / 49}, 92%, ${58 - 8 * i / 49}%)`; g.fillRect(20 + i * 39.2, 30, 30, 340); g.strokeStyle = '#2a2030'; g.lineWidth = 3; g.strokeRect(20 + i * 39.2, 30, 30, 340); }
  plane(9.0, 1.8, unlit('#ffffff', P.ctex(sw, false)), { y: 2.6, z: -2.88, parent: C });
  H.pick = plane(0.32, 1.75, unlit(YELLOW), { x: 150 - 4.5 + (20 + 16 * 39.2 + 15) / 2000 * 9.0, y: 2.6, z: -2.84 }); H.pick.visible = false;
  plane(3.4, 0.55, unlit('#ffffff', P.label('COLUMBIA UNIVERSITY', { w: 1024, h: 166, bg: '#2b3b7a', fg: '#f2efe6', border: '#c9a040', font: 'bold 96px Georgia, serif' })), { y: 4.25, z: -2.88, parent: C });
  tbox(6, 0.12, 1.6, M.wood, { y: 0.8, z: 0.4, parent: C }); for (const x of [-2.7, 2.7]) tbox(0.15, 0.75, 1.4, M.wood, { x, y: 0.42, z: 0.4, parent: C });
  for (let k = 0; k < 6; k++) tbox(0.45, 0.02, 0.32, toon('#f4ecd2'), { x: -2.2 + k * 0.9, y: 0.87, z: 0.4, parent: C });
  // ---------------- dawn / fog road (x -150) ----------------
  const R = group({ x: -150 });
  tbox(200, 0.04, 5, M.road, { y: 0.02, z: 0.5, parent: R });
  for (let i = 0; i < 30; i++) tbox(1.4, 0.02, 0.15, toon('#f2efe6'), { x: -90 + i * 6, y: 0.05, z: 0.5, parent: R });
  for (let i = 0; i < 12; i++) { const t = group({ x: -60 + i * 10, z: -7 - (i % 3) * 4, parent: R }); cyl(0.2, 0.3, 3, M.wood, { y: 1.5, parent: t, seg: 6 }); sph(2.0, M.green, { y: 4.0, parent: t, seg: 12 }); }
  const stop = group({ x: -150 + 1.5, z: 3.6 }); cyl(0.05, 0.05, 2.4, M.chrome, { y: 1.2, parent: stop, seg: 6 }); plane(0.7, 0.45, unlit('#ffffff', P.label('BUS STOP', { w: 512, h: 330, bg: '#2d58b8', fg: '#ffffff', font: 'bold 110px Georgia, serif' })), { y: 2.4, z: 0.03, parent: stop });
  H.road = bus(YELLOW, { x: -150, z: 0.5 });
  return H;
};
