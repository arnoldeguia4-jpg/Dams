// Sets: the hunting meadow (x 0: cages, picnic, carriage), the Tilsit raft on the Neman river (x TX), General Thiébault's study (x SX).
import { THREE, scene, toon, unlit, tbox, cyl, sph, cone, plane, group } from './engine.js';
import * as P from './paint.js';

export const TX = -90, SX = 110, CARR = [7.5, 0, -3.4], PICNIC = [-4.2, 0, -1.6];
export const CAGES = [[-2.4, -5.2], [-0.8, -5.4], [0.8, -5.4], [2.4, -5.2]];

const waterTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'), r = P.rng(3);
  g.fillStyle = '#5f9fbf'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 120; i++) { g.strokeStyle = 'rgba(230,245,255,0.45)'; g.lineWidth = 2; const x = r() * 256, y = r() * 256; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 10 + r() * 18, y); g.stroke(); }
  const t = P.ctex(c); t.repeat.set(30, 30); return t; })();
const checkTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d');
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) { g.fillStyle = (x + y) % 2 ? '#f4f1ea' : '#c2453c'; g.fillRect(x * 16, y * 16, 16, 16); } return P.ctex(c, false); })();

export const build = () => {
  const H = {};
  const M = { grass: toon('#ffffff', P.grass('#6f9a45', 7)), trunk: toon('#6f5640'), leaf: toon('#3f7a3a'), leaf2: toon('#4f8a42'), wood: toon('#8a5a34'), woodD: toon('#5a3a22'),
    green: toon('#2f4a3a'), gold: toon('#e8c45a'), black: toon('#1d1a22'), white: toon('#f4f1ea'), red: toon('#c0353a'), blue: toon('#2f4a8a'), basket: toon('#b08a4a'),
    floor: toon('#ffffff', P.planks('#7a5a3a', 3, 8)), wallp: toon('#d9c9a0') };
  tbox(3000, 0.1, 3000, M.grass, { y: -0.05, tm: 2 });
  const rnd = P.rng(11);
  const tree = (x, z, s = 1) => { const g = group({ x, z }); g.scale.setScalar(s); cyl(0.16, 0.24, 3.0, M.trunk, { y: 1.5, parent: g, seg: 8 }); for (let i = 0; i < 4; i++) { const b = sph(1.1 + rnd() * 0.4, i % 2 ? M.leaf : M.leaf2, { x: (rnd() - 0.5) * 1.6, y: 3.2 + rnd() * 0.9, z: (rnd() - 0.5) * 1.4, parent: g, seg: 10 }); b.scale.y = 0.8; } };
  for (let i = 0; i < 40; i++) { const x = -40 + rnd() * 80, z = -12 - rnd() * 30; tree(x, z, 0.9 + rnd() * 0.6); }
  for (let i = 0; i < 12; i++) tree(-30 + rnd() * 60, 10 + rnd() * 10, 1);
  for (const [x, r, h] of [[-80, 60, 18], [70, 70, 22]]) cone(r, h, toon('#7f9fa6'), { x, y: h / 2 - 2, z: -160, seg: 8, cast: false });
  // cages
  H.doors = [];
  for (const [x, z] of CAGES) { const g = group({ x, z }); tbox(1.1, 0.7, 0.8, M.wood, { y: 0.35, parent: g }); tbox(0.9, 0.5, 0.05, M.black, { y: 0.35, z: 0.41, parent: g });
    const door = group({ y: 0.1, z: 0.43, parent: g }); for (let i = 0; i < 5; i++) tbox(0.05, 0.5, 0.04, M.woodD, { x: -0.36 + i * 0.18, y: 0.25, parent: door }); H.doors.push(door); }
  // picnic blanket + basket + bottle
  const pic = tbox(2.2, 0.02, 1.6, toon('#ffffff', checkTex), { x: PICNIC[0], y: 0.02, z: PICNIC[2] }); pic.receiveShadow = true;
  tbox(0.6, 0.35, 0.4, M.basket, { x: PICNIC[0] - 0.4, y: 0.2, z: PICNIC[2] }); cyl(0.06, 0.07, 0.35, toon('#3a5a3a'), { x: PICNIC[0] + 0.4, y: 0.2, z: PICNIC[2] + 0.2, seg: 10 });
  for (let i = 0; i < 3; i++) sph(0.09, toon(['#c2453c', '#e8c45a', '#8a5a34'][i]), { x: PICNIC[0] + 0.1 + i * 0.2, y: 0.08, z: PICNIC[2] - 0.3, seg: 8 });
  // Napoleon's carriage
  const C = group({ x: CARR[0], z: CARR[2] }); H.carriage = C;
  tbox(2.4, 1.4, 1.5, M.green, { y: 1.35, parent: C }); tbox(2.5, 0.12, 1.6, M.gold, { y: 2.1, parent: C }); tbox(2.5, 0.1, 1.6, M.gold, { y: 0.66, parent: C });
  tbox(0.8, 0.6, 0.05, M.black, { x: 0.2, y: 1.5, z: 0.77, parent: C }); tbox(1.1, 0.56, 0.06, M.green, { x: 0.2, y: 0.94, z: 0.86, parent: C }); tbox(1.12, 0.05, 0.08, M.gold, { x: 0.2, y: 1.22, z: 0.87, parent: C }); H.window = [CARR[0] + 0.2, 1.45, CARR[2] + 0.8];
  for (const [x, z] of [[-0.9, 0.8], [0.9, 0.8], [-0.9, -0.8], [0.9, -0.8]]) { const w = cyl(0.5, 0.5, 0.1, M.woodD, { x, y: 0.5, z, parent: C, seg: 16 }); w.rotation.x = Math.PI / 2; cyl(0.12, 0.12, 0.12, M.gold, { x, y: 0.5, z: z + Math.sign(z) * 0.02, parent: C, seg: 10 }).rotation.x = Math.PI / 2; }
  tbox(1.2, 0.08, 0.1, M.woodD, { x: 1.8, y: 0.8, z: 0.4, parent: C }); tbox(1.2, 0.08, 0.1, M.woodD, { x: 1.8, y: 0.8, z: -0.4, parent: C });
  // Tilsit: a raft pavilion on the river (x TX)
  plane(120, 160, unlit('#ffffff', waterTex), { x: TX, y: 0.02, z: -50, rx: -Math.PI / 2 });
  const R = group({ x: TX, z: -2 }); tbox(7, 0.3, 5, M.wood, { y: 0.15, parent: R });
  for (const [x, z] of [[-2.8, -2], [2.8, -2], [-2.8, 2], [2.8, 2]]) cyl(0.08, 0.08, 3, M.white, { x, y: 1.6, z, parent: R, seg: 8 });
  const roof = cone(4.6, 1.6, M.white, { y: 3.9, parent: R, seg: 4, ry: Math.PI / 4 }); roof.scale.set(1, 1, 0.75);
  tbox(1.6, 0.08, 0.8, M.wood, { y: 1.1, z: -0.6, parent: R }); for (const x of [-0.7, 0.7]) tbox(0.08, 0.8, 0.6, M.woodD, { x, y: 0.7, z: -0.6, parent: R });
  // General Thiébault's study (x SX)
  tbox(9, 0.1, 8, M.floor, { x: SX, y: 0, z: -1, tm: 2 }); tbox(9, 4, 0.3, M.wallp, { x: SX, y: 2, z: -5 }); for (const s of [-1, 1]) tbox(0.3, 4, 8, M.wallp, { x: SX + s * 4.5, y: 2, z: -1 });
  for (let i = 0; i < 5; i++) tbox(0.9, 2.6, 0.4, M.woodD, { x: SX - 3.2 + i * 0.05, y: 1.3, z: -4.6 }); for (let k = 0; k < 4; k++) for (let i = 0; i < 6; i++) tbox(0.1, 0.4, 0.3, toon(['#7a2a2a', '#2a4a6a', '#5a4a2a'][(i + k) % 3]), { x: SX - 3.5 + i * 0.12, y: 0.5 + k * 0.6, z: -4.4 });
  tbox(2.4, 0.1, 1.2, M.wood, { x: SX, y: 0.9, z: -2.2 }); tbox(2.4, 0.85, 1.1, M.woodD, { x: SX, y: 0.43, z: -2.2 });
  cyl(0.05, 0.06, 0.25, M.white, { x: SX + 0.8, y: 1.08, z: -2.3, seg: 8 }); H.flame = sph(0.05, unlit('#ffd070'), { x: SX + 0.8, y: 1.25, z: -2.3, seg: 8 });
  const candle = new THREE.PointLight('#ffb060', 1.6, 6, 1.5); candle.position.set(SX + 0.8, 1.4, -2.0); scene.add(candle);
  return H;
};
