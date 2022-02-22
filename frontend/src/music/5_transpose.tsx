import { MelodyTransformation, Pitch, TransformationFunction } from "../types";
import { pack, unpack } from "../utils/packing";

export const transposeDownTwoOctaves: TransformationFunction = m => transpose(m, -24);
export const transposeDownOneOctave: TransformationFunction = m => transpose(m, -12);
export const transposeUpOneOctave: TransformationFunction = (m) => transpose(m, + 12);
export const transposeUpTwoOctaves: TransformationFunction = (m) => transpose(m, 24);

export const transposeZero: TransformationFunction = m => transpose(m, 0);

const transpose = (m: MelodyTransformation, val: number): MelodyTransformation => {
  const { melodies, scale, tempo } = m;

  const transposedMelodies = melodies.map(melo => {
    let [p, r] = unpack(melo);
    p = p.map(pp => (pp + val > 0 ? pp - 24 + val : null) as Pitch);
    const packed = pack(p, r);
    return packed;
  })

  return { melodies: transposedMelodies, scale, tempo };
}
