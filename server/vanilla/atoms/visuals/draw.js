let p1 = 0;
let p2 = 0;
let p3 = 0;
let p4 = 0;
let p5 = 0;

let n1 = 0;
let n2 = 0;
let n3 = 0;
let n4 = 0;
let n5 = 0;

let x = 0;
let y = 0;

let x2 = 0;
let y2 = 0;

let diff = 0;
let incr = 0;
let first = false;

export const draw = (currentNotes, patch, w, h) => {
  const [pitch1, noteLength1] = currentNotes[0];
  const [pitch2, noteLength2] = currentNotes[1] || [0, 0];
  const [pitch3, noteLength3] = currentNotes[2] || [0, 0];
  const [pitch4, noteLength4] = currentNotes[3] || [0, 0];
  const [pitch5, noteLength5] = currentNotes[4] || [0, 0];

  if (first === false) {
    x = w / 2;
    y = h / 2;
    first = true
    x2 = w / 2;
    y2 = h / 2;
  }

  if (!!pitch1) {
    p1 = pitch1;
    n1 = noteLength1;
  }

  if (!!pitch2) {
    p2 = pitch2;
    n2 = noteLength2;
  }

  if (!!pitch3) {
    p3 = pitch3;
    n3 = noteLength3;
  }

  if (!!pitch4) {
    p4 = pitch4;
    n4 = noteLength4;
  }

  if (!!pitch5) {
    p5 = pitch5;
    n5 = noteLength5;
  }

  const rnd = jsf32(incr, incr + 1, p1 + 20, p1 + 3)();
  const seed = jsf32(patch['1'], patch['2'], patch['3'], patch['4'])();
  const s1 = seed.toString().substring(6, 9);
  const val = ((rnd * 20) - 10) / 2;
  const sd = 100 / s1;

  // Voice 1
  y = height - ((height * (p1 / 128))) * 2 - ((10 * seed) / sin(-val));

  const a = 255 * rnd;
  const b = 100 * sd;
  const c = 255 * sd;

  colorMode(RGB)

  fill(a, b, c, 30 * seed);
  noStroke();
  ellipse(diff % 0 ? x - 150 : x + 15, y, 10, diff % 2 ? 6 : 10);
  x = x < 0
    ? w / 2
    : x + val;

  // Voice 2
  y2 = (height - ((height * (p2 / 128))) * 1.8) * 1 - (1 / sin(-val)); // + ((val > 0 ? cos(-1) : 0)); //  * (1 / cos(val)) // - ((10 * seed) / cos(-val));


  const a2 = 200 * rnd;
  const b2 = 255 * sd;
  const c2 = 150 * sd


  fill(a2, b2, c2, rnd * 70);
  noStroke();
  ellipse(x2, y2 + rnd * 50, rnd < 0.5 ? 12 : 6);
  ellipse(x2, y2 + rnd * 100, rnd < 0.5 ? 10 : 5);

  x2 = x2 < 0
    ? w / 2
    : x2 - (val * 1) * 1

  incr++;
}

const jsf32 = (a, b, c, d) => {
  return () => {
    a |= 0; b |= 0; c |= 0; d |= 0;
    var t = a - (b << 27 | b >>> 5) | 0;
    a = b ^ (c << 17 | c >>> 15);
    b = c + d | 0;
    c = d + t | 0;
    d = a + t | 0;
    return (d >>> 0) / 4294967296;
  }
}