import { pack, unpack } from "../utils/packing.js";

export const transposeDownTwoOctaves = m => transpose(m, -24);
export const transposeDownOneOctave = m => transpose(m, -12);
export const transposeUpOneOctave = (m) => transpose(m, + 12);
export const transposeUpTwoOctaves = (m) => transpose(m, 24);

export const transposeZero = m => transpose(m, 0);

const transpose = (m, val) => {
  const { melodies, scale, tempo } = m;

  const transposedMelodies = melodies.map(melo => {
    let [p, r] = unpack(melo);
    p = p.map(pp => (pp + val > 0 ? pp - 24 + val : null));
    const packed = pack(p, r);
    return packed;
  })

  return { melodies: transposedMelodies, scale, tempo };
}
