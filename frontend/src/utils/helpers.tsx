import { MelodyTransformation, VoiceTransformationFunction, ColNum, Patch, Scale, } from '../types';

export const applyToAllVoices = ({ melodies: melo, scale, tempo }: MelodyTransformation, fn: VoiceTransformationFunction): MelodyTransformation => {
    const melodies = melo.map(me => fn(me, scale));
    return { melodies, scale, tempo }
}

export const runPatch = (a: ColNum, b: ColNum, c: ColNum, d: ColNum, e: ColNum, f: ColNum, patch: Patch, scale: Scale): MelodyTransformation => {
    const fnOne = patch[1][a];
    const fnTwo = patch[2][b];
    const fnThree = patch[3][c];
    const fnFour = patch[4][d];
    const fnFive = patch[5][e];
    const fnSix = patch[6][f];
    const startWith = fnOne(scale, 120.0);

    return fnSix(fnFive(fnFour(fnThree(fnTwo(startWith)))));
}
