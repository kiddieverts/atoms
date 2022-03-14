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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // drawBackground();
  // setupPosition();
};

// p.setupPosition = () => {
//   x = p.windowWidth / 2;
//   y = p.windowHeight / 2;
// };

// p.windowResized = () => {
//   p.resizeCanvas(p.windowWidth, p.windowHeight);
//   p.drawBackground();
//   p.setupPosition();
// };

// p.drawBackground = () => {
//   p.background(0);
// };


function draw() {
  if (loading || getAudioContext().state === 'suspended') {
    return;
  }

  const { currentNotes, isStopped, voices } = playMusic(getAudioContext());
  doDraw(currentNotes, patch, windowWidth, windowHeight, voices);
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