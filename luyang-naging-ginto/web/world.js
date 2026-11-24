// Sets: Makiling forest + Maria's ginger garden (x 0), the hunter's nipa hut (x -60), the lake view of the sleeping-maiden mountain (x 200).
import { THREE, scene, toon, unlit, tbox, cyl, sph, cone, plane, group } from './engine.js';
import * as P from './paint.js';

export const HX = -60, LX = 200;
export const GARDEN = [0, 0, -14];
export const pathX = (z) => 0.55 * Math.sin(z * 0.22);
export const RIDGE = { x: LX, z: -170, w: 46 };

const dirtTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'), r = P.rng(7);
  g.fillStyle = '#a98a5e'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 500; i++) { g.fillStyle = r() < 0.5 ? 'rgba(110,85,55,0.35)' : 'rgba(215,190,150,0.35)'; g.fillRect(r() * 256, r() * 256, 2 + r() * 4, 2 + r() * 3); }
  const t = P.ctex(c); t.repeat.set(2, 2); return t; })();
const thatchTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'), r = P.rng(9);
  g.fillStyle = '#b08a4a'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 260; i++) { const x = r() * 256, y = r() * 256; g.strokeStyle = r() < 0.5 ? 'rgba(120,85,40,0.6)' : 'rgba(220,190,120,0.6)'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - 0.5) * 6, y + 18 + r() * 16); g.stroke(); }
  return P.ctex(c); })();
const bambooTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d');
  for (let i = 0; i < 16; i++) { g.fillStyle = i % 2 ? '#c9a46a' : '#bf9a5e'; g.fillRect(i * 16, 0, 16, 256); g.fillStyle = 'rgba(90,60,30,0.5)'; g.fillRect(i * 16, 0, 1.5, 256); g.fillRect(i * 16, 60 + (i * 37) % 120, 16, 3); }
  return P.ctex(c); })();
const waterTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'), r = P.rng(3);
  g.fillStyle = '#5f9fbf'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 120; i++) { g.strokeStyle = 'rgba(230,245,255,0.45)'; g.lineWidth = 2; const x = r() * 256, y = r() * 256; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 10 + r() * 18, y); g.stroke(); }
  const t = P.ctex(c); t.repeat.set(40, 20); return t; })();

export const build = () => {
  const H = {};
  const M = {
    grass: toon('#ffffff', P.grass('#5f8f3f', 7)), dirt: toon('#ffffff', dirtTex), thatch: toon('#ffffff', thatchTex), bamboo: toon('#ffffff', bambooTex),
    trunk: toon('#6f5640'), trunk2: toon('#7f6448'), leaf: toon('#3f7a3a'), leaf2: toon('#4f8a42'), leaf3: toon('#2f6a3a'), fern: toon('#5a9a48'),
    rock: toon('#8a8a80'), wood: toon('#8a5a34'), woodD: toon('#6a4428'), post: toon('#7a5230'), water: unlit('#ffffff', waterTex),
    mtn: toon('#4f7a5a'), ridge: toon('#2f5a3e'), mtnFar: toon('#6f8f86'), ginger: toon('#5fa04a'), flowerW: toon('#f4f1ea'), flowerP: toon('#e88aa8'), flowerY: toon('#f2c440'),
  };
  tbox(3000, 0.1, 3000, M.grass, { y: -0.05, tm: 2 });
  const rnd = P.rng(17);

  // ================= FOREST (x 0) =================
  for (let z = 6; z >= -24; z -= 0.8) cyl(1.0, 1.0, 0.02, M.dirt, { x: pathX(z), y: 0.01, z, seg: 18, cast: false });
  cyl(4.2, 4.2, 0.015, M.dirt, { x: GARDEN[0], y: 0.008, z: GARDEN[2], seg: 32, cast: false });
  const tree = (x, z, s = 1) => {
    const g = group({ x, z }); g.scale.setScalar(s);
    cyl(0.16, 0.24, 3.4, rnd() < 0.5 ? M.trunk : M.trunk2, { y: 1.7, parent: g, seg: 8 });
    const L = [M.leaf, M.leaf2, M.leaf3];
    for (let i = 0; i < 4; i++) { const b = sph(1.0 + rnd() * 0.4, L[i % 3], { x: (rnd() - 0.5) * 1.6, y: 3.4 + rnd() * 1.0, z: (rnd() - 0.5) * 1.4, parent: g, seg: 10 }); b.scale.y = 0.75; }
    return g;
  };
  for (let i = 0; i < 70; i++) {
    const z = 6 - rnd() * 48, side = rnd() < 0.5 ? -1 : 1, x = pathX(z) + side * (2.6 + rnd() * 16);
    if (Math.hypot(x - GARDEN[0], z - GARDEN[2]) < 5.5) continue;
    tree(x, z, 0.8 + rnd() * 0.6);
  }
  for (let i = 0; i < 60; i++) { const z = 6 - rnd() * 40, x = pathX(z) + (rnd() < 0.5 ? -1 : 1) * (1.3 + rnd() * 6); if (Math.hypot(x - GARDEN[0], z - GARDEN[2]) < 4.5) continue;
    const f = cone(0.35 + rnd() * 0.2, 0.5, M.fern, { x, y: 0.25, z, seg: 6 }); f.rotation.y = rnd() * 3; }
  for (let i = 0; i < 14; i++) { const z = 6 - rnd() * 34, x = pathX(z) + (rnd() < 0.5 ? -1 : 1) * (1.2 + rnd() * 3); const r = sph(0.25 + rnd() * 0.25, M.rock, { x, y: 0.1, z, seg: 7 }); r.scale.y = 0.6; }
  cone(60, 40, M.mtn, { x: 0, y: 18, z: -95, seg: 9, cast: false });
  cone(45, 30, M.mtn, { x: -55, y: 13, z: -85, seg: 9, cast: false });
  // Maria's garden: ginger plants in rows + flowers
  for (let r = 0; r < 3; r++) for (let k = 0; k < 6; k++) {
    const x = GARDEN[0] - 2.6 + k * 1.05, z = GARDEN[2] - 1.8 - r * 0.9; if (Math.abs(x - pathX(z)) < 0.9) continue;
    const pl = group({ x, z }); for (let b = 0; b < 5; b++) { const c = cone(0.05, 0.9, M.ginger, { y: 0.45, parent: pl, seg: 4 }); c.rotation.set((rnd() - 0.5) * 0.6, b * 1.3, (rnd() - 0.5) * 0.6); }
  }
  for (let i = 0; i < 26; i++) { const a = rnd() * 6.28, d = 2.4 + rnd() * 1.6; sph(0.07, [M.flowerW, M.flowerP, M.flowerY][i % 3], { x: GARDEN[0] + d * Math.cos(a), y: 0.12, z: GARDEN[2] + d * Math.sin(a), seg: 6 }); }
  // dug-up garden holes (shown in the greedy scene)
  H.holes = []; for (const [dx, dz] of [[-1.6, -0.6], [1.4, -1.2], [0.2, -2.4], [-0.6, 0.8]]) { const h = cyl(0.45, 0.45, 0.02, toon('#5a4028'), { x: GARDEN[0] + dx, y: 0.025, z: GARDEN[2] + dz, seg: 16, cast: false }); h.visible = false; H.holes.push(h); }

  // ================= NIPA HUT (x -60) =================
  const hut = group({ x: HX, z: -2.5 }); hut.scale.setScalar(1.5);
  for (const [px, pz] of [[-1, -0.8], [1, -0.8], [-1, 0.8], [1, 0.8]]) cyl(0.06, 0.06, 0.45, M.post, { x: px, y: 0.225, z: pz, parent: hut, seg: 8 });
  tbox(2.4, 0.1, 2.0, M.woodD, { y: 0.5, parent: hut });
  tbox(2.2, 0.85, 1.8, M.bamboo, { y: 0.97, parent: hut, tm: 1 });
  tbox(0.5, 0.6, 0.04, M.woodD, { x: -0.4, y: 0.85, z: 0.91, parent: hut });
  tbox(0.45, 0.35, 0.04, toon('#2a2018'), { x: 0.55, y: 1.05, z: 0.91, parent: hut });
  const roof = cone(1.9, 1.0, M.thatch, { y: 1.9, parent: hut, seg: 4, ry: Math.PI / 4 }); roof.scale.set(1.0, 1, 0.85);
  for (let i = 0; i < 3; i++) tbox(0.5, 0.04, 0.05, M.wood, { x: -0.4, y: 0.12 + i * 0.14, z: 1.15, parent: hut });
  tbox(1.6, 0.08, 0.4, M.wood, { x: HX + 0.6, y: 0.42, z: 0.2 }); for (const dx of [-0.6, 0.6]) tbox(0.08, 0.42, 0.3, M.woodD, { x: HX + 0.6 + dx, y: 0.21, z: 0.2 });
  const palm = (x, z, lean = 0.1, hgt = 5) => { const g = group({ x, z }); const n = 6;
    for (let i = 0; i < n; i++) cyl(0.09, 0.1, hgt / n + 0.02, M.trunk, { x: Math.sin(lean) * hgt * (i + 0.5) / n, y: (i + 0.5) * hgt / n, rz: -lean, parent: g, seg: 8 });
    const top = group({ x: Math.sin(lean) * hgt, y: hgt, parent: g });
    for (let i = 0; i < 7; i++) { const f = cone(0.16, 1.6, i % 2 ? M.leaf : M.leaf2, { parent: top, seg: 4 }); f.rotation.set(0, i * 0.9, Math.PI / 2 + 0.45); f.position.set(0.7 * Math.cos(-i * 0.9), -0.25, 0.7 * Math.sin(-i * 0.9)); f.scale.set(1, 1, 0.25); }
    return g; };
  palm(HX - 4, -4, 0.12); palm(HX + 4.5, -5, -0.15); palm(HX - 7, 1, 0.2); palm(HX + 7.5, -1, -0.1);
  for (let i = 0; i < 16; i++) tree(HX + (rnd() < 0.5 ? -1 : 1) * (9 + rnd() * 14), -6 - rnd() * 20, 0.9 + rnd() * 0.5);
  cone(60, 40, M.mtn, { x: HX + 10, y: 18, z: -110, seg: 9, cast: false });

  // ================= LAKE + SLEEPING MAIDEN (x 200) =================
  plane(240, 170, M.water, { x: LX, y: 0.03, z: -85, rx: -Math.PI / 2 });
  for (let i = 0; i < 12; i++) { const r = sph(0.3 + rnd() * 0.3, M.rock, { x: LX - 8 + rnd() * 16, y: 0.05, z: 0.2 - rnd() * 0.5, seg: 7 }); r.scale.y = 0.5; }
  palm(LX - 6, 3, 0.18); palm(LX + 6.5, 4, -0.2); palm(LX + 11, 1, -0.1);
  // banca
  const banca = group({ x: LX + 3.2, z: -1.6 }); const hull = sph(1, toon('#8a4a2a'), { parent: banca, seg: 12 }); hull.scale.set(1.8, 0.28, 0.35); hull.position.y = 0.06;
  for (const s of [-1, 1]) cyl(0.03, 0.03, 2.2, M.woodD, { x: 0, y: 0.25, z: s * 0.9, rz: Math.PI / 2, parent: banca, seg: 6 });
  for (const [x, r, h] of [[-160, 50, 26], [170, 60, 30]]) cone(r, h, M.mtnFar, { x: LX + x, y: h / 2 - 2, z: -260, seg: 8, cast: false });
  return H;
};
