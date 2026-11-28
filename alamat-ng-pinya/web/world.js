// Sets: the inside of the kubo (x 0) and the yard outside with the garden patch where the plant grows (x YX).
import { THREE, scene, toon, unlit, tbox, cyl, sph, cone, plane, group } from './engine.js';
import * as P from './paint.js';

export const YX = 60, PATCH = [YX + 1.6, 0, -2.2];

const slats = (base, line, n = 16, w = 256) => { const c = document.createElement('canvas'); c.width = c.height = w; const g = c.getContext('2d'); g.fillStyle = base; g.fillRect(0, 0, w, w);
  g.strokeStyle = line; g.lineWidth = 3; for (let i = 0; i < n; i++) { const x = (i + 0.5) * w / n; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, w); g.stroke(); } const t = P.ctex(c); return t; };
const weave = () => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'); g.fillStyle = '#d9b878'; g.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 256; y += 16) for (let x = 0; x < 256; x += 16) { g.fillStyle = ((x + y) / 16) % 2 ? '#c9a462' : '#e2c486'; g.fillRect(x, y, 16, 16); } return P.ctex(c); };

export const build = () => {
  const H = {};
  const M = { floor: toon('#ffffff', slats('#b88a52', '#8a6438', 24)), wall: toon('#ffffff', weave()), post: toon('#6a4428'), roof: toon('#8a6a3a'), mat: toon('#e2c486'), stone: toon('#8a8478'), clay: toon('#a8603a'),
    grass: toon('#ffffff', P.grass('#6f9a45', 7)), soil: toon('#7a5432'), trunk: toon('#6f5640'), leaf: toon('#3f7a3a'), leaf2: toon('#4f8a42'), fence: toon('#9a7a4a'), wood: toon('#8a5a34') };
  // ================= inside the kubo (x 0) =================
  tbox(9, 0.2, 7, M.floor, { y: -0.1, z: -1.5 });
  tbox(9, 3.6, 0.2, M.wall, { y: 1.8, z: -5 }); tbox(0.2, 3.6, 7, M.wall, { x: -4.5, y: 1.8, z: -1.5 }); tbox(0.2, 3.6, 7, M.wall, { x: 4.5, y: 1.8, z: -1.5 });
  { const c = tbox(9.2, 0.15, 7.2, M.roof, { y: 3.65, z: -1.5 }); c.castShadow = false; }
  // window on the back wall
  tbox(1.6, 1.1, 0.05, unlit('#bfe0f4'), { x: 1.4, y: 2.2, z: -4.88 }); tbox(1.8, 0.1, 0.1, M.post, { x: 1.4, y: 1.62, z: -4.85 }); tbox(1.8, 0.1, 0.1, M.post, { x: 1.4, y: 2.78, z: -4.85 });
  for (const x of [-4.4, 4.4]) for (const z of [-4.9, 1.9]) tbox(0.2, 3.6, 0.2, M.post, { x, y: 1.8, z });
  // banig (sleeping mat) + pillow, left
  tbox(1.6, 0.04, 2.4, M.mat, { x: -2.6, y: 0.02, z: -2.6 }); tbox(0.9, 0.18, 0.4, toon('#f4f1ea'), { x: -2.6, y: 0.11, z: -3.6 });
  // kalan (clay stove) + shelf, right
  const K = group({ x: 2.6, z: -3.9 }); tbox(1.4, 0.7, 0.9, M.clay, { y: 0.35, parent: K }); tbox(1.6, 0.08, 1.0, M.stone, { y: 0.74, parent: K });
  tbox(1.8, 0.08, 0.4, M.wood, { x: 0, y: 1.6, z: -0.6, parent: K });
  H.fire = sph(0.18, unlit('#f2a03a'), { x: 2.6, y: 0.4, z: -3.42, seg: 10 });
  // ================= the yard (x YX) =================
  const Y = group({ x: YX });
  tbox(80, 0.2, 60, M.grass, { y: -0.1, z: -10, parent: Y });
  // kubo on stilts
  const hut = group({ x: -4.5, z: -7, parent: Y }); for (const [px, pz] of [[-1.8, -1.6], [1.8, -1.6], [-1.8, 1.6], [1.8, 1.6]]) tbox(0.2, 1.4, 0.2, M.post, { x: px, y: 0.7, z: pz, parent: hut });
  tbox(4.2, 2.2, 3.6, M.wall, { y: 2.5, parent: hut }); const rf = cone(3.6, 2.4, M.roof, { y: 4.8, seg: 4, parent: hut }); rf.rotation.y = Math.PI / 4;
  tbox(1.0, 1.4, 0.06, toon('#5a3a22'), { y: 2.2, z: 1.82, parent: hut }); for (let i = 0; i < 4; i++) tbox(1.2, 0.08, 0.3, M.post, { y: 0.25 + i * 0.32, z: 2.0 + i * 0.25, parent: hut });
  // garden patch
  const pt = cyl(1.3, 1.4, 0.18, M.soil, { x: PATCH[0] - YX, y: 0.05, z: PATCH[2], parent: Y, seg: 20 });
  // fence + palms + bushes
  for (let i = 0; i < 18; i++) tbox(0.1, 1.0, 0.1, M.fence, { x: -12 + i * 1.4, y: 0.5, z: -12, parent: Y }); tbox(25, 0.08, 0.08, M.fence, { x: 0, y: 0.8, z: -12, parent: Y });
  const rng = P.rng(5);
  const palm = (x, z, lean, hgt) => { const g = group({ x, z, parent: Y }); const n = 6;
    for (let i = 0; i < n; i++) cyl(0.12, 0.14, hgt / n + 0.02, M.trunk, { x: Math.sin(lean) * hgt * (i + 0.5) / n, y: (i + 0.5) * hgt / n, rz: -lean, parent: g, seg: 8 });
    const top = group({ x: Math.sin(lean) * hgt, y: hgt, parent: g });
    for (let i = 0; i < 7; i++) { const f = cone(0.2, 2.2, i % 2 ? M.leaf : M.leaf2, { parent: top, seg: 4 }); f.rotation.set(0, i * 0.9, Math.PI / 2 + 0.45); f.position.set(0.9 * Math.cos(-i * 0.9), -0.3, 0.9 * Math.sin(-i * 0.9)); f.scale.set(1, 1, 0.25); } };
  for (const [x, z] of [[6, -9], [-10, -6], [9, -4], [-12, -14], [12, -14]]) palm(x, z, (rng() - 0.5) * 0.4, 5 + rng() * 2);
  for (const [x, z] of [[4, -8], [-1, -10], [7, -11], [-8, -10]]) { const b = sph(0.8 + rng() * 0.4, M.leaf2, { x, y: 0.4, z, parent: Y, seg: 10 }); b.scale.y = 0.7; }
  return H;
};
