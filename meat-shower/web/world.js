// Sets: the Crouch farm near Olympia Springs, Bath County (x 0), the 1876 laboratory (x LX).
import { THREE, scene, toon, unlit, tbox, cyl, sph, cone, plane, group } from './engine.js';
import * as P from './paint.js';

export const LX = 120, KETTLE = [1.4, 0, -2.6], HOUSE = [-4.6, 0, -7.5];

const signTex = (lines, { w = 1024, h = 512, bg = '#e9d6a8', fg = '#3a2216', font = 'bold 150px Georgia, serif', small = 'bold 92px Georgia, serif' } = {}) => {
  const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d');
  g.fillStyle = bg; g.fillRect(0, 0, w, h);
  g.strokeStyle = 'rgba(120,80,40,0.35)'; g.lineWidth = 4; for (let y = 30; y < h; y += 46) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y + 6); g.stroke(); }
  g.strokeStyle = '#3a2216'; g.lineWidth = 22; g.strokeRect(11, 11, w - 22, h - 22);
  g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle';
  lines.forEach((t, i) => { g.font = i ? small : font; g.fillText(t, w / 2, h * (lines.length === 1 ? 0.52 : 0.36 + 0.34 * i), w - 90); });
  return P.ctex(c, false); };

export const build = () => {
  const H = {};
  const M = { grass: toon('#ffffff', P.grass('#7aa24a', 7)), dirt: toon('#8a6a44'), trunk: toon('#6f5640'), leaf: toon('#4f8a3a'), leaf2: toon('#5f9a42'),
    wood: toon('#9a6a3e'), woodD: toon('#6a4428'), white: toon('#f2ede0'), roof: toon('#6a4a3a'), iron: toon('#2a2a30'), stone: toon('#8a8a80'),
    floor: toon('#ffffff', P.planks('#8a6a44', 3, 8)), wallp: toon('#e3d3b0'), brass: toon('#c9a040'), glass: toon('#cfe6e8') };
  tbox(3000, 0.1, 3000, M.grass, { y: -0.05, tm: 2 });
  const rnd = P.rng(5);
  const tree = (x, z, s = 1) => { const g = group({ x, z }); g.scale.setScalar(s); cyl(0.16, 0.24, 3.0, M.trunk, { y: 1.5, parent: g, seg: 8 }); for (let i = 0; i < 4; i++) { const b = sph(1.1 + rnd() * 0.4, i % 2 ? M.leaf : M.leaf2, { x: (rnd() - 0.5) * 1.6, y: 3.2 + rnd() * 0.9, z: (rnd() - 0.5) * 1.4, parent: g, seg: 10 }); b.scale.y = 0.8; } };
  for (let i = 0; i < 26; i++) tree(-40 + rnd() * 80, -16 - rnd() * 26, 0.9 + rnd() * 0.6);
  for (const [x, r, h] of [[-70, 60, 22], [40, 70, 26], [120, 60, 20]]) { const s = sph(r, toon('#6f9a5a'), { x, y: -r + h, z: -130, seg: 16, cast: false }); s.scale.y = 0.5; }
  // farmhouse with porch
  const hs = group({ x: HOUSE[0], z: HOUSE[2] }); tbox(5, 2.8, 3.6, M.white, { y: 1.4, parent: hs }); const rf = cone(3.7, 1.8, M.roof, { y: 3.7, parent: hs, seg: 4, ry: Math.PI / 4 }); rf.scale.set(1, 1, 0.78);
  tbox(5.2, 0.15, 1.4, M.wood, { y: 0.4, z: 2.5, parent: hs }); for (const x of [-2.3, 2.3]) tbox(0.12, 2.3, 0.12, M.woodD, { x, y: 1.5, z: 3.1, parent: hs }); tbox(5.4, 0.12, 1.6, M.roof, { y: 2.6, z: 2.5, parent: hs });
  tbox(0.9, 1.7, 0.06, M.woodD, { x: 0.8, y: 1.05, z: 1.82, parent: hs }); for (const x of [-1.4, 2.0]) { tbox(0.9, 0.8, 0.06, unlit('#9fc4dc'), { x, y: 1.6, z: 1.82, parent: hs }); tbox(1.0, 0.08, 0.1, M.woodD, { x, y: 1.16, z: 1.84, parent: hs }); }
  // rail fence + field behind it
  for (let i = 0; i < 16; i++) tbox(0.1, 1.0, 0.1, M.woodD, { x: -8 + i * 1.6, y: 0.5, z: -10 }); for (const y of [0.45, 0.85]) tbox(25, 0.08, 0.08, M.wood, { x: 4, y, z: -10 });
  // soap kettle: tripod, black pot, small fire
  const K = group({ x: KETTLE[0], z: KETTLE[2] }); H.kettle = K;
  for (let i = 0; i < 3; i++) { const a = i * 2.094, l = cyl(0.04, 0.04, 1.9, M.woodD, { parent: K, x: 0.45 * Math.cos(a), y: 0.9, z: 0.45 * Math.sin(a), seg: 6 }); l.rotation.set(0.24 * Math.sin(a), 0, -0.24 * Math.cos(a)); }
  const pot = sph(0.42, M.iron, { parent: K, y: 0.6, seg: 18 }); pot.scale.y = 0.8; cyl(0.38, 0.38, 0.06, toon('#d9cfa8'), { parent: K, y: 0.86, seg: 18 });
  for (let i = 0; i < 6; i++) { const s = sph(0.12, M.stone, { parent: K, x: 0.55 * Math.cos(i), y: 0.05, z: 0.55 * Math.sin(i), seg: 6 }); s.scale.y = 0.6; }
  H.fireLight = new THREE.PointLight('#ffa050', 1.2, 4, 1.6); H.fireLight.position.set(KETTLE[0], 0.4, KETTLE[2] + 0.3); scene.add(H.fireLight);
  // road + readable road sign + mailbox
  tbox(3.2, 0.03, 60, M.dirt, { x: 5.2, y: 0.01, z: -10 });
  const post = group({ x: 4.0, z: 1.6 }); tbox(0.14, 2.4, 0.14, M.woodD, { y: 1.2, parent: post });
  plane(1.9, 0.95, unlit('#ffffff', signTex(['BATH COUNTY', 'KENTUCKY'])), { y: 2.1, z: 0.08, parent: post });
  const mb = group({ x: 2.9, z: 1.8 }); tbox(0.08, 1.1, 0.08, M.woodD, { y: 0.55, parent: mb }); tbox(0.55, 0.32, 0.36, toon('#5a6a7a'), { y: 1.25, parent: mb });
  plane(0.5, 0.18, unlit('#ffffff', signTex(['CROUCH'], { w: 512, h: 180, font: 'bold 120px Georgia, serif' })), { y: 1.25, z: 0.185, parent: mb });
  // the 1876 laboratory (x LX)
  tbox(10, 0.1, 9, M.floor, { x: LX, y: 0, z: -1, tm: 2 }); tbox(10, 4.2, 0.3, M.wallp, { x: LX, y: 2.1, z: -5.5 }); for (const s of [-1, 1]) tbox(0.3, 4.2, 9, M.wallp, { x: LX + s * 5, y: 2.1, z: -1 });
  tbox(3.4, 0.1, 1.2, M.wood, { x: LX, y: 0.95, z: -2.4 }); tbox(3.4, 0.9, 1.1, M.woodD, { x: LX, y: 0.45, z: -2.4 });
  const mic = group({ x: LX - 0.9, y: 1.0, z: -2.3 }); cyl(0.18, 0.22, 0.06, M.brass, { parent: mic, y: 0.03 }); cyl(0.03, 0.03, 0.5, M.brass, { parent: mic, x: -0.08, y: 0.3, seg: 8 }); const tube = cyl(0.06, 0.06, 0.42, M.brass, { parent: mic, x: 0.05, y: 0.52, seg: 12 }); tube.rotation.z = 0.35; cyl(0.12, 0.12, 0.03, M.iron, { parent: mic, y: 0.25, seg: 14 });
  for (let i = 0; i < 4; i++) { const j = group({ x: LX + 0.4 + i * 0.35, y: 1.0, z: -2.55 }); cyl(0.11, 0.11, 0.32, M.glass, { parent: j, y: 0.16, seg: 12 }); cyl(0.09, 0.09, 0.14, toon(i % 2 ? '#b8434a' : '#8a9a5a'), { parent: j, y: 0.1, seg: 12 }); cyl(0.12, 0.12, 0.05, M.woodD, { parent: j, y: 0.34, seg: 12 }); }
  for (let k = 0; k < 3; k++) { tbox(2.6, 0.06, 0.4, M.woodD, { x: LX + 2.6, y: 1.6 + k * 0.6, z: -5.1 }); for (let i = 0; i < 7; i++) cyl(0.08, 0.08, 0.3, toon(['#5a8a9a', '#9a5a5a', '#8a8a5a'][(i + k) % 3]), { x: LX + 1.5 + i * 0.32, y: 1.8 + k * 0.6, z: -5.1, seg: 10 }); }
  H.lamp = new THREE.PointLight('#ffd8a0', 1.4, 7, 1.4); H.lamp.position.set(LX + 0.3, 2.2, -1.6); scene.add(H.lamp);
  return H;
};
