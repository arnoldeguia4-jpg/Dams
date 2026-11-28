// Cast for "Alamat ng Pinya": Aling Rosa, Pinang, villagers, the pineapple full of eyes, kitchen props, fx.
import { Pen, bodyFront, INK, fxBurst, fxPuff, fxStars } from './toonbase.js';
export { Pen, INK, fxBurst, fxPuff, fxStars };

const bahag = (col) => (p, c) => { const { tcx, chin, HH, u } = c; p.poly([[tcx - 30 * u, chin + 0.72 * HH], [tcx + 30 * u, chin + 0.72 * HH], [tcx + 12 * u, chin + 1.05 * HH], [tcx - 12 * u, chin + 1.05 * HH]], col, 1.8 * u); p.band([[tcx - 34 * u, chin + 0.7 * HH], [tcx + 34 * u, chin + 0.7 * HH]], '#f2c440', 0.05 * HH, 1.2 * u); };
const beard = (p, h) => { const { cx, crown, HH, W, u } = h; p.poly([[cx - 0.34 * W, crown + 0.78 * HH], [cx + 0.34 * W, crown + 0.78 * HH], [cx + 0.2 * W, crown + 1.02 * HH], [cx, crown + 1.08 * HH], [cx - 0.2 * W, crown + 1.02 * HH]], '#3a2a20', 1.6 * u); };
const band = (col) => (p, h) => { const { cx, crown, HH, W, u } = h; p.band([[cx - 0.46 * W, crown + 0.24 * HH], [cx + 0.46 * W, crown + 0.24 * HH]], col, 0.07 * HH, 1.4 * u); };
const kerchief = (col) => (p, h) => { const { cx, crown, HH, W, u } = h; p.poly([[cx - 0.48 * W, crown + 0.3 * HH], [cx + 0.48 * W, crown + 0.3 * HH], [cx + 0.3 * W, crown + 0.02 * HH], [cx - 0.3 * W, crown + 0.02 * HH]], col, 1.4 * u); };

const hairBun = (col) => (p, h) => { const { cx, crown, HH, W, u } = h; p.ell(cx, crown - 0.02 * HH, 0.2 * W, 0.14 * HH, col, 1.4 * u); };
const pigtails = (p, h) => { const { cx, crown, HH, W, u } = h; for (const s of [-1, 1]) p.ell(cx + s * 0.52 * W, crown + 0.34 * HH, 0.12 * W, 0.18 * HH, '#1d1414', 1.4 * u); p.ell(cx + 0.3 * W, crown + 0.12 * HH, 0.07 * W, 0.06 * HH, '#e88aa8', 1.2 * u); };
export const OUT = {
  rosa: { id: 'rosa', o: { jacket: '#c99067', pants: '#6a4a8a', boots: '#c99067', hat: 'hair', hair: '#8a8478', skin: '#c99067', dress: '#7a5ac9', buttons: '#f2c440' }, head: (p, h) => { hairBun('#8a8478')(p, h); kerchief('#e8d8b0')(p, h); }, seed: 4 },
  pinang: { id: 'pinang', o: { jacket: '#c48a5e', pants: '#e88aa8', boots: '#c48a5e', hat: 'hair', hair: '#1d1414', skin: '#c48a5e', dress: '#f2c440', buttons: '#c2453c', build: 'kid' }, head: pigtails, seed: 8 },
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

/** the pineapple (512): yellow fruit full of eyes, green crown. eyes: 0 closed..1 open; wink: right-most eyes closed; look: -1..1 */
export const drawPina = (g, eyes = 1, o = {}) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); g.lineJoin = 'round';
  const grow = o.grow ?? 1; g.translate(256, 470); g.scale(grow, grow); g.translate(-256, -470);
  g.fillStyle = '#3f8a3a'; g.strokeStyle = INK; g.lineWidth = 8;
  for (let i = -3; i <= 3; i++) { g.save(); g.translate(256, 190); g.rotate(i * 0.28); g.beginPath(); g.moveTo(-18, 10); g.quadraticCurveTo(-10, -90, 0, -150 + Math.abs(i) * 18); g.quadraticCurveTo(10, -90, 18, 10); g.closePath(); g.fill(); g.stroke(); g.restore(); }
  g.fillStyle = '#f2c440'; g.beginPath(); g.ellipse(256, 330, 120, 150, 0, 0, 7); g.fill(); g.stroke();
  g.save(); g.beginPath(); g.ellipse(256, 330, 116, 146, 0, 0, 7); g.clip(); g.strokeStyle = '#c9922a'; g.lineWidth = 5;
  for (let k = -8; k <= 8; k++) { g.beginPath(); g.moveTo(100 + k * 40, 160); g.lineTo(260 + k * 40, 500); g.stroke(); g.beginPath(); g.moveTo(412 - k * 40, 160); g.lineTo(252 - k * 40, 500); g.stroke(); }
  // eyes in the diamond cells
  for (let r = 0; r < 5; r++) for (let q = 0; q < 4; q++) { const x = 176 + q * 54 + (r % 2) * 27, y = 225 + r * 52; if (Math.hypot((x - 256) / 112, (y - 330) / 142) > 0.86) continue;
    const wink = o.wink && x > 256; const op = wink ? 0 : eyes;
    g.fillStyle = '#ffffff'; g.strokeStyle = INK; g.lineWidth = 4;
    if (op > 0.15) { g.beginPath(); g.ellipse(x, y, 13, 13 * op, 0, 0, 7); g.fill(); g.stroke(); g.fillStyle = INK; g.beginPath(); g.arc(x + (o.look || 0) * 5, y + 1, 5.5 * Math.min(1, op + 0.2), 0, 7); g.fill(); }
    else { g.beginPath(); g.moveTo(x - 12, y); g.quadraticCurveTo(x, y + 8, x + 12, y); g.stroke(); } }
  g.restore();
  g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.ellipse(256, 330, 120, 150, 0, 0, 7); g.stroke();
  g.restore(); };
/** a young plant (512): spiky leaves; t 0..1 */
export const drawSprout = (g, t = 1) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); g.fillStyle = '#3f8a3a'; g.strokeStyle = INK; g.lineWidth = 7; g.lineJoin = 'round';
  for (let i = -4; i <= 4; i++) { g.save(); g.translate(256, 500); g.rotate(i * 0.3); g.scale(t, t); g.beginPath(); g.moveTo(-16, 0); g.quadraticCurveTo(-8, -200, 0, -300 + Math.abs(i) * 30); g.quadraticCurveTo(8, -200, 16, 0); g.closePath(); g.fill(); g.stroke(); g.restore(); } g.restore(); };
/** kitchen props (512) */
export const drawPot = (g) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); g.fillStyle = '#4a4a52'; g.strokeStyle = INK; g.lineWidth = 10;
  g.beginPath(); g.moveTo(110, 220); g.quadraticCurveTo(100, 430, 256, 440); g.quadraticCurveTo(412, 430, 402, 220); g.closePath(); g.fill(); g.stroke(); g.fillStyle = '#6a6a74'; g.beginPath(); g.ellipse(256, 220, 150, 34, 0, 0, 7); g.fill(); g.stroke();
  for (const sx of [-1, 1]) { g.beginPath(); g.ellipse(256 + sx * 165, 250, 22, 14, 0, 0, 7); g.stroke(); } g.restore(); };
export const drawRice = (g) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); g.lineWidth = 10; g.strokeStyle = INK;
  g.fillStyle = '#e9d6a8'; g.beginPath(); g.moveTo(140, 170); g.quadraticCurveTo(90, 340, 130, 460); g.lineTo(382, 460); g.quadraticCurveTo(422, 340, 372, 170); g.quadraticCurveTo(256, 130, 140, 170); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#ffffff'; g.beginPath(); g.ellipse(256, 160, 100, 30, 0, 0, 7); g.fill(); g.stroke();
  g.fillStyle = '#3a2216'; g.font = 'bold 80px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('BIGAS', 256, 330, 260); g.restore(); };
export const drawLadle = (g) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); g.lineCap = 'round'; g.strokeStyle = INK; g.lineWidth = 34; g.beginPath(); g.moveTo(140, 420); g.lineTo(330, 150); g.stroke(); g.strokeStyle = '#a8784a'; g.lineWidth = 22; g.beginPath(); g.moveTo(140, 420); g.lineTo(330, 150); g.stroke();
  g.fillStyle = '#a8784a'; g.strokeStyle = INK; g.lineWidth = 9; g.beginPath(); g.ellipse(360, 115, 66, 48, -0.6, 0, 7); g.fill(); g.stroke(); g.restore(); };
export const drawTorch = (g, t = 0) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); g.strokeStyle = INK; g.lineWidth = 26; g.lineCap = 'round'; g.beginPath(); g.moveTo(256, 480); g.lineTo(256, 230); g.stroke(); g.strokeStyle = '#8a5a34'; g.lineWidth = 16; g.beginPath(); g.moveTo(256, 480); g.lineTo(256, 230); g.stroke();
  const fl = 1 + 0.12 * Math.sin(t * 9); g.fillStyle = '#f2a03a'; g.strokeStyle = INK; g.lineWidth = 7; g.beginPath(); g.moveTo(256, 60 / fl); g.quadraticCurveTo(330, 170, 290, 240); g.lineTo(222, 240); g.quadraticCurveTo(182, 170, 256, 60 / fl); g.fill(); g.stroke();
  g.fillStyle = '#ffe066'; g.beginPath(); g.moveTo(256, 140); g.quadraticCurveTo(290, 200, 272, 236); g.lineTo(240, 236); g.quadraticCurveTo(222, 200, 256, 140); g.fill(); g.restore(); };
