import { THREE, camera, applyLight, look, renderAll, setCam, camFromKeys, kick, beginCards, endCards, putCard } from './engine.js';
import { build } from './world.js';
import { shotAt, worldAt, actorsAt, lookAt, TOTAL } from './story.js';

const H = build();
window.renderFrame = (f) => {
  const S = shotAt(f);
  const st = camFromKeys(S.cam, f);
  let sh = [0, 0]; for (const [at, amp] of S.kicks || []) { const k = kick(f, at, amp); sh = [sh[0] + k * 0.6, sh[1] + k]; }
  setCam(st, sh);
  applyLight(S.light, S.at, null, 0, S.span);
  H.fireLight.intensity = 1.0 + 0.3 * Math.sin(f * 0.9) + 0.15 * Math.sin(f * 2.1);
  beginCards(); for (const a of actorsAt(f)) putCard(a); endCards();
  const d = S.dof(f), Lk = lookAt(f);
  look.cInf = d.c; look.focus = d.pt ? camera.position.distanceTo(new THREE.Vector3(...d.pt)) : 10;
  look.flash = Lk.flash; look.fade = Lk.fade || 0; look.wipe = Lk.wipe; look.iris = Lk.iris; look.irisC = Lk.irisC; look.grain = 0.025; look.t = f;
  renderAll();
  return true;
};
window.TOTAL = TOTAL;
window.ready = true;
