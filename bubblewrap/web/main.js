// Starting point for a new project's web/main.js (copy over main.js). Wires TRANSITIONS from story.js into the camera + post look.
import { THREE, camera, applyLight, look, renderAll, setCam, camFromKeys, kick, beginCards, endCards, putCard } from './engine.js';
import { build } from './world.js';
import * as STORY from './story.js';
import { transAt } from './transitions.js';
const { shotAt, worldAt, actorsAt, lookAt, TOTAL } = STORY;
const TRANSITIONS = STORY.TRANSITIONS || [];

const H = build();

window.renderFrame = (f) => {
  const S = shotAt(f), w = worldAt(f), T = transAt(f, TRANSITIONS);
  const st0 = camFromKeys(S.cam, f), st = { ...st0, fov: st0.fov * T.fov };
  let sh = T.shake ? [T.shake * Math.sin(f * 3.1), T.shake * Math.cos(f * 2.3)] : [0, 0];
  for (const [at, amp] of S.kicks || []) { const k = kick(f, at, amp); sh = [sh[0] + k * 0.6, sh[1] + k]; }
  setCam(st, sh);
  applyLight(S.light, S.at, null, 0, S.span);
  H.shipSign.visible = S.id === 'ibm';
  H.platen.position.y = 0.9 - 0.85 * w.press;
  H.sheetA.visible = w.sealed; H.plainA.visible = !w.sealed;
  H.plants.forEach((l, i) => { l.scale.set(1 + 0.2 * w.wilt, 1 - 0.55 * w.wilt, 1); l.material.color.set(w.wilt > 0.5 ? '#8a8a3a' : '#5aa04a'); });
  H.wrap.visible = w.wrapped > 0.02; H.wrap.scale.setScalar(Math.max(0.02, 0.6 + 0.4 * w.wrapped));
  const d = S.dof(f), L = lookAt(f);
  look.cInf = d.c; look.focus = d.pt ? camera.position.distanceTo(new THREE.Vector3(...d.pt)) : 10;
  look.flash = L.flash; Object.assign(look, T.look);
  beginCards(); for (const a of actorsAt(f)) putCard(a); endCards();
  renderAll();
  return true;
};
window.TOTAL = TOTAL;
window.ready = true;
