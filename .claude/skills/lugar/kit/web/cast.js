// LUGAR cast helpers: the character specs live in story.js (makeBlocky specs); this file has the 2D fx cards:
// pill labels (like "10 TASA!"), speech-bubble shouts, bursts, puffs, money rain, glow.
import { Pen, fxBurst, fxPuff, fxStars } from './toonbase.js';
import { q, back, win } from './engine.js';
export { Pen, fxBurst, fxPuff, fxStars };

export const FONT = '"Nunito Black", "Arial Black", sans-serif';
export const PILL = { yellow: ['#f7c51e', '#1e1a24'], red: ['#e23b3b', '#ffffff'], green: ['#36b85a', '#ffffff'], white: ['#ffffff', '#1e1a24'], blue: ['#2f6fd6', '#ffffff'], purple: ['#7a4ad0', '#ffffff'] };
/** rounded pill label with a dark rim, on a 1024x256 canvas; text is auto-fitted */
export const drawPill = (g, text, kind = 'yellow') => {
  const [bg, fg] = PILL[kind] || PILL.yellow, w = g.canvas.width, h = g.canvas.height;
  g.font = `900 ${h * 0.42}px ${FONT}`; const tw = Math.min(w * 0.86, g.measureText(text).width), pw = tw + h * 0.62, ph = h * 0.66, x = (w - pw) / 2, y = (h - ph) / 2, r = ph / 2;
  const path = () => { g.beginPath(); g.moveTo(x + r, y); g.lineTo(x + pw - r, y); g.arc(x + pw - r, y + r, r, -Math.PI / 2, Math.PI / 2); g.lineTo(x + r, y + ph); g.arc(x + r, y + r, r, Math.PI / 2, Math.PI * 1.5); g.closePath(); };
  g.fillStyle = 'rgba(0,0,0,0.25)'; g.save(); g.translate(0, h * 0.04); path(); g.fill(); g.restore();
  path(); g.fillStyle = bg; g.fill(); g.lineWidth = h * 0.045; g.strokeStyle = '#1e1a24'; g.stroke();
  g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, w / 2, h / 2 + h * 0.02, w * 0.86);
};
/** big bold shout text (white with dark rim), 1024x256 */
export const drawShout = (g, text, col = '#ffffff') => {
  const w = g.canvas.width, h = g.canvas.height; g.font = `900 ${h * 0.6}px ${FONT}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round';
  g.lineWidth = h * 0.12; g.strokeStyle = '#1e1a24'; g.strokeText(text, w / 2, h / 2, w * 0.94); g.fillStyle = col; g.fillText(text, w / 2, h / 2, w * 0.94);
};
export const glow = (g, rgb = '255,236,170', a = 0.8) => { const s = g.canvas.width, gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2); gr.addColorStop(0, `rgba(${rgb},${a})`); gr.addColorStop(0.4, `rgba(${rgb},${a * 0.45})`); gr.addColorStop(1, `rgba(${rgb},0)`); g.fillStyle = gr; g.fillRect(0, 0, s, s); };
/** falling peso bills + coins over t seconds, on a 1024 canvas */
export const drawMoneyRain = (g, t, seed = 1, n = 40) => {
  const s = g.canvas.width; g.save(); g.scale(s / 1024, s / 1024);
  for (let i = 0; i < n; i++) {
    const r1 = Math.abs(Math.sin(i * 12.9898 + seed) * 43758.5453) % 1, r2 = Math.abs(Math.sin(i * 78.233 + seed) * 12345.678) % 1;
    const x = (r1 * 1024 + 40 * Math.sin(t * 2 + i)) % 1024, y = ((r2 * 1024) + t * (260 + 200 * r1)) % 1124 - 60;
    g.save(); g.translate(x, y); g.rotate(t * (2 + r1 * 3) + i);
    if (i % 3 === 0) { g.fillStyle = '#f2c440'; g.strokeStyle = '#a07a1a'; g.lineWidth = 4; g.beginPath(); g.ellipse(0, 0, 16, 16 * Math.abs(Math.cos(t * 4 + i)) + 2, 0, 0, 7); g.fill(); g.stroke(); }
    else { g.fillStyle = '#4fb05a'; g.strokeStyle = '#1f6a2a'; g.lineWidth = 4; g.fillRect(-36, -16, 72, 32); g.strokeRect(-36, -16, 72, 32); g.fillStyle = '#e9f6d0'; g.font = 'bold 22px Arial'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('₱', 0, 1); }
    g.restore();
  }
  g.restore();
};
/** confetti, 1024 canvas */
export const drawConfetti = (g, t, seed = 3, n = 70) => {
  const s = g.canvas.width, cols = ['#e2453c', '#f2c440', '#3f6fb5', '#5d9a3a', '#c25a7a', '#ffffff'];
  for (let i = 0; i < n; i++) { const r1 = Math.abs(Math.sin(i * 12.9898 + seed) * 43758.5453) % 1, r2 = Math.abs(Math.sin(i * 78.233 + seed) * 12345.678) % 1;
    const x = (r1 * s + 30 * Math.sin(t * 3 + i)) % s, y = ((r2 * s * 0.6) + t * (220 + 120 * r1)) % s; g.save(); g.translate(x, y); g.rotate(t * 4 + i); g.fillStyle = cols[i % 6]; g.fillRect(-9, -5, 18, 10 * Math.abs(Math.cos(t * 6 + i))); g.restore(); }
};

// ---------- fx card factories (used by story.js) ----------
export const fx = (id, pos, h, key, draw, o = {}) => ({ id, kind: 'fx', pos, h, key, draw, yaw: o.yaw ?? 'full', soft: o.soft ?? true, res: o.res || [512, 512], unlit: true, order: o.order ?? 5, opacity: o.opacity });
/** pill label that pops in at frame a and stays to b */
export const pill = (id, f, a, b, pos, text, kind = 'yellow', h = 0.32) => { if (f < a || f > b) return null; const s = back(win(f, a, a + 6), 2.2); return fx(id, pos, h * Math.max(0.05, s), 'pl' + text + kind, (g) => drawPill(g, text, kind), { res: [1024, 256], order: 8 }); };
export const shout = (id, f, a, b, pos, text, col = '#ffffff', h = 0.5) => { if (f < a || f > b) return null; const s = back(win(f, a, a + 6), 2.2); return fx(id, pos, h * Math.max(0.05, s), 'sh' + text + col, (g) => drawShout(g, text, col), { res: [1024, 256], order: 8 }); };
export const burst = (id, f, at, pos, h = 0.6, col = '#fff3b0', n = 14) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'b' + q(t, 0.04) + col, (g) => { g.save(); g.scale(g.canvas.width / 500, g.canvas.width / 500); fxBurst(new Pen(g), t, col); g.restore(); }, { order: 7 }); };
export const puff = (id, f, at, pos, h = 0.5, n = 16) => { const t = (f - at) / n; if (t < 0 || t > 1) return null; return fx(id, pos, h, 'p' + q(t, 0.05), (g) => { g.save(); g.scale(g.canvas.width / 300, g.canvas.width / 300); fxPuff(new Pen(g), t); g.restore(); }, { order: 6 }); };
export const dizzy = (id, f, a, b, pos, h = 0.5) => (f < a || f > b ? null : fx(id, pos, h, 'dz' + q((f - a) / 24 % 1, 0.04), (g) => { g.save(); g.scale(g.canvas.width / 420, g.canvas.width / 420); g.translate(0, 105); fxStars(new Pen(g), (f - a) / 24 % 1); g.restore(); }, { order: 7 }));
export const moneyRain = (id, f, a, b, pos, h = 4) => (f < a || f > b ? null : fx(id, pos, h, 'mr' + q((f - a) / 30, 0.034), (g) => drawMoneyRain(g, (f - a) / 30), { res: [1024, 1024], order: 6 }));
export const confetti = (id, f, a, b, pos, h = 4) => (f < a || f > b ? null : fx(id, pos, h, 'cf' + f, (g) => drawConfetti(g, (f - a) / 30), { res: [1024, 1024], order: 6 }));
export const glowCard = (id, pos, h, a = 0.8, rgb = '255,226,140', order = 3) => fx(id, pos, h, 'gl' + q(a, 0.05) + rgb, (g) => glow(g, rgb, a), { order });
