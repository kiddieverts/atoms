import { MelodyTransformation } from '../types';

export const tempo30 = (m: MelodyTransformation) => {
  const { melodies, scale } = m;
  return { melodies, scale, tempo: 30.0 };
}
export const tempo60 = (m: MelodyTransformation) => {
  const { melodies, scale } = m;
  return { melodies, scale, tempo: 60.0 };
}
export const tempo120 = (m: MelodyTransformation) => {
  const { melodies, scale } = m;
  return { melodies, scale, tempo: 120.0 };
}
export const tempo180 = (m: MelodyTransformation) => {
  const { melodies, scale } = m;
  return { melodies, scale, tempo: 180.0 };
}