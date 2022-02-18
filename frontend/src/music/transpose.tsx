import { MelodyTransformation, MelodyTransFunc, Pitch } from "../types";
import { pack, unpack } from "../utils/packing";

const _transpose = (m: MelodyTransformation, val: number): MelodyTransformation => {
    const [melo] = m;
    let [p, r] = unpack(melo[0]);
    p = p.map(pp => (pp + val > 0 ? pp + val : null) as Pitch);
    const x = pack(p, r);
    return [[x], m[1], m[2]];
}

export const transposeDownOneOctave: MelodyTransFunc = (m) => _transpose(m, -12);
export const transposeNone: MelodyTransFunc = (m) => m;
export const transposeUpOneOctave = (m) => _transpose(m, 12);
export const transposeUpTwoOctaves = (m) => _transpose(m, 24);