// LUGAR recurring cast (the channel's regulars). Reuse these specs and names in every video so viewers recognise them.
// import { CAST } from './castSpecs.js'; const dams = makeBlocky(CAST.dams);
export const CAST = {
  // Dams — the narrator ("ako"). Poor-but-happy look; `damsRich` is his rich outfit when the story needs it.
  dams: { name: 'Dams', skin: '#b8794f', shirt: '#f08a2c', pants: '#2b3b7a', hair: 'blocky', seed: 1 },
  damsRich: { name: 'Dams', skin: '#b8794f', shirt: '#6a3a8a', pants: '#2a2a34', hair: 'blocky', sash: '#f2c440', seed: 1 },
  // Don Francis — the richest man in the place, mansion + three cars.
  donFrancis: { name: 'Don Francis', skin: '#d29c6e', shirt: '#7a1f2a', pants: '#2a2a34', hair: 'grey', glasses: true, sash: '#f2c440', belly: 1.25, seed: 3 },
  // Nanay Kimberly — Dams's mother, the wise one ("Anak, …").
  nanayKimberly: { name: 'Nanay Kimberly', skin: '#b8794f', shirt: '#7a5ac9', pants: '#3a2a5a', skirt: '#3a2a5a', hair: 'grey', glasses: true, seed: 4 },
  // Mang Jhano — fishball vendor, always laughing.
  mangJhano: { name: 'Mang Jhano', skin: '#a8704a', shirt: '#f4f1ea', sleeves: '#a8704a', pants: '#6a4a32', hair: 'cap', capColor: '#c2453c', moustache: '#2a201a', belly: 1.25, seed: 2 },
  // Neighbours
  alingNinya: { name: 'Aling Ninya', skin: '#c48a5e', shirt: '#3fa060', pants: '#3a3a44', hair: 'long', seed: 5 },
  biboy: { name: 'Biboy', skin: '#b07a52', shirt: '#e2453c', pants: '#2b3b7a', hair: 'cap', capColor: '#2b4c9a', kid: true, seed: 6 },
  mangTorres: { name: 'Mang Torres', skin: '#a8704a', shirt: '#2f8ad0', pants: '#4a3426', hair: 'curly', seed: 7 },
  jenny: { name: 'Jenny', skin: '#d29c6e', shirt: '#e88aa8', pants: '#5a3a5a', hair: 'bun', kid: true, seed: 8 },
  kuyaSteban: { name: 'Kuya Steban', skin: '#c48a5e', shirt: '#f2c440', pants: '#3a3a44', hair: 'blocky', hairColor: '#4a2a1a', seed: 9 },
};
// Wangbu — the family dog (brown blocky dog that laughs along). Build it with the dog() helper from lugar-tawa-hinahawa/web/story.js.
