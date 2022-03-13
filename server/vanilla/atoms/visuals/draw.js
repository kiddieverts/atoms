export const draw = (numberOfFrames, i, beat, currentNotes) => {
  const [pitch1, noteLength1] = currentNotes[0];
  const [pitch2, noteLength2] = currentNotes[1] || [0, 0];
  const [pitch3, noteLength3] = currentNotes[2] || [0, 0];
  const [pitch4, noteLength4] = currentNotes[3] || [0, 0];
  const [pitch5, noteLength5] = currentNotes[3] || [0, 0];

  const tempo = getBpm(numberOfFrames) + ' bpm';

  const p1 = pitch1 || '';
  const p2 = pitch2 || '';
  const p3 = pitch3 || '';
  const p4 = pitch4 || '';
  const p5 = pitch5 || '';

  background(255, 1000, 1000);
  textAlign(CENTER, CENTER);
  text('>> ' + beat, 100, 240);

  text(p1, 100, 140);
  text(p2, 100, 160);
  text(p3, 100, 180);
  text(p4, 100, 200);
  text(p5, 100, 220);
  text(i, 140, 260);

  text(tempo, 140, 280)

  text(numberOfFrames + 'frm', 300, 300)
}


const getBpm = (x) => 60 / (60 / 3600 * x * 4);