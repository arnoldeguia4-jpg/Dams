// The set: a Bagobo-style village yard under a sky so low you can touch it. Returns handles to the animated parts.
import { THREE, scene, toon, unlit, tbox, cyl, sph, cone, plane, group } from './engine.js';
import * as P from './paint.js';

export const SKY0 = 2.1;        // underside height of the low sky (m)
export const MORTAR = [0.22, 0, 0.3];

const coralTex = (() => { // pale coral-rock underside: pores and soft blotches
  const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d'), r = P.rng(41);
  g.fillStyle = '#f1ece0'; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 160; i++) { g.fillStyle = `rgba(${200 + r() * 40},${190 + r() * 40},${175 + r() * 40},0.35)`; g.beginPath(); g.arc(r() * 512, r() * 512, 10 + r() * 40, 0, 7); g.fill(); }
  for (let i = 0; i < 900; i++) { const x = r() * 512, y = r() * 512, s = 1.5 + r() * 4; g.fillStyle = 'rgba(150,135,120,0.55)'; g.beginPath(); g.ellipse(x, y, s, s * 0.8, 0, 0, 7); g.fill(); g.fillStyle = 'rgba(255,255,255,0.6)'; g.beginPath(); g.arc(x - 1, y - 1, s * 0.4, 0, 7); g.fill(); }
  return P.ctex(c); })();
const dirtTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'), r = P.rng(7);
  g.fillStyle = '#b89464'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 500; i++) { g.fillStyle = r() < 0.5 ? 'rgba(120,90,60,0.35)' : 'rgba(225,200,160,0.35)'; g.fillRect(r() * 256, r() * 256, 2 + r() * 4, 2 + r() * 3); }
  const t = P.ctex(c); t.repeat.set(6, 6); return t; })();
const thatchTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'), r = P.rng(9);
  g.fillStyle = '#b08a4a'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 260; i++) { const x = r() * 256, y = r() * 256; g.strokeStyle = r() < 0.5 ? 'rgba(120,85,40,0.6)' : 'rgba(220,190,120,0.6)'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - 0.5) * 6, y + 18 + r() * 16); g.stroke(); }
  return P.ctex(c); })();
const bambooTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d');
  for (let i = 0; i < 16; i++) { g.fillStyle = i % 2 ? '#c9a46a' : '#bf9a5e'; g.fillRect(i * 16, 0, 16, 256); g.fillStyle = 'rgba(90,60,30,0.5)'; g.fillRect(i * 16, 0, 1.5, 256); g.fillRect(i * 16, 60 + (i * 37) % 120, 16, 3); }
  return P.ctex(c); })();

export const build = () => {
  const H = {};
  const M = {
    grass: toon('#ffffff', P.grass('#6f9a45', 7)), dirt: toon('#ffffff', dirtTex), coral: unlit('#ebe4d6', coralTex, { transparent: true, opacity: 1 }),
    thatch: toon('#ffffff', thatchTex), bamboo: toon('#ffffff', bambooTex), wood: toon('#8a5a34'), woodD: toon('#6a4428'), post: toon('#7a5230'),
    trunk: toon('#8f7354'), frond: toon('#4f8a3a'), frond2: toon('#3f7a32'), mtn: toon('#5f7f7a'), mtn2: toon('#6f8f86'), rice: toon('#f4efe0'), basket: toon('#c9a45a'),
  };
  // ground
  tbox(3000, 0.1, 3000, M.grass, { y: -0.05, tm: 2 });
  cyl(6, 6, 0.02, M.dirt, { y: 0.005, seg: 40, cast: false });

  // stilt houses
  const house = (x, z, ry = 0, s = 1) => {
    const g = group({ x, z, ry }); g.scale.setScalar(s);
    for (const [px, pz] of [[-1, -0.8], [1, -0.8], [-1, 0.8], [1, 0.8]]) cyl(0.06, 0.06, 0.45, M.post, { x: px, y: 0.225, z: pz, parent: g, seg: 8 });
    tbox(2.4, 0.1, 2.0, M.woodD, { y: 0.5, parent: g });
    tbox(2.2, 0.75, 1.8, M.bamboo, { y: 0.92, parent: g, tm: 1 });
    tbox(0.5, 0.55, 0.04, M.woodD, { y: 0.83, z: 0.91, parent: g });
    const roof = cone(1.85, 0.72, M.thatch, { y: 1.64, parent: g, seg: 4, ry: Math.PI / 4 }); roof.scale.set(1.0, 1, 0.85);
    // ladder
    for (let i = 0; i < 3; i++) tbox(0.5, 0.04, 0.05, M.wood, { y: 0.12 + i * 0.14, z: 1.15, parent: g });
    return g;
  };
  house(-4.2, -3.2, 0.3); house(4.6, -4.0, -0.35); house(-8.5, -7.5, 0.5, 1.05); house(9.0, -8.5, -0.2); house(0.8, -10.5, 0.05, 1.1); house(-14, -2, 0.9); house(14, -1, -0.9);
  // coconut palms: trunks reach the sky and their fronds splay flat against it
  H.fronds = [];
  const palm = (x, z, lean = 0.1, hgt = SKY0 - 0.12) => {
    const g = group({ x, z }); const n = 6;
    for (let i = 0; i < n; i++) cyl(0.09 - i * 0.006, 0.1 - i * 0.006, hgt / n + 0.02, M.trunk, { x: Math.sin(lean) * hgt * (i + 0.5) / n, y: (i + 0.5) * hgt / n, rz: -lean, parent: g, seg: 8 });
    const top = group({ x: Math.sin(lean) * hgt, y: hgt, parent: g });
    for (let i = 0; i < 7; i++) { const f = cone(0.16, 1.4, i % 2 ? M.frond : M.frond2, { parent: top, seg: 4 }); f.rotation.set(0, i * 0.9, Math.PI / 2 - 0.05); f.position.set(0.65 * Math.cos(-i * 0.9), 0.02, 0.65 * Math.sin(-i * 0.9)); f.scale.set(1, 1, 0.25); }
    sph(0.12, M.woodD, { y: -0.12, x: 0.05, parent: top }); sph(0.11, M.woodD, { y: -0.13, x: -0.07, z: 0.05, parent: top });
    H.fronds.push(top); return g;
  };
  palm(-2.6, -1.4, 0.12); palm(3.0, -1.8, -0.15); palm(-6.5, -5.5, 0.2); palm(7.0, -6.0, -0.1); palm(-1.5, -6.5, 0.05); palm(11, -4, 0.1); palm(-11, -9, -0.1); palm(5.5, 2.5, -0.2);

  // the rice mortar (lusong), rice inside, a winnowing basket (bilao) and a sack
  const m = group({ x: MORTAR[0], z: MORTAR[2] }); H.mortar = m;
  cyl(0.27, 0.22, 0.62, M.wood, { y: 0.31, parent: m, seg: 20 });
  cyl(0.2, 0.2, 0.02, M.woodD, { y: 0.615, parent: m, seg: 20 });
  H.riceTop = cyl(0.19, 0.19, 0.02, M.rice, { y: 0.6, parent: m, seg: 20 });
  cyl(0.38, 0.38, 0.03, M.basket, { x: 1.25, y: 0.015, z: 0.25, seg: 24 });
  for (let i = 0; i < 18; i++) sph(0.03, M.rice, { x: 1.25 + 0.25 * Math.cos(i * 2.4) * ((i % 5) / 5), y: 0.035, z: 0.25 + 0.25 * Math.sin(i * 2.4) * ((i % 5) / 5), seg: 6 });
  cyl(0.18, 0.22, 0.45, M.basket, { x: -0.75, y: 0.225, z: 0.1, seg: 12 });

  // the pestle (halo): pivot at its bottom end
  H.pestle = group({}); cyl(0.042, 0.042, 1.4, M.post, { y: 0.7, parent: H.pestle, seg: 12 }); sph(0.05, M.post, { y: 1.4, parent: H.pestle, seg: 10 }); sph(0.05, M.post, { y: 0, parent: H.pestle, seg: 10 });

  // distant mountains (only once the sky is high)
  H.mtns = [];
  for (const [x, z, r, h, mm] of [[-60, -140, 40, 34, M.mtn], [10, -170, 55, 48, M.mtn2], [80, -150, 45, 30, M.mtn], [-130, -120, 40, 26, M.mtn2]]) H.mtns.push(cone(r, h, mm, { x, y: h / 2 - 2, z, seg: 7, cast: false }));

  // the low sky: a vast slab of pale coral rock whose underside sits at SKY0
  H.sky = group({ y: SKY0 });
  H.skySlab = tbox(3000, 0.6, 3000, M.coral, { y: 0.3, parent: H.sky, cast: false, tm: 2.5 });
  H.skySlab.receiveShadow = false;
  return H;
};
