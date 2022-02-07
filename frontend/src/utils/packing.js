export function unpack(m) {
  var pitches = [];
  var rhythm = [];
  for (var i = 0; i <= m.length - 1; i++) {
    pitches.push(m[i][0]);
    rhythm.push(m[i][1]);
  }

  return [pitches, rhythm];
}

export function pack(pitches, rhythm) {
  var final = [];
  for (var i = 0; i <= pitches.length - 1; i++) {
    final.push([pitches[i], rhythm[i]]);
  }
  return final;
}
