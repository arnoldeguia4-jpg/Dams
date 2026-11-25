// Statue of Liberty sets: Liberty Island (origin: sea, island, star fort, pedestal, statue that tints copper -> green),
// distant city skyline, Congress chamber (x 150).
import { THREE, scene, toon, unlit, tbox, cyl, sph, cone, plane, group, place } from './engine.js';
import * as P from './paint.js';

const waterTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d'), r = P.rng(41);
  g.fillStyle = '#3f7fb5'; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 160; i++) { g.strokeStyle = r() > 0.5 ? '#6aa6d6' : '#2f6a9e'; g.lineWidth = 4; const x = r() * 512, y = r() * 512; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 20, y - 8, x + 40, y); g.stroke(); }
  return P.ctex(c); })();
export const COPPER = new THREE.Color('#c27a46'), GREEN = new THREE.Color('#6fb59a');

export const build = () => {
  const H = {};
  const water = plane(3000, 3000, toon('#ffffff', waterTex, { side: THREE.DoubleSide }), { rx: -Math.PI / 2, y: 0 }); waterTex.repeat.set(300, 300); H.water = water; water.receiveShadow = true;
  // island
  cyl(34, 36, 1.2, toon('#ffffff', P.grass('#6f9a45', 7)), { y: -0.1, seg: 40 });
  tbox(6, 0.05, 16, toon('#cfc6b4'), { y: 0.52, z: 22 });
  const stone = toon('#ffffff', P.cobble('#b8b0a0', 6)), block = toon('#ffffff', P.plaster('#c9c0ae', 12));
  cyl(14, 15, 2.2, stone, { y: 1.6, seg: 11 });
  tbox(8, 9, 8, block, { y: 7.2, tm: 2 }); tbox(9, 0.8, 9, block, { y: 3.1 }); tbox(8.8, 0.8, 8.8, block, { y: 11.9 });
  for (let k = 0; k < 4; k++) { const w = tbox(1.4, 2.4, 0.2, toon('#8a8478'), { y: 8.0 }); w.rotation.y = k * Math.PI / 2; w.translateZ(4.05); }
  // statue (tintable materials)
  H.mats = [];
  const M = () => { const m = toon('#ffffff'); m.color.copy(COPPER); H.mats.push(m); return m; };
  const st = group({ y: 12.3 }); H.statue = st;
  const robe = cone(2.4, 8.5, M(), { y: 4.2, parent: st, seg: 18 }); robe.rotation.y = 0.3;
  cyl(0.9, 1.4, 3.2, M(), { y: 9.4, parent: st, seg: 14 });
  const fold = cyl(0.25, 0.5, 7, M(), { x: 0.9, y: 4.2, z: 1.2, parent: st, seg: 8 }); fold.rotation.z = -0.1;
  cyl(0.45, 0.5, 0.8, M(), { y: 11.2, parent: st, seg: 10 });
  sph(1.0, M(), { y: 12.3, parent: st, seg: 18 });
  for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + (k - 3) * 0.38; const s = cone(0.16, 1.3, M(), { parent: st, seg: 6 }); s.position.set(Math.cos(a) * 0.95, 13.0 + Math.sin(a + Math.PI / 2) * 0.35, 0.2 + Math.sin(a) * 0.3); s.rotation.z = -Math.cos(a) * 0.9; s.rotation.x = 0.25; }
  cyl(0.95, 1.05, 0.35, M(), { y: 12.85, parent: st, seg: 14 });
  const arm = group({ x: 1.15, y: 10.4, parent: st }); arm.rotation.z = 0.12;
  cyl(0.38, 0.45, 4.4, M(), { y: 2.2, parent: arm, seg: 10 });
  cyl(0.28, 0.36, 1.4, M(), { y: 4.9, parent: arm, seg: 10 });
  cyl(0.6, 0.35, 0.6, M(), { y: 5.8, parent: arm, seg: 12 });
  H.flame = cone(0.55, 1.4, unlit('#f2c440'), { y: 6.8, parent: arm, seg: 10 }); H.flame.userData.noND = true;
  const tab = tbox(1.2, 2.0, 0.35, M(), { x: -1.3, y: 8.6, z: 0.6, parent: st }); tab.rotation.z = 0.3;
  cyl(0.35, 0.4, 3.2, M(), { x: -1.2, y: 9.0, parent: st, seg: 8 }).rotation.z = 0.35;
  // skyline + clouds
  const sky = group({ z: -170 });
  for (let i = 0; i < 26; i++) { const h = 18 + ((i * 37) % 40); tbox(8, h, 8, toon(['#8f9fb8', '#7a8aa6', '#9aa8c0'][i % 3]), { x: -130 + i * 10, y: h / 2, parent: sky }); }
  for (let i = 0; i < 6; i++) { const c = plane(40, 18, unlit('#ffffff', P.cloudTex(i + 3), { transparent: true, fog: false, depthWrite: false }), { x: -120 + i * 50, y: 55 + (i % 3) * 12, z: -210 }); c.userData.noND = true; }
  // gift box (opens to reveal the statue)
  H.gift = group({ x: 0, y: 2.7, z: 0 });
  H.giftWalls = [];
  for (const [x, z, ry] of [[0, 6, 0], [0, -6, 0], [6, 0, Math.PI / 2], [-6, 0, Math.PI / 2]]) { const wg = group({ x, z, parent: H.gift }); wg.rotation.y = ry; tbox(12.2, 26, 0.2, toon('#2b5fb0'), { y: 13, parent: wg }); tbox(1.6, 26, 0.3, toon('#d0303a'), { y: 13, parent: wg }); H.giftWalls.push(wg); }
  tbox(12.6, 0.6, 12.6, toon('#2b5fb0'), { y: 26.2, parent: H.gift }); tbox(1.6, 0.7, 12.7, toon('#d0303a'), { y: 26.2, parent: H.gift }); tbox(12.7, 0.7, 1.6, toon('#d0303a'), { y: 26.2, parent: H.gift });
  for (const s of [-1, 1]) { const b = sph(2.2, toon('#d0303a'), { x: s * 1.8, y: 27.6, parent: H.gift, seg: 12 }); b.scale.set(1.3, 0.7, 0.6); }
  // paint buckets + scaffold near the statue base
  H.buckets = group({ x: 3.8, y: 0.5, z: 15.5 });
  for (let k = 0; k < 3; k++) { const b = group({ x: k * 0.55, parent: H.buckets }); cyl(0.22, 0.18, 0.4, toon('#9aa3a8'), { y: 0.2, parent: b, seg: 12 }); cyl(0.2, 0.2, 0.02, toon('#c87a3a'), { y: 0.39, parent: b, seg: 12 }); }
  plane(1.2, 0.35, unlit('#ffffff', P.label('COPPER PAINT', { w: 512, h: 150, bg: '#f4ecd2', fg: '#8a3a1a', font: 'bold 64px Georgia, serif' })), { x: 4.35, y: 1.15, z: 15.25 });
  tbox(0.08, 1.0, 0.08, toon('#6a4a2e'), { x: 4.35, y: 0.75, z: 15.2 });
  // ---------------- Congress (x 150) ----------------
  const C = group({ x: 150 });
  tbox(14, 0.1, 10, toon('#ffffff', P.planks('#7a5232', 51, 6)), { y: 0.06, parent: C, tm: 1.4 });
  tbox(14, 5, 0.2, toon('#ffffff', P.plaster('#c9b89a', 52)), { y: 2.5, z: -3, parent: C });
  for (const x of [-4, 4]) cyl(0.35, 0.4, 5, toon('#efe8d8'), { x, y: 2.5, z: -2.6, parent: C, seg: 12 });
  tbox(3.2, 0.7, 0.8, toon('#5a3a22'), { y: 0.46, z: -2.1, parent: C }); tbox(3.3, 0.08, 0.9, toon('#6a4a2e'), { y: 0.84, z: -2.1, parent: C });
  const fl = plane(1.6, 1.0, unlit('#ffffff', (() => { const c = document.createElement('canvas'); c.width = 190; c.height = 100; const g = c.getContext('2d'); for (let i = 0; i < 13; i++) { g.fillStyle = i % 2 ? '#f4f1ea' : '#c0353a'; g.fillRect(0, i * 100 / 13, 190, 100 / 13 + 1); } g.fillStyle = '#2b3b7a'; g.fillRect(0, 0, 80, 54); return P.ctex(c, false); })()), { x: -2.4, y: 3.4, z: -2.88, parent: C });
  plane(1.8, 0.5, unlit('#ffffff', P.label('1906', { w: 512, h: 150, bg: '#f4ecd2', fg: '#2a2030', font: 'bold 110px Georgia, serif' })), { x: 2.4, y: 3.4, z: -2.88, parent: C });
  return H;
};
export const tintStatue = (H, t) => { const c = COPPER.clone().lerp(GREEN, t); H.mats.forEach((m) => m.color.copy(c)); };
