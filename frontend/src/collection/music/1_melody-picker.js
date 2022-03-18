const melodyA = [
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

const melodyB = [
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

const melodyC = [
  [81, 2],
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

const melodyD = [
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

export const melodyE = [
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

export const getMelodyA = (scale, tempo) => ({ melodies: [downThreeOctaves(melodyA)], scale, tempo });
export const getMelodyB = (scale, tempo) => ({ melodies: [downThreeOctaves(melodyB)], scale, tempo });
export const getMelodyC = (scale, tempo) => ({ melodies: [downThreeOctaves(melodyC)], scale, tempo });
export const getMelodyD = (scale, tempo) => ({ melodies: [downThreeOctaves(melodyD)], scale, tempo });
export const getMelodyE = (scale, tempo) => ({ melodies: [downThreeOctaves(melodyE)], scale, tempo });

const downThreeOctaves = (melody) =>
  melody.map(([pitch, noteLength]) => {
    const p = pitch !== null ? pitch : null
    return [p, noteLength];
  });


// const melodyA = [
//   [60, 2], // c
//   [62, 2], // d
//   [64, 2], // e
//   [65, 2], // f
//   [67, 2], // g
//   [69, 2], // a
//   [71, 2], // b
//   [72, 2], // c

//   [60 + 12, 2], // c
//   [62 + 12, 2], // d
//   [64 + 12, 2], // e
//   [65 + 12, 2], // f
//   [67 + 12, 2], // g
//   [69 + 12, 2], // a
//   [71 + 12, 2], // b
//   [72 + 12, 2], // c
// ];