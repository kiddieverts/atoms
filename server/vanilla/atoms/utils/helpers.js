export const applyToAllVoices = ({ melodies: melo, scale, tempo }, fn) => {
    const melodies = melo.map(me => fn(me, scale));
    return { melodies, scale, tempo }
}

export const runPatch = (state, patch, scale) => {
    const a = state[1];
    const b = state[2];
    const c = state[3];
    const d = state[4];
    const e = state[5];
    const f = state[6];

    const fnOne = patch[1][a][0];

    const fnTwo = patch[2][b][0];
    const fnThree = patch[3][c][0];
    const fnFour = patch[4][d][0];
    const fnFive = patch[5][e][0];
    const fnSix = patch[6][f][0];
    const startWith = fnOne(scale, 120.0);

    return fnSix(fnFive(fnFour(fnThree(fnTwo(startWith)))));
}
