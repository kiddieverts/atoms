import { generateVoices } from './utils/generateVoices.js';
import { setupInstrument, play as playFn } from './instrument.js';
import { TOTAL_NUMBER_OF_TICKS as TOTAL_NUMBER_OF_BEATS } from './constant.js';

let CNT = 0;
let BEAT = 0;
let VOICES = undefined;
let SAMPLES = undefined;
let LOADED = false;
let TMP = -1;
let PATCH = { 1: 1, 2: 1, 3: 1, 4: 3, 5: 5, 6: 3 };
let IS_LOOPED = true;
let NUMBER_OF_FRAMES = 10; // 90 bpm

export const updatePatchRow = (row, col) => {
  const ns = { ...PATCH, [row]: col };
  const { voices: vc, tempo: numberOfFrames } = generateVoices(ns['1'], ns['2'], ns['3'], ns['4'], ns['5'], ns['6']);
  VOICES = vc;
  PATCH = ns;
  NUMBER_OF_FRAMES = numberOfFrames;
  return ns;
}

export const setupMusic = (ctx, patch, isLooped) => {
  updateWholePatch(patch);

  IS_LOOPED = isLooped;

  return setupInstrument(ctx).then(smpls => {
    SAMPLES = smpls;
    LOADED = true;
  });
}

export const onDraw = (audioContext) => {
  if (!LOADED) {
    return getEmpty();
  }

  if (audioContext.state === 'running') {
    const currentNotes = VOICES[BEAT];

    if (BEAT !== TMP) {
      TMP = BEAT;
      playNow(audioContext, currentNotes);
    }

    const isStopped = increase();
    return { currentNotes, patch: PATCH, isStopped, voices: VOICES }
  }

  return getEmpty();
}

const getEmpty = () => ({ currentNotes: [], patch: PATCH });

const updateWholePatch = (ns) => {
  const { voices: vc, tempo: numberOfFrames } = generateVoices(ns['1'], ns['2'], ns['3'], ns['4'], ns['5'], ns['6']);
  VOICES = vc;
  PATCH = ns;
  NUMBER_OF_FRAMES = numberOfFrames;
}

const playNow = (audioContext, currentNotes) => {
  currentNotes.forEach(currentNote => {
    const [pitch, noteLength] = currentNote;
    const dur = 0.3;

    if (!!pitch) {
      const t = audioContext.currentTime;
      playFn(audioContext, SAMPLES, pitch, t, dur);
    }
  });
}

const increase = () => {
  if (CNT < NUMBER_OF_FRAMES) {
    CNT = CNT + 1;
  } else {
    if (BEAT < TOTAL_NUMBER_OF_BEATS - 1) {
      BEAT = BEAT + 1;
    }
    else {
      if (IS_LOOPED) {
        BEAT = 0;
        return false;
      } else {
        // saveFrames('item', 'png', 1, 1);
        // getAudioContext().suspend();
        return true;
      }
    }

    CNT = 0;
  }
}

