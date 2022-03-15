let x1 = 0;
let y1 = 0;
let x2 = 0;
let y2 = 0;
let w_stored = 0;
let h_stored = 0;

export const draw = (currentNotes, patch, w, h, voices) => {
  const [p1, nl1] = currentNotes[0];
  let p2 = undefined;
  let nl2 = undefined;

  if (currentNotes.length > 1) {
    let [p2, nl2] = currentNotes[1];
  }

  if (w !== w_stored || h !== h_stored) {
    w_stored = w;
    h_stored = h;
    x1 = w / 2;
    y1 = h / 2;
  }

  let { min: p1Min, max: p1Max } = getMax(voices.map(r => r[0]));
  drawVoice1(p1, p1Min, p1Max, x1, y1);

  if (!!p2) {
    const v2 = voices.map(r => r[1]);
    let { min: p2Min, max: p2Max } = getMax(v2);
    drawVoice2(p2, p2Min, p2Max, x2, y2);
  }
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

const getMax = (arr) => {
  let max = 0;
  let min = arr[0][0];

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
