export const convertToState = (tokenId) => {
  const numberOfRows = 6;
  const numberOfCols = 5;
  const stateString = convertToStateString(tokenId, numberOfRows, numberOfCols);
  const state = {};
  for (let i = 0; i < numberOfRows; i++) {
    state[i + 1] = parseInt(stateString[i]);
  }

  return state;
}

const convertToStateString = (tokenId, numberOfRows, numberOfCols) => {
  if (tokenId >= numberOfCols ** numberOfRows + 1) {
    throw new Error('Id is higher than max');
  }
  const num = (tokenId - 1).toString(numberOfCols);
  let stateStr = '';

  for (let i = 0; i < num.length; i++) {
    stateStr += parseInt(num[i]) + 1;
  }

  const ones = numberOfRows - num.length;
  for (let j = 0; j < ones; j++) {
    stateStr = stateStr + '1';
  }

  return stateStr;
}

export const stateStringToTokenId = (stateStr) => {
  const arr = stateStr
    .split('')
    .reverse()
    .map(x => parseInt(x) - 1)
    .join('');

  return parseInt(arr, 5) + 1;
}

export const stateObjectToStateString = (x) => {
  return Object.keys(x).map(key => x[key]).join('');
}
