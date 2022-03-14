import { onDraw as playMusic, setupMusic, updatePatchRow } from './music-engine.js';
import { MINT_PATH } from './constant.js';

let patch = { 1: 2, 2: 1, 3: 3, 4: 2, 5: 3, 6: 1 };
let loading = true;

function setup() {
  const ctx = getAudioContext();
  setupMusic(ctx, patch, true).then(r => loading = false)
  addClickListeners();
  initializePads();
}

function draw() {
  if (loading) {
    return;
  }

  const ctx = getAudioContext();
  playMusic(ctx);
}

const initializePads = () => {
  Object.keys(patch).forEach(row => {
    const col = patch[row];
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
    const str = patchToString(patch);
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
  const tokenId = patchToString(patch);

  tokenEl.innerHTML = `#${tokenId}`;

  tokenEl.addEventListener(('click'), () => {
    window.location = `/?id=${tokenId}`
  });

  // const node = document.createElement("a");
  // x.appendChild(node);
  // x.appendChild = `<a href="/?id=${tokenId}>#${tokenId}</a>`;
}

const updateState = (num) => {
  const row = num[0];
  const col = +num[1];

  patch = updatePatchRow(row, col);
}

const patchToString = (p) => {
  let str = '';
  Object.keys(p).forEach(key => str += p[key]);
  return str;
}

window.setup = setup;
window.draw = draw;