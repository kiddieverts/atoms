export const MINT_PATH = 'https://atooooms.web.app?id='; // TODO: <--

export const renderPads = (patch, labels, state, onUpdateStateCb) => {
  const numberOfRows = Object.keys(patch).length;
  const numberOfCols = Object.keys(patch['1']).length;

  const root = document.getElementById('atoms-mint');
  root.id = 'pads';

  for (let i = 0; i < numberOfRows; i++) {
    const row = document.createElement('div');
    row.classList.add('pad-row');
    root.append(row);

    const colTitle = document.createElement('div');
    colTitle.classList.add('pad-row-text');
    colTitle.innerText = labels[i];
    row.append(colTitle);

    for (let j = 0; j < numberOfCols; j++) {
      const col = document.createElement('div');
      col.id = '' + (i + 1) + (j + 1);
      col.classList.add('pad');
      row.append(col);
    }
  }


  renederPadsElements(state, numberOfCols);
  addClickListeners(onUpdateStateCb, state, numberOfCols);

  const reRender = (newState) => {
    renederPadsElements(newState, numberOfCols);
  }

  return { reRender }
}

const renederPadsElements = (state, numberOfCols) => {
  Object.keys(state).forEach(row => {
    const col = state[row];
    const id = row + col;
    updateCss(id, state, numberOfCols);
  });
}

const updateCss = (id, state, numberOfCols) => {
  const [row] = id;
  for (let i = 0; i < numberOfCols; i++) { // TODO: <-- 5 Should not be hardcoded
    const col = i + 1;
    const el = document.getElementById(`${row}${col}`);
    el.classList.remove('selected');
  }

  const el = document.getElementById(id);
  el.classList.add('selected');

  // const tokenEl = document.getElementById('token-id');
  // const tokenId = patchToString(state);
  // console.log('tokenId', tokenId)

  // tokenEl.innerText = `#${tokenId}`;

  // tokenEl.addEventListener(('click'), () => {
  //   window.location = `/?id=${tokenId}`; // TODO: <--
  // });

}

// const patchToString = (p) => {
//   let str = '';
//   Object.keys(p).forEach(key => str += p[key]);
//   return str;
// }

const addClickListeners = (onUpdateStateCb, state, numberOfCols) => {
  const pads = document.getElementsByClassName('pad');

  Object.keys(pads).forEach(key => {
    pads[key].addEventListener('click', () => {
      const id = pads[key].id;
      onUpdateStateCb(id);
      updateCss(id, state, numberOfCols);
    })
  });
}
