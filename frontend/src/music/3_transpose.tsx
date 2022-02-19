import { MelodyTransformation, MelodyTransFunc, Pitch } from "../types";
import { pack, unpack } from "../utils/packing";

export const transposeDownOneOctave: MelodyTransFunc = (m) => _transpose(m, -12);
export const transposeNone: MelodyTransFunc = (m) => m;
export const transposeUpOneOctave = (m) => _transpose(m, 12);
export const transposeUpTwoOctaves = (m) => _transpose(m, 24);

const _transpose = (m: MelodyTransformation, val: number): MelodyTransformation => {
  const { melodies, scale, tempo } = m;
  let [p, r] = unpack(melodies[0]);
  p = p.map(pp => (pp + val > 0 ? pp + val : null) as Pitch);
  const packed = pack(p, r);
  return { melodies: [packed], scale, tempo };
}
