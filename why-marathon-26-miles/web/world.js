// Sets: country road with the 26.2 milestone (x 0), ancient Greece (x -120), Windsor Castle lawn (x 120), the 1908 stadium (x 240).
import { THREE, toon, unlit, tbox, cyl, sph, cone, plane, group } from './engine.js';
import * as P from './paint.js';

export const GX = -120, CX = 120, SX = 240;
export const STONE = [1.6, 0, 0];
export const BALCONY = { x: CX + 1.5, y: 4.3, z: -6.0 };
export const ROYALBOX = { x: SX, y: 1.6, z: -6.6 };

const tex = (base, seed, spots, rep = 2) => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'), r = P.rng(seed);
  g.fillStyle = base; g.fillRect(0, 0, 256, 256); for (let i = 0; i < 500; i++) { g.fillStyle = spots[i % spots.length]; g.fillRect(r() * 256, r() * 256, 2 + r() * 4, 2 + r() * 3); }
  const t = P.ctex(c); t.repeat.set(rep, rep); return t; };

export const build = () => {
  const H = {};
  const M = {
    grass: toon('#ffffff', P.grass('#6f9a45', 7)), road: toon('#ffffff', tex('#b8a27a', 3, ['rgba(120,100,70,0.35)', 'rgba(230,215,180,0.35)'])),
    dust: toon('#ffffff', tex('#d9b97a', 5, ['rgba(160,120,70,0.35)', 'rgba(240,220,170,0.35)'])), cinder: toon('#ffffff', tex('#a0705a', 9, ['rgba(90,60,40,0.35)', 'rgba(200,150,120,0.35)'])),
    stone: toon('#ffffff', P.plaster('#c9c2b2', 4)), castle: toon('#ffffff', P.brick('#b8ad98', 6)), hedge: toon('#4f8a3a'), leaf: toon('#3f7a3a'), leaf2: toon('#5a8a42'), trunk: toon('#6f5640'),
    marble: toon('#f2efe6'), olive: toon('#8a9a6a'), hill: toon('#c9a96a'), roof: toon('#3f5a8a'), dark: toon('#2a2430'), red: toon('#a8283a'), gold: toon('#d9b440'),
    white: toon('#f4f1ea'), wood: toon('#8a5a34'), seat: toon('#5f6f8a'), seat2: toon('#7a8aa0'),
  };
  tbox(3000, 0.1, 3000, M.grass, { y: -0.05, tm: 2 });
  const rnd = P.rng(21);
  const tree = (x, z, s = 1, L = M.leaf) => { const g = group({ x, z }); g.scale.setScalar(s); cyl(0.16, 0.24, 3.0, M.trunk, { y: 1.5, parent: g, seg: 8 });
    for (let i = 0; i < 4; i++) { const b = sph(1.0 + rnd() * 0.4, i % 2 ? L : M.leaf2, { x: (rnd() - 0.5) * 1.6, y: 3.2 + rnd() * 0.9, z: (rnd() - 0.5) * 1.4, parent: g, seg: 10 }); b.scale.y = 0.75; } return g; };

  // ================= ROAD + MILESTONE (x 0) =================
  tbox(5, 0.04, 220, M.road, { y: 0.0, z: -90, tm: 3 });
  for (const s of [-1, 1]) for (let z = 14; z > -120; z -= 3.2) { const h = tbox(2.8, 1.1 + rnd() * 0.3, 1.2, M.hedge, { x: s * (4.2 + rnd() * 0.3), y: 0.55, z }); h.scale.x = 0.9 + rnd() * 0.2; }
  for (let i = 0; i < 26; i++) tree((rnd() < 0.5 ? -1 : 1) * (7 + rnd() * 18), 10 - rnd() * 110, 0.9 + rnd() * 0.6);
  const ms = group({ x: STONE[0], z: STONE[2] }); H.milestone = ms;
  tbox(0.9, 1.1, 0.3, M.stone, { y: 0.55, parent: ms, tm: 1 }); const top = cyl(0.45, 0.45, 0.3, M.stone, { y: 1.1, rx: Math.PI / 2, parent: ms, seg: 24 }); top.scale.set(1, 1, 1);
  tbox(1.1, 0.12, 0.45, M.stone, { y: 0.06, parent: ms });

  // ================= ANCIENT GREECE (x -120) =================
  cyl(40, 40, 0.03, M.dust, { x: GX, y: 0.01, seg: 40, cast: false });
  for (const [x, z, r, h] of [[-25, -40, 18, 10], [15, -55, 24, 14], [45, -35, 14, 8], [-50, -25, 12, 6]]) cone(r, h, M.hill, { x: GX + x, y: h / 2 - 0.5, z, seg: 9, cast: false });
  for (let i = 0; i < 6; i++) { const x = GX - 7 + i * 2.2; cyl(0.32, 0.36, i === 2 ? 1.6 : 4.2, M.marble, { x, y: (i === 2 ? 1.6 : 4.2) / 2, z: -7, seg: 14 }); }
  tbox(9, 0.5, 1.2, M.marble, { x: GX - 3.5, y: 4.45, z: -7 });
  for (let i = 0; i < 8; i++) tree(GX + (rnd() - 0.5) * 30, -4 - rnd() * 18, 0.6 + rnd() * 0.3, M.olive);

  // ================= WINDSOR CASTLE (x 120) =================
  const C = group({ x: CX });
  tbox(34, 9, 3, M.castle, { y: 4.5, z: -8, parent: C, tm: 2.4 });
  for (let i = 0; i < 17; i++) tbox(1.0, 0.8, 3.2, M.castle, { x: -16 + i * 2, y: 9.4, z: -8, parent: C, tm: 2.4 });
  for (const x of [-17, 17]) { cyl(2.6, 2.8, 15, M.castle, { x, y: 7.5, z: -8, parent: C, seg: 18 }); cone(3.1, 4, M.roof, { x, y: 17, z: -8, parent: C, seg: 18 }); }
  tbox(8, 14, 4, M.castle, { x: -6, y: 7, z: -9.5, parent: C, tm: 2.4 }); cyl(0.04, 0.04, 4, M.dark, { x: -6, y: 16, z: -9.5, parent: C, seg: 6 });
  H.flag = tbox(1.6, 1.0, 0.04, M.red, { x: -5.2, y: 17.4, z: -9.5, parent: C });
  for (let k = 0; k < 7; k++) for (const y of [3, 6.4]) tbox(0.9, 1.4, 0.1, M.dark, { x: -14 + k * 4.6, y, z: -6.45, parent: C });
  // nursery balcony
  tbox(3.6, 0.2, 1.2, M.castle, { x: 1.5, y: 4.2, z: -6.0, parent: C });
  for (let i = 0; i < 9; i++) cyl(0.04, 0.04, 0.7, M.white, { x: 1.5 - 1.7 + i * 0.42, y: 4.65, z: -5.45, parent: C, seg: 6 });
  tbox(3.6, 0.08, 0.08, M.white, { x: 1.5, y: 5.0, z: -5.45, parent: C });
  tbox(2.0, 2.4, 0.1, toon('#33405a'), { x: 1.5, y: 5.5, z: -6.48, parent: C });
  tbox(30, 0.03, 0.4, M.white, { x: 0, y: 0.02, z: 1.2, parent: C }); // start line
  for (let i = 0; i < 6; i++) tree(CX + (i < 3 ? -24 - i * 5 : 24 + (i - 3) * 5), -2 - rnd() * 6, 1.2);

  // ================= STADIUM (x 240) =================
  const S = group({ x: SX });
  tbox(120, 0.04, 6, M.cinder, { y: 0.0, z: 0, parent: S, tm: 3 });
  for (const z of [-1.5, 0, 1.5]) tbox(120, 0.05, 0.05, M.white, { y: 0.01, z, parent: S });
  tbox(0.25, 0.06, 6, M.white, { x: 0, y: 0.02, z: 0, parent: S }); // finish line
  for (const z of [-3.2, 3.2]) cyl(0.05, 0.05, 1.4, M.wood, { x: 0, y: 0.7, z, parent: S, seg: 8 });
  H.tape = tbox(0.03, 0.05, 6.4, M.white, { x: 0, y: 1.15, z: 0, parent: S });
  // stands: stepped tiers
  for (let r = 0; r < 6; r++) tbox(120, 0.6, 1.4, r % 2 ? M.seat : M.seat2, { y: 0.3 + r * 0.6, z: -5 - r * 1.4, parent: S, tm: 3 });
  tbox(120, 6, 1, M.castle, { y: 3, z: -13.6, parent: S, tm: 2.4 });
  // royal box
  const rb = group({ x: 0, z: -6.2, parent: S }); H.royalBox = rb;
  tbox(3.2, 1.4, 1.6, M.red, { y: 0.9, z: -0.3, parent: rb }); tbox(3.4, 0.12, 0.1, M.gold, { y: 1.62, z: 0.52, parent: rb });
  for (const x of [-1.6, 1.6]) cyl(0.06, 0.06, 2.4, M.gold, { x, y: 2.8, z: 0.4, parent: rb, seg: 8 });
  tbox(3.6, 0.25, 1.8, M.red, { y: 4.0, z: -0.3, parent: rb }); tbox(3.7, 0.1, 0.1, M.gold, { y: 3.88, z: 0.62, parent: rb });
  for (let i = 0; i < 4; i++) tree(SX + 70 + i * 6, -10 - i * 3, 1.2);
  return H;
};
