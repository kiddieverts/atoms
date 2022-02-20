import { VoiceTransformationFunction, MelodyNote, Pitch, Scale, Melody, TransformationFunction } from '../types';
import { applyToAllVoices } from '../utils/helpers';

/* Retrograde */
export const retrograde: VoiceTransformationFunction = (m) => m.reverse();

export const eightNotesTwoAndSixUpOctave: VoiceTransformationFunction = (melody) => {
  const rng = [5, 6, 7, 8, 21, 22, 23, 24];
  const newMelody: Melody = [];
  let head = 0;

  for (let [pitch, noteLength] of melody) {
    const current = head;

    const val: MelodyNote = rng.includes(current + 1)
      ? [pitch + 12 as Pitch, noteLength]
      : [pitch, noteLength];

    newMelody.push(val);

    head = head + noteLength < 32
      ? head + noteLength
      : 0;
  }

  return newMelody;
}

/* Eight notes two and six up are up an octave */
// export const _old_eightNotesTwoAndSixUpOctave: VoiceTransformationFunction = (melody) => {
//   // TODO: Make algo handle more than 2 bar loops.
//   const m = _make32Steps(melody);
//   const arr = [];

//   for (let i = 0; i <= m.length - 1; i++) {
//     const stepsToBeTransposed = [3, 4, 13, 14, 19, 20, 27, 28];
//     if (stepsToBeTransposed.indexOf(i) !== -1) {
//       const newPitch = m[i][0] + 12;
//       const duration = m[i][1];
//       arr.push([newPitch, duration]);
//     } else {
//       arr.push(m[i]);
//     }
//   }

//   return _makeCompact(arr);
// }

/* Up a diatonic third */
export const upDiatonicThird: VoiceTransformationFunction = (melody, scale) => {
  return melody.map(([pitch, noteLength]) => {
    const changedPitch = _transposeDiatonicUp(pitch, scale, 2);
    return [changedPitch, noteLength];
  });
}

const _noteNamesToNumbers = (scale: Scale) => {
  const mapping = {
    'C': 0,
    'C#': 1,
    'D': 2,
    'D#': 3,
    'E': 4,
    'F': 5,
    'F#': 6,
    'G': 7,
    'G#': 8,
    'A': 9,
    'A#': 10,
    'B': 11
  };

  return scale.map(pitch => mapping[pitch]);
}

const _transposeDiatonicUp = (note: Pitch, scale: Scale, offset: number): Pitch => {
  if (note === null) return null;

  const scaleNumbers = _noteNamesToNumbers(scale);

  let p = note;
  let octave = 0;
  while (p >= 12) {
    octave++;
    p = p - 12 as Pitch;
  }

  const i = scaleNumbers.indexOf(p);
  // const combined = scaleNumbers.concat(scaleNumbers.map(function (num) { return num + 12; }));
  const combined = scaleNumbers.concat(scaleNumbers.map(num => num + 12));
  return combined[i + offset] + (octave * 12) as Pitch;
}

/* Retrograde flipped within the mesasure */
export const retrogradeEveryOther: VoiceTransformationFunction = (melody) => {
  const retrograde = melody.reverse();
  const m = _make32Steps(retrograde);
  const arr = _collectIntoBeats(m);
  const shuffled = [arr[1], arr[0], arr[3], arr[2]];
  const comb = _combineIntoOneArray(shuffled);
  return _makeCompact(comb);
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


export const doRetrograde: TransformationFunction = (m) => applyToAllVoices(m, retrograde);
export const doEightNotesTwoAndSixUpOctave: TransformationFunction = (m) => applyToAllVoices(m, eightNotesTwoAndSixUpOctave);
export const doUpDiatonicThird: TransformationFunction = (m) => applyToAllVoices(m, upDiatonicThird);
export const doRetrogradeEveryOther: TransformationFunction = (m) => applyToAllVoices(m, retrogradeEveryOther);
