import { setupInstrument as setupInstrumentFn, play as playFn } from './instrument.js';
import { patch, scale } from './music/0_patch.js';
import { draw as drawFn } from './visuals/draw.js';

export const settings = {
  setupInstrumentFn,
  playFn,
  patch,
  scale
}

export { drawFn };