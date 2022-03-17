
import { unpack } from '../../atoms-nft/index.js';

import { TOTAL_NUMBER_OF_TICKS } from '../constant.js'

export const combineMelodies = (melodies) => {
  const combined = [];

  for (let i = 0; i < TOTAL_NUMBER_OF_TICKS; i++) {
    combined.push([]);
  }

  for (let i = 0; i < melodies.length; i++) {
    const melody = melodies[i];
    const newArr = calculateVoice(melody, i);

    for (let j = 0; j < newArr.length; j++) {
      combined[j] = [...combined[j], newArr[j]];
    }
  }

  return combined;
}

const calculateVoice = (m, melodyId) => {
  let nextStep = {}
  const timeline = [];

  const [pitches, rhythm] = doUnpack(m);

  for (let counter = 0; counter < TOTAL_NUMBER_OF_TICKS; counter++) {
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


