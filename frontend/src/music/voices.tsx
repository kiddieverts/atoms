import { ColNum, MelodyTransformation } from "../types";
import { generateMelodies } from "../utils/helpers";

export const doVoiceA = (m: MelodyTransformation): MelodyTransformation => _generate(m, 1);
export const doVoiceB = (m: MelodyTransformation): MelodyTransformation => _generate(m, 2);
export const doVoiceC = (m: MelodyTransformation): MelodyTransformation => _generate(m, 3);
export const doVoiceD = (m: MelodyTransformation): MelodyTransformation => _generate(m, 4);

const _generate = (m: MelodyTransformation, num: ColNum): MelodyTransformation => {
  const { scale, tempo, melodies: melo } = m;
  const melodies = generateMelodies(melo[0], num);
  return { melodies, scale, tempo };
}