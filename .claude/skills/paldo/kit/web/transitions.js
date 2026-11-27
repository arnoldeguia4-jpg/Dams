// PALDO transitions: frame-based "look" overrides for shot cuts (user request 2026-11-27: pleasing effects + transitions).
// Usage in story.js:  export const TRANSITIONS = [[frameOfCut, 'whip'], [f2, 'zoom'], [f3, 'iris'], [f4, 'punch']];
// Usage in main.js:   import { transAt } from './transitions.js';  ...  const T = transAt(f, TRANSITIONS); Object.assign(look, T.look); camera shake/zoom via T.fov, T.shake.
//   whip  - fast directional smear across the cut (±5 frames), alternate direction per cut; feels like a whip-pan.
//   zoom  - radial zoom-blur into the cut and out of it (±5 frames) + fov punch; good for time jumps / reveals.
//   iris  - classic cartoon iris-out to black, then iris-in on the new shot (±9 frames); use 1–2 per video max.
//   punch - quick 8% punch-in (fov) on a beat word with a tiny shake; no blur. Use on key words, not on cuts.
//   flash - white flash (already handled by FLASHES in story.js); keep for big time/place jumps.
const sm = (x) => x * x * (3 - 2 * x);
export const transAt = (f, list = []) => {
  const look = { zoomB: 0, whip: [0, 0], iris: 2 }; let fov = 1, shake = 0;
  list.forEach(([c, kind], i) => {
    const d = f - c;
    if (kind === 'whip' && Math.abs(d) <= 5) { const k = 1 - Math.abs(d) / 6; const dir = i % 2 ? -1 : 1; look.whip = [dir * 0.09 * sm(k), 0]; }
    if (kind === 'zoom' && Math.abs(d) <= 5) { const k = 1 - Math.abs(d) / 6; look.zoomB = Math.max(look.zoomB, 0.22 * sm(k)); fov = Math.min(fov, d < 0 ? 1 - 0.25 * sm(k) : 1 + 0.12 * sm(k)); }
    if (kind === 'iris' && Math.abs(d) <= 9) { const k = Math.abs(d) / 9; look.iris = Math.min(look.iris, 0.02 + 0.95 * sm(k)); }
    if (kind === 'punch' && d >= 0 && d <= 10) { const k = 1 - d / 10; fov = Math.min(fov, 1 - 0.08 * sm(k)); shake = Math.max(shake, 0.02 * k); }
  });
  return { look, fov, shake };
};
