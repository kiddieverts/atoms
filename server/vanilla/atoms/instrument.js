import { getAudioBufferFromFile, playSample } from './utils/audio-utils.js';

const file1 = 'c0'; // 0
const file2 = 'g0'; // 7
const file3 = 'd1'; // 14
const file4 = 'a1'; // 21
const file5 = 'e2'; // 28
const file6 = 'b2'; // 35
const file7 = 'f_3'; // 42
const file8 = 'c_4'; // 49
const file9 = 'g_4'; // 56
const file10 = 'd_5'; // 63
const file11 = 'a_5'; // 70
const file12 = 'f6'; // 77

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

export const setupInstrument = (audioContext) => {
  let samples = {};

  return new Promise((res, rej) => {
    for (var fileName of list) {
      const fName = fileName;
      getAudioBufferFromFile(audioContext, `/samples/${fileName}.wav`)
        .then(s => {
          samples = { ...samples, [fName]: s };
          if (Object.keys(samples).length === list.length) {
            res(samples);
          }
        });
    }
  })
};

export const play = (audioContext, samples, noteToPlay, nextTime, duration) => {
  const d = duration * 0.30;

  if (!noteToPlay) return;

  // Return if note is out of range
  if (!notes[noteToPlay]) return;

  const [, fName] = notes[noteToPlay];
  const sampleNote = pitches[fName];
  const playbackRate = 2 ** ((noteToPlay - sampleNote) / 12);

  playSample(audioContext, samples[fName], nextTime, playbackRate, 1);
};