import { THREE, scene, camera, applyLight, look, renderAll, setCam, camFromKeys, kick, beginCards, endCards, putCard } from './engine.js';
import { build, VX } from './world.js';
import { shotAt, worldAt, actorsAt, lookAt, TOTAL } from './story.js';

const H = build();
const fireLight = new THREE.PointLight('#ffb060', 0, 9, 1.6); fireLight.position.set(VX, 0.9, 1.2); scene.add(fireLight);

window.renderFrame = (f) => {
  const S = shotAt(f), w = worldAt(f);
  const st = camFromKeys(S.cam, f);
  let sh = [0, 0]; for (const [at, amp] of S.kicks || []) { const k = kick(f, at, amp); sh = [sh[0] + k * 0.6, sh[1] + k]; }
  setCam(st, sh);
  applyLight(S.light, S.at, w.light2 || null, w.lightT || 0, S.span);
  H.snake.set(w.snake || { vis: false });
  H.fire.visible = fireLight.visible = !!w.fire;
  fireLight.intensity = w.fire ? 2.2 + 0.5 * Math.sin(f * 0.9) + 0.3 * Math.sin(f * 2.3) : 0;
  beginCards(); for (const a of actorsAt(f)) putCard(a); endCards();
  const d = S.dof(f), Lk = lookAt(f);
  look.cInf = d.c; look.focus = d.pt ? camera.position.distanceTo(new THREE.Vector3(...d.pt)) : 10;
  look.flash = Lk.flash; look.fade = Lk.fade || 0;
  renderAll();
  return true;
};
window.TOTAL = TOTAL;
window.ready = true;
