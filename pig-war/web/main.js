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
  H.party.visible = w.partyOn;
  H.ships.forEach((s, i) => { s.userData.roll.rotation.x = 0.03 * Math.sin(f * 0.05 + i); s.position.y = -0.4 + 0.08 * Math.sin(f * 0.07 + i * 2); });
  H.usFlag.rotation.y = 0.15 * w.flagWave;
  beginCards(); for (const a of actorsAt(f)) putCard(a); endCards();
  const d = S.dof(f), Lk = lookAt(f);
  look.cInf = d.c; look.focus = d.pt ? camera.position.distanceTo(new THREE.Vector3(...d.pt)) : 10;
  look.flash = Lk.flash; look.fade = Lk.fade || 0;
  renderAll();
  return true;
};
window.TOTAL = TOTAL;
window.ready = true;
