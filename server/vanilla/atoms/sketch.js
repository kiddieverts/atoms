import { onDraw as playMusic, setupMusic } from './music-engine.js';
import { getId, idToState } from './utils/misc.js';
import { setupVisuals } from './visuals/visuals.js';
import { settings, drawFn } from './collection.js';

let STATE = { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3 };
let IS_LOADING = true;

function setup() {
  STATE = idToState(getId(window.location));
  const ctx = getAudioContext();
  ctx.suspend();
  setupMusic(ctx, settings, STATE, false).then(() => IS_LOADING = false);
  setupVisuals();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
};

function draw() {
  if (IS_LOADING || getAudioContext().state === 'suspended') {
    return;
  }

  const { currentNotes, isStopped, voices } = playMusic(getAudioContext());
  drawFn(currentNotes, STATE, windowWidth, windowHeight, voices);
  if (isStopped) {
    ctx.suspend();
  }
}

function mouseClicked() {
  const ctx = getAudioContext();
  ctx.resume();
  const el = document.getElementById('play-btn');
  el.style.display = 'none';
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;

window.mouseClicked = mouseClicked;