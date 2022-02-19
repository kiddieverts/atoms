import { MelodyTransformation, MelodyNote, Pitch, Melody, MelodySingleTransformation, ColNum, Patch, Scale } from '../types';
import { pack, unpack } from './packing';

export const makeMelody = (m: MelodyTransformation, melody: Melody): MelodyTransformation => {
    const { scale, tempo } = m;
    const transposed: MelodyNote[] = melody.map(([p, r]) => ([p - 36 as Pitch, r]));
    return { melodies: [transposed], scale, tempo };
}

export const plugFn = (m: MelodyTransformation, fn: MelodySingleTransformation): MelodyTransformation => {
    const { melodies: melo, scale, tempo } = m;
    let [p, r] = unpack(melo[0]);
    [p, r] = fn(p, r);

    const packed = pack(p, r);
    return { melodies: [packed], scale, tempo }
}

export const runPatch = (a: ColNum, b: ColNum, c: ColNum, d: ColNum, e: ColNum, patch: Patch, scale: Scale): MelodyTransformation => {
    const fnOne = patch[1][a];
    const fnTwo = patch[2][b];
    const fnThree = patch[3][c];
    const fnFour = patch[4][d];
    const fnFive = patch[5][e];
    const startWith = fnOne([[]], scale, 120.0);

    return fnFive(fnFour(fnThree(fnTwo(startWith))));
}
