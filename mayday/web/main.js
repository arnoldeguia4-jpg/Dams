import { THREE, camera, applyLight, look, renderAll, setCam, camFromKeys, kick, beginCards, endCards, putCard } from './engine.js';
import { build } from './world.js';
import { shotAt, worldAt, actorsAt, lookAt, TOTAL } from './story.js';

const H = build();

window.renderFrame = (f) => {
  const S = shotAt(f), w = worldAt(f);
  const st = camFromKeys(S.cam, f);
  let sh = [0, 0]; for (const [at, amp] of S.kicks || []) { const k = kick(f, at, amp); sh = [sh[0] + k * 0.6, sh[1] + k]; }
  setCam(st, sh);
  applyLight(S.light, S.at, null, 0, S.span);
  H.flyer.position.y = -1.6 + w.bob; H.flyer.rotation.x = w.roll;
  H.flyer.userData.prop.rotation.x = f * 1.3; H.parked.userData.prop.rotation.x = 0.4;
  H.globe.rotation.y = w.globe;
  H.tubes.forEach((t, i) => t.scale.setScalar(0.9 + 0.15 * Math.sin(f * 0.5 + i)));
  const d = S.dof(f), L = lookAt(f);
  look.cInf = d.c; look.focus = d.pt ? camera.position.distanceTo(new THREE.Vector3(...d.pt)) : 10;
  look.flash = L.flash;
  beginCards(); for (const a of actorsAt(f)) putCard(a); endCards();
  renderAll();
  return true;
};
window.TOTAL = TOTAL;
window.ready = true;
