// One set: the sea between two islands. West (VX): the village with huts and palms. East (SX): the island with the mountain of salt.
import { THREE, scene, toon, unlit, tbox, cyl, sph, cone, plane, group } from './engine.js';
import * as P from './paint.js';

export const VX = -24, SX = 24, IR = 11;

const waterTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'), r = P.rng(3);
  g.fillStyle = '#3f8fc4'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 140; i++) { g.strokeStyle = 'rgba(230,245,255,0.5)'; g.lineWidth = 2; const x = r() * 256, y = r() * 256; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 10 + r() * 18, y); g.stroke(); }
  const t = P.ctex(c); t.repeat.set(60, 60); return t; })();

export const build = () => {
  const H = {};
  const M = { grass: toon('#ffffff', P.grass('#5f9a45', 7)), sand: toon('#e9d6a0'), rock: toon('#8a8478'), trunk: toon('#6f5640'), leaf: toon('#3f7a3a'), leaf2: toon('#4f8a42'),
    salt: toon('#f6f4ee'), salt2: toon('#e6e2d8'), wall: toon('#c9a46a'), roof: toon('#8a6a3a'), post: toon('#6a4428') };
  H.sea = plane(4000, 4000, unlit('#ffffff', waterTex), { y: 0, rx: -Math.PI / 2 });
  const rng = P.rng(13);
  const palm = (x, z, lean, hgt, parent) => { const g = group({ x, z, parent }); const n = 6;
    for (let i = 0; i < n; i++) cyl(0.12, 0.14, hgt / n + 0.02, M.trunk, { x: Math.sin(lean) * hgt * (i + 0.5) / n, y: (i + 0.5) * hgt / n, rz: -lean, parent: g, seg: 8 });
    const top = group({ x: Math.sin(lean) * hgt, y: hgt, parent: g });
    for (let i = 0; i < 7; i++) { const f = cone(0.2, 2.2, i % 2 ? M.leaf : M.leaf2, { parent: top, seg: 4 }); f.rotation.set(0, i * 0.9, Math.PI / 2 + 0.45); f.position.set(0.9 * Math.cos(-i * 0.9), -0.3, 0.9 * Math.sin(-i * 0.9)); f.scale.set(1, 1, 0.25); }
    return g; };
  const island = (x, z, r) => { const g = group({ x, z }); const sand = sph(r, M.sand, { parent: g, seg: 32 }); sand.scale.set(1, 0.12, 1); const top = sph(r * 0.8, M.grass, { parent: g, y: 0.15, seg: 32 }); top.scale.set(1, 0.16, 1); return g; };
  // village island (west)
  const V = island(VX, -6, IR); H.village = V;
  const hut = (x, z, ry) => { const g = group({ x, z, ry, parent: V }); for (const [px, pz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) tbox(0.15, 1.2, 0.15, M.post, { x: px, y: 1.2, z: pz, parent: g });
    tbox(2.4, 1.4, 2.4, M.wall, { y: 2.4, parent: g }); const r = cone(2.2, 1.8, M.roof, { y: 4.0, seg: 4, parent: g }); r.rotation.y = Math.PI / 4; return g; };
  hut(-5, -4, 0.2); hut(-1, -6, -0.1); hut(-7, 1, 0.4);
  for (const [x, z] of [[2, -6], [-8, -5], [3, 2], [-3, 4], [6, -2]]) palm(x, z, (rng() - 0.5) * 0.4, 5 + rng() * 2, V);
  // salt island (east) with the mountain of salt
  const S = island(SX, -6, IR); H.saltIsle = S;
  const mt = cone(6, 9, M.salt, { y: 4.6, z: -2, seg: 14, parent: S }); const mt2 = cone(3.4, 5, M.salt2, { x: -4.5, y: 2.6, z: 0.5, seg: 12, parent: S }); const mt3 = cone(2.6, 3.6, M.salt2, { x: 4.6, y: 1.9, z: 1, seg: 12, parent: S });
  for (const [x, z] of [[7, -6], [-7, -6], [8, 3]]) palm(x, z, (rng() - 0.5) * 0.4, 5 + rng() * 2, S);
  // a rock on the village shore for the ending
  H.rock = sph(0.7, M.rock, { x: VX + 9.2, y: 0.4, z: 2.5, seg: 10 }); H.rock.scale.set(1.3, 0.6, 1);
  return H;
};
