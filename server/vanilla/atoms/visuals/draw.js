// let p1 = 0;
// let p2 = 0;
// let p3 = 0;
// let p4 = 0;
// let p5 = 0;

// let n1 = 0;
// let n2 = 0;
// let n3 = 0;
// let n4 = 0;
// let n5 = 0;

let x1 = 0;
let y1 = 0;

let x2 = 0;
let y2 = 0;

// let diff = 0;
// let incr = 0;

let w_stored = 0;
let h_stored = 0;

const getMax = (arr) => {
  let max = 0;
  let min = arr[0][0];
  // console.log('her', arr[0][0]);

  arr
    .map(r => r[0])
    .forEach(pitch => {
      if (pitch > max) {
        max = pitch;
      }
      if (!!pitch && pitch < min) {
        min = pitch;
      }
    });

  return { max, min };
}

const drawVoice1 = (v1, vMin, vMax, globX, globY) => {
  const a = random(-0, 500);
  const b = random(-0, 500);
  const c = random(-0, 500);

  const range = vMax - vMin;

  if (!v1) {
    return;
  }

  const percentage = (vMax - v1) / range;
  globY = percentage * height + random(-60, 60)

  const xMiddle = width / 2;

  globX = random(xMiddle - 500, xMiddle + 500);


  fill(a, b, c, 10);
  noStroke();
  rect(globX, globY, 60, 60);
}

const drawVoice2 = (v1, vMin, vMax, globX, globY) => {
  const a = random(-0, 500);
  const b = random(-0, 500);
  const c = random(-0, 500);

  const range = vMax - vMin;

  if (!v1) {
    return;
  }

  const percentage = (vMax - v1) / range;
  globY = percentage * height;

  globY = globY + random(globY - 20, globY + 20);

  const xMiddle = width / 2;
  globX = random(xMiddle - 500, xMiddle + 500);

  fill(a, b, c, 20);
  noStroke();
  rect(globX, globY, 30, 20);
}

export const draw = (currentNotes, patch, w, h, voices) => {
  const [p1, nl1] = currentNotes[0];
  const [p2, nl2] = currentNotes[1] || [];
  // const [pitch3, noteLength3] = currentNotes[2] || [];
  // const [pitch4, noteLength4] = currentNotes[3] || [];
  // const [pitch5, noteLength5] = currentNotes[4] || [];

  if (w !== w_stored || h !== h_stored) {
    w_stored = w;
    h_stored = h;
    x1 = w / 2;
    y1 = h / 2;
  }

  let { min: p1Min, max: p1Max } = getMax(voices.map(r => r[0]));

  const v2 = voices.map(r => r[1]);

  console.log('v2', v2)

  let { min: p2Min, max: p2Max } = getMax(v2);

  drawVoice1(p1, p1Min, p1Max, x1, y1);
  drawVoice2(p2, p2Min, p2Max, x2, y2);

  // const a = random(-100, 255);
  // const b = random(-100, 255);
  // const c = random(-100, 255);

  // const range = p1Max - p1Min;

  // if (!!p1) {
  //   const percentage = (p1Max - p1) / range;
  //   y1 = percentage * height;
  //   x1 = random(100, 150);
  // }

  // fill(a, b, c, 30);
  // noStroke();
  // ellipse(x1, y1, 10, 10);

  // const rnd = jsf32(incr, incr + 1, p1 + 20, p1 + 3)();
  // const seed = jsf32(patch['1'], patch['2'], patch['3'], patch['4'])();
  // const s1 = seed.toString().substring(6, 9);
  // const val = ((rnd * 20) - 10) / 2;
  // const sd = 100 / s1;

  // // Voice 1
  // y = height - ((height * (p1 / 128))) * 2 - ((10 * seed) / sin(-val));

  // const a = 255 * rnd;
  // const b = 100 * sd;
  // const c = 255 * sd;

  // colorMode(RGB)

  // fill(a, b, c, 30 * seed);
  // noStroke();
  // ellipse(diff % 0 ? x - 150 : x + 15, y, 10, diff % 2 ? 6 : 10);
  // x = x < 0
  //   ? w / 2
  //   : x + val;

  // // Voice 2
  // y2 = (height - ((height * (p2 / 128))) * 1.8) * 1 - (1 / sin(-val)); // + ((val > 0 ? cos(-1) : 0)); //  * (1 / cos(val)) // - ((10 * seed) / cos(-val));


  // const a2 = 200 * rnd;
  // const b2 = 255 * sd;
  // const c2 = 150 * sd


  // fill(a2, b2, c2, rnd * 70);
  // noStroke();
  // ellipse(x2, y2 + rnd * 50, rnd < 0.5 ? 12 : 6);
  // ellipse(x2, y2 + rnd * 100, rnd < 0.5 ? 10 : 5);

  // x2 = x2 < 0
  //   ? w / 2
  //   : x2 - (val * 1) * 1

  // incr++;
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