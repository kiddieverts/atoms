import { generateVoiceB, generateVoiceC, generateVoiceD } from "../music/melody-generator";
import { MelodyTransformation, MelodyNote, Pitch, Melody, Duration, MelodySingleTransformation, ColNum, Patch, Scale } from "../types";
import { pack, unpack } from "./packing";

export const makeMelody = (m: MelodyTransformation, melody: Melody): MelodyTransformation => {
    const [, scale, tempo] = m;
    const x: MelodyNote[] = melody.map(arr => {
        return [arr[0] - 36 as Pitch, arr[1] as Duration];
    });
    const result: MelodyTransformation = [[x], scale, tempo];
    return result;
}

export const plugFn = (m: MelodyTransformation, fn: MelodySingleTransformation): MelodyTransformation => {
    const [melo] = m;
    let [p, r] = unpack(melo[0]);
    [p, r] = fn(p, r);

    const packed = pack(p, r);
    const result: MelodyTransformation = [[packed], ['C'], 120];
    return result;
}

export const generateMelodies = (m: Melody, numberOfVoices: 1 | 2 | 3 | 4) => {
    const all = [m, generateVoiceB(m), generateVoiceC(m), generateVoiceD(m)];
    return all.slice(0, numberOfVoices);
}

export const makeVoices = (a: ColNum, b: ColNum, c: ColNum, d: ColNum, e: ColNum, patch: Patch, scale: Scale): MelodyTransformation => {
    const fnOne = patch[1][a];
    const fnTwo = patch[2][b];
    const fnThree = patch[3][c];
    const fnFour = patch[4][d];
    const fnFive = patch[5][e];

    return fnFive(fnFour(fnThree(fnTwo(fnOne([[]], scale, 120.0)))));
}
