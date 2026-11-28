// Painted canvas textures: flat colour, dark seams, soft mottling. All return THREE.CanvasTexture (sRGB, repeat).
import * as THREE from './three.module.js';

export const rng = (seed) => { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); };
const cv = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; };
export const ctex = (c, rep = true) => {
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  if (rep) { t.wrapS = t.wrapT = THREE.RepeatWrapping; }
  t.anisotropy = 4; t.needsUpdate = true; return t;
};
const shadeHex = (hex, k) => {
  const n = parseInt(hex.slice(1), 16), f = (v) => Math.max(0, Math.min(255, Math.round(v * k)));
  return `rgb(${f((n >> 16) & 255)},${f((n >> 8) & 255)},${f(n & 255)})`;
};
const mottle = (g, w, h, base, r, n = 260, amp = 0.06, size = 40) => {
  for (let i = 0; i < n; i++) {
    g.fillStyle = shadeHex(base, 1 + (r() - 0.5) * 2 * amp); g.globalAlpha = 0.35;
    g.beginPath(); g.ellipse(r() * w, r() * h, size * (0.4 + r()), size * (0.3 + r() * 0.6), r() * 3, 0, Math.PI * 2); g.fill();
  }
  g.globalAlpha = 1;
};

/** planks running along u; 1 texture = 1 m */
export const planks = (base = '#a8743f', seed = 1, n = 6) => {
  const [c, g] = cv(512, 512), r = rng(seed), ph = 512 / n;
  g.fillStyle = base; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < n; i++) {
    g.fillStyle = shadeHex(base, 0.9 + r() * 0.2); g.fillRect(0, i * ph, 512, ph);
    for (let k = 0; k < 5; k++) { g.strokeStyle = shadeHex(base, 0.8); g.globalAlpha = 0.35; g.lineWidth = 2; g.beginPath(); const y = i * ph + r() * ph; g.moveTo(0, y); g.bezierCurveTo(170, y + 6, 340, y - 6, 512, y + 3); g.stroke(); }
    g.globalAlpha = 1;
    g.fillStyle = shadeHex(base, 0.42); g.fillRect(0, i * ph, 512, 4);
    const x = r() * 512; g.fillRect(x, i * ph, 4, ph);
  }
  return ctex(c);
};
export const plaster = (base = '#e9e0c9', seed = 2) => {
  const [c, g] = cv(512, 512), r = rng(seed);
  g.fillStyle = base; g.fillRect(0, 0, 512, 512); mottle(g, 512, 512, base, r, 220, 0.05, 50);
  return ctex(c);
};
/** wall with a darker wainscot band at the bottom (v 0..1 = 0..wall height mapped by caller) */
export const tiles = (base = '#dfe7e2', seam = '#8d9a95', seed = 3, n = 8) => {
  const [c, g] = cv(512, 512), r = rng(seed), s = 512 / n;
  g.fillStyle = seam; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { g.fillStyle = shadeHex(base, 0.95 + r() * 0.08); g.fillRect(i * s + 3, j * s + 3, s - 6, s - 6); }
  return ctex(c);
};
export const brick = (base = '#a4553c', seed = 4) => {
  const [c, g] = cv(512, 512), r = rng(seed), bh = 32, bw = 85;
  g.fillStyle = '#6e5a4e'; g.fillRect(0, 0, 512, 512);
  for (let y = 0; y < 512; y += bh) for (let x = -((y / bh) % 2) * bw / 2; x < 512; x += bw) {
    g.fillStyle = shadeHex(base, 0.85 + r() * 0.3); g.fillRect(x + 3, y + 3, bw - 6, bh - 6);
  }
  return ctex(c);
};
export const roofTiles = (base = '#5d6470', seed = 5) => {
  const [c, g] = cv(512, 512), r = rng(seed), rh = 43;
  g.fillStyle = shadeHex(base, 0.5); g.fillRect(0, 0, 512, 512);
  for (let y = 0; y < 512; y += rh) for (let x = -((y / rh) % 2) * 32; x < 512; x += 64) {
    g.fillStyle = shadeHex(base, 0.85 + r() * 0.3); g.beginPath(); g.roundRect(x + 2, y + 2, 60, rh - 4, [0, 0, 14, 14]); g.fill();
  }
  return ctex(c);
};
export const cobble = (base = '#8d877c', seed = 6) => {
  const [c, g] = cv(512, 512), r = rng(seed);
  g.fillStyle = shadeHex(base, 0.55); g.fillRect(0, 0, 512, 512);
  for (let y = 0; y < 512; y += 42) for (let x = -((y / 42) % 2) * 30; x < 540; x += 60) {
    g.fillStyle = shadeHex(base, 0.85 + r() * 0.3); g.beginPath(); g.roundRect(x + 4, y + 4, 52, 34, 12); g.fill();
  }
  return ctex(c);
};
export const grass = (base = '#6f9a45', seed = 7) => {
  const [c, g] = cv(512, 512), r = rng(seed);
  g.fillStyle = base; g.fillRect(0, 0, 512, 512); mottle(g, 512, 512, base, r, 300, 0.1, 30);
  for (let i = 0; i < 500; i++) { g.strokeStyle = shadeHex(base, 0.75 + r() * 0.5); g.lineWidth = 2; const x = r() * 512, y = r() * 512; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - 0.5) * 6, y - 10); g.stroke(); }
  return ctex(c);
};
export const metal = (base = '#9aa3a8', seed = 8) => {
  const [c, g] = cv(256, 256), r = rng(seed);
  g.fillStyle = base; g.fillRect(0, 0, 256, 256); mottle(g, 256, 256, base, r, 80, 0.05, 30);
  g.fillStyle = shadeHex(base, 0.5); for (let i = 0; i < 4; i++) g.fillRect(0, i * 64, 256, 3);
  return ctex(c);
};
export const curtain = (base = '#9b2232', seed = 9) => {
  const [c, g] = cv(512, 512);
  for (let x = 0; x < 512; x++) { const k = 0.7 + 0.3 * Math.sin(x / 512 * Math.PI * 12) ** 2; g.fillStyle = shadeHex(base, k); g.fillRect(x, 0, 1, 512); }
  return ctex(c);
};
export const flat = (base) => { const [c, g] = cv(8, 8); g.fillStyle = base; g.fillRect(0, 0, 8, 8); return ctex(c); };
/** canvas with text (diegetic labels); returns texture, no repeat */
export const label = (text, { w = 512, h = 256, bg = '#f4ecd2', fg = '#2a2030', font = 'bold 120px Georgia, serif', border = '#2a2030', lw = 10 } = {}) => {
  const [c, g] = cv(w, h);
  if (bg) { g.fillStyle = bg; g.fillRect(0, 0, w, h); }
  if (border) { g.strokeStyle = border; g.lineWidth = lw; g.strokeRect(lw / 2, lw / 2, w - lw, h - lw); }
  g.fillStyle = fg; g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, w / 2, h / 2 + 4);
  return ctex(c, false);
};
export const cloudTex = (seed) => {
  const [c, g] = cv(512, 256), r = rng(seed);
  g.fillStyle = '#fff';
  for (let i = 0; i < 7; i++) { const x = 90 + r() * 330, y = 120 + (r() - 0.5) * 50, rr = 50 + r() * 50; g.beginPath(); g.arc(x, y, rr, 0, Math.PI * 2); g.fill(); }
  g.fillRect(70, 150, 380, 50);
  g.globalCompositeOperation = 'source-atop'; g.fillStyle = '#d9e3f0'; g.fillRect(0, 175, 512, 81);
  return ctex(c, false);
};
export const wheat = (base = '#d9b04a', seed = 31) => {
  const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d'), r = rng(seed);
  g.fillStyle = base; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 900; i++) { const x = r() * 512, y = r() * 512; g.strokeStyle = r() > 0.5 ? '#b88a2e' : '#f0d27a'; g.lineWidth = 3; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - 0.5) * 8, y - 26); g.stroke(); }
  return ctex(c);
};
export const dirt = (base = '#c0703f', seed = 32) => {
  const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d'), r = rng(seed);
  g.fillStyle = base; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 260; i++) { g.globalAlpha = 0.3; g.fillStyle = r() > 0.5 ? '#a65a30' : '#d48a58'; g.beginPath(); g.ellipse(r() * 512, r() * 512, 10 + r() * 40, 6 + r() * 20, r() * 3, 0, 7); g.fill(); }
  for (let i = 0; i < 120; i++) { g.globalAlpha = 0.8; g.fillStyle = '#7a4a2a'; g.beginPath(); g.arc(r() * 512, r() * 512, 2 + r() * 3, 0, 7); g.fill(); }
  g.globalAlpha = 1; return ctex(c);
};
export const weatherboard = (base = '#efe6cf', seed = 33) => {
  const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d');
  for (let i = 0; i < 8; i++) { g.fillStyle = base; g.fillRect(0, i * 64, 512, 64); g.fillStyle = 'rgba(80,60,40,0.35)'; g.fillRect(0, i * 64 + 56, 512, 8); }
  return ctex(c);
};
export const corrugated = (base = '#a9b2b6', seed = 34) => {
  const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d');
  for (let x = 0; x < 256; x++) { const k = 0.8 + 0.2 * Math.sin(x / 256 * Math.PI * 16); g.fillStyle = `rgb(${Math.round(169 * k)},${Math.round(178 * k)},${Math.round(182 * k)})`; g.fillRect(x, 0, 1, 256); }
  return ctex(c);
};
