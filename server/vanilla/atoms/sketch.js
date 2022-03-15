import { onDraw as playMusic, setupMusic } from './music-engine.js';
import { getId, idToState } from './utils/misc.js';
import { setupVisuals } from './visuals.js';
import { settings, drawFn } from '../collection/index.js';

let STATE = { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3 };
let IS_LOADING = true;

function setup() {
  STATE = idToState(getId(window.location));
  const audioContext = getAudioContext();
  audioContext.suspend();
  setupMusic(audioContext, settings, STATE, false).then(() => IS_LOADING = false);
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
  const audioContext = getAudioContext();
  audioContext.resume();
  const el = document.getElementById('play-btn');
  el.style.display = 'none';
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
window.mouseClicked = mouseClicked;