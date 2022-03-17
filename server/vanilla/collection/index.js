import { patch, scale } from './music/0_patch.js';
import { draw as drawFn } from './visuals/draw.js';

const getFullFileName = (fileName) => `/collection/samples/${fileName}.wav`;

const sampleFiles = [
  [getFullFileName('c0'), 0],
  [getFullFileName('g0'), 7],
  [getFullFileName('d1'), 14],
  [getFullFileName('a1'), 21],
  [getFullFileName('e2'), 28],
  [getFullFileName('b2'), 35],
  [getFullFileName('f_3'), 42],
  [getFullFileName('c_4'), 49],
  [getFullFileName('g_4'), 56],
  [getFullFileName('d_5'), 63],
  [getFullFileName('a_5'), 70],
  [getFullFileName('f6'), 77],
];

const totalNumberOfBeats = 32 * 8; // 8 bars

export const settings = {
  drawFn,
  patch,
  sampleFiles,
  scale,
  totalNumberOfBeats,
}
