// Sets: Thor's longhouse in Asgard (x 0), Freyja's flower hall (x FX), the giant Thrym's feast hall in Jotunheim (x GX).
// Roofless interiors so the sun still lights them; cameras never look up past the wall tops.
import { THREE, scene, toon, unlit, tbox, cyl, sph, cone, plane, group } from './engine.js';
import * as P from './paint.js';

export const FX = -80, GX = 200;

export const build = () => {
  const H = {};
  const M = {
    floor: toon('#ffffff', P.planks('#8a6440', 3, 8)), wall: toon('#ffffff', P.planks('#6a4a2e', 5, 10)), wallL: toon('#ffffff', P.planks('#9a7448', 6, 10)),
    stone: toon('#ffffff', P.cobble('#7a7670', 6)), gwall: toon('#ffffff', P.planks('#4a3a2e', 7, 9)),
    wood: toon('#8a5a34'), woodD: toon('#5a3a22'), fur: toon('#b09070'), furD: toon('#7a6248'), linen: toon('#e9e2d4'),
    gold: toon('#f2c440'), iron: toon('#8a929a'), red: toon('#a83a2a'), blue: toon('#2f5f9a'), green: toon('#3f7a3a'), pink: toon('#e88aa8'), yel: toon('#f2d27a'),
    ember: unlit('#ff9a40'), coal: toon('#3a2a22'), grass: toon('#ffffff', P.grass('#5f8f3f', 7)),
  };
  tbox(3000, 0.1, 3000, M.grass, { y: -0.06, tm: 2 });
  for (const [x, r, h] of [[-160, 90, 60], [90, 120, 80], [330, 110, 90]]) cone(r, h, toon('#6f8fa6'), { x, y: h / 2 - 2, z: -320, seg: 8, cast: false });

  // ================= THOR'S LONGHOUSE (x 0) =================
  tbox(12, 0.1, 10, M.floor, { x: 0, y: 0, z: -1, tm: 2 });
  tbox(12, 4.2, 0.3, M.wall, { x: 0, y: 2.1, z: -6, tm: 2 });
  for (const s of [-1, 1]) tbox(0.3, 4.2, 10, M.wall, { x: s * 6, y: 2.1, z: -1, tm: 2 });
  for (const x of [-4, 0, 4]) cyl(0.18, 0.2, 4.4, M.woodD, { x, y: 2.2, z: -5.7, seg: 10 });
  // window with morning light + shield on the wall
  tbox(1.6, 1.1, 0.05, unlit('#ffe7b0'), { x: -2.2, y: 2.6, z: -5.82 }); tbox(1.75, 0.1, 0.1, M.woodD, { x: -2.2, y: 2.05, z: -5.8 }); tbox(0.08, 1.1, 0.08, M.woodD, { x: -2.2, y: 2.6, z: -5.8 });
  const sh = cyl(0.55, 0.55, 0.08, M.blue, { x: 2.2, y: 2.6, z: -5.78, seg: 24 }); sh.rotation.x = Math.PI / 2; const bo = sph(0.13, M.iron, { x: 2.2, y: 2.6, z: -5.72, seg: 10 }); bo.scale.z = 0.6;
  // bed with furs
  tbox(2.6, 0.5, 1.5, M.wood, { x: -2.6, y: 0.25, z: -3.6 }); tbox(2.5, 0.22, 1.4, M.linen, { x: -2.6, y: 0.6, z: -3.6 });
  tbox(2.0, 0.12, 1.45, M.fur, { x: -2.3, y: 0.76, z: -3.6 }); tbox(0.6, 0.2, 0.9, M.linen, { x: -3.6, y: 0.8, z: -3.6 });
  tbox(0.2, 1.2, 1.5, M.woodD, { x: -3.95, y: 0.6, z: -3.6 });
  // the hammer stand (empty!)
  tbox(0.9, 0.12, 0.5, M.woodD, { x: 2.6, y: 0.06, z: -4.2 }); for (const s of [-1, 1]) tbox(0.1, 1.1, 0.1, M.woodD, { x: 2.6 + s * 0.3, y: 0.6, z: -4.2 }); tbox(0.8, 0.1, 0.14, M.woodD, { x: 2.6, y: 1.15, z: -4.2 });
  H.hammerOnStand = group({ x: 2.6, y: 1.2, z: -4.2 });
  cyl(0.05, 0.05, 0.6, M.wood, { parent: H.hammerOnStand, y: -0.3, seg: 8 }); tbox(0.55, 0.3, 0.3, M.iron, { parent: H.hammerOnStand, y: 0.05 });
  // fire pit in the middle + table
  cyl(0.7, 0.75, 0.15, M.stone, { x: 0.4, y: 0.07, z: -1.6, seg: 16 }); cyl(0.5, 0.5, 0.05, M.coal, { x: 0.4, y: 0.16, z: -1.6, seg: 16 });
  tbox(1.6, 0.08, 0.8, M.wood, { x: 3.4, y: 0.85, z: -2.2 }); for (const [dx, dz] of [[-0.7, -0.3], [0.7, -0.3], [-0.7, 0.3], [0.7, 0.3]]) tbox(0.08, 0.85, 0.08, M.woodD, { x: 3.4 + dx, y: 0.42, z: -2.2 + dz });

  // ================= FREYJA'S HALL (x FX) =================
  tbox(10, 0.1, 9, M.floor, { x: FX, y: 0, z: -1, tm: 2 });
  tbox(10, 4.2, 0.3, M.wallL, { x: FX, y: 2.1, z: -5.5, tm: 2 });
  for (const s of [-1, 1]) tbox(0.3, 4.2, 9, M.wallL, { x: FX + s * 5, y: 2.1, z: -1, tm: 2 });
  const rr = P.rng(5);
  for (let i = 0; i < 26; i++) { const x = FX - 4.4 + rr() * 8.8, z = -5.0 + rr() * 0.6; cyl(0.02, 0.02, 0.5 + rr() * 0.6, M.green, { x, y: 0.4, z, seg: 5 }); sph(0.12, [M.pink, M.yel, M.linen, M.red][i % 4], { x, y: 0.75 + rr() * 0.5, z, seg: 8 }); }
  // tapestry + a big golden cat statue silhouette (her chariot cats)
  tbox(3, 2, 0.05, toon('#9a3a5a'), { x: FX, y: 2.4, z: -5.32 }); tbox(2.6, 1.6, 0.06, toon('#e8b0c0'), { x: FX, y: 2.4, z: -5.3 });
  for (const s of [-1, 1]) { const c = group({ x: FX + s * 3.4, z: -4.2 }); sph(0.45, M.gold, { parent: c, y: 0.45, seg: 14 }); sph(0.3, M.gold, { parent: c, y: 1.05, seg: 12 }); for (const e of [-1, 1]) cone(0.1, 0.22, M.gold, { parent: c, x: e * 0.15, y: 1.35, seg: 6 }); }

  // ================= THRYM'S HALL (x GX) =================
  tbox(22, 0.1, 16, M.stone, { x: GX, y: 0, z: -2, tm: 3 });
  tbox(22, 7, 0.4, M.gwall, { x: GX, y: 3.5, z: -10, tm: 3 });
  for (const s of [-1, 1]) tbox(0.4, 7, 16, M.gwall, { x: GX + s * 11, y: 3.5, z: -2, tm: 3 });
  for (const x of [-7, -2.5, 2.5, 7]) for (const z of [-8.5]) cyl(0.4, 0.45, 7.2, M.woodD, { x: GX + x, y: 3.6, z, seg: 10 });
  for (const [x, c] of [[-8.6, M.red], [-4.5, M.blue], [4.5, M.red], [8.6, M.blue]]) { const s2 = cyl(0.9, 0.9, 0.1, c, { x: GX + x, y: 4.4, z: -9.75, seg: 24 }); s2.rotation.x = Math.PI / 2; sph(0.2, M.iron, { x: GX + x, y: 4.4, z: -9.68, seg: 10 }); }
  // the long feast table (along x) + benches
  tbox(9, 0.16, 1.8, M.wood, { x: GX, y: 1.0, z: -2.2 }); for (const dx of [-4, 4]) for (const dz of [-0.7, 0.7]) tbox(0.16, 1.0, 0.16, M.woodD, { x: GX + dx, y: 0.5, z: -2.2 + dz });
  tbox(9, 0.12, 0.5, M.woodD, { x: GX, y: 0.5, z: -3.6 });
  // three mead barrels on the table near the bride
  H.barrels = [];
  for (let i = 0; i < 3; i++) { const b = group({ x: GX + 1.6 + i * 0.75, y: 1.08, z: -2.4 }); cyl(0.26, 0.26, 0.6, M.wood, { parent: b, y: 0.3, seg: 14 }); for (const y of [0.1, 0.5]) cyl(0.27, 0.27, 0.05, M.iron, { parent: b, y, seg: 14 }); H.barrels.push(b); }
  // Thrym's throne (behind the table, left) + fire pit (right, front)
  const th = group({ x: GX - 3.4, z: -4.6 }); tbox(2.2, 1.0, 1.4, M.woodD, { parent: th, y: 0.5 }); tbox(2.2, 3.2, 0.3, M.woodD, { parent: th, y: 1.6, z: -0.6 }); for (const s of [-1, 1]) cone(0.18, 0.9, toon('#e9dcb0'), { parent: th, x: s * 1.0, y: 3.5, z: -0.6, seg: 6 });
  cyl(1.0, 1.1, 0.25, M.stone, { x: GX + 5.5, y: 0.12, z: 1.2, seg: 18 }); cyl(0.75, 0.75, 0.06, M.ember, { x: GX + 5.5, y: 0.26, z: 1.2, seg: 18 });
  return H;
};
