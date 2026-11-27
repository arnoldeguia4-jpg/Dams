// Cast for "Si Malakas at si Maganda" (Visayan creation tale): the tired bird (fx drawing), Malakas, Maganda, fx.
import { Pen, bodyFront, INK, fxBurst, fxPuff, fxStars } from './toonbase.js';
export { Pen, INK, fxBurst, fxPuff, fxStars };

const bahag = (col) => (p, c) => { const { tcx, chin, HH, u } = c; p.poly([[tcx - 30 * u, chin + 0.72 * HH], [tcx + 30 * u, chin + 0.72 * HH], [tcx + 12 * u, chin + 1.05 * HH], [tcx - 12 * u, chin + 1.05 * HH]], col, 1.8 * u); p.band([[tcx - 34 * u, chin + 0.7 * HH], [tcx + 34 * u, chin + 0.7 * HH]], '#f2c440', 0.05 * HH, 1.2 * u); };
const necklace = (p, c) => { const { tcx, chin, HH, u } = c; p.arc(tcx, chin + 0.02 * HH, 26 * u, 18 * u, 20, 160, 3 * u, '#f2c440'); };
const longHair = (p, h) => { const { cx, crown, HH, W, u } = h; for (const s of [-1, 1]) p.band([[cx + s * 0.44 * W, crown + 0.3 * HH], [cx + s * 0.5 * W, crown + 1.25 * HH]], '#1d1414', 0.14 * HH, 1.6 * u, 'round'); p.ell(cx + 0.34 * W, crown + 0.16 * HH, 0.07 * W, 0.06 * HH, '#e88aa8', 1.4 * u); };
const band = (p, h) => { const { cx, crown, HH, W, u } = h; p.band([[cx - 0.46 * W, crown + 0.24 * HH], [cx + 0.46 * W, crown + 0.24 * HH]], '#c2453c', 0.07 * HH, 1.4 * u); };

export const OUT = {
  malakas: { id: 'malakas', o: { jacket: '#c48a5e', pants: '#8a5a34', boots: '#c48a5e', hat: 'hair', hair: '#1d1414', skin: '#c48a5e', buttons: '#c48a5e', build: 'stout' }, extra: (p, c) => { bahag('#c2453c')(p, c); necklace(p, c); }, head: band, seed: 3 },
  maganda: { id: 'maganda', o: { jacket: '#c99067', pants: '#e8c45a', boots: '#c99067', hat: 'hair', hair: '#1d1414', skin: '#c99067', dress: '#e8b040', buttons: '#c2453c' }, extra: necklace, head: longHair, seed: 9 },
};

export const ARM = {
  hang: [14, 45, 17, 86], up: [16, -28, 22, -82], point: [32, -2, 64, -14], hip: [28, 28, 6, 52], wave: [22, -20, 34, -66], cheer: [20, -30, 34, -80], shield: [20, 0, -2, -40], reach: [30, 20, 58, 30], hold: [30, 30, 58, 34],
};

export const drawChar = (g, s) => {
  const C = s.who;
  g.save(); g.scale(g.canvas.width / 600, g.canvas.height / 1000);
  if (s.flipX) { g.translate(600, 0); g.scale(-1, 1); }
  const p = new Pen(g);
  bodyFront(p, C.o, {
    phase: s.phase || 0, expr: s.expr || 'neutral', mode: s.mode || 'stand', look: s.look || 0, blink: s.blink || 0, lift: 50,
    tilt: s.tilt || 0, headTilt: s.headTilt || 0, wave: s.wave, facing: s.facing || 0, seed: C.seed || 1,
    armL: s.armL, armR: s.armR, extra: C.extra, headExtra: (pp, h) => { if (C.head) C.head(pp, h); if (s.head) s.head(pp, h); },
  });
  g.restore();
};

// ---------------- fx ----------------
export const glow = (g, rgb = '255,236,170', a = 0.8) => { const s = g.canvas.width, gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2); gr.addColorStop(0, `rgba(${rgb},${a})`); gr.addColorStop(0.4, `rgba(${rgb},${a * 0.45})`); gr.addColorStop(1, `rgba(${rgb},0)`); g.fillStyle = gr; g.fillRect(0, 0, s, s); };
export const drawText = (g, txt, { col = '#ffffff', font = 'bold 230px Georgia, serif', stroke = INK, lw = 22 } = {}) => {
  const w = g.canvas.width, h = g.canvas.height; g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.lineWidth = lw; g.strokeStyle = stroke; g.lineJoin = 'round'; g.strokeText(txt, w / 2, h / 2, w * 0.94); g.fillStyle = col; g.fillText(txt, w / 2, h / 2, w * 0.94);
};
/** name tag on a little wooden plank (1024x384) */
export const drawTag = (g, txt) => { const w = g.canvas.width, h = g.canvas.height; g.save(); g.fillStyle = '#c99a5e'; g.strokeStyle = INK; g.lineWidth = 18; g.beginPath(); g.rect(30, 50, w - 60, h - 100); g.fill(); g.stroke();
  g.fillStyle = '#3a2216'; g.font = 'bold 170px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(txt, w / 2, h / 2 + 6, w - 120); g.restore(); };
/** the bird, side view, facing right, 512.
 *  state: 'fly' | 'perch' | 'tired' | 'angry' | 'peck' | 'sleep' | 'shock' | 'relax'; t: animation phase 0..1 */
export const drawBird = (g, state = 'fly', t = 0) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512);
  g.lineWidth = 9; g.strokeStyle = INK; g.lineJoin = 'round'; g.lineCap = 'round';
  const flap = state === 'fly' ? Math.sin(t * Math.PI * 2) : 0, droop = state === 'tired' ? 1 : 0, peck = state === 'peck' ? Math.max(0, Math.sin(t * Math.PI * 2)) : 0;
  const by = 280 + droop * 20, hx = 330 + peck * 40, hy = 210 + droop * 30 + peck * 40;
  // tail
  g.fillStyle = '#2f7a8a'; g.beginPath(); g.moveTo(150, by); g.lineTo(40, by + 40 + droop * 30); g.lineTo(60, by + 70 + droop * 30); g.lineTo(170, by + 30); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#e8c45a'; g.beginPath(); g.moveTo(150, by + 10); g.lineTo(60, by + 80 + droop * 30); g.lineTo(90, by + 90 + droop * 30); g.lineTo(170, by + 36); g.closePath(); g.fill(); g.stroke();
  // legs
  if (state !== 'fly') { g.strokeStyle = '#e8a040'; g.lineWidth = 10; for (const x of [235, 270]) { g.beginPath(); g.moveTo(x, by + 60); g.lineTo(x + 6, by + 120); g.lineTo(x + 28, by + 124); g.stroke(); } g.strokeStyle = INK; g.lineWidth = 9; }
  // body
  g.fillStyle = '#3fa0a8'; g.beginPath(); g.ellipse(250, by, 115, 80, -0.1 - 0.15 * droop, 0, 7); g.fill(); g.stroke();
  g.fillStyle = '#f4e6c0'; g.beginPath(); g.ellipse(275, by + 30, 70, 40, -0.2, 0, 7); g.fill();
  // wing
  g.fillStyle = '#2f7a8a'; g.beginPath();
  if (state === 'fly') { g.moveTo(200, by - 20); g.quadraticCurveTo(170, by - 150 * flap - 40, 90, by - 170 * flap - 20); g.quadraticCurveTo(190, by - 60 * flap, 270, by - 10); }
  else { g.moveTo(170, by - 30 + droop * 20); g.quadraticCurveTo(220, by - 60, 300, by - 10); g.quadraticCurveTo(250, by + 50 + droop * 40, 160, by + 30 + droop * 40); }
  g.closePath(); g.fill(); g.stroke();
  // head
  g.fillStyle = '#3fa0a8'; g.beginPath(); g.ellipse(hx, hy, 62, 58, 0, 0, 7); g.fill(); g.stroke();
  g.fillStyle = '#c2453c'; for (let i = 0; i < 3; i++) { g.beginPath(); g.ellipse(hx - 30 + i * 18, hy - 64 + droop * 8, 12, 30, -0.4 + i * 0.25 + droop * 0.6, 0, 7); g.fill(); g.stroke(); }
  // beak
  g.fillStyle = '#f2c440'; g.beginPath(); g.moveTo(hx + 50, hy - 6); g.lineTo(hx + 110, hy + 10 + droop * 10); g.lineTo(hx + 50, hy + 26); g.closePath(); g.fill(); g.stroke();
  if (state === 'tired') { g.fillStyle = '#e88a9a'; g.beginPath(); g.ellipse(hx + 74, hy + 32, 12, 18, 0.3, 0, 7); g.fill(); g.stroke(); }
  // eye
  const ex = hx + 18, ey = hy - 10;
  if (state === 'sleep' || state === 'relax') { g.beginPath(); g.arc(ex, ey + 2, 12, 0.1 * Math.PI, 0.9 * Math.PI); g.stroke(); }
  else { g.fillStyle = '#ffffff'; g.beginPath(); g.ellipse(ex, ey, state === 'shock' ? 22 : 17, state === 'shock' ? 24 : 19, 0, 0, 7); g.fill(); g.stroke(); g.fillStyle = INK; g.beginPath(); g.arc(ex + 5, ey + (droop ? 5 : 0), state === 'shock' ? 6 : 8, 0, 7); g.fill();
    if (state === 'tired') { g.fillStyle = '#3fa0a8'; g.fillRect(ex - 20, ey - 22, 40, 16); g.beginPath(); g.moveTo(ex - 20, ey - 6); g.lineTo(ex + 20, ey - 6); g.stroke(); } }
  if (state === 'angry' || state === 'peck') { g.lineWidth = 9; g.beginPath(); g.moveTo(ex - 22, ey - 30); g.lineTo(ex + 18, ey - 18); g.stroke(); }
  if (state === 'tired') { g.fillStyle = '#9fd4ff'; g.beginPath(); g.ellipse(hx - 40, hy - 20, 9, 14, 0, 0, 7); g.fill(); g.lineWidth = 5; g.stroke(); }
  g.restore(); };
/** a big curling wave (512), rise 0..1 */
export const drawWave = (g, rise = 1) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); g.translate(0, 512 * (1 - rise) * 0.6);
  g.lineWidth = 10; g.strokeStyle = INK; g.fillStyle = '#3f8fc4';
  g.beginPath(); g.moveTo(20, 500); g.bezierCurveTo(60, 200, 260, 40, 420, 120); g.bezierCurveTo(470, 150, 440, 230, 380, 200); g.bezierCurveTo(330, 180, 340, 120, 300, 140); g.bezierCurveTo(240, 180, 300, 400, 492, 500); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#f4f8ff'; g.beginPath(); g.moveTo(300, 140); g.bezierCurveTo(330, 110, 380, 110, 420, 120); g.bezierCurveTo(440, 150, 420, 180, 390, 190); g.bezierCurveTo(360, 160, 330, 150, 300, 140); g.fill(); g.stroke();
  g.restore(); };
/** lightning bolt, 512 */
export const drawBolt = (g) => { const s = g.canvas.width; g.save(); g.scale(s / 512, s / 512); g.fillStyle = '#fff6b0'; g.strokeStyle = INK; g.lineWidth = 8;
  g.beginPath(); g.moveTo(280, 20); g.lineTo(190, 250); g.lineTo(260, 250); g.lineTo(200, 492); g.lineTo(340, 200); g.lineTo(270, 200); g.lineTo(330, 20); g.closePath(); g.fill(); g.stroke(); g.restore(); };
