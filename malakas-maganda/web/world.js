// One set: the endless sea under the sky (x 0). Islands rise from the boulders the sky throws; the bird rests on the main island ISLE,
// where a floating bamboo bumps its foot and splits open.
import { THREE, scene, toon, unlit, tbox, cyl, sph, cone, plane, group } from './engine.js';
import * as P from './paint.js';

export const ISLE = [0, 0, -8];
export const ISLANDS = [[0, -8, 6], [-16, -30, 7], [14, -36, 8], [-34, -60, 9], [30, -70, 10], [-4, -90, 9], [52, -110, 12], [-56, -120, 11]];

const waterTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'), r = P.rng(3);
  g.fillStyle = '#3f8fc4'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 140; i++) { g.strokeStyle = 'rgba(230,245,255,0.5)'; g.lineWidth = 2; const x = r() * 256, y = r() * 256; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 10 + r() * 18, y); g.stroke(); }
  const t = P.ctex(c); t.repeat.set(60, 60); return t; })();

export const build = () => {
  const H = {};
  const M = { grass: toon('#ffffff', P.grass('#5f9a45', 7)), sand: toon('#e9d6a0'), rock: toon('#8a8478'), trunk: toon('#6f5640'), leaf: toon('#3f7a3a'), leaf2: toon('#4f8a42'),
    bamboo: toon('#8ab84a'), bambooD: toon('#6a9a3a'), inner: toon('#f2e6b0') };
  H.sea = plane(4000, 4000, unlit('#ffffff', waterTex), { y: 0, rx: -Math.PI / 2 });
  const rng = P.rng(13);
  const palm = (x, z, lean, hgt, parent) => { const g = group({ x, z, parent }); const n = 6;
    for (let i = 0; i < n; i++) cyl(0.12, 0.14, hgt / n + 0.02, M.trunk, { x: Math.sin(lean) * hgt * (i + 0.5) / n, y: (i + 0.5) * hgt / n, rz: -lean, parent: g, seg: 8 });
    const top = group({ x: Math.sin(lean) * hgt, y: hgt, parent: g });
    for (let i = 0; i < 7; i++) { const f = cone(0.2, 2.2, i % 2 ? M.leaf : M.leaf2, { parent: top, seg: 4 }); f.rotation.set(0, i * 0.9, Math.PI / 2 + 0.45); f.position.set(0.9 * Math.cos(-i * 0.9), -0.3, 0.9 * Math.sin(-i * 0.9)); f.scale.set(1, 1, 0.25); }
    return g; };
  // islands (scaled 0..1 by story)
  H.islands = ISLANDS.map(([x, z, r], i) => { const g = group({ x, z });
    const sand = sph(r, M.sand, { parent: g, seg: 24 }); sand.scale.set(1, 0.18, 1);
    const top = sph(r * 0.82, M.grass, { parent: g, y: 0.2, seg: 24 }); top.scale.set(1, 0.28, 1);
    for (let k = 0; k < 2 + (i % 3); k++) palm((rng() - 0.5) * r, (rng() - 0.5) * r * 0.8, (rng() - 0.5) * 0.4, 4 + rng() * 2, g);
    const rk = sph(1.2, M.rock, { parent: g, x: r * 0.4, y: 0.6, z: r * 0.3, seg: 8 }); rk.scale.y = 0.6;
    g.visible = false; return g; });
  // the bird's rock on the main island
  H.perch = sph(0.9, M.rock, { x: ISLE[0] - 1.2, y: 0.9, z: ISLE[2] + 2.4, seg: 10 }); H.perch.scale.set(1.2, 0.6, 1); H.perch.visible = false;
  // falling boulders
  H.rocks = []; for (let i = 0; i < ISLANDS.length; i++) { const m = new THREE.Mesh(new THREE.IcosahedronGeometry(3, 0), M.rock); m.castShadow = true; m.visible = false; scene.add(m); H.rocks.push(m); }
  // bamboo: a whole stalk and two halves
  const stalk = (parent, half = 0) => { const g = group({ parent }); for (let i = 0; i < 4; i++) {
      const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.95, 18, 1, false, half ? (half > 0 ? 0 : Math.PI) : 0, half ? Math.PI : Math.PI * 2), M.bamboo);
      seg.position.y = 0.5 + i * 1.0; seg.castShadow = true; g.add(seg); const node = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.31, 0.08, 18, 1, false, half ? (half > 0 ? 0 : Math.PI) : 0, half ? Math.PI : Math.PI * 2), M.bambooD); node.position.y = 1.0 + i * 1.0; g.add(node);
      if (half) { const inr = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.95), M.inner); inr.position.set(0, 0.5 + i * 1.0, 0); inr.rotation.y = half > 0 ? Math.PI / 2 : -Math.PI / 2; g.add(inr); } }
    return g; };
  H.bamboo = group({}); stalk(H.bamboo); H.bamboo.visible = false;
  H.halfA = group({}); stalk(H.halfA, 1); H.halfA.visible = false;
  H.halfB = group({}); stalk(H.halfB, -1); H.halfB.visible = false;
  return H;
};
