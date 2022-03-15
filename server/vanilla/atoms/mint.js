import { MINT_PATH } from './constant.js';

const mint = (st, updateFn) => {
  let THE_STATE = st;

  const onUpdateState = updateFn;

  const initializePads = () => {
    Object.keys(THE_STATE).forEach(row => {
      const col = THE_STATE[row];
      updateCss(row + col);
    });
  }

  const addClickListeners = () => {
    const pads = document.getElementsByClassName('tile');

    Object.keys(pads).forEach(key => {
      pads[key].addEventListener('click', () => {
        const id = pads[key].id;
        onUpdateState(id);
        updateCss(id);
      })
    });

    const mintBtn = document.getElementById('mint');

    mintBtn.addEventListener('click', () => {
      const str = patchToString(THE_STATE);
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
    const tokenId = patchToString(THE_STATE);

    tokenEl.innerHTML = `#${tokenId}`;

    tokenEl.addEventListener(('click'), () => {
      window.location = `/?id=${tokenId}`
    });
  }

  const patchToString = (p) => {
    let str = '';
    Object.keys(p).forEach(key => str += p[key]);
    return str;
  }

  return { initializePads, addClickListeners, onUpdateState };
}

export default mint; 