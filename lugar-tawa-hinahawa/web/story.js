// LUGAR: "Hinahawa ang Tawa" — Dito sa lugar namin, masaya ang mahihirap, malungkot ang mayayaman.
import { THREE, scene, ss, easeOut, easeIn, back, win, clamp, lerp } from './engine.js';
import { makeBlocky, pose, hold, roundedBox, soft } from './blocky.js';
import { ground, road, street, house, store, tree, lamp, room, table, rb, sign } from './props.js';
import { pill, shout, burst, puff, dizzy, moneyRain, confetti, glowCard, fx, FONT } from './cast.js';

export const TOTAL = 2581;
export const FLASHES = [[115, 123], [1532, 1540], [2169, 2177]];
const TVX = 120, HALL = 160;
const MANSION = { x: -27, z: -17 }, BALC = [-27, 4.35, -12.9], GATE = -27, COURT = { x: -8, z: -7.2 };
const NHOUSE = { x: 8, z: -8.4 }, CART = [2.2, 0, -5.4], BENCH = [11.2, 0, -5.6];

// ---------------- shots ----------------
const k = (f, pos, look, fov = 40, o = {}) => ({ f, pos, look, fov, ...o });
export const SHOTS = [
  { id: 'open', a: 0, b: 118, light: 'lugar', at: [0, 1, 0], span: 18, cam: [k(0, [5.2, 2.4, 5.4], [0, 1.2, -3], 46), k(118, [2.8, 1.6, 3.6], [1.2, 1.3, -1.6], 42)], dof: () => ({ c: 2, pt: [1.2, 1.3, -1.6] }) },
  { id: 'rich', a: 119, b: 206, light: 'lugar', at: [-27, 3, -14], span: 18, cam: [k(119, [-22, 2.2, 3], [-27, 4.2, -14], 44), k(206, [-24.5, 3.0, -3.5], [-27, 4.6, -13], 40)], dof: () => ({ c: 2, pt: BALC }) },
  { id: 'berto', a: 207, b: 339, light: 'lugar', at: [2, 1, -5], span: 10, cam: [k(207, [3.8, 1.6, -0.2], [2.0, 1.4, -5.2], 42), k(339, [3.3, 1.6, -1.0], [2.0, 1.5, -5.4], 40)], dof: () => ({ c: 4, pt: [2, 1.5, -5.4] }) },
  { id: 'don', a: 340, b: 478, light: 'lugar', at: [-27, 1, -14], span: 14, cam: [k(340, [-24.5, 2.4, 0.5], [-27, 2.0, -8], 48), k(420, [-26.2, 1.7, -2.6], [-27, 1.5, -7], 42), k(478, [-26.5, 1.75, -3.6], [-27, 1.6, -7], 40)], dof: () => ({ c: 4, pt: [-27, 1.6, -14] }) },
  { id: 'ako', a: 479, b: 616, light: 'lugar', at: [8, 1, -5], span: 10, cam: [k(479, [8.3, 1.75, -1.6], [8, 1.65, -5.2], 40), k(616, [8.3, 1.72, -2.0], [8, 1.6, -5.2], 40)], kicks: [[574, 0.03]], dof: () => ({ c: 5, pt: [8, 1.7, -5.2] }) },
  { id: 'kalye', a: 617, b: 749, light: 'lugar', at: [6, 1, -3], span: 14, cam: [k(617, [6.5, 1.6, 4.4], [6, 1.2, -4.5], 44), k(700, [5.5, 1.5, 3.6], [5, 1.0, -3.8], 46), k(749, [4.4, 0.8, 0.2], [4.2, 0.5, -2.6], 42)], dof: () => ({ c: 2, pt: [5, 1, -4] }) },
  { id: 'lola', a: 750, b: 892, light: 'lugar', at: [11, 1, -5], span: 10, cam: [k(750, [10.8, 1.5, -0.4], [11, 1.15, -5.6], 42), k(892, [11.0, 1.45, -1.0], [11, 1.15, -5.6], 40)], dof: () => ({ c: 4, pt: [11, 1.2, -5.6] }) },
  { id: 'knock', a: 893, b: 1000, light: 'lugar', at: [8, 1, -6], span: 10, cam: [k(893, [8.6, 1.9, 0.4], [8.5, 1.25, -6.3], 46), k(1000, [8.5, 1.85, -0.2], [8.5, 1.3, -6.3], 44)], dof: () => ({ c: 3, pt: [8.4, 1.5, -6.2] }) },
  { id: 'sign', a: 1001, b: 1063, light: 'lugar', at: [8, 1, -5], span: 10, cam: [k(1001, [8.4, 1.9, -1.6], [8.1, 1.15, -5.0], 40), k(1063, [8.4, 1.85, -1.4], [8.1, 1.35, -5.0], 40)], dof: () => ({ c: 4, pt: [8.1, 1.1, -5] }) },
  { id: 'nolaugh', a: 1064, b: 1139, light: 'lugar', at: [8, 1, -5], span: 10, cam: [k(1064, [8.25, 1.8, -1.8], [8, 1.75, -5.2], 40), k(1139, [8.2, 1.78, -2.2], [8, 1.72, -5.2], 40)], dof: () => ({ c: 6, pt: [8, 1.7, -5.2] }) },
  { id: 'car', a: 1140, b: 1239, light: 'lugar', at: [14, 1, 1], span: 10, cam: [k(1140, [19.8, 1.7, 6.6], [14, 1.2, 1.4], 42), k(1239, [18.6, 1.7, 5.6], [14, 1.25, 1.4], 40)], dof: () => ({ c: 3, pt: [14, 1.1, 1.4] }) },
  { id: 'tvs', a: 1240, b: 1332, light: 'lugarNight', at: [TVX, 1, 0], span: 10, cam: [k(1240, [TVX + 3.0, 1.9, 3.8], [TVX - 0.4, 1.0, -0.4], 50), k(1332, [TVX + 2.6, 1.8, 3.4], [TVX - 0.4, 1.0, -0.4], 48)], dof: () => ({ c: 2, pt: [TVX, 1.3, 0] }) },
  { id: 'hall', a: 1333, b: 1531, light: 'lugar', at: [HALL, 1, 0], span: 12, cam: [k(1333, [HALL + 0.3, 1.7, 2.6], [HALL, 1.6, -0.6], 40), k(1440, [HALL + 0.4, 1.8, 4.0], [HALL, 1.5, -0.6], 42), k(1500, [HALL + 1.0, 4.4, 9.0], [HALL, 1.2, -1.2], 50, { ease: ss }), k(1531, [HALL + 1.0, 4.5, 9.4], [HALL, 1.2, -1.2], 50)], dof: () => ({ c: 0 }) },
  { id: 'balcony', a: 1532, b: 1771, light: 'lugarNight', at: [-27, 4, -13], span: 18,
    cam: [k(1532, [-24.5, 4.9, -9.2], [-27, 5.0, -12.9], 42), k(1650, [-24.8, 5.1, -9.6], [-27, 5.1, -12.9], 40), k(1690, [-25.4, 5.6, -11.8], [-9, 1.0, -6], 48, { ease: ss }), k(1771, [-25.3, 5.6, -11.7], [-8.5, 1.0, -6.6], 44)], dof: () => ({ c: 0 }) },
  { id: 'smile', a: 1772, b: 1946, light: 'lugarNight', at: [-27, 4, -13], span: 10, cam: [k(1772, [-26.7, 5.7, -9.7], [-27, 5.6, -12.9], 40), k(1946, [-26.75, 5.68, -10.0], [-27, 5.55, -12.9], 40)], kicks: [[1843, 0.03]], dof: () => ({ c: 6, pt: [-27, 5.6, -12.9] }) },
  { id: 'wall', a: 1947, b: 2168, light: 'lugarNight', at: [-27, 1, -12], span: 18, cam: [k(1947, [-20, 2.0, -3.5], [-27, 2.4, -12], 44), k(2064, [-21, 2.2, -4.5], [-27, 2.6, -12], 42), k(2065, [HALL + 1.0, 4.4, 9.0], [HALL, 1.2, -1.2], 50), k(2168, [HALL + 0.8, 3.6, 7.6], [HALL, 1.2, -1.0], 48)], dof: () => ({ c: 0 }) },
  { id: 'gate', a: 2169, b: 2307, light: 'lugar', at: [-27, 1, -8], span: 14, cam: [k(2169, [-25, 1.7, -2.6], [-27, 1.6, -11], 44), k(2230, [-24, 1.8, -1.4], [-27, 1.4, -9], 46), k(2307, [-20.5, 2.0, 3.6], [-22, 1.1, 0.8], 46)], dof: () => ({ c: 0 }) },
  { id: 'feast', a: 2308, b: 2494, light: 'lugar', at: [-22, 1, 1], span: 14, cam: [k(2308, [-17, 3.2, 6.8], [-22, 1.0, 1], 46), k(2400, [-19, 2.4, 5.4], [-22, 1.2, 1], 44), k(2494, [-20.6, 1.9, 4.2], [-22, 1.3, 1], 42)], dof: () => ({ c: 0 }) },
  { id: 'closer', a: 2495, b: TOTAL - 1, light: 'lugar', at: [-22, 1, 1], span: 10, cam: [k(2495, [-21.6, 1.8, 6.0], [-21.8, 1.6, 2.2], 40), k(TOTAL, [-21.65, 1.8, 5.5], [-21.8, 1.65, 2.2], 40)], dof: () => ({ c: 6, pt: [-21.8, 1.7, 2.2] }) },
  { id: 'thumb', a: 9000, b: 9000, light: 'lugar', at: [0, 1, 0], span: 10, cam: [k(9000, [8.6, 1.85, -1.6], [8.2, 1.7, -5.2], 42)], dof: () => ({ c: 4, pt: [8, 1.7, -5.2] }) },
];
export const shotAt = (f) => SHOTS.find((s) => f >= s.a && f <= s.b) || SHOTS[SHOTS.length - 1];

// ---------------- cast ----------------
const SPEC = {
  ako: { skin: '#b8794f', shirt: '#f08a2c', pants: '#2b3b7a', hair: 'blocky', seed: 1 },
  akoRich: { skin: '#b8794f', shirt: '#6a3a8a', pants: '#2a2a34', hair: 'blocky', sash: '#f2c440', seed: 1 },
  berto: { skin: '#a8704a', shirt: '#f4f1ea', sleeves: '#a8704a', pants: '#6a4a32', hair: 'cap', capColor: '#c2453c', moustache: '#2a201a', belly: 1.25, seed: 2 },
  don: { skin: '#d29c6e', shirt: '#7a1f2a', pants: '#2a2a34', hair: 'grey', glasses: true, sash: '#f2c440', belly: 1.25, seed: 3 },
  lola: { skin: '#b8794f', shirt: '#7a5ac9', pants: '#3a2a5a', skirt: '#3a2a5a', hair: 'grey', glasses: true, seed: 4 },
  n1: { skin: '#c48a5e', shirt: '#3fa060', pants: '#3a3a44', hair: 'long', seed: 5 },
  n2: { skin: '#b07a52', shirt: '#e2453c', pants: '#2b3b7a', hair: 'cap', capColor: '#2b4c9a', kid: true, seed: 6 },
  n3: { skin: '#a8704a', shirt: '#2f8ad0', pants: '#4a3426', hair: 'curly', seed: 7 },
  n4: { skin: '#d29c6e', shirt: '#e88aa8', pants: '#5a3a5a', hair: 'bun', kid: true, seed: 8 },
  n5: { skin: '#c48a5e', shirt: '#f2c440', pants: '#3a3a44', hair: 'blocky', hairColor: '#4a2a1a', seed: 9 },
};

// ---------------- helpers ----------------
const car = (x, z, col, ry = 0, parent) => { const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; (parent || scene).add(g);
  rb(1.9, 0.7, 4.0, col, { y: 0.6, parent: g, r: 0.15 }); rb(1.7, 0.6, 2.0, col, { y: 1.2, z: -0.2, parent: g, r: 0.15 }); rb(1.72, 0.45, 1.9, '#2a3550', { y: 1.2, z: -0.2, parent: g, r: 0.08 }).scale.set(1.0, 1, 1.02);
  for (const zz of [-1.25, 1.25]) for (const s of [-1, 1]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.28, 16), soft('#22222a')); w.rotation.z = Math.PI / 2; w.position.set(s * 0.9, 0.36, zz); w.castShadow = true; g.add(w); }
  for (const s of [-1, 1]) rb(0.32, 0.18, 0.06, '#fff6c8', { x: s * 0.6, y: 0.7, z: 2.0, parent: g, r: 0.04 });
  return g; };
const faceCanvas = (kind) => { const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d'); g.fillStyle = '#3a5aa8'; g.fillRect(0, 0, 128, 128); g.strokeStyle = '#ffffff'; g.lineWidth = 7; g.fillStyle = '#fff';
  g.beginPath(); g.arc(44, 54, 7, 0, 7); g.arc(84, 54, 7, 0, 7); g.fill(); g.beginPath(); if (kind === 'sad') g.arc(64, 100, 20, Math.PI * 1.15, Math.PI * 1.85); else g.arc(64, 70, 20, Math.PI * 0.15, Math.PI * 0.85); g.stroke();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; };
const dog = () => { const g = new THREE.Group(); scene.add(g); const c = '#c98a4a';
  rb(0.42, 0.36, 0.8, c, { y: 0.45, parent: g, r: 0.1 }); const head = new THREE.Group(); head.position.set(0, 0.78, 0.42); g.add(head); rb(0.38, 0.36, 0.38, c, { parent: head, r: 0.1 }); rb(0.2, 0.16, 0.2, '#e9c49a', { y: -0.06, z: 0.22, parent: head, r: 0.06 });
  rb(0.08, 0.06, 0.04, '#241a16', { y: 0.0, z: 0.33, parent: head, r: 0.02 }); for (const s of [-1, 1]) { rb(0.06, 0.08, 0.02, '#241a16', { x: s * 0.09, y: 0.07, z: 0.2, parent: head, r: 0.02 }); rb(0.1, 0.2, 0.08, '#8a5a2a', { x: s * 0.17, y: 0.18, z: -0.04, parent: head, r: 0.04 }); }
  const mouth = rb(0.14, 0.05, 0.03, '#7a1e28', { y: -0.13, z: 0.32, parent: head, r: 0.02 });
  const legs = []; for (const [x, z] of [[-0.14, 0.28], [0.14, 0.28], [-0.14, -0.28], [0.14, -0.28]]) legs.push(rb(0.12, 0.3, 0.12, c, { x, y: 0.15, z, parent: g, r: 0.04 }));
  const tail = rb(0.08, 0.08, 0.3, c, { y: 0.62, z: -0.48, parent: g, r: 0.03 }); tail.rotation.x = 0.6;
  return { g, head, mouth, tail, legs }; };

// ---------------- setup ----------------
export const setup = () => {
  const H = {}, R = {};
  ground('#8fbf5a'); road({ alongX: true, len: 260 });
  street({ x0: -80, x1: -38, z: -9, seed: 3 }); street({ x0: 12, x1: 70, z: -9, seed: 5 }); street({ x0: -80, x1: 70, z: 9, face: -1, seed: 7 });
  house({ x: NHOUSE.x, z: NHOUSE.z, w: 5, h: 4.4, d: 4, col: '#8ac4e9', seed: 2 });
  for (const x of [-60, -44, 16, 34, 52]) tree({ x, z: -5.6 }); for (const x of [-50, -10, 26, 44]) tree({ x, z: 5.6 });
  for (const x of [-34, -4, 22]) lamp({ x, z: 4.9 });
  // Mang Berto's fishball cart
  const cart = new THREE.Group(); cart.position.set(CART[0] + 0.9, 0, CART[2] + 0.2); scene.add(cart);
  rb(1.4, 0.8, 0.8, '#f2c440', { y: 0.75, parent: cart }); rb(1.5, 0.08, 0.9, '#c9a46a', { y: 1.18, parent: cart }); for (const s of [-1, 1]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.1, 16), soft('#3a3a44')); w.rotation.x = Math.PI / 2; w.position.set(s * 0.5, 0.3, 0.45); cart.add(w); }
  const um = new THREE.Mesh(new THREE.ConeGeometry(1.0, 0.5, 12), soft('#e2453c')); um.position.set(0, 2.5, 0); cart.add(um); const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.4, 8), soft('#7a7a80')); pole.position.set(0, 1.85, 0); cart.add(pole);
  rb(0.5, 0.2, 0.4, '#8a8a90', { y: 1.3, parent: cart, r: 0.04 }); for (let i = 0; i < 5; i++) { const b = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), soft('#d9a441')); b.position.set(-0.2 + i * 0.1, 1.45, 0); cart.add(b); }
  sign('FISHBALL', 1.3, 0.32, { bg: '#e2453c', fg: '#ffffff', border: '#f2c440' }, { y: 0.85, z: 0.41, parent: cart });
  // basketball court (public, next to the mansion wall)
  rb(10, 0.06, 6, '#3f7ab5', { x: COURT.x, y: 0.03, z: COURT.z, r: 0.02, cast: false }); rb(9.4, 0.065, 5.4, '#e9884a', { x: COURT.x, y: 0.035, z: COURT.z, r: 0.02, cast: false });
  for (const s of [-1, 1]) { const px = COURT.x + s * 4.4; const p = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.2, 8), soft('#4a4a52')); p.position.set(px + s * 0.4, 1.6, COURT.z); scene.add(p); rb(0.1, 1.0, 1.6, '#f4f1ea', { x: px, y: 3.1, z: COURT.z }); const ring = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.03, 8, 20), soft('#e2453c')); ring.rotation.x = Math.PI / 2; ring.position.set(px - s * 0.3, 2.8, COURT.z); scene.add(ring); }
  for (const [x, z] of [[COURT.x - 5.6, COURT.z - 3.4], [COURT.x + 5.6, COURT.z - 3.4]]) { lamp({ x, z }); }
  // mansion behind a tall wall + gate + three cars
  const M = new THREE.Group(); M.position.set(MANSION.x, 0, MANSION.z); scene.add(M);
  rb(13, 8, 8, '#f4efe2', { y: 4, parent: M, r: 0.1 }); rb(13.6, 0.4, 8.6, '#d9b440', { y: 8.1, parent: M, r: 0.08 });
  for (let i = 0; i < 6; i++) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 4, 14), soft('#ffffff')); c.position.set(-5 + i * 2, 2, 4.4); c.castShadow = true; M.add(c); }
  rb(4.6, 0.25, 1.6, '#f4efe2', { y: 4.2, z: 4.6, parent: M }); for (let i = 0; i < 9; i++) { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8), soft('#ffffff')); b.position.set(-2.1 + i * 0.52, 4.7, 5.35); M.add(b); } rb(4.6, 0.1, 0.12, '#ffffff', { y: 5.1, z: 5.35, parent: M });
  for (let k2 = 0; k2 < 5; k2++) for (const y of [2.2, 6.0]) rb(1.2, 1.6, 0.1, '#5f8fc0', { x: -5 + k2 * 2.5, y, z: 4.03, parent: M, r: 0.04 });
  rb(2.0, 3.0, 0.15, '#8a5a34', { y: 1.5, z: 4.05, parent: M, r: 0.04 });
  for (const [x0, x1] of [[-38, GATE - 1.6], [GATE + 1.6, -15]]) rb(x1 - x0, 3.4, 0.5, '#e9e2d4', { x: (x0 + x1) / 2, y: 1.7, z: -11, r: 0.04 });
  for (const sx of [-15, -38]) rb(0.5, 3.4, 8, '#e9e2d4', { x: sx, y: 1.7, z: -15, r: 0.04 });
  for (const s of [-1, 1]) { const piv = new THREE.Group(); piv.position.set(GATE + s * 1.6, 0, -11); scene.add(piv); const leaf = new THREE.Group(); leaf.position.x = -s * 0.8; piv.add(leaf);
    for (let i = 0; i < 6; i++) { const b = new THREE.Mesh(new THREE.BoxGeometry(0.07, 3.0, 0.07), soft('#2a2a34')); b.position.set(-0.7 + i * 0.28, 1.5, 0); leaf.add(b); } rb(1.6, 0.1, 0.1, '#d9b440', { y: 2.9, parent: leaf }); rb(1.6, 0.1, 0.1, '#2a2a34', { y: 0.4, parent: leaf });
    H['gate' + (s < 0 ? 'L' : 'R')] = piv; }
  H.cars = [car(-33.5, -8.3, '#22222a', Math.PI / 2), car(-30.4, -8.3, '#e9e9ee', Math.PI / 2), car(-22.2, -8.3, '#c2453c', -Math.PI / 2)];
  // narrator's new red car on the street
  H.newCar = car(14, 1.4, '#e2453c', Math.PI / 2);
  // street feast table (boodle fight) in front of the gate
  const T = new THREE.Group(); T.position.set(-22, 0, 1.0); scene.add(T); H.feast = T;
  rb(9, 0.1, 1.4, '#c9a46a', { y: 0.78, parent: T, r: 0.03 }); for (const x of [-4, 0, 4]) for (const s of [-1, 1]) rb(0.1, 0.76, 0.1, '#8a5a34', { x, y: 0.38, z: s * 0.55, parent: T, r: 0.02 });
  rb(8.6, 0.02, 1.0, '#3f9a4a', { y: 0.84, parent: T, r: 0.01 }); for (let i = 0; i < 14; i++) { const r = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), soft(['#f4f1ea', '#c2453c', '#e9a040'][i % 3])); r.scale.y = 0.5; r.position.set(-4 + i * 0.6, 0.88, (i % 2) * 0.3 - 0.15); T.add(r); }
  // lola's bench
  rb(1.8, 0.1, 0.5, '#8a5a34', { x: BENCH[0], y: 0.5, z: BENCH[2], r: 0.03 }); for (const s of [-1, 1]) rb(0.1, 0.5, 0.45, '#6a4428', { x: BENCH[0] + s * 0.8, y: 0.25, z: BENCH[2], r: 0.02 });
  // TV room (night) with ten TVs showing sad faces
  room({ x: TVX, w: 9, d: 7, h: 4, wall: '#3a3a5a', floor: '#6a4a3a' }); rb(2.4, 0.5, 0.9, '#8a3a4a', { x: TVX, y: 0.25, z: 1.2 }); rb(2.4, 0.7, 0.25, '#8a3a4a', { x: TVX, y: 0.6, z: 1.6 });
  const sadT = faceCanvas('sad'); H.tvs = [];
  for (let i = 0; i < 10; i++) { const col = i % 5, row = Math.floor(i / 5), x = TVX - 3.2 + col * 1.6, y = 0.8 + row * 1.25; rb(1.3, 1.0, 0.4, '#22222a', { x, y, z: -3.0 }); const sc = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.8), new THREE.MeshBasicMaterial({ map: sadT })); sc.position.set(x, y, -2.79); scene.add(sc); H.tvs.push(sc); }
  rb(9, 0.06, 1, '#5a4a3a', { x: TVX, y: 0.29, z: -3.0 }).scale.y = 1;
  // Don's huge empty hall
  room({ x: HALL, w: 18, d: 14, h: 7, wall: '#efe6d4', floor: '#d8d2c6' }); for (let i = 0; i < 4; i++) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 7, 14), soft('#ffffff')); c.position.set(HALL - 6 + i * 4, 3.5, -6.2); scene.add(c); }
  const ch = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 12), new THREE.MeshBasicMaterial({ color: '#fff3c8' })); ch.position.set(HALL, 5.8, -1); scene.add(ch); rb(4, 0.1, 2.2, '#8a2a3a', { x: HALL, y: 0.07, z: 0.2, r: 0.02, cast: false });
  // rigs
  for (const k2 in SPEC) R[k2] = makeBlocky(SPEC[k2]);
  R.crowd = ['n1', 'n2', 'n3', 'n4', 'n5'];
  H.dog = dog();
  H.case = rb(0.55, 0.4, 0.14, '#3a2a1a', { r: 0.04 }); hold(R.don, H.case); H.case.position.set(0, -0.22, 0);
  return { H, R };
};

// ---------------- per frame ----------------
const P = (rig, f, o) => pose(rig, f, o);
export const frameAt = (f, H, R) => {
  const S = shotAt(f), A = [], add = (x) => { if (Array.isArray(x)) x.forEach((y) => y && A.push(y)); else if (x) A.push(x); };
  for (const key in R) if (R[key].root) R[key].root.visible = false;
  H.dog.g.visible = false; H.case.visible = false;
  const gateOpen = f >= 2178 && f < 9000 ? easeOut(win(f, 2182, 2215)) : 0;
  H.gateL.rotation.y = -1.6 * gateOpen; H.gateR.rotation.y = 1.6 * gateOpen;
  H.feast.visible = f >= 2169 && f < 9000; H.newCar.visible = f >= 1140 && f < 9000;
  const crowdLaugh = (list, f0, spacing = 8) => list.forEach(([key, pos, yaw], i) => P(R[key], f, { pos, yaw, pose: f > f0 + i * spacing ? (i % 2 ? 'cheer' : 'idle') : 'idle', expr: f > f0 + i * spacing ? 'laugh' : 'smile', lean: f > f0 + i * spacing ? -8 : 0 }));
  const dogAt = (pos, yaw, laugh) => { H.dog.g.visible = true; H.dog.g.position.set(...pos); H.dog.g.rotation.y = yaw; H.dog.tail.rotation.y = 0.6 * Math.sin(f * 0.8); H.dog.mouth.scale.y = laugh ? 2.5 + Math.sin(f * 0.9) : 1; H.dog.g.position.y = laugh ? 0.12 * Math.abs(Math.sin(f * 0.4)) : 0; H.dog.head.rotation.x = laugh ? -0.3 : 0; };
  switch (S.id) {
    case 'open': {
      crowdLaugh([['n1', [-1.6, 0, -2.4], 15], ['n2', [-0.4, 0, -1.2], 0], ['n3', [3.6, 0, -2.8], -15], ['n4', [4.6, 0, -1.4], -10], ['n5', [-3, 0, 2.2], 20]], 0, 0);
      P(R.berto, f, { pos: CART, yaw: 10, pose: 'cheer', expr: 'laugh' });
      P(R.ako, f, { pos: [1.2, 0, -1.4], pose: f > 70 ? 'wave' : 'idle', expr: 'grin' });
      add(pill('pm', f, 86, 118, [1.2, 2.55, -1.4], 'MASAYA!', 'green'));
      break; }
    case 'rich': {
      P(R.don, f, { pos: [BALC[0], BALC[1] - 0.05, BALC[2] - 0.3], pose: 'facepalm', expr: 'cry' });
      add(pill('pr', f, 165, 206, [BALC[0], BALC[1] + 2.45, BALC[2]], 'MALUNGKOT', 'blue'));
      break; }
    case 'berto': {
      P(R.berto, f, { pos: CART, yaw: 10, pose: f > 295 ? 'cheer' : 'idle', expr: f > 290 ? 'laugh' : 'grin', lean: f > 295 ? -10 * Math.abs(Math.sin(f * 0.3)) : 0 });
      add(pill('p20', f, 240, 339, [CART[0], 2.55, CART[2]], '₱20 LANG!', 'yellow'));
      add(burst('hb', f, 296, [CART[0] + 0.5, 2.0, CART[2] + 0.3], 0.6)); add(shout('ha', f, 300, 339, [CART[0] - 0.7, 2.1, CART[2] + 0.2], 'HAHAHA!', '#ffe066', 0.38));
      break; }
    case 'don': {
      P(R.don, f, { pos: [-27, 0, -7], pose: f > 436 ? 'facepalm' : 'idle', expr: f > 436 ? 'cry' : 'sad' });
      add(pill('p3k', f, 395, 478, [-27, 2.6, -7], '3 KOTSE', 'yellow')); add(pill('pmn', f, 375, 478, [-27, 9.0, -13], 'MANSYON', 'white', 0.6));
      break; }
    case 'ako': {
      const laugh = f >= 572;
      P(R.ako, f, { pos: [8, 0, -5.2], pose: laugh ? 'cheer' : f > 500 ? 'shrug' : 'idle', expr: laugh ? 'laugh' : f > 500 ? 'smile' : 'smug' });
      add(pill('pa', f, 480, 520, [8, 2.55, -5.2], 'AKO', 'white')); add(pill('p0', f, 504, 572, [8, 2.55, -5.2], '₱0', 'red'));
      add(pill('pn', f, 574, 616, [8, 2.55, -5.2], 'NAKAKAHAWA!', 'green')); add(burst('lb', f, 574, [8.4, 2.0, -4.8], 0.6));
      break; }
    case 'kalye': {
      P(R.ako, f, { pos: [6, 0, -4.6], pose: 'cheer', expr: 'laugh' });
      crowdLaugh([['n1', [4.2, 0, -4.0], 15], ['n3', [7.8, 0, -4.2], -15], ['n2', [3.0, 0, -2.6], 10], ['n4', [9.0, 0, -2.6], -12], ['n5', [5.2, 0, -1.6], 0]], 650, 9);
      P(R.berto, f, { pos: CART, yaw: 25, pose: f > 690 ? 'cheer' : 'idle', expr: f > 690 ? 'laugh' : 'smile' });
      dogAt([4.2, 0, -2.4], 0.3, f > 712);
      add(pill('pd', f, 714, 749, [4.2, 1.5, -2.4], 'PATI ANG ASO!', 'yellow', 0.3));
      add(shout('hah', f, 660, 712, [6, 2.9, -4.2], 'HAHAHA!', '#ffe066', 0.5));
      break; }
    case 'lola': {
      P(R.lola, f, { pos: [BENCH[0] + 0.4, 0, BENCH[2]], pose: f > 788 && f < 860 ? 'point' : 'sit', yaw: -15, expr: 'smile' });
      P(R.ako, f, { pos: [BENCH[0] - 0.55, 0, BENCH[2] + 0.1], pose: 'sit', yaw: 15, expr: f > 860 ? 'happy' : 'smile', look: [-20, 0] });
      add(pill('pl', f, 755, 892, [BENCH[0] + 0.4, 2.0, BENCH[2]], 'LOLA', 'white', 0.26));
      add(pill('ph', f, 862, 892, [BENCH[0], 2.55, BENCH[2]], 'HINAHAWA ANG TAWA', 'green', 0.3));
      break; }
    case 'knock': {
      const walk = win(f, 893, 925), dx = lerp(12.5, 9.4, ss(walk));
      P(R.don, f, { pos: [dx, 0, -6.2], yaw: -60, pose: walk < 1 ? 'walk' : f > 940 ? 'point' : 'idle', t: f / 26, expr: f > 940 ? 'smug' : 'neutral' }); H.case.visible = true;
      P(R.ako, f, { pos: [7.6, 0, -6.4], yaw: 50, pose: 'idle', expr: f > 975 ? 'shock' : 'neutral' });
      add(shout('tok', f, 908, 932, [8.0, 2.4, -6.0], 'TOK TOK!', '#ffffff', 0.4));
      add(pill('pmil', f, 978, 1000, [9.0, 2.55, -6.2], '₱1,000,000', 'yellow', 0.34));
      break; }
    case 'sign': {
      P(R[f < 1032 ? 'ako' : 'akoRich'], f, { pos: [8, 0, -5.4], pose: f < 1032 ? 'hold' : 'cheer', expr: f < 1032 ? 'neutral' : 'grin' });
      add(fx('contract', [8.05, 1.05, -4.9], 0.55, 'ct' + (f > 1015 ? 's' : ''), (g) => { const s = g.canvas.width; g.fillStyle = '#f4ecd2'; g.fillRect(s * 0.15, s * 0.05, s * 0.7, s * 0.9); g.fillStyle = '#241a16'; g.font = `900 ${s * 0.08}px ${FONT}`; g.textAlign = 'center'; g.fillText('KONTRATA', s / 2, s * 0.2); g.font = `900 ${s * 0.06}px ${FONT}`; g.fillText('TAWA = ₱1M', s / 2, s * 0.38); g.strokeStyle = '#241a16'; g.lineWidth = 4; g.beginPath(); g.moveTo(s * 0.25, s * 0.75); g.lineTo(s * 0.75, s * 0.75); g.stroke(); if (f > 1015) { g.strokeStyle = '#2b4c9a'; g.lineWidth = 7; g.beginPath(); g.moveTo(s * 0.3, s * 0.72); g.bezierCurveTo(s * 0.4, s * 0.6, s * 0.5, s * 0.8, s * 0.7, s * 0.68); g.stroke(); } }, { order: 6 }));
      add(puff('swap', f, 1030, [8, 1.3, -5.0], 1.4, 14)); add(moneyRain('mr', f, 1034, 1063, [8, 1.9, -4.6], 3.2));
      add(pill('pyam', f, 1036, 1063, [8, 2.6, -5.4], 'MAYAMAN NA!', 'yellow'));
      break; }
    case 'nolaugh': {
      P(R.akoRich, f, { pos: [8, 0, -5.4], pose: 'idle', expr: f < 1090 ? 'neutral' : 'sad', look: [0, 10 * Math.sin(f * 0.1)] });
      add(pill('pwt', f, 1080, 1139, [8, 2.55, -5.4], 'WALA NANG TAWA', 'red', 0.3));
      break; }
    case 'car': {
      P(R.akoRich, f, { pos: [14, 0.35, 1.9], yaw: 90, pose: 'sit', expr: 'sad' });
      add(pill('pk', f, 1146, 1239, [14, 2.7, 1.4], 'BAGONG KOTSE', 'yellow'));
      break; }
    case 'tvs': {
      P(R.akoRich, f, { pos: [TVX, 0.1, 1.3], yaw: 145, pose: 'sit', expr: 'sad' });
      add(pill('ptv', f, 1244, 1332, [TVX, 3.3, -2.6], '10 TV', 'yellow')); add(shout('x10', f, 1290, 1332, [TVX, 2.6, -1.0], '×10 LUNGKOT', '#9fd4ff', 0.4));
      break; }
    case 'hall': {
      const sad = f >= 1488;
      P(R.don, f, { pos: [HALL, 0, -0.6], pose: sad ? 'idle' : 'cheer', expr: sad ? 'sad' : 'laugh', lean: sad ? 10 : -8 });
      if (!sad) add(shout('hd', f, 1395, 1475, [HALL, 2.9, -0.4], 'HAHAHA… haha… ha', '#ffe066', 0.32));
      add(pill('pmi', f, 1440, 1531, [HALL, 2.6, -0.6], 'MAG-ISA', 'blue'));
      break; }
    case 'balcony': {
      P(R.akoRich, f, { pos: [BALC[0], BALC[1], BALC[2]], pose: 'idle', expr: 'sad', yaw: f > 1680 ? 35 : 0, lean: 8 });
      crowdLaugh([['n1', [COURT.x - 2, 0, COURT.z], 160], ['n2', [COURT.x - 0.5, 0, COURT.z + 1], 200], ['n3', [COURT.x + 1.2, 0, COURT.z - 0.5], 210], ['n4', [COURT.x + 2.5, 0, COURT.z + 0.8], 180], ['n5', [COURT.x, 0, COURT.z - 1.8], 190]], 1680, 6);
      P(R.berto, f, { pos: [COURT.x - 3.4, 0, COURT.z + 1.6], yaw: 150, pose: 'cheer', expr: 'laugh' });
      if (f > 1690) add(shout('hc', f, 1700, 1771, [COURT.x, 3.2, COURT.z], 'HAHAHA!', '#ffe066', 1.4));
      break; }
    case 'smile': {
      const k2 = f >= 1843 ? 'laugh' : f >= 1800 ? 'happy' : 'sad';
      P(R.akoRich, f, { pos: [BALC[0], BALC[1], BALC[2]], pose: f >= 1843 ? 'cheer' : 'idle', expr: k2 });
      add(burst('sb', f, 1843, [BALC[0] + 0.5, BALC[1] + 2.0, BALC[2] + 0.4], 0.7)); add(pill('pha', f, 1880, 1946, [BALC[0], BALC[1] + 2.55, BALC[2]], 'HINAHAWA!', 'green'));
      break; }
    case 'wall': {
      if (f < 2065) { P(R.akoRich, f, { pos: [BALC[0], BALC[1], BALC[2]], pose: 'think', expr: 'smile' }); add(pill('ppd', f, 2116, 2168, [-27, 3.9, -10.6], 'MATAAS NA PADER', 'red')); }
      else { P(R.don, f, { pos: [HALL, 0, -0.6], pose: f > 2090 ? 'cheer' : 'idle', expr: 'laugh' }); add(pill('pmi2', f, 2070, 2168, [HALL, 2.7, -0.6], 'MAG-ISANG TUMATAWA', 'blue', 0.34)); }
      break; }
    case 'gate': {
      P(R.akoRich, f, { pos: [GATE - 0.4, 0, -10.2], pose: f < 2215 ? 'point' : 'wave', expr: 'grin' });
      P(R.don, f, { pos: [lerp(-27.6, -23.2, ss(win(f, 2222, 2290))), 0, lerp(-13, 0.2, ss(win(f, 2222, 2290)))], yaw: 30, pose: f > 2222 && f < 2290 ? 'walk' : 'idle', t: f / 26, expr: 'happy' });
      ['n1', 'n3', 'n5'].forEach((key, i) => P(R[key], f, { pos: [-24 + i * 1.2, 0, 1.8], yaw: 180, pose: 'cheer', expr: 'laugh' }));
      add(burst('gb', f, 2212, [GATE, 2.4, -10.6], 1.2)); add(pill('pgo', f, 2185, 2307, [GATE, 3.8, -10.6], 'BUKAS NA ANG GATE!', 'green'));
      break; }
    case 'feast': {
      const seats = [['akoRich', -25.5], ['don', -23.8], ['berto', -22.2], ['lola', -20.6], ['n1', -19.0]];
      seats.forEach(([key, x], i) => P(R[key], f, { pos: [x, 0, 0.0], yaw: 0, pose: Math.sin(f * 0.2 + i) > 0.3 ? 'cheer' : 'idle', expr: 'laugh' }));
      ['n2', 'n3', 'n4', 'n5'].forEach((key, i) => P(R[key], f, { pos: [-25.6 + i * 2.0, 0, -1.4], yaw: 0, pose: Math.sin(f * 0.25 + i) > 0.4 ? 'cheer' : 'idle', expr: 'laugh' }));
      dogAt([-18, 0, 2.3], -0.6, true);
      add(confetti('cf', f, 2320, 2494, [-22, 3, 1.5], 7)); add(pill('plb', f, 2402, 2494, [-22.2, 2.7, 0.0], 'LIBRE ANG TAWA!', 'green', 0.4));
      break; }
    case 'closer': {
      P(R.akoRich, f, { pos: [-21.8, 0, 2.2], yaw: 0, pose: f > 2505 ? 'point' : 'wave', expr: 'grin' });
      P(R.don, f, { pos: [-23.2, 0, 1.2], pose: 'cheer', expr: 'laugh' }); P(R.lola, f, { pos: [-20.4, 0, 1.2], pose: 'wave', expr: 'happy' });
      add(pill('pclose', f, 2497, TOTAL, [-21.8, 2.6, 2.4], "ANONG MERON SA LUGAR N'YO?", 'white', 0.3));
      break; }
    case 'thumb': {
      P(R.akoRich, 9000, { pos: [8, 0, -5.2], pose: 'cheer', expr: 'laugh', blink: false });
      add(moneyRain('mr', 9000, 8980, 9010, [8, 2.0, -4.6], 3));
      break; }
  }
  return A;
};

export const lookAt = (f) => {
  let flash = 0;
  for (const [a, b] of FLASHES) if (f >= a && f <= b) { const m = (a + b) / 2; flash = Math.max(flash, 1 - Math.abs(f - m) / ((b - a) / 2 + 0.5)); }
  return { flash: clamp(flash) * 0.95 };
};
