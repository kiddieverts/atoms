import { Melody, MelodyNote, Pitch, Scale, Tempo } from '../types';

const melodyA: MelodyNote[] = [
  [62, 4],
  [65, 4],
  [69, 4],
  [70, 4],
  [69, 12],
  [62, 8],
  [65, 4],
  [69, 4],
  [70, 4],
  [74, 4],
  [77, 4],
  [81, 8],
  [79, 4],
  [74, 4],
  [67, 4],
  [70, 4],
  [70, 12],
  [69, 8],
  [69, 4],
  [65, 4],
  [62, 4],
  [69, 16]
];

const melodyB: MelodyNote[] = [
  [65, 8],
  [62, 4],
  [65, 4],
  [69, 4],
  [74, 4],
  [77, 4],
  [76, 4],
  [62, 4],
  [65, 4],
  [69, 4],
  [74, 4],
  [76, 4],
  [74, 4],
  [72, 8],
  [69, 4],
  [72, 4],
  [76, 4],
  [81, 4],
  [82, 4],
  [81, 4],
  [76, 8],
  [74, 4],
  [72, 4],
  [74, 8],
  [69, 4],
  [67, 4],
  [64, 4],
  [65, 4]
];

const melodyC: MelodyNote[] = [[81, 2],
[74, 2],
[69, 2],
[74, 2],
[79, 8],
[81, 2],
[74, 2],
[69, 2],
[74, 2],
[77, 2],
[74, 2],
[69, 2],
[77, 10],
[76, 8],
[79, 2],
[74, 2],
[67, 2],
[70, 2],
[74, 2],
[67, 2],
[62, 2],
[67, 10],
[69, 8],
[74, 2],
[69, 2],
[65, 2],
[62, 2],
[69, 16]
];

const melodyD: MelodyNote[] = [
  [62, 4],
  [69, 4],
  [65, 4],
  [74, 8],
  [74, 4],
  [77, 8],
  [62, 4],
  [69, 4],
  [65, 4],
  [74, 8],
  [74, 4],
  [76, 8],
  [77, 4],
  [74, 4],
  [67, 4],
  [76, 4],
  [79, 4],
  [76, 4],
  [69, 4],
  [76, 4],
  [81, 4],
  [82, 4],
  [81, 16],
  [76, 8]
];

// export const melodyA: MelodyNote[] = [
//   [69, 4], // a1
//   [64, 4], // e1
//   [69, 4], // a1
//   [64, 4], // e1
//   [60, 8], // c1 -- middle c
//   [60, 4], // c1
//   [67, 4], // g1
//   [72, 4], // c2
//   [67, 4], // g1
//   [72, 4], // c2
//   [64, 4], // e1
//   [69, 8], // a1
//   [69, 4], // a1
//   [74, 4] // d1
// ];

// export const melodyB: MelodyNote[] = [
//   [null, 4], // silence
//   [72, 4], // c2
//   [77, 4], // f2 
//   [76, 4], // e2
//   [null, 4], // silence
//   [72, 4], // c2
//   [77, 4], // f2
//   [76, 4], // e2
//   [69, 4], // a1
//   [72, 4], // c2
//   [76, 12], // e2
//   [74, 4], // d2
//   [76, 8], // e2
// ];

// export const melodyC: MelodyNote[] = [
//   [null, 8], // silence
//   [81, 12], // a2
//   [72, 4], // c2
//   [76, 8], // e2
//   [null, 8], // silence
//   [76, 12], // e2
//   [77, 4], // f2
//   [76, 8] // e2
// ];

// export const melodyD: MelodyNote[] = [
//   [60, 8], // c1
//   [null, 8], // silence
//   [60, 1], // c1
//   [64, 1], // e1
//   [69, 1], // a1
//   [64, 1], // e1
//   [null, 8], // silence
//   [64, 8], // e1
//   [null, 8], // silence
//   [64, 1], // e1
//   [69, 1], // a1
//   [72, 1], // c2
//   [69, 1], // a1
//   [null, 8], // silence
// ];

export const melodyE: MelodyNote[] = [
  [64, 1], // e1
  [69, 1], // a1
  [72, 1], // c2
  [69, 1], // a1
  [null, 8], // silence
  [64, 1], // e1
  [69, 1], // a1
  [72, 1], // c2
  [null, 12], // a2
  [null, 4], // silence
  [69, 1], // a1
  [72, 4], // c2
  [64, 1], // e1
  [69, 1], // a1
  [74, 4] // d1
];

export const getMelodyA = (scale: Scale, tempo: Tempo) => ({ melodies: [downThreeOctaves(melodyA)], scale, tempo });
export const getMelodyB = (scale: Scale, tempo: Tempo) => ({ melodies: [downThreeOctaves(melodyB)], scale, tempo });
export const getMelodyC = (scale: Scale, tempo: Tempo) => ({ melodies: [downThreeOctaves(melodyC)], scale, tempo });
export const getMelodyD = (scale: Scale, tempo: Tempo) => ({ melodies: [downThreeOctaves(melodyD)], scale, tempo });
export const getMelodyE = (scale: Scale, tempo: Tempo) => ({ melodies: [downThreeOctaves(melodyE)], scale, tempo });

const downThreeOctaves = (melody: Melody) =>
  melody.map(([pitch, noteLength]) => {
    const p: Pitch = pitch !== null ? pitch : null
    return [p, noteLength] as MelodyNote;
  });
