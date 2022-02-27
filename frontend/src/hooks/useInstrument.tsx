import { useEffect, useState } from 'react';
import { getAudioBufferFromFile, playSample } from '../utils/audio-utils';

// const file1 = 'Orpheus%20p%20C0'; // 0
// const file2 = 'Orpheus%20p%20G0'; // 7
// const file3 = 'Orpheus%20p%20D1'; // 14
// const file4 = 'Orpheus%20p%20A1'; // 21
// const file5 = 'Orpheus%20p%20E2'; // 28
// const file6 = 'Orpheus%20p%20B2'; // 35
// const file7 = 'Orpheus%20p%20F%233'; // 42
// const file8 = 'Orpheus%20p%20C%234'; // 49
// const file9 = 'Orpheus%20p%20G%234'; // 56
// const file10 = 'Orpheus%20p%20D%235'; // 63
// const file11 = 'Orpheus%20p%20A%235'; // 70
// const file12 = 'Orpheus%20p%20F6'; // 77

// const file1 = 'glad%202%20p%20c0'; // 0
// const file2 = 'glad%202%20p%20g0'; // 7
// const file3 = 'glad%202%20p%20d1'; // 14
// const file4 = 'glad%202%20p%20a1'; // 21
// const file5 = 'glad%202%20p%20e2'; // 28
// const file6 = 'glad%202%20p%20b2'; // 35
// const file7 = 'glad%202%20p%20f%233'; // 42
// const file8 = 'glad%202%20p%20c%234'; // 49
// const file9 = 'glad%202%20p%20g%234'; // 56
// const file10 = 'glad%202%20p%20d%235'; // 63
// const file11 = 'glad%202%20p%20a%235'; // 70
// const file12 = 'glad%202%20p%20f6'; // 77

// const file1 = 'Church%20Steinway2%20P%20C0'; // 0
// const file2 = 'Church%20Steinway2%20P%20G0'; // 7
// const file3 = 'Church%20Steinway2%20P%20D1'; // 14
// const file4 = 'Church%20Steinway2%20P%20A1'; // 21
// const file5 = 'Church%20Steinway2%20P%20E2'; // 28
// const file6 = 'Church%20Steinway2%20P%20B2'; // 35
// const file7 = 'Church%20Steinway2%20P%20F%233'; // 42
// const file8 = 'Church%20Steinway2%20P%20C%234'; // 49
// const file9 = 'Church%20Steinway2%20P%20G%234'; // 56
// const file10 = 'Church%20Steinway2%20P%20D%235'; // 63
// const file11 = 'Church%20Steinway2%20P%20A%235'; // 70
// const file12 = 'Church%20Steinway2%20P%20F6'; // 77

// const file1 = 'Church%20Steinway2%20P%20C0'; // 0
// const file2 = 'Church%20Steinway2%20P%20G0'; // 7
// const file3 = 'Church%20Steinway2%20P%20D1'; // 14
// const file4 = 'Church%20Steinway2%20P%20A1'; // 21
// const file5 = 'Church%20Steinway2%20P%20E2'; // 28
// const file6 = 'Church%20Steinway2%20P%20B2'; // 35
// const file7 = 'Church%20Steinway2%20P%20F%233'; // 42
// const file8 = 'Church%20Steinway2%20P%20C%234'; // 49
// const file9 = 'Church%20Steinway2%20P%20G%234'; // 56
// const file10 = 'Church%20Steinway2%20P%20D%235'; // 63
// const file11 = 'Church%20Steinway2%20P%20A%235'; // 70
// const file12 = 'Church%20Steinway2%20P%20F6'; // 77

const file1 = 'Pianobook%20Steinway%20Kristiansand%20v1%20p%20c0'; // 0
const file2 = 'Pianobook%20Steinway%20Kristiansand%20v1%20p%20g0'; // 7
const file3 = 'Pianobook%20Steinway%20Kristiansand%20v1%20p%20d1'; // 14
const file4 = 'Pianobook%20Steinway%20Kristiansand%20v1%20p%20a1'; // 21
const file5 = 'Pianobook%20Steinway%20Kristiansand%20v1%20p%20e2'; // 28
const file6 = 'Pianobook%20Steinway%20Kristiansand%20v1%20p%20b2'; // 35
const file7 = 'Pianobook%20Steinway%20Kristiansand%20v1%20p%20f%233'; // 42
const file8 = 'Pianobook%20Steinway%20Kristiansand%20v1%20p%20c%234'; // 49
const file9 = 'Pianobook%20Steinway%20Kristiansand%20v1%20p%20g%234'; // 56
const file10 = 'Pianobook%20Steinway%20Kristiansand%20v1%20p%20d%235'; // 63
const file11 = 'Pianobook%20Steinway%20Kristiansand%20v1%20p%20a%235'; // 70
const file12 = 'Pianobook%20Steinway%20Kristiansand%20v1%20p%20f6'; // 77

// Pianobook%20Steinway%20Kristiansand%20v1%20p%20

// Church%20Steinway2%20P%20F6

const notes = {
  0: ['c0', file1],
  1: ['c#0', file1],
  2: ['d0', file1],
  3: ['d#0', file1],
  4: ['e0', file1],
  5: ['f0', file1],
  6: ['f#0', file1],
  7: ['g0', file2], // 7
  8: ['g#0', file2],
  9: ['a0', file2],
  10: ['a#0', file2],
  11: ['b0', file2],

  12: ['c1', file2],
  13: ['c#1', file2],
  14: ['d1', file3], // 14
  15: ['d#1', file3],
  16: ['e1', file3],
  17: ['f1', file3],
  18: ['f#1', file3],
  19: ['g1', file3],
  20: ['g#1', file3],
  21: ['a1', file4], // 21
  22: ['a#1', file4],
  23: ['b1', file4],

  24: ['c2', file4],
  25: ['c#2', file4],
  26: ['d2', file4],
  27: ['d#2', file4],
  28: ['e2', file5], // 28
  29: ['f2', file5],
  30: ['f#2', file5],
  31: ['g2', file5],
  32: ['g#2', file5],
  33: ['a2', file5],
  34: ['a#2', file5],
  35: ['b2', file6], // 35

  36: ['c3', file6],
  37: ['c#3', file6],
  38: ['d3', file6],
  39: ['d#3', file6],
  40: ['e3', file6],
  41: ['f3', file6],
  42: ['f#3', file7], // 42
  43: ['g3', file7],
  44: ['g#3', file7],
  45: ['a3', file7],
  46: ['a#3', file7],
  47: ['b3', file7],

  48: ['c4', file7],
  49: ['c#4', file8], // 49
  50: ['d4', file8],
  51: ['d#4', file8],
  52: ['e4', file8],
  53: ['f4', file8],
  54: ['f#4', file8],
  55: ['g4', file8],
  56: ['g#4', file9], // 56
  57: ['a4', file9],
  58: ['a#4', file9],
  59: ['b4', file9],

  60: ['c5', file9],
  61: ['c#5', file9],
  62: ['d5', file9],
  63: ['d#5', file10], // 63
  64: ['e5', file10],
  65: ['f5', file10],
  66: ['f#5', file10],
  67: ['g5', file10],
  68: ['g#5', file10],
  69: ['a5', file10],
  70: ['a#5', file11], // 70
  71: ['b5', file11],

  72: ['c6', file11],
  73: ['c#6', file11],
  74: ['d6', file11],
  75: ['d#6', file11],
  76: ['e6', file11],
  77: ['f6', file12], // 77
  78: ['f#6', file12],
  79: ['g6', file12],
  80: ['g#6', file12],
  81: ['a6', file12],
  82: ['a#6', file12],
  83: ['b6', file12],
};

const pitches = {
  [file1]: 0,
  [file2]: 7,
  [file3]: 14,
  [file4]: 21,
  [file5]: 28,
  [file6]: 35,
  [file7]: 42,
  [file8]: 49,
  [file9]: 56,
  [file10]: 63,
  [file11]: 70,
  [file12]: 77
};

const list = [
  file1,
  file2,
  file3,
  file4,
  file5,
  file6,
  file7,
  file8,
  file9,
  file10,
  file11,
  file12
];

export const useInstrument = (audioContext) => {
  const [samples, setSamples] = useState({});

  useEffect(() => {
    for (var fileName of list) {
      const fName = fileName;
      getAudioBufferFromFile(audioContext, `/samples/${fileName}.wav`)
        .then(s => setSamples(old => ({ ...old, [fName]: s })));
    }
  }, []);

  const play = (noteToPlay, nextTime, duration) => {
    const d = duration * 0.30;

    if (!noteToPlay) return;

    // Return if note is out of range
    if (!notes[noteToPlay]) return;

    const [, fName] = notes[noteToPlay];
    const sampleNote = pitches[fName];
    const playbackRate = 2 ** ((noteToPlay - sampleNote) / 12);

    playSample(audioContext, samples[fName], nextTime, playbackRate, d);
  };

  const samplesReady = Object.keys(samples).length === list.length;

  return [play, samplesReady];
};
