// "Why Is It Called a Popsicle?" sets: Oakland porch 1905 (origin), 1920s kitchen (x 150), patent office (x -150).
import { THREE, scene, toon, unlit, tbox, cyl, sph, cone, plane, group } from './engine.js';
import * as P from './paint.js';

const M = { wood: toon('#8a5a34'), dark: toon('#2a2a30'), white: toon('#f2efe6'), green: toon('#3f6a3a'), glass: toon('#d8eef3') };
const lab = (s, w, h, bg, fg, fs = 120) => unlit('#ffffff', P.label(s, { w: 1024, h: Math.round(1024 * h / w), bg, fg, font: `bold ${fs}px Georgia, serif` }));

export const build = () => {
  const H = {};
  // ---------------- porch 1905 (origin) ----------------
  tbox(400, 0.1, 300, toon('#ffffff', P.grass('#6f9a45', 7)), { y: -0.05, tm: 10 });
  tbox(12, 0.5, 4, toon('#ffffff', P.planks('#9a7a5a', 11, 6)), { y: 0.25, z: -1.5, tm: 1.2 });
  for (let k = 0; k < 3; k++) tbox(2.4, 0.16, 0.35, toon('#8a6a4a'), { x: 0, y: 0.08 + k * 0.16, z: 0.65 - k * 0.3 });
  tbox(12, 5, 0.2, toon('#ffffff', P.weatherboard('#efe6cf', 33)), { y: 2.5, z: -3.4 });
  tbox(1.2, 2.2, 0.1, toon('#6a4a2e'), { x: -1.8, y: 1.6, z: -3.28 }); tbox(1.3, 1.2, 0.1, toon('#bcd8ef'), { x: 2.0, y: 2.2, z: -3.28 });
  for (let i = 0; i < 9; i++) { if (Math.abs(-4 + i) < 1.3) continue; tbox(0.08, 0.8, 0.08, M.white, { x: -4 + i, y: 0.9, z: 0.2 }); }
  tbox(3.0, 0.08, 0.1, M.white, { x: -2.9, y: 1.3, z: 0.2 }); tbox(3.0, 0.08, 0.1, M.white, { x: 2.9, y: 1.3, z: 0.2 });
  const tbl = group({ x: 1.6, y: 0.5, z: -1.0 }); cyl(0.4, 0.4, 0.06, M.wood, { y: 0.7, parent: tbl, seg: 16 }); cyl(0.05, 0.05, 0.7, M.dark, { y: 0.35, parent: tbl, seg: 8 });
  H.cupG = group({ x: 1.6, y: 1.26, z: -1.0 });
  H.cup = cyl(0.11, 0.09, 0.26, toon('#d8eef3', null, { transparent: true, opacity: 0.8 }), { y: 0.13, parent: H.cupG, seg: 16 });
  H.drink = cyl(0.1, 0.085, 0.2, toon('#e2453c'), { y: 0.11, parent: H.cupG, seg: 16 });
  H.stick = tbox(0.03, 0.34, 0.012, toon('#d9b07a'), { y: 0.3, parent: H.cupG }); H.stick.rotation.z = 0.12;
  H.frost = []; for (let i = 0; i < 18; i++) { const s = sph(0.05 + (i % 3) * 0.02, unlit('#e6f6ff'), { x: -5 + (i * 0.7) % 10, y: 0.03, z: -2.8 + (i * 0.37) % 3.5, seg: 6 }); s.scale.set(2, 0.3, 2); s.userData.noND = true; H.frost.push(s); }
  for (let i = 0; i < 6; i++) { const t = group({ x: -14 + i * 6, z: -10 - (i % 2) * 4 }); cyl(0.25, 0.35, 3, M.wood, { y: 1.5, parent: t, seg: 6 }); sph(2.2, M.green, { y: 4.2, parent: t, seg: 12 }); }
  H.oak = plane(1.6, 0.45, lab('OAKLAND', 1.6, 0.45, '#2a2030', '#f2d98a', 130), { x: -0.6, y: 3.3, z: -3.28 });
  for (let i = 0; i < 6; i++) { const c = plane(40, 18, unlit('#ffffff', P.cloudTex(i + 3), { transparent: true, fog: false, depthWrite: false }), { x: -120 + i * 50, y: 45 + (i % 3) * 10, z: -200 }); c.userData.noND = true; }
  H.moon = sph(4, unlit('#fff6d0'), { x: 30, y: 60, z: -150, seg: 16 }); H.moon.userData.noND = true;
  // ---------------- kitchen 1920s (x 150) ----------------
  const K = group({ x: 150 });
  tbox(14, 0.1, 10, toon('#ffffff', P.tiles('#e8e0d0', '#a09080', 5, 8)), { y: 0.06, parent: K, tm: 1.5 });
  tbox(14, 5, 0.2, toon('#cfe3d0'), { y: 2.5, z: -3, parent: K });
  tbox(1.2, 2.0, 0.8, toon('#e8e2d2'), { x: -2.6, y: 1.0, z: -2.5, parent: K }); tbox(0.08, 0.3, 0.06, M.dark, { x: -2.15, y: 1.4, z: -2.08, parent: K });
  tbox(3.0, 0.9, 0.9, toon('#8a6a4a'), { x: 1.4, y: 0.45, z: -2.4, parent: K }); tbox(3.1, 0.06, 1.0, toon('#e8e2d2'), { x: 1.4, y: 0.93, z: -2.4, parent: K });
  plane(1.4, 0.45, lab('ICEBOX', 1.4, 0.45, '#2b4c9a', '#ffffff', 130), { x: -2.6, y: 2.3, z: -2.08, parent: K });
  H.y20 = plane(1.5, 0.5, lab('1920s', 1.5, 0.5, '#f2efe6', '#2a2030', 140), { x: -0.2, y: 3.35, z: -2.88, parent: K });
  // ---------------- patent office (x -150) ----------------
  const O = group({ x: -150 });
  tbox(14, 0.1, 10, toon('#ffffff', P.planks('#6a4a2e', 41, 6)), { y: 0.06, parent: O, tm: 1.4 });
  tbox(14, 5, 0.2, toon('#ffffff', P.plaster('#d9c9a6', 52)), { y: 2.5, z: -3, parent: O });
  tbox(2.6, 0.08, 1.2, M.wood, { y: 0.9, z: -1.6, parent: O }); tbox(2.5, 0.84, 1.1, toon('#5a3a22'), { y: 0.45, z: -1.6, parent: O });
  const pc = document.createElement('canvas'); pc.width = 700; pc.height = 900; const g = pc.getContext('2d');
  g.fillStyle = '#f4ecd2'; g.fillRect(0, 0, 700, 900); g.strokeStyle = '#2a2030'; g.lineWidth = 12; g.strokeRect(8, 8, 684, 884);
  g.fillStyle = '#2a2030'; g.textAlign = 'center'; g.font = 'bold 56px Georgia, serif'; g.fillText('U.S. PATENT', 350, 110); g.font = 'italic 40px Georgia, serif'; g.fillText('1924', 350, 170);
  g.fillStyle = '#c0353a'; g.font = 'bold 120px Georgia, serif'; g.fillText('POPSICLE', 350, 360);
  g.fillStyle = '#2a2030'; g.font = 'italic 40px Georgia, serif'; g.fillText('F. W. Epperson', 350, 450);
  g.fillStyle = '#8a8070'; for (let i = 0; i < 6; i++) g.fillRect(90, 520 + i * 40, 520, 10);
  g.fillStyle = '#c0353a'; g.beginPath(); g.arc(560, 790, 60, 0, 7); g.fill();
  H.doc = plane(1.4, 1.8, unlit('#ffffff', P.ctex(pc, false)), { x: -150, y: 2.3, z: -2.88 });
  return H;
};
