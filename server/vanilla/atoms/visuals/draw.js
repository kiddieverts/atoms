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

let cnt = 0;

let btwrapped = 0;
let bt = 0;

let x_coordinate = 0;
let plot_x = 0;
let x_noise = 0;

export const draw = (numberOfFrames, i, beat, currentNotes, patch) => {
  const [pitch1, noteLength1] = currentNotes[0];
  const [pitch2, noteLength2] = currentNotes[1] || [0, 0];
  const [pitch3, noteLength3] = currentNotes[2] || [0, 0];
  const [pitch4, noteLength4] = currentNotes[3] || [0, 0];
  const [pitch5, noteLength5] = currentNotes[4] || [0, 0];

  const tempo = getBpm(numberOfFrames) + ' bpm';

  const voices = +patch['4'];

  let bb = color('green');


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
  // const p1 = pitch1 || '';
  // const p2 = pitch2 || '';
  // const p3 = pitch3 || '';
  // const p4 = pitch4 || '';
  // const p5 = pitch5 || '';

  // const n1 = noteLength1 || '';

  // if (cnt > 120) {
  //   background(0);
  //   cnt = 0;
  // }

  cnt = cnt + 1;


  if (beat !== bt) {
    if (btwrapped < 8) {
      btwrapped++;
    } else {
      btwrapped = 0;
    }
  }

  bt = beat;



  const bla = (xx) => height - (height * (xx / 128)) + 0// (btwrapped % 2) * 2 + (p1 / 16)

  const nl = (xx) => 100 - xx;

  const gaga = (xx) => xx // + btwrapped * 10 + p1;

  const gaga2 = (xx) => width - (100 - xx);

  const breidd = (xx) => xx / btwrapped / 2 + 50;

  // ellipse(p1, p2, n1 + 100);

  color('#f9e000');

  x_noise = noise(x_coordinate) * 100;

  // Plot the point with random noise
  strokeWeight(3);

  // Use color() function


  if (!!p1) {
    let a = color('#f9e000');
    fill(a);
    rect(gaga(0), bla(p1), breidd(p1), nl(n1));
    point(100, 200);
  }

  if (!!p2 && voices > 1) {
    let b = color('green');
    fill(b);
    rect(gaga(50), bla(p2), breidd(p2), nl(n2));
  }

  if (!!p3 && voices > 2) {
    let c = color('red');
    fill(c);
    rect(gaga(100), bla(p3), breidd(p3), nl(n3));
  }

  if (!!p4 && voices > 3) {
    let c = color('#f9e000');
    fill(c);
    rect(gaga(150), bla(p4), breidd(p4), nl(n4));
  }

  if (!!p5 && voices > 4) {
    let c = color('#f9e000');
    fill(c);
    rect(gaga(200), bla(p5), breidd(p5), nl(n5));
  }





  // background(255, 1000, 1000);
  // textAlign(CENTER, CENTER);
  // text('>> ' + beat, 100, 240);

  // text(p4 || '', 10, 140);
  // text(height || '', 40, 140);

  // text(p1 || '', 10, 160);
  // text(p2 || '', 10, 180);
  // text(p3 || '', 10, 200);
  // text(p4 || '', 10, 220);
  // text(p5 || '', 10, 240);

  // text('x' + voices + '..' + (voices > 1), 10, 200);
  // text(p4, 100, 200);
  // text(p5, 100, 220);
  // text(i, 140, 260);


  // text(tempo, 140, 280)

  // text(numberOfFrames + 'frm', 300, 300)
}


const getBpm = (x) => 60 / (60 / 3600 * x * 4);