import { THREE, camera, applyLight, look, renderAll, setCam, camFromKeys, kick, beginCards, endCards, putCard } from './engine.js';
import { build } from './world.js';
import { shotAt, worldAt, actorsAt, lookAt, TOTAL } from './story.js';

const H = build();
window.renderFrame = (f) => {
  const S = shotAt(f), w = worldAt(f);
  const st = camFromKeys(S.cam, f);
  let sh = [0, 0]; for (const [at, amp] of S.kicks || []) { const k = kick(f, at, amp); sh = [sh[0] + k * 0.6, sh[1] + k]; }
  setCam(st, sh);
  applyLight(S.light, S.at, w.l2, w.lt, S.span);
  H.islands.forEach((g, i) => { const s = w.islands[i]; g.visible = s > 0.01; g.scale.set(Math.max(0.01, s), Math.max(0.01, s), Math.max(0.01, s)); });
  H.perch.visible = w.islands[0] > 0.9;
  H.rocks.forEach((r) => { r.visible = false; }); for (const R of w.rocks) { const r = H.rocks[R.i]; r.visible = true; r.position.set(...R.pos); r.rotation.set(R.rot, R.rot * 0.6, 0); }
  H.bamboo.visible = H.halfA.visible = H.halfB.visible = false;
  if (w.bamboo) {
    if (w.split > 0) { for (const [h, s] of [[H.halfA, 1], [H.halfB, -1]]) { h.visible = true; h.position.set(w.bamboo.pos[0], w.bamboo.pos[1], w.bamboo.pos[2] + s * 0.45 * w.split); h.rotation.set(0, 0, w.bamboo.lying ? -Math.PI / 2 : 0); h.scale.setScalar(w.bamboo.lying ? 0.55 : 1); h.rotation.x = s * 0.5 * w.split; } }
    else { H.bamboo.visible = true; H.bamboo.position.set(...w.bamboo.pos); H.bamboo.rotation.set(0, 0, w.bamboo.lying ? -Math.PI / 2 : 0); H.bamboo.scale.setScalar(w.bamboo.lying ? 0.55 : 0.85); if (w.bamboo.lying) H.bamboo.position.x += 0; }
  }
  beginCards(); for (const a of actorsAt(f)) putCard(a); endCards();
  const d = S.dof(f), Lk = lookAt(f);
  look.cInf = d.c; look.focus = d.pt ? camera.position.distanceTo(new THREE.Vector3(...d.pt)) : 10;
  look.flash = Lk.flash; look.fade = Lk.fade || 0; look.wipe = Lk.wipe; look.iris = Lk.iris; look.irisC = Lk.irisC; look.grain = 0.015; look.t = f;
  renderAll();
  return true;
};
window.TOTAL = TOTAL;
window.ready = true;
