import { THREE, scene, camera, applyLight, look, renderAll, setCam, camFromKeys, kick, beginCards, endCards, putCard } from './engine.js';
import { build, GX } from './world.js';
import { shotAt, worldAt, actorsAt, lookAt, TOTAL } from './story.js';

const H = build();
const pitLight = new THREE.PointLight('#ff9a50', 2.4, 14, 1.4); pitLight.position.set(GX + 5.5, 1.0, 1.2); scene.add(pitLight);
H.hammerOnStand.visible = false; // the hammer is gone from the first frame on

window.renderFrame = (f) => {
  const S = shotAt(f), w = worldAt(f);
  const st = camFromKeys(S.cam, f);
  let sh = [0, 0]; for (const [at, amp] of S.kicks || []) { const k = kick(f, at, amp); sh = [sh[0] + k * 0.6, sh[1] + k]; }
  setCam(st, sh);
  applyLight(S.light, S.at, null, 0, S.span);
  pitLight.intensity = 2.2 + 0.4 * Math.sin(f * 0.7) + 0.2 * Math.sin(f * 1.9);
  H.barrels.forEach((b, i) => { b.rotation.z = -1.3 * w.tip[i]; b.position.y = 1.08 + 0.18 * w.tip[i]; });
  beginCards(); for (const a of actorsAt(f)) putCard(a); endCards();
  const d = S.dof(f), Lk = lookAt(f);
  look.cInf = d.c; look.focus = d.pt ? camera.position.distanceTo(new THREE.Vector3(...d.pt)) : 10;
  look.flash = Lk.flash; look.fade = Lk.fade || 0;
  renderAll();
  return true;
};
window.TOTAL = TOTAL;
window.ready = true;
