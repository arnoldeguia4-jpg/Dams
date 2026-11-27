// Cast for "The Day It Rained Meat" (Bath County, Kentucky, March 3, 1876).
import { Pen, bodyFront, INK, fxBurst, fxPuff, fxStars } from './toonbase.js';
export { Pen, INK, fxBurst, fxPuff, fxStars };

const farmHat = (col = '#b08a4a') => (p, h) => { const { cx, crown, HH, W, u } = h; p.ell(cx, crown + 0.2 * HH, 0.66 * W, 0.08 * HH, col, 2.4 * u); p.poly([[cx - 0.33 * W, crown + 0.2 * HH], [cx - 0.27 * W, crown - 0.14 * HH], [cx + 0.27 * W, crown - 0.14 * HH], [cx + 0.33 * W, crown + 0.2 * HH]], col, 2.4 * u); p.band([[cx - 0.32 * W, crown + 0.12 * HH], [cx + 0.32 * W, crown + 0.12 * HH]], '#5a3a22', 0.05 * HH, 1 * u); };
const beard = (col) => (p, h) => { const { cx, crown, HH, W, u } = h; p.poly([[cx - 0.46 * W, crown + 0.58 * HH], [cx - 0.4 * W, crown + 0.9 * HH], [cx - 0.18 * W, crown + 1.08 * HH], [cx, crown + 1.14 * HH], [cx + 0.18 * W, crown + 1.08 * HH], [cx + 0.4 * W, crown + 0.9 * HH], [cx + 0.46 * W, crown + 0.58 * HH], [cx + 0.3 * W, crown + 0.8 * HH], [cx + 0.12 * W, crown + 0.88 * HH], [cx - 0.12 * W, crown + 0.88 * HH], [cx - 0.3 * W, crown + 0.8 * HH]], col, 2.2 * u); };
const glasses = (p, h) => { const { cx, crown, HH, W, u } = h; for (const s of [-1, 1]) p.ell(cx + s * 0.17 * W, crown + 0.5 * HH, 0.12 * W, 0.09 * HH, null, 2.4 * u); p.stroke([[cx - 0.05 * W, crown + 0.5 * HH], [cx + 0.05 * W, crown + 0.5 * HH]], 2 * u); };
const apron = (p, c) => { const { tcx, chin, HH, u } = c; p.poly([[tcx - 26 * u, chin + 0.3 * HH], [tcx + 26 * u, chin + 0.3 * HH], [tcx + 32 * u, chin + 0.95 * HH], [tcx - 32 * u, chin + 0.95 * HH]], '#f4f1ea', 1.8 * u); };
const labcoat = (p, c) => { const { tcx, chin, HH, u } = c; p.stroke([[tcx - 18 * u, chin + 0.02 * HH], [tcx - 4 * u, chin + 0.4 * HH]], 3 * u); p.stroke([[tcx + 18 * u, chin + 0.02 * HH], [tcx + 4 * u, chin + 0.4 * HH]], 3 * u); p.poly([[tcx - 6 * u, chin + 0.02 * HH], [tcx + 6 * u, chin + 0.02 * HH], [tcx, chin + 0.3 * HH]], '#7a2a2a', 1.2 * u); };

export const OUT = {
  crouch: { id: 'crouch', o: { jacket: '#7a5aa8', pants: '#7a5aa8', boots: '#3a2a22', hat: 'bonnet', hair: '#6a4a2a', skin: '#f2c49a', dress: '#7a5aa8', buttons: '#f4f1ea' }, extra: apron, seed: 3 },
  man1: { id: 'man1', o: { jacket: '#8a5a3a', pants: '#3b4a6a', boots: '#3a2a22', hat: 'hair', hair: '#6a4a2a', skin: '#f2c49a', buttons: '#5a3a22' }, head: (p, h) => { beard('#6a4a2a')(p, h); farmHat()(p, h); }, seed: 9 },
  man2: { id: 'man2', o: { jacket: '#3a6a8a', pants: '#5a4a3a', boots: '#3a2a22', hat: 'cap', cap: '#4a5a3a', hair: '#2a201a', skin: '#e9b07f', buttons: '#f4f1ea', moustache: '#2a201a' }, seed: 15 },
  n1: { id: 'n1', o: { jacket: '#c2453c', pants: '#3a3a44', boots: '#3a2a22', hat: 'bonnet', hair: '#c9a46a', skin: '#ffe2c2', dress: '#c2453c', buttons: '#f4f1ea' }, seed: 21 },
  n2: { id: 'n2', o: { jacket: '#5a8a4a', pants: '#4a3a2a', boots: '#3a2a22', hat: 'hair', hair: '#8a5a34', skin: '#f5d6b4', buttons: '#e8c45a', build: 'kid' }, seed: 25 },
  n3: { id: 'n3', o: { jacket: '#6a5a4a', pants: '#3a3a44', boots: '#3a2a22', hat: 'hair', hair: '#d9d4c4', skin: '#e9c8a0', buttons: '#c9a040', build: 'stout' }, head: farmHat('#7a6a4a'), seed: 29 },
  sci1: { id: 'sci1', o: { jacket: '#f2f0ea', pants: '#2a2a34', boots: '#1d1a1a', hat: 'hair', hair: '#d9d4c4', skin: '#f5d6b4', buttons: '#d9d4c4', moustache: '#d9d4c4' }, extra: labcoat, head: glasses, seed: 33 },
  sci2: { id: 'sci2', o: { jacket: '#f2f0ea', pants: '#3a3a44', boots: '#1d1a1a', hat: 'hair', hair: '#3a2a20', skin: '#e9b07f', buttons: '#d9d4c4', build: 'stout' }, extra: labcoat, head: beard('#3a2a20'), seed: 37 },
};

export const ARM = {
  hang: [14, 45, 17, 86], up: [16, -28, 22, -82], point: [32, -2, 64, -14], hip: [28, 28, 6, 52], cross: [22, 30, -14, 22],
  shrug: [30, 14, 44, -12], hold: [18, 42, -6, 52, true], holdHi: [20, 30, -4, 20, true], eat: [22, 30, -10, -2, true], cheer: [20, -30, 34, -80],
  stirA: [24, 36, 30, 60, true], stirB: [26, 30, 46, 52, true], shade: [20, 0, -2, -40], wave: [22, -20, 34, -66], chalk: [26, -6, 54, -30, true], scope: [24, 30, 20, 40, true],
};

const meatPiece = (p, x, y, u) => { p.ell(x, y - 10 * u, 16 * u, 11 * u, '#b8434a', 2 * u); p.ell(x - 4 * u, y - 13 * u, 6 * u, 3 * u, '#e88a8a', 0); p.dot(x, y, 5.5 * u); };
export const PROP = {
  paddle: (p, x, y, u) => { p.band([[x, y], [x + 10 * u, y + 60 * u]], '#7a5230', 6 * u, 1.4 * u); p.ell(x + 12 * u, y + 66 * u, 9 * u, 14 * u, '#7a5230', 1.6 * u); p.dot(x, y, 5.5 * u); },
  meat: meatPiece,
  chalk: (p, x, y, u) => { p.band([[x, y], [x + 6 * u, y - 14 * u]], '#f4f1ea', 5 * u, 1.2 * u); p.dot(x, y, 5.5 * u); },
  none: () => {},
};

export const drawChar = (g, s) => {
  const C = s.who;
  g.save(); g.scale(g.canvas.width / 600, g.canvas.height / 1000);
  if (s.flipX) { g.translate(600, 0); g.scale(-1, 1); }
  const p = new Pen(g);
  bodyFront(p, C.o, {
    phase: s.phase || 0, expr: s.expr || 'neutral', mode: s.mode || 'stand', look: s.look || 0, blink: s.blink || 0, lift: 50,
    tilt: s.tilt || 0, headTilt: s.headTilt || 0, wave: s.wave, facing: s.facing || 0, seed: C.seed || 1,
    armL: s.armL, armR: s.armR,
    extra: C.extra, headExtra: (pp, h) => { if (C.head) C.head(pp, h); if (s.head) s.head(pp, h); },
    hold: (pp, h) => {
      if (s.propR && h.R) (PROP[s.propR] || PROP.none)(pp, h.R[0], h.R[1], h.u);
      if (s.propL && h.L) (PROP[s.propL] || PROP.none)(pp, h.L[0], h.L[1], h.u);
    },
  });
  g.restore();
};
/** green-faced realisation overlay for the twist (drawn over the face) */
export const queasy = (p, h) => { const { cx, crown, HH, W, u } = h; p.g.save(); p.g.globalAlpha = 0.35; p.ell(cx, crown + 0.68 * HH, 0.42 * W, 0.22 * HH, '#7ac06a', 0); p.g.restore(); };

// ---------------- fx ----------------
export const glow = (g, rgb = '255,236,170', a = 0.8) => { const s = g.canvas.width, gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2); gr.addColorStop(0, `rgba(${rgb},${a})`); gr.addColorStop(0.4, `rgba(${rgb},${a * 0.45})`); gr.addColorStop(1, `rgba(${rgb},0)`); g.fillStyle = gr; g.fillRect(0, 0, s, s); };
export const drawText = (g, txt, { col = '#ffffff', font = 'bold 230px Georgia, serif', stroke = INK, lw = 22 } = {}) => {
  const w = g.canvas.width, h = g.canvas.height; g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.lineWidth = lw; g.strokeStyle = stroke; g.lineJoin = 'round'; g.strokeText(txt, w / 2, h / 2, w * 0.94); g.fillStyle = col; g.fillText(txt, w / 2, h / 2, w * 0.94);
};
const chunk = (g, x, y, s, rot, k) => { g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  g.lineWidth = 5; g.strokeStyle = '#4a1418'; g.fillStyle = k % 3 === 0 ? '#c0444c' : k % 3 === 1 ? '#a83a42' : '#d0606a';
  g.beginPath(); g.moveTo(-26, -8); g.bezierCurveTo(-20, -24, 18, -22, 26, -6); g.bezierCurveTo(30, 10, 10, 20, -6, 18); g.bezierCurveTo(-24, 16, -32, 4, -26, -8); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = 'rgba(255,220,220,0.75)'; g.beginPath(); g.ellipse(-6, -6, 10, 3.5, -0.3, 0, 7); g.fill(); g.restore(); };
/** falling meat flakes over t seconds on a 1024 canvas (density 0..1) */
export const drawMeatRain = (g, t, { n = 40, seed = 1, density = 1, speed = 1 } = {}) => { const s = g.canvas.width; g.save(); g.scale(s / 1024, s / 1024);
  const m = Math.round(n * density);
  for (let i = 0; i < m; i++) { const r1 = Math.abs(Math.sin(i * 12.9898 + seed) * 43758.5453) % 1, r2 = Math.abs(Math.sin(i * 78.233 + seed) * 12345.678) % 1;
    const x = (r1 * 1024 + 30 * Math.sin(t * 1.5 + i)) % 1024, y = ((r2 * 1100) + t * (380 + 220 * r1) * speed) % 1150 - 60;
    chunk(g, x, y, 0.7 + 0.8 * r2, t * (1.5 + r1 * 3) + i, i); }
  g.restore(); };
/** one meat chunk lying on the ground (512) */
export const drawMeat = (g, k = 0, big = false) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); g.fillStyle = 'rgba(0,0,0,0.18)'; g.beginPath(); g.ellipse(256, 330, 150, 34, 0, 0, 7); g.fill(); chunk(g, 256, 280, big ? 5.2 : 4, -0.15, k); g.restore(); };
/** a field scattered with meat flakes seen from above (1024) */
export const drawScatter = (g, cover = 1) => { const s = g.canvas.width; g.save(); g.scale(s / 1024, s / 1024);
  const m = Math.round(160 * cover); for (let i = 0; i < m; i++) { const r1 = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1, r2 = Math.abs(Math.sin(i * 78.233) * 12345.678) % 1; chunk(g, r1 * 1024, r2 * 1024, 0.55, i, i); } g.restore(); };
/** vulture in flight, side view (512); flap 0..1; sick = queasy face */
export const drawVulture = (g, flap = 0, { sick = 0, facing = 1 } = {}) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); if (facing < 0) { g.translate(512, 0); g.scale(-1, 1); }
  const w = Math.sin(flap * Math.PI * 2); g.lineWidth = 9; g.strokeStyle = INK; g.lineJoin = 'round';
  g.fillStyle = '#2a2428';
  g.beginPath(); g.moveTo(230, 250); g.lineTo(60, 250 - 150 * w); g.lineTo(110, 270 - 90 * w); g.lineTo(150, 270 - 120 * w); g.lineTo(240, 280); g.closePath(); g.fill(); g.stroke();
  g.beginPath(); g.ellipse(250, 270, 110, 52, -0.08, 0, 7); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(140, 270); g.lineTo(70, 300); g.lineTo(150, 300); g.closePath(); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(270, 250); g.lineTo(440, 250 - 150 * w); g.lineTo(400, 270 - 90 * w); g.lineTo(360, 268 - 120 * w); g.lineTo(290, 285); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#e8e2d8'; g.beginPath(); g.ellipse(340, 238, 24, 16, 0, 0, 7); g.fill(); g.stroke();
  g.fillStyle = sick > 0.5 ? '#9ad08a' : '#c0444c'; g.beginPath(); g.ellipse(380, 222, 30, 26, 0, 0, 7); g.fill(); g.stroke();
  g.fillStyle = '#e8d8a0'; g.beginPath(); g.moveTo(404, 216); g.quadraticCurveTo(440, 214, 438, 236); g.lineTo(406, 232); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#ffffff'; g.beginPath(); g.arc(384, 214, 9, 0, 7); g.fill(); g.fillStyle = INK; g.beginPath(); g.arc(sick > 0.5 ? 384 : 387, 214, sick > 0.5 ? 6 : 4.5, 0, 7); g.fill();
  if (sick > 0.5) { g.lineWidth = 5; g.beginPath(); g.moveTo(372, 200); g.lineTo(396, 206); g.stroke(); }
  g.restore(); };
/** speech bubble with an icon ('sheep'|'deer') and a word (1024x768) */
export const drawBubble = (g, word, icon) => { const w = g.canvas.width, h = g.canvas.height; g.save();
  g.fillStyle = '#ffffff'; g.strokeStyle = INK; g.lineWidth = 16; g.beginPath(); g.ellipse(w / 2, h * 0.42, w * 0.46, h * 0.36, 0, 0, 7); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(w * 0.32, h * 0.72); g.lineTo(w * 0.2, h * 0.96); g.lineTo(w * 0.44, h * 0.76); g.fill(); g.stroke();
  g.fillStyle = '#ffffff'; g.beginPath(); g.ellipse(w / 2, h * 0.42, w * 0.44, h * 0.34, 0, 0, 7); g.fill();
  g.save(); g.translate(w * 0.3, h * 0.42); g.scale(1.1, 1.1);
  g.lineWidth = 8; g.strokeStyle = INK;
  if (icon === 'sheep') { g.fillStyle = '#f4f1ea'; for (const [x, y] of [[-40, -10], [0, -28], [40, -10], [-20, 18], [22, 18]]) { g.beginPath(); g.arc(x, y, 34, 0, 7); g.fill(); g.stroke(); } g.fillStyle = '#3a3438'; g.beginPath(); g.ellipse(74, -8, 26, 22, 0, 0, 7); g.fill(); g.stroke(); }
  else { g.fillStyle = '#a8743f'; g.beginPath(); g.ellipse(0, 10, 70, 40, 0, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.ellipse(70, -30, 28, 24, 0, 0, 7); g.fill(); g.stroke(); g.strokeStyle = '#6a4428'; g.lineWidth = 9; g.beginPath(); g.moveTo(64, -50); g.lineTo(50, -100); g.moveTo(54, -78); g.lineTo(30, -96); g.moveTo(82, -50); g.lineTo(98, -100); g.moveTo(92, -78); g.lineTo(118, -94); g.stroke(); }
  g.restore();
  g.font = 'bold 128px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#2a1a1e'; g.fillText(word, w * 0.66, h * 0.42, w * 0.42);
  g.restore(); };
/** tear-off calendar page (512x640) */
export const drawCalendar = (g, top, mid, bot) => { const w = g.canvas.width, h = g.canvas.height; g.save();
  g.fillStyle = '#f7f3ea'; g.strokeStyle = INK; g.lineWidth = 12; g.beginPath(); g.rect(30, 40, w - 60, h - 70); g.fill(); g.stroke();
  g.fillStyle = '#b8343c'; g.fillRect(30, 40, w - 60, 140); g.strokeRect(30, 40, w - 60, 140);
  g.fillStyle = '#ffffff'; g.font = 'bold 92px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(top, w / 2, 112, w - 100);
  g.fillStyle = '#2a1a1e'; g.font = 'bold 260px Georgia, serif'; g.fillText(mid, w / 2, 340, w - 100);
  g.font = 'bold 84px Georgia, serif'; g.fillStyle = '#5a4a3a'; g.fillText(bot, w / 2, 520, w - 100);
  for (let i = 0; i < 5; i++) { g.fillStyle = '#5a5a60'; g.beginPath(); g.arc(90 + i * 85, 40, 12, 0, 7); g.fill(); }
  g.restore(); };
/** chalk text on a slate (1024x512) */
export const drawChalk = (g, lines) => { const w = g.canvas.width, h = g.canvas.height; g.save();
  g.fillStyle = '#2f3a34'; g.fillRect(0, 0, w, h); g.strokeStyle = '#8a5a34'; g.lineWidth = 36; g.strokeRect(0, 0, w, h);
  g.fillStyle = '#f4f1ea'; g.font = 'bold 150px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
  lines.forEach((t, i) => { if (!t) return; g.fillStyle = i ? '#f2d27a' : '#f4f1ea'; g.fillText(t, w / 2, h * (lines.length === 1 ? 0.5 : 0.3 + 0.4 * i), w * 0.86); });
  g.restore(); };
