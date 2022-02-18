import { MelodyTransformation } from "../types";
import { generateMelodies } from "../utils/helpers";

export const doVoiceA = (m: MelodyTransformation): MelodyTransformation => {
  const x = generateMelodies(m[0][0], 1);
  const final: MelodyTransformation = [x, m[1], m[2]];
  return final;
};

export const doVoiceB = (m: MelodyTransformation): MelodyTransformation => {
  const x = generateMelodies(m[0][0], 2);
  const final: MelodyTransformation = [x, m[1], m[2]];
  return final;
};

export const doVoiceC = (m: MelodyTransformation): MelodyTransformation => {
  const x = generateMelodies(m[0][0], 3);
  const final: MelodyTransformation = [x, m[1], m[2]];
  return final;
};

export const doVoiceD = (m: MelodyTransformation): MelodyTransformation => {
  const x = generateMelodies(m[0][0], 4);
  const final: MelodyTransformation = [x, m[1], m[2]];
  return final;
};