// Barangay set pieces for LUGAR (soft pastel Roblox-like town): road, houses, stores with signs, trees, posts, jeep, furniture, phone, money.
import { THREE, scene, tbox, cyl, sph, cone, plane, group, unlit } from './engine.js';
import { roundedBox, soft } from './blocky.js';
import * as P from './paint.js';

const rb = (w, h, d, col, o = {}) => { const m = new THREE.Mesh(roundedBox(w, h, d, o.r ?? 0.05), soft(col)); m.position.set(o.x || 0, o.y || 0, o.z || 0); if (o.ry) m.rotation.y = o.ry; m.castShadow = o.cast ?? true; m.receiveShadow = true; (o.parent || scene).add(m); return m; };
export { rb };

/** a canvas sign texture: bold rounded text on a coloured board */
export const signTex = (text, { bg = '#2f8a4a', fg = '#f4ecc0', w = 1024, h = 256, font = 'Nunito Black, Arial Black, sans-serif', border = '#d9b440' } = {}) => {
  const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d');
  g.fillStyle = bg; g.fillRect(0, 0, w, h); g.strokeStyle = border; g.lineWidth = h * 0.06; g.strokeRect(h * 0.04, h * 0.04, w - h * 0.08, h - h * 0.08);
  let fs = h * 0.56; g.font = `900 ${fs}px ${font}`; while (g.measureText(text).width > w * 0.9 && fs > 10) { fs -= 4; g.font = `900 ${fs}px ${font}`; }
  g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, w / 2, h * 0.54);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
};
export const sign = (text, w, h, opts = {}, o = {}) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: signTex(text, { ...opts, w: 1024, h: Math.round(1024 * h / w) }), roughness: 0.7 })); m.position.set(o.x || 0, o.y || 0, o.z || 0); if (o.ry) m.rotation.y = o.ry; (o.parent || scene).add(m); return m; };

export const ground = (col = '#8fbf5a') => tbox(3000, 0.1, 3000, soft(col), { y: -0.05, tm: 2 });
/** asphalt road along z (or x with alongX), with dashed centre line and kerbs */
export const road = ({ x = 0, z = 0, len = 200, w = 7, alongX = false } = {}) => {
  const g = group({ x, z }); if (alongX) g.rotation.y = Math.PI / 2;
  const asphalt = new THREE.Mesh(new THREE.BoxGeometry(w, 0.06, len), soft('#6b6e76')); asphalt.position.y = 0.02; asphalt.receiveShadow = true; g.add(asphalt);
  for (let k = -len / 2; k < len / 2; k += 4) { const d = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.02, 1.8), soft('#f4f1ea')); d.position.set(0, 0.06, k); g.add(d); }
  for (const s of [-1, 1]) { const kb = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.16, len), soft('#d8d2c6')); kb.position.set(s * (w / 2 + 0.17), 0.08, 0); kb.receiveShadow = true; g.add(kb); const sw = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.12, len), soft('#c9c2b4')); sw.position.set(s * (w / 2 + 1.45), 0.06, 0); sw.receiveShadow = true; g.add(sw); }
  return g;
};
const PASTEL = ['#e98a8a', '#f2b56a', '#8ac4e9', '#b38ad9', '#8fd19a', '#f0d36a', '#e9a0c8', '#7fd0c8'];
/** pastel 2-3 storey house with window blocks and a flat roof lip */
export const house = ({ x = 0, z = 0, w = 5, h = 6, d = 5, col, ry = 0, seed = 1 } = {}) => {
  const g = group({ x, z, ry }); const c = col || PASTEL[seed % PASTEL.length];
  rb(w, h, d, c, { y: h / 2, parent: g, r: 0.08 });
  rb(w + 0.3, 0.25, d + 0.3, '#e9e2d4', { y: h + 0.1, parent: g, r: 0.05 });
  const fl = Math.max(1, Math.floor(h / 2.6));
  for (let i = 0; i < fl; i++) for (const k of [-1, 1]) { rb(w * 0.26, 1.1, 0.12, '#5f8fc0', { x: k * w * 0.24, y: 1.6 + i * 2.5, z: d / 2 + 0.02, parent: g, r: 0.03 }); rb(w * 0.3, 0.12, 0.2, '#f4f1ea', { x: k * w * 0.24, y: 1.0 + i * 2.5, z: d / 2 + 0.06, parent: g, r: 0.03 }); }
  rb(1.0, 1.9, 0.12, '#8a5a34', { y: 0.95, z: d / 2 + 0.03, parent: g, r: 0.03 });
  return g;
};
/** a row of houses along x at z, skipping a gap */
export const street = ({ x0 = -40, x1 = 40, z = -9, face = 1, gap = null, seed = 1 } = {}) => {
  const r = P.rng(seed); let x = x0, i = 0;
  while (x < x1) { const w = 4 + r() * 2.5; if (!gap || x + w < gap[0] || x > gap[1]) house({ x: x + w / 2, z, w, h: 4.5 + r() * 4, d: 5, seed: seed + i, ry: face > 0 ? 0 : Math.PI }); x += w + 0.4; i++; }
};
/** sari-sari / stall: counter + back wall + awning + sign */
export const store = ({ x = 0, z = 0, ry = 0, name = 'TINDAHAN NI ALING NENA', signBg = '#2f8a4a', wall = '#c9a46a' } = {}) => {
  const g = group({ x, z, ry });
  rb(4.2, 1.1, 0.9, '#d9b97a', { y: 0.55, z: 0.4, parent: g });
  rb(4.4, 0.08, 1.1, '#e9d2a0', { y: 1.12, z: 0.4, parent: g });
  rb(4.6, 3.2, 0.3, wall, { y: 1.6, z: -0.6, parent: g });
  for (let i = 0; i < 6; i++) rb(0.7, 0.5, 0.25, ['#c9a040', '#4a7ab5', '#3f8a7a', '#b5653f', '#7a5ac9', '#c25a7a'][i], { x: -1.6 + (i % 3) * 1.6, y: 1.7 + Math.floor(i / 3) * 0.8, z: -0.35, parent: g, r: 0.08 });
  for (const sx of [-2.1, 2.1]) cyl(0.06, 0.06, 2.9, soft('#6a4428'), { x: sx, y: 1.45, z: 1.0, parent: g, seg: 8 });
  rb(4.8, 0.14, 2.0, '#f4f1ea', { y: 3.0, z: 0.2, parent: g });
  for (let i = 0; i < 6; i++) rb(0.8, 0.16, 2.02, i % 2 ? '#e2453c' : '#f4f1ea', { x: -2.0 + i * 0.8, y: 3.12, z: 0.2, parent: g, r: 0.03 });
  sign(name, 4.6, 0.9, { bg: signBg }, { y: 3.75, z: 0.95, parent: g });
  return g;
};
export const tree = ({ x = 0, z = 0, s = 1 } = {}) => { const g = group({ x, z }); g.scale.setScalar(s); cyl(0.14, 0.2, 1.8, soft('#7a5a3a'), { y: 0.9, parent: g, seg: 8 }); for (const [dx, dy, dz, r] of [[0, 2.3, 0, 0.95], [0.45, 2.0, 0.2, 0.7], [-0.45, 2.1, -0.15, 0.7]]) sph(r, soft(dx ? '#5fb04a' : '#6fc456'), { x: dx, y: dy, z: dz, parent: g, seg: 14 }); return g; };
export const lamp = ({ x = 0, z = 0 } = {}) => { const g = group({ x, z }); cyl(0.07, 0.09, 4, soft('#3a3d4a'), { y: 2, parent: g, seg: 8 }); sph(0.22, soft('#fff6d8'), { y: 4.1, parent: g, seg: 12 }); return g; };
/** a blocky jeepney */
export const jeep = ({ x = 0, z = 0, ry = 0, col = '#4a7ad9', trim = '#f2c440' } = {}) => {
  const g = group({ x, z, ry });
  rb(2.0, 1.2, 5.6, col, { y: 1.2, parent: g, r: 0.12 }); rb(2.02, 0.18, 5.62, trim, { y: 1.55, parent: g, r: 0.04 });
  rb(2.1, 0.12, 5.4, '#f4f1ea', { y: 1.9, parent: g, r: 0.05 });
  for (let i = 0; i < 4; i++) for (const s of [-1, 1]) rb(0.05, 0.45, 0.9, '#2a3550', { x: s * 1.01, y: 1.45, z: -1.8 + i * 1.15, parent: g, r: 0.02 });
  rb(1.8, 0.9, 1.4, col, { y: 0.95, z: 3.3, parent: g, r: 0.1 }); rb(1.7, 0.5, 0.05, '#2a3550', { y: 1.5, z: 2.62, parent: g, r: 0.02 });
  for (const zz of [-1.8, 2.8]) for (const s of [-1, 1]) { const w = cyl(0.42, 0.42, 0.3, soft('#22222a'), { x: s * 0.95, y: 0.42, z: zz, parent: g, seg: 16 }); w.rotation.z = Math.PI / 2; }
  return g;
};
export const table = ({ x = 0, z = 0, w = 1.4, d = 0.8, col = '#c9a46a' } = {}) => { const g = group({ x, z }); rb(w, 0.08, d, col, { y: 0.78, parent: g, r: 0.03 }); for (const sx of [-1, 1]) for (const sz of [-1, 1]) rb(0.08, 0.76, 0.08, '#8a5a34', { x: sx * (w / 2 - 0.08), y: 0.38, z: sz * (d / 2 - 0.08), parent: g, r: 0.02 }); return g; };
export const bed = ({ x = 0, z = 0, ry = 0 } = {}) => { const g = group({ x, z, ry }); rb(1.4, 0.45, 2.2, '#8a5a34', { y: 0.22, parent: g }); rb(1.35, 0.2, 2.1, '#3fb08a', { y: 0.55, parent: g }); rb(0.9, 0.18, 0.45, '#f4f1ea', { y: 0.72, z: -0.75, parent: g }); rb(1.4, 0.9, 0.12, '#6a4428', { y: 0.6, z: -1.1, parent: g }); return g; };
export const phone = (screen = '#6fa8ff') => { const g = new THREE.Group(); const b = new THREE.Mesh(roundedBox(0.16, 0.3, 0.025, 0.02), soft('#22222a')); g.add(b); const sc = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.26), new THREE.MeshBasicMaterial({ color: screen })); sc.position.z = 0.014; g.add(sc); g.userData.screen = sc; return g; };
export const cup = (col = '#f4f1ea') => { const g = new THREE.Group(); const c = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.12, 16), soft(col)); g.add(c); const top = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.005, 16), soft('#6a3a1a')); top.position.y = 0.055; g.add(top); return g; };
/** a peso bill as a small flat box (for rain / stacks) */
export const bill = () => { const m = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.005, 0.15), soft('#4fb05a')); m.castShadow = true; return m; };
export const coin = () => { const m = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.015, 16), soft('#f2c440')); m.castShadow = true; return m; };
/** a simple room: floor, back + side walls (for interiors far away on x) */
export const room = ({ x = 0, z = 0, w = 8, d = 7, h = 3.4, wall = '#4a5a8a', floor = '#8a5a3a' } = {}) => {
  const g = group({ x, z }); rb(w, 0.1, d, floor, { y: 0, parent: g, r: 0.02 }); rb(w, h, 0.2, wall, { y: h / 2, z: -d / 2, parent: g, r: 0.02 }); for (const s of [-1, 1]) rb(0.2, h, d, wall, { x: s * w / 2, y: h / 2, parent: g, r: 0.02 }); return g;
};
