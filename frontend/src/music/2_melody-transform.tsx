import { MelodySingleTransformation, MelodyTransformation } from '../types';
import { plugFn } from '../utils/helpers';
import { unpack, pack } from '../utils/packing';

const SCALE = [0, 2, 4, 5, 7, 9, 11];

/* Retrograde */

export const retrograde: MelodySingleTransformation = (pitches, rhythm) => {
  const p = pack(pitches, rhythm);
  return unpack(p.reverse());
}

/* Eight notes two and six up are up an octave */

export const eightNotesTwoAndSixUpOctave: MelodySingleTransformation = (pitches, rhythm) => {
  const melody = pack(pitches, rhythm);

  const m = _make32Steps(melody);
  const arr = [];

  for (let i = 0; i <= m.length - 1; i++) {
    const stepsToBeTransposed = [3, 4, 13, 14, 19, 20, 27, 28];
    if (stepsToBeTransposed.indexOf(i) !== -1) {
      const newPitch = m[i][0] + 12;
      const duration = m[i][1];
      arr.push([newPitch, duration]);
    } else {
      arr.push(m[i]);
    }
  }

  return unpack(_makeCompact(arr));
}

/* Up a diatonic third */

export const upDiatonicThird: MelodySingleTransformation = (pitches, rhythm) => {
  const arr = [];
  for (let i = 0; i <= pitches.length - 1; i++) {
    const pitch = _transposeDiatonicUp(pitches[i], SCALE, 2);
    const duration = rhythm[i];
    arr.push([pitch, duration]);
  }
  return unpack(arr);
}

const _transposeDiatonicUp = (note: number, scale: number[], offset: number): number => {
  if (note === null) return null;

  let p = note;
  let octave = 0;
  while (p >= 12) {
    octave++;
    p = p - 12;
  }

  const i = scale.indexOf(p);
  const combined = scale.concat(scale.map(function (num) { return num + 12; }));
  return combined[i + offset] + (octave * 12);
}

/* Retrograde flipped within the mesasure */

export const retrogradeEveryOther: MelodySingleTransformation = (pitches, rhythm) => {
  const packed = pack(pitches, rhythm);
  const retrograde = packed.reverse();
  const m = _make32Steps(retrograde);
  const arr = _collectIntoBeats(m);
  const shuffled = [arr[1], arr[0], arr[3], arr[2]];
  const comb = _combineIntoOneArray(shuffled);
  const x = _makeCompact(comb);
  return unpack(x);
}

const _combineIntoOneArray = (comb) => {
  const arr = [];
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= comb[i].length - 1; j++) {
      arr.push(comb[i][j]);
    }
  }
  return arr;
}

const _collectIntoBeats = (m) => {
  const arr = [];
  for (let i = 0; i <= 3; i++) {
    const step = 8 * i;
    const a = [];
    for (let j = step; j <= step + 7; j++) {
      a.push(m[j]);
    }
    arr.push(a);
  }
  return arr;
}

const _make32Steps = (melody) => {
  const arr = [];

  for (let i = 0; i <= melody.length - 1; i++) {
    const pitch = melody[i][0];
    const step = melody[i][1];

    if (step === 1) {
      arr.push([pitch, step]);
    } else {
      arr.push([pitch, step]);
      for (let j = 0; j <= step - 2; j++) {
        arr.push([pitch, 0]);
      }
    }
  }
  return arr;
}

const _makeCompact = (melody) => {
  const arr = [];
  for (let i = 0; i <= melody.length - 1; i++) {
    if (melody[i][1] === 0) {
      continue;
    }
    else {
      arr.push(melody[i]);
    }
  }
  return arr;
}

export const doRetrograde = (m: MelodyTransformation): MelodyTransformation => plugFn(m, retrograde);
export const doEightNotesTwoAndSixUpOctave = (m: MelodyTransformation): MelodyTransformation => plugFn(m, eightNotesTwoAndSixUpOctave);
export const doUpDiatonicThird = (m: MelodyTransformation): MelodyTransformation => plugFn(m, upDiatonicThird);
export const doRetrogradeEveryOther = (m: MelodyTransformation): MelodyTransformation => plugFn(m, retrogradeEveryOther);
