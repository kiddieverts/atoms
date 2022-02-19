import { ColNum, MelodyTransformation } from "../types";
import { generateMelodies } from "../utils/helpers";

export const doVoiceA = (m: MelodyTransformation): MelodyTransformation => _generate(m, 1);
export const doVoiceB = (m: MelodyTransformation): MelodyTransformation => _generate(m, 2);
export const doVoiceC = (m: MelodyTransformation): MelodyTransformation => _generate(m, 3);
export const doVoiceD = (m: MelodyTransformation): MelodyTransformation => _generate(m, 4);

const _generate = (m: MelodyTransformation, num: ColNum): MelodyTransformation => {
  const x = generateMelodies(m[0][0], num);
  const final: MelodyTransformation = [x, m[1], m[2]];
  return final;
}