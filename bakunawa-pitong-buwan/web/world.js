// Sets: the night sea of the Bakunawa (x SX), a Visayan coastal village (x VX), Bathala's cloud heaven (x KX).
// The Bakunawa is a real 3D serpent (sphere chain + jawed head) posed per frame with H.snake.set(...).
import { THREE, scene, toon, unlit, tbox, cyl, sph, cone, plane, group, lerp, clamp } from './engine.js';
import * as P from './paint.js';

export const SX = 200, VX = -200, KX = -600;

const waterTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'), r = P.rng(3);
  g.fillStyle = '#20406a'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 140; i++) { g.strokeStyle = r() < 0.7 ? 'rgba(140,180,230,0.45)' : 'rgba(250,245,210,0.55)'; g.lineWidth = 2; const x = r() * 256, y = r() * 256; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 8 + r() * 18, y); g.stroke(); }
  const t = P.ctex(c); t.repeat.set(50, 220); return t; })();
const sandTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'), r = P.rng(5);
  g.fillStyle = '#c9b48a'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 500; i++) { g.fillStyle = r() < 0.5 ? 'rgba(150,130,95,0.35)' : 'rgba(235,220,185,0.4)'; g.fillRect(r() * 256, r() * 256, 2 + r() * 3, 2 + r() * 2); }
  const t = P.ctex(c); t.repeat.set(30, 30); return t; })();
const thatchTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'), r = P.rng(9);
  g.fillStyle = '#b08a4a'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 260; i++) { const x = r() * 256, y = r() * 256; g.strokeStyle = r() < 0.5 ? 'rgba(120,85,40,0.6)' : 'rgba(220,190,120,0.6)'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - 0.5) * 6, y + 18 + r() * 16); g.stroke(); }
  return P.ctex(c); })();
const bambooTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d');
  for (let i = 0; i < 16; i++) { g.fillStyle = i % 2 ? '#c9a46a' : '#bf9a5e'; g.fillRect(i * 16, 0, 16, 256); g.fillStyle = 'rgba(90,60,30,0.5)'; g.fillRect(i * 16, 0, 1.5, 256); g.fillRect(i * 16, 60 + (i * 37) % 120, 16, 3); }
  return P.ctex(c); })();
const scaleTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d');
  g.fillStyle = '#2f6a6a'; g.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 9; y++) for (let x = 0; x < 9; x++) { const cx = x * 32 + (y % 2) * 16, cy = y * 32; g.fillStyle = (x + y) % 3 ? '#3a7a76' : '#2a5e62'; g.beginPath(); g.arc(cx, cy, 17, 0, Math.PI); g.fill(); g.strokeStyle = 'rgba(15,40,45,0.7)'; g.lineWidth = 2.5; g.stroke(); }
  const t = P.ctex(c); t.repeat.set(2, 2); return t; })();

/** the Bakunawa: N body spheres from head to tail, fins on the back, a head with an opening jaw */
const makeSnake = () => {
  const N = 80, mBody = toon('#ffffff', scaleTex), mFin = toon('#c2453c'), mBelly = toon('#c9a65a'), mMouth = toon('#7a1a24'), mTooth = toon('#f6f1e2'),
    mEye = unlit('#f6e65a'), mPupil = unlit('#141018'), mHorn = toon('#e9dcb0'), mGlow = unlit('#fff3b8');
  const root = group({}); const segs = [], fins = [], lumps = [];
  for (let i = 0; i < N; i++) { segs.push(sph(1, mBody, { parent: root, seg: 14 })); if (i % 4 === 0 && i > 2) { const f = cone(0.5, 1.4, mFin, { parent: root, seg: 4 }); f.scale.set(0.35, 1, 1); fins.push([i, f]); } }
  for (let k = 0; k < 6; k++) { const l = sph(1, mGlow, { parent: root, seg: 14, cast: false }); l.visible = false; lumps.push(l); }
  // head: local +z forward
  const head = group({ parent: root });
  const skull = sph(1, mBody, { parent: head, seg: 20 }); skull.scale.set(1.15, 0.7, 1.7); skull.position.set(0, 0.15, 0.3);
  const snout = sph(1, mBody, { parent: head, seg: 16 }); snout.scale.set(0.8, 0.42, 1.0); snout.position.set(0, 0.1, 1.6);
  const jawP = group({ parent: head, y: -0.18, z: 0.3 });
  const jaw = sph(1, mBelly, { parent: jawP, seg: 16 }); jaw.scale.set(0.68, 0.2, 1.15); jaw.position.set(0, -0.04, 1.05);
  const mouth = sph(1, mMouth, { parent: head, seg: 14 }); mouth.scale.set(0.78, 0.35, 1.6); mouth.position.set(0, -0.12, 1.0);
  for (let i = 0; i < 6; i++) for (const s of [-1, 1]) { const t = cone(0.09, 0.32, mTooth, { parent: head, seg: 5 }); t.position.set(s * (0.55 - i * 0.05), -0.22, 1.9 - i * 0.32); t.rotation.x = Math.PI; }
  for (const s of [-1, 1]) {
    const e = sph(0.3, mEye, { parent: head, seg: 12 }); e.position.set(s * 0.78, 0.55, 0.95);
    const p = tbox(0.08, 0.42, 0.12, mPupil, { parent: head }); p.position.set(s * 0.98, 0.56, 1.0);
    const h = cone(0.2, 1.6, mHorn, { parent: head, seg: 6 }); h.position.set(s * 0.55, 0.95, -0.6); h.rotation.set(-1.15, 0, s * 0.3);
    const w = cone(0.07, 1.8, mHorn, { parent: head, seg: 5 }); w.position.set(s * 0.75, -0.05, 2.0); w.rotation.set(1.5, 0, s * 0.9);
    const fr = cone(0.55, 1.5, mFin, { parent: head, seg: 4 }); fr.position.set(s * 1.1, 0.25, -0.7); fr.rotation.set(-1.3, 0, s * 1.0); fr.scale.set(0.3, 1, 1);
  }
  const tmp = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0);
  const S = {
    root, head, N,
    /** head/tail world points, scale (head size), arch (height of the body arc), wig (side wave), phase, mouth 0..1, lumps [t..], aim (point the head looks at) */
    set(o) {
      root.visible = o.vis !== false; if (!root.visible) return;
      const Hd = new THREE.Vector3(...o.head), T = new THREE.Vector3(...o.tail), sc = o.scale ?? 2.2, R = o.r ?? 0.75 * sc;
      const dir = T.clone().sub(Hd), side = new THREE.Vector3().crossVectors(dir, up).normalize();
      const pt = (t) => Hd.clone().lerp(T, t).add(up.clone().multiplyScalar((o.arch ?? 6) * Math.sin(Math.PI * t) * (1 - 0.3 * t))).add(side.clone().multiplyScalar((o.wig ?? 1.5) * Math.sin(2 * Math.PI * 1.3 * t + (o.phase ?? 0)) * t));
      const radius = (t) => R * (t < 0.08 ? 0.85 : 1 - 0.75 * Math.max(0, t - 0.15));
      for (let i = 0; i < N; i++) { const t = (i + 1) / N * 0.98 + 0.02, s = segs[i]; s.position.copy(pt(t)); s.scale.setScalar(radius(t)); s.visible = s.position.y > -R * 1.2; }
      for (const [i, f] of fins) { const t = (i + 1) / N * 0.98 + 0.02, p = pt(t), p2 = pt(t + 0.02), r = radius(t); f.position.copy(p).add(up.clone().multiplyScalar(r * 0.95)); f.scale.set(0.35 * r, r * 0.9, r * 0.9); f.lookAt(tmp.copy(p2).add(up.clone().multiplyScalar(r * 3))); f.rotateX(Math.PI / 2); f.visible = f.position.y > 0; }
      (o.lumps || []).forEach((t, k) => { if (k >= lumps.length) return; const l = lumps[k]; l.visible = true; l.position.copy(pt(t)); l.scale.setScalar(radius(t) * 1.08); });
      for (let k = (o.lumps || []).length; k < lumps.length; k++) lumps[k].visible = false;
      head.position.copy(Hd); head.scale.setScalar(sc);
      const aim = o.aim ? new THREE.Vector3(...o.aim) : Hd.clone().add(Hd.clone().sub(pt(0.06)).multiplyScalar(4));
      head.lookAt(aim); jawP.rotation.x = 0.5 * clamp(o.mouth ?? 0);
    },
  };
  return S;
};

export const build = () => {
  const H = {};
  const M = {
    sand: toon('#ffffff', sandTex), water: toon('#ffffff', waterTex), thatch: toon('#ffffff', thatchTex), bamboo: toon('#ffffff', bambooTex),
    trunk: toon('#6f5640'), leaf: toon('#2f5a3a'), leaf2: toon('#3f6a42'), wood: toon('#8a5a34'), woodD: toon('#5a3a22'), post: toon('#6a4a2a'),
    rock: toon('#5a5f6a'), cloud: toon('#f2eefc'), cloud2: toon('#dcd6f2'), gold: toon('#f2c440'), mtn: toon('#1f2c44'), fire: unlit('#ffb040'), ember: unlit('#ff7a30'),
  };
  const rnd = P.rng(21);

  // ================= THE SEA (x SX) =================
  plane(320, 1400, M.water, { x: SX, y: 0, z: -660, rx: -Math.PI / 2 });
  for (let i = 0; i < 9; i++) { const r = sph(1.2 + rnd() * 2.2, M.rock, { x: SX - 30 + rnd() * 60, y: 0, z: -20 - rnd() * 60, seg: 8 }); r.scale.y = 0.55; }
  for (const [x, r, h] of [[-120, 40, 16], [110, 50, 20], [10, 30, 10]]) cone(r, h, M.mtn, { x: SX + x, y: h / 2 - 2, z: -220, seg: 7, cast: false });
  H.snake = makeSnake();

  // ================= VILLAGE (x VX) =================
  tbox(140, 0.1, 80, M.sand, { x: VX, y: -0.05, z: 10, tm: 2 });
  plane(240, 1400, unlit('#2c3e72'), { x: VX, y: -0.02, z: -690, rx: -Math.PI / 2 });
  const palm = (x, z, lean = 0.1, hgt = 5) => { const g = group({ x, z }); const n = 6;
    for (let i = 0; i < n; i++) cyl(0.09, 0.1, hgt / n + 0.02, M.trunk, { x: Math.sin(lean) * hgt * (i + 0.5) / n, y: (i + 0.5) * hgt / n, rz: -lean, parent: g, seg: 8 });
    const top = group({ x: Math.sin(lean) * hgt, y: hgt, parent: g });
    for (let i = 0; i < 7; i++) { const f = cone(0.16, 1.6, i % 2 ? M.leaf : M.leaf2, { parent: top, seg: 4 }); f.rotation.set(0, i * 0.9, Math.PI / 2 + 0.45); f.position.set(0.7 * Math.cos(-i * 0.9), -0.25, 0.7 * Math.sin(-i * 0.9)); f.scale.set(1, 1, 0.25); }
    return g; };
  const hut = (x, z, s = 1.4, ry = 0) => { const h = group({ x, z }); h.scale.setScalar(s); h.rotation.y = ry;
    for (const [px, pz] of [[-1, -0.8], [1, -0.8], [-1, 0.8], [1, 0.8]]) cyl(0.06, 0.06, 0.6, M.post, { x: px, y: 0.3, z: pz, parent: h, seg: 8 });
    tbox(2.4, 0.1, 2.0, M.woodD, { y: 0.62, parent: h });
    tbox(2.2, 0.85, 1.8, M.bamboo, { y: 1.1, parent: h, tm: 1 });
    tbox(0.5, 0.6, 0.04, M.woodD, { x: -0.4, y: 0.98, z: 0.91, parent: h });
    tbox(0.45, 0.35, 0.04, toon('#ffcf70'), { x: 0.55, y: 1.15, z: 0.91, parent: h });
    const roof = cone(1.9, 1.0, M.thatch, { y: 2.02, parent: h, seg: 4, ry: Math.PI / 4 }); roof.scale.set(1.0, 1, 0.85);
    return h; };
  hut(VX - 4.5, -3.5, 1.5, 0.3); hut(VX + 5, -4.5, 1.4, -0.3); hut(VX - 11, -7, 1.3, 0.2); hut(VX + 11, -8, 1.3, -0.2);
  palm(VX - 9, -1.5, 0.15); palm(VX + 9.5, -2, -0.15); palm(VX - 22, -6, 0.08, 6); palm(VX + 15, -4, -0.2); palm(VX - 15, -3, 0.2);
  for (let i = 0; i < 10; i++) { const r = sph(0.2 + rnd() * 0.3, M.rock, { x: VX - 10 + rnd() * 20, y: 0.05, z: -12 - rnd() * 2, seg: 7 }); r.scale.y = 0.5; }
  // banca on the shore + bonfire
  const banca = group({ x: VX + 3, z: -13 }); const hull = sph(1, toon('#8a4a2a'), { parent: banca, seg: 12 }); hull.scale.set(2.2, 0.32, 0.42); hull.position.y = 0.1;
  for (const s of [-1, 1]) cyl(0.03, 0.03, 2.6, M.woodD, { x: 0, y: 0.3, z: s * 1.0, rz: Math.PI / 2, parent: banca, seg: 6 });
  H.fire = group({ x: VX, z: 1.2 });
  for (let i = 0; i < 6; i++) { const l = cyl(0.06, 0.06, 1.0, M.woodD, { parent: H.fire, y: 0.08, seg: 6 }); l.rotation.set(Math.PI / 2, i * 0.52, 0); }
  for (let i = 0; i < 8; i++) { const a = i / 8 * 6.28; const r = sph(0.12, M.rock, { parent: H.fire, x: 0.55 * Math.cos(a), y: 0.05, z: 0.55 * Math.sin(a), seg: 6 }); r.scale.y = 0.6; }
  for (const [x, r, h] of [[-90, 50, 18], [80, 60, 22]]) cone(r, h, M.mtn, { x: VX + x, y: h / 2 - 2, z: -200, seg: 7, cast: false });

  // ================= HEAVEN (x KX) =================
  const rc = P.rng(33);
  for (let i = 0; i < 70; i++) { const a = rc() * 6.28, d = rc() < 0.25 ? rc() * 4 : 4 + rc() * 40; const s = sph(1.4 + rc() * 2.6, rc() < 0.5 ? M.cloud : M.cloud2, { x: KX + d * Math.cos(a), y: -1.2 - rc() * 0.8, z: -6 + d * Math.sin(a) * 1.4, seg: 12 }); s.scale.y = 0.45; }
  for (let i = 0; i < 40; i++) { const s = sph(3 + rc() * 5, rc() < 0.5 ? M.cloud : M.cloud2, { x: KX - 80 + rc() * 160, y: -6 - rc() * 6, z: -40 - rc() * 80, seg: 10, cast: false }); s.scale.y = 0.35; }
  // a low golden dais under Bathala
  cyl(1.6, 1.8, 0.3, M.gold, { x: KX, y: -0.15, z: 0, seg: 28 });
  return H;
};
