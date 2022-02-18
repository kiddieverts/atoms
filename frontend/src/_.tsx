import { retrograde, eightNotesTwoAndSixUpOctave, upDiatonicThird, retrogradeEveryOther } from './music/melody-transform'
import { generateVoiceB, generateVoiceC, generateVoiceD } from './music/melody-generator';
import { Melody, MelodySingleTransformation, MelodyTransformation, Patch, MelodyTransFunc, Scale, Pitch, ColNum, Duration, MelodyNote } from './types';
import { melodyA, melodyB, melodyC, melodyD } from './music/melody-picker';
import { pack, unpack } from "./utils/packing";

/* HELPERS */

const makeMelody = (m: MelodyTransformation, melody: Melody): MelodyTransformation => {
  const [, scale, tempo] = m;
  const x: MelodyNote[] = melody.map(arr => {
    return [arr[0] - 36 as Pitch, arr[1] as Duration];
  });
  const result: MelodyTransformation = [[x], scale, tempo];
  return result;
}

const plugFn = (m: MelodyTransformation, fn: MelodySingleTransformation): MelodyTransformation => {
  const [melo] = m;
  let [p, r] = unpack(melo[0]);
  [p, r] = fn(p, r);

  const packed = pack(p, r);
  const result: MelodyTransformation = [[packed], ['C'], 120];
  return result;
}

const generateMelodies = (m: Melody, numberOfVoices: 1 | 2 | 3 | 4) => {
  const all = [m, generateVoiceB(m), generateVoiceC(m), generateVoiceD(m)];
  return all.slice(0, numberOfVoices);
}

/* */

const getMelody1 = (m: MelodyTransformation) => makeMelody(m, melodyA);
const getMelody2 = (m: MelodyTransformation) => makeMelody(m, melodyB);
const getMelody3 = (m: MelodyTransformation) => makeMelody(m, melodyC);
const getMelody4 = (m: MelodyTransformation) => makeMelody(m, melodyD);

const _transpose = (m: MelodyTransformation, val: number): MelodyTransformation => {
  const [melo] = m;
  let [p, r] = unpack(melo[0]);
  p = p.map(pp => (pp + val > 0 ? pp + val : null) as Pitch);
  const x = pack(p, r);
  return [[x], m[1], m[2]];
}

const transposeDownOneOctave: MelodyTransFunc = (m) => _transpose(m, -12);
const transposeNone: MelodyTransFunc = (m) => m;
const transposeUpOneOctave = (m) => _transpose(m, 12);
const transposeUpTwoOctaves = (m) => _transpose(m, 24);

// const noOperation: MelodyTransFunc = (m) => m;

const tempo30 = (m: MelodyTransformation) => {
  const [melo, scale] = m;
  const result: MelodyTransformation = [melo, scale, 30.0];
  return result;
}
const tempo60 = (m: MelodyTransformation) => {
  const [melo, scale] = m;
  const result: MelodyTransformation = [melo, scale, 60.0];
  return result;
}
const tempo120 = (m: MelodyTransformation) => {
  const [melo, scale] = m;
  const result: MelodyTransformation = [melo, scale, 120.0];
  return result;
}
const tempo180 = (m: MelodyTransformation) => {
  const [melo, scale] = m;
  const result: MelodyTransformation = [melo, scale, 180.0];
  return result;
}

export const patch: Patch = {
  1: {
    1: getMelody1,
    2: getMelody2,
    3: getMelody3,
    4: getMelody4
  },
  2: {
    1: (m) => plugFn(m, retrograde),
    2: (m) => plugFn(m, eightNotesTwoAndSixUpOctave),
    3: (m) => plugFn(m, upDiatonicThird),
    4: (m) => plugFn(m, retrogradeEveryOther),
  },
  3: {
    1: transposeDownOneOctave,
    2: transposeNone,
    3: transposeUpOneOctave,
    4: transposeUpTwoOctaves
  },
  4: {
    1: (m) => {
      const x = generateMelodies(m[0][0], 1);
      const final: MelodyTransformation = [x, m[1], m[2]];
      return final;
    },
    2: (m) => {
      const x = generateMelodies(m[0][0], 2);
      const final: MelodyTransformation = [x, m[1], m[2]];
      return final;
    },
    3: (m) => {
      const x = generateMelodies(m[0][0], 3);
      const final: MelodyTransformation = [x, m[1], m[2]];
      return final;
    },
    4: (m) => {
      const x = generateMelodies(m[0][0], 4);
      const final: MelodyTransformation = [x, m[1], m[2]];
      return final;
    }
  },
  5: {
    1: tempo30,
    2: tempo60,
    3: tempo120,
    4: tempo180,
  }
}

// export const patch: Patch = {
//   1: {
//     1: getMelody1,
//     2: getMelody2,
//     3: getMelody3,
//     4: getMelody4
//   },
//   2: {
//     1: noOperation,
//     2: noOperation,
//     3: noOperation,
//     4: noOperation
//   },
//   3: {
//     1: noOperation,
//     2: noOperation,
//     3: noOperation,
//     4: noOperation
//   },
//   4: {
//     1: noOperation,
//     2: noOperation,
//     3: noOperation,
//     4: noOperation
//   },
//   5: {
//     1: noOperation,
//     2: noOperation,
//     3: noOperation,
//     4: noOperation,
//   }
// }

export const makeVoices = (a: ColNum, b: ColNum, c: ColNum, d: ColNum, e: ColNum, obj: Patch, scale: Scale): MelodyTransformation => {
  const fnOne = obj[1][a];
  const fnTwo = obj[2][b];
  const fnThree = obj[3][c];
  const fnFour = obj[4][d];
  const fnFive = obj[5][e];

  return fnFive(fnFour(fnThree(fnTwo(fnOne([[]], scale, 120.0)))));
}

// const voices = makeVoices(1, 2, 3, 4, 4, patch, ['C', 'D', 'E', 'F#', 'G', 'A', 'B']);

