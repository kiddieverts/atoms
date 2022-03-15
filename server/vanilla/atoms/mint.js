import { onDraw as playMusic, setupMusic, updatePatchRow } from './music-engine.js';
import { MINT_PATH } from './constant.js';
import { settings } from '../collection/index.js';

let STATE = { 1: 2, 2: 1, 3: 3, 4: 2, 5: 3, 6: 1 };
let IS_LOADING = true;

function setup() {
  const audioContext = getAudioContext();
  setupMusic(audioContext, settings, STATE, true).then(r => IS_LOADING = false);
  addClickListeners();
  initializePads();
}

function draw() {
  if (IS_LOADING) return;
  playMusic(getAudioContext());
}

const initializePads = () => {
  Object.keys(STATE).forEach(row => {
    const col = STATE[row];
    updateCss(row + col);
  });
}

const addClickListeners = () => {
  const pads = document.getElementsByClassName('tile');

  Object.keys(pads).forEach(key => {
    pads[key].addEventListener('click', () => {
      const id = pads[key].id;
      updateState(id);
      updateCss(id);
    })
  });

  const mintBtn = document.getElementById('mint');

  mintBtn.addEventListener('click', () => {
    const str = patchToString(STATE);
    window.location = MINT_PATH + str;
  });
}

const updateCss = (id) => {
  const [row] = id;
  for (let j = 0; j < 5; j++) {
    const cl = +j + 1;
    const k = row + '' + cl;
    const el = document.getElementById(k);
    el.classList.remove('selected');
  }

  const el = document.getElementById(id);
  el.classList.add('selected');

  const tokenEl = document.getElementById('token-id');
  const tokenId = patchToString(STATE);

  tokenEl.innerHTML = `#${tokenId}`;

  tokenEl.addEventListener(('click'), () => {
    window.location = `/?id=${tokenId}`
  });
}

const updateState = (num) => {
  const row = num[0];
  const col = +num[1];

  STATE = updatePatchRow(row, col);
}

const patchToString = (p) => {
  let str = '';
  Object.keys(p).forEach(key => str += p[key]);
  return str;
}

function mouseClicked() {
  getAudioContext().resume();
}

window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;