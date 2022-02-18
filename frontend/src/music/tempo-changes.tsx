import { MelodyTransformation } from '../types';

export const tempo30 = (m: MelodyTransformation) => {
  const [melo, scale] = m;
  const result: MelodyTransformation = [melo, scale, 30.0];
  return result;
}
export const tempo60 = (m: MelodyTransformation) => {
  const [melo, scale] = m;
  const result: MelodyTransformation = [melo, scale, 60.0];
  return result;
}
export const tempo120 = (m: MelodyTransformation) => {
  const [melo, scale] = m;
  const result: MelodyTransformation = [melo, scale, 120.0];
  return result;
}
export const tempo180 = (m: MelodyTransformation) => {
  const [melo, scale] = m;
  const result: MelodyTransformation = [melo, scale, 180.0];
  return result;
}