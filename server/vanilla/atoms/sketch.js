import { onDraw as playMusic, setupMusic } from './music-engine.js';
import { getId, idToState } from './utils/misc.js';
import { setupVisuals } from './visuals/visuals.js';
import { draw as doDraw } from './visuals/draw.js'

let patch = { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3 };
let loading = true;

function setup() {
  patch = idToState(getId(window.location));
  const isLooped = false;
  setupMusic(getAudioContext(), patch, isLooped)
    .then(() => {
      loading = false;
      getAudioContext().suspend();

    });
  setupVisuals();
}

function draw() {
  if (loading || getAudioContext().state === 'suspended') {
    return;
  }


  const { currentNotes, isStopped } = playMusic(getAudioContext());
  doDraw(currentNotes, patch, windowWidth, windowHeight);
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

window.mouseClicked = mouseClicked;