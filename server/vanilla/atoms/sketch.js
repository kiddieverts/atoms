import { onDraw as playMusic, setupMusic } from './music-engine.js';
import { getParams, idToState } from './utils/misc.js';
import { setupVisuals } from './visuals.js';
import { draw as doDraw } from './visuals/draw.js'

let patch = { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3 };
let loading = true;

function setup() {
  const { id } = getParams(window.location);
  patch = idToState(id);

  const ctx = getAudioContext();
  setupMusic(ctx, patch, false).then(r => loading = false)
  setupVisuals();
}

function draw() {
  if (loading) {
    return;
  }

  const ctx = getAudioContext();
  const { currentNotes, isStopped } = playMusic(ctx);
  doDraw(currentNotes, patch, windowWidth, windowHeight);
  if (isStopped) {
    ctx.suspend();
  }
}

function mousePressed() {
  console.log('mousePressed');

  // if (getAudioContext().state === 'running') {
  //   // getAudioContext().suspend();
  // } else {
  //   userStartAudio();
  // }
}

window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;