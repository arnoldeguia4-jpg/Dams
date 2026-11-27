// Cast for "Kung Bakit Maalat ang Dagat" (Ilocano tale of Angalo): Angalo the kind giant, villagers, the ant, sacks of salt, fx.
import { Pen, bodyFront, INK, fxBurst, fxPuff, fxStars } from './toonbase.js';
export { Pen, INK, fxBurst, fxPuff, fxStars };

const bahag = (col) => (p, c) => { const { tcx, chin, HH, u } = c; p.poly([[tcx - 30 * u, chin + 0.72 * HH], [tcx + 30 * u, chin + 0.72 * HH], [tcx + 12 * u, chin + 1.05 * HH], [tcx - 12 * u, chin + 1.05 * HH]], col, 1.8 * u); p.band([[tcx - 34 * u, chin + 0.7 * HH], [tcx + 34 * u, chin + 0.7 * HH]], '#f2c440', 0.05 * HH, 1.2 * u); };
const beard = (p, h) => { const { cx, crown, HH, W, u } = h; p.poly([[cx - 0.34 * W, crown + 0.78 * HH], [cx + 0.34 * W, crown + 0.78 * HH], [cx + 0.2 * W, crown + 1.02 * HH], [cx, crown + 1.08 * HH], [cx - 0.2 * W, crown + 1.02 * HH]], '#3a2a20', 1.6 * u); };
const band = (col) => (p, h) => { const { cx, crown, HH, W, u } = h; p.band([[cx - 0.46 * W, crown + 0.24 * HH], [cx + 0.46 * W, crown + 0.24 * HH]], col, 0.07 * HH, 1.4 * u); };
const kerchief = (col) => (p, h) => { const { cx, crown, HH, W, u } = h; p.poly([[cx - 0.48 * W, crown + 0.3 * HH], [cx + 0.48 * W, crown + 0.3 * HH], [cx + 0.3 * W, crown + 0.02 * HH], [cx - 0.3 * W, crown + 0.02 * HH]], col, 1.4 * u); };

export const OUT = {
  angalo: { id: 'angalo', o: { jacket: '#b07a52', pants: '#3f6fb5', boots: '#b07a52', hat: 'hair', hair: '#2a1d16', skin: '#b07a52', buttons: '#b07a52', build: 'stout' }, extra: bahag('#3f6fb5'), head: (p, h) => { band('#f2c440')(p, h); beard(p, h); }, seed: 5 },
  v1: { id: 'v1', o: { jacket: '#e8d8b0', pants: '#8a5a34', boots: '#a8704a', hat: 'hair', hair: '#1d1414', skin: '#a8704a', buttons: '#c2453c' }, head: band('#c2453c'), seed: 2 },
  v2: { id: 'v2', o: { jacket: '#c99067', pants: '#c2453c', boots: '#c99067', hat: 'hair', hair: '#1d1414', skin: '#c99067', dress: '#3fa0a8', buttons: '#f2c440' }, head: kerchief('#f2c440'), seed: 7 },
  v3: { id: 'v3', o: { jacket: '#6a9a4a', pants: '#3a3a44', boots: '#b8794f', hat: 'hair', hair: '#1d1414', skin: '#b8794f', buttons: '#f2c440' }, seed: 11 },
  v4: { id: 'v4', o: { jacket: '#c48a5e', pants: '#e8b040', boots: '#c48a5e', hat: 'hair', hair: '#2a1d16', skin: '#c48a5e', dress: '#d9704a', buttons: '#ffffff' }, head: kerchief('#3f6fb5'), seed: 13 },
};
export const VIL = ['v1', 'v2', 'v3', 'v4'];

export const ARM = { hang: [14, 45, 17, 86], up: [16, -28, 22, -82], point: [32, -2, 64, -14], hip: [28, 28, 6, 52], wave: [22, -20, 34, -66], cheer: [20, -30, 34, -80], shield: [20, 0, -2, -40], reach: [30, 20, 58, 30], hold: [30, 30, 58, 34], carry: [18, -30, 6, -84] };

const body = (g, s, sx, sy) => { const C = s.who; g.scale(sx, sy); if (s.flipX) { g.translate(600, 0); g.scale(-1, 1); }
  bodyFront(new Pen(g), C.o, { phase: s.phase || 0, expr: s.expr || 'neutral', mode: s.mode || 'stand', look: s.look || 0, blink: s.blink || 0, lift: 50, tilt: s.tilt || 0, headTilt: s.headTilt || 0, wave: s.wave, facing: s.facing || 0, seed: C.seed || 1,
    armL: s.armL, armR: s.armR, extra: C.extra, headExtra: (pp, h) => { if (C.head) C.head(pp, h); if (s.head) s.head(pp, h); } }); };
export const drawChar = (g, s) => { g.save(); body(g, s, g.canvas.width / 600, g.canvas.height / 1000); g.restore(); };
/** the giant lying on his side as a bridge: head on the left (west), feet on the right (east). canvas aspect 1000:600 */
export const drawLying = (g, s) => { g.save(); g.translate(0, g.canvas.height); g.rotate(-Math.PI / 2); g.save(); body(g, s, g.canvas.height / 600, g.canvas.width / 1000); g.restore();
  // sturdy legs for the bridge, drawn over the thin cartoon legs (char coords 600x1000)
  g.scale(g.canvas.height / 600, g.canvas.width / 1000); g.lineCap = 'round';
  for (const x of [268, 332]) { g.strokeStyle = INK; g.lineWidth = 62; g.beginPath(); g.moveTo(x, 700); g.lineTo(x, 960); g.stroke(); g.strokeStyle = '#b07a52'; g.lineWidth = 50; g.beginPath(); g.moveTo(x, 700); g.lineTo(x, 960); g.stroke(); }
  for (const x of [268, 332]) { g.fillStyle = '#b07a52'; g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.ellipse(x + 8, 975, 34, 20, 0, 0, 7); g.fill(); g.stroke(); }
  g.restore(); };

// ---------------- fx ----------------
export const glow = (g, rgb = '255,236,170', a = 0.8) => { const s = g.canvas.width, gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2); gr.addColorStop(0, `rgba(${rgb},${a})`); gr.addColorStop(0.4, `rgba(${rgb},${a * 0.45})`); gr.addColorStop(1, `rgba(${rgb},0)`); g.fillStyle = gr; g.fillRect(0, 0, s, s); };
export const drawText = (g, txt, { col = '#ffffff', font = 'bold 230px Georgia, serif', stroke = INK, lw = 22 } = {}) => {
  const w = g.canvas.width, h = g.canvas.height; g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.lineWidth = lw; g.strokeStyle = stroke; g.lineJoin = 'round'; g.strokeText(txt, w / 2, h / 2, w * 0.94); g.fillStyle = col; g.fillText(txt, w / 2, h / 2, w * 0.94);
};
export const drawTag = (g, txt) => { const w = g.canvas.width, h = g.canvas.height; g.save(); g.fillStyle = '#c99a5e'; g.strokeStyle = INK; g.lineWidth = 18; g.beginPath(); g.rect(30, 50, w - 60, h - 100); g.fill(); g.stroke();
  g.fillStyle = '#3a2216'; g.font = 'bold 170px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(txt, w / 2, h / 2 + 6, w - 120); g.restore(); };
/** a sack of salt (512) */
export const drawSack = (g, spill = 0) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); g.lineWidth = 12; g.strokeStyle = INK; g.lineJoin = 'round';
  g.fillStyle = '#e9d6a8'; g.beginPath(); g.moveTo(130, 160); g.quadraticCurveTo(80, 330, 120, 450); g.lineTo(392, 450); g.quadraticCurveTo(432, 330, 382, 160); g.quadraticCurveTo(256, 120, 130, 160); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#c9a46a'; g.beginPath(); g.ellipse(256, 150, 80, 34, 0, 0, 7); g.fill(); g.stroke();
  g.fillStyle = '#ffffff'; g.beginPath(); g.ellipse(256, 140, 60 + spill * 40, 22 + spill * 20, 0, 0, 7); g.fill();
  g.fillStyle = '#3a2216'; g.font = 'bold 84px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('ASIN', 256, 320, 260); g.restore(); };
/** the ant (512), side view facing right. state: walk | bite | smug; t phase */
export const drawAnt = (g, state = 'walk', t = 0) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); g.lineCap = 'round'; g.lineJoin = 'round';
  const body = '#2a1a1a', leg = Math.sin(t * Math.PI * 2) * 14, open = state === 'bite' ? 1 : 0;
  g.strokeStyle = body; g.lineWidth = 12; for (const [x, k] of [[200, 1], [250, -1], [300, 1]]) { g.beginPath(); g.moveTo(x, 300); g.lineTo(x - 30 + k * leg, 360); g.lineTo(x - 40 + k * leg, 400); g.stroke(); g.beginPath(); g.moveTo(x, 300); g.lineTo(x + 25 - k * leg, 365); g.lineTo(x + 30 - k * leg, 400); g.stroke(); }
  g.fillStyle = body; g.strokeStyle = INK; g.lineWidth = 6;
  g.beginPath(); g.ellipse(140, 290, 80, 60, -0.2, 0, 7); g.fill(); g.stroke();
  g.beginPath(); g.ellipse(250, 300, 44, 34, 0, 0, 7); g.fill(); g.stroke();
  g.beginPath(); g.ellipse(345, 260, 56, 50, 0.2, 0, 7); g.fill(); g.stroke();
  g.strokeStyle = body; g.lineWidth = 9; g.beginPath(); g.moveTo(350, 215); g.quadraticCurveTo(360, 150, 410, 140); g.stroke(); g.beginPath(); g.moveTo(330, 215); g.quadraticCurveTo(320, 150, 360, 120); g.stroke();
  g.strokeStyle = '#7a1e1e'; g.lineWidth = 10; g.beginPath(); g.moveTo(392, 270); g.lineTo(430 + open * 10, 250 - open * 20); g.stroke(); g.beginPath(); g.moveTo(392, 285); g.lineTo(430 + open * 10, 300 + open * 20); g.stroke();
  // big cartoon eye
  g.fillStyle = '#ffffff'; g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.ellipse(362, 245, 20, 22, 0, 0, 7); g.fill(); g.stroke();
  g.fillStyle = INK; g.beginPath(); g.arc(368, 248, 9, 0, 7); g.fill();
  if (state === 'smug' || state === 'bite') { g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(342, 220); g.lineTo(382, 230); g.stroke(); }
  if (state === 'smug') { g.fillStyle = '#ffffff'; g.beginPath(); g.ellipse(362, 241, 21, 10, 0, Math.PI, 2 * Math.PI); g.fill(); }
  g.restore(); };
export const drawWater = (g, drops = 0) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); g.fillStyle = '#9fd4ff'; g.strokeStyle = INK; g.lineWidth = 8;
  for (let i = 0; i < 6; i++) { const a = i * 1.05 + drops, r = 120 + 40 * (i % 2); g.beginPath(); g.ellipse(256 + Math.cos(a) * r, 256 + Math.sin(a) * r * 0.7, 26, 34, a, 0, 7); g.fill(); g.stroke(); } g.restore(); };
