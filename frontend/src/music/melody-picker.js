const melody1 = [
  [69, 4], // a1
  [64, 4], // e1
  [69, 4], // a1
  [64, 4], // e1
  [60, 8], // c1 -- middle c
  [60, 4], // c1
  [67, 4], // g1
  [72, 4], // c2
  [67, 4], // g1
  [72, 4], // c2
  [64, 4], // e1
  [69, 8], // a1
  [69, 4], // a1
  [74, 4] // d1
];

const melody2 = [
  [null, 4], // silence
  [72, 4], // c2
  [77, 4], // f2 
  [76, 4], // e2
  [null, 4], // silence
  [72, 4], // c2
  [77, 4], // f2
  [76, 4], // e2
  [69, 4], // a1
  [72, 4], // c2
  [76, 12], // e2
  [74, 4], // d2
  [76, 8], // e2
];

const melody3 = [
  [null, 8], // silence
  [81, 12], // a2
  [72, 4], // c2
  [76, 8], // e2
  [null, 8], // silence
  [76, 12], // e2
  [77, 4], // f2
  [76, 8] // e2
];

const melody4 = [
  [60, 8], // c1
  [null, 8], // silence
  [60, 1], // c1
  [64, 1], // e1
  [69, 1], // a1
  [64, 1], // e1
  [null, 8], // silence
  [64, 8], // e1
  [null, 8], // silence
  [64, 1], // e1
  [69, 1], // a1
  [72, 1], // c2
  [69, 1], // a1
  [null, 8], // silence
];

export const getMelody = (numb) => {
  var melodies = [melody1, melody2, melody3, melody4];
  return melodies[numb - 1].map(([a, b]) => [a - 12 - 12 - 12, b])
}