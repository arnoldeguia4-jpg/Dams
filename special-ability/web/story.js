// LUGAR demo story (template): replace per project. setup() builds sets + rigs once; frameAt(f) poses everything and returns fx cards.
import { THREE, scene, ss, easeOut, back, win, clamp, lerp } from './engine.js';
import { makeBlocky, pose, hold } from './blocky.js';
import { ground, road, street, store, tree, lamp, jeep, phone, cup, room, bed } from './props.js';
import { pill, shout, burst, puff, dizzy, moneyRain, confetti, glowCard } from './cast.js';

export const TOTAL = 300;
export const FLASHES = [[148, 156]];
export const MUSIC_STOP = 260;
const IX = 120; // interior set far away on x

// ---------------- shots ----------------
export const SHOTS = [
  { id: 'street', a: 0, b: 150, light: 'lugar', at: [0, 1, 0], span: 14,
    cam: [{ f: 0, pos: [1.8, 1.5, 6.5], look: [0, 1.2, 0], fov: 40 }, { f: 150, pos: [1.0, 1.4, 4.2], look: [0, 1.25, 0], fov: 40 }], dof: () => ({ c: 3, pt: [0, 1.2, 0] }) },
  { id: 'store', a: 151, b: 230, light: 'lugar', at: [10, 1, -3], span: 10,
    cam: [{ f: 151, pos: [10.4, 1.5, 2.6], look: [10, 1.4, -2.6], fov: 40 }, { f: 230, pos: [10.3, 1.5, 2.0], look: [10, 1.45, -2.6], fov: 40 }], dof: () => ({ c: 4, pt: [10, 1.4, -2.6] }) },
  { id: 'room', a: 231, b: TOTAL - 1, light: 'lugarNight', at: [IX, 1, 0], span: 8,
    cam: [{ f: 231, pos: [IX + 0.3, 1.5, 3.4], look: [IX, 1.0, 0], fov: 40 }, { f: TOTAL, pos: [IX + 0.2, 1.35, 2.2], look: [IX, 1.05, 0], fov: 40, roll: 3 }], dof: () => ({ c: 6, pt: [IX, 1.1, 0] }) },
  { id: 'thumb', a: 9000, b: 9000, light: 'lugar', at: [0, 1, 0], span: 8,
    cam: [{ f: 9000, pos: [0.4, 1.5, 2.6], look: [0.05, 1.45, 0], fov: 40 }], dof: () => ({ c: 4, pt: [0, 1.5, 0] }) },
];
export const shotAt = (f) => SHOTS.find((s) => f >= s.a && f < s.b + 1) || SHOTS[SHOTS.length - 1]; // "< b + 1" so fractional (warped) frames never fall between shots

// ---------------- cast specs ----------------
const SPEC = {
  hero: { skin: '#b8794f', shirt: '#f2c440', pants: '#2b3b7a', hair: 'blocky', item: 'bag', seed: 1 },
  nena: { skin: '#d29c6e', shirt: '#3fa060', pants: '#3a3a44', hair: 'bun', seed: 2 },
  kap: { skin: '#b07a52', shirt: '#2f5fb0', pants: '#22305a', hair: 'curly', sash: '#f2c440', moustache: '#2a201a', seed: 3 },
};

// ---------------- setup ----------------
export const setup = () => {
  const H = {}, R = {};
  ground(); road({ len: 220 }); street({ z: -9, gap: [5, 15], seed: 3 }); street({ z: 9, face: -1, seed: 7 });
  for (const x of [-12, -4, 18, 26]) tree({ x, z: -5.4 });
  for (const x of [-8, 22]) lamp({ x, z: 4.8 });
  store({ x: 10, z: -4.5, name: 'TINDAHAN NI ALING NENA' });
  H.jeep = jeep({ x: -2.2, z: -30, col: '#4a7ad9' });
  room({ x: IX }); bed({ x: IX, z: -1.2 });
  R.hero = makeBlocky(SPEC.hero); R.nena = makeBlocky(SPEC.nena); R.kap = makeBlocky(SPEC.kap);
  H.phone = hold(R.hero, phone()); H.phone.position.set(0, -0.05, 0.12); H.phone.rotation.x = -1.2;
  H.cup = cup(); H.cup.position.set(10.4, 1.2, -4.0); H.cup.scale.setScalar(1.4); scene.add(H.cup);
  return { H, R };
};

// ---------------- per frame ----------------
export const frameAt = (f, H, R) => {
  const S = shotAt(f), A = [], add = (x) => { if (Array.isArray(x)) x.forEach((y) => y && A.push(y)); else if (x) A.push(x); };
  H.phone.visible = S.id === 'room';
  for (const k in R) R[k].root.visible = false;
  switch (S.id) {
    case 'street': {
      const z = lerp(-6, 0, ss(win(f, 0, 90)));
      pose(R.hero, f, { pos: [0, 0, z], pose: f < 90 ? 'walk' : 'wave', t: f / 26, expr: f < 90 ? 'smile' : 'grin' });
      pose(R.kap, f, { pos: [-1.8, 0, -1.2], yaw: 20, pose: f > 100 ? 'point' : 'idle', expr: f > 100 ? 'angry' : 'smug' });
      H.jeep.position.z = -30 + 0.25 * f;
      add(pill('p1', f, 100, 150, [-1.8, 2.45, -1.2], 'KAPITAN BOGART!', 'white'));
      add(burst('b1', f, 100, [-1.4, 1.9, -0.8], 0.6));
      break;
    }
    case 'store': {
      pose(R.nena, f, { pos: [10, 0, -3.6], pose: f > 180 ? 'cheer' : 'wave', expr: f > 180 ? 'laugh' : 'happy' });
      add(pill('p2', f, 175, 230, [10, 2.55, -3.4], '10 TASA!', 'yellow'));
      add(moneyRain('mr', f, 180, 230, [10, 2.0, -2.0], 3));
      break;
    }
    case 'room': {
      pose(R.hero, f, { pos: [IX, 0, 0.3], pose: 'hold', expr: f < 262 ? 'worried' : 'shock' });
      add(pill('p3', f, 262, 300, [IX, 2.2, 0.3], 'OPISINA NG MALI', 'red'));
      add(glowCard('pg', [IX, 1.1, 0.75], 0.8, 0.7, '160,200,255', 6));
      break;
    }
    case 'thumb': {
      pose(R.hero, 9000, { pos: [0, 0, 0], pose: 'cheer', expr: 'wow', blink: false });
      add(moneyRain('mr', 9000, 8990, 9010, [0, 2.0, 0.6], 3));
      break;
    }
  }
  return A;
};

export const lookAt = (f) => {
  let flash = 0;
  for (const [a, b] of FLASHES) if (f >= a && f <= b) { const m = (a + b) / 2; flash = Math.max(flash, 1 - Math.abs(f - m) / ((b - a) / 2 + 0.5)); }
  return { flash: clamp(flash) * 0.95 };
};
