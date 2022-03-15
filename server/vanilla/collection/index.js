import { patch, scale } from './music/0_patch.js';
import { draw as drawFn } from './visuals/draw.js';

const sampleFiles = [
  ['c0', 0],
  ['g0', 7],
  ['d1', 14],
  ['a1', 21],
  ['e2', 28],
  ['b2', 35],
  ['f_3', 42],
  ['c_4', 49],
  ['g_4', 56],
  ['d_5', 63],
  ['a_5', 70],
  ['f6', 77],
];

export const settings = {
  patch,
  scale,
  sampleFiles,
  drawFn,
}

export { drawFn };