// LUGAR: "Inaamoy Lang" — Dito sa lugar namin, ang alak hindi iniinom… inaamoy lang. Twist: the caps came from vinegar bottles.
// Cast: Dams (narrator), Mang Jhano, Caputo (new), Kuya Steban, Mang Torres, Aling Ninya, Don Francis, Nanay Kimberly, Wangbu, Biboy, Jenny.
// Frames come from the Scribe word timestamps of take 1 (TOTAL 2389).
import { THREE, scene, ss, easeOut, back, win, clamp, lerp } from './engine.js';
import { makeBlocky, pose, hold, soft } from './blocky.js';
import { ground, road, street, house, store, tree, lamp, table, rb, sign } from './props.js';
import { pill, shout, burst, puff, dizzy, confetti, glowCard, fx } from './cast.js';
import { CAST } from './castSpecs.js';

export const TOTAL = 2389;
export const FLASHES = [[1449, 1457], [2181, 2189]];
export const MUSIC_STOP = 1921;
const TB = [0, 0, -4.2], STALL = [-7, 0, -4.6], STORE = { x: 11, z: -6.2 }, POST = [5.2, 0, -3.4], HOME = [-13, 0, -4.4], BACK = 80;
const SEAT = { jhano: [-1.1, 0, -4.3], caputo: [1.1, 0, -4.3], dams: [0, 0, -5.1], torres: [-0.6, 0, -5.4], ninya: [0.7, 0, -5.5], don: [1.8, 0, -5.2], steban: [-1.8, 0, -5.2] };

// ---------------- shots ----------------
const k = (f, pos, look, fov = 40, o = {}) => ({ f, pos, look, fov, ...o });
const LD = (pt, c = 4) => () => ({ c, pt });
export const SHOTS = [
  { id: 'open', a: 0, b: 141, light: 'lugar', at: [0, 1, -3], span: 16, cam: [k(0, [5.5, 3.2, 7.0], [0, 1.2, -4.5], 48), k(141, [1.0, 1.75, -0.6], [0, 1.6, -5.0], 42)], dof: LD([0, 1.6, -5.1], 2) },
  { id: 'bawal', a: 142, b: 282, light: 'lugar', at: [0, 1, -4], span: 12, cam: [k(142, [-1.4, 2.0, -0.6], [-2.6, 2.1, -5.2], 44), k(220, [-1.3, 2.0, -0.4], [-2.4, 1.9, -5.2], 44), k(228, [0.4, 2.6, 0.8], [0, 1.3, -4.6], 46, { ease: ss }), k(282, [0.3, 2.5, 0.2], [0, 1.3, -4.6], 44)], dof: LD([0, 1.4, -4.6], 2) },
  { id: 'jhano', a: 283, b: 383, light: 'lugar', at: [-1, 1, -4], span: 10, cam: [k(283, [0.0, 1.85, -0.2], [-1.1, 1.6, -4.3], 40), k(383, [-0.2, 1.8, -0.6], [-1.1, 1.6, -4.3], 40)], kicks: [[353, 0.03]], dof: LD([-1.1, 1.7, -4.3]) },
  { id: 'caputo', a: 384, b: 475, light: 'lugar', at: [1, 1, -4], span: 10, cam: [k(384, [2.0, 1.85, -0.2], [1.1, 1.5, -4.3], 40), k(443, [2.0, 1.8, -0.4], [1.1, 1.3, -4.3], 42), k(475, [2.4, 2.2, -0.6], [1.4, 0.6, -4.0], 44)], kicks: [[447, 0.04]], dof: LD([1.1, 1.2, -4.3]) },
  { id: 'dams', a: 476, b: 593, light: 'lugar', at: [0, 1, -5], span: 10, cam: [k(476, [0.3, 1.85, -1.2], [0, 1.65, -5.1], 40), k(593, [0.25, 1.82, -1.5], [0, 1.65, -5.1], 40)], kicks: [[577, 0.05]], dof: LD([0, 1.7, -5.1]) },
  { id: 'takip', a: 594, b: 710, light: 'lugar', at: [0, 1, -4], span: 10, cam: [k(594, [2.6, 2.6, -0.4], [0, 1.2, -4.6], 46), k(710, [1.8, 2.3, -1.0], [0, 1.3, -4.6], 44)], dof: LD([0, 1.3, -4.6], 2) },
  { id: 'steban', a: 711, b: 816, light: 'lugar', at: [-7, 1, -5], span: 10, cam: [k(711, [-6.4, 1.9, -0.2], [-7, 1.4, -4.6], 44), k(816, [-6.5, 1.85, -0.6], [-7, 1.45, -4.6], 42)], dof: LD([-7, 1.5, -5.0]) },
  { id: 'torres', a: 817, b: 936, light: 'lugar', at: [2, 1, 0], span: 12, cam: [k(817, [2.4, 1.9, 4.6], [2.0, 1.3, 0.2], 44), k(936, [2.2, 1.8, 3.8], [2.0, 1.3, 0.2], 42)], dof: LD([2, 1.3, 0.2], 2) },
  { id: 'ninya', a: 937, b: 1042, light: 'lugar', at: [5, 1, -3], span: 10, cam: [k(937, [4.4, 1.9, 0.6], [4.8, 1.9, -3.3], 42), k(1042, [4.45, 1.9, 0.2], [4.8, 2.0, -3.3], 42)], dof: LD([4.6, 1.7, -3.2], 3) },
  { id: 'don', a: 1043, b: 1156, light: 'lugar', at: [2, 1, -5], span: 10, cam: [k(1043, [2.4, 1.85, -1.2], [1.8, 1.6, -5.2], 40), k(1120, [2.5, 1.8, -1.5], [1.8, 1.5, -5.2], 40), k(1156, [2.9, 2.3, -1.4], [1.8, 0.6, -5.0], 44)], kicks: [[1128, 0.05]], dof: LD([1.8, 1.4, -5.2]) },
  { id: 'ako2', a: 1157, b: 1313, light: 'lugar', at: [0, 1, -5], span: 10, cam: [k(1157, [0.4, 1.85, -1.4], [0, 1.65, -5.1], 40), k(1313, [0.3, 1.82, -1.2], [0, 1.65, -5.1], 40)], kicks: [[1222, 0.05]], dof: LD([0, 1.7, -5.1]) },
  { id: 'nanay', a: 1314, b: 1449, light: 'lugarDusk', at: [-13, 1, -4], span: 10, cam: [k(1314, [-12.2, 1.7, 0.4], [-13, 1.3, -4.4], 42), k(1449, [-12.4, 1.7, -0.2], [-13, 1.35, -4.4], 40)], dof: LD([-13, 1.4, -4.4]) },
  { id: 'wangbu', a: 1450, b: 1605, light: 'lugarNight', at: [3, 1, -2], span: 12, cam: [k(1450, [3.4, 1.4, 2.6], [2.2, 0.6, -2.2], 42), k(1560, [3.2, 1.3, 2.2], [2.2, 0.6, -2.2], 40), k(1605, [5.6, 1.6, 3.0], [6.8, 0.6, -2.4], 46, { ease: ss })], kicks: [[1550, 0.04]], dof: LD([2.4, 0.6, -2.2], 3) },
  { id: 'kids', a: 1606, b: 1725, light: 'lugarNight', at: [8, 1, -3], span: 14, cam: [k(1606, [3.0, 1.6, 2.6], [4.6, 1.0, -2.6], 46), k(1680, [7.0, 1.8, 2.6], [8.6, 1.2, -3.0], 46), k(1725, [10.4, 2.2, 1.8], [11, 1.8, -5.6], 44)], dof: () => ({ c: 0 }) },
  { id: 'back', a: 1726, b: 1855, light: 'lugarNight', at: [BACK, 1, -2], span: 10, cam: [k(1726, [BACK + 0.2, 1.5, 3.6], [BACK, 1.0, -1.8], 46), k(1806, [BACK + 0.15, 1.45, 2.9], [BACK, 1.0, -1.9], 44), k(1855, [BACK + 0.1, 1.4, 2.5], [BACK, 1.0, -2.0], 44)], kicks: [[1808, 0.04]], dof: LD([BACK, 0.9, -1.6], 2) },
  { id: 'suka', a: 1856, b: 1981, light: 'lugarNight', at: [BACK, 1, -3], span: 10, cam: [k(1856, [BACK + 2.2, 1.3, 0.6], [BACK + 1.8, 0.9, -2.6], 42), k(1920, [BACK + 2.1, 1.2, -0.4], [BACK + 1.8, 0.8, -2.6], 40), k(1981, [BACK + 2.05, 1.15, -0.8], [BACK + 1.8, 0.8, -2.6], 38)], kicks: [[1922, 0.06]], dof: LD([BACK + 1.8, 0.8, -2.6], 3) },
  { id: 'barangay', a: 1982, b: 2068, light: 'lugarNight', at: [0, 1, -4], span: 14, cam: [k(1982, [0.5, 3.0, 2.4], [0, 1.2, -4.6], 48), k(2068, [0.4, 2.7, 1.6], [0, 1.3, -4.6], 46)], dof: LD([0, 1.3, -4.6], 2) },
  { id: 'dams3', a: 2069, b: 2184, light: 'lugarNight', at: [0, 1, -5], span: 10, cam: [k(2069, [0.3, 1.85, -1.2], [0, 1.65, -5.1], 40), k(2184, [0.25, 1.82, -1.5], [0, 1.65, -5.1], 40)], dof: LD([0, 1.7, -5.1]) },
  { id: 'rule', a: 2185, b: 2302, light: 'lugar', at: [0, 1, -4], span: 12, cam: [k(2185, [-1.0, 2.2, 0.6], [-2.15, 1.9, -5.0], 44), k(2302, [-1.1, 2.15, 0.1], [-2.15, 1.9, -5.0], 42)], dof: LD([-1.0, 1.6, -4.8], 2) },
  { id: 'closer', a: 2303, b: TOTAL - 1, light: 'lugar', at: [0, 1, -3], span: 10, cam: [k(2303, [0.2, 1.85, 0.3], [0, 1.65, -3.6], 40), k(TOTAL, [0.2, 1.85, -0.1], [0, 1.68, -3.6], 40)], dof: LD([0, 1.7, -3.6], 5) },
  { id: 'thumb', a: 9000, b: 9000, light: 'lugar', at: [0, 1, -5], span: 10, cam: [k(9000, [0.25, 1.85, -1.5], [0.05, 1.7, -5.1], 40)], dof: LD([0, 1.7, -5.1]) },
];
export const shotAt = (f) => SHOTS.find((s) => f >= s.a && f < s.b + 1) || SHOTS[SHOTS.length - 1];

// ---------------- props ----------------
const bottle = (parent) => { const g = new THREE.Group(); (parent || scene).add(g);
  const b = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.065, 0.24, 14), soft('#6a3a12')); b.position.y = 0.12; g.add(b);
  const n = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.05, 0.12, 12), soft('#6a3a12')); n.position.y = 0.3; g.add(n);
  rb(0.11, 0.08, 0.02, '#f4e6c0', { y: 0.13, z: 0.062, parent: g, r: 0.01 });
  const c = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.02, 12), soft('#d9b440')); c.position.y = 0.37; g.add(c); g.traverse((m) => { if (m.isMesh) m.castShadow = true; }); return g; };
const takip = (col = '#c9ccd0', s = 1) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(0.05 * s, 0.055 * s, 0.02 * s, 14), soft(col)); m.castShadow = true; return m; };
const vinegar = (parent, x, y, z) => { const g = new THREE.Group(); g.position.set(x, y, z); parent.add(g);
  const b = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.3, 14), new THREE.MeshStandardMaterial({ color: '#e8eef0', roughness: 0.2, transparent: true, opacity: 0.85 })); b.position.y = 0.15; g.add(b);
  const n = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.06, 0.1, 12), b.material); n.position.y = 0.35; g.add(n);
  sign('SUKA', 0.13, 0.08, { bg: '#e2453c', fg: '#ffffff', border: '#ffffff' }, { y: 0.15, z: 0.072, parent: g }); return g; };
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
  ground('#8fbf5a'); road({ alongX: true, len: 300 });
  street({ x0: -40, x1: 6, z: -9, seed: 3 }); street({ x0: 16, x1: 50, z: -9, seed: 5 }); street({ x0: -40, x1: 50, z: 9, face: -1, seed: 7 });
  for (const x of [-30, -20, 22, 34]) tree({ x, z: -5.6 }); for (const x of [-26, -6, 18, 30]) tree({ x, z: 5.6 });
  lamp({ x: POST[0], z: POST[2] }); lamp({ x: -16, z: 4.9 }); lamp({ x: 16, z: 4.9 });
  // inuman table at the kanto + bottles + a bowl of caps
  table({ x: TB[0], z: TB[2], w: 1.6, d: 1.0 }); H.bottles = []; for (const [x, z] of [[-0.4, -0.15], [0.05, 0.2], [0.45, -0.1]]) { const b = bottle(); b.position.set(TB[0] + x, 0.82, TB[2] + z); H.bottles.push(b); }
  rb(0.3, 0.06, 0.3, '#e9e2d4', { x: TB[0] - 0.05, y: 0.85, z: TB[2] - 0.2, r: 0.03 });
  for (let i = 0; i < 6; i++) { const t = takip(); t.position.set(TB[0] - 0.12 + (i % 3) * 0.07, 0.9, TB[2] - 0.25 + Math.floor(i / 3) * 0.09); scene.add(t); }
  // signs: BAWAL MALASING (day 1) and BAWAL SUMAWSAW (the new rule)
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.6, 8), soft('#4a4a52')); pole.position.set(-2.6, 1.3, -5.3); pole.castShadow = true; scene.add(pole);
  H.sign1 = sign('BAWAL MALASING', 1.5, 0.5, { bg: '#e2453c', fg: '#ffffff', border: '#ffffff' }, { x: -2.6, y: 2.35, z: -5.22 });
  H.sign2 = sign('BAWAL SUMAWSAW', 1.5, 0.5, { bg: '#2f6fd6', fg: '#ffffff', border: '#ffffff' }, { x: -2.6, y: 2.35, z: -5.21 });
  // Kuya Steban's takip stall
  table({ x: STALL[0], z: STALL[2] + 0.5, w: 1.4, d: 0.7, col: '#8a5a34' });
  rb(0.6, 0.12, 0.4, '#3f7ab5', { x: STALL[0], y: 0.88, z: STALL[2] + 0.5, r: 0.05 });
  for (let i = 0; i < 18; i++) { const t = takip(i % 4 ? '#c9ccd0' : '#d9b440'); t.position.set(STALL[0] - 0.22 + (i % 6) * 0.09, 0.96 + 0.015 * Math.floor(i / 6), STALL[2] + 0.38 + Math.floor(i / 6) * 0.1); t.rotation.z = (i % 3 - 1) * 0.3; scene.add(t); }
  sign('TAKIP ₱5', 1.2, 0.36, { bg: '#f7c51e', fg: '#1e1a24', border: '#1e1a24' }, { x: STALL[0], y: 1.35, z: STALL[2] + 0.86 });
  // Aling Ninya's store (the source of the caps)
  store({ x: STORE.x, z: STORE.z, name: 'TINDAHAN NI ALING NINYA', signBg: '#c2453c' });
  // Dams's home (dusk scene with Nanay Kimberly)
  rb(1.8, 0.1, 0.5, '#8a5a34', { x: HOME[0], y: 0.5, z: HOME[2], r: 0.03 }); for (const s of [-1, 1]) rb(0.1, 0.5, 0.45, '#6a4428', { x: HOME[0] + s * 0.8, y: 0.25, z: HOME[2], r: 0.02 });
  // behind the store (night): sack of caps + crates of vinegar bottles
  const B = new THREE.Group(); B.position.set(BACK, 0, 0); scene.add(B);
  rb(9, 3.0, 0.3, '#c9a46a', { y: 1.5, z: -4.4, parent: B }); rb(0.3, 3.0, 6, '#c9a46a', { x: -4.4, y: 1.5, z: -1.6, parent: B }); rb(0.3, 3.0, 6, '#c9a46a', { x: 4.4, y: 1.5, z: -1.6, parent: B });
  rb(9, 0.05, 7, '#7a6a5a', { y: 0.02, z: -1.2, parent: B, cast: false });
  const sack = new THREE.Mesh(new THREE.SphereGeometry(0.7, 18, 14), soft('#b0905a')); sack.scale.set(1, 0.9, 0.85); sack.position.set(0, 0.6, -2.7); sack.castShadow = true; B.add(sack);
  rb(0.5, 0.12, 0.35, '#8a6a3a', { y: 1.22, z: -2.7, parent: B, r: 0.05 });
  for (let i = 0; i < 40; i++) { const t = takip(i % 5 ? '#c9ccd0' : '#d9b440'); const a = i * 2.4, r = 0.2 + (i % 7) * 0.12; t.position.set(Math.cos(a) * r, 0.02 + (i % 3) * 0.015, -1.2 + Math.sin(a) * r * 0.6); t.rotation.z = (i % 3 - 1) * 0.4; B.add(t); }
  for (const [cx, cz] of [[1.8, -2.6], [2.6, -2.4], [1.9, -3.4]]) { const cr = new THREE.Group(); cr.position.set(cx, 0, cz); B.add(cr); rb(0.8, 0.35, 0.6, '#8a5a34', { y: 0.18, parent: cr, r: 0.03 });
    for (let i = 0; i < 6; i++) vinegar(cr, -0.27 + (i % 3) * 0.27, 0.36, -0.14 + Math.floor(i / 3) * 0.28); }
  sign('SUKA', 1.0, 0.36, { bg: '#e2453c', fg: '#ffffff', border: '#ffffff' }, { x: 2.2, y: 1.6, z: -4.24, parent: B });
  const bulb = new THREE.PointLight('#ffd890', 2.0, 9, 1.5); bulb.position.set(0.5, 2.6, -1.0); B.add(bulb);
  // rigs
  R.dams = makeBlocky(CAST.dams); R.jhano = makeBlocky(CAST.mangJhano); R.don = makeBlocky(CAST.donFrancis); R.nanay = makeBlocky(CAST.nanayKimberly);
  R.ninya = makeBlocky(CAST.alingNinya); R.biboy = makeBlocky(CAST.biboy); R.torres = makeBlocky(CAST.mangTorres); R.jenny = makeBlocky(CAST.jenny); R.steban = makeBlocky(CAST.kuyaSteban);
  R.caputo = makeBlocky({ name: 'Caputo', skin: '#c48a5e', shirt: '#7a8a9a', pants: '#3a3a44', hair: 'bald', moustache: '#2a201a', belly: 1.15, seed: 11 });
  H.dog = dog();
  // held props
  H.dBottle = bottle(); hold(R.jhano, H.dBottle); H.dBottle.position.set(0, -0.12, 0.06);
  H.cup = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.12, 14), new THREE.MeshStandardMaterial({ color: '#f2c86a', roughness: 0.3, transparent: true, opacity: 0.85 })); hold(R.caputo, H.cup); H.cup.position.set(0, -0.1, 0.05);
  H.damsCap = takip('#c9ccd0', 1.6); hold(R.dams, H.damsCap); H.damsCap.position.set(0, -0.06, 0.06); H.damsCap.rotation.x = Math.PI / 2;
  H.torresCap = takip('#c9ccd0', 1.6); hold(R.torres, H.torresCap); H.torresCap.position.set(0, -0.06, 0.06);
  H.ninyaCap = takip('#c9ccd0', 1.6); hold(R.ninya, H.ninyaCap); H.ninyaCap.position.set(0, -0.06, 0.06);
  H.goldCap = takip('#f2c440', 2.2); hold(R.don, H.goldCap); H.goldCap.position.set(0, -0.06, 0.08); H.goldCap.rotation.x = Math.PI / 2;
  H.stebanCap = takip('#c9ccd0', 1.6); hold(R.steban, H.stebanCap); H.stebanCap.position.set(0, -0.06, 0.06); H.stebanCap.rotation.x = Math.PI / 2;
  H.groundCap = takip('#c9ccd0', 1.4); scene.add(H.groundCap); H.groundCap.position.set(2.0, 0.02, -2.2);
  return { H, R };
};

// ---------------- per frame ----------------
const P = (rig, f, o) => pose(rig, f, o);
export const frameAt = (f, H, R) => {
  const S = shotAt(f), A = [], add = (x) => { if (Array.isArray(x)) x.forEach((y) => y && A.push(y)); else if (x) A.push(x); };
  for (const key in R) R[key].root.visible = false;
  H.dog.g.visible = false;
  H.sign1.visible = f < 2185 || f >= 9000 ? true : false; H.sign2.visible = !H.sign1.visible;
  H.groundCap.visible = S.id === 'wangbu';
  const dogAt = (pos, yaw, o = {}) => { H.dog.g.visible = true; H.dog.g.position.set(...pos); H.dog.g.rotation.y = yaw; H.dog.tail.rotation.y = 0.6 * Math.sin(f * 0.8);
    H.dog.head.rotation.x = o.sniff ? 0.5 : o.sneeze ? -0.5 : 0; H.dog.mouth.scale.y = o.sneeze ? 3 : 1; H.dog.legs.forEach((l, i) => { l.rotation.x = o.run ? 0.6 * Math.sin(f * 0.9 + i * Math.PI) : 0; }); };
  const sniffArm = { pose: 'point', armR: [-150, 0, -30] };
  const tipsy = (s) => ({ lean: 8 * Math.sin(f * 0.18 + s), look: [10 * Math.sin(f * 0.13 + s), 0] });
  const table = (o = {}) => {
    P(R.jhano, f, { pos: SEAT.jhano, yaw: 70, pose: 'idle', expr: o.jx || 'dizzy', ...tipsy(0) });
    P(R.caputo, f, { pos: [SEAT.caputo[0] + 0.3, 0, SEAT.caputo[2] + 0.4], yaw: -90, pose: 'fall', t: 1, expr: 'sleepy' });
    P(R.dams, f, { pos: SEAT.dams, pose: o.dp || 'idle', expr: o.dx || 'smile', ...(o.dams || {}) });
    if (o.all) { P(R.torres, f, { pos: SEAT.torres, yaw: 15, pose: 'idle', expr: o.ex || 'dizzy', ...tipsy(1) }); P(R.ninya, f, { pos: SEAT.ninya, yaw: -15, pose: 'idle', expr: o.ex || 'dizzy', ...tipsy(2) });
      P(R.steban, f, { pos: SEAT.steban, yaw: 30, pose: 'idle', expr: o.ex || 'smile' }); P(R.don, f, { pos: SEAT.don, yaw: -30, pose: 'idle', expr: o.ex || 'dizzy', ...tipsy(3) }); }
  };
  H.dBottle.visible = S.id === 'jhano'; H.cup.visible = S.id === 'caputo' && f < 443; H.damsCap.visible = ['dams', 'ako2', 'takip', 'thumb'].includes(S.id); H.torresCap.visible = S.id === 'torres'; H.ninyaCap.visible = S.id === 'ninya'; H.goldCap.visible = S.id === 'don' && f >= 1078 && f < 1126; H.stebanCap.visible = S.id === 'steban';
  switch (S.id) {
    case 'open': {
      table({ all: true, ex: 'smile', jx: 'smile', dp: f > 96 ? 'wave' : 'idle', dx: 'grin' });
      add(pill('po', f, 98, 141, [0, 2.6, -5.1], 'INAAMOY LANG!', 'yellow'));
      break; }
    case 'bawal': {
      const drunk = f >= 228;
      table({ all: true, ex: drunk ? 'dizzy' : 'smile', jx: drunk ? 'dizzy' : 'smile', dx: drunk ? 'dizzy' : 'worried', dams: drunk ? tipsy(4) : {} });
      add(pill('pb', f, 150, 227, [-2.6, 2.9, -5.2], 'BAWAL!', 'red'));
      if (drunk) { add(dizzy('dz1', f, 232, 282, [-1.1, 2.3, -4.3], 0.4)); add(dizzy('dz2', f, 238, 282, [0, 2.3, -5.1], 0.4)); add(dizzy('dz3', f, 244, 282, [1.8, 2.3, -5.2], 0.4)); }
      break; }
    case 'jhano': {
      const drunk = f >= 353;
      P(R.jhano, f, { pos: SEAT.jhano, yaw: 40, pose: f > 312 ? 'point' : 'idle', armR: f > 312 ? [-145, 0, -25] : undefined, expr: drunk ? 'dizzy' : f > 312 ? 'happy' : 'smile', ...(drunk ? tipsy(0) : {}) });
      add(pill('pj', f, 284, 352, [-1.1, 2.55, -4.3], 'MANG JHANO', 'white')); add(pill('pj2', f, 353, 383, [-1.1, 2.55, -4.3], '1 AMOY = LASING', 'yellow'));
      add(dizzy('dzj', f, 355, 383, [-1.1, 2.25, -4.2], 0.45));
      break; }
    case 'caputo': {
      const asleep = f >= 443, fall = win(f, 443, 458);
      P(R.caputo, f, { pos: SEAT.caputo, yaw: -40, pose: asleep ? 'fall' : f > 413 ? 'point' : 'idle', t: fall, armR: !asleep && f > 413 ? [-150, 0, -25] : undefined, expr: asleep ? 'sleepy' : 'smile' });
      add(pill('pc', f, 385, 442, [1.1, 2.55, -4.3], 'CAPUTO', 'white')); add(pill('pc2', f, 443, 475, [1.1, 2.2, -4.3], '1 BASO = TULOG', 'purple'));
      add(shout('zz', f, 455, 475, [1.6, 1.2, -3.9], 'Zzz', '#ffffff', 0.32));
      break; }
    case 'dams': case 'ako2': {
      const a2 = S.id === 'ako2', sniff = a2 ? f >= 1186 : f >= 509, sick = a2 ? f >= 1220 : f >= 576;
      P(R.dams, f, { pos: SEAT.dams, pose: sick ? 'facepalm' : sniff ? 'point' : 'idle', armR: sniff && !sick ? [-150, 0, -30] : undefined, expr: sick ? 'dizzy' : sniff ? 'worried' : 'smile', lean: sick ? 14 : 0 });
      H.damsCap.visible = sniff && !sick;
      if (!a2) { add(pill('pd', f, 477, 545, [0, 2.55, -5.1], 'DAMS', 'white')); add(pill('pd2', f, 546, 593, [0, 2.55, -5.1], 'TAGA-AMOY LANG', 'red')); }
      else add(pill('p3x', f, 1255, 1313, [0, 2.55, -5.1], '3x NGAYONG LINGGO', 'red'));
      const at = a2 ? 1220 : 576;
      add(burst('vb', f, at, [0.05, 1.5, -4.75], 0.7, '#9be07a')); add(shout('bl', f, at + 2, at + 34, [0.55, 2.15, -4.9], 'BLEHH!', '#9be07a', 0.36));
      break; }
    case 'takip': {
      table({ all: true, ex: 'happy', jx: 'happy', dp: 'point', dx: 'smile', dams: { armR: [-150, 0, -30] } });
      add(pill('pt', f, 658, 710, [0, 2.7, -5.1], 'PAAMUYAN NG TAKIP', 'yellow'));
      break; }
    case 'steban': {
      P(R.steban, f, { pos: STALL, pose: f > 778 ? 'point' : 'idle', armR: f > 778 ? [-110, 0, -10] : undefined, expr: f > 778 ? 'grin' : 'smile' });
      add(pill('ps', f, 712, 777, [-7, 2.55, -4.6], 'KUYA STEBAN', 'white')); add(pill('ps2', f, 778, 816, [-7, 2.55, -4.6], '₱5 ISA!', 'yellow'));
      break; }
    case 'torres': {
      const d = f >= 877;
      P(R.torres, f, { pos: [2.0, 0, 0.2], yaw: 5, pose: d ? 'dance' : 'point', armR: d ? undefined : [-150, 0, -30], expr: d ? 'laugh' : 'happy', t: f / 20 });
      add(pill('pt1', f, 818, 847, [2, 2.55, 0.2], 'MANG TORRES', 'white')); add(pill('pt2', f, 848, 936, [2, 2.55, 0.2], '3 TAKIP', 'yellow'));
      if (d) add(shout('dn', f, 880, 936, [3.1, 2.1, 0.3], '♪♪', '#ffe066', 0.3));
      break; }
    case 'ninya': {
      const sing = f >= 996;
      P(R.ninya, f, { pos: [POST[0] - 0.7, 0, POST[2] + 0.2], yaw: 30, pose: sing ? 'cheer' : 'point', armR: sing ? undefined : [-150, 0, -30], expr: sing ? 'love' : 'happy', ...(sing ? tipsy(2) : {}) });
      add(pill('pn', f, 938, 969, [POST[0] - 0.7, 2.55, POST[2] + 0.2], 'ALING NINYA', 'white')); add(pill('pn2', f, 970, 995, [POST[0] - 0.7, 2.55, POST[2] + 0.2], '1 TAKIP', 'yellow'));
      if (sing) { add(shout('sg', f, 998, 1042, [POST[0] - 0.7, 2.55, POST[2] + 0.3], '♪ LA LA LA ♪', '#ffe066', 0.3)); add(pill('pp', f, 1010, 1042, [POST[0], 3.7, POST[2]], 'POSTE', 'white', 0.24)); }
      break; }
    case 'don': {
      const faint = f >= 1126;
      P(R.don, f, { pos: SEAT.don, yaw: -10, pose: faint ? 'fall' : f >= 1078 ? 'point' : 'idle', t: win(f, 1126, 1140), armR: !faint && f >= 1078 ? [-140, 0, -25] : undefined, expr: faint ? 'dizzy' : f >= 1078 ? 'wow' : 'smug' });
      add(pill('pdf', f, 1044, 1077, [1.8, 2.6, -5.2], 'DON FRANCIS', 'white')); add(pill('pg', f, 1080, 1125, [1.8, 2.6, -5.2], 'GINTONG TAKIP', 'yellow'));
      if (faint) { add(dizzy('dzd', f, 1140, 1156, [1.8, 0.9, -4.7], 0.45)); add(burst('gb', f, 1080, [1.95, 1.7, -4.9], 0.5, '#ffe066')); }
      break; }
    case 'nanay': {
      P(R.nanay, f, { pos: [HOME[0] + 0.45, 0, HOME[2]], yaw: -15, pose: f >= 1385 ? 'point' : 'sit', expr: f >= 1385 ? 'smile' : 'neutral', armR: f >= 1385 ? [-80, -30, 10] : undefined });
      P(R.dams, f, { pos: [HOME[0] - 0.5, 0, HOME[2] + 0.1], yaw: 15, pose: 'sit', expr: f >= 1400 ? 'worried' : 'sad', look: [-20, 0] });
      add(pill('pnk', f, 1315, 1449, [HOME[0] + 0.45, 2.0, HOME[2]], 'NANAY KIMBERLY', 'white', 0.26));
      add(pill('pna', f, 1385, 1449, [HOME[0], 2.45, HOME[2]], 'HINDI ALAK ANG PROBLEMA', 'purple', 0.26));
      break; }
    case 'wangbu': {
      const run = f >= 1570, x = run ? lerp(2.0, 9, ss(win(f, 1570, 1605))) : 2.0;
      dogAt([x, 0, -2.0], run ? Math.PI / 2 : 0, { sniff: f >= 1507 && f < 1548, sneeze: f >= 1548 && f < 1570, run });
      add(pill('pw', f, 1481, 1546, [2.0, 1.55, -2.0], 'WANGBU', 'yellow', 0.26));
      add(puff('sn', f, 1548, [2.0, 0.85, -1.4], 0.7, 14)); add(shout('ac', f, 1548, 1572, [2.5, 1.5, -1.8], 'ACHOO!', '#ffffff', 0.32));
      break; }
    case 'kids': {
      const t = ss(win(f, 1606, 1700)), bx = lerp(3.2, 9.8, t), arrive = f >= 1700;
      dogAt([lerp(5.4, 11.3, t), 0, -3.9], arrive ? 0 : Math.PI / 2, { run: !arrive });
      P(R.biboy, f, { pos: [bx, 0, -2.4], yaw: arrive ? 160 : 90, pose: arrive ? 'idle' : 'run', t: f / 16, expr: 'wow' });
      P(R.jenny, f, { pos: [bx - 0.9, 0, -2.0], yaw: arrive ? 160 : 90, pose: arrive ? 'idle' : 'run', t: f / 16 + 0.3, expr: 'worried' });
      add(pill('pbb', f, 1622, 1690, [bx, 2.0, -2.4], 'BIBOY', 'white', 0.26)); add(pill('pjj', f, 1640, 1690, [bx - 0.9, 2.0, -2.0], 'JENNY', 'white', 0.26));
      break; }
    case 'back': {
      const see = f >= 1807;
      P(R.biboy, f, { pos: [BACK - 0.75, 0, -1.0], yaw: 25, pose: see ? 'cheer' : 'idle', expr: see ? 'shock' : 'worried' });
      P(R.jenny, f, { pos: [BACK + 0.75, 0, -1.05], yaw: -25, pose: see ? 'cheer' : 'idle', expr: see ? 'shock' : 'worried' });
      dogAt([BACK + 0.1, 0, -0.5], 0.4, { sniff: true });
      add(pill('psk', f, 1808, 1855, [BACK, 2.6, -2.7], 'ISANG SAKONG TAKIP!', 'yellow', 0.3));
      add(burst('skb', f, 1808, [BACK, 1.0, -1.8], 1.0));
      break; }
    case 'suka': {
      add(pill('pbeer', f, 1860, 1920, [BACK + 1.6, 1.55, -2.4], 'BEER?', 'white', 0.26));
      add(pill('psuka', f, 1922, 1981, [BACK + 1.8, 1.55, -2.4], 'SUKA!', 'red', 0.36));
      add(burst('sb', f, 1922, [BACK + 2.0, 0.9, -2.3], 0.9, '#ffffff'));
      break; }
    case 'barangay': {
      table({ all: true, ex: 'shock', jx: 'shock', dx: 'shock' });
      P(R.caputo, f, { pos: SEAT.caputo, yaw: -40, pose: 'idle', expr: 'shock' });
      add(pill('pnl', f, 2016, 2068, [0, 2.8, -5.1], 'NALALASING SA SUKA', 'red', 0.3));
      break; }
    case 'dams3': {
      const laugh = f >= 2124;
      P(R.dams, f, { pos: SEAT.dams, pose: laugh ? 'cheer' : 'facepalm', expr: laugh ? 'laugh' : 'shock', lean: laugh ? -8 * Math.abs(Math.sin(f * 0.3)) : 0 });
      add(pill('psp', f, 2124, 2184, [0, 2.6, -5.1], 'SUKA PALA!', 'yellow'));
      break; }
    case 'rule': {
      table({ all: true, ex: 'sad', jx: 'sad' });
      P(R.dams, f, { pos: [-1.7, 0, -4.4], yaw: 25, pose: 'point', armR: [-100, -40, 0], expr: 'worried' });
      P(R.caputo, f, { pos: SEAT.caputo, yaw: -40, pose: 'idle', expr: 'sad' });
      add(pill('pbs', f, 2250, 2302, [-2.6, 3.0, -5.2], 'BAGONG BATAS!', 'blue', 0.28));
      break; }
    case 'closer': {
      P(R.dams, f, { pos: [0, 0, -3.6], pose: f > 2318 ? 'wave' : 'point', armR: f > 2318 ? undefined : [-90, 0, 0], expr: 'grin' });
      dogAt([0.9, 0, -3.3], -0.3, {});
      add(shout('cl', f, 2306, TOTAL, [0, 2.65, -3.6], "ANONG MERON SA LUGAR N'YO?", '#ffffff', 0.42));
      break; }
    case 'thumb': {
      P(R.dams, 9000, { pos: SEAT.dams, pose: 'point', armR: [-150, 0, -30], expr: 'shock', blink: false });
      H.damsCap.visible = true;
      break; }
  }
  return A;
};

export const lookAt = (f) => {
  let flash = 0;
  for (const [a, b] of FLASHES) if (f >= a && f <= b) { const m = (a + b) / 2; flash = Math.max(flash, 1 - Math.abs(f - m) / ((b - a) / 2 + 0.5)); }
  return { flash: clamp(flash) * 0.95 };
};
