import { unpack } from '../utils/packing.js';

export const generateVoices = (patch, scale, state, totalNumberOfBeats) => {
  const { melodies, tempo } = runPatch(state, patch, scale);
  const voices = combineMelodies(melodies, totalNumberOfBeats);

  return { voices, tempo };
}

const runPatch = (state, patch, scale) => {
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

const combineMelodies = (melodies, totalNumberOfBeats) => {
  const combined = [];

  for (let i = 0; i < totalNumberOfBeats; i++) {
    combined.push([]);
  }

  for (let i = 0; i < melodies.length; i++) {
    const melody = melodies[i];
    const newArr = calculateVoice(melody, i, totalNumberOfBeats);

    for (let j = 0; j < newArr.length; j++) {
      combined[j] = [...combined[j], newArr[j]];
    }
  }

  return combined;
}

const calculateVoice = (m, melodyId, totalNumberOfBeats) => {
  let nextStep = {}
  const timeline = [];

  const [pitches, rhythm] = doUnpack(m);

  for (let counter = 0; counter < totalNumberOfBeats; counter++) {
    let next = nextStep[melodyId];

    const ns = next === undefined
      ? 1
      : next === rhythm.length - 1
        ? 0
        : next + 1;

    nextStep[melodyId] = ns;

    timeline.push([pitches[ns - 1], rhythm[ns - 1]]);
  }

  return timeline;
}

const doUnpack = (melody) => {
  const arr = [];
  for (let i = 0; i < melody.length; i++) {
    const [p, r] = melody[i];
    const repeats = r - 1;

    arr.push([p, r]);
    for (let j = 0; j < repeats; j++) {
      arr.push([null, null]);
    }
  }
  return unpack(arr);
}


