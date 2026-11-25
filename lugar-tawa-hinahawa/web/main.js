import { THREE, camera, applyLight, look, renderAll, setCam, camFromKeys, kick, beginCards, endCards, putCard } from './engine.js';
import { setup, shotAt, frameAt, lookAt, TOTAL } from './story.js';

// wait for the caption/sign font before building any canvas textures
try { await document.fonts.load('900 64px "Nunito Black"'); } catch (e) {}
const { H, R } = setup();
window.renderFrame = (f) => {
  const S = shotAt(f);
  const st = camFromKeys(S.cam, f);
  let sh = [0, 0]; for (const [at, amp] of S.kicks || []) { const k = kick(f, at, amp); sh = [sh[0] + k * 0.6, sh[1] + k]; }
  setCam(st, sh);
  applyLight(S.light, S.at, null, 0, S.span);
  const cards = frameAt(f, H, R);
  beginCards(); for (const a of cards) putCard(a); endCards();
  const d = S.dof(f), Lk = lookAt(f);
  look.cInf = d.c; look.focus = d.pt ? camera.position.distanceTo(new THREE.Vector3(...d.pt)) : 10;
  look.flash = Lk.flash; look.fade = 0; look.inkR = 0;
  renderAll();
  return true;
};
window.TOTAL = TOTAL;
window.ready = true;
