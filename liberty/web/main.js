import { THREE, camera, applyLight, look, renderAll, setCam, camFromKeys, kick, beginCards, endCards, putCard } from './engine.js';
import { build, tintStatue } from './world.js';
import { shotAt, worldAt, actorsAt, lookAt, TOTAL } from './story.js';

const H = build();

window.renderFrame = (f) => {
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
