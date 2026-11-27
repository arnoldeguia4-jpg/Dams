// LUGAR: "Special Ability" — Dito sa lugar namin, lahat may special ability… except Dams. Twist: their abilities work because of him.
// Cast: Dams, Mang Jhano, Ninya, Justin (new), Jenny, Don Francis, Wangbu, Kimberly (dalaga), Roger (new, nunal), Mang Torres.
// Frames from silence-aligned phrases of the user's voiceover (TOTAL 3245).
import { THREE, scene, ss, easeOut, back, win, clamp, lerp } from './engine.js';
import { makeBlocky, pose, hold, soft } from './blocky.js';
import { ground, road, street, store, tree, lamp, table, rb, sign, phone } from './props.js';
import { pill, shout, burst, puff, dizzy, confetti, fx } from './cast.js';
import { CAST } from './castSpecs.js';

export const TOTAL = 3245;
export const FLASHES = [[1765, 1773], [2088, 2096], [2590, 2598], [2781, 2789], [2980, 2988]];
export const MUSIC_STOP = 2065;
const Z = -4.6;
const ST = { jhano: -14, ninya: -8, justin: -2, jenny: 4, don: 10, wangbu: 16, kim: 22, roger: 28, night: 44 };

// ---------------- shots ----------------
const k = (f, pos, look, fov = 40, o = {}) => ({ f, pos, look, fov, ...o });
const LD = (pt, c = 3) => () => ({ c, pt });
// medium close-up on a point (x, head height y), with a slow push-in
const mcu = (id, a, b, x, o = {}) => { const y = o.y ?? 1.6, z = o.z ?? Z, d0 = o.d ?? 4.4, d1 = d0 - (o.push ?? 0.35), dx = o.dx ?? 0.35, h = o.h ?? 0.2;
  return { id, a, b, light: o.light || 'lugar', at: [x, 1, z], span: o.span || 12, kicks: o.kicks,
    cam: [k(a, [x + dx, y + h, z + d0], [x + (o.lx || 0), y, z], o.fov || 40), k(b, [x + dx * 0.8, y + h, z + d1], [x + (o.lx || 0), y, z], o.fov || 40)], dof: LD([x, y, z]) }; };
export const SHOTS = [
  { id: 'open', a: 0, b: 117, light: 'lugar', at: [0, 1, -4], span: 30, cam: [k(0, [6, 4.5, 9], [0, 1.4, -4.6], 52), k(117, [0.6, 2.0, -0.2], [0, 1.6, Z], 42)], dof: () => ({ c: 0 }) },
  mcu('jhano', 118, 249, ST.jhano, { kicks: [[160, 0.03], [200, 0.03]] }),
  mcu('ninya', 250, 376, ST.ninya),
  { id: 'justin', a: 377, b: 543, light: 'lugar', at: [ST.justin, 1, Z], span: 14, cam: [k(377, [ST.justin + 0.2, 2.3, 2.6], [ST.justin, 1.3, Z - 0.4], 50), k(543, [ST.justin + 0.1, 2.2, 1.8], [ST.justin, 1.3, Z - 0.4], 50)], dof: LD([ST.justin, 1.3, Z], 2) },
  mcu('jenny', 544, 655, ST.jenny, { y: 1.25, d: 3.6, kicks: [[572, 0.03]] }),
  { id: 'don', a: 656, b: 784, light: 'lugar', at: [ST.don, 1, Z], span: 12, cam: [k(656, [ST.don + 1.2, 2.0, Z + 4.2], [ST.don, 1.3, Z], 40), k(784, [ST.don + 0.9, 1.95, Z + 3.7], [ST.don, 1.3, Z], 40)], dof: LD([ST.don, 1.2, Z]) },
  { id: 'wangbu', a: 785, b: 907, light: 'lugar', at: [ST.wangbu, 1, Z], span: 12, cam: [k(785, [ST.wangbu + 0.6, 1.7, Z + 4.6], [ST.wangbu + 0.55, 1.15, Z], 42), k(907, [ST.wangbu + 0.55, 1.6, Z + 4.0], [ST.wangbu + 0.55, 1.1, Z], 42)], dof: LD([ST.wangbu, 0.9, Z]) },
  mcu('kim', 908, 1039, ST.kim, { y: 1.2, d: 3.8, h: 0.5 }),
  { id: 'rogerIn', a: 1040, b: 1129, light: 'lugar', at: [ST.roger, 1, Z], span: 16, cam: [k(1040, [ST.roger - 1.0, 2.0, 2.2], [ST.roger - 1.5, 1.4, Z], 46), k(1129, [ST.roger - 0.2, 1.9, 0.6], [ST.roger, 1.5, Z], 42)], dof: LD([ST.roger, 1.5, Z], 2) },
  mcu('rogerFace', 1130, 1190, ST.roger, { d: 2.6, push: 0.4, y: 1.72, dx: 0.1, h: 0.05 }),
  { id: 'rogerKilig', a: 1191, b: 1323, light: 'lugar', at: [ST.roger + 1, 1, Z], span: 14, cam: [k(1191, [ST.roger + 1.2, 2.1, 2.2], [ST.roger + 1.2, 1.4, Z], 46), k(1323, [ST.roger + 1.15, 2.05, 1.6], [ST.roger + 1.2, 1.4, Z], 46)], kicks: [[1260, 0.03]], dof: LD([ST.roger + 1, 1.5, Z], 2) },
  mcu('dams', 1324, 1436, 0, { kicks: [[1384, 0.04]] }),
  { id: 'tryAngry', a: 1437, b: 1554, light: 'lugar', at: [ST.jhano, 1, Z], span: 12, cam: [k(1437, [ST.jhano + 0.6, 2.0, 0.6], [ST.jhano + 0.6, 1.5, Z], 44), k(1554, [ST.jhano + 0.6, 1.95, 0.0], [ST.jhano + 0.6, 1.5, Z], 42)], kicks: [[1518, 0.04]], dof: LD([ST.jhano + 0.6, 1.5, Z], 2) },
  { id: 'tryKilig', a: 1555, b: 1764, light: 'lugar', at: [ST.kim, 1, Z], span: 12, cam: [k(1555, [ST.kim - 0.2, 2.0, 0.8], [ST.kim - 0.4, 1.3, Z], 44), k(1677, [ST.kim - 0.3, 1.95, 0.4], [ST.kim - 0.4, 1.3, Z], 44), k(1678, [ST.kim - 1.0, 1.9, Z + 2.8], [ST.kim - 1.2, 1.65, Z], 40), k(1764, [ST.kim - 1.0, 1.9, Z + 2.4], [ST.kim - 1.2, 1.65, Z], 40)], kicks: [[1680, 0.05]], dof: LD([ST.kim - 0.6, 1.4, Z], 2) },
  { id: 'night', a: 1765, b: 1947, light: 'lugarNight', at: [ST.night, 1, Z], span: 12, cam: [k(1765, [ST.night + 2.6, 2.6, Z + 5.0], [ST.night, 1.0, Z], 44), k(1947, [ST.night + 0.9, 2.4, Z + 3.8], [ST.night, 1.1, Z], 42)], dof: LD([ST.night, 1.1, Z]) },
  { id: 'dogNight', a: 1948, b: 2087, light: 'lugarNight', at: [ST.night, 1, Z], span: 12, cam: [k(1948, [ST.night + 0.6, 2.3, Z + 4.8], [ST.night + 0.4, 1.0, Z], 44), k(2064, [ST.night + 0.6, 2.25, Z + 4.4], [ST.night + 0.4, 1.0, Z], 44), k(2065, [ST.night + 0.5, 2.0, Z + 3.8], [ST.night + 0.3, 1.0, Z], 42), k(2087, [ST.night + 0.5, 1.98, Z + 3.6], [ST.night + 0.3, 1.0, Z], 42)], kicks: [[2066, 0.05]], dof: LD([ST.night + 0.5, 1.0, Z]) },
  { id: 'fbJustin', a: 2088, b: 2202, light: 'lugarDusk', at: [ST.justin, 1, Z], span: 12, cam: [k(2088, [ST.justin + 0.5, 2.2, Z + 4.6], [ST.justin + 0.4, 1.2, Z - 0.3], 48), k(2202, [ST.justin + 0.45, 2.15, Z + 4.1], [ST.justin + 0.4, 1.25, Z - 0.3], 48)], kicks: [[2178, 0.04]], dof: LD([ST.justin + 0.3, 1.1, Z]) },
  { id: 'fbJenny', a: 2203, b: 2333, light: 'lugarDusk', at: [ST.jenny, 1, Z], span: 12, cam: [k(2203, [ST.jenny + 0.6, 1.9, Z + 4.4], [ST.jenny + 0.55, 1.3, Z], 42), k(2333, [ST.jenny + 0.55, 1.85, Z + 3.9], [ST.jenny + 0.55, 1.35, Z], 42)], kicks: [[2312, 0.04]], dof: LD([ST.jenny + 0.5, 1.3, Z]) },
  { id: 'fbNinya', a: 2334, b: 2445, light: 'lugarDusk', at: [ST.ninya, 1, Z], span: 12, cam: [k(2334, [ST.ninya - 0.4, 1.9, Z + 3.2], [ST.ninya - 0.4, 1.55, Z], 40), k(2400, [ST.ninya + 0.2, 1.95, Z + 4.4], [ST.ninya + 0.2, 1.5, Z], 42, { ease: ss }), k(2445, [ST.ninya + 0.2, 1.95, Z + 4.2], [ST.ninya + 0.2, 1.5, Z], 42)], kicks: [[2420, 0.04]], dof: LD([ST.ninya + 0.4, 1.55, Z]) },
  { id: 'fbKim', a: 2446, b: 2589, light: 'lugarDusk', at: [ST.kim, 1, Z], span: 12, cam: [k(2446, [ST.kim + 0.5, 2.5, Z + 4.4], [ST.kim + 0.5, 1.05, Z], 42), k(2589, [ST.kim + 0.45, 2.45, Z + 4.0], [ST.kim + 0.5, 1.05, Z], 42)], kicks: [[2579, 0.04]], dof: LD([ST.kim + 0.5, 1.15, Z]) },
  { id: 'realize', a: 2590, b: 2780, light: 'lugarNight', at: [ST.night, 1, Z], span: 16, cam: [k(2590, [ST.night + 0.3, 1.6, Z + 2.5], [ST.night, 1.35, Z], 40), k(2700, [ST.night + 0.3, 1.6, Z + 2.3], [ST.night, 1.35, Z], 40), k(2733, [ST.night + 0.4, 2.4, Z + 5.4], [ST.night, 1.2, Z - 0.3], 46, { ease: ss }), k(2780, [ST.night + 0.4, 2.4, Z + 5.2], [ST.night, 1.2, Z - 0.3], 46)], dof: LD([ST.night, 1.3, Z], 2) },
  { id: 'friends', a: 2781, b: 2979, light: 'lugar', at: [0, 1, Z], span: 16, cam: [k(2781, [0.4, 2.3, 1.6], [0, 1.4, Z], 46), k(2979, [0.3, 2.1, 0.8], [0, 1.45, Z], 44)], dof: LD([0, 1.5, Z], 2) },
  { id: 'kinabukasan', a: 2980, b: 3151, light: 'lugar', at: [0, 1, Z], span: 14, cam: [k(2980, [0.2, 2.0, 0.8], [0.6, 1.5, Z], 44), k(3101, [0.1, 1.95, 0.2], [0.6, 1.55, Z], 42), k(3102, [-0.4, 1.85, Z + 2.6], [-0.5, 1.7, Z], 40), k(3151, [-0.4, 1.85, Z + 2.3], [-0.5, 1.7, Z], 40)], kicks: [[3104, 0.04]], dof: LD([0, 1.6, Z], 2) },
  { id: 'closer', a: 3152, b: TOTAL - 1, light: 'lugar', at: [0, 1, -3.2], span: 12, cam: [k(3152, [0.2, 1.85, 0.4], [0, 1.55, -3.4], 42), k(TOTAL, [0.2, 1.85, 0.0], [0, 1.6, -3.4], 42)], dof: LD([0, 1.6, -3.4], 4) },
  { id: 'thumb', a: 9000, b: 9000, light: 'lugar', at: [0, 1, Z], span: 14, cam: [k(9000, [0.1, 1.95, 0.4], [0, 1.6, Z], 42)], dof: LD([0, 1.6, Z], 2) },
];
export const shotAt = (f) => SHOTS.find((s) => f >= s.a && f < s.b + 1) || SHOTS[SHOTS.length - 1];

// ---------------- props ----------------
const dog = () => { const g = new THREE.Group(); scene.add(g); const c = '#c98a4a';
  rb(0.42, 0.36, 0.8, c, { y: 0.45, parent: g, r: 0.1 }); const head = new THREE.Group(); head.position.set(0, 0.78, 0.42); g.add(head); rb(0.38, 0.36, 0.38, c, { parent: head, r: 0.1 }); rb(0.2, 0.16, 0.2, '#e9c49a', { y: -0.06, z: 0.22, parent: head, r: 0.06 });
  rb(0.08, 0.06, 0.04, '#241a16', { y: 0.0, z: 0.33, parent: head, r: 0.02 }); for (const s of [-1, 1]) { rb(0.06, 0.08, 0.02, '#241a16', { x: s * 0.09, y: 0.07, z: 0.2, parent: head, r: 0.02 }); rb(0.1, 0.2, 0.08, '#8a5a2a', { x: s * 0.17, y: 0.18, z: -0.04, parent: head, r: 0.04 }); }
  const mouth = rb(0.14, 0.05, 0.03, '#7a1e28', { y: -0.13, z: 0.32, parent: head, r: 0.02 });
  const legs = []; for (const [x, z] of [[-0.14, 0.28], [0.14, 0.28], [-0.14, -0.28], [0.14, -0.28]]) legs.push(rb(0.12, 0.3, 0.12, c, { x, y: 0.15, z, parent: g, r: 0.04 }));
  const tail = rb(0.08, 0.08, 0.3, c, { y: 0.62, z: -0.48, parent: g, r: 0.03 }); tail.rotation.x = 0.6;
  return { g, head, mouth, tail, legs }; };
const bench = (x, z, col = '#8a5a34') => { const g = new THREE.Group(); g.position.set(x, 0, z); scene.add(g); rb(1.8, 0.1, 0.5, col, { y: 0.5, parent: g, r: 0.03 }); for (const s of [-1, 1]) rb(0.1, 0.5, 0.45, '#6a4428', { x: s * 0.8, y: 0.25, parent: g, r: 0.02 }); rb(1.8, 0.5, 0.08, col, { y: 0.85, z: -0.24, parent: g, r: 0.03 }); return g; };

// ---------------- setup ----------------
export const setup = () => {
  const H = {}, R = {};
  ground('#8fbf5a'); road({ alongX: true, len: 300 });
  street({ x0: -40, x1: -11, z: -9, seed: 3 }); street({ x0: -5, x1: 60, z: -9, seed: 5 }); street({ x0: -40, x1: 60, z: 9, face: -1, seed: 7 });
  for (const x of [-20, 1, 13, 25, 37, 50]) tree({ x, z: -6.4 }); for (const x of [-26, -6, 18, 30, 46]) tree({ x, z: 5.6 });
  lamp({ x: ST.night - 1.6, z: Z - 0.6 }); lamp({ x: -16, z: 4.9 }); lamp({ x: 16, z: 4.9 });
  // Ninya's store
  store({ x: ST.ninya, z: -6.4, name: 'TINDAHAN NI NINYA', signBg: '#3fa060' });
  // Justin's unfinished jobs: half-painted wall, half-built chair, a ladder, a bucket
  const J = new THREE.Group(); J.position.set(ST.justin, 0, Z - 1.2); scene.add(J);
  rb(3.2, 2.2, 0.2, '#e9e2d4', { y: 1.1, parent: J }); rb(1.3, 2.2, 0.02, '#4f9fd0', { x: -0.95, y: 1.1, z: 0.11, parent: J }); rb(0.3, 1.1, 0.02, '#4f9fd0', { x: -0.15, y: 1.65, z: 0.11, parent: J });
  const lad = new THREE.Group(); lad.position.set(1.1, 0, 0.5); lad.rotation.x = -0.15; J.add(lad); for (const s of [-1, 1]) rb(0.06, 2.0, 0.06, '#c9a46a', { x: s * 0.25, y: 1.0, parent: lad }); for (let i = 0; i < 5; i++) rb(0.5, 0.05, 0.05, '#c9a46a', { y: 0.3 + i * 0.38, parent: lad });
  const bk = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.13, 0.3, 14), soft('#4f9fd0')); bk.position.set(-0.4, 0.15, 0.9); J.add(bk);
  H.chair = new THREE.Group(); H.chair.position.set(0.3, 0, 1.0); J.add(H.chair); rb(0.6, 0.06, 0.6, '#b07a42', { y: 0.5, parent: H.chair, r: 0.02 }); rb(0.06, 0.5, 0.06, '#8a5a34', { x: -0.25, y: 0.25, z: 0.25, parent: H.chair }); rb(0.06, 0.5, 0.06, '#8a5a34', { x: 0.25, y: 0.25, z: 0.25, parent: H.chair });
  H.chairDone = new THREE.Group(); H.chair.add(H.chairDone); rb(0.06, 0.5, 0.06, '#8a5a34', { x: -0.25, y: 0.25, z: -0.25, parent: H.chairDone }); rb(0.06, 0.5, 0.06, '#8a5a34', { x: 0.25, y: 0.25, z: -0.25, parent: H.chairDone }); rb(0.6, 0.6, 0.06, '#b07a42', { y: 0.82, z: -0.27, parent: H.chairDone, r: 0.02 });
  H.chairHalf = new THREE.Group(); H.chair.add(H.chairHalf); const lg = rb(0.06, 0.5, 0.06, '#8a5a34', { x: 0.5, y: 0.03, z: 0.3, parent: H.chairHalf }); lg.rotation.z = Math.PI / 2;
  // Don Francis's desk + laptop
  table({ x: ST.don, z: Z + 0.55, w: 1.2, d: 0.7 }); rb(0.5, 0.03, 0.34, '#3a3a44', { x: ST.don, y: 0.84, z: Z + 0.6, r: 0.01 }); const scr = rb(0.5, 0.32, 0.03, '#3a3a44', { x: ST.don, y: 1.0, z: Z + 0.42, r: 0.01 }); scr.rotation.x = -0.2;
  sign('₱₱₱', 0.42, 0.24, { bg: '#4fb05a', fg: '#ffffff', border: '#3a3a44' }, { x: ST.don, y: 1.0, z: Z + 0.405, ry: Math.PI });
  // benches: Kimberly's (day) and the night bench
  bench(ST.kim + 0.3, Z - 0.1); bench(ST.night, Z - 0.1);
  // rigs
  R.dams = makeBlocky(CAST.dams); R.jhano = makeBlocky(CAST.mangJhano); R.don = makeBlocky(CAST.donFrancis); R.torres = makeBlocky(CAST.mangTorres); R.jenny = makeBlocky(CAST.jenny);
  R.ninya = makeBlocky({ ...CAST.alingNinya, name: 'Ninya' });
  R.justin = makeBlocky({ name: 'Justin', skin: '#c48a5e', shirt: '#3f8a5a', pants: '#3a3a44', hair: 'cap', capColor: '#f2c440', seed: 12 });
  R.kim = makeBlocky({ name: 'Kimberly', skin: '#b8794f', shirt: '#7a5ac9', pants: '#3a2a5a', skirt: '#3a2a5a', hair: 'long', hairColor: '#2a1a14', seed: 13 });
  R.roger = makeBlocky({ name: 'Roger', skin: '#c48a5e', shirt: '#e2453c', pants: '#2a2a34', hair: 'blocky', hairColor: '#1a1414', mole: true, seed: 14 });
  R.lady = makeBlocky({ name: 'Ale', skin: '#d29c6e', shirt: '#3fb0c0', pants: '#3f5a8a', skirt: '#3f5a8a', hair: 'bun', hairColor: '#3a2216', seed: 15 });
  H.dog = dog();
  H.kPhone = phone('#7a4ad0'); hold(R.kim, H.kPhone); H.kPhone.position.set(0, -0.1, 0.08); H.kPhone.rotation.x = -1.2;
  H.dPhone = phone('#6fa8ff'); hold(R.dams, H.dPhone); H.dPhone.position.set(0, -0.1, 0.08); H.dPhone.rotation.x = -1.2;
  H.hammer = new THREE.Group(); rb(0.04, 0.3, 0.04, '#8a5a34', { parent: H.hammer }); rb(0.14, 0.06, 0.06, '#5a5a66', { y: 0.15, parent: H.hammer }); hold(R.dams, H.hammer); H.hammer.position.set(0, -0.1, 0.1); H.hammer.rotation.x = -1.2;
  return { H, R };
};

// ---------------- per frame ----------------
const P = (rig, f, o) => pose(rig, f, o);
const heart = (id, f, a, b, pos, h = 0.3) => shout(id, f, a, b, [pos[0], pos[1] + 0.15 * ((f - a) % 30) / 30, pos[2]], '♥', '#ff5a8a', h);
export const frameAt = (f, H, R) => {
  const S = shotAt(f), A = [], add = (x) => { if (Array.isArray(x)) x.forEach((y) => y && A.push(y)); else if (x) A.push(x); };
  for (const key in R) R[key].root.visible = false;
  H.dog.g.visible = false; H.kPhone.visible = H.dPhone.visible = H.hammer.visible = false;
  H.chairDone.visible = false; H.chairHalf.visible = true;
  const dogAt = (pos, yaw, o = {}) => { H.dog.g.visible = true; H.dog.g.position.set(...pos); H.dog.g.rotation.y = yaw; H.dog.tail.rotation.y = 0.6 * Math.sin(f * 0.8);
    H.dog.mouth.scale.y = o.talk ? 1 + 2.2 * Math.abs(Math.sin(f * 0.55)) : o.laugh ? 2.5 : 1; H.dog.head.rotation.x = o.talk ? -0.1 + 0.08 * Math.sin(f * 0.55) : 0; H.dog.legs.forEach((l, i) => { l.rotation.x = o.walk ? 0.5 * Math.sin(f * 0.6 + i * Math.PI) : 0; }); };
  const kimSit = (x, o = {}) => { P(R.kim, f, { pos: [x, 0, Z - 0.05], pose: 'sit', expr: o.expr || 'smug', armL: [-60, 0, 10], armR: [-60, 0, -10], look: [0, -15], ...o.p }); H.kPhone.visible = true; };
  const angryShake = (s) => ({ lean: 4 * Math.sin(f * 0.9 + s) });
  switch (S.id) {
    case 'open': {
      P(R.jhano, f, { pos: [-3.2, 0, Z - 0.3], yaw: 30, pose: 'point', armR: [-90 + 30 * Math.sin(f * 0.5), 0, 0], expr: 'angry' });
      P(R.ninya, f, { pos: [-1.8, 0, Z - 0.8], yaw: f % 40 < 20 ? 40 : -40, pose: 'shrug', expr: 'happy' });
      P(R.jenny, f, { pos: [2.6, 0, Z - 0.5], yaw: -20, pose: 'idle', expr: 'angry' });
      P(R.kim, f, { pos: [3.6, 0, Z - 0.6], yaw: -25, pose: 'hold', expr: 'smug' });
      P(R.justin, f, { pos: [-0.9, 0, Z - 1.4], yaw: 90, pose: 'run', t: f / 16, expr: 'worried' });
      dogAt([1.4, 0, Z + 0.4], -0.4, {});
      P(R.dams, f, { pos: [0, 0, Z], pose: f > 70 ? 'wave' : 'idle', expr: 'grin' });
      add(pill('po', f, 50, 117, [0, 2.6, Z], 'SPECIAL ABILITY!', 'yellow'));
      break; }
    case 'jhano': {
      const punch = Math.sin(f * 0.45);
      P(R.jhano, f, { pos: [ST.jhano, 0, Z], yaw: 10, pose: 'point', armR: [-90 + 25 * punch, 0, 0], armL: [-90 - 25 * punch, 0, 0], expr: 'angry', ...angryShake(0) });
      add(pill('pj', f, 120, 195, [ST.jhano, 2.6, Z], 'MANG JHANO', 'white'));
      add(shout('hoy', f, 158, 195, [ST.jhano + 0.75, 2.2, Z], 'HOY!', '#ff6a5a', 0.34));
      add(pill('pj2', f, 196, 249, [ST.jhano, 2.6, Z], 'KAAWAY: 0', 'red'));
      break; }
    case 'ninya': {
      const side = Math.floor((f - 250) / 22) % 2;
      P(R.ninya, f, { pos: [ST.ninya, 0, Z], yaw: side ? -35 : 35, pose: side ? 'shrug' : 'point', armR: side ? undefined : [-100, 0, -20], expr: side ? 'wow' : 'happy' });
      add(pill('pn', f, 251, 327, [ST.ninya, 2.6, Z], 'NINYA', 'white'));
      add(shout('t1', f, 280, 300, [ST.ninya - 0.7, 2.15, Z], 'TALAGA?!', '#ffffff', 0.26)); add(shout('t2', f, 302, 322, [ST.ninya + 0.7, 2.15, Z], 'OO DAW!', '#ffe066', 0.26));
      add(pill('pn2', f, 328, 376, [ST.ninya, 2.6, Z], '1 TAO, 2 BOSES', 'yellow'));
      break; }
    case 'justin': {
      const run = Math.floor((f - 377) / 34) % 3, xs = [-1.0, 0.2, 1.1], tx = ST.justin + xs[run], prog = ((f - 377) % 34) / 34, px = prog < 0.4 ? lerp(ST.justin + xs[(run + 2) % 3], tx, ss(prog / 0.4)) : tx;
      P(R.justin, f, { pos: [px, 0, Z - 0.3], yaw: prog < 0.4 ? 90 : 0, pose: prog < 0.4 ? 'run' : 'hold', t: f / 14, expr: 'worried' });
      add(pill('pju', f, 378, 477, [ST.justin, 2.75, Z - 0.3], 'JUSTIN', 'white'));
      add(pill('pju2', f, 478, 543, [ST.justin, 2.75, Z - 0.3], 'TAPOS: 0 / 12', 'red'));
      break; }
    case 'jenny': {
      P(R.jenny, f, { pos: [ST.jenny, 0, Z], pose: f > 572 ? 'point' : 'idle', armR: f > 572 ? [-150, 0, -30] : undefined, expr: 'angry', ...angryShake(1) });
      add(pill('pje', f, 545, 605, [ST.jenny, 2.0, Z], 'JENNY', 'white'));
      add(shout('hmp', f, 574, 605, [ST.jenny + 0.6, 1.7, Z], 'HMP!', '#ff6a5a', 0.28));
      add(pill('pje2', f, 606, 655, [ST.jenny, 2.0, Z], 'DAHILAN: WALA', 'red'));
      break; }
    case 'don': {
      P(R.don, f, { pos: [ST.don, 0, Z - 0.1], pose: 'sit', expr: 'sleepy', armL: [-70 + 8 * Math.sin(f * 1.1), 0, 10], armR: [-70 + 8 * Math.sin(f * 1.1 + 2), 0, -10], lean: 8 });
      add(pill('pdf', f, 657, 740, [ST.don, 2.45, Z], 'DON FRANCIS', 'white'));
      add(shout('zz', f, 690, 784, [ST.don + 0.75, 1.75 + 0.1 * Math.sin(f * 0.1), Z], 'Zzz', '#ffffff', 0.26));
      add(pill('pdf2', f, 741, 784, [ST.don, 2.45, Z], 'TULOG PERO KUMIKITA', 'yellow', 0.28));
      break; }
    case 'wangbu': {
      const talk = f >= 847;
      dogAt([ST.wangbu, 0, Z + 0.3], 0.5, { talk });
      P(R.torres, f, { pos: [ST.wangbu + 1.1, 0, Z - 0.1], yaw: -50, pose: f > 860 ? 'wave' : 'idle', expr: talk ? 'smile' : 'neutral' });
      add(pill('pw', f, 786, 846, [ST.wangbu, 1.55, Z + 0.3], 'WANGBU', 'yellow', 0.28));
      add(shout('mu', f, 850, 907, [ST.wangbu + 0.3, 1.75, Z + 0.3], '"MAGANDANG UMAGA!"', '#ffffff', 0.22));
      break; }
    case 'kim': {
      kimSit(ST.kim, { expr: f > 979 ? 'smug' : 'grin' });
      add(pill('pk', f, 909, 978, [ST.kim, 2.15, Z], 'KIMBERLY', 'white'));
      add(pill('pk2', f, 979, 1039, [ST.kim, 2.15, Z], '999 PANALO • 0 TALO', 'yellow', 0.28));
      add(burst('kb', f, 979, [ST.kim + 0.2, 1.2, Z + 0.3], 0.6, '#ffe066'));
      break; }
    case 'rogerIn': {
      const x = lerp(ST.roger - 4, ST.roger, ss(win(f, 1040, 1100)));
      P(R.roger, f, { pos: [x, 0, Z], yaw: f < 1100 ? 90 : 0, pose: f < 1100 ? 'walk' : 'wave', t: f / 26, expr: 'smug' });
      add(pill('pr1', f, 1050, 1098, [x, 2.6, Z], 'BAGONG KAPITBAHAY', 'white', 0.28));
      add(pill('pr2', f, 1099, 1129, [x, 2.6, Z], 'ROGER', 'white'));
      break; }
    case 'rogerFace': {
      P(R.roger, f, { pos: [ST.roger, 0, Z], pose: 'idle', expr: 'smug', blink: false });
      add(pill('pnu', f, 1140, 1190, [ST.roger + 0.55, 2.2, Z], 'NUNAL ✓', 'yellow', 0.22));
      break; }
    case 'rogerKilig': {
      const pt = f >= 1240;
      P(R.roger, f, { pos: [ST.roger, 0, Z], yaw: 35, pose: pt ? 'point' : 'idle', armR: pt ? [-95, 0, 0] : undefined, expr: 'smug' });
      const kil = f >= 1257;
      P(R.ninya, f, { pos: [ST.roger + 1.4, 0, Z - 0.2], yaw: -40, pose: kil ? 'pray' : 'idle', expr: kil ? 'love' : 'neutral', lean: kil ? 6 * Math.sin(f * 0.3) : 0 });
      P(R.lady, f, { pos: [ST.roger + 2.4, 0, Z - 0.5], yaw: -45, pose: kil ? 'cheer' : 'idle', expr: kil ? 'love' : 'smile' });
      if (kil) { add(heart('h1', f, 1260, 1323, [ST.roger + 1.4, 2.4, Z - 0.2])); add(heart('h2', f, 1266, 1323, [ST.roger + 2.4, 2.4, Z - 0.5])); }
      add(pill('pkl', f, 1262, 1323, [ST.roger + 1.1, 2.95, Z], 'KINIKILIG!', 'purple'));
      break; }
    case 'dams': {
      const sad = f >= 1382;
      P(R.dams, f, { pos: [0, 0, Z], pose: f < 1350 ? 'point' : sad ? 'shrug' : 'wave', armR: f < 1350 ? [-60, 40, 30] : undefined, expr: sad ? 'sad' : 'grin' });
      add(pill('pd', f, 1351, 1381, [0, 2.6, Z], 'DAMS', 'white'));
      add(pill('pd2', f, 1384, 1436, [0, 2.6, Z], 'SPECIAL ABILITY: WALA', 'red', 0.28));
      break; }
    case 'tryAngry': {
      const laugh = f >= 1517, punch = Math.sin(f * 0.45);
      P(R.jhano, f, { pos: [ST.jhano - 0.1, 0, Z - 0.3], yaw: 25, pose: 'point', armR: [-90 + 25 * punch, 0, 0], armL: [-90 - 25 * punch, 0, 0], expr: laugh ? 'shock' : 'angry' });
      P(R.dams, f, { pos: [ST.jhano + 1.2, 0, Z], yaw: -10, pose: laugh ? 'cheer' : 'point', armR: laugh ? undefined : [-90 - 20 * punch, 0, 0], armL: laugh ? undefined : [-90 + 20 * punch, 0, 0], expr: laugh ? 'laugh' : f > 1470 ? 'angry' : 'worried', lean: laugh ? -6 * Math.abs(Math.sin(f * 0.3)) : 0 });
      add(pill('s1', f, 1440, 1516, [ST.jhano + 1.2, 2.6, Z], 'SUBOK #1: MAGALIT', 'blue', 0.28));
      add(shout('ha', f, 1519, 1554, [ST.jhano + 1.2, 2.55, Z], 'HAHAHA!', '#ffe066', 0.36));
      break; }
    case 'tryKilig': {
      const look = f >= 1656, blk = f >= 1678;
      kimSit(ST.kim, { expr: look ? (blk ? 'angry' : 'neutral') : 'grin', p: look ? { look: [-25, 0] } : {} });
      H.kPhone.userData.screen.material.color.set(blk ? '#e23b3b' : '#7a4ad0');
      P(R.dams, f, { pos: [ST.kim - 1.2, 0, Z + 0.2], yaw: 30, pose: blk ? 'shrug' : 'point', armR: blk ? undefined : [-95, 0, 0], expr: blk ? 'shock' : 'smug' });
      add(pill('s2', f, 1558, 1655, [ST.kim - 1.2, 2.6, Z + 0.2], 'SUBOK #2: PAKILIGIN', 'blue', 0.28));
      add(pill('blk', f, 1680, 1712, [ST.kim - 1.2, 2.6, Z + 0.2], 'BLOCKED!', 'red'));
      add(pill('blk2', f, 1713, 1764, [ST.kim - 1.2, 2.6, Z + 0.2], 'SA LAHAT NG GAMES', 'red', 0.28));
      break; }
    case 'night': {
      P(R.dams, f, { pos: [ST.night, 0, Z - 0.05], pose: 'sit', expr: f >= 1893 ? 'cry' : 'sad', look: [0, -10], lean: 6 });
      add(pill('mi', f, 1856, 1890, [ST.night, 2.05, Z], 'MAG-ISA', 'white', 0.26));
      break; }
    case 'dogNight': {
      const arrive = ss(win(f, 1960, 2010)), talk = f >= 2065;
      dogAt([lerp(ST.night + 3, ST.night + 0.6, arrive), 0, Z + 0.35], arrive < 1 ? -Math.PI / 2 : -0.3, { walk: arrive < 1, talk });
      P(R.dams, f, { pos: [ST.night - 0.15, 0, Z - 0.05], pose: 'sit', expr: talk ? 'shock' : f > 2010 ? 'worried' : 'sad', look: [talk ? 30 : 15, -10] });
      add(pill('pwn', f, 2028, 2064, [ST.night + 0.6, 1.55, Z + 0.35], 'WANGBU', 'yellow', 0.26));
      add(shout('dms', f, 2066, 2087, [ST.night + 0.8, 1.55, Z + 0.35], '"DAMS…"', '#ffffff', 0.26));
      break; }
    case 'fbJustin': {
      const fix = f >= 2120, done = f >= 2165;
      H.chairDone.visible = done; H.chairHalf.visible = !done;
      P(R.dams, f, { pos: [ST.justin + 0.95, 0, Z - 0.2], yaw: -40, pose: fix && !done ? 'point' : done ? 'cheer' : 'idle', armR: fix && !done ? [-70 + 40 * Math.abs(Math.sin(f * 0.5)), 0, 0] : undefined, expr: done ? 'grin' : 'smile' });
      H.hammer.visible = fix && !done;
      P(R.justin, f, { pos: [ST.justin - 1.0, 0, Z - 0.3], yaw: 60, pose: 'sit', expr: done ? 'wow' : 'sleepy' });
      add(burst('cb', f, 2165, [ST.justin + 0.3, 0.8, Z - 0.1], 0.6, '#ffe066'));
      add(shout('ik1', f, 2177, 2202, [ST.justin + 0.95, 2.55, Z - 0.2], 'IKAW!', '#ffe066', 0.42));
      break; }
    case 'fbJenny': {
      const funny = f >= 2250, laugh = f >= 2290;
      P(R.jenny, f, { pos: [ST.jenny, 0, Z], yaw: 20, pose: laugh ? 'cheer' : 'idle', expr: laugh ? 'laugh' : 'angry', ...(laugh ? {} : angryShake(2)) });
      P(R.dams, f, { pos: [ST.jenny + 1.1, 0, Z - 0.1], yaw: -25, pose: funny ? 'dance' : 'idle', t: f / 18, expr: funny ? 'grin' : 'smile' });
      add(shout('ik2', f, 2311, 2333, [ST.jenny + 1.1, 2.55, Z - 0.1], 'IKAW!', '#ffe066', 0.42));
      if (laugh) add(shout('hh', f, 2292, 2310, [ST.jenny - 0.2, 1.95, Z], 'HAHA!', '#ffffff', 0.26));
      break; }
    case 'fbNinya': {
      const side = Math.floor((f - 2334) / 22) % 2;
      P(R.ninya, f, { pos: [ST.ninya - 0.4, 0, Z], yaw: 30, pose: side ? 'shrug' : 'point', armR: side ? undefined : [-100, 0, -20], expr: side ? 'wow' : 'happy' });
      P(R.dams, f, { pos: [ST.ninya + 0.8, 0, Z - 0.1], yaw: -35, pose: 'think', expr: 'smile', look: [0, 8 * Math.sin(f * 0.25)] });
      add(shout('ik3', f, 2419, 2445, [ST.ninya + 0.8, 2.55, Z - 0.1], 'IKAW!', '#ffe066', 0.42));
      break; }
    case 'fbKim': {
      kimSit(ST.kim, { expr: f > 2540 ? 'happy' : 'grin' });
      P(R.dams, f, { pos: [ST.kim + 0.95, 0, Z - 0.05], pose: 'sit', expr: 'grin', armL: [-60, 0, 10], armR: [-60, 0, -10], look: [0, -15] }); H.dPhone.visible = true;
      add(pill('tm', f, 2450, 2577, [ST.kim + 0.5, 2.1, Z], 'TEAM: KIMBERLY + DAMS', 'green', 0.26));
      add(burst('wb', f, 2560, [ST.kim + 0.5, 1.2, Z + 0.3], 0.7, '#ffe066'));
      add(shout('ik4', f, 2578, 2589, [ST.kim + 0.95, 2.1, Z], 'IKAW!', '#ffe066', 0.42));
      break; }
    case 'realize': {
      const smile = f >= 2670, gather = ss(win(f, 2725, 2760));
      P(R.dams, f, { pos: [ST.night, 0, Z - 0.05], pose: 'sit', expr: smile ? 'happy' : 'wow', look: [0, smile ? 5 : -5] });
      dogAt([ST.night + 0.75, 0, Z + 0.35], -0.3, { laugh: smile });
      if (f >= 2725) {
        const ring = [['jhano', -1.6, -0.6], ['ninya', -0.9, -1.0], ['justin', 1.6, -0.6], ['jenny', 2.3, -0.2], ['kim', 0.9, -1.1], ['don', -2.4, -0.2], ['torres', 0, -1.4]];
        for (const [kk, dx, dz] of ring) P(R[kk], f, { pos: [ST.night + dx * (0.5 + 0.5 * gather), 0, Z + dz - 0.4 * (1 - gather)], yaw: -dx * 12, pose: 'wave', expr: 'happy' });
      }
      add(pill('kb2', f, 2735, 2780, [ST.night, 3.0, Z - 0.6], 'ANG MGA KAIBIGAN KO', 'yellow', 0.32));
      break; }
    case 'friends': {
      const laugh = f < 2840, hug = f >= 2840 && f < 2892, cheer = f >= 2892;
      const ring = [['jhano', -1.9, 0.0], ['ninya', -1.1, -0.6], ['justin', 1.2, -0.6], ['jenny', 0.9, 0.3], ['kim', 2.0, -0.2], ['don', -2.6, -0.8], ['torres', 2.8, -0.9]];
      for (const [kk, dx, dz] of ring) P(R[kk], f, { pos: [dx, 0, Z + dz], yaw: -dx * 10, pose: cheer ? 'cheer' : laugh ? 'idle' : 'idle', expr: laugh ? 'laugh' : cheer ? 'happy' : 'smile', lean: laugh ? -5 * Math.abs(Math.sin(f * 0.3 + dx)) : 0 });
      P(R.dams, f, { pos: [0, 0, Z], pose: cheer ? 'cheer' : hug ? 'hold' : 'dance', t: f / 18, expr: 'grin', yaw: hug ? 20 : 0 });
      dogAt([0.6, 0, Z + 0.9], -0.2, { laugh: true });
      add(pill('pa', f, 2786, 2839, [0, 2.65, Z], 'PATAWANIN ✓', 'green')); add(pill('pdy', f, 2841, 2891, [0, 2.65, Z], 'DAMAYAN ✓', 'green')); add(pill('pan', f, 2893, 2979, [0, 2.65, Z], 'ANDITO AKO!', 'yellow'));
      add(confetti('cf', f, 2893, 2979, [0, 2.0, Z + 0.5], 4));
      break; }
    case 'kinabukasan': {
      const pt = f >= 3040, kil = f >= 3102;
      P(R.roger, f, { pos: [1.0, 0, Z], yaw: -40, pose: pt ? 'point' : 'wave', armR: pt ? [-95, 0, 0] : undefined, expr: 'smug' });
      P(R.dams, f, { pos: [-0.5, 0, Z], yaw: 25, pose: kil ? 'pray' : 'idle', expr: kil ? 'love' : 'smile', lean: kil ? 6 * Math.sin(f * 0.3) : 0 });
      add(pill('pkb', f, 2985, 3030, [0.2, 2.75, Z], 'KINABUKASAN', 'white', 0.28));
      if (kil) { add(heart('h3', f, 3104, 3151, [-0.25, 2.25, Z])); add(heart('h4', f, 3112, 3151, [-0.8, 2.35, Z])); }
      add(pill('kd', f, 3106, 3151, [-0.5, 2.62, Z], 'KINILIG DIN!', 'purple'));
      break; }
    case 'closer': {
      P(R.dams, f, { pos: [0, 0, -3.4], pose: f > 3170 ? 'wave' : 'point', armR: f > 3170 ? undefined : [-90, 0, 0], expr: 'grin' });
      dogAt([0.85, 0, -3.1], -0.3, { laugh: true });
      add(shout('cl', f, 3154, TOTAL, [0, 2.6, -3.4], "ANONG MERON SA LUGAR N'YO?", '#ffffff', 0.42));
      break; }
    case 'thumb': {
      const F = 9000;
      P(R.dams, F, { pos: [0, 0, Z], pose: 'shrug', expr: 'shock', blink: false });
      const ring = [['jhano', -1.05, -0.7, 'angry'], ['ninya', -0.55, -1.2, 'wow'], ['kim', 0.6, -1.2, 'smug'], ['roger', 1.1, -0.7, 'smug']];
      for (const [kk, dx, dz, ex] of ring) P(R[kk], F, { pos: [dx, 0, Z + dz], yaw: -dx * 12, pose: 'idle', expr: ex, blink: false });
      break; }
  }
  return A;
};

export const lookAt = (f) => {
  let flash = 0;
  for (const [a, b] of FLASHES) if (f >= a && f <= b) { const m = (a + b) / 2; flash = Math.max(flash, 1 - Math.abs(f - m) / ((b - a) / 2 + 0.5)); }
  return { flash: clamp(flash) * 0.9 };
};
