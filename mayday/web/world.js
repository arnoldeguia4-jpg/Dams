// "Why Do Pilots Yell Mayday?" sets: Croydon airfield 1923 (origin), radio room (x 150), sky (x -150, y 40), Paris street (x 300), globe (x 450).
import { THREE, scene, toon, unlit, tbox, cyl, sph, cone, plane, group } from './engine.js';
import * as P from './paint.js';

const M = { wood: toon('#8a5a34'), dark: toon('#2a2a30'), tire: toon('#1f1d22'), white: toon('#f2efe6'), green: toon('#3f6a3a'), cream: toon('#efe2c0'), red: toon('#c0353a'), steel: toon('#6a6f78'), glass: toon('#bcd8ef') };
const lab = (s, w, h, bg, fg, fs = 120) => unlit('#ffffff', P.label(s, { w: 1024, h: Math.round(1024 * h / w), bg, fg, font: `bold ${fs}px Georgia, serif` }));

export const biplane = (o) => {
  const g = group(o);
  tbox(4.6, 0.9, 1.0, M.red, { y: 1.6, parent: g });
  cone(0.5, 1.2, M.red, { x: -2.9, y: 1.7, rz: Math.PI / 2, parent: g, seg: 4 });
  for (const y of [1.15, 2.55]) tbox(1.3, 0.1, 8.0, M.cream, { x: 0.7, y, parent: g });
  for (const z of [-3, -1.2, 1.2, 3]) tbox(0.08, 1.4, 0.08, M.wood, { x: 0.7, y: 1.85, z, parent: g });
  tbox(0.9, 0.1, 2.6, M.cream, { x: -3.2, y: 1.75, parent: g }); tbox(0.8, 0.9, 0.08, M.red, { x: -3.3, y: 2.2, parent: g });
  cyl(0.5, 0.5, 0.5, M.dark, { x: 2.5, y: 1.6, rz: Math.PI / 2, parent: g, seg: 14 });
  const pr = group({ x: 2.82, y: 1.6, parent: g }); tbox(0.06, 2.4, 0.22, M.wood, { parent: pr }); g.userData.prop = pr;
  for (const z of [-0.8, 0.8]) { tbox(0.08, 0.9, 0.08, M.dark, { x: 1.4, y: 0.7, z, parent: g }); cyl(0.32, 0.32, 0.18, M.tire, { x: 1.4, y: 0.32, z, rx: Math.PI / 2, parent: g, seg: 14 }); }
  for (const s of [-1, 1]) { const c = plane(0.6, 0.6, lab('', 1, 1, '#ffffff', '#fff'), { x: 0.7, y: 2.62, z: s * 2.8, rx: -Math.PI / 2, parent: g }); c.material = unlit('#2b4c9a'); }
  return g;
};

export const build = () => {
  const H = {};
  // ---------------- airfield (origin) ----------------
  tbox(1400, 0.1, 400, toon('#ffffff', P.grass('#6f9a45', 7)), { y: -0.05, tm: 10 });
  tbox(120, 0.03, 8, toon('#8a8a78'), { y: 0.02, z: 4 });
  const tw = group({ x: -6, z: -8 });
  tbox(4, 4, 4, toon('#ffffff', P.plaster('#e9e0c9', 3)), { y: 2, parent: tw }); tbox(3.4, 1.6, 3.4, M.glass, { y: 4.8, parent: tw }); tbox(4.2, 0.3, 4.2, M.dark, { y: 5.75, parent: tw });
  plane(3.6, 0.7, lab('CROYDON', 3.6, 0.7, '#2b3b7a', '#f2efe6', 150), { y: 3.3, z: 2.03, parent: tw });
  cyl(0.06, 0.06, 4, M.steel, { x: 1.6, y: 7.7, z: 1.6, parent: tw, seg: 6 }); for (let k = 0; k < 3; k++) tbox(0.06, 0.06, 1.2 - k * 0.3, M.steel, { x: 1.6, y: 8.6 + k * 0.5, z: 1.6, parent: tw });
  const hg = cyl(5, 5, 12, toon('#9aa3a8'), { x: 10, y: 0, z: -12, rx: Math.PI / 2, seg: 20 }); hg.scale.set(1, 1, 0.7);
  for (let i = 0; i < 8; i++) { const t = group({ x: -50 + i * 14, z: -30 - (i % 2) * 5 }); cyl(0.25, 0.35, 3, M.wood, { y: 1.5, parent: t, seg: 6 }); sph(2.4, M.green, { y: 4.4, parent: t, seg: 12 }); }
  for (let i = 0; i < 8; i++) { const c = plane(40, 18, unlit('#ffffff', P.cloudTex(i + 3), { transparent: true, fog: false, depthWrite: false }), { x: -160 + i * 60, y: 45 + (i % 3) * 10, z: -200 }); c.userData.noND = true; }
  H.parked = biplane({ x: 7, z: -2, ry: 0.5 });
  // ---------------- radio room (x 150) ----------------
  const R = group({ x: 150 });
  tbox(14, 0.1, 10, toon('#ffffff', P.planks('#7a5a3a', 21, 6)), { y: 0.06, parent: R, tm: 1.4 });
  tbox(14, 5, 0.2, toon('#ffffff', P.plaster('#cfc2a4', 22)), { y: 2.5, z: -3, parent: R });
  tbox(2.6, 0.1, 1.1, M.wood, { y: 0.85, z: -2.2, parent: R }); tbox(2.5, 0.8, 1.0, toon('#5a3a22'), { y: 0.42, z: -2.2, parent: R });
  const rad = group({ y: 0.9, z: -2.4, parent: R }); tbox(1.6, 1.0, 0.6, toon('#4a3a2a'), { y: 0.5, parent: rad });
  for (let i = 0; i < 3; i++) { cyl(0.11, 0.11, 0.04, toon('#d9c9a6'), { x: -0.5 + i * 0.5, y: 0.35, z: 0.31, rx: Math.PI / 2, parent: rad, seg: 12 }); }
  H.tubes = []; for (let i = 0; i < 4; i++) { const tb = cyl(0.07, 0.07, 0.3, unlit('#ffb050'), { x: -0.45 + i * 0.3, y: 1.15, parent: rad, seg: 8 }); tb.userData.noND = true; H.tubes.push(tb); }
  plane(0.9, 0.3, lab('RADIO', 0.9, 0.3, '#2a2030', '#f2d98a', 150), { y: 0.8, z: 0.31, parent: rad });
  const mp = document.createElement('canvas'); mp.width = 1024; mp.height = 768; const g = mp.getContext('2d');
  g.fillStyle = '#cfe3f2'; g.fillRect(0, 0, 1024, 768); g.fillStyle = '#9ac27a';
  g.beginPath(); g.moveTo(80, 0); g.lineTo(560, 0); g.lineTo(600, 220); g.lineTo(520, 330); g.lineTo(300, 300); g.lineTo(120, 260); g.closePath(); g.fill();
  g.beginPath(); g.moveTo(330, 768); g.lineTo(380, 470); g.lineTo(640, 400); g.lineTo(1024, 380); g.lineTo(1024, 768); g.closePath(); g.fill();
  g.strokeStyle = '#2a2030'; g.lineWidth = 8; g.strokeRect(4, 4, 1016, 760);
  g.fillStyle = '#2a2030'; g.font = 'bold 64px Georgia, serif'; g.textAlign = 'center'; g.fillText('LONDON', 420, 170); g.fillText('PARIS', 700, 620);
  g.beginPath(); g.arc(420, 210, 16, 0, 7); g.fill(); g.beginPath(); g.arc(700, 560, 16, 0, 7); g.fill();
  g.setLineDash([24, 18]); g.strokeStyle = '#c0353a'; g.lineWidth = 12; g.beginPath(); g.moveTo(420, 210); g.quadraticCurveTo(470, 420, 700, 560); g.stroke();
  plane(2.6, 1.95, unlit('#ffffff', P.ctex(mp, false)), { x: 2.6, y: 2.6, z: -2.88, parent: R });
  plane(2.2, 0.5, lab('RADIO ROOM', 2.2, 0.5, '#2b3b7a', '#f2efe6', 110), { x: -1.2, y: 4.1, z: -2.88, parent: R });
  tbox(1.6, 1.4, 0.1, M.glass, { x: -2.8, y: 2.5, z: -2.88, parent: R });
  // ---------------- sky (x -150, y 40) ----------------
  H.sky = group({ x: -150, y: 40 });
  for (let i = 0; i < 14; i++) { const c = plane(14, 6, unlit('#ffffff', P.cloudTex(i + 1), { transparent: true, depthWrite: false }), { x: -40 + i * 7, y: -6 + (i % 4) * 4, z: -10 - (i % 3) * 8, parent: H.sky }); c.userData.noND = true; }
  H.flyer = biplane({ parent: H.sky, x: 0, y: -1.6, z: 0 });
  // ---------------- Paris (x 300) ----------------
  const Pz = group({ x: 300 });
  tbox(30, 0.1, 20, toon('#ffffff', P.cobble('#b8b0a0', 6)), { y: 0.06, parent: Pz, tm: 2 });
  for (let i = 0; i < 5; i++) { tbox(4, 4, 4, toon(['#e9e0c9', '#d9c9a6', '#efe6cf'][i % 3]), { x: -10 + i * 5, y: 2, z: -8, parent: Pz }); tbox(4.2, 1.0, 4.2, toon('#5d6470'), { x: -10 + i * 5, y: 4.5, z: -8, parent: Pz }); }
  const ef = group({ x: 4, z: -30, parent: Pz }); const iron = toon('#6a5a4a');
  for (const [x, z] of [[-3, -3], [3, -3], [-3, 3], [3, 3]]) { const l = tbox(0.8, 12, 0.8, iron, { x: x * 0.7, y: 6, z: z * 0.7, parent: ef }); l.rotation.z = -x * 0.04; l.rotation.x = z * 0.04; }
  tbox(5, 0.6, 5, iron, { y: 8, parent: ef }); cone(2.2, 16, iron, { y: 20, parent: ef, seg: 4 }).rotation.y = Math.PI / 4; tbox(3, 0.4, 3, iron, { y: 15, parent: ef });
  // ---------------- globe (x 450) ----------------
  const gc = document.createElement('canvas'); gc.width = 1024; gc.height = 512; const gg = gc.getContext('2d'); gg.fillStyle = '#3f7fb5'; gg.fillRect(0, 0, 1024, 512); gg.fillStyle = '#6fae4a';
  const r = P.rng(9); for (let i = 0; i < 14; i++) { gg.beginPath(); const x = r() * 1024, y = 80 + r() * 350; gg.ellipse(x, y, 40 + r() * 90, 30 + r() * 70, r() * 3, 0, 7); gg.fill(); }
  H.globe = sph(3, toon('#ffffff', P.ctex(gc, false)), { x: 450, y: 4, z: -2, seg: 32 });
  for (let i = 0; i < 6; i++) { const c = plane(40, 18, unlit('#ffffff', P.cloudTex(i + 3), { transparent: true, fog: false, depthWrite: false }), { x: 330 + i * 50, y: 40, z: -150 }); c.userData.noND = true; }
  return H;
};
