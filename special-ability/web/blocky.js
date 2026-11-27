// Blocky 3D characters (Roblox-like): rounded-box head with a drawn face, blocky hair, box torso and limbs on joints.
// makeBlocky(spec) -> rig; pose(rig, f, p) sets joints; face changes are cached canvas textures.
import { THREE, scene } from './engine.js';

// ---------- rounded box geometry ----------
const RB = new Map();
export const roundedBox = (w, h, d, r = 0.06, seg = 3) => {
  const key = [w, h, d, r, seg].join();
  if (RB.has(key)) return RB.get(key);
  r = Math.min(r, w / 2 - 1e-3, h / 2 - 1e-3, d / 2 - 1e-3);
  const g = new THREE.BoxGeometry(w, h, d, seg * 2 + 1, seg * 2 + 1, seg * 2 + 1), p = g.attributes.position, n = g.attributes.normal;
  const ix = w / 2 - r, iy = h / 2 - r, iz = d / 2 - r, v = new THREE.Vector3(), c = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    c.set(Math.max(-ix, Math.min(ix, v.x)), Math.max(-iy, Math.min(iy, v.y)), Math.max(-iz, Math.min(iz, v.z)));
    const dir = v.clone().sub(c); if (dir.lengthSq() < 1e-12) dir.fromBufferAttribute(n, i);
    dir.normalize(); p.setXYZ(i, c.x + dir.x * r, c.y + dir.y * r, c.z + dir.z * r); n.setXYZ(i, dir.x, dir.y, dir.z);
  }
  p.needsUpdate = true; n.needsUpdate = true; RB.set(key, g); return g;
};
const mat = new Map();
export const soft = (c) => { if (!mat.has(c)) mat.set(c, new THREE.MeshStandardMaterial({ color: new THREE.Color(c), roughness: 0.78, metalness: 0 })); return mat.get(c); };
const mesh = (geo, m, parent, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; parent.add(o); return o; };
const piv = (parent, x = 0, y = 0, z = 0) => { const g = new THREE.Group(); g.position.set(x, y, z); parent.add(g); return g; };

// ---------- faces ----------
export const EXPR = ['smile', 'happy', 'grin', 'laugh', 'shock', 'wow', 'sad', 'cry', 'angry', 'smug', 'worried', 'neutral', 'blink', 'sleepy', 'dizzy', 'love'];
const faceCache = new Map();
const drawFace = (expr, o) => {
  const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d'); g.scale(2, 2); // 2x for crisp close-ups
  const ink = '#2a1d1a', W = '#ffffff';
  g.lineCap = 'round'; g.lineJoin = 'round';
  const ex = 62, ey = 120, er = 15;
  const eyes = (kind) => {
    for (const s of [-1, 1]) {
      const x = 128 + s * ex;
      if (kind === 'dot') { g.fillStyle = ink; g.beginPath(); g.ellipse(x, ey, 11, 15, 0, 0, 7); g.fill(); }
      else if (kind === 'big') { g.fillStyle = W; g.strokeStyle = ink; g.lineWidth = 7; g.beginPath(); g.ellipse(x, ey, 24, 26, 0, 0, 7); g.fill(); g.stroke(); g.fillStyle = ink; g.beginPath(); g.ellipse(x + 2, ey + 3, 10, 12, 0, 0, 7); g.fill(); }
      else if (kind === 'happy') { g.strokeStyle = ink; g.lineWidth = 9; g.beginPath(); g.arc(x, ey + 8, 16, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); }
      else if (kind === 'line') { g.strokeStyle = ink; g.lineWidth = 9; g.beginPath(); g.moveTo(x - 15, ey + 2); g.lineTo(x + 15, ey + 2); g.stroke(); }
      else if (kind === 'half') { g.fillStyle = ink; g.beginPath(); g.ellipse(x, ey + 4, 13, 9, 0, 0, Math.PI); g.fill(); g.strokeStyle = ink; g.lineWidth = 7; g.beginPath(); g.moveTo(x - 17, ey + 2); g.lineTo(x + 17, ey + 2); g.stroke(); }
      else if (kind === 'x') { g.strokeStyle = ink; g.lineWidth = 8; g.beginPath(); g.moveTo(x - 12, ey - 12); g.lineTo(x + 12, ey + 12); g.moveTo(x + 12, ey - 12); g.lineTo(x - 12, ey + 12); g.stroke(); }
      else if (kind === 'spiral') { g.strokeStyle = ink; g.lineWidth = 5; g.beginPath(); for (let a = 0; a < 12; a += 0.2) g.lineTo(x + Math.cos(a) * a * 1.5, ey + Math.sin(a) * a * 1.5); g.stroke(); }
      else if (kind === 'heart') { g.fillStyle = '#e2453c'; g.beginPath(); g.moveTo(x, ey + 14); g.bezierCurveTo(x - 26, ey - 4, x - 12, ey - 24, x, ey - 8); g.bezierCurveTo(x + 12, ey - 24, x + 26, ey - 4, x, ey + 14); g.fill(); }
    }
  };
  const brows = (inner, outer, lw = 8) => { g.strokeStyle = ink; g.lineWidth = lw; for (const s of [-1, 1]) { const x = 128 + s * ex; g.beginPath(); g.moveTo(x - s * 16, ey - 36 + inner); g.lineTo(x + s * 16, ey - 36 + outer); g.stroke(); } };
  const mouth = (kind) => {
    const my = 182; g.strokeStyle = ink; g.fillStyle = ink; g.lineWidth = 8;
    if (kind === 'smile') { g.beginPath(); g.arc(128, my - 18, 22, Math.PI * 0.2, Math.PI * 0.8); g.stroke(); }
    else if (kind === 'open') { g.fillStyle = '#5a1e28'; g.beginPath(); g.moveTo(98, my - 12); g.quadraticCurveTo(128, my + 34, 158, my - 12); g.closePath(); g.fill(); g.stroke(); g.fillStyle = '#f08a8a'; g.beginPath(); g.ellipse(128, my + 8, 13, 6, 0, 0, 7); g.fill(); }
    else if (kind === 'O') { g.fillStyle = '#5a1e28'; g.beginPath(); g.ellipse(128, my, 14, 18, 0, 0, 7); g.fill(); g.stroke(); }
    else if (kind === 'o') { g.beginPath(); g.ellipse(128, my - 2, 7, 8, 0, 0, 7); g.fill(); }
    else if (kind === 'frown') { g.beginPath(); g.arc(128, my + 14, 20, Math.PI * 1.2, Math.PI * 1.8); g.stroke(); }
    else if (kind === 'flat') { g.beginPath(); g.moveTo(112, my); g.lineTo(144, my); g.stroke(); }
    else if (kind === 'smirk') { g.beginPath(); g.moveTo(108, my - 2); g.quadraticCurveTo(132, my + 6, 150, my - 10); g.stroke(); }
    else if (kind === 'wave') { g.beginPath(); for (let i = 0; i <= 8; i++) g.lineTo(108 + i * 5, my + (i % 2 ? 5 : -3)); g.stroke(); }
    else if (kind === 'teeth') { g.fillStyle = W; g.beginPath(); g.rect(104, my - 12, 48, 20); g.fill(); g.stroke(); g.lineWidth = 4; for (const x of [116, 128, 140]) { g.beginPath(); g.moveTo(x, my - 12); g.lineTo(x, my + 8); g.stroke(); } }
  };
  const blush = (a = 0.45) => { g.fillStyle = `rgba(240,110,110,${a})`; for (const s of [-1, 1]) { g.beginPath(); g.ellipse(128 + s * 80, 160, 17, 10, 0, 0, 7); g.fill(); } };
  const tear = () => { g.fillStyle = '#7fc8ff'; for (const s of [-1, 1]) { g.beginPath(); g.ellipse(128 + s * 66, 158, 7, 14, 0, 0, 7); g.fill(); } };
  const sweat = () => { g.fillStyle = '#9fd8ff'; g.beginPath(); g.ellipse(214, 70, 9, 15, 0, 0, 7); g.fill(); };
  switch (expr) {
    case 'smile': eyes('dot'); mouth('smile'); blush(0.3); break;
    case 'happy': eyes('happy'); mouth('smile'); blush(); break;
    case 'grin': eyes('happy'); mouth('open'); blush(); break;
    case 'laugh': eyes('happy'); brows(-6, -10); mouth('open'); blush(0.6); break;
    case 'shock': eyes('big'); brows(-12, -12); mouth('O'); break;
    case 'wow': eyes('big'); brows(-10, -14); mouth('open'); blush(0.35); break;
    case 'sad': eyes('dot'); brows(-10, 6); mouth('frown'); break;
    case 'cry': eyes('happy'); brows(-10, 6); mouth('wave'); tear(); break;
    case 'angry': eyes('dot'); brows(10, -6, 10); mouth('teeth'); break;
    case 'smug': eyes('half'); brows(0, -6); mouth('smirk'); break;
    case 'worried': eyes('big'); brows(-12, 6); mouth('wave'); sweat(); break;
    case 'neutral': eyes('dot'); mouth('flat'); break;
    case 'blink': eyes('line'); mouth('smile'); break;
    case 'sleepy': eyes('line'); mouth('o'); break;
    case 'dizzy': eyes('spiral'); mouth('wave'); break;
    case 'love': eyes('heart'); mouth('open'); blush(0.6); break;
    default: eyes('dot'); mouth('smile');
  }
  if (o.glasses) { g.strokeStyle = ink; g.lineWidth = 6; for (const s of [-1, 1]) { g.beginPath(); g.arc(128 + s * ex, ey, 30, 0, 7); g.stroke(); } g.beginPath(); g.moveTo(128 - ex + 30, ey); g.lineTo(128 + ex - 30, ey); g.stroke(); }
  if (o.mole) { g.fillStyle = '#2a1a14'; g.beginPath(); g.arc(172, 150, 7.5, 0, 7); g.fill(); }
  if (o.moustache) { g.fillStyle = o.moustache; g.beginPath(); g.ellipse(112, 162, 20, 8, 0.2, 0, 7); g.ellipse(144, 162, 20, 8, -0.2, 0, 7); g.fill(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
};
const faceTex = (expr, o) => { const k = expr + (o.glasses ? 'g' : '') + (o.moustache || '') + (o.mole ? 'm' : ''); if (!faceCache.has(k)) faceCache.set(k, drawFace(expr, o)); return faceCache.get(k); };

// ---------- hair / hats ----------
const hair = (head, s, H) => {
  const col = soft(s.hairColor || '#1e1612'), w = H * 1.04, top = H / 2;
  switch (s.hair || 'blocky') {
    case 'none': break;
    case 'blocky': { // flat top slab + chunky tufts (the default "boy" cut)
      mesh(roundedBox(w, H * 0.3, w, 0.05), col, head, 0, top - H * 0.08, -0.01);
      for (let i = 0; i < 4; i++) for (let k = 0; k < 3; k++) mesh(roundedBox(H * 0.26, H * 0.16, H * 0.3, 0.04), col, head, -H * 0.36 + i * H * 0.24, top + H * 0.1, -H * 0.3 + k * H * 0.28);
      mesh(roundedBox(w, H * 0.5, H * 0.16, 0.04), col, head, 0, top - H * 0.2, -H * 0.46);
      break; }
    case 'curly': { mesh(roundedBox(w, H * 0.28, w, 0.05), col, head, 0, top - H * 0.06, -0.01);
      for (let i = 0; i < 5; i++) for (let k = 0; k < 4; k++) { const b = mesh(new THREE.SphereGeometry(H * 0.12, 10, 8), col, head, -H * 0.42 + i * H * 0.21, top + H * 0.1, -H * 0.4 + k * H * 0.25); b.scale.y = 0.8; }
      break; }
    case 'bun': { mesh(roundedBox(w, H * 0.3, w, 0.05), col, head, 0, top - H * 0.06, -0.01); mesh(new THREE.SphereGeometry(H * 0.22, 16, 12), col, head, 0, top + H * 0.22, -H * 0.05); mesh(roundedBox(w, H * 0.6, H * 0.14, 0.04), col, head, 0, top - H * 0.25, -H * 0.47); break; }
    case 'long': { mesh(roundedBox(w, H * 0.3, w, 0.05), col, head, 0, top - H * 0.06, -0.01); mesh(roundedBox(w * 1.02, H * 1.15, H * 0.2, 0.05), col, head, 0, -H * 0.12, -H * 0.46); for (const sx of [-1, 1]) mesh(roundedBox(H * 0.14, H * 0.95, H * 0.5, 0.04), col, head, sx * H * 0.5, -H * 0.05, -H * 0.2); break; }
    case 'cap': { const cc = soft(s.capColor || '#2b4c9a'); mesh(roundedBox(w, H * 0.3, w, 0.06), cc, head, 0, top, 0); mesh(roundedBox(w * 0.9, H * 0.05, H * 0.45, 0.02), cc, head, 0, top - H * 0.1, H * 0.62); break; }
    case 'bald': { if (s.hairColor) for (const sx of [-1, 1]) mesh(roundedBox(H * 0.08, H * 0.3, H * 0.6, 0.03), col, head, sx * H * 0.51, H * 0.05, -H * 0.1); break; }
    case 'grey': { mesh(roundedBox(w, H * 0.22, w, 0.05), soft('#b8b2aa'), head, 0, top - H * 0.04, -0.01); mesh(new THREE.SphereGeometry(H * 0.18, 14, 10), soft('#b8b2aa'), head, 0, top + H * 0.12, -H * 0.2); break; }
  }
  if (s.hat === 'tophat') { const hc = soft('#22222a'); mesh(new THREE.CylinderGeometry(H * 0.4, H * 0.4, H * 0.55, 20), hc, head, 0, top + H * 0.35, 0); mesh(new THREE.CylinderGeometry(H * 0.62, H * 0.62, H * 0.05, 24), hc, head, 0, top + H * 0.08, 0); }
  if (s.hat === 'salakot') { const m2 = new THREE.Mesh(new THREE.ConeGeometry(H * 0.95, H * 0.45, 24), soft('#c9a05a')); m2.position.set(0, top + H * 0.2, 0); m2.castShadow = true; head.add(m2); }
  if (s.hat === 'crown') { const m2 = new THREE.Mesh(new THREE.CylinderGeometry(H * 0.36, H * 0.34, H * 0.25, 8, 1, true), soft('#f2c440')); m2.position.set(0, top + H * 0.26, 0); head.add(m2); }
  if (s.hat === 'headband') mesh(roundedBox(w * 1.02, H * 0.1, w * 1.02, 0.02), soft(s.bandColor || '#e2453c'), head, 0, top - H * 0.2, 0);
};

// ---------- build ----------
/** spec: { skin, shirt, sleeves?, pants, shoes, hair, hairColor, hat, glasses, moustache, skirt, kid, scale, belly, item } */
export const makeBlocky = (spec = {}, parent = scene) => {
  const s = { skin: '#c48a5e', shirt: '#f2c440', pants: '#2b3b7a', shoes: '#f4f1ea', ...spec };
  const S = (s.kid ? 0.72 : 1) * (s.scale || 1);
  const root = new THREE.Group(); parent.add(root); root.scale.setScalar(S);
  const legH = s.kid ? 0.62 : 0.72, torsoH = 0.7, torsoW = 0.72 * (s.belly || 1), torsoD = 0.4 * (s.belly || 1), H = 0.62, armW = 0.26, armH = 0.68;
  const hips = piv(root, 0, legH, 0);
  const body = piv(hips, 0, 0, 0);
  mesh(roundedBox(torsoW, torsoH, torsoD, 0.07), soft(s.shirt), body, 0, torsoH / 2, 0);
  if (s.skirt) { const sk = new THREE.Mesh(new THREE.CylinderGeometry(torsoW * 0.5, torsoW * 0.72, 0.42, 16), soft(s.skirt)); sk.position.set(0, -0.12, 0); sk.castShadow = true; body.add(sk); }
  if (s.vest) mesh(roundedBox(torsoW * 1.02, torsoH * 0.9, torsoD * 1.02, 0.06), soft(s.vest), body, 0, torsoH * 0.5, 0.005).scale.set(1, 1, 1);
  if (s.sash) { const b = mesh(roundedBox(0.12, 0.9, torsoD + 0.03, 0.02), soft(s.sash), body, 0, torsoH / 2, 0); b.rotation.z = 0.7; }
  if (s.item === 'bag') { mesh(roundedBox(0.5, 0.55, 0.22, 0.06), soft(s.bagColor || '#3f9a4a'), body, 0, torsoH * 0.5, -torsoD / 2 - 0.1); }
  const neck = piv(body, 0, torsoH, 0);
  const head = piv(neck, 0, H / 2 + 0.02, 0);
  mesh(roundedBox(H, H, H, 0.1), soft(s.skin), head, 0, 0, 0);
  const faceMat = new THREE.MeshStandardMaterial({ map: faceTex('smile', s), transparent: true, roughness: 0.8, polygonOffset: true, polygonOffsetFactor: -2 });
  const face = new THREE.Mesh(new THREE.PlaneGeometry(H * 0.88, H * 0.88), faceMat); face.position.set(0, -0.02, H / 2 + 0.002); head.add(face);
  hair(head, s, H);
  const arm = (side) => {
    const sh = piv(body, side * (torsoW / 2 + armW / 2 + 0.005), torsoH - 0.06, 0);
    mesh(roundedBox(armW, armH * 0.55, armW, 0.06), soft(s.sleeves || s.shirt), sh, 0, -armH * 0.25, 0);
    mesh(roundedBox(armW * 0.96, armH * 0.5, armW * 0.96, 0.07), soft(s.skin), sh, 0, -armH * 0.72, 0);
    const hand = piv(sh, 0, -armH, 0); return { sh, hand };
  };
  const leg = (side) => {
    const hp = piv(hips, side * torsoW * 0.25, 0, 0);
    mesh(roundedBox(torsoW * 0.47, legH * 0.92, torsoD * 0.9, 0.06), soft(s.pants), hp, 0, -legH * 0.46, 0);
    mesh(roundedBox(torsoW * 0.5, 0.12, torsoD * 1.15, 0.05), soft(s.shoes), hp, 0, -legH + 0.06, 0.04);
    return hp;
  };
  const A = { L: arm(-1), R: arm(1) }, Lg = { L: leg(-1), R: leg(1) };
  const rig = { root, hips, body, neck, head, face, faceMat, arms: A, legs: Lg, spec: s, S, legH, expr: 'smile', props: {} };
  return rig;
};
export const setFace = (rig, expr) => { if (rig.expr !== expr) { rig.faceMat.map = faceTex(expr, rig.spec); rig.faceMat.needsUpdate = true; rig.expr = expr; } };
/** attach a mesh/group to a hand (right by default); returns it */
export const hold = (rig, obj, side = 'R') => { rig.arms[side].hand.add(obj); return obj; };

// ---------- poses ----------
const D = Math.PI / 180;
/** p: { pos:[x,y,z], yaw (deg), pose:'idle'|'walk'|'run'|'wave'|'cheer'|'point'|'shrug'|'think'|'sit'|'fall'|'jump'|'facepalm'|'hold'|'bow'|'dance'|'pray',
 *       t (phase or 0..1), expr, look:[yawDeg, pitchDeg], lean (deg), blink:true } */
export const pose = (rig, f, p = {}) => {
  const { root, hips, body, neck, arms, legs } = rig, t = p.t ?? f / 30;
  const set = (o, x = 0, y = 0, z = 0) => o.rotation.set(x * D, y * D, z * D);
  root.position.set(...(p.pos || [0, 0, 0])); root.rotation.set(0, (p.yaw || 0) * D, 0);
  hips.position.y = rig.legH; set(hips); set(body, p.lean || 0); set(neck, ...(p.look ? [p.look[1], p.look[0], 0] : [0, 0, 0]));
  for (const k of ['L', 'R']) { set(arms[k].sh, 0, 0, k === 'L' ? -4 : 4); set(legs[k]); }
  const breathe = Math.sin(f * 0.08 + (rig.spec.seed || 0)) * 1.2;
  const sw = (a, ph) => a * Math.sin(t * Math.PI * 2 + ph);
  switch (p.pose || 'idle') {
    case 'idle': set(body, breathe * 0.5 + (p.lean || 0)); set(arms.L.sh, breathe, 0, -5); set(arms.R.sh, -breathe, 0, 5); break;
    case 'walk': { const a = 32; set(legs.L, sw(a, 0)); set(legs.R, sw(a, Math.PI)); set(arms.L.sh, sw(a, Math.PI), 0, -5); set(arms.R.sh, sw(a, 0), 0, 5); hips.position.y = rig.legH + 0.03 * Math.abs(Math.sin(t * Math.PI * 2)); break; }
    case 'run': { const a = 55; set(body, 12 + (p.lean || 0)); set(legs.L, sw(a, 0)); set(legs.R, sw(a, Math.PI)); set(arms.L.sh, sw(70, Math.PI) - 10, 0, -8); set(arms.R.sh, sw(70, 0) - 10, 0, 8); hips.position.y = rig.legH + 0.08 * Math.abs(Math.sin(t * Math.PI * 2)); break; }
    case 'wave': set(arms.R.sh, 0, 0, 150 + 18 * Math.sin(f * 0.45)); set(arms.L.sh, breathe, 0, -5); break;
    case 'cheer': set(arms.L.sh, 0, 0, -160 - 8 * Math.sin(f * 0.5)); set(arms.R.sh, 0, 0, 160 + 8 * Math.sin(f * 0.5)); hips.position.y = rig.legH + 0.06 * Math.max(0, Math.sin(f * 0.5)); break;
    case 'point': set(arms.R.sh, -85, 0, 10); set(arms.L.sh, breathe, 0, -5); break;
    case 'shrug': set(arms.L.sh, -20, 0, -55); set(arms.R.sh, -20, 0, 55); set(neck, 0, 0, 8); break;
    case 'think': set(arms.R.sh, -120, 0, -25); set(arms.L.sh, -30, 0, 25); set(neck, 6, 0, -8); break;
    case 'facepalm': set(arms.R.sh, -140, 0, -20); set(neck, 18); break;
    case 'hold': set(arms.L.sh, -60, 0, 12); set(arms.R.sh, -60, 0, -12); break;
    case 'pray': set(arms.L.sh, -75, 0, 22); set(arms.R.sh, -75, 0, -22); set(neck, -8); break;
    case 'sit': hips.position.y = rig.legH * 0.62; set(legs.L, -90); set(legs.R, -90); set(arms.L.sh, -30, 0, -5); set(arms.R.sh, -30, 0, 5); break;
    case 'fall': { const k = Math.min(1, t); hips.position.y = rig.legH * (1 - 0.55 * k); set(body, -80 * k); set(legs.L, 70 * k); set(legs.R, 85 * k); set(arms.L.sh, 0, 0, -100 * k); set(arms.R.sh, 0, 0, 100 * k); break; }
    case 'jump': { const k = Math.sin(Math.min(1, t) * Math.PI); hips.position.y = rig.legH + 0.6 * k; set(legs.L, -30 * k); set(legs.R, 20 * k); set(arms.L.sh, 0, 0, -150 * k); set(arms.R.sh, 0, 0, 150 * k); break; }
    case 'bow': set(body, 35); set(arms.L.sh, 10); set(arms.R.sh, 10); break;
    case 'dance': { set(body, 0, 0, 8 * Math.sin(f * 0.3)); set(arms.L.sh, 0, 0, -120 + 30 * Math.sin(f * 0.3)); set(arms.R.sh, 0, 0, 120 + 30 * Math.sin(f * 0.3 + 1)); set(legs.L, 20 * Math.max(0, Math.sin(f * 0.3))); set(legs.R, 20 * Math.max(0, -Math.sin(f * 0.3))); break; }
  }
  if (p.armL) set(arms.L.sh, ...p.armL); if (p.armR) set(arms.R.sh, ...p.armR);
  const blink = p.blink !== false && ((f + (rig.spec.seed || 0) * 17) % 97) < 3;
  setFace(rig, blink && ['smile', 'neutral', 'smug', 'sad', 'angry'].includes(p.expr || 'smile') ? 'blink' : (p.expr || 'smile'));
  root.visible = p.visible !== false;
};
