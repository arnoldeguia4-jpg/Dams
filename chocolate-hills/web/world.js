// Sets: the Chocolate Hills today with a viewing deck (x 0), and the same island long ago, flat and green, where the giants fought (x PX).
// The same HILLS layout is used twice: brown "chocolate" hills today, and mounds that grow where the giants' throws land long ago.
import { THREE, scene, toon, unlit, tbox, cyl, sph, cone, plane, group } from './engine.js';
import * as P from './paint.js';

export const PX = 300, G1 = [-7, 0, -30], G2 = [7, 0, -30], DECK = [0, 0, 4];
const rng = P.rng(9);
export const HILLS = (() => { const out = []; let tries = 0;
  while (out.length < 40 && tries < 2000) { tries++; const x = -34 + rng() * 68, z = -70 + rng() * 62, r = 2.6 + rng() * 1.4;
    if (Math.hypot(x - G1[0], z - G1[2]) < 7 || Math.hypot(x - G2[0], z - G2[2]) < 7 || (Math.abs(x) < 4 && z > -34)) continue;
    if (out.some((h) => Math.hypot(h.x - x, h.z - z) < h.r + r - 0.6)) continue; out.push({ x, z, r }); }
  out.sort((a, b) => b.z - a.z); return out; })();

const waterTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'), r = P.rng(3);
  g.fillStyle = '#4f9fc4'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 120; i++) { g.strokeStyle = 'rgba(230,245,255,0.5)'; g.lineWidth = 2; const x = r() * 256, y = r() * 256; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 10 + r() * 18, y); g.stroke(); }
  const t = P.ctex(c); t.repeat.set(40, 40); return t; })();
const signTex = (lines) => { const c = document.createElement('canvas'); c.width = 1024; c.height = 512; const g = c.getContext('2d');
  g.fillStyle = '#e9d6a8'; g.fillRect(0, 0, 1024, 512); g.strokeStyle = 'rgba(120,80,40,0.35)'; g.lineWidth = 4; for (let y = 30; y < 512; y += 46) { g.beginPath(); g.moveTo(0, y); g.lineTo(1024, y + 6); g.stroke(); }
  g.strokeStyle = '#3a2216'; g.lineWidth = 22; g.strokeRect(11, 11, 1002, 490); g.fillStyle = '#3a2216'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = 'bold 132px Georgia, serif'; g.fillText(lines[0], 512, 190, 940); g.font = 'bold 96px Georgia, serif'; g.fillStyle = '#7a3a1a'; g.fillText(lines[1], 512, 360, 940);
  return P.ctex(c, false); };

export const build = () => {
  const H = {};
  const M = { grass: toon('#ffffff', P.grass('#6f9a45', 7)), dryGrass: toon('#ffffff', P.grass('#8a6a3a', 11)), green: toon('#ffffff', P.grass('#5f8f3f', 13)),
    trunk: toon('#6f5640'), leaf: toon('#3f7a3a'), leaf2: toon('#4f8a42'), wood: toon('#8a5a34'), woodD: toon('#5a3a22'), rock: toon('#8a8478'), dirt: toon('#7a5432'), sand: toon('#d9c08a') };
  plane(4000, 4000, unlit('#ffffff', waterTex), { y: -0.3, rx: -Math.PI / 2 });
  const palm = (x, z, lean = 0.1, hgt = 6, parent) => { const g = group({ x, z, parent }); const n = 6;
    for (let i = 0; i < n; i++) cyl(0.12, 0.14, hgt / n + 0.02, M.trunk, { x: Math.sin(lean) * hgt * (i + 0.5) / n, y: (i + 0.5) * hgt / n, rz: -lean, parent: g, seg: 8 });
    const top = group({ x: Math.sin(lean) * hgt, y: hgt, parent: g });
    for (let i = 0; i < 7; i++) { const f = cone(0.2, 2.2, i % 2 ? M.leaf : M.leaf2, { parent: top, seg: 4 }); f.rotation.set(0, i * 0.9, Math.PI / 2 + 0.45); f.position.set(0.9 * Math.cos(-i * 0.9), -0.3, 0.9 * Math.sin(-i * 0.9)); f.scale.set(1, 1, 0.25); }
    return g; };
  const hill = (h, mat, parent) => { const m = sph(h.r, mat, { x: h.x, y: 0, z: h.z, seg: 18, parent }); m.scale.set(1, 0.95, 1); return m; };

  // ================= TODAY (x 0) =================
  const T = group({ x: 0 }); H.today = T;
  tbox(160, 0.4, 120, M.dryGrass, { y: -0.2, z: -30, tm: 3, parent: T });
  HILLS.forEach((h) => hill(h, M.dryGrass, T));
  for (let i = 0; i < 40; i++) hill({ x: -70 + rng() * 140, z: -80 - rng() * 30, r: 3 + rng() * 2 }, M.dryGrass, T);
  for (let i = 0; i < 18; i++) { const x = -40 + rng() * 80, z = -6 - rng() * 60; if (HILLS.some((h) => Math.hypot(h.x - x, h.z - z) < h.r + 1.5)) continue; palm(x, z, (rng() - 0.5) * 0.3, 5 + rng() * 2, T); }
  // viewing deck + readable sign
  const D = group({ x: DECK[0], z: DECK[2], parent: T }); tbox(7, 0.25, 4, M.wood, { y: 1.2, parent: D });
  for (const [x, z] of [[-3.3, -1.8], [3.3, -1.8], [-3.3, 1.8], [3.3, 1.8]]) tbox(0.2, 2.4, 0.2, M.woodD, { x, y: 0.6, z, parent: D });
  tbox(7, 0.1, 0.1, M.woodD, { y: 2.2, z: -1.95, parent: D }); for (let i = 0; i < 12; i++) tbox(0.07, 0.9, 0.07, M.woodD, { x: -3.3 + i * 0.6, y: 1.8, z: -1.95, parent: D });
  const sp = group({ x: 2.2, z: 1.0, parent: D }); tbox(0.14, 2.6, 0.14, M.woodD, { x: -0.8, y: 2.5, parent: sp }); tbox(0.14, 2.6, 0.14, M.woodD, { x: 0.8, y: 2.5, parent: sp });
  plane(2.1, 1.05, unlit('#ffffff', signTex(['CHOCOLATE HILLS', 'BOHOL'])), { y: 3.4, z: 0.09, parent: sp });

  // ================= LONG AGO (x PX) =================
  const L = group({ x: PX }); H.past = L;
  tbox(160, 0.4, 120, M.green, { y: -0.2, z: -30, tm: 3, parent: L });
  H.mounds = HILLS.map((h) => { const m = hill(h, M.dirt, L); m.visible = false; return m; });
  for (let i = 0; i < 26; i++) { const x = -60 + rng() * 120, z = -4 - rng() * 70; if (HILLS.some((h) => Math.hypot(h.x - x, h.z - z) < h.r + 2) || Math.hypot(x - G1[0], z - G1[2]) < 5 || Math.hypot(x - G2[0], z - G2[2]) < 5) continue; palm(x, z, (rng() - 0.5) * 0.3, 5 + rng() * 2, L); }
  for (const [x, r, h] of [[-90, 50, 18], [90, 60, 22]]) cone(r, h, toon('#7f9fb6'), { x, y: h / 2 - 2, z: -200, seg: 8, cast: false, parent: L });
  // thrown rocks / clumps (re-used)
  H.rocks = []; for (let i = 0; i < 6; i++) { const m = new THREE.Mesh(new THREE.IcosahedronGeometry(2.2, 0), [M.rock, M.dirt, M.sand][i % 3]); m.castShadow = true; m.visible = false; L.add(m); H.rocks.push(m); }
  H.M = M;
  return H;
};
