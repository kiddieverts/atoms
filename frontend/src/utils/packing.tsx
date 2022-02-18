import { UnpackingFunction, PackingFunction } from "../types";

export const unpack: UnpackingFunction = (m) => {
  const pitches = [];
  const rhythm = [];
  for (let i = 0; i <= m.length - 1; i++) {
    pitches.push(m[i][0]);
    rhythm.push(m[i][1]);
  }

  return [pitches, rhythm];
}

export const pack: PackingFunction = (pitches, rhythm) => {
  const arr = [];
  for (let i = 0; i <= pitches.length - 1; i++) {
    arr.push([pitches[i], rhythm[i]]);
  }
  return arr;
}
