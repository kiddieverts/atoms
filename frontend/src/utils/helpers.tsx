import { MelodyTransformation, VoiceTransformationFunction, ColNum, Patch, Scale, } from '../types';

export const applyToAllVoices = ({ melodies: melo, scale, tempo }: MelodyTransformation, fn: VoiceTransformationFunction): MelodyTransformation => {
    const melodies = melo.map(me => fn(me, scale));
    return { melodies, scale, tempo }
}

export const runPatch = (a: ColNum, b: ColNum, c: ColNum, d: ColNum, e: ColNum, f: ColNum, patch: Patch, scale: Scale): MelodyTransformation => {
    const fnOne = patch[1][a][0];

    const fnTwo = patch[2][b][0];
    const fnThree = patch[3][c][0];
    const fnFour = patch[4][d][0];
    const fnFive = patch[5][e][0];
    const fnSix = patch[6][f][0];
    const startWith = fnOne(scale, 120.0);

    const x = fnSix(fnFive(fnFour(fnThree(fnTwo(startWith)))));

    return x;
}
