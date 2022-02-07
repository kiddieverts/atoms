import { unpack } from '../utils/packing';

export const doUnpack = (melody) => {
  const arr = [];
  for (let i = 0; i < melody.length; i++) {
    const [p, r] = melody[i];
    const repeats = r - 1;

    arr.push([p, r]);
    for (let j = 0; j < repeats; j++) {
      arr.push([null, null]);
    }
  }
  return unpack(arr);
}
