// Vasa sets: Stockholm harbour (origin, water y 0, quay along z 8..14, houses behind), the seabed (x 600),
// the museum hall (x 300). The ship is built three times (harbour, seabed, museum) by buildShip().
import { THREE, scene, toon, unlit, tbox, cyl, sph, cone, plane, group, place } from './engine.js';
import * as P from './paint.js';

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
  const flag = plane(2.4, 1.5, unlit('#ffffff', (() => { const c = document.createElement('canvas'); c.width = 240; c.height = 150; const g = c.getContext('2d'); g.fillStyle = '#2b5fb0'; g.fillRect(0, 0, 240, 150); g.fillStyle = '#f2c440'; g.fillRect(70, 0, 30, 150); g.fillRect(0, 60, 240, 30); return P.ctex(c, false); })(), { side: THREE.DoubleSide }), { parent: roll, x: -13.2, y: 9.2, rz: 0 });
  cyl(0.06, 0.06, 3.2, M('#6a4a2e'), { parent: roll, x: -12.2, y: 8.6, seg: 6 });
  root.userData.mats = mats; root.userData.flag = flag;
  mats.forEach((m) => { m.userData.base = m.color.clone(); });
  return root;
};
export const tintShip = (ship, k, mud = 0) => { const brown = new THREE.Color('#4a3a28'); ship.userData.mats.forEach((m) => { m.color.copy(m.userData.base).multiplyScalar(k).lerp(brown, mud); }); };

export const build = () => {
  const H = {};
  // ---------------- harbour ----------------
  const water = plane(3000, 3000, toon('#ffffff', waterTex, { side: THREE.DoubleSide }), { rx: -Math.PI / 2, y: 0 }); waterTex.repeat.set(300, 300); H.water = water; water.receiveShadow = true;
  const stone = toon('#ffffff', P.cobble('#9a948a', 6)), wall = toon('#ffffff', P.brick('#8d8880', 12));
  tbox(120, 2.4, 6, wall, { y: -0.2, z: 11, tm: 2 }); tbox(120, 0.1, 6, stone, { y: 1.02, z: 11, tm: 2 });
  tbox(120, 0.1, 40, stone, { y: 1.0, z: 34, tm: 3 });
  
  const facade = ['#d6a85a', '#c25a4a', '#e8d9b0', '#7a9a6a', '#d98a4a', '#e2c27a', '#b5653f'];
  for (let i = 0; i < 16; i++) { const x = -45 + i * 6.2, h = 9 + (i * 37 % 5), g = group({ x, z: 19 });
    tbox(6, h, 6, toon('#ffffff', P.plaster(facade[i % 7], 50 + i)), { y: h / 2 + 1, parent: g, tm: 3 });
    const gab = tbox(6, 3, 6.2, toon('#ffffff', P.roofTiles('#7a3a2a', 5)), { y: h + 2.5, parent: g, tm: 1.2 }); const pp = gab.geometry.attributes.position; for (let k = 0; k < pp.count; k++) if (pp.getY(k) > 0) pp.setX(k, pp.getX(k) * 0.05); pp.needsUpdate = true; gab.geometry.computeVertexNormals();
    for (let fl = 0; fl < 3; fl++) for (const wx of [-1.5, 1.5]) tbox(0.9, 1.3, 0.1, toon('#33405a'), { x: wx, y: 3 + fl * 2.8, z: -3.02, parent: g });
  }
  const church = group({ x: 14, z: 32 }); tbox(7, 16, 7, toon('#ffffff', P.plaster('#e8d9b0', 61)), { y: 9, parent: church, tm: 3 }); cone(4.5, 14, toon('#3f7a5a'), { y: 24, parent: church, seg: 4, ry: Math.PI / 4 }); cone(1.0, 6, toon('#3f7a5a'), { y: 33, parent: church, seg: 8 });
  // islands + pines across the water
  const pine = (x, z, s) => { const t = group({ x, z }); t.scale.setScalar(s); cyl(0.3, 0.4, 3, toon('#5a3a22'), { y: 1.5, parent: t, seg: 6 }); cone(2.2, 5, toon('#2f5a3a'), { y: 5, parent: t, seg: 8 }); cone(1.6, 4, toon('#3a6a44'), { y: 7.4, parent: t, seg: 8 }); };
  for (const [x, z, r] of [[-60, -90, 30], [40, -120, 40], [130, -80, 30], [-150, -60, 35]]) { const isl = sph(r, toon('#6a8a4a'), { x, y: -r * 0.75, z, seg: 18 }); isl.scale.set(1.4, 1, 1); for (let k = 0; k < 7; k++) pine(x - r + k * r * 0.35, z + (k % 2) * 6, 1.6); }
  for (let i = 0; i < 6; i++) { const c = plane(40, 18, unlit('#ffffff', P.cloudTex(i + 9), { transparent: true, fog: false, depthWrite: false }), { x: -140 + i * 55, y: 55 + (i % 3) * 12, z: -220 }); c.userData.noND = true; }
  // rowboat with the dazzled enemy
  H.boat = group({ x: 26, z: -12 }); tbox(3.2, 0.6, 1.3, toon('#7a5232'), { y: 0.1, parent: H.boat }); tbox(3.0, 0.08, 1.1, toon('#a8743f'), { y: 0.42, parent: H.boat });
  // salvage pontoons
  H.pontoons = group({ x: 0, z: 0 }); for (const z of [-7.5, 7.5]) { tbox(26, 1.6, 3, toon('#5f6a70'), { y: 0.3, z, parent: H.pontoons }); }
  H.cables = []; for (let k = 0; k < 6; k++) { const c = cyl(0.06, 0.06, 1, toon('#2a2a30'), { parent: H.pontoons, x: -10 + k * 4, seg: 5 }); H.cables.push(c); }
  // ---------------- ships ----------------
  H.ship = buildShip({ x: 0, z: 2 });
  H.seaShip = buildShip({ x: 600, y: -27.3, z: 0 }); H.seaShip.rotation.z = 0.06; H.seaShip.userData.roll.rotation.x = 0.32;
  H.museumShip = buildShip({ x: 300, y: 3.2, z: 0 });
  // ---------------- seabed (x 600) ----------------
  tbox(400, 1, 400, toon('#ffffff', P.dirt('#5a4a36', 71)), { x: 600, y: -30.0, tm: 4 });
  for (let k = 0; k < 14; k++) sph(1 + (k % 3), toon('#4a3e30'), { x: 600 - 30 + k * 4.5, y: -29.7, z: -6 - (k % 4) * 3, seg: 10 }).scale.set(1.5, 0.4, 1);
  H.shafts = [];
  for (let k = 0; k < 5; k++) { const s = plane(2.5, 40, unlit('#bff0f0', null, { transparent: true, opacity: 0.12, depthWrite: false, fog: false, side: THREE.DoubleSide }), { x: 590 + k * 6, y: -14, z: -4 + (k % 2) * 6, rz: 0.25 }); s.userData.noND = true; H.shafts.push(s); }
  // ---------------- museum (x 300) ----------------
  const mus = group({ x: 300 });
  tbox(80, 0.2, 60, toon('#ffffff', P.planks('#6a5a4a', 81, 4)), { y: -0.1, parent: mus, tm: 2 });
  tbox(80, 40, 1, toon('#3a3a48'), { y: 20, z: -20, parent: mus }); tbox(1, 40, 60, toon('#33333f'), { x: -32, y: 20, parent: mus }); tbox(1, 40, 60, toon('#33333f'), { x: 32, y: 20, parent: mus });
  for (const x of [-8, 0, 8]) tbox(0.8, 3.2, 3.6, toon('#2a2a30'), { x, y: 1.6, parent: mus });
  for (let k = 0; k < 9; k++) tbox(4, 1.2, 0.3, toon('#c9a040'), { x: -20 + k * 5, y: 0.6, z: 8, parent: mus });
  plane(9, 2.2, unlit('#ffffff', P.label('VASA', { w: 900, h: 220, bg: '#1d2a44', fg: '#f2c440', border: '#f2c440', font: 'bold 150px Georgia, serif' })), { y: 17, z: -19.4, parent: mus });
  return H;
};
