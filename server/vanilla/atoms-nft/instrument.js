import { getAudioBufferFromFile, playSample } from './utils/audio-utils.js';

const getNotes = (noteNumber, files) => {
  const notes = {
    0: ['c0', ...files[0]],
    1: ['c#0', ...files[0]],
    2: ['d0', ...files[0]],
    3: ['d#0', ...files[0]],
    4: ['e0', ...files[0]],
    5: ['f0', ...files[0]],
    6: ['f#0', ...files[0]],
    7: ['g0', ...files[1]], // 7
    8: ['g#0', ...files[1]],
    9: ['a0', ...files[1]],
    10: ['a#0', ...files[1]],
    11: ['b0', ...files[1]],

    12: ['c1', ...files[1]],
    13: ['c#1', ...files[1]],
    14: ['d1', ...files[2]], // 14
    15: ['d#1', ...files[2]],
    16: ['e1', ...files[2]],
    17: ['f1', ...files[2]],
    18: ['f#1', ...files[2]],
    19: ['g1', ...files[2]],
    20: ['g#1', ...files[2]],
    21: ['a1', ...files[3]], // 21
    22: ['a#1', ...files[3]],
    23: ['b1', ...files[3]],

    24: ['c2', ...files[3]],
    25: ['c#2', ...files[3]],
    26: ['d2', ...files[3]],
    27: ['d#2', ...files[3]],
    28: ['e2', ...files[4]], // 28
    29: ['f2', ...files[4]],
    30: ['f#2', ...files[4]],
    31: ['g2', ...files[4]],
    32: ['g#2', ...files[4]],
    33: ['a2', ...files[4]],
    34: ['a#2', ...files[4]],
    35: ['b2', ...files[5]], // 35

    36: ['c3', ...files[5]],
    37: ['c#3', ...files[5]],
    38: ['d3', ...files[5]],
    39: ['d#3', ...files[5]],
    40: ['e3', ...files[5]],
    41: ['f3', ...files[5]],
    42: ['f#3', ...files[6]], // 42
    43: ['g3', ...files[6]],
    44: ['g#3', ...files[6]],
    45: ['a3', ...files[6]],
    46: ['a#3', ...files[6]],
    47: ['b3', ...files[6]],

    48: ['c4', ...files[6]],
    49: ['c#4', ...files[7]], // 49
    50: ['d4', ...files[7]],
    51: ['d#4', ...files[7]],
    52: ['e4', ...files[7]],
    53: ['f4', ...files[7]],
    54: ['f#4', ...files[7]],
    55: ['g4', ...files[7]],
    56: ['g#4', ...files[8]], // 56
    57: ['a4', ...files[8]],
    58: ['a#4', ...files[8]],
    59: ['b4', ...files[8]],

    60: ['c5', ...files[8]],
    61: ['c#5', ...files[8]],
    62: ['d5', ...files[8]],
    63: ['d#5', ...files[9]], // 63
    64: ['e5', ...files[9]],
    65: ['f5', ...files[9]],
    66: ['f#5', ...files[9]],
    67: ['g5', ...files[9]],
    68: ['g#5', ...files[9]],
    69: ['a5', ...files[9]],
    70: ['a#5', ...files[10]], // 70
    71: ['b5', ...files[10]],

    72: ['c6', ...files[10]],
    73: ['c#6', ...files[10]],
    74: ['d6', ...files[10]],
    75: ['d#6', ...files[10]],
    76: ['e6', ...files[10]],
    77: ['f6', ...files[11]], // 77
    78: ['f#6', ...files[11]],
    79: ['g6', ...files[11]],
    80: ['g#6', ...files[11]],
    81: ['a6', ...files[11]],
    82: ['a#6', ...files[11]],
    83: ['b6', ...files[11]],
  };

  return notes[noteNumber];
}

export const setupInstrument = (audioContext, sampleFiles) => {
  let samples = {};
  const list = Object.keys(sampleFiles).map(key => sampleFiles[key][0]);

  return new Promise((res, rej) => {
    for (var fileName of list) {
      const fName = fileName;
      getAudioBufferFromFile(audioContext, fileName)
        .then(s => {
          samples = { ...samples, [fName]: s };
          if (Object.keys(samples).length === list.length) {
            res(samples);
          }
        })
        .catch(err => rej(err));
    }
  })
};

export const play = (audioContext, samples, noteToPlay, nextTime, duration, sampleFiles) => {
  // const d = duration * 0.30;

  // Return if note is out of range
  if (!noteToPlay) return;

  const arr = getNotes(noteToPlay, sampleFiles);
  if (!arr) return;

  const [, fName, sampleNote] = arr;
  const playbackRate = 2 ** ((noteToPlay - sampleNote) / 12);
  playSample(audioContext, samples[fName], nextTime, playbackRate, 1);
};