import { THREE, camera, applyLight, look, renderAll, setCam, camFromKeys, kick, beginCards, endCards, putCard } from './engine.js';
import { build, tintStatue } from './world.js';
import { shotAt, worldAt, actorsAt, lookAt, TOTAL } from './story.js';

const H = build();
const WN = [0.0, 2.6100000000000003, 4.61, 6.15, 11.51, 14.209999999999999, 16.45, 17.71, 19.71, 21.61, 23.25, 27.11, 28.73, 30.009999999999998, 33.25, 35.45, 37.45, 39.71, 41.730000000000004, 44.07, 45.39, 49.39, 51.59, 53.99, 56.450612], WO = [0.0, 2.658, 4.623, 5.612, 9.053, 11.494, 14.256, 16.491, 18.133, 19.725, 21.647, 25.505, 27.11, 28.759, 33.278, 35.395, 37.41, 39.765, 41.744, 44.082, 45.389, 49.353, 51.604, 54.009, 56.450612];
const warp = (f) => { if (f >= TOTAL) return f; const t = f / 30; let i = 0; while (i < WN.length - 2 && t > WN[i + 1]) i++; const u = (t - WN[i]) / (WN[i + 1] - WN[i]); return (WO[i] + Math.max(0, Math.min(1, u)) * (WO[i + 1] - WO[i])) * 30; };

window.renderFrame = (f0) => {
  const f = warp(f0);
  const S = shotAt(f), w = worldAt(f);
  const st = camFromKeys(S.cam, f);
  let sh = [0, 0]; for (const [at, amp] of S.kicks || []) { const k = kick(f, at, amp); sh = [sh[0] + k * 0.6, sh[1] + k]; }
  setCam(st, sh);
  applyLight(S.light, S.at, null, 0, S.span);
  tintStatue(H, w.tint);
  H.gift.visible = w.giftVis;
  H.gift.position.y = 2.7 + 70 * w.gift; H.gift.rotation.y = 0.6 * w.gift;
  H.buckets.visible = true;
  H.flame.scale.set(1, 0.9 + 0.15 * Math.sin(f * 0.6), 1);
  H.water.material.map.offset.set(f * 0.0006, f * 0.0004);
  const d = S.dof(f), L = lookAt(f);
  look.cInf = d.c; look.focus = d.pt ? camera.position.distanceTo(new THREE.Vector3(...d.pt)) : 10;
  look.flash = L.flash;
  beginCards(); for (const a of actorsAt(f)) putCard(a); endCards();
  renderAll();
  return true;
};
window.TOTAL = TOTAL;
window.ready = true;
