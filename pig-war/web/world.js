// Sets: San Juan Island (x 0: Cutlar's farm + potato patch; x -24: American camp with cannons; sea to the north with British warships),
// the Kaiser's study in Berlin (x KX). British warships reuse the Vasa ship builder with a red ensign.
import { THREE, scene, toon, unlit, tbox, cyl, sph, cone, plane, group, place } from './engine.js';
import * as P from './paint.js';

export const KX = 300, FARM = [0, 0, 0], PATCH = [2.2, 0, -2.6], CAMP = [-24, 0, 0];
const waterTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d'), r = P.rng(41);
  g.fillStyle = '#3f7fb5'; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 160; i++) { g.strokeStyle = r() > 0.5 ? '#6aa6d6' : '#2f6a9e'; g.lineWidth = 4; const x = r() * 512, y = r() * 512; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 20, y - 8, x + 40, y); g.stroke(); }
  return P.ctex(c); })();

const hullWidth = (x, y) => {
  let k = 0.42 + 0.58 * Math.min(1, Math.max(0, (y + 2.6) / 4.2)) ** 0.7;
  if (x > 6) k *= 1 - Math.min(1, (x - 6) / 7.2) ** 1.6 * 0.95;
  if (x < -10) k *= 1 - (-10 - x) * 0.06;
  return 3.1 * k;
};

export const buildShip = (o = {}) => {
  const root = group(o), roll = group({ parent: root }); root.userData.roll = roll;
  const mats = [];
  const M = (c, map = null) => { const m = toon(c, map); mats.push(m); return m; };
  // hull with vertex colours: wood below, red band, gold trim at the top
  const geo = new THREE.BoxGeometry(24, 6.2, 6.2, 24, 14, 6), pos = geo.attributes.position, cols = [];
  const wood = new THREE.Color('#5d3c22'), red = new THREE.Color('#8e2a24'), gold = new THREE.Color('#d8a632'), blue = new THREE.Color('#2b3b6a');
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i) + 0.6, z = pos.getZ(i);
    const w = hullWidth(x, y); pos.setZ(i, Math.sign(z) * Math.min(Math.abs(z), 3.1) / 3.1 * w);
    const sheer = 0.012 * x * x * 0.08; pos.setY(i, y + (y > 0 ? sheer : 0));
    const c = y > 3.25 ? gold : y > 2.85 ? blue : y > 1.4 ? red : wood; cols.push(c.r, c.g, c.b);
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3)); geo.computeVertexNormals();
  const hm = toon('#ffffff', null, { vertexColors: true }); mats.push(hm);
  place(new THREE.Mesh(geo, hm), { parent: roll });
  tbox(21.5, 0.12, 5.8, M('#ffffff', P.planks('#a8743f', 5, 6)), { parent: roll, y: 3.8, x: -0.5, tm: 1.4 });
  // gunports + cannons (two rows, both sides)
  root.userData.lids = []; root.userData.muzzles = [];
  for (const side of [-1, 1]) for (const [row, y] of [[0, 0.95], [1, 2.25]]) for (let k = 0; k < 12; k++) {
    const x = -8.8 + k * 1.5, z = side * (hullWidth(x, y - 0.6 + 0.6) + 0.02);
    tbox(0.55, 0.5, 0.12, M('#b23a2e'), { parent: roll, x, y, z });
    tbox(0.4, 0.36, 0.14, M('#1d1a1a'), { parent: roll, x, y, z: z + side * 0.01 });
    const cn = cyl(0.11, 0.13, 0.9, M('#a0782e'), { parent: roll, x, y, z: z + side * 0.3, rx: Math.PI / 2, seg: 10 });
    if (row === 0) { const lid = group({ parent: roll, x, y: y + 0.27, z: z + side * 0.06 }); tbox(0.56, 0.52, 0.08, M('#b23a2e'), { parent: lid, y: 0.26 }); lid.rotation.x = side * -1.25; root.userData.lids.push(lid); }
    if (side === 1) root.userData.muzzles.push([x, y, z + side * 0.78, row]);
  }
  // stern castle with gold carvings
  tbox(4.8, 3.6, 4.6, M('#8e2a24'), { parent: roll, x: -9.6, y: 5.3 });
  tbox(5.0, 0.3, 4.8, M('#d8a632'), { parent: roll, x: -9.6, y: 7.15 });
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) tbox(0.08, 0.7, 0.55, M('#d8a632'), { parent: roll, x: -12.05, y: 4.2 + i * 1.05, z: -1.4 + j * 1.4 });
  for (const z of [-1.5, 0, 1.5]) { cyl(0.18, 0.12, 0.6, M('#d8a632'), { parent: roll, x: -12.3, y: 7.7, z, seg: 8 }); }
  for (let k = 0; k < 6; k++) tbox(0.55, 0.65, 0.08, M('#d8a632'), { parent: roll, x: -11.5 + k * 0.6, y: 4.7, z: 2.33 });
  // beakhead + figurehead lion
  const beak = tbox(3.4, 0.6, 1.0, M('#8e2a24'), { parent: roll, x: 13.2, y: 2.4 }); beak.rotation.z = 0.25;
  sph(0.55, M('#d8a632'), { parent: roll, x: 14.6, y: 3.0, seg: 12 });
  const bowsprit = cyl(0.14, 0.14, 8, M('#6a4a2e'), { parent: roll, x: 15.2, y: 4.4, rz: -1.15, seg: 8 });
  // masts, yards, sails
  root.userData.sails = [];
  const sailTex = (() => { const c = document.createElement('canvas'); c.width = 256; c.height = 256; const g = c.getContext('2d'); g.fillStyle = '#f2ead6'; g.fillRect(0, 0, 256, 256); g.fillStyle = 'rgba(160,140,100,0.35)'; for (let i = 0; i < 6; i++) g.fillRect(i * 43, 0, 3, 256); return P.ctex(c, false); })();
  const sm = toon('#ffffff', sailTex, { side: THREE.DoubleSide }); mats.push(sm);
  for (const [x, h, w] of [[6.5, 17, 6.5], [-1, 20, 8], [-7.5, 14, 5]]) {
    cyl(0.28, 0.32, h, M('#6a4a2e'), { parent: roll, x, y: 3.6 + h / 2, seg: 10 });
    cyl(0.5, 0.5, 0.4, M('#6a4a2e'), { parent: roll, x, y: 3.6 + h * 0.62, seg: 10 });
    for (const [fy, sw, sh] of [[0.36, w, h * 0.24], [0.72, w * 0.7, h * 0.18]]) {
      const yy = 3.6 + h * fy;
      cyl(0.09, 0.09, sw + 1, M('#6a4a2e'), { parent: roll, x, y: yy + sh, rx: Math.PI / 2, seg: 6 });
      const s = group({ parent: roll, x, y: yy + sh, z: 0 }); const pl = plane(sw, sh, sm, { parent: s, y: -sh / 2, ry: Math.PI / 2 }); pl.castShadow = true;
      root.userData.sails.push(s);
    }
  }
  const flag = plane(2.4, 1.5, unlit('#ffffff', (() => { const c = document.createElement('canvas'); c.width = 240; c.height = 150; const g = c.getContext('2d'); g.fillStyle = '#c0353a'; g.fillRect(0, 0, 240, 150); g.fillStyle = '#2f4a8a'; g.fillRect(0, 0, 110, 70); g.strokeStyle = '#ffffff'; g.lineWidth = 12; g.beginPath(); g.moveTo(0, 0); g.lineTo(110, 70); g.moveTo(110, 0); g.lineTo(0, 70); g.moveTo(55, 0); g.lineTo(55, 70); g.moveTo(0, 35); g.lineTo(110, 35); g.stroke(); g.strokeStyle = '#c0353a'; g.lineWidth = 5; g.stroke(); return P.ctex(c, false); })(), { side: THREE.DoubleSide }), { parent: roll, x: -13.2, y: 9.2, rz: 0 });
  cyl(0.06, 0.06, 3.2, M('#6a4a2e'), { parent: roll, x: -12.2, y: 8.6, seg: 6 });
  root.userData.mats = mats; root.userData.flag = flag;
  mats.forEach((m) => { m.userData.base = m.color.clone(); });
  return root;
};
export const tintShip = (ship, k, mud = 0) => { const brown = new THREE.Color('#4a3a28'); ship.userData.mats.forEach((m) => { m.color.copy(m.userData.base).multiplyScalar(k).lerp(brown, mud); }); };


export const build = () => {
  const H = {};
  const M = { grass: toon('#ffffff', P.grass('#6f9a45', 7)), dirt: toon('#7a5a3a'), mound: toon('#6a4a2e'), leaf: toon('#4f8a3a'), log: toon('#8a5a34'), logD: toon('#6a4428'), roof: toon('#5a4a3a'),
    pine: toon('#2f5a3a'), pine2: toon('#3f6a42'), trunk: toon('#6a4a32'), rock: toon('#8a8a80'), tent: toon('#e9e2d4'), iron: toon('#3a3a44'), wood: toon('#8a5a34'), white: toon('#f4f1ea'), red: toon('#c0353a'), blue: toon('#2f4a8a'),
    floor: toon('#ffffff', P.planks('#7a5a3a', 3, 8)), wallp: toon('#e9dcc0'), green: toon('#3a5a3a'), gold: toon('#e8c45a') };
  plane(3000, 3000, unlit('#ffffff', waterTex), { y: -0.35, rx: -Math.PI / 2 });
  // island land: a big flattened green blob plus hills
  tbox(140, 0.4, 70, M.grass, { x: -10, y: -0.2, z: 8, tm: 2 });
  for (const [x, z, r, h] of [[-40, 30, 30, 10], [30, 34, 26, 8], [70, 20, 20, 6]]) { const s = sph(r, M.grass, { x, y: -r + h, z, seg: 18, cast: false }); s.scale.y = 0.5; }
  const rnd = P.rng(7);
  const pine = (x, z, s = 1) => { const g = group({ x, z }); g.scale.setScalar(s); cyl(0.12, 0.16, 1.2, M.trunk, { y: 0.6, parent: g, seg: 6 }); cone(1.0, 2.2, rnd() < 0.5 ? M.pine : M.pine2, { y: 2.0, parent: g, seg: 7 }); cone(0.75, 1.8, M.pine2, { y: 3.1, parent: g, seg: 7 }); return g; };
  for (let i = 0; i < 70; i++) { const x = -70 + rnd() * 140, z = 4 + rnd() * 36; if (Math.abs(x) < 8 && z < 12) continue; if (Math.abs(x - CAMP[0]) < 9 && z < 12) continue; pine(x, z, 0.9 + rnd() * 0.8); }
  // Cutlar's log cabin + fence + potato patch
  const cab = group({ x: -3.2, z: 2.4 }); tbox(3.2, 2.0, 2.6, M.log, { y: 1.0, parent: cab }); for (let i = 0; i < 6; i++) tbox(3.3, 0.06, 2.7, M.logD, { y: 0.2 + i * 0.33, parent: cab });
  const rf = cone(2.6, 1.4, M.roof, { y: 2.7, parent: cab, seg: 4, ry: Math.PI / 4 }); rf.scale.set(1.0, 1, 0.8); tbox(0.7, 1.3, 0.05, M.logD, { x: 0.6, y: 0.65, z: -1.32, parent: cab });
  tbox(4.6, 0.04, 3.2, M.dirt, { x: PATCH[0], y: 0.02, z: PATCH[2] });
  for (let r = 0; r < 4; r++) for (let k = 0; k < 7; k++) { const x = PATCH[0] - 1.9 + k * 0.62, z = PATCH[2] - 1.4 + r * 0.6; if (Math.abs(x - PATCH[0] - 0.4) < 0.5 && r >= 2) continue; const m = sph(0.18, M.mound, { x, y: 0.05, z, seg: 8 }); m.scale.y = 0.5; for (let l = 0; l < 3; l++) { const lf = cone(0.06, 0.22, M.leaf, { x: x + (l - 1) * 0.06, y: 0.25, z, seg: 4 }); lf.rotation.z = (l - 1) * 0.5; } }
  for (let i = 0; i < 9; i++) { tbox(0.08, 0.9, 0.08, M.logD, { x: PATCH[0] - 2.5 + i * 0.62, y: 0.45, z: PATCH[2] - 1.8 }); } tbox(5.2, 0.06, 0.06, M.logD, { x: PATCH[0], y: 0.75, z: PATCH[2] - 1.8 }); tbox(5.2, 0.06, 0.06, M.logD, { x: PATCH[0], y: 0.4, z: PATCH[2] - 1.8 });
  // American camp: tents, flagpole, cannons on the ridge looking at the sea (north = -z)
  for (let i = 0; i < 6; i++) { const t = cone(1.1, 1.6, M.tent, { x: CAMP[0] - 5 + (i % 3) * 3.2, y: 0.8, z: CAMP[2] + 4 + Math.floor(i / 3) * 3, seg: 4, ry: Math.PI / 4 }); }
  cyl(0.06, 0.06, 7, M.white, { x: CAMP[0] + 4, y: 3.5, z: CAMP[2] + 3, seg: 8 });
  const usFlag = (() => { const c = document.createElement('canvas'); c.width = 260; c.height = 140; const g = c.getContext('2d'); for (let i = 0; i < 13; i++) { g.fillStyle = i % 2 ? '#ffffff' : '#c0353a'; g.fillRect(0, i * 140 / 13, 260, 140 / 13 + 1); } g.fillStyle = '#2f4a8a'; g.fillRect(0, 0, 110, 76); g.fillStyle = '#ffffff'; for (let i = 0; i < 20; i++) { g.beginPath(); g.arc(12 + (i % 5) * 21, 10 + Math.floor(i / 5) * 18, 3, 0, 7); g.fill(); } return P.ctex(c, false); })();
  H.usFlag = plane(2.2, 1.2, unlit('#ffffff', usFlag, { side: THREE.DoubleSide }), { x: CAMP[0] + 5.15, y: 6.3, z: CAMP[2] + 3 });
  H.cannons = [];
  const cannon = (x, z, ry = 0) => { const g = group({ x, z, ry }); for (const s of [-1, 1]) { const w = cyl(0.45, 0.45, 0.12, M.wood, { x: s * 0.45, y: 0.45, parent: g, seg: 14 }); w.rotation.z = Math.PI / 2; } tbox(0.6, 0.3, 1.2, M.wood, { y: 0.55, parent: g }); const b = cyl(0.16, 0.24, 1.9, M.iron, { y: 0.85, z: -0.4, parent: g, seg: 12 }); b.rotation.x = Math.PI / 2 - 0.15; H.cannons.push(g); return g; };
  for (let i = 0; i < 7; i++) cannon(CAMP[0] - 6 + i * 2.0, CAMP[2] - 2.0, (i - 3) * 0.04);
  // the British warships off the coast (north)
  H.ships = [];
  for (const [x, z, ry] of [[-40, -120, 0.2], [-8, -132, -0.1], [24, -124, 0.15], [-62, -150, 0.05], [50, -152, -0.2]]) { const s = buildShip({ x, z, y: -0.4 }); s.rotation.y = ry; H.ships.push(s); }
  // party table (twelve years later), between the camps
  const T = group({ x: 14, z: 2 }); H.party = T; tbox(5, 0.1, 1.2, M.wood, { y: 0.8, parent: T }); for (const x of [-2.2, 2.2]) for (const z of [-0.5, 0.5]) tbox(0.1, 0.8, 0.1, M.wood, { x, y: 0.4, z, parent: T }); tbox(5, 0.02, 1.25, M.white, { y: 0.86, parent: T });
  for (let i = 0; i < 10; i++) { const c = cyl(0.06, 0.06, 0.16, toon(['#c0353a', '#2f4a8a', '#e8c45a'][i % 3]), { x: -2.2 + i * 0.48, y: 0.95, z: (i % 2) * 0.3 - 0.15, parent: T, seg: 10 }); }
  // the Kaiser's study (x KX)
  tbox(10, 0.1, 9, M.floor, { x: KX, y: 0, z: -1, tm: 2 }); tbox(10, 4.4, 0.3, M.wallp, { x: KX, y: 2.2, z: -5.5 }); for (const s of [-1, 1]) tbox(0.3, 4.4, 9, M.wallp, { x: KX + s * 5, y: 2.2, z: -1 });
  for (const x of [-3, 3]) { tbox(1.6, 2.4, 0.06, unlit('#cfe3ff'), { x: KX + x, y: 2.4, z: -5.32 }); tbox(1.8, 0.12, 0.12, M.wood, { x: KX + x, y: 1.15, z: -5.3 }); }
  tbox(2.2, 1.5, 0.06, M.red, { x: KX, y: 2.6, z: -5.32 }); tbox(1.8, 1.2, 0.07, M.gold, { x: KX, y: 2.6, z: -5.3 });
  tbox(3.0, 0.12, 1.3, M.wood, { x: KX, y: 0.95, z: -2.2 }); tbox(3.0, 0.9, 1.2, M.green, { x: KX, y: 0.45, z: -2.2 });
  return H;
};
