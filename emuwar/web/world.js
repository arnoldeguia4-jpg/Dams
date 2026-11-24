// Emu War sets: one big Western Australian wheat farm at the origin (field, fence, road, farmhouse with veranda,
// windmill, water tank, gum trees, dam with haystacks). Props: 1930s truck, two Lewis guns, ammo crates, coins.
import { THREE, scene, toon, unlit, tbox, cyl, sph, cone, plane, group, place } from './engine.js';
import * as P from './paint.js';

const M = {
  dirt: toon('#ffffff', P.dirt()), wheat: toon('#ffffff', P.wheat()), board: toon('#ffffff', P.weatherboard()), tin: toon('#ffffff', P.corrugated()),
  wood: toon('#8a5a34'), post: toon('#6a4a2e'), dark: toon('#2a2a30'), steel: toon('#7d848a'), olive: toon('#5f6a4c'), khaki: toon('#8a7d50'),
  gumTrunk: toon('#e8e0d0'), gumLeaf: toon('#7f9a5a'), gumLeaf2: toon('#6a8a4e'), water: toon('#5d9fd1'), hay: toon('#e2c060'), red: toon('#b8402e'),
  glass: toon('#cfe3f0'), tire: toon('#1f1d22'), coin: toon('#e8c44a'), grass: toon('#ffffff', P.grass('#9aa64e', 7)), hill: toon('#b98a5c'), green: toon('#4f7a3a'),
};

const lewisGun = (o) => {
  const g = group(o);
  for (const a of [0, 2.1, 4.2]) { const l = cyl(0.018, 0.018, 0.7, M.dark, { parent: g, y: 0.3, seg: 6 }); l.rotation.set(0.45 * Math.cos(a), 0, 0.45 * Math.sin(a)); }
  const gun = group({ parent: g, y: 0.62 }); g.userData.gun = gun;
  cyl(0.06, 0.06, 0.75, M.olive, { parent: gun, rz: Math.PI / 2, x: 0.15, seg: 12 });
  cyl(0.02, 0.02, 0.35, M.dark, { parent: gun, rz: Math.PI / 2, x: 0.65, seg: 6 });
  cyl(0.13, 0.13, 0.05, M.dark, { parent: gun, y: 0.09, x: 0.05, seg: 20 });
  tbox(0.3, 0.07, 0.06, M.wood, { parent: gun, x: -0.32, y: -0.03 });
  return g;
};
const truck = (o) => {
  const g = group(o), body = group({ parent: g }); g.userData.body = body;
  tbox(1.4, 1.15, 1.55, toon('#3f5a3a'), { parent: body, x: 0.95, y: 1.1 }); // cab
  tbox(1.0, 0.75, 1.3, toon('#3f5a3a'), { parent: body, x: 2.05, y: 0.9 }); // bonnet
  tbox(0.08, 0.6, 1.2, M.steel, { parent: body, x: 2.58, y: 0.9 }); // grille
  tbox(0.06, 0.5, 1.2, M.glass, { parent: body, x: 1.66, y: 1.4 });
  for (const z of [-0.5, 0.5]) sph(0.1, toon('#f4e6a0'), { parent: body, x: 2.6, y: 1.05, z, seg: 10 });
  tbox(2.6, 0.12, 1.8, M.wood, { parent: body, x: -1.05, y: 0.7 }); // tray
  for (const z of [-0.88, 0.88]) tbox(2.6, 0.4, 0.06, M.wood, { parent: body, x: -1.05, y: 0.95, z });
  tbox(0.06, 0.4, 1.8, M.wood, { parent: body, x: -2.32, y: 0.95 });
  g.userData.wheels = [];
  for (const [x, z] of [[2.0, -0.85], [2.0, 0.85], [-1.4, -0.85], [-1.4, 0.85]]) { const w = cyl(0.38, 0.38, 0.22, M.tire, { parent: g, x, y: 0.38, z, rx: Math.PI / 2, seg: 18 }); cyl(0.18, 0.18, 0.24, M.steel, { parent: w, seg: 10 }); g.userData.wheels.push(w); }
  g.userData.gun = lewisGun({ parent: body, x: -1.4, y: 0.76 });
  return g;
};

export const build = () => {
  const H = {};
  // ground: dirt everywhere, grassy patches, distant low hills
  tbox(2000, 0.2, 2000, M.dirt, { y: -0.1, tm: 4 });
  for (const [x, z, r] of [[-30, 20, 12], [30, 25, 14], [-40, -30, 16], [40, -40, 18]]) { const m = cyl(r, r, 0.04, M.grass, { x, z, y: 0.01, seg: 24 }); m.castShadow = false; }
  for (let i = 0; i < 9; i++) { const h = sph(60 + (i % 3) * 20, M.hill, { x: -240 + i * 60, y: -40, z: -260, seg: 18 }); h.scale.set(1.6, 0.55, 1); }
  // wheat field (x -4..18, z -14..0.2): base slab + rows of tall wheat boxes
  tbox(22, 0.55, 14.2, M.wheat, { x: 7, y: 0.27, z: -6.9, tm: 1 });
  H.wheatRows = [];
  for (let i = 0; i < 26; i++) { const r = tbox(22, 0.45, 0.32, M.wheat, { x: 7, y: 0.72, z: -13.6 + i * 0.54, tm: 0.8 }); H.wheatRows.push(r); }
  // fence along the field front (z 1.2) and road (z 5)
  for (let x = -6; x <= 20; x += 2) tbox(0.1, 1.1, 0.1, M.post, { x, y: 0.55, z: 1.2 });
  for (const y of [0.5, 0.9]) tbox(26, 0.04, 0.04, M.post, { x: 7, y, z: 1.2 });
  tbox(120, 0.03, 3.4, toon('#d09060'), { x: 0, y: 0.015, z: 5.2, tm: 3 });
  // farmhouse with veranda (front faces +z at z -10)
  const house = group({ x: -13, z: -14 }); H.house = house;
  tbox(8, 3.0, 6, M.board, { y: 1.9, parent: house, tm: 2 }); tbox(8.4, 0.4, 9.2, M.wood, { y: 0.2, z: 1.6, parent: house });
  const roof = tbox(8.6, 1.6, 6.4, M.tin, { y: 4.2, parent: house, tm: 1 }); { const pos = roof.geometry.attributes.position; for (let i = 0; i < pos.count; i++) if (pos.getY(i) > 0) pos.setZ(i, pos.getZ(i) * 0.1); pos.needsUpdate = true; roof.geometry.computeVertexNormals(); }
  const ver = tbox(8.8, 0.08, 3.2, M.tin, { y: 3.05, z: 4.6, parent: house, tm: 1 }); ver.rotation.x = 0.12;
  for (const x of [-4.2, -1.4, 1.4, 4.2]) tbox(0.14, 2.7, 0.14, M.wood, { x, y: 1.75, z: 6.0, parent: house });
  for (const x of [-2.4, 2.4]) { tbox(1.2, 1.2, 0.08, toon('#33405a'), { x, y: 2.0, z: 3.02, parent: house }); tbox(1.4, 0.12, 0.14, M.wood, { x, y: 1.35, z: 3.06, parent: house }); }
  tbox(1.0, 2.1, 0.08, toon('#5a3b2a'), { y: 1.45, z: 3.02, parent: house });
  // bounty table on the veranda (world ~ x -12.4, top y 1.18, z -10.4)
  H.table = group({ x: -13.0, y: 0.4, z: -10.3 });
  tbox(1.4, 0.06, 0.8, M.wood, { y: 0.75, parent: H.table }); for (const [x, z] of [[-0.6, -0.32], [0.6, -0.32], [-0.6, 0.32], [0.6, 0.32]]) tbox(0.06, 0.75, 0.06, M.wood, { x, y: 0.37, z, parent: H.table });
  H.coins = []; for (let i = 0; i < 6; i++) { const c = cyl(0.06, 0.06, 0.12 + 0.04 * (i % 3), M.coin, { parent: H.table, x: -0.45 + i * 0.16, y: 0.84 + 0.02 * (i % 3), z: 0.1, seg: 14 }); H.coins.push(c); }
  // the farmer's telephone on the veranda wall
  tbox(0.25, 0.35, 0.12, M.wood, { x: -10.6, y: 1.9, z: -10.95 });
  // water tank + windmill
  cyl(1.3, 1.3, 2.4, M.tin, { x: -6.5, y: 1.2, z: -13, seg: 24 }); cone(1.4, 0.5, M.tin, { x: -6.5, y: 2.65, z: -13, seg: 24 });
  const wm = group({ x: 22, z: -18 }); H.windmill = wm;
  for (const [x, z] of [[-0.8, -0.8], [0.8, -0.8], [-0.8, 0.8], [0.8, 0.8]]) { const l = tbox(0.08, 8.2, 0.08, M.steel, { x: x * 0.6, y: 4, z: z * 0.6, parent: wm }); l.rotation.set(-z * 0.08, 0, x * 0.08); }
  for (const y of [2, 4, 6]) tbox(1.4 - y * 0.12, 0.05, 0.05, M.steel, { y, z: 0.5 - y * 0.05, parent: wm });
  H.fan = group({ y: 8.3, z: 0.45, parent: wm }); cyl(0.2, 0.2, 0.3, M.steel, { parent: H.fan, rx: Math.PI / 2 });
  for (let i = 0; i < 12; i++) { const b = tbox(0.25, 1.4, 0.03, M.steel, { parent: H.fan, y: 0 }); b.geometry.translate(0, 0.85, 0); b.rotation.z = i / 12 * Math.PI * 2; b.rotation.y = 0.3; }
  tbox(0.05, 0.6, 1.6, M.steel, { y: 8.3, z: -0.6, parent: wm });
  // gum trees
  const gum = (x, z, s = 1) => { const t = group({ x, z }); t.scale.setScalar(s); const tr = cyl(0.22, 0.35, 5, M.gumTrunk, { y: 2.5, parent: t, seg: 8 }); tr.rotation.z = 0.06;
    for (const [dx, dy, dz, r] of [[0, 5.6, 0, 1.9], [1.3, 5.0, 0.4, 1.4], [-1.2, 5.2, -0.3, 1.5], [0.3, 6.6, -0.2, 1.3]]) sph(r, (dx > 0 ? M.gumLeaf : M.gumLeaf2), { x: dx, y: dy, z: dz, parent: t, seg: 12 }).scale.set(1, 0.7, 1); };
  for (const [x, z, s] of [[-22, -8, 1.2], [-20, -20, 1], [28, -12, 1.1], [34, -24, 1.3], [-30, 8, 1], [14, -26, 0.9], [-5, -26, 1.2], [40, 4, 1.1]]) gum(x, z, s);
  // dam (pond) + haystacks + bushes for the ambush
  const pond = cyl(4.2, 4.2, 0.06, M.water, { x: 26, y: 0.03, z: -6, seg: 40 }); pond.castShadow = false;
  for (const [x, z] of [[20.2, -1.1], [23.7, -1.3]]) { cyl(0.8, 1.0, 0.7, M.hay, { x, y: 0.35, z, seg: 14 }); sph(0.8, M.hay, { x, y: 0.7, z, seg: 14 }).scale.set(1, 0.5, 1); }
  for (const [x, z] of [[19.5, -3], [29, -2], [31, -9], [23, -11]]) sph(0.8, M.green, { x, y: 0.4, z, seg: 10 }).scale.set(1.3, 0.8, 1);
  H.ambushGun = lewisGun({ x: 21.95, y: 0, z: -0.5, ry: Math.PI / 2 + 0.15 });
  // army props on the road
  H.guns = [lewisGun({ x: 1.45, z: 5.0, ry: -0.4 }), lewisGun({ x: 2.55, z: 5.1, ry: -0.6 })];
  H.crates = []; for (let i = 0; i < 6; i++) { const c = group({ x: 3.6 + (i % 3) * 0.55 - 0.55, y: 0, z: 4.9 }); tbox(0.5, 0.36, 0.42, M.khaki, { y: 0.18, parent: c }); plane(0.36, 0.12, unlit('#ffffff', P.label('AMMO', { w: 256, h: 90, bg: '#8a7d50', fg: '#2a2418', border: null, font: 'bold 64px Georgia, serif' })), { y: 0.2, z: 0.215, parent: c }); H.crates.push(c); }
  H.truck = truck({ x: -5, z: 2.6 });
  // clouds
  H.clouds = [];
  for (let i = 0; i < 8; i++) { const c = plane(40, 18, unlit('#ffffff', P.cloudTex(i + 5), { transparent: true, fog: false, depthWrite: false }), { x: -140 + i * 40, y: 50 + (i % 3) * 12, z: -200 - (i % 2) * 40 }); c.userData.noND = true; H.clouds.push(c); }
  return H;
};
