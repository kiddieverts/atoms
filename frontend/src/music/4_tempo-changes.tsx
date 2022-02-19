import { MelodyTransformation } from '../types';

export const tempo30 = (m: MelodyTransformation) => changeTempo(m, 30.0);
export const tempo60 = (m: MelodyTransformation) => changeTempo(m, 60.0);
export const tempo120 = (m: MelodyTransformation) => changeTempo(m, 120.0);
export const tempo180 = (m: MelodyTransformation) => changeTempo(m, 180.0);

const changeTempo = (m: MelodyTransformation, tempo: number) => {
  const { melodies, scale } = m;
  return { melodies, scale, tempo };
}