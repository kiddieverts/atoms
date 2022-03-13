import { program } from './atoms.js';

let i = 0;
let beat = 0;
let bang = false;

const NUMBER_OF_FRAMES = 10;
const TOTAL_NUMBER_OF_BEATS = 16; // 64 * 4 * 32; // 32 bars

function setup() {
  getAudioContext().suspend();
  let mySynth = new p5.MonoSynth();
  createCanvas(300, 300);

  // This won't play until the context has resumed
  mySynth.play('A6');
}

function draw() {
  const audioContext = getAudioContext();
  if (audioContext.state === 'running') {
    increase();
  }

  const tempo = getBpm(NUMBER_OF_FRAMES) + ' bpm';
  const ms = getMs(NUMBER_OF_FRAMES) + ' ms';

  if (!bang) {
    // program();
    bang = true;
  }

  background(255, 500, 500);
  textAlign(CENTER, CENTER);
  text('tempo', 100, 100);
  text(ms, 100, 120);
  text(beat, width / 2, height / 2);
}

function mousePressed() {
  if (getAudioContext().state === 'running') {
    getAudioContext().suspend();
  } else {
    userStartAudio();
  }
}

const getBpm = (x) => 60 / (60 / 3600 * x * 4);
const getMs = (x) => 60 / 3600 * x * 4;

const increase = () => {
  if (i < NUMBER_OF_FRAMES) {
    i = i + 1;
  } else {
    if (beat < TOTAL_NUMBER_OF_BEATS - 1) {
      beat = beat + 1;
    } else {
      beat = 0;
    }

    i = 0;
  }
}